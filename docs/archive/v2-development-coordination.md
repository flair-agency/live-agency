# v2 Development Coordination

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Updated: 2026-09-07. Coordinator task: `01a0772d-7eaa-7e23-86a8-73d646470bbf`.

## Authority and ownership

This coordinator owns development-side package selection, dependency resolution,
result acceptance and subsequent bounded dispatch in the saved `live-agency`
project (`02dda937-5e00-431f-b8fb-46fcdf22bd90`), directly at
`/Users/naokikimura/workspace/live-agency-provider-runtime`.
The initial local `pwd` matches that checkout. Preserve inherited root and
submodule staged/unstaged changes; do not reset, blanket-commit or substitute a
clean worktree that loses that baseline.

Only offline development is authorized. SEP-2 remains incomplete. External IO,
ambient authentication, business Skills, MCP activation, installation/global
registration, production delivery, publication and schedules remain outside
this authority. The original production recovery coordinator retains production
ownership and its authoritative environment ledger. The development copy of
that ledger is stale and must not overwrite the original.

## Intake change card

- Primary class: G (coordination ledger and evidence reconciliation); adopted
  implementation package: D (existing LIVE caller migration).
- Protected boundaries: existing Skill business contract, selected Provider
  transport and Instance Profile/actor/operation binding.
- Invariants: explicit selection; no ambient fallback; separate create authority;
  deduplication, reviewed plan, readback and uncertain-write reconciliation;
  public/private source separation; retained explicit legacy rollback.
- Begin now: adopt the active LIVE worker and establish this ledger. Acceptance
  requires actual completion evidence, scoped path review and relevant tests.
- Gate before next package: reconcile and accept this worker's outcome or return
  concrete findings to that same package. No second implementation beforehand.
- Verification/rollback: inspect local documentation and worker evidence; no
  external mutation. This new document can be removed independently. Worker
  rollback artifacts must be recorded at acceptance.
- Parallel work: ledger only; worker exclusively owns implementation and
  `v2-task-handoff.md` while active.

## Current queue

| State | Package | Evidence / next condition |
| --- | --- | --- |
| Accepted locally | creator-live-history-sync selected actor/profile/transport | Task `01a0772b-abd6-7472-8811-5df937480007` completed; coordinator accepted 2026-09-07. [Evidence](../../runtime/docs/archive/v2-live-history-caller-conformance.md): 275/275 synthetic tests. |
| Completed locally; inherited | Shared client and creator-insight conformance | [Checkpoint](../../runtime/docs/archive/v2-insight-caller-conformance.md), inventory (retired snapshot; [on-demand investigation](../../runtime/docs/source-runtime-usage.md#on-demand-caller-investigation)): 43/43 direct, 317/317 regression. Not rerun for coordination. |
| Completed locally; inherited | Native backup and backup correction | Existing handoff/checkpoints: 116/116, 194/194 and 159/159. Do not reopen completed experiments. |
| Completed locally; inherited | Gift/activity/attachment packages | Existing [handoff](v2-task-handoff.md#4-next-work-package) and [grouping record](../governance/development-policy.md). Completion does not imply live rollout. |
| Accepted subset; media held | creator-invitation-status-sync selected actor conformance | Task `01a0773f-9f33-7cc2-b786-d6a66c534599` completed non-avatar implementation; 173/173 synthetic passes. Full family remains open for media. |
| Accepted subset; media held | creator-profile-sync selected actor conformance | Task `01a07755-94c6-7bf1-a486-dc2f1a32c585` completed non-avatar implementation; 232 distinct synthetic passes. Full family remains open. |
| Accepted standalone; coordinated deletion held | creator-profile-compaction selected conformance | Task `01a07768-9af3-75e3-ae66-40f6d2f73ab3`; 313 distinct synthetic passes. Maintenance backup/parent-child execution handoff remains unimplemented. |
| Accepted standalone; coordinated deletion held | creator-live-metrics-compaction selected conformance | Task `01a07789-96d8-7723-9912-f525597c6d3a`; 407 distinct synthetic passes. |
| Accepted preparation only; execution held | creator-live-history-compaction selected conformance | Task `01a0779b-5801-7510-bf42-ae6a701f886a`; 464 distinct synthetic passes. Required row-storage receipt/delete/restore execution incomplete. |
| Accepted non-avatar preparation; execution held | creator-invitation-status-compaction selected conformance | Task `01a077a9-fb04-7610-a385-6985581f40a4`; 508 distinct synthetic passes. Required media/receipt/delete/restore incomplete. |
| Accepted offline design | Selected row-archive storage/receipt contract | Task `01a077b6-9826-7a80-8d15-df66d2bc81e8` completed; coordinator accepted boundary, no runtime/test/live claim. |
| Dispatched implementation | Row storage and cross-invocation verification | Task `01a077d1-f8db-7d62-80d0-0eb5335a42d7`, saved development project directly. |
| Separately gated | Live integration, cutover and release | Actual scoped authority and applicable release evidence remain required; npm publication and Work-directory organization are later workstreams. |

The worker-owned [handoff §4](v2-task-handoff.md#4-next-work-package) remains the
implementation dispatch entry. This ledger tracks coordinator ownership and
acceptance, without creating a competing speculative queue. Required dependency
order remains each CP1 route → relevant CP2/CP3 workflow → CP4 release, as defined
in [migration scope](v2-migration-plan.md#5-migration-milestones).

## Acceptance procedure

Use compact `wait_threads` snapshots with the last cursor. On completion, inspect
the concise report, classified changed paths and relevant actual diffs, direct
and regression commands/results, authority boundaries and rollback evidence.
Do not repeat passing full suites merely to recount them. Run additional focused
checks only for changed artifacts, failures or a concrete unresolved concern.
Record accepted scope, findings/limitations and exactly one next package here;
then dispatch a coherent package using the saved development project directly.
Check project routing before dispatch. Omit model overrides unless explicitly
selected by the user under the host tool rules. Do not create another coordinator.

Initial intake read local AGENTS.md, task-orchestration policy, current handoff
§4, consolidation guidance, migration decisions/current mandatory scope/M2U
context, and the complete authoritative private-source guide at the location
specified by AGENTS.md. The guide was not copied or rewritten.

## 2026-09-07 acceptance and next dispatch

LIVE worker completed successfully (completion cursor
`129510bc-b981-490f-be7b-71dc8e0be448:5`). Coordinator inspected the 22-path
report and preservation record, the adapter authority/batch implementation and
runtime changes against package pre-edit copies. All 12 inventory hashes match
current source. Saved `direct.tap` confirms 121 passes and
`affected-regression.tap` confirms 154 passes, with no failures/skips. No suites
were rerun. No blocking finding arose in this scoped review. This accepts local
caller conformance, not deployment, source acquisition or SEP-2 isolation.
Worker evidence records unchanged root/Skills/Base staged entries and 15 bounded
production source hashes; these are bounded worker preservation evidence, not a
fresh whole-production audit. Selective rollback copies remain at
`/tmp/live-history-caller-before-20260906`.

Next change card: D, supporting B/E/G; protected boundary is the existing
invitation status selected caller and transition-history create/readback contract.
The dispatched task inventories its exact consumers and avatar/media behavior,
then implements explicit selection, bound artifacts, existing review/dedup/readback
and legacy rollback with direct synthetic tests and affected regression. Existing
LIVE/insight authority must not expand. Material unresolved media/contract decisions
must be reported rather than guessed. No parallel implementation is dispatched.
The next gate is coordinator acceptance of this one package; external actions
remain separately unauthorized. The worker owns handoff §4 through completion.
Project listing verified the saved development project path before dispatch;
production project routing was not used. User requested completion review and
starting the next task. No automatic successor coordinator was created.

## 2026-09-07 invitation acceptance and profile dispatch

Invitation worker completed (cursor `a5e88c08-5337-4a12-a3da-f61f285761ad:2`).
Coordinator reviewed the 22-path report, actual selected adapter and runtime
approval/reconciliation code, and the operation matrix's unverified append entry.
All 16 inventoried source hashes match. Saved TAP confirms 76 direct and 97
regression passes, no failures/skips; no test rerun was needed. Rollback receipts
and package review diff are retained at `/tmp/invitation-caller-before-20260907`.
Worker reports root/Skills/Base index/staged preservation; no production audit
or rollout is inferred.

Accepted only the non-avatar selected implementation. Any observed avatar or
stored history avatar stops selected execution, so this is not a full-family
completion. Required invitation media functionality remains an unresolved
operation/transport contract dependency, not an optional backup improvement.
Existing v1 behavior is retained. No blocking finding within the implemented
subset; no permission or media-support waiver was granted.

One next package dispatched: profile caller conformance (D, supporting B/E/G).
Protected boundary: existing profile business histories and selected write/readback
binding. Worker inventories profile media first, preserves all business behavior
and explicit rollback, then completes independently supported paths with direct
synthetic and affected regression evidence. A shared media gap must remain explicit;
it cannot be silently discarded or broadly authorized. Supporting adapter/factory
files are bounded in the task brief. No parallel implementation or successor is
allowed. Acceptance of that result is the next dispatch gate.

Project listing reconfirmed the development path before local dispatch. Coordinator
retains this ledger; worker owns handoff §4 until completion. All external/SEP-2,
production, packaging and activation restrictions remain in force.

## 2026-09-07 profile acceptance and compaction dispatch

Profile worker completed at cursor `3524c662-0c46-46a1-b39c-4f3510352b42:2`.
Coordinator inspected the report, adapter batch/response guards and runtime
snapshot, exact approval and media guards. All 16 inventory hashes match.
Saved final-direct TAP is 82/82 and affected TAP 157/157; seven inventory cases
overlap, giving 232 distinct tests. No failures/skips and no coordinator rerun.
Accept non-avatar local conformance only. Required profile/invitation media
remains open: selected byte reads, bound multipart upload and uncertain upload
reconciliation; append separately remains unverified for missing-avatar resume.
No full-family or production completion claim. Worker reports 23 changed paths,
retained index/staged diffs and preimages at `/tmp/profile-caller-before-20260907`.

Next package is profile-compaction selected conformance (D, supporting B/E/G).
Its exact plan/inspect/apply/CLI, deletion approval, retention, malformed blocking
and keep/delete readback contract are the protected boundary. Inventory actual
maintenance/backup/archive/media dependencies before implementation; do not invent
archive/restore functionality or assume sync media holds block metadata retention.
Retain coordinated maintenance full-backup and exact parent/child approval gates.
Only mocked local deletion tests are authorized, never actual deletion. Worker
must return explicit enforcement gaps if found. Definition of done includes
selected binding, exact immutable approved batches, same-actor unknown-delete
readback without replay, legacy equivalence and focused affected regression.
Acceptance is the next dispatch gate; no parallel implementation. Saved development
project path reconfirmed by project listing; no model override or host change.

## 2026-09-07 profile compaction acceptance and LIVE metrics dispatch

Completed worker cursor: `22f94bf3-f2d6-4226-a4a2-e7ca37187d22:2`.
Coordinator inspected checkpoint and actual adapter authorization/consumption,
response matching, runtime workflow hold and full deletion/keep readback. All 16
inventory hashes match. Saved direct.log 111/111 and affected.log 202/202 pass
without failures/skips, 313 distinct; no coordinator test rerun. Accept standalone
selected implementation and coordinated read-only preparation only. Worker reports
21 changed paths and preserved root/Skills/Base index/staged state; selective
rollback receipts remain `/tmp/profile-compaction-before-20260907`.

Coordinated deletion remains required unresolved execution integration: content-
verified same Base/full-schema backup at least as recent as child plan, exact
parent/child approval, serial execution and measured post-backup handoff. Current
maintenance code is planner-only. Explicit fail-closed hold is accepted, not full
maintenance completion. No archive/restore/media prerequisite exists in this
profile-compaction caller. Narrow malformed timestamp coercion correction is
intentional and documented, not historical equivalence for invalid inputs.

Next D package (supporting B/E/G): LIVE-metrics compaction selected conformance,
with exact caller inventory, retained retention/approval/readback and coordinated
hold, explicit legacy rollback and direct affected synthetic regression. Actual
external deletion is unauthorized. Shared helper imports must be checked; no
speculative maintenance dispatcher, media expansion or broad refactoring. Profile/
invitation required media stays open. Project listing reconfirmed saved development
path before direct local dispatch. Worker owns handoff §4; coordinator acceptance
is the next gate and no parallel implementation or successor is authorized.

## 2026-09-07 metrics acceptance and LIVE history compaction dispatch

Completed cursor `32855c04-81c9-4a8c-b453-49f1c0fe7668:3`. Coordinator verified
all 16 source hashes and saved direct 120/120 + affected 287/287 logs (407 distinct,
no failures/skips), inspected actual adapter batch consumption/exact authorization
and runtime workflow/keep verification. No suites rerun. Accept standalone selected
implementation and coordinated read-only preparation; maintenance execution and
profile/invitation media remain required unfinished work. The corrected stale
inventory-count assertion is documented, not an unresolved final test failure.
Worker reports 21 changed paths and index/staged preservation; selective rollback
is retained at `/tmp/live-metrics-compaction-before-20260907`.

Next D package (supporting B/E/G): LIVE session history compaction, including its
actual required row archive/receipt and restore contracts. Unlike preceding
metadata compactions, this caller has archive upload/byte readback and restore
creation authority; these must remain distinct from deletion and maintenance
full-backup approval. Worker inventories supported storage/selected contracts and
reports any concrete missing boundary while completing independent paths. No
actual external action is authorized. Exact current plan/archive/count approval,
retention, full readback, rollback and uncertain-write handling remain required.
Project listing reconfirmed saved development routing; worker owns handoff §4.

Parallel file reservation confirmed to environment/npm coordinator
`01a07748-30d5-7b53-a4aa-c40fe8d0c342`: Skills shared source-provider-api/src/index.js
(additive), new runtime-context.js, private-runtime-files/src/index.js (additive),
Skills test/provider-api.test.js and test/private-runtime-files.test.mjs, its coin
resolver/SKILL/fixture manifest/descriptor/test and root npm-runtime-resolution.test.mjs.
No v2 worker owns these edits. Reserve them from future dispatch until released;
current LIVE worker informed. Read/import dependencies are allowed, mutations must
be coordinated. This is file ownership only, not external/install/host authority.

## 2026-09-07 LIVE history preparation acceptance and invitation compaction

Completed cursor `b0a9c162-316a-4b66-8333-766400884f64:2`. Coordinator verified
19 matching inventory hashes, saved 84/84 direct +380/380 affected logs (464
distinct, no failures/skips), actual read-only adapter and receipt/artifact guards.
No coordinator rerun. Accept plan/inspect/local gzip archive/restore inspection
only; row storage verified receipt, deletion and restore execution remain REQUIRED
unfinished functionality. These tests do not prove selected mutation batches or
unknown-write handling. Local bytes do not establish destination recoverability.
Worker reports 23 changed paths and index/staged preservation; rollback evidence
at `/tmp/live-history-compaction-before-20260907`. Full-Base storage cannot be
silently repurposed for row gzip receipts. Maintenance and media holds persist.

Next D package (supporting B/E/G): invitation status compaction actual callers and
supported selected migration. Preserve adjacent equality, downloaded avatar byte
comparison, self-contained archive, separate storage/delete/restore approvals and
full readback. Worker must isolate unsupported media/row-storage paths without
stripping required behavior or claiming full completion. Last legacy caller
inventory must lead to concrete remaining required contract work, not CP1 closure.
Current environment/npm reservations were explicitly passed to worker; no shared
reserved edits authorized. Saved development project routing reconfirmed. Worker
owns handoff §4; acceptance gates the next dispatch, no external mutation allowed.

## 2026-09-07 RLS-1 reservation release

Environment/npm coordinator `01a07748-30d5-7b53-a4aa-c40fe8d0c342` reports
accepted RLS-1 implementation task `01a0779c-a6eb-7a61-8011-1bbd27281ba9`;
see `npm-runtime-rls1-contract.md` §11. Its coordinator verified 12 exact hashes,
saved direct 21/21 and integration 41/41 including actual Node denied-read
portability evidence. These are inherited coordinator results, not rerun here.

The earlier exclusive reservation of shared source-provider-api/private-runtime-
files indexes/runtime-context/tests and named coin/fixture/npm-resolution files
is RELEASED. Preserve accepted additive APIs, legacy behavior and later edits;
release does not expand any currently dispatched worker's editable scope.
Before-images: `/tmp/rls1-before-20260907-01a07748`; preservation receipt:
designated development `runs/rls1-final-1788713899492747000/preservation.json`.
Next npm artifact-completeness work reads active source only, with no announced
v2 edit overlap. Acceptance remains synthetic, with no production/distribution
authority. This entry supersedes earlier reservation instructions in this ledger.

## 2026-09-07 invitation preparation acceptance and storage decision

Completed cursor `59b2d1f3-7d82-470f-8983-b269f304dd58:2`. Coordinator verified
21 matching source hashes, final focused 68/68 and affected 440/440 saved logs
(508 distinct, no failures/skips), actual read-only selected adapter and avatar
pre-IO guard. Accept non-avatar planning/inspection/local archive/restore conflict
inspection only. Mandatory media, destination receipt, deletion/restore execution
and coordinated executor remain open; CP1 is NOT complete. Intentional exact-text
comparison correction preserves whitespace/Unicode distinctions and is recorded,
not claimed as unchanged malformed/normalized behavior. Worker reports 24 changed
files and preserved staged/RLS-1 state; rollback receipt is retained under
`/tmp/invitation-compaction-before-20260907`. No coordinator tests rerun.

Next E decision package (supporting D/G) owns concrete row-archive storage/receipt
contract for LIVE and invitation. Split reason: missing owning storage/provenance
and cross-invocation trust contract must be resolved before dependent mutation
implementation. Authorized edits: new `v2-row-archive-storage-contract.md` and
handoff §4 only; code is read-only. Deliver current-source evidence, actual trusted
handle/method inventory, selected actor/destination and upload approval binding,
complete measured byte/metadata receipt, persistent verification and unknown-upload
no-replay reconciliation, rejection matrix, rollback and ONE implementation-ready
next brief. Proposed design requires coordinator acceptance, not a rollout claim.
No invented host method or automatic conversion of full-Base storage into row
storage. Mandatory independent media and maintenance executor remain queued.
Saved development routing reconfirmed; no model override or external authority.

## 2026-09-07 row-storage decision acceptance and implementation

Decision completed at cursor `d0bcca8f-1c4b-409e-98e7-1e5a1d7c73a9:2`.
Coordinator read the complete contract, checked all three cited storage/destination/
composition SHA-256 values and actual injected IO/native artifact restrictions.
Accept additive row storage plus private verifier/neutral receipt boundary for
synthetic implementation; no tests were run by the decision package or coordinator.
No real selected Drive client/actor/destination/authority is established.

Next E/D implementation is the exact contract's single storage boundary package:
new adapter, durable journal/approval and full readback verifier, process-local
handles plus cross-invocation untrusted-receipt revalidation, direct two-caller
receipt preparation wiring and focused tests. Worker must exercise actual local
journal persistence/restarts as well as mock service IO. No Lark execution or
media/maintenance hold removal. Design accepted does not authorize upload or
other external action. Concrete client connection remains separately gated.
Package preserves full-Base implementation, immutable existing archives and
separate upload/delete/restore approvals; no new backup experiments. Saved project
routing reconfirmed. Definition of done and exact editable paths in dispatched
brief/contract; acceptance gates next work.

## 2026-09-07 formal namespace migration reservation — deferred mutation

Environment/npm coordinator requested Appendix A (excluding historical harnesses)
and §6 packaging paths of `npm-runtime-formal-distribution-contract.md`. Inspected
complete proposal. Active row-storage worker `01a077d1-f8db-7d62-80d0-0eb5335a42d7`
owns two direct overlaps: LIVE-history and invitation compaction runtime scripts.
Candidate API names/manifests/locks/install state are also shared test inputs.
Do not mutate that graph concurrently. No active worker interruption.

Reserve that formal package's listed paths against FUTURE v2 dispatch, effective
for mutation only after row-storage completion and coordinator acceptance/allocation.
Read-only npm preparation may continue now. Namespace coordinator notified that
no full mutation allocation is granted yet; return newly introduced row-storage
import sites outside Appendix A for explicit allocation at freeze. Row worker
notified to report those sites and preserve current namespace. No subsequent v2
implementation may overlap the reserved formal package until its checkpoint.
This is ownership coordination, not registry/install/production authorization.

## 2026-09-07 row-storage implementation acceptance

Completed worker cursor `26855aa6-2df6-4b2d-8b80-1bd6d5026e62:4`.
Coordinator checked all 24 final-manifest file hashes (all match), saved 252-test
combined checkpoint and latest 38-test composition checkpoint, and actual journal
fsync/exclusive writes, dispatch-before-create, stable attempt consumption,
rehydration and opaque handle verification code. Current distinct evidence is
253 passes: 215 unaffected plus 38 latest, not 252+38. Preservation receipt reports
unchanged staged and unrelated tracked diffs in root/Drive/Base/Skills. No test
rerun was needed. Accept scoped offline row-storage/receipt implementation; no
blocking finding in this review. It does not complete CP1 or certify live IO.

Real Drive client/selection/authority, avatar/media, Lark mutation/rebind/restore
executor and coordinated maintenance remain open. Journal markers must survive
source rollback. Exact preimages/final-manifest and logs retained under
`/tmp/row-archive-storage-preimages-20260907`.

User requested result review only this turn. No successor dispatched. Active
row-worker edit ownership has ended; formal npm coordinator may reconcile its
queued allocation at this checkpoint. No new old-namespace imports in row-created
files were reported. Preserve accepted final bytes and refresh snapshots before
any later namespace edit; no production/publication authority is inferred.

## 2026-09-07 formal namespace candidate accepted; reservation released

Environment/npm coordinator `01a07748-30d5-7b53-a4aa-c40fe8d0c342` reports accepted
worker `01a077da-7870-7b51-a543-95b289189d03` within offline scope. Evidence:
`npm-runtime-formal-distribution-implementation-checkpoint.md` and
`/tmp/formal-distribution-preimages-20260907/final-manifest.json`. Its coordinator
independently checked 115 final hashes, receipt/five tarballs, settled logs and
peer-admission correction/assembler. Reported 1,010 distinct tests = 980 affected
+ 21 direct + 9 payload; the 30-test source-direct log already includes payload.
These are inherited coordinator results, not an independent rerun here.

Appendix A/§6 exclusive reservation, including allocated runtime-context correction,
is RELEASED. Future candidate work uses `@flair-agency/source-provider-api` and
`@flair-agency/private-runtime-files`. Retain the existing lark-base-client identity.
Source locks were qualified offline and four approved local links replaced by the
owning package; preserve this accepted baseline. Historical RLS harnesses/receipts
keep old identities. Row-storage logic changed only at its two approved import
specifiers; journal preservation is inherited evidence. Earlier pre-namespace
source hashes are historical, not current acceptance hashes. Reconcile current
source/namespace checkpoint before any later selective rollback or caller dispatch.
No publication, production, host authority or successor dispatch follows from this
notification. This entry supersedes the pending formal-package reservation.

## 2026-09-07 resume v2 after formal namespace acceptance

Coordinator verified all115 formal final-manifest hashes and saved logs:
980 affected +21 direct+9 payload =1,010 distinct (30 direct log includes payload).
Owning npm acceptance retained; no repeat artifact tests. Fixed stale handoff
row-storage acceptance/count and obsolete queued npm next action.

Dispatched D/E/B/G LIVE standalone selected deletion/restoration package to
`01a07834-291c-7642-bfac-2d855ecf7223`, saved development project directly (listing
reconfirmed). Accepted row-storage contract supplies separate mutation binding,
exact verified handle/approval/rebind and unknown-write boundaries. One caller
family with direct tests/private wiring; no invitation/media or coordinated
executor expansion. Cross-invocation uncertainty requires durable reconciliation,
not fresh-client replay. All actual external operations remain unauthorized.
Worker owns handoff§4; no namespace/pin/lock/installation changes permitted.

## 2026-09-07 LIVE executor blocker accepted; bounded continuation

Worker `01a07834-291c-7642-bfac-2d855ecf7223` completed a contract checkpoint,
NOT an executor. Coordinator inspected actual prepare/inspect/rehydrate equality
and checkpoint hashes. Reported 50 characterization/business/neutral tests are
blocker evidence only. Historical restore cannot regenerate a verified handle
after deletion because original-plan equality is required. No runtime was weakened.

Coordinator resolved locally in row-storage contract's historical-restore disposition:
separate purpose-bound historical admission validates immutable archive plus full
stored bytes, then fresh current restore conflicts/count/schema/selected binding;
upload/delete exact-current-plan rule remains. Private handle purpose must reject
cross-use, with current expiry and independent exact restore approval. No new
external authority. Resume SAME coherent implementation task under this decision,
including direct regression, rather than creating a duplicate worker/planning loop.

## 2026-09-07 LIVE execution accepted; media decision dispatched

Resumed worker completed at cursor `3cd79655-18c7-480c-a799-3611e6b55a5a:5`.
Coordinator verified all18 current inventory hashes, saved216 combined and final72
executor logs:217 distinct =145 retained+72 latest. Inspected owning purpose check,
historical admission, exact executor proof and rebind/target journal/reconciliation
paths. Accept standalone LIVE offline delete/restore implementation; no rerun or
live/CP1 completion claim. Worker reports14 changed files and retained index/diffs;
rollback `/tmp/live-executor-implementation-before-20260907` preserves run markers.

Next E/D/G decision package: selected avatar read/upload/append contracts across
profile/invitation and invitation compaction. Task `01a07854-5e7d-77e2-baab-9f7e15c13d59`
uses saved development directly after project verification. New media contract doc
and handoff§4 only; actual local operation evidence, source/byte/actor/target and
unknown-write boundaries, one implementation brief. Isolate unverified append
rather than blocking independently supported new-avatar upload. No internet or
external discovery authority; exact missing evidence retained if not available.
LIVE executor remains accepted, invitation executor/required media/coordinated
maintenance and actual clients/SEP-2 remain open. Worker owns handoff through its
checkpoint. No parallel implementation or successor authorized.

## CURRENT POLICY — recovery-first integrated v2 (2026-09-07)

This entry supersedes older queue separation and design/implementation checkpoints
as future dispatch rules. Environment separation and package/version management
needed for production stability belong to the v2 dependency plan. Existing Skills
are reported broken; uninterrupted service and a working legacy rollback are NOT
assumed. Prior synthetic acceptance and dependency recovery are not current health.

Latest read-only task evidence: LIVE operations task
`01a05397-d1d0-7ed0-8c7a-c271aee04a4f`, turn
`01a07817-c2fb-7e23-983c-b1c8ced9c17f`, reports insight stopped for missing v2
execution actor and today's backup absent. Invitation operations task
`01a0542f-c5a7-7142-979b-221320e7b47a`, turn
`01a0785c-e2ef-7ca3-9e31-81c2479fc355`, reports target_ambiguous with unresolved
date conversion/due-view use and zero external changes. These are reported failures,
not fresh reproductions or established root causes. Both are idle; active repair
ownership and full user-reported impact are unknown. Coin latest report says its
attachment issue was resolved; no broad healthy-workflow inference follows.

One immediate recovery unit proposed to environment coordinator: reconcile insight
entrypoint and selected-actor injection, synthesize the observed missing-selection
failure, then complete the necessary local wiring/implementation/direct tests as
one outcome. Do not bypass with ambient credentials or assume legacy works. Obtain
actual operational target/actor evidence from its authorized owner before live
Provider verification; related Skill acceptance follows Provider verification,
while Skill implementation/local tests may proceed. No new task or code edit now.

Avatar design worker `01a07854-5e7d-77e2-baab-9f7e15c13d59` is completed,
proposal only, no running v2 worker. Do not start another compulsory spike or
formal design-only approval loop. Confirm ownership and isolate conflicting edits
using Codex Worktree with the required dirty baseline preserved. Unadopted eight-
business-package and Skill/MCP relocation proposals remain unadopted. Explicit
actor/resource/operations, real-data protection and external authority remain.

Replacement AGENTS guide location is authoritative:
`../docs/governance/private-source-integration-guide.md`; read completely this turn.
Old Japanese-path reads remain historical evidence only. Environment coordinator
owns `environment-cleanup-coordination.md`; this task does not edit that ledger.
