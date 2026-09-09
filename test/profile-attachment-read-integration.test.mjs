import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fixture } from '../providers/lark-base/test-support/history-attachment-reader.js';
import { buildProfileSyncPlan, planIsBlocked, PROFILE_TARGET_INPUT_KIND, sha256Json } from '../skills/live-agency-creator-profile-record/scripts/profile_sync_core.mjs';
import { NOW, observations } from './support/selected-profile-fixture.mjs';

async function planFor(change) {
  const f = fixture(change);
  f.state.rows[0].record_id = 'recHistory01';
  Object.assign(f.state.rows[0].fields, { Creator: [{ record_ids: ['recSynthetic01'] }], Timestamp: NOW, Followers: 123 });
  const profile = Object.fromEntries(Object.entries({ creator: 'Creator', timestamp: 'Timestamp', followerCount: 'Followers',
    recentPostCount30d: 'Posts', latestPostAt: 'Latest', nickname: 'Nickname', avatar: 'Avatar', featureObservationData: 'Features' }).map(([key, name]) => [key, { name }]));
  const manifest = { version: 2, inputKind: PROFILE_TARGET_INPUT_KIND, generatedAt: new Date(NOW).toISOString(), targetMode: 'due', rowCount: 1,
    rows: [{ creatorRecordId: 'recSynthetic01', accountKey: 'synthetic.creator' }] };
  manifest.rowsSha256 = sha256Json(manifest.rows);
  const input = observations();
  input.creators[0].profile.avatar = { path: '/synthetic/avatar.png', name: 'avatar.png', mimeType: 'image/png', size: 4,
    sha256: createHash('sha256').update('blob').digest('hex') };
  input.creators[0].profile.avatarStatus = 'observed_exact';
  const plan = await buildProfileSyncPlan({ manifest, observations: input, profileRecords: await f.reader.listRecords('base', 'table1'),
    bindings: { profile }, resolveAttachmentHash: f.reader.attachmentSha256, nowMs: NOW });
  return { plan, state: f.state };
}

test('Profile recognizes the same stored image by selected content hash', async () => {
  const { plan, state } = await planFor();
  assert.equal(planIsBlocked(plan), false);
  assert.equal(plan.summary.profileCreateCount, 0);
  assert.equal(plan.summary.profileAttachCount, 0);
  assert.equal(plan.summary.profileAlreadyAppliedCount, 1);
  assert.equal(state.downloads, 1);
});

test('Profile blocks when the image cell changes while its bytes are read', async () => {
  const { plan } = await planFor({ duringDownload: state => { state.rows[0].fields.Avatar = []; } });
  assert.equal(planIsBlocked(plan), true);
  assert(plan.operations.invalidStoredProfiles.some(row => row.reasons.includes('invalid_avatar_attachment')));
});
