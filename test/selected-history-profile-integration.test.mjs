import assert from 'node:assert/strict';
import test from 'node:test';
import { exportProfileTargets, prepareProfilePlan } from '../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs';
import { planIsBlocked } from '../skills/live-agency-creator-profile-record/scripts/profile_sync_core.mjs';
import { NOW, config, composition, observations } from './support/selected-profile-fixture.mjs';

test('selected reader composes with profile target export and no-avatar planning', async () => {
  const { client, state } = composition();
  const manifest = await exportProfileTargets({ client, config, nowMs: NOW });
  assert.deepEqual(manifest.rows, [{ creatorRecordId: 'recSynthetic01', accountKey: 'synthetic.creator' }]);
  const { plan } = await prepareProfilePlan({ client, config, manifest, observations: observations(), nowMs: NOW });
  assert.equal(plan.summary.profileCreateCount, 1);
  assert.equal(plan.summary.profileAttachCount, 0);
  assert.equal(planIsBlocked(plan), false);
  assert.equal(Object.hasOwn(client, 'createRecords'), false);
  assert.equal(state.calls.filter(args => args[2]?.includes('/bitable/')).length, 8);
});

test('selected reader preserves the Skill single-value relation gate', async () => {
  const { client, state } = composition({ multiple: true });
  await assert.rejects(exportProfileTargets({ client, config, nowMs: NOW }), /multiple|single/);
  assert.equal(state.calls.some(args => args[2]?.endsWith('/records')), false);
});

test('an incomplete creator read cannot become a profile target manifest', async () => {
  const { client } = composition({ incomplete: true });
  await assert.rejects(exportProfileTargets({ client, config, nowMs: NOW }), /page bound exhausted/);
});

test('changed account identity blocks the proposed profile plan', async () => {
  const { client, state } = composition();
  const manifest = await exportProfileTargets({ client, config, nowMs: NOW });
  state.records[0].fields['Renamed Account'] = 'synthetic.other';
  const { plan } = await prepareProfilePlan({ client, config, manifest, observations: observations(), nowMs: NOW });
  assert.equal(planIsBlocked(plan), true);
  assert(plan.operations.targetIssues.some(x => x.reason === 'creator_account_changed'));
});
