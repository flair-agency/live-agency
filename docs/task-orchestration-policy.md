# LIVE Agency Runtime Task Orchestration Policy

- Status: Active policy
- Created: 2026-09-05
- Scope: Every change to this runtime, its public Skills, private Providers,
  MCP processes, shared libraries, composition, configuration, schedules, and
  operational documentation. This is not a v1-to-v2 migration document.

## 1. Purpose

This policy controls how work is composed into Codex tasks. Its purpose is to
preserve the runtime's fail-closed, approval-bound operating model while
avoiding unnecessary planning, context transfer, and high-reasoning model use.

Task size is determined by the protected boundary that a change crosses, not
by line count, a subjective estimate of complexity, or the name of a current
migration milestone.

The governing runtime boundaries are:

1. a public Skill's business contract;
2. an MCP's bounded-domain contract and process authority;
3. a Provider Binding's external-service implementation and versioned knowledge;
4. an Instance Profile's resource, Principal, authority, and allowed-operation
   binding;
5. the private composition's pinned dependency graph; and
6. a production schedule or any external read, write, activation, or deletion.

## 2. Required intake classification

Before starting implementation, the coordinating task must record a concise
change card. It must name one primary class below; a change may have secondary
classes. Separate execution only when the authority, unresolved decision, or
required independent verification changes; classification labels alone do not
require separate workers.

| Class | Includes | Required initial gate |
| --- | --- | --- |
| A. Add capability | New Skill, Provider Binding, MCP tool/process, or shared capability | Contract and ownership decision |
| B. Change capability | Bug fix, source/UI/schema drift response, contract-compatible enhancement | Affected Binding/contract inventory and focused regression |
| C. Retire or consolidate capability | Removal, merge, rename, replacement, or repository consolidation | Call-site and capability inventory plus replacement/rollback decision |
| D. Migrate capability | Moving an existing path between contracts, Providers, MCPs, versions, or runtime routes | Same-input comparison and retained rollback path |
| E. Change architecture or shared infrastructure | Domain boundary, Provider API, shared library, routing, authentication, profile schema, or composition model | Design decision and explicit rejection cases |
| F. Change production authority or operations | Principal/profile activation, external write, schedule, live read verification, data deletion, cutover, or recovery drill | Approval/authority/rollback gate |
| G. Deterministic maintenance | Documentation, inventory, formatting, narrow test repair, or mechanical configuration update with no boundary change | Defined output and focused verification |

The change card contains only:

```text
Primary class and secondary class(es):
Protected boundaries touched:
Invariant(s) that must remain true:
One work package to begin now and its definition of done:
Required gate before the next package:
Verification and rollback/no-mutation statement:
Parallel work, if any, and why it is independent:
```

The card is an intake decision, not a request to write a roadmap. It belongs in
the task record or handoff, not necessarily in a permanent design document.

## 3. When a roadmap is mandatory

A roadmap and dependency graph are required only for classes A, C, D, E, or F
when the change crosses two or more protected boundaries, or when it changes a
live route while retaining an older route for rollback.

A roadmap must identify packages, dependencies, exit criteria, owner approval
gates, and rollback artifacts. It must not allocate implementation detail that
can be decided inside a bounded package.

No roadmap is required for:

- one Binding's contract-compatible drift repair with no route or authority
  change;
- one Skill's isolated implementation or focused test repair;
- an inventory, documentation, or deterministic configuration update; or
- a read-only investigation that returns a decision and makes no change.

The coordinating task starts the next unblocked package rather than launching
all roadmap packages speculatively.

## 4. Work-package rules

Each work package has one independently reviewable outcome. Choose task
boundaries using that outcome and the rules below. A valid package has:

- one explicit outcome and a bounded set of repositories/files;
- one primary protected boundary; accepted supporting wiring may share the
  package when its exact files, contracts and authority are already in scope;
- known authority and approval conditions before acting;
- one focused verification method;
- an explicit rollback statement or an explicit no-mutation statement; and
- a concise handoff containing only evidence needed by the next package.

The default unit is **one logical change, its direct tests, focused verification,
and a concise result**. Once a design and effects are accepted, include necessary
local adapter/consumer wiring in that same unit when ownership and scope are
explicit. Component commits and evidence may remain separate inside one worker;
a file/repository boundary or implementation/test phase is not automatically a
worker boundary. This does not authorize new contracts or production effects.

Create a separate package for a different authority, a material unresolved design
decision, or an independent verification required by a named contract/release gate.
Record the specific split reason in the existing brief. Preserve independent
review where required; ordinary diff/test review is part of implementation and
coordinator acceptance, not an automatic review-only worker. Evidence availability,
shared dirty conflicts and context reliability may also require a checkpoint;
do not manufacture an implementation package for a blocked evidence question.

Do not combine a contract decision with its rollout, a Provider implementation
with a production-profile activation, or a schedule switch with unrelated
feature work. Do not use a successful synthetic test as authorization for an
external change.

Independent packages may run in parallel only when they have no shared files,
no dependency relation, no shared mutable external target, and no common
integration decision. Integration, cutover, profile activation, production
writes, and schedule changes are always serial and retained by the coordinating
task.

### Stopping, continuation, and context

Continue authorized bounded work through relevant verification and a checkpoint.
Do not stop solely because of tool/model cycle counts, document length, or an
account-wide usage percentage. Usage telemetry is capacity information, not a
measurement of this task's cost.

Split work when a newly undecided protected boundary, unresolved dependency or authority,
or degraded context prevents reliable completion. Record the current artifact,
evidence, remaining decision and resumption point first. Use a fresh task when
explicitly requested or when a focused handoff will improve context reliability;
this policy does not itself authorize creating tasks or workers. A package
checkpoint remains required even when the existing task continues.

Stop only the affected operation on missing authority, ambiguous live identity,
stale execution binding, unknown schema/configuration, or unresolved write
outcome. Continue independent read-only investigation and preparation within
scope. For an uncertain write, reconcile by readback under the workflow contract;
never replay it unconditionally. If context no longer supports safe verification,
checkpoint before continuing rather than claiming completion.

## 5. Change-class playbooks

### A. Add capability

1. Decide the owning layer: business Skill, MCP, Provider Binding, shared
   library, or composition. A source-specific screen, schema, parser, or
   operating procedure belongs with its Provider, not a public Skill.
2. Specify the input/output contract, authority, stopping conditions,
   knowledge version, and test fixture shape.
3. Implement one accepted logical contract/Binding change with direct tests
   and the explicitly scoped supporting wiring in the same worker.
4. Include the applicable local integration check; handle publication, pin
   changes or activation separately when their authority or evidence requires it.
5. Treat live activation, scheduling, and any write authority as class F
   packages after implementation has passed.

### B. Change capability

For interface or schema drift, stop the affected Binding rather than guessing.
Retain minimum owner-only evidence; update the Provider implementation and its
versioned knowledge together; add synthetic coverage; then advance the reviewed
composition pin. A visually similar screen, an older nearby profile, or a
silent parser workaround is not a repair.

For an internal compatible fix, identify affected call sites and run the
narrowest relevant tests. Split any changed contract, profile, schedule, or
authority into its own class C--F package.

### C. Retire or consolidate capability

Inventory every Capability request, installed Binding, documentation reference,
schedule, pin, and test before editing. Establish the replacement and a
rollback route first, migrate each caller, prove no remaining reference, then
remove the old artifact. A rename is a consolidation when it changes discovery,
provenance, installation, or user selection; it is not merely a text edit.

### D. Migrate capability

Keep the authoritative path running until the candidate passes the specified
contract, synthetic integration, and like-for-like comparison gates. Compare
coverage, normalized results, proposed side effects, unavailable values, and
stop reasons for the same reviewed input. Make each cutover decision per
capability, not per programme. Preserve the old route and its rollback evidence
until its defined exit criterion is met.

### E. Change architecture or shared infrastructure

Start with a decision package, not code: state the responsibilities moving,
invariants retained, prohibited fallback/authority paths, migration boundary,
and rejection cases. Implement the accepted design in narrow packages, usually
one contract/shared component or one consumer family at a time. A shared
library must not absorb Provider-specific knowledge merely to reduce repository
count.

### F. Change production authority or operations

These packages are serial. Bind the exact Principal, resource, operation
allowlist, approval, source snapshot or intent, verification/readback, and
rollback before a protected action. Reads and writes have distinct authority;
never infer a write, schedule, or different route from a passing read or equal
data. Do not retry an uncertain write automatically. An approval is scoped to
the stated package and does not authorize neighboring migration work.

Recognize valid existing approval for the unchanged scope; complete the
workflow's required dry-run/preflight and freshness checks without asking for
redundant approval. This adds no authority: expiry or changes to targets,
counts, hashes, actor, resources or operations follow the applicable contract's
invalidation/rebinding and renewed-authorization requirements. Show the changed
binding and stop the affected execution. Missing external authority does not
prevent independent local preparation.

### G. Deterministic maintenance

Use the smallest task that can produce the defined artifact and apply the
model policy in Section 6. This class may not silently alter an authority
boundary, source contract, scheduling behaviour, or production configuration.
Reclassify it if
inspection shows that it does.

## 6. Model and reasoning routing

Owner-approved refinement, 2026-09-05: **`gpt-6-astra` / `low` is the
explicit default for both coordinator and worker tasks.** Choose the model
and reasoning effort separately. A worker does not inherit the coordinator's
current effort, and implementation or diagnosis alone does not justify medium.

| Effort | Selection condition | Examples |
| --- | --- | --- |
| `low` (default) | The scope, procedure or accepted design, and acceptance criteria are clear | Inventory, document updates, implementing an agreed local change, running focused tests, interpreting expected results, progress and queue updates |
| `medium` (exception) | A specific unresolved question requires comparing plausible implementations, identifying an unknown cause, or reconciling interacting component behavior | Competing repair hypotheses; an unresolved API/consumer compatibility choice |
| `high` (exception) | A difficult unresolved decision has material consequences for authority, architecture, contract consistency, or cutover | Conflicting authorization semantics or a cutover decision whose evidence cannot yet be reconciled |

Code changes, multiple files, an authentication-related filename, test count,
or the word "review" are not escalation reasons by themselves. Implementing
an already accepted sensitive design may use low while retaining every required
rejection test, approval, preflight, and readback condition. Missing authority
or evidence is not solved by increasing reasoning effort.

At dispatch, explicitly set the supported model/effort fields to
`gpt-6-astra` / `low` unless a justified exception applies. Record the selection
in the existing task brief; for medium/high add one sentence naming the unresolved
question and the condition that ends the exception. No separate approval,
planning document, or extra task is required just to choose effort.

Do not require an artificial failed low run when the unresolved question is
already evident. Conversely, a test failure alone does not require escalation:
first distinguish a routine repair, missing dependency, or absent evidence from
a reasoning problem. Escalate only the unresolved scope and retain passing work.
After resolving it, return to low for subsequent routine work or dispatches;
change an active task's effort only through supported host controls. If such a
change is unavailable mid-turn, record the next selection without claiming the
setting changed. Do not interrupt or restart running workers solely for this
policy. Historical checkpoint efforts remain records, not new routing rules.

Avoid reloading entire long plans/history, unnecessary package splitting, and
repeating passing verification. Keep a coherent repair and its focused tests
together when existing scope and authority permit; no token/percentage savings
are promised by lowering effort. Preserve required checks and safety gates.

Use another model for repetitive work with independently checkable acceptance
criteria only when measured results show a benefit at the required quality.
Compare completion time, retries, and human repair effort as well as available
cost evidence. Do not treat account-wide Codex usage as task-specific cost or
infer Codex consumption directly from API token prices.

This decision supersedes earlier mandatory Luna/Terra/Sol assignments and the
Astra-exception-only rule in migration and companion package tables for new
work. Those older assignments are historical recommendations, not required
steps before using Astra. It does not switch or restart running tasks or
change configured automation models. Validate only models actually adopted
for the affected workflow; do not create a new all-model benchmark gate.

Record the chosen model and any evidence-based exception in the package
checkpoint. A model change never supplies missing evidence, authority, or
verification. See the approved
[instruction audit plan](instruction-audit-and-simplification-plan.md#6-accepted-model-policy).

## 7. Coordination and handoff

The coordinating task owns classification, dependency resolution, conflict
resolution, integration, and final verification. Worker tasks receive the
minimum current contract, relevant files, definition of done, and required
evidence; they return a structured result, not a long transcript.

The coordinator selects the queue and prepares a self-contained brief: accepted
decisions with source sections, exact editable paths, allowed effects/exclusions,
verification commands or selectors, inherited passing evidence, unresolved issues,
and one completion condition. Workers read the named sections and applicable
mandatory instructions. They do not rediscover the entire roadmap or task history
unless a concrete missing fact or conflict requires expansion. A brief summarizes
contracts but never replaces an applicable mandatory full-read requirement.

Read a needed section once per relevant revision in a task; reuse the result.
Reread for a changed file/revision, stale evidence, changed scope, or actual gap,
not because the next implementation step began. Use bounded searches/section reads
instead of whole-plan dumps. Do not duplicate a growing brief into every document.
Update the current-state entry in place; keep old next-action statements under
clearly historical headings with links to evidence.

At the end of every package, record:

- completed objective and exit criteria;
- materially changed files/repositories and checkpoint;
- focused verification and any full-suite result that was required;
- approvals consumed or still required;
- rollback/no-mutation evidence, outstanding risks, and blockers; and
- the one recommended next package.

Do not carry raw production exports, secrets, complete successful logs, or old
conversation history into a handoff. Production evidence remains owner-only.

## 8. Relationship to other documents

The [Documentation Language Policy](governance/document-language-policy.md)
governs document language across this project: Japanese for owner review and
English for approved canonical documents.

This policy governs task composition for the whole project. The provider
architecture governs implementation ownership and the mandatory knowledge
lifecycle. Security rules govern data handling. A migration plan may add
milestone-specific packages and exit criteria, but may not weaken this policy.

Resolve apparent conflicts using the applicable instruction hierarchy, the
owning document, the rule's applicability, and the latest effective authorized
decision. Preserve required safety, approval, and rollback contracts; a newer
historical note or lower-level document cannot override higher-level authority.
Do not accumulate superseded or unrelated conditions merely because they are
stricter. If an authority conflict remains unresolved, stop only the affected
operation and report the exact sources, conflict, and minimum decision needed.

For v2 current state and the next package, use the
[current handoff](v2-task-handoff.md#4-next-work-package). Dated checkpoint
reports retain evidence; they do not own the current queue.
