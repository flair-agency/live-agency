import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { executeMonthly, main } from '../runtime/src/monthly-cli.mjs';
import { writePrivateJson } from '@flair-agency/private-files';

const rootDir = path.resolve(import.meta.dirname, '..');
const request = { month: '2030-01', accountKeys: ['synthetic.alpha', 'synthetic.beta'] };
const metrics = { diamonds: 100, effectiveLiveDays: 2, liveMinutes: 90 };
const selection = { readBinding: 'synthetic-read', writeBinding: 'synthetic-write', targetBinding: 'synthetic-records' };
export function configuration(instructions = false) {
  const base = { packageName: '@fixture/monthly-foundation-provider', packageVersion: '1.0.0' };
  return {
    environment: 'development',
    source: { ...base, bindingId: instructions ? 'instruction-source' : 'source', capability: 'creator-activity-source/v1' },
    destination: { ...base, bindingId: 'destination', capability: 'creator-monthly-activity-destination/v1' },
    expectedSelection: selection,
    sourceOptions: { snapshot: { month: request.month, sourceUpdatedAt: '2030-01-02T00:00:00Z', rowCount: 2, creators: request.accountKeys.map(accountKey => ({ accountKey, ...metrics })) } },
    destinationOptions: { selection, records: request.accountKeys.map((accountKey, i) => ({ accountKey, recordId: `synthetic-${i}`, month: request.month, metrics: { ...metrics, diamonds: i ? 100 : 80 } })) },
  };
}
async function fixture(t) {
  const stateDir = await mkdtemp(path.join(tmpdir(), 'monthly-cli-'));
  t.after(() => rm(stateDir, { recursive: true, force: true }));
  return { rootDir, stateDir, request, configuration: configuration() };
}

test('installed selected providers produce a reviewed plan, apply and readback', async t => {
  const args = await fixture(t);
  const dry = await executeMonthly(args);
  assert.equal(dry.status, 'done');
  assert.equal(dry.output.plan.changes.length, 1);
  assert.equal(dry.output.plan.rows.filter(row => row.status === 'unchanged').length, 1);
  const applied = await executeMonthly({ ...args, approvedPlan: dry.output.plan, authorization: { approved: true, selection } });
  assert.equal(applied.status, 'done');
  assert.equal(applied.output.writeOutcome, 'confirmed');
  await assert.rejects(executeMonthly({ ...args, approvedPlan: dry.output.plan, authorization: { approved: true, selection: { ...selection, writeBinding: 'other' } } }));
});

test('instruction result resumes exactly once and rejects changed context or composition', async t => {
  const args = { ...await fixture(t), configuration: configuration(true) };
  const pending = await executeMonthly(args);
  assert.equal(pending.status, 'interaction-required');
  const resume = { ...pending, status: 'done', output: args.configuration.sourceOptions.snapshot };
  await assert.rejects(executeMonthly({ ...args, resume: { ...resume, context: { ...request, month: '2030-02' } } }));
  await assert.rejects(executeMonthly({ ...args, resume, configuration: { ...args.configuration, sourceOptions: {} } }));
  const completed = await executeMonthly({ ...args, resume });
  assert.equal(completed.status, 'done');
  await assert.rejects(executeMonthly({ ...args, resume }), { code: 'EEXIST' });
});

test('CLI private inputs return machine-readable results without printing invalid input values', async t => {
  const args = await fixture(t);
  const configFile = path.join(args.stateDir, 'configuration.json');
  const requestFile = path.join(args.stateDir, 'request.json');
  await writePrivateJson(configFile, args.configuration);
  await writePrivateJson(requestFile, request);
  let output = '', errors = '';
  const streams = { stdout: { write: value => output += value }, stderr: { write: value => errors += value } };
  assert.equal(await main(['monthly-activity', '--root', rootDir, '--state-dir', args.stateDir, '--configuration', configFile, '--request', requestFile], streams), 0);
  assert.equal(JSON.parse(output).status, 'done');
  assert.equal(errors, '');
  assert.equal(await main(['monthly-activity', '--secret-value', 'private-sentinel'], streams), 1);
  assert.ok(!errors.includes('private-sentinel'));
  await assert.rejects(executeMonthly({ ...args, configuration: { ...args.configuration, environment: 'production' } }), { code: 'DEVELOPMENT_CONFIGURATION_REQUIRED' });
});

test('module handoffs must correspond to the invocation envelope', async t => {
  const args = await fixture(t);
  args.configuration.sourceOptions.handoff = true;
  args.configuration.sourceOptions.handoffContext = { ...request, month: '2030-02' };
  await assert.rejects(executeMonthly(args), /context does not match/);
  delete args.configuration.sourceOptions.handoffContext;
  const pending = await executeMonthly(args);
  assert.equal(pending.status, 'interaction-required');
  assert.deepEqual(pending.context, request);
});
