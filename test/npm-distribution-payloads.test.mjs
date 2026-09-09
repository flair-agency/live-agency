import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { assemble, sourcePaths, payloadMap, mapSha256, sha256 } from '../tools/assemble-npm-distribution.mjs';

const source = path.resolve(import.meta.dirname, "..");
const selected = process.env.FORMAL_TEST_ROOT;
assert.ok(selected && path.isAbsolute(selected), 'explicit synthetic FORMAL_TEST_ROOT required');
async function setup(change = async () => {}) {
  const base = await fs.mkdtemp(path.join(selected, 'payload-'));
  const snapshot = path.join(base, 'snapshot'); await fs.mkdir(snapshot);
  const files = {};
  for (const rel of sourcePaths) {
    const bytes = await fs.readFile(path.join(source, rel)); files[rel] = sha256(bytes);
    await fs.mkdir(path.dirname(path.join(snapshot, rel)), { recursive: true }); await fs.writeFile(path.join(snapshot, rel), bytes);
  }
  const bytes = JSON.stringify({ version: 1, mapSha256, files });
  await fs.writeFile(path.join(snapshot, 'inventory.json'), bytes);
  await change(snapshot);
  return { snapshot, destination: path.join(base, 'stage'), expectedInventorySha256: sha256(bytes) };
}
test('complete independent-package closure, imports, exports, links, agent metadata and exact license', async () => {
  const args = await setup(), result = await assemble(args);
  assert.deepEqual(result.packages.map(p => p.files.length), [4, 3, 12, 3]);
  const license = await fs.readFile(path.join(source, 'LICENSE'));
  for (const p of payloadMap.packages) {
    const root = path.join(args.destination, p.directory), targets = new Set(p.files.map(f => f.target));
    assert.deepEqual(await fs.readFile(path.join(root, 'LICENSE')), license);
    const manifest = JSON.parse(await fs.readFile(path.join(root, 'package.json')));
    for (const entry of typeof manifest.exports === 'string' ? [manifest.exports] : Object.values(manifest.exports)) assert.ok(targets.has(entry.slice(2)));
    for (const f of p.files) {
      const text = await fs.readFile(path.join(root, f.target), 'utf8');
      assert.equal(sha256(Buffer.from(text)), result.packages.find(q => q.name === p.name).files.find(q => q.target === f.target).sha256);
      if (/\.(mjs|js)$/.test(f.target)) for (const match of text.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g)) {
        const specifier = match[1];
        if (specifier.startsWith('.')) assert.ok(targets.has(path.posix.normalize(path.posix.join(path.posix.dirname(f.target), specifier))), specifier);
        else if (!specifier.startsWith('node:')) assert.ok(Object.hasOwn(manifest.dependencies ?? {}, specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0]), specifier);
      }
      if (f.target.endsWith('.md')) for (const match of text.matchAll(/\]\(([^)]+)\)|`((?:scripts|references)\/[^`]+)`/g)) {
        const link = match[1] ?? match[2]; if (link.startsWith('#') || link.includes('://')) continue;
        assert.ok(targets.has(path.posix.normalize(path.posix.join(path.posix.dirname(f.target), link.split('#')[0]))), link);
      }
    }
  }
  const yaml = await fs.readFile(path.join(args.destination, 'live-agency-coin-purchase-expense-reconcile/agents/openai.yaml'), 'utf8');
  assert.match(yaml, /\$live-agency-coin-purchase-expense-reconcile/);
  const md = await fs.readFile(path.join(args.destination, 'live-agency-coin-purchase-expense-reconcile/SKILL.md'), 'utf8');
  assert.match(md, /^---\nname: live-agency-coin-purchase-expense-reconcile\n/);
  await assert.rejects(assemble(args), /destination reuse/);
});
for (const [label, change, error] of [
  ['missing helper', s => fs.unlink(path.join(s, 'packages/cli-utils/src/is-main.mjs')), /closure/],
  ['missing reference', s => fs.unlink(path.join(s, 'skills/live-agency-coin-purchase-expense-reconcile/references/registration.md')), /closure/],
  ['extra unrelated Skill', s => fs.writeFile(path.join(s, 'unrelated-SKILL.md'), 'extra'), /closure/],
  ['changed source', s => fs.appendFile(path.join(s, 'packages/provider-protocol/LICENSE'), 'changed'), /digest/],
  ['symbolic link', async s => { const p = path.join(s, 'packages/provider-protocol/LICENSE'); await fs.unlink(p); await fs.symlink(path.join(source, 'LICENSE'), p); }, /link/],
  ['hard link', async s => { const p = path.join(s, 'packages/provider-protocol/LICENSE'); await fs.unlink(p); const original = path.join(path.dirname(s), 'hardlink-original'); await fs.writeFile(original, 'synthetic'); await fs.link(original, p); }, /ordinary/],
]) test(`reject ${label} before destination creation`, async () => {
  const args = await setup(change);
  try { await assert.rejects(assemble(args), error); await assert.rejects(fs.lstat(args.destination), { code: 'ENOENT' }); }
  finally { if (label === 'hard link') await fs.unlink(path.join(args.snapshot, 'packages/provider-protocol/LICENSE')); }
});
test('reject unbound digest, traversal inventory and linked snapshot root', async () => {
  const args = await setup();
  await assert.rejects(assemble({ ...args, expectedInventorySha256: '0'.repeat(64) }), /digest/);
  const inventory = JSON.parse(await fs.readFile(path.join(args.snapshot, 'inventory.json'))); inventory.files['../outside'] = '0'.repeat(64);
  const bytes = JSON.stringify(inventory); await fs.writeFile(path.join(args.snapshot, 'inventory.json'), bytes);
  await assert.rejects(assemble({ ...args, expectedInventorySha256: sha256(bytes) }), /closure/);
  const link = path.join(path.dirname(args.snapshot), 'linked'); await fs.symlink(args.snapshot, link);
  await assert.rejects(assemble({ ...args, snapshot: link }), /noncanonical/);
});
test('reject a changed map binding and overlapping roots', async () => {
  assert.throws(() => { payloadMap.packages[0].files[0].source = '../outside'; }, TypeError);
  assert.throws(() => { sourcePaths.push('../outside'); }, TypeError);
  const args = await setup();
  await assert.rejects(assemble({ ...args, destination: path.join(args.snapshot, 'stage') }), /overlapping/);
  const inventory = JSON.parse(await fs.readFile(path.join(args.snapshot, 'inventory.json'))); inventory.mapSha256 = '0'.repeat(64);
  const bytes = JSON.stringify(inventory); await fs.writeFile(path.join(args.snapshot, 'inventory.json'), bytes);
  await assert.rejects(assemble({ ...args, expectedInventorySha256: sha256(bytes) }), /map/);
});
