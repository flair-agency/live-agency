import assert from "node:assert/strict";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { LIVE_HISTORY_TARGET_INPUT_KIND, sha256Json } from "../skills/live-agency-creator-live-observation-record/scripts/live_history_sync_core.mjs";
import { resolveInvitationSource } from "../skills/live-agency-creator-invitation-eligibility-record/scripts/resolve_invitation_source.mjs";
import { resolveLiveHistorySource } from "../skills/live-agency-creator-live-observation-record/scripts/resolve_live_history_source.mjs";
import { resolveCoinExpenseProvider } from "../skills/live-agency-coin-purchase-expense-reconcile/scripts/resolve_coin_expense_provider.mjs";

const repositoryRoot = path.resolve(import.meta.dirname, "fixtures/installation");
const NOW = Date.parse("2030-01-31T03:04:05.000Z");
const CREATOR_ID = "recCreator0001";

function targetManifest() {
  const rows = [{
    creatorRecordId: CREATOR_ID,
    accountKey: "synthetic.creator",
    liveContext: {
      cutoffAt: "2030-01-01T03:04:05.000Z",
      knownEvents: [],
    },
  }];
  return {
    version: 1,
    inputKind: LIVE_HISTORY_TARGET_INPUT_KIND,
    generatedAt: new Date(NOW).toISOString(),
    targetMode: "due",
    rowCount: rows.length,
    rows,
    rowsSha256: sha256Json(rows),
  };
}

test("resolves an unattended synthetic provider through npm", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "invitation-source-test-"));
  try {
    const requestPath = path.join(directory, "request.json");
    const outputPath = path.join(directory, "observations.json");
    await writeFile(
      requestPath,
      JSON.stringify({
        inputKind: "application/x.synthetic-observation-request+json",
        observedAt: "2030-01-02T03:04:05.000Z",
        targets: [{ accountKey: "synthetic.creator" }],
      }),
      { encoding: "utf8", mode: 0o600 },
    );
    const result = await resolveInvitationSource({
      providerRoot: repositoryRoot,
      request: requestPath,
      output: outputPath,
      unattended: true,
    });
    const output = JSON.parse(await readFile(outputPath, "utf8"));
    assert.equal(result.status, "normalized");
    assert.equal(output.rowCount, 1);
    assert.equal(output.creators[0].state, "synthetic_pending");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("discovers a separate manual LIVE-history provider", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "live-history-source-test-"));
  try {
    const requestPath = path.join(directory, "request.json");
    const outputPath = path.join(directory, "observations.json");
    await writeFile(requestPath, JSON.stringify(targetManifest()), { encoding: "utf8", mode: 0o600 });
    const result = await resolveLiveHistorySource({
      providerRoot: repositoryRoot,
      request: requestPath,
      output: outputPath,
      unattended: false,
    });
    assert.equal(result.status, "instructions-required");
    assert.equal(result.providerPackage, "@fixture/live-history-instruction-source");
    assert.match(result.instructions, /normalized live-history observation/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("discovers separate interactive purchase and expense providers through npm", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "coin-expense-provider-test-"));
  try {
    const purchaseRequest = path.join(directory, "purchase-request.json");
    const expenseRequest = path.join(directory, "expense-request.json");
    const registrationRequest = path.join(directory, "registration-request.json");
    for (const [filePath, inputKind] of [
      [purchaseRequest, "application/x.synthetic-coin-acquisition+json"],
      [expenseRequest, "application/x.synthetic-expense-candidates+json"],
      [registrationRequest, "application/x.synthetic-expense-registration+json"],
    ]) {
      await writeFile(filePath, JSON.stringify({ inputKind }), { encoding: "utf8", mode: 0o600 });
      await chmod(filePath, 0o600);
    }
    const purchaseProvider = await resolveCoinExpenseProvider({
      mode: "purchases",
      providerRoot: repositoryRoot,
      request: purchaseRequest,
      output: path.join(directory, "unused-purchase.json"),
      unattended: false,
    });
    const expenseProvider = await resolveCoinExpenseProvider({
      mode: "expenses",
      providerRoot: repositoryRoot,
      request: expenseRequest,
      output: path.join(directory, "unused-expense.json"),
      unattended: false,
    });
    const registrationProvider = await resolveCoinExpenseProvider({
      mode: "registration",
      providerRoot: repositoryRoot,
      request: registrationRequest,
      output: path.join(directory, "unused-registration.json"),
      unattended: false,
    });
    assert.equal(purchaseProvider.status, "instructions-required");
    assert.equal(expenseProvider.status, "instructions-required");
    assert.equal(registrationProvider.status, "instructions-required");
    assert.notEqual(purchaseProvider.providerPackage, expenseProvider.providerPackage);
    assert.equal(expenseProvider.providerPackage, registrationProvider.providerPackage);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
