# Version 2 Account Identity and Multi-Account Decision

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

- Status: Accepted and verified for the current v2 scope
- Created: 2026-09-02
- Updated: 2026-09-04
- Scope: Creator Scouting, Creator Management, and the transition from scouting to management

## 1. Decision

The existing Creator Scouting and Creator Management Bases already represent the
current business flow at the required operational granularity. Version 2 does
not introduce separate Actor, Platform Account, Scout Candidacy, Agency
Membership, or Username History master tables merely to restate that flow.

Version 2 must not add or backfill a shared Flair-owned `Creator ID` or a shared
UUID in either Base. Previously generated UUID backfill plans remain superseded
analysis artifacts and must not be applied.

The accepted account references are:

```text
TikTok boundary and daily operations  -> current username
Relations inside one Lark Base        -> Lark record ID
Current main/sub-account relationship -> Creator Scouting `親レコード` relation
```

The Creator Scouting `クリエイター` row remains the account-centered record used
to manage the creator's current scouting and platform-relation state. The
Creator Management `クリエイター` row remains the account-centered record used
to manage an affiliated creator. The two records are not assigned a new common
identity by this decision.

## 2. Business authority and Base ownership

TikTok LIVE BackStage remains the authoritative operational source for
invitation eligibility, application progress, invitation progress, confirmed
membership, and departure. Creator Scouting stores timestamped observations of
those facts and owns Flair's scouting facts, including whether the account is a
current target and the approach start and end times.

Creator Management owns management operations for affiliated accounts,
including assignments, activity, support, incentives, and analysis. It does not
need an Actor, person, main-account, or sub-account entity. A multi-account
decision is completed in Creator Scouting before the account is accepted into
the active management workflow.

The transition to Creator Management is triggered only after membership is
confirmed from BackStage. No business entity named `Membership Handoff Receipt`
is introduced. A write intent, execution receipt, source Scouting record,
destination Management record, and readback result are technical audit evidence,
not a Lark business table and not a shared creator identity.

## 3. Current username and account continuity

The TikTok username remains the current external integration and operational
search key. It is mutable. The Lark record ID remains the stable technical
identity and relation target inside one Base, so a reviewed username update can
be applied to the existing Creator record without rebuilding its Lark
relations.

No structured Username History or Alias field or table is introduced in the
current v2 scope. Lark Base history may support exceptional manual review, but
it is not a structured source that MCP or Provider logic may query as an alias
index.

This decision explicitly accepts the following limitation: a delayed or
reprocessed source event that contains only an old username cannot be linked
automatically after the account has changed username. Such an event must stop
for manual review. Version 2 must not guess its current account or create a new
Creator record from ambiguous evidence.

TikTok `User ID`, nickname, avatar, and timestamped observations remain
account-continuity evidence. They may surface a possible duplicate or possible
username change for review, but they do not authorize an automatic username
update, record merge, or person-level identity assertion. The stability and
lifecycle of TikTok `User ID` remain unverified and are modeled as unknown.

## 4. Current multi-account representation

No Actor or same-person group table is introduced. When Flair has reviewed
evidence that one TikTok account is a sub-account of another account, Creator
Scouting represents the current operational relationship with the verified
optional single-record self-relation on `クリエイター`:

```text
Field: 親レコード

main or standalone account -> empty
sub-account                -> relation to the main account's Creator record
```

The relationship is intentionally asymmetric. Its only current-scope purpose is
to identify a known sub-account and its current main account for scouting and
invitation safety. It is not a profile of the real-world person and does not
collect identifying personal information.

The following constraints apply:

- one sub-account has at most one parent account;
- an account cannot refer to itself;
- a parent account must not itself have a parent account;
- chains and cycles are invalid;
- a relation is set, changed, or removed only after human review;
- Provider evidence may propose a relationship but must not mutate it
  autonomously; and
- an empty parent relation means only `not known to be a sub-account`. It does
  not prove that the account is a platform-defined main account.

An account with a parent relation is excluded from membership invitation under
the current business rule. Every invitation still requires a fresh BackStage
check. An empty parent relation or an `invitable` observation alone is not
sufficient proof of policy-safe invitation.

The exact external platform rule remains subject to authoritative-source
verification. This data-model decision does not by itself establish a final
interpretation of TikTok policy or contract terms.

## 5. Existing identifiers and permitted meaning

| Existing value | Permitted use | Prohibited assumption |
| --- | --- | --- |
| Current TikTok username | Current search, integration, inquiry, and username-keyed source matching | Immutable account or person identity |
| Lark record ID | Stable row and relation identity inside one Base | Cross-Base identity |
| Creator Scouting `親レコード` | Reviewed current main/sub relationship inside Creator Scouting | Legal identity, person profile, or proof that a blank account is main |
| TikTok `User ID` | Account-continuity evidence when available | Verified lifetime account identity or person identity |
| Creator Management `ID` | Confidential BackStage identifier for the managed record | Flair-owned ID or guaranteed lifetime account identity |

The BackStage `ID` may be labelled `Creator ID` by TikTok, but its issue timing,
object of identification, and behavior across departure and rejoining remain
unverified. It must not be renamed, repurposed, copied into public Skill output,
or exposed in general logs or unnecessary AI context.

## 6. Verified implementation boundary

On 2026-09-04, a user-authorized native export of the production Creator
Scouting Base verified `親レコード` as a single-value self-relation on the
`クリエイター` table. The export contained 1,370 Creator records and exactly
one populated parent relation. The relation passed the implemented checks for
single cardinality, existing target, no self-reference, no parent chain, and no
cycle. The provided example was also confirmed: the sub-account points to the
stated main account and the main account has no parent.

The schema change was reconciled as an exact one-field additive change. The
read-only Scouting Instance Profile was regenerated from the new immutable
schema inventory and promoted with a rollback copy. A bounded API read then
verified three tables, thirteen fields, 1,370 Creator records, and the same
parent-relation constraints. No Lark record, relationship, write profile, or
schedule was changed by this verification.

The following remain prohibited without a later explicit decision:

- shared Creator IDs or cross-Base UUID backfill;
- Actor or same-person group creation;
- automatic parent-account assignment, reassignment, or removal;
- automatic username or alias mutation;
- using an empty parent relation as proof that an account is main;
- automatically resolving delayed historical username-only events; and
- production membership transition writes without their own reviewed contract
  and approval.

Existing account-level profile, LIVE, invitation, scouting-activity, membership,
and management work may continue without the new self-relation. The implemented
account-evidence review remains advisory and read-only.

## 7. Later gates that do not block M2

The identity and data-model gate is closed for the current v2 scope. Remaining
items belong to later write or external-policy work:

1. define separately reviewed set/change/remove operations and write-time
   validation for self,
   multiple-parent, chain, and cycle attempts;
2. keep TikTok `User ID` and BackStage `ID` lifecycle properties explicitly
   unknown unless authoritative evidence verifies them;
3. verify the current authoritative multi-account invitation policy before
   automating policy conclusions; and
4. define and test any separately approved account-level transition from a
   confirmed BackStage membership to Creator Management.

No automatic relationship backfill is authorized by the M2 decision.

## 8. Accepted working diagram

```text
Creator Scouting
  Creator account
    ├── current username
    ├── optional `親レコード` -> main Creator account
    ├── profile / LIVE observations
    ├── invitation and BackStage relation-state observations
    └── scouting assignment and activity

Creator Management
  Affiliated account
    └── management, activity, support, incentive, and analysis records

BackStage-confirmed membership connects the business workflow. No shared Actor,
person, Creator UUID, or membership-handoff business entity is introduced.
```
