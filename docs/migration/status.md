# Current migration and documentation status

# Avatar and typed-readback release preparation — 2026-09-12

The accepted TikTok Web PR #3 and Lark Base PR #18 corrections are prepared for
one grouped release/adoption review. The candidate selects TikTok Web 1.1.1,
Lark Base 1.4.0-m3.4, platform 0.1.0-m3.3 and catalog 0.1.0-m3.4. Runtime,
Profile, Transport, CLI and the selected service configuration remain unchanged.
Actual archives, the installed Runtime's installation plan, proposed host files
and immediate recovery evidence are ready. The
[Japanese review](../reviews/profile-avatar-readback-adoption-ja.md) defines the
proposed private publication, new installation and selected Work acquisition,
read and image-bearing plan. No publication, installation, host switch or service
operation has occurred in this preparation. Issues #61, avatar #1 and cutover #32
remain open through their actual acceptance requirements. The current recovery
baseline is the write-diagnostic generation checked in this review; earlier
checkpoints below do not select the next action or recovery target.

# Recorded write-diagnostic adoption and read verification — 2026-09-11

This section records the installation and read/plan verification at this checkpoint.
It does not supersede subsequent write reconciliation and acceptance outcomes in
[issue #61](https://github.com/flair-agency/live-agency/issues/61) and
[cutover #32](https://github.com/flair-agency/live-agency/issues/32), or select a current recovery target.

The owner approved and merged root PR #63, Transport #8, Lark Base Provider #17 and Profile #9. Fixed packages were privately published and verified against the reviewed archive integrities. Catalog 0.1.0-m3.3 was published from the approved source and downloaded for hash verification. See the [adopted release decision](../development/profile-write-diagnostic-adoption.md) and retained private deployment evidence.

The selected Work installation at this checkpoint used Runtime 2.0.0-m3.0, Profile 2.0.0-m3.3, Lark Base Provider 1.4.0-m3.3, Transport 1.1.3, CLI 1.0.93, TikTok platform 0.1.0-m3.2 and catalog 0.1.0-m3.3. Installed archive identities and integrity, the fixed native CLI checksum, the three changed host files and Skill registration were verified. The selected actor, resources, authority and configuration hashes were preserved. The old authentication-diagnostic installation and the newly generated registration receipt provide immediate rollback; restore preview succeeded without executing a restore.

The actual Work one-target read and fresh-plan verification succeeded: one target and two history rows, with one proposed create, zero attachments and zero conflicts. The two operations took 43.051 seconds combined and reused the retained observation. No business record creation or image attachment was performed. At this checkpoint, the original write outcome, cause and business completion were unverified; [issue #61](https://github.com/flair-agency/live-agency/issues/61) and [cutover #32](https://github.com/flair-agency/live-agency/issues/32) remain open for acceptance.

## Historical write-diagnostic distribution preparation — 2026-09-11

The following preparation statements, including selected versions and pending
work, describe that earlier checkpoint rather than the current work queue.

All three diagnostic source changes for [issue #61](https://github.com/flair-agency/live-agency/issues/61) are owner-approved and merged: Transport #7, Lark Base Provider #16 and Profile #8. They retain safe actor readiness, original write causes and independent readback diagnostics. They do not explain the original failed write or change authorization and retry rules.

The currently selected Work installation is Runtime 2.0.0-m3.0, Profile 2.0.0-m3.2, Lark Base Provider 1.4.0-m3.2, Transport 1.1.2, CLI 1.0.93, TikTok platform 0.1.0-m3.1 and catalog 0.1.0-m3.2. This was checked against installed manifests, saved configuration, current Skill registration and the retained profile-auth-diagnostics-20260911 receipts. [PR #60](https://github.com/flair-agency/live-agency/pull/60) retains the preceding adoption-evidence review; it remains a separate documentation PR.

The next candidate selects Transport 1.1.3, Provider 1.4.0-m3.3, Profile 2.0.0-m3.3, platform 0.1.0-m3.2 and catalog 0.1.0-m3.3. Runtime, CLI, TikTok Web acquisition and selected resource/authority configuration remain fixed. Source archives and one synthetic diagnostic-propagation check are prepared; the installed Runtime generated a new plan with unchanged read/write configuration hashes. No new installation, host switch or business operation occurred during this preparation.

The [Japanese adoption review](../reviews/profile-write-diagnostic-adoption-ja.md) states the exact proposed publication, host switch, read verification, retained immediate rollback and evidence limits. Publication and actual Work verification remain pending. Issue #61 remains open, and cutover #32 remains blocked on business acceptance. The older checkpoints below retain their original scope and do not select the current installation.

## Historical authentication-diagnostic adoption — 2026-09-11

The owner-approved authentication-diagnostic release was privately published and
adopted at this checkpoint. Installed manifests, registry archive integrities, the Profile
registration link and installation/adoption receipts agree. Earlier checkpoints
below retain their original states and do not select the current installation.

| Component | Previous deployment at this checkpoint | Adopted at this checkpoint |
| --- | --- | --- |
| Runtime | `2.0.0-m3.0` | `2.0.0-m3.0` |
| Profile Skill | `2.0.0-m3.2` | `2.0.0-m3.2` |
| Lark Base Provider | `1.4.0-m3.1` | `1.4.0-m3.2` |
| Lark Transport | `1.1.1` | `1.1.2` |
| Lark CLI | `1.0.93` | `1.0.93` |
| TikTok platform | `0.1.0-m3.1` | `0.1.0-m3.1` |
| Independent catalog | `0.1.0-m3.1` | `0.1.0-m3.2` |

The owner approved the grouped release/adoption scope in
[Transport PR #6](https://github.com/flair-agency/live-agency-lark-transport/pull/6),
[Provider PR #14](https://github.com/flair-agency/live-agency-provider-lark-base/pull/14)
and [PR #59](https://github.com/flair-agency/live-agency/pull/59); all are merged.
Provider publication first stopped before publishing because one existing test
omitted the new diagnostic phase. The owner separately approved
[test-only PR #15](https://github.com/flair-agency/live-agency-provider-lark-base/pull/15).
All 238 tests pass, and the archive remains byte-identical to the approved candidate.
[Transport publication](https://github.com/flair-agency/live-agency-lark-transport/actions/runs/34570222048)
and [Provider publication](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34571792905)
verified private registry installation and archive integrity. The fixed
[catalog release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m3.2)
has SHA-256 `dcf2ded860e3efb4a35e5048bd56a5f63d641000afc8e4f2ae62287e4014fc6b`.
GitHub reports `immutable: false`; preservation relies on the version,
no-overwrite procedure and verified digest, not GitHub-enforced immutability.

### Adopted execution and recovery boundary

This section is the English canonical record of the approved
[Japanese adoption review](../reviews/profile-auth-diagnostic-adoption-ja.md).
The plan SHA-256 is `87d40a84f498029c9bb42add17650e0b82d638f1f579f1e30971b1309c2ed4d2`.
The sequence was fixed Transport publication, fixed Provider publication, catalog
release, verified new installation, then the three reviewed host entry files and
Profile registration replacement. Reused Runtime, Profile and platform packages
were not republished. Actor, resource/configuration references and hashes remain
unchanged; updates remain manual and storage remains unselected.

The designated operational user's private
`~/.local/share/live-agency/deployment-plans/profile-auth-diagnostics-20260911/`
contains the evidence. The original `record.json` remains a prepared snapshot;
its SHA-256 is `29060ca9b905574cc7daf0f9b1750f702a86949b7ba0f5bcaeadb98621b03ea9`
and it indexes 18 approved files. Actual `installation-receipt.json`,
`installation-verification.json`, `adoption-receipt.json`,
`skill-registration.receipt.json` and publication receipts establish execution.
New generation: `87fe6e04dcc34b37259d53ac699eccb858193c3ba469570c9dbbf6a209b4f515`.
If another operator cannot access this designated user's private evidence,
request it from the owner using the record ID before switching or restoring.

The immediately previous `profile-2.0.0-m3.2-read-recovery` installation and
generation `349dc2854f40dd215b860895043c56fa69d98e2433833fc3aa4468f4e9f2e895`
were retained as this checkpoint's recovery target. This historical record does not
select the current recovery target. For this recorded adoption, use the new installation's supported registration
restore procedure with its actual registration receipt; restore the three
`host-before-0`–`2` files with the paths and modes in `deployment-review.json`.
Compare adopted hashes first and stop on drift. Keep both installations and
receipts; host rollback does not undo business data.

### Verified Work read and remaining business acceptance

The selected Work task completed the approved single-creator read. The
permitted sequence is describe, selected target and scoped history reads, and
planning only when retained observations remain valid. No business registration,
image upload, fresh source observation or schedule change is included.
Diagnostics do not grant host access. On
`LARK_CLI_CREDENTIAL_STORE_UNAVAILABLE` at `auth-status`, use only the host's
supported approval mechanism for the same complete bounded read command and
unchanged selection. If unavailable or denied, retain the safe error and stop;
do not change credentials, Keychain permissions or identity. This error is not
automatically retried. Existing exact API20008 read recovery remains bounded to
three attempts within one 60-second request budget, without an outer workflow retry.
An `auth-status` failure precedes Base dispatch; `business-api` labels processing
and alone does not prove receipt by the service.

The first actual Work attempt stopped at `transportStage: version` with
`LARK_CLI_API_ERROR`; targets/history were not read and no plan was created.
The fresh installation lacked the native CLI binary: the package launcher
attempts initialization when `npm ci --ignore-scripts` has skipped it.
This relates to [Transport issue #4](https://github.com/flair-agency/live-agency-lark-transport/issues/4);
the original attempt's raw native output was not retained, so its exact OS error
is not established. The reviewed official initializer was then run as the
remaining fixed-installation step. Its bundled archive checksum passed, the
native binary SHA-256 matches the immediately previous fixed CLI, and the
launcher now returns exactly `lark-cli version 1.0.93`.
`native-cli-initialization.json` records this repair without changing credentials
or package selection. A new Work check after this concrete environment repair
succeeded. The initial failed attempt remains separate evidence; a generic
workflow retry or a permanent cold-start source fix was not introduced.

In the new Work check, ordinary sandbox execution returned
`LARK_CLI_CREDENTIAL_STORE_UNAVAILABLE` at `auth-status` in approximately 0.14s.
The already approved host execution mechanism ran the same selected target read
successfully. One target matched; a subsequent scoped read returned one history
row for that creator. Retained input identity matched, and its original
observation timestamp was preserved. Planning completed in approximately 25.3s:
one proposed create, no attachment operations, conflicts, target issues or invalid
history. The selected generation remained unchanged. Private
`evidence/work-read-after-native-init-20260911/` contains `targets.json`,
`read-audit.json`, `plan.json` and `result.json`, all with mode 0600.

This is actual designated-Work evidence of target/history reads and planning,
not merely a Codex-origin probe or installation check. Business registration
and business readback were not run, so `businessWorkflowVerified` remains false.
No business writes, uploads or new observations occurred. This establishes the
Profile path through planning, not invitation-workflow acceptance or overall A
completion. At this checkpoint, the concrete business write still needed its own prepared
review and owner approval before execution.
[Provider issue #9](https://github.com/flair-agency/live-agency-provider-lark-base/issues/9)
and [cutover issue #32](https://github.com/flair-agency/live-agency/issues/32)
retain the verified result and remaining acceptance scope.

## Historical knowledge ownership documentation and stopped profile attempt — 2026-09-11

The owner requested durable documentation of the agency/platform domain
distinction, Skill use-case ownership, generic Runtime and Provider boundaries,
and per-repository public/private source direction. The
[architecture record](../architecture/domain-knowledge-ownership.md) owns the
adopted boundaries and domain model. The [Japanese review](../reviews/domain-knowledge-ownership-ja.md)
owns four pending implementation views, proposed mapping mechanics and the
current failure assessment. This checkpoint changes documents only, with no component pins,
registry publication, host registration, service retries or business writes.

Later production evidence is recorded at
[checkpoint ad3c1ba](https://github.com/flair-agency/live-agency/commit/ad3c1ba)
on `codex/profile-production-evidence`. Its stopped attempt used Runtime
`2.0.0-m3.0`, Profile `2.0.0-m3.1` and Lark `1.4.0-m3.0`; installation and Skill
registration completed, but the plan did not complete. A scoped history-read
diagnostic stopped at `read-fields`, which includes two field-definition reads
and their mapping validation. The precise cause remains unresolved. Business
writes and image uploads were zero; `businessWorkflowVerified` remains false.
The final Work turn ended with a workspace credit error.
[Issue #32](https://github.com/flair-agency/live-agency/issues/32) continues to
track the incomplete business acceptance. This is a reference to retained
evidence, not a fresh verification or adoption of all changes on that branch.

The source-ownership correction does not itself fix the read failure. The next
diagnostic should distinguish those stages and retain a sanitized failure reason
through the Skill before one bounded selected read. Broad schema migration is
not a prerequisite to identifying the failing operation.

## Historical Profile publication correction and production proposal — 2026-09-10

Historical checkpoint: the later stopped production attempt is summarized above.

The owner accepted Runtime PR #8, Lark PR #8, Profile PR #3 and parent PR #53
for main integration and fixed private publication. All four are merged.
Runtime `2.0.0-m3.0` and Lark `1.4.0-m3.0` publication workflows passed; their
private registry archive integrities match the reviewed local candidates.
Profile `2.0.0-m3.0` was published, but its post-publication standalone check
failed: the inspected version metadata contains the Runtime peer dependency
and omits its optional metadata, leading to Runtime package access and a
`read_package` 403. The tarball still matches the reviewed archive. This is an
observed distribution difference, not a change to business behavior.

The correction removes that peer declaration in Profile `2.0.0-m3.1`. Runtime
continues to be supplied by the selected environment. The actual corrected
archive installs alone and imports all exported modules without Runtime or
concrete Providers. New publication checks enforce this for archive and registry
installs. The already published `.0` artifact is retained unchanged.
TikTok platform/catalog `0.1.0-m3.0` have not been published; the platform now
selects the corrected Skill candidate. No new business-code tests were repeated.

Issue #32 tracks the corrected source/distribution and concrete production plan
in the [Japanese adoption review](../reviews/profile-production-adoption-ja.md).
The plan preserves the current production actor, destination and read selection,
adds the existing Provider's three write operations as a separately reviewed
selection, and proposes a new fixed installation plus Profile host registration.
Only private proposal files were prepared; production, current host entries,
service access and business data remained unchanged at that checkpoint. The M2
baseline below still applied then; use the current deployed snapshot above for
today's installation. Corrected-version publication and production adoption were
awaiting owner approval; actual record creation also needs its concrete plan approval.

## Historical M2 production baseline — 2026-09-10

At this checkpoint, the designated ChatGPT Work Local production environment was
`operations / production / tiktok` with the following deployed M2 configuration.
The approved registry-only installation succeeded. The installed package integrity,
saved plan/configuration and three adopted host entry files match their receipts.
The [deployment record](../reviews/v2-platform-environments-ja.md#profile履歴読取修正版の実施記録)
separates publication, host adoption and the actual Work read result.

| Component | Deployed at this checkpoint | Immediate recovery target at this checkpoint |
| --- | --- | --- |
| Runtime | `2.0.0-m2.1` | `2.0.0-m2.1` (unchanged) |
| Lark Base Provider | `1.4.0-m2.1` | `1.4.0-m2.0` |
| Independent catalog | `0.1.0-m2.1` | `0.1.0-m2.0` |
| TikTok platform | `0.1.0-m1.0` | `0.1.0-m1.0` (unchanged) |

The designated Work task verified the replacement's startup and completed one
scoped creator-history read in 9.948 seconds: one valid row, no invalid rows and
the expected creator. The normalized row had no avatar hashes, so live attachment handling
was not exercised. An initial 1.893-second attempt stopped at read-fields; the
same Work field prerequisites subsequently passed before the bounded retry.
The original transient failure's cause remains unconfirmed. The read correction
was accepted by the owner; evidence PR #51 is merged and Provider issue #4 is
closed. M3 business workflow acceptance remains open.
Lark is the selected database; no business Skill or storage is selected, and
updates remain manual. Earlier M1-only and unpublished-M2 statements below are
historical checkpoints, not the current installation selection.

The owner accepted the source package: Runtime PR #7, Lark PR #7, Profile Skill
PR #2 and parent PR #52 are merged into main. Issue #32 now tracks the bounded
first Profile distribution candidate described in the
[Japanese release review](../reviews/profile-first-release-ja.md).
The adopted source connects Profile Skill
target preparation, observation handoff, scoped-history planning, prepared
write review, approved execution and final readback through the selected
environment API. Runtime adds generic process-local execution hooks; the
private Provider binds concrete intents and uses the existing selected writer.
The trusted caller must validate and record actual owner approval against the
review, plan and counts. The CLI's durable private journal and read-only verify
connection are implemented and exercised through the real Runtime API.

The local source integration proof passed normal creation/readback, denied
approval with zero mutations, and a lost create response recovered by readback
without a second create, and evidence failure after a write recovered by
read-only verification. CLI repeat-apply rejection and private journal evidence
are also checked. It exercises the actual Runtime, write executor,
selected writer and Skill; transport, observations, approval and neutral read
surface are synthetic. It does not verify the actual read executor, avatars,
live services or registry installation. The final proof records source file hashes and its limits.
Runtime [PR #7](https://github.com/flair-agency/live-agency-provider-runtime/pull/7),
Lark [PR #7](https://github.com/flair-agency/live-agency-provider-lark-base/pull/7),
and Skill [PR #2](https://github.com/flair-agency/live-agency-creator-profile-record/pull/2)
are merged. The [Japanese source review](../reviews/profile-environment-plan-ja.md)
separates prior planning evidence from current write wiring and remaining gates.
The new Profile `2.0.0-m3.0` archive excludes legacy concrete imports and script
exports; version 1.2.0 and its callers remain unchanged. Concrete dependencies
remain development-only comparison material in the Skill source repository.
Runtime `2.0.0-m3.0` allows separate configuration files for each capability of
one selected service. Lark `1.4.0-m3.0`, platform/catalog `0.1.0-m3.0` complete
this candidate composition. Four local archives were independently installed,
their exports/resources and Skill-to-Runtime CLI resolution checked, and host
registration previewed. A separate Skill-only archive installation brought in
neither Runtime nor concrete Providers. These checks use synthetic configuration
and do not verify published candidates, live services or host discovery.
Distribution and production adoption remain pending; the deployed baseline above
is unchanged. No new parent submodule pin or production selection is implied.

[Provider PR #5](https://github.com/flair-agency/live-agency-provider-lark-base/pull/5)
is merged into main. Its release metadata [PR #6](https://github.com/flair-agency/live-agency-provider-lark-base/pull/6)
and catalog/adoption [PR #50](https://github.com/flair-agency/live-agency/pull/50)
were approved and merged at `74794485034043627a09a63811e38b70895b194c` and
`3c12499ac8a1ab52622b0cf02b14b7cbc12da40e` respectively.
[Provider publication](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34473435377)
verified private `next`, package integrity and independent registry installation.
The [immutable catalog](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m2.1)
was retrieved again and matched the approved bytes before adoption.
The saved one-creator read adds only search and batch-get, preserving actor and
destination. Its immediate rollback restores the three pre-update M2 host files
saved for this update. The older M1 recovery receipt belongs to the previous
M1-to-M2 deployment and is not this update's
immediate rollback instruction. Concrete hashes and operator steps are in the
[Japanese deployment review](../reviews/v2-platform-environments-ja.md).

## Platform/environment redesign and M1 acceptance — historical checkpoint

The owner approved the smaller-responsibility concept: an independent catalog,
selected platform installation, AI-guided setup backed by a CLI, business Skill
invocation, project-independent development/production environments and an
explicit security-update policy. The [architecture](../architecture/overview.md)
and [distribution direction](../architecture/distribution.md) record that target.
The [Japanese redesign review](../reviews/v2-platform-environments-ja.md) proposes
the concrete connection and incremental validation sequence and records source
gaps. The owner subsequently requested a first-Skill migration revision.
The [plan review](../reviews/v2-platform-environments-ja.md#移行計画の見直し案)
records the now-approved plan to retain the first connection proof inside M1, independently accept
Runtime on the actual Work host, then connect only Profile's M2 Providers and
deliver Profile for M3 acceptance. Minimum deployment recovery stays in M1;
automatic updates and additional workflows follow later. PR #44 is merged.
[#45](https://github.com/flair-agency/live-agency/issues/45) was explicitly accepted
by the owner with LGTM on 2026-09-10 and is Done. The owner-approved source was merged through Runtime PR #3/#4 and
parent PR #46/#47. The explicit private-publication approval was then consumed:
Runtime `2.0.0-m1.1`, TikTok platform `0.1.0-m1.0` and independent catalog
`0.1.0-m1.0` were published and verified. At that M1 acceptance checkpoint,
the installed production environment was
`operations` / `production` / `tiktok`, with manual updates and no business Skill,
database or storage selected.

The designated Work task discovered the existing Runtime host entry and verified
the fixed installed version, saved configuration and available capability. The
entry used that installed M1 generation directly, not the development checkout.
The exact previous three host files were restored and the old 1.3.0 entry returned
readiness with zero external operations before the new entry was adopted again.
The former installations and separate Profile configuration remain intact.
The earlier synthetic Work proof retains module/instruction execution, catalog
unavailability and Skill-registration recovery evidence.

M1 acceptance is complete. Profile M2/M3 business completion remains separate and
open. No business data or schedule was changed at that checkpoint; service
authentication and Provider-specific questionnaires had not been verified then.
The subsequent successful M2 creator read is recorded below. See the
[distribution and production evidence](../reviews/v2-platform-environments-ja.md#m1固定配布と常用環境への導入)
and its owner trial instructions. The released source commits are already in
their owners' main branches; this evidence checkpoint does not adopt a new
development-parent Runtime submodule pin. Earlier checkpoints do not select a
broad migration run.

## Profile M2 read connection — current package

The initial M2 deployment followed owner approval of source adoption, private
publication and designated Work production installation/read verification.
Runtime `2.0.0-m2.1`, Lark Base `1.4.0-m2.0` and catalog `0.1.0-m2.0`
were published and verified at that checkpoint. The
Runtime fix is merged through [PR #6](https://github.com/flair-agency/live-agency-provider-runtime/pull/6)
and [publication run 34461964090](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34461964090)
succeeded. Lark [run 34459702584, attempt 2](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34459702584/attempts/2)
and the [fixed catalog release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m2.0)
retain the other distribution evidence. TikTok Web `1.1.0` remains unchanged.

The first `2.0.0-m2.0` installation failed because setup forced the public CLI
dependency through the private registry. The compatible `2.0.0-m2.1` fix honors
the explicitly selected npm configuration's registry scopes and excludes
inherited npm configuration overrides. Real registry-only production installation
then succeeded, and the three existing Runtime host files were adopted. The
saved environment at that checkpoint selected the Lark database and two capabilities; no business
Skill or storage is selected, and updates remain manual. The previous M1
installation and exact three-file recovery copies/hashes remain retained.

The designated ChatGPT Work Local task verified Runtime startup, saved
configuration and capabilities. Its first read-creators request failed with
PROFILE_DATASTORE_READ_FAILED at stage read-fields. The same Runtime request
then completed read-creators with 1,374 creators after host execution permission
was supplied; Provider identity and saved configuration were unchanged.

The single read-history invocation did not complete within the ten-minute smoke
verification bound. At elapsed 10 minutes 51 seconds, the coordinator matched
its PID, installed executable and exact request and sent SIGTERM only to its
three processes. No Provider completion JSON was received. This is an incomplete
read, not proof of an API failure or a triggered download budget. Source
inspection confirms that history hydration visits all Profile rows and each
attachment hash confirmation rereads the selected table before and after the
download; the specific cause of the full elapsed time is not isolated. TikTok
observation was not attempted and external writes remained zero.

The operator guide recorded the host-permission distinction; its prior
adopted copy was retained, and all three host/recovery hashes matched the
receipts. That owner approval for publication, production adoption and the bounded
read verification was consumed; it supplies no production write authority.
The source repair tracked by [Provider #4](https://github.com/flair-agency/live-agency-provider-lark-base/issues/4)
was subsequently merged, privately released as `1.4.0-m2.1` and adopted through
the separately approved PR #50 plan. The current scoped-read result is recorded
at the top of this document, retaining attachment membership and business semantics. M2 save-operation
connection and M3 Skill invocation/planning/write/readback remain open. See the
[Japanese evidence update](../reviews/v2-platform-environments-ja.md#profile-m2固定配布と本番導入の更新)
for the source chain, failure recovery and remaining acceptance boundary.

## Source synchronization checkpoint — 2026-09-09

The owner approved the exact public source selection: 18 Skills are now public (15 new repositories and 3 visibility changes), and the existing public operations MCP has the approved development branch. All 34 component HEADs were verified on their selected GitHub remotes before parent adoption. Thirteen pending Skill identities were adopted in source, npm metadata and direct caller references; frozen and protected operational scopes are unchanged. The exact map is in `tools/skill-source-identities.json`; current repository/branch/commit evidence is in `tools/m1-source-repositories.json`.

PR #35 was approved and merged into `codex/project-root` at `0da30c3`. Use that baseline for the integrated source checkpoint. Both GitHub CI runs at `ae3fbb4` passed checkout, online dependency installation, 1,013 tests and public-content checks after CI read credentials were configured. Registry release and production activation remain separate. The next #31 preparation reconciles final package names and proposed dependency versions; #13 scoped development acceptance is complete by explicit owner approval; #6/#14 execution selection and acceptance remain open. Source review and the full development runner passed 1,013 tests; the final clean-clone check is recorded in the reconciliation record. Profile image-resume approval was consumed successfully; no further image approval is pending. BackStage execution-time environment/targets remain owner input for #6/#14.

See [repository reconciliation](../reviews/repository-reconciliation-ja.md) and [public source approval](../reviews/skill-public-source-publication-ja.md). Older local-only and private-source statements below describe earlier checkpoints.

## Owner-selected delivery priorities — 2026-09-08

| Priority | Workflow |
| --- | --- |
| A | Invitation status synchronization (the adopted invitation-eligibility scope); profile synchronization |
| B | LIVE metric synchronization; coin expense processing |
| C | Revenue recognition and receipt settlement; gift history synchronization |
| D | Lark Base maintenance, backup and restoration |

Deliver A first, including only the shared capabilities, release checks and per-workflow cutover needed for A. Shared Project items marked A apply only to that slice, not completion of all downstream workflows. Reuse verified evidence; do not repeat broad checks without a changed dependency or unresolved failure. The owner subsequently authorized resuming A implementation; this does not authorize production changes. B–D remain queued. Required data protection for an A operation remains a prerequisite even when the broader maintenance workflow is D. Assessment updates and already accepted monthly work are not assigned a new priority by this instruction. Backup deletion execution remains a separate post-migration follow-up.


## Issue organization — 2026-09-08

All 26 existing Project drafts were converted in place to issues in the private `flair-agency/live-agency` repository, preserving Project item identity, status, priority and prior evidence. Two accepted items are closed issues. Three A-only child issues isolate shared Lark readiness, release readiness and cutover; the Project now contains 29 issues.

Use native labels, parent/sub-issue relationships and blocked-by/blocking links. There are 15 parent edges and 30 directed prerequisite edges, verified without dependency cycles. Dependency links gate acceptance; they do not prohibit independent preparation. The `Work size` field is a rough remaining-work estimate (Complete, S, M, L, XL), not elapsed time or credits. Shared/parent sizes overlap child work and must not be summed. `Affected repositories` distinguishes implementation owners from the central issue repository; local owners without an origin remote are explicitly identified.

A execution chain: [[A][M2] Verify Lark capabilities required by invitation and profile synchronization](https://github.com/flair-agency/live-agency/issues/30) → profile/invitation acceptance → [[A][Release] Verify invitation and profile package readiness](https://github.com/flair-agency/live-agency/issues/31) → [[A][Cutover] Activate and verify invitation and profile workflows](https://github.com/flair-agency/live-agency/issues/32). The A workflows depend on the A Lark child, not completion of the whole shared Provider backlog. B–D remain queued.

## Current A checkpoint — 2026-09-09

The scoped Lark capability work in #30 is complete at Provider 6ecd8c9.
Invitation now composes timestamp updates, batched creates, existing-image resumes
and new-image appends; Profile preserves existing-image resumes followed by all
new-image uploads and one token-bearing create batch. All downstream preflights
run before mutation, intermediate outcomes are read back, and uncertain writes
stop successors. Earlier selected development live evidence is retained; new
mixed paths were verified synthetically rather than presented as fresh live scans.

Current Skill source checkpoints are invitation 2b9b929 and Profile 82ccb40,
including the reviewed instruction/test/dependency changes. Final candidate
Provider tests: 209; invitation tests: 22; Profile tests: 19. Six candidate archives
were installed with registry dependencies in an isolated fixed-lock consumer:
128 files matched, 42 tests passed, and both interactive source resolvers rejected
unattended execution. The later Skill instruction-only additions passed archive,
link and export checks without changing the tested code. Profile retains its
explicit nested Lark 1.1.0 dependency pending final release selection.

#13 completed its approved one-image development resume: zero new rows, one
image, preserved other rows and zero-write replanning. #6 awaits the owner's
execution-time BackStage environment and target selection, then #14 acceptance.
Source-profile M2 #4 remains accepted and is not reopened. A proposed release graph also passed an offline fixed-lock simulation (24 packages, no nested old Lark), 42 execution checks and two source-selection checks. Package-only upgrade and rollback passed 15 checks each and restored the exact original lock. These are unpublished temporary consumers. #31 retains final
version/dependency/pin/publication selection, and #32 retains operational cutover.
That earlier candidate window made no live writes; the separately approved image
resume above subsequently completed. No production activation occurred.
B–D remain queued. See the current conclusion in the
[image/history evidence record](../reviews/lark-append-evidence-source-ja.md).

## Earlier local migration preparation checkpoints

The owner-selected development App now has two isolated Bases: normal
development and recovery testing. Bot metadata readback and owner user access
are verified. Two profile tables, exact field bindings and two synthetic
creator rows are prepared in the normal development Base. The single-value
duplex relation required by the profile Skill is verified; the CLI shortcut's
default relation is retained only as a negative fixture. No production resource
is selected. App/resource identifiers remain in private task evidence.

The owner applied both requested development App scopes. Selected Bot preflight,
field reads and the two-creator target export now succeed. A complete-empty
record response omitted items; the local parser was repaired without relaxing
unknown/partial response checks. The same selected composition now produces a
synthetic Profile plan with two creates, zero attachments and zero conflicts or
target issues. Selected single-batch create support and Profile integration now
pass source and fixed-lock archive checks. The owner approved the concrete two-row plan; both records were created and
verified by readback, and repeat planning returned zero creates. No additional
owner App permission is currently requested. Empty attachment inventories and
three-table LIVE read preparation are also locally verified; avatar and complete
workflow acceptance remain open.
The local image-at-creation candidate (Provider 04b834f / Profile 6a5e834) now
passes synthetic upload/create/API-byte readback checks. Development Bot upload
and media-read preflight passed. The owner approved the concrete image-backed
synthetic create: one upload and one new record succeeded, stored bytes matched,
the two existing rows were unchanged, and repeat planning returned zero writes.
See the [development verification record](../reviews/development-base-verification-ja.md).

Backup retention scope is owner-approved as planning only, with the selected
target name `live-agency-data-backup-retention-plan`. Acceptance must verify
retained backups, deletion candidates and reasons while protecting the last
recoverable backup and recovery-protected generations. Actual storage deletion
is a separate implementation and acceptance item, outside this migration
acceptance scope. The local package, Skill metadata and maintenance caller now
use the selected name; the source checkout path and version 1 plan vocabulary
are retained. No release or operational installation rename is adopted.

Scouting vocabulary is owner-approved: 招待可否 (invitation eligibility),
スカウト対象判断 (scouting target decision), 招待種別 (invitation type),
招待状況 (invitation progress), and 所属状況 (membership status). The
[domain model](../domain/model.md#11-adopted-scouting-vocabulary) owns the
definitions. The owner subsequently approved eligibility-only new inputs,
unknown-result preservation and no automatic historical conversion. See the
[adopted contract boundary](../domain/model.md#12-adopted-invitation-observation-boundary).
The local typed implementation now exists; live acceptance and historical
meaning inspection remain open. This is not M3 completion.

### A invitation checkpoint — 2026-09-09

Local candidates: Lark `90ce5f0` adds baseline-bound timestamp-only updates;
invitation Skill `021222b` adds typed eligibility observations and destination/
field-bound version 3 plans; BackStage `43665d4` adds an explicitly selected
typed handoff from new lookup results. Unknown outcomes remain null and block
the plan; legacy history is not converted. The trusted caller must review the
actual history meaning. Synthetic source-to-destination checks cover creation,
timestamp extension, readback, replay, response loss and rejected drift.

Provider 169, Skill 22 and BackStage 26 source tests passed. The final focused
parent checks passed 26 tests. Three unpublished archives matched 74 packaged
files and passed 66 tests with existing development dependencies; this is not
a new fixed-lock installation. Existing dirty instructions and dependency
edits remain separate from the narrow code checkpoints. No parent pins,
publication, schedules or operational routes changed.

The selected development invitation-history table is now created and readback-verified
with seven fields and a single-valued Creator relation plus its reverse field.
The five existing development records are preserved. Lark table-create knowledge
is checkpointed at `7d52a25`. The owner approved an exact version 3 synthetic
plan: two no-avatar invitation rows were created once and business-readback
verified. Replay returns zero writes and two already-applied observations.
The owner separately approved the two-row timestamp-only plan. One batch update
succeeded, all non-timestamp fields were preserved, and replay returned zero
writes and two already-applied observations. Retained actual development snapshots also
reproduce the reviewed plans through the previously unpacked Skill candidate.

The owner approved immutable official CLI source as a distinct implementation
evidence kind with troubleshooting provenance. Shared transport 48dd77e binds
repository/commit/file/content hash/date to selection; Lark 0fab06a implements
one-image append with byte-level preservation, durable provenance events and
no automatic uncertain-write replay. Transport 83, Provider 178 and related
integration/inventory 18 tests passed. Two candidate archives matched 55 files
and passed 38 tests with existing development dependencies.

The owner-approved development append completed once: one existing image was
preserved and one test image added, with both byte hashes and all other record
fields verified by readback. No records were created or deleted. Private approval,
intent, five provenance events and result are retained under append-development-*.
Invitation's normal avatar-create path still needs integration; Profile new-image
creation already uses a token-bearing create. Neither Skill's full avatar workflow
is newly accepted by this Provider test. #14 and #30 are Todo for remaining
integration/acceptance. The owner then resumed A-only work. Profile missing-image
resume now passes selected-CLI synthetic integration from the Skill entry point,
including lost acknowledgment, exact replay rejection, preserved fields, and
zero writes for missing approval, changed files or stale plans. Eight focused
Profile/inventory checks passed. Product code changes were unnecessary. Invitation image-create composition now exists at Provider e588027 / Skill
b9f3889. It binds one create, upload and append to a reviewed parent intent,
verifies the returned record before upload, and stops after uncertain outcomes.
Provider 185, Skill 22 and A integration 26 checks passed; three archives matched
74 files and passed 52 isolated checks. Retained development input reproduces
the exact image-create plan through the archived candidate. The owner-approved one-row live
image-create plan completed once: one row and image created, byte readback matched,
both prior records were preserved, and replay yields zero writes and one
already-applied observation. The approval is consumed; private events and
readback are retained. Invitation multi-row image creation is now implemented at Provider c32c7b5 /
Skill f7b1516: a single create batch retains image-free rows and verifies all
returned row mappings before sequential image attachment. Provider 191, Skill 22
and related integration 29 tests passed; three archives matched 76 files and
passed 61 checks. Mixed invitation operations, Profile multi-image creation and
source-to-destination acceptance remain open; B–D remain queued. This does not
constitute live Skill acceptance.
No publication, parent pin adoption or operational route change occurred.

Current local candidates include the owner-selected LIVE identity rule and the
foreign-revenue split. Existing operational installations, profiles and monitors
remain unchanged. The new foreign-revenue owners and recovery candidate have local source commits; recorded parent pins, publication and operational cutover are not adopted.

Seven Lark consumers now declare the already adopted Provider 1.2.0, matching
the parent lockfile. Their local archives were installed in an isolated consumer
with registry transitive dependencies using a fixed lockfile and disabled
scripts. All 88 tests passed; the old monthly-Skill dependency is absent. See the
[dependency alignment record](../reviews/lark-consumer-dependency-alignment-ja.md).
This supersedes the earlier 1.0.0 dependency-preflight blocker for these local
candidates, but not final package or workflow acceptance.

The LIVE Skill now matches creator plus normalized start time. Different end
times block the entire plan, including metric writes; old approvals cannot be
reused under the new identity rule. Owning 37 tests and 11 direct integration
checks passed, and the installed 88-test check includes this candidate. See the
[LIVE identity record](../reviews/live-session-identity-ja.md). Actual history and
legacy Provider/MCP distributions remain unchanged.

The owner selected two foreign-revenue Skills and a shared neutral calculation
package. Three independent local source candidates retain valid legacy plan
hashes and reject wrong operations, malformed dates and unsafe numeric results.
The final temporary installation passes 34 foreign-revenue tests and both Skills pass standard metadata
validation. The original six operational files retain their hashes. See the
[adopted boundary](foreign-revenue-split.md) and
[Japanese verification record](../reviews/foreign-revenue-m3-scope-ja.md).
Accounting Provider acceptance, monitor mapping, final publication and cutover
are still open. Candidate manifests are private and not adopted into parent pins.

Earlier preparation remains valid within its scope: profile instructions and 19
owning tests; shared discovery tests moved into the parent; four assessment and
two profile-pruning safety cases; and removal of backup retention's unused
recovery-Skill dependency. See the [profile review](../reviews/profile-m3-readiness-ja.md),
[remaining readiness](../reviews/remaining-m3-readiness-ja.md), and
[release inventory](../reviews/v2-release-readiness-ja.md).
The [remaining contract questions](../reviews/remaining-m3-contract-decisions-ja.md)
continue to distinguish local verification from live data and capability acceptance.

Recovery result version 2 is now owner-selected and implemented locally. It
separates restoration from cleanup, preserves legacy receipt validation, binds
preflight destination references and protects verified recovery sources even
when cleanup is pending or uncertain. Owning 21 tests and 12 retention/integration
checks passed; the final four-candidate installation passed 55 tests. The owning
commit is c18a8d204d9cb42f5604f255f613dccdbeb0d085, not adopted into the parent
index pin. See the [recovery result record](../reviews/recovery-result-v2-scope-ja.md).
Two additional compaction owners pass 22 safety tests against their installed
candidates, including eight new response-loss and approval rejection cases.

## Remaining-work queue: private migration Project

The owner created [LIVE Agency v2 Migration](https://github.com/orgs/flair-agency/projects/3)
and selected it for remaining-work tracking on 2026-09-08. Use that private
Project for queue/status updates; this document retains detailed evidence and
scope decisions. Historical next-action paragraphs below do not select new work.

Tracking setup completed (class F/G): confirmed private visibility and an empty
Project, corrected the title, added the README and 25 remaining-work Drafts,
and set all to Todo. These comprise seven M2 coverage/acceptance items, fifteen
M3 items, one maintenance-boundary decision, one release-coverage check and one
per-workflow cutover coordination item. Monthly/gift acceptance is included in M3.
Individual assignees remain unset. Draft bodies contain outcomes, responsible
components, gates and evidence references; registration does not authorize live
operations or reopen completed tests. Frozen weekly claims, human gift-export
acquisition and post-migration maintenance remain excluded from migration gates.

Independent readback verified private visibility, title/README, all 25 unique
Draft titles and exact bodies, and Todo state. Setup inputs and verification
receipts are retained under ignored `tmp/v2-project/`. Product tests were not
needed; no source package, pin, installation or production state changed.
Existing parent changes and index were preserved. Recovery is limited to the
recorded Project items/settings; no external data rollback is required. Next:
select the next bounded migration package from this queue using its evidence.

## Post-migration browser knowledge maintenance: deferred

Owner-selected intake only (class G, supporting external tracking operation):
[parent Issue #1](https://github.com/flair-agency/live-agency/issues/1) records
the divergent BackStage and TikTok Web image-acquisition instructions. It is
linked to the existing maintenance Project, with migration completion and
explicit maintenance selection as resumption conditions. Shared ownership and
implementation remain undecided; this is not a migration gate. No Provider,
package, permission or production change is selected. The issue was read back
as OPEN; recovery is limited to editing or closing the tracking item.

## TikTok Web profile M2: selected evidence acceptance complete

Profile M3 synthetic readiness now passed 12 checks against installed Skill
1.1.0 (nine retained regressions and three additional approval/drift/uncertain
response scenarios). No live destination operation ran. The Japanese
[readiness review](../reviews/profile-m3-readiness-ja.md) records the legacy
MCP instruction scope, test limits and explicit destination prerequisites.
The Project item remains In Progress; this is not full M3 acceptance.

On migration resumption, the coordinator completed the selected-account
evidence review (class D/G; no source or external-data mutation). Independent
checks passed for manifest/output identity, rounded follower semantics,
post-ID timestamps and 30-day boundary, promoted/feature value agreement,
feature size, owner-only files, JPEG signature, image byte length and SHA-256.
The installed Provider is 1.1.0, knowledge `tiktok-web-profile/2026-08-31.7`.
The earlier successful normalizer run is reused. The private acceptance receipt
is retained with the selected-target artifacts. Avatar export was supplemented
later through the owner-selected browser route, not a fresh complete scan.

This accepts only the selected interactive profile observation and normalized
handoff. It does not accept unattended operation, coin acquisition, destination
history writes or production activation. Browser knowledge consolidation remains
post-migration maintenance Issue #1. No acquired data or source URL is added to
GitHub. Recovery retains the earlier evidence alongside the augmented output.

Profile M3 preparation found installed Skill 1.1.0 still describing an older
Creator Scouting MCP dual-run/scheduled-cycle path. Its applicability must be
reconciled with the adopted non-MCP migration plan before installed acceptance;
do not manufacture full MCP deployment as a prerequisite. A current destination
manifest with stable creator record IDs and verified field bindings is also
required before a destination plan. The source-only M2 manifest supplies no
destination authority. No profile Skill, package or production route was changed.

### Historical acquisition attempts (superseded by scoped acceptance above)

Avatar recovery subsequently succeeded through the in-app browser's observed
page-asset export, after the owner requested a browser-based alternative. The
selected image was saved owner-only outside Git, and the installed CLI accepted
`evidence-with-avatar.json` into `observations-with-avatar.json`. These artifacts
supplement the earlier profile/post observation time; they do not represent a
fresh post scan. The export manifest containing source URLs was removed. The
earlier shell attempt was interrupted; no shell download success is claimed.
No Lark write or production cutover ran. The image-acquisition blocker is resolved.

The owner subsequently selected a distinct public profile and enabled the
TikTok CDN wildcard origin. The in-app browser verified the profile and the
newest-first public grid. Three matching post details established two posts in
the trailing 30 days and an older July 21 boundary; visible date labels passed
the installed Provider 1.1.0 timestamp validation. The CLI normalizer accepted
one row with nickname, rounded follower count, introduction and post metrics.
Owner-only evidence and output are in the selected-target subdirectory under
`/private/tmp/live-agency-m2-tiktok-profile/`.

The avatar opened successfully on the permitted CDN origin, but the Provider's
bounded image acquisition helper exited 1 without a captured diagnostic. It is
recorded as `not_available`; full image-path acceptance remains open. Recovery
is to diagnose that acquisition step under the owning Provider instructions,
without repeating successful profile/post reads. No Lark writes, package
changes or production cutover ran. Validation: installed normalization CLI
passed, and the normalized output was read back. The earlier self-profile
attempt below remains historical partial evidence.

The owner selected one account and enabled the TikTok origin before restarting
Codex. Installed Provider 1.1.0 read the matching profile in the in-app browser;
its v2 normalizer accepted the one-row manifest and observations. Evidence is
owner-only under `/private/tmp/live-agency-m2-tiktok-profile/`.

Nickname and follower count were observed. The self-profile grid includes a
lock-marked card; the reviewed public-profile instructions do not define this
mixed-visibility case. Post scanning stopped with `schema_changed`, retaining
null latest-post and 30-day count. An avatar context-menu attempt did not expose
a save action in the returned browser state; acquisition remains unavailable.
This is partial evidence and successful unavailable-value normalization, not
full profile M2 acceptance. No Lark write, account change or package change ran.
Next: resolve the public-post visibility case and avatar acquisition under the
owning Provider contract, or select a distinct public-profile test target.

Money Forward candidate M2 preliminary browser read succeeded after the owner
added the selected origin permission and restarted Codex. The in-app browser
verified the selected organization/business number and user identity. Both
linked/imported views were inspected for the selected September range; the
all-imported view contained 37 rows on one page and the unregistered view
contained one coin-expense candidate. Owner-only observation:
`/private/tmp/live-agency-m2-moneyforward/preliminary-inventory.json`.

This is preliminary browser evidence, not a validated `expense-candidate-source/v1`
document or completed registration acceptance. Source-transaction lookup remains
incomplete; accounting-profile binding and normalized contract validation remain
outstanding. No registration plan, external write, authentication change, API
office-ID inference, or future month-end completeness is claimed. No product or
package pin changed. The owner closed this selected preliminary-read package and moved on; receipt
acquisition is not required for that result. Registration acceptance remains open.
Next package: TikTok Web public-profile M2, using installed Provider 1.1.0 and
its v2 normalizer. Require an owner-selected target and permitted in-app browser
origin before acquisition; no Lark writes or production cutover are selected.

## Gift concrete-Provider dependency: deferred maintenance request

Under the adopted Skill maintenance policy, the owner requested either immediate
work if it reduces migration effort or an owning Skill Issue otherwise. Inspection
confirmed that the Skill's contract export directly imports the iOS Provider, but
acquisition automation is already outside the migration gates. Extraction now adds
contract/package/composition changes and release verification without removing
remaining migration work. Keep the current verified composition for this migration.

[Gift Skill Issue #1](https://github.com/flair-agency/live-agency-gift-history-merge/issues/1)
records the desired neutral contract/export separation, normal non-blocking priority,
owning roles, deferral rationale, resumption conditions and production-verification
completion criteria. The private repository and Issues permission were verified;
no duplicate existed and the new Issue was read back OPEN. No implementation,
publication or rollout occurred. Project linkage remains pending the separately
tracked Project setup/authentication; no new Project or public summary was created.

## Gift acquisition scope: human handoff confirmed

Owner-confirmed scope correction (G): TikTok JSON request, readiness checking,
SMS authentication and app-to-Safari download are human tasks. Their automation
is excluded from gift M2/M3 completion, not an outstanding migration item. The
owner reports unresolved SMS and iPhone Mirroring redirection constraints.
Source instructions and installed Skill 1.1.0 / Provider 1.2.0 already agree;
byte comparisons of the Skill instructions and Provider gift surface profile
passed. Only migration/review documentation changed; no release or retest is needed.
The automated entry remains local ZIP/JSON plus confirmed account and request date.
Independent LIVE device capabilities retain their own M2 scope.

## Gift Skill M3: full managed-range restoration passed

Class F/D verification on a second disposable workbook copy. Server-side staging
copied the canonical and summary ranges, then complete reads established equality
with the verified Skill target and the two owner-accepted zero-event rows. A fixture
removed one canonical event, corrupted one summary amount and cleared the test log.
Fresh complete canonical read matched the local fixture; installed Skill 1.1.0
prepared the exact reviewed one-addition commit. One connector batch replaced both
complete A:E data ranges and wrote the synchronization log, preserving adjacent
formula columns and formatting.

Complete readback matched all 47,183 canonical events and all 487 summary rows.
Formula/format and pivot display samples matched the original copy. Cleanup passed:
copy deletion succeeded and Drive files.get returned NOT_FOUND. No original workbook,
product source or package pin changed. Evidence: ignored `tmp/m3-gifts/full-*`.

This closes full-range restoration coverage for the existing final state, using
verified server-side staging rather than uploading a newly generated full dataset.
Novel-event row growth, complete pivot reconciliation, Lark projections and production
activation remain outside this result. See Japanese review section 19 for the
consolidated gift acceptance scope. Unrelated maintenance-policy edits were preserved.

## Gift Skill M3: recipient/account summary reconciliation passed

Read-only follow-up (D/G): independently aggregate the recorded canonical master
and compare both installed Skill output and the selected live Summary A:E range.
All 485 event-backed recipient/account groups match amount, first timestamp and
last timestamp; no missing or mismatched groups. The live Summary has 487 rows:
two additional zero-amount rows have historical placeholder first dates and no last
date. Their identities exactly match the two accounts subsequently accepted by the
owner; the private verification receipt records that match. These zero amounts are
accepted, not an unresolved discrepancy. Preserve them as existing non-event rows; do not infer deletion from the
Skill's event-only summary. Adjacent Scout/lifecycle lookup columns are user-owned
and must remain intact. No sheet edits or product/pin changes occurred.

Evidence: ignored `tmp/m3-gifts/summary-verification.json` and `live-summary.json`.
This verifies existing aggregate values, not full summary rewrite or pivot refresh.
A production writer must retain these two non-event rows and formula anchors under
an explicit private workspace mapping. Whole-range replacement with only the 485
Skill-generated rows is not accepted. Remaining write coverage is unchanged.

## Gift Skill M3: disposable-copy write/readback passed

Class F verification under the owner's continuation: copied the selected workbook
to My Drive, verified distinct identity/schema, and prepared a fixture missing one
event with an empty test sync log. Installed Skill 1.1.0 generated a one-addition,
zero-recipient-update plan and exact-SHA commit payload. A fresh complete copy read
matched the local fixture before execution. A bounded connector batch restored the
missing canonical row and recorded the successful synchronization atomically.

Complete canonical readback matched all 47,183 expected events and total 18,539,733.
The changed row and adjacent row retained their original formulas and formatting;
API metadata was used for the best-effort layout check, not a browser render.
No original-workbook writes occurred. The temporary copy was deleted; Drive files.get
returned NOT_FOUND. Sheets metadata still returned a stale-looking resource after
delete, so it was not used as cleanup proof. Private evidence: `tmp/m3-gifts/copy-*`.

This passes the bounded addition/commit/readback path using the supported connector.
It does not prove full staged-range rewriting, all derived-summary reconciliation,
Lark projections, or production activation. No product version/pin changed. Next:
review the gift path's scoped acceptance and prioritize remaining Provider M2 inputs;
retain these limits rather than repeating this successful connection check.

## Gift Skill M3: selected live master read and no-op reconciliation verified

The owner supplied the canonical spreadsheet. Read-only connector metadata and
bounded Journal A:E / synchronization-log reads established its current schema.
The selected export's JSON hash already appears in a successful same-date replacement
entry. Installed Skill 1.1.0 returned unchanged: zero additions or recipient updates.
An independent comparison verified all 46,100 input events, including timestamps,
against the 47,183-row master; the complete target preserves the 1,083 master-only
events and total amount. Existing +9-hour representation is compatible across all
input events; this does not independently prove the source timezone.

Private evidence is under `tmp/m3-gifts/live-*.json`. A local serialization initially
failed strict timestamp validation on single-digit hours; canonical ISO formatting
fixed the adapter input without changing timestamps or product code. No source sheet,
formula, log or other external object was changed. No redundant write was attempted.
Destination write/readback on a disposable copy remains unverified. Unrelated parent
README and review-document edits were observed and preserved.

## Gift Skill M3: local planning and commit preparation verified

Change card: primary D, secondary G. The boundary is the installed gift Skill's
normalized-input reconciliation workflow. Preserve partial-observation semantics,
exact reviewed-plan binding and private data. This serial package uses the existing
registry installation at Skill 1.1.0 / TikTok iOS Provider 1.2.0; no product code,
pin, deployment or external authority changed. No worker was dispatched.

The owner-selected normalized export passed five CLI workflow checks against local
test masters: complete initial event/amount equality, unchanged repeated import,
retention of a synthetic master-only event, stale-master rejection without a commit
payload, and blocking a same-date different-source hash. Initial commit preparation
matched the plan's complete target. Evidence and the executable verification script
are owner-only under ignored `tmp/m3-gifts/`; real data is not committed.

This is partial M3 evidence, not destination acceptance. Next: select a disposable
canonical destination and its schema/configuration for supported write/readback
verification, and establish the export timestamp meaning using an independent
reference before business acceptance. Existing +9-hour representation was preserved.
No real master was read or changed; rollback requires no operational action.

## TikTok gift export M2: selected-file ingestion verified

Change card: F verification, G evidence; no product implementation or package change.
The owner supplied an existing ZIP, account and request date. Installed
`tiktok-ios-provider@1.2.0` prepared an artifact-hash-bound request and normalized
it from the registry-only Runtime installation. An independent Python ZIP reader
verified every event, grouped amount, recipient, event key, source JSON hash and
unchanged original archive. Private inputs and aggregate results are retained only
under ignored `tmp/m2-tiktok-gifts/`.

This passes the existing-export ingestion path, not iPhone acquisition or the gift
Skill merge. The established timestamp representation adds nine hours and emits
an ISO UTC suffix. Output compatibility was verified; the export timezone and
semantic correctness of that convention were not independently established and
remain an explicit gift M3 acceptance check. No service writes or activation ran.

## Current gate: Monthly M3 workflow verification complete; acceptance review

The approved monthly architecture is implemented and published privately:
`contracts@1.0.0`, monthly Skill `2.0.0`, Lark Base `1.2.0`, BackStage `1.4.0`,
and Runtime `1.2.0`. Runtime uses `tsyringe@4.10.0` only in composition, with
explicit registrations after async initialization and a child scope per run.
Skills and Providers depend independently on `contracts/monthly-activity`.
The monthly Skill archive has no concrete Provider or DI dependency; legacy
service/schema and discovery entries moved to Runtime's temporary compatibility
area with retained callers and a monthly-M3 removal condition.

Change card: primary E, secondary D, with the already-authorized temporary-Base
verification under F. Boundaries are neutral contract ownership, monthly package
dependencies and Runtime composition. No production activation occurred.
There were no parallel workers; the selected monthly change was integrated serially.

Verification:

- Independent registry-only dependency installation and tests: monthly Skill 9,
  Lark Base 101, BackStage 22; Providers run neutral conformance without a Skill.
  The Skill installs contracts as its sole dependency and its archive contains
  no concrete-service schemas/imports. Contracts' four tests passed separately.
- Runtime's 14 owning tests passed, including execution isolation and rejection
  of missing, incompatible or substituted contract dependencies before Provider
  import. After parent adoption, 25 focused integration/caller/DI tests passed.
- The owner-selected June workbook and recorded initial destination values
  produced identical complete dry-run output to Runtime 1.1.0: five rows, four
  changes and one unchanged. Synthetic application/readback also passed.
- Every owning Actions workflow published and verified its inspected archive
  with a fresh registry npm ci. A new local installation of Runtime 1.2.0 from
  the registry (128 dependencies, no source links) passed live temporary-Base
  execution: four changes, confirmed readback, zero subsequent differences,
  and rejection of the stale original plan.
- The first live fixture used bare YYYY-MM text rather than the established
  YYYY/MM/DD destination-cell representation, so matching stopped before any
  update. Restoring the baseline fixture format passed without product changes.
  Both temporary Bases were deleted; the same Provider read then returned
  upstream code 1002 for both resources. Cleanup verification receipts are retained.

Publication/source SHAs and run links are recorded in
[the distribution source map](../../tools/m1-source-repositories.json).
Ignored `tmp/m2-neutral-contracts/` retains publication, independent-install,
same-input, live verification and cleanup evidence. No real source exports, credentials
or real records were committed. The previous published monthly Skill 1.1.0,
Providers and Runtime 1.1.0 remain immutable rollback artifacts; restoring a
code/configuration pin does not reverse external data.

The owner accepted the neutral-monthly completion review (section 15) and
instructed continuation. The installed monthly Skill M3 workflow has now passed
an independent instruction-driven operator run. The operator read the installed
Skill and its schema reference, not product implementation or expected results.
The coordinator checked returned files against the retained independent business
baseline and confirmed unchanged inputs and package integrity.

| Acceptance scenario | Observed result |
| --- | --- |
| Comparison only | Five source records; four changes and one unchanged; no authorization or apply invocation |
| Ambiguous destination | One source account matched two records; failed with ambiguity, partial candidates were not applied |
| Explicitly approved update | Four changes applied once to the isolated test destination; all five record IDs and three metric values verified; zero differences |
| Uncertain write response | One apply invocation; readback established the expected values; reconciled-after-uncertain-response, no resubmission |

These M3 runs use a synthetic in-memory destination and the same owner-selected
June workbook. The fixed Runtime 1.2.0 / Skill 2.0.0 / Provider combination's live
temporary-Base evidence above is reused. The existing Skill regression evidence
covers unconfirmed readback and substituted identity; the installed live check
covers stale-plan rejection. This is not a second claim of new real-service M2
coverage. Apply invocation counts are recorded in the independent operator report;
returned plans, authorization bindings and readback values were separately checked.

Class D/G acceptance package completed: no product source, publication or pin
changes. Registration was limited to the isolated test directory. The first
operator attempts stopped because coordinator-created input files were 0644;
correcting those fixture permissions to the private-file contract's 0600 left
all input bytes unchanged and the scenarios passed. Evidence remains under
ignored `tmp/m3-monthly/`, with the source and package-integrity checks.
Next is owner acceptance of [review section 16](../reviews/v2-foundation-design-ja.md#16-月次skillのm3受け入れ検証結果).
Production cutover remains a separate step requiring its concrete destination,
active invocation/profile and recovery selection. No production registration or
external data was changed by this M3 package.

Parallel M2 readiness was checked read-only by a separate worker:

| Provider | Missing execution selection |
| --- | --- |
| Lark Chat | Selected-user main-message M2 passed with published 1.1.0; two messages across three pages, same-input equality verified |
| Google Drive | Owner-selected development My Drive storage M2 passed: artifact/receipt complete readback, coverage and exact pairing; three created objects removed. Shared-drive and unattended paths remain unverified |
| Money Forward | Selected September preliminary in-app browser read passed; normalized contract/profile validation, receipt-ID lookup and registration acceptance remain separate |
| TikTok Web | Profile target manifest and browser, or the coin-history account/period |
| TikTok iOS | Device/account/target manifest for LIVE, or handed-off gift export with its selected source account/date |

Readiness is not counted as M2 success. Shared interfaces and external mutations
remain serialized by the coordinator.

### Lark Chat M2: selected-user main-message verification complete

Change card: primary B, secondary D/F. The owner instructed the selected-user
integration after the corrected 2025 adapter probe. The Chat-owned operation
matrix and selected adapter now admit explicitly selected users as well as the
existing tenant actor. App/user/tenant checks, scopes, exact-chat authorization,
read-only authority and continuation limits remain enforced. Changes were made
in one isolated Chat Git worktree and integrated serially, without another worker.
The common transport and production profiles were not changed.

`@flair-agency/lark-chat-provider@1.1.0` is published privately from
`ac1e6380f034ce6f83a81bbd1990529094d824d2` through
[Actions run 34178101749](https://github.com/flair-agency/live-agency-provider-lark-chat/actions/runs/34178101749).
The owning workflow verified the inspected archive, private visibility and a
fresh registry npm ci. The isolated local install matched that archive integrity.
The parent submodule and workspace lock record 1.1.0; 1.0.0 and its source remain
immutable rollback artifacts. Runtime's monthly package was not republished.

Verification passed:

- Nine owning tests, including the full user profile → API selection → CLI
  preflight → selected adapter → Provider pipeline with two synthetic pages;
  changed user, missing user scope, different chat/window, thread widening and
  Bot responses are rejected without fallback. The private-boundary check passed.
- Eighteen parent Chat integration and caller/operation-matrix tests, including
  the existing tenant and browser paths. One contract-substitution fixture was
  updated to retain the new user scope alternative while tampering with tenant
  scopes, preserving the intended rejection test.
- A fresh registry-installed 1.1.0 used the same exact owner-selected chat and
  August 20 00:00 through August 23 00:00, **2025 JST**. The real pinned CLI
  1.0.93 verified the selected App, user, tenant and required grants. With page
  size one, the full Provider read three pages (including the terminal empty
  page), returned two unique messages, exhausted pagination and produced a
  matching user-route audit. Every normalized message matched the prior 1.0.0
  adapter result exactly; quality grade A is Provider-assigned, not source truth.

User support follows the pinned official CLI implementation and real read
verification. The older public API document lists only tenant tokens; the
Provider knowledge explicitly records this difference and its additional
[official CLI evidence](https://github.com/larksuite/cli/blob/v1.0.93/shortcuts/im/im_chat_messages_list.go).
The user scope set includes message readonly and group/direct get-as-user grants;
no additional OAuth grant was needed. Reaction enrichment is not requested.

This completes the selected-user **main-message read** M2 scope. The real sample
contains one system notification and one interactive card. Attachment content,
thread expansion and other message types are not newly verified. No service
write, production activation or operational registration occurred. The initial
2026 zero-result probes remain historical evidence; the owner's year correction
resolved that input issue and the UI-comparison question is no longer pending.

Ignored tmp/m2-lark-chat/selected-user retains configuration, installed lock,
publication receipt, complete observation, transport audit and same-input
receipt. Exact chat IDs and message bodies remain outside Git. The temporary
approval-review credit rejection was resolved by the owner's resume instruction;
Git integration and publication subsequently succeeded. No service rollback is
required. The next package is another selected Provider M2; monthly M3 acceptance
and production cutover remain separate pending steps.


### Google Drive M2: development My Drive storage verification complete

The owner authorized creating a test folder in My Drive, following the proposed
artifact/receipt create-read-verify-cleanup workflow. This is an explicit
**development-only override** of the installed Provider's shared-drive routing
instruction; it does not change production storage policy or assert shared-drive
verification. The selected connected account was checked before creating the
folder. Its stable ID and My Drive metadata were bound in the private selection.

Change card: primary F, secondary D/G. Runtime 1.2.0 resolved the installed
`google-drive-provider@1.0.0` / `logs-backup-storage` instruction Binding.
No product source, package publication or production pin changed. The same
installed Provider core performed all content and receipt checks.

Completed interactive connector verification:

- Created one isolated My Drive folder and confirmed it was empty.
- Uploaded the staged 294-byte synthetic logical fixture, checked the exact
  folder, absence of a shared-drive ID and byte count, downloaded complete raw
  bytes and verified equality and SHA-256 against the local artifact.
- Only after that readback, generated and uploaded the Provider's 651-byte
  verified receipt. Full stored-receipt readback matched bytes, SHA-256 and
  receipt_sha256; no preview or metadata-only check supplied proof.
- Relisted the exact folder and verified exactly the created artifact/receipt.
  Provider coverage was covered; inventory returned one verified pair, zero
  orphans and zero invalid receipts.
- Deleted only the two created files, confirmed the folder was empty, deleted
  the folder and verified NOT_FOUND by metadata read. No test objects remain.

The streamed raw-file response returned a sediment reference without a local
materialization tool in this environment. The existing 1.0.0 raw-fetch caller
used its bounded legacy compatibility response for only the 294/651-byte
synthetic files, then hashed the decoded full bytes. This is not proof that the
streamed-file or unattended route works. Folder deletion initially rejected the
folder-form URL before execution; using the same verified ID in the connector's
accepted file-form URL succeeded. No uncertain write was repeated.

This completes the selected **interactive My Drive storage** M2 scope. It does
not verify shared-drive access, unattended backups, real Base export or restore.
Ignored tmp/m2-google-drive retains the explicit selection and owner override,
installed instructions, manifest, readback bytes, receipts, inventory and
cleanup verification. The user-supplied test-destination override required no
additional permission request. The next package is another selected Provider
M2 or a dependent Skill's preparation; monthly M3 acceptance remains separate.


### TikTok iOS gift-history M2: installed handoff route prepared

The owner selected Astra/low and instructed continuation. Primary D, with F
limited to handling the owner's supplied private export. The next bounded
capability is gift-history-snapshot-source/v1: read an already downloaded ZIP
or JSON, bind its hash to the owner-confirmed account/request date, normalize
with the installed Provider, and compare the result to its source. No acquisition
request, device operation, Lark write or gift-master update is included.

Runtime 1.2.0 resolved tiktok-ios-provider 1.2.0 / gift-history from the existing
registry installation; its preparation and normalization exports are available.
The owner was asked for the exact local file path, source account and export
request date. No artifact was selected implicitly and no real normalization has
run. Resume directly from that input; do not repeat installation or prior tests.
Preparation evidence is under ignored tmp/m2-tiktok-gifts. No code or pin change.

## Retained leading M2 technical verification

Leading M2 technical verification is complete for monthly export handoff and
selected-user Lark Base access. Runtime `1.1.0` wires BackStage `1.3.1`, Lark Base
`1.1.1` and transport `1.0.0` through their existing public APIs. Runtime owns
file/profile/transport composition; business rules remain in the Skill and
service validation remains in Providers. Exact package version/export selection,
resource confinement and explicit CLI profile/home selection are enforced.

All 16 focused Runtime/monthly tests passed, including existing instruction
resume/replay checks and new composition/selection rejection tests.
[Actions 34123772742](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34123772742)
published PRIVATE Runtime `1.1.0` from `4a6259a57eab3b199c0b5df25b94632c91f649e9`.
A fresh registry installation (126 dependencies, no source links) and the pinned
CLI `1.0.93` native binary executed the installed monthly CLI against another
owner-authorized temporary Base using the selected June workbook:

- Dry run: five rows, four exact changes and one unchanged row.
- Apply: the recorded unchanged plan and bound authorization produced confirmed
  readback; the following dry run showed zero differences across all five rows.
- Reusing the original plan after application failed before another update.
- Cleanup: the created Base was deleted, and the previously successful Provider
  API returned `1002`, `note has been deleted`.

Installed Runtime integrity matches its publication receipt. Evidence, private
configuration, source reference, plans/results and cleanup receipts are retained
under ignored `tmp/m2-leading/runtime/`. Parent source pin and development lock
adopt this combination. Previously fixed Skill dependencies may retain older
nested Provider copies for their existing interfaces; the tested Runtime selects
the new top-level versions explicitly. Operational Skill registration and
production configuration were not changed. Reverting the Runtime pin returns
to the previous foundation version; both temporary verification Bases are gone.

The [Japanese completion review, section 13](../reviews/v2-foundation-design-ja.md#13-先行m2完了レビュー)
records the scope and remaining limits. The adopted plan requires readiness
review at this point before releasing parallel M2 work. Recommended next stage:
monthly-activity M3 preparation and independent M2 work, with shared changes
integrated serially. Browser acquisition, iPhone operation, other Principal modes
and other Lark capabilities retain their own M2 evidence requirements. This is
not production Skill acceptance.

Change class B/D: Runtime composition and adoption of the verified Provider
combination; baseline parent `11accb8`, Runtime `e179e31`. No new service
permission or production authority was introduced by the composition change.

## Completed leading Provider checks and Runtime integration preparation

Lark Base monthly capability passed seven real-service checks on a temporary
Base with three synthetic records: reads and month selection, exact update and
readback, untouched account/month, approval/binding rejection, stale-value
conflict and replay rejection. A rich-text metadata bug in `1.1.0` was reproduced,
fixed and covered by a regression; all 100 Provider tests passed.
`lark-base-provider@1.1.1` was published PRIVATE by
[Actions 34121826927](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34121826927).
The fresh registry installation matched publication integrity and passed live
checks with `lark-transport@1.0.0` and explicitly selected CLI `1.0.93`.
The temporary Base was deleted; the same Provider API then returned code 1002,
`note has been deleted`. Evidence and the one-off driver are retained in ignored
`tmp/m2-leading/lark-base/`. Parent pin and development lock adopt source
`b83e7690d5db625322304f65ce8c1ebf6823c32b`; Runtime/Skill published pins remain
unchanged. The direct Provider driver is verified; installed Runtime composition
must still adopt the tested combination before leading M2 can close.

The final OAuth response included Base and the previously observed Chat/Mail
scopes; earlier token-scope blockers below are historical. No additional broad
scope request was issued after the approval-review rejection.
The owner-selected June 2026 workbook was located through Drive metadata and
its synchronized local file (size matched; independently read workbook values
matched the connector preview). The preserved source has a leading filename
space and a second exact 19-column ordering with Incremental revenue incentive
last. BackStage `1.3.0` rejected that observed layout before producing output.
`1.3.1` supports both exact known orders and ignores only outer filename
whitespace; unknown ordering and internal filename changes remain rejected.
The source knowledge profile is now `backstage-activity-export/2026-09-07.1`.

All 21 BackStage tests passed. All five real workbook rows matched expected
monthly metrics and whole-minute conversion; independent XLSX XML/decimal
extraction confirmed every promoted metric. Wrong-month input was rejected.
[Actions 34122945884](https://github.com/flair-agency/live-agency-provider-backstage/actions/runs/34122945884)
published PRIVATE `1.3.1`; a fresh source-free registry installation produced the
same normalized snapshot, rejected the wrong month, and matched publication
integrity. Parent source/lock adopts the published revision; data, source hash,
normalized snapshot and installation receipts remain in ignored
`tmp/m2-leading/backstage/`.

Leading Provider checks have now run sequentially: Lark Base temporary-resource
read/update/readback, then BackStage actual-file normalization. This verifies the
export handoff path; live browser acquisition and instruction-based observation
remain unverified. No additional Lark writes occurred for the BackStage file.
Next: wire the verified Provider interfaces and versions into installed Runtime
monthly composition, verify that combination, then review the leading-M2 gate.
The current CLI's fixture-oriented factory loading is not proof of real Provider
composition. Other M2 execution and the first M3 remain behind that gate.

Change class B/D: Provider normalization and real-service verification. Production
resources were not used. Reverting the child pin restores the known rich-text
bug; the temporary verification resource has already been removed.

## Historical M1 completion and initial M2 preparation

The owner requested the next foundation work. Registry update/rollback and
coverage verification are now complete for all 16 published packages: five
libraries, seven Providers, three adopted Skills and Runtime.

Runtime `1.0.1` adds `live-agency --version`, reporting the invoked package
independently of the caller's working directory. Thirteen focused Runtime and
monthly CLI tests passed. [Actions run 34118777184](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34118777184)
passed fixed registry dependency installation, eight owning tests, archive
preflight, PRIVATE publication and independent npm ci/import verification.

An isolated development destination exercised Runtime `1.0.0 → 1.0.1 → 1.0.0`
using saved exact registry manifests/locks and npm ci for each switch. All 16
production package identities resolved from GitHub Packages without source links;
two existing local tarballs supplied only synthetic test fixtures. Every phase
resolved 86 resources and imported 54 modules, produced the same two-account
plan (one change, one unchanged), applied the exact synthetic approved plan and
confirmed readback. Rollback restored all 16 package versions and the original
lock SHA-256 `2ba3af5b4266f2a53abc1218c229c79a38c97931ee3e6e6eaca7c0d67865635d`.
The isolated recovery destination finishes on `1.0.0`; owning development source
and latest published Runtime are `1.0.1`. No production registration/configuration
or external service operation was performed.

Evidence: `tmp/m1-foundation/registry-recovery/` contains A/B manifests and locks,
phase receipts, publication evidence and source identity. Parent baseline before
this work was `66ab171`, Runtime `07f40cd`. No inherited changes were discarded.

The owner approved the 16-package completion scope and progression to leading
M2. **M1 is complete.** Remaining Skill names, business specifications and
individual distribution move to each Skill's M3 preparation; they are not
cancelled or accepted by this foundation result. The weekly prototype remains
frozen, maintenance decomposition deferred and the foreign-revenue split open.
The decision is adopted in [the plan](v2-plan.md) and
[Japanese scope review, section 12](../reviews/v2-foundation-design-ja.md#12-m1完了範囲の確認今回のレビュー対象).

Leading M2 is started with local environment and adapter inspection. Scope:
Lark Base monthly-activity fields/records, normalization, bounded updates and
readback; then BackStage acquisition and normalized result transfer. Record
real-service results separately from the existing synthetic evidence. The next
execution input is an explicitly selected development Base/table and Principal;
reference profiles and historical production receipts do not select them.
No real service request or mutation has been performed in this step.

Inspection confirms that Lark Base `1.1.0` exports
`createLarkBaseCreatorMonthlyActivityProvider`, which accepts selected profiles,
immutable Base/table/field bindings and injected transports. Read capability
uses `fields:list` and `records:search`; updates use a separate
`records:batch-update` selection. The shared transport supports explicit API or
pinned CLI composition. The M1 monthly CLI currently loads `module.create` and
its existing fixtures; selecting the real named Provider factory and credential
transport still requires Runtime composition for M2. Do not treat the synthetic
CLI receipt as proof that this real connection is already wired.

The owner supplied the organization, App ID and named user, and authorized a
new or copied temporary Base plus cleanup. The selected existing CLI profile
matches the App ID; server verification confirms the named user, Open ID and
tenant key. Exact user-ID mapping requires the contact basic-profile scope.
Actual selectors and identifiers remain outside Git.

A dry run confirms Base creation with a five-field monthly table is available.
Cleanup preflight reports missing `space:document:delete`; self-ID lookup reports
missing `contact:user.basic_profile:readonly`. The owner completed the two-scope authorization. The resulting token omitted
previously observed Base scopes; creation dry-run failed before resource creation.
A corrected authorization explicitly requests the required Base create/schema/
record scopes, bitable access and the two additions together. Automatic approval
review rejected restoration of the wider historical Chat/Mail/Docs scope set
as beyond the explicitly approved scope; that restoration was not performed.
Current token verification does not show those previous unrelated workflow
scopes. The pending request is limited to this M2 task. No new Base exists. No Base has
been created and no business records have been accessed or changed. The live
auth check exercised refresh of the existing user authorization successfully;
it is connection evidence, not a completed Provider behavior test.

After authorization, create the temporary Base with synthetic records, bind its
actual table/field IDs and the verified actor to the installed Provider, test
read/normalization, an exact bounded update and readback, then delete the created
Base. Use Lark Base before BackStage; other real M2 execution remains gated.

Change record: class D (migration scope/status), following owner approval;
parent baseline `0323aeb`. Preserve the 16 published versions and existing
production installation. Only documentation changes are adopted at this
checkpoint. Other real M2 execution remains behind the leading-M2 gate.

## Completed correction: Provider-owned capability contracts

Owner approved the corrected dependency direction in this task. This supersedes
consumer-owned Provider contracts and the pending section 10 Actions grant request.

- Primary class E; secondary D. Boundaries: Provider interfaces, three Skill
  consumers, Runtime composition and package distribution.
- Invariants: Providers have no Skill dependency; TikTok has no Lark dependency;
  business matching/approval/readback remains in Skills; explicit authority,
  instruction handoff and uncertain-write handling remain unchanged.
- Work package: move capability validation to the owning Providers, wire consumers,
  preserve business checks, verify synthetic behavior and isolated packed installs.
- Next gate: passing distribution graph and archive tests before publishing new
  immutable versions; derive Actions Read grants from the corrected graph.
- Rollback: parent `77b40a4` and its child commits; no live service operation or
  production registration. Previously published versions remain immutable.
- Parallel agents: none. One coherent dependency correction is implemented locally.


Updated: 2026-09-07. Scope: development source and documented evidence. The leading-M2 entry above is the current queue. Subsequent checkpoints and archive documents retain historical outcomes and do not issue new work.

## Current correction checkpoint

Implementation is adopted: Provider-owned pure capability exports, consumer wiring,
profile destination validation separated from acquisition, and explicit Runtime
composition. All 701 full-suite tests and public-content checks passed; four
additional CLI import/direct-invocation regressions pass. Provider dependency
closures exclude Skills and Runtime, and the component graph is acyclic.
The retired Runtime monorepo lock was preserved under ignored evidence and
replaced by the current standalone registry lock after all selected Skill versions
were published. The parent development lock is current. Unmigrated consumers retain their existing released pins; older dependency trees in the development workspace are not the corrected M1 distribution graph.

Actual tarball installation passed for each TikTok Provider and the 14-package
Runtime graph (84 resources, 52 module imports). Import processes exited zero.
The new archive gate detected two existing unguarded CLI entry points before
publication; guards and direct-invocation tests were added. No failed archive
was published. GitHub Actions subsequently published and independently installed:

| Package | Version | Successful Actions run |
| --- | --- | --- |
| lark-base-provider | 1.1.0 | [34110946319](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34110946319) |
| backstage-provider | 1.3.0 | [34112985447](https://github.com/flair-agency/live-agency-provider-backstage/actions/runs/34112985447) |
| tiktok-ios-provider | 1.2.0 | [34110959692](https://github.com/flair-agency/live-agency-provider-tiktok-ios/actions/runs/34110959692) |
| tiktok-web-provider | 1.1.0 | [34112991119](https://github.com/flair-agency/live-agency-provider-tiktok-web/actions/runs/34112991119) |

Both actual TikTok registry locks contain only the Provider, private-files and
provider-protocol. Their source-free npm ci/import checks passed. Receipts,
registry locks and local evidence are under
`tmp/m1-foundation/provider-contract-revision/`.

The owner reconfigured Read grants. All three Skill workflows succeeded on
attempt 2, including the complete private-dependency access check, source tests,
archive preflight, PRIVATE publication and independent registry npm ci:

| Package | Version | Successful Actions run |
| --- | --- | --- |
| gift-history-merge | 1.1.0 | [34113319327](https://github.com/flair-agency/live-agency-gift-history-merge/actions/runs/34113319327/attempts/2) |
| creator-profile-record | 1.1.0 | [34113325345](https://github.com/flair-agency/live-agency-creator-profile-record/actions/runs/34113325345/attempts/2) |
| creator-monthly-activity-reconcile | 1.1.0 | [34113331350](https://github.com/flair-agency/live-agency-creator-monthly-activity-reconcile/actions/runs/34113331350/attempts/2) |
| live-agency-runtime | 1.0.0 | [34115333844](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34115333844) |

Runtime's standalone registry lock is now generated and committed at `07f40cd`.
Its independent source setup installed 121 dependencies and passed seven Runtime
tests. Its Actions checked every private dependency, published the inspected
archive and verified independent registry installation. No Read grant blocks
this release chain. The owner reported the permission reconfiguration; remote
removal of each obsolete entry was not independently read back.

A fresh development installation obtained Runtime and all application/Provider
packages from GitHub Packages (122 packages including Runtime). Archive integrity
matched all eight changed package receipts. Fourteen internal packages resolved
84 declared resources and imported 52 modules. Two existing synthetic fixtures
were installed from local tarballs without source links; they are test support,
not published production packages.

The current Codex task read the installed test Skill and invoked the installed
Runtime CLI using explicit development paths. A synthetic two-account dry run
returned one change and one unchanged row. The exact reviewed plan was applied
to the in-memory destination and readback confirmed it. The instruction path
returned interaction-required, resumed successfully, and rejected replay with
EEXIST. This verifies explicit-path client invocation; no host-wide Skill catalog
registration or production configuration was changed. Evidence is under
`tmp/m1-foundation/provider-contract-revision/development-client/`.

The dependency correction and this registry release chain are complete. M1 as a
whole was still open at this checkpoint. The subsequent registry update/rollback
and complete published-package coverage are recorded above; only the outstanding
Skill scope decision remains at the current M1 gate. Earlier local archive A/B/A
evidence remains distinct from the subsequent registry-based recovery. The unadopted
Skill naming/responsibility decisions retain their scope. Do not start real M2
service operations from this synthetic result or claim M2/M3 acceptance.

## Earlier M1 delivery checkpoints (superseded queue)

The approved M1 implementation is recorded at parent `e1060d9`; Skill repository naming was adopted at `4560e71`. Primary class E, secondary C/D. The full adopted suite passed 689 tests again after moving cross-owner legacy tests to the parent. Five library repositories also passed standalone installation/tests without the parent workspace. The offline checkpoint covered 30 archives, 119 resources, 72 imports and Runtime update/rollback; its 379-file source comparison is evidence for that checkpoint, not a comparison against subsequently changed package metadata.

Seven approved PRIVATE repositories were created: the parent, five common libraries, and the monthly Skill. Library sources are pushed. All five library npm publish steps succeeded using their owning Actions `GITHUB_TOKEN`: cli-utils `0.1.0`, row-archive `0.1.0`, and lark-transport/private-files/provider-protocol `1.0.0`. The original runs failed after publishing because verification assumed a `repository` property absent from the GitHub Packages REST response. The repaired verifier checks private visibility/organization through REST and the declared source URL through npm metadata, compares archive integrity, performs independent installation and `npm ci`, and imports exported modules. It verifies the published source declaration; it does not claim an independent readback of GitHub's repository-link settings. Read-only workflows recover verification without republishing immutable versions.

The cli-utils recovery run [34096906145](https://github.com/flair-agency/live-agency-cli-utils/actions/runs/34096906145) passed. All five read-only verifications passed: lark-transport `34097019408`, private-files `34097019372`, row-archive `34097019246`, provider-protocol `34097018976`, plus the cli-utils run above. Evidence receipts and registry installation locks are retained under ignored `tmp/m1-foundation/registry/` with all five downloads complete. Exact library source commits are in the parent pins and source mapping. The monthly source and registry dependency lock are pushed at `98859fd`. A fresh local installation using the owner-configured npm login passed fixed-version installation and `npm ci` for all five libraries, all nine public module imports, and the monthly Skill’s nine standalone tests against its three registry dependencies. Local receipts and the five-library lock are under `tmp/m1-foundation/registry/local/`. Monthly Actions run [34098102833, attempt 2](https://github.com/flair-agency/live-agency-creator-monthly-activity-reconcile/actions/runs/34098102833/attempts/2) succeeded after the owner added the three package read grants: dependency installation, nine tests, PRIVATE publication of `@flair-agency/creator-monthly-activity-reconcile@1.0.0`, archive integrity comparison, independent `npm ci`, and seven exported module imports all passed. A second isolated local installation of the published Skill matched the Actions integrity and passed the same nine synthetic application tests through public package exports. Receipts, locks and the local published-package test output are under `tmp/m1-foundation/registry/monthly/`. This is package/foundation verification, not real-provider M2 or Skill M3 acceptance. The parent GitHub source repository has not received its initial push. The earlier library/monthly checkpoint did not change Runtime/Provider remotes; the subsequent five-Provider adoption is recorded below. Remaining proposed Skill repository names are unchanged.

**M1 is not complete.** The owner configured a 90-day PAT (classic) using `npm login`; local npm package read access is now verified. The separate gh credential previously lacked package read scope; npm login does not change gh authentication. Consuming Actions repositories need package read grants under Manage Actions access before using their own `GITHUB_TOKEN` for private dependencies. No token value has been requested in task messages. See the [registry authentication plan](v2-plan.md). Five Providers are now prepared in isolated owning Git Worktrees and adopted by fast-forward: Lark Base, BackStage, Google Drive, Money Forward Cloud Expense and Lark Chat. All five existing GitHub repositories were verified PRIVATE and their main branches were ancestors of the adopted sources. Publication manifests, exact registry locks, credential-free scope config and dispatch-only publish/verify workflows are pushed. Standalone tests passed 152 cases (99/17/7/25/4 respectively). Lark Chat’s 15 cross-owner MCP integration tests moved to the parent, retaining the existing assertions; the adopted full suite still passes all 689 tests. The five installed tarballs resolved 23 declared resources and six exported modules. The resource verifier now canonicalizes its installation root so macOS `/var` aliases are compared consistently with real paths; resource confinement remains enforced. Evidence is under `tmp/m1-foundation/provider-preparation/`. The subsequent publication checkpoint below supersedes preparation-only delivery status; no real service operation was run.

The owner added the required Actions Read grants. Lark Base was published and verified first; the other four independent publications then succeeded. All five workflows passed dependency installation, their 152 standalone tests in total, PRIVATE publication, integrity comparison and independent registry `npm ci`. Published versions: lark-base `1.0.0`, backstage `1.2.2`, google-drive `1.0.0`, moneyforward-cloud-expense `1.5.0`, lark-chat `1.0.0`. A fresh local registry-only installation also passed `npm ci`, matched all five Actions archive integrities, resolved 23 declared resources and imported six exported modules without source links. Per-package Actions receipts and locks, run URLs and the local installation receipt are under `tmp/m1-foundation/registry/providers/`; source mapping records publication URLs. This brings actual private registry delivery to eleven packages (five libraries, monthly Skill, five Providers). Use read-only verification for these immutable versions; do not replay successful publication.

The following Actions Read grants are now verified by actual dependency installation:

| Package | Actions repositories needing Read |
| --- | --- |
| cli-utils | live-agency-provider-lark-base |
| creator-monthly-activity-reconcile | live-agency-provider-lark-base |
| lark-transport | live-agency-provider-lark-base; live-agency-provider-lark-chat |
| private-files | live-agency-provider-lark-base; live-agency-provider-moneyforward-cloud-expense |
| provider-protocol | live-agency-provider-lark-base; live-agency-provider-backstage; live-agency-provider-google-drive; live-agency-provider-moneyforward-cloud-expense |

All repositories and packages above belong to `flair-agency`. The grants include transitive registry dependencies found in each verified lock. No further permission action is pending for these five Providers.

The owner adopted the two remaining TikTok consumer names in [foundation review section 9](../reviews/v2-foundation-design-ja.md#9-tiktok-providerの依存先2件正式名の確定案). `skills/live-agency-gift-history-merge` publishes `@flair-agency/gift-history-merge@1.0.0`; `skills/live-agency-creator-profile-record` publishes `@flair-agency/creator-profile-record@1.0.0`. Both matching Private repositories exist. Their exact registry dependency locks and standalone tests pass (9 and 15 respectively); two shared-fixture discovery cases moved to the parent and still pass. TikTok iOS/Web now reference these adopted `./contracts` package exports. No business scope or real-service authority was broadened.

Runtime has an explicit `live-agency install-skill` command requiring an installation root, exact package version and destination directory. It verifies exported instructions and Skill/repository provenance, rejects source links or conflicting directories, and requires explicit replacement of a same-provenance link. Seven new tests pass. A registry-installed monthly Skill passed dry-run, isolated directory installation and repeat verification using this command. This was a synthetic client directory, not actual Codex registration/discovery. Parent-relative MCP/development commands moved to parent `runtime:*` scripts, with their existing sources retained outside the Runtime tarball. The shared-fixture monthly CLI tests moved to the parent; Runtime's own `npm test` now selects its unit tests. The adopted full suite passes 696 tests; public-content checks pass. Evidence is in `tmp/m1-foundation/final-chain-preparation/`.

The owner completed the original two-Skill Actions grants. Profile Skill `@flair-agency/creator-profile-record@1.0.0` publication and verification passed in [run 34102388058](https://github.com/flair-agency/live-agency-creator-profile-record/actions/runs/34102388058); its local registry dependency installation matched the Actions integrity and all nine resources/eight module imports resolved. Evidence is under `tmp/m1-foundation/registry/live-agency-creator-profile-record/`.

Gift Skill `1.0.0` was published in [run 34102387709](https://github.com/flair-agency/live-agency-gift-history-merge/actions/runs/34102387709), but post-publication import verification found an undeclared `@flair-agency/lark-base-provider` dependency in `sync_gift_projection.mjs`. Do not select that incomplete version. The corrected `1.0.1` declares the existing Lark Base dependency; its nine tests and exact archive installation/import verification pass locally. TikTok iOS now pins gift `1.0.1`. The publication template and pending gift/TikTok/Runtime workflows now install and import the inspected archive before publishing. The actual incomplete `1.0.0` archive was rejected by that new preflight in a regression check. No published version was replaced or deleted. All 696 project tests still pass.

TikTok Web now has a registry dependency lock; its nineteen standalone tests and archive preflight pass against the published profile Skill. GitHub source commits are pushed. The corrected gift version needs additional Actions Read grants for lark-base-provider, lark-transport and creator-monthly-activity-reconcile. The [consolidated settings list](../reviews/v2-foundation-design-ja.md#10-actions読み取り設定依存修正に伴い旧一覧を撤回) includes these and the upcoming TikTok/Runtime grants for existing packages, derived from their complete dependency graph. The owner has been asked to add that list; completion has not yet been received. No new PAT scopes are needed. TikTok's own two package-to-Runtime grants can be added after those packages exist.

That release order and the previous grant list are superseded by the Provider-owned correction above. Gift `1.0.1` was not published; the selected correction is `1.1.0`.


Rollback: pre-M1 baseline remains parent `8dcc6af` with its child pins. Preserve already published immutable versions; workflow fixes do not replace package contents. No production registration, live Lark operation, browser/iPhone operation, or package visibility change was performed. No inherited changes were discarded.

## Historical baseline and adopted decisions

The owner subsequently authorized source-repository separation. Runtime, seven Providers, operations MCP, sixteen Skills and five shared libraries are now sibling repositories under the parent (30 component repositories). Skill histories were extracted from the previous repository; current source changes and focused tests were carried into the new owners. The complete prior Runtime tree, nested Git metadata and dirty state remain under `tmp/repository-restructure/runtime-before/`. The parent development workspace supplies local dependencies; this is not a single Skill Git/release repository. New repository remote publication and committing inherited unrelated changes are not claimed complete.

Local restructuring verification completed: the parent dependency installation succeeded offline with lifecycle scripts disabled; the parent test run passed all 1,743 tests; public-content checks passed; dry-run package payload checks passed for all 16 Skills and five shared libraries; 642 relative documentation links resolved. These checks do not establish registry deployment or live Provider/Skill acceptance. This is the earlier restructuring checkpoint. The subsequent pre-M1 disposition has adopted selected component commits; new repository remotes still require configuration before remote recursive checkout.

Documentation organization completed at parent commit `6e9b1d9`, including retirement of fixed caller snapshots. The owner subsequently approved the three-stage revised plan and recommendations D1, D2 and D3: consumer-owned contracts with selective extraction, the current local Codex as the first development client, and monthly activity as the first Skill acceptance target. The [English canonical plan](v2-plan.md) now includes Skill naming and foreign-revenue migration; Japanese documents retain review history. Concrete target names, exports and responsibility mappings remain the first D1 deliverable, not completed implementation.

Local source restructuring is complete; Stage 1 registry deployment/client connectivity is not. The next work, when instructed, is to classify uncommitted changes by purpose and present selective rollback/roll-forward recommendations (rollback by default for unadopted work), preserve necessary approved restructuring, and establish recorded source versions before M1. M1 builds the foundation; the leading M2 verifies monthly-activity Lark Base and BackStage requirements sequentially. Only after that gate and common fixes may other M2 tasks run alongside monthly-activity M3. The owner has now instructed execution. Pre-M1 source-disposition work has started; the [concrete disposition proposal](../reviews/v2-source-disposition-ja.md) was approved and applied. Required restructuring and the selected monthly-activity chain were adopted; other uncommitted additions were preserved and rolled back. All 30 component versions are recorded. M1 implementation, publication, host activation and production operations have not run. Package/selected-avatar details not explicitly adopted remain scoped to their owning reviews. Old avatar-first and insight-repair-first queues remain superseded.

The [work risk assessment](v2-plan.md#work-risks-and-assessment) separates shared baseline/foundation risks from consumer/Provider defects. Mitigation outcomes and residual risk are not yet verified. This conversation coordinates work and milestone reviews; the earlier documentation feedback did not start a worker. Execution now includes one completed read-only Runtime audit worker alongside coordinator inspection; the approved source dispositions have now been applied; no M2 execution has started.

The owner also approved removing completion/deployment of the entire `mcp/operations` package from M1. Preserve its sources; include required business/interface, Provider and resolution code in the purpose-based adoption review and move adopted behavior to its owners. M1 verifies an existing CLI/runner path or only the minimal MCP adapter needed by the client. Full domain-MCP expansion is deferred until concrete post-migration use warrants it. No existing MCP process was disabled, source removed or code moved by this decision. The selected end-to-end client path and absence of hidden dependencies on the deferred package remain unverified.

## Inherited evidence and remaining work

| Area | Recorded result | Remaining limit |
| --- | --- | --- |
| Source separation | SEP-1 independent development source/Git/dependencies accepted; this parent and Runtime submodule exist locally | Directory separation does not establish host authority isolation; app Git classification is not authoritative |
| Host evaluation | SEP-2 post-restart catalog retained 45 denied Skills; bounded routing/local execution passed | Historical catalog evidence is neither credential revocation nor proof of current enforcement; no new host test was run |
| Packages | RLS portable instruction route and representative offline full coin payload/install checks are recorded | Not complete Runtime/all-Skill package deployment, registry availability, publication or development-client connectivity |
| Selected Lark callers | Core/factory, gift, activity, backup and several observation/compaction families have recorded local conformance | Partial media, invitation mutation and coordinated maintenance remain; no blanket CP1 completion |
| LIVE standalone compaction | Accepted offline executor record: 217 distinct tests (72 new +145 retained) | Coordinated maintenance and unrelated media remain separate; no live execution proof |
| Invitation compaction | Non-avatar selected preparation: 508 distinct tests (68 direct +440 affected) | Avatar preparation, selected deletion/restore and authenticated CLI loader remain held as documented |
| Profile/metric compaction | Recorded 313 and 407 distinct local tests respectively | Coordinated deletion lacks the owning execution handoff; do not add an unrelated archive/media requirement |
| Operational health | User reported some broken Skills; earlier reports identify insight actor selection, invitation ambiguity and missing daily backup | Not freshly reproduced; full failure scope and current production health are unknown. Old versions are not presumed valid rollback |

These counts are inherited evidence, not tests rerun by this documentation task. The [previous handoff](../archive/v2-task-handoff.md) and [coordination record](../archive/environment-cleanup-coordination.md) link exact conditions and source-specific checkpoints. Saved caller snapshots and migration-status equality assertions were retired by additional owner approval. On-demand lexical investigation and independent discovery/API-contract checks remain; snapshot mismatches are not a migration or documentation blocker. Current documentation validation is recorded in the [approved audit record](../reviews/documentation-audit-ja.md).

## Temporary constraints and applicability

| Constraint | Applicable target and basis | Status / release condition |
| --- | --- | --- |
| Execution started: pre-M1 disposition review | Owner instructed execution of the adopted plan | Audit complete; review the concrete rollback/roll-forward proposal before applying source dispositions. Then proceed to M1 design; parallel M2 remains gated by leading-M2 success |
| No ambient production selection | Development's protected operations; explicit-selection contracts | Applies per operation. Require selected environment/profile, actor, resources and allowlist; do not infer authority from available tools or credentials |
| SEP candidate blanket shutdown/evaluation path | Historical SEP-1/SEP-2 candidate evaluation | Retired as a standing AGENTS instruction. Actual host isolation remains unverified; evaluate only the authority needed for a separately scoped integration. No automatic separate-host requirement or repeated approval is introduced |
| Selected media and coordinated execution | Owning incomplete caller contracts | Active only for those paths; release conditions are in [plan gates](v2-plan.md#applicable-gates-and-release-conditions) and owning contracts |
| Repair-first / avatar-first old queues | Superseded coordination instructions | Not active; do not dispatch from an archived next-action paragraph |

Machine-specific config/runs/fixtures values and the reserved SEP evaluation path are historical provenance in [SEP-1](../archive/environment-separation-sep1-brief.md). Use [existing Runtime configuration inputs](../../runtime/docs/configuration.md) with explicitly supplied private locations. No new configuration mechanism, host path, active default or isolated Codex home is asserted.

## Source and verification boundary

Work from this parent repository and its existing `runtime/` submodule, never the old sibling checkout. Preserve each affected repository's pre-existing changes and index distinctions. The subsequent source restructuring authorized local component repositories and extracted histories, while preserving the originals. Remote repository creation, push, package publication and production mutation were not performed. A local component checkout with dirty implementations is not a reproducible released pin.

## Pre-M1 source-disposition checkpoint

Class G audit supporting the planned baseline adoption: inspect source purpose without changing component behavior, HEADs or index distinctions. Coordinator owns parent/Skills/Providers/common libraries; the bounded Runtime reader used `gpt-6-astra` / `low`. The other v2 coordinator was observed stopped. No external service operation or test was run.

31 repositories produced 510 status records including parent gitlinks. Current staged/unstaged patches, index files and untracked contents are retained under `tmp/v2-source-disposition/snapshot/`; file-level classification is `tmp/v2-source-disposition/changes.csv`. Required approved restructuring is separated from inherited v2 additions and old package experiments. The review recommends selective adoption of the monthly-activity chain and rollback of unadopted additions with their dependencies, after preservation. Source dispositions are applied and component commits recorded; independent reproduction of parent `2170115` and all 30 pinned components passed below.

The audit found three restructuring follow-ups: the provider resource-prefix check changed from `./` to `.`, two new library HEADs tracked node_modules links, and the backup test command retains old paths. Existing Provider/MCP origins and parent URLs point to local SEP bundles, not GitHub; remote-source setup remains necessary. The earlier passing test count did not establish these properties. The owner approved those dispositions. The adopted suite passed 662 tests, public-content checks passed, and 21 Skill/library dry-run payload checks passed. Removed additions and qualification files remain under the ignored preservation area. New component versions are in `tmp/v2-source-disposition/adopted-commits.json` and parent submodule pins. Independent reproduction passed: a fresh checkout with explicit local submodule URL overrides, offline npm ci without lifecycle hooks, 662 tests and public-content checks. The reproduced source tree is clean. This does not verify remote GitHub retrieval or registry-only deployment. The parent baseline is `2170115`; reproduction details remain under `tmp/v2-source-disposition/reproduction.json`. The [M1 concrete design](../reviews/v2-foundation-design-ja.md) is now ready for the planned design review; its specific names and interfaces are proposals, not implemented APIs.

## Project status organization — owner-selected, 2026-09-08

Change card: class G with scoped external Project metadata updates. The owner adopted Todo, In Progress, Blocked, Awaiting Review, Ready for Acceptance and Done. Reclassify the 25 existing Project items from recorded evidence, preserve all dated evidence and completed scope, and put the next action and waiting reason first. No implementation, release or operational authority is added. Verify exact field options, all item states/bodies and unchanged item identities. Recovery uses the saved before-state under ignored tmp/v2-project/. No parallel work.

Verified Project readback: Todo 12, In Progress 0, Blocked 8, Awaiting Review 4, Ready for Acceptance 0, Done 1. Existing option IDs, all 25 item identities and original bodies were preserved. Each body now starts with its current status, next action and waiting reason. In Progress is reserved for active work; a completed preparation step alone does not qualify. Awaiting Review requires a concrete review package. Ready for Acceptance requires actual acceptance prerequisites, not merely synthetic success. No item was promoted to Done without its completion evidence. No source or production change ran.

## Monthly M3 owner acceptance — 2026-09-08

The owner explicitly approved the presented section 16 acceptance with LGTM. Monthly Skill 2.0.0 / Runtime 1.2.0 M3 is accepted within the documented instruction-driven synthetic scenarios and reused fixed-package live temporary-Base evidence. The monthly Project item is Done. Production registration, cutover and schedule changes remain separate. Class G tracking-only update; prior evidence and unrelated edits are preserved. No source or operational action is authorized by this acceptance record.

## Gift M3 acceptance scope approved — 2026-09-08

The owner approved the presented scope with LGTM: novel-event additions, corresponding summary updates and readback are required before gift M3 completion. Comprehensive all-pivot reconciliation and derived Lark projections are excluded from this acceptance scope. Export acquisition remains a human task; production cutover remains separate. Existing section 19 evidence is retained. The Project item returns to Todo for the additional verification, not Done. Class G tracking-only update; no source change or external business operation ran. Scope approval does not select an actual write destination or change production authority.

## Scouting vocabulary adoption — 2026-09-08

Change card: class G, documentation only. Adopt the owner's approved vocabulary
in the English domain model and retain the Japanese review history. Preserve
platform-versus-agency authority, unknown observations, existing contracts and
historical data. Definition of done is matching definitions and valid local
links with a scoped diff review. No parallel work, component change or external
operation is selected. Recovery is removal of only this documentation addition.
At that checkpoint the next package was invitation contract owner review;
the subsequent approval is recorded below. Verification:
scoped diff and whitespace checks plus local link/anchor inspection; no runtime
tests are needed for this documentation-only adoption.

## Invitation contract direction approved — 2026-09-08

Class G documentation and previously authorized Project tracking update. The
owner approved the three presented rules with LGTM: eligibility-only new input,
no conversion of not-found/unavailable to ineligible, and preservation of legacy
history pending meaning inspection and any necessary migration proposal. Adopt
these rules in the domain model and Japanese review record; return the invitation
recording item to Todo for implementation and acceptance. Preserve other Project
items and historical evidence. Verify the scoped diff, links and exact Project
readback; recovery uses the saved before-state in tmp/v2-project/. No component,
live business data, package name, release or operational route changes. Next:
present the final queued owner review on backup retention scope. No parallel work.

## Backup retention scope approved — 2026-09-08

Class G documentation and authorized Project tracking. The owner approved the
presented planning-only scope and target Skill name with LGTM. Record the
selection in this canonical status and Japanese review history, return the
retention item to Todo for implementation alignment and installed acceptance,
and track deletion execution separately. Deletion requires its own approval,
immediate pre-execution reconciliation and result verification; this decision
does not select storage resources or authorize deletion. Existing safety and
recovery protection rules remain intact. Verify exact Project readback,
unchanged unrelated items and the scoped documentation diff. Before-state is
saved under tmp/v2-project/ for metadata recovery. No component or operational
changes, no parallel work. The four queued owner reviews are resolved; remaining
implementation and acceptance work is not thereby complete.

## Development Bases created — 2026-09-08

The owner subsequently selected a newly created development-only App. Its named CLI profile was registered without switching the default profile. After the owner enabled the missing create scope, bot creation and exact ID/name readback succeeded for separate development and recovery-test Bases. Private creation/readback receipts are retained in tmp/v2-project/. This supersedes the earlier scope blocker. Both Bases have default initial schemas; workflow schema setup, Provider profile binding and acceptance remain outstanding. No production resources or operational routes changed. Automatic owner access grants were skipped because this App has no logged-in user identity; bot access was verified. No retry or deletion was performed.

## Active development verification window — 2026-09-08

Owner selected one hour starting 09:35:06 UTC. Class F/G: selected development App and Base only, create synthetic schema resources, bind immutable IDs and prepare Provider acceptance; no production, TikTok LIVE, deletion or cutover. Two tables and a single-valued duplex relation were created and read back. The profile Skill accepts actual field bindings and rejects the default incompatible relation. Private configuration is mode 0600. The selected Tenant preflight currently needs tenant:tenant:readonly; owner action requested while preparation continues.

Supporting class B transport diagnosis: the observed app_scope_not_applied error was previously flattened into generic LARK_CLI_API_ERROR. The clean shared transport owner now preserves API_APP_SCOPE_NOT_APPLIED, distinct from missing user grants, without exposing private payloads or changing retry/authority behavior. Focused 18 transport tests pass, including both actors and no retry on this rejection. Source candidate only; remove the two-file scoped change to roll back. No package release or pin adoption.

Selected history read wiring (class A/B, accepted explicit-Principal design): Provider owns exact fields:list/records:list mapping and finite Base/table/view authorization; trusted composition injects the selected transport. No mutation method, actor fallback or generic query is exposed. Source owner was clean before this package. Provider tests pass 110; shared transport tests pass 81; independent caller checks pass 2. The actual CLI connection currently stops at missing tenant scope; source success is not live acceptance. Existing verified organization mapping matches the newly authenticated development user tenant key.

Retention naming alignment (class C/G): adopted planning-only Skill/npm identity is live-agency-data-backup-retention-plan. Maintenance caller instructions and emitted target now use it; parent lock and source inventory match. Legacy plan_type/mode bytes remain unchanged for compatibility. Existing source checkout path is retained pending recorded child adoption; no remote repository or operational registration is renamed. Focused retention/recovery/maintenance checks pass 19. Archive verification follows. No storage deletion or publication is authorized.

### Gift normalized readback verification candidate

Class B, with G documentation: implement the existing gift Skill's post-write
verification requirement as a pure normalized-input verifier. Its owner remains
`live-agency-gift-history-merge`; no source acquisition, destination adapter,
write authority or projection scope changes. Rebuild the reviewed plan against
the saved pre-write master, compare the complete normalized event set and
managed summary, and require the corresponding successful synchronization log
entry without dropping previous entries. Done means synthetic novel-event,
partial-write and tampering cases pass. Actual destination verification remains
a separate selected operation. Rollback removes only this additive local helper;
the current installed Skill and master remain unchanged. No parallel agents.

The current selected-history reader is also being checked at the parent-owned
profile Skill/Provider composition boundary (class G verification). Synthetic
actor preflight, field resolution, due-view selection and profile planning must
compose without exposing a write method. This adds no runtime dependency from
the Provider to a Skill, and does not replace selected live readback evidence.

### Current development checkpoint — 2026-09-08

The local development work is recorded in
[the Japanese verification report](../reviews/development-base-verification-ja.md).
The [history-operation gap map](lark-history-operation-gaps.md) distinguishes
reviewed endpoint knowledge, selected adapters, remaining legacy Skill entry
points and live conformance. In particular, attachment append remains
unverified; no nearby endpoint or ambient client was substituted.

Four owning source commits record the transport diagnosis, selected reader,
gift normalized readback verifier and retention-plan caller. Parent adoption
pins and operational installations remain unchanged. Six private Project items
were updated and independently read back; the other twenty items are unchanged.
Current counts are Done 2, Todo 15 and Blocked 9, with no item left In Progress.
The development Lark item is Blocked on the two requested App scopes. This is
not full M2/M3 acceptance or a release checkpoint.

### Development App scope follow-up

After the owner applied the requested App scopes, the same selected Bot reader
successfully exported two synthetic creator targets. Profile planning then
stopped on the empty history table: the successful record-list response has
`has_more: false` and `total: 0`, with `items` omitted. Class B compatible parser
repair: accept only that explicit complete-empty record response; missing items
with unknown/nonzero totals or continuation must still stop. No write authority
or endpoint scope changes. Verify rejection cases and rerun the same read-only
plan; rollback is the previous reader source checkpoint.

### Second one-hour development window — selected create preparation

Class A with B/G support: add one bounded selected batch-create adapter in the
Lark Base Provider, plus parent-owned no-avatar Profile integration. The adapter
must bind the exact write selection, Base/table, current field definitions,
reviewed payload/count and an externally authorized intent. It exposes no other
mutation, consumes a batch at most once, validates returned new record IDs, and
leaves business readback/reconciliation with the caller. Begin with one batch
of at most 100 records; do not infer broader history or attachment authority.
Done means focused rejection/uncertainty tests, archive verification and a
concrete synthetic owner-review package. Actual create waits for exact plan
approval. Existing empty-page repair and unrelated source edits are preserved.
No parallel agents, parent pin adoption or operational installation change.
JavaScript is selected for the existing node >=22 distribution range. Default
routing remains Astra/low; no unsupported in-turn model setting change is claimed.

Supporting wiring is now scoped to the Profile Skill's owning runtime: expose
a pure no-avatar create-payload preparation function so the private composition
does not duplicate business field mapping inside the Provider. It validates a
nonblocked plan and supplies no execution authority. Existing apply semantics
and default CLI route remain unchanged; parent integration owns cross-component
tests. The prior Profile Skill documentation/test edits are preserved.

Supporting class G attachment coverage investigation: while the concrete
synthetic create approval is pending, inspect the existing selected attachment
components and official/native CLI knowledge. Produce an owning capability-gap
record; do not infer operation support from a registered shortcut, add a fallback,
or perform media upload/append. The create review remains immutable. No parallel
agents or live data changes; documentation-only recovery is the scoped addition.

Attachment investigation found a concrete class B compatibility gap: the
existing selected attachment inventory reader rejects the same complete-empty
records response already observed in the selected development Base. Scope the
repair to that reader's records operation and direct empty/uncertain pagination
regressions; preserve strict field/table pages, total consistency, actor binding,
byte/origin budgets and all mutation gates. Verify acquisition with an empty
mapped table. No attachment request or live write is selected. The reviewed
no-avatar create sources and hashes remain unchanged; rollback this reader-only
checkpoint independently. No parallel agents.

Supporting class G LIVE preparation: verify parent-owned selected read
composition through the existing LIVE target export and plan builder, using
synthetic three-table data only. Preserve the adopted creator/start identity and
end-time conflict stop, due-view scope and independent session/metric counts.
Correct one stale Skill sentence that still describes creator/start/end as the
identity; this adopts the already approved rule and changes no business code.
Done means focused integration and packaged instruction checks; actual LIVE
acquisition and mutation remain unselected. Existing LIVE source changes stay
unstaged. Recovery removes only the new parent test and that wording correction.
No parallel agents or dependency/pin changes.

Supporting class G foreign-revenue inventory: map the owner-adopted recognition
and settlement planners to required Provider operations and retained caller /
monitor responsibilities. Inspect existing source manifests and selected old
Skill instructions without contacting accounting services or changing monitor
state. Done means a concrete missing-capability and resumption record; do not
reopen the approved two-Skill split, create journals, add broad accounting to the
expense Provider, or publish/register candidates. Documentation-only recovery;
no parallel agents.

Supporting class B/G distribution repair: the independent installed Markdown
closure check found two attachment instructions linking to synthetic fixtures
excluded from the Provider package, plus a parent-repository relative domain
link. Include only the directly required synthetic fixture closure and repair
that source-reference link after verifying its target. Preserve actual write
contracts and exclude unrelated tests. Done means payload-relative closure,
export/resource loading and relevant isolated attachment tests pass. No release
or parent pin adoption; rollback this manifest/document checkpoint separately.

### Second-window local verification checkpoint

No-avatar create preparation is complete and the exact two-row review remains
pending; no external Profile create has run. Source checkpoints are Provider
270da56 / 6f7c43f / c69f1ee and Profile 2761937. The later attachment inventory
and distribution changes do not alter the four reviewed execution-file hashes.
The final ten local archives pass 214 isolated owner/integration tests, 106
source-file comparisons, 26 relative documentation links, 47 resources and 37
export imports; fixed-lock reconstruction has been checked. Parent composition
and caller checks pass 19. The standard Skill validator cannot start because
PyYAML is absent; no dependency installation was performed to bypass that limit.

LIVE selected read preparation and the approved identity wording are verified;
actual device acquisition and session/metric writes remain open. The
[foreign-revenue Provider inventory](../reviews/foreign-revenue-provider-readiness-ja.md)
records missing declared accounting capabilities and the unchanged matching
local heartbeat. No accounting or monitor operation ran.

Five Project items were updated and independently read back; the other 21 are
unchanged. Current states: Done 2, Todo 16, Awaiting Review 1, Blocked 7,
In Progress 0. The concrete Profile review is the one owner response currently
requested. Candidate verification is not complete M2/M3 acceptance, publication,
parent pin adoption or operational activation. Private receipts and resumption
instructions remain under tmp/v2-project/; the source and development data are
retained without unapproved cleanup.


### Approved development profile creation — 2026-09-08 12:14 UTC

The owner approved the presented two-create, zero-attachment synthetic development plan. Selected Bot execution created two records, verified both by business readback, and repeat planning returned zero creates / two already applied. One batch-create succeeded without ambiguous-response recovery. Evidence rows are retained; no updates or deletions occurred. The Profile approval wait is resolved; remaining avatar and installed instruction-driven acceptance work is Todo. Full M3 acceptance, publication and parent pin adoption remain open. See [development verification](../reviews/development-base-verification-ja.md) for current evidence and recovery boundaries.


### Selected history attachment comparison — local checkpoint e32da64

The Lark Base Provider now exposes a bounded, read-only history attachment composition. Descriptors issued by selected table reads are bound to stable field IDs, record membership, file tokens and sizes. It checks membership before and after byte acquisition and serializes concurrent Profile hydration. Provider tests: 148 passed; related parent integration/regression checks: 31 passed; final archive checks: 14 passed. Public export and packaged source bytes were verified using existing parent dependencies, not a new fixed-lock installed acceptance.

Synthetic selected-CLI serialization through Profile preparation recognizes matching image bytes and blocks drift, unreviewed origins and incomplete inventories. No real image read/write, publication, operational activation or parent pin adoption occurred. Next: bind avatar upload outcomes to reviewed local-byte intents for new-record creation; keep the dedicated append contract unverified. [Owner evidence](../reviews/development-base-verification-ja.md) records scope and recovery.
