# Clean remote-main qualification

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.

**Result: clean installation and the tested v1 contracts pass; replacement of the current production baseline is not qualified. No production reinstall was performed.** The remote-observed main is an older, internally installable composition. It omits operationally relevant assets in the provisional STAB-0 inventory. Those omissions and unverified production configuration prevent accepting it as a complete replacement.

## Change card

- Primary E qualification, supporting G; boundary: pinned composition and isolated installation.
- Preserve production and active development source, dependencies, configuration, registrations, credentials, schedules, accepted local main and dirty work.
- One package: verify current remote root main, materialize its exact recursive pins, install committed locks without hooks, and produce the workflow qualification matrix.
- Rejection cases: unavailable remote/object, missing or incompatible locks, unresolved dependency closure, external execution, missing required routes, or unsupported source/configuration replacement.
- Next gate: coordinator acceptance of the exact retained production composition and scope; production authority remains separate.
- Rollback: remove only this report and this task's newly owned disposable evidence/candidate. No tasks or subagents created; no model/effort setting change claimed.

## Remote observation and immutable composition

The development origin points to a restoration bundle, so it cannot establish remote freshness. The original checkout's configured network origin was inspected read-only and used only to configure the independent candidate. No original/development fetch or ref update occurred. URL checks rejected embedded HTTP authentication and unexpected protocols; credentials were neither inspected nor copied.

The initial sandbox fetch failed with DNS resolution unavailable. The separately scoped escalation succeeded using normal Git authentication:

- Observation start: **2026-09-06T12:06:36.664955Z**.
- Observation completion: **2026-09-06T12:06:37.821377Z**.
- Ref requested: `refs/heads/main`, with no tags and depth 1.
- Root: **`279672802ae3d8c75307d9c93e7c7b5848eefe3a`**.

This is the remote main observed at that time, not a perpetual freshness claim. It matches the previously cached SHA, but that cache was not used as freshness evidence. The root was initialized with independent objects, fetched, and checked out detached. Each submodule was materialized at its parent gitlink, not its own main. All six submodule URLs were inspected before download; none contains further `.gitmodules` or gitlinks requiring additional recursion.

| Repository | Exact root-pinned SHA | Declared package version |
| --- | --- | --- |
| Root | `279672802ae3d8c75307d9c93e7c7b5848eefe3a` | Runtime 1.0.0 |
| `skills/live-agency-skills` | `cd1145d6872c0d6cbd2a1b622c7382e42ec13703` | Monorepo 0.0.0; Provider API 1.6.0; private runtime files 1.0.0 |
| `providers/backstage` | `6b66a130490a81c01de03fa9587335094ba66372` | 1.0.0 |
| `providers/lark-base` | `43c8a86c00cad68e177e8d3ceb9ad6bfe46bbaae` | Lark Base client 1.1.0 |
| `providers/moneyforward-cloud-expense` | `c641d273e80021caa48991bfdc6df61cf6fc9799` | 1.0.0 |
| `providers/tiktok-ios` | `574d5975985ffdaccf7f4b2322c492fd6c2f69ca` | 1.1.0 |
| `providers/tiktok-web` | `494e3bcc68b51202825f65914c59cfd78b97b5e7` | 1.0.0 |

Both committed locks use lockfileVersion 3 and remained unchanged:

| Lockfile | SHA-256 |
| --- | --- |
| Root `package-lock.json` | `d00564e4ff90622fb3289062b70b21016d614c7a3627bdb1160d54f3b3a8ddfd` |
| Skills `package-lock.json` | `f17c4987e4764370ef2270f5963e52ad04c2d70339ef8e8e2b0fe56d54978abd` |

## Installation and lifecycle accounting

Node **v22.22.0**, npm **10.9.4**; the root requires Node >=22. Reviewed root/nested manifests, both locks, all workspace manifests, lifecycle declarations and root/Skills/Provider READMEs before installation. Seven root workspaces contain the five private Providers and two public shared packages. The nested Skills installation owns its synthetic fixture workspaces. No missing workspace or incompatible lock was repaired.

An owner-only ignored directory contains independent Git storage, candidate packages, fresh npm cache, empty user/global npm configuration, isolated test HOME and synthetic TMPDIR. The explicit task allowance for development `tmp/` was used; no active development or production profile was created.

Procedure, in the two respective candidate directories:

```sh
npm ci --ignore-scripts --no-audit --no-fund
```

`NPM_CONFIG_USERCONFIG`, `NPM_CONFIG_GLOBALCONFIG`, and `NPM_CONFIG_CACHE` point exclusively into the disposable directory. Inherited npm configuration overrides and Node options were removed. Installation had scoped package-download authority; subsequent tests had a minimal environment without service credentials. Root installed 14 packages, nested Skills installed 11; both exited 0. No shared operational dependency directory was used.

Lifecycle effects:

- Root postinstall normally runs nested `npm ci --ignore-scripts`. Its required effect was explicitly reproduced by the second lock-based installation.
- No workspace install/prepare hook or native build is required by these manifests.
- The installed `saxen` 11.1.1 tarball declares `prepare: run-s bundle`. Its published `dist/index.js` export and CJS bundle are already present; source packaging was not rerun. Candidate imports through the export parser succeed. This is not a claim to have exercised full XLSX ingestion.
- `install:skills` changes global registration and was deliberately not run. Therefore global Skill discovery/activation is **not qualified** by this installation. No essential package build effect remains known to be unreproduced; operational registration is a separate action.

Complete `npm ls --all --json` passes at both roots, including workspace peers and the entire declared transitive graph. Registry dependencies are `read-excel-file` 9.3.5, `fflate` 0.8.3, `saxen` 11.1.1, `unzipper-esm` 0.13.3, `graceful-fs` 4.2.11, `node-int64` 0.4.0 and `worker-f` 0.1.20. Installed manifest hashes and exact trees are retained in evidence. All candidate symlinks resolve within the candidate; all seven Git common directories are internal, no alternates exist, and all candidate repositories remain clean.

**The SDK from STAB-INC-01 is absent from this manifest by design.** Successful discovery here proves this candidate's closure, not recovery of the current mixed composition's required SDK 1.30.0 or its MCP processes.

## Focused synthetic verification

Read the complete authoritative private-source design guide before reviewing all eleven candidate Skill instruction files. Global business Skills were not executed. Reviewed test commands, imports, module entry guards, synthetic fixtures and injected client boundaries. Source under test came exclusively from the candidate.

Tests ran directly as Node test modules, avoiding the root suite's child-process orchestration. They used a minimal environment, isolated HOME/TMPDIR, explicit synthetic targets, and injected clients. A preload denies global fetch and common HTTP/TCP/TLS/DNS/datagram/server entry points. Node permissions deny subprocesses, workers and addons; ordinary test runs restrict filesystem reads to the disposable directory and writes to its fixture directory. No browser, service, MCP, scheduler or business connector was launched. These measures and reviewed mocks support synthetic-only execution; the preload is not presented as a general OS network sandbox.

Metadata-only discovery independently returned **8 bindings** before capability resolution. Composed smoke passed **5/5**, including all nine supported capability/input pairs, rejection of human-only gift acquisition, and normalized profile contract integration. Coin expense passed **8/8**: exact matching, duplicate equivalence, existing-registration reservation, incomplete coverage rejection, stale-plan rejection, destination verification and separate instruction-provider resolution.

Final selected test result: **117/117 unique tests passed**, no unresolved test failure. One unrelated registration/symlink CLI test was deliberately not run; this is not a full `npm test` claim.

Harness limitations and corrections are retained:

- The first dependency commands exited 126 because the asdf shim could not run with isolated HOME. Both checks were rerun successfully using the installed Node binary and npm CLI directly, without restoring ambient HOME. Other independent checks had already continued; final dependency closure is verified.
- The first private-file suite passed one case and failed symlink setup because Node 22 requires unrestricted filesystem flags for `fs.symlink`. After reviewing that two-test module and its local helper, it passed 2/2 with full Node filesystem flags under the existing host sandbox, still without child-process authority, with isolated paths/environment and network guards. This was a harness restriction, not a source defect. No candidate patch was made.

## Provisional required-workflow matrix

The inventory comes from STAB-0; operational priority and completeness still require coordinator/owner acceptance. “Present + synthetically verified” covers only the stated candidate code/test boundary. Every operational row also **requires configuration** and **requires operational verification** unless explicitly absent or inactive. No live success is inferred.

Public callers below are relative to `skills/live-agency-skills/skills/`; tests are in its `test/` directory unless stated otherwise.

| STAB-0 workflow | Candidate caller / capability | Qualification and evidence | Remaining requirement / relevance |
| --- | --- | --- | --- |
| Coin expenses | `coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs`, `plan_coin_expense.mjs`; purchase evidence, expense candidates and registration `/v1` capabilities | **Present + synthetically verified**: 8 tests; real binding resolution in smoke; expense manifest 1 test | Interactive source/destination instructions, current receipt/lookup coverage, exact accounting profile and approval. No actual UI acquisition or registration tested. |
| Profile acquisition/sync | `creator-profile-sync/scripts/resolve_profile_source.mjs`, `profile_lark_runtime.mjs`; profile observation `/v2` | **Present + synthetically verified**: 8 sync, 9 web core, 5 avatar and 1 web manifest tests, plus smoke | Candidate is v1 composition with profile contract v2. Requires current field IDs, due view, actor, target manifest and verified avatar files; browser operation unverified. |
| LIVE acquisition/history | `creator-live-history-sync/scripts/resolve_live_history_source.mjs`, `live_history_lark_runtime.mjs`; LIVE observation `/v1` | **Present + synthetically verified**: 6 sync tests and iOS binding smoke | Interactive device observation; configured LIVE/metric fields and destination flow remain prerequisites. Mock readback does not verify deployed flow behavior. |
| Monthly activity | `creator-activity-sync/scripts/resolve_activity_source.mjs`, `lark_activity_sync.mjs`; activity `/v1` export/paste bindings | **Present + synthetically verified**: 6 sync and 2 Backstage parser tests | Complete monthly input, stable five-field config, exact matching and three-field allowlist. Raw XLSX file ingestion and current source layout unverified. Selected v2 runner absent. |
| Creator insight | `creator-insight-sync/scripts/insight_lark_runtime.mjs`, `sync_creator_insights.mjs` | **Present + synthetically verified**: 5 tests | Existing evidence, approved vocabulary, context/plan hash and field mapping. Current selected v2 adapter is absent; cannot assume configuration interchangeability. |
| Gift history/projection | `gift-history-sync/scripts/plan_gift_history.mjs`, `prepare_gift_commit.mjs`, `sync_gift_projection.mjs`; gift snapshot `/v1` | **Present + synthetically verified, partial operational route**: 10 history/projection tests and 3 iOS normalization tests | Human-completed export handoff and source attribution mandatory. Canonical destination commit connector and private workspace config remain external dependencies; selected projection launcher absent. |
| Invitation status/heartbeat | `creator-invitation-status-sync/scripts/resolve_invitation_source.mjs`, `invitation_lark_runtime.mjs`; invitation observation `/v1` | **Present + synthetically verified for legacy route**: 7 sync tests, smoke binding | Real provider is interactive. Does not replace the recorded-working v2 Scouting heartbeat or establish unattended acquisition. Equal latest state extends timestamp in this contract. |
| Invitation reviewed history write | `creator-invitation-status-sync/scripts/sync_invitation_observations.mjs` | **Present legacy contract; newer process missing**: same 7 tests include reviewed timestamp write | Exact legacy approval/count semantics differ from a selected v2 process/intent boundary. Pending intent and profile compatibility must be reconciled before any route change. |
| History compaction | Profile, LIVE metrics, LIVE session and invitation compaction callers | **Present + synthetically verified**: 6 + 4 + 7 + 7 tests | Private field/retention configs, exact deletion approval and readback. LIVE/invitation archive upload and complete remote readback are not supplied by an installed storage Provider here. |
| Backup | No `lark-base-backup` Skill/full-Base runner/storage Provider | **Missing** | Required backup coverage cannot be established with this candidate. Existing compaction archives are not whole-Base backups. Current operational necessity must be retained or explicitly resolved. |
| Backup retention | No backup-retention Skill/runner | **Missing** | Cannot satisfy the linked maintenance inventory; no deletion or retention decision is authorized. |
| Recovery drill | No full-Base disaster-recovery Skill/runner | **Missing** | Synthetic restoration of compaction archives is narrower than Base recovery. Requires a verified backup and separately authorized isolated destination. |
| Maintenance coordinator | No `lark-base-maintenance` Skill/runner | **Missing** | Individual compaction helpers do not supply backup coverage, capacity scheduling or the combined maintenance workflow. |
| Foreign revenue invoice | No `foreign-revenue-accounting` Skill or accrual/reconciliation caller | **Missing** | Existing expense Provider capability is coin expense registration, not foreign-revenue accounting. The finance inventory remains uncovered. |
| Agency Intelligence | No operations MCP, Lark Chat Provider or Intelligence runtime | **Out-of-scope newer feature; missing as replacement asset** | STAB-0 records activation, so absence may affect current operations. Owner must decide retention/requirement; not declared universally mandatory for every v1 installation. |
| Profile-history/general Scouting write | Legacy profile append exists; separate v2 write processes absent | **Out-of-scope newer feature / intentionally inactive** | No activation requirement established. Its absence alone is not a v1 defect; preserve any existing inactive configuration. |
| Provider knowledge review | Dated knowledge manifests; no heartbeat configuration | **Present metadata; requires operational verification** | Clean candidate and manifest tests satisfy only source prerequisites. Current service knowledge, scheduling and actual clean operational composition remain unverified. |

Shared contract evidence: Provider API 7 tests; Lark record-ID compatibility 1; private runtime files 2; Lark client 6; iOS manifest 1. These plus the matrix suites and smoke total 117. Synthetic readback/write tests use in-memory clients and have no external effects.

## Exact blockers for production v1 reinstall

1. **Replacement scope is unresolved.** This root omits backup/retention/recovery/maintenance and foreign-revenue workflows from the provisional inventory. It also lacks newer but potentially active Scouting/Intelligence assets, Google Drive, Lark Chat, shared Lark core and SDK. Missing assets must be retained through an accepted composition decision or explicitly excluded by the owner; borrowing dirty source is not qualification.
2. **Source/config compatibility is not proven.** Current mixed source and Lark client 2.0.0 are not interchangeable with this client's 1.1.0 ambient-environment factory. Candidate CLI configuration uses private field-ID files and, in legacy paths, environment/Keychain credentials. Current selected profiles/v2, actor/resource/operation bindings and v2 launchers are not implemented here. No ambient credential path was exercised. A production wrapper/selection decision cannot be inferred from passing pure tests.
3. **Operational gates remain open.** Required normalized inputs, source freshness, schema/field/flow compatibility, exact actor/resource/allowlist, current approvals, pending write outcomes, host isolation or scoped incident exception, and observed operational cycles were not inspected or accepted. Installation is not live workflow success.
4. **Delivery/rollback authority is absent.** Global registration, process recreation, schedules and production package/source replacement are outside this package. A full reset to main would discard the preserved mixed baseline and is not authorized.

If a later package repairs the incident, preserve the exact approved current source/lock/dirty overlay and owner-only old dependency tree. Qualify that composition independently before replacing only approved package-tree paths. Restore only those paths on failure; never reset Git, overwrite profiles, or replay uncertain intents. Any process recreation, registration change or schedule cutover needs its own scoped handling and verification.

## Preservation and evidence

Owner-only ignored evidence directory:

`tmp/stab-clean-main-20260906T120510Z/`

Key artifacts: `owner.json`, `fetch-network.json`, `pins.json`, `locks-before.json`, `installed-package-metadata.json`, `install-root.json`, `install-skills.json`, `dependency-root.json`, `dependency-skills.json`, `checks.json`, `private-files-recheck.json`, `isolation.json`, `protected-before.json`, `protected-after.json`, `preservation.json`, and per-test logs under `evidence/`. Reproduction harnesses are retained there; their paths are fixed to this owned generation and are not general installers.

Before/after hashes match across **20 repositories**: original and development root plus nine nested repositories each. Checked scope: tracked file content, HEAD, index, staged/unstaged binary diffs, and bounded package/lock/Git configuration metadata. Candidate locks and tracked state also remain unchanged. This is bounded preservation evidence, not an audit of untracked business configuration, all dependency bytes, global registrations or unrelated UI state. Existing untracked source was not edited; untracked file contents were not covered by the initial digest. No business data or credential values were read for verification.

Only this report and newly owned ignored files were created in the active checkout. No source patch, lock regeneration, staging, commit, operational installation, global registration, external business read/write, restart, publication or schedule change occurred.

## One next decision and minimal package

**Do not substitute this remote main for the mixed production baseline.** Recommend one bounded **current-composition package-tree recovery qualification** for STAB-INC-01: establish an immutable manifest of the accepted existing source/locks/workspace overlays, reconstruct only its dependencies in another disposable candidate, then verify complete closure including SDK 1.30.0, metadata discovery and focused coin-expense contracts. Preserve all current routes; return an exact package-tree replacement/rollback plan for the coordinator. Production delivery still requires separate authority. This is a proposed next package only; none was dispatched.
