import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {verifiedSourceCheckout} from '../tools/lib/verified-source-checkout.mjs';

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'verified-source-'));
  t.after(() => rmSync(root, {recursive:true, force:true}));
  const git = (...args) => execFileSync('git', ['-C', root, ...args], {encoding:'utf8', stdio:['ignore','pipe','pipe']}).trim();
  git('init');
  writeFileSync(path.join(root, 'source.mjs'), 'export const value = 1;\n');
  git('add', 'source.mjs');
  git('-c', 'user.name=Synthetic', '-c', 'user.email=synthetic@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-m', 'fixture');
  return {root, git, commit:git('rev-parse', 'HEAD')};
}

test('attributes a clean checkout to the exact requested commit and tree', t => {
  const {root, git, commit} = fixture(t);
  assert.deepEqual(verifiedSourceCheckout(root, commit), {commit, tree:git('rev-parse', 'HEAD^{tree}')});
  assert.throws(() => verifiedSourceCheckout(root, '0'.repeat(40)), /expected commit/);
  assert.throws(() => verifiedSourceCheckout(root, commit.slice(0, 7)), /full SHA/);
  mkdirSync(path.join(root, 'nested'));
  assert.throws(() => verifiedSourceCheckout(path.join(root, 'nested'), commit), /checkout root/);
});

test('rejects unstaged, staged and untracked source changes, including after an initial check', t => {
  const {root, git, commit} = fixture(t);
  verifiedSourceCheckout(root, commit);
  writeFileSync(path.join(root, 'source.mjs'), 'export const value = 2;\n');
  assert.throws(() => verifiedSourceCheckout(root, commit), /no staged, unstaged or untracked/);
  git('add', 'source.mjs');
  assert.throws(() => verifiedSourceCheckout(root, commit), /no staged, unstaged or untracked/);
  git('restore', '--source=HEAD', '--staged', '--worktree', 'source.mjs');
  writeFileSync(path.join(root, 'extra.mjs'), 'export const extra = true;\n');
  assert.throws(() => verifiedSourceCheckout(root, commit), /no staged, unstaged or untracked/);
});

test('rejects a new committed revision after an initially clean verification', t => {
  const {root, git, commit} = fixture(t);
  verifiedSourceCheckout(root, commit);
  git('-c', 'user.name=Synthetic', '-c', 'user.email=synthetic@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '--allow-empty', '-m', 'changed revision');
  assert.throws(() => verifiedSourceCheckout(root, commit), /expected commit/);
});
