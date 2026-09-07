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
      "mcp/operations/src", "runtime/scripts", "skills", "runtime-data"]) {
      await mkdir(path.join(root, directory), { recursive: true });
    }
    await writeFile(path.join(root, "providers/lark-base/src/index.js"), 'export const route = "/open-apis/synthetic/read";');
    await writeFile(path.join(root, "runtime/scripts/adapter.mjs"), 'import { route } from "@flair-agency/lark-base-provider";');
    await writeFile(path.join(root, "runtime/scripts/runner.mjs"), 'import "./adapter.mjs";');
    await writeFile(path.join(root, "runtime/scripts/activity.mjs"), 'const client = await LarkClient.fromEnvironment();');
    await writeFile(path.join(root, "runtime/scripts/ignored.test.mjs"), 'const route = "/open-apis/test/read";');
    await writeFile(path.join(root, "runtime-data/private.mjs"), 'const route = "/open-apis/private/read";');
    const result = await buildM2uCallSiteInventory(root);
    assert.deepEqual(result.callers.map((entry) => entry.file), [
      "providers/lark-base/src/index.js", "runtime/scripts/activity.mjs", "runtime/scripts/adapter.mjs", "runtime/scripts/runner.mjs",
    ]);
    assert.deepEqual(result.callers.find((entry) => entry.file === "runtime/scripts/runner.mjs").dependencies, ["runtime/scripts/adapter.mjs"]);
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
        assert.ok(operation.evidence.url.startsWith("https://open.larksuite.com/document/"));
        for (const mode of operation.supportedTokenTypes) assert.ok(operation.scopeAlternatives[mode].length > 0);
      }
    }
  }
  const search = LARK_BASE_API_OPERATIONS.find((operation) => operation.operationId === "records:search");
  assert.equal(search.method, "POST");
  assert.equal(search.effect, "read");
});
