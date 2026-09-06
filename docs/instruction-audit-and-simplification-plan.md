# AGENTS.md, Skills, and Operating Instructions: Audit and Simplification Plan

- Created: 2026-09-05
- Status: **IA-0–IA-2 completed 2026-09-05; IA-3/IA-4 pending**
- Execution evidence: [shared-instruction checkpoint](instruction-audit-ia0-ia2-checkpoint.md).
- Owner decision: The owner approved this plan and all four review decisions on 2026-09-05, and requested incorporation into the v2 migration plan.
- Earlier integration checkpoint (historical): English translation and planning/policy alignment only; that step did not complete IA work. The execution evidence above records IA-0–IA-2 completion without changing running tasks, installed Skills, production routes, or schedules.
- Accepted sequence: Checkpoint the current work package, simplify shared instructions, resume v2 implementation, and simplify individual Skills at their migration boundaries. A collection-wide rewrite is not a prerequisite for continuing v2.

## 1. Purpose and success criteria

Clarify instruction scope, precedence, approval, stopping, and completion conditions. Reduce redundant confirmation, fragmented work, and resumption from obsolete progress statements. Do not target a percentage reduction in lines or tokens.

Success means:

- Each decision has an identifiable current rule and owning document.
- Work proceeds within valid existing authorization; only the affected operation stops when additional authority or information is required, with a specific reason.
- A short entry point identifies the current checkpoint, next package, and outstanding completion conditions.
- Required safety, business-contract, verification, and recovery conditions remain traceable.
- Representative cases work with the models actually adopted, without relying on Astra to infer omitted requirements.

OpenAI recommends auditing Skills and AGENTS.md because GPT-6 Astra can be more sensitive to their instructions and may stop on ambiguous or conflicting guidance. This plan applies that guidance to this project's operations; it does not remove safety conditions wholesale.

Reference: [OpenAI official model guidance](https://developers.openai.com/api/docs/guides/latest-model#instruction-following)

## 2. Initial observations and evidence limits

These observations come from read-only inspection on 2026-09-05. They are a baseline for the audit, not evidence that every file has been audited. The model-policy integration below supersedes the earlier model assignments; the remaining observations still require review.

| Observed fact | Audit question |
| --- | --- |
| No AGENTS.md was found inside the runtime during the search. The parent ChatGPT project AGENTS.md covers document governance, scouting strategy, and private-source Skill design. | Are the applicability conditions and entry point for runtime-specific instructions clear? |
| The repository contained 16 SKILL.md files totaling 1,489 lines at inspection. | Check duplication, obsolete routes, approval conditions, and reference consistency rather than length alone. |
| Sample installed Skills are symlinks to repository Skill directories. | Which other tasks and installed routes would immediately read an edit? |
| The migration plan has 8/12-cycle limits, mandatory fresh tasks, and usage-percentage stop thresholds. | Do mechanical limits interrupt useful work? Is account-wide usage being mistaken for task-specific consumption? |
| The shared work policy applies the stricter condition when documents conflict. | Can obsolete or unrelated rules accumulate? Can ownership and applicability resolve the conflict? |
| The handoff is roughly 1,000 lines, and its opening next-package statement lagged behind the coordinator's latest record. | Can current state, history, and permanent contracts be separated into an unambiguous resumption path? |
| Multiple root files and components have uncommitted changes. | Can audit changes be isolated and attributed without disturbing existing work? |

The latest coordinator record inspected during planning reported M2U-4d complete and M2U-4e started. **Do not make the name M2U-4e a permanent start condition.** At execution time, reconcile current progress and use completion, verification, and recording of the then-current package as the boundary.

Provider instructions, all installation destinations, externally maintained Skills, and every task/automation prompt have not yet been audited comprehensively. Initial observations alone do not establish deletion candidates.

## 3. Scope and ownership

| Layer | Targets | Treatment |
| --- | --- | --- |
| Project-wide | Parent AGENTS.md, original project instructions, private-source integration Skill design guide | Do not edit synchronized mirrors or sources. Prepare proposed changes and handle application at the authoritative source separately. |
| Runtime-wide | task-orchestration-policy, v2-migration-plan, v2-task-handoff, README entry points | Primary scope of the first pass; preserve implementation and production authority. |
| Business Skills | All 16 SKILL.md files and their directly referenced specifications/procedures | Simplify at each v2 route boundary. Record frozen Skills without reopening them. |
| Providers and MCPs | Instructions, knowledge, contracts, and tool descriptions loaded by Skills | Audit conflicts and ownership. Keep service-specific procedures with their component. |
| Actual invocation | Installation destinations, symlinks, task briefs, automation prompts | Identify affected callers read-only. Make any changes explicit in the execution scope. |
| Outside the repository | Project-used Skills such as foreign-revenue-accounting | Inventory ownership and dependencies. Relocation, renaming, and accounting-policy changes remain outside this plan. |

Do not expand to unrelated personal Skills or the entire installed plugin collection. Add only dependencies shown to affect this project's execution.

## 4. Execution sequence and placement in v2

### IA-0: Establish the checkpoint and audit scope

Confirm the current package's outcome, changed files, verification, and remaining work. Do not interrupt an in-flight write or verification to begin the audit. Preserve uncommitted changes and record their ownership and the resumption point. Follow existing commit authority; do not bundle unrelated changes into a commit merely to start the audit.

Produce a short change card and target inventory. Use existing class G, deterministic maintenance, while the work is limited to investigation and documentation. Separate any required authority, contract, or active-route change into its appropriate change class.

### IA-1: Audit shared instructions first

Inspect runtime-wide documents and the applicability of parent instructions. Record each relevant rule in this audit table:

| ID | Source file and location | Applicability / current effect | Issue and impact | Keep / shorten / move / deletion candidate / decision needed | Proposal and reason | Owner and affected callers | Verification case |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Assign during audit | Traceable original instruction | Investigation, implementation, external execution, etc. | Distinguish observed failures from potential concerns | Select one disposition | Include the destination of retained mandatory conditions | Project source, Skill, task, etc. | Map to Section 7 |

Prioritize conflicts affecting route or authority selection, unnecessary stops, stale state, then duplicated explanation. Review blanket full-document reads and fixed model assignments against their intended benefit.

### IA-2: Make bounded shared-instruction changes, then resume v2

Change only the scope established by IA-1. First-pass candidates are:

- Establish one current-state entry point; separate dated history and detailed records while preserving evidence and rollback material.
- Replace count-only stopping and mandatory fresh-task rules with decisions based on deliverables, dependencies, authority, and context condition where supported by the audit.
- Keep shared policy in its owning document; add only migration-specific conditions in the migration plan.
- Resolve conflicts through ownership, applicability, and effective decisions. If an authority conflict cannot be resolved, stop only the affected operation and report the evidence.
- Prepare applicability improvements for parent instructions. Pending application at the authoritative project source need not block independent runtime-document improvements.

Exit when major conflicts have a disposition or an explicit deferral reason, the next package agrees with current verified evidence, and applicable Section 7 cases pass. Do not delay resuming v2 for optional editorial polishing.

### IA-3: Simplify each Skill at its v2 migration boundary

Once the required M2U actor/operation contracts and the relevant M4/M5 or other workflow route are stable, simplify that Skill and its direct references.

Keep purpose, inputs, permitted effects, mandatory conditions, procedure entry points, and completion criteria in SKILL.md. Providers own service-specific procedures; runtime owns organization-specific routing and cadence. If mandatory conditions move into references, prove they are loaded before the affected operation.

Do not remove v1 procedures or rollback paths before the replacement has the required operational evidence. For an already active Skill, determine which existing cutover evidence remains applicable to the revised artifact. Changes to active behavior retain the workflow's existing verification and authority gates.

### IA-4: Reconcile release instructions before final M7-2 verification

For the adopted release manifest, check instructions, references, installation destinations, invocation routes, and retained compatibility paths. Pass the final revised artifacts into the existing M7-2 installation and functional gate; do not repeat identical checks under a separate name.

The owner approved inclusion of release-required instruction/reference consistency in M7-2 preparation. Missing mandatory instructions, unresolved authority/route conflicts, and broken required references block the affected release coverage. Optional editorial improvements are recorded with an owner and follow-up timing and do not block v2 completion. No new standalone release milestone is introduced.

## 5. Simplification boundaries

Preserve:

- Separation of public Skills, private Providers, operational data, and secrets.
- Distinctions between authoritative sources, observations, and inference; no conversion of unknown values into zero or asserted facts.
- Immutable ID, field ID, and relation-target reconciliation; no out-of-scope updates.
- Explicit organization, Principal, resource, and operation scope; no unauthorized fallback.
- Approval-to-plan binding, stale-plan validation, and post-write readback.
- No unconditional replay of an uncertain write.
- Evidence and rollback conditions for deletion, recovery, and production cutover, and the status of frozen workflows.

Describe approval separately for reads/preparation, authorized execution, changed plans, and operations requiring different authority. Clarify when valid same-scope approval remains usable. Handle expiry or changes to targets, counts, hashes, actors, or operations under the existing contract.

If prose omits a safety condition enforced by code, record where enforcement resides. Improved model capability alone is not a reason to delete a condition. Record missing enforcement as a separate implementation issue.

## 6. Accepted model policy

The owner approved Astra as the default, with other models used for objectively verifiable repetitive work only when measured results demonstrate a benefit. The subsequent 2026-09-05 worker-policy refinement explicitly sets Astra/low for both coordinator and workers. Medium/high require a named unresolved decision and an end condition; implementation alone does not justify escalation. Preserve required checks and avoid restarting existing workers solely to change effort. The permanent [task orchestration policy](task-orchestration-policy.md#6-model-and-reasoning-routing) owns the operational rule. Earlier fixed model assignments in migration or companion package tables are superseded recommendations, not mandatory routing for new packages. Running tasks are not switched or restarted by this documentation update.

Compare models only when useful, using the same representative inputs and acceptance criteria. Record correctness, unnecessary clarification, completion time, retries, and human repair effort. Do not confuse API cost with account-wide Codex usage percentages. Do not rank solely by model tier or run a large suite merely to claim support for every model.

If an adopted model fails required cases, revise instructions or restrict that workflow to a model that passes. Report only the models and cases actually exercised.

## 7. Verification and completion

For documentation changes, use scoped diff review, link/reference resolution, the instruction traceability table, and representative cases. Prose changes alone do not require the full code suite. Changes to executables, installation, or contracts require the affected component's tests and relevant integration checks.

| Case | Expected decision |
| --- | --- |
| Read-only investigation or planning | Continue within scope without prematurely requesting execution approval. |
| Unambiguous bounded local repair | Complete relevant verification; do not stop solely because of cycle or line count. |
| Valid approved plan with unchanged scope | Recognize existing authorization and perform contractual preflight before proceeding. |
| Stale plan or changed counts, targets, or actor | Stop the affected operation and show the difference and necessary renewed authorization. |
| Uncertain write outcome | Reconcile by readback; do not replay unconditionally. |
| Unknown schema or missing configuration | Do not guess an external update; continue independent investigation/preparation. |
| Old migration instructions conflict with a newer decision | Identify evidence and applicability; do not accumulate obsolete requirements automatically. |
| Missing authority for an external service or project source | Leave that application unperformed and retain the completed proposal and verification results. |

Exercise external-write decisions with synthetic data, mock tools, or saved non-executing plans. Do not use real transactions, messages, deletions, or cutovers as audit tests.

Deliver an audit table, scoped changes, expected/observed case results, unresolved items, and the v2 resumption point. Do not claim all-model safety or full Skill coverage without evidence.

## Consumption-driven follow-up after IA-0–IA-2

The owner approved a bounded execution refinement based on the usage
investigation: reduce repeated context reads and group one accepted logical
change with direct tests, focused verification and scoped supporting wiring.
The [remaining-work map](v2-work-package-consolidation.md) and permanent policy
own execution. This is a follow-up to the completed IA-0–IA-2 checkpoint, not a
restart of that audit or evidence that IA-3/IA-4 are complete. Required independent
review and external authority boundaries remain intact; savings remain unmeasured.

## 8. Relationship to other plans and change management

- [v2 migration plan](v2-migration-plan.md): IA-0 through IA-4 are accepted v2 work. Preserve M2U, M4/M5, and M7 operational contracts and approvals; apply the checkpoint insertion and M7-2 integration described above.
- [Task orchestration policy](task-orchestration-policy.md): Owns permanent work policy and the accepted model default. Remaining stopping, splitting, and conflict rules are audit targets, not already simplified by plan approval.
- [Skill naming and migration plan](v2-skill-naming-and-migration-plan.md): Renaming, distribution, and foreign-revenue relocation remain separate responsibilities. Share inventories/evidence when targeting the same Skill, while keeping changes and authority scopes explicit.
- [Repository reorganization plan](repository-reorganization-plan.md): Align ownership and entry points. Large moves, repository splits, and path changes are outside the first audit pass.
- [Current handoff](v2-task-handoff.md): Reconcile with the latest work result at execution time. Check task reports against tests and diffs before treating them as current evidence.

Serialize edits sharing a checkout. Editing a symlinked Skill changes its actual loading source, so avoid conflict with running tasks and isolate the audit diff. Do not stage, revert, or overwrite unrelated work.

To roll back, revert only audit-owned changes while preserving subsequent user changes. Any separately adopted installation or production-configuration change needs its own recovery procedure before execution.

## 9. Accepted review decisions and execution status

All four review decisions were approved by the owner on 2026-09-05:

1. **Timing:** Complete, verify, and record the current package; execute IA-0 through IA-2 before starting another migration implementation package, then resume v2.
2. **First-pass scope:** Limit the initial pass to shared instructions, the current-state entry point, and stopping/splitting rules. Perform individual Skill work in IA-3.
3. **Models:** Adopt Astra as the default with measured model exceptions for objectively verifiable repetitive work. The subsequent worker-policy refinement sets low for coordinator and workers, with medium/high only for named unresolved decisions; Section 6 and the permanent policy own this rule.
4. **Release integration:** Include release-required IA-4 instruction/reference consistency in M7-2 preparation. Optional improvements must not delay v2 completion.

| Package | Accepted placement | Execution status |
| --- | --- | --- |
| IA-0 | First verified checkpoint of the current package | Completed; see execution evidence |
| IA-1 | After IA-0 | Completed; see execution evidence |
| IA-2 | After IA-1; before resuming migration implementation | Completed; see execution evidence |
| IA-3 | Per relevant workflow's stable v2 route | Pending |
| IA-4 | Release preparation, before final M7-2 checks | Pending |

Approval authorizes the planned audit work within these boundaries. It does not itself authorize production cutover, external actions, schedule changes, frozen-workflow reactivation, or blanket deletion of every candidate. Each change must have an audit basis and a defined impact scope and proceed within existing authority.
