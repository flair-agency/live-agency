# Remaining Lark history operation coverage

Checkpoint: 2026-09-08. This inventory selects no live operation and does not
activate an existing CLI or environment-derived client. The private migration
Project owns work scheduling. The [development verification record](../reviews/development-base-verification-ja.md)
contains this work window's tests, environment limits and recovery evidence.

## Three distinct evidence levels

The Provider's [operation contracts](../../providers/lark-base/src/api-operations.js)
record endpoint knowledge. A `verified` endpoint contract is not evidence that a
particular App has its scopes, that the selected resource permits the operation,
or that a business workflow completed. Selected composition and actual bounded
read/write conformance remain separate gates.

The new [history reader](../../providers/lark-base/src/selected-history-reader.js)
provides `listFields` and `listRecords` with exact Base/table/view scope. Its
local source and archive tests pass, including parent-owned Profile composition.
Live selected development Bot field/record reads and the two-creator Profile
plan now pass after the owner applied the requested App scopes. The reader does
not implement mutation, attachment acquisition or attachment hashing.

The [selected batch creator](../../providers/lark-base/src/selected-batch-creator.js)
now supplies one exact externally authorized no-avatar batch, with field
revalidation, new-ID checks and no automatic retry. Parent Profile integration
proves complete and partial/uncertain outcomes. A concrete two-row development
plan is awaiting exact owner approval; no live create has run. Source and
isolated archive success do not establish avatar or full workflow acceptance.

The legacy [Skill client factory](../../providers/lark-base/src/skill-client.mjs)
still constructs `LarkBaseClient.fromEnvironment`. Adding the selected reader
export has not migrated these default CLI entry points. Each workflow must
explicitly compose its selected client before claiming route migration; do not
silently fall back to that legacy factory.

## Consumer-to-operation map

The table lists methods actually called in the current Skill runtime sources.
It is an implementation inventory, not authorization to expose every method in
one client. Separate read and reviewed mutation boundaries remain required.

| Consumer | Read/preparation methods | Mutation/recovery methods | Remaining selected-path work |
| --- | --- | --- | --- |
| [Profile recording](../../skills/live-agency-creator-profile-record/scripts/profile_lark_runtime.mjs) | `listFields`, `listRecords`, `attachmentSha256` | `batchCreate`, `uploadMedia`, `appendAttachment` | Explicit no-avatar read/create composition is locally verified; exact synthetic create approval/live readback and selected avatar coverage remain |
| [Invitation eligibility recording](../../skills/live-agency-creator-invitation-eligibility-record/scripts/invitation_lark_runtime.mjs) | `listFields`, `listRecords`, `attachmentSha256` | `batchUpdate`, `batchCreate`, `uploadMedia`, `appendAttachment` | Preserve approved eligibility admission; bind separate current/history tables and exact fields; verify attachment behavior |
| [LIVE observation recording](../../skills/live-agency-creator-live-observation-record/scripts/live_history_lark_runtime.mjs) | `listFields`, `listRecords` | `batchCreate` | Three-table selected read preparation is source/archive verified; bind separate session/metric creates and destination flow checks before live acceptance |
| [Creator assessment](../../skills/live-agency-creator-assessment-update/scripts/insight_lark_runtime.mjs) | `listFields`, `listRecords` | `batchUpdate` | Bind approved output fields and tag vocabulary; monthly update coverage alone does not authorize assessment writes |
| [Profile history pruning](../../skills/live-agency-creator-profile-history-prune/scripts/lark_profile_compact.mjs) | `listFields`, `listRecords` | `batchDelete` | Bind reviewed record IDs, archive/backup evidence and exact deletion readback |
| [LIVE metric pruning](../../skills/live-agency-creator-live-metric-history-prune/scripts/lark_live_metrics_compact.mjs) | `listFields`, `listRecords` | `batchDelete` | Bind reviewed record IDs and retention representatives; preserve incomplete rows |
| [LIVE session pruning](../../skills/live-agency-creator-live-session-history-prune/scripts/lark_live_history_compact.mjs) | `listFields`, `listRecords` | `batchDelete`, `batchCreate` on restore | Bind deletion and restoration separately; verify restored record mapping |
| [Invitation history deduplication](../../skills/live-agency-creator-invitation-eligibility-history-deduplicate/scripts/lark_invitation_compact.mjs) | `listFields`, `listRecords`, `downloadAttachment` | `batchDelete`, `batchCreate`, `uploadMedia`, `appendAttachment` on restore | Bind archived bytes, relationship mapping and attachment restoration; no automatic historical semantic conversion |

The existing [monthly selected Provider](../../providers/lark-base/src/creator-activity-selected-provider.js)
uses `fields:list`, `records:search` and `records:batch-update` under its own field
binding and approval contract. Reuse its transport evidence and rejection
patterns, not its business write authority.

## Endpoint knowledge gaps and reusable attachment components

The current operation matrix includes reviewed contracts for fields/records
listing, record search, batch create/update/delete, media upload/download and
temporary attachment URL reads. `attachments:append` is explicitly
**unverified**, advertises no supported token type, and uses the Base v3 append
endpoint. Keep it stopped until its own evidence and selected conformance are
recorded. A nearby record-update endpoint is not an automatic replacement for
attachment append semantics.

The Provider already contains a [selected attachment reader](../../providers/lark-base/src/attachment-selected-transport.js),
[attachment acquisition](../../providers/lark-base/src/attachment-acquisition.js),
and [restore execution](../../providers/lark-base/src/attachment-restore-execution.js).
Inventory and reuse these bounded contracts before adding overlapping helpers.
Their existence does not make them compatible with the history client's
`attachmentSha256` or `appendAttachment` interface without explicit composition
and conformance evidence. Full Base export/import, shared storage inventory,
retention planning and recovery acceptance remain separate workflow boundaries.

## Next bounded packages

1. Retain the successful selected development read composition and exact target
   IDs; the original App-scope blocker is resolved.
2. Obtain the pending exact two-row synthetic plan approval, then verify the
   prepared selected create and readback with a zero-create repeat plan.
   Do not retry uncertain creates blindly.
3. Reuse selected attachment components where their contracts fit; resolve the
   unverified append operation before enabling dependent history/avatar paths.
4. Bind update and deletion consumers separately. Deletion additionally requires
   its concrete reviewed plan, backup/archive proof and restore path.

This order is a dependency sequence, not a blanket approval for new live writes.
The existing development schema and source checkpoints are retained for resume;
no production resource, operational installation or parent pin changes here.

The [history attachment coverage record](../../providers/lark-base/knowledge/history-attachment-coverage.md)
maps existing backup/download/restore components to the remaining per-cell
history interfaces. Official upload-then-create knowledge is distinct from
the unverified existing-row append contract. The selected attachment inventory
reader also accepts the observed explicit complete-empty records response;
four new regressions cover empty mapped tables and strict rejection of
unproven pages. No actual attachment operation is selected by that repair.

### Batch-create package exit criteria

The next create adapter should reuse the existing selected CLI transport and
reviewed `records:batch-create` contract. Its concrete package must prove:

- the selected actor, Base, table and current field mapping match the separately
  reviewed synthetic plan, with exact payload and create-count binding;
- changed fields, wrong targets, stale plans and unreviewed counts stop before
  the first request; a caller-supplied matching hash alone is not approval proof;
- success responses have the exact requested count and unique valid record IDs;
- an exception, partial response, duplicate ID or lost response is reconciled by
  bounded reads, without automatically replaying a create;
- reread field values and new IDs account for the complete approved synthetic
  target, including a repeat run that creates nothing already accounted for.

Begin with the existing no-avatar synthetic Profile fixture. Attachment upload,
resume append, deletion, automatic repair and production data are separate
packages; they are not supplied by passing these create checks.
