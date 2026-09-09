---
type: plan
visibility: internal
status: commit
date: 2026-09-10
author: "Naoki Kimura (owner direction); Codex (implementation plan)"
context: "Incremental production Runtime delivery followed by the first profile workflow"
---

# Runtime-first delivery

Status: owner-approved on 2026-09-10. This is the adopted delivery order, not a
claim that production deployment has completed. The [Japanese review](../reviews/runtime-first-production-plan-ja.md)
retains rationale and execution evidence.

Deliver M1 (production Runtime) before waiting for M2 (Providers) or M3 (Skills).
Then connect only the Providers required by profile synchronization and complete
one profile record through its existing approved plan, write and readback path.
Accepted development evidence for profile acquisition and recording is retained;
invitation-specific work does not block this first workflow.

M1 is complete when the normal local Codex entry invokes an independently
installed Runtime and loads its explicit production configuration, fixed Skill
and Provider resources. Version display alone is insufficient. Retain source,
package/lock identity, invocation instructions and the previous registration for
recovery. Service access and a completed business workflow are distinct outcomes.

Keep business rules with the public Skill, private acquisition knowledge with
its Provider and wiring with the Runtime. Remove genuinely redundant or
implementation-mirroring tests where evidenced; retain behavior, wrong-target
protection and installed-entry verification. Do not repeat unchanged broad
validation without a concrete reason. Do not start an all-test cleanup project.

The owner approved a maximum of 90 minutes for the first execution, followed by
an evidence-based self-evaluation. Report actual completion, remaining gaps,
elapsed time and confidence; stop at the limit if incomplete. Production writes
still use the existing specific-plan approval contract.
