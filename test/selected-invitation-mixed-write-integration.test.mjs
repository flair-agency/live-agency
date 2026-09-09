import test from 'node:test';
import { normalizeInvitationEligibilityLookup } from '../providers/backstage/src/invitation-eligibility.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { buildLarkBaseHistoryWriteIntent, createLarkBaseSelectedHistoryWriter, buildLarkBaseTimestampUpdateIntent, buildLarkBaseCreateIntent, buildLarkBaseImagePostBatchCreateIntent, buildLarkBaseImageAppendIntent, createLarkBaseSelectedImageAppender, createLarkBaseHistoryMediaReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportTargets, buildInvitationHistoryWritePayloads } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs';
import { dryRunEligibility, prepareEligibilityRefresh, applyEligibilityReviewed } from '../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_eligibility_runtime.mjs';
import { composition, config } from './support/selected-invitation-fixture.mjs';
const defaultReviewHistory = ({records}) => records.every(r => r.fields.Eligibility === 'synthetic_eligible' && ['recSynthetic01','recSynthetic02','recSynthetic03'].includes(r.fields.Creator[0].record_ids[0]));

async function fixture(t, writeOutcome = 'success', options = {}) {
  const c = composition({ writeOutcome });
  const reviewHistory=options.sourceHandoff?({records})=>records.every(r=>r.fields.Eligibility==='対象'&&['100','101','102'].includes(r.fields['External ID'])):defaultReviewHistory;
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
  let manifest = await exportTargets({ client: reader, config });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'invitation-image-create-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, bytes, { mode: 0o600 });
  const avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
  const secondFile=path.join(directory,'second.png');fs.writeFileSync(secondFile,Buffer.from('different synthetic image'));
  const secondAvatar={...avatar,path:secondFile,name:'second.png',size:25,sha256:createHash('sha256').update(fs.readFileSync(secondFile)).digest('hex')};
  let observation={contractVersion:'invitation-eligibility-observations/v1',observedAt:'2030-02-01T00:00:00Z',rowCount:3,
    creators:manifest.rows.map((r,i)=>({accountKey:r.accountKey,result:'observed',eligibility:'synthetic_eligible',externalUserId:'synthetic-external-'+i,nickname:'Synthetic '+i,...(i===1?{}:{avatar:i===0?avatar:secondAvatar})}))};
  c.state.history.push(...[0,1].map(i=>({record_id:'recExisting'+i,fields:{Creator:[{record_ids:['recSynthetic0'+(i+1)]}],Eligibility:'synthetic_eligible',Nickname:'Synthetic '+i,'External ID':'synthetic-external-'+i,Observed:Date.parse(i===0?'2030-02-01T00:00:00Z':'2030-01-01T00:00:00Z')}})));
  if(options.only){
    const keep=options.only==='update'?1:options.only==='append'?0:2;
    manifest=await exportTargets({client:reader,config,mode:'selected',selectedAccounts:[manifest.rows[keep].accountKey]});
    observation.creators=observation.creators.filter((_,i)=>i===keep);observation.rowCount=1;
  }
  if(options.noNewImage)delete observation.creators.at(-1).avatar;
  if(options.sourceHandoff){
    c.profileFields.find(f=>f.field_id==='fldStatus').property.options=[{id:'optEligible',name:'対象'}];
    c.state.history.forEach((r,i)=>{r.fields.Eligibility='対象';r.fields['External ID']=String(100+i);});
    observation=normalizeInvitationEligibilityLookup({observedAt:observation.observedAt,rows:observation.creators.map((r,i)=>({accountKey:r.accountKey,
      eligibilityLabel:'対象',invitationSubtype:'プレミアム',anchorId:String(100+i),nickname:r.nickname,avatar:r.avatar?{...r.avatar,sourceUrl:'https://example.invalid/private'}:null}))});
  }
  const plan = await dryRunEligibility({ client: reader, config, manifest, observations: observation, reviewHistory, outputPlan: path.join(directory, 'plan.json') });
  const prepared = await prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory });
  const payloads=buildInvitationHistoryWritePayloads({prepared});
  const rows=payloads.creates, used=new Set(rows.flatMap(r=>Object.keys(r.fields)));
  const createIntent=!rows.length?null:!rows.some(r=>r.avatar)?buildLarkBaseCreateIntent({selection:c.writeSelection,tableId:config.invitationStateTableId,fieldBindings:Object.values(prepared.bindings.state).filter(f=>used.has(f.name)),records:rows.map(({fields})=>({fields})),planSha256:plan.planSha256}):buildLarkBaseImagePostBatchCreateIntent({createSelection:c.writeSelection,appendSelection,uploadSelection,tableId:config.invitationStateTableId,
    fieldBindings:Object.values(prepared.bindings.state).filter(f=>used.has(f.name)),rows,avatarField:prepared.bindings.state.avatar,planSha256:plan.planSha256});
  const updateIntent=!payloads.updates.length?null:buildLarkBaseTimestampUpdateIntent({selection:c.updateSelection,tableId:config.invitationStateTableId,timestampField:prepared.bindings.state.observedAt,
    baselineRecords:c.state.history.filter(r=>payloads.updates.some(x=>x.record_id===r.record_id)),records:payloads.updates,planSha256:plan.planSha256});
  const appendIntents=payloads.appendExisting.map(x=>buildLarkBaseImageAppendIntent({appendSelection,uploadSelection,tableId:config.invitationStateTableId,
    avatarField:prepared.bindings.state.avatar,baselineRecord:c.state.history.find(r=>r.record_id===x.recordId),baselineAttachments:[],avatar:x.avatar,planSha256:plan.planSha256}));
  const intentArgs={createSelection:c.writeSelection,updateSelection:c.updateSelection,appendSelection,uploadSelection,createIntent,updateIntent,appendIntents};
  const intent=buildLarkBaseHistoryWriteIntent(intentArgs),events=[];
  const transportFactory=opts=>{
    const transport=c.transportFactory(opts),request=transport.request.bind(transport),preflight=transport.preflight.bind(transport);
    return {...transport,async preflight(){if(options.deny===opts.selection.binding.operationContracts[0].operationId)throw Error('denied downstream');return preflight();},
      async request(id,args){const result=await request(id,args);if(id==='records:batch-update'&&options.wrongUpdate)c.state.history[1].fields.Nickname='Changed';return result;}};
  };
  const writer=createLarkBaseSelectedHistoryWriter({...intentArgs,readSelection:c.selection,mediaSelection,transportFactory,intent,approvedIntentSha256:intent.intentSha256,
    authorizeIntent:actual=>actual.intentSha256===intent.intentSha256,onEvent:event=>{events.push(event);if(options.eventFailure===event.stage)throw Error('event unavailable');}});
  const client = { ...reader, ...writer };
  return { c, reader, plan, events, file, prepared, intentArgs, intent, writer, payloads, secondFile,
    apply: overrides => applyEligibilityReviewed({ client, config, reviewed: plan, reviewHistory,
      args: { expectSha256: plan.planSha256, confirmCreate:prepared.counts.create, confirmUpdate:prepared.counts.update, confirmAttach:prepared.counts.attach, confirmAlreadyApplied:prepared.counts.alreadyApplied, ...overrides } }),
    replan: () => prepareEligibilityRefresh({ client: reader, config, manifest, observations: observation, reviewHistory }) };
}



const writes=f=>f.c.state.calls.filter(x=>['POST','PUT'].includes(x[1]));
test('mixed invitation plan preserves update/create/existing-image/new-image order',async t=>{
 const f=await fixture(t);assert.deepEqual(f.prepared.counts,{create:1,update:1,attach:2,alreadyApplied:0});
 assert.equal((await f.apply()).verified,true);
 assert.deepEqual((await f.replan()).counts,{create:0,update:0,attach:0,alreadyApplied:3});
 assert.equal(f.c.state.history.length,3);
 assert.deepEqual(writes(f).map(x=>x[2].split('/').at(-1)),['batch_update','batch_create','upload_all','append_attachments','upload_all','append_attachments']);
 assert(f.events.every(e=>e.intentSha256===f.intent.intentSha256));assert.equal(f.events.at(-1).stage,'plan-verified');
 const count=writes(f).length;await assert.rejects(f.apply());assert.equal(writes(f).length,count);
});
test('mixed plan verifies all later files and credentials before updating first row',async t=>{
 for(const kind of ['file','permission','baseline']){
  const f=await fixture(t,'success',{deny:kind==='permission'?'attachments:append':null});
  if(kind==='file')fs.writeFileSync(f.secondFile,'evil');
  if(kind==='baseline')f.c.state.history[0].fields.Nickname='Changed';
  await assert.rejects(f.writer.batchUpdate(config.appToken,config.invitationStateTableId,f.payloads.updates));assert.equal(writes(f).length,0);
 }
});
test('mixed plan stops successors on lost update, unverified update or lost existing append',async t=>{
 for(const options of [{outcome:'lost',count:1},{wrongUpdate:true,count:1},{outcome:'lost-append',count:4},{eventFailure:'update-verified',count:1}]){
  const f=await fixture(t,options.outcome??'success',options);await assert.rejects(f.apply(),e=>e.uncertainWrite===true);
  assert.equal(writes(f).length,options.count);await assert.rejects(f.writer.batchCreate(config.appToken,config.invitationStateTableId,f.payloads.creates.map(({fields})=>({fields}))));
  assert.equal(writes(f).length,options.count);
 }
});
test('mixed intent rejects changed plan/destination, overlapping targets and modified parent',async t=>{
 const f=await fixture(t);for(const change of [{planSha256:'b'.repeat(64)},{tableId:'other'}]){
  const updateIntent=buildLarkBaseTimestampUpdateIntent({...f.intentArgs.updateIntent,...change,selection:f.c.updateSelection});
  assert.throws(()=>buildLarkBaseHistoryWriteIntent({...f.intentArgs,updateIntent}));
 }
 assert.throws(()=>buildLarkBaseHistoryWriteIntent({...f.intentArgs,appendIntents:[...f.intentArgs.appendIntents,...f.intentArgs.appendIntents]}));
 assert.throws(()=>buildInvitationHistoryWritePayloads({prepared:{...f.prepared,corePlan:{...f.prepared.corePlan,creates:Array(101).fill(f.prepared.corePlan.creates[0])}}}));
 assert.equal(writes(f).length,0);
});

test('optional stages preserve exact effects without inventing writes',async t=>{
 for(const options of [{only:'update'},{only:'append'},{only:'create'},{only:'create',noNewImage:true},{noNewImage:true}]){
  const f=await fixture(t,'success',options);const wanted=f.prepared.counts;
  assert.equal((await f.apply()).verified,true);
  assert.deepEqual((await f.replan()).counts,{create:0,update:0,attach:0,alreadyApplied:options.only?1:3});
  assert.equal(writes(f).length,Number(wanted.create>0)+Number(wanted.update>0)+2*wanted.attach);
 }
});

test('private eligibility normalizer feeds the complete mixed workflow without invitation subtype or source URLs',async t=>{
 const f=await fixture(t,'success',{sourceHandoff:true});assert.equal((await f.apply()).verified,true);
 assert.deepEqual((await f.replan()).counts,{create:0,update:0,attach:0,alreadyApplied:3});
 const output=JSON.stringify(f.c.state.history);assert(!output.includes('プレミアム'));assert(!output.includes('example.invalid/private'));
 assert(f.c.state.history.every(r=>r.fields.Eligibility==='対象'));
});
