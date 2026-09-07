import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const mapBytes = await fs.readFile(new URL('./npm-distribution-payloads.json', import.meta.url));
function freeze(value) {
  if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); }
  return value;
}
export const payloadMap = freeze(JSON.parse(mapBytes));
export const mapSha256 = sha256(mapBytes);
const relative = value => {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.split('/').some(x => !x || x === '.' || x === '..') || path.isAbsolute(value)) throw Error('unsafe relative path');
  return value;
};
export const sourcePaths = Object.freeze([...new Set(payloadMap.packages.flatMap(p => p.files.map(f => relative(f.source))))].sort());
async function ordinary(file) {
  const st = await fs.lstat(file);
  if (!st.isFile() || st.nlink !== 1) throw Error(`ordinary file required: ${file}`);
  return fs.readFile(file);
}
async function canonical(directory) {
  if (await fs.realpath(directory) !== path.resolve(directory)) throw Error('linked or noncanonical directory');
}
async function list(root, prefix = '') {
  const result = [];
  for (const name of await fs.readdir(path.join(root, prefix))) {
    const rel = path.posix.join(prefix, name), st = await fs.lstat(path.join(root, rel));
    if (st.isSymbolicLink()) throw Error('snapshot link forbidden');
    if (st.isDirectory()) result.push(...await list(root, rel));
    else { if (!st.isFile() || st.nlink !== 1) throw Error('snapshot ordinary file required'); result.push(rel); }
  }
  return result.sort();
}

// A caller freezes a reviewed, ordinary-file snapshot and binds its inventory hash.
// All bytes are measured and held before any destination is created.
export async function assemble({ snapshot, destination, expectedInventorySha256 }) {
  if (!snapshot || !destination || !/^[a-f0-9]{64}$/.test(expectedInventorySha256 ?? '')) throw Error('explicit snapshot, destination and inventory digest required');
  snapshot = path.resolve(snapshot); destination = path.resolve(destination);
  await canonical(snapshot); await canonical(path.dirname(destination));
  if (destination === snapshot || destination.startsWith(snapshot + path.sep) || snapshot.startsWith(destination + path.sep)) throw Error('overlapping roots');
  try { await fs.lstat(destination); throw Error('destination reuse forbidden'); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  const inventoryBytes = await ordinary(path.join(snapshot, 'inventory.json'));
  if (sha256(inventoryBytes) !== expectedInventorySha256) throw Error('inventory digest changed');
  const inventory = JSON.parse(inventoryBytes);
  if (inventory.version !== 1 || inventory.mapSha256 !== mapSha256) throw Error('unreviewed map');
  if (JSON.stringify(Object.keys(inventory.files).sort()) !== JSON.stringify(sourcePaths)) throw Error('source inventory closure mismatch');
  if (JSON.stringify(await list(snapshot)) !== JSON.stringify([...sourcePaths, 'inventory.json'].sort())) throw Error('snapshot closure mismatch');
  const held = new Map();
  for (const file of sourcePaths) {
    const bytes = await ordinary(path.join(snapshot, file));
    if (sha256(bytes) !== inventory.files[file]) throw Error(`source digest changed: ${file}`);
    held.set(file, bytes);
  }
  const packages = payloadMap.packages.map(p => {
    relative(p.directory);
    const targets = p.files.map(f => relative(f.target));
    if (new Set(targets).size !== targets.length) throw Error('duplicate target');
    const manifest = JSON.parse(held.get(p.files.find(f => f.target === 'package.json').source));
    if (manifest.name !== p.name || Object.keys(manifest.scripts ?? {}).some(key => key !== "test") || manifest.private || JSON.stringify([...manifest.files, 'package.json'].sort()) !== JSON.stringify([...targets].sort())) throw Error('manifest payload mismatch');
    return { ...p, files: p.files.map(f => ({ ...f, sha256: sha256(held.get(f.source)), bytes: held.get(f.source).length })) };
  });
  await fs.mkdir(destination, { mode: 0o700 });
  for (const p of packages) for (const f of p.files) {
    const output = path.join(destination, p.directory, f.target);
    await fs.mkdir(path.dirname(output), { recursive: true, mode: 0o700 });
    await fs.writeFile(output, held.get(f.source), { flag: 'wx', mode: 0o644 });
  }
  return { version: 1, snapshot, destination, inventorySha256: expectedInventorySha256, mapSha256, packages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [snapshot, destination, expectedInventorySha256, ...extra] = process.argv.slice(2);
  if (extra.length) throw Error('unexpected arguments');
  console.log(JSON.stringify(await assemble({ snapshot, destination, expectedInventorySha256 }), null, 2));
}
