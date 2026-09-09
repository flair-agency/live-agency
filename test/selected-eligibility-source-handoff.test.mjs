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

for (const eligibility of ['対象', '見つかりません']) test('observed source '+eligibility+' crosses typed contract into selected create and readback', async () => {
  const c = composition();
  c.profileFields.find(field => field.field_id === 'fldStatus').property.options = [{ id: 'optEligible', name: eligibility }];
  const observations = validateInvitationEligibilityObservations(normalizeInvitationEligibilityLookup({ observedAt: '2030-02-01T00:00:00Z',
    rows: [{ accountKey: 'synthetic.creator', eligibilityLabel: eligibility, invitationSubtype: 'プレミアム', anchorId: '123', nickname: 'Synthetic' }] }));
  assert.equal(observations.creators[0].eligibility, eligibility);
  assert.equal(observations.creators[0].result, 'observed');
  const manifest = await exportTargets({ client: c.client, config });
  const directory = await mkdtemp(join(tmpdir(), 'eligibility-source-handoff-'));
  try {
    const reviewHistory = ({ records }) => records.every(row => row.fields.Eligibility === eligibility && row.fields['External ID'] === '123');
    const plan = await dryRunEligibility({ client: c.client, config, manifest, observations, reviewHistory, outputPlan: join(directory, 'plan.json') });
    const prepared = await prepareRefresh({ client: c.client, config, manifest,
      observations: { observedAt: observations.observedAt, rowCount: 1, creators: [{ accountKey: 'synthetic.creator', state: eligibility, externalUserId: '123', nickname: 'Synthetic' }] } });
    const payloads = buildInvitationWritePayloads({ prepared });
    const used = new Set(payloads.creates.flatMap(row => Object.keys(row.fields)));
    const intent = buildLarkBaseCreateIntent({ selection: c.writeSelection, tableId: config.invitationStateTableId,
      fieldBindings: Object.values(plan.bindings.state).filter(field => used.has(field.name)), records: payloads.creates, planSha256: plan.planSha256 });
    const writer = createLarkBaseSelectedBatchCreator({ selection: c.writeSelection, readSelection: c.selection, transportFactory: c.transportFactory,
      intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.planSha256 === plan.planSha256 });
    const result = await applyEligibilityReviewed({ client: { ...c.client, ...writer }, config, reviewed: plan, reviewHistory,
      args: { expectSha256: plan.planSha256, confirmCreate: 1, confirmUpdate: 0, confirmAttach: 0, confirmAlreadyApplied: 0 } });
    assert.equal(result.verified, true); assert.equal(c.state.history.length, 1);
    assert.equal(c.state.history[0].fields.Eligibility, eligibility);
    assert(!JSON.stringify(c.state.history).includes('プレミアム'));
  } finally { await rm(directory, { recursive: true, force: true }); }
});

for (const result of ['not_found', 'unavailable']) test('unknown acquisition '+result+' stays null without destination reads or writes', async () => {
  // A generic unknown acquisition outcome is distinct from a visibly returned source label.
  const observations = {contractVersion:'invitation-eligibility-observations/v1',observedAt:'2030-02-01T00:00:00Z',rowCount:1,creators:[{accountKey:'synthetic.creator',result,eligibility:null}]};
  const directory = await mkdtemp(join(tmpdir(), 'eligibility-not-found-'));
  try {
    const plan = await dryRunEligibility({ client: {}, config, observations,
      manifest: { version: 1, targetMode: 'selected', rowCount: 1, rows: [{ creatorRecordId: 'recSynthetic01', accountKey: 'synthetic.creator' }] }, outputPlan: join(directory, 'plan.json') });
    assert.equal(plan.blocked, true); assert.equal(plan.observations.creators[0].eligibility, null);
    await assert.rejects(applyEligibilityReviewed({ client: {}, config, reviewed: plan, args: { expectSha256: plan.planSha256 } }), /blocked observations/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
