import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
// Validate published entry points and descriptor resources without invoking
// Provider methods, legacy Runtime scripts, or production operations.
export async function verifyInstalledResources(destination) {
  destination = await fs.realpath(destination);
  const { archives } = JSON.parse(await fs.readFile(path.join(destination, 'installation-receipt.json')));
  const checked = [], imports = [];
  for (const { name } of archives) {
    const directory = path.join(destination, 'node_modules', name);
    const manifest = JSON.parse(await fs.readFile(path.join(directory, 'package.json')));
    const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
    const targets = [...strings(manifest.exports), ...strings(manifest.bin)];
    if (manifest.main) targets.push(manifest.main);
    for (const binding of manifest.liveAgencyProvider?.bindings ?? []) {
      targets.push(...strings(binding.execution?.entry), ...strings(binding.execution?.resource), ...strings(binding.execution?.resources));
    }
    for (const target of new Set(targets)) {
      if (target.includes('*')) throw Error(`unexpanded export resource ${name}: ${target}`);
      const resource = path.resolve(directory, target);
      if (!resource.startsWith(directory + path.sep) || !(await fs.stat(resource)).isFile() || !(await fs.realpath(resource)).startsWith(directory + path.sep)) throw Error(`unsafe or missing resource ${name}: ${target}`);
      checked.push({ package: name, target });
    }
    for (const target of new Set(strings(manifest.exports).filter(value => /\.(mjs|js|cjs)$/.test(value)))) {
      await import(pathToFileURL(path.resolve(directory, target)).href);
      imports.push({ package: name, target });
    }
  }
  return { checked, imports, legacyRuntimeScriptsExecuted: false };
}
