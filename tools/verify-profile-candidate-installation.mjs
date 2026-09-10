import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile, realpath, lstat, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Node >=22. Explicit coordinator invocation performs a local archive installation
// with selected registry access for transitive dependencies. No service invocation.
// All arguments require absolute paths; --out must name a new private directory.
const execute = promisify(execFile);
const load = file => import(pathToFileURL(file).href);
const json = async file => JSON.parse(await readFile(file, 'utf8'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const save = (file,value) => writeFile(file,JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
const options = {};
const required = ['runtime-source','provider-source','skill-source','platform-dir','catalog','npm-config','out'];
for (let i=2;i<process.argv.length;i+=2) {
  const key=process.argv[i]?.replace(/^--/,'');
  assert(process.argv[i]?.startsWith('--') && required.includes(key) && !Object.hasOwn(options,key),'unknown or repeated argument');
  assert(path.isAbsolute(process.argv[i+1] ?? ''),'absolute path required');
  options[key]=process.argv[i+1];
}
assert(required.every(key=>options[key]),'all source, catalog, npm-config and out arguments are required');
let out=options.out;
await mkdir(out,{mode:0o700});
out=await realpath(out);
const archivesDirectory=path.join(out,'archives');
await mkdir(archivesDirectory,{mode:0o700});
let stage='pack';
try {
  const sourceKeys=['runtime-source','provider-source','skill-source','platform-dir'];
  const sources=[],packageArchives={};
  const npmEnvironment=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/^npm_config_/i.test(key)));
  for (const key of sourceKeys) {
    const directory=options[key],manifest=await json(path.join(directory,'package.json'));
    const {stdout}=await execute('npm',['pack','--ignore-scripts','--json','--userconfig',options['npm-config'],
      '--globalconfig','/dev/null','--cache',path.join(out,'pack-cache'),'--pack-destination',archivesDirectory],
    {cwd:directory,env:npmEnvironment,maxBuffer:1024*1024});
    const [packed]=JSON.parse(stdout);
    assert.equal(packed.name,manifest.name);assert.equal(packed.version,manifest.version);
    const archive=path.join(archivesDirectory,packed.filename);
    packageArchives[manifest.name]=archive;
    sources.push({key,name:manifest.name,version:manifest.version,archiveSha256:digest(await readFile(archive)),
      archiveIntegrity:packed.integrity,manifestSha256:digest(await readFile(path.join(directory,'package.json')))});
  }
  stage='synthetic-configuration';
  const {profileWriteFixture}=await load(path.join(options['provider-source'],'test/fixtures/profile-environment-write-fixture.js'));
  const fixture=profileWriteFixture();
  const platformManifest=await json(path.join(options['platform-dir'],'package.json'));
  const platformId=platformManifest.liveAgencyPlatform.id;
  assert.equal(platformId,'tiktok');
  const skillIdentity=sources.find(item=>item.key==='skill-source');
  const skill=platformManifest.liveAgencyPlatform.skills.find(item=>item.package.name===skillIdentity.name);
  assert(skill && skill.status==='available' && skill.package.version===skillIdentity.version);
  const environment={environmentId:'profile-candidate-proof',environmentKind:'development',platformId};
  const writeConfiguration={...fixture.configuration,environment};
  const readConfiguration={schemaVersion:1,environment,authority:'read',destination:fixture.configuration.destination,
    selection:fixture.configuration.readSelection};
  const readFilePath=path.join(out,'synthetic-read.json'),writeFilePath=path.join(out,'synthetic-write.json');
  await save(readFilePath,readConfiguration);await save(writeFilePath,writeConfiguration);
  const installationRoot=path.join(out,'installed');
  const selection={environmentId:environment.environmentId,environmentKind:environment.environmentKind,installationRoot,
    platforms:[{id:platformId,descriptorFile:path.join(options['platform-dir'],'package.json'),skills:[skill.id]}],
    defaultPlatform:platformId,updatePolicy:{features:'manual',security:'manual'},packageArchives,
    services:[{id:'lark-base',platformId,configurationRefs:{
      'creator-profile-datastore-read/v1':readFilePath,'creator-profile-datastore-write/v1':writeFilePath,
    }}]};
  const selectionFile=path.join(out,'selection.json'),planFile=path.join(out,'plan.json');
  await save(selectionFile,selection);
  const {planEnvironment,installEnvironment}=await load(path.join(options['runtime-source'],'src/environment-setup.mjs'));
  stage='plan';
  const plan=await planEnvironment({catalogFile:options.catalog,selectionFile,planFile});
  assert.equal(plan.configuration.setup.services.length,1);
  stage='install';
  const installed=await installEnvironment({planFile,expectedPlanHash:plan.planHash,npmConfigFile:options['npm-config']});
  stage='installed-resources';
  const lock=await json(path.join(installationRoot,'package-lock.json'));
  const packageEvidence=[];
  const exportedPaths = value => typeof value==='string' ? [value]
    : value && typeof value==='object' ? Object.values(value).flatMap(exportedPaths) : [];
  for (const source of sources) {
    const directory=path.join(installationRoot,'node_modules',source.name),manifest=await json(path.join(directory,'package.json'));
    assert.equal(await realpath(directory),directory);
    assert.equal(manifest.name,source.name);assert.equal(manifest.version,source.version);
    const locked=lock.packages[`node_modules/${source.name}`];
    assert(locked.integrity && locked.resolved && !locked.link);
    assert.equal(locked.integrity,source.archiveIntegrity);
    const exports=[...new Set(exportedPaths(manifest.exports))];
    for (const entry of exports) {
      const file=path.resolve(directory,entry);
      assert(file.startsWith(directory+path.sep) && (await lstat(file)).isFile());
      if (/\.(mjs|js)$/.test(file)) await load(file);
    }
    packageEvidence.push({...source,installedIntegrity:locked.integrity,noSourceSymlink:true,exports,
      repository:manifest.repository ?? null});
  }
  const skillDirectory=path.join(installationRoot,'node_modules',skillIdentity.name);
  for (const resource of ['SKILL.md','scripts/profile_environment.mjs','src/profile-journal.mjs',
    'references/environment-workflow.md','references/normalized-profile-observations.md']) {
    assert((await lstat(path.join(skillDirectory,resource))).isFile());
  }
  assert((await readdir(path.join(skillDirectory,'agents'))).length>0);
  stage='installed-runtime-describe';
  const {stdout}=await execute(process.execPath,[installed.runtimeExecutable,'environment','describe','--environment',installed.environmentFile],{cwd:out});
  const description=JSON.parse(stdout);
  assert.equal(description.selection.generation,installed.selection.generation);
  stage='installed-skill-cli';
  const invalidReview=path.join(out,'invalid-review.json');await save(invalidReview,{});
  let rejection;
  try {
    await execute(process.execPath,[path.join(skillDirectory,'scripts/profile_environment.mjs'),'verify',
      '--environment',installed.environmentFile,'--generation',installed.selection.generation,
      '--review',invalidReview,'--output',path.join(out,'unexpected-result.json')],{cwd:out});
  } catch(error) { rejection=error; }
  assert(rejection,'invalid review must stop before any service invocation');
  const stopped=JSON.parse(rejection.stderr.trim());
  assert.match(stopped.message,/write review hash does not match/);
  assert.doesNotMatch(rejection.stderr,/ERR_MODULE_NOT_FOUND|MODULE_NOT_FOUND/);
  stage='registration-preview';
  const runtimeIdentity=sources.find(item=>item.key==='runtime-source');
  const {registerSkill}=await load(path.join(installationRoot,'node_modules',runtimeIdentity.name,'src/skill-registration.mjs'));
  const registration=await registerSkill({environmentFile:installed.environmentFile,expectedGeneration:installed.selection.generation,
    packageName:skillIdentity.name,packageVersion:skillIdentity.version,destination:path.join(out,'host-preview'),
    receiptFile:path.join(out,'registration.json'),dryRun:true});
  assert.equal(registration.status,'would-register');
  const report={version:1,status:'passed',verifierSha256:digest(await readFile(new URL(import.meta.url))),
    catalogSha256:digest(await readFile(options.catalog)),planHash:plan.planHash,selection:installed.selection,
    packages:packageEvidence,rootDependencies:(await json(path.join(installationRoot,'package.json'))).dependencies,
    capabilities:description.capabilities,skillCli:{runtimeResolved:true,stoppedBeforeInvocation:true,code:stopped.code},registration,
    limits:['Four local candidate archives; not proof of published candidate versions. Transitive dependencies use the explicitly selected registry configuration.',
      'Synthetic configurations only; no Provider operation, external business service, approval, write or business readback was invoked.',
      'Registration preview only; no host discovery registration or production selection changed.',
      'Resource/export and CLI resolution checks do not prove human understanding or service readiness.']};
  await save(path.join(out,'report.json'),report);
  console.log(JSON.stringify({status:'passed',report:path.join(out,'report.json')}));
} catch(error) {
  // Never forward npm output, configuration contents or authentication data.
  const code=typeof error.code==='string' && /^[A-Z_0-9]+$/.test(error.code) ? error.code : 'CANDIDATE_VERIFICATION_FAILED';
  await save(path.join(out,'failure.json'),{status:'failed',stage,code});
  console.error(JSON.stringify({status:'failed',stage,code}));
  process.exitCode=1;
}
