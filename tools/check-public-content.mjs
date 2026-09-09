import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const ignored = new Set([".git", "node_modules", "coverage"]);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:token|secret|password)\s*[=:]\s*["'][^"']{8,}["']/i,
  /\b(?:app|client)[_-]?secret\s*[=:]\s*["'][A-Za-z0-9_./+=-]{8,}["']/i,
];
const privateDependencyPatterns = [
  /github\.com[/:]flair-agency\/live-agency-provider-/,
];

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await files(target)));
    else result.push(target);
  }
  return result;
}

const findings = [];
const roots = process.argv.slice(2).length
  ? process.argv.slice(2).map(p => path.resolve(p))
  : (await readdir(path.join(rootDir, 'skills'), { withFileTypes: true }))
      .filter(entry => entry.isDirectory())
      .map(entry => path.join(rootDir, 'skills', entry.name));
for (const owner of roots) for (const filePath of await files(owner)) {
  const content = await readFile(filePath, "utf8").catch(() => null);
  if (content === null) continue;
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) findings.push(`${path.relative(rootDir, filePath)}: ${pattern}`);
  }
}

for (const owner of roots) for (const relativePath of ["package.json", "package-lock.json"]) {
  const content = await readFile(path.join(owner, relativePath), "utf8").catch(error => { if (error.code === "ENOENT") return ""; throw error; });
  for (const pattern of privateDependencyPatterns) {
    if (pattern.test(content)) {
      findings.push(`${relativePath}: public package metadata must not depend on a private provider repository`);
    }
  }
}

if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Public-content checks passed.");
}
