---
type: plan
visibility: internal
status: commit
date: 2026-09-10
author: "Naoki Kimura (owner direction); Codex (implementation plan)"
context: "Incremental production Runtime delivery followed by the first profile workflow"
---

# Runtime-first delivery

Production host: the owner-designated local ChatGPT Work project **C|OPS|エージェンシー運営**
(`g-p-693bd2fb16bc8191ac195f072bb993e2`). On 2026-09-10 its existing task
`01a05397-d1d0-7ed0-8c7a-c271aee04a4f` discovered the Runtime entry and loaded
the installed resources successfully. The earlier Codex-only evidence did not
establish this result; retain both with their different verification scopes.

Status: owner-approved on 2026-09-10. This is the adopted delivery order, not a
claim that production deployment has completed. The [Japanese review](../reviews/runtime-first-production-plan-ja.md)
retains rationale and execution evidence.

Deliver M1 (production Runtime) before waiting for M2 (Providers) or M3 (Skills).
Then connect only the Providers required by profile synchronization and complete
one profile record through its existing approved plan, write and readback path.
Accepted development evidence for profile acquisition and recording is retained;
invitation-specific work does not block this first workflow.

M1 is complete when a task in the designated local ChatGPT Work project invokes an independently
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

## Owner invocation

In the designated local Work project, ask: `live-agency-runtime を使ってRuntimeの状態と選択中のSkill・Providerの手順を確認して`.
The registered Skill invokes the fixed installed launcher. Expect Runtime 1.3.0,
profile Skill 1.1.0, TikTok Web Provider 1.1.0 and Lark Base Provider 1.2.0.
`ready` establishes installed resource loading; `businessWorkflowVerified: false`
and `externalOperations: 0` explicitly exclude business synchronization.
If the entry is absent in another task, report that discovery failure rather
than executing a legacy workflow. The local operator guide retains startup and
registration rollback instructions. Human acceptance remains pending.
