import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLarkBaseCreateIntent, createLarkBaseSelectedBatchCreator } from '../providers/lark-base/src/index.js';
import { exportProfileTargets, prepareProfilePlan, buildProfileCreateRecords, applyProfilePlan } from '../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs';
import { NOW, config, composition, observations } from './support/selected-profile-fixture.mjs';

async function prepared(writeOutcome = 'success') {
  const c = composition({ writeOutcome });
  c.state.records.push({ record_id: 'recSynthetic02', fields: { 'Renamed Account': 'synthetic.second' } });
  const observed = observations();
  observed.creators.push({ ...structuredClone(observed.creators[0]), creatorRecordId: 'recSynthetic02', accountKey: 'synthetic.second' });
  observed.rowCount = 2;
  const manifest = await exportProfileTargets({ client: c.client, config, nowMs: NOW });
  const { plan, bindings } = await prepareProfilePlan({ client: c.client, config, manifest, observations: observed, nowMs: NOW });
  const records = buildProfileCreateRecords({ plan, bindings });
  const used = new Set(records.flatMap(r => Object.keys(r.fields)));
  const fieldBindings = Object.values(bindings.profile).filter(f => used.has(f.name));
  const intent = buildLarkBaseCreateIntent({ selection: c.writeSelection, tableId: config.profileTableId, fieldBindings, records, planSha256: plan.planSha256 });
  const writer = createLarkBaseSelectedBatchCreator({ selection: c.writeSelection, readSelection: c.selection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.planSha256 === plan.planSha256 });
  const client = Object.freeze({ ...c.client, ...writer });
  const apply = overrides => applyProfilePlan({ client, config, reviewedPlan: plan, apply: true,
    expectSha256: plan.planSha256, confirmProfileCreate: 2, confirmProfileAttach: 0, ...overrides });
  return { ...c, client, plan, apply, observed, manifest, bindings };
}
const writes = state => state.calls.filter(args => args[1] === 'POST' && args[2]?.endsWith('/records/batch_create'));

test('selected no-avatar create composes through actual CLI serialization and business readback', async () => {
  const { apply, state, client, manifest, observed } = await prepared();
  const result = await apply();
  assert.equal(result.status, 'success'); assert.equal(result.profileCreatedCount, 2); assert.equal(result.profileVerifiedCount, 2);
  assert.equal(result.recoveredFromAmbiguousResponse, false); assert.equal(writes(state).length, 1);
  assert.equal(new Set(state.history.map(r => r.record_id)).size, 2);
  const { plan: repeat } = await prepareProfilePlan({ client, config, manifest, observations: observed, nowMs: NOW });
  assert.equal(repeat.summary.profileCreateCount, 0);
  const again = await applyProfilePlan({ client, config, reviewedPlan: repeat, apply: true, expectSha256: repeat.planSha256, confirmProfileCreate: 0, confirmProfileAttach: 0 });
  assert.equal(again.status, 'unchanged'); assert.equal(writes(state).length, 1);
});
for (const outcome of ['lost', 'duplicate-response']) test(`${outcome}: complete readback reconciles an uncertain acknowledgment without resend`, async () => {
  const { apply, state } = await prepared(outcome);
  const result = await apply();
  assert.equal(result.verified, true); assert.equal(result.recoveredFromAmbiguousResponse, true);
  assert.equal(state.history.length, 2); assert.equal(writes(state).length, 1);
});
test('partial side effects stop and the stale full plan cannot write again', async () => {
  const { apply, state } = await prepared('partial');
  await assert.rejects(apply(), /automatic retry is disabled/);
  assert.equal(state.history.length, 1); assert.equal(writes(state).length, 1);
  const replay = await apply();
  assert.equal(replay.status, 'blocked'); assert.equal(replay.stalePlanCount, 1); assert.equal(writes(state).length, 1);
});
for (const override of [{ expectSha256: '0'.repeat(64) }, { confirmProfileCreate: 1 }, { confirmProfileAttach: 1 }]) {
  test(`business approval mismatch ${Object.keys(override)[0]} cannot reach create`, async () => {
    const { apply, state } = await prepared(); await assert.rejects(apply(override)); assert.equal(writes(state).length, 0);
  });
}
test('a changed creator identity invalidates the reviewed plan before write', async () => {
  const { apply, state } = await prepared(); state.records[0].fields['Renamed Account'] = 'synthetic.changed';
  const result = await apply(); assert.equal(result.status, 'blocked'); assert.equal(writes(state).length, 0);
});
