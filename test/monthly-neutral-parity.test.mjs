import assert from 'node:assert/strict';
import test from 'node:test';
import { reconcileMonthlyActivity } from '../skills/live-agency-creator-monthly-activity-reconcile/src/application.js';
import { buildPlan } from '../skills/live-agency-creator-monthly-activity-reconcile/src/core.js';
import { normalizeSnapshot } from '../skills/live-agency-creator-monthly-activity-reconcile/src/contracts.js';

const selection = { readBinding: 'read', writeBinding: 'write', targetBinding: 'target' };
const request = { month: '2030-01', accountKeys: ['creator.one', 'creator.two'] };
const snapshot = {
  month: request.month, sourceUpdatedAt: '2030-02-01T00:00:00Z', rowCount: 2,
  creators: request.accountKeys.map(accountKey => ({ accountKey, diamonds: 100, effectiveLiveDays: 2, liveMinutes: 90 })),
};
function fixture({ unknown = false, persist = true } = {}) {
  const records = snapshot.creators.map((row, index) => ({
    recordId: `record_${index}`, month: request.month, accountKey: row.accountKey,
    metrics: { diamonds: index ? 100 : 80, effectiveLiveDays: 2, liveMinutes: 90 },
  }));
  const state = { writes: 0, reads: 0 };
  const source = { readActivity: async () => structuredClone(snapshot) };
  const destination = {
    async readRecords() { state.reads++; return { selection, records: structuredClone(records) }; },
    async applyChanges({ changes }) {
      state.writes++;
      if (persist) for (const change of changes) records.find(row => row.recordId === change.recordId).metrics = change.desired;
      return { status: unknown ? 'unknown' : 'applied' };
    },
  };
  return { args: { request, source, destination, expectedSelection: selection }, state, records };
}
const approval = plan => ({ mode: 'apply', approvedPlan: plan, authorization: { approved: true, selection } });

import { buildPlan as legacyPlan, normalizeSnapshot as legacySnapshot } from '../runtime/src/legacy/lark_activity_sync.mjs';
test('same synthetic input has legacy plan, targets and metrics parity', async () => {
  const value = fixture();
  const result = await reconcileMonthlyActivity(value.args);
  const names = { month: 'month', account: 'account', diamonds: 'diamonds', effectiveLiveDays: 'days', liveMinutes: 'minutes' };
  const bindings = Object.fromEntries(Object.entries(names).map(([key, name]) => [key, { name }]));
  const records = value.records.map(row => ({ record_id: row.recordId, fields: {
    month: '2030/01/01', account: row.accountKey, diamonds: row.metrics.diamonds,
    days: row.metrics.effectiveLiveDays, minutes: row.metrics.liveMinutes,
  } }));
  const old = legacyPlan(records, legacySnapshot(snapshot), bindings);
  assert.deepEqual(result.rows, old.rows);
  assert.deepEqual(result.errors, old.errors);
  assert.deepEqual(result.plan.changes.map(row => row.recordId), old.updates.map(row => row.record_id));
  assert.equal(result.changeCount, 1);
  assert.equal(value.state.writes, 0);
});
