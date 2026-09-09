import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { normalizeInvitationEligibilityLookup } from '../providers/backstage/src/invitation-eligibility.js';
import { validateInvitationEligibilityObservations } from '../skills/live-agency-creator-invitation-eligibility-record/src/contracts.mjs';
import { dryRunEligibility, applyEligibilityReviewed } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_eligibility_runtime.mjs';
import { exportTargets, prepareRefresh, buildInvitationWritePayloads } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs';
import { buildLarkBaseCreateIntent, createLarkBaseSelectedBatchCreator } from '../providers/lark-base/src/index.js';
import { config, composition } from './support/selected-invitation-fixture.mjs';

test('private source normalization crosses the public typed contract into selected destination create and readback', async () => {
  const c = composition();
  c.profileFields.find(field => field.field_id === 'fldStatus').property.options = [{ id: 'optEligible', name: '対象' }];
  const observations = validateInvitationEligibilityObservations(normalizeInvitationEligibilityLookup({ observedAt: '2030-02-01T00:00:00Z',
    rows: [{ accountKey: 'synthetic.creator', eligibilityLabel: '対象', invitationSubtype: 'プレミアム', anchorId: '123', nickname: 'Synthetic' }] }));
  assert.equal(observations.creators[0].eligibility, '対象');
  const manifest = await exportTargets({ client: c.client, config });
  const directory = await mkdtemp(join(tmpdir(), 'eligibility-source-handoff-'));
  try {
    const reviewHistory = ({ records }) => records.every(row => row.fields.Eligibility === '対象' && row.fields['External ID'] === '123');
    const plan = await dryRunEligibility({ client: c.client, config, manifest, observations, reviewHistory, outputPlan: join(directory, 'plan.json') });
    const prepared = await prepareRefresh({ client: c.client, config, manifest,
      observations: { observedAt: observations.observedAt, rowCount: 1, creators: [{ accountKey: 'synthetic.creator', state: '対象', externalUserId: '123', nickname: 'Synthetic' }] } });
    const payloads = buildInvitationWritePayloads({ prepared });
    const used = new Set(payloads.creates.flatMap(row => Object.keys(row.fields)));
    const intent = buildLarkBaseCreateIntent({ selection: c.writeSelection, tableId: config.invitationStateTableId,
      fieldBindings: Object.values(plan.bindings.state).filter(field => used.has(field.name)), records: payloads.creates, planSha256: plan.planSha256 });
    const writer = createLarkBaseSelectedBatchCreator({ selection: c.writeSelection, readSelection: c.selection, transportFactory: c.transportFactory,
      intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.planSha256 === plan.planSha256 });
    const result = await applyEligibilityReviewed({ client: { ...c.client, ...writer }, config, reviewed: plan, reviewHistory,
      args: { expectSha256: plan.planSha256, confirmCreate: 1, confirmUpdate: 0, confirmAttach: 0, confirmAlreadyApplied: 0 } });
    assert.equal(result.verified, true); assert.equal(c.state.history.length, 1);
    assert.equal(c.state.history[0].fields.Eligibility, '対象');
    assert(!JSON.stringify(c.state.history).includes('プレミアム'));
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('source not-found stays null in the persisted blocked plan without destination reads or writes', async () => {
  const observations = normalizeInvitationEligibilityLookup({ observedAt: '2030-02-01T00:00:00Z', rows: [{ accountKey: 'synthetic.creator', eligibilityLabel: '見つかりません' }] });
  const directory = await mkdtemp(join(tmpdir(), 'eligibility-not-found-'));
  try {
    const plan = await dryRunEligibility({ client: {}, config, observations,
      manifest: { version: 1, targetMode: 'selected', rowCount: 1, rows: [{ creatorRecordId: 'recSynthetic01', accountKey: 'synthetic.creator' }] }, outputPlan: join(directory, 'plan.json') });
    assert.equal(plan.blocked, true); assert.equal(plan.observations.creators[0].eligibility, null);
    await assert.rejects(applyEligibilityReviewed({ client: {}, config, reviewed: plan, args: { expectSha256: plan.planSha256 } }), /blocked observations/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
