import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Development-only, synthetic composition proof for Node >=22. Explicit local
// source paths are required; no installation, CLI, network or production access.
// The temporary copied packages and local content lock are removed even on failure.
const capability = 'record-dataset-read/v1';
const load = file => import(pathToFileURL(file).href);
const json = async file => JSON.parse(await readFile(file, 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });

export function parseArgs(argv) {
  const required = ['runtime-source', 'protocol-source', 'provider-source', 'skill-source', 'dependency-root'];
  const flags = [...required, 'observation-provider-source', 'source-fixture'];
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index]?.replace(/^--/, ''), value = argv[index + 1];
    assert(flags.includes(key) && argv[index] === `--${key}` && !Object.hasOwn(args, key), 'unknown or duplicate source flag');
    assert(path.isAbsolute(value ?? ''), `--${key} requires an absolute local path`);
    args[key] = value;
  }
  for (const key of required) assert(args[key], `--${key} is required`);
  assert(Boolean(args['observation-provider-source']) === Boolean(args['source-fixture']),
    'observation Provider and private synthetic source fixture must be selected together');
  return args;
}

// Same local content-integrity convention as Runtime prepareConnectionProof;
// this is not registry tarball integrity or an npm-ci installation claim.
async function contentIntegrity(root) {
  const digest = createHash('sha512');
  async function walk(directory) {
    for (const name of (await readdir(directory)).sort()) {
      if (name === 'node_modules') continue;
      const file = path.join(directory, name), info = await lstat(file);
      assert(!info.isSymbolicLink(), 'source links are forbidden in the synthetic fixture');
      if (info.isDirectory()) await walk(file);
      else {
        assert(info.isFile(), 'only regular distribution files are allowed');
        const bytes = await readFile(file);
        digest.update(JSON.stringify([path.relative(root, file), bytes.length]));
        digest.update(bytes);
      }
    }
  }
  await walk(root);
  return `sha512-${digest.digest('base64')}`;
}

async function copyDistribution(source, destination) {
  source = await realpath(source);
  const manifest = await json(path.join(source, 'package.json'));
  assert(Array.isArray(manifest.files), 'an explicit distribution file list is required');
  await mkdir(destination, { recursive: true });
  for (const item of ['package.json', ...manifest.files]) {
    assert(typeof item === 'string' && !/[*?]/.test(item), 'literal distribution resources are required');
    const file = path.resolve(source, item);
    assert(file.startsWith(source + path.sep), 'distribution resource must stay inside its selected package');
    await cp(file, path.join(destination, item), { recursive: true, dereference: false });
  }
  return { manifest, source, integrity: await contentIntegrity(destination) };
}

function syntheticInputs(configuration, environment) {
  const creator = 'recSyntheticCreatorA', otherCreator = 'recSyntheticCreatorB';
  const historyId = 'recSyntheticHistoryA', timestamp = Date.parse('2030-01-02T03:04:05Z');
  configuration.environment = environment;
  configuration.budgets = { maxSearchIds: 10, pageSize: 100, maxPages: 10, maxRecords: 100, maxElapsedMs: 10000 };
  const scalar = (fieldId, serviceType, type = 'string', optional = false) => ({
    fieldId, serviceTypes: [serviceType], type, cardinality: 'one', optional,
  });
  configuration.datasets.statuses = { tableId: 'tblSyntheticStatuses', fields: {
    label: scalar('fldSyntheticLabel', 'Text'),
    parent: { ...scalar('fldSyntheticParent', 'DuplexLink', 'record-reference', true), targetDataset: 'statuses' },
  }, queries: { all: { kind: 'all' } } };
  Object.assign(configuration.datasets.history.fields, {
    state: scalar('fldSyntheticState', 'Text'),
    externalUserId: scalar('fldSyntheticExternalId', 'Text', 'string', true),
    nickname: scalar('fldSyntheticNickname', 'Text', 'string', true),
  });
  configuration.selection.instanceProfile.resource.tables.statuses = 'tblSyntheticStatuses';
  const field = (field_id, field_name, ui_type, type, property) => ({
    field_id, field_name, ui_type, type, ...(property ? { property } : {}),
  });
  const historyRow = (record_id, owner) => ({ record_id, fields: {
    'Synthetic owner': { link_record_ids: [owner] }, 'Synthetic observed at': timestamp - 1000,
    'Synthetic images': [], 'Synthetic state': 'synthetic-child',
    'Synthetic external ID': 'synthetic-external-id', 'Synthetic nickname': 'Synthetic',
  } });
  const state = {
    creator, otherCreator, historyId, calls: [],
    fields: {
      tblCreators: [field('fldAccount', 'Synthetic account', 'Text', 1)],
      tblSyntheticStatuses: [field('fldSyntheticLabel', 'Synthetic label', 'Text', 1),
        field('fldSyntheticParent', 'Synthetic parent', 'DuplexLink', 21, { table_id: 'tblSyntheticStatuses', multiple: false })],
      tblHistory: [field('fldOwner', 'Synthetic owner', 'DuplexLink', 21, { table_id: 'tblCreators', multiple: false }),
        field('fldTime', 'Synthetic observed at', 'DateTime', 5), field('fldImages', 'Synthetic images', 'Attachment', 17),
        field('fldSyntheticState', 'Synthetic state', 'Text', 1), field('fldSyntheticExternalId', 'Synthetic external ID', 'Text', 1),
        field('fldSyntheticNickname', 'Synthetic nickname', 'Text', 1)],
    },
    rows: {
      tblCreators: [{ record_id: creator, fields: { 'Synthetic account': [{ type: 'text', text: ' @SYNTHETIC.A ' }] } },
        { record_id: otherCreator, fields: { 'Synthetic account': 'synthetic.b' } }],
      tblSyntheticStatuses: [{ record_id: 'recSyntheticRoot', fields: { 'Synthetic label': 'synthetic-parent', 'Synthetic parent': [] } },
        { record_id: 'recSyntheticChild', fields: { 'Synthetic label': 'synthetic-child', 'Synthetic parent': { link_record_ids: ['recSyntheticRoot'] } } }],
      tblHistory: [historyRow(historyId, creator), historyRow('recSyntheticHistoryB', otherCreator)],
    },
  };
  const skillConfiguration = { schemaVersion: 1, environment,
    creators: { dataset: 'creators', queries: { all: 'all', due: 'due' }, fields: { account: 'account' } },
    statuses: { dataset: 'statuses', query: 'all', fields: { label: 'label', parent: 'parent' } },
    history: { dataset: 'history', query: 'byOwner', fields: { creatorRecordId: 'owner', state: 'state',
      externalUserId: 'externalUserId', nickname: 'nickname', observedAtMs: 'observedAt', avatarHashes: 'images' } },
    categories: [{ statusId: 'recSyntheticChild', invitationCategory: 'synthetic-category' }],
  };
  const observations = { contractVersion: 'invitation-eligibility-observations/v2', observedAt: new Date(timestamp).toISOString(),
    rowCount: 1, creators: [{ accountKey: 'synthetic.a', result: 'observed', eligibility: 'synthetic-parent',
      invitationCategory: 'synthetic-category', externalUserId: 'synthetic-external-id', nickname: 'Synthetic' }] };
  return { state, skillConfiguration, observations, timestamp };
}

// This adapter is written only inside the disposable @connection-proof package.
// Real Runtime selection and the real Provider reader remain executable. Only
// raw service responses are synthetic, and every request passes its authorizer.
const adapterSource = `
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRecordDatasetReadExecutor, executeRecordDatasetRead } from '@flair-agency/lark-base-provider/record-dataset-read';
assert.equal(typeof executeRecordDatasetRead, 'function');
export const state = JSON.parse(await readFile(new URL('./synthetic-state.json', import.meta.url), 'utf8'));
export const execute = createRecordDatasetReadExecutor({ transportFactory({ selection, authorizeRequest }) {
  const audit = [];
  return { binding: selection.binding, bindingSha256: selection.bindingSha256, getAudit: () => audit,
    async request(id, options) {
      assert(['fields:list', 'records:search'].includes(id), 'unexpected synthetic transport operation');
      const operation = selection.binding.operationContracts.find(item => item.operationId === id);
      assert.equal(operation.effect, 'read');
      assert.equal(authorizeRequest({ operation, ...structuredClone(options) }, selection.binding), true);
      state.calls.push({ id, options: structuredClone(options) });
      const table = options.pathParameters.table_id;
      let items = id === 'fields:list' ? state.fields[table] : state.rows[table];
      assert(Array.isArray(items), 'unknown synthetic table');
      if (id === 'records:search') {
        if (table === 'tblHistory') {
          assert.deepEqual(options.json.filter, { conjunction: 'or', conditions: [
            { field_name: 'Synthetic owner', operator: 'is', value: [state.creator] }
          ] }, 'history must be searched on the server for exactly the selected creator');
          const targets = options.json.filter.conditions.flatMap(condition => condition.value);
          items = items.filter(row => row.fields['Synthetic owner'].link_record_ids.some(id => targets.includes(id)));
        } else assert.equal(options.json.filter, undefined);
        if (options.json.view_id !== undefined) {
          assert.equal(table, 'tblCreators'); assert.equal(options.json.view_id, 'vewDue');
          items = items.filter(row => row.record_id === state.creator);
        }
      }
      audit.push({ bindingSha256: selection.bindingSha256, operationId: id, tokenType: selection.binding.tokenType,
        result: 'success', attempt: 1, uncertainWrite: false });
      return { code: 0, data: { items: structuredClone(items), total: items.length, has_more: false } };
    }
  };
} });
`;

export async function verifyInvitationEnvironmentConnection(args) {
  const runtimeSource = args['runtime-source'], protocolSource = args['protocol-source'];
  const providerSource = args['provider-source'], skillSource = args['skill-source'], dependencyRoot = args['dependency-root'];
  assert(Object.values(args).every(value => typeof value === 'string' && path.isAbsolute(value)), 'explicit absolute source paths required');
  const temporary = await mkdtemp(path.join(await realpath(tmpdir()), 'synthetic-invitation-connection-'));
  try {
    const { prepareConnectionProof } = await load(path.join(runtimeSource, 'scripts/prepare-connection-proof.mjs'));
    const fixture = await prepareConnectionProof({ out: path.join(temporary, 'fixture'), runtimeSource, protocolSource });
    const provenance = [];
    for (const source of [runtimeSource, protocolSource]) {
      const manifest = await json(path.join(source, 'package.json'));
      const directory = path.join(fixture.out, 'node_modules', manifest.name);
      provenance.push({ packageName: manifest.name, packageVersion: manifest.version, source: await realpath(source),
        localContentIntegrity: await contentIntegrity(directory) });
    }
    const selectedSources = [providerSource, skillSource,
      ...(args['observation-provider-source'] ? [args['observation-provider-source']] : []),
      ...['lark-transport', 'contracts'].map(name => path.join(dependencyRoot, '@flair-agency', name)),
      path.join(dependencyRoot, '@larksuite/cli')];
    let providerDirectory, skillDirectory, providerManifest;
    for (const source of selectedSources) {
      const original = await json(path.join(source, 'package.json'));
      const destination = path.join(fixture.out, 'node_modules', original.name);
      const copied = await copyDistribution(source, destination);
      provenance.push({ packageName: copied.manifest.name, packageVersion: copied.manifest.version,
        source: copied.source, localContentIntegrity: copied.integrity });
      if (source === providerSource) { providerDirectory = destination; providerManifest = copied.manifest; }
      if (source === skillSource) skillDirectory = destination;
    }
    assert.equal(providerManifest.name, '@flair-agency/lark-base-provider');
    const bindings = providerManifest.liveAgencyProvider?.bindings.filter(binding => binding.provides.includes(capability));
    assert.equal(bindings?.length, 1, 'actual Provider package must declare the dataset read capability');
    const actualBinding = bindings[0];
    assert.equal(actualBinding.execution.kind, 'module');
    assert.equal(actualBinding.execution.entry, providerManifest.exports['./record-dataset-read']);
    const actualModule = await load(path.join(providerDirectory, actualBinding.execution.entry));
    assert.equal(typeof actualModule.createRecordDatasetReadExecutor, 'function');
    assert.equal(typeof actualModule.executeRecordDatasetRead, 'function');

    const environment = await json(fixture.environment);
    const selectedEnvironment = { environmentId: environment.environmentId, environmentKind: environment.environmentKind,
      platformId: environment.defaultPlatform };
    const configuration = await json(path.join(providerDirectory, 'knowledge/record-dataset-read.example.json'));
    const inputs = syntheticInputs(configuration, selectedEnvironment);
    const adapterDirectory = path.join(fixture.out, 'node_modules/@connection-proof/platform/node_modules/@connection-proof/provider');
    const adapterFile = path.join(adapterDirectory, 'synthetic-invitation.mjs');
    await writeFile(adapterFile, adapterSource, { mode: 0o600 });
    await save(path.join(adapterDirectory, 'synthetic-state.json'), inputs.state);
    const adapterManifestFile = path.join(adapterDirectory, 'package.json'), adapterManifest = await json(adapterManifestFile);
    adapterManifest.dependencies = { [providerManifest.name]: providerManifest.version };
    adapterManifest.liveAgencyProvider.bindings.push({ id: 'synthetic-dataset-read', provides: [capability],
      knowledgeVersion: actualBinding.knowledgeVersion, execution: { kind: 'module', entry: './synthetic-invitation.mjs' } });
    await save(adapterManifestFile, adapterManifest);
    const configurationFile = path.join(fixture.out, 'synthetic-provider-configuration.json');
    await save(configurationFile, configuration);
    environment.platforms.first.bindings = { [capability]: { contractVersion: '1.0.0',
      dependencyPath: environment.platforms.first.bindings['synthetic-sum/v1'].dependencyPath,
      bindingId: 'synthetic-dataset-read', exportName: 'execute', configurationRef: configurationFile,
      configurationSha256: sha256(await readFile(configurationFile)) } };
    let observationDirectory, observationBinding;
    if (args['observation-provider-source']) {
      const manifest = await json(path.join(args['observation-provider-source'], 'package.json'));
      const matches = manifest.liveAgencyProvider.bindings.filter(binding => binding.provides.includes('creator-invitation-observation-source/v2'));
      assert.equal(matches.length, 1);
      observationBinding = matches[0];
      assert.equal(observationBinding.execution.kind, 'instructions');
      observationDirectory = path.join(fixture.out, 'node_modules', manifest.name);
      const rootFile = path.join(fixture.out, 'package.json'), rootManifest = await json(rootFile);
      rootManifest.dependencies[manifest.name] = manifest.version;
      await save(rootFile, rootManifest);
      environment.platforms.first.bindings['creator-invitation-observation-source/v2'] = {
        contractVersion: '2', dependencyPath: [{ packageName: manifest.name, packageVersion: manifest.version }],
        bindingId: observationBinding.id,
      };
    }
    await save(fixture.environment, environment);
    const lockFile = path.join(fixture.out, 'package-lock.json'), lock = await json(lockFile);
    lock.packages[''] = { ...lock.packages[''], ...await json(path.join(fixture.out, 'package.json')) };
    for (const directory of [adapterDirectory, ...provenance.map(item => path.join(fixture.out, 'node_modules', item.packageName))]) {
      const key = path.relative(fixture.out, directory).split(path.sep).join('/');
      lock.packages[key] = { ...await json(path.join(directory, 'package.json')), resolved: `file:./${key}`,
        integrity: await contentIntegrity(directory) };
    }
    await save(lockFile, lock);
    await save(path.join(fixture.out, 'SYNTHETIC-PROVENANCE.json'), { purpose: 'local synthetic source connection, not distribution acceptance', provenance });
    await contentIntegrity(fixture.out); // Reject links outside separately copied package trees as well.

    const { createEnvironmentAccess } = await load(path.join(fixture.runtimeDirectory, 'src/environment-access.mjs'));
    const skill = await load(path.join(skillDirectory, 'src/invitation-environment.mjs'));
    const { prepareEnvironmentInvitationTargets, prepareEnvironmentInvitationPlan } = skill;
    const { state } = await load(adapterFile);
    const access = await createEnvironmentAccess(fixture.environment);
    const targets = await prepareEnvironmentInvitationTargets({ access, configuration: inputs.skillConfiguration,
      mode: 'due', limit: 1, now: () => inputs.observations.observedAt });
    assert.deepEqual(targets.manifest.rows, [{ creatorRecordId: state.creator, accountKey: 'synthetic.a' }]);
    const result = await prepareEnvironmentInvitationPlan({ access, configuration: inputs.skillConfiguration,
      targets, observations: inputs.observations });
    assert.equal(result.status, 'prepared', JSON.stringify(result));
    assert.equal(result.businessWorkflowVerified, false);
    assert.equal(result.plan.creates.length, 0);
    assert.equal(result.plan.updates.length, 1);
    assert.equal(result.plan.attachExisting.length, 0);
    assert.equal(result.plan.updates[0].recordId, state.historyId);
    assert.equal(result.plan.updates[0].beforeObservedAtMs, inputs.timestamp - 1000);
    assert.equal(result.plan.updates[0].observedAtMs, inputs.timestamp);
    assert.equal(result.classification.classifications[0].statusId, 'recSyntheticChild');
    const searches = state.calls.filter(call => call.id === 'records:search' && call.options.pathParameters.table_id === 'tblHistory');
    assert.equal(searches.length, 1);
    assert.deepEqual(result.reads.find(read => read.dataset === 'history').scope, { recordIds: [state.creator] });
    assert.equal(result.reads.find(read => read.dataset === 'history').rowCount, 1);
    let sourceEvidence;
    if (observationDirectory) {
      // The private Provider owns source syntax and normalizers. The supplied
      // fixture contains synthetic source labels/correspondence outside this repo.
      // Neither its data nor private instruction text is printed in the receipt.
      const sourceBytes = await readFile(args['source-fixture']);
      const sourceFixture = JSON.parse(sourceBytes);
      assert.equal(sourceFixture.synthetic, true, 'use a reviewed synthetic fixture, never real source observations');
      assert.deepEqual(sourceFixture.normalization.requestedAccountKeys, targets.manifest.rows.map(row => row.accountKey));
      const { normalizeInvitationEligibilityLookupV2 } = await load(path.join(observationDirectory, 'src/invitation-eligibility.js'));
      const { materializeInvitationAvatar } = await load(path.join(observationDirectory, 'src/invitation-avatar.js'));
      const image = path.join(temporary, 'synthetic.png');
      await writeFile(image, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jvXcAAAAASUVORK5CYII=', 'base64'), {mode:0o600});
      const avatar = await materializeInvitationAvatar({sourcePath:image, outputDirectory:path.join(temporary, 'avatars')});
      const input = structuredClone(sourceFixture.normalization);
      assert.equal(input.rows.length, 1);
      input.rows[0].avatar = avatar;
      const sourceObservations = normalizeInvitationEligibilityLookupV2(input);
      state.rows.tblSyntheticStatuses = sourceFixture.statuses.map(row => ({record_id:row.id, fields:{
        'Synthetic label':row.label, 'Synthetic parent':row.parentId ? {link_record_ids:[row.parentId]} : [],
      }}));
      const category = sourceObservations.creators[0].invitationCategory;
      assert.equal(typeof category, 'string', 'fixture must exercise category retention');
      const child = sourceFixture.statuses.find(row => row.id === 'recSyntheticChild');
      assert(child?.parentId);
      const correspondence = structuredClone(inputs.skillConfiguration);
      correspondence.categories[0].invitationCategory = category;
      for (const row of state.rows.tblHistory) {
        row.fields['Synthetic state'] = child.label;
        row.fields['Synthetic external ID'] = sourceObservations.creators[0].externalUserId ?? '';
        row.fields['Synthetic nickname'] = sourceObservations.creators[0].nickname ?? '';
      }
      const sourceTargets = await prepareEnvironmentInvitationTargets({access, configuration:correspondence,
        mode:'due', limit:1, now:() => sourceObservations.observedAt});
      const handoff = await skill.prepareEnvironmentInvitationSource({access, configuration:correspondence, targets:sourceTargets});
      const instructions = await Promise.all([observationBinding.execution.resource, ...(observationBinding.execution.resources ?? [])]
        .map(resource => readFile(path.join(observationDirectory, resource), 'utf8')));
      assert(handoff.instructions === instructions.join('\n\n'), 'selected actual source resources must reach the consumer unchanged');
      const {input:ignoredInput, ...envelope} = handoff.request;
      const sourceResult = {...envelope, status:'done', output:sourceObservations};
      const direct = await prepareEnvironmentInvitationPlan({access, configuration:correspondence, targets:sourceTargets, observations:sourceObservations});
      const joined = await skill.prepareEnvironmentInvitationSourcePlan({access, configuration:correspondence,
        targets:sourceTargets, sourceHandoff:handoff, sourceResult});
      assert.equal(joined.status, 'prepared');
      assert.deepEqual(joined.plan, direct.plan, 'source connection must preserve the existing same-input plan');
      assert.equal(joined.classification.classifications[0].statusId, child.id);
      assert.equal(joined.sourceProvenance.verification, 'request-result-correlation-only');
      assert.equal(joined.businessWorkflowVerified, false);
      assert(JSON.stringify(joined.plan).includes(avatar.sha256), 'original image content hash must survive to the plan');
      const beforeInvalid = state.calls.filter(call => call.options.pathParameters.table_id === 'tblHistory').length;
      const changed = await readFile(avatar.path); changed[changed.length - 1] ^= 1;
      await writeFile(avatar.path, changed);
      await assert.rejects(skill.prepareEnvironmentInvitationSourcePlan({access, configuration:correspondence,
        targets:sourceTargets, sourceHandoff:handoff, sourceResult}), error => error.code === 'INVITATION_AVATAR_INVALID');
      assert.equal(state.calls.filter(call => call.options.pathParameters.table_id === 'tblHistory').length, beforeInvalid,
        'altered avatar must stop before history reads');
      sourceEvidence = {fixtureSha256:sha256(sourceBytes), instructionResources:instructions.length,
        sameInputPlan:true, categoryRetained:true, originalAvatarBytes:true, alteredAvatarStopsBeforeHistory:true,
        verification:'request-result-correlation-only'};
    }
    const callCount = state.calls.length;
    configuration.budgets.maxRecords -= 1;
    await save(configurationFile, configuration);
    await assert.rejects(prepareEnvironmentInvitationTargets({ access, configuration: inputs.skillConfiguration }),
      error => error.code === 'PROVIDER_CONFIGURATION_CHANGED');
    assert.equal(state.calls.length, callCount, 'Runtime configuration drift must stop before Provider transport');

    return { status: 'passed', synthetic: true, businessWorkflowVerified: false,
      cases: ['actual-provider-manifest-and-export', 'runtime-provider-skill-connection', 'same-state-timestamp-update',
        'server-filtered-history-search', 'provider-configuration-drift-stops-before-transport',
        ...(sourceEvidence ? ['selected-actual-instruction-resources', 'source-v2-category-and-avatar-to-same-plan', 'altered-avatar-stops-before-history'] : [])],
      counts: { timestampUpdates: 1, baselineHistorySearches: searches.length,
        historySearches: state.calls.filter(call => call.id === 'records:search' && call.options.pathParameters.table_id === 'tblHistory').length,
        syntheticTransportCalls: callCount, externalCalls: 0 },
      sourceProvenance: provenance, verifierSha256: sha256(await readFile(fileURLToPath(import.meta.url))),
      ...(sourceEvidence ? {sourceEvidence} : {}),
      limits: ['Local copied source fixture with content-addressed lock; no registry installation or complete dependency acceptance.',
        'Real Runtime, Provider executor and Skill planning; only raw service transport responses are synthetic.',
        'Empty stored attachments only; optional source uses a synthetic image file, not a browser acquisition.',
        'No real-service identity/image ownership verification, download, mutation, registry or production acceptance.'],
    };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await verifyInvitationEnvironmentConnection(parseArgs(process.argv.slice(2))))); }
  catch (error) { console.error(error.stack ?? error.message); process.exitCode = 1; }
}
