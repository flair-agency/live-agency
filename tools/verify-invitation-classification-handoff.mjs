import assert from 'node:assert/strict';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

// Explicit source checkouts only. This verifier performs no installation,
// authenticated acquisition, datastore access or writes.
const args = process.argv.slice(2);
assert.equal(args.length, 4, 'use --provider-source ABSOLUTE --skill-source ABSOLUTE');
const options = {};
for (let i = 0; i < args.length; i += 2) {
  assert.ok(['--provider-source', '--skill-source'].includes(args[i]) && !options[args[i]]);
  assert.ok(path.isAbsolute(args[i + 1]));
  options[args[i]] = args[i + 1];
}
const load = file => import(pathToFileURL(file).href);
const {normalizeInvitationEligibilityLookupV2: normalize, normalizeInvitationEligibilityLookup: v1} =
  await load(path.join(options['--provider-source'], 'src/invitation-eligibility.js'));
const {buildClassifiedInvitationRefreshPlan: build} =
  await load(path.join(options['--skill-source'], 'src/invitation-classification.mjs'));

const labels = ['対象', '多重アカウントのリスク', 'クリエイターはすでに他のエージェンシーに参加しています',
  '他のエージェンシー所属', 'その他の理由', 'サポートされていない地域', '見つかりません'];
const statuses = labels.map((label, index) => ({id:`root-${index}`, label, parentId:null}));
statuses.push({id:'general', label:'対象（一般）', parentId:'root-0', invitationCategory:'一般'},
  {id:'premium', label:'対象（プレミアム）', parentId:'root-0', invitationCategory:'プレミアム'},
  {id:'reason-a', label:'その他の理由（A）', parentId:'root-4'});
const rows = labels.map((eligibilityLabel, index) => ({accountKey:`synthetic.${index}`, eligibilityLabel}));
rows[0].invitationSubtype = '一般';
rows.push({accountKey:'synthetic.premium', eligibilityLabel:'対象', invitationSubtype:'プレミアム'},
  {accountKey:'synthetic.parent', eligibilityLabel:'対象'});
const input = {observedAt:'2030-01-02T03:04:05Z', rows};
const observations = normalize(input);
const manifest = {version:1, targetMode:'selected', rowCount:rows.length,
  rows:rows.map(({accountKey}, index) => ({accountKey, creatorRecordId:`recSynthetic${index}`}))};
const bindings = Object.fromEntries(['creator','status','observedAt','nickname','avatar','externalUserId'].map(name => [name,{name}]));
const params = {observations, manifest, statuses, bindings, storedRecords:[]};
const fresh = await build(params);
assert.equal(fresh.plan.creates.length, 9);
assert.deepEqual(fresh.classification.observations.creators.map(row => row.state),
  ['対象（一般）', ...labels.slice(1), '対象（プレミアム）', '対象']);
assert.equal(fresh.classification.blocked, false);
assert.equal(v1(input).creators[0].eligibility, '対象');
assert.equal(Object.hasOwn(v1(input).creators[0], 'invitationCategory'), false);

const withEvidence = await build({...params, refinements:[{accountKey:'synthetic.4', statusId:'reason-a', evidenceRef:'synthetic-reviewed-evidence'}]});
assert.equal(withEvidence.classification.observations.creators[4].state, 'その他の理由（A）');
assert.notEqual(withEvidence.classification.inputSha256, fresh.classification.inputSha256);
assert.equal(fresh.classification.observations.creators[4].state, 'その他の理由');

const storedRecords = [{record_id:'recHistory', fields:{creator:[{record_ids:['recSynthetic0']}],
  status:'対象（一般）', observedAt:Date.parse('2030-01-01T03:04:05Z'), nickname:'', externalUserId:'', avatar:[]}}];
const stable = await build({...params, storedRecords});
assert.equal(stable.plan.updates.length, 1);
assert.equal(stable.plan.creates.length, 8);
const changedInput = structuredClone(input);
changedInput.rows[0].invitationSubtype = 'プレミアム';
const changed = await build({...params, storedRecords, observations:normalize(changedInput)});
assert.equal(changed.plan.updates.length, 0);
assert.equal(changed.plan.creates.length, 9);
assert.equal(changed.plan.creates[0].state, '対象（プレミアム）');
assert.deepEqual(params.observations, normalize(input));
console.log(JSON.stringify({status:'passed', cases:4, sourceRows:rows.length,
  categoryRetention:true, observedMissingRetained:true, separateRefinementEvidence:true,
  existingHistoryTransitions:true, externalOperations:0, businessWorkflowVerified:false}));
