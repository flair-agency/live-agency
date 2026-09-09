# Execution batches and recovery checkpoints

Status: specification adopted from owner direction on 2026-09-10; implementation incomplete.
Scope: invitation migration composition. This does not change production authority,
public business semantics, or unrelated Skills. Canonical location after integration:
flair-agency/live-agency, codex/project-root, this path.

# Separate responsibilities

| Boundary | Owner | Rule |
| --- | --- | --- |
| Acquisition request | Source Provider | Partition the selected target set according to the source's verified per-request limit. The private BackStage lookup currently permits at most 30 accounts. |
| Destination request | Destination Provider | Partition approved effects into supported request sizes. Retain 100 as the current implementation batch size for Lark writes, not a claimed API maximum or total-task limit. |
| Progress and recovery | Runtime | Persist validated acquisition and verified write progress. No independent arbitrary 100-target cutoff. |
| Business comparison | Skill | Preserve exact matching, observed values, target coverage, effect ordering and approval semantics independently of request partitioning. |

A task may contain more than either batch size. Runtime must not reject 101
valid effects merely because the destination request size is 100. Source
limits must not be copied into public Skills. A source request size is not a
write-plan size. Runtime records the selected versions and actual partitions.

# Acquisition and planning

Freeze the selected target manifest, its normalized unique accounts, stable
record IDs where supplied, and its hash. Split it into deterministic ordered
source batches; verify exact coverage and duplicates within and across batches.
Only completed, validated batches receive acquisition checkpoints. A visible
known negative status is an observation, not an acquisition failure.

For the current single-timestamp contract, finish the selected acquisition run
before building the complete business plan. Retain actual batch observation
times in private evidence. Resuming saved evidence is allowed only while it
still satisfies the selected source freshness/session rules; do not relabel old
observations with a fresh time. If those rules cannot establish validity,
reacquire before planning. Introducing per-row timestamps is a separate contract
change, not implicit in this specification.

The default scope remains the complete selected manifest. Do not silently turn
an unfinished acquisition into a smaller write plan. An explicit selection of
a smaller task is a different scope, not an automatic fallback.

# Approved effects and checkpoints

Build one complete dry-run plan with its hash, ordered effects and total counts.
Partition the approved effects deterministically for transport without changing
values, targets, order or total counts. Each request references the parent plan
hash and its exact subset. Partitioning alone does not require another owner
approval; existing authorization must cover the exact unchanged plan.

Preserve the current invitation sequence: all timestamp updates, all creates,
existing-row image appends, then new-row image appends. Within each stage preserve
approved order. A create checkpoint must retain returned record IDs and any
pending image work; a row is not fully complete until its required attachment
has been verified. No later stage starts while an earlier request is unresolved.

Before writing, perform the existing full-plan checks. Before each request,
recheck the applicable selection, schema, target and baseline. Persist an attempt
before sending, then acknowledgement and readback verification. Persist completion
before starting the next request. An unavailable durable checkpoint sink stops
progress; an acknowledged response alone does not establish completion.

Private checkpoint evidence includes: run and manifest identity; Provider and
contract versions; actor/resource binding; business-plan and child-intent hashes;
stage and batch index; exact effect subset; attempt/acknowledgement/verification
state; returned record IDs; readback evidence; pending attachment work; and
remaining effects. Never persist credentials or signed acquisition URLs.

# Recovery

After interruption, revalidate bindings and plan identity and reconcile the
checkpoint against current destination rows and image bytes. Verified effects
are never replayed. An attempted request without verified outcome is uncertain:
read back before proceeding, and do not resend merely because no checkpoint
says complete. Ambiguous matching or changed evidence stops affected execution.

Continue the same approved plan only when exact remaining effects, authorization
validity and already completed effects are established. If the plan must change,
produce a residual plan and use its existing applicable approval procedure.
Do not infer authorization for broader effects, rollback or compensating deletes.
Final completion requires full-plan readback, not just the last batch succeeding.

# Examples and acceptance

For 250 selected accounts, source acquisition is 8 batches of 30 and one of 10.
If the approved plan contains 250 creates, destination writes are 100, 100 and
50. Counts need not match: unchanged records may cause updates or no new row,
and avatars introduce separate effects.

~~~mermaid
flowchart TD
  A[Freeze selected targets] --> B[Acquire next source batch]
  B --> C[Validate and checkpoint observations]
  C --> D{Acquisition complete?}
  D -->|No| B
  D -->|Yes| E[Build and approve complete plan]
  E --> F[Persist attempt and execute next request]
  F --> G[Read back and checkpoint verified effects]
  G --> H{All effects complete?}
  H -->|No| F
  H -->|Yes| I[Verify complete plan]
  F -->|Uncertain outcome| J[Reconcile destination before resuming]
~~~

Implementation acceptance must exercise 0, 1, 30, 31, 100, 101 and 250 targets
or effects as applicable; full coverage and no duplicates; mixed effect ordering;
restart after a verified batch; lost create acknowledgement; checkpoint failure;
created row with a pending avatar; changed targets/bindings; and final readback.
Use synthetic targets and bounded fake transports before selected live validation.
Passing existing single-batch tests is not proof of this new composition.

# Implementation status and recovery boundary

The current selected history writer is still single-batch and rejects more
than 100 effects per operation. The earlier migration audit remains valid until
multi-batch integration and recovery tests pass. Do not remove just its numeric
guard, advertise this specification as deployed, or bypass the reviewed writer.
Implementation must bind all child batches to one approved parent and preserve
its existing per-request preflight and readback protections.

This specification is the replacement requirement, not a claim that the old
100-item choice originally represented checkpoints. That historical rationale
has not been established. Relevant evidence: [A audit](../reviews/a-migration-parity-audit-ja.md).
