import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseImageCreateIntent, createLarkBaseSelectedImageCreator, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportProfileTargets, prepareProfilePlan, applyProfilePlan, buildProfileCreateIntentRows } from '../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs';
import { composition, config, NOW, observations } from './support/selected-profile-fixture.mjs';

async function fixture(t, writeOutcome = 'success') {
  const c = composition({ writeOutcome });
  function select(authority, operationId) {
    const input = structuredClone(c.input);
    input.instanceProfile.profileId = input.expected.profileId = `synthetic-${operationId.replace(':', '-')}`;
    input.instanceProfile.authority = input.expected.authority = input.instanceProfile.routes[0].authority = authority;
    input.operationIds = input.instanceProfile.allowedOperations = [operationId];
    input.operationContracts = LARK_BASE_API_OPERATIONS.filter(o => o.operationId === operationId);
    return resolveLarkApiSelection(input);
  }
  const uploadSelection = select('write', 'media:upload'), mediaSelection = select('read', 'media:download');
  const mediaReader = createLarkBaseHistoryMediaReader({ readSelection: c.selection, mediaSelection, transportFactory: c.transportFactory,
    tables: [{ tableId: config.profileTableId, attachmentFieldIds: [config.fieldIds.profileAvatar] }] });
  const reader = { ...c.client, attachmentSha256: mediaReader.attachmentSha256,
    listRecords: (base, table, options) => table === config.profileTableId ? mediaReader.listRecords(base, table) : c.client.listRecords(base, table, options) };
  const manifest = await exportProfileTargets({ client: reader, config, nowMs: NOW });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  const observation = observations();
  observation.creators[0].profile.avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  observation.creators[0].profile.avatarStatus = 'observed_exact';
  const { plan, bindings } = await prepareProfilePlan({ client: reader, config, manifest, observations: observation, nowMs: NOW });
  const [row] = buildProfileCreateIntentRows({ plan, bindings });
  const intent = buildLarkBaseImageCreateIntent({ createSelection: c.writeSelection, uploadSelection, tableId: config.profileTableId,
    fieldBindings: Object.values(bindings.profile).filter(f => Object.hasOwn(row.fields, f.name)), record: { fields: row.fields },
    avatarField: bindings.profile.avatar, avatar: row.avatar, planSha256: plan.planSha256 });
  const events = [];
  const writer = createLarkBaseSelectedImageCreator({ createSelection: c.writeSelection, uploadSelection, readSelection: c.selection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.intentSha256 === intent.intentSha256,
    onEvent: event => { events.push(event); } });
  return { c, reader, plan, events, file, apply: overrides => applyProfilePlan({ client: { ...reader, ...writer }, config, reviewedPlan: plan,
    apply: true, expectSha256: plan.planSha256, confirmProfileCreate: 1, confirmProfileAttach: 1, ...overrides }) };
}

for (const outcome of ['success', 'lost']) test(`full Profile image create and byte readback through selected CLI: ${outcome}`, async t => {
  const f = await fixture(t, outcome);
  const result = await f.apply();
  assert.equal(result.verified, true); assert.equal(result.profileCreatedCount, 1); assert.equal(result.profileAttachedCount, 1);
  assert.equal(result.recoveredFromAmbiguousResponse, outcome === 'lost');
  assert.equal(f.c.state.history.length, 1);
  assert.deepEqual(f.c.state.history[0].fields.Avatar, [{ file_token: 'syntheticUploadedImage' }]);
  assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 2);
  const repeat = await f.apply(); assert.equal(repeat.status, 'blocked');
  assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 2);
});

test('missing attachment approval or changed local image produces no POST', async t => {
  for (const change of ['count', 'file']) {
    const f = await fixture(t);
    if (change === 'file') fs.writeFileSync(f.file, 'changed');
    await assert.rejects(f.apply(change === 'count' ? { confirmProfileAttach: 0 } : {}));
    assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 0);
  }
});
