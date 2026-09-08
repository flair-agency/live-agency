# LIVE Agency Domain Knowledge

- Status: Current working business model; accepted account-reference contract in §4.5. Explicit assumptions and unresolved questions are not newly adopted policy.
- Created: 2026-09-01
- Scope: Creator scouting, membership handoff, creator management, creator support, coin expenditure, and operational data authority

## 1. Purpose and status

This document records the LIVE agency business knowledge established during the design of the Skill, MCP, provider, and Lark Base architecture. It describes the business concepts and invariants that technical components must preserve.

It is a working model rather than an authoritative statement of contracts, accounting policy, platform terms, or live external-system state. Live systems and canonical company records take precedence. Reviewed exports and spreadsheets are evidence for this model, not permanent sources of truth.

The document intentionally excludes creator identities, credentials, production records, private URLs, and internal external-system identifiers.

## 1.1 Business concepts, platform rules and agency choices

Keep three kinds of knowledge distinguishable:

- Business concepts describe the purpose of acquisition, creator development,
  audience experience and agency operations. They are an analytical abstraction,
  not a claim that every platform uses the same business model.
- Platform-specific knowledge describes eligibility, invitation and departure
  procedures, reward policies, capabilities and support channels. Bind it to
  the platform, region, applicable period and authoritative source. Service
  details remain with their existing Provider owners.
- Agency choices describe Flair's positioning, staffing, resource allocation
  and objectives. They are neither universal industry rules nor proof of
  implemented automation.

An overview or historical example does not resolve conflicting eligibility or
reward conditions. Verify the applicable source rather than selecting a
convenient threshold. This distinction does not expand the TikTok-only v2 scope
or introduce a multi-platform schema.

## 1.2 Value creation and the two operating functions

LIVE content creates value through real-time interaction, entertainment and
participation for viewers. Creator development concerns the ability to deliver
that experience sustainably; observed duration and reward amounts are useful
signals but do not exhaust its meaning.

Scouting brings creators into the agency, while Management supports their
activity and development after membership. Affiliated creator count and each
creator's activity and results are two business growth factors. Their product
is a conceptual explanation, not a contractual reward formula or a guarantee
that revenue scales linearly.

The owner describes Flair's current revenue model as platform-paid agency
rewards linked to affiliated creators' results. Do not generalize this into the
only possible agency revenue source, conflate creator earnings with agency
rewards, or assume participation in other revenue programmes.

Business oversight coordinates acquisition and development capacity, costs,
revenue and priorities. This is a cross-cutting responsibility, not a fourth
bounded context or a requirement for separate employees. One operator may hold
multiple roles. Agency-specific allocation targets are planning choices, not
universal optimal ratios.

## 2. Core business contexts

The current model has three business contexts.

### 2.1 Creator Scouting

Creator Scouting covers the work required to discover, evaluate, approach, and track prospective LIVE creators until either agency membership is confirmed or the scouting case is closed without membership.

The initial version 2 operational scope is TikTok scouting only. Discovery,
candidate registration, account tracking, and multi-account relationship checks
for accounts on other LIVE platforms are not managed in the initial model.
Supporting another platform requires a later explicit scope and migration decision; the current
schema must not be generalized merely for hypothetical future use.

Acquisition design can distinguish new and experienced creators, and direct
outreach, referrals or other acquisition channels. These describe possible
business approaches, not channels currently operated by Flair or capabilities
implemented in v2. Channel choice and prospect evaluation remain distinct from
platform invitation eligibility.

### 2.2 Creator Management

Creator Management covers affiliated creators from confirmed membership until departure or the end of management. It includes creator activity, management work, incentives, rewards, support, development cost, and management performance analysis.

Management work can include initial onboarding and broadcast preparation,
content and audience-interaction development, promotion planning, post-LIVE
review, production-quality support and issue coordination. The appropriate
support depends on the creator's stage, wishes and available agency resources.
Describing this work neither establishes that Flair provides every service nor
authorizes new automated actions.

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

### 4.5 Account identity and continuity

#### Decision

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

#### Business authority and Base ownership

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

#### Current username and account continuity

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

#### Current multi-account representation

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

#### Existing identifiers and permitted meaning

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

Write intents, Provider receipts and record histories are audit evidence, not restorable backups. Full Base data protection is independent of an individual domain write client. Frequency, retention and recovery policy belong to Skills; Providers expose the selected acquisition/storage capabilities. Native Base backup does not by itself establish attachment-complete recovery. Required attachment protection needs its own content verification and restore evidence.

Service-specific export and tenant-capability details are in the [Base Provider model](../../providers/lark-base/knowledge/data-model.md); Runtime owns the [full-Base caller contract](../../runtime/docs/v2-full-base-backup-caller-contract.md). Existing measurements are historical evidence, not current service verification.

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

The current `live-agency-gift-history-merge` workflow maintains gift events and derived projections across more than one domain. It must not be assigned exclusively to Creator Scouting or Creator Management:

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

## 10. Implementation ownership

The [architecture](../architecture/overview.md) owns component responsibilities. This model owns business meaning; the [Base Provider](../../providers/lark-base/knowledge/data-model.md) owns its table/field mappings. Account-decision measurements remain [historical evidence](../archive/v2-identity-model-decision-gate.md).

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

### External business-context review, 2026-09-08

The explanatory business additions draw on an owner discussion and browser
review of two external TikTok agency documents: the 2023 TikTok LIVE Japan
Onepage (displayed update 2024-03-21) and the agency guideline (displayed update
September 1, without a year in that display; its body includes 2026 notices).
The Onepage presents non-binding industry observations and examples. The
guideline combines an overview with links to detailed rules.

The reviewed scope was the major text sections, not every embedded image or
linked source. Generalized business concepts are an interpretation of that
material, not independently verified cross-platform findings. Historical
statistics, success examples and conflicting overview thresholds do not become
current operating rules. No raw source text, private URLs, policy thresholds
or programme terms are reproduced here. This review does not establish
implementation, deployment or current production health.
