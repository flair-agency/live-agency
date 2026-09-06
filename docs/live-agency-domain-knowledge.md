# LIVE Agency Domain Knowledge

- Status: Working domain model for cross-thread design continuity
- Created: 2026-09-01
- Scope: Creator scouting, membership handoff, creator management, creator support, coin expenditure, and operational data authority

## 1. Purpose and status

This document records the LIVE agency business knowledge established during the design of the Skill, MCP, provider, and Lark Base architecture. It describes the business concepts and invariants that technical components must preserve.

It is a working model rather than an authoritative statement of contracts, accounting policy, platform terms, or live external-system state. Live systems and canonical company records take precedence. Reviewed exports and spreadsheets are evidence for this model, not permanent sources of truth.

The document intentionally excludes creator identities, credentials, production records, private URLs, and internal external-system identifiers.

## 2. Core business contexts

The current model has three business contexts.

### 2.1 Creator Scouting

Creator Scouting covers the work required to discover, evaluate, approach, and track prospective LIVE creators until either agency membership is confirmed or the scouting case is closed without membership.

The initial version 2 operational scope is TikTok scouting only. Discovery,
candidate registration, account tracking, and multi-account relationship checks
for accounts on other LIVE platforms are not managed in the initial model.
Supporting another platform requires a later explicit scope and migration decision; the current
schema must not be generalized merely for hypothetical future use.

### 2.2 Creator Management

Creator Management covers affiliated creators from confirmed membership until departure or the end of management. It includes creator activity, management work, incentives, rewards, support, development cost, and management performance analysis.

### 2.3 Expense and Accounting

Expense and Accounting covers actual monetary expenditure, receipts, expense candidates, expense applications, and accounting registration. It is distinct from the operational estimation of how much value was consumed for a creator or business purpose.

These contexts may exchange reviewed data, but they must not independently maintain conflicting versions of the same authoritative state.

## 3. Creator lifecycle

### 3.1 Pre-registration prospect

A creator may be observed before becoming a registered scouting candidate. Pre-registration work includes:

1. Discovering creators who are already LIVE.
2. Prospecting for creators who appear likely to become LIVE creators.
3. Observing the public profile and available LIVE signals.
4. Checking invitation eligibility through the appropriate privileged source.
5. Checking the Creator Scouting Base for an existing creator or scouting case.
6. Obtaining human approval before candidate registration.

Discovery and prospecting are different search intents. Discovery starts from evidence that a creator is already LIVE. Prospecting starts from evidence that a creator may be a viable future LIVE creator.

### 3.2 Registered scouting candidate

After human approval, the creator becomes a registered candidate in the Creator Scouting context. The agency then:

- continues profile, LIVE, and invitation-status observation;
- records the assigned scout or responsible operator;
- records human-performed approaches as activity history;
- tracks next actions and deadlines; and
- records whether the scouting case is active, successful, unsuccessful, or otherwise closed.

The current design does not require the public LIVE-platform acquisition MCP to perform the outreach itself. TikTok LIVE BackStage messaging and invitation actions belong to a separate privileged capability.

### 3.3 Membership handoff

When membership is confirmed:

1. TikTok LIVE BackStage is used to confirm the platform membership state.
2. The scouting case is closed as joined.
3. Creator Management assumes responsibility for the active membership and management lifecycle.
4. Historical scouting records remain in Creator Scouting.
5. Ongoing operational observations continue and are used for management purposes.

Joining the agency ends the scouting case, not observation of the creator. Public profile, LIVE, account, membership, and activity observations must not stop merely because the creator joined.

The purpose and consumer of those observations shift from candidate evaluation to creator management.

### 3.4 Departure

Departure ends active management but does not erase scouting, membership, activity, support, incentive, or departure history. Whether selected public observations continue after departure is a retention and operational-policy decision rather than an automatic consequence of the lifecycle state.

## 4. Information sources and authority

### 4.1 Public LIVE-platform information

TikTok iOS and TikTok Web can provide public or publicly observable information such as:

- creator profile attributes;
- follower and post information;
- whether a creator is currently LIVE;
- LIVE history and frequency;
- fan-club and related LIVE signals; and
- evidence used to discover or prospect for creators.

The LIVE platform is an information source. It is not the authoritative source for whether the agency may invite the creator.

### 4.2 TikTok LIVE BackStage

TikTok LIVE BackStage is the authoritative operational source for privileged agency facts such as:

- invitation eligibility;
- invitation progress;
- confirmed agency membership; and
- member activity information exposed to the agency.

BackStage also performs invitations. BackStage messaging, invitations, and other privileged actions must remain separate from public-profile and LIVE-information acquisition.

### 4.3 Creator Scouting Base

The Lark Base named `Creator Scouting` is the operational data system for:

- prospects and registered candidates;
- public-profile and LIVE observations used by scouting;
- invitation-status history copied from its authoritative source;
- scouting cases;
- scout assignments;
- human-performed approach history; and
- next-action management.

It does not become the authority for BackStage invitation or membership state merely because those observations are stored there.

### 4.4 Creator Management Base

The Lark Base named `Creator Management` is the operational and analytical data system for:

- affiliated creators;
- management assignments and history;
- monthly creator activity;
- incentives, fee policies, and rewards;
- creator support and development cost; and
- management performance and ROI analysis.

BackStage remains authoritative for platform membership and source activity facts. Creator Management Base owns the agency's internal management model, derived values, and reviewed operational records.

### 4.5 Account continuity and current main/sub-account relation

The operational unit exposed by TikTok and represented by the current Creator
tables is primarily a platform account. TikTok username is the practical search
and integration key used for platform inquiries, human operations, and source
data such as downloaded gift JSON. It is intentionally prominent in Lark even
though it can change.

Inside one Lark Base, the record ID is the stable technical identity. Relations
continue to point to the same record when its displayed username changes. A Lark
primary display column is not a uniqueness constraint and must not be treated as
one.

The current v2 scope does not require a separate person or anonymous Actor
record. When a reviewed multi-account case matters operationally, Creator
Scouting represents it as a current asymmetric relation between account rows:
a sub-account points to its main account through the optional `親レコード`
self-relation. The relation does not collect or assert identifying personal
information.

The current roles are therefore:

```text
Current username     -> TikTok boundary, search, and source-data matching
Lark record ID       -> stable relation target inside one Base
Parent account       -> reviewed current main/sub relation inside Creator Scouting
```

One sub-account has at most one parent. Self-reference, multiple parents, chains,
and cycles are invalid. A Provider may surface possible supporting evidence but
must not set, change, or remove the relation autonomously. An empty parent
relation means only that the account is not known to be a sub-account; it does
not prove that the account is a platform-defined main account.

Username-change review must consider observed time and ambiguity. The system
must not assume that a username is an eternally unique account identity.

TikTok `User ID`, nickname, and avatar history also serve as account-continuity
evidence. They improve human recognition and help identify the likely new
username when a known username changes. Matching avatar evidence plus matching
nickname evidence is stronger than either signal alone; a reliable matching
platform `User ID` adds further account-level evidence. These attributes remain
mutable, non-unique, or source-dependent and therefore produce a reviewed match
candidate rather than an automatic account update.

No structured Username History or Alias field or table is introduced in the
current v2 scope. Lark Base history may support exceptional manual review, but
it is not an alias index for MCP or Provider logic. This explicitly accepts that
a delayed or reprocessed event containing only an old username cannot be linked
automatically after a username change and must stop for manual review.

Profile observations used to support an unresolved continuity review must remain
traceable by timestamp and source. Normal history compaction must not silently
remove the only evidence supporting a review; the evidence may be retained in
active history or a verified archive.

### 4.6 Information-asset priorities and authentication boundaries

Creator Scouting and Creator Management have different risk profiles.

- Scouting candidate discovery, profile observations, and LIVE observations are
  costly to reconstruct even when their underlying source is public. Scouting
  activity history is an agency-created primary record and may be impossible to
  reconstruct after destructive change. Integrity, recovery, and availability
  therefore take priority over confidentiality in this context.
- Management activity and incentive facts can often be reacquired from
  BackStage for a limited historical period, but they include confidential
  member, performance, reward, and cost information. Confidentiality therefore
  has higher priority in this context, without making integrity optional.

The domain MCPs must run with separate Scouting and Management authority
boundaries. A Scouting process must not receive a Management credential. Secret
values must not be stored in Git or embedded in an Instance Profile; a profile
contains only an external credential reference resolved by the production
runtime.

Scouting read and write are also separate authorities. Observation and analysis
must not gain write access merely because a later reviewed synchronization may
write. Whether those authorities require distinct physical Lark applications or
secrets depends on the access controls that Lark can enforce and remains a
deployment decision. Tool-level separation alone does not authorize credential
sharing across the Scouting and Management process boundary.

Scouting observation, invitation-status, and activity histories should use
append-preserving writes. General update, assignment, and delete authority must
not be exposed through the same unrestricted path. Authentication limits the
likelihood and blast radius of damage; a reviewed, recoverable Scouting backup
is the complementary control for records that cannot be reacquired.

### 4.7 Scouting and Management LIVE duration

The same display phrase, “LIVE duration,” represents two different facts.

For Creator Scouting, observed LIVE duration is a candidate-evaluation signal.
The TikTok profile LIVE-history source contains completed sessions only; an
ongoing session is not stored as a partial Lark history row. Within one account,
the exact `startAt` timestamp is the Lark diff key. An existing start is a no-op
and an unseen start is a create. End time, duration, and likes are session
attributes rather than additional matching keys. Duration is derived as
`endAt - startAt`. Daily and period summaries group the complete session
duration by the `Asia/Tokyo` calendar date of `startAt`. A session crossing
midnight remains one session and is not prorated across dates. Observation gaps
and source limitations mean this value is not an incentive input.

For Creator Management, monthly LIVE duration affects incentive and reward
calculations. The authoritative input is the monthly duration reported by
TikTok LIVE BackStage for the applicable period. Management must not reconstruct
or replace that value by summing Scouting observations. Contracts and mappings
should use source-explicit names such as `totalObservedLiveMinutes` for Scouting
and `backstageMonthlyLiveMinutes` for Management to prevent accidental reuse.

### 4.8 Backup is separate from audit

MCP write intents, Provider write receipts, and Lark record histories are audit
evidence. They explain why a write was requested or what a concrete provider
operation did, but they do not contain enough state to restore a damaged Base
and must not be described as backups.

Full Base backup is an independent data-protection operation. It is not owned by
an individual creator-domain MCP client or by the normal Lark write path. A
Lark Provider exposes the reviewed native Base-export primitive, and a storage
Provider may expose exact shared-storage operations, but neither owns backup
frequency, retention, or recovery policy. For the current Flair tenant, no
reviewed OpenAPI operation produces the native `.base` artifact. Full backup
therefore uses the authenticated Lark browser export with all structure and
data; the attachment option is selected when the export surface offers it. API
record reads remain useful for verification and capacity checks, but they are
not a substitute for this artifact.

The isolated drill completed on 2026-09-04 confirmed recovery of the reviewed
Base structure and record-data scope for both Creator Scouting and Creator
Management. It also proved that native Base import does not restore attachment
blobs even when the source export included them. `full-base` therefore does not
mean attachment-complete. Avatars and any other attachment whose loss is not
acceptable require a separate content-verified attachment backup, source
reference, restore procedure, and isolated restore test.

Recurring runners coordinate through verified receipts in the shared backup
destination. Each runner checks whether the current period is already covered
for the same Base, schema, artifact kind, and restore scope. It creates a backup
only when coverage is absent, verifies the complete stored bytes, publishes a
content-bound receipt, and then rechecks shared state. Google Drive file names
are not unique, so a same-name lock file is not authoritative exclusion.
Occasional equivalent backups are accepted and later handled by reviewed
retention rather than deleted implicitly.

The reviewed production destination is the `Logs` Google Drive shared drive,
resolved by private stable identifiers rather than by display name at runtime.
Restore is a separate reviewed workflow and must be tested from stored bytes in
an isolated non-production Base. Audit receipts or a successful upload response
alone do not prove recoverability.

Base maintenance is coordinated above the individual backup and compaction
tasks. Scheduled work may ensure backup coverage, measure per-table record
capacity, create compaction dry runs, prepare backup-retention plans, and check
recovery-drill due dates. It never authorizes record or backup deletion. Before
an approved compaction, a verified full Base backup must cover the same Base and
schema no earlier than the child plan; compaction-specific restore archives
remain additionally required where defined. Successful maintenance ends with
readback, capacity recount, and a verified post-maintenance backup.

## 5. Scouting strategy assumptions

The agency assumes that a desirable TikTok LIVE creator may be receiving simultaneous approaches from multiple agencies. A candidate who is completely unaffiliated and not considering another agency is expected to be uncommon.

When the business has a deadline, a minimum creator-count requirement, or constrained scouting resources, scouting should be designed as a short-acquisition, conclusion-oriented process:

- present conditions early enough to obtain a decision;
- use explicit deadlines where appropriate;
- prefer a short or trial arrangement when it improves decision speed;
- do not design the process around waiting indefinitely for the creator's initiative; and
- permit the agency to end communication after an unsuccessful case when continued contact has no business value.

Long-term relationship building remains a possible strategy, but it must be identified explicitly rather than assumed by default.

## 6. Coins, gifts, promotion, and monetary expenditure

### 6.1 Coin purchase is the accounting expenditure

The actual expenditure recognized by the accounting workflow is the monetary charge for purchasing TikTok coins. The accounting record concerns the purchase transaction, payment evidence, receipt, and expense registration.

Coin-purchase expense processing is automated because transaction volume is high. The existence of a business concept alone does not require automation; volume, repetition, operational risk, and error cost determine whether a dedicated Skill is justified.

### 6.2 Coin consumption is a different fact

Coins can be consumed by:

- sending gifts; and
- using TikTok Promote or a similar promotion function.

Coin purchases and coin consumption are not directly traceable to one another. Coins do not retain an identity that connects a consumed coin to a specific charge transaction. The system must not invent a purchase-to-consumption link or claim that a particular charge funded a particular gift, creator, or purpose.

No FIFO, LIFO, or other inventory-cost attribution is currently part of the domain model.

### 6.3 Promote may combine coins and monetary payment

Promote may consume an existing coin balance. When the balance is insufficient, the user may also make a monetary payment for the shortfall.

The monetary transaction must be classified from its actual evidence. It may represent a coin purchase or a direct promotion charge. The system must not assume that every Promote-related payment is a coin purchase.

Promote-related accounting volume is currently low enough for manual handling. This does not remove Promote from creator-support analysis.

### 6.4 Estimated consumption value is not accounting expense

The value calculated from coins sent or consumed is an estimate derived from a reference coin rate. It is useful for operational comparison and ROI analysis, but it is not the actual accounting expenditure and must not be presented as such.

At minimum, an estimated value should be interpreted together with:

- the number of coins consumed;
- the valuation rate;
- the valuation currency;
- the valuation effective date or period; and
- the valuation-policy version or calculation basis.

Actual expenditure and estimated consumption value must not be added together as though they were separate costs when they represent the same underlying economic resource.

## 7. Gift-purpose attribution

Only gifts funded by the agency are within the current business scope.

Agency-funded gifts serve three operational purposes:

1. `Scouting`: supporting relationship or acquisition work with a scouting prospect or candidate.
2. `Relationship`: supporting a creator who is not currently a scouting candidate or affiliated creator, where the relationship may have agency value.
3. `Development`: supporting or developing an affiliated creator.

The current operational spreadsheet derives purpose from the creator's lifecycle at the event time:

- `Scouting` applies from the start of the approach period through the end of the scouting period.
- `Development` applies from membership through departure.
- `Relationship` applies outside those periods.

This is lifecycle-based operational attribution, not a recorded statement of the sender's subjective intent. `Relationship` is consequently a residual category and may include gifts outside a currently active scouting or membership interval.

The current `gift-history-sync` workflow maintains gift events and derived projections across more than one domain. It must not be assigned exclusively to Creator Scouting or Creator Management:

- Creator Scouting consumes the `Scouting` portion.
- Creator Management consumes the `Development` portion.
- `Relationship` remains an agency-operations usage classification.

This purpose attribution does not create a second accounting expense for the related coin purchase.

## 8. Creator support and development cost

### 8.1 Support is broader than gifts

Support for an affiliated creator may include:

- gifts;
- Promote;
- equipment given to the creator;
- partial reimbursement or contribution toward a creator expense; and
- other agency-funded support.

The Creator Management cost model must therefore represent support and development cost rather than only gift cost.

### 8.2 Minimum viable monthly model

The current purpose of the support-cost value is management ROI. While non-gift support events remain low in volume, an itemized support table is not required.

A creator-month activity record can use the following minimum model:

- `Estimated Gift Support Cost`: calculated from `Development` gift coins and the applicable reference rate.
- `Other Support Cost for ROI`: a manually entered USD Currency value for Promote, equipment gifts, partial reimbursements, and other non-gift support. The current Lark display name is `コスト（その他）`.
- `Total Support and Development Cost`: the sum of the two fields.

Creator-level cumulative support cost is the sum of monthly `Total Support and
Development Cost` values for the same account. Creator-level cumulative ROI
uses that cumulative cost rather than a gift-only subtotal.

Only the portion actually borne by the agency is included. The initial model records the reviewed USD-equivalent amount because the current Management cost and contribution values are USD. Detailed accounting records and evidence remain in the accounting system and should not be duplicated solely for ROI.

As a simple initial policy, a non-gift support amount is recognized in the month in which the support is provided. Amortization or allocation across periods is unnecessary until materiality, volume, or management needs justify it.

### 8.3 When itemization becomes necessary

A dedicated support-event table becomes justified when one or more of the following becomes important:

- support volume increases materially;
- budget approval or per-event authorization is required;
- category-level analysis is required;
- accounting evidence must be reconciled to management attribution;
- refunds, corrections, or shared allocations become common;
- equipment ownership or amortization must be tracked; or
- multiple operators need an auditable support workflow.

Until then, a monthly manual amount minimizes operational burden while correcting the main ROI distortion.

## 9. Management ROI

The working management ROI model is:

```text
Support and Development Cost
  = Estimated Gift Support Cost
  + Other Support Cost for ROI

ROI
  = (Estimated Reward Contribution - Support and Development Cost)
    / Support and Development Cost
```

If support and development cost is zero, ROI is undefined. It must not be represented as zero or infinity.

The numerator and denominator are management-analysis values. They may contain estimates and must not be confused with statutory or bookkeeping profit.

Omitting non-gift support overstates ROI. In particular, a creator supported through Promote or equipment but not gifts may otherwise appear to have received no support cost.

## 10. Skill, MCP, and provider implications

### 10.1 Skills

A Skill corresponds to a business task. It may orchestrate multiple domain MCPs.

- Scouting observation and synchronization Skills primarily use Creator Scouting capabilities.
- Member activity and management-analysis Skills primarily use Creator Management capabilities.
- `gift-history-sync` is cross-domain because one gift ledger produces multiple purpose-specific projections.
- `coin-expense-reconcile` belongs to Expense and Accounting because it reconciles actual coin-purchase evidence to expense candidates.
- A Promote acquisition or reconciliation Skill is not currently justified by volume.

### 10.2 MCPs

An MCP exposes a bounded domain capability rather than mirroring one external UI.

The leading creator-domain MCPs are:

- Creator Scouting MCP; and
- Creator Management MCP.

Expense and Accounting is a separate domain. Whether all of its capabilities require a dedicated MCP process is an implementation decision, not a reason to mix accounting authority into a creator-domain MCP.

### 10.3 Providers

A provider owns knowledge of a concrete external service family. Independent surfaces remain independent bindings even when they share service knowledge.

- TikTok Provider Family may share TikTok concepts while retaining separate iOS, Web, and BackStage bindings.
- Lark Base Provider Family shares transport and validation while using separate Creator Scouting and Creator Management instance profiles.
- Google Drive Provider owns shared-backup destination routing, complete stored-byte readback, receipt validation, and coverage lookup. Frequency, retention, and recovery policy remain in Skills.
- Provider-specific URLs, screen structure, parsing rules, credentials, and production evidence remain outside public Skills.

## 11. Current domain decisions

The following decisions are established in the current working model:

1. Creator Scouting and Creator Management are separate bounded creator contexts.
2. Human approval is required before a prospect becomes a registered candidate.
3. Public LIVE-platform data and BackStage invitation or membership data have different authorities.
4. Scouting outreach remains human-performed for now, although its history is recorded.
5. Joining closes the scouting case but does not stop profile, LIVE, account, membership, or activity observation.
6. Creator Scouting and Creator Management use separate Lark Bases with shared Lark-provider infrastructure.
7. Actual coin-purchase expenditure is separate from coin-consumption events and estimated consumption value.
8. Gift purpose is a cross-domain operational attribution and does not allocate a specific coin purchase.
9. Creator support cost includes gifts, Promote, equipment, reimbursements, and other agency-funded support.
10. A monthly manual non-gift support amount is currently sufficient for ROI.
11. Automation priority is driven by operational volume and risk, not merely by the existence of a domain concept.
12. TikTok username remains the first-class external integration and operational
    search key, while Lark record ID remains the technical identity inside one
    Base.
13. Multi-account safety does not require a person or anonymous Actor record.
    Creator Scouting may represent a reviewed current sub-account by an optional
    `親レコード` self-relation to its main account; the relation does not collect
    identifying personal information.
14. A shared cross-Base `creatorId` is not required for the current v2 migration
    and must not be introduced. No separate Actor, Username History, Platform
    Account, Scout Candidacy, or Agency Membership master table is required for
    the accepted current scope.
15. TikTok `User ID`, nickname, and avatar observations are both recognition
    data and supporting evidence for resolving account continuity after a
    username change; they are not independent immutable identities.
16. The initial v2 scouting model manages TikTok accounts only. Off-TikTok
    scouting and cross-platform account relationship matching are outside the
    initial scope.
17. Scouting observed LIVE duration is derived from session start/end and is
    attributed in full to the JST session-start date without midnight splitting.
18. Management incentive and reward calculations use BackStage monthly LIVE
    duration and never substitute Scouting observed aggregates.
19. Scouting and Management use separate process and credential authority
    boundaries; Instance Profiles contain references, never credential secrets.
20. TikTok profile LIVE history contains completed sessions only, and Scouting
    diff synchronization uses exact account-plus-start-time matching.
21. Write intents, Provider receipts, and record histories are audit evidence,
    not backups.
22. Full Base backup is coordinated by distributed recurring runners through
    shared, content-verified receipts in the `Logs` shared drive. A fresh
    matching receipt causes other runners to skip; equivalent duplicates are
    tolerated and handled by reviewed retention rather than a lock-file rule.
23. Lark transport strategy is a tenant-level Provider capability, not a
    Scouting or Management business rule. The reviewed Flair Pro capability
    profile uses API-first because basic OpenAPI calls are unlimited, while a
    profile with a numeric monthly limit uses call-minimizing execution.
24. Lark per-table record capacity is also a reviewed tenant capability. The
    current Flair profile uses 20,000 rows per table; maintenance evaluates
    ratios from that numeric value and never interprets a plan label at runtime.
25. The 2026-09-04 isolated recovery drill verified the reviewed Base structure
    and record-data scope for Creator Scouting and Creator Management, but native
    Base import did not restore attachment blobs. Attachment protection is a
    separate recovery capability.

## 12. Unresolved design questions

The business model is sufficiently stable for architecture work, but the following implementation and policy questions remain:

- any separately approved automatic set/change/remove operation for the verified
  Creator Scouting `親レコード` self-relation, plus authoritative confirmation
  of the multi-account invitation policy;
- username-change detection and reviewed current-record update behavior. The
  accepted current scope has no structured alias index, so delayed historical
  username-only source events require manual review;
- the meaning and lifecycle of TikTok `User ID` and the confidential TikTok LIVE
  BackStage `ID`;
- the reviewed account-level operation used after BackStage confirms membership
  to create or update the Creator Management record;
- the storage location and ownership of observation history that continues after membership;
- the deterministic rule for choosing between iOS and Web when both can provide an observation;
- the final MCP process or namespace split;
- the final iPhone Mirroring driver and its security and stability assessment;
- the physical Lark application and Secret topology behind the
  authority-specific credential references, based on the access controls Lark
  can enforce;
- immutable/protected permissions for the reviewed `Logs` backup destination,
  one unattended end-to-end backup proof, and the separate backup and restore
  mechanism for attachment blobs;
- the valuation policy and effective rate used for estimated coin consumption;
- the exact evidence needed to distinguish a Promote coin purchase from a direct Promote charge; and
- the threshold at which monthly non-gift support amounts must be replaced by itemized support events.

## 13. Evidence and limitations

This model was informed by:

- the reviewed `TikTok Send Gifts` operational spreadsheet structure;
- reviewed export snapshots of the Creator Scouting and Creator Management Lark Bases;
- the existing public Skills and private provider runtime; and
- business explanations supplied during the architecture discussion.

The spreadsheet and Base exports are snapshots or operational artifacts. Their formulas and schemas support the model but do not override live-system state, canonical company records, or future reviewed policy decisions.
