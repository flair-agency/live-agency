# LIVE Agency Repository Responsibilities and Reorganization Plan

- Created: 2026-09-05 JST
- Status: Reviewed direction; implementation pending. This document is a plan, not a record of relocation, renaming, publication, or production cutover.
- Baseline: Root HEAD `3ab116b` and local changes at inspection. Operational status comes from existing handoff and cutover records; live services, scheduled runs, and private receipts were not reverified for this plan.
- Governing policy: Cross-boundary classes C/D/E under the [permanent task orchestration policy](task-orchestration-policy.md). Changes to operational routes also require the individual class F gates.

## 1. Purpose and target responsibilities

Priority update, 2026-09-06: the [environment separation and production stability
plan](environment-separation-and-production-stability-plan.md) introduces an
urgent independent development checkout under `~/workspace/` while retaining
the existing Work project. The later physical-reorganization phases below do
not defer that separation. Internal ownership and layout remain unchanged;
optional repository moves and renames remain separate work.

Keep this root as the place that assembles public Skills, private Providers, and MCPs at pinned commits and provides startup and composition verification. It may also remain the entry point for system design, cross-component task coordination, and releases. Acting as that entry point is consistent with its responsibilities.

The reorganization establishes clear ownership of reusable implementation, reduces the context needed to change each component, and removes implicit dependencies that exist only in the root checkout. Repository counts, directory counts, and renames are not completion criteria.

| Owner | Permanent responsibilities | Placement |
| --- | --- | --- |
| Public `live-agency-skills` | Business and shared operational Skills, normalized contracts, decisions, reconciliation, result validation, and the Provider API | Publicly distributable knowledge and synthetic fixtures. Service-specific acquisition and operation methods belong in Providers |
| Private `live-agency-provider-*` | Surface recognition, acquisition, operations, normalization, stopping conditions, and versioned knowledge | Preserve independent iOS/Web/BackStage and Base/Chat Bindings. Technology-specific Skills also belong with the corresponding Provider |
| `live-agency-operations-mcp` | Domain contracts, business invariants, tool implementations, and processing through injected Providers | Separate Scouting/Management/Intelligence/action processes and authorities. A separate Git repository for every process is unnecessary |
| `@flair-agency/lark-core` | Shared Lark authentication, Principal verification, and transport | Treat it as an independent package and retain `packages/lark-core` for now. A separate Git repository is a conditional later decision |
| This runtime root | Pins, dependency graph, Binding selection, startup injection, composition tests, organization-specific rollout/recovery control, cross-component design, and task policy | Wiring code belongs here. Split files containing service operations or domain decisions by responsibility at the function level |
| Owner-only operational storage | Production data, credentials, concrete Profiles, approved intents, receipts, and execution state | Separate from Git-managed source. Changing an existing private path is an independent operational migration |

The previously suggested names `live-agency-runtime-composition` and `live-agency-lark-core` describe candidate roles. They do not establish a decision to create or rename repositories.

## 2. Current v2 progress and reorganization constraints

Do not infer current progress solely from an older PERT chart or a design document's opening status. The planning baseline below prioritizes the [handoff](v2-task-handoff.md), [M2U checkpoint](../provider-runtime/docs/v2-m2u-transport-checkpoint.md), and [attachment consumer checkpoint](../provider-runtime/docs/v2-m2u-4b-attachment-acquisition.md).

| Current status | Reorganization implication |
| --- | --- |
| M0/M1/M2/M2L completed their original scope | Apply the accepted responsibility boundaries to placement rather than reopening the foundational design |
| M2U-1 and M2U-2a have local checkpoints; shared transport is committed. M2U-2b onward, complete consumer coverage, and rollout remain pending | Keep authentication changes separate from moving core into another repository. Continue 2b using the existing package name and location |
| The Base attachment consumer has bounded local hardening evidence; overall integration and production proof remain pending | Neither classify all M2U-4 work as unstarted nor treat one consumer's evidence as complete coverage. Refresh the caller inventory during reorganization |
| M4 W1 is recorded as complete through two repaired scheduled cycles | Preserve its current placement. Obtain new operational evidence appropriate to any later identifier or startup-route change |
| W2 has an equivalent 20-row comparison and synthetic write implementation. Dedicated-app, observation-coverage, activation, and cutover gates remain | Structural cleanup does not resolve these blockers. Prioritize the outstanding gates and avoid delaying cutover for a rename |
| W3 synthetic preparation is complete; production comparison, writes, and cutover remain. W4 onward and M5/M6 also have outstanding work | Place new implementation with its intended owner immediately. Move substantial existing code in separate checkpoints |
| M4I has recorded browser-read operation; API review is a separate track | Classify Provider processing, domain processing, and startup injection within the root Intelligence implementation before extracting it |
| Backup hardening has synthetic checkpoints and uncommitted changes; production attachment recovery and other gates remain | Keep acquisition/restore with Base, storage with Drive, shared validation with Skills, and cross-component composition with root |
| Skill naming and responsibility migration have a separate companion plan; their inclusion in M7 is undecided | Reuse SN/FR packages and identify the batches selected for release before M7 |
| M7 is incomplete; root and several submodules contain unsettled changes | Distinguish local passing tests from clean-clone proof using published pins. Preserve other tasks' changes when defining reorganization commits |

## 3. Phased execution

Use verified checkpoints, rather than calendar dates, to determine readiness. Preserve the existing v2 priority path. Incorporate responsibility fixes needed for safety or reproducibility into the applicable v2 package and defer optional structural work.

| Phase | Entry condition | Work | Exit evidence and next gate |
| --- | --- | --- | --- |
| R0: Establish ownership and the relocation manifest now | The current checkout can be inspected | Map each file/major symbol to owner, caller, v2 dependency, and relocation phase. Identify authoritative permanent documents and migration records. Make new-code placement rules discoverable at the task entry point | Every root script, package, and document is classified as retain/split/move/decide later. Record only verification status for live references held in a private manifest |
| R1: Align boundaries during M2U-2b through 4 | Relevant operation contracts and component checkpoints exist | Clarify package APIs and injection in callers already being changed by M2U. Put shared authentication in core, Base/Chat operation constraints in Providers, domain contracts in MCP, and concrete startup wiring in root | Conformance and rejection tests pass for the affected consumers; pins agree. Component contract tests can run without depending on the root's filesystem layout. Hand off to M2U-5 |
| R2: Align each M2U-ready workflow before its cutover | Relevant M2U-3/4 work and workflow tests pass | For uncutover M4/M5 workflows, apply selected SN batches and necessary extractions in separate diffs. Extract Intelligence responsibilities after its consumer is stable | Comparison, installation, and operational evidence cover the final artifact that will run. Defer optional renames that are not ready |
| R3: Finalize the release composition before M7 | Required workflow and M2U gates pass | Finalize components, pins, and lockfiles for adopted changes. Update the authoritative index, operating instructions, and temporary compatibility-route manifest. Run the M7-2 clean-install baseline in Section 7.1, composition tests, and rollback verification | Do not add optional repository splits or renames to M7. Record remaining placement debt with its owner and follow-up phase |
| R4: Reorganize physical placement after M7 | A formal v2 baseline and rollback record exist; affected files have no concurrent edits | Move classified docs/scripts, handle old references, and archive migration tools whose use has demonstrably ended. Evaluate a separate core repository if justified | Verify references, imports, startup, installation, and clean-clone behavior. Retain pins and mappings needed to restore the prior composition |
| R5: Make additional repository changes only when justified | A cost-benefit decision independent of R4 exists | Rename root, change remotes, relocate the working directory, or split additional repositories | Use a dedicated migration plan covering external references. Choosing not to perform a cosmetic rename is a valid completed decision |

R0 is primarily read-only and can be prepared independently of M2U. Execute R1/R2 changes serially when they share a checkout or lockfile. Waiting for W2's app does not justify bringing forward a broad move of core or the active W1 route.

## 4. Initial placement decisions and verification

These are initial decisions informed by inspected code, not an exhaustive relocation manifest. R0 must complete the call graph and consumer inventory.

| Current target | Decision and timing | Verification |
| --- | --- | --- |
| `package.json`, lockfile, `.gitmodules`, Binding configuration, composition tests | Retain in root. During R1–3, update pins/dependencies only as required by component changes | Installation and composition tests use fixed commits and do not rely on untracked files |
| `packages/lark-core` | Retain during R1. Base/Chat already depend on its package name. Decide whether a separate repository is needed in R4 | Standalone core tests, consumer tests with declared dependencies, and root composition reproducibility |
| `scripts/agency-intelligence-mcp-server.mjs` | Retain Profile/config loading, Provider/MCP injection, and STDIO startup in root. Consider replacing internal `../providers/.../src` references with stable exports | The same config, Principal, and allowlist produce unchanged tools and authority |
| `scripts/agency-intelligence-mcp-runtime.mjs` | Prioritize required M2U changes in R1. From R2 onward, review each symbol: capture recognition and cursor/structure validation belong with Chat Provider; source-neutral observation contracts with MCP; concrete configuration mapping with root | Same-fixture observations and stop reasons, altered-capture rejection, prohibited Tenant/cross-organization rejection, and retained M4I restrictions |
| Root candidate-generation, promotion, and active-verification scripts | Retain organization-specific rollout sequencing and state control. Extract only reusable operation/contract logic into Provider/MCP. Move into an operations directory in R4 | Preserve intent/profile binding, inactive candidate status, rollback, and readback |
| `scripts/install-codex-skills.mjs` | Retain in root. It currently fixes one public Skill source root. Use existing SN-2 for private Skill distribution support | Baseline fresh installation under M7-2; provenance, collision rejection, ordinary-directory preservation, selected public/private roots, and rollback mappings under SN-2 |
| `scripts/test-all.mjs` and root integration tests | Retain cross-component tests in root; move component-specific tests to their owner | No tests silently disappear; fixed pins reproduce results; components can run their own tests |
| Permanent cross-component documents such as `../docs/task-orchestration-policy.md` | Root remains authoritative. Index them in R0; move to `docs/operations/` or `docs/architecture/` in R4 if useful | Links and task entry points reach one authoritative source |
| Cross-component design documents containing Provider procedures or MCP contracts | Separate reusable specifications from organization-specific rollout records. Put specifications with components; retain composition decisions and references in root | No private information enters a public repository. Component consumers can understand the contract without root-internal documentation |
| `docs/v2-*` and temporary migration scripts | Preserve active paths. In R3 establish one authoritative current-status entry point referring to detailed records. Move to locations such as `docs/migrations/v2/` in R4 | Update README, handoff, CLI, test, and operational references. Distinguish historical statements from current status |
| `private/`, `runtime/`, and untracked `runtime-data/` | Contents were not inspected for this plan. Track exclusion and caller handling as an independent R0 item. Actual relocation is a separate operational package from R4 onward | Ignore rules alone do not enforce access control. Verify code-level path constraints, retention/recovery requirements, and owner-only storage |

The root Intelligence launcher currently references root-relative private paths and Provider knowledge files. Renaming the root directory requires checking startup configuration, Skill symlinks, schedules, relative imports, and evidence path references.

## 5. Existing-plan integration and scope control

- **M2U:** Treat R1 as responsibility alignment within existing 2b/3/4 packages. Avoid delaying completion with added physical relocation. Apply existing M2U verification to changed authentication and operation contracts.
- **M4/M5:** If renaming or extraction is selected for the same release, separate implementation and placement checkpoints and apply operational gates to the final artifact. Preserve W1's existing 2/2 as evidence for the route used at that time.
- **SN/FR:** Reuse SN-1 (manifest), SN-2 (distribution), and SN-3/4 (workflow change/cutover) from the [Skill migration plan](v2-skill-naming-and-migration-plan.md). Foreign-revenue business/Provider separation remains independent and does not automatically become required for M7. Preserve the weekly-expense prototype freeze.
- **Backup:** Keep M2U actor migration evidence distinct from attachment recovery implementation and proof. Relocating owner-only data does not establish improved recoverability.
- **M7:** Preserve required published component commits, pins, approvals, and rollback evidence. Explicitly include the basic clean Skill installation guarantee under M7-2, irrespective of naming-workstream adoption. Repository renaming and core separation remain optional. Identify selected R2 batches and deferrals during R3.
- **Existing changes:** The [commit-boundary proposal](../provider-runtime/docs/v2-m7-2-commit-boundary-manifest.md) is an earlier snapshot. Refresh the inventory before implementation and keep unrelated changes out of reorganization commits.

Move core into a separate Git repository only for a concrete reason such as independent releases/consumers, different access controls, or standalone distribution. If its contract, dependencies, and tests are independent within the root workspace, that is a valid final placement. If separation is selected, preserve its package name and API initially and design history preservation, dependency acquisition, pinning, and rollback before changing Git structure.

## 6. Next work packages and model routing

The owner-approved [instruction audit sequence](instruction-audit-and-simplification-plan.md)
is now part of v2: checkpoint the current package, complete IA-0 through IA-2,
then resume implementation from the reconciled [handoff](v2-task-handoff.md#4-next-work-package).
The earlier M2U-2b next-package statement is superseded. The next reorganization
package remains **R0-1: root-owned asset relocation inventory**; share matching
inventory evidence with IA without bringing forward physical relocation.
IA-3 aligns with R2 workflow boundaries and IA-4 feeds R3/M7-2 release checks.
Earlier model assignments in this plan yield to the permanent model policy.
This integration does not complete the audit, inventory, or reorganization.

| Package | Deliverable |
| --- | --- |
| R0-1 | Inventory all root tracked/untracked source, excluding private output; record call/import references and live-reference verification status |
| R0-2 | Classify R0-1 items as retain/split/move/decide later; establish owners and dependency gates; propose task entry points and authoritative documentation |
| R1-* | Implement one operation/consumer boundary within its existing M2U package |
| R2-* | Implement and verify one workflow's selected SN/extraction batch |
| R3-* | Integrate selected scope, pins, reproducibility, and placement debt into M7 evidence |
| R3 / M7-2 installation preparation | Prepare the Skill coverage manifest and isolated installation/functional smoke checks from Section 7.1 before release verification; bounded fixture work may start earlier; keep each test family independently verifiable |
| R3 / M7-2 final verification | Execute the prepared baseline against the final published pins and record per-Skill evidence; block on unexplained missing coverage |
| R4-* | Move one docs/script group or decide one core-placement question; retaining the current layout is a valid completed decision |

Use explicit Astra/low for new coordinator and worker tasks under the
[permanent policy](task-orchestration-policy.md#6-model-and-reasoning-routing).
Name an unresolved decision before selecting medium/high; implementing an
accepted design is not itself a reason. The former fixed per-row model
assignments have been removed. Preserve all verification, missing-coverage
rejection, authority and rollback gates in this plan. Preparing or updating
this plan does not start worker tasks or subagents.

## 7. Verification and completion

Planning changes require link, diff, and dependency-order verification. They do not count as rerunning code tests or production checks.

During implementation, verify imports, references, publication boundaries, and focused tests for each relocation. Run root-wide tests at pin changes or release checkpoints. Add relevant operational checks when a live Profile, startup path, or schedule changes. Reuse evidence that applies to the exact unchanged artifact/route; a rename alone does not require unrelated production writes.

Reorganization is complete when responsibility ownership, authoritative specifications, package boundaries, and consumers are explicit; standalone component verification and root composition are reproducible; and operational routes and rollback remain intact.

### 7.1. Basic clean Skill installation guarantee: M7-2

The authoritative release requirement is the [M7-2 clean Skill installation gate](v2-migration-plan.md#m7-2-clean-skill-installation-gate). It is mandatory for the release's supported Skill set even if no naming or repository-reorganization batch is adopted. R3 supplies its evidence; SN-2 and SN-5b add distribution/rename-specific checks rather than substituting for it.

Prepare the test manifest and isolated checks before M7 so gaps can be repaired in bounded packages. Execute the final gate against the release's published component pins. Cover:

1. A recursive fresh clone, fresh dependency installation, and an empty isolated Skill destination, with declared toolchain prerequisites and no reliance on the developer's installed Skill links, old checkout, untracked files, local dependency directories, undeclared global libraries, or private runtime state. Use the installer's explicit destination option, not the user's live Skill directory. Record package-registry authentication needed to retrieve private components separately from business-service credentials.
2. Every supported Skill in the release manifest: its installed identifier, source revision/provenance, required instruction/reference/resource files, executable entry points where present, and declared dependencies must resolve from the installed route. Record frozen, retained-prototype, and deferred entries explicitly; do not report them as supported active workflows.
3. Each executable Skill's principal path with synthetic input through the installed location, including relevant Provider resolution or MCP contract interaction. Test expected results and supported missing-dependency/configuration stops. Import success, help output, or argument validation alone is insufficient functional proof.
4. For instruction-only or interactive Skills, verify referenced resources and required tool/capability contracts and perform a bounded host discovery/invocation check where the Skill depends on host loading. Record which steps still require a real authenticated account, device, or approved operation. Synthetic tests do not establish successful browser/device operation.
5. A per-Skill result manifest with commit pins, environment/toolchain, installation destination, exact checks, outcomes, limitations, and links to applicable operational evidence. Keep code-installation success separate from production readiness. Unexplained omissions or installation/functional failures block M7-2; unavailable external prerequisites remain explicitly unverified and do not waive the workflow's existing cutover gates.

SN-2 owns selected-source distribution, provenance collisions, existing-installation preservation, and rollback behavior introduced by packaging changes. SN-5b verifies the selected naming workstream in a clean clone. Evidence may be shared only when artifact pins, scope, and environment match; M7-2 retains responsibility for complete release coverage.

The existing single-Skill symlink CLI test reaches argument validation using the current checkout. It is useful regression coverage but does not satisfy this gate. M0's recorded clean-clone success and current local full-suite passes also do not establish this guarantee for the final release.

## Governance guide migration — 2026-09-07

The development [Private Source Integration Guide](governance/private-source-integration-guide.md) now has an isolated local canonical commit. Its English translation preserves the Japanese source policy. Operational deployment is verified after direct owner approval; the legacy path now retains a compatibility redirect to the matching operational English copy. Original Japanese bytes remain archived. See the [migration checkpoint](work-project-guide-migration.md) for provenance, coverage, and the prepared deployment. No publication, package cutover, or directory removal is authorized by this checkpoint.
