import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const owners = new Map();
for (const group of ['providers', 'skills', 'packages', 'test/fixtures/providers']) {
  for (const entry of fs.readdirSync(path.join(root, group))) {
    const file = path.join(root, group, entry, 'package.json');
    if (fs.existsSync(file)) {
      const manifest = JSON.parse(fs.readFileSync(file));
      owners.set(manifest.name, { group, manifest });
    }
  }
}
function dependencies(name, seen = new Set()) {
  if (seen.has(name)) return seen;
  seen.add(name);
  const manifest = owners.get(name)?.manifest;
  for (const dependency of Object.keys({ ...manifest?.dependencies, ...manifest?.peerDependencies, ...manifest?.optionalDependencies })) dependencies(dependency, seen);
  return seen;
}
test('every Provider dependency closure excludes Skills and runtime composition', () => {
  for (const [name, {group}] of owners) {
    if (!group.endsWith('providers')) continue;
    for (const dependency of dependencies(name)) {
      assert.notEqual(owners.get(dependency)?.group, 'skills', `${name} depends on Skill ${dependency}`);
      assert.notEqual(dependency, '@flair-agency/live-agency-runtime');
    }
  }
});
test('TikTok installation closures have no Lark dependency', () => {
  for (const name of ['@flair-agency/tiktok-ios-provider', '@flair-agency/tiktok-web-provider']) {
    for (const dependency of dependencies(name)) assert.ok(!dependency.includes('lark'), `${name}: ${dependency}`);
  }
});
test('component production dependencies form an acyclic graph', () => {
  const visited = new Set();
  function visit(name, active = new Set()) {
    assert.ok(!active.has(name), `dependency cycle: ${[...active, name].join(' -> ')}`);
    if (visited.has(name)) return;
    const next = new Set(active).add(name), manifest = owners.get(name)?.manifest;
    for (const dependency of Object.keys({ ...manifest?.dependencies, ...manifest?.peerDependencies })) visit(dependency, next);
    visited.add(name);
  }
  for (const name of owners.keys()) visit(name);
});
