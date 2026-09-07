import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { assembleInstallation, validateManifest, validatePublication } from '../tools/m1-distribution.mjs';
const base = { name: '@flair-agency/example', version: '1.0.0' };
test('rejects source references and non-fixed production dependencies', () => {
  for (const version of ['workspace:*', 'file:../source', '^1.0.0', 'https://example.com/a.tgz', 'latest']) assert.throws(() => validateManifest({ ...base, dependencies: { other: version } }), /unresolved/);
  assert.throws(() => validateManifest({ ...base, workspaces: [] }), /workspace/);
});
test('publication requires actual association, permits GitHub private visibility independently', () => {
  const manifest = { ...base, repository: { type: 'git', url: 'https://github.com/flair-agency/example.git' }, publishConfig: { registry: 'https://npm.pkg.github.com' } };
  validatePublication(manifest, 'flair-agency/example');
  assert.throws(() => validatePublication({ ...manifest, private: true }, 'flair-agency/example'), /npm private/);
  assert.throws(() => validatePublication(manifest, 'flair-agency/other'), /association/);
});
test('exact dependent archives install and rerun after source removal', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'm1-dist-'));
  try {
    const sources = [];
    for (const [name, code, dependencies] of [
      ['leaf', 'export const value = 42;', {}],
      ['consumer', 'export { value } from "@flair-agency/leaf";', { '@flair-agency/leaf': '1.0.0' }],
    ]) {
      const source = path.join(root, name); sources.push(source); await fs.mkdir(source);
      await fs.writeFile(path.join(source, 'package.json'), JSON.stringify({ name: `@flair-agency/${name}`, version: '1.0.0', type: 'module', exports: './index.mjs', files: ['index.mjs'], dependencies }));
      await fs.writeFile(path.join(source, 'index.mjs'), code);
    }
    const destination = path.join(root, 'installed');
    const receipt = await assembleInstallation({ sources, destination });
    assert.equal(receipt.registryVerified, false);
    for (const source of sources) await fs.rm(source, { recursive: true });
    await fs.rm(path.join(destination, 'node_modules'), { recursive: true });
    execFileSync('npm', ['ci', '--offline', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd: destination });
    const result = execFileSync(process.execPath, ['--input-type=module', '-e', 'import {value} from "@flair-agency/consumer"; console.log(value)'], { cwd: destination, encoding: 'utf8', env: { ...process.env, NODE_PATH: '' } });
    assert.equal(result.trim(), '42');
    const lock = JSON.parse(await fs.readFile(path.join(destination, 'package-lock.json')));
    assert.equal(lock.packages[''].dependencies['@flair-agency/consumer'], '1.0.0');
    assert.ok(!JSON.stringify(lock).includes(sources[0]));
  } finally { await fs.rm(root, { recursive: true, force: true }); }
});
test('rejects external internal-scope bypass before destination creation', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'm1-external-reject-'));
  try {
    const lockfile = path.join(root, 'lock.json');
    await fs.writeFile(lockfile, JSON.stringify({ lockfileVersion: 3, packages: { 'node_modules/@flair-agency/hidden': { version: '1.0.0', resolved: 'https://registry.npmjs.org/hidden.tgz', integrity: 'sha512-test' } } }));
    await assert.rejects(assembleInstallation({ sources: [], destination: path.join(root, 'install'), externalLockfile: lockfile, externalDependencies: { '@flair-agency/hidden': '1.0.0' } }), /unverified external/);
  } finally { await fs.rm(root, { recursive: true, force: true }); }
});
test('installed resource verification rejects missing and escaping descriptor paths', async () => {
  const { verifyInstalledResources } = await import('../tools/m1-verify-installation.mjs');
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'm1-resource-reject-'));
  try {
    const directory = path.join(root, 'node_modules/@fixture/resource');
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(root, 'installation-receipt.json'), JSON.stringify({ archives: [{ name: '@fixture/resource' }] }));
    for (const resource of ['./missing.md', '../../../outside.md']) {
      await fs.writeFile(path.join(directory, 'package.json'), JSON.stringify({ name: '@fixture/resource', liveAgencyProvider: { bindings: [{ execution: { kind: 'instructions', resource } }] } }));
      await assert.rejects(verifyInstalledResources(root));
    }
  } finally { await fs.rm(root, { recursive: true, force: true }); }
});
