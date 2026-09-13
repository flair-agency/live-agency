import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {realpathSync} from 'node:fs';
import path from 'node:path';

// Check both before importing source and after executing the verification.
// The returned commit/tree identify the clean source used by the result.
export function verifiedSourceCheckout(directory, expectedCommit) {
  assert.ok(path.isAbsolute(directory), 'source checkout must be an absolute path');
  assert.match(expectedCommit, /^[a-f0-9]{40}$/, 'expected source commit must be a full SHA');
  const git = (...args) => execFileSync('git', ['--no-optional-locks', '-C', directory, ...args], {
    encoding:'utf8', stdio:['ignore', 'pipe', 'pipe'],
  }).trim();
  assert.equal(realpathSync(directory), realpathSync(git('rev-parse', '--show-toplevel')),
    'source path must be the checkout root');
  const commit = git('rev-parse', 'HEAD');
  assert.equal(commit, expectedCommit, 'source checkout does not match expected commit');
  assert.equal(git('status', '--porcelain=v1', '--untracked-files=all', '--ignore-submodules=none'), '',
    'source checkout must have no staged, unstaged or untracked changes');
  return {commit, tree:git('rev-parse', 'HEAD^{tree}')};
}
