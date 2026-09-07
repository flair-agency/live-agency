import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const exact = value => typeof value === 'string' && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(value);
const npm = (args, cwd) => execFileSync('npm', args, { cwd, encoding: 'utf8', env: { ...process.env, NODE_PATH: '', npm_config_ignore_scripts: 'true', npm_config_audit: 'false', npm_config_fund: 'false' } });
export function validateManifest(manifest) {
  if (!/^@(flair-agency|fixture)\/[a-z0-9-]+$/.test(manifest.name) || !exact(manifest.version)) throw Error('exact scoped package identity required');
  for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    for (const [name, version] of Object.entries(manifest[field] ?? {})) if (!exact(version)) throw Error(`unresolved ${field}: ${name} ${version}`);
  }
  if (manifest.workspaces || manifest.bundledDependencies || manifest.bundleDependencies) throw Error('workspace or bundled dependencies forbidden');
}
export function validatePublication(manifest, repository) {
  validateManifest(manifest);
  if (!manifest.name.startsWith('@flair-agency/')) throw Error('fixture publication forbidden');
  const url = typeof manifest.repository === 'string' ? manifest.repository : manifest.repository?.url;
  if (!/^flair-agency\/[a-z0-9-]+$/.test(repository ?? '') || url !== `https://github.com/${repository}.git`) throw Error('verified owning repository association required');
  if (manifest.private === true) throw Error('npm private flag forbids publication; GitHub package visibility is separate');
  if (manifest.publishConfig?.registry !== 'https://npm.pkg.github.com') throw Error('GitHub Packages registry required');
}
// Packages are caller-selected, not a second fixed source inventory. This is a
// local archive check; it proves neither registry availability nor publication.
export async function assembleInstallation({ sources, destination, externalDependencies = {}, externalLockfile }) {
  destination = path.resolve(destination);
  for (const source of sources) {
    const root = await fs.realpath(source);
    if (destination === root || destination.startsWith(root + path.sep)) throw Error('installation must be outside source roots');
  }
  const manifests = await Promise.all(sources.map(async source => JSON.parse(await fs.readFile(path.join(source, 'package.json')))));
  const graph = new Map();
  for (const manifest of manifests) {
    validateManifest(manifest);
    if (graph.has(manifest.name)) throw Error('duplicate package');
    graph.set(manifest.name, manifest.version);
  }
  let seed;
  if (Object.keys(externalDependencies).length) {
    if (!externalLockfile) throw Error('external lockfile required');
    seed = JSON.parse(await fs.readFile(externalLockfile));
    if (seed.lockfileVersion !== 3) throw Error('external lockfile v3 required');
    for (const [name, version] of Object.entries(externalDependencies)) {
      const entry = seed.packages?.[`node_modules/${name}`];
      if (/^@(flair-agency|fixture|live-agency-skills)\//.test(name) || !exact(version) || entry?.version !== version || entry.link || !entry.integrity || !entry.resolved?.startsWith('https://registry.npmjs.org/')) throw Error(`unverified external dependency ${name}@${version}`);
    }
  }
  for (const manifest of manifests) for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies']) for (const [name, version] of Object.entries(manifest[field] ?? {})) {
    if (graph.get(name) !== version && externalDependencies[name] !== version) throw Error(`archive graph missing exact dependency ${name}@${version}`);
  }
  await fs.mkdir(destination); // Existing destinations are never overwritten.
  const archiveDir = path.join(destination, 'archives');
  await fs.mkdir(archiveDir);
  const dependencies = { ...externalDependencies };
  const archives = [];
  for (const [index, source] of sources.entries()) {
    const result = JSON.parse(npm(['pack', '--json', '--ignore-scripts', '--pack-destination', archiveDir], path.resolve(source)))[0];
    if (result.name !== manifests[index].name || result.version !== manifests[index].version) throw Error('packed identity changed');
    for (const file of result.files) if (/(^|\/)(node_modules|tmp|\.git)(\/|$)/.test(file.path) || file.path.startsWith('/') || file.path.split('/').includes('..')) throw Error(`forbidden archive member: ${file.path}`);
    dependencies[result.name] = `file:archives/${result.filename}`;
    archives.push({ name: result.name, version: result.version, integrity: result.integrity, filename: result.filename });
  }
  const manifest = { name: 'm1-isolated-installation', version: '1.0.0', private: true, type: 'module', dependencies };
  const write = (name, object) => fs.writeFile(path.join(destination, name), JSON.stringify(object, null, 2) + '\n');
  await write('package.json', manifest);
  if (seed) {
    const packages = Object.fromEntries(Object.entries(seed.packages).filter(([key, entry]) => key.startsWith('node_modules/') && !entry.link && entry.integrity && entry.resolved?.startsWith('https://registry.npmjs.org/') && !/(^|node_modules\/)@(flair-agency|fixture|live-agency-skills)\//.test(key)));
    packages[''] = { name: manifest.name, version: manifest.version, dependencies };
    await write('package-lock.json', { name: manifest.name, version: manifest.version, lockfileVersion: 3, requires: true, packages });
  }
  npm(['install', '--package-lock-only', '--offline', '--ignore-scripts'], destination);
  // Keep exact package identities in the deployment manifest, with local archive
  // resolutions retained in this local-only lock. npm ci verifies their integrity.
  manifest.dependencies = { ...externalDependencies, ...Object.fromEntries(graph) };
  const lock = JSON.parse(await fs.readFile(path.join(destination, 'package-lock.json')));
  for (const [key, entry] of Object.entries(lock.packages)) {
    if (!key) continue;
    if (entry.link || (!entry.resolved?.startsWith('file:archives/') && !entry.resolved?.startsWith('https://registry.npmjs.org/')) || !entry.integrity) throw Error(`nonportable lock entry ${key}`);
    if (/(^|node_modules\/)@(flair-agency|fixture|live-agency-skills)\//.test(key) && !entry.resolved.startsWith('file:archives/')) throw Error(`internal package escaped archive graph: ${key}`);
  }
  lock.packages[''].dependencies = manifest.dependencies;
  await write('package.json', manifest);
  await write('package-lock.json', lock);
  npm(['ci', '--offline', '--ignore-scripts'], destination);
  for (const [name, version] of graph) {
    const installed = path.join(destination, 'node_modules', name);
    if ((await fs.lstat(installed)).isSymbolicLink()) throw Error('source link installed');
    if (JSON.parse(await fs.readFile(path.join(installed, 'package.json'))).version !== version) throw Error('installed version mismatch');
  }
  const receipt = { verification: 'local-packed-graph-installation', registryVerified: false, destination, archives };
  await write('installation-receipt.json', receipt);
  return receipt;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [destination, ...sources] = process.argv.slice(2);
  if (!destination || !sources.length) throw Error('usage: node m1-distribution.mjs DESTINATION SOURCE...');
  console.log(JSON.stringify(await assembleInstallation({ destination, sources }), null, 2));
}
