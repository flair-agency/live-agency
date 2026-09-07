import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { resolveGiftSource } from '@flair-agency/gift-history-merge/scripts/resolve_gift_source';
import { resolveProfileSource } from '@flair-agency/creator-profile-record/scripts/resolve_profile_source';
import { PROFILE_TARGET_INPUT_KIND, sha256Json } from '@flair-agency/creator-profile-record/scripts/profile_sync_core';
const repositoryRoot = path.resolve(import.meta.dirname, 'fixtures/installation');
const NOW = Date.parse('2030-01-31T03:04:05.000Z');
const CREATOR_ID = 'recCreator0001';
function targetManifest(overrides = {}) {
  const rows = overrides.rows ?? [{ creatorRecordId: CREATOR_ID, accountKey: "synthetic.creator" }];
  return {
    version: 2,
    inputKind: PROFILE_TARGET_INPUT_KIND,
    generatedAt: new Date(NOW).toISOString(),
    targetMode: overrides.targetMode ?? "due",
    rowCount: rows.length,
    rows,
    rowsSha256: sha256Json(rows),
  };
}

test("discovers and executes a normalized gift source through npm", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "gift-source-test-"));
  try {
    const requestPath = path.join(directory, "request.json");
    const outputPath = path.join(directory, "snapshot.json");
    await writeFile(requestPath, JSON.stringify({
      inputKind: "application/x.synthetic-gift-history-request+json",
      accountKey: "synthetic.sender",
      snapshotDate: "2030-01-02",
    }), { encoding: "utf8", mode: 0o600 });
    const result = await resolveGiftSource({
      providerRoot: repositoryRoot,
      request: requestPath,
      output: outputPath,
      unattended: true,
    });
    const output = JSON.parse(await readFile(outputPath, "utf8"));
    assert.equal(result.status, "normalized");
    assert.equal(output.rowCount, 1);
    assert.equal(output.events[0].eventKey, "synthetic-event-0001");
    assert.equal((await stat(outputPath)).mode & 0o077, 0);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("discovers a manual profile provider through npm without hardcoded provider IDs", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "profile-source-test-"));
  try {
    const requestPath = path.join(directory, "request.json");
    const outputPath = path.join(directory, "observations.json");
    await writeFile(requestPath, JSON.stringify(targetManifest()), { encoding: "utf8", mode: 0o600 });
    const result = await resolveProfileSource({
      providerRoot: repositoryRoot,
      request: requestPath,
      output: outputPath,
      unattended: false,
    });
    assert.equal(result.status, "instructions-required");
    assert.equal(result.providerPackage, "@fixture/profile-instruction-source");
    assert.match(result.instructions, /normalized creator observation/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
