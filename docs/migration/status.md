# Current migration and documentation status

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
| Lark Chat | Exact chat and bounded interval requested from owner; retain the selected App/user and bind the selected route/profile before access |
| Google Drive | Backup storage account, shared Drive/artifact/receipt folder IDs and allowed operation; the June Excel is not the backup-storage capability |
| Money Forward | Company/user, bounded candidate interval and browser or existing OAuth request selection |
| TikTok Web | Profile target manifest and browser, or the coin-history account/period |
| TikTok iOS | Device/account/target manifest for LIVE, or handed-off gift export with its selected source account/date |

Readiness is not counted as M2 success. Lark Chat M2 awaits the requested target;
no messages or other service mutations were attempted. Shared interfaces and
external mutations remain serialized by the coordinator.

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
