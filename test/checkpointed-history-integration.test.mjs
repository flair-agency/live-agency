import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, realpath, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { selection } from '../providers/lark-base/test-support/image-create-selection.js';
import { buildLarkBaseCreateIntent, buildLarkBaseMultiHistoryWriteIntent, buildLarkBaseTimestampUpdateIntent } from '../providers/lark-base/src/index.js';
import { executeCheckpointedHistory as run } from '../runtime/src/checkpointed-history.mjs';
async function fixture(t, count = 101, update = false) {
 const directory = await mkdtemp(path.join(await realpath(os.tmpdir()), 'history-checkpoint-'));
 t.after(() => rm(directory, { recursive: true, force: true }));
 const createSelection = selection('write'), readSelection = selection('read');
 const updateSelection = selection('write', 'tenant', ['records:batch-update']);
 const fieldBindings = [{ id: 'fldName', name: 'Name', type: 'Text', property: null }];
 const timestampField = {id:'fldTime',name:'Time',type:'DateTime',property:null};
 const rows = update ? [{record_id:'recExisting',fields:{Time:1,Name:'Existing'}}] : [];
 const createIntents = [];
 for(let i=0;i<count;i+=100)createIntents.push(buildLarkBaseCreateIntent({selection:createSelection,tableId:'tblSynthetic',fieldBindings,
 records:Array.from({length:Math.min(100,count-i)},(_,j)=>({fields:{Name:'Synthetic '+(i+j)}})),planSha256:'a'.repeat(64)}));
 const updateIntents = update ? [buildLarkBaseTimestampUpdateIntent({selection:updateSelection,tableId:'tblSynthetic',timestampField,
 baselineRecords:structuredClone(rows),records:[{record_id:'recExisting',fields:{Time:2}}],planSha256:'a'.repeat(64)})] : [];
 const intent=buildLarkBaseMultiHistoryWriteIntent({createSelection,createIntents,updateSelection,updateIntents});
 const calls=[];let failure=null;
 const transportFactory=({selection:s,authorizeRequest})=>({binding:s.binding,bindingSha256:s.bindingSha256,async preflight(){},async request(id,req){
 assert.equal(authorizeRequest({...req,operation:s.binding.operationContracts.find(o=>o.operationId===id)},s.binding),true);
 if(id==='fields:list')return {code:0,data:{has_more:false,items:[...fieldBindings,timestampField].map(f=>({field_id:f.id,field_name:f.name,ui_type:f.type,property:f.property}))}};
 if(id==='records:list')return {code:0,data:{has_more:false,items:structuredClone(rows)}};
 calls.push(id);
 const result=req.json.records.map(r=>{
  if(id==='records:batch-update'){const row=rows.find(x=>x.record_id===r.record_id);Object.assign(row.fields,r.fields);return structuredClone(row);}
  const row={record_id:'recNew'+rows.length,fields:structuredClone(r.fields)};rows.push(row);return structuredClone(row);
 });
 if(failure==='lost'){failure=null;throw Error('lost response');}
 return {code:0,data:{records:result}};
 }});
 const args={location:{directory,runId:'synthetic'},createSelection,readSelection,updateSelection,transportFactory,intent,
 approvedIntentSha256:intent.intentSha256,authorizeIntent:async()=>true,onEvent:async event=>{
 if(failure==='after-ack'&&event.stage==='create-acknowledged'){failure=null;throw Error('interrupted after acknowledgement');}
 if(failure==='after-update'&&event.stage==='update-acknowledged'){failure=null;throw Error('interrupted after update');}
 }};
 return {args,rows,calls,fail:mode=>failure=mode};
}
test('acknowledged create resumes remaining batch without duplicating first 100 rows',async t=>{
 const f=await fixture(t);f.fail('after-ack');await assert.rejects(run(f.args));assert.equal(f.rows.length,100);
 const stored=JSON.parse(await readFile(path.join(f.args.location.directory,'synthetic.json')));
 assert.equal(stored.steps[0].acknowledgement.recordIds.length,100);
 assert.equal((await run(f.args)).verified,true);assert.equal(f.rows.length,101);assert.equal(f.calls.length,2);
 await run(f.args);assert.equal(f.calls.length,2);
});
test('lost create response stops without guessing matching rows or resending',async t=>{
 const f=await fixture(t);f.fail('lost');await assert.rejects(run(f.args));await assert.rejects(run(f.args),/no replay/);
 assert.equal(f.rows.length,100);assert.equal(f.calls.length,1);
});
test('completed timestamp update is reconciled against postcondition on restart',async t=>{
 const f=await fixture(t,1,true);f.fail('after-update');await assert.rejects(run(f.args));await run(f.args);
 assert.deepEqual(f.calls,['records:batch-update','records:batch-create']);assert.equal(f.rows[0].fields.Time,2);
});
test('changed acknowledged row stops before any remaining batch',async t=>{
 const f=await fixture(t);f.fail('after-ack');await assert.rejects(run(f.args));f.rows[0].fields.Name='Changed';
 await assert.rejects(run(f.args),/no replay/);assert.equal(f.calls.length,1);
});
test('changed approval and storage failure cause no writes',async t=>{
 const f=await fixture(t);await assert.rejects(run({...f.args,authorizeIntent:async()=>false}));assert.equal(f.calls.length,0);
 await assert.rejects(run({...f.args,location:{...f.args.location,directory:path.join(f.args.location.directory,'missing')}}));assert.equal(f.calls.length,0);
});
test('250-row plan resumes after second batch and verifies all earlier batches',async t=>{
 const f=await fixture(t,250);let acknowledged=0;
 const args={...f.args,onEvent:async e=>{if(e.stage==='create-acknowledged'&&++acknowledged===2)throw Error('second batch interrupted');}};
 await assert.rejects(run(args));assert.equal(f.rows.length,200);
 await run(f.args);assert.equal(f.rows.length,250);assert.equal(f.calls.length,3);
 f.rows[0].fields.Name='Drift after completion';await assert.rejects(run(f.args),/no replay/);assert.equal(f.calls.length,3);
});
test('lost timestamp response is reconciled using its exact known target and postcondition',async t=>{
 const f=await fixture(t,1,true);f.fail('lost');await assert.rejects(run(f.args));await run(f.args);
 assert.deepEqual(f.calls,['records:batch-update','records:batch-create']);
});
