import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseImagePostBatchCreateIntent, createLarkBaseSelectedImagePostBatchCreator, buildLarkBaseImageAppendIntent, createLarkBaseSelectedImageAppender, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportTargets, buildInvitationImageBatchCreateIntentRows } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs';
import { dryRunEligibility, prepareEligibilityRefresh, applyEligibilityReviewed } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_eligibility_runtime.mjs';
import { composition, config } from './support/selected-invitation-fixture.mjs';
const reviewHistory = ({records}) => records.every(r => r.fields.Eligibility === 'synthetic_eligible' && ['recSynthetic01','recSynthetic02','recSynthetic03'].includes(r.fields.Creator[0].record_ids[0]));

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
  c.input.principalProfiles[0].requiredScopes.push('base:record:update', 'base:field:read', 'docs:document.media:upload');
  const appendSelection = select('write', 'attachments:append');
  const uploadSelection = select('write', 'media:upload'), mediaSelection = select('read', 'media:download');
  const mediaReader = createLarkBaseHistoryMediaReader({ readSelection: c.selection, mediaSelection, transportFactory: c.transportFactory,
    tables: [{ tableId: config.invitationStateTableId, attachmentFieldIds: [config.fieldIds.stateAvatar] }] });
  const reader = { ...c.client, attachmentSha256: mediaReader.attachmentSha256,
    listRecords: (base, table, options) => table === config.invitationStateTableId ? mediaReader.listRecords(base, table) : c.client.listRecords(base, table, options) };
  for(const suffix of ['02','03']) c.state.records.push({record_id:'recSynthetic'+suffix,fields:{'Renamed Account':{text:'synthetic.creator'+suffix}}});
  const manifest = await exportTargets({ client: reader, config });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'invitation-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  const avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  const secondFile=path.join(directory,'second.png');fs.writeFileSync(secondFile,Buffer.from('different synthetic image'));
  const secondAvatar={...avatar,path:secondFile,name:'second.png',size:25,sha256:createHash('sha256').update(fs.readFileSync(secondFile)).digest('hex')};
  const observation={contractVersion:'invitation-eligibility-observations/v1',observedAt:'2030-02-01T00:00:00Z',rowCount:3,
    creators:manifest.rows.map((r,i)=>({accountKey:r.accountKey,result:'observed',eligibility:'synthetic_eligible',externalUserId:'synthetic-external-'+i,nickname:'Synthetic '+i,...(i===1?{}:{avatar:i===0?avatar:secondAvatar})}))};
  const plan = await dryRunEligibility({ client: reader, config, manifest, observations: observation, reviewHistory, outputPlan: path.join(directory, 'plan.json') });
  const prepared = await prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory });
  const rows=buildInvitationImageBatchCreateIntentRows({prepared});
  const used=new Set(rows.flatMap(r=>Object.keys(r.fields)));
  const intent=buildLarkBaseImagePostBatchCreateIntent({createSelection:c.writeSelection,appendSelection,uploadSelection,tableId:config.invitationStateTableId,
    fieldBindings:Object.values(prepared.bindings.state).filter(f=>used.has(f.name)),rows,avatarField:prepared.bindings.state.avatar,planSha256:plan.planSha256});
  const events = [];
  const writer = createLarkBaseSelectedImagePostBatchCreator({ createSelection: c.writeSelection, appendSelection, uploadSelection, readSelection: c.selection, mediaSelection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: actual => actual.intentSha256 === intent.intentSha256,
    onEvent: event => { events.push(event); } });
  const client = { ...reader, ...writer };
  return { c, reader, plan, events, file, prepared,
    apply: overrides => applyEligibilityReviewed({ client, config, reviewed: plan, reviewHistory,
      args: { expectSha256: plan.planSha256, confirmCreate: 3, confirmUpdate: 0, confirmAttach: 2, confirmAlreadyApplied: 0, ...overrides } }),
    replan: () => prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory }) };
}


for(const outcome of ['success','lost','lost-append'])test(`three-row invitation image batch: ${outcome}`,async t=>{
  const f=await fixture(t,outcome);
  if(outcome==='success'){
    assert.equal((await f.apply()).verified,true);
    assert.deepEqual((await f.replan()).counts,{create:0,update:0,attach:0,alreadyApplied:3});
    assert.equal(f.c.state.history.length,3);
    assert.equal(f.c.state.history[1].fields.Avatar,undefined);
    assert.notEqual(f.c.state.history[0].fields.Avatar[0].file_token,f.c.state.history[2].fields.Avatar[0].file_token);
    assert.equal(f.c.state.calls.filter(x=>x[1]==='POST').length,5);
  }else{
    await assert.rejects(f.apply(),e=>e.uncertainWrite===true);
    assert.equal(f.c.state.calls.filter(x=>x[1]==='POST').length,outcome==='lost'?1:3);
    const remaining=await f.replan();assert.equal(remaining.counts.create,0);assert.equal(remaining.counts.attach,outcome==='lost'?2:1);
  }
  assert.equal(f.c.state.calls.filter(x=>x[2]?.endsWith('/records/batch_create')).length,1);
  const writes=f.c.state.calls.filter(x=>x[1]==='POST').length;await assert.rejects(f.apply());assert.equal(f.c.state.calls.filter(x=>x[1]==='POST').length,writes);
});
