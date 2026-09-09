import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { buildM2uCallSiteInventory } from "../tools/m2u-call-site-inventory.mjs";
import { LARK_BASE_API_OPERATIONS } from "../providers/lark-base/src/api-operations.js";
import { LARK_CHAT_API_OPERATIONS } from "../providers/lark-chat/src/m2u-conversation-messages-api-operation.js";

test("inventory finds direct API, independent activity clients and transitive wrappers while excluding private data", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "m2u-inventory-test-"));
  try {
    for (const directory of ["packages/lark-transport/src", "providers/lark-base/src", "providers/lark-chat/src",
      "mcp/operations/src", "runtime/scripts", "skills/example/scripts", "skills/_shared", "runtime-data"]) {
      await mkdir(path.join(root, directory), { recursive: true });
    }
    await writeFile(path.join(root, "providers/lark-base/src/index.js"), 'export const route = "/open-apis/synthetic/read";');
    await writeFile(path.join(root, "runtime/scripts/adapter.mjs"), 'import { route } from "@flair-agency/lark-base-provider";');
    await writeFile(path.join(root, "runtime/scripts/runner.mjs"), 'import "./adapter.mjs";');
    await writeFile(path.join(root, "runtime/scripts/activity.mjs"), 'const client = await LarkClient.fromEnvironment();');
    await writeFile(path.join(root, "runtime/scripts/ignored.test.mjs"), 'const route = "/open-apis/test/read";');
    await writeFile(path.join(root, "runtime-data/private.mjs"), 'const route = "/open-apis/private/read";');
    await writeFile(path.join(root, "skills/example/scripts/read.mjs"), 'client.listRecords("base", "table");');
    await writeFile(path.join(root, "skills/_shared/client.mjs"), 'client.listFields("base", "table");');
    const result = await buildM2uCallSiteInventory(root);
    assert.deepEqual(result.callers.map((entry) => entry.file), [
      "providers/lark-base/src/index.js", "runtime/scripts/activity.mjs", "runtime/scripts/adapter.mjs", "runtime/scripts/runner.mjs",
      "skills/_shared/client.mjs", "skills/example/scripts/read.mjs",
    ]);
    assert.deepEqual(result.callers.find((entry) => entry.file === "runtime/scripts/runner.mjs").dependencies, ["runtime/scripts/adapter.mjs"]);
    assert.equal(result.callers.find(entry => entry.file === 'skills/example/scripts/read.mjs').category, 'skill:example');
    assert.equal(result.callers.find(entry => entry.file === 'skills/_shared/client.mjs').category, 'shared-skill-adapter');
    assert.deepEqual(result.unclassified, []);
    assert.doesNotMatch(JSON.stringify(result), /\/open-apis\/private|\/open-apis\/synthetic/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reviewed operation matrices retain semantic POST reads and unknown combinations cannot advertise support", () => {
  for (const operations of [LARK_BASE_API_OPERATIONS, LARK_CHAT_API_OPERATIONS]) {
    assert.equal(new Set(operations.map((operation) => operation.operationId)).size, operations.length);
    for (const operation of operations) {
      if (operation.supportStatus !== "verified") assert.deepEqual(operation.supportedTokenTypes, []);
      else {
        if (operation.evidence.kind === 'official-client-source') {
          assert.equal(operation.evidence.repository, 'larksuite/cli');
          assert.match(operation.evidence.commit, /^[a-f0-9]{40}$/);
          assert.match(operation.evidence.contentSha256, /^[a-f0-9]{64}$/);
          assert.equal(operation.evidence.url, `https://github.com/larksuite/cli/blob/${operation.evidence.commit}/${operation.evidence.file}`);
        } else assert.ok(operation.evidence.url.startsWith("https://open.larksuite.com/document/"));
        for (const mode of operation.supportedTokenTypes) assert.ok(operation.scopeAlternatives[mode].length > 0);
      }
    }
  }
  const search = LARK_BASE_API_OPERATIONS.find((operation) => operation.operationId === "records:search");
  assert.equal(search.method, "POST");
  assert.equal(search.effect, "read");
});
