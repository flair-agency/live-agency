# v2 migration plan and decision status

Status: consolidated index of adopted migration scope and gates, as of 2026-09-07. The foundation → Provider → Skill revision is still an [owner-review proposal](../reviews/v2-migration-plan-review-ja.md); documentation-organization approval does not adopt its unresolved design or start implementation. [Current status](status.md) owns completion and the next authorized work.

## Outcome and retained scope

Develop v2 domain boundaries with reproducible component composition and explicit authority. Environment separation and package lifecycle belong to this migration, not mutually blocking independent programmes. Preserve existing source-separation work. Report actual usable workflows; user-reported broken Skills mean uninterrupted operation and a working old rollback route cannot be presumed.

The [business model](../domain/model.md), [architecture](../architecture/overview.md), [capability inventory](../architecture/capabilities.md), [distribution direction](../architecture/distribution.md), and [development policy](../governance/development-policy.md) own their respective rules. Existing separate Provider repositories and submodules remain. This plan does not rename packages, adopt a new person identity, or activate profiles.

## Dependencies and completion conditions

| Existing coverage | Required outcome | Dependency and boundary |
| --- | --- | --- |
| CP1 / M2U | Every existing direct/indirect Lark caller uses explicit actor, target, allowed operations and supported User/Tenant selection; unsupported combinations reject; refresh, secret protection and uncertain-write reconciliation are verified | Relevant shared core and Provider route. Reuse completed factories/launchers. Disabled optional features remain classified, never silently callable |
| CP2 / M3–M4 | Existing Scouting workflows use domain operations with their required instructions, inputs, write intent, fresh preflight, readback and approved cutover | Its CP1 route and actual input/backup/write dependencies; wave numbering alone creates no dependency |
| CP3 / existing M5 | Existing Management monthly activity preserves authoritative inputs/calculations and verifies its domain read/write workflow | Relevant CP1 route and monthly-update contract; not all Scouting waves or new membership features |
| CP4 / M2U-5, M7, IA-4 | Final selected pins, installed identity, applicable scheduled readiness, operation/readback and rollback, complete Skill installation/functional coverage, instructions and release decision | The adopted release's CP1–3 routes, final artifacts and scoped operational authority |

Convergence is each CP1 route → its CP2/CP3 workflow → CP4. A valid existing route can support same-input comparison. If it does not work, do not claim equivalence or a usable rollback; preserve the business contract and record the gap. Release scope and contract changes remain explicit decisions.

The proposed three-stage revision groups source-independent package build/start/update/rollback and development-client connectivity first, real Provider capabilities second, and Skill acceptance/cutover third. Its exact package composition, startup destination and CI connection remain in the Japanese review. This index records the proposal without silently adopting it.

## Applicable gates and release conditions

| Gate | Scope and reason | Release condition |
| --- | --- | --- |
| Selected media holds | Required profile/invitation media paths; original metadata cannot prove stored content and append support is independently unverified | Accepted owning media contract, implementation and direct conformance for the exact operation; external evidence only within scoped authority |
| Coordinated compaction | Profile/metric and LIVE/invitation execution differ; the owning maintenance handoff is missing | Verified owning execution handoff, same-Base/schema full backup no earlier than child plan, exact parent/child approvals, serial execution, readback/counts and post-backup; LIVE/invitation also require verified row archives |
| W2 candidate rejection | Existing shared-Principal count restriction; distinct App is not automatically a domain requirement | Decide bounded support for the required sharing or retain restriction with a separately selected credential; verify changed builder/route before cutover |
| Protected environment operations | Actor/target/operation selection and actual authority must be known | Scoped selection and applicable contract checks; historical SEP catalog failures alone do not add a universal new host or approval requirement |
| Release and rollback | Artifact success is distinct from live operation | Reproducible final pins, supported-Skill coverage and workflow-specific authorized acceptance; verify a usable rollback, including data protection |

Do not reinstate custom host/session guarantees, complete optional attachment recovery, prior certification for an explicitly authorized unknown-capability validation drill, or successful cleanup as universal backup/v2 gates. Normal authentication, exact destinations, content/receipt verification and uncertain-result reconciliation remain. Restoration and cleanup outcomes are separate. Optional attachment factory restrictions still present in code are not removed by documentation.

Do not impose blanket two-cycle, 24-hour wait or all-workload benchmarks. Preserve historical W1 2/2 evidence; other routes need evidence appropriate to actual scheduling, token lifetime and defects. Normal review and coordinator acceptance apply; an independent reviewer is required only when its specific contract requires one.

## Release installation coverage

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


## Deferred work and records

New Management cost/reward capabilities, account-transition actions (M6), additional intelligence routes, optional complete-attachment recovery/drills, performance/endurance work and naming/repository reorganization are not automatically mandatory migration gates. [Naming policy](../governance/skill-naming-policy.md) is reviewed policy; the [naming migration proposal](../reviews/v2-skill-naming-and-migration-plan.md) remains unadopted. No rename batch is started here.

The [previous migration plan](../archive/v2-migration-plan.md), [PERT](../archive/v2-migration-pert.md), [environment plan](../archive/environment-separation-and-production-stability-plan.md), [instruction audit plan](../archive/instruction-audit-and-simplification-plan.md), and [repository plan](../archive/repository-reorganization-plan.md) preserve milestone definitions, older decisions and test evidence. They do not select another current queue. IA-0–IA-2 evidence remains historical; applicable IA-3 instruction work and IA-4 release coverage remain with their workflow/release.
