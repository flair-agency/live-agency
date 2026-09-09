import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { resolveLarkApiSelection } from '../packages/lark-transport/src/index.js';
import { LARK_BASE_API_OPERATIONS, buildLarkBaseImageAppendIntent, createLarkBaseSelectedImageAppender } from '../providers/lark-base/src/index.js';
import { composition, config } from './support/selected-profile-fixture.mjs';
const hash = x => createHash('sha256').update(x).digest('hex');
for (const outcome of ['success', 'lost']) test(`selected CLI image append preserves prior image and never retries: ${outcome}`, async t => {
  const c = composition({ writeOutcome: outcome });
  const select = (authority, id) => {
    const x = structuredClone(c.input); x.instanceProfile.authority = x.instanceProfile.routes[0].authority = x.expected.authority = authority;
    x.operationIds = x.instanceProfile.allowedOperations = [id];
    x.operationContracts = LARK_BASE_API_OPERATIONS.filter(o => o.operationId === id);
    if (id === 'attachments:append') x.principalProfiles[0].requiredScopes.push('base:record:update', 'base:field:read', 'docs:document.media:upload');
    return resolveLarkApiSelection(x);
  };
  const appendSelection = select('write', 'attachments:append'), uploadSelection = select('write', 'media:upload'), mediaSelection = select('read', 'media:download');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'append-integration-')); t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const file = path.join(dir, 'new.png'); fs.writeFileSync(file, 'new!');
  const avatar = { path: file, name: 'new.png', mimeType: 'image/png', size: 4, sha256: hash('new!') };
  const row = { record_id: 'recAppend', fields: { Followers: 12, Avatar: [{ file_token: 'oldToken', size: 4 }] } };
  c.state.history.push(structuredClone(row)); c.state.media.set('oldToken', Buffer.from('old!'));
  const intent = buildLarkBaseImageAppendIntent({ appendSelection, uploadSelection, tableId: config.profileTableId,
    avatarField: { id: 'fldAvatar', name: 'Avatar', type: 'Attachment' }, baselineRecord: row,
    baselineAttachments: [{ fileToken: 'oldToken', size: 4, sha256: hash('old!') }], avatar, planSha256: 'a'.repeat(64) });
  const events = [];
  const client = createLarkBaseSelectedImageAppender({ appendSelection, uploadSelection, readSelection: c.selection, mediaSelection,
    transportFactory: c.transportFactory, intent, approvedIntentSha256: intent.intentSha256, authorizeIntent: () => true, onEvent: e => events.push(e) });
  const token = await client.uploadMedia(config.appToken, avatar);
  const apply = () => client.appendAttachment(config.appToken, config.profileTableId, row.record_id, 'fldAvatar', token);
  if (outcome === 'success') assert.equal((await apply()).verified, true);
  else await assert.rejects(apply(), e => e.uncertainWrite === true);
  await assert.rejects(apply());
  assert.deepEqual(c.state.history[0].fields.Avatar.map(x => x.file_token), ['oldToken', token]);
  assert.equal(c.state.history[0].fields.Followers, 12);
  assert.equal(c.state.calls.filter(x => x[2]?.endsWith('/append_attachments')).length, 1);
  assert(events.every(e => e.operationEvidence.contentSha256 === appendSelection.binding.operationContracts[0].evidence.contentSha256));
});
