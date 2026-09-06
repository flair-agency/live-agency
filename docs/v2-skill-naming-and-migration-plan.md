# LIVE Agency Runtime v2: Skill Naming and Migration Plan

- Status: Draft companion plan; recommended placement is an independent v2 workstream. Incorporation into the master v2 milestones and exit gates has not been decided.
- Created: 2026-09-05
- Governing policy: [LIVE Agency Skill Naming Policy](skill-naming-policy.md).
- Scope: All 16 repository Skills, including the frozen prototype, and `foreign-revenue-accounting` currently maintained outside the repository.
- Accepted direction: Apply the naming policy to every in-scope Skill and migrate the source-neutral foreign-revenue Skill responsibilities into `live-agency-skills` after separating Skill and Provider implementation.
- Implementation status: Documentation only. No Skill rename, source migration, publication, activation, schedule change, or frozen-workflow reopening has occurred.

## 1. Version placement and relationship to the active migration

Recommend an independent v2 workstream rather than a new v3 architecture.
The [active v2 plan](v2-migration-plan.md) already separates business-task
procedures from service-specific Provider implementation and preserves
incremental cutover and rollback. Naming consistency and the foreign-revenue
source relocation apply those boundaries to the existing collection. They do
not introduce a new creator identity model, new creator-domain ownership, or a
replacement architecture.

The namespace remains `live-agency`. Neither the plan's v2 label nor a future
contract version belongs in a Skill name. Version incompatible capability or
receipt changes individually; a contract-version change alone does not define
a new system-wide v3 milestone.

The companion plan has these integration boundaries:

- Apply the reviewed naming policy to new and revised Skill designs immediately.
  Switch installed identifiers only through the rollout packages below.
- Coordinate Scouting renames with M4 and Management activity renames with M5.
  Preparation can proceed independently; changes to an active route require
  evidence for that exact route and a suitable cutover checkpoint.
- Any changed Lark OpenAPI path remains subject to the existing M2U admission
  and verification requirements. A rename does not bypass them.
- Keep foreign-revenue accounting and coin-expense work outside the creator-domain
  MCPs, as required by accepted v2 decision 8.
- Track the foreign-revenue migration as independently gated accounting work.
  Do not make its completion a prerequisite for unrelated M4/M5 routes or
  automatically add it to the existing M7 exit criteria.
- Before merging this workstream into the master v2 scope, state exactly which
  packages must finish for M7 and which may ship as follow-up v2 work. Align the
  master plan, capability inventory, handoff, and progress network then.
- Preserve the current next-task priority. This document does not supersede
  the active handoff or change the existing implementation queue.

The alternative of a v3 program should be reconsidered only if the eventual
design requires a materially new architecture or if the owner deliberately
defers this work into a separately scoped release. Neither is established by
the current naming and migration requirements. Deferral alone can also be
handled as a v2 follow-up without inventing a new architecture version.

## 2. Initial review of all 16 repository skills

These are naming and responsibility-design candidates, not an immediate rename
manifest. The first column identifies existing source material.

| Current identifier | Actual task | Candidate identifier | Alignment considerations |
| --- | --- | --- | --- |
| `creator-activity-sync` | Reconcile monthly activity results with existing records and apply authorized metric changes | `live-agency-creator-monthly-activity-reconcile` | Distinguish this from scout activity logs and observed LIVE duration; state that only existing records may be updated |
| `creator-invitation-status-sync` | Record invitation-eligibility observations as transition history | `live-agency-creator-invitation-eligibility-record` | Distinguish eligibility from the progress of a sent invitation; reconcile the existing state contract with v2 vocabulary and migrate the contract if its meaning narrows |
| `creator-profile-sync` | Record profile observations and avatar evidence as history | `live-agency-creator-profile-record` | Explain that this is neither general current-value editing nor overwriting past history; move Lark-specific routes behind the boundary |
| `creator-live-history-sync` | Record LIVE sessions and point-in-time metrics from an observation | `live-agency-creator-live-observation-record` | Include the metric snapshots omitted from the current name; two storage destinations alone do not justify two skills |
| `creator-insight-sync` | Update the current assessment and approved characteristic tags from evidence | `live-agency-creator-assessment-update` | Includes inference rather than simple transfer; do not expand it into all forms of creator assessment |
| `creator-profile-compaction` | Prune profile-observation history according to retention policy | `live-agency-creator-profile-history-prune` | This is a business decision not to retain some information; distinguish it from resource reclamation or lossless compression and preserve account-continuity review evidence |
| `creator-live-metrics-compaction` | Retain representative point-in-time LIVE metrics and prune other history | `live-agency-creator-live-metric-history-prune` | Distinguish metric snapshots from session history and specify evidence retained to cover missing values |
| `creator-live-history-compaction` | Retain required session history and archive selected records before deletion | `live-agency-creator-live-session-history-prune` | Distinguish sessions from metric snapshots; describe archive restoration as a supporting history-management procedure, separate from whole-system production recovery |
| `creator-invitation-status-compaction` | Remove only adjacent duplicate states while preserving transitions | `live-agency-creator-invitation-eligibility-history-deduplicate` | This is not global deduplication; preserve A → B → A; the eligibility vocabulary requires the same contract review as the recording skill |
| `gift-history-sync` | Merge partial observations of agency-funded gifts into a master | `live-agency-gift-history-merge` | Distinguish the durable master from derived summaries; this is neither all gifts received by a creator nor accounting expenditure |
| `coin-expense-reconcile` | Match coin-purchase evidence to existing expense candidates and verify approved registrations | `live-agency-coin-purchase-expense-reconcile` | Distinguish purchases from coin consumption, estimated gift value, and new manual expense entry |
| `coin-expense-weekly-application` | Frozen prototype that groups weekly coin expenses into a draft or submitted claim | `live-agency-weekly-coin-expense-claim-submit` | Preserve frozen status; the week is the claim unit, not the execution cadence; evaluate separate draft-preparation and submission responsibilities only if development is reopened |
| `lark-base-backup` | Check coverage, create backups for a requested recovery scope, and verify stored content | `live-agency-data-backup-create` | Reuse equivalent artifacts; separate Base-specific formats and routes from the abstract contract and explicitly define attachment coverage |
| `lark-base-backup-retention` | Protect retained generations and dependent artifacts while planning and verifying deletion of unneeded backups | `live-agency-data-backup-prune` | Make deletion visible in the name; if the delivered capability only plans, use `live-agency-data-backup-retention-plan` or complete the execution route before advertising pruning |
| `lark-base-disaster-recovery-drill` | Restore stored artifacts into an isolated environment and verify recovery scope | `live-agency-data-recovery-test` | Does not promise all disaster-response work or production recovery; move technology-specific restore routes and checks into Providers |
| `lark-base-maintenance` | Coordinate capacity, history pruning, backup coverage, generation retention, and recovery testing | `live-agency-datastore-maintain` for the shared maintenance responsibility | Defer a one-to-one migration; separate protection-policy review, capacity maintenance, and business-history retention; place technology-specific operations in Providers and organization-specific sequencing and cadence in Runtime |

Supporting retention or recovery modes alone do not justify additional skills.
Split when a task needs independent selection and has independent inputs,
completion conditions, or authority. Conversely, review responsibilities before
lengthening a name to cover unrelated tasks that users would not expect from it.

## 3. Foreign-currency revenue accounting: inclusion and separate migration

`foreign-revenue-accounting` is explicitly in scope for the same naming rules.
Its target home is `live-agency-skills`; repository ownership is no longer an
open classification question. The current source is a regular directory at
`~/.codex/skills/foreign-revenue-accounting`, rather than a symlink to the public
skill repository as with the other 16 skills.

The workflow has two stages: recognizing foreign-currency revenue from a final
invoice, and later matching a bank receipt and settling the receivable. Because
their inputs and occurrence times differ, the candidate responsibility split is:

- `live-agency-foreign-currency-revenue-recognize`
- `live-agency-foreign-currency-receivable-settle`

The naming rules apply regardless of whether the final design uses one skill
or two. Confirm that granularity while preparing the separate migration plan.

Migration requires implementation separation, not a directory-only move:

| Responsibility | Intended destination |
| --- | --- |
| Source-neutral recognition and settlement workflows, normalized contracts, deterministic calculation and reconciliation, reviewed plans, and result validation | Public `live-agency-skills`, with synthetic tests |
| Invoice-source recognition and parsing, service-specific acquisition, exchange-rate acquisition adapters where needed, accounting-system lookup and mutation, and destination readback normalization | Appropriate private Provider implementations, resolved through versioned capabilities |
| Organization-specific accounting choices, source and destination selection, and monitor scheduling policy | Private profiles and Runtime composition under the existing configuration boundary |
| Real invoices, bank details, journals, account identifiers, credentials, plans, and monitor execution state | Approved owner-only storage outside Git |

The separate plan must inventory the current instructions, scripts, references,
private profiles, and callers; identify which portions already satisfy these
boundaries; define the required contracts and Provider ownership; and specify
synthetic validation, installation and reference updates, cutover, and rollback.
Include temporary receipt-monitor lifecycle behavior so that migration neither
duplicates existing monitors nor changes settlement authority.

The migration direction is agreed. Execution remains separate work; the bounded planning and implementation
packages below establish the migration sequence. This document does not move the current implementation,
publish its contents, or change or certify accounting policy.

Externally distributed OpenAI, Lark, Canva, and similar skills are outside this
collection and are not renamed under its conventions.

## 4. Bounded work packages

Package labels below belong to this companion plan; they are not new master
v2 milestone numbers. Complete and checkpoint one bounded result at a time.

The [M7-2 clean Skill installation gate](v2-migration-plan.md#m7-2-clean-skill-installation-gate)
owns the mandatory baseline for every supported release Skill, whether or not
this naming workstream is adopted. SN-2 adds packaging/distribution, provenance
collision, existing-installation preservation, and rollback checks. SN-5b
provides clean-clone installation/regression evidence for the selected naming
scope. Reuse evidence only when artifact pins, scope, and environment match;
M7-2 must still cover all other supported release Skills. This does not add
unselected SN or FR packages to the master release scope.

| Package | Work and affected sources | Dependencies | Completion evidence |
| --- | --- | --- | --- |
| SN-1: Finalize the responsibility and rename manifest | Review all 17 source Skills; resolve the alignment questions in Section 5; record exact source paths, target identifiers, splits or extractions, ownership, lifecycle status, and affected callers | Naming policy | Every source is accounted for, target identifiers are unambiguous, and each target has defined inputs, effects, completion criteria, and required implementation changes |
| SN-2: Prepare distribution and compatibility | Update public Skill packaging, necessary private Provider Skill packaging, and the Runtime installer; define explicit selected roots, provenance, collision handling, and reference migration | SN-1 target manifest | Synthetic installation proves both public and private sources are found, ambiguous names are rejected, unrelated installed files are preserved, and a rollback mapping exists |
| SN-3: Rename and align one existing workflow per batch | Update names, directories, descriptions, metadata, relative imports, tests, and callers; extract technology-specific behavior where necessary instead of only changing labels | SN-1; SN-2 for installation; applicable M4/M5/M2U or data-protection dependencies | Focused behavior and contract checks pass; required provider-neutral boundaries are met; frozen prototypes remain frozen |
| FR-1: Inventory foreign-revenue source and define contracts | Inspect the standalone Skill's scripts, references, private profiles, calculations, connector calls, and monitor dependencies; decide one or two Skills and required Provider capabilities | Naming policy; Section 3 placement | A complete source disposition map, versioned normalized contracts, exact private ownership, synthetic fixtures, and an approved-scope cutover design |
| FR-2: Separate and package foreign-revenue implementation | Put neutral workflows and logic in the public skill repository; put source parsing, service adapters, and execution in appropriate private Providers; bind them in Runtime | FR-1; SN-2 for installation | Public code runs against synthetic normalized inputs without private service knowledge; composed Provider tests prove contract compatibility and preserve accounting and authorization semantics |
| FR-3: Cut over foreign-revenue invocation and monitors | Replace the standalone installation and callers with the reviewed packaged Skills; reconcile temporary monitor ownership and current execution state | FR-2; exact installation and runtime inventory | One authoritative installed route, preserved existing journal and receipt evidence, no duplicate monitor, and a documented rollback; no production journal is created solely to prove relocation |
| SN-4: Cut over renamed existing workflows | Change installation and caller references for one verified batch, including exact automation prompts where applicable | Corresponding SN-3 batch and its existing route gates | The new identifier resolves to the intended pinned source; schedule cadence and authority are unchanged; required operational checks pass and old references are either migrated or deliberately supported |
| SN-5: Reconcile the workstream and integrate | Reconcile the complete manifest, remaining exceptions, package pins, installation and clean-clone evidence, and the chosen master-plan scope | All packages included in the selected release scope | No unaccounted source or accidental duplicate, reproducible composition, verified rollback instructions, and aligned v2 planning documents |

SN-3 can complete independently for each existing workflow; it does not wait for
FR-2. FR-1 can be planned while other migration packages continue. Any selected
scope reduction or deferred target stays explicit in the manifest rather than
being reported as complete.

For a name-only change, use focused discovery, installation, reference, and
behavior-preservation checks. Reuse existing verified evidence where it still
applies. When the change alters contracts, provider routes, or effects, run the
corresponding existing dual-run and operational gates; do not claim a rename
proves semantic equivalence. Preserve any scheduled-cycle requirements already
imposed by the affected v2 workflow.

### 4.1 Execution task map and model routing

Run these packages serially within a single affected Skill or distribution
batch. A task receives only the named source paths, manifest rows, and focused
verification command; it does not receive the accumulated migration history.
Apply the [permanent policy](task-orchestration-policy.md#6-model-and-reasoning-routing):
explicit Astra/low for new coordinator and worker tasks. Medium/high require
a named unresolved decision and an end condition, not a task category. Retain
the outcomes, stop conditions, authority, and verification gates below. Older
fixed model assignments are removed; historical evidence is unchanged.

| Task | Bounded outcome | Stop condition |
| --- | --- | --- |
| SN-1a | Inventory one source Skill's identifier, callers, contracts, lifecycle, and Provider dependencies. | One source row is complete; no name or code changes. |
| SN-1b | Classify one source Skill's responsibility, target identifier, split/merge decision, and public/private ownership. | The row is reviewable; unresolved semantic evidence is explicit. |
| SN-1c | Review one finalized manifest batch for identifier collisions, frozen-state preservation, and authority-boundary conflicts. | The batch is accepted or has a precise decision blocker. |
| SN-2a | Inventory one installer/source-root path and its selected-source, provenance, and collision behavior. | One installer boundary and its tests are identified. |
| SN-2b | Implement one bounded packaging or installer compatibility change with synthetic tests. | The selected roots resolve or reject deterministically. |
| SN-2c | Exercise one collision, rollback, or same-name provenance boundary. | Ambiguous sources fail closed and the rollback mapping is recorded. |
| SN-3a | Prepare one workflow rename batch with exact files, references, compatibility inputs, and focused checks. | The batch is small enough to implement without unrelated paths. |
| SN-3b | Rename and align one verified workflow batch, including contracts, metadata, callers, and focused tests. | Behavior remains verified and no Provider-specific detail enters the public Skill. |
| SN-3c | Review one batch that changes a Provider route, authority, or business effect against its applicable M2U/M4/M5 gate. | The route remains inactive or has the exact evidence required for its existing gate. |
| FR-1a | Inventory the standalone foreign-revenue source, callers, monitor lifecycle, and service-specific dependencies. | One source-disposition map is complete; no source is moved. |
| FR-1b | Decide the recognition/settlement split and public-Skill/private-Provider boundary for one accounting workflow. | Authority, accounting semantics, and unresolved source evidence are explicit. |
| FR-2a | Implement one source-neutral foreign-revenue contract or workflow against synthetic inputs. | Public tests pass without service-specific information. |
| FR-2b | Implement or review one private Provider capability, including authorization and readback boundary tests. | Unsupported acquisition or mutation paths fail closed. |
| FR-3a | Prepare one installation/caller/monitor cutover plan with a one-route rollback mapping. | Duplicate monitor or invocation risk is resolved before activation. |
| FR-3b | Execute one separately approved accounting invocation or monitor cutover/readback gate. | Stop on any uncertain journal, receipt, or monitor state. |
| SN-4 | Cut over one already-verified rename batch and record exact source selection, caller update, and rollback evidence. | The old route remains recoverable until the batch-specific gate passes. |
| SN-5a | Reconcile the final manifest, exceptions, and package-pin inventory without rerunning passing work. | Every selected source is accounted for or explicitly deferred. |
| SN-5b | Run one clean-clone and focused installation/regression gate for the selected workstream scope. | Report one reproducible pass or exact failure; do not broaden scope. |
| SN-5c | Decide whether the selected workstream scope may be incorporated into the master v2 release evidence. | Keep it independent unless the owner explicitly changes M7 scope. |

Any task that inspects or changes an authenticated or non-public source must
first read the project's full private-source integration design guide. A task
that finds no applicable guide, an ambiguous source boundary, or a missing
authorization stops with its smallest next decision; it does not widen the
task or fall back to an ambient identity.

## 5. Alignment review and migration conditions

For each skill, compare its name, description, instructions, executable code,
input/output contracts, and actually available capabilities. This initial review
covers all entrypoint documents, related designs, and representative
dependencies; it is not a completed conformance review of every code path.

Resolve the following before implementation:

1. The meaning of invitation eligibility and its consistency with the existing
   state contract.
2. LIVE-session identity: the current skill instructions use creator/start/end,
   while the domain document uses account/startAt.
3. Business evidence that profile and LIVE-metric pruning must retain, and
   removal of direct Provider dependencies from the public workflows.
4. Technology-neutral backup, restore, and maintenance contracts, supported
   scope, and artifact dependencies.
5. Separate management of frozen, prototype, implemented, and active status.
   Renaming must not activate a workflow.
6. An installer that explicitly selects private Provider-supplied skills and
   detects name collisions.
7. The detailed `foreign-revenue-accounting` source and dependency inventory,
   including the Skill/Provider split described in Section 3.

Existing names have no privileged position in naming design. Existing operations
still matter during migration execution. Use an old-to-new mapping to update
skill references, relative imports, package distribution contents, descriptions,
UI metadata, existing automation prompts, installation links, tests, and
documentation. Renaming does not justify changing automation cadence or
authority.

Old names and identifier strings in saved plans or receipts may be bound to
hashes and audit evidence. Do not mechanically rewrite historical artifacts.
Distinguish display names from contract identifiers and, where needed, separate
legacy-contract reading from new-contract generation. Compatibility references
must not cause duplicate implicit selection or execution of the same task.

## 6. Rollback and scope controls

- Planning packages change only reviewed documentation and synthetic artifacts;
  they do not alter live routes.
- Before installation cutover, record the exact old and new Skill source paths,
  package revisions, selected Provider bindings, caller references, and affected
  automation identifiers in the appropriate private runtime record.
- Roll back a distribution or rename batch by restoring its previous selected
  sources and references. Reconcile any writes using the original domain
  receipts; never interpret a code rollback as undoing a business transaction.
- Retain the original foreign-revenue source and its references until packaged
  invocation and rollback are verified. Relocate or retire it through a reviewed
  installation step without leaving duplicate active entrypoints.
- Preserve current monitor identities and ownership. Rollback must not spawn a
  second receipt monitor or repeat a recognition or settlement journal.
- Do not modify production data, accounting policy, sharing, credentials,
  existing schedules' cadence, or frozen-development status merely to satisfy
  this plan.

## 7. Reviewed evidence

- [Domain model](live-agency-domain-knowledge.md): business contexts, observations versus monthly activity, coin purchases versus consumption, and data protection.
- [Existing architecture](../provider-runtime/skills/live-agency-skills/docs/provider-architecture.md): public contracts, private implementations, and data outside Git.
- [Repository skill sources](../provider-runtime/skills/live-agency-skills/skills): all 16 `SKILL.md` entrypoints.
- [Installer](../provider-runtime/scripts/install-codex-skills.mjs): the single public skill source root and same-name link handling.
- [Existing roadmap](live-agency-mcp-roadmap.md): both the business-task definition of a Skill and the cross-domain infrastructure workflows; align these definitions when implementing this convention.
- Local `foreign-revenue-accounting/SKILL.md`: recognition, settlement, private-profile boundaries, and temporary receipt-monitor lifecycle.

The parent project's `AGENTS.md` and the read-only project source titled
“Private-source integration Skill design guide” were also consulted. This
document preserves their service-specific-information and production-data
boundaries without superseding canonical-source or publication decisions.
