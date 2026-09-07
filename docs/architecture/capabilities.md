# Capability ownership and authority

Status: responsibility inventory based on the existing migration baseline. Planned capabilities remain planned; this is not a deployed-capability list. [Current status](../migration/status.md) owns progress, and the [historical baseline](../archive/v2-capability-inventory.md) preserves the original per-row rollout claims. Provider operation matrices remain authoritative for concrete support.

## 1. Domain assignment rules

- Creator Scouting owns the pre-membership scouting case and its history.
- Creator Management owns active membership and post-membership management.
- Membership handoff is a cross-domain Skill, not hidden inside either MCP.
- Expense and Accounting is outside both creator-domain MCPs.
- Agency-funded gift history is cross-domain because purpose is derived from the
  creator lifecycle at the event time.
- Public platform observation and BackStage relationship-changing actions never
  share one authority surface.

## 2. Existing Skill inventory

| Skill | Domain | Current sources | Current destination/effect | Approval | Unattended eligibility |
| --- | --- | --- | --- | --- | --- |
| `creator-invitation-status-sync` | Creator Scouting | Lark targets; normalized BackStage eligibility observation | Append or extend reviewed invitation-state history in Creator Scouting | Required for writes | Reads and dry runs are unattended-capable; every write still requires exact operation approval |
| `creator-profile-sync` | Creator Scouting, then Management consumer after handoff | Lark targets; normalized TikTok public-profile observation | Append profile history and verified avatar evidence | Required for writes | Interactive acquisition; scheduled preparation may stop for interaction |
| `creator-live-history-sync` | Creator Scouting, then Management consumer after handoff | Lark targets; normalized TikTok LIVE observation | Append LIVE history and metric snapshots | Required for writes | Interactive acquisition |
| `creator-insight-sync` | Creator Scouting | Existing profile and LIVE evidence in Lark | Update reviewed insight and approved tags | Required for writes | Target read and dry-run only |
| `creator-profile-compaction` | Creator Scouting history maintenance | Existing Lark profile history | Delete exact approved redundant records under the owning backup contract | Explicit destructive approval | Dry-run only |
| `creator-live-history-compaction` | Creator Scouting history maintenance | Existing Lark LIVE history | Delete exact approved redundant records under the owning backup contract | Explicit destructive approval | Dry-run only |
| `creator-live-metrics-compaction` | Creator Scouting history maintenance | Existing Lark metric history | Delete exact approved redundant snapshots | Explicit destructive approval | Dry-run only |
| `creator-invitation-status-compaction` | Creator Scouting history maintenance | Existing Lark invitation history | Archive, then delete exact approved adjacent duplicates | Explicit destructive approval | Dry-run only |
| `lark-base-backup` | Cross-domain data protection | Reviewed Lark backup route; shared storage receipts | Create and full-readback-verify an exact Base backup | Preauthorized exact scheduled destination; no deletion | Eligible when both Bindings support unattended execution |
| `lark-base-backup-retention` | Cross-domain data protection | Verified backup artifacts and receipts | Delete only exact approved expired or duplicate generations | Explicit destructive approval | Dry-run only |
| `lark-base-disaster-recovery-drill` | Cross-domain data protection | Verified backup; isolated test destination | Restore and reconcile outside production | Explicit test creation/cleanup authority | Preflight only |
| `lark-base-maintenance` | Cross-domain data protection | Backup receipts, capacity counts, child dry-run summaries, retention and drill status | Coordinated maintenance plan; no direct mutation | Child-specific approval for every destructive action | Read, backup coverage, and dry-run coordination only |
| `creator-activity-sync` | Creator Management | Normalized BackStage monthly activity; Management targets | Update exact existing creator-month metrics | Required for writes | Acquisition depends on Binding; write remains reviewed |
| `gift-history-sync` | Cross-domain / Agency Operations | Human-handed-off downloaded snapshot | Append-preserving master and derived purpose projections | Required for downstream writes | Acquisition is human-only |
| `coin-expense-reconcile` | Expense and Accounting | Normalized purchase evidence and expense candidates | Reviewed one-to-one expense registration | Required | No general unattended mutation |
| `coin-expense-weekly-application` | Expense and Accounting | Frozen prototype only | None while frozen; weekly applications remain manual | Not applicable | Do not invoke, activate, or schedule |

Joining the agency changes the consumer and destination responsibility for
ongoing profile and LIVE observations. It does not stop observation.

## 3. Existing MCP tool inventory

The mixed `live-agency-operations` MCP is transitional and read-only. M1 also
provides separately launched Creator Scouting and Creator Management read
processes over the same acquisition runtime. M3 implements a third, inactive
Creator Scouting reviewed-write process behind its own profile and credential
activation gate.

| MCP tool | Current capability | v2 domain assignment | Effect | Final disposition |
| --- | --- | --- | --- | --- |
| `read_creator_activity` | Normalize monthly creator activity | Creator Management | Read/normalize only | Move behind Management MCP |
| `observe_creator_activity` | Resolve reviewed interactive activity acquisition | Creator Management | Returns content-bound private acquisition instructions | Move behind Management MCP |
| `validate_creator_activity_observations` | Validate exact activity request coverage | Creator Management | Validation only | Shared internal acquisition library |
| `observe_creator_invitation_status` | Resolve invitation-eligibility observation | Creator Scouting | Returns content-bound private acquisition instructions | Move behind Scouting MCP; rename domain term to eligibility |
| `validate_creator_invitation_status_observations` | Validate exact invitation target coverage | Creator Scouting | Validation only | Shared internal acquisition library |
| `observe_creator_profiles` | Resolve public-profile observation | Creator Scouting v2 | Returns content-bound private acquisition instructions | Implemented read-only domain tool |
| `validate_creator_profile_observations` | Validate exact profile target and record association | Creator Scouting v2 | Validation only | Implemented read-only domain tool |
| `observe_creator_live_history` | Resolve LIVE-history observation | Creator Scouting v2 | Returns content-bound private acquisition instructions | Implemented read-only domain tool |
| `validate_creator_live_history_observations` | Validate exact LIVE target and record association | Creator Scouting v2 | Validation only; no canonical reconciliation | Implemented read-only domain tool |
| `observe_creator_invitation_eligibility` | Resolve BackStage eligibility observation | Creator Scouting v2 | Returns content-bound private acquisition instructions | Implemented read-only domain tool |
| `validate_creator_invitation_eligibility_observations` | Validate exact eligibility target coverage | Creator Scouting v2 | Validation only | Implemented read-only domain tool |
| `prepare_invitation_history_write_intent` | Bind exact invitation-state transitions and avatar attachment to the reviewed profile | Creator Scouting v2 | Read-only destination dry run | Implemented and production-verified |
| `preflight_invitation_history_write_intent` | Re-read and reconcile the exact approved invitation-history scope | Creator Scouting v2 | Read-only preflight | Implemented and production-verified |
| `execute_approved_invitation_history_write_intent` | Apply one wholly pending, unexpired and approved intent, then read back | Creator Scouting v2 | Reviewed Lark create/update only; replay-safe and non-retrying | Implemented; one exact production apply verified; configured with write approval and explicitly forbidden to the schedule |
| `prepare_profile_history_write_intent` | Bind one exact profile observation set to append and avatar-attachment mutations | Creator Scouting v2 | Read-only destination dry run | Implemented locally; inactive without a dedicated write profile |
| `preflight_profile_history_write_intent` | Re-read targets, due membership, profile history, schema and avatar bytes | Creator Scouting v2 | Read-only preflight | Implemented locally; blocks drift and partial application |
| `execute_approved_profile_history_write_intent` | Apply one wholly pending, unexpired and approved profile intent, then read back | Creator Scouting v2 | Reviewed Lark append/attachment only; replay-safe and non-retrying | Implemented locally; not configured or production-activated |

The invitation-history production write profile and separate Principal are
active only in the owner-only bundle. One exact approved operation was executed
through the isolated process and verified by readback. The process is now in
Codex configuration behind reviewed-write approval; the scheduled task may
call only its read-only prepare and preflight tools and has no write authority.

## 4. Existing and planned Provider Binding inventory

| Provider Binding | Capabilities | Source domain | Interaction | v2 consumers |
| --- | --- | --- | --- | --- |
| BackStage `activity-export` | `creator-activity-source/v1` | Privileged BackStage activity | File conversion; unattended after exact handoff | Creator Management MCP |
| BackStage `activity-dashboard-paste` | `creator-activity-source/v1` | Privileged BackStage activity | Interactive/manual paste | Creator Management MCP |
| BackStage `activity-incentive-observation` | `creator-activity-source/v1` | Privileged BackStage activity and incentive surface | Interactive browser | Creator Management MCP |
| BackStage `invitation-eligibility-observation` | `creator-invitation-observation-source/v1` | Privileged invitation eligibility | Interactive browser | Creator Scouting MCP |
| TikTok Web `creator-profile-observation` | `creator-profile-observation-source/v2` | Public platform profile | Interactive browser | Scouting; Management after handoff |
| TikTok iOS `creator-live-history-observation` | `creator-live-history-observation-source/v1` | Public platform LIVE | Interactive Driver | Scouting; Management after handoff |
| TikTok iOS `gift-history` | `gift-history-snapshot-source/v1` | User-requested gift export | Human handoff | Cross-domain gift workflow |
| Lark Base client | Capability-policy-selected Lark Base reads, constrained writes, reviewed per-table capacity, and native full-Base export; general User/Tenant operation support is pending M2U | Explicit Flair Base Instance Profile plus organization, principal, and Base-capability profiles | API-first when reviewed monthly calls are unlimited; call-minimizing when numerically limited or unknown; browser `.base` export when no reviewed full-export API exists; exact Base-to-Base or browser fallback only inside a verified equivalent scope | Both domain MCPs and indirect consumers including gift, activity and maintenance; all Lark API call sites migrate through M2U without implicit cross-Base, cross-service, cross-principal, or cross-organization fallback |
| Lark Chat Provider 1.0.0 (M4I) | `conversation-message-observation/v1` and active `read_conversation_messages` two-call browser capture flow for one exact allowlisted chat; Provider-assigned acquisition quality (`A` API / `B` browser) | Flair user-OAuth test Profile is live-conformance verified but inactive; the Creator Networks browser-only Profile and runtime are active read-only; API-user remains pending app review | Creator Networks browser is explicitly selected while user-token scopes are under review; after approval the same user's API route may become primary and grade-`B` browser fallback requires the same user and protected scope, not payload equality; every Bot/tenant-token route, mutation, broad chat enumeration, chat creation, and attachment-byte read is denied | Creator Networks intelligence read only; quality grade excludes attachment interpretation and source truth; no Skill-specific classification or recommendation exists in the Provider; independent private Provider repository and composition submodule are complete |
| Google Drive `logs-backup-storage` | `backup-artifact-storage/v1` | Exact shared backup destination | Interactive upload, full stored-byte readback, content-bound receipt publication, and shared coverage lookup; no deletion or restore | Cross-domain Lark backup and maintenance Skills |
| Money Forward Cloud Expense | Expense candidates and reviewed registration; weekly application prototype retained but not advertised | Accounting system | Interactive/API for active expense capabilities | Expense and Accounting only; weekly application automation frozen |

## 5. Authority matrix

| Authority surface | May read | May write or act | Scheduled use | Prohibited fallback |
| --- | --- | --- | --- | --- |
| Creator Scouting read MCP | Public profile/LIVE, BackStage eligibility, Scouting Base | None | Only tools whose selected Binding declares unattended safety | Management Base; action authority |
| Creator Scouting write MCP | Reviewed Scouting Base state | Exact approved candidate, history, assignment, and next-action writes | Dry-run only until explicit approval | Management Base; BackStage actions |
| Creator Scouting action MCP | Exact reviewed sender, recipient, eligibility, and prior-contact context | Approved initial follow/message/invitation capabilities only | Never silently | Read MCP credentials; Lark write credentials |
| Creator Management read MCP | BackStage membership/activity, Management Base | None | Only unattended-safe reads | Scouting Base; action authority |
| Creator Management write MCP | Reviewed Management Base state | Exact approved membership, activity, support, incentive, reward, and departure writes | Dry-run only until explicit approval | Scouting Base |
| Creator Networks intelligence read | Approved Creator Networks chats; Docs require a separate future profile | None | Explicitly selected approved route; browser remains interactive unless separately proven unattended-safe | Flair credentials or accounts; Lark Base routes; unverified or transparent API/browser substitution |
| Expense and Accounting | Approved accounting evidence and system state | Exact approved accounting operations | Per accounting Skill policy | Creator-domain MCP credentials |

## 6. Mandatory audit context

Every v2 MCP result records, without exposing secrets or production evidence:

- domain and tool contract version;
- Provider Family, Binding, package version, and knowledge version;
- Instance Profile ID, service-capability profile ID, and schema version when
  Lark is used;
- for Lark OpenAPI under M2U, selected Principal and route, resolved
  `user|tenant` mode, operation contract revision, and identity/preflight
  verification result; exact organization/app/user evidence belongs in private
  receipts, never token material or public logs;
- request ID, content hash, target count, and observation coverage;
- interaction and unattended classification;
- unavailable fields and fail-closed reason;
- write intent hash, approval identity and time, mutation counts, and readback
  result for mutations.

An uncertain write or action is reconciled by reading current state. It is not
blindly retried.
