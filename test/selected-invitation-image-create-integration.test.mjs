import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseImagePostCreateIntent, createLarkBaseSelectedImagePostCreator, buildLarkBaseImageAppendIntent, createLarkBaseSelectedImageAppender, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportTargets, buildInvitationImageCreateIntentRows } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs';
import { dryRunEligibility, prepareEligibilityRefresh, applyEligibilityReviewed } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_eligibility_runtime.mjs';
import { composition, config } from './support/selected-invitation-fixture.mjs';
const reviewHistory = ({records}) => records.every(r => r.fields.Eligibility === 'synthetic_eligible' && r.fields['External ID'] === 'synthetic-external' && r.fields.Creator[0].record_ids[0] === 'recSynthetic01');

async function fixture(t, writeOutcome = 'success', resume = false) {
  const c = composition({ writeOutcome });
  function select(authority, operationId) {
    const input = structuredClone(c.input);
    input.instanceProfile.profileId = input.expected.profileId = `synthetic-${operationId.replace(':', '-')}`;
    input.instanceProfile.authority = input.expected.authority = input.instanceProfile.routes[0].authority = authority;
    input.operationIds = input.instanceProfile.allowedOperations = [operationId];
    input.operationContracts = LARK_BASE_API_OPERATIONS.filter(o => o.operationId === operationId);
    return resolveLarkApiSelection(input);
  }
  c.input.principalProfiles[0].requiredScopes.push('base:record:update', 'base:field:read', 'docs:document.media:upload');
  const appendSelection = select('write', 'attachments:append');
  const uploadSelection = select('write', 'media:upload'), mediaSelection = select('read', 'media:download');
  const mediaReader = createLarkBaseHistoryMediaReader({ readSelection: c.selection, mediaSelection, transportFactory: c.transportFactory,
    tables: [{ tableId: config.invitationStateTableId, attachmentFieldIds: [config.fieldIds.stateAvatar] }] });
  const reader = { ...c.client, attachmentSha256: mediaReader.attachmentSha256,
    listRecords: (base, table, options) => table === config.invitationStateTableId ? mediaReader.listRecords(base, table) : c.client.listRecords(base, table, options) };
  const manifest = await exportTargets({ client: reader, config });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'invitation-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  const avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  const observation = { contractVersion: 'invitation-eligibility-observations/v1', observedAt: '2030-02-01T00:00:00Z', rowCount: 1,
    creators: [{ accountKey: 'synthetic.creator', result: 'observed', eligibility: 'synthetic_eligible', externalUserId: 'synthetic-external', nickname: 'Synthetic Creator', avatar }] };
  if (resume) c.state.history.push({ record_id: 'recResume', fields: { Creator: [{ record_ids: ['recSynthetic01'] }],
    Eligibility: 'synthetic_eligible', Observed: Date.parse(observation.observedAt), Nickname: 'Synthetic Creator', 'External ID': 'synthetic-external' } });
  const plan = await dryRunEligibility({ client: reader, config, manifest, observations: observation, reviewHistory, outputPlan: path.join(directory, 'plan.json') });
  const prepared = await prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory });
  const [row] = resume ? [{}] : buildInvitationImageCreateIntentRows({ prepared });
  const intent = resume ? buildLarkBaseImageAppendIntent({ appendSelection, uploadSelection, tableId: config.invitationStateTableId,
    avatarField: prepared.bindings.state.avatar, baselineRecord: c.state.history[0], baselineAttachments: [], avatar, planSha256: plan.planSha256 })
    : buildLarkBaseImagePostCreateIntent({ createSelection: c.writeSelection, appendSelection, uploadSelection,
    tableId: config.invitationStateTableId, fieldBindings: Object.values(prepared.bindings.state).filter(f => Object.hasOwn(row.fields, f.name)),
    record: { fields: row.fields }, avatarField: prepared.bindings.state.avatar, avatar, planSha256: plan.planSha256 });
  const events = [];
  const writer = (resume ? createLarkBaseSelectedImageAppender : createLarkBaseSelectedImagePostCreator)({ createSelection: c.writeSelection, appendSelection, uploadSelection, readSelection: c.selection, mediaSelection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.intentSha256 === intent.intentSha256,
    onEvent: event => { events.push(event); } });
  const client = { ...reader, ...writer };
  return { c, reader, plan, events, file, prepared,
    apply: overrides => applyEligibilityReviewed({ client, config, reviewed: plan, reviewHistory,
      args: { expectSha256: plan.planSha256, confirmCreate: resume ? 0 : 1, confirmUpdate: 0, confirmAttach: 1, confirmAlreadyApplied: 0, ...overrides } }),
    replan: () => prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory }) };
}

for (const outcome of ['success', 'lost']) test(`typed invitation image create through selected CLI: ${outcome}`, async t => {
  const f = await fixture(t, outcome);
  if (outcome === 'lost') {
    await assert.rejects(f.apply(), e => e.uncertainWrite === true);
    assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, 1);
    assert.equal((await f.replan()).counts.attach, 1);
  } else {
    assert.equal((await f.apply()).verified, true);
    assert.deepEqual((await f.replan()).counts, { create: 0, update: 0, attach: 0, alreadyApplied: 1 });
    assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, 3);
    assert.equal(f.events.filter(x => x.stage === 'verified').length, 1);
    const bound = f.events.find(x => x.stage === 'append-bound');
    assert.equal(bound.appendIntent.baselineRecord.record_id, f.c.state.history[0].record_id);
    assert.equal(bound.planSha256, f.plan.planSha256);
  }
  const calls = f.c.state.calls.filter(x => x[1] === 'POST').length;
  await assert.rejects(f.apply(), /live plan differs/);
  assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, calls);
});

for (const resume of [false, true]) test(`typed invitation append response loss is reconciled without resend; existing=${resume}`, async t => {
  const f = await fixture(t, 'lost-append', resume);
  await assert.rejects(f.apply(), e => e.uncertainWrite === true);
  assert.deepEqual((await f.replan()).counts, { create: 0, update: 0, attach: 0, alreadyApplied: 1 });
  const calls = f.c.state.calls.filter(x => x[1] === 'POST').length;
  assert.equal(calls, resume ? 2 : 3);
  await assert.rejects(f.apply(), /live plan differs/);
  assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, calls);
});

test('typed invitation exact image-empty history resumes without creating another row', async t => {
  const f = await fixture(t, 'success', true), before = structuredClone(f.c.state.history[0].fields);
  assert.deepEqual(f.plan.counts, { create: 0, update: 0, attach: 1, alreadyApplied: 0 });
  assert.equal((await f.apply()).verified, true);
  const { Avatar, ...rest } = f.c.state.history[0].fields;
  assert.deepEqual(rest, before); assert.equal(Avatar.length, 1);
  assert.equal(f.c.state.calls.filter(x => x[2]?.endsWith('/records/batch_create')).length, 0);
});

test('image template rejects mixed side effects instead of dropping them', async t => {
  const f = await fixture(t);
  for (const change of ['blocked', 'update', 'attach', 'multiple', 'no-image']) {
    const prepared = structuredClone(f.prepared);
    if (change === 'blocked') prepared.blocked = true;
    if (change === 'update') prepared.corePlan.updates.push({});
    if (change === 'attach') prepared.corePlan.attachExisting.push({});
    if (change === 'multiple') prepared.corePlan.creates.push(structuredClone(prepared.corePlan.creates[0]));
    if (change === 'no-image') prepared.corePlan.creates[0].avatar = null;
    assert.throws(() => buildInvitationImageCreateIntentRows({ prepared }));
  }
  assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, 0);
});

test('invitation avatar plan rejects missing confirmation, changed file and stale fields before create', async t => {
  for (const change of ['count', 'file', 'field']) {
    const f = await fixture(t);
    if (change === 'file') fs.writeFileSync(f.file, 'changed');
    if (change === 'field') f.c.profileFields.find(x => x.field_id === 'fldStatus').property.options[0].id = 'changed';
    await assert.rejects(f.apply(change === 'count' ? { confirmAttach: 0 } : {}));
    assert.equal(f.c.state.calls.filter(x => x[1] === 'POST').length, 0);
  }
});
