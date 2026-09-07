# SEP-0 inventory and recoverable checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Status: SEP-0 source recovery verified; coordinator review required before SEP-1. No development checkout or production cutover was performed.

## Change card

- Primary class: G, inventory/documentation. No secondary mutation class exercised.
- Protected boundaries inspected: composition, Skills, MCP launch paths, profiles, credentials/state locations, scheduling, parent instructions.
- Invariants: original source and host settings unchanged; no external business calls, installation hooks, process interruption, schedule changes, commits, resets, cleans, stashes, or submodule repointing. Synced `sources/` remains read-only.
- Package/definition of done: per-repository recoverable selected-source checkpoint, restricted reference inventory, workflow register, and one SEP-1 brief.
- Next gate: coordinator accepts coverage and exclusions; SEP-1 receives writable destination and offline dependency strategy. Integration authority remains with coordinator.
- Verification/rollback: offline bundle recovery, exact source hashes/index/diffs/modes, freshness check; original remains the operational source. Only generated reports/checkpoint are new.
- Parallel work: none. Model policy read: Astra/low is the next dispatch default; no model setting was changed in this task.

## Scope and acquisition

The authoritative source was the ORIGINAL Runtime child of the existing operational Work project, not this generated worker worktree. Exact absolute paths, remote URLs, configuration mappings, task IDs, and private locations are restricted evidence.

Source acquisition: **2026-09-06T09:07:22.225611+00:00 through 2026-09-06T09:07:29.487577+00:00** (18:07:22–18:07:29 JST). Final source freshness observation: **2026-09-06T09:15:16.923006+00:00**. No source, ref, or status drift was detected. Per-repository index stability was checked during capture, and the index was recovered byte-for-byte as `git ls-files --stage -z`. Host configuration is a separately timed read-only observation, not a transactional snapshot of running services.

Checkpoint: `.sep0-checkpoint/` alongside this worktree's `docs/`; its absolute location is returned to the coordinator. It is persistent local storage, **not `/tmp`**, with directories 0700/files 0600 and a self-contained `*` Git ignore rule. It survives terminal/task completion but remains inside a managed worktree: retain that worktree until coordinator relocates/verifies the checkpoint before any worktree deletion. It is not an off-host disaster-recovery backup.

## Repository inventory

All 17 repositories were recovered independently. `runtime/` below abbreviates the original Runtime checkout. “Local-only” counts commits reachable from local branches/HEAD but not local remote-tracking refs; no fetch was performed, so these are not claims about current server publication.

| ID | Repository | HEAD | Branch | Working tree | Local-only commits |
| --- | --- | --- | --- | --- | --- |
| 00 | `live-agency-operations-mcp` | `fced40950d4a` | `feat/instant-messaging` | dirty | 0 |
| 01 | `live-agency-provider-backstage` | `6b66a130490a` | `feat/instant-messaging` | dirty | 2 |
| 02 | `live-agency-provider-lark-base` | `473fae95a2bf` | `main` | clean | 2 |
| 03 | `live-agency-provider-moneyforward-cloud-expense` | `729b39ed0940` | `main` | clean | 3 |
| 04 | `live-agency-provider-runtime` | `6b1f11c17cec` | `v2/domain-mcp-architecture` | dirty | 11 |
| 05 | `runtime/mcp/live-agency-operations` | `8c5d1dc27dc8` | `v2/domain-mcp-architecture` | dirty | 3 |
| 06 | `runtime/providers/backstage` | `9ad23b670786` | `main` | clean | 1 |
| 07 | `runtime/providers/google-drive` | `6467cc22baa6` | `main` | dirty | 0 |
| 08 | `runtime/providers/lark-base` | `996eb2641852` | `v2/domain-mcp-architecture` | dirty | 4 |
| 09 | `runtime/providers/lark-chat` | `1de8c1c4ecb7` | `main` | dirty | 1 |
| 10 | `runtime/providers/moneyforward-cloud-expense` | `400c25f5a601` | `main` | clean | 0 |
| 11 | `runtime/providers/tiktok-ios` | `2d202687b019` | `detached` | clean | 0 |
| 12 | `runtime/providers/tiktok-web` | `ff1b613d8ae9` | `main` | clean | 0 |
| 13 | `runtime/skills/live-agency-skills` | `e78ec0962184` | `v2/domain-mcp-architecture` | dirty | 1 |
| 14 | `live-agency-provider-tiktok-ios` | `a42414b3e977` | `main` | clean | 4 |
| 15 | `live-agency-provider-tiktok-web` | `07cc4bed4fd2` | `main` | clean | 3 |
| 16 | `live-agency-skills` | `cd1145d6872c` | `main` | clean | 0 |

All nine nested HEADs match the root's recorded gitlinks. Each source repository's top-level, realpath, absolute Git/common directory, all refs, remote URLs, status and gitlinks are retained in its manifest. Original Git/common directories coincide per repository; nested repositories use the original root's submodule Git storage. Siblings are separate checkouts, not aliases of nested source. Different sibling revisions and two dirty sibling feature branches prohibit treating them as obsolete duplicates. Their operational usage is unverified; retain them.

The parent and Runtime immediate children are inventoried in `layout.json`. Parent `skills/`, `tools/`, `spikes/`, and `.skill-build/` have 37 nonrepository files recorded by location and ownership, deliberately deferred as operational/reference source. Parent `sources/` and project-synced instructions remain reference material. Parent scratch/state directories are not development input.

## Recovery coverage and exclusions

**17 self-contained Git bundles; 746 selected source files verified.** Bundles include all refs plus detached HEAD, preserving local-only commits. Each repository has its own staged patch, unstaged binary patch, selected untracked file payload, source SHA-256 manifest, original file modes, and exact index digest. All staged patches are currently empty; unstaged/untracked distinctions remain explicit.

Recovery used independently cloned bundle repositories in an owner-only disposable temporary parent. It verified every selected file hash, index entries, tracked staged/unstaged patches, and restored source modes. Nested repositories were verified independently against their matching gitlinks; this is not a dependency-installed or runnable recursive composition verification. No application tests were needed or run for this documentation/checkpoint operation.

Preserved: tracked source/history in all repositories; non-generated untracked docs/scripts/tests/knowledge/package files; six ignored operational Lark MCP launcher/helper source files. The ignored launchers remain **restricted recovery-only operational source**, not automatic SEP-1 development input. They resolve Keychain credentials and must not be launched in development.

Excluded by exact per-repository manifest: dependency caches (`node_modules`, package store), untracked run data, ignored private data/configurations/receipts/exports, runtime journals and historical business artifacts, and temporary artifacts. Run-specific private scripts are location-inventoried and deliberately deferred: they may embed production targets and are not required for the independent source candidate. No credentials, browser sessions, cookies, Keychain entries, or exports were intentionally acquired. Raw runtime business JSON is not retained in configuration snapshots; only location/hash metadata is retained. Private operational profile contents are not copied; launch-referenced files have existence/hash/key-shape evidence.

Secret review scanned **1381 historical Git blobs** and selected working files for high-confidence private-key/token patterns: **0 findings**. This heuristic does not certify that arbitrary source/history contains no secrets. All patches, private source and bundles stay owner-only; review before any future publication. No credential extraction command was run.

Unreferenced reflog-only/dangling objects, Git reflogs, index flags/extensions, filesystem ACLs/xattrs, dependency installs, host credentials and complete production data are outside this source checkpoint. Branches, tags, remote-tracking refs and detached HEAD are covered. Restoring a fully operational host would additionally require retained production configuration/state and separately authorized credential provisioning.

## Host and reference inventory

- **16 user-global operational Skill symlinks** resolve into the nested Skills repository; hashes and exact targets are captured. Additional local Skills, including the accounting Skill, remain independently registered; their runtime health is unverified. The current task catalog exposes the operational Skills. `install:skills` invokes `--replace`, so it must not run against the production global destination.
- **Five agency MCP registrations** resolve into original operational source: transitional operations, v2 scouting read, isolated invitation-history write, and two Keychain-backed Lark surfaces. Two scouting launch entries have an explicit original cwd and profile-path environment references; the other three use absolute scripts without an explicit cwd. All configured launch commands/arguments and sanitized environment references are in restricted host evidence.
- This task's actual callable catalog includes **38 tools across two Lark surfaces**, including create/update/message operations. The other three agency MCP names are configured but absent from this task's callable catalog. Absence establishes an exposure difference, not a startup failure. No MCP was called or restarted.
- Five **ACTIVE heartbeat** definitions were inspected read-only. Four owning task session headers resolve to the original parent Work project; the invitation heartbeat resolves to a separate existing task directory, while its prompt still names the original Runtime source. Recurrence definitions, task cwd evidence and source references are restricted snapshots. No duplicate schedule was created and no task was retargeted.
- One relevant launch configuration was recorded. Keychain, CLI auth/state, Codex auth, operational private/runtime/run directories and parent state are location/uid/gid/mode inventories only. Existence does not establish valid credentials or a usable session.
- Global host config has a redacted structural snapshot and original-file hash, not a credential-bearing raw backup. Project registrations and shell inheritance settings are recorded there. No supported, actually isolated development profile has been demonstrated.

## Workflow register

“Recorded working” means prior source documentation provides bounded evidence; **current live health remains unverified**. No new business checks were run. Owner-reported v1 failures are not attributed to individual workflows without reproduction.

| Workflow / owner | Route and evidence | Classification / remaining unknown |
| --- | --- | --- |
| Invitation status / operational heartbeat owner | v2 scouting read plus separately approved history-write process configured; heartbeat authorizes read/dry-run only. Original README lines 94–128 records completed 2/2 repaired scheduled cycles and retained v1 rollback. | Recorded working at prior checkpoint; current health unverified. Earlier HTTP 400 is documented as repaired, not a current failure. |
| Invitation reviewed history write / runtime maintainer and operation approver | Original README records one approved, hash-bound write and full readback; distinct write profile/process retained. | Recorded working for that bounded intent; no fresh authority or current write validation. |
| Profile and LIVE acquisition/sync / operations owner | Linked Skills; scheduled private config references; latest handoff says adjacent legacy factory callers remain v1. | Current workflow health unverified. Required interactive acquisition may intentionally stop. |
| Activity, insight, gifts / operations owner | Latest handoff: insight 43/43 direct and 317/317 focused synthetic; activity/gift selected-client source exists; automation references activity/insight configurations. | Local conformance recorded; deployed profile/actor composition and end-to-end current health unverified. |
| Backup, retention, compaction, recovery drill / maintenance owner | Linked Skills and recurring maintenance prompt; handoff records 116/116, 194/194 native caller and 159/159 gate synthetic evidence. Full-base host guarantees remain explicitly unresolved. | Synthetic evidence only; scheduled production coverage, attachment completeness and recovery activation unverified. No live backup/drill initiated. |
| Agency Intelligence / runtime maintainer | Original README lines 73–83 describes active read-only browser profile; launch script available, no matching global agency MCP entry observed. | Recorded profile activation; current process availability and workflow health unverified. |
| Profile-history write and general scouting write / runtime maintainer | README explicitly describes inactive profiles; source implemented. | Inactive by documented design, not failing. No activation authorized. |
| Coin expenses / finance workflow owner | Active heartbeat: normalized local input and dry-run only; linked Skill and workspace config reference. | Current input completeness/currentness and workflow health unverified. No registration authority supplied. |
| Foreign revenue invoice / finance workflow owner | Active heartbeat: PDF-triggered dry-run, later approval-bound accounting and conditional monitoring. | Unverified; no invoice processed, no accounting operation or monitor created. |
| Provider knowledge review / maintainer | Active heartbeat requests clean composition and tests; SEP-0 directly observes dirty source. | Clean-source prerequisite is not met. Test result and operational impact unverified; this alone is not a business workflow failure. |

No active write or uncertain business outcome was inspected. Pending-operation reconciliation is therefore **unknown**, and must be resolved before any later process/cutover action. STAB-0 should obtain the owner's required workflow priority and specific failing examples; it must not infer a blanket v1 failure from the mixed source baseline.

## Proposed isolation and next package

Retain current operational source, global Skills/MCPs, profiles, credentials and schedules. Proposed development source: `~/workspace/live-agency-provider-runtime` (absent when inspected). Proposed synthetic state: `~/workspace/.live-agency-development/{config,runs,fixtures}`; proposed dedicated development host configuration: `~/workspace/.live-agency-development/codex-home`. These paths are proposals only and were not created. Future maintenance source: `~/workspace/live-agency-provider-runtime-maintenance`, not part of SEP-1.

SEP-1 builds source offline without host registration or integrations. SEP-2 must demonstrate that a supported dedicated host/profile omits production global Skills, MCP authority, credential fallback and browser sessions. An environment-variable/path proposal is not proof that the desktop app honors isolation. If host controls cannot provide that separation, use a separate OS account or execution host before enabling integrations. Same-user folders alone provide operational separation, not confidentiality.

Carry forward the parent read-only `sources/` rule and private-provider/public-Skill separation deliberately with instruction provenance. Do not copy business snapshots or silently inherit production target defaults into an active development profile.

Concrete remaining needs: coordinator coverage acceptance; writable authority for the proposed workspace paths (outside this worker sandbox); dependency acquisition/cache availability for a clean install with hooks disabled; host isolation proof at SEP-2; dedicated test identities/resources only if integration is later requested. These do not invalidate completed source recovery. The one recommended next package is **SEP-1**, as bounded in the companion brief.
