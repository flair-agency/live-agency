import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fixture } from '../packages/lark-transport/test-support/api-selection-fixture.js';
import { resolveLarkApiSelection, createLarkSelectedCliTransport } from '../packages/lark-transport/src/index.js';
import { createLarkBaseSelectedHistoryReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportLiveHistoryTargets, prepareLiveHistoryPlan } from '../skills/live-agency-creator-live-observation-record/scripts/live_history_lark_runtime.mjs';
import { livePlanIsBlocked } from '../skills/live-agency-creator-live-observation-record/scripts/live_history_sync_core.mjs';

const NOW=Date.parse('2030-01-31T03:04:05Z'), START=Date.parse('2030-01-30T01:00:00Z'), END=START+3600000;
const config={appToken:'baseSyntheticLive',creatorTableId:'tblCreators',liveTableId:'tblLives',metricTableId:'tblMetrics',dueViewId:'vewDue',fieldIds:{}};
const groups={creator:[['account','Text'],['latestLiveAt','Lookup'],['liveDays30d','Formula'],['liveHours30d','Formula'],['likes30d','Lookup']],
 live:[['start','DateTime'],['end','DateTime'],['creator','DuplexLink'],['likes','Number']],
 metric:[['timestamp','DateTime'],['creator','DuplexLink'],['fanClub','Number'],['latestLiveAt','DateTime'],['liveDays30d','Number'],['liveHours30d','Number'],['likes30d','Number']]};
const fields=Object.fromEntries(Object.entries(groups).map(([group,items])=>[group,items.map(([name,type])=>{
 const key=group+name[0].toUpperCase()+name.slice(1);const id='fld'+key;config.fieldIds[key]=id;
 return{field_id:id,field_name:key,ui_type:type,...(type==='DuplexLink'?{property:{table_id:config.creatorTableId,multiple:false}}:{})};
})]));
function composition({incomplete=false}={}){
 const input=fixture('user');input.organizationProfile.claims.tenantKey={evidenceState:'verified',value:'synthetic-key'};
 input.principalProfiles[0].requiredScopes=['bitable:app:readonly'];
 Object.assign(input.instanceProfile,{service:'lark-base',domain:'creator-scouting',allowedOperations:['fields:list','records:list']});
 Object.assign(input.instanceProfile.routes[0],{service:'lark-base',domain:'creator-scouting',resourceId:config.appToken});
 input.operationIds=['fields:list','records:list'];input.operationContracts=LARK_BASE_API_OPERATIONS.filter(o=>input.operationIds.includes(o.operationId));
 input.expected=Object.fromEntries(['profileId','organizationProfileId','service','domain','authority'].map(k=>[k,input.instanceProfile[k]]));
 const selection=resolveLarkApiSelection(input);
 const state={fields:structuredClone(fields),creators:[{record_id:'recLiveCreator',fields:{creatorAccount:'synthetic.live'}}],lives:[],metrics:[],due:true,calls:[]};
 const transportFactory=options=>createLarkSelectedCliTransport({...options,homeDirectory:'/synthetic',runCli:async(args,context)=>{
  state.calls.push(args);let data;
  if(args[0]==='--version')return{status:0,stdout:'lark-cli version 1.0.93',stderr:''};
  if(args[0]==='auth')return{status:0,stdout:JSON.stringify({appId:'synthetic-app',brand:'lark',identities:{user:{available:true,verified:true,status:'ready',openId:'synthetic-user',scope:'bitable:app:readonly'}}}),stderr:''};
  assert.equal(args[1],'GET','read preparation must not issue a write');
  if(args[2].includes('/authen/'))data={open_id:'synthetic-user',tenant_key:'synthetic-key'};
  else{
   const group=args[2].includes('/tables/tblCreators/')?'creator':args[2].includes('/tables/tblLives/')?'live':'metric';
   const isFields=args[2].endsWith('/fields');const query=JSON.parse(readFileSync(join(context.cwd,'params.json')));
   const records=group==='creator'?(!state.due&&query.view_id?[]:state.creators):group==='live'?state.lives:state.metrics;
   data=isFields?{items:state.fields[group],has_more:false}:incomplete?{items:records,has_more:true,page_token:'remaining'}:records.length?{items:records,has_more:false,total:records.length}:{has_more:false,total:0};
  }
  return{status:0,stdout:JSON.stringify({ok:true,identity:'user',data}),stderr:''};
 }});
 const client=createLarkBaseSelectedHistoryReader({selection,transportFactory,baseToken:config.appToken,maxPages:1,tables:[{tableId:config.creatorTableId,viewIds:[config.dueViewId]},{tableId:config.liveTableId,viewIds:[]},{tableId:config.metricTableId,viewIds:[]}]});
 return{client,state};
}
const observed=()=>({observedAt:new Date(NOW).toISOString(),rowCount:1,creators:[{creatorRecordId:'recLiveCreator',accountKey:'synthetic.live',observedAt:new Date(NOW).toISOString(),fanClubCount:456,fanClubStatus:'observed_exact',liveScan:{mode:'incremental',stopReason:'history-end',knownMatchCount:0},lives:[{startAt:new Date(START).toISOString(),endAt:new Date(END).toISOString(),likeCount:789,likeStatus:'observed_exact'}]}]});
const live=(id,end=END)=>({record_id:id,fields:{liveStart:START,liveEnd:end,liveCreator:[{record_ids:['recLiveCreator']}],liveLikes:789}});
async function plan(c,manifest){return(await prepareLiveHistoryPlan({client:c.client,config,manifest,observations:observed(),nowMs:NOW})).plan;}
const targets=c=>exportLiveHistoryTargets({client:c.client,config,nowMs:NOW});

test('three selected tables with complete-empty histories produce independent session and metric plans',async()=>{
 const c=composition(),manifest=await targets(c);const p=await plan(c,manifest);
 assert.equal(manifest.rows[0].liveContext.knownEvents.length,0);assert.equal(p.summary.liveCreateCount,1);assert.equal(p.summary.metricCreateCount,1);assert.equal(livePlanIsBlocked(p),false);
 assert.deepEqual(Object.keys(c.client),['listFields','listRecords']);
 assert(c.state.calls.some(a=>a.includes('/open-apis/bitable/v1/apps/baseSyntheticLive/tables/tblMetrics/records')));
});
test('same creator/start with a different end blocks the plan after fresh selected history read',async()=>{
 const c=composition(),manifest=await targets(c);c.state.lives.push(live('recConflict',END+60000));const p=await plan(c,manifest);
 assert.equal(livePlanIsBlocked(p),true);assert.equal(p.summary.liveConflictCount,1);assert.equal(p.summary.liveCreateCount,0);
});
test('conflicting stored anchors stop target export instead of becoming two sessions',async()=>{
 const c=composition();c.state.lives.push(live('recAnchor1'),live('recAnchor2',END+60000));await assert.rejects(targets(c),/end time conflicts/);
});
test('changed due membership is a target issue in fresh selected preparation',async()=>{
 const c=composition(),manifest=await targets(c);c.state.due=false;const p=await plan(c,manifest);
 assert.equal(livePlanIsBlocked(p),true);assert.equal(p.summary.targetIssueCount,1);assert.equal(p.operations.targetIssues[0].reason,'not_in_due_view');
});
test('wrong metric relation and incomplete pages stop before a plan is accepted',async()=>{
 const c=composition();c.state.fields.metric.find(f=>f.ui_type==='DuplexLink').property.table_id='tblOther';await assert.rejects(targets(c),/relation target changed/);
 await assert.rejects(targets(composition({incomplete:true})),/page bound exhausted/);
});
