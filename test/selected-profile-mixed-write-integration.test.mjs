import test from 'node:test';
import { buildProfileObservations, PROFILE_EVIDENCE_INPUT_KIND } from '../providers/tiktok-web/scripts/profile-observation-core.mjs';
import { validateProfileObservations } from '../providers/tiktok-web/src/profile-observation-contract.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseImageBatchCreateIntent, buildLarkBaseCreateIntent, buildLarkBaseImageAppendIntent, buildLarkBaseProfileWriteIntent, createLarkBaseSelectedProfileWriter, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportProfileTargets, prepareProfilePlan, applyProfilePlan, buildProfileCreateIntentRows, buildProfileHistoryWritePayloads } from '../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs';
import { composition, config, NOW, observations } from './support/selected-profile-fixture.mjs';

async function fixture(t, writeOutcome = 'success', options = {}) {
  const c = composition({ writeOutcome });
  function select(authority, operationId) {
    const input = structuredClone(c.input);
    input.instanceProfile.profileId = input.expected.profileId = `synthetic-${operationId.replace(':', '-')}`;
    input.instanceProfile.authority = input.expected.authority = input.instanceProfile.routes[0].authority = authority;
    input.operationIds = input.instanceProfile.allowedOperations = [operationId];
    input.operationContracts = LARK_BASE_API_OPERATIONS.filter(o => o.operationId === operationId);
    return resolveLarkApiSelection(input);
  }
  c.input.principalProfiles[0].requiredScopes.push('base:record:update','base:field:read','docs:document.media:upload');
  const appendSelection=select('write','attachments:append');
  const uploadSelection = select('write', 'media:upload'), mediaSelection = select('read', 'media:download');
  const mediaReader = createLarkBaseHistoryMediaReader({ readSelection: c.selection, mediaSelection, transportFactory: c.transportFactory,
    tables: [{ tableId: config.profileTableId, attachmentFieldIds: [config.fieldIds.profileAvatar] }] });
  const reader = { ...c.client, attachmentSha256: mediaReader.attachmentSha256,
    listRecords: (base, table, options) => table === config.profileTableId ? mediaReader.listRecords(base, table) : c.client.listRecords(base, table, options) };
  for(const suffix of ['02','03'])c.state.records.push({record_id:'recSynthetic'+suffix,fields:{'Renamed Account':'synthetic.creator'+suffix}});
  let manifest = await exportProfileTargets({ client: reader, config, nowMs: NOW });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  let observation = observations();
  observation.creators[0].profile.avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  observation.creators[0].profile.avatarStatus = 'observed_exact';
  const secondFile=path.join(directory,'second.png');const secondBytes=Buffer.from('second synthetic image');fs.writeFileSync(secondFile,secondBytes);
  observation.creators=manifest.rows.map((row,i)=>{const item=structuredClone(observation.creators[0]);item.creatorRecordId=row.creatorRecordId;item.accountKey=row.accountKey;item.profile.followerCount=100+i;
    if(i===1){item.profile.avatar=null;item.profile.avatarStatus='not_available';}
    if(i===2)item.profile.avatar={...item.profile.avatar,path:secondFile,name:'second.png',size:secondBytes.length,sha256:createHash('sha256').update(secondBytes).digest('hex')};
    return item;});observation.rowCount=3;
  if(options.only){const keep=options.only==='existing'?0:options.only==='plain'?1:2;
    observation.creators=observation.creators.filter((_,i)=>i===keep);observation.rowCount=1;
    manifest=await exportProfileTargets({client:reader,config,nowMs:NOW,mode:'selected',selectedAccounts:[manifest.rows[keep].accountKey]});}
  if(options.noNewImage){const item=observation.creators.at(-1);item.profile.avatar=null;item.profile.avatarStatus='not_available';}
  if(options.sourceHandoff){
    const evidence={version:2,inputKind:PROFILE_EVIDENCE_INPUT_KIND,observedAt:observation.observedAt,rowCount:observation.rowCount,
      creators:observation.creators.map(r=>({accountKey:r.accountKey,visibleAccountKey:r.accountKey,observedAt:r.observedAt,accountStatus:'observed',
        profile:{followerDisplay:String(r.profile.followerCount),avatar:r.profile.avatar,avatarAcquisition:{status:r.profile.avatar?'downloaded':'not_available'}},
        posts:{scanStatus:'not_available',items:[]}}))};
    observation=validateProfileObservations(buildProfileObservations(manifest,evidence));
  }
  const seed=structuredClone(observation);seed.creators.forEach(c=>{c.profile.avatar=null;c.profile.avatarStatus='not_available';});
  const preparedSeed=await prepareProfilePlan({client:reader,config,manifest,observations:seed,nowMs:NOW});
  const seedRows=buildProfileCreateIntentRows(preparedSeed);
  if(!options.only||options.only==='existing')c.state.history.push({record_id:'recResumeProfile',fields:{...seedRows[0].fields,Creator:[{record_ids:seedRows[0].fields.Creator}]}});
  const { plan, bindings } = await prepareProfilePlan({ client: reader, config, manifest, observations: observation, nowMs: NOW });
  const payloads=buildProfileHistoryWritePayloads({plan,bindings}),rows=payloads.creates;
  const fieldBindings=Object.values(bindings.profile).filter(f=>rows.some(r=>Object.hasOwn(r.fields,f.name)));
  const createIntent=!rows.length?null:rows.some(r=>r.avatar)?buildLarkBaseImageBatchCreateIntent({createSelection:c.writeSelection,uploadSelection,tableId:config.profileTableId,
    fieldBindings,rows,avatarField:bindings.profile.avatar,planSha256:plan.planSha256}):buildLarkBaseCreateIntent({selection:c.writeSelection,tableId:config.profileTableId,
    fieldBindings,records:rows.map(({fields})=>({fields})),planSha256:plan.planSha256});
  const appendIntents=payloads.appendExisting.map(item=>buildLarkBaseImageAppendIntent({appendSelection,uploadSelection,tableId:config.profileTableId,
    avatarField:bindings.profile.avatar,baselineRecord:c.state.history.find(r=>r.record_id===item.recordId),baselineAttachments:[],avatar:item.avatar,planSha256:plan.planSha256}));
  const intentArgs={createSelection:c.writeSelection,uploadSelection,appendSelection,createIntent,appendIntents},intent=buildLarkBaseProfileWriteIntent(intentArgs),events=[];
  const transportFactory=opts=>{const transport=c.transportFactory(opts),request=transport.request.bind(transport),preflight=transport.preflight.bind(transport);
    return {...transport,async preflight(){if(options.deny===opts.selection.binding.operationContracts[0].operationId)throw Error('downstream unavailable');return preflight();},
      async request(id,args){const result=await request(id,args);if(options.createLoss&&id==='records:batch-create')throw Error('create response lost');return result;}};};
  const writerArgs={...intentArgs,readSelection:c.selection,mediaSelection,transportFactory,intent,approvedIntentSha256:intent.intentSha256,
    authorizeIntent:actual=>actual.intentSha256===intent.intentSha256,onEvent:event=>{events.push(event);}};
  const writer=createLarkBaseSelectedProfileWriter(writerArgs);
  return { c, reader, plan, events, file:secondFile, payloads, intentArgs, intent, writerArgs, writer, apply: overrides => applyProfilePlan({ client: { ...reader, ...writer }, config, reviewedPlan: plan,
    apply: true, expectSha256: plan.planSha256, confirmProfileCreate: plan.summary.profileCreateCount, confirmProfileAttach: plan.summary.profileAttachCount, ...overrides }) };
}


const writes=f=>f.c.state.calls.filter(x=>x[1]==='POST');
for(const createLoss of [false,true])test('mixed Profile preserves existing-append then upload-before-create: lost create='+createLoss,async t=>{
 const f=await fixture(t,'success',{createLoss});assert.equal(f.plan.summary.profileCreateCount,2);assert.equal(f.plan.summary.profileAttachExistingCount,1);
 const result=await f.apply();assert.equal(result.verified,true);assert.equal(result.recoveredFromAmbiguousResponse,createLoss);
 assert.deepEqual(writes(f).map(x=>x[2].split('/').at(-1)),['upload_all','append_attachments','upload_all','batch_create']);
 assert.equal(f.c.state.history.length,3);assert.equal(f.c.state.history[1].fields.Avatar,undefined);
 assert.deepEqual(f.c.state.history[2].fields.Avatar,[{file_token:'syntheticUploadedImage2'}]);
 assert(f.events.every(e=>e.intentSha256===f.intent.intentSha256));
 assert.equal((await f.apply()).status,'blocked');assert.equal(writes(f).length,4);
});
test('new image and creation credentials are checked before existing image upload',async t=>{
 for(const options of [{file:true},{deny:'records:batch-create'}]){
  const f=await fixture(t,'success',options);if(options.file)fs.writeFileSync(f.file,'changed');
  await assert.rejects(f.writer.uploadMedia(config.appToken,f.payloads.appendExisting[0].avatar));assert.equal(writes(f).length,0);
 }
});
test('lost existing append stops the entire mixed plan without new uploads or creation',async t=>{
 const f=await fixture(t,'lost-append');await assert.rejects(f.apply(),/automatic retry is disabled/);
 assert.equal(f.c.state.history.length,1);assert.deepEqual(writes(f).map(x=>x[2].split('/').at(-1)),['upload_all','append_attachments']);
 assert.equal((await f.apply()).status,'blocked');assert.equal(writes(f).length,2);
});
test('optional Profile stages support append-only, create-only and image-free new rows',async t=>{
 for(const options of [{only:'existing'},{only:'plain'},{only:'image'},{noNewImage:true}]){
  const f=await fixture(t,'success',options);assert.equal((await f.apply()).verified,true);
  const summary=f.plan.summary;assert.equal(writes(f).length,Number(summary.profileCreateCount>0)+summary.profileAttachCount+summary.profileAttachExistingCount);
 }
});
test('Profile parent binds exact child plans, counts and row limits',async t=>{
 const f=await fixture(t);
 const changed=buildLarkBaseImageBatchCreateIntent({...f.intentArgs.createIntent,createSelection:f.c.writeSelection,uploadSelection:f.intentArgs.uploadSelection,
    ...f.intentArgs.createIntent.base,rows:f.payloads.creates,planSha256:'b'.repeat(64)});
 assert.throws(()=>buildLarkBaseProfileWriteIntent({...f.intentArgs,createIntent:changed}),/plan or destination/);
 assert.throws(()=>createLarkBaseSelectedProfileWriter({...f.writerArgs,intent:{...f.intent,createCount:99}}));
 assert.throws(()=>createLarkBaseSelectedProfileWriter({...f.writerArgs,approvedIntentSha256:'b'.repeat(64)}));
 assert.equal(writes(f).length,0);
});

test('private profile evidence normalization feeds mixed resume/create and byte readback',async t=>{
 const f=await fixture(t,'success',{sourceHandoff:true});const result=await f.apply();assert.equal(result.verified,true);
 assert.deepEqual(f.c.state.history.map(r=>r.fields.Followers),[100,101,102]);
 assert.equal(f.c.state.history[1].fields.Avatar,undefined);assert.equal((await f.apply()).status,'blocked');
 assert.equal(writes(f).length,4);
});
