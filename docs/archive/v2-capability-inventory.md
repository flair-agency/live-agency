# Capability inventory baseline evidence

Status: historical inventory and then-current progress. Current ownership is in [capabilities](../architecture/capabilities.md).

# LIVE Agency Runtime v2 Capability and Authority Inventory

- Status: Migration baseline
- Created: 2026-09-02
- Scope: Existing Skills, MCP tools, Provider Bindings, destinations, effects,
  authority, and v2 assignment

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

| Skill | Domain | Current sources | Current destination/effect | Approval | Unattended eligibility | v2 migration |
| --- | --- | --- | --- | --- | --- | --- |
| `creator-invitation-status-sync` | Creator Scouting | Lark targets; normalized BackStage eligibility observation | Append or extend reviewed invitation-state history in Creator Scouting | Required for writes | Reads and dry runs are unattended-capable; every write still requires exact operation approval | M4 wave 1 complete; production dual run equivalent; source-neutral write profile active; exact r6 apply verified; daily route switched to v2; current-time race patched in Creator Scouting 0.4.1; tenant-token refresh and exact-session result correlation repaired; active live read verified after restart; two consecutive repaired scheduled cycles succeeded with zero external mutation; scheduled successes 2/2; v1 rollback retained |
| `creator-profile-sync` | Creator Scouting, then Management consumer after handoff | Lark targets; normalized TikTok public-profile observation | Append profile history and verified avatar evidence | Required for writes | Interactive acquisition; scheduled preparation may stop for interaction | M4 wave 2; production dual run equivalent on one exact 20-row manifest; source-neutral adapter, comparator, isolated reviewed-write route, and fail-closed candidate builder complete; eight browser-blocked rows remain; candidate creation requires a distinct dedicated API app because the active read credential is already shared with the invitation-history Principal; no activation, write, or schedule switch |
| `creator-live-history-sync` | Creator Scouting, then Management consumer after handoff | Lark targets; normalized TikTok LIVE observation | Append LIVE history and metric snapshots | Required for writes | Interactive acquisition | M4 wave 3 |
| `creator-insight-sync` | Creator Scouting | Existing profile and LIVE evidence in Lark | Update reviewed insight and approved tags | Required for writes | Target read and dry-run only | M4 wave 4 |
| `creator-profile-compaction` | Creator Scouting history maintenance | Existing Lark profile history | Archive, then delete exact approved redundant records | Explicit destructive approval | Dry-run only | M4 wave 5 |
| `creator-live-history-compaction` | Creator Scouting history maintenance | Existing Lark LIVE history | Archive, then delete exact approved redundant records | Explicit destructive approval | Dry-run only | M4 wave 5 |
| `creator-live-metrics-compaction` | Creator Scouting history maintenance | Existing Lark metric history | Delete exact approved redundant snapshots | Explicit destructive approval | Dry-run only | M4 wave 5 |
| `creator-invitation-status-compaction` | Creator Scouting history maintenance | Existing Lark invitation history | Archive, then delete exact approved adjacent duplicates | Explicit destructive approval | Dry-run only | M4 wave 5 |
| `lark-base-backup` | Cross-domain data protection | Reviewed Lark backup route; shared storage receipts | Create and full-readback-verify an exact Base backup | Preauthorized exact scheduled destination; no deletion | Eligible when both Bindings support unattended execution | M4/M5 infrastructure |
| `lark-base-backup-retention` | Cross-domain data protection | Verified backup artifacts and receipts | Delete only exact approved expired or duplicate generations | Explicit destructive approval | Dry-run only | M4/M5 infrastructure |
| `lark-base-disaster-recovery-drill` | Cross-domain data protection | Verified backup; isolated test destination | Restore and reconcile outside production | Explicit test creation/cleanup authority | Preflight only | M4/M5 infrastructure |
| `lark-base-maintenance` | Cross-domain data protection | Backup receipts, capacity counts, child dry-run summaries, retention and drill status | Coordinated maintenance plan; no direct mutation | Child-specific approval for every destructive action | Read, backup coverage, and dry-run coordination only | M4/M5 infrastructure |
| `creator-activity-sync` | Creator Management | Normalized BackStage monthly activity; Management targets | Update exact existing creator-month metrics | Required for writes | Acquisition depends on Binding; write remains reviewed | M5 |
| `gift-history-sync` | Cross-domain / Agency Operations | Human-handed-off downloaded snapshot | Append-preserving master and derived purpose projections | Required for downstream writes | Acquisition is human-only | Remains cross-domain; Lark projection identity/profile migration is required by M2U-4 and pending |
| `coin-expense-reconcile` | Expense and Accounting | Normalized purchase evidence and expense candidates | Reviewed one-to-one expense registration | Required | No general unattended mutation | Outside creator v2 |
| `coin-expense-weekly-application` | Expense and Accounting | Frozen prototype only | None while frozen; weekly applications remain manual | Not applicable | Do not invoke, activate, or schedule | Frozen by owner decision on 2026-09-05; reopen only after explicit cost-benefit reassessment or documented official application-mutation API support |

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

## 7. Resolved boundaries and known gaps

1. The current identity and account model is accepted and verified. No separate
   Actor/person, Platform Account, Scout Candidacy, Agency Membership, or
   Username History master and no shared Flair-owned identity field or backfill
   is introduced. Creator Scouting uses its optional verified `親レコード`
   self-relation for reviewed current sub-to-main links. Automatic relation
   mutation and authoritative multi-account invitation-policy interpretation
   remain later gates.
2. LIVE profile-history observations accept completed sessions only. Within an
   account, exact start time is the matching key: existing starts are no-ops,
   unseen starts are creates, and duplicate starts fail closed. Scouting
   aggregates attribute the full elapsed duration to the JST session-start date
   without midnight splitting. Management incentive calculations instead use
   BackStage monthly LIVE duration as their authoritative input. The reviewed
   Lark write surface and historical backfill remain open.
3. The `DM候補（TTBA）` grid view is the initial-DM candidate source. Its
   verified action-master dependency classifies `ハートミー`, `メッセージ`,
   `ギフト`, and `スカウト` as prior approaches, including a pre-scout DM.
   The active read profile records immutable IDs and fingerprints for the view,
   this dependency, and the verified `親レコード` relation. The separate
   `担当クリエイター.DM可` field is DM sendability, not scoutability. A write
   profile still requires its own authority and explicit approval.
4. Versioned Organization, API-app/api-user/browser-user Principal, tenant-capability,
   service capability, and service-discriminated Instance Profile contracts are
   implemented. Base, Chat, and Docs resources are distinct, and route fallback
   fails closed across organization, service, resource, domain, authority,
   Principal scope, or visible-data scope. The active Scouting read now uses an
   owner-only `lark-profiles/v2` bundle after exact legacy-binding comparison,
   an exact additive parent-field refresh, and bounded live reverification of
   thirteen fields; the pre-refresh profile remains an owner-only rollback copy.
   Production Base profile candidates can still be generated privately from
   clean reviewed exports with immutable IDs and fingerprints; they remain
   subject to the existing review and activation gates. No new write or Chat
   profile was activated by that M2L checkpoint. API-user schema support alone
   does not mean Base or indirect consumers support User tokens; closing that
   gap is required M2U work. Later M4/M4I activation status is recorded in the
   current handoff and Provider inventory above.
5. Creator Management monthly activity now has USD `コスト（その他）`,
   `コスト（ギフト）`, and `コスト計`, and monthly ROI uses the total. The
   latest export verifies that Creator-table cumulative `コスト` sums matching
   monthly `コスト計` values and cumulative `ROI` consumes it. The inactive
   production-profile candidate records the immutable field bindings and schema
   fingerprint but remains unavailable until its credential reference and
   activation are approved.
6. The TikTok LIVE BackStage `ID` is a confidential external identifier; its
   issue timing and lifecycle across departure and rejoining remain unverified.
7. The TikTok iOS Driver choice and production safety assessment remain open,
   but do not block profile, eligibility, or Management activity migration.
8. Creator Scouting profile, LIVE-history, and invitation-eligibility observe
   and validate tools are implemented with explicit TikTok Web, TikTok iOS, and
   BackStage Binding routes. Continued-observation selection and account-
   evidence review are connected to a Lark read runtime that resolves immutable
   field IDs, verifies exact relations and counts, and exposes no mutation.
   Synthetic integration and the owner-only active production read profile both
   pass the new service-discriminated contract; authority-specific credential
   resolution fails closed without ambient fallback. The inactive, separately
   launched Scouting-write process now enforces server-injected immutable
   bindings, content-bound approval, exact preflight, safe replay, no retry of
   uncertain writes, and readback for existing records only. Production
   write-profile activation, continuous-investigation integration, and
   username-change persistence remain M3 work.

## 8. Lark OpenAPI identity migration (M2U)

Accepted on 2026-09-05 as mandatory v2 scope. M2U-1 now has a
[local source inventory and selection contract](../../runtime/docs/archive/v2-m2u-inventory-and-contract.md);
transport, consumer migration and rollout remain pending. [The selection design](../../packages/lark-core/docs/principal-selection.md) defines the
profile contract and M2U-1 through M2U-5. This capability table is complemented by the
source call-site snapshot and configured-entry classification; neither proves
that deployed consumers have completed identity migration.

| Scope | Required coverage | Status |
| --- | --- | --- |
| Shared Lark core | Explicit API-app/API-user selection, exact authorization reference, same-actor refresh, constrained read/write transport and audit | M2U-1 selection/binding contract implemented; shared transport pending M2U-2 |
| Base and Chat Providers | Per-operation User/Tenant support, unsupported-mode rejection, factories, attachments/pagination where used | Pending M2U-3; active M4I remains read-only and Tenant-denied |
| Scouting/Management MCPs and shared Skill adapter | Selected profile injection across reads, dry runs, writes and readback | Pending M2U-4 |
| Gift, activity, observations, insight and compaction | Every direct/indirect Lark API path, including cross-domain gift projections | Pending M2U-4; existing business contracts and approvals preserved |
| Backup, recovery and maintenance | Lark API phases only; separate browser-export and non-Lark storage identities | Pending M2U-4/5 and applicable recovery/operational gates |
| Composition scripts and scheduled runners | No implicit Tenant constructor or CLI default under v2; loaded identity and successful-cycle proof | Source/configuration inventory recorded by M2U-1; migration/verification pending M2U-4/5 |
| Future Lark OpenAPI Providers | Same admission gate before first v2 activation | Future-only; does not require deferred Docs product development |

Token support is an operation-level capability. A selected instance can further
restrict it; generic Provider support grants no new resource or mutation
authority. No automatic User/Tenant fallback is allowed. M7 requires evidence
for every included consumer, not only the creator-domain scheduled Skills.
