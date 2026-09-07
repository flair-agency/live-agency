import { spawnSync } from 'node:child_process';
import { readdirSync, existsSync, mkdtempSync, rmSync, realpathSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const fixtureModules = path.join(root, 'test/fixtures/installation/node_modules');
if (!existsSync(fixtureModules)) symlinkSync('../../../node_modules', fixtureModules, 'dir');
const scratch = realpathSync(mkdtempSync(path.join(tmpdir(), 'live-agency-tests-')));
const env = { ...process.env, FORMAL_TEST_ROOT: scratch };
function run(args, cwd = root) {
  const result = spawnSync(process.execPath, args, { cwd, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Tests failed in ${path.relative(root, cwd)} (${result.status})`);
}
try {
  for (const group of ['packages', 'providers', 'mcp', 'skills']) {
    for (const name of readdirSync(path.join(root, group)).sort()) {
      const dir = path.join(root, group, name);
      if (existsSync(path.join(dir, 'test'))) run(['--test'], dir);
    }
  }
  run(['--test', ...readdirSync(path.join(root, 'test')).filter(name => /\.test\.(mjs|js)$/.test(name)).map(name => `test/${name}`)]);
  run(['--test', ...["runtime/scripts/smoke-test.mjs", "runtime/scripts/v2-contract-test.mjs", "runtime/scripts/v2-live-history-dual-run.test.mjs", "runtime/scripts/lark-service-capability-profiles.test.mjs", "runtime/scripts/agency-intelligence-mcp-runtime.test.mjs", "runtime/scripts/activate-v2-m4i-creator-networks-browser.test.mjs", "runtime/scripts/verify-v2-m4i-agency-intelligence-active.test.mjs", "runtime/scripts/m4i-phase3-conformance.test.mjs", "runtime/scripts/build-v2-invitation-history-write-candidate.test.mjs", "runtime/scripts/build-v2-profile-history-write-candidate.test.mjs", "runtime/scripts/promote-v2-invitation-history-write-profile.test.mjs", "runtime/scripts/migrate-v2-lark-active-scouting-profile.test.mjs", "runtime/scripts/verify-v2-invitation-history-write-candidate-dry-run.test.mjs", "runtime/scripts/verify-v2-invitation-history-write-active-dry-run.test.mjs", "runtime/scripts/verify-v2-lark-active-scouting-read.test.mjs", "runtime/scripts/refresh-v2-lark-scouting-parent-profile.test.mjs", "runtime/scripts/v2-lark-account-linkage.test.mjs", "runtime/scripts/v2-lark-instance-profile-candidates.test.mjs", "runtime/scripts/creator-activity-sync-runner.test.mjs"]]);
} finally { rmSync(scratch, { recursive: true, force: true }); }
