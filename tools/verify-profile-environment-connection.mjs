import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Local synthetic composition proof, never a registry installation or live trial.
// Node >=22. Required absolute paths: --runtime-source DIR --provider-source DIR
// --skill-source DIR --out NEW_PRIVATE_DIR. Reuses existing local dependencies.
// report.json records scenario assertions, source hashes and unverified boundaries.
const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  const key = process.argv[i];
  assert(['--runtime-source', '--provider-source', '--skill-source', '--out'].includes(key) && !args[key]);
  assert(path.isAbsolute(process.argv[i + 1] ?? ''));
  args[key] = process.argv[i + 1];
}
for (const key of ['--runtime-source', '--provider-source', '--skill-source', '--out']) assert(args[key], `${key} required`);
const runtime = args['--runtime-source'], provider = args['--provider-source'], skill = args['--skill-source'], out = args['--out'];
await mkdir(out, { mode: 0o700 });
const load = file => import(pathToFileURL(file).href);
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
const digest = value => createHash('sha256').update(value).digest('hex');
const { prepareConnectionProof } = await load(path.join(runtime, 'scripts/prepare-connection-proof.mjs'));
const require = createRequire(path.join(runtime, 'package.json'));
const protocolSource = path.resolve(path.dirname(require.resolve('@flair-agency/provider-protocol')), '..');
const { prepareEnvironmentTargets, prepareEnvironmentProfilePlan } = await load(path.join(skill, 'src/profile-environment.mjs'));
const { prepareEnvironmentProfileWrite, applyEnvironmentProfileWrite, verifyEnvironmentProfileWrite } = await load(path.join(skill, 'src/profile-execution.mjs'));
const { parseArgs, run } = await load(path.join(skill, 'scripts/profile_environment.mjs'));
const nowMs = Date.now();
const observations = { observedAt: new Date(nowMs).toISOString(), rowCount: 1, creators: [{
  creatorRecordId: 'recCreator001', accountKey: 'synthetic', observedAt: new Date(nowMs).toISOString(),
  profile: { followerCount: 10, followerStatus: 'observed_exact', recentPostCount30d: null,
    recentPostStatus: 'not_available', latestPostAt: null, latestPostStatus: 'not_available',
    nickname: null, nicknameStatus: 'not_available', avatar: null, avatarStatus: 'not_available',
    featureObservationData: null, featureObservationStatus: 'not_available' },
}] };
const cases = [];
for (const scenario of ['success', 'approval-denied', 'lost-create-response', 'event-sink-failure-after-write']) {
  const c = await prepareConnectionProof({ out: path.join(out, scenario), runtimeSource: runtime, protocolSource });
  const moduleDirectory = path.join(c.out, 'node_modules/@connection-proof/platform/node_modules/@connection-proof/provider');
  const moduleFile = path.join(moduleDirectory, 'profile.mjs');
  await writeFile(moduleFile, `
import { profileWriteFixture } from ${JSON.stringify(pathToFileURL(path.join(provider, 'test/fixtures/profile-environment-write-fixture.js')).href)};
import { createCreatorProfileWriteExecutor } from ${JSON.stringify(pathToFileURL(path.join(provider, 'src/creator-profile-write.js')).href)};
export const fixture = profileWriteFixture();
const transportFactory = options => {
  const transport = fixture.transportFactory(options), original = transport.request.bind(transport);
  transport.request = async (id, request) => {
    const response = await original(id, request);
    if (id === 'records:batch-create' && ${JSON.stringify(scenario)} === 'lost-create-response') throw Error('synthetic response lost after mutation');
    return response;
  };
  return transport;
};
export const write = createCreatorProfileWriteExecutor({ transportFactory });
// Only this neutral read surface is synthetic; it is not the Provider read executor.
export async function read(request) {
  const {input, ...identity} = request;
  const output = { timestampMode: 'observed-at' };
  if (input.operation === 'read-creators') Object.assign(output, {
    creators: [{creatorRecordId:'recCreator001',accountKey:'synthetic'}], dueCreatorRecordIds:['recCreator001'],
  });
  else {
    if (JSON.stringify(input.creatorRecordIds) !== JSON.stringify(['recCreator001'])) throw Error('unexpected read scope');
    output.profileHistory = fixture.state.rows.map(row => ({valid:true,recordId:row.record_id,
      creatorRecordId:row.fields.profileCreator[0],timestampMs:row.fields.profileTimestamp,
      followerCount:row.fields.profileFollowerCount ?? null,recentPostCount30d:row.fields.profileRecentPostCount30d ?? null,
      latestPostAtMs:row.fields.profileLatestPostAt ?? null,nickname:row.fields.profileNickname ?? null,
      featureObservationJson:row.fields.profileFeatureObservationData ?? null,avatarHashes:[]}));
  }
  return {...identity,status:'done',output};
}
`, { mode: 0o600 });
  const { fixture } = await load(moduleFile);
  const environment = JSON.parse(await readFile(c.environment, 'utf8'));
  const selectedEnvironment = {environmentId:environment.environmentId, environmentKind:environment.environmentKind, platformId:environment.defaultPlatform};
  fixture.configuration.environment = selectedEnvironment;
  const configFile = path.join(c.out, 'write-configuration.json');
  await save(configFile, fixture.configuration);
  const manifestFile = path.join(moduleDirectory, 'package.json');
  const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
  const dependencyPath = environment.platforms.first.bindings['synthetic-sum/v1'].dependencyPath;
  for (const operation of ['read','write']) {
    const capability = `creator-profile-datastore-${operation}/v1`;
    manifest.liveAgencyProvider.bindings.push({id:`profile-${operation}`,provides:[capability],execution:{kind:'module',entry:'./profile.mjs'}});
    environment.platforms.first.bindings[capability] = {contractVersion:'1.0.0',dependencyPath,bindingId:`profile-${operation}`,exportName:operation,
      ...(operation === 'write' ? {configurationRef:configFile,configurationSha256:digest(await readFile(configFile))} : {})};
  }
  await save(manifestFile, manifest);
  await save(c.environment, environment);
  const {createEnvironmentAccess} = await load(path.join(c.runtimeDirectory, 'src/environment-access.mjs'));
  const access = await createEnvironmentAccess(c.environment);
  const cli = (operation, options = {}) => run(parseArgs([operation, '--environment', c.environment,
    '--generation', access.selection.generation, '--output', path.join(c.out, `${operation}.json`),
    ...Object.entries(options).flatMap(([key,value])=>[`--${key}`,String(value)])]), {createAccess:async()=>access});
  let review;
  if (scenario === 'success') {
    await save(path.join(c.out,'observations.json'),observations);
    await cli('targets',{limit:1});
    await cli('plan',{targets:path.join(c.out,'targets.json'),observations:path.join(c.out,'observations.json')});
    review = await cli('prepare-write',{plan:path.join(c.out,'plan.json')});
  } else {
    const targets = await prepareEnvironmentTargets({access,limit:1,nowMs});
    const planningReceipt = await prepareEnvironmentProfilePlan({access,targets,observations,nowMs});
    review = await prepareEnvironmentProfileWrite({access,planningReceipt});
  }
  const approval = {reference:'synthetic-test-only-not-owner-approval',planSha256:review.prepared.planSha256,createCount:1,attachCount:0};
  const events = [];
  const onEvent = async event => {
    if (scenario === 'event-sink-failure-after-write' && event.stage === 'write-call-returned') throw Error('synthetic event sink failure');
    events.push(event); await save(path.join(c.out,'events.json'),events);
  };
  const apply = () => applyEnvironmentProfileWrite({access,review,approval,authorize:async()=>scenario !== 'approval-denied',onEvent,sleep:async()=>{}});
  let result;
  if (scenario === 'approval-denied') {
    await assert.rejects(apply(), /not authorized/);
    assert.equal(fixture.state.rows.length,0);
    assert.equal(fixture.state.calls.filter(id=>['records:batch-create','media:upload','attachments:append'].includes(id)).length,0);
    result = {status:'denied',verified:false};
  } else if (scenario === 'event-sink-failure-after-write') {
    await assert.rejects(apply(),error=>error.uncertainWrite === true);
    const verification = await verifyEnvironmentProfileWrite({access,review});
    assert.equal(verification.verified,true);
    assert.equal(verification.planningReceipt.plan.summary.profileAlreadyAppliedCount,1);
    assert.equal(fixture.state.calls.filter(id=>id==='records:batch-create').length,1);
    result = {status:'uncertain-write-verified',verified:true};
  } else {
    if (scenario === 'success') {
      const options = {review:path.join(c.out,'prepare-write.json'),'expect-sha256':approval.planSha256,
        'confirm-profile-create':1,'confirm-profile-attach':0,'approval-ref':approval.reference,
        'journal-directory':path.join(c.out,'journal')};
      result = await cli('apply',options);
      assert.equal((await stat(result.journal)).mode & 0o077,0);
      const records = (await readFile(result.journal,'utf8')).trim().split('\n').map(line=>JSON.parse(line));
      assert(records.some(record=>record.event.stage==='approval-confirmed'));
      assert(records.some(record=>record.event.stage==='business-verified'));
      events.push(...records.map(record=>record.event));
      assert.equal((await cli('verify',{review:options.review})).verified,true);
      await assert.rejects(cli('apply',options),error=>error.code==='EEXIST' || /business plan changed/.test(error.message));
    } else result = await apply();
    assert.equal(result.status,'success');
    assert.equal(result.profileVerifiedCount,1);
    assert.equal((await verifyEnvironmentProfileWrite({access,review})).verified,true);
    assert.equal(fixture.state.rows.length,1);
    assert.equal(fixture.state.calls.filter(id=>id==='records:batch-create').length,1);
    assert.equal(result.recoveredFromAmbiguousResponse,scenario==='lost-create-response');
  }
  cases.push({scenario,status:result.status,verified:result.verified,createCalls:fixture.state.calls.filter(id=>id==='records:batch-create').length,
    recoveredFromAmbiguousResponse:result.recoveredFromAmbiguousResponse ?? false,events:events.length});
}
async function sourceHashes(root) {
  const files = {};
  async function walk(directory) {
    for (const entry of await readdir(directory,{withFileTypes:true})) {
      if (['.git','node_modules'].includes(entry.name)) continue;
      const file = path.join(directory,entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.isFile()) files[path.relative(root,file)] = digest(await readFile(file));
    }
  }
  await walk(root);
  return files;
}
const report = {version:1,status:'passed',cases,verifierSha256:digest(await readFile(new URL(import.meta.url))),sourceHashes:{runtime:await sourceHashes(runtime),provider:await sourceHashes(provider),skill:await sourceHashes(skill)},
  limits:['Local source composition; not registry installation/integrity proof.',
    'Actual Runtime module invocation, Provider write executor, selected writer, Skill planning/apply/verification; success also exercises CLI parsing, private journal and repeat-apply rejection. All transport is synthetic.',
    'Observation input and neutral read surface are synthetic; actual Provider scoped read executor is not exercised.',
    'Synthetic approval reference and callback exercise tests only; no actual owner approval or operational authority.',
    'One scalar history creation; avatar, existing attachment, live services, publication and production registration are not exercised.']};
await save(path.join(out,'report.json'),report);
console.log(JSON.stringify({status:report.status,cases,report:path.join(out,'report.json')}));
