import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseImageBatchCreateIntent, createLarkBaseSelectedImageBatchCreator, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
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
  for(const suffix of ['02','03'])c.state.records.push({record_id:'recSynthetic'+suffix,fields:{'Renamed Account':'synthetic.creator'+suffix}});
  const manifest = await exportProfileTargets({ client: reader, config, nowMs: NOW });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  const observation = observations();
  observation.creators[0].profile.avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  observation.creators[0].profile.avatarStatus = 'observed_exact';
  const secondFile=path.join(directory,'second.png');const secondBytes=Buffer.from('second synthetic image');fs.writeFileSync(secondFile,secondBytes);
  observation.creators=manifest.rows.map((row,i)=>{const item=structuredClone(observation.creators[0]);item.creatorRecordId=row.creatorRecordId;item.accountKey=row.accountKey;item.profile.followerCount=100+i;
    if(i===1){item.profile.avatar=null;item.profile.avatarStatus='not_available';}
    if(i===2)item.profile.avatar={...item.profile.avatar,path:secondFile,name:'second.png',size:secondBytes.length,sha256:createHash('sha256').update(secondBytes).digest('hex')};
    return item;});observation.rowCount=3;
  const { plan, bindings } = await prepareProfilePlan({ client: reader, config, manifest, observations: observation, nowMs: NOW });
  const rows = buildProfileCreateIntentRows({ plan, bindings });
  const intent = buildLarkBaseImageBatchCreateIntent({ createSelection: c.writeSelection, uploadSelection, tableId: config.profileTableId,
    fieldBindings: Object.values(bindings.profile).filter(f => rows.some(r=>Object.hasOwn(r.fields, f.name))), rows,
    avatarField: bindings.profile.avatar, planSha256: plan.planSha256 });
  const events = [];
  const writer = createLarkBaseSelectedImageBatchCreator({ createSelection: c.writeSelection, uploadSelection, readSelection: c.selection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.intentSha256 === intent.intentSha256,
    onEvent: event => { events.push(event); } });
  return { c, reader, plan, events, file:secondFile, apply: overrides => applyProfilePlan({ client: { ...reader, ...writer }, config, reviewedPlan: plan,
    apply: true, expectSha256: plan.planSha256, confirmProfileCreate: 3, confirmProfileAttach: 2, ...overrides }) };
}

for (const outcome of ['success', 'lost']) test(`three-row Profile image batch create and byte readback through selected CLI: ${outcome}`, async t => {
  const f = await fixture(t, outcome);
  const result = await f.apply();
  assert.equal(result.verified, true); assert.equal(result.profileCreatedCount, 3); assert.equal(result.profileAttachedCount, 2);
  assert.equal(result.recoveredFromAmbiguousResponse, outcome === 'lost');
  assert.equal(f.c.state.history.length, 3);
  assert.deepEqual(f.c.state.history[0].fields.Avatar, [{ file_token: 'syntheticUploadedImage' }]);
  assert.equal(f.c.state.history[1].fields.Avatar,undefined);
  assert.deepEqual(f.c.state.history[2].fields.Avatar,[{file_token:'syntheticUploadedImage2'}]);
  assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 3);
  assert.deepEqual(f.c.state.calls.filter(x=>x[1]==='POST').map(x=>x[2].split('/').at(-1)),['upload_all','upload_all','batch_create']);
  const repeat = await f.apply(); assert.equal(repeat.status, 'blocked');
  assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 3);
});

test('missing attachment approval or changed local image produces no POST', async t => {
  for (const change of ['count', 'file']) {
    const f = await fixture(t);
    if (change === 'file') fs.writeFileSync(f.file, 'changed');
    await assert.rejects(f.apply(change === 'count' ? { confirmProfileAttach: 0 } : {}));
    assert.equal(f.c.state.calls.filter(args => args[1] === 'POST').length, 0);
  }
});

test('partial batch creation preserves the acknowledged subset without automatic retry',async t=>{
 const f=await fixture(t,'partial');await assert.rejects(f.apply(),/automatic retry is disabled/);
 assert.equal(f.c.state.history.length,1);assert.equal(f.c.state.calls.filter(x=>x[2]?.endsWith('/records/batch_create')).length,1);
 const next=await f.apply();assert.equal(next.status,'blocked');assert.equal(next.stalePlanCount,1);
 assert.equal(f.c.state.calls.filter(x=>x[2]?.endsWith('/records/batch_create')).length,1);
});
