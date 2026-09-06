# Environment Separation Coordination

Updated: 2026-09-06 JST

## Ownership and Dispatch

The owner assigned task `01a07222-c325-72d1-a87a-be1975317794` as coordinator and authorized starting a separate task for each work package under the [priority plan](environment-separation-and-production-stability-plan.md).

The coordinator owns sequencing, acceptance, integration of worker reports, and decisions to dispatch dependent work. Workers must not independently start later phases or modify the shared queue. Use one bounded outcome per task and preserve existing production operations and unrelated source changes.

## Current Queue

| Package | Status | Dispatch / next condition |
| --- | --- | --- |
| SEP-0 | Accepted: source checkpoint and inventory | Task `01a075f6-4557-71f0-a442-ad56adaa04d6`; 17 repositories / 746 selected files restored; coordinator verified 200 artifact hashes and owner-only permissions |
| SEP-1 | Dispatched | Task `01a07603-31cf-7c40-b4a4-712f58596206`; preserve selected source and create independent development; no host activation |
| SEP-2 | Pending SEP-1 | Verify actual Codex project, host catalogs, configuration and authority isolation |
| STAB-0 | Initial workflow register requested within SEP-0 | Expand only where needed after evidence review; do not duplicate inventory |
| STAB-1 / PAR-0 | Pending separation and triage | Bounded production repairs and independent v2 development |
| PKG-0 | Later | Resume npm distribution without blocking initial separation |

## SEP-0 Acceptance

Require the worker's English checkpoint report and SEP-1 brief, restricted persistent checkpoint location, selected-source hashes and restore results, explicit coverage/exclusions, production-reference inventory, workflow status evidence/unknowns, and any concrete host-isolation limitations. Review concurrent source changes and checkpoint consistency before accepting.

The worker uses a separate worktree for reports and restore checks, while inspecting the original Work-project runtime by absolute path. No operational code/registration changes, external writes, automatic source resets, or indiscriminate private-data copies are in scope. Task model settings use the configured default because the user did not request an override.

A requested task is not evidence that its checkpoint is complete. Update this ledger from actual worker status and acceptance evidence before dispatching SEP-1.

## SEP-0 Acceptance — 2026-09-06

Worker completion was confirmed through wait_threads. The coordinator read both reports, verified all 200 checkpoint hashes with zero mismatches and no group/world-accessible checkpoint entries, and inspected capture/freshness evidence: recovery PASS, no reported drift at 09:15:16 UTC. The coordinator did not rerun the restore exercise or claim a new live-health check.

Accepted evidence: [SEP-0 report](environment-separation-sep0-checkpoint.md) and [SEP-1 brief](environment-separation-sep1-brief.md). The private checkpoint remains in the d657 worker worktree under `.sep0-checkpoint`; retain it until relocation and hash verification. Six operational credential-resolving helper files are recovery-only and excluded from development. Sibling repositories remain preserved separately.

Host authority is NOT isolated: operational global Skills/MCPs and write-capable tools are exposed. SEP-1 may create source and run offline synthetic checks, but cannot register or enable development integrations. SEP-2 must prove the host boundary. Current business workflow health and pending-operation status remain unverified.

Proceed to SEP-1 after source freshness revalidation; any coordination/report changes made after capture are explicit additional source to preserve, not unexplained parity failures. No production source/reset, settings, schedules, credential provisioning or live operation is authorized by this acceptance.
