# LIVE Agency Runtime v2: Task Execution Instructions

## Start each task this way

1. Apply AGENTS.md through the normal ancestor hierarchy and any in-scope nested
   instructions. A missing runtime-root AGENTS.md does not remove parent rules.
   Parent project mirror and sources remain read-only. For authenticated/private-
   source Skill creation, update or review, read the parent private-source design
   guide in full as required by project AGENTS.md before that work.
2. The coordinator reads the current entry in the
   [handoff](v2-task-handoff.md#4-next-work-package) to select the queue. A worker
   starts from its supplied brief and the exact handoff/contract sections it
   names; archived checkpoints do not select the queue.
3. Apply the [permanent orchestration policy](task-orchestration-policy.md) for
   classification, task boundaries, continuation and approval. Explicitly select
   `gpt-6-astra` / `low` for coordinator and worker tasks. Use medium/high only
   for the specific unresolved decision allowed by policy Section 6; record the
   question and return-to-low condition in the existing brief. Implementation
   alone is not an escalation reason. Record outcome, scope, authority and done criteria.
4. Read the exact milestone, invariant and Skill/Provider contract sections
   identified in the brief before the affected operation. If a necessary fact
   is absent, search for that fact and expand only the relevant reference.
   Reuse already read sections unless their revision/scope changed or a specific
   gap requires rereading. Do not load the entire handoff, plans, prior chats,
   old exports or full test logs by default. Step 1 mandatory reads still apply.
5. Inspect dirty root/component changes. Preserve unrelated work; do not clean,
   reset, stage or commit it. Serialize edits sharing this checkout.

## Verification and completion

Complete relevant verification and record the outcome, changed paths,
evidence, remaining authority/gaps, recovery and one next package in the
handoff. Follow permanent policy for context-based splitting; no fixed cycle,
usage-percentage or fresh-task rule applies.

Documentation-only edits use scoped diff, reference resolution and applicable
[audit decision cases](instruction-audit-and-simplification-plan.md#7-verification-and-completion).
Implementation uses focused affected tests. Broader composition/pin/release or
cutover checkpoints retain the migration's applicable full-suite and operational
gates. Synthetic success never authorizes live access, write, activation or
schedule changes. No uncertain write is replayed unconditionally.

Historical decisions, receipts and rollback context from this document remain
verbatim in the [archive](v2-task-handoff-history-2026-09-05.md#archived-task-execution-instructions).
Load relevant evidence before an operation that depends on it. Current handoff
Section 2, the milestone plan and workflow contracts preserve business and
identity constraints, including estimated coin consumption versus expenditure.

## Worker brief and dispatch

Use this compact manifest in the existing task instruction, not a new planning
task. Follow the [remaining-work grouping](v2-work-package-consolidation.md).

```text
Outcome: one logical change including direct tests and focused verification.
Accepted decisions: concise facts plus exact source sections/revisions.
Scope: editable paths and supporting wiring; preserved contracts and exclusions.
Authority: permitted effects, remaining approval gates, rollback/no-mutation.
Read: mandatory instructions and only the additional sections needed here.
Evidence: inherited passing checks and changes that would invalidate them.
Verify: direct test commands/selectors, expected results and required gate review.
Model: gpt-6-astra / low; name the unresolved question for an effort exception.
Done/report: changed paths, checks, unresolved issues and one next outcome.
Split reason, only if needed: different authority, unresolved design, required
independent review, blocked dependency or context/checkout constraint.
```

Complete implementation, its tests, and necessary already-approved local wiring
without a routine separate test/review/connection worker. Do not remove a required
independent reviewer or combine a protected live action into local implementation.
The coordinator accepts the compact result and relevant diff/test evidence;
repeated full-suite checks need a relevant change, failure or unresolved concern.

## Reusable task instruction

> Continue from the one next package in `../docs/v2-task-handoff.md`. Apply ancestor
> and in-scope AGENTS.md and `../docs/task-orchestration-policy.md`; inspect relevant
> contract sections and existing dirty work. Keep one accepted logical change,
> its direct tests and focused verification together, including scoped wiring.
> Supply a self-contained worker brief; do not mandate whole-plan rereads.
> Explicitly use Astra/low for new work;
> justify any higher effort by its unresolved question, not the task label.
> Complete bounded verification and update
> the handoff. Existing authorization remains subject to its exact scope and
> contractual preflight. Do not infer production authority from local tests.

## Accepted backup gate disposition

For backup work, apply the [local correction checkpoint](../provider-runtime/docs/backup-gate-local-correction-checkpoint.md)
and current caller contract Section 6.1. Do not reinstate custom host/session
proofs, optional attachment currentness/recovery or exploration drills as common
backup or v2 prerequisites. Unknown capability validation is preparation, not
certification; successful restoration and cleanup are separate outcomes. Normal
authentication, exact actor/target/operations, required backup, approval, byte and
receipt readback, unknown-write reconciliation and rollback remain mandatory.
Local synthetic verification does not authorize external testing or activation.
