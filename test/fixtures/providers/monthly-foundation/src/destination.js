import { canonical, assertSelection } from '@flair-agency/creator-monthly-activity-reconcile/contracts';

export function create({ records: initial, selection, uncertainWrite = false }) {
  const records = structuredClone(initial);
  let writes = 0;
  return {
    async readRecords() { return { selection, records: structuredClone(records) }; },
    async applyChanges({ changes, selection: expected, authorization }) {
      assertSelection(expected, selection, true);
      assertSelection(authorization?.selection, selection, true);
      if (authorization?.approved !== true || writes !== 0) return { status: 'rejected' };
      for (const change of changes) {
        const record = records.find(row => row.recordId === change.recordId && row.accountKey === change.accountKey);
        if (!record || canonical(record.metrics) !== canonical(change.current)) return { status: 'conflict' };
      }
      writes++;
      for (const change of changes) records.find(row => row.recordId === change.recordId).metrics = structuredClone(change.desired);
      return { status: uncertainWrite ? 'unknown' : 'applied' };
    },
  };
}
