import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fixture } from '../../packages/lark-transport/test-support/api-selection-fixture.js';
import { resolveLarkApiSelection, createLarkSelectedCliTransport } from '../../packages/lark-transport/src/index.js';
import { createLarkBaseSelectedHistoryReader, LARK_BASE_API_OPERATIONS } from '../../providers/lark-base/src/index.js';

export const NOW = Date.parse('2030-01-31T03:04:05Z');
export const config = { appToken: 'synthetic_base', creatorTableId: 'synthetic_creators', profileTableId: 'synthetic_profiles', dueViewId: 'synthetic_due',
  fieldIds: { creatorAccount: 'fldAccount', profileTimestamp: 'fldTime', profileCreator: 'fldCreator', profileFollowerCount: 'fldFollowers',
    profileRecentPostCount30d: 'fldPosts', profileLatestPostAt: 'fldLatest', profileNickname: 'fldNickname', profileAvatar: 'fldAvatar', profileFeatureObservationData: 'fldFeatures' } };
const definition = (field_id, field_name, ui_type, property) => ({ field_id, field_name, ui_type, ...(property ? { property } : {}) });
export function composition({ multiple = false, incomplete = false, writeOutcome = "success" } = {}) {
  const input = fixture('user');
  input.organizationProfile.claims.tenantKey = { evidenceState: 'verified', value: 'synthetic-key' };
  input.principalProfiles[0].requiredScopes = ['bitable:app:readonly', 'bitable:app'];
  input.instanceProfile.service = 'lark-base';
  input.instanceProfile.domain = 'creator-scouting';
  Object.assign(input.instanceProfile.routes[0], { service: 'lark-base', domain: 'creator-scouting', resourceId: config.appToken });
  input.operationIds = input.instanceProfile.allowedOperations = ['fields:list', 'records:list'];
  input.operationContracts = LARK_BASE_API_OPERATIONS.filter(x => input.operationIds.includes(x.operationId));
  input.expected = Object.fromEntries(['profileId', 'organizationProfileId', 'service', 'domain', 'authority'].map(k => [k, input.instanceProfile[k]]));
  const selection = resolveLarkApiSelection(input);
  const creatorFields = [definition('fldAccount', 'Renamed Account', 'Text')];
  const profileFields = [definition('fldTime', 'Observed At', 'DateTime'),
    definition('fldCreator', 'Creator', 'DuplexLink', { table_id: config.creatorTableId, multiple }),
    definition('fldFollowers', 'Followers', 'Number'), definition('fldPosts', 'Posts', 'Number'), definition('fldLatest', 'Latest', 'DateTime'),
    definition('fldNickname', 'Nickname', 'Text'), { ...definition('fldAvatar', 'Avatar', 'Attachment'), type: 17 }, definition('fldFeatures', 'Features', 'Text')];
  const state = { records: [{ record_id: 'recSynthetic01', fields: { 'Renamed Account': 'synthetic.creator' } }], calls: [], history: [], media: new Map() };
  const transportFactory = options => createLarkSelectedCliTransport({ ...options, homeDirectory: '/synthetic', runCli: async (args, context) => {
      state.calls.push(args);
      if (args[0] === '--version') return { status: 0, stdout: 'lark-cli version 1.0.93', stderr: '' };
      let result;
      if (args[0] === 'auth') result = { appId: 'synthetic-app', brand: 'lark', identities: { user: { available: true, verified: true, status: 'ready', openId: 'synthetic-user', scope: 'bitable:app:readonly bitable:app base:record:update base:field:read docs:document.media:upload' } } };
      else if (args[2].includes('/authen/')) result = { ok: true, identity: 'user', data: { open_id: 'synthetic-user', tenant_key: 'synthetic-key' } };
      else if (args[2].endsWith('/medias/upload_all')) {
        const form = JSON.parse(readFileSync(join(context.cwd, 'form.json')));
        const bytes = readFileSync(join(context.cwd, 'upload.bin'));
        assert.equal(form.parent_node, config.appToken); assert.equal(form.parent_type, 'bitable_file');
        assert.equal(Number(form.size), bytes.length);
        state.uploadCount = (state.uploadCount ?? 0) + 1;
        const token = state.uploadCount === 1 ? 'syntheticUploadedImage' : `syntheticUploadedImage${state.uploadCount}`;
        state.media.set(token, bytes);
        result = { ok: true, identity: 'user', data: { file_token: token } };
      }
      else if (args[2].includes('/medias/') && args[2].endsWith('/download')) {
        assert.equal(args[1], 'GET');
        const token = args[2].split('/').at(-2);
        assert(state.media.has(token));
        writeFileSync(join(context.cwd, 'response.bin'), state.media.get(token));
        result = { ok: true, identity: 'user', data: {} };
      }
      else if (args[1] === 'POST') {
        const payload = JSON.parse(readFileSync(join(context.cwd, 'body.json')));
        if (args[2].endsWith('/append_attachments')) {
          for (const [id, cells] of Object.entries(payload.attachments)) {
            const row = state.history.find(x => x.record_id === id); assert(row);
            for (const [field, additions] of Object.entries(cells)) {
              assert.equal(field, 'fldAvatar'); row.fields.Avatar = [...(row.fields.Avatar ?? []), ...additions];
            }
          }
          if (writeOutcome === 'lost' || writeOutcome === 'lost-append') return { status: 1, stdout: '', stderr: JSON.stringify({ error: { code: 'NETWORK', retryable: true } }) };
          result = { ok: true, identity: 'user', data: { attachments: payload.attachments } };
        } else if (args[2].endsWith('/records/batch_update')) {
          const updated = payload.records.map(r => {
            const row = state.history.find(item => item.record_id === r.record_id);
            assert(row); return { ...row, fields: { ...row.fields, ...r.fields } };
          });
          for (const row of writeOutcome === 'partial' ? updated.slice(0, 1) : updated) {
            state.history[state.history.findIndex(item => item.record_id === row.record_id)] = row;
          }
          if (writeOutcome === 'lost' || writeOutcome === 'partial') return { status: 1, stdout: '', stderr: JSON.stringify({ error: { code: 'NETWORK', retryable: true } }) };
          result = { ok: true, identity: 'user', data: { records: updated } };
        } else {
        assert(args[2].endsWith('/records/batch_create'));
        const created = payload.records.map((r, i) => ({ record_id: `recSyntheticProfile${state.history.length + i + 1}`, fields: { ...r.fields, Creator: [{ record_ids: r.fields.Creator }] } }));
        state.history.push(...(writeOutcome === 'partial' ? created.slice(0, 1) : created));
        if (writeOutcome === 'lost' || writeOutcome === 'partial') return { status: 1, stdout: '', stderr: JSON.stringify({ error: { code: 'NETWORK', retryable: true } }) };
        result = { ok: true, identity: 'user', data: { records: writeOutcome === 'duplicate-response' ? created.map(() => created[0]) : created } };
        }
      }
      else {
        assert.equal(args[1], 'GET');
        const creators = args[2].includes(`/tables/${config.creatorTableId}/`);
        const fields = args[2].endsWith('/fields');
        result = { ok: true, identity: 'user', data: { items: fields ? (creators ? creatorFields : profileFields) : (creators ? state.records : state.history.map(row => ({ ...row, fields: { ...row.fields, ...(Array.isArray(row.fields.Avatar) ? { Avatar: row.fields.Avatar.map(a => ({ ...a, size: state.media.get(a.file_token)?.length })) } : {}) } }))),
          has_more: !fields && incomplete, ...(!fields && incomplete ? { page_token: 'remaining' } : {}) } };
      }
      return { status: 0, stdout: JSON.stringify(result), stderr: '' };
    } });
  const client = createLarkBaseSelectedHistoryReader({ selection, baseToken: config.appToken,
    tables: [{ tableId: config.creatorTableId, viewIds: [config.dueViewId] }, { tableId: config.profileTableId, viewIds: [] }], maxPages: 1, transportFactory });
  const writeInput = structuredClone(input);
  writeInput.instanceProfile.authority = writeInput.instanceProfile.routes[0].authority = writeInput.expected.authority = 'write';
  writeInput.instanceProfile.profileId = writeInput.expected.profileId = 'synthetic-write';
  writeInput.operationIds = writeInput.instanceProfile.allowedOperations = ['records:batch-create'];
  writeInput.operationContracts = LARK_BASE_API_OPERATIONS.filter(x => x.operationId === 'records:batch-create');
  const writeSelection = resolveLarkApiSelection(writeInput);

  return { client, state, selection, writeSelection, transportFactory, input, creatorFields, profileFields };
}
export function observations() {
  return { observedAt: new Date(NOW).toISOString(), rowCount: 1, creators: [{ creatorRecordId: 'recSynthetic01', accountKey: 'synthetic.creator', observedAt: new Date(NOW).toISOString(),
    profile: { followerCount: 123, followerStatus: 'observed_exact', followerDisplay: '123', recentPostCount30d: null, recentPostStatus: 'not_available',
      latestPostAt: null, latestPostStatus: 'not_available', nickname: null, nicknameStatus: 'not_available', avatar: null, avatarStatus: 'not_available',
      featureObservationData: null, featureObservationStatus: 'not_available' } }] };
}
