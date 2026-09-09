import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildLarkBaseCreateIntent, createLarkBaseSelectedBatchCreator,
  buildLarkBaseTimestampUpdateIntent, createLarkBaseSelectedTimestampUpdater } from '../providers/lark-base/src/index.js';
import { exportTargets, prepareRefresh, refreshPlanSha256, buildInvitationWritePayloads } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs';
import { applyReviewed } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/sync_invitation_observations.mjs';
import { dryRunEligibility, applyEligibilityReviewed, prepareEligibilityRefresh, eligibilityPlanSha256 } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_eligibility_runtime.mjs';
import { config, composition, observations, stored } from './support/selected-invitation-fixture.mjs';

const typedSnapshot = () => ({ contractVersion: 'invitation-eligibility-observations/v1', observedAt: observations().observedAt, rowCount: 1,
  creators: [{ accountKey: 'synthetic.creator', result: 'observed', eligibility: 'synthetic_eligible', externalUserId: 'synthetic-external', nickname: 'Synthetic Creator' }] });
const reviewSyntheticHistory = ({ records }) => records.every(row => row.fields.Eligibility === 'synthetic_eligible'
  && row.fields['External ID'] === 'synthetic-external' && row.fields.Creator[0].record_ids[0] === 'recSynthetic01');
async function prepared({ action = 'create', writeOutcome = 'success', typed = false } = {}) {
  const c = composition({ writeOutcome });
  if (action === 'update') c.state.history.push(stored());
  const snapshot = observations(), manifest = await exportTargets({ client: c.client, config });
  const preview = await prepareRefresh({ client: c.client, config, manifest, observations: snapshot });
  let reviewed = { version: 2, operationMode: 'refresh', generatedAt: '2030-02-01T00:01:00Z', manifest, observations: snapshot,
    operations: preview.operations, counts: preview.counts };
  reviewed.planSha256 = refreshPlanSha256(reviewed);
  if (typed) {
    const directory = await mkdtemp(join(tmpdir(), 'eligibility-plan-'));
    try {
      reviewed = await dryRunEligibility({ client: c.client, config, manifest, observations: typedSnapshot(),
        reviewHistory: reviewSyntheticHistory, outputPlan: join(directory, 'plan.json') });
    } finally { await rm(directory, { recursive: true, force: true }); }
  }
  const payloads = buildInvitationWritePayloads({ prepared: preview });
  let writer;
  if (action === 'create') {
    const used = new Set(payloads.creates.flatMap(row => Object.keys(row.fields)));
    const intent = buildLarkBaseCreateIntent({ selection: c.writeSelection, tableId: config.invitationStateTableId,
      fieldBindings: Object.values(preview.bindings.state).filter(field => used.has(field.name)), records: payloads.creates, planSha256: reviewed.planSha256 });
    writer = createLarkBaseSelectedBatchCreator({ selection: c.writeSelection, readSelection: c.selection, transportFactory: c.transportFactory,
      intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.planSha256 === reviewed.planSha256 });
  } else {
    const intent = buildLarkBaseTimestampUpdateIntent({ selection: c.updateSelection, tableId: config.invitationStateTableId,
      timestampField: preview.bindings.state.observedAt, baselineRecords: c.state.history, records: payloads.updates, planSha256: reviewed.planSha256 });
    writer = createLarkBaseSelectedTimestampUpdater({ selection: c.updateSelection, readSelection: c.selection, transportFactory: c.transportFactory,
      intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.planSha256 === reviewed.planSha256 });
  }
  const client = { ...c.client, ...writer };
  const args = { expectSha256: reviewed.planSha256, confirmCreate: preview.counts.create, confirmUpdate: preview.counts.update,
    confirmAttach: 0, confirmAlreadyApplied: 0 };
  return { ...c, client, reviewed, preview, payloads, apply: overrides => (typed ? applyEligibilityReviewed : applyReviewed)({ client, config, reviewed, args: { ...args, ...overrides }, reviewHistory: reviewSyntheticHistory }),
    replan: () => prepareRefresh({ client, config, manifest, observations: snapshot }) };
}
const writes = c => c.state.calls.filter(args => args[1] === 'POST');

for (const action of ['create', 'update']) test(`${action}: selected invitation write is verified by business readback and exact replay is empty`, async () => {
  const c = await prepared({ action }), before = structuredClone(c.state.history);
  const result = await c.apply();
  assert.equal(result.verified, true); assert.equal(writes(c).length, 1);
  assert.deepEqual((await c.replan()).counts, { create: 0, update: 0, attach: 0, alreadyApplied: 1 });
  if (action === 'update') {
    const expected = structuredClone(before); expected[0].fields.Observed = Date.parse(observations().observedAt);
    assert.deepEqual(c.state.history, expected);
  } else assert.equal(c.state.history[0].fields.Eligibility, 'synthetic_eligible');
});
for (const action of ['create', 'update']) test(`${action}: lost acknowledgment stops and readback accounts for the write without resend`, async () => {
  const c = await prepared({ action, writeOutcome: 'lost' });
  await assert.rejects(c.apply(), error => error.uncertainWrite === true);
  assert.deepEqual((await c.replan()).counts, { create: 0, update: 0, attach: 0, alreadyApplied: 1 });
  await assert.rejects(c.apply(), /live plan differs/);
  assert.equal(writes(c).length, 1);
});
test('changed account, state, field option or confirmation cannot reach an invitation write', async () => {
  for (const change of ['account', 'state', 'option', 'confirmation']) {
    const c = await prepared({ action: change === 'state' ? 'update' : 'create' });
    if (change === 'account') c.state.records[0].fields['Renamed Account'].text = 'synthetic.other';
    if (change === 'state') c.state.history[0].fields.Eligibility = 'synthetic_ineligible';
    if (change === 'option') c.profileFields.find(f => f.field_id === 'fldStatus').property.options[0].id = 'optChanged';
    await assert.rejects(c.apply(change === 'confirmation' ? { confirmCreate: 999 } : {}));
    assert.equal(writes(c).length, 0);
  }
});
test('no-avatar payload builder rejects a blocked or attachment plan instead of omitting side effects', async () => {
  const c = await prepared();
  assert.throws(() => buildInvitationWritePayloads({ prepared: { ...c.preview, blocked: true } }), /unblocked/);
  const preview = structuredClone(c.preview); preview.corePlan.creates[0].avatar = { sha256: 'a'.repeat(64) };
  assert.throws(() => buildInvitationWritePayloads({ prepared: preview }), /avatar/);
});

for (const action of ['create', 'update']) test(`typed eligibility ${action}: version 3 plan is destination-bound and verified through selected CLI`, async () => {
  const c = await prepared({ action, typed: true });
  assert.equal(c.reviewed.version, 3);
  assert.equal(c.reviewed.observations.creators[0].eligibility, 'synthetic_eligible');
  assert.equal(c.reviewed.planSha256, eligibilityPlanSha256(c.reviewed));
  assert.equal((await c.apply()).verified, true);
  assert.equal(writes(c).length, 1);
});
test('typed eligibility rejects mixed historical meaning without creating or relabeling history', async () => {
  const c = composition(); c.state.history.push(stored()); c.state.history[0].fields.Eligibility = 'synthetic_invitation_sent';
  const before = structuredClone(c.state.history);
  const manifest = await exportTargets({ client: c.client, config });
  await assert.rejects(prepareEligibilityRefresh({ client: c.client, config, manifest, observations: typedSnapshot(), reviewHistory: reviewSyntheticHistory }), /historical meanings/);
  assert.deepEqual(c.state.history, before); assert.equal(writes(c).length, 0);
});
test('typed eligibility binds destination and reviewed field properties before any update', async () => {
  const c = await prepared({ action: 'update', typed: true });
  const changedConfig = { ...config, invitationStateTableId: 'other_table' };
  await assert.rejects(applyEligibilityReviewed({ client: c.client, config: changedConfig, reviewed: c.reviewed,
    args: { expectSha256: c.reviewed.planSha256 }, reviewHistory: reviewSyntheticHistory }), /destination differs/);
  c.profileFields.find(f => f.field_id === 'fldStatus').property.options[0].id = 'optChanged';
  await assert.rejects(c.apply(), /field bindings differ/);
  assert.equal(writes(c).length, 0);
});

test('selected creator targets accept an existing Text account field without changing its schema', async () => {
  const c = composition();
  c.creatorFields[0].ui_type = 'Text'; c.state.records[0].fields['Renamed Account'] = '@Synthetic.Creator';
  const manifest = await exportTargets({ client: c.client, config });
  assert.equal(manifest.rows[0].accountKey, 'synthetic.creator');
  const plan = await prepareEligibilityRefresh({ client: c.client, config, manifest, observations: typedSnapshot(), reviewHistory: reviewSyntheticHistory });
  assert.equal(plan.counts.create, 1); assert.equal(writes(c).length, 0);
  c.creatorFields[0].ui_type = 'Number';
  await assert.rejects(exportTargets({ client: c.client, config }), /field type/);
});
