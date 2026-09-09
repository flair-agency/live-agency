import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection, createLarkSelectedCliTransport } from '../packages/lark-transport/src/index.js';
import { createLarkBaseHistoryAttachmentReader, LARK_BASE_API_OPERATIONS } from '../providers/lark-base/src/index.js';
import { exportProfileTargets, prepareProfilePlan } from '../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs';
import { planIsBlocked } from '../skills/live-agency-creator-profile-record/scripts/profile_sync_core.mjs';
import { composition, config, NOW, observations } from './support/selected-profile-fixture.mjs';

async function run(t, { drift = false, origin = 'https://media.example.test', incomplete = false } = {}) {
  const content = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');
  const c = composition();
  const fields = await c.client.listFields(config.appToken, config.profileTableId);
  fields.find(f => f.field_id === config.fieldIds.profileAvatar).type = 17;
  const input = structuredClone(c.input);
  input.operationIds = input.instanceProfile.allowedOperations = ['tables:list', 'fields:list', 'records:list', 'attachments:read'];
  input.operationContracts = LARK_BASE_API_OPERATIONS.filter(o => input.operationIds.includes(o.operationId));
  const selection = resolveLarkApiSelection(input);
  const rows = [{ record_id: 'recProfileImage01', fields: { Creator: [{ record_ids: ['recSynthetic01'] }], 'Observed At': NOW,
    Followers: 123, Avatar: [{ file_token: 'syntheticFile', size: content.length }] } }];
  const calls = [];
  const transport = createLarkSelectedCliTransport({ selection, authorizeRequest: (request, binding) => binding === selection.binding && request.operation.effect === 'read' && (request.operation.operationId === 'attachments:read' ? request.query.file_tokens === 'syntheticFile' : request.pathParameters.app_token === config.appToken && request.pathParameters.table_id === config.profileTableId), homeDirectory: '/synthetic', runCli: async (args, context) => {
    calls.push(args);
    if (args[0] === '--version') return { status: 0, stdout: 'lark-cli version 1.0.93', stderr: '' };
    let data;
    if (args[0] === 'auth') return { status: 0, stdout: JSON.stringify({ appId: 'synthetic-app', brand: 'lark', identities: { user: {
      available: true, verified: true, status: 'ready', openId: 'synthetic-user', scope: 'bitable:app:readonly bitable:app' } } }), stderr: '' };
    assert.equal(args[1], 'GET');
    assert.equal(args[args.indexOf('--profile') + 1], 'synthetic-oauth');
    if (args[2].includes('/authen/')) data = { open_id: 'synthetic-user', tenant_key: 'synthetic-key' };
    else if (args[2].endsWith('/batch_get_tmp_download_url')) {
      const params = JSON.parse(fs.readFileSync(path.join(context.cwd, 'params.json')));
      assert.equal(params.file_tokens, 'syntheticFile');
      data = { tmp_download_urls: [{ file_token: 'syntheticFile', tmp_download_url: `${origin}/blob` }] };
    } else {
      assert(args[2].includes(`/apps/${config.appToken}/tables/${config.profileTableId}/`));
      data = { items: args[2].endsWith('/fields') ? fields : rows, has_more: incomplete, ...(incomplete ? { page_token: 'remaining' } : {}) };
    }
    return { status: 0, stdout: JSON.stringify({ ok: true, identity: 'user', data }), stderr: '' };
  } });
  let downloads = 0;
  const reader = createLarkBaseHistoryAttachmentReader({ transport, profile: {
    principal_profile_id: input.principalProfiles[0].principalProfileId, organization_profile_id: input.organizationProfile.organizationProfileId,
    selected_actor_binding_sha256: transport.bindingSha256, base_token: config.appToken, download_origins: ['https://media.example.test'],
    operation_ids: { tables_list: 'tables:list', fields_list: 'fields:list', records_list: 'records:list', attachment_urls: 'attachments:read' }, limits: { pages: 8 } },
    tables: [{ tableId: config.profileTableId, attachmentFieldIds: [config.fieldIds.profileAvatar] }], downloadFetch: async (_url, options) => {
      assert.equal(options.redirect, 'error'); assert.deepEqual(options.headers, {}); downloads++;
      if (drift) rows[0].fields.Avatar = [];
      return new Response(content);
    } });
  const client = { ...c.client, attachmentSha256: reader.attachmentSha256,
    listRecords: (base, table, options) => table === config.profileTableId ? reader.listRecords(base, table) : c.client.listRecords(base, table, options) };
  const manifest = await exportProfileTargets({ client, config, nowMs: NOW });
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-attachment-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const file = path.join(directory, 'synthetic.png'); fs.writeFileSync(file, content);
  const observation = observations();
  observation.creators[0].profile.avatar = { path: file, name: 'synthetic.png', mimeType: 'image/png', size: content.length,
    sha256: createHash('sha256').update(content).digest('hex') };
  observation.creators[0].profile.avatarStatus = 'observed_exact';
  const result = await prepareProfilePlan({ client, config, manifest, observations: observation, nowMs: NOW });
  return { ...result, calls, downloads };
}

test('selected CLI read path composes with full Profile planning and local-byte verification', async t => {
  const { plan, calls, downloads } = await run(t);
  assert.equal(planIsBlocked(plan), false);
  assert.equal(plan.summary.profileAlreadyAppliedCount, 1);
  assert.equal(plan.summary.profileCreateCount, 0);
  assert.equal(plan.summary.profileAttachCount, 0);
  assert.equal(downloads, 1);
  assert(calls.some(args => args[2]?.endsWith('/batch_get_tmp_download_url')));
});

test('selected CLI path preserves Profile blocking on attachment drift and unreviewed origins', async t => {
  for (const options of [{ drift: true }, { origin: 'https://other.example.test' }]) {
    const { plan, downloads } = await run(t, options);
    assert.equal(planIsBlocked(plan), true);
    assert.equal(downloads, options.drift ? 1 : 0);
  }
});

test('incomplete selected inventory cannot reach a Profile plan', async t => {
  await assert.rejects(run(t, { incomplete: true }), /pagination token|pagination budget/);
});
