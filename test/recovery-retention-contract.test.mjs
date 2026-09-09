import assert from 'node:assert/strict';
import test from 'node:test';
import { buildDrillPreflight } from '../skills/live-agency-data-recovery-test/scripts/drill_core.mjs';
import { buildRecoveryResult, successfulRecoveryReferences } from '../skills/live-agency-data-recovery-test/scripts/recovery_result_v2.mjs';
import { buildRetentionPlan, calculateBackupReceiptSha256 } from '../skills/live-agency-data-backup-retention-plan/scripts/retention_plan.mjs';

function backup(period, digit) {
  const core = { version: 1, status: 'verified', base_alias: 'synthetic', schema_sha256: 'a'.repeat(64),
    backup_class: 'daily', period_key: period, artifact_kind: 'full-base-export', acquisition_route: 'browser-full-base-export',
    restore_scope: 'full-base', artifact_bytes: 1000, artifact_sha256: digit.repeat(64),
    completed_at: `${period}T01:00:00Z`, verified_at: `${period}T01:01:00Z` };
  return { ...core, receipt_sha256: calculateBackupReceiptSha256(core) };
}
function retainedPlan(cleanupStatus, coverageComplete = true) {
  const old = backup('2027-01-01', 'b'); const recent = backup('2030-04-15', 'c');
  const preflight = buildDrillPreflight({ backupReceipt: old,
    profile: { version: 1, base_alias: 'synthetic', production_instance_ref: 'synthetic-production',
      isolated_destination_ref: 'synthetic-test', destination_policy: 'new-non-production-base',
      restore_route: 'browser-native-base-import', cleanup_policy: 'separate-explicit-approval', attachment_check: 'required' },
    executionMode: 'interactive', testCreationAuthorized: true });
  const result = buildRecoveryResult({ preflight, schemaCheck: 'matched', recordCountCheck: 'matched',
    logicalHashCheck: 'not-supported', attachmentCheck: 'matched', cleanupStatus, completedAt: '2030-04-15T02:00:00Z' });
  const refs = successfulRecoveryReferences({ receipts: [result], baseAlias: 'synthetic', coverageComplete });
  const protectedHashes = new Set(refs.backup_receipt_sha256s);
  return buildRetentionPlan({ version: 1, observed_at: '2030-04-15T12:00:00Z', timezone: 'Asia/Tokyo', base_alias: 'synthetic',
    successful_drill_references_complete: refs.successful_drill_references_complete,
    policy: { daily_days: 35, monthly_months: 24, protect_pre_change_until_released: true,
      protect_last_verified: true, protect_successful_drill_sources: true },
    verified_pairs: [old, recent].map((receipt, index) => ({ receipt, artifact_object_ref: `artifact-${index}`,
      receipt_object_ref: `receipt-${index}`, artifact_bytes: 1000, receipt_bytes: 500,
      pre_change_released: false, successful_drill_referenced: protectedHashes.has(receipt.receipt_sha256) })),
    orphans: [], invalid_receipts: [],
  });
}
for (const cleanup of ['pending-approval', 'uncertain', 'failed', 'verified']) {
  test(`retention protects an expired recovery source when cleanup is ${cleanup}`, () => {
    const plan = retainedPlan(cleanup);
    assert.equal(plan.summary.delete_pair_count, 0);
    assert(plan.keep.some(row => row.period_key === '2027-01-01' && row.reasons.includes('successful-drill-source')));
  });
}
test('unknown recovery-result coverage cannot reach retention planning', () => {
  assert.throws(() => retainedPlan('uncertain', false), /coverage must be complete/);
});
