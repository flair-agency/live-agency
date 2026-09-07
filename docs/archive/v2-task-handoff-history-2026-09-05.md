> Archived pre-IA-2 documents, 2026-09-05. Historical evidence only; all next-work,

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).
> pending-state and task-policy statements below reflect their capture time.
> Start from [the current handoff](v2-task-handoff.md); permanent rules are owned
> by [the orchestration policy](../governance/development-policy.md). No historical
> approval is renewed by this archive. Original bodies are retained verbatim.

# LIVE Agency Runtime v2: Current Task Handoff

- Updated: 2026-09-05
- Latest accepted scope: The owner approved IA-0 through IA-4 as v2 work on
  2026-09-05. At the current package's verified checkpoint, run IA-0 through
  IA-2 before further migration implementation; then resume from reconciled
  evidence. IA-3 follows each stable workflow, and release-required IA-4
  coverage feeds M7-2. See the [approved plan](instruction-audit-and-simplification-plan.md).
  All IA execution remains pending; this entry records approval and sequence.
  Astra is the default for new packages under the permanent model policy.
- Earlier M2U checkpoint (not the current next-package instruction): M2U requires explicit User/Tenant profile selection
  across every Lark OpenAPI Provider and direct/indirect consumer, including
  cross-domain gift projections. The
  [selection design](../../packages/lark-core/docs/principal-selection.md), migration plan, PERT
  and capability inventory are aligned. M2U-1 now has a local source/caller
  inventory, official operation-support baseline, pure selection/binding
  contract and synthetic rejection tests. M2U-2a now has a local selected
  API-user CLI authentication path that proves the configured app, exact User,
  organization and scopes, then re-proves the same actor before retrying one
  authentication-rejected read. The selected transport/core is committed at
  `aff6fe2`; the root pins the completed Lark Chat Provider at `1de8c1c` and
  selected Lark Base attachment transport at `a1bee26`. Base
  attachment-acquisition integration is still mixed and uncommitted, so it is
  not safe to publish or treat as a clean-clone result. Provider transport
  integration, consumers and rollout were pending at that checkpoint. Its then-next
  package was M2U-2b; use Section 4 for the current resumption sequence.
- Integration branch: `v2/domain-mcp-architecture`
- Latest committed implementation checkpoint for M2U: `3ab116b` (root pins);
  selected core transport is `aff6fe2`.
- Current implementation checkpoint: M2 identity and read-model work is
  complete. M4 wave 1 completed its production dual run, activated the isolated
  invitation-history write profile, and applied the exact approved r6 intent.
  Readback verified one new state row and one avatar attachment with no
  timestamp update or uncertain outcome. The v2 processes are now in Codex
  configuration and the existing daily heartbeat points to its version 2
  read-only route after a separate cutover approval. The first app restart
  loaded both surfaces and revealed a fail-closed current-time race before any
  external mutation. Creator Scouting `0.4.1` and the heartbeat now use the
  exact source-read snapshot for current target selection. A second app restart
  loaded the patched surface, and a live read-only rehearsal reached the
  expected `interaction_required` boundary with zero external mutation. The
  manual rehearsal did not count. The first 01:40 scheduled cycle stopped
  during the initial Lark read
  with HTTP 400 and zero external mutation. Diagnosis showed that the long-
  lived API process retained a finite-lifetime tenant token without refreshing
  it. The common Lark transport now refreshes before expiry and retries only
  one rejected read after reauthentication; writes are not retried. A fresh
  process and, after restart, the active desktop process passed live read-only
  target selection. The first repaired 04:30 scheduled cycle returned
  `interaction_required` with zero external mutation. The second repaired
  05:15 scheduled cycle returned the same expected result with zero external
  mutation, completing the gate at 2/2. The operational heartbeat remains
  active daily at 05:15, the completion monitor is stopped, and the version 1
  rollback artifacts remain retained.
- The current v2 implementation is now committed locally across the composition
  root and its modified component repositories. M4 wave 2 has a source-neutral
  `creator-profile-sync` dual-run adapter, comparator, and synthetic regression
  suite. The isolated profile-history reviewed-write MCP is now implemented and
  passes its synthetic contract/runtime suite. The production comparison is now
  `equivalent` for one exact 20-row reviewed manifest: both paths proposed 11
  creates, zero attachments, nine unavailable rows, and no conflicts or target
  issues. The write route remains inactive and absent from the owner-only
  profile bundle. No destination write, profile-history write-profile
  activation, or scheduled-route switch has been performed for wave 2.
- Owner decision on 2026-09-05 froze `coin-expense-weekly-application`. Do not
  continue development, advertise its Provider capabilities, activate it,
  schedule it, or use it for production reads or writes. Retain the prototype
  and synthetic tests only as a design record. Weekly applications remain
  manual. Reopening requires an explicit owner decision based on documented
  official application-mutation API support or a materially different
  cost-benefit assessment.
- Purpose: resume the migration without loading the prior chat history

M4 wave 3 `creator-live-history-sync` synthetic preparation is complete in the
local component checkpoint. The adapter, comparator, and LIVE-specific MCP target
contract preserve reviewed cutoff/known-session context and reject incomplete
observation coverage or blocked dry runs even when both paths match. This is
parallel preparation only; no production LIVE comparison, write activation,
active-process restart, MCP configuration change, or schedule switch occurred.

## 1. Read this first

Start from this document. Open the linked design documents only when the next
task needs their detail. Do not reload prior chats, old Base exports, or full
test logs by default.

The current objective is to migrate the existing LIVE-agency Skills to two
Skill-facing domain MCPs:

- Creator Scouting MCP
- Creator Management MCP

Skills remain business tasks. MCPs own LIVE-agency domain operations. Providers
own knowledge of one external service or concrete service surface. Lark Base is
the current data destination, not the source of public TikTok information.
The accepted M2U requirement also covers Lark OpenAPI consumers outside the
creator-domain MCPs; cross-domain status does not exempt gift or maintenance
from explicit API identity selection.

## 2. Decisions that must be preserved

- Keep `origin/main` as the v1 production line until each Skill passes its v2
  dual-run and rollback gates.
- M2U is required v2 scope. Private Instance Profile routes explicitly select
  Tenant (`api-app`) or User (`api-user`) for operations that support them.
  App ID, driver and ambient token availability never select the actor.
  Unsupported combinations stop, with no User/Tenant fallback. Preserve
  instance-specific authority, including active M4I's Tenant/mutation denial.
- Do not add or backfill a shared Flair `creatorId`.
- Current TikTok username is the operational and external join key. It is
  mutable and is not permanent identity.
- Lark record ID is the stable technical identity only inside one Base.
- TikTok `User ID`, nickname, and avatar are account-continuity evidence.
- Creator Management `ID` is a confidential BackStage identifier with an
  unverified lifecycle. Do not repurpose or expose it.
- No Actor/person, Platform Account, Scout Candidacy, Agency Membership, or
  Username History master is introduced. Creator Scouting uses the verified
  optional `親レコード` self-relation for a reviewed current sub-to-main link;
  Creator Management remains account-centered.
- Automatic parent mutation, account merge/split, username/alias mutation, and
  account-level membership transition require separate write contracts and
  approvals.
- Invitation eligibility comes from BackStage, not the public TikTok surface.
- Joining Flair does not stop observation. The storage purpose and operational
  owner move from Scouting to Management.
- Scouting LIVE duration is approximate and grouped by the session start date.
  Management incentive calculations use BackStage monthly LIVE duration.
- The initial TTBA DM source is the exact `DM候補（TTBA）` Creator-table view.
  `担当クリエイター.DM可` means only that DM is possible. Prior `メッセージ`
  and `スカウト` activities both exclude an account from initial outreach.
- The reviewed [LIVE Agency Skill Naming Policy](../governance/skill-naming-policy.md) and
  its [companion migration plan](../reviews/v2-skill-naming-and-migration-plan.md) define
  a separate planned v2 workstream for naming and responsibility alignment.
  It uses the `live-agency` namespace, covers every repository Skill and the
  separately gated foreign-revenue migration, and does not change the current
  next-package priority, M7 exit criteria, route authority, or frozen status.

Detailed identity constraints are in
`docs/v2-identity-model-decision-gate.md`. Current Base mappings are in
`docs/v2-m2-lark-data-model-plan.md`.

## 3. Completed work

### M2U scope and design checkpoint

The owner accepted all-Lark OpenAPI User/Tenant selection on 2026-09-05. The
[selection design](../../packages/lark-core/docs/principal-selection.md) specifies the existing
Principal vocabulary, operation-level support matrix, same-actor refresh,
constrained semantic reads/writes, audit/intent binding, complete consumer
inventory and five implementation packages. M7 now requires this coverage.
Base, Chat, domain MCPs, shared adapters, gift projections and backup/recovery
API phases are explicitly included; future-only Providers inherit the gate.
M4I's active instance restrictions and separate app-review gate remain intact.

Only planning documents changed in this checkpoint. No Provider code, active
profile, token, permission, running process or schedule changed. The current
Base API-app restriction and GET-only User transport still require M2U work.
Documentation validation checks links, scope/status consistency and whitespace;
historical test counts below are not evidence that M2U is implemented.

### Architecture and contracts

- M0 reproducible composition baseline is complete.
- M1 domain and authority separation is complete.
- Creator Scouting and Creator Management run as separate read-only MCP
  processes; the mixed five-tool process remains for v1 compatibility.
- Provider Binding resolution, Lark Instance Profile resolution, and read,
  write, and action launch profiles fail closed on missing or ambiguous routes.
- Creator Scouting has eight read-only tools: Lark-backed continued-observation
  selection, profile observe/validate, LIVE observe/validate, invitation-
  eligibility observe/validate, and Lark-backed account-evidence review.
- Pure Creator Scouting read contracts now select existing records separately
  for profile, LIVE-history, and invitation-eligibility observation from the
  three current expiry values. They do not recalculate Base cadence policy.
- The Scouting Lark read runtime resolves current field names from immutable
  field IDs, reads Creator, profile-observation, and invitation-state rows,
  verifies exact relations and counts, and feeds the pure selection and account-
  evidence contracts. Candidate profiles, missing operations or resources,
  duplicate records, unresolved relations, conflicting invitation User IDs,
  and ambiguous attachments fail closed.
- M2L now defines versioned Organization, API-app/browser-user Principal,
  tenant-capability, service-capability, and service-discriminated Instance
  Profile contracts. Verified, observed, inferred, and unknown evidence states
  remain distinct.
- The private `@flair-agency/lark-core` library owns only credential-reference
  parsing, App ID fingerprint verification, tenant-token acquisition, bounded
  Lark HTTP transport, browser-Principal preflight, and route-equivalence
  checks. It owns no Base, Chat, or Docs surface knowledge.
- The Base Provider retains Base row, sync, export, table, field, view, relation,
  attachment, and browser-grid knowledge. Tenant API budgets and Base-specific
  capabilities are now separate profiles.
- Base, Chat, and Docs Instance Profiles have distinct resource schemas. A
  route cannot fall back across organization, service, resource, domain,
  authority, Principal scope, or visible-data scope, and only a retryable
  non-write transport failure can enter a reviewed equivalence group.
- The previous Base-only profile array and credential-reference client remain
  as a temporary rollback path. The active Scouting read now resolves its
  owner-only `lark-profiles/v2` bundle through the new Base profile contract;
  no production identifier, credential selector, or fingerprint is in Git.
- The integration tests are synthetic. Separately, the approved production read
  profile was migrated and bounded live reads were reverified; no production
  write was performed, and no person, parent-relation, or alias state changed.

### Reviewed Scouting writes

- Write-intent and connected Lark runtime contracts cover only appending
  Scouting activity history and setting the next-action deadline on an existing
  activity record.
- The separately launched three-tool process injects its own write Instance
  Profile and immutable bindings; callers cannot supply or replace them.
- Intents bind the write Instance Profile, schema fingerprint, Creator,
  assignment and activity table IDs, field IDs, exact operation payloads,
  counts, and approval hash.
- Preflight and readback reconciliation verifies existing Creator and assignment
  relations, action options, parent activity, read scope, schema, and the
  expected previous deadline.
- Exact replay becomes a verified no-op. Partial application, relation drift,
  duplicate natural keys, or changed deadlines block replay of the original
  intent. An uncertain response is read back and never automatically retried.
- The process accepts only a current active write profile with the exact four
  list/create/update operations, one dedicated API route, and no fallback. The
  legacy profile format is rejected.
- Synthetic execution and MCP integration pass. No private write profile or
  credential reference was created or activated, and no live Lark mutation was
  performed.

### M4 wave 1 preparation

- `creator-invitation-status-sync` now documents a migration-only version 2
  path through the Creator Scouting invitation-eligibility observe and validate
  tools while retaining version 1 as the authoritative route.
- A source-neutral comparator binds both paths to one exact reviewed target
  manifest and compares coverage, normalized values, proposed mutations,
  unavailable values, and stop reasons.
- The comparison accepts only intact private dry-run plans, records content
  hashes instead of Creator details in its report summary, and rejects target
  drift or plan tampering.
- An equivalent result is explicitly non-authorizing. It cannot activate a
  write profile, switch a schedule, or apply a plan. Invitation-history cutover
  required its own active domain write route, approved route switching, and two
  successful scheduled version 2 cycles. Those separate gates are now
  satisfied; the equivalent comparison did not authorize them.
- The invitation-history domain write route is now implemented as a separate
  inactive three-tool MCP process. Its synthetic runtime accepts one exact
  reviewed manifest and normalized observation set, injects immutable field and
  table bindings, prepares a content-bound intent, requires the exact hash and
  create/update/attach/already-applied counts, repeats preflight, and verifies
  readback without automatic retry.
- The route permits only invitation-state creation, latest-identical timestamp
  extension, and exact avatar attachment. It blocks target or due-view drift,
  external-user-ID conflicts, timestamp collisions, ambiguous latest history,
  partial application, changed avatar bytes, and over-broad write profiles.
  No active production profile, credential, active MCP configuration, Lark write,
  `r6` apply, or schedule switch was created.
- After the user identified the active Creator Scouting read keychain item for
  reuse, the route-specific isolation rule was narrowed to permit only one
  separate invitation-history write Principal backed by that exact active read
  API app on the same Base. Sharing the Principal itself, sharing across another
  domain/Base/app, or sharing with multiple Principals still fails closed.
- An owner-only production candidate bundle was then generated from the active
  read bundle, the reconciled 2026-09-04 native export, and the reviewed private
  invitation binding. Keychain access proved the App ID fingerprint without
  persisting a Secret. Both the profile and Principal remain `candidate`, mode
  `0600`; startup stops before authentication. A memory-only active-contract
  simulation validates the single route, seven allowed operations, two tables,
  seven fields, and due view without persisting active state or contacting Lark.
- The candidate was then exercised against the exact owner-only `0310k.i` r6
  target and observation in a transport-enforced read-only production dry run.
  It reproduced one state create, zero timestamp updates, one avatar attachment,
  and zero already-applied rows. An immediate exact preflight reread remained
  `ready`. Thirty bounded requests covered one authentication plus allowlisted
  table, due-view, metadata, state-option, and existing-attachment reads; zero
  mutation requests were sent. The r8 verification SHA-256 is
  `51a93d46f530326ef72c4f6c220587399c002b54d1ad1e1ebe9e222ce818b3f6`.
  Candidate status remains persisted and the active simulation remains memory-
  only.
- M2 subsequently reported that a new self-referential single-link field had
  been added to the live Creator table after the export reconciliation used by
  the candidate. Its read-only production check found one valid link and no
  self-reference, multiple-parent, missing-parent, multi-level, or cycle issue.
  Nevertheless, this is schema drift relative to the candidate fingerprint.
  The candidate and r8 are therefore historical evidence only and cannot be
  activated. The owner-only supersession receipt has SHA-256
  `80a06b8499d0f4542e14f299c58c563306fb7ba445965fa5f0f1097ac124691f`.
  No profile activation, Lark mutation, or schedule switch occurred.
- The later M2 task acquired a user-authorized native export through the
  authenticated Base browser route. It verified 14 tables, 19,862 records,
  1,370 Creator records, and an exact one-field additive schema delta for
  `クリエイター.親レコード`. The private `r2` reconciliation is complete,
  and the active read profile was regenerated and bounded-live-verified. This
  resolves the M2 export blocker but does not revive the prior M4 candidate or
  `r8`.
- M4 regenerated a second owner-only candidate from the post-parent active
  read bundle and `r2` reconciliation. Its profile and Principal remain
  `candidate`, its file mode is `0600`, its App ID fingerprint matches the
  shared read keychain credential, startup stops before authentication, and
  the memory-only promotion simulation passed. Candidate SHA-256 is
  `5ed47f04df5d528faf69cad2cf371ad9601f99e790cb67fbab1942b6e5f19074`.
- The repeated transport-bounded production read-only dry run against the exact
  `0310k.i` r6 input also passed: create 1, timestamp update 0, avatar attach 1,
  already-applied 0, immediate preflight `ready`, 30 bounded requests, and zero
  mutation requests. The r9 verification SHA-256 is
  `679d51fb4de15003273d41dbee0395faa76c918a9860e55a6e0da309bae24fe5`.
  No profile activation, Lark mutation, or schedule switch occurred during the
  dry run.
- The user subsequently approved only activation of
  `flair-creator-scouting-invitation-history-write`. A hash-bound promotion
  activated that profile and its separate Principal in the owner-only bundle,
  first preserving the prior bundle as rollback. The active bundle SHA-256 is
  `29c3af1193d71fc5cfb426e8eaf0ad125658dc73e6354d922323cfda83968e5a`;
  the rollback SHA-256 is
  `7af1eee7986b9d21262bc3e97ec32e5fa15b83190e7e555e2ee736c963089de7`.
  Startup accepted the reviewed profile and keychain reference, but no tool was
  called, no Lark mutation occurred, and the process was not added to active
  MCP configuration. The promotion receipt SHA-256 is
  `dad976a49544ef06617b6a9ccc768bcf178218f8b1b4c5f9c2467489d4366b96`.
- A fresh production dry run through the persisted active profile then returned
  immediate preflight `ready`, the same create 1 / timestamp update 0 / avatar
  attach 1 / already-applied 0 counts, and zero mutation requests. The r10
  receipt SHA-256 is
  `c5c45c33d22883d6b6e2d75b5b4bfbbeffc41762f6c7ae83a9bc35694467cf89`.
  Its intent SHA-256 is
  `60b74e382b2fb4ed91de8b9c872599261c9f10f680aa5786baa7db5433ed272e`
  and expired at `2026-09-04T13:16:51.048Z`. The user confirmed that exact hash
  and all four counts before expiry.
- The isolated r11 execution completed once with create 1, timestamp update 0,
  avatar attach 1, and already-applied 0. Post-write readback verified the two
  intended mutations, found no discrepancy, did not use uncertain-write
  recovery, and did not retry. The owner-only execution receipt SHA-256 is
  `46eae5b96384f59bfa90882c555043905b0a205c1bcf0157c8b1f82a91cf6982`.
  No invitation, follow, message, Creator-record update, schedule switch, or
  automatic retry occurred.
- Synthetic comparison tests pass. No production target manifest, observation,
  or dry run was acquired during the synthetic implementation task.
- A later M4 wave 1 task selected one due production target through the active
  Scouting read route and stored its manifest and review receipt as owner-only,
  Git-ignored files. The user explicitly approved BackStage read and v1/v2 dry-
  run use for that one manifest, but did not authorize a destination write or
  scheduled-route switch.
- Version 1 and version 2 resolved the exact same private acquisition Binding,
  package and knowledge version, and produced identical private instructions.
  The version 2 audit context was bound to the Creator Scouting read domain.
- Browser acquisition first failed closed because the admin-enforced browser
  policy could not be verified. The security control was not bypassed.
- After an application restart, the same approved manifest reached the exact
  one-row BackStage result. No invite or follow control was used. The visible
  row contained an eligibility result and an avatar, but the avatar had zero
  exact matches in the browser's current `pageAssets` inventory. Direct URL
  retrieval and screenshot substitution were not used.
- The owner-only `r2` report records matching `AVATAR_ASSET_UNAVAILABLE` stop
  reasons and matching results across all five comparison dimensions. Because
  both paths stopped before a complete normalized observation, no destination
  dry-run mutation plan exists; comparison status remains `different` and is
  not eligible for cutover. Its result SHA-256 is
  `785d028f1e8b721a5f8f3fd315484e1f88108051d6711e680957e3a5cd6f2d6b`.
- At the user's direction, a second one-row production manifest selected the
  first due Creator after explicitly excluding the first account. The new
  manifest is distinct, owner-only, Git-ignored, and bound to the same read-only
  v1/v2 acquisition route and instructions.
- The replacement Creator also returned exactly one BackStage row with a
  visible avatar, but that avatar again had zero exact `pageAssets` matches.
  This establishes the active blocker as the acquisition capability rather than
  the first Creator. The owner-only `r3` report matches all five comparison
  dimensions, remains `different`, and has result SHA-256
  `befc09850e0b1abef52f740edc9af68117fc73584fcfd129cc9f412bf013b500`.
- A third production manifest used `selected` mode for one exact Creator named
  by the user. Lark resolved it one-to-one and both acquisition paths again
  resolved the same private route and instructions. BackStage returned one
  exact row with a valid eligibility value and a visible avatar, without using
  invite or follow controls.
- The third avatar also had zero exact `pageAssets` matches. The owner-only `r4`
  report records matching `AVATAR_ASSET_UNAVAILABLE` stop reasons across all
  five dimensions, remains `different`, and has result SHA-256
  `4a37c185e07b6b351878ea49b812c42908cd9aae6fdf33dd4da6ffe92e2e27fe`.
- Follow-up diagnosis proved that each exact result-row image was fully rendered
  as a 100-by-100 signed WebP while the complete `pageAssets` inventory exposed
  no WebP asset. The failure occurred before byte validation and was caused by
  the Provider's unsupported assumption that every rendered image appears in
  that inventory, not by either v2 comparison path.
- Private BackStage Provider 1.2.2 and knowledge version
  `backstage-invitation-eligibility/2026-09-04.1` now prefer the exact
  `pageAssets` route and use a bounded exact-`currentSrc` fallback only when the
  verified row image is absent or cannot be bundled. The fallback accepts only
  HTTPS TikTok CDN sources, follows no redirects, sends no browser credentials,
  retains no signed URL, enforces a 5 MB limit, validates WebP and other approved
  signatures, and stores only owner-only verified bytes.
- An unavailable transfer no longer discards an otherwise exact eligibility
  observation. Row/image ambiguity, multiple asset matches, or an unexpected
  source host still fail closed. Seventeen Provider tests, the package dry run,
  the full root suite, and `git diff --check` pass. The existing production
  report remains historical stopped evidence; no replacement dual run or Lark
  write was performed during the fix.
- A live `r5` verification reused the exact user-selected manifest and confirmed
  that both the version 1 compatibility route and version 2 Creator Scouting
  route resolve Provider 1.2.2 with knowledge version
  `backstage-invitation-eligibility/2026-09-04.1`. The exact BackStage row still
  normalized to the same eligibility result. The bounded fallback acquired its
  100-by-100 WebP as a 2,144-byte owner-only file, derived SHA-256
  `4e52bc80d842f42e92e77146d1e5daa88804e50ca2a0015b9f3dfc8a70059809`,
  and the normalized observation validated through both routes. The owner-only
  verification report has SHA-256
  `8c9477e7e020975a6532b9a96b9f7dabcc4c74d599bee04fe125348f364018e2`.
  No invitation, follow, Lark write, destination dry run, or route switch was
  performed.
- The subsequent owner-only `r6` production dual run reused that exact manifest
  and observation. Version 1 performed the full 2,880-row destination-history
  validation; after it reported no invalid rows, conflicts, ambiguous latest
  states, or stale observations, version 2 reread the same live destination and
  fully validated the selected Creator's two history rows and attachment. Both
  paths proposed one new history row with one avatar attachment and no timestamp
  update or already-applied row. Coverage, normalized values, proposed
  mutations, unavailable values, and stop reasons all match. The comparison is
  `equivalent`; its result SHA-256 is
  `62d850326c6bd78ca1516ac10293f72837c34ab8af4a3ffe5ebececceddfcaff`.
  All artifacts are owner-only and Git-ignored, and retain no signed source URL.
  No Lark mutation, invitation, follow, write-profile activation, or route
  switch occurred.

### M4 wave 2 production comparison

- The production profile comparison reused one exact owner-only 20-row target
  manifest from the active Creator Scouting read profile. The manifest was not
  regenerated or altered between the version 1 and version 2 paths.
- Visible TikTok profile acquisition produced normalized observations for all
  20 manifest rows. Twelve accounts reached their exact public profile surface;
  one of those accounts was unavailable, and one account's post-date surface
  was recorded as `schema_changed` after its visible label could not be safely
  corroborated. After the twelfth account, the admin-enforced browser policy
  became unavailable on three consecutive direct navigation attempts. The
  remaining eight accounts were therefore recorded as `blocked`; the security
  control was not bypassed.
- The version 2 observation set validated for all 20 rows. Both destination
  dry-run paths independently reread the live Base and produced the same plan:
  11 creates, zero avatar attachments, zero already-applied rows, nine
  unavailable rows, zero conflicts, zero target-manifest issues, and zero
  invalid stored rows. Neither plan was applied.
- Coverage, normalized values, proposed mutations, unavailable values, and stop
  reasons all match. The comparison status is `equivalent`; its result SHA-256
  is `4c2be979d6bfc513ce53235188367b964c7fc1ec68d1aac26d89764f98932259`.
  Its content-bound input SHA-256 is
  `cec48c41356987fcd3d8e3b523f78c684f4976c3472b04a0ed818d89483e3f05`.
  All evidence, observations, dry-run plans, and receipts are owner-only,
  mode `0600`, and Git-ignored.
- Equivalence proves path parity for this exact reviewed input. It does not
  establish complete acquisition coverage for the eight browser-blocked rows,
  activate the profile-history write route, authorize a Lark mutation, switch
  the schedule, or retire version 1.

### Account evidence review

MCP commit `d4e0333` implements a pure review contract for account duplicates
and possible username changes. It compares timestamped current username,
historical username, TikTok User ID, avatar hash, and nickname evidence.

- Nickname equality alone does not create a candidate.
- Avatar or avatar-plus-nickname remains supporting evidence.
- Username and User ID conflicts stop resolution.
- The result never updates a username, creates an alias, merges records, sets a
  parent relation, or asserts person identity.
- The pure review behavior remains unchanged and is also exercised through the
  new Lark-backed MCP path.

### Current Lark data readiness

Fresh production exports were analyzed on 2026-09-04 without mutating either
Base. The Creator Scouting export was repeated after a one-row live-count drift,
and the resulting artifact was reconciled before final promotion.

- Creator Scouting: 14 tables, 1,370 Creator rows, 19,862 total records.
- Creator Management: 19 tables, 13 Creator rows.
- Thirteen username-based cross-Base account links are possible evidence only.
- No current data-quality issue was reported by the implemented assessment.
- The post-parent Creator Scouting artifact has SHA-256
  `a02ca5578e602d37d75e7e86197409920503c35282159e3c03cc12bf28baff14`.
- The prior-to-current export reconciliation proves that `親レコード` is the
  only field addition. The refreshed candidate inventory binds its immutable
  field configuration and single-value Creator self-relation.
- Exactly one Creator has a parent. Multiple-parent, missing-target,
  self-reference, parent-chain, and cycle counts are all zero.

The user-approved `flair-creator-scouting-read` profile remains read-only and
uses its authority-specific private credential reference. After the additive
schema refresh, its owner-only `lark-profiles/v2` bundle was regenerated while
preserving organization, principal, route, authority, operation, and existing
field bindings. The previous bundle was retained as an owner-only rollback
copy.

### M4I Phase 1 design

- The current official Chat read behavior was reviewed for Principal-specific
  authentication and visibility, permissions, retention evidence, pagination,
  edits and recalls, thread replies, senders, and attachment resources.
- `docs/v2-m4i-conversation-message-contract.md` now defines the source-neutral
  `conversation-message-observation/v1` contract, allowlist and audit rules,
  API/browser route separation, fail-closed conditions, synthetic verification
  plan, and the separately approved production-feasibility boundary.
- Source-specific URLs, permission names, and mapping detail remain in a
  Git-ignored, owner-only, content-hashed review. It contains no real chat ID,
  message, sender, credential, or production response.
- At Phase 1 no Provider repository, production Instance Profile, credential,
  production read, fallback, activation, or chat mutation had been created.
  M4I remains independent of the M4 Skill waves.
- The owner reports that the Creator Networks custom app remains under review,
  Chat read permission is unavailable, they cannot add the Bot to the target
  chat, and an addition request would likely be rejected. Read-only console
  inspection shows that the pending release requests user-token read scopes and
  no tenant-token scope change. The design now binds the user-OAuth API and
  browser routes to the same human Principal. Browser is selected explicitly
  while approval is pending; API is the planned primary after approval, and
  grade-`B` browser fallback requires the same user and protected scope but not
  payload equality. Bot/API is excluded.

### M4I Phase 2 implementation

- The source-neutral conversation-message request, observation, coverage,
  message, attachment-metadata, audit, and canonical-hash contracts are
  implemented in the domain MCP package.
- A private `@flair-agency/lark-chat-provider@1.0.0` package implements
  exact non-empty allowlists, organization/Principal/route resolution,
  explicit route selection, same-user and protected-scope fallback continuity,
  bounded main/thread pagination, API message mapping, and an injected browser
  reader with session, structure, loading, and read-only checks. Payload
  equality is not a fallback gate; the Provider reports grade `A` or `B` for
  the selected route. API-app/Bot routes are rejected.
- The package exports no chat mutation method. Profile authority and operation
  validation reject writes, sends, reactions, edits, recalls, deletes,
  invitations, and attachment bytes before transport.
- The Provider package has an independent Git history, passes its ten tests plus
  an organization/credential boundary scan, is published in the private
  `flair-agency/live-agency-provider-lark-chat` repository, and is pinned by the
  composition root as an exact submodule commit.

### M4I Phase 3 execution harness

- Separate builders now create an isolated Flair user-OAuth conformance
  candidate, a retained historical Flair Bot/API diagnostic candidate, and an
  isolated Creator Networks browser-feasibility candidate. Each live candidate
  requires one exact allowlisted chat, persists as `candidate`, uses one
  explicit route, and keeps its equivalence group null.
- The active Flair conformance path uses an explicit Lark CLI user-OAuth
  authorization, observed App ID fingerprint, exact authorized user ID, and
  required scopes. It creates a distinct Chat Principal/Profile, denies
  production use, and does not alter existing Base or invitation-history
  profiles. The Keychain-backed Bot path is historical only.
- The bounded API-user boundary permits only exact message-list GET routes with
  explicit user identity. Metadata is read before content; the window is at
  most 24 hours; page, message, thread, and request counts are bounded;
  attachment bytes and every Chat mutation are denied.
- The Creator Networks path contains no Flair organization or credential. Its
  browser evidence must match the exact organization, user, target hash,
  resource, reviewed structure, authenticated session, complete loading, and
  read-only interaction. Broad chat enumeration and chat creation must both be
  false.
- Both paths normalize through `conversation-message-observation/v1`, but their
  evidence is never merged and does not establish route equivalence. Full
  observations stay owner-only; ordinary receipts contain only counts and
  hashes.
- Thirty-two targeted M4I tests pass. They cover the source-neutral Agency
  Intelligence MCP surface, browser prepare/capture validation, exact OAuth
  app/user/scope binding, GET-only execution, same-user fallback, and Bot/
  different-user rejection, Provider-assigned API/browser information-quality
  grades, reviewed activation, and active-runtime replay. No Chat mutation was
  attempted.
- Owner-only readiness receipt:
  `private/v2/m4i/phase3-readiness-2026-09-04-r1.md`, SHA-256
  `d235e3455a158b4c5954dccbcd0adf1947a5ce59e54f910ad508d6a277021abe`.
- Flair user-OAuth authorization and bounded live conformance now pass against
  one isolated replacement test chat. The exact app, user, required scopes, and
  one-chat allowlist were verified. Complete metadata and content passes each
  normalized two messages using two total GETs, without printing raw content,
  reading attachment bytes, enabling fallback, activating a profile, or
  attempting a mutation. The earlier `230001` failures were fixed by encoding
  epoch query parameters as strings and omitting a null first-page token.
- Owner-only user-OAuth conformance receipt:
  `private/v2/m4i/flair-user-oauth-conformance-2026-09-05-r1.md`, SHA-256
  `56cc77e1e20db8d53c502b5558adcfe7ab4bc1d1ce45c39df60932002bf67e10`.
- Creator Networks browser feasibility now passes in the authenticated Creator
  Networks human-user session. One recent topic post, its complete zero-reply
  thread boundary, and one image attachment's metadata were normalized from an
  exact 24-hour window. No attachment bytes or mutation were read or performed.
- The inactive `read_conversation_messages` MCP candidate prepared that exact
  browser context and accepted the same live capture with target, Principal,
  tenant, structure, cursor, thread, and zero-mutation checks. Its Profile and
  runtime config remain `candidate`, and automatic fallback remains disabled.
- Owner-only Creator Networks browser/MCP feasibility receipt:
  `private/v2/m4i/creator-networks-browser-feasibility-2026-09-05-r1.md`,
  SHA-256
  `bf3fa5ba9fc264197a0a75107b5174e6ba327873a0ee44b13a2c7fec2b6976aa`.
- The Chat Provider now assigns acquisition-quality grade `A` to structured
  API results and grade `B` to authenticated rendered-browser results. The
  grade remains separate from complete/partial coverage and excludes source
  truth, attachment interpretation, and OCR. The existing live browser capture
  replays as grade `B`; the browser-only production Profile is active read-only.
- Owner-only quality verification:
  `private/v2/m4i/agency-intelligence-information-quality-verification-2026-09-05-r1.md`,
  SHA-256
  `112218b27b8f481b54f5ac5f43927042e6fead3c927e3ea1fcc257e359c637ea`.

### M4I browser production activation

- The exact reviewed Creator Networks browser-user Principal, one-chat Chat
  Profile, and Agency Intelligence runtime are active read-only. Candidate
  artifacts remain unchanged for rollback.
- The active runtime replayed the reviewed capture with complete coverage, one
  message, one completed thread boundary, one attachment metadata record, and
  Provider grade `B`.
- API routing, automatic fallback, unattended execution, attachment bytes,
  broad chat enumeration, chat creation, and every Chat mutation remain
  disabled.
- The active MCP configuration loads successfully through the production server
  factory. The complete repository suite passes.
- Owner-only activation receipt:
  `private/v2/m4i/creator-networks-browser-activation-2026-09-05-r1.json`,
  SHA-256
  `4af0022523600d1bf730167aa4d4a2a6ad924baaa2b92dab9d2389d98b053a23`.
- Owner-only active-runtime verification:
  `private/v2/m4i/agency-intelligence-mcp-active-verification-2026-09-05-r1.json`,
  SHA-256
  `d079819bda0ea0b11bf1f36aa208235153e8988d063d1fb0424bf40b7750cd8b`.
- `@flair-agency/lark-chat-provider@1.0.0` is published in the private
  `flair-agency/live-agency-provider-lark-chat` repository at commit
  `fc9a59ba8e79d598aa53def5e0672af04184868f`. Composition commit
  `94d0b3c9be8bb35ebde948ca1fbf4092af31916d` pins that exact gitlink. The
  browser-only M4I scope is complete.
- Owner-only completion receipt:
  `private/v2/m4i/m4i-completion-receipt-2026-09-05-r1.json`, SHA-256
  `5fd1f2bd7c6d176a41803ce8653d32858932e66d7f9aae732cde6336b94ef25a`.

### Earlier M4I Phase 3 bounded live attempt

- The owner supplied one exact chat for Creator Networks and one exact Flair
  test chat. Both are stored only in owner-only one-entry allowlists; no chat
  discovery or creation was performed.
- The isolated Flair candidate authenticated with the API app currently backing
  the active Base profiles. Its first exact message-list GET returned HTTP 400
  and Lark code `99991672`, which the official Lark CLI registry classifies as
  the required API scope not being enabled. This credential therefore cannot be
  treated as the owner-described Chat-enabled Flair app. A different exact
  credential reference, or a separately reviewed published-scope change, is
  required.
- Both recorded API attempts made one authentication request and one
  allowlisted GET, returned no message page, and made zero mutation attempts.
  The r2 failure receipt is owner-only and content-hashed.
- Before the later successful browser check, the native Lark app was unavailable
  to computer-use automation. The owner
  approved the initially detected browser origin for the exact target read; it
  opened in the Flair tenant context, where one exact-name target search returned
  no result. Selecting the second visible tenant redirected to a different
  protected origin, and access then failed closed because that distinct origin
  has not yet received exact approval. No Creator Networks message was read, no
  unrelated chat was selected, and no browser mutation occurred.
- The later owner-supplied Flair Chat Keychain item was visible in Keychain
  Access but hidden from restricted terminal execution, including when compared
  with a known-good existing item. An explicitly approved exact lookup outside
  the sandbox found it. The App ID was fingerprinted without disclosure, and no
  password, App ID, or secret was printed.
- The independent Flair Chat app authenticated. Its first exact allowlisted
  message-list GET returned Lark code `230002`, meaning the app bot is outside
  the target chat. The run stopped after one authentication request and one GET,
  with no returned page and zero mutations.
- A direct exact-chat AppLink on the initially approved browser origin returned
  HTTP 404 without exposing a chat list or message content. The later successful
  Creator Networks check supersedes only that browser blocker; the Flair Bot/API
  failures remain historical diagnostics.
- Owner-only live-attempt receipt:
  `private/v2/m4i/phase3-live-attempt-2026-09-05-r3.md`, SHA-256
  `c0e97221ca789867da30e1b6caa7b402d95e16f447eb2fe8ad1f4c5b669f7e8b`.

Bounded reverification succeeded at `2026-09-04T12:23:02.295Z` in 20
allowlisted requests. Authentication, all three table routes, all thirteen
field routes, all eight read-only MCP tools, audit binding, parent-field
metadata, and parent-graph checks passed. Counts were 1,370 Creator, 1,372
profile-observation, and 2,880 invitation-state rows; target selection returned
1,370 source rows. The content-bound receipt is owner-only. No private
identifier or fingerprint was added to Git, and no Lark mutation, write-profile
activation, or schedule switch occurred.

### Backup and recovery

- Distributed daily runners coordinate through verified shared-storage
  receipts; no central runner or filename lock is required.
- Shared destination readback, retention dry runs, record-capacity checks, and
  isolated disaster-recovery drill contracts are implemented.
- The 2026-09-04 drill restored and counted all tables and records:
  - Creator Scouting: 14 tables and 19,860 records.
  - Creator Management: 19 tables and 2,072 records.
- Test Bases were deleted after review and remain recoverable from Lark Trash
  for 30 days.
- Native `.base` import did not restore attachment blobs. Lark Provider commit
  `ed250b4` records this limitation. Attachment backup and restore remains a
  production gap; its synthetic contract is now implemented.
- The uncommitted backup-hardening checkpoint covers a private attachment
  manifest contract in `providers/lark-base`, attachment receipts and permission
  attestations in `providers/google-drive`, and public unattended-readiness and
  composite-drill contracts. These contracts do not activate production routes.
- The private `providers/lark-base/src/attachment-acquisition.js` adapter now
  performs exact bounded two-pass inventory, GET-only byte acquisition,
  content-addressed packaging with file metadata, complete package inspection
  and owner-only local persistence. It rejects incomplete pagination, source
  drift, ambiguous mappings, unreviewed origins, redirects, auth failures and
  exceeded byte/request/time budgets. It consumes a reviewed export-bound
  mapping; it neither derives that mapping from native bytes nor proves keys
  against a restored Base. The procedure is in
  `providers/lark-base/instructions/attachment-package.md`.
  The separate native-key preparation builders below now implement the offline
  derivation/reproduction mechanics; real provenance still requires review.
  M2U-1's inventory now includes this direct-fetch API/media route. Its M2U-4
  selected-actor transport migration remains a production gate; the offline
  restore planner adds no API caller and does not bypass that work.
- Version 2 of `skills/lark-base-backup-retention/scripts/retention_plan.mjs`
  now uses `composite_retention.mjs` to keep selected Base generations together
  with every bound attachment set and storage copy, preserve the last complete
  set, and validate retained drill receipts before protecting both sources.
  Missing members, unresolved objects, and incomplete coverage block deletion
  review. Plans remain non-authorizing and perform no storage operations.
- The offline `attachment-restore-plan.js` now resolves all reviewed keys
  one-to-one against a hash-pinned normalized isolated inventory and validates
  complete table/field mapping, field types, empty attachment cells, exact
  identity/provenance and exclusive snapshot expiry. Protected production
  tokens are denied even under another alias. The deterministic plan preserves
  file metadata and ordinals and authorizes no writes. Its normalized summary
  composes with `buildAttachmentRestoreReview` in the public drill Skill.
  Both the exact destination hash and attachment artifact hash are now included
  in composite preflights; regenerate older unbound synthetic preflights before
  using this route. See `providers/lark-base/instructions/attachment-restore-plan.md`.
- The new offline `attachment-key-evidence.js` prepares exact native-export
  mapping baselines and reproduces generation-scoped keys in an isolated native
  export with changed IDs. Rules explicitly select a supported native layout,
  exact text/text-run or safe-integer components, and reviewed field types.
  Missing/duplicate/changed keys, type drift, competing layouts, incomplete or
  stale collection evidence and nonempty attachment cells stop preparation.
  Source record IDs are not fallback keys, and no person identity is inferred.
  Generated `rk1:` keys require their rules/source evidence inside the verified
  attachment package, tied to its mapping, Base artifact and reviewed profile.
  The root composition recovers those packaged rules and reaches the public
  non-executing review. See
  `providers/lark-base/instructions/attachment-key-evidence.md`.
- The key-preparation suite passes 14/14, acquisition 15/15, restore planning
  12/12 and drill contracts 13/13. The cross-component backup suite passes 6/6,
  including exact native artifacts, packaged rule recovery, acquired bytes,
  synthetic storage receipts, isolated-key resolution, public review and
  rule/destination-swap rejection. The focused retention suite remains 22/22.
  Full `npm test` passes all 568 tests at this checkpoint: 186 public Skill,
  58 shared Lark, 10 Chat, 64 Base, 17 BackStage, 4 iPhone, 19 Web, 11 Drive,
  25 Expense, 101 MCP, 6 smoke and 67 root v2 contract tests; no skipped tests
  or missing SDK dependency. This includes concurrent M2U tests at that snapshot;
  it does not assert completion of that task's changing worktree. The existing
  `scripts/v2-contract-test.mjs` fixture now supplies the `liveContext` required
  by the parallel M4 LIVE-history contract. Public-content and whitespace
  checks pass. No public Skill was edited by this native-key package. At the
  earlier Skill checkpoint the Python validator lacked PyYAML; equivalent
  frontmatter, naming, description, and placeholder checks passed independently.
- Backup code, tests, Skill references, `docs/v2-backup-hardening-design.md`, and
  the migration progress entry remain uncommitted. Preserve the parallel M4
  and M2U changes when staging this checkpoint. No production data was accessed and no
  external write, deletion, activation, or schedule change was performed.
- The agreed backup design/synthetic task and this follow-on offline native-key
  preparation package are complete. Production attachment recovery is not
  complete. The next separate backup package requires private production
  rule/field selection and round-trip-stability review, real native-layout
  conformance, isolated-destination collection rules, and appropriately
  authorized live evidence after M2U's selected-actor
  route gates. Storage permission readback, an upload/readback executor with
  uncertain-write handling, an isolated live composite drill, unattended
  rehearsal, retention inventory integration and activation remain separate.
  This checkpoint grants no external-operation approvals; keep Bindings
  interactive and do not issue a live attachment-recoverability claim.

### M7-1 evidence inventory and gate gaps (local checkpoint, 2026-09-05)

This is an inventory of local checkpoint evidence, not a production-authority
record. Test results below are synthetic unless explicitly labelled live or
owner-only. Project artifacts remain reference evidence; credentials, current
production state, and any new authority require their applicable private
preflight and approval.

| Checkpoint/package | Completed evidence retained locally | Evidence type and cited result | Remaining gate / limit |
| --- | --- | --- | --- |
| M0/M1/M2L foundation | Reproducible composition, domain/authority separation, account-centered identity decision, separate read MCPs, immutable Lark profile contracts and active Scouting read profile. | Local component pins in Section 6; M3 read-profile reverification was live, bounded to 20 allowlisted requests with zero mutation. | M2L does not grant write authority or general User/Tenant support. Retain rollback profile and reverify after any profile revision. |
| M2U-1 and M2U-2a | Source/caller inventory, operation matrix, pure actor-selection contract, selected API transport and selected CLI authentication/refresh boundary. | Local synthetic focused inventory/selection snapshot: 86/86; M2U-2a focused selection/transport: 66/66. No live authorization, protected business access, mutation, activation, restart, or schedule change was used. | **M2U:** M2U-2b operation-family integration; M2U-3 Base/Chat conformance (including unresolved attachment append and Chat-thread support); M2U-4 all direct/indirect consumer migration, including gift and backup/recovery API phases; and M2U-5 per-profile live/preflight, authorized write/readback where applicable, restart/unattended evidence, pins and rollback. No in-scope caller may retain ambient/legacy Tenant selection at cutover. |
| M3 Scouting MCP | Eight read-only domain tools and account-evidence review; inactive reviewed Scouting activity-write process with intent/readback safeguards. | M3-3 live evidence is the active read-profile bounded 20-request verification, with zero Lark mutation. The write process has synthetic execution/MCP integration only. | **M3-3:** repeat the immutable-binding/bounded-read check after a later profile revision. **M3-4:** needs a distinct write credential reference, explicit activation approval, fresh authoritative export, zero-mutation preflight, then separately approved write/readback plus rollback evidence; keep it out of active configuration until then. |
| M4 wave 1 — invitation status | Comparator, isolated write route, equivalent r6 production dual run, exact reviewed r6 apply/readback, approved scheduled route, and v1 rollback. | Live/owner-only: r6 comparison was equivalent across five dimensions; r11 applied one state row and one avatar with readback/no retry; two repaired v2 scheduled cycles completed 2/2 with expected `interaction_required` and zero external mutation. | **M4 production dual-run/cutover:** wave 1 is individually complete; retain v1 rollback. Its evidence neither completes M2U nor authorizes other Skill routes. |
| M4 wave 2 — profile history | Source-neutral adapter/comparator, isolated write implementation and candidate builder; exact 20-row v1/v2 production comparison. | Synthetic regression/contract suite is complete locally. Live/owner-only comparison is `equivalent`: 11 creates, 0 attachments, 9 unavailable, 0 conflicts/target issues. | **M4 production dual-run/cutover:** eight browser-blocked rows must be reacquired before coverage is complete. A distinct dedicated API-app Keychain reference is required before candidate output/preflight; then activation, approved write/readback, scheduled-route approval, two successful v2 cycles, and v1 rollback retention remain separate gates. |
| M4 wave 3 — LIVE history | Context-bearing adapter, MCP envelope and five-dimension comparator preserve reviewed cutoff/known-session anchors. | Local synthetic focused suite: 26/26; composed in-memory MCP suite: 5/5; no production LIVE acquisition, write activation, runtime restart, or schedule switch. | **M4 production dual-run/cutover:** prove running MCP envelope support; obtain one reviewed target export; run authorized v1/v2 acquisition and destination dry runs with the same context; resolve unavailable coverage; then separately review LIVE/metric write route, activate it, approve the schedule, complete two v2 cycles, and retain v1 rollback. |
| Backup/attachment hardening | Attachment acquisition, native-key preparation, restore-plan, composite preflight/review and retention contracts. | Local synthetic results: key preparation 14/14, acquisition 15/15, restore planning 12/12, drill 13/13, composite 6/6, retention 22/22; the recorded full snapshot was 568/568 and did not assert production completion. | Live mapping provenance, selected-actor transport migration, storage permission attestation, upload/readback with uncertain-write handling, attachment-capable isolated composite restore, unattended rehearsal, retention integration and activation remain open. |
| M4I browser read (scope-dependent) | Independent Chat Provider and one-chat browser-only intelligence route. | Owner-only completion receipt: Provider 10/10 and M4I 32/32; active read-only browser route, zero Lark mutations. | API-user route remains pending app review and same-user/protected-scope proof. This is cutover-required only if that intelligence capability is included in the approved production scope. |
| M5 Management migration | No completed Management workflow migration is claimed. | Existing Management export/drill evidence is data-protection/reference evidence, not a Management Skill dual run. | **M5-3:** first migrate/read-write workflow as applicable, then run one fixed-period/export v1/v2 dual run and explain differences. **M5-4:** separately approve a route, collect scheduled-cycle evidence, decide cutover/rollback, and retain v1 until the required two successful v2 cycles. |
| M6 membership transition/actions | No account-transition or privileged-action live gate is complete. | No synthetic M6 state-machine/partial-outcome result is treated as live evidence. | **M6-4:** after M6-1/2/3 and distinct authority approvals, perform one explicitly reviewed live transition/action with exact source/destination references, readback, rollback evidence, and no blind retry. |

The final cutover remains blocked until: M2U is complete for every included
Provider and consumer; every scheduled creator-domain Skill completes its own
dual-run and operational rollback gate; a recursive clean clone passes the
full suite; launch/credential/authority/audit/drift/resume/rollback procedures
are documented; the composition package and final domain MCPs are `2.0.0`; and
v1 schedules are disabled only after their verified v2 replacements. The local
full-suite totals in this handoff are checkpoint-specific working-tree
snapshots (not interchangeable clean-clone proof).

## 4. Next work package

The accepted next sequence is **checkpoint the current package → IA-0 → IA-1
→ IA-2 → resume v2 implementation**. During planning the coordinator reported
M2U-4d complete and M2U-4e started; this is not independent verification of
those implementations. At IA-0, reconcile the latest package result, tests,
and dirty diff before selecting the post-audit implementation package. Do not
restart M2U-2b solely because an earlier checkpoint below names it. Do not
interrupt current work, change its model, or alter production schedules.

The [instruction audit plan](instruction-audit-and-simplification-plan.md)
records the approved scope and exit criteria. IA-3 is per stable workflow;
IA-4 is incorporated into M7-2 preparation. Naming, relocation, and unrelated
feature work remain separately scoped.

### Earlier M2U-2b checkpoint and retained technical conditions

The following is retained evidence and technical context, not a current queue
instruction. Its then-next package was **M2U-2b: one Provider operation-family
integration around the selected transport**. The [partial transport checkpoint](../../runtime/docs/archive/v2-m2u-transport-checkpoint.md) implements the selected-token HTTP layer, Tenant lease acquisition and M2U-2a's selected API-user CLI authentication/runtime proof. An authentication-rejected read now invalidates cached proof and re-verifies the exact configured app, User, organization and scopes before one retry; actor substitution stops before a second business request. Revoked or interaction-required grants stop before business access, and writes are still never retried. The focused selection/transport suite passes 66/66; no live authorization, protected access or production mutation was used. Resume with one exact Provider operation family and its resource/query/body validator and bounded pagination/process aggregation. Do not redo M2U-1 or M2U-2a. M2U-2 as a whole is not complete, and M2U-3 through M2U-5 remain pending.

Definition of done:

1. Build a transport from the explicit selection; verify runtime organization, app, exact User where applicable, scopes and the selected authorization before protected access. Missing verification stops without a legacy fallback.
2. Support operation-scoped semantic reads (including reviewed POST searches) and a separate write-authority path. Do not widen the current M4I GET-only transport into an arbitrary CLI interface.
3. Acquire and refresh only the selected actor; interactive login is never started by a scheduled request. Bind the actual token/session used for the operation to verified identity, rather than trusting a disconnected earlier CLI status check.
4. Preserve bounded read retries, deny actor substitution and never replay uncertain writes. Handle the JSON/multipart/bytes requirements through verified driver capabilities, with safe errors and no token/signed-URL leakage.
5. Test wrong app/user/org, expiry/revocation, same-actor refresh, scope/ACL distinctions, semantic POST reads, read-only mutation denial and uncertain write reconciliation. Hand off the bounded interface to M2U-3.

The Provider operation matrix marks Base v3 attachment append and the old dedicated Chat thread path unverified, and the fetched generic Chat history specification advertises Tenant only. Resolve these gaps or use proved documented equivalents before new-route activation; existing isolated User conformance is not general API support. M2U-4 must include the newly added direct-fetch attachment acquisition adapter. The source inventory and deployed-entry classification do not prove runtime migration or live conformance.

### Existing gated W2 work

**M4 wave 2 profile-history write-profile candidate and zero-mutation
rehearsal** remains prepared and gated as follows. It must stop before activation
and make zero destination mutations. Selecting User is not an automatic waiver
of the dedicated-app or shared-Principal isolation rules.

Definition of done:

1. Reconcile the active Creator Scouting read bundle against the fresh
   authoritative export and the exact profile-history tables, fields, due view,
   and allowed API routes. Treat the project copy as reference evidence, not as
   a current authoritative source.
2. Generate one owner-only `candidate` profile and one separate candidate
   Principal for only the profile-history route. If the existing isolation rule
   permits the exact active read API app on the same Base, prove that binding by
   fingerprint without persisting or disclosing the Secret; otherwise stop.
3. Prove candidate file ownership and mode, fail-closed startup while still
   `candidate`, and a memory-only active-contract simulation. Do not modify the
   active owner-only bundle.
4. Reuse the exact 20-row observations and dry-run result from the equivalent
   comparison to prepare a content-bound profile-history write intent, then run
   a transport-enforced read-only preflight against the live destination.
5. Record the exact intent hash, create/update/attachment/already-applied
   counts, bounded request budget, and zero mutation requests in an owner-only
   receipt. Stop before profile activation, intent execution, schedule switch,
   or version 1 retirement.

Activation requires a separate explicit owner decision. Any later execution
requires a fresh unexpired intent plus explicit confirmation of its exact hash
and all mutation counts. A schedule switch remains a still-later gate and must
retain version 1 rollback until two successful scheduled version 2 cycles.

The candidate builder and its synthetic fail-closed suite are now implemented.
The first production candidate attempt stopped before output or authentication:
the active read credential is already shared by the read Principal and the
active invitation-history write Principal, while the profile-history isolation
contract permits at most one other Principal to share a credential. The legacy
profile configuration points to that same credential. Do not create an alias
for the same API app or weaken the isolation contract. Resumption requires the
exact Keychain credential reference for a distinct dedicated profile-history
API app; the builder will fingerprint it without persisting or disclosing the
Secret. No candidate file was created.

### Parallel Wave 3 handoff

The `creator-live-history-sync` migration-only adapter and comparison CLI are
ready for synthetic use. Coverage is checked from actual observations as well
as the reviewed manifest; shared missing rows, unexpected accounts, wrong
record/account associations, and blocked dry runs cannot yield `equivalent`.
Explicit unavailable rows remain visible and do not prove successful acquisition.

The MCP LIVE target row now requires `liveContext.cutoffAt` and
`liveContext.knownEvents` (exact start/end anchors). Both observe and validation
responses preserve them and bind them to the row hash. The common profile and
invitation envelope is unchanged. Do not strip this context, invent empty
anchors, or pass generic selection output directly into LIVE acquisition.

Next production steps remain separate: verify the selected running MCP supports
this envelope, obtain one reviewed Skill target export, run both authorized
acquisition paths with the same context, and compare their destination dry
runs without applying either. Runtime activation/restart was not part of the
synthetic work. Resolve any unavailable coverage before treating production
readiness as complete. LIVE/metric domain write semantics and route activation,
scheduled-route approval, and two successful scheduled cycles with v1 rollback
retained are still pending. Do not infer those authorities from a passing report.

Focused checks are the public `test/live-history-v2-dual-run.test.mjs`, composed
`scripts/v2-live-history-dual-run.test.mjs`, and the Skill's `quick_validate.py`
validation. The composed tests use synthetic providers and in-memory MCP
transport only; they exercise both module and instruction acquisition paths,
context/hash failures, validation, dry-run planning, and final comparison.

### Other gated work

The separate **M3 private Scouting write-profile review and activation** remains
gated. Do not begin it until the user supplies a distinct write credential
reference and explicitly approves activation of
`flair-creator-scouting-write`. At that point, build the owner-only profile from
a fresh authoritative export, prove its immutable Creator, assignment,
activity, field and action-option bindings, verify the dedicated API Principal,
and run a bounded dry-run/preflight with zero production mutations before
requesting any operation-specific approval. Until that gate is opened, the
implemented write process must remain absent from active MCP configuration.

Creator Networks Chat acquisition remains the read-only M4I workstream and
never uses Flair credentials or accounts in production. The Phase 3 execution
harness is ready. A Flair test app may exercise only the isolated user-OAuth
conformance candidate and one dedicated test chat; it never enters the Creator
Networks production profile or fallback chain. The owner cannot add a Bot to
the Creator Networks target and expects an addition request would likely be
rejected, so no Bot-addition request or tenant-token route is part of M4I. The
browser route can be selected explicitly while Creator Networks user scopes are
under review; after approval, the same human's user-OAuth API is the planned
primary and the browser can become a grade-`B` fallback after same-user and
protected-scope continuity is proven. Payload equality is not required. The
exact browser feasibility read, MCP candidate, reviewed production activation,
and active-runtime replay now pass. The browser identity fingerprint is not an
official Lark `open_id` and cannot establish API/browser equivalence by itself;
the API route remains absent until app approval and independent same-user
verification.

Do not implement new candidate registration, username or alias mutation,
automatic parent mutation, person matching, account merge/split, or an
account-level membership transition without its own reviewed contract and
approval.

## 5. Open blockers and decisions

These require user approval, external configuration, or further domain design:

- M2U has an accepted design but no completed all-Provider User/Tenant
  implementation or rollout. The inventory/selection contract is implemented; remaining local
  work can proceed independently of production app review and W2 credentials after the Section 4 audit checkpoint. Later live actor
  changes require fresh preflight and a valid actor-bound execution authority;
  neither generic support nor equal target hashes proves access or approval.
- M4 wave 1 restart and scheduled-cycle verification are complete at 2/2; they
  are no longer an open blocker. Keep the v1 rollback artifacts retained.
- M4 wave 2 comparison is complete and equivalent for the exact reviewed
  20-row input. Eight rows remain explicitly browser-blocked because the
  admin-enforced browser policy became unavailable. A later fresh browser-tab
  reconnect still failed the same policy check and was not retried or bypassed.
  Rerun those rows before treating acquisition coverage as complete or
  approving a schedule switch.
- The profile-history write route is implemented but still has no reviewed
  production candidate, active profile, active MCP configuration, or schedule.
  Candidate tooling is ready, but the active read credential is already shared
  by another write Principal and cannot be reused a third time. Supply an exact
  Keychain reference for a distinct dedicated API app to resume the zero-
  mutation candidate rehearsal. Activation and later intent execution remain
  separate owner approvals.
- The production Organization and API-app Principal remain only in the
  owner-only private bundle. They must not be copied into checked-in config or
  reused as evidence of write authority.
- Creator Networks Chat browser-session organization, derived human-user
  fingerprint, exact target, one bounded message scope, loading completeness,
  thread boundary, and safe read-only interaction are verified. Effective
  source-history retention remains unproven. The owner reports that they cannot
  add the Bot to the exact chat and expects an addition request would likely be
  rejected. Do not request or attempt that membership change; Bot/tenant-token
  routing is excluded. The browser-only production Profile and runtime are now
  active read-only. After app approval, the user-OAuth API
  must independently prove its exact app, official user ID, scope, and chat
  visibility; equivalence remains disabled until a same-user differential
  passes.
- Exact one-chat allowlists exist for the isolated Flair test and Creator
  Networks routes. Flair user-OAuth conformance is complete; the previous bot-
  outside-chat result is historical and no Bot addition is required. The
  Creator Networks browser runner, active Profile, and active MCP runtime pass;
  the independent private Provider remote and composition submodule are also
  complete.
- Verify the lifecycle and semantics of TikTok User ID and BackStage Creator ID,
  or continue treating their stability as unknown.
- Verify the authoritative multi-account invitation policy before automating a
  policy conclusion, and design any parent-relation write separately.
- Implement the real private attachment acquisition/package and restore-mapping
  adapters, then connect complete production inventory to the version 2
  retention planner. The manifest, receipt, drill, and retention synthetic
  contracts are complete; live attachment recoverability is not yet proven.
- Prove one end-to-end unattended backup run and finish shared-storage
  permission hardening.
- The larger restored Scouting Base returned a Lark request error on re-export;
  table counts and UI structure were verified, but a second artifact hash was
  not obtained.

These blockers do not invalidate the completed contracts, synthetic write
integration, fresh export reconciliation, active read profile, or separately
activated invitation-history write profile or the separately verified r6
operation. Neither the profile activation nor that one operation authorizes a
schedule switch.

## 6. Repository safety and verification

The local v2 checkpoint is split across exact component commits and pinned by
the composition root:

- composition root: `3e57155`;
- Creator Scouting/Management MCP: `ec448f4`;
- Lark Base Provider: `996cf55`;
- public Skills migration and frozen expense prototype record: `3a48dc4`;
- BackStage Provider avatar fix: `9ad23b6`; and
- independent Lark Chat Provider: `fc9a59b`.

These commits are local checkpoints only until their component branches and the
composition branch are reviewed and pushed. Do not claim that a remote clean
clone can resolve the new component commits before that publication step.

The full root suite passed on 2026-09-05 after the checkpoint was staged. Key
counts are 134 public Skill tests, 9 shared Lark-core tests, 10 Lark Chat tests,
19 Lark Base tests, 101 MCP tests, 6 composed-runtime smoke tests, and 48 root v2
contract tests. Both cached and working-tree whitespace checks pass.

The previously separate Money Forward and weekly-expense work is recorded by
the later local root checkpoint `6e03088`; the weekly application prototype is
still frozen by the owner decision above and remains outside this migration's
activation and scheduling scope.

### Wave 3 component checkpoint and verification

The Wave 3 checkpoint supersedes only the earlier public Skills and MCP pins:

- public Skills: `e78ec0962184fee2b07ea85b3f24545438f232d4`;
- Creator Scouting/Management MCP: `8c5d1dc27dc8fb5ae8250735e3d9cfdb1af0a133`.

The focused LIVE dual-run suite passes 26/26, and its composed in-memory MCP
suite passes 5/5. The full shared-working-tree `npm test` passes 468/468,
including parallel uncommitted backup changes; that total is not a claim that
the backup checkpoint is committed. The official Skill `quick_validate.py`
passes using a locally cached PyYAML wheel without a global installation.
Whitespace checks pass. Component commits and composition pins are local only;
no remote push or active-runtime/configuration change was performed.

## 7. References to open only when needed

- Migration milestones and exit criteria: `../docs/v2-migration-plan.md`
- Approved IA sequence and release coverage: `../docs/instruction-audit-and-simplification-plan.md`
- M4 wave 1 scheduled cutover scope and success gate:
  `docs/v2-m4-wave1-scheduled-cutover.md`
- Domain/MCP roadmap: `../docs/live-agency-mcp-roadmap.md`
- Domain knowledge: `../docs/live-agency-domain-knowledge.md`
- Accepted identity and multi-account decision: `docs/v2-identity-model-decision-gate.md`
- Current Lark mapping: `docs/v2-m2-lark-data-model-plan.md`
- Capability ownership: `docs/v2-capability-inventory.md`


# Archived task execution instructions

# LIVE Agency Runtime v2: Task Execution Instructions

## Purpose

Continue the v2 migration in independently verifiable work packages while
keeping each task's active context small. Preserve the version 1 production
line, repository state, accepted domain decisions, approval boundaries, and
rollback capability throughout the migration.

## Start each task this way

1. Read `AGENTS.md` and `../docs/v2-task-handoff.md` first.
2. Do not load prior chat history, old Base exports, or full historical test
   logs by default.
3. State the one work package this task will complete and its definition of
   done before editing.
4. Open only the relevant section of `../docs/v2-migration-plan.md` and only the
   linked design documents required for that work package.
5. Inspect the working tree and relevant submodules. Preserve all unrelated or
   user-owned changes; do not clean, reset, stage, or commit them.

## Task boundary

Use one independently testable work package per task. Do not keep an entire
long-running milestone in one task merely because it has one milestone number.
End the task when its result can be verified, recorded, and handed off without
depending on the prior conversation.

A suitable task boundary has all of the following:

- one explicit objective;
- a bounded set of repositories and files;
- applicable approval and authority constraints identified up front;
- focused tests or another concrete verification method;
- a clear rollback or no-mutation statement; and
- a concise next-step handoff.

## Current recommended work packages

Proceed in this order unless the user changes priority:

1. **M2/M3 read activation and bounded live verification — completed 2026-09-04**
   - `flair-creator-scouting-read` is active under the explicit approval and
     authority-specific keychain reference recorded in the private profile.
   - Fresh export reconciliation and final live routing/count verification
     passed without storing a Secret or mutating Lark.
   - Keep the profile read-only and rerun the same gates before revising its
     immutable schema or resource bindings.

2. **M2L Lark provider and profile refactor — implementation completed 2026-09-04**
   - Define versioned Organization, API-app/api-user/browser-user Principal, tenant-
     capability, and service-discriminated Instance Profile contracts.
   - Extract shared authentication and principal verification without moving
     Base, Chat, or Docs surface knowledge into the common library.
   - The existing Base Provider now uses the shared core and keeps its legacy
     active-read compatibility adapter.
   - Require explicit route equivalence and fail closed across organizations,
     services, resources, authorities, principals, and visible data scopes.
   - Do not activate a new write or Creator Networks Chat profile in this work
     package.

3. **M2L private active-profile migration and bounded read reverification — completed 2026-09-04**
   - The owner-only `lark-profiles/v2` bundle preserves the existing active
     `flair-creator-scouting-read` profile's immutable resources, schema,
     operations, credential reference, and read authority.
   - Organization, API-app Principal/App ID fingerprint, split capabilities,
     and one API primary route with no fallback resolve through the new gates.
   - After the additive parent-field refresh, bounded live counts, all thirteen
     field routes, all eight read-only tools, parent-graph checks, and audit-
     profile binding passed in 20 allowlisted requests. No write or Chat profile
     was activated.

4. **M2U all-Lark OpenAPI User/Tenant selection — M2U-1 implemented 2026-09-05; transport and rollout pending**
   - Follow the [selection design](../../packages/lark-core/docs/principal-selection.md).
     M2U-1 inventory/profile contract and rejection tests are implemented; see
     [the checkpoint](../../runtime/docs/archive/v2-m2u-inventory-and-contract.md). M2U-2 shared transport
     is next; Provider conformance, consumer migration and per-profile rollout
     evidence remain M2U-3 through M2U-5.
   - Include every direct/indirect Lark API consumer, especially the shared
     Skill adapter, gift projections, backup/recovery and scheduled runners.
   - Canonical selection is `api-app` for Tenant or `api-user` for User, through
     an explicitly selected Instance Profile route. Reject unsupported
     operation/mode combinations and ambient/default identity selection.
   - Preserve active M4I's Tenant and mutation exclusions. General Provider
     support does not activate a new instance, grant, operation or schedule.
   - Keep W2's dedicated-app and coverage gates and the other prepared work
     below. Affected cutovers require the relevant M2U evidence; complete
     in-scope coverage is mandatory for M7.

5. **M3 reviewed Scouting-write implementation — synthetic work completed 2026-09-04**
   - The separately launched three-tool process prepares activity-history and
     next-action intents for existing records only, runs exact preflight, and
     executes only an unexpired content-bound approval.
   - Synthetic tests prove immutable binding injection, approval binding,
     verified no-op replay, partial-application blocking, uncertain-result
     reconciliation without retry, and post-write readback.
   - Keep the process inactive until a distinct write credential reference and
     explicit `flair-creator-scouting-write` activation approval are supplied.
     A future activation task must start from a fresh authoritative export and
     perform a bounded zero-mutation dry-run first.
   - Do not add candidate registration, person matching, username or alias
     mutation, automatic parent mutation, account merge or split, or membership
     transition.

6. **M4 Skill dual runs**
   - Wave 1 synthetic preparation for `creator-invitation-status-sync` was
     completed on 2026-09-04. Its comparator checks the five required
     dimensions against one exact reviewed manifest and cannot authorize a
     write or scheduled-route switch.
   - One reviewed one-row production attempt resolved identical v1/v2 private
     acquisition routes and instructions. It first failed closed because the
     browser could not verify its admin-enforced policy. After an application
     restart, the same approved target reached one exact BackStage result row,
     but its displayed avatar had zero exact matches in `pageAssets`. The `r2`
     owner-only report has matching stop reasons and all five dimensions match,
     but it is still a stopped run with no destination dry-run plans.
   - Diagnosis confirmed that the exact row images were fully rendered signed
     WebP assets while the inventory exposed no matching WebP. Private
     BackStage Provider 1.2.2 fixes the unsupported acquisition assumption:
     prefer the exact page-asset route, then use its bounded exact-`currentSrc`
     helper only for the verified row image. The helper accepts only HTTPS
     TikTok CDN sources without redirects or credentials, retains no signed
     URL, and validates owner-only image bytes. An unavailable transfer no
     longer discards the eligibility result; avatar identity ambiguity still
     fails closed.
   - A second, explicitly different due Creator was selected at the user's
     direction and produced the same zero-match avatar stop. Treat this as a
     acquisition-path blocker, not a Creator-specific result. Do not cycle
     through additional Creators as a workaround.
   - A third Creator explicitly named by the user was resolved one-to-one in
     `selected` mode. It returned one valid BackStage eligibility row but the
     same zero-match avatar stop. The owner-only `r4` comparison matches all five
     dimensions and remains a stopped, non-cutover run.
   - Resume with that same selected manifest after confirming both paths resolve
     knowledge version `backstage-invitation-eligibility/2026-09-04.1`. Do not
     widen the scope, retain or print the signed source, substitute a screenshot,
     apply a plan, or treat the historical matching stop reasons as a successful
     dual run.
   - A separate `r5` live verification completed the route and acquisition
     check: both paths resolve Provider 1.2.2, the exact row avatar was saved as
     a verified owner-only WebP, and the normalized observation validated
     through both paths.
   - The owner-only `r6` production dual run then reused that exact manifest and
     observation, produced both destination dry-run plans, and passed all five
     comparison dimensions with `equivalent` status. Both paths propose one
     create and one avatar attachment with no timestamp update. This completes
     the wave 1 dual-run gate, but does not authorize apply or route switching.
   - The separate invitation-history write MCP is now implemented and
     synthetically verified. It remains absent from active configuration and
     requires its own `flair-creator-scouting-invitation-history-write` profile,
     dedicated API Principal and reviewed credential binding. For this route
     only, that Principal may reuse the credential of exactly one active
     Creator Scouting read Principal when the API app and Base both match;
     profile, process, authority, operation allowlist, and audit identity remain
     separate. Do not activate it, apply `r6`, or
     switch the schedule without the corresponding separate approvals. Before
     any operation approval, use a fresh authoritative export to prove its
     immutable Creator, invitation-state, due-view, field, state-option, and
     attachment bindings and complete a zero-mutation dry run.
   - The owner-only invitation-history write candidate has now been built from
     the active read bundle, the 2026-09-04 reconciled native export, and the
     reviewed private invitation binding. Its shared keychain App ID fingerprint
     matches, while the write Principal remains separate. The profile and
     Principal are both `candidate`; startup was confirmed to stop before
     authentication, and an in-memory promotion simulation passed without
     persisting active state.
   - A transport-bounded production dry run using the exact existing `0310k.i`
     r6 target and observation also passed. It reproduced create 1, timestamp
     update 0, avatar attach 1, already-applied 0; the immediate exact preflight
     remained `ready`. All 30 requests were authentication or allowlisted reads,
     with no Lark mutation and no persisted active state. The owner-only r8
     receipt has SHA-256
     `51a93d46f530326ef72c4f6c220587399c002b54d1ad1e1ebe9e222ce818b3f6`.
   - M2 later reported a read-only verified Creator-table schema change made
     after that candidate's export reconciliation. The candidate and r8 remain
     valid historical evidence but are superseded for activation. The owner-
     only supersession receipt has SHA-256
     `80a06b8499d0f4542e14f299c58c563306fb7ba445965fa5f0f1097ac124691f`.
   - M2 has now acquired the fresh authoritative Creator Scouting export,
     verified the exact one-field `親レコード` addition, completed the private
     `r2` reconciliation, refreshed the active read bundle with rollback, and
     passed a bounded live read.
   - M4 regenerated the owner-only candidate from that checkpoint. The new
     candidate SHA-256 is
     `5ed47f04df5d528faf69cad2cf371ad9601f99e790cb67fbab1942b6e5f19074`;
     it remains `candidate`, and startup still stops before authentication.
     The repeated production read-only dry run passed with create 1, timestamp
     update 0, avatar attach 1, already-applied 0, an immediate `ready`
     preflight, and zero mutation requests. Its r9 receipt SHA-256 is
     `679d51fb4de15003273d41dbee0395faa76c918a9860e55a6e0da309bae24fe5`.
     The next gate is explicit activation approval for
     `flair-creator-scouting-invitation-history-write`; this result does not
     authorize activation, the reviewed `r6` apply, or a schedule switch.
   - The user then explicitly approved activation only. The write profile and
     its separate Principal are now `active` in the owner-only bundle; the
     prior bundle is retained as an owner-only rollback. The post-activation
     bundle SHA-256 is
     `29c3af1193d71fc5cfb426e8eaf0ad125658dc73e6354d922323cfda83968e5a`.
     The isolated write process accepted the profile at startup, but no tool was
     called, no Lark mutation occurred, and no schedule switch occurred. The
     next gate is explicit authorization of the exact reviewed r6 apply hash
     and counts.
   - The first dry run from the persisted active profile also passed. Its r10
     owner-only receipt has SHA-256
     `c5c45c33d22883d6b6e2d75b5b4bfbbeffc41762f6c7ae83a9bc35694467cf89`.
     The unexpired intent SHA-256 is
     `60b74e382b2fb4ed91de8b9c872599261c9f10f680aa5786baa7db5433ed272e`
     with create 1, timestamp update 0, avatar attach 1, already-applied 0.
     It expired at `2026-09-04T13:16:51.048Z`. The user confirmed that exact
     hash and all four counts before expiry. The isolated r11 execution then
     completed once with create 1, timestamp update 0, avatar attach 1, and
     already-applied 0. Bounded readback verified both intended mutations with
     no discrepancy, uncertain-write recovery, or retry. Its owner-only receipt
     SHA-256 is
     `46eae5b96384f59bfa90882c555043905b0a205c1bcf0157c8b1f82a91cf6982`.
     This operation did not authorize the scheduled-route switch.
   - The user later approved the scheduled-route switch separately. The v2
     Creator Scouting read and isolated invitation-history processes are now in
     Codex configuration, and the daily heartbeat, moved by explicit owner
     request on 2026-09-05 from 03:00 to 01:40 Asia/Tokyo,
     keeps its destination and active state while using the version 2 read-only
     route. Both processes passed keychain-backed startup checks without a tool
     call or Lark mutation. The first restart loaded both surfaces, but the first
     read-only selection exposed a caller-time/source-read-time race and stopped
     without external mutation. Creator Scouting `0.4.1` fixes current selection
     by anchoring omitted `asOf` to the exact source-read snapshot; the heartbeat
     now omits `asOf`, and all tests pass. The second restart and live read-only
     rehearsal succeeded through the expected `interaction_required` boundary
     with zero external mutation. Require two successful scheduled version 2
     cycles before declaring wave 1 complete; as a manual run the rehearsal does
     not count. The first 01:40 scheduled cycle later stopped on a Lark HTTP 400
     read with zero external mutation. The shared Lark transport repair now
     honors token expiry, retries only one rejected read after reauthentication,
     and never retries a write. A fresh-process live read passed, and the later
     desktop restart verified the active process. The owner moved the repair
     test to 04:30 with monitoring at 04:45. The first repaired scheduled cycle
     returned `interaction_required` with zero external mutation. The second
     repaired scheduled cycle ran at 05:15 with the same expected result and
     zero external mutation. The count is 2/2 and M4 wave 1 is complete. The
     operational heartbeat remains active daily at 05:15; the completion
     monitor is no longer required.
   - Use a separate task for each Skill, in this order:
     1. `creator-invitation-status-sync`
     2. `creator-profile-sync`
     3. `creator-live-history-sync`
     4. `creator-insight-sync`
   - For each Skill, compare the version 1 and version 2 paths over the same
     reviewed target manifest.
   - Compare coverage, normalized values, proposed mutations, unavailable
     values, and stop reasons.
   - Do not switch a scheduled route without explicit approval. Retain the
     version 1 rollback route until two successful scheduled version 2 cycles
     have completed.

7. **Later milestones**
   - Treat the read-only M4I Creator Networks Chat intelligence workstream and
     M5, M6, and M7 as separate task series.
   - M4I uses only Creator Networks API-user/browser-user Principals bound to the
     same human, excludes Bot/tenant-token routing, and keeps API and browser
     routes separate until exact chat/message visibility equivalence is proven.
   - The identity gate is closed. Do not begin the account-level membership
     transition or privileged actions until their prerequisite Scouting
     contracts, exact account references, write intents, and approvals exist.

## Decisions that every task must preserve

- `origin/main` remains the authoritative version 1 operational line until the
  applicable version 2 exit and dual-run criteria are satisfied.
- Do not add or backfill a shared Flair `creatorId`.
- Do not infer person identity, candidacy, membership, or permanent account
  identity from a legacy row, username, nickname, avatar, TikTok User ID,
  BackStage ID, parent relation, or a cross-Base match.
- Keep Creator Scouting and Creator Management authority, credentials,
  destinations, and audit identities separate.
- Keep read-only acquisition separate from Lark mutation and relationship-
  changing BackStage actions.
- Continue to fail closed on missing, ambiguous, cross-tenant, or
  cross-authority resolution.
- Every Lark OpenAPI Provider and indirect consumer follows M2U's explicit
  User/Tenant profile selection. Never infer actor choice from the App ID,
  available token, CLI default or driver, and never fall back between actors.
  Changing actor requires fresh preflight and an execution binding that remains
  within existing authorization; equal data hashes alone do not carry authority.
- Keep estimated coin consumption separate from accounting expenditure.
- Do not disable version 1 operations merely because a version 2 component or
  synthetic test passes.

## Verification discipline

- Run the narrowest relevant component tests during implementation.
- Run the full root test suite before a broader integration checkpoint,
  submodule-pin update, release decision, or cutover decision.
- Record concise results and failing test names; do not place complete
  successful test logs into the task context.
- For any production-facing read, write, activation, schedule switch, or
  destructive maintenance step, enforce the approvals, reviewed snapshots,
  intent hashes, readbacks, and rollback gates defined by the applicable plan
  and Skill.

## Close each task this way

Before ending a task, update `../docs/v2-task-handoff.md` so the next task can
resume without this conversation. Keep the handoff concise and replace stale
state rather than appending a transcript.

Record only:

- the completed objective and exit criteria;
- the repositories and files materially changed;
- the latest relevant commit or uncommitted checkpoint;
- focused and full-suite test results, as applicable;
- approvals used or still required;
- unresolved blockers and risks; and
- the next single recommended work package.

Do not copy detailed implementation discussion, rejected approaches, complete
logs, credentials, production records, or old exports into the handoff.

## Reusable new-task instruction

> Continue the LIVE Agency Runtime v2 migration from
> `../docs/v2-task-handoff.md`. Follow
> `../docs/v2-task-execution-instructions.md`. Work only on the next bounded work
> package stated in the handoff, preserve unrelated working-tree changes, and
> open additional design documents only when that work package requires them.
> Verify the result at the appropriate scope and update the concise handoff
> before finishing.
