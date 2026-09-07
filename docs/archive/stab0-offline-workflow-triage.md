# STAB-0 offline workflow triage

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.
Status: bounded offline inventory complete; no current workflow defect reproduced.
This is not production health acceptance, full SEP-2 acceptance, or a repair delivery.

## Change card

- Primary G investigation; supporting B defect characterization. Boundary: workflow contracts and development-only execution.
- Preserve the mixed v1/v2 operational baseline, existing staged/unstaged development changes, original checkout, host/project configuration, registrations, credentials and schedules.
- Outcome: classify the SEP-0 workflow register, distinguish historical fixes from current failures, and select one next incident package. No implementation change.
- Next gate: concrete reproduction, exact affected scope, selective rollback, and separately scoped operational authority before production repair/delivery.
- Verification: bounded source/document review and one synthetic transport test file; no external dispatch or business data acquisition. Rollback is removal of this report only.
- Parallel work: none; no tasks/subagents created. Model/effort overrides omitted under dispatch/host instructions; no setting change claimed.

## Evidence and limits

The [SEP-0 workflow register](environment-separation-sep0-checkpoint.md#workflow-register) is the inventory seed. Its observations were captured on 2026-09-06; underlying operational event dates are not specified in the bounded README account. A checkpoint date must not be substituted for an incident date.

[Stability plan section 8](environment-separation-and-production-stability-plan.md#8-production-baseline-and-stabilization) requires demonstrated impact to determine repair order. [Current handoff section 4](v2-task-handoff.md#4-next-work-package) records local conformance and explicit legacy callers; its earlier migration candidate is not a production incident assignment.

Inherited accepted evidence: independent source/local execution pass and 317 synthetic tests. Business connectors/MCP and dedicated CUA are absent from the fresh development catalogs; globally injected Skills remain a known host limitation. Neither observation establishes a workflow defect. No registered business Skill was executed and no private-source Skill contract was reviewed; the mandatory private-source guide must be read before any later such review. Runtime composition and core transport review do not activate a Skill.

Owner reports some v1 failures, but no workflow name, failed run, expected/actual result, or incident timestamp was supplied to this task. Required-workflow completeness and owner priority therefore remain unconfirmed. The inventory below covers every SEP-0 row, splitting grouped activities for clarity. Operational route/profile revisions are unknown unless specifically recorded; package version numbers alone do not prove deployed routes.

## Workflow register

Classification is evidence-specific. `recorded-working` refers only to the cited historical scope; `previously-fixed` does not imply a current failure. Current operational health remains unverified for every row. Impact descriptions are conditional; none establishes a current business outage.

| Workflow / accountable role | Supported route/version | Classification and dated evidence | Impact confidence and missing information |
| --- | --- | --- | --- |
| Invitation status / heartbeat owner | v2 Scouting read; retained v1 rollback. README identifies Scouting 0.4.1 time correction. | **recorded-working**: README records 2/2 repaired scheduled cycles ending at the expected `interaction_required` boundary with zero external changes; captured by SEP-0 on Sep 6, event dates unspecified. | High confidence in the documented bounded result; current interruption unknown. Need failed cycle ID/time and whether failure precedes or follows interactive acquisition. |
| Invitation reviewed history write / approver | Isolated v2 invitation-history write process/profile; exact deployed revision unverified. | **recorded-working**: README records one approved hash-bound intent and complete readback, no uncertain outcome; event date unspecified. | No current write incident demonstrated. Need exact intent status and existing approval if investigating a write; never replay an uncertain intent. |
| Profile acquisition and sync / operations owner | Current inventory names explicit v1 legacy factory in profile export/runtime/sync callers; deployed source/actor unverified. | **current-health-unverified**: Sep 6 handoff confirms retained compatibility, not current operation. | Potential freshness interruption only; owner impact unknown. Need entry point, acquisition versus append stage, stop code, last success. |
| LIVE acquisition and history sync / operations owner | Explicit v1 legacy export/sync callers in current inventory; v2 caller migration remains a candidate. | **current-health-unverified**: Sep 6 handoff; missing migration is not failure evidence. | Potential missed history/metrics only. Need failed stage and whether an interactive stop was expected. |
| Monthly activity / operations owner | Development selected-client runner uses composition/v1 envelope with Lark profiles/v2; this is not a v1 route declaration. | **current-health-unverified**: local wiring and prior synthetic evidence; active production composition unknown. | Potential monthly metric delay, unconfirmed. Need selected production entry point, month and sanitized mismatch/error. |
| Creator insight / operations owner | Local v2 selected adapter; CLI requires injected v2 options or explicit legacy rollback. | **current-health-unverified**: Sep 6 direct 43/43 and focused 317/317 are synthetic only. | Possible invocation/configuration mismatch is a hypothesis, not an incident. Need exact invocation and artifact route/version. |
| Gift history/projection / operations owner | Local selected projection launcher exists; operational acquisition/projection combination unverified. | **current-health-unverified**: handoff records local launcher completion, no current business execution. | Potential history/projection delay, unconfirmed. Need which stage failed and normalized input availability; no raw history needed initially. |
| Backup / maintenance owner | Local full-Base/native backup paths; production selection and host guarantees unresolved. | **blocked-by-input/authority** for further operational validation; inherited synthetic 116/116, 194/194 and 159/159 checkpoints do not establish coverage. | Missing coverage/completeness proof is not demonstrated backup loss. Need approved evidence source and exact coverage expectation. |
| Backup retention / maintenance owner | Linked workflow; exact operational route/version unknown. | **current-health-unverified**: recurring maintenance reference in Sep 6 inventory only. | No capacity or deletion incident demonstrated. Need reviewed retention outcome; deletion authority is separate. |
| History compaction / maintenance owner | Several legacy callers remain explicit; per-history deployed route unknown. | **current-health-unverified**: synthetic regression history only. | No capacity interruption demonstrated. Need affected history and capacity/plan failure summary; no deletion is authorized. |
| Recovery drill / maintenance owner | Local native backup/recovery caller work recorded. | **blocked-by-input/authority** for operational drill; no isolated target or activation authority here. | Recovery readiness unknown; absence of a drill does not prove failed recovery. Need approved isolated destination and verified source evidence. |
| Agency Intelligence / maintainer | Separate v2 read-only browser prepare/capture process; README records profile activation. | **current-health-unverified**: activation record is not a current successful observation. Catalog absence is not startup failure. | No missed-message or process failure demonstrated. Need failed invocation/capture stage and expected coverage. |
| Profile-history/general Scouting write / approver | Separate write processes documented inactive. | **blocked-by-input/authority**, intentionally inactive; no activation requested. | No defect established. Need an explicit operational requirement before activation planning. |
| Coin expenses / finance owner | Normalized local input and dry-run heartbeat; route/version unknown. | **current-health-unverified**: Sep 6 inventory; input freshness/completeness unknown. | No missing expense or incorrect match demonstrated. Need input-ready state and failed reconciliation stage, not receipts initially. |
| Foreign revenue invoice / finance owner | PDF-triggered dry-run, approval-bound accounting; route/version unknown. | **current-health-unverified**: Sep 6 inventory; no invoice/accounting outcome examined. | No accounting error demonstrated. Need invoice-trigger versus accrual/reconciliation stage and error summary. |
| Provider knowledge review / maintainer | Maintenance heartbeat requiring clean composition/tests. | **blocked-by-input/authority** for its clean-source prerequisite, observed dirty at SEP-0. | Source dirtiness is confirmed, business harm is not. Preserve it; do not clean/reset as a repair. |

## Prioritized defect and evidence-gap register

No entry qualifies as **confirmed-offline-failing**. No current defect receives a business severity rank without evidence. The sequence below ranks investigation readiness, not guessed workflow importance.

| ID / disposition | Evidence / probable boundary | Priority decision |
| --- | --- | --- |
| STAB-INC-01 — unlocalized owner report, blocked-by-input | Owner reports v1 failures as of Sep 6; route, timing, symptom, pending outcomes and impact not yet identified. Cause may be source, invocation, configuration, host or service; none selected. | First evidence intake. Choose the highest owner-confirmed impact incident once supplied; no production repair candidate yet. |
| STAB-HIST-01 — previously-fixed time race | README records omitted `asOf` anchored to source-read snapshot in Scouting 0.4.1; explicit historical cutoff preserved. Later scheduled results reached expected interaction boundary. Event dates unspecified. | Do not reopen absent a matching new symptom. |
| STAB-HIST-02 — previously-fixed HTTP 400 | README records finite token lifetime/refresh and one rejected-read retry; later two repaired cycles completed expected scope. Current v2 selected transport has related synthetic coverage. | Do not infer recurrence. Today's tests are not tests of the deployed historical process or proof of its health. |
| STAB-GATE-01 — blocked-by-input/authority | Backup/attachment authentic provenance/currentness and host guarantees remain unresolved in current handoff. These are explicit activation/evidence gates. | Keep unavailable operational paths gated; no speculative implementation repair. |
| STAB-OBS-01 — current-health-unverified | All other rows lack fresh operational evidence; missing tools, inactive profiles, dirty source and migration TODOs are not failures. | Obtain targeted evidence after incident priority, not a broad live sweep. |

## Bounded source review and focused verification

Reviewed runtime activity composition and its synthetic test source for explicit mode/profile/resource/operation selection and dependency injection; did not execute activity or inspect its Skill contract. Reviewed selected API transport, its fixture and test source, and credential-provider dispatch path. Test token, identity, clock, delay and HTTP ports are injected synthetic values. The app-lease case supplies a synthetic environment object and mock HTTP function; it does not resolve ambient credentials. No server, CLI, installer or scheduler is launched.

Executed once on Node v22.22.0:

```sh
node --experimental-permission --allow-fs-read=/Users/naokikimura/workspace/live-agency-provider-runtime packages/lark-core/test/selected-api-transport.test.js
```

Result: **53/53 passed**, zero failures/skips/cancellations, exit 0. Running the test module directly avoids test-runner child processes. Node permissions deny filesystem writes and child processes; HTTP safety here rests on reviewed injected mocks and the host network restriction, not a claim that this Node permission flag independently blocks networking.

Coverage includes same-actor refresh, rejected semantic-read reauthentication, bounded transient retries, no uncertain-write replay, changed authorization/actor rejection, response size/redirect handling and sanitized errors. This is current synthetic evidence for that core component only. No new defect reproducer was justified or created. The broad 317-test suite was not rerun. Test output is retained in this task's tool result; no synthetic configuration/output files were written outside the allowed report.

## One recommended next package

**STAB-INC-01: reproduce one owner-identified failed workflow offline.** This is an incident characterization package, not a fabricated code repair. The coordinator already requested examples; do not duplicate the request or hold this independent inventory open.

Minimum intake: workflow name, one failed run timestamp/task reference, expected versus actual result or sanitized error, exact entry point/route if known, and whether any write might have occurred. Add the business consequence/deadline to order multiple examples. Do not request secrets or raw business exports.

Use only the affected current source and a sanitized synthetic input to reproduce the failure. If it cannot be reproduced offline, return the exact missing observation and separately scoped read authority needed. Completion is either one minimal failing reproducer plus an exact compatible repair proposal, or a documented non-code boundary with no speculative patch.

Before any repair package, identify affected files/callers and the maintenance baseline preserving the mixed v1/v2 combination and dirty distinctions; define focused regression and selective rollback. Before delivery/live checks, require SEP-2 acceptance (or an explicitly scoped urgent-incident exception), exact actor/profile/resource/operation authority, applicable approval freshness, readback and pending-intent reconciliation. Schedule changes require their own observed-cycle criterion. No authority for these actions was consumed here.

## Preservation and handoff

Only `../docs/stab0-offline-workflow-triage.md` was created. Existing source was read, not edited; no commit/staging/reset/install or configuration change occurred. Root and all nine nested repository staged/unstaged diff and index hashes were compared before/after the test and report; existing statuses were preserved except the new report in the root. This verifies local Git-visible preservation, not a fresh audit of production/global state. Original checkout, credentials, registrations and schedules were neither accessed for execution nor modified by this task.

Remaining unknowns: actual failing examples, owner priority/completeness, deployed route/revision, current health, pending write outcomes, and operational authority. Synthetic success does not resolve them. The bounded STAB-0 report is complete; production service-baseline acceptance remains open.
