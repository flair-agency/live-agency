# IA-0–IA-2 shared-instruction audit checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-05. Class G; local documentation only. IA-0 complete, IA-1 complete, IA-2 complete. Local v2 implementation may resume from the handoff; rollout remains gated.

## Change card and IA-0 evidence

- Outcome: audited shared instructions, bounded simplification, case verification, and one reconciled v2 resumption point. No next migration implementation in this task.
- Boundary: runtime instruction ownership and entry points only; no executable, business contract, Provider, installed Skill, profile, schedule, or authority changes.
- Authority: owner-approved audit plan Sections 3–5 and 9 plus this task's explicit IA-0–IA-2 instruction. Earlier shared-document holds do not block these approved local edits. Parent synchronized files remain read-only.
- Model: Astra default under task-orchestration-policy Section 6; this documentation audit uses the current Astra session, with reasoning proportional to cross-document ambiguity. No model comparison or exception adopted; no model/reasoning setting changed.
- Done: traceable dispositions, preserved constraints, resolved local references, all eight Section 7 decision cases, and an attributed diff with existing dirty work preserved.
- Next gate: coordinator reviews this checkpoint and resumes the one package in the handoff. Any live operation requires its existing workflow authority and preflight.
- Recovery: apply only the inverse audit diff; retain subsequent user changes. No staging/commit, install, live read/write, credential, schedule, process, or route mutation. No workers or worktrees created.

The delegated checkpoint and task `01a070eb-c961-79f1-83c8-dc7495f7a203` agree: M2U-4e completed and worker idle. Its final result reports 8/8 direct synthetic tests, 23/23 adjacent M2U-4d tests, syntax/import/whitespace checks, no live use and no commit. Read-only inspection confirms the two root runner/test files and sole package.json test-entry diff; eight test definitions and the explicit bundle/mode/profile validation are present. This audit reuses that completed test evidence, not a newly run migration suite. M2U-4d completion is inherited from the supplied confirmed checkpoint; no independent full implementation review is claimed.

M2U-4e files retained: `scripts/creator-activity-sync-runner.mjs`, `scripts/creator-activity-sync-runner.test.mjs`, `package.json`. Active owner-only bundle, verified transport actor/scopes/ACL, reviewed apply, readback, restart/unattended and cutover evidence remain outstanding; synthetic completion supplies none of those authorities.

Pre-edit status was recorded before mutation. File hashes cover 483 tracked/nonignored source/document files across the root and listed submodules (runtime-data and package cache excluded). Temporary comparison evidence: `/tmp/ia-0-file-hashes.json`, `/tmp/ia-0-doc-baseline`, `/tmp/ia-0-root-status.txt`. These are local verification aids, not portable release evidence.

### Initial root dirty state

```text
 M README.md
 M docs/v2-migration-pert.md
 M docs/v2-migration-plan.md
 M docs/v2-task-handoff.md
 M mcp/live-agency-operations
 M package.json
 M providers/google-drive
 M providers/lark-base
 M providers/lark-chat
 M scripts/agency-intelligence-mcp-runtime.mjs
 M scripts/agency-intelligence-mcp-runtime.test.mjs
 M scripts/agency-intelligence-mcp-server.mjs
 M scripts/test-all.mjs
 M skills/live-agency-skills
?? .pnpm-store/
?? docs/instruction-audit-and-simplification-plan.md
?? docs/repository-reorganization-plan.md
?? docs/skill-naming-policy.md
?? docs/task-orchestration-policy.md
?? docs/v2-backup-hardening-design.md
?? docs/v2-m2u-4b-attachment-acquisition.md
?? docs/v2-skill-naming-and-migration-plan.md
?? runtime-data/
?? scripts/creator-activity-sync-runner.mjs
?? scripts/creator-activity-sync-runner.test.mjs
?? scripts/v2-backup-hardening-contract.test.mjs
```

### Ownership and target inventory

| Target / existing changes | Ownership and treatment |
| --- | --- |
| README, migration plan, handoff, PERT; untracked orchestration/audit/naming/reorganization plans | Existing planning integration. Audit touches only the six shared files listed below, preserving their prior content or exact archive; PERT and companion plans unchanged. |
| Root activity runner/test and package.json | Completed M2U-4e; hash-preserved. |
| Root intelligence runtime/server/tests, test-all, backup contract test/design | Earlier M4I/backup work; attribution by file family, not a claim about an unknown author. Hash-preserved. |
| MCP dirty Scouting source/tests and untracked intelligence, Management, membership, recovery contracts/tests | Existing component work, no IA edits. |
| Lark Base dirty package/index/records-search and new activity provider/tests | Existing M2U-4d/transport work, no IA edits. |
| Google Drive dirty backup instructions/knowledge/index and new hardening source/test | Existing backup work, no IA edits. |
| Public Skills dirty activity, backup/retention/drill scripts/references/tests and new Management input/contracts/tests | Existing activity/backup work, no IA edits; individual Skill simplification is IA-3. |
| Lark Chat untracked api-operations.js | Existing Provider work, no IA edits. |
| runtime-data/, .pnpm-store/ | Opaque existing local data/cache, not opened or edited; no ownership/content inference. |
| Ancestor AGENTS.md | Checked normal ancestor hierarchy through filesystem root; ~/.codex/AGENTS.md empty, parent project AGENTS.md applies; no runtime/nested AGENTS.md found. Synced project files/sources read-only. |
| Parent private-source design guide | Read in full at `../非公開ソース連携スキル設計ガイド.md`; no external source accessed. Parent instructions govern applicability and authoritative-source limitations. |
| Installed activity Skill | Read-only symlink observation: ~/.codex/skills/creator-activity-sync resolves to this composition's public Skill directory; no edit. Other installed destinations not comprehensively audited. |
| Project-used foreign-revenue-accounting | External local directory inventoried, unchanged; accounting/relocation excluded. |
| Automation prompts and other task callers | Existing M2U inventory records prompt-driven callers; current prompts/configurations not re-inspected or modified. No deployment coverage claim. Shared doc readers see changed guidance on next read; no restart implied. |

IA-owned edit scope established by IA-1: README.md; docs/task-orchestration-policy.md; docs/v2-migration-plan.md; docs/v2-task-handoff.md; docs/v2-task-execution-instructions.md; docs/instruction-audit-and-simplification-plan.md. New artifacts: this checkpoint and docs/v2-task-handoff-history-2026-09-05.md. No directories outside the checkout require edits.

## IA-1 traceability table

Locations identify pre-edit headings; originals are retained in the local baseline and, for handoff/execution history, the exact archive. Potential risks are not asserted as observed runtime failures.

| ID | Source file and location | Applicability / current effect | Issue and impact | Disposition | Proposal and reason | Owner / affected callers | Verification case |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A01 | Parent AGENTS.md project sections 1–6, mirror restrictions | All project work; authoritative-source interpretation | Root absence was incorrectly treated as no applicable AGENTS by prior worker commentary; parent scope still applies | Keep; proposal only | Execution entry explicitly traverses ancestors. Keep originals read-only; applicability proposal below | Project source owner; runtime tasks | C1,C8 |
| A02 | Parent AGENTS.md sections 7–8; private-source guide | Scouting recommendations; authenticated-source Skill design/review | Unconditional application outside these triggers could create irrelevant gates; full guide read is required when triggered | Keep | Link applicability, retain mandatory full read when triggered; no blanket full-design read introduced | Project source owner; relevant Skill designers | C1,C6,C8 |
| A03 | task-orchestration-policy.md section 8 final paragraph | Conflicting rules | Observed blanket stricter-rule wording can accumulate superseded limits | Replace | Resolve by instruction hierarchy, owner, applicability, effective decision; unresolved authority stops affected operation only | Runtime policy; all runtime tasks | C3,C7,C8 |
| A04 | v2-migration-plan.md section 5 Task-size rules 4,8 | Local work, telemetry | Observed 8/12-cycle and 2/5 percentage thresholds interrupt bounded deliverables; account usage not task cost | Delete mechanical thresholds; move retained stop logic | Permanent policy owns deliverable/dependency/authority/context stopping. Preserve uncertain-write and missing-identity handling | Runtime policy; migration workers | C2,C4,C5,C6 |
| A05 | v2-migration-plan.md section 5 rules 1–3,5–7; orchestration sections 4,7 | Work splitting, handoff and verification | Mandatory fresh task and duplicate task policy; unnecessary transfer risk | Shorten / move | Retain one reviewable outcome, focused checks, serial shared checkout; fresh task only when useful or explicitly requested, no automatic creation | Runtime policy; coordinator/workers | C2,C7 |
| A06 | handoff opening and section 4; README audit paragraph | Current state and next work | Planning text says IA pending and M2U-4e started; verified result is newer | Replace state; move history | One current handoff, mark M2U-4e completed using reported evidence, recommend gift projection under existing M2U-4a map | Runtime coordinator; README/PERT/companion readers | C7 |
| A07 | v2-task-execution-instructions.md Current recommended work packages; handoff sections 3,6 | Second queue and detailed dated evidence | Observed stale M2U-2 recommendation, duplicated historical gates can be mistaken for current queue | Move / shorten | Preserve exact original docs in archive; entry points load handoff and relevant contracts, not archived queue | Runtime coordinator; task briefs | C1,C7 |
| A08 | orchestration section 5F; audit plan section 5 | Approval and external execution | Generic approval wording lacks explicit same-scope continuation distinction | Clarify, retain contracts | Valid unchanged authority continues after contractual preflight; expiry/actor/hash/count/target changes follow workflow rebinding/renewal; read/write authority separate | Workflow owner; protected callers | C3,C4,C5 |
| A09 | audit plan section 5, handoff section 2, migration sections 3–4/M2U/M4–M7 | Safety and business contracts | Volume-only deletion could remove required checks | Keep / reference | Keep unknown distinct from zero, immutable field/relation IDs, actor scope, no fallback, approval binding/readback, no uncertain replay, rollback and frozen workflow | Project/Skill/Provider owners; all affected workflows | C4,C5,C6 |
| A10 | orchestration section 6; audit section 6; companion model recommendations | New packages | Old fixed model ladder can conflict with approved Astra default | Keep owner rule / link | Astra default, proportional reasoning, measured exceptions only; no restart, forced maximum, or all-model gate | Runtime policy; new tasks | C2,C7 |
| A11 | README Update policy; execution Verification discipline | Pin/integration vs prose edits | Broad install/full-test wording could be applied to documentation-only work | Clarify applicability | Keep composition integration checks at pin/integration boundary; doc edits use links/diff/cases | Composition owner; maintainers | C1,C2 |
| A12 | handoff gated W2/W3/M3/M4I and section 5; audit IA-3/IA-4 | Live rollout and release | Historical completion could be generalized to other routes | Keep, defer exact gates | Preserve full gated work text and blockers in current handoff; archive prior proofs. IA-3 at stable Skill routes, IA-4 in M7-2 | Workflow/release owners | C3,C4,C8 |

## Parent-source applicability proposal (not applied)

At the authoritative project source, consider an entry note: sections 1–6 apply to source status and interpretation; section 7 applies when proposing scouting strategy; section 8 and the full private-source guide apply to authenticated/private-source Skill creation, update or review. Runtime task composition and model selection live in the runtime orchestration policy. This note would not weaken source governance or authorize synchronized-mirror edits. Source application remains deferred to its owner; it does not block local IA-2 or offline M2U work.

## IA-2 verification

Method: the current Astra session performed a manual decision walkthrough using the revised instructions and eight fictional, non-executing scenarios below. Expected decisions come from the approved plan Section 7; observed decisions are this audit's reasoning results, not tool-enforced business execution or an independent model benchmark. No external write, message, deletion, cutover, source access or API call was used as a test.

| Case | Synthetic input | Expected decision | Observed decision and owning rule | Result |
| --- | --- | --- | --- | --- |
| C1 | Read local instruction files to prepare a scoped audit; no API authority supplied | Proceed with read-only investigation, without execution approval | Read local docs and produce the audit card. Parent source governance applies; it does not create a live-access prerequisite. Execution instructions intake; policy 2/G | Pass |
| C2 | Bounded local prose fix reaches cycle 13 and account usage rises 6 percentage points; relevant reference check remains | Complete repair and focused verification if context is reliable | Continue through reference verification and checkpoint. Neither count causes a stop or new task. Policy 4 Stopping/continuation; Section 6 does not equate account usage with task cost | Pass |
| C3 | Approved synthetic plan P has same unexpired hash, actor A, resource R and 2 updates; preflight agrees | Recognize existing authorization and perform contractual preflight | Proceed only within the unchanged approved operation after preflight; no redundant question and no neighboring rollout. Policy 5F; workflow approval contract remains required | Pass |
| C4 | P is expired, or changed to 3 updates / another target / actor B with equal content hash | Stop affected execution and expose changed binding and renewed-authorization need | Do not reuse approval; record expiry/count/target/actor difference, rebind and renew under its contract. Continue independent planning. Policy 5F and migration M2U exit criteria | Pass |
| C5 | Synthetic append request times out after submission | Readback reconciliation; no unconditional replay | Request only contract-permitted readback, reconcile exact applied state if provable; otherwise stop remaining writes and record uncertainty. Policy 4 and 5F | Pass |
| C6 | Required field ID is unknown or selected profile configuration is missing | Do not guess an update; continue independent preparation | Leave external execution unperformed, identify missing schema/profile and prepare local evidence. Preserve unknown rather than zero. Policy 4, parent guide, audit plan 5 | Pass |
| C7 | Archived task instructions say M2U-2 next and enforce fresh task; new approved policy/checkpoint says IA complete and gift consumer next | Resolve by owner, applicability and effective decision | Current handoff owns queue, permanent policy owns task/model rules. Keep old proofs in archive; select gift M2U-4a without replaying completed work or inheriting obsolete model limits. Policy 8 | Pass |
| C8 | Runtime proposal complete; project-source edit or external activation lacks authority | Leave application unperformed; retain completed local work | Preserve proposal and local checks, defer only source application/activation to owner. Synchronized mirror stays read-only; offline migration is eligible. Parent AGENTS, policy 4/8 | Pass |

Scoped structural verification passed: 56 local Markdown links and anchors across all eight IA files resolve. Both original handoff and execution-instruction bodies are retained verbatim in the archive. Handoff Section 2 invariants and all gated W2/W3/M3/M4I instructions remain verbatim in the current handoff. The audit plan's mandatory safety section is unchanged. Migration implementation/operational sections outside the shared-policy/IA status region remain unchanged. Scoped whitespace checks pass, and obsolete active cycle/usage/fresh-task/stricter-rule clauses are absent from the revised active entry points.

Preservation comparison passed: 477 of 483 baseline files are byte-identical, with differences confined to the six approved existing documents; the two new IA artifacts account for new output. No existing implementation, component instruction, package.json or PERT change was overwritten. Local temporary IA-only diff is `/tmp/ia-only.diff`; it compares against the pre-audit dirty documents, not HEAD, so earlier changes are not attributed to this task.

Mandatory-condition trace: audit plan Section 5 still owns the preservation checklist; parent guide still owns private-source separation and unknown-schema/dry-run/readback rules; current handoff Section 2 retains identity/business constraints; its gated work retains W2 credential isolation, LIVE context/coverage, M4I same-user/Tenant exclusion and inactive Scouting-write requirements. Policy 5F retains exact authority/freshness/readback and uncertain-write handling. Migration M4/M5/M7 retain v1 rollback, two-cycle, install/release gates. The original frozen coin-expense-weekly-application directive remains verbatim in current handoff Section 2. No safety prose was removed on the premise of code enforcement, so there is no newly substituted code-enforcement claim.

Only this adopted session's eight decision cases were exercised. No cross-model benchmark, all-Skill certification, live route validation or code regression rerun is claimed.

## Unresolved scope and resumption

No new implementation or deployment coverage is asserted. Installed Skills, all automation prompts, Provider instructions and external Skills are not comprehensively audited; IA-3/IA-4 own that later coverage. Parent-source proposal remains unapplied. Historical milestones are retained evidence, not fresh live observations. These explicit deferrals do not block the local shared-instruction exit.

Next one package: existing M2U-4a map instantiated for gift-history-sync Lark projection, following M2U-4 consumer scope and the completed worker's recommendation. Narrow identity injection and actor-bound approval/preflight/receipt semantics; keep source acquisition, event keys, accounting rules, approved SHA/counts, backup, readback and uncertain-write reconciliation unchanged. Astra default; high reasoning recommended for this approval-bearing boundary, adjustable to unresolved decisions. No next implementation is started here.


## IA-3 activity route instruction reconciliation — 2026-09-05

Completed IA-3 for creator-activity-sync only (class G). Accepted entry: grouping
map §3 M4/M5/IA-3 and audit plan IA-3, using completed M2U-4d/4e local contracts.
Changed the Skill entry and its `references/lark-config.md`, plus this checkpoint
and the current handoff. No executable, Provider, contract or installation edit.
The existing installed Skill symlink resolves to this checkout, so subsequent
Skill reads see these instructions; no process or route activation is claimed.

The v2 procedure now requires the injected selected runtime, explicit mode,
matching read/write Principal and destination, and caller-held same-scope
approval. Existing normalized input/field IDs/three-metric-only/200-record cap,
readback and no uncertain replay conditions remain. V1 credential and fallback
procedures remain explicitly scoped to the retained v1 deployment. Runtime
entry: `scripts/creator-activity-sync-runner.mjs`; consumer: activity
`lark_activity_sync.mjs` `runSync`/`main`. The runner accepts no approval hash;
no new approval-binding guarantee is asserted. Live actor/access, active bundle,
reviewed apply/readback, restart/unattended and cutover evidence remain missing.
No existing cutover proof is promoted to cover the revised instructions.

Direct manual instruction cases (not runtime tests): 6/6 passed against the
revised Skill and existing runner/consumer contracts:

| Case | Required disposition, confirmed by walkthrough |
| --- | --- |
| Inspect metrics | Explicit dry-run; no write selection required |
| Authorized unchanged apply | Same snapshot/destination/actor, reviewed write selection, post-write verification |
| Actor or target/count changed | Reconcile scope before apply; previous approval is insufficient |
| Missing selected Provider | Stop v2; no ambient credential or browser fallback |
| Uncertain update response | Readback reconciliation; no unconditional replay |
| V1 rollback | Retain its existing procedures/evidence; synthetic v2 result does not authorize cutover |

Focused diff/Markdown-link checks passed. Frontmatter is unchanged from the
pre-edit artifact; required name/description and absence of scaffold placeholders
were checked directly. The required `quick_validate.py` was attempted with the
default, existing `/usr/local`, and bundled Python; all stopped at missing
`yaml` (PyYAML), before validation. No dependency was installed; full validator
completion is explicitly unverified. Existing M2U-4e 8/8 and adjacent M2U-4d
23/23 are inherited, not rerun. No unrelated suite or artifact inquiry repeated.

Initial root and component dirty statuses and pre-edit content hashes are at
`/tmp/ia3-activity-before/`; verification compares against that dirty baseline,
not HEAD. Only the four named documentation files changed. Rollback: reverse
only this task's four-file diff, preserving previous and subsequent edits.
No external access, credentials, live operation, schedule, install, stage or
commit. No new task/subagent/worktree. Dispatch default is Astra/low; no effort
exception or host setting change claimed. Task-specific token/cache telemetry
was not available; no savings estimate. References were expanded only for the
actual caller gap, IA-3 criteria, mandatory Skills and private-source guide;
no history reload or completed migration rerun.

Next one outcome: IA-3 gift-history-sync instruction reconciliation using its
completed M2U-4a local consumer/launcher contract; preserve its approval/hash,
backup/readback and operational gates. IA-3 other Skills and IA-4 remain open.


## IA-3 gift route instruction reconciliation — 2026-09-05

Completed gift-history-sync instruction reconciliation only. Change card:
class G; boundary public Skill procedure and its private composition entry
reference. One outcome is correct v1/v2 routing and exact approved v2 invocation
against the completed M2U-4a contract. Business rules, source handoff, actor/
resource/operation binding, approval SHA/count/freshness, backup, readback and
no uncertain replay remain invariant. No parallel agent/task/worktree.

Changed paths: `skills/live-agency-skills/skills/gift-history-sync/SKILL.md`,
its `references/lark-projections.md` and `references/workspace-config.md`, this
checkpoint and the current handoff. The installed Skill is an existing symlink
to this checkout; no outside copy or installation change. The former launcher
pending guidance now names the completed explicit API, its input/run keys and
owner-only bundle. V1 deployment/rollback remains separate; capability/schema
`v1` labels do not select legacy execution. No existing cutover evidence is
promoted to authorize the revised instructions or live execution.

Manual instruction walkthroughs against consumer/launcher source (not new
runtime tests), 8/8 passed:

| Case | Confirmed disposition |
| --- | --- |
| Existing manual snapshot handoff | Retain source capability v1 and canonical master workflow; no upstream acquisition |
| V2 projection preview | Explicit selected Provider/read transport and authorized reads; launcher dry-run has no apply authority |
| Direct CLI or missing injection | Stop; no environment/default actor, legacy client or v1 fallback |
| Read-only selection then apply | Reject; write selection and write transport must be paired with the same actor |
| Human-approved apply | One approval source, exact review SHA, target SHA and three counts; fresh plan before backup/write |
| Expiry or actor/resource/operation/config/record-ID drift | Stop affected apply even if counts match; no old approval reuse |
| Uncertain response | Same-actor readback must equal full target; otherwise failure receipt, reconcile and newly review remainder, no automatic replay |
| V1 rollback or local synthetic success | Keep separate deployment artifacts; no automatic cutover or live-readiness claim |

Consumer `run(argv, options)` flags and launcher creation/run keys were checked
against current source; approval review binding and receipt semantics remain
those of the existing implementation. Markdown local links/anchors and script
references, unchanged frontmatter/name/description, and scaffold absence were
checked independently. Scoped before/after diff and whitespace checks passed.
`quick_validate.py` was attempted with existing `python3`; it stopped before
validation with `ModuleNotFoundError: yaml`. PyYAML was not installed; full Skill
validator completion remains unverified. Consumer 39/39 and launcher 43/43 are
inherited evidence, not rerun; unchanged implementation needs no new runtime
suite. No production/API/private-data/credential/profile/login access.

Pre-edit source hashes, dirty statuses and the five original documents are at
`/tmp/ia3-gift-before/`. Baseline comparison: 434 files, only the five named
documents changed; the other 429 are byte-identical. Rollback only this scoped
document diff, retaining all prior and later dirty edits. No source/test/business
config, schedule/restart/activation, install or Git staging/commit operation.

Dispatch default remains Astra/low; no host setting change is claimed. One
available account-wide usage snapshot showed 41% used in the weekly window;
it is not task cost or a stopping threshold. Task token/cache and reduction
measurements were unavailable. Required Skills/ancestor instructions and the
private-source guide were read fully; bounded current-entry/checkpoint/source
reads supplied the remaining facts. One oversized combined output was truncated;
missing required portions were retrieved by scoped reads. No whole migration
plan or long history reload, prior IA-0–IA-2 audit, artifact inquiry or completed
implementation test was repeated; no savings percentage is asserted.

Remaining gates: actual selected Provider/actor/grants/ACL/service capability,
active owner-reviewed bundle/config and independent expected boundaries, genuine
unexpired approval, authorized live preflight/write/readback, deployment/restart/
unattended readiness, publication/pins and v1 cutover. Attachment owner evidence,
other IA-3 Skills and IA-4 remain open; manual export/receipt inquiry stays closed.
Next one outcome: IA-3 lark-base-backup route eligibility review of its current
consumer/composition and accepted stable v2 contract, before bounded instruction
reconciliation. No next package is started here.


## IA-3 backup route eligibility — 2026-09-06

Disposition: eligibility investigation complete; lark-base-backup instruction
reconciliation remains deferred. IA-3 requires a stable workflow v2 route.
Class G; scope is this checkpoint and the current handoff prefix only. No
Skill, Provider, source, business setting or executable edit; no external IO,
private artifact inspection, install, task/subagent/worktree or live action.
Astra/low is the requested default; no host setting change is claimed.

### Entry and argument evidence

| Inspected surface | Actual contract and eligibility result |
| --- | --- |
| [Backup Skill](../../skills/lark-base-backup/SKILL.md) and its three direct references | Workflow plus version 1 receipt/attachment/readiness contracts; no full-Base v2 runner or injected caller entry. Installed Skill symlink resolves to this checkout. |
| [Lark acquisition procedure](../../providers/lark-base/instructions/full-base-backup.md) and [Provider exports](../../providers/lark-base/src/index.js) | Retained private browser procedure and `inspectLarkBaseExportArtifact(input, { expectedBaseToken })`; inspecting supplied bytes is not native export acquisition or a selected v2 orchestration. Historical drill claims do not certify a current Provider's general capabilities. |
| [Storage procedure](../../providers/google-drive/instructions/backup-storage.md) and [helpers](../../providers/google-drive/src/index.js) | `inspectBackupCoverage(receipts, query)` and `buildVerifiedBackupReceipt(value)` consume supplied receipts/metadata and readback byte/hash values. They do not perform source acquisition, shared listing, upload or complete storage readback. |
| Attachment launcher (historical source: `runtime/scripts/attachment-acquisition-launcher.mjs`; retained with the pre-M1 source-disposition snapshot) | `createOwnerOnlyAttachmentAcquisitionLauncher({ bundlePath, createReadTransport, downloadFetch, now })` is implemented; acquisition input requires `profile`, existing `baseReceipt`, and `restoreMappingContract`. It cannot stand in for creation/storage of that Base receipt. |
| Readiness helper (historical source: `skills/lark-base-backup/scripts/unattended_readiness.mjs`; retained with the pre-M1 source-disposition snapshot) | `assessUnattendedBackupReadiness(input)` evaluates normalized evidence; it neither executes backup nor activates a route. |
| [Consumer checkpoint](../../runtime/docs/archive/backup-consumer-integration-checkpoint.md) | Explicit `backupCapabilityInput` belongs to `buildDrillPreflight`, not backup creation. Optional auxiliary avatars are this Consumer's policy, not general Provider capability or blanket attachment tolerance. |

Repository-scoped entry/call-site searches covered root scripts/packages/MCP,
Lark/Drive exports and the target Skill file inventory. No settled full-Base
backup v2 consumer/composition entry was identified. Existing v1 procedures and
receipt semantics remain intact. Do not invent CLI flags, automatic composition,
explicit-injection ports, or supported capabilities to fill that gap.

### Focused verification and retained limits

Six manual decisions passed against the inspected contracts: full-Base request
cannot use a logical snapshot as fallback; attachment launcher cannot produce
its required Base receipt; receipt/hash helpers cannot prove actual acquisition;
readiness success cannot authorize activation; Base-only avatar tolerance cannot
certify Provider/other Consumer capability; absent v2 caller leaves Skill IA-3
pending while permitting this local review. Approval/preflight, complete readback,
uncertain-write reconciliation and independent attachment owner/evidence gates
are retained. Supplied manual export inquiry stays closed; no repeat inspection.

Scoped document diff, local links and exact implementation signatures checked.
Target Skill file hashes remain unchanged. No code tests repeated: gift 39/39 and
43/43 and prior backup Consumer 20/20 remain inherited evidence, not fresh runs.
Skill validator was not rerun for an unchanged Skill; its known PyYAML dependency
remains unavailable and no install was attempted. Account usage snapshot: 42%
used in the 10080-minute window, not task token cost. Mandatory guide and Skills
read in full; relevant direct references and contract sections read, no full
migration plan/history reread. One truncated storage-procedure output was followed
by a bounded full read; no private data loaded.

Next one outcome: settle ownership and the full-Base v2 caller/composition
contract for exact source/storage actor and operation selection, coverage/recheck,
native acquisition, upload/readback and receipt publication, preserving approval
and uncertain-write behavior. New route implementation is outside this document
package. Resume IA-3 after that accepted entry is implemented with focused evidence;
actual capability certification, attachment recovery and live/cutover remain
separate unresolved gates. Rollback only this appended section/current-prefix
change; pre-edit document copies are in `/tmp/ia3-backup-eligibility/`.

## Full-Base caller contract decision — 2026-09-06

Completed design-only package: [one caller contract and implementation brief](../../runtime/docs/v2-full-base-backup-caller-contract.md).
Primary class E (ownership/call boundary decision), documentation-only effects.
Protected boundary: private composition with supporting Provider ports. No new
shared abstraction, evidence mechanism, source/Skill/settings edit or live IO.
Definition of done: ownership, explicit inputs, ordered effects, failure/unknown
handling and next exact local implementation/test wiring are settled. No tasks,
subagents, worktrees, installs or Git mutations were launched. Requested model
is Astra/low; no effort exception or host setting change is claimed.

| Decision / representative case | Evidence and observed design disposition |
| --- | --- |
| Workflow owner | Existing Skill procedure plus private Provider IO ownership → one root injected runner; no new MCP/shared API. |
| Exact selection | Native browser and Drive are outside Lark API selection semantics → explicit selected trusted adapters; no fabricated OpenAPI operation or ambient account. |
| Normal acquisition/storage/publication | Inspector supplies actual byte/hash/schema; Drive helper validates values → hash full downloaded bytes, build unchanged v1 receipt, publish/read it and verify shared visibility. |
| Coverage races | Skill requires pre-acquisition check; storage procedure requires pre-upload check → retain both plus initial/final queries; reuse newest exact match and preserve duplicates. |
| Base/schema/destination mismatch | Existing inspector/receipt query and exact storage procedure → stop before next effect, no schema substitution or same-name match. |
| Unknown export/upload/publication outcome | Existing uncertain-write rule → single-use runner, bounded stage/outcome error, retain owner-only context for readback; no replay or cleanup. |
| Receipt stored but final query fails | Storage publication precedes final query → unknown completion, never infer absence or automatically publish again. |
| Uncertified Provider capability | Route flags and inspector counts do not prove execution coverage/recovery → receipt semantics unchanged, no synthesized complete companion evidence. |
| Attachment/unattended limits | Direct attachment/readiness contracts → independent owner/composite-drill and activation gates retained; Base-only auxiliary-avatar policy not generalized. |

Validation: inspected actual signatures/returns of Lark inspector and route policy,
Drive coverage, receipt builder/normalizer/naming helpers and source-provider
resolver. Six direct contract links resolve. Scoped handoff diff changes only
its current prefix; `git diff --check` passes. Skill plus three direct references
pass SHA-256 preservation (4/4). These are manual contract/decision checks, not
new runtime test passes. Existing synthetic tests and unavailable PyYAML validator
were not rerun; no download or installation. The next brief names a new focused
Node test, root package selector and test-all wiring, with normal/rejection/race/
unknown-effect scenarios and effect-order assertions.

Reads/usage: mandatory ancestor instructions, private-source guide and backup
Skill read in full; relevant direct references, policy, eligibility checkpoint,
grouping rows and implementation sections inspected. An initially broad bundled
output truncated; required Provider procedures and helper sections were then read
in bounded calls. No manual exports, private artifacts or long migration history
were reloaded. Task token/cost telemetry is unavailable here; no savings percentage
or account-usage-to-task-cost inference is claimed.

Changed paths: new `docs/v2-full-base-backup-caller-contract.md`, this appended
checkpoint, and `../docs/v2-task-handoff.md` current prefix only. Pre-edit copies and
Skill hashes are in `/tmp/full-base-contract-design/`; rollback only these task
edits, preserving all earlier dirty work.

No unresolved ownership decision remains for the injected local runner. Concrete
live acquisition/storage adapters and authentic authority/capability evidence
remain unavailable/unverified, not speculatively implemented. Next one package:
implement the contract Section 5 runner, direct synthetic tests and scoped local
wiring together; then reassess Skill IA-3 eligibility. Actual Provider capability,
attachment owner gate, unattended activation and existing live/cutover conditions
remain separate. Manual export/receipt inquiry remains closed. Stop this design
package here; implementation is not performed by this task.


## Full-Base injected runner implementation — 2026-09-06

Completed the caller contract Section 5 in the same local task: new
`scripts/full-base-backup-runner.mjs`, its direct `.test.mjs`, root
`test:full-base-backup-runner` selector and additive composed test registration.
Primary class A, supporting G; accepted private composition boundary only.
Existing Provider exports and v1 receipt are reused. Selected trusted adapters
own exact authority, complete listing/IO and owner-only object associations.
The runner snapshots inputs, checks selections before ports, rejects overrides
and repeated/concurrent runs, rechecks coverage twice, verifies complete artifact
and receipt readbacks, then requires its own receipt in final shared coverage.
Unknown effect exceptions never retry; arbitrary adapter failure assertions do
not prove no operation occurred. No capability certification is synthesized.

Evidence: `node --test scripts/full-base-backup-runner.test.mjs` **46/46**.
Cases cover normal/reused/racing coverage, schema/Base/route/destination/hash/
size failures, incomplete acquisition/listing/readback, effect exceptions,
missing object references, receipt mismatch/re-read, final visibility failure,
concurrent same/different artifacts and counts, selected-binding drift,
unsupported/unattended rejection, clock validation, single-use/overrides and
secret-free output. Initial 41/43 exposed two test-harness expectation issues
(completed_at false-positive and mutable fake naming expectation); fixed locally,
then added three boundary cases. No Provider implementation failure was masked.
Syntax/import checks and scoped diff/reference/wiring preservation checks passed.
Inherited full suites and PyYAML validator were not rerun.

Initial root dirty inventory and root wiring diff were captured in local `/tmp`
files before editing; existing Provider dirty source and all prior registrations
were preserved. Only the seven brief-authorized paths changed for this package.
No stage/commit/reset/clean/checkout/push, dependency installation, actual backup,
restore, API, private artifact, credential, schedule or activation operation.
Rollback is limited to this package's additions; preserve initial dirty changes.

Read scope: applicable ancestor AGENTS, mandatory private-source guide and backup
Skill in full; receipt reference, two Provider procedures, caller contract and
exact helper signatures, current handoff prefix, Worker brief, grouping §3 and
relevant common policy. No wholesale history/plan reload. Dispatch default was
Astra/low; no model-control mutation or effort escalation. Task-specific usage
metadata and reduction rate were not measured; no savings claim is made.

IA-3 disposition: the verified injected local entry is now sufficient for one
bounded backup Skill instruction reconciliation (invocation plus limits).
Next one integration package is that IA-3 update, not live adapter activation.
Actual Provider adapters/certification, source completeness/import recovery,
attachment owner/composite drill and exact unattended readiness/activation remain
open; synthetic composition is not live ready. Manual export inquiry stays closed.


## IA-3 backup instruction integration — 2026-09-06

Completed one local documentation package, primary class G. Public Skill procedure
and private composition boundary remain contract-compatible; no new permission,
evidence gate or business rule. Applicable ancestor AGENTS, private-source guide,
skill-creator and target Skill read in full. Read direct receipt/attachment/readiness
references, runner public implementation, caller contract Sections 1–4, handoff
prefix, grouping §3 and relevant Worker brief/common-policy sections. One bundled
output truncated historical checkpoint text; no required guide/Skill was truncated,
and no full-plan/history reload or private artifact access was needed.

Changed paths: `skills/live-agency-skills/skills/lark-base-backup/SKILL.md`,
its `references/backup-receipt.md`, new `references/full-base-runner.md`, this
checkpoint and `../docs/v2-task-handoff.md` current prefix. Installed target is an
existing symlink into this workspace; registration and link remain unchanged.
Initial root/submodule dirty state inspected; exact four existing file baselines
are retained under `/tmp/ia3-backup-integration/`. Rollback only these edits and
the new reference, preserving earlier dirty changes. No other component edits.

| Decision case | Instruction disposition checked against implementation/contract |
| --- | --- |
| v2 entry with v1 receipt | Explicit import/injection only; unchanged receipt semantics, no migration/activation claim. |
| Missing adapters or unsupported route | Stop execution; no ambient selection, endpoint invention or automatic browser fallback. |
| Exact request/selection | Six options, seven request fields, common/extra selection keys, operations and frozen adapter equality match implementation. |
| Coverage/racing runner | Initial, pre-acquisition and pre-upload matching reuse; preserve concurrent duplicates and differing artifact counts. |
| Created backup | Native inspection, exact artifact full readback/hash, explicit publication association, receipt full reread/hash and final visibility all required. |
| Unknown effect/final listing failure | Single-use/no overrides; no replay, deletion or assumption that stored receipt is absent. |
| Unknown capability | Synthetic 46/46 and native inspector do not certify live coverage, Provider ability or import recovery. |
| Attachments/unattended | Separate attachment owner/composite-drill and existing readiness/rehearsal/activation requirements retained; booleans confer no authority. |

Validation: manually compared exact runner arguments, port IO, effect order,
result/errors and capability limits with the accepted caller contract. Independent
frontmatter/name/description, Markdown reference and private-runtime path checks
passed; task-scoped diff and whitespace checks passed. Skill validator was attempted
once but unavailable (`ModuleNotFoundError: yaml`); no install or repeated failure.
Direct runner 46/46 and prior syntax/import evidence are inherited, not rerun;
source/tests/wiring remain unchanged. These decision checks are document review,
not live/synthetic execution of the workflow. Task token/cost telemetry was not
available; no savings or account-usage-to-task-cost claim. Dispatch requested
Astra/low; no model setting mutation, subagent, task or worktree created.

Resolved: IA-3 backup invocation/procedure integration only. Remaining: concrete
trusted Provider adapters, authentic capability/execution evidence, complete source
coverage/import recovery, attachment owner/composite-drill and existing live gates.
No backup/restore/download/API/credential/profile/login/install/schedule/restart/
activation or Git staging/commit/push/reset/clean/checkout performed.
Next one package: local concrete source/storage adapter boundary intake, identifying
reviewed IO entry points and gaps and settling one implementation/test-wiring brief
under caller contract Sections 1–4; no speculative code or live collection. Other
IA-3 workflows and IA-4 remain separately tracked. Stop this package here.


## Full-Base concrete adapter intake — 2026-09-06

- Class G intake for requested class B adapter integration; protected boundary:
  Provider-owned IO and exact authority. Done: inventory existing callable entries,
  determine implementability under caller contract Sections 1–4, and record the
  concrete missing dependency. Adapter implementation/connection is **not done**.
- Authority: local source/doc inspection only, synthetic verification if code
  changes were viable. No service/API, backup, private artifact, credential,
  profile, grant, install, schedule, restart, activation or separate worker used.
- Model policy: requested Astra/low; no effort exception or setting change claimed.
  Task-level usage counters unavailable; account usage is not a task-cost measure.
- Preservation: inspected initial root and every registered component dirty status;
  edited only this checkpoint and the current handoff opening. All existing code,
  tests, package wiring and component diffs retained. Pre-edit copies of these two
  docs are in `/tmp/full-base-adapter-intake/`; rollback only this task's prose.

| Existing public entry | Actual scope / missing IO |
| --- | --- |
| `providers/lark-base/src/index.js`: `deriveLarkExecutionPolicy`, `inspectLarkBaseExportArtifact` | Pure route decision and supplied-byte inspection, already imported by runner. No native-export executor. `LarkBaseClient` record/media operations and `src/api-operations.js` do not expose a reviewed native full-export operation. |
| `providers/lark-base/instructions/full-base-backup.md` | Reviewed human/browser procedure, including exact Base, export options and ambiguous-download stop. No callable browser/session authority adapter or download-state interface. |
| `providers/google-drive/src/index.js`: `inspectBackupCoverage`, `buildVerifiedBackupReceipt`, `normalizeVerifiedBackupReceipt`, naming and hash helpers | Pure supplied-input core, already used by runner. `classifyBackupStorageInventory` is a retention classifier, not IO or proof of source identity; it cannot replace the required private counterpart. |
| `providers/google-drive/package.json`, `instructions/backup-storage.md`, `knowledge/storage-policy.md` | Binding execution kind is `instructions`; create/list/read and full raw readback described but no exported client/transport or concrete pagination, metadata, raw-byte acquisition or counterpart persistence interface. |
| `scripts/full-base-backup-runner.mjs` | All six accepted ports and single-use sequence implemented; accepts trusted injected adapters, cannot establish their external authority. No additional local wrapper supplies the missing IO. |
| `scripts/full-base-backup-runner.test.mjs`, `package.json`, `scripts/test-all.mjs` | Synthetic adapters and focused/full-suite registration already present. No missing package wiring to repair without new concrete adapters. |

The material unresolved contract is below the accepted six ports, not their
return shapes. Source needs a reviewed callable session binding that proves exact
organization/Principal/Base, enforces the reviewed export choices, returns one
complete download, and retains uncertain acquisition state without replay.
Storage needs an explicit selected transport proving exact actor and drive/folders,
complete pagination/raw downloads and known-vs-unknown write outcomes. In addition,
its private counterpart must durably bind the source selection, destination,
artifact object and receipt object and define verification/read/list reconciliation.
The accepted storage selection has no source Base token or source Principal fields;
public v1 alias/schema/hash and deterministic names cannot establish that binding.
The contract deliberately delegates it to the trusted adapter but does not yet
define the counterpart producer, representation, persistence or verification API.

Adding callbacks with invented attestations would merely duplicate the existing
synthetic ports. Reusing the Lark OpenAPI selector for browser export or Drive,
guessing an endpoint, or treating retention name/hash pairing as authorization
would violate caller contract Sections 1–2. Consequently no speculative adapter,
new tests for invented semantics, or package wiring was added. This is a concrete
dependency hold, not a request for approval to perform already-authorized local work.

Verification: scoped source/export inventory and package registration inspection;
local document links and task-only diff/whitespace checked. Runner 46/46 is inherited
(no executable change, no rerun); earlier PyYAML validator remains unexecuted and
no dependency was installed. Reads were limited to required instructions, current
handoff, grouping/dispatch policy and relevant Provider/runner sources; a few
combined outputs truncated and required narrower follow-up reads. No old task
history, manual exports or private runtime-data opened.

Next one outcome: accept the explicit Provider IO/session plus durable private
counterpart contract described above, then implement source/storage adapters,
direct synthetic success/failure/unknown/readback/receipt tests and necessary
runner wiring together. Live capability/source completeness/import recovery,
unattended readiness/activation and independent attachment owner/composite-drill
remain unproved and gated. This intake does not complete those milestones.


## Full-Base minimal IO contract decision — 2026-09-06

Class G decision-only package; protected Provider IO/authority boundary retained.
Done: classified four reported gaps, chose inline owner-only correspondence and
specified local operation semantics plus exact integrated implementation brief in
[caller contract Sections 6–7](../../runtime/docs/v2-full-base-backup-caller-contract.md#6-minimal-provider-io-decision--2026-09-06).
No source, running policy, profile, artifact or external service changed.

Counterpart requirement originates in existing public receipt reference and Drive
storage step 6. Representation was undefined; separate durable object was not
required. Store private correspondence in the same protected receipt JSON, rely on
existing core-field normalization for public output, derive enclosing receipt ID
from Drive metadata, and use exact artifact reference. Existing native inspection
and full artifact readback bind content/source; no extra manifest or signature.
Current actor checks are execution authority, not historical coverage keys.

Desk verification against actual code:

| Case | Decision / code correspondence |
| --- | --- |
| Normal create | Existing runner accepts full top-level receipt JSON; Drive normalizer projects core fields and unchanged receipt hash. Adapter checks private fields before runner normalization and final query. |
| Unknown export/upload | Single trigger/create; preserve context, read/list reconciliation only. Runner conservatively treats every effect exception as unknown, even pre-dispatch adapter rejection; do not weaken it for more precise labels. |
| Actor drift | Runner compares selection values only; trusted dedicated handle must bind actual identity to operation. Synthetic tests cannot establish live host capability. |
| Readback mismatch | Existing runner checks artifact size/hash and receipt hash; new adapter additionally checks counterpart and candidate exact artifact source/destination. No later write after mismatch. |
| Duplicate/legacy receipt | Preserve independently associated duplicates; missing private mapping blocks relevant coverage. No inferred migration or manual receipt search. |

Read scope: mandatory guide and applicable ancestor AGENTS, backup Skill, direct
receipt and Provider procedures/core, current blocker and handoff prefix, grouping
§3 and Worker/common policy; no long history, private runtime-data or live access.
One oversized bundled source output was narrowed to actual runner/inspector lines.
Root/component dirty inventory inspected; pre-edit three document copies retained
in `/tmp/full-base-minimal-contract/`. Only those three docs changed; rollback only
this package's text. Runner 46/46 inherited; no test repetition for prose edits.
Model default requested Astra/low; no exception or host setting change claimed.
Task token/cache counters unavailable; no account-usage inference or extra telemetry.
Verification completed: all three edited documents' local link targets resolve;
whitespace and scoped `git diff --check` pass. Task-only diff: contract +181/-1,
checkpoint appended, handoff +17/-20; no executable tests run.

Next: Section 7 local adapter implementation/tests/wiring as one package, or, if
LIVE connection is required next, exact owner provision of the two missing trusted
host handles stated there. Neither route needs another abstract contract task.
All previous live, recovery, attachment and activation gates remain in force.


## Full-Base Provider adapter implementation — 2026-09-06

Class B, supporting local composition under accepted Sections 6–7; one checkout,
no delegation/worktree. Implemented both Provider adapters, direct synthetic tests
and `createFullBaseBackupAdapters`. Same dedicated method handles are captured
at construction; actual actor/resource/session enforcement remains the injected
trusted handle's obligation, never a caller boolean or profile-equality proof.
Native export triggers once with all-data/attachment options, reads at most 20
pending states, retains operationRef and stops unknown without retriggering.
Drive completes pagination and full metadata/raw reads, checks candidate native
Base/schema/hash and exact private source/destination/artifact correspondence,
and retains staged unknown writes without replay. Publication requires this
adapter's verified upload; private input is replaced with selected correspondence.
Full stored receipt bytes reach the unchanged normalizer; public report excludes
private fields. Existing receipt version, hashes, coverage keys and runner remain.

Changed paths (all within the accepted brief):
- `providers/lark-base/src/full-base-export-source.js`
- `providers/lark-base/test/full-base-export-source.test.js`
- `providers/lark-base/src/index.js` (additive export only)
- `providers/google-drive/src/full-base-backup-storage.js`
- `providers/google-drive/test/full-base-backup-storage.test.js`
- `providers/google-drive/src/index.js` (additive export only)
- `scripts/full-base-backup-adapters.mjs`
- `scripts/full-base-backup-adapters.test.mjs`
- `scripts/test-all.mjs`, `package.json` (additive focused selector/registration)
- this checkpoint, caller contract status, current handoff prefix.

Verification: `node --test` on the three new paths plus
`scripts/full-base-backup-runner.test.mjs`: **85/85 = 39 new + 46 regression**.
Runner rerun justified by additive Provider index imports; its code is unchanged.
Cases cover creation/reuse/order, all pages/duplicates/invalid candidates,
missing/looping tokens, partial reads, wrong source/parent/object/hash, legacy
missing correspondence, private corruption, current actor/binding change versus
historical content coverage, unknown writes with zero replays and secret-free
reports/errors. Synthetic session rejection includes before-operation failure
and replacement detected during dispatch; this proves propagation, not real
host identity capability. Initial test preparation used absent `python`, then
existing `python3`; first incomplete test preparation failed, final tests pass.
Syntax/import, scoped whitespace and local document link targets checked.

Read scope: mandatory guide/ancestor AGENTS/backup Skill, contract §§1–4/6–7,
Provider procedures/core, current handoff/checkpoint, grouping §3 and common
Worker policy. Oversized combined reads were narrowed; no private artifacts,
old task history, live service, credentials or installed profiles accessed.
Requested model default Astra/low retained without claimed host setting change;
task token/cache telemetry unavailable, no task-cost inference. No downloads,
installations, git staging/commits or production actions. Initial dirty snapshots
of changed existing files are in `/tmp/full-base-adapter-before/`; rollback only
this package's additions, preserving all inherited root/component changes.

Next one outcome: owner/runtime maintainer supplies or authorizes review of the
actual same-session native-export/download and Drive create/list/raw-read handles,
including unknown-write reconciliation. No live driver exists in this package;
actual session authenticity, capability/source completeness/import recovery,
unattended readiness/activation and attachment owner/composite-drill gates remain
open. Manual-export receipt inquiry remains closed.

## Historical consolidation evidence (2026-09-05)

## 1. Evidence and limits

The usage investigation task `01a071dc-b3b4-7662-8cf6-f54aaa77542a` examined four completed workers and a fifth in progress. The completed four were Astra/low, with 307,065 uncached input tokens and 28,300 output tokens; 93.9% of total input was cached. It found repeated full handoff reads and implementation/review/connection orientation. Task lengths and questions differed; separate reviews sometimes resolved real business decisions. These observations do not prove that every split was wasteful.

The report is in that investigation task's outputs as `v2-usage-report.md`. It does not establish weekly-limit conversion factors, causal savings, or another model's superiority. This plan retains Astra/low and targets observed execution overhead first. Do not add a benchmark or another planning worker merely to apply it.

## 3. Remaining-work grouping and retained gates

The [current handoff](v2-task-handoff.md#4-next-work-package) owns the queue. This table defines grouping, not automatic authorization or a new priority order. Current-status observations below come from the checked-in/workspace checkpoint documents, not fresh live verification.

| Remaining family / coverage | One logical worker outcome | Entry evidence and necessary split |
| --- | --- | --- |
| Completed backup gate correction / CP1 | Normal authentication and byte/receipt integrity, explicit unknown-capability validation preparation, independent restoration/cleanup results, direct tests and local wiring | [Fresh local evidence](../../runtime/docs/archive/backup-gate-local-correction-checkpoint.md): 159/159 synthetic tests. Existing dirty and pins preserved. No external test or activation. Do not dispatch this completed correction again. |
| M2U残るProvider/consumer / CP1 | 名前を特定したcaller familyの明示actor選択、対応/非対応ケース、必要な配線・関連回帰をまとめる | 完了済みcore/factory/gift/activity/attachment launcherを再実装しない。任意添付復元の完成と既存callerの選択契約適合は別。live検証は権限が変わる境界で分ける |
| M4 W2 / CP2 | 既知原因の取得修正・試験をまとめ、同一入力coverageとcandidate/preflightを整える | 20件比較済み、8件取得遮断とcandidate未生成。共有Principal個数制限の変更は未承認で判断を残す。別App必須をowner要件と断定しない。activation/apply/scheduleは各権限に従う |
| M4 W3–W6と必要なM3 write / CP2 | 既存workflow一つのdomain移行・必要なwrite・比較準備・IA-3必須指示・関連回帰 | W3合成準備済み。入力/write/backupなど実依存だけを先行条件とする。削除のexact plan/backup/承認/readback/rollbackは保持。新規継続調査等は§7 |
| M5既存activity / CP3 | 既存月次業務のdomain経路・write・比較と直接検証 | read基盤/launcherを再利用。M4全完了やM6追加機能は先行条件でない。新規cost/reward等は§7 |
| M2U-5、M7、IA-4 / CP4 | 最終coverage/指示/参照/必要fixtureを整え、確定pinでclean clone・isolated install・機能/full suiteを検証 | matching evidenceを再利用。個別運用・切替承認・rollback確認は維持。通常reviewを独立reviewer必須へ強化しない。工程名だけでworkerを分けない |
| Optional / migration-plan §7 | 添付復元、能力drill、M5追加機能、M6、M4I追加route、SN/FR/R、性能/文章改善 | 現行必須queueに入れない。再開時に具体的scopeと必要な権限を確認。完了済み証拠は保持する |

現在の次の成果は[handoff §4](v2-task-handoff.md#4-next-work-package)。manual exportのreceipt問い合わせは終了済みであり、再調査やhost保証供給を最初の依存に戻さない。詳細な必須根拠・完了条件・コード是正残は[移行計画§5](v2-migration-plan.md#5-migration-milestones)、後回しは[§7](v2-migration-plan.md#7-post-migration-improvements)に集約する。

## 5. Verification and follow-up

For this documentation checkpoint, verify references, preservation of existing milestone outcomes/gates and the following desk cases:

| Case | Expected grouping / reading |
| --- | --- |
| Accepted adapter design plus direct tests and local consumer wiring | One worker if the named files/effects are already in scope; read relevant contracts once |
| Source of authentic authorization evidence is unknown | Retain an explicit decision/dependency gate; do not fabricate an implementation task |
| Code passes but an independent cutover review is required | Keep that independent review and approval; carry compact verified evidence |
| Plan or target file changed after initial read | Reread the affected section/diff; do not rely on a stale brief |
| Applicable instruction requires a full guide read | Perform the required read; do not bypass it for consumption savings |
| Existing package is running or already complete | Preserve it; regroup only remaining work at a verified checkpoint |

For the next two or three naturally occurring comparable packages, add a short observation to the existing checkpoint if usage metadata is readily available: actual model/effort, uncached and cached input, output with reasoning nesting respected, completed scope, retries and material rereads. Note concurrent account activity. Do not invent a weekly-percentage conversion or require a new monitoring system. If the burden is small or the grouping harms quality, adjust based on results.

This is a consumption-driven follow-up to completed IA-0–IA-2. IA-3/IA-4 and all live gates remain independently tracked. Roll back only this documentation diff if needed, preserving unrelated dirty work and later user changes.
