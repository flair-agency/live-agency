# LIVE Agency Runtime v2 Migration Plan

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

- Status: Active migration plan
- Created: 2026-09-02
- Branch: `v2/domain-mcp-architecture`
- Stable production line during migration: `origin/main`
- Concise current handoff: `../docs/v2-task-handoff.md`

## 1. Outcome

Priority update, 2026-09-06: follow the [environment separation and production
stability plan](environment-separation-and-production-stability-plan.md) before
further non-urgent implementation in the shared operational checkout. Establish
independent development under `~/workspace/`, preserve existing Work operations,
and run maintenance and v2 development as separate lanes. This changes execution
order, not completed evidence or per-workflow authority and cutover gates.

Version 2 moves provider resolution behind domain MCP contracts without stopping
the existing version 1 operations. Skills continue to represent business tasks.
Creator Scouting and Creator Management become the Skill-facing bounded
contexts. Providers continue to own service-specific acquisition and mutation
knowledge. Drivers remain generic execution mechanisms.

The migration is incremental. A scheduled version 1 Skill remains authoritative
until its version 2 path has passed a source-neutral contract test, a synthetic
integration test, and a reviewed dual-run comparison. Joining the agency never
stops profile, LIVE, account, membership, or activity observation; responsibility
and storage purpose move from Scouting to Management.

## 2. Accepted migration decisions

1. `origin/main` remains the version 1 operational line until version 2 exit
   criteria are satisfied.
2. `v2/domain-mcp-architecture` is the integration branch for cross-repository
   composition, contracts, migration documentation, and pinned component
   versions.
3. The current `live-agency-operations` MCP is a transitional, internal,
   source-neutral acquisition MCP. It is not the final Skill-facing domain
   boundary.
4. The final Skill-facing boundaries are Creator Scouting MCP and Creator
   Management MCP. They run as independent MCP processes so their lifecycle,
   destination, credentials, and audit identities cannot be confused.
5. Relationship-changing BackStage operations use a separately launched action
   MCP. Read-only acquisition never exposes follow, message, invitation, gift,
   or other relationship-changing controls.
6. Every Lark access resolves one service-discriminated Instance Profile. There
   is no automatic fallback across organizations, services, resources, domains,
   authorities, principals, or unverified visibility scopes. API/browser
   transport fallback is allowed only inside one Instance Profile after the two
   routes have proven equivalent access to the same data contract. No MCP
   branches on a Lark product name.
7. Existing TikTok iOS, TikTok Web, and BackStage repositories remain independent
   Provider Bindings. Shared TikTok contracts may move to a private core library;
   repository consolidation is not required for version 2.
8. Accounting and expense Skills remain outside the creator-domain MCPs.
9. The initial v2 scouting scope is TikTok only. Other-platform discovery,
   candidate management, observation, and cross-platform person matching remain
   outside the migration.
10. Full Base backups use distributed recurring runners coordinated by verified
    receipts in the reviewed shared destination. Equivalent concurrent backups
    are retained for reviewed cleanup; file-name locks and successful upload
    responses are not coverage proof.
11. The existing Lark Base Provider remains Base-specific. Future Lark Chat and
    Docs acquisition use independent Provider Bindings and service-specific
    knowledge while sharing only a private Lark authentication and principal-
    identity library. Creator Networks intelligence never uses Flair API
    credentials or a Flair browser account.
12. Every Provider using Lark OpenAPI must support explicit User/Tenant
    selection through private v2 Principal and Instance Profiles for each
    operation whose API contract permits it. This includes Base, Chat, future
    Lark Providers, domain MCPs, and indirect or cross-domain callers such as
    gift projections and backup/recovery. Unsupported combinations stop;
    User/Tenant fallback and ambient identity selection are prohibited.
    Accepted on 2026-09-05 as M2U, a required extension of M2L and an M7 exit
    gate. Existing instance-specific restrictions, including M4I's Tenant
    exclusion, remain in force. See the
    [selection design](../../packages/lark-core/docs/principal-selection.md).
13. Migration execution follows the bounded task policy in Section 5 and the
    current model policy in `../docs/task-orchestration-policy.md`. Work is serial
    by default, and each task produces one reviewable result. Choose reasoning
    effort for the task's risk and ambiguity. A completed task is checkpointed
    and the next package starts with only the evidence it needs.

14. The owner approved the instruction audit and simplification workstream
    (IA-0 through IA-4) on 2026-09-05 as part of v2. After the current package
    is completed, verified, and recorded, run IA-0 through IA-2 before starting
    another migration implementation package. Resume v2 afterward; simplify
    each Skill at its stable workflow boundary (IA-3), and include release-
    required instruction/reference consistency in M7-2 preparation (IA-4).
    Optional editorial improvements do not block v2 completion. The accepted
    model default is Astra with measured exceptions for verifiable repetitive
    work; prior fixed assignments are superseded for new packages. Approval
    does not establish audit completion or change production authority.

## 3. Accepted account-reference contract

Version 2 intentionally defines no stable cross-context creator identity. The
earlier proposal to add and backfill one Flair-owned `creatorId` in both Bases is
superseded and must not be applied.

The current read-only contract carries a platform-account reference containing
`platform`, a normalized current username, and a platform user ID when the source
exposes one. This reference identifies the account under observation; it does
not identify a person, scouting case, or agency membership.

During the freeze:

- Lark record IDs address exact rows only inside one Base and table;
- username and profile URLs remain mutable lookup and external integration
  evidence;
- Lark record IDs remain stable technical relation targets inside one Base;
- TikTok `User ID` remains platform account evidence;
- Creator Management `ID` remains the confidential TikTok LIVE BackStage
  identifier and is not renamed or repurposed; and
- cross-Base matching is analysis evidence only and authorizes no merge,
  backfill, or handoff.

Creator Scouting uses its verified optional `クリエイター.親レコード`
self-relation to represent a reviewed current sub-account-to-main-account link.
Creator Management remains account-centered and does not need that relation.
No Actor, person, Platform Account, Scout Candidacy, Agency Membership, or
Username History master is introduced. The accepted semantics and limitations
are specified in `docs/v2-identity-model-decision-gate.md`.

## 4. Lark organization, principal, capability, and Instance Profiles

M2L replaced the original Base-specific Instance Profile contract with four
private profile types. M4I subsequently added API-user identity for its Chat
read path. Those foundations do not yet provide general User/Tenant selection:
the Base API resolver still requires API-app and legacy consumers can still
construct a Tenant client directly. M2U closes that gap across all Lark OpenAPI
Providers and consumers using these profile boundaries:

- an Organization Profile identifies one Lark organization and records whether
  corporate, subscription, and member details are verified, observed, inferred,
  or unknown;
- a Principal Profile identifies one Tenant application (`api-app`), one
  authorized organization-local API user (`api-user`), or one browser user
  (`browser-user`);
- a capability profile records tenant-level API-budget evidence separately from
  Base-, Chat-, or Docs-specific capabilities; and
- a service-discriminated Instance Profile binds one domain and authority to one
  concrete resource, data contract, set of allowed operations, and explicit
  routes.

The following current and planned profiles remain independent:

| Instance Profile | Service | Organization | Authority/status | Allowed domain use |
| --- | --- | --- | --- | --- |
| `creator-networks-chat-intelligence-read` | Lark Chat | Creator Networks | Read-only / planned | Approved Creator Networks chat intelligence only |
| `creator-networks-docs-intelligence-read` | Lark Docs | Creator Networks | Read-only / deferred | Approved Creator Networks Docs intelligence only |
| `flair-creator-scouting-read` | Lark Base | Flair | Read-only / active | Creator Scouting |
| `flair-creator-scouting-write` | Lark Base | Flair | Reviewed write / planned | Creator Scouting |
| `flair-creator-scouting-invitation-history-write` | Lark Base | Flair | Reviewed write / active in owner-only bundle; not configured or scheduled | Creator Scouting invitation-state history only |
| `flair-creator-scouting-profile-history-write` | Lark Base | Flair | Reviewed write / candidate tooling ready; sharing restriction unresolved | Creator Scouting profile history only |
| `flair-creator-management-read` | Lark Base | Flair | Read-only / candidate | Creator Management |
| `flair-creator-management-write` | Lark Base | Flair | Reviewed write / planned | Creator Management |

A Base Instance Profile owns immutable Base, table, field, view, and relation
IDs and a Base schema fingerprint. A Chat Instance Profile instead owns an
allowlisted chat scope, message and attachment scope, and Chat knowledge
version. A Docs Instance Profile has its own allowlisted document scope and is
not combined with Chat merely because both belong to Lark. Display names remain
informational only. Production organization, principal, resource, and
credential references remain in owner-only configuration outside Git; checked-
in tests use synthetic values.

The reviewed Flair capability evidence dated 2026-09-03 records unlimited basic
OpenAPI calls, 20,000 integration-flow executions per month, a reviewed 20,000-
row Base maximum per table, and Base-to-Base sync as available, with additional
flow capacity purchasable. Its Base profiles derive API-first transport within
the same Flair Instance Profile. Maintenance consumes the numeric Base row
limit rather than the product label.

Creator Networks has an observed 20,000-row Base limit. Under the public plan
comparison reviewed on 2026-09-04, that is evidence for Pro, but the plan label
and tenant-wide OpenAPI entitlement remain inferred rather than administratively
verified. A future Creator Networks Chat API route must therefore apply a
conservative API budget until its entitlement is independently verified. A
Flair app may provide isolated API-adapter conformance evidence but is never a
Creator Networks production route or fallback. Missing, stale, or
cross-organization capability resolution fails closed.

An API credential or User authorization reference is an opaque runtime selector,
not a Secret and not a browser-account identity. Each API Principal is bound to
one expected organization and reviewed App ID fingerprint. An API-user also
requires the exact authorized user and reviewed scopes. The Instance Profile's
selected route references exactly one Principal; User/Tenant mode derives from
that Principal, independently of the App ID and driver. No ambient token or CLI
default may choose the actor. Each browser Principal is bound
to one organization-local account and its reviewed runtime tenant, user, and
domain claims. Launch profiles keep references authority-specific so a process
cannot silently reuse another authority or organization. The two current
organization-specific keychain references remain in private configuration; a
Creator Networks process must never resolve a Flair credential, and a Creator
Scouting process must never resolve a Creator Management credential without an
explicitly reviewed shared-principal decision.

API and browser routes are not compatible by default. Different organizations,
users, chats, authorities, permissions, or approved scopes require separate
Instance Profiles and cannot fall back to each other. A domain contract may,
however, permit quality-graded fallback within the same protected scope without
requiring payload equality; M4I does so by exposing API grade `A` and browser
grade `B` on every observation.

### Data-protection implementation status

Historical implementation evidence follows. Remaining optional attachment,
capability-drill and additional hardening work is classified in §7; required
current-route safety and approved local gate corrections are in §5 CP1–CP4.

The Lark Provider now validates native `.base` exports, binds each artifact to
one expected Base, hashes its complete bytes, and emits a schema-only fingerprint
for coverage matching. The Google Drive `logs-backup-storage` Binding implements
exact destination routing, complete stored-byte verification, content-bound
receipts, shared coverage selection, and deterministic classification of fully
read storage objects into one-to-one verified pairs, orphan artifacts, and
invalid or ambiguous receipts. Production destination identifiers are held only
in an owner-only private profile.

The public retention Skill now creates an owner-only, content-bound dry-run
plan from that classification. It preserves the newest verified generation,
recent daily generations, monthly representatives, unreleased pre-change
backups, and every source referenced by a retained successful recovery drill.
Incomplete drill-reference coverage, orphan artifacts, and invalid receipts
block deletion review. Scheduled execution cannot delete storage objects.

The 2026-09-04 daily Creator Scouting and Creator Management artifacts and their
receipts have now passed complete shared-storage readback and content
validation. The first isolated recovery drill restored both artifacts into new
non-production Bases, matched all per-table record counts (14 tables and 19,860
records for Scouting; 19 tables and 2,072 records for Management), and completed
reviewed cleanup. Management also passed a native re-export and normalized
schema-topology comparison. Lark returned a request error when re-exporting the
larger restored Scouting Base, so its topology result is based on the reviewed
restored tables, fields, formulas, relations, and views rather than a second
artifact hash.

The same drill proved an important limitation: native `.base` import did not
restore attachment blobs, even though the Scouting export was created with the
attachment option enabled. `full-base-export` and `restore_scope=full-base`
therefore describe the reviewed Base structure and record-data scope, not
attachment recoverability. A separate content-verified attachment backup and
restore path is required before avatars or other attachments can be assigned a
recovery guarantee. The Binding remains `unattended: false`; permission
hardening, one end-to-end unattended proof, and the attachment protection path
remain open.

On 2026-09-05 the backup-hardening synthetic checkpoint implemented the
source-neutral contracts for a separately verified attachment set, exact
storage-permission attestation, unattended-readiness review, and a version 2
composite Base-plus-attachment drill. Cross-component synthetic tests now bind
the attachment manifest through storage readback to the isolated-drill receipt
and prove that passing evidence does not authorize production activation. The
production route review, real permission readback, explicitly approved unattended
rehearsal, attachment-capable isolated restore, and retention production
integration remain open; see `docs/v2-backup-hardening-design.md`.

The private Lark attachment acquisition/package adapter is now implemented and
synthetically verified: exact bounded two-pass inventory, reviewed export-bound
restore-key mapping, GET-only acquisition without redirect/retry/fallback,
content-addressed packaging, retained file metadata, complete package inspection
and owner-only local persistence. Its actual synthetic package bytes feed the
storage receipt contract. It does not derive or validate production mapping
provenance, resolve restored records, upload, restore or activate a Binding.
The isolated-destination restore planner and public review are also implemented
and synthetically verified. They require exact one-to-one reviewed keys,
compatible fields, empty attachment cells, identity/provenance agreement and a
fresh destination inventory. New composite preflights bind the exact destination
and attachment artifact hashes. The agreed backup design/synthetic task is
complete, including acquisition-to-plan composition and fail-closed tests; this
does not complete production attachment recovery. Live key/inventory provenance,
selected-actor transport migration, attachment execution/readback and the
separately approved composite live drill remain gated.

The next offline native-key preparation package is also implemented: exact
verified native bytes plus reviewed private rules produce generation-scoped
restore keys; isolated native bytes and independent collection evidence produce
the complete one-to-one destination inventory. Unsupported layouts, missing or
duplicate keys, type changes and nonempty cells stop preparation. Generated keys
require their recovery rules/source evidence inside the verified attachment
package. Synthetic composition recovers those rules from storage and reaches
the non-executing restore review. This does not select real production key
fields, authenticate live collection evidence, prove real import round trips,
or enable a production restore route.

The offline isolated attachment execution contract is now implemented as well.
One exact expiring approval binds the private plan, package, destination,
selected actor and counts. A logical driver rereads each empty cell, uploads
each reference once, appends once per cell, downloads the results and verifies
metadata plus content hashes. No uncertain write is replayed; exact append
readback may reconcile it, otherwise remaining work stops. A source-neutral
public review rebinds the receipt to the composite preflight and rejects missing
cleanup before final drill composition. These are synthetic drivers and data,
not proof or authorization of a live Lark endpoint, actor, destination or
cleanup operation.

The version 2 retention synthetic extension now keeps each selected Base
generation together with all exact bound attachment sets, preserves the newest
complete recovery set, and validates retained composite drill references before
protecting their sources. Missing members or incomplete inventory block review;
expired groups have exact object/byte counts under one non-authorizing plan
hash. Private inventory generation and any deletion execution remain separate.

## 5. Migration milestones

### Current mandatory scope and dependency order (2026-09-06)

This section and Section 7 govern the classification of remaining work. The
milestone records below index implementation and evidence; an unfinished item
is not automatically a release gate. Durations have not been estimated, so
these are critical-path candidates based on technical dependencies, not a
confirmed longest-duration path.

| Required remaining work | Rationale and prerequisites | Completion criteria and current evidence |
| --- | --- | --- |
| CP1: Remaining M2U shared transport, Provider and consumer migration | Explicit approval in Section 2, decision 12. Covers all existing Lark OpenAPI callers, including gifts and backup/recovery. Reuse M2L and the implemented selection contract. | Verify explicit actor selection, supported User/Tenant combinations, rejection of unsupported combinations, targets and allowed operations, refresh, secret protection and uncertain-write reconciliation for each caller. Do not reimplement completed gift/activity/attachment launchers or factories. Disabled optional features must not bypass the selection contract; record their inactive status and rationale in the release manifest. |
| CP2: Domain migration of existing Scouting workflows (M4 W2–W6 and required M3 writes) | Section 1 requires migration to domain MCPs while preserving v1 operations. Each route depends on its CP1 implementation and existing workflow write contract. W4 needs its profile/LIVE inputs; W5 deletion needs backups of the affected data; W6 existing activity updates need M3 writes. | Group each workflow's implementation, necessary wiring, focused regression and required IA-3 instructions. Complete same-input comparison, acquisition coverage, intent/preflight/readback, cutover authority and rollback evidence. W1 is complete at 2/2. W2's 20-row comparison is complete, but eight blocked acquisitions and the missing candidate remain. W3 has synthetic preparation only. The numbering W2 → W3 → W5 → W6 does not itself establish technical dependencies. |
| CP3: Domain migration of existing Management activity (existing M5 functionality only) | Section 1 requires Management separation and continuity of creator-activity-sync. Depends on the relevant CP1 route and existing monthly-update contract, not completion of all M4 work or new M6 functionality. | Preserve existing monthly calculations, writes and sources. Verify Management reads/writes, same-period comparison, applicable cutover checks and rollback. Passing read foundations and an activity launcher do not establish completed workflow cutover. |
| CP4: Operational verification and release of adopted routes (M2U-5, M7 and IA-4) | Requires relevant CP1–3 implementations, final component pins and the actual cutover scope. Establishes reproducible v2 operation and continuity of existing workflows. | Complete selected-profile and loaded-identity checks, applicable scheduled-operation evidence, authorized-operation readback and rollback, final-pin clean clone/full suite/isolated installation and functional coverage of every supported Skill, required instruction/reference consistency, operational documentation, version 2.0.0, normal review and the final cutover decision. Current dirty changes are not finalized; earlier passes do not verify changed artifacts. |

The required convergence is each CP1 route → CP2 or CP3 → CP4. Preserve normal
backup authentication, exact destinations, byte/receipt verification and
uncertain-upload reconciliation. Deletion still requires an exact plan, backup,
approval and readback. Complete optional attachment recovery, capability
exploration drills, cleanup and new features do not join this convergence
(Section 7).

#### Gate dispositions and remaining code corrections

- **Implemented and locally verified, 2026-09-06:** [Local correction evidence](../../runtime/docs/archive/backup-gate-local-correction-checkpoint.md). Local corrections remove blanket
  custom host/session guarantees and separate optional attachment drills from
  unattended backup, capability-validation drills from prior capability
  certification, and restoration success from cleanup. Preserve normal
  authentication, target restrictions, secret protection and receipt/readback
  checks. Allow planning of authorized isolated validation when capability is
  unknown, without claiming certified recoverability. Include corrections in
  CP1 where existing implementation blocks a mandatory route; completion of
  optional features remains in Section 7.
- **Independent attachment-currentness evidence:** Defer this unresolved design
  for optional attachment protection to Section 7. Normal actor/target/operation
  authorization remains necessary; a custom independent producer or continuous
  revocation-evidence requirement is not a prerequisite for all v2 work. The
  factory restrictions remain in code; documentation does not remove them or
  establish operational success.
- **W2 shared-Principal count:** The distinct-App requirement comes from the
  current builder's count restriction. Domain and operation separation alone
  do not establish that a distinct App is necessary. Candidate rejection remains
  a real implementation constraint. The unresolved decision is whether the
  required sharing can be supported through a bounded change or whether to
  retain the restriction and supply a separate credential. There is no blanket
  approval to change W2 restrictions, create an App or activate a route. Keep
  removal of a custom restriction separate from production authorization.
- **Permissions:** Distinguish runtime allowed operations from the account's
  effective permissions. Verify that a read runtime cannot invoke writes;
  reducing every account permission is not a release prerequisite. Production
  configuration and grant changes remain unauthorized.
- **Verification volume:** Remove fixed two-cycle scheduling, a 24-hour wait and
  all-workload benchmarks as blanket gates; defer additional performance and
  endurance work to Section 7. Preserve W1's approved 2/2 evidence. Other routes
  need bounded evidence appropriate to actual scheduling, token lifetime and
  defects; cutover and rollback decisions remain required. Reconcile any fixed
  conditions still present in execution documents or code before execution.
- **Review:** Perform normal diff/test review and coordinator acceptance. The
  M7-3 label alone does not mandate an independent reviewer or separate worker.
  Retain independent verification only where a specific approval contract
  explicitly requires it, recording its basis and scope.

This classification performs no external operation, activation or permission
change and does not declare unverified code complete. Code corrections require
regression checks for the changed behavior. In particular, the earlier 96/96
result is not reused as evidence. The local correction checkpoint records fresh
development-smoke, Provider and consumer regression results.

### Execution policy: bounded tasks and model routing

The [permanent orchestration policy](../governance/development-policy.md) owns change
classification, package boundaries, stopping/continuation, handoff, and model
selection. Apply it to remaining work and relevant reverification; completed
work is not rerun without a relevant change, failure or unresolved concern.

Migration-specific conditions:

- Name exact inputs, one component/consumer family or cross-component contract,
  permitted effects, focused verification and a checkpoint in the package brief.
- Run packages serially in this shared checkout. A verified checkpoint is the
  dependency for the next package; preserve unrelated dirty work.
- Keep implementation, route activation and schedule/cutover authority separate.
  Apply each milestone's comparison, approval, readback and v1 rollback gates.
- Use focused verification inside a package. Run broader composition checks at
  the applicable integration/release gate; repeat only after relevant changes,
  failures or unresolved concerns. Documentation-only work uses scoped diffs,
  references and decision cases under the audit plan.
- Resume from the [current handoff](v2-task-handoff.md#4-next-work-package).
  Historical package tables do not override its reconciled checkpoint.

Use the [permanent model policy](../governance/development-policy.md#6-model-and-reasoning-routing):
explicit Astra/low for coordinator and worker dispatches. Medium/high require
a named unresolved question and an end condition; a bounded implementation
label alone does not justify them. Retain existing verification and authority.
The brief records one outcome, exact inputs/evidence, scope and permitted effects,
model/reasoning, focused verification, stop conditions and checkpoint artifact.
No cycle-count, usage-percentage or mandatory fresh-task gate applies.

#### Milestone task map

The rows below identify coverage and required checkpoints, not a mandatory
one-row/one-worker topology. Use the accepted
[remaining-work grouping](../governance/development-policy.md) to combine one logical
change, direct tests, focused verification and already-scoped local wiring.
Preserve every row's outcome and gate. Separate workers need a concrete authority,
unresolved-decision or independent-verification reason under permanent policy.
This also governs grouping in companion naming/reorganization task maps; it does
not combine unrelated capabilities or remove release/cutover reviews.

This catalogue is coverage history and possible package shapes, not a mandatory
queue. M5 additional features, M6 and other §7 items remain deferred; CP1–CP4
above determine release scope.

| Package | Bounded task and checkpoint |
| --- | --- |
| M0-1 | Inventory component commits, installation commands, and required pins; output one reviewed pin manifest. |
| M0-2 | Prove a clean install and startup for one composition path; output the exact failure or passing log summary. |
| M0-3 | Run the M0 composition regression once and record rollback and reproducibility evidence. |
| M1-1 | Classify one capability family and its domain/authority; output one authority-matrix revision. |
| M1-2 | Implement or revise one source-neutral contract family and its focused tests. |
| M1-3 | Review one resolution or launch boundary for zero/multiple matches, authority mixing, and fail-closed behavior. |
| M1-4 | Run the domain/authority integration gate once and record the accepted contract revisions. |
| M2-1 | Extract and compare one Base schema/export; output a deterministic field, relation, and count diff. |
| M2-2 | Assess one additive schema or compatibility change and implement its focused validation. |
| M2-3 | Resolve one identity, relation, formula, or write-semantics decision and its rejection cases. |
| M2-4 | Perform one bounded read-only profile verification, or one separately approved mutation/readback, and checkpoint exact evidence. |
| M2L-1 | Refactor one Lark service/profile schema or one shared-core responsibility with focused tests. |
| M2L-2 | Verify one Principal, credential fingerprint, equivalence, or fallback rejection boundary. |
| M2L-3 | Reverify one concrete read profile and one exact route; output bounded read evidence and drift result. |
| M2L-4 | Run the M2L integration and rollback checkpoint once across the affected components. |
| M2U-1a | Regenerate the deterministic call-site inventory for one component and report only the diff. |
| M2U-1b | Classify one call-site family against the explicit User/Tenant selection contract. |
| M2U-2a | Implement one API-app or API-user authentication/refresh path with bound identity evidence. |
| M2U-2b | Implement focused transport behavior for one supported operation family, including safe errors and audit. |
| M2U-3a | Migrate one Provider and one identity mode, then pass its supported-operation conformance tests. |
| M2U-3b | Audit one Provider's unsupported combinations, actor substitution, pagination/write uncertainty, and fail-closed cases. |
| M2U-4a | Migrate one consumer family to explicit profile injection and run its focused regression. |
| M2U-4b | Review one approval-bearing, backup/recovery, or cross-domain consumer boundary and its selected actor. |
| M2U-5a | Reverify one selected read profile after restart and record loaded identity, scope, and bounded read evidence. |
| M2U-5b | Execute one separately authorized write/readback or unattended-readiness gate and record rollback evidence. |
| M3-1 | Implement one Scouting read tool contract and Provider route with focused tests. |
| M3-2 | Implement one Scouting write intent/preflight/readback process without activating production writes. |
| M3-3 | Run one bounded read-only production-profile verification and checkpoint drift evidence. |
| M3-4 | Perform one explicitly authorized write/readback gate and record reconciliation and rollback evidence. |
| M4-1 | Build and run the dual-run comparator for one Scouting Skill and one fixed fixture/export. |
| M4-2 | Close one Provider acquisition or evidence-normalization blocker for one Skill. |
| M4-3 | Migrate one approval-bearing Scouting Skill write path, including intent, readback, and uncertain-outcome handling. |
| M4-4 | Complete one Skill's scheduled-cycle evidence and make its individual cutover/rollback decision. |
| M4I-1 | Inventory and bind one exact Creator Networks chat/docs scope, Principal, allowlist, and permission set. |
| M4I-2 | Implement one API or browser read adapter for one allowlisted source with focused tests. |
| M4I-3 | Implement one evidence-synthesis or source-neutral intelligence contract and its incomplete-evidence cases. |
| M4I-4 | Review and activate one read-only route, including identity continuity, scope, rollback, and mutation rejection. |
| M5-1 | Migrate one Management observation/read workflow and run its focused regression. |
| M5-2 | Migrate one Management mutation workflow with bound intent, approval, readback, and reconciliation. |
| M5-3 | Run one Management Skill dual-run against one fixed period/export and explain material differences. |
| M5-4 | Complete one workflow's scheduled-cycle evidence and make its individual cutover/rollback decision. |
| M6-1 | Specify and test the account-level membership transition state machine and exact record references. |
| M6-2 | Integrate one privileged BackStage action with approval, recipient restriction, and audit binding. |
| M6-3 | Exercise one partial-success, send-failed, uncertain-outcome, or rollback scenario with synthetic evidence. |
| M6-4 | Perform one explicitly reviewed live transition/action gate and record exact readback and rollback evidence. |
| M7-1 | Build the final evidence inventory and gap list from milestone checkpoints; do not rerun passing work. |
| M7-2 | Run the recursive clean-clone, composition, pin, full-regression, and isolated clean Skill installation/functional gate; record coverage for every supported release Skill. |
| M7-3 | Rehearse rollback and review credentials, authority, audit, drift, resume, and schedule transitions. |
| M7-4 | Make the final cutover decision and execute only the bounded, approved activation sequence. |

### Consumption-driven execution refinement

The owner approved this follow-up after IA-0–IA-2 completion. Apply the
[consolidation map](../governance/development-policy.md) to remaining work and the
[worker brief](../governance/development-policy.md) at
dispatch. Completed checkpoints remain accepted; do not repeat the original
audit, reconstruct completed packages, or interrupt running workers to regroup.
No production capability or approval gate changes. Measure any improvement in
subsequent natural work; no weekly-percentage reduction has been established.

### IA: Instruction audit and simplification

Status: IA-0–IA-2 completed on 2026-09-05; IA-3/IA-4 pending. See the
[verified checkpoint](instruction-audit-ia0-ia2-checkpoint.md). The
[approved plan](instruction-audit-and-simplification-plan.md) owns detailed
scope, audit dispositions, retained conditions, and representative cases.

| Package | Placement and dependencies | Required result |
| --- | --- | --- |
| IA-0 | First verified checkpoint of the then-current package; do not interrupt in-flight work | Record current evidence, dirty-change ownership, audit targets, and the migration resumption point |
| IA-1 | After IA-0 | Audit shared instructions and parent applicability; disposition conflicts, unnecessary stops, and stale progress |
| IA-2 | After IA-1; before the next migration implementation package | Apply bounded shared-instruction changes, verify relevant cases, and resume v2 from reconciled evidence |
| IA-3 | Per M2U-ready, stable M4/M5 or other adopted workflow route | Reconcile that Skill and direct references while retaining mandatory conditions and rollback evidence |
| IA-4 | Before final M7-2 installation/functional verification | Reconcile release instructions, references, installed routes, and supported coverage against final artifacts |

The first pass is limited to shared instructions, the current-state entry
point, and stopping/splitting rules. A whole-collection rewrite, naming change,
or repository relocation is not an initial prerequisite. IA-1/2 replaced
mechanical cycle, fresh-task and usage stopping rules with the permanent
policy's deliverable, dependency, authority and context criteria.

Do not freeze normal production operations or infer new external authority.
Existing workflow cutover, approval, readback, and rollback gates remain in
force. For already active workflows, assess the applicability of existing
evidence to any revised artifact. Required release instruction/reference gaps
must be resolved; optional prose improvements may be deferred with an owner
and follow-up timing. IA-4 reuses matching M7-2 evidence rather than adding a
duplicate test suite or a new standalone release milestone.

### M0: Reproducible integration baseline

Status: Completed on 2026-09-02.

Work:

- Pin the BackStage provider version that separates invitation eligibility from
  invitation progress and provides reviewed activity observation.
- Mount `live-agency-operations` as a real Git submodule.
- Include MCP installation, startup, and tests in the composition root.
- Keep unrelated accounting and scheduled-operation work out of the v2 commit.

Exit criteria (mandatory scope is CP1–CP4 above; deferred §7 features do not block):

- A recursive clean clone can run `npm ci` and `npm test` successfully.
- The MCP repository and every provider are pinned by commit.
- No credentials, screenshots, production records, or temporary artifacts are
  tracked.

Rollback:

- Continue running version 1 from `origin/main`; no scheduled Skill is switched
  during M0.

### M1: Domain contracts and authority

Status: Completed on 2026-09-02 for domain separation, source-neutral account
observation, and authority isolation. Its earlier stable creator-ID proposal was
superseded by the account-centered model accepted in M2. This milestone does not
expose Lark mutations or BackStage actions, which remain assigned to M3, M5, and
M6.

Work:

- Finalize the capability and authority inventory.
- Publish source-neutral schemas for platform-account references, observations,
  evidence, errors, audit context, write intent, and readback result.
- Implement explicit Provider Binding and Lark Instance Profile resolution.
- Make every zero-match and multi-match resolution fail closed.

Exit criteria:

- Every existing creator-related Skill and MCP tool has one domain assignment.
- Read, Lark-write, and BackStage-action launch profiles are independently
  testable.
- Both domain MCPs accept the same account-observation reference without
  asserting an Actor or cross-Base identity.

Implemented evidence:

- Creator Scouting and Creator Management run as different read-only MCP
  processes while the five-tool mixed process remains available for v1.
- The shared contract package defines platform-account references, observation
  and evidence envelopes, unavailable values, sanitized errors, audit context,
  content-bound write intent and approval, and readback results. It deliberately
  defines no Flair-owned Actor, candidacy, account, or membership ID.
- Private composition Binding Profiles route each capability and input kind to
  one exact package and Binding ID. Zero or multiple routes and missing or
  duplicated installed Bindings fail closed without fallback.
- Lark Instance Profile resolution requires one exact profile ID, domain,
  tenant, and read/write authority. Production IDs and credentials remain out of
  Git and will be supplied during M2 data-model work.
- Authority Launch Profile validation prevents read, Lark-write, and
  BackStage-action processes from sharing process names, audit identities, or
  credential references.

Rollback:

- Contracts are additive during M1 and do not change existing Skill execution.

### M2: Data-model readiness

Status: Completed on 2026-09-04 for the current identity and read-model scope.
The earlier private UUID backfill plan is superseded and must not be applied.
No authoritative Base mutation was performed by the migration task.

Current evidence:

- a fresh user-authorized native Creator Scouting export contains 14 tables,
  19,862 total records, and 1,370 Creator records; the unchanged reviewed
  Creator Management export contains 13 Creator records;
- the fresh Scouting schema was reconciled against its predecessor as exactly
  one additive field, `クリエイター.親レコード`;
- the field is a single-value Creator self-relation with exactly one populated
  link and no multiple-parent, missing-target, self, chain, or cycle issue;
- the stated main/sub example was verified: the sub-account points to the main
  account and the main account has no parent;
- the private assessment reports 13 possible username-based cross-Base account
  links and no current account-reference or implemented relation-quality issue;
- all required profile, LIVE, invitation-state, scout-assignment, Management
  activity, and Management-history relations are intact in the latest
  production exports;
- event-level and aggregate gift tables reconcile exactly by username and
  purpose, so gift rows are not to be remodelled as Creator child rows during
  M2;
- the `DM候補（TTBA）` grid view, rather than the separate `DM可` field, is the
  operational initial-DM candidate source, and its verified action-master
  dependency now classifies `ハートミー`, `メッセージ`, `ギフト`, and
  `スカウト` as prior approaches; and
- the monthly Management activity now has USD `コスト（その他）`,
  `コスト（ギフト）`, and `コスト計`, monthly ROI uses the total, and the
  latest export verifies that Creator-table cumulative cost sums matching
  monthly `コスト計` values and cumulative ROI consumes that result; and
- the refreshed candidate inventory binds the parent relation in addition to
  the initial-DM and monthly Management dependencies; the active read-only
  Scouting profile was refreshed with a rollback copy and passed bounded live
  verification of three tables, thirteen fields, and all parent constraints;
- source-neutral LIVE contracts now accept completed profile-history sessions
  only, match them within one account by exact start timestamp, create only
  unseen starts, and reject duplicate starts and inconsistent totals; and
- Scouting LIVE duration is now explicitly derived from session start/end and
  attributed in full to the JST session-start date, while Management incentive
  calculations use the separate BackStage monthly duration.

Completed scope and continuing constraints:

- Preserve the accepted identifier meanings. Do not add or backfill a shared
  identity field, person master, username-history master, or membership master.
- Keep Creator Scouting and Creator Management account-centered. Use
  `親レコード` only as the reviewed current main/sub relation within Scouting.
- Preserve the implemented separation of LIVE scans, completed sessions, exact
  start-time diff plans, and daily aggregates while defining the reviewed Lark
  write surface and historical backfill. Preserve the accepted Scouting rule
  that the full elapsed duration belongs to the JST session-start date with no
  midnight split, and never substitute that observed aggregate for the
  authoritative BackStage monthly duration used by Management incentives.
- Keep the existing `DM候補（TTBA）` view and its filter fingerprint bound to the
  Scouting read Instance Profile together with the verified action-master,
  activity lookup, assignment start-time, and Creator lookup dependency. Do not
  repurpose `担当クリエイター.DM可` as a scouting-eligibility field. The
  2026-09-04 fresh export, authority-specific credential, explicit approval,
  and bounded live verification gates are satisfied for the active Scouting
  read profile. Any later intervening live schema or immutable-resource change
  requires a fresh export and comparison before the profile is revised.
- Continue to exclude ranking rows without source-backed identity from
  creator-specific calculations, and apply the same quarantine rule if a future
  profile or activity export contains an unresolved relation. Preserve
  username-keyed gift events and resolve historical usernames separately.

Exit criteria met:

- The current schema was captured and reconciled, and the read-profile change
  has an owner-only rollback artifact.
- The parent relation has accepted semantics, immutable bindings, graph
  validation, and bounded live readback.
- Duplicate observations cannot be summed as independent LIVE sessions.
- No migration artifact asserts a person, candidacy, membership, or stable
  platform-account identity from a legacy row or cross-Base match.

Rollback:

- Restore the reviewed Base snapshot or reverse the exact approved schema and
  data plan. Do not infer missing links during rollback.

### M2L: Lark provider and profile refactor

Status: Completed on 2026-09-04. Contract, shared-core, Base-provider,
compatibility-path, private active Scouting profile migration, synthetic
regression, and bounded live reverification all passed. The legacy profile
remains an owner-only rollback path. This milestone does not authorize Chat,
Docs, or Base write access.

This completion covers M2L's original foundation. General User/Tenant selection
for Lark OpenAPI is the separately tracked M2U requirement below, not an
already implemented M2L capability.

Conflict resolved by this milestone:

- the implemented Lark Instance Profile is Base-specific even though the v2
  architecture already names Creator Networks chat and Docs intelligence;
- the current Lark capability profile combines tenant API-budget evidence with
  Base-only row, sync, and backup capabilities;
- API credentials identify a tenant application while browser fallback uses an
  organization-local user, but the current contract does not model those
  principals separately; and
- the next planned Scouting write activation would otherwise depend on an
  identity-ambiguous browser fallback contract.

Work:

1. Define versioned Organization, Principal, tenant-capability, and service-
   discriminated Instance Profile schemas. Preserve explicit `unknown` and
   `inferred` evidence states; do not turn missing third-party administrative
   access into a plan or permission assertion.
2. Extract credential-reference parsing, App ID fingerprint validation, tenant-
   token acquisition, bounded Lark HTTP transport, and browser-principal
   preflight into a private shared Lark core library. It is a library, not a
   Provider Binding and owns no Base, Chat, or Docs surface knowledge.
3. Keep `live-agency-provider-lark-base` as the Base Provider. Move Base row,
   Base-to-Base sync, full-export, table, field, relation, and browser-grid
   knowledge behind a `service=lark-base` profile while retaining a temporary
   compatibility adapter for the active read path.
4. Require every API route to resolve one organization-bound API Principal and
   verify its selected credential's App ID fingerprint. Require every browser
   route to resolve one organization-local browser Principal and revalidate its
   tenant domain, runtime tenant ID, runtime user ID, and resource immediately
   before a protected read, export, or write.
5. Represent route equivalence explicitly. A transport failure may select only
   another route in the same equivalence group; a different organization,
   service, resource, authority, principal scope, or visible data scope stops.
6. Migrate and reverify the active Flair Scouting read profile through the new
   Base contract without changing its resource bindings or authority. Then
   migrate the remaining Flair Base profile candidates.
7. Define, but do not yet activate, separate Chat and Docs Instance Profile
   contracts. Actual Creator Networks Chat acquisition is delivered by M4I
   after its API and browser visibility have been reviewed.

Exit criteria:

- the existing Base test suite and bounded Scouting read checks pass through
  the refactored Base Provider;
- a wrong organization, App ID, browser tenant, browser user, service, resource,
  domain, or authority fails before protected data access or mutation;
- Base, Chat, and Docs profiles have distinct resource schemas and capability
  knowledge;
- API/browser fallback cannot occur without an explicit, tested equivalence
  group; and
- no production identifier, keychain selector, credential, screenshot, or
  source record is added to Git.

Implemented evidence:

- `@flair-agency/lark-core` now owns only credential-reference parsing, App ID
  fingerprint verification, tenant-token acquisition, bounded HTTP transport,
  browser-Principal preflight, and route-equivalence checks. It contains no
  Base, Chat, or Docs surface knowledge.
- Versioned `lark-profiles/v2` schemas separate Organization, API-app and
  browser-user Principal, tenant-capability, service capability, and
  service-discriminated Instance Profiles while preserving verified, observed,
  inferred, and unknown evidence states.
- Base-only row, sync, backup, table, field, view, relation, and export knowledge
  remains in `live-agency-provider-lark-base`. The legacy Base profile array and
  credential-reference client remain as the active read rollback adapter.
- Base, Chat, and Docs resource schemas are distinct. API/browser fallback
  requires a retryable non-write transport failure, one explicit equivalence
  group, and identical organization, service, resource, domain, authority,
  Principal scope, and visible-data scope.
- Synthetic Scouting reads return the same bounded target result through a
  service-discriminated Base profile. The shared core passed 4 tests, the Base
  Provider passed 19 tests, the MCP passed 69 tests after the M3 write-process
  additions, and the full composition suite passed.
- The approved private Scouting read profile was converted to an owner-only
  `lark-profiles/v2` bundle without changing any legacy resource, schema,
  operation, authority, or credential-reference binding. Its API-app Principal
  fingerprint is checked against the resolved credential before access, and it
  has one API primary route with no fallback.
- Bounded production reverification completed in 20 allowlisted requests under
  a 32-request ceiling. After the M2 additive schema refresh, three tables,
  thirteen fields, eight read-only tools,
  audit binding, 1,370 Creator rows, 1,372 profile-observation rows, and 2,880
  invitation-state rows passed together with the parent-relation constraints.
  No Lark mutation occurred, and no private identifier or fingerprint was added
  to Git.

Rollback:

- retain the current Base-only profile loader, client adapter, and owner-only
  legacy profile until every active Base profile has passed the new resolver and
  bounded verification;
- if a later validation fails, restore the legacy active read-only profile and
  version 1 schedules, disable the new resolver, and do not activate a write or
  Chat profile.

### M2U: Explicit User / Tenant selection for every Lark OpenAPI Provider

Status: M2U-1 source inventory, operation-support baseline and pure selection
contract implemented on 2026-09-05. M2U-2a's selected API-user CLI
authentication, runtime actor proof and same-actor reauthorization boundary are
implemented locally with synthetic focused tests; M2U-2b, the remaining M2U-2
integration, M2U-3 through M2U-5 and production migration remain pending.
[Checkpoint and verification](../../runtime/docs/archive/v2-m2u-transport-checkpoint.md).
Local consumer checkpoint, 2026-09-05: the handoff-selected **M2U-4a gift
projection consumer** is implemented with explicit selected Provider/profile
injection and actor/resource/operation-bound approval, fresh preflight and
receipts. Direct synthetic checks passed 29/29; unchanged gift business checks
passed 10/10. This does not complete all M2U-4 callers or any M2U-5 rollout.
See [exact scope and remaining gates](../../runtime/docs/archive/v2-m2u-4a-gift-projection-checkpoint.md).
The private composition launcher is also complete locally: explicit owner-only
bundle/config paths, immutable independent caller/actor/resource/operation
selection, and existing consumer approval/preflight/receipt delegation. Its
focused direct synthetic suite passed 43/43 with syntax/import checks; no
consumer, Provider, core, active profile or live route was changed. See the
[launcher follow-up](../../runtime/docs/archive/v2-m2u-4a-gift-projection-checkpoint.md#composition-launcher-follow-up).
M2U-4b attachment acquisition private composition entry is now complete locally:
explicit owner-only immutable bundle, exact actor/Base/four-operation selection,
lazy selected transport injection after consumer validation, and separate
unauthenticated downloader. Direct synthetic composition passed 59/59 with
syntax/import/diff/reference checks. Consumer, Provider/core and mixed dirty
work are preserved; no live, credential, install or commit action occurred.
See the [composition checkpoint](../../runtime/docs/archive/v2-m2u-4b-attachment-acquisition.md#private-composition-launcher-follow-up).
M2U-2b attachment four-operation mocked pinned-CLI composition now passes
16/16 direct synthetic tests for CLI 1.0.93. No production source repair was
needed; explicit profile/actor, routes, JSON normalization, page and retry
bounds match the inspected local contracts. Actual CLI/live conformance and
the production request-authorization factory remain unproved. Factory intake
identified missing provenance/trusted-evidence inputs. The subsequent
[evidence handoff decision](../../runtime/docs/archive/v2-m2u-2b-attachment-authorization-checkpoint.md#evidence-handoff-decision)
now selects a consumer-issued run-local complete-inventory capability, the same
frozen acquisition snapshot at the factory, and a trusted composition-injected
scope/ACL verifier with fail-closed freshness/revocation rules. This is a local
design, not a production evidence source or new authority. Receipt/selection
hashes and offline key evidence cannot substitute for authenticated grants/ACL.
The accepted core prerequisite is now implemented locally: both selected transports
advertise lifecycle version 1 and synchronously recheck current authorization before
initial/repeated authentication and every business attempt after awaits/delays.
Safe terminal denial preserves existing retry limits and actual-actor proof.
The two direct synthetic suites passed 102/102; syntax/import and scoped diff
checks passed. See the [implementation checkpoint](../../runtime/docs/archive/v2-m2u-2b-attachment-authorization-checkpoint.md#core-lifecycle-implementation).
Provider factory/channel and minimal consumer/launcher wiring are now complete
locally: direct factory 61/61, acquisition 16/16, launcher 59/59 and mocked CLI
16/16 passed against the real factory with synthetic evidence. See the
[Provider checkpoint](../../runtime/docs/archive/v2-m2u-2b-attachment-authorization-checkpoint.md#provider-factorychannel-implementation).
Core 102/102 is inherited, not rerun. No real producer/verifier or live authority
was supplied. The owner review [decision packet](../../runtime/docs/archive/v2-m2u-2b-attachment-evidence-owner-review.md) is now prepared locally.
That packet is historical preparation for optional attachment protection (§7),
not the current migration queue. Authentic sources remain unresolved and no
live capability is certified. Ordinary selected-actor conformance remains required.
The [current handoff](v2-task-handoff.md#4-next-work-package) owns the exact scope.
See the [local conformance checkpoint](../../runtime/docs/archive/v2-m2u-2b-attachment-cli-conformance.md).

This work is required for v2 cutover, including cross-domain Lark consumers.
The [selection design](../../packages/lark-core/docs/principal-selection.md) owns the detailed
contract, coverage inventory, verification and rollout requirements.

Work packages:

1. **M2U-1 — Inventory and selection contract.** Enumerate direct OpenAPI calls,
   Provider factories, shared adapters, domain MCPs, composition scripts and
   scheduled runners. Define explicit API-app/API-user route selection,
   operation-specific token support and rejection tests. Include all gift
   projection and backup/recovery API call sites.
2. **M2U-2 — Shared authentication and transport.** Resolve either API Principal,
   verify organization/app/user, and implement same-actor acquisition/refresh,
   constrained semantic reads and writes, safe error reporting and audit.
   Preserve M4I's read-only restrictions and reject User/Tenant substitution.
3. **M2U-3 — Provider conformance.** Migrate Base and Chat factories, publish
   versioned operation support matrices, and test both supported identities,
   unsupported combinations, pagination, attachments and write/readback paths
   where applicable. Future Lark OpenAPI Providers inherit this admission gate;
   otherwise deferred Docs product development remains deferred.
4. **M2U-4 — Consumer migration.** Inject the selected profile into Scouting and
   Management MCPs and the shared Skill adapter. Migrate all indirect consumers,
   explicitly including `gift-history-sync`, observations, activity, insight,
   compaction, maintenance and backup/recovery API phases. Preserve each
   workflow's approval, data-protection and domain boundaries.
5. **M2U-5 — Rollout evidence.** Reverify each selected profile with bounded
   reads/preflight and authorized writes/readback where required; prove loaded
   identity after restart and unattended readiness where scheduled. Publish
   tested component pins and retain documented v1 rollback until each route's
   existing operational gate passes.

Exit criteria:

- no in-scope production Lark OpenAPI caller remains unclassified or silently
  uses a legacy Tenant constructor under v2;
- each supported operation/identity combination passes conformance, while
  unsupported or unknown combinations stop before protected access;
- dry runs, intents and receipts bind the selected Principal, resolved token
  type, organization/app/user evidence, Instance Profile/route and operation
  contract revision; identity changes require fresh preflight and cannot reuse
  authority solely because target hashes/counts match;
- ambient defaults, cross-actor refresh/fallback, read-only mutations and
  blind retries of uncertain writes are rejected; and
- all migrated consumers pass their applicable live, scheduling, audit and
  rollback gates, with credentials and production evidence kept private.

Dependencies: M2L is complete; reuse M4I's existing User transport without
expanding the active Creator Networks instance's Tenant or mutation permissions.
M4/M5 preparation can continue. Affected route cutovers require their relevant
M2U packages, and M7 requires complete coverage. Creator Networks API activation
still has its independent app-review and same-user/scope gates.

### M3: Creator Scouting MCP MVP

Status: In progress. The read-only acquisition subset, pure account-evidence
review, synthetic Lark read integration, production read-profile activation,
bounded live verification, and inactive synthetic reviewed-write process are
complete. Private write-profile review and activation, existing activity-history workflow migration remains where needed by CP2.
New continuous-investigation and username persistence are deferred to §7.

Implemented evidence:

- the independent Creator Scouting process advertises paired observe/validate
  tools for public profiles, LIVE history, and invitation eligibility;
- private Binding Profiles route public profile to TikTok Web, LIVE history to
  TikTok iOS, and invitation eligibility to BackStage while reporting one
  `tiktok` Provider Family;
- every normalized profile and LIVE result must preserve the exact requested
  account and local Creator record association, with complete coverage and no
  extras; and
- normalized timestamped account observations can now be compared for exact
  current or historical username, TikTok User ID, avatar, and nickname evidence;
  conflicts stop resolution, nickname equality alone creates no candidate, and
  the result cannot update a username, create an alias, change a parent relation,
  or assert person identity;
  and
- all eight tools remain read-only and expose no Lark mutation or relationship-
  changing control; and
- pure read contracts select existing records separately for profile, LIVE-
  history, and invitation-eligibility observation from the current stored
  expiry values, and define the exact counted Creator/profile-history read
  result accepted by account-evidence review without accessing Lark; and
- the Scouting read runtime now resolves current Lark field names from the
  active profile's immutable field IDs, reads Creator, profile-observation, and
  invitation-state rows, verifies exact relations and counts, selects due
  observation manifests, and supplies known evidence directly to account-
  evidence review. Candidate profiles, missing operations, missing fields,
  duplicate records, unresolved relations, conflicting invitation User IDs,
  and ambiguous attachments fail closed; and
- authority-specific `env:` and `keychain:` credential references resolve
  without falling back to ambient generic Lark credentials; and
- the separately launched reviewed-write process permits only append-only
  Scouting activity history and an exact next-action deadline update on an
  existing activity. The process injects its own write profile and immutable
  bindings, resolves current field names and action options from IDs, repeats
  preflight before mutation, treats exact replay as a no-op, blocks partial
  application, and never retries an uncertain write. Synthetic execution and
  MCP integration pass; no production profile or mutation was activated.

Work:

- Preserve the completed M2L read profile and rerun its immutable-binding and
  bounded-read gates before any later profile revision. Do not infer write
  authority from the read Principal.
- Preserve the implemented source-neutral profile, LIVE, and invitation-
  eligibility observation tools and their exact Binding routes.
- The authority-specific keychain reference was supplied under the explicit
  2026-09-04 user approval for `flair-creator-scouting-read`. After the first
  bounded read found one-row drift, a fresh native Creator Scouting export was
  acquired and validated. Its Base ID, schema fingerprint, immutable resource
  inventory, inventory fingerprint, and critical bindings match the reviewed
  candidate; the export and live API both report 1,370 Creator rows. After the
  additive parent-field refresh, final authentication, three-table,
  thirteen-field, eight-read-only-tool, count, parent-graph, and audit-binding
  verification passed. The private read profile is now active as
  an owner-only `lark-profiles/v2` bundle with schema version
  `creator-scouting/v2`; the repeat verification completed at
  `2026-09-04T07:11:55.377Z` in 20 allowlisted requests and no Lark mutation
  occurred.
- Feed the resulting timestamped Lark and Provider observations into the
  implemented account-evidence review tool. Structured username/alias
  persistence remains outside the accepted current scope.
- Keep the implemented Scouting write process inactive until a distinct
  credential reference and explicit activation approval are supplied. Then
  promote an owner-only current-format write profile from fresh authoritative
  evidence and perform a zero-mutation bounded dry-run before requesting any
  operation-specific approval. Never infer this authority from the read
  Principal or accept the legacy profile format.
- Keep new candidate registration, automatic parent mutation, person matching,
  and account merge or split outside the MVP unless separately designed and
  approved.
- Keep personalized initial outreach in the separate action authority.

Exit criteria:

- An existing account-centered record can move from observation to reviewed
  Scouting history updates without the Skill knowing a provider name or external
  UI procedure.
- Append-only history, dry-run, intent hash, explicit approval, safe replay, and
  readback verification are preserved.

Rollback:

- Disable the v2 MCP launch profiles and continue the corresponding version 1
  Skill. Do not delete history written by a successful reviewed v2 operation.

### M4: Creator Scouting Skill migration

Status: In progress. Wave 1 now has a source-neutral synthetic dual-run
comparator for `creator-invitation-status-sync`. It binds version 1 and version
2 captures to one reviewed target manifest and compares coverage, normalized
values, proposed mutations, unavailable values, and stop reasons. The
comparator is non-mutating and always denies route switching. A reviewed
one-row production attempt
proved that both acquisition paths resolve the same private Binding,
implementation, knowledge version, and instructions. Browser acquisition first
stopped because its admin-enforced policy could not be verified. After an
application restart, the same approved target returned one exact BackStage row,
but the displayed avatar had zero exact matches in the current `pageAssets`
inventory. The required complete observation therefore did not exist.
A second, explicitly different due Creator produced the same exact failure.
A third Creator explicitly named by the user and resolved one-to-one in
`selected` mode also produced the same failure after a valid eligibility row
was displayed. The blocker is therefore acquisition-capability-wide rather
than specific to one Creator. Follow-up diagnosis confirmed that the exact row
images were fully rendered signed WebP assets while `pageAssets` exposed no
WebP asset. Private BackStage Provider 1.2.2 now retains the exact eligibility
result, prefers the existing page-asset path, and uses a bounded exact-
`currentSrc` fallback only for a verified row image that is missing from or
cannot be bundled from the inventory. It keeps ambiguity fail-closed, accepts
only HTTPS TikTok CDN sources without redirects or credentials, retains no
signed URL, and validates owner-only image bytes. A successful production dual
run now exists against the new knowledge version. It reused the exact selected
manifest and validated observation, produced both destination dry-run plans,
and returned an `equivalent` five-dimension comparison without authorizing a
write or route switch. The source-neutral invitation-history reviewed-write
process is implemented and synthetically verified as a separate three-tool
surface. Its production profile and separate Principal are now active only in
the owner-only bundle after explicit approval; the process is not in active MCP
configuration. It prepares an exact target- and observation-bound intent,
permits only state creation, latest-identical timestamp extension, and exact
avatar attachment, and requires the reviewed hash plus all four counts before
execution. Preflight and readback recheck current target accounts, due-view
membership when applicable, field and option bindings, target history,
external-user-ID consistency, and avatar bytes. Exact replay is a verified
no-op; partial application, state drift, ambiguous history, or uncertain
readback never triggers an automatic retry. The later reviewed activation
changed only the private profile and Principal states and preserved a rollback
bundle. A separately approved, expiring r6 intent was then applied once: one
state row was created and one exact avatar was attached. Bounded readback
verified both mutations with no uncertainty and no retry. A later explicit
cutover approval added the v2 read and isolated invitation-history processes to
Codex configuration and changed the existing daily heartbeat to the version 2
read-only route. The first application restart loaded both surfaces, and the
initial read-only selection exposed a fail-closed caller-time/source-read-time
race without external mutation. Creator Scouting `0.4.1` and the heartbeat now
anchor current selection to the exact source-read snapshot by omitting `asOf`.
The second application restart loaded the patch, and a live read-only rehearsal
reached the expected `interaction_required` boundary with zero external
mutation. The manual rehearsal does not count. The first 01:40 scheduled cycle
then stopped during Lark target selection with HTTP 400 and zero external
mutation. The shared Lark API transport now refreshes its finite-lifetime
tenant token before expiry and retries only one rejected read after
reauthentication; it never retries writes through this path. A fresh process
passed live read-only selection and the full suite. After restart, the active
desktop process passed the same read boundary. The repaired 04:30 and 05:15
scheduled cycles then both returned the expected `interaction_required` result
with zero external mutation, completing the gate at 2/2.

Implemented evidence:

- the version 2 invitation-eligibility path is documented as using the Creator
  Scouting observe and validate tools rather than resolving a Provider in the
  Skill;
- intact private version 1 and version 2 dry-run plans are compared without
  persisting Creator data in Git;
- target drift and plan tampering fail closed; and
- five synthetic tests prove equivalence, per-dimension differences, reviewed-
  target binding, plan-integrity rejection, and stopped-path comparison; and
- the first owner-only production report records matching browser-security stop
  reasons for both paths and remains ineligible for cutover; and
- the second owner-only production report records matching
  `AVATAR_ASSET_UNAVAILABLE` stop reasons and matches all five comparison
  dimensions, while correctly retaining `different` status because both paths
  stopped before complete observation and dry-run planning; and
- a third owner-only report binds a distinct replacement Creator, again records
  matching `AVATAR_ASSET_UNAVAILABLE` stop reasons across all five dimensions,
  and confirms that changing the target does not clear the capability blocker;
  and
- a fourth owner-only report binds an exact user-selected Creator, preserves a
  valid displayed eligibility value only in private evidence, and records the
  same matching avatar stop across all five dimensions; and
- seventeen BackStage Provider tests cover exact-asset preference, the signed-
  CDN fallback decision, host and protocol rejection, no-redirect and no-URL-
  argument constraints, WebP materialization, private permissions, and partial-
  file cleanup. The full root suite and Provider package dry run pass; and
- one owner-only live verification report confirms Provider 1.2.2 and knowledge
  version `backstage-invitation-eligibility/2026-09-04.1` on both paths, exact
  target binding, successful 2,144-byte WebP acquisition, and normalized
  validation, without a destination read or write; and
- the owner-only `r6` production comparison uses the same reviewed one-row
  manifest, validates both paths, and proposes one create with one avatar
  attachment and no timestamp update in each plan. All five comparison
  dimensions match, the report status is `equivalent`, and result SHA-256 is
  `62d850326c6bd78ca1516ac10293f72837c34ab8af4a3ffe5ebececceddfcaff`.
  The invitation-history write route now has an active owner-only profile and
  separate Principal. Its exact r6 apply was separately approved and verified.
  The schedule switch was explicitly approved and applied without granting
  scheduled write authority. Version 1 remains retained as the rollback after
  the two scheduled version 2 cycles succeeded; and
- synthetic invitation-history write tests prove exact profile injection,
  create-plus-avatar execution, timestamp-only extension, already-current
  handling, exact replay, identity-conflict and partial-application stops,
  count-bound approval, avatar-byte revalidation, uncertain-write readback,
  and fail-closed startup while the production profile path is absent; and
- the first production candidate and `r8` read-only dry run are superseded by
  the later Creator parent-field schema change. M2 has now captured the current
  native export, reconciled the exact one-field addition, refreshed the active
  read bundle with rollback, and completed bounded live verification. M4 then
  regenerated the owner-only write candidate from that checkpoint and repeated
  the production zero-mutation dry run. The immediate preflight was `ready`,
  the exact r6 result remained create 1 plus avatar attach 1, and no mutation
  request was sent. Explicit approval then activated only the write profile and
  separate Principal, preserving the prior bundle for rollback. Startup accepted
  the reviewed profile without calling a tool.
- a fresh dry run through the persisted active profile retained immediate
  preflight `ready`, the reviewed create 1 / timestamp update 0 / avatar attach
  1 / already-applied 0 counts, and zero mutation requests. The resulting
  expiring intent was explicitly confirmed before expiry. The isolated apply
  completed with create 1 / timestamp update 0 / avatar attach 1 /
  already-applied 0; post-write readback verified both mutations, reported no
  discrepancies, and did not enter uncertain-write recovery or retry. The r11
  owner-only receipt SHA-256 is
  `46eae5b96384f59bfa90882c555043905b0a205c1bcf0157c8b1f82a91cf6982`.
  The separate scheduled-route approval was subsequently granted and applied.
  Both v2 processes pass owner-only keychain-backed startup checks with no tool
  call or Lark mutation. The existing daily heartbeat keeps its cadence,
  destination, and active state, and now uses the version 2 read-only route.
  The first desktop restart loaded both surfaces but exposed a fail-closed
  current-time race on the first read-only call. Creator Scouting `0.4.1` fixes
  it without weakening explicit historical cutoff validation, all tests pass,
  and the heartbeat now omits `asOf`. The second restart loaded the patch, and
  a live read-only rehearsal selected the exact due manifest and stopped as
  expected at `interaction_required` with no external mutation. It does not
  count as a scheduled cycle. The first actual scheduled cycle later failed on
  Lark HTTP 400 with zero external mutation because the long-lived API process
  had no tenant-token refresh. The shared transport now performs expiry-aware
  refresh and one read-only reactive retry, with no write retry; a fresh-process
  live read passes. The completion monitor also correlates the exact local
  completed session if the task-history API omits a heartbeat result. After
  restart the active process passed its live read, and the first repaired 04:30
  scheduled cycle returned `interaction_required` with zero external mutation.
  The second repaired 05:15 scheduled cycle returned the same expected result
  with zero external mutation. Scheduled success count is 2/2 and M4 wave 1 is
  complete; the daily v2 heartbeat remains active at 05:15 and version 1 is
  retained for rollback.

Wave 2 synthetic preparation, production comparison, and the isolated
profile-history reviewed-write implementation are complete in the local
checkpoint. The
`creator-profile-sync` adapter maps one reviewed Skill manifest to the Creator
Scouting profile-observation envelope, and the comparator independently checks
coverage, normalized values, proposed mutations, unavailable values, and stop
reasons. Synthetic tests cover equivalence, per-dimension differences, target
drift, envelope drift, plan tampering, stopped paths, and owner-only report
output. The separate write process supports only content-bound profile-history
append and exact avatar attachment, with repeated preflight, replay-safe
readback, partial-application blocking, and no automatic write retry. One exact
20-row production manifest produced equivalent version 1 and version 2 dry-run
plans: 11 creates, zero attachments, and nine explicit unavailable rows, with
no conflicts or target issues. Eight of the unavailable rows were recorded as
browser-blocked after the admin-enforced browser policy became unavailable;
they remain a coverage gate before any schedule switch. A fail-closed candidate
builder is now implemented, but the active read credential is already shared
with the invitation-history write Principal. Reusing it for a third Principal
is rejected before candidate output or authentication. The current builder requires a distinct API app; this is an unresolved implementation constraint, not a newly confirmed owner requirement (see the current mandatory-scope section above). No
profile-history candidate, activation, Lark write, MCP configuration, or
scheduled route is active.

Wave 3 synthetic preparation for `creator-live-history-sync` is implemented
locally on 2026-09-05. Its source-neutral adapter preserves the reviewed target
set and per-row acquisition cutoff/known-session anchors. A LIVE-specific MCP
input/output contract carries that context through provider resolution,
module/instruction acquisition, and observation validation; the shared
profile/invitation target contract is unchanged. The comparator checks the
five migration dimensions, independently requires exact observation coverage,
and blocks missing, unexpected, misassociated, or conflicted inputs even when
both paths have the same defect. Synthetic composed tests exercise the actual
MCP transport through the version 1 destination dry-run planner and comparator.
Skill guidance: `skills/live-agency-skills/skills/creator-live-history-sync/references/v2-dual-run.md`.

This checkpoint does not complete Wave 3 production migration. No production
LIVE acquisition comparison, LIVE/metric domain write-route activation, or
schedule switch was performed. Before a production comparison, verify that
the selected runtime supports the context-bearing LIVE envelope; generic
selection results and older account-only envelopes are not sufficient. A
reviewed production dual run, resolution of unavailable coverage, a separately
reviewed LIVE/metric write route, explicit scheduled-route approval, and route-specific operational evidence with v1 rollback retained remain later gates.

Migration order:

1. `creator-invitation-status-sync`
2. `creator-profile-sync`
3. `creator-live-history-sync`
4. `creator-insight-sync`
5. profile, LIVE metric, LIVE history, and invitation-history compaction
6. continuous investigation and activity-history Skills for existing records

Compaction migration is coordinated by `lark-base-maintenance`. Scheduled runs
may verify shared backup coverage, inspect per-table capacity, and prepare child
dry runs. No scheduled route may delete Lark records or stored backups. An
approved compaction window requires a verified full Base backup completed no
earlier than every selected child plan, each exact child hash/count approval,
readback, capacity recount, and a post-maintenance backup.

For each Skill:

1. Run the version 1 and version 2 read or dry-run paths over the same reviewed
   target manifest.
2. Compare coverage, normalized values, proposed mutations, unavailable values,
   and stop reasons.
3. Require explicit approval to switch that Skill's scheduled route.
4. Retain the version 1 route until the reviewed, route-specific operational
   acceptance criterion passes. W1 retains its completed 2/2 evidence; no fixed
   count is imposed on all later routes by this plan.

Exit criteria:

- All major Scouting Skills use domain MCP tools rather than resolving providers
  directly.
- Changing a Provider Binding does not require a Skill procedure change.

### M4I: Creator Networks intelligence read

Status: Phase 3 bounded conformance/feasibility harness and exact one-chat
allowlists completed on 2026-09-04; the Base-bound Flair route failed closed on
missing app scope, the independent Chat app authenticated but its bot is not in
the target chat, and that Bot path is now retained as historical evidence only.
The same-human API-user/browser-user model and Flair user-OAuth harness are
implemented, and Flair bounded live conformance passed against an isolated
two-message test scope. Creator Networks browser feasibility passed, and the
reviewed one-chat browser Profile plus `read_conversation_messages` runtime are
active read-only. Creator Networks API-user evidence remains optional and
pending app review. The Provider is published in its independent private
repository, and the composition root pins the reviewed Provider commit as a
submodule. The browser-only M4I scope is complete. The workstream is read-only
and non-blocking for migration of the
existing v1 creator operations. It becomes a
v2 cutover prerequisite only if its normalized intelligence capability is
separately approved as part of the v2 production scope. The contract,
fail-closed rules, audit context, synthetic verification, and deferred
feasibility boundary are recorded in
`docs/v2-m4i-conversation-message-contract.md`; source-specific review evidence
remains owner-only and content-hashed.

Every normalized result now carries a Provider-assigned acquisition-quality
grade. Structured API acquisition is grade `A`; authenticated rendered-browser
acquisition is grade `B`. The grade is independent of complete/partial coverage
and does not assess attachment content, OCR output, or whether the source
message itself is true.

The owner reports that the Creator Networks custom app remains under review and
that they cannot add its Bot to the target chat. Read-only console inspection
shows the pending release requests only user-token Chat read scopes, with no
tenant-token scope change. M4I therefore treats the user-access-token API and
browser as two transports for the same human Principal: the browser is the
explicit route while approval is pending, the user API is the planned primary
after approval, and the browser may become its grade-`B` fallback after the
same user and protected scope are verified. Payload equality is not required.
Every Bot/tenant-token route is excluded. The bounded
browser observation now proves the selected browser scope; the owner's report
about tenant administration policy remains operational evidence rather than an
independently verified permanent policy.

Work:

1. Completed: review current official Lark Chat API authentication, permission,
   retention, pagination, edit/delete, thread/reply, sender, and attachment
   behavior.
2. Browser portion completed: the bounded Creator Networks feasibility check
   passed through the approved browser-user Principal and exact chat allowlist.
   No Bot membership was requested or attempted. After app approval, review the
   user-OAuth API route separately and require its exact runtime user ID to
   match the browser user.
3. Completed: create an independent `live-agency-provider-lark-chat` repository and a
   source-neutral normalized conversation-message capability. Keep Lark Chat
   endpoints, browser structure, and schema-drift knowledge private to that
   Provider; keep actual chat IDs and messages outside Git.
   The `providers/lark-chat` package is now version `1.0.0`, contains no
   organization-specific profile or identifier, passes its ten tests and
   private-boundary check, and is published at private remote `main` commit
   `fc9a59ba8e79d598aa53def5e0672af04184868f`. The composition root pins that
   exact commit as `providers/lark-chat` submodule.
4. Browser-only activation completed: the Creator Networks Chat Instance
   Profile resolves one verified `browser-user` Principal and contains no Flair
   or Bot route. The exact reviewed pair and runtime are active read-only. Add
   `api-user` only after its independent review and keep route selection
   explicit until same-user and protected-scope continuity is proven.
5. Browser exercise completed while user-token scopes remain pending. After
   approval, exercise the API-user route as the planned primary and bind it to
   the same exact chat, human user, organization, authority, and protected
   scope. A differential comparison remains diagnostic; browser fallback does
   not require payload equality and must report grade `B` when selected.
6. Use the Flair application's user OAuth, if approved for testing, only through
   a separate test profile and dedicated synthetic/test chat to verify the user
   API adapter. Its result is not Creator Networks production evidence. Retain
   prior Bot/API attempts as historical diagnostics only.
7. Keep sending, reacting, editing, deleting, inviting, and other chat mutations
   outside this read milestone and outside read-authority processes.

The owner supplied one exact approved chat for each isolated test/production
route. The guarded runners
keep persisted Profiles and Principals as candidates,
promote them only in memory for the check, read metadata before content, cap the
window/pages/messages/requests, retain attachment scope at metadata, and emit a
redacted receipt. The Creator Networks browser route additionally requires an
exact observed tenant/user/resource/structure match and evidence that no chat
list was enumerated, no chat was created, and no mutation-like action occurred.
Thirty-two targeted tests pass. The Flair app credential already used by the Base
profiles authenticated, but its first exact message-list GET returned the
official missing-app-scope code; it is not the Chat-enabled credential required
for conformance. The candidate now binds an independently supplied Chat
credential rather than copying that Base Principal. Restricted execution hid
the Keychain item, but an explicitly approved exact lookup outside that sandbox
found it. The independent app authenticated; its first exact message-list GET
returned the bot-outside-chat code, with zero mutations. That Bot result is not
a constraint on the intended same-user production route. The Flair user-OAuth
path now passes synthetic and bounded live conformance: the exact app, user,
scopes, and one-chat allowlist were verified; two messages were normalized in
complete metadata and content passes using two GETs, with no raw content output,
fallback, activation, or mutation. The initially approved browser origin was
the Flair tenant; an exact target-name search returned no Creator Networks
result. The later Creator Networks browser check verified the authenticated
organization and human-user display, selected the owner-bound exact visible
title, and normalized one recent topic post, its complete zero-reply thread
boundary, and one image attachment's metadata. The tenant-origin direct URL
form returned HTTP 404 and is excluded from the accepted route. The browser
identity remains an owner-only derived fingerprint rather than an official
Lark `open_id`, so it cannot enable API/browser equivalence. Creator Networks
Chat mutations, attachment-byte reads, API-route activations, and automatic
fallbacks remain zero. The exact browser-only Principal, Profile, and Agency
Intelligence runtime are active read-only.

Exit criteria:

- at least one independently approved Creator Networks route can read an
  allowlisted chat into a normalized, source-neutral result with complete audit
  context and no Flair credential;
- the same Creator Networks human user is independently bound to every enabled
  API-user/browser-user route; the browser route is proven without Bot
  membership while approval is pending;
- a non-allowlisted chat, mismatched organization/account, missing permission,
  unknown schema, or ambiguous visibility fails closed;
- API and browser quality differences are reported rather than hidden by
  fallback, and automatic fallback is enabled only after same-user and
  protected-scope continuity is verified; and
- no chat mutation is exposed.

Rollback:

- remove or disable the Chat Provider Binding and its launch profile. Existing
  Base, Scouting, Management, and version 1 operations remain unchanged.

### M5: Creator Management MCP and Skill migration

Current scope: only migration of existing activity/membership observations and
existing activity updates is mandatory. New support/incentive/reward/departure
workflows and new ROI functionality are deferred to §7; their release-required
approval is unconfirmed. Preserve existing source and valuation semantics.

Work:

- Place BackStage membership and creator activity under Creator Management.
- Migrate `creator-activity-sync`.
- Migrate the reads/writes needed by existing activity operation. Additional
  membership, support cost, incentive, reward and departure workflows: see §7.
- Keep estimated coin consumption separate from accounting expenditure.

Exit criteria:

- Management operates without reading Creator Scouting as its active data store.
- Migrated existing activity values preserve their source and valuation policy.
  New cost/reward/ROI features have no mandatory exit criterion here (see §7).

Rollback:

- Re-enable the version 1 activity route and reconcile any reviewed v2 writes by
  the exact Management record and month addressed by the approved intent.

### M6: Account-level membership transition and privileged actions

Status: deferred to [§7](.#7-post-migration-improvements). No evidence establishes new
account-level transition or initial-DM automation as required to preserve existing
v1 operations. Their release-required approval is unconfirmed. M3/M5 write
foundations do not authorize these additional actions. Existing action safety
contracts remain applicable if this work is later adopted.

### M7: Version 2 cutover

Exit criteria (mandatory scope is CP1–CP4 above; deferred §7 features do not block):

- A recursive clean clone passes the full test suite.
- M7-2 proves fresh installation and installed-route functional coverage for
  every supported release Skill under the gate below, independently of any
  Skill naming or repository-reorganization workstream.
- IA-4 reconciles release-required instructions, references, and invocation
  routes before M7-2 final verification. Missing mandatory guidance, broken
  required references, or unresolved authority/route conflicts block affected
  release coverage; optional editorial improvements do not block release.
- Every scheduled creator-domain Skill has completed its dual-run gate.
- M2U is complete for every included Lark OpenAPI Provider and consumer,
  including cross-domain gift projections and backup/recovery API paths.
  Supported User/Tenant combinations are verified and unsupported combinations
  explicitly rejected. Future-only Providers retain the same admission gate.
- Launch configuration, credentials, authority, audit metadata, drift response,
  resume, rollback, and migration procedures are documented.
- The composition package and final domain MCPs are versioned `2.0.0`.
- Version 1 schedules are disabled only after their version 2 replacements are
  verified.

After these criteria pass, merge the integration branch through normal review.

#### M7-2 clean Skill installation gate

Status: Required release verification; not established by the existing M0
record, local full-suite passes, or the single-Skill symlink CLI test. Adding
this gate to the plan does not claim that it has run or passed.

Prepare a release Skill coverage manifest and bounded installation/smoke-test
packages before final M7 verification. Run the final gate with the published
component commits pinned by the release composition. Apply the permanent model
policy for preparation and execution; separate a failing test family into a
focused repair package rather than broadening a single verification task.

1. **Fresh environment and dependencies.** Recursively clone the pinned
   composition into a fresh location, install dependencies from the lockfiles,
   and run the installer against an empty isolated destination using its
   explicit destination option (`--dest` in the current installer). Declare
   toolchain prerequisites and prevent reliance on existing Skill links, the
   developer checkout, untracked files, old dependency directories, undeclared
   global libraries, or private runtime state. Record private-repository or
   registry access prerequisites separately from business-service credentials.
   Keep the user's live Skill installation intact.
2. **Complete installation coverage.** Enumerate every supported release Skill
   and verify its installed identifier, source revision/provenance, required
   instructions, references, resources, executable entry points where present,
   and declared dependencies through the installed route. Explicitly classify
   frozen, retained-prototype, and deferred Skills; their presence is not a
   claim of active support. Do not silently drop a failing Skill from the
   release manifest.
3. **Functional coverage.** For each executable Skill, exercise its principal
   supported path from the installed location with synthetic inputs, checking
   expected results and relevant Provider resolution or MCP interactions.
   Verify the intended stop for missing configuration or external capabilities.
   Imports, help output, and argument validation alone are insufficient.
4. **Instruction and host coverage.** Incorporate IA-4's release manifest and
   rule/reference dispositions against these final pins. Verify that mandatory
   instructions are reachable before use and that active and retained routes
   have no unresolved authority conflicts. Optional editorial debt is recorded
   separately and does not block this gate. Reuse matching evidence rather
   than repeating the same checks. For instruction-only or interactive
   Skills, verify referenced resources and required tool/capability contracts.
   Where invocation depends on host loading, include a bounded host discovery
   and invocation check for the supported installation mode. Identify steps
   requiring authenticated services, devices, or separately approved actions;
   synthetic success does not prove those live steps work.
5. **Evidence and release decision.** Record pins, toolchain/environment,
   isolated destination, exact checks, per-Skill outcomes, limitations, and
   applicable operational-evidence references. Installation or functional
   failures and unexplained coverage gaps block M7-2. Report external
   prerequisites as unverified when unavailable; do not use that classification
   to waive existing workflow dual-run, activation, or scheduled-cycle gates.
   Keep code-installation success distinct from production readiness.

M7-2 owns this baseline even if no Skill is renamed. SN-2 owns packaging-change
distribution, collision, provenance, existing-installation preservation, and
rollback tests; SN-5b owns the selected naming workstream's clean-clone
verification. Reuse their evidence only for matching artifact pins, scope, and
environment, and account for the rest of the release in M7-2. Reorganization
phase R3 incorporates this evidence; optional repository moves remain outside
the mandatory M7 scope.

### Companion workstream: Skill naming and responsibility alignment

The reviewed [LIVE Agency Skill Naming Policy](../governance/skill-naming-policy.md) and
the draft [Skill Naming and Migration Plan](../reviews/v2-skill-naming-and-migration-plan.md)
define an independent v2 workstream. It aligns every repository Skill, plus the
separately gated foreign-revenue migration, with the `live-agency` namespace
and the existing public-Skill/private-Provider boundary. Its SN and FR packages
are planned work only. They do not alter this plan's milestone status, current
next-package priority, M7 exit criteria, route authority, schedule cadence, or
frozen-workflow status until a later explicit scope decision incorporates a
bounded package.
Do not repurpose or force-update `origin/main` during migration.

## 6. Work ownership during migration

This integration branch owns domain decisions, MCP contracts, submodule pins,
cross-repository compatibility, migration gates, and cutover documentation.
Provider repositories continue to own service-specific knowledge. Skill
repositories continue to own business-task procedure and safety rules. Version 1
scheduled tasks continue normal operations until individually migrated.

M2U is accepted migration work, not a deferred optional feature. General token
support does not activate a new resource, mutation, or messaging capability.

New feature work that is not required by the next migration milestone remains
deferred. In particular, automated creator discovery, general-purpose messaging,
multi-node iPhone operation, and low-volume Promote automation are not M0-M4
blockers. Read-only Creator Networks chat intelligence is the separately gated
M4I workstream; it is not a messaging-action capability and does not delay the
existing v1-to-v2 Skill migrations unless explicitly added to their cutover
scope.


## 7. Post-migration improvements

The following items are excluded from mandatory migration-completion and
activation criteria. Deferral does not imply completed implementation or a
capability guarantee. Confirm scope and required operational authority when
resuming. Return an item to the critical path only if an actual requirement of
existing operations is established, with its rationale and dependencies.

| Improvement and original location | Rationale for deferral and resumption conditions |
| --- | --- |
| Attachment-byte acquisition/restoration, independent mapping/currentness evidence, composite drills and retention (Section 4, M2U-2b/4b, M4 W5) | Current avatars are reacquirable auxiliary information. Complete restoration of all Base features is unproved and is not a v2 completion requirement. Assess scope separately for Consumers that need protection of actual data. Explicit-actor migration of existing M2U callers remains in CP1. |
| Backup capability exploration drills, expanded production recovery and Provider feedback (Section 4) | A small fixture's success does not certify general capability. Capability validation measures unknowns; cleanup handles test assets and has a separate outcome. Incomplete cleanup alone must not turn successful restoration into a failed restoration result. |
| Custom backup host/session guarantees and additional permission hardening (Section 4) | These are additional guarantees beyond normal authentication, target and byte/receipt checks. Approved local corrections blocking mandatory routes remain in CP1. Verification of a route that will actually run unattended is still required. |
| New continuous investigation, username/alias/parent persistence and candidate registration (M3/M4 W6) | These change business or identity behavior beyond existing workflow migration. Existing activity-history migration remains in CP2; new contracts need a separate decision. |
| Support cost, incentive, reward, departure and new ROI functionality (M5) | Approval making these additions release requirements is unconfirmed. Only work needed to preserve existing monthly activity and calculations belongs in CP3. |
| Account-level membership transition and privileged-action integration, including initial DMs (M6) | These are not technical prerequisites for moving existing operations to domain routes. Future implementation must preserve exact account/record correspondence, partial-success reconciliation, separate action authority and distinct send_failed/uncertain outcomes. |
| M4I user-OAuth primary/fallback, Docs, other platforms, automated discovery, multi-node iPhone operation and Promote | Browser-only M4I is complete. Adopt additional routes individually after external review and same-user verification where applicable. They do not block existing v1 creator-workflow migration. |
| Blanket 24-hour endurance runs, fixed-count additional observations and all-workload benchmarks | Preserve existing individual evidence. Checks required by relevant defects or actual operation remain in CP4; additional performance and endurance improvements follow migration. |
| SN/FR naming and accounting migration, repository relocation and optional IA editorial work | These are independent companion plans, not adopted v2 prerequisites. Required M7/IA-4 reference, installation and functional checks remain. Do not resume frozen prototypes. |

### Restorable Lark Base backup Provider capability (2026-09-06)

Owner decision: defer feedback to the responsible Provider and consideration /
implementation of a restorable Lark Base backup capability until after v2
migration. This is a future backlog item, not a required v2 completion or
activation gate. Avatars are reacquirable auxiliary information; attachment
restoration is not required for the current business use of avatars.

The future capability should package native `.base`, attachment bytes, and a
correspondence manifest identifying the original table, record, field and
position within each attachment cell, together with their restored counterparts.
Consider verification after storage and restoration of sizes and SHA-256 hashes,
structure, records, links and attachment cell membership (including order and
empty cells), reporting missing, extra and unresolved correspondence.

Evidence: the [2026-09-06 roundtrip result](../../runtime/docs/archive/backup-roundtrip-result.md#measured-comparison)
matched 2 tables, 7 field definitions, 5 records and 4 attachment references with
0 missing / 0 extra / 0 unresolved after attachment supplementation. Native
`.base` alone omitted attachment bytes in this fixture. Observed field/record ID
retention is not a general guarantee, and complete restoration of all Lark
features is not proven. See the result's [detailed unverified scope](../../runtime/docs/archive/backup-roundtrip-result.md#local-evidence-and-scope).

This entry records the future backlog only; it does not initiate Provider
implementation, live testing or external feedback. It adds no new host/session
requirements and does not change existing migration or activation gates.

## Backup capability common contract checkpoint (2026-09-05)

The separately approved source-neutral implementation is complete:
[checkpoint](../../runtime/docs/archive/backup-capability-contract-checkpoint.md). Added pure normalization,
execution companion validation and per-target Consumer assessment in the existing
source-provider-api package; 13/13 direct contract and existing API tests pass.
This does not complete M2U evidence gates or certify any Provider's live backup or
restore ability. Business policy, receipt adoption and deployment remain separate.
The subsequent Consumer review and local integration are recorded in the handoff;
this completed checkpoint does not select another package.
