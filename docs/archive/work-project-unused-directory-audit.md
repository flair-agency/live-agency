# Work-directory cleanup audit

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

2026-09-07 JST. Read-only preparation completed; no target was moved, archived,
deleted, installed, executed, or changed. The only edit is this report.

## Change card and decision

- Primary G, supporting future C; boundary: source preservation and path consumers.
- Invariants: retain original source/index/ref distinctions, operational runtime,
  dependencies, recovery assets, private data, guide consumers and active v2 work.
- Outcome: eleven-target decision table, bounded current evidence and one minimal
  reversible proposal. No successor task or subagent was created; no model override.
- Next gate: coordinator reconciliation of the incomplete operational guide
  deployment, followed by fresh exact retirement evidence for the selected path.
- Verification: metadata, selected source hashes, Git read-only queries, path-only
  configuration/link inspection. No application tests or live checks apply.
- Rollback: remove this report only if unchanged; audit targets need no rollback.

The proposed minimal set is **W/tools only**, conditionally removable as an empty
directory. All other targets remain in place. An empty directory observation and
limited negative search are not a proof of non-use. No deletion package may execute
before guide reconciliation and the exact-path checks below permit it.

Path keys (all table targets are relative to W):

- W: `/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2`
- P: `W/live-agency-provider-runtime`, retained operational runtime.
- D: `/Users/naokikimura/workspace/live-agency-provider-runtime`, development.
- A: `D/tmp/work-project-preservation-20260906T150009Z`, retained preservation.

## Evidence scope and limits

Read the applicable development and generated Work AGENTS, task orchestration
policy, cleanup coordination, source preservation and guide migration reports.
No nested AGENTS was found in the eleven targets using bounded file discovery.
This is a directory/source-preservation audit, not a review of Skill contracts;
Skill bodies were not semantically reviewed or changed. Parent legacy source was
hashed for comparison without printing its contents. Business-image contents,
credentials, authentication stores and private runtime files were not opened.

Fresh observations:

1. Compared every selected file in A manifests 00, 01, 02, 03, 05, 06 and 07
   against its original path by SHA-256 (symlinks by link text). All 199 files
   matched; all seven HEADs matched manifest HEADs. `git --no-optional-locks
   ls-files --cached --others --exclude-standard` found no existing nonignored
   path outside those selections. This does not cover ignored files, reflog-only
   objects, changed refs/index metadata, or an atomic whole-tree snapshot.
2. Read A/composition.json: operational child repositories have separate archives;
   original parent gitlinks remain original pins, not archived dirty child commits.
   A sibling is not interchangeable with the operational child merely by name.
3. Parent skills has 17 source/metadata files plus two Python cache files; the
   API spike has 10 source/package/test files. All 27 source/metadata hashes are
   absent from the selected-file hashes across all 17 manifests. This establishes
   missing exact selected-file preservation, not global semantic uniqueness or
   absence from historical Git objects/other backups.
4. Searched nonignored source/metadata in D, P and the seven sibling repositories
   with rg discovery, excluding `.git`, `node_modules`, `sources`, `private` and
   `tmp`. Focused text search covered `.md`, `.mjs`, `.js`, `.json`, `.py`, `.toml`
   and `.yaml` files up to 1 MB: exact absolute sibling paths, `../<sibling>`,
   `spikes/source-provider-api`, `tmp/pdfs`, `skills/tiktok-`, `../tools` and
   absolute W/tools. Earlier name searches also covered D/P package and source
   references. Package names and remote URLs were separated from filesystem callers.
   The cleanup ledger at D/docs/environment-cleanup-coordination.md:116 names
   the leftovers; it is an audit reference. No exact sibling-path caller was
   found in the focused P/D pass. Unknown dynamic paths remain unknown.
5. Inspected top-level symlink targets under `~/.codex/skills` and
   `~/.agents/skills`; 16 Codex links point into P/skills/live-agency-skills/skills.
   No inspected link points into an audit target. Examined only matching path
   locations in `~/.codex/config.toml` and existing
   `~/.codex/automations/*/automation.toml`, emitting no secret values/prompts.
   Config lines 198, 261, 350, 354–355, 360, 364–365, 370, 374 and 383 contain
   Work/runtime references. Automation files automation, live, tiktok and
   tiktok-2 have Work/runtime or live-agency-skills references at line 5;
   a package-name match alone does not identify W/live-agency-skills. No exact
   audit-target absolute path was identified in this config pass. Schedule
   status, prompt semantics and effective execution routes were not validated.
6. Inspected sibling dependency symlink metadata without executing dependencies.
   Concrete links to W/live-agency-skills are listed below. No process/open-file,
   shell-history, old-task, launch-agent, complete plugin/global registry,
   private-config or whole-host consumer audit was performed. Installed regular
   Skill copies and dynamically assembled references are not certified clear.

Inherited evidence, not repeated here: the preservation report and coordinator
accepted 17 bundle restores, stage-specific provenance and 119 checksum entries.
This audit did not repeat those restores or certify the archives as operational
backups. The accepted guide commit is
`34940aa930f4e2ba0cfaca260ca746912dd0ce6f`; exact original/bundle preservation and
English semantics are inherited accepted results. Operational deployment is still
incomplete: prior automatic review rejected three outside-checkout document writes.
No deployment retry or new approval rejection occurred in this audit. The Japanese
original, generated Work instructions and all guide consumers remain retained.

## Per-target decisions

“Archive candidate” means retain now and consider later retirement only after
consumer/exclusion reconciliation; it is not an instruction to make another archive.
Manifest IDs refer to A/NN/manifest.json and its already preserved snapshot.

| Exact W-relative target | Decision now / eventual treatment | Preservation and uniqueness | Concrete reference evidence / unresolved condition |
| --- | --- | --- | --- |
| `live-agency-operations-mcp` | Retain; archive candidate after dependency/caller retirement | 00: 12 selected files and HEAD match; no extra existing nonignored paths | `package-lock.json:19,37` references `../live-agency-skills/packages/source-provider-api`; `node_modules/@live-agency-skills/source-provider-api` resolves there. Outgoing dependency is concrete; incoming execution unknown. Operational replacement archive is 08, not 00. |
| `live-agency-provider-backstage` | Retain; archive candidate | 01: 17 files and HEAD match; no extra existing nonignored paths | D/P `.gitmodules:9` names the repository remote, not this sibling path; operational child is `providers/backstage` (09). No exact caller found in scoped source pass; private/old consumers unknown. |
| `live-agency-provider-lark-base` | Retain; archive candidate | 02: 6 files and HEAD match; no extra existing nonignored paths | D/P `.gitmodules:6` names the remote; operational child `providers/lark-base` (11) is independently preserved. Exact sibling execution remains unknown. |
| `live-agency-provider-moneyforward-cloud-expense` | Retain; archive candidate | 03: 8 files and HEAD match; no extra existing nonignored paths | D/P `.gitmodules:18` names remote; operational child `providers/moneyforward-cloud-expense` (13). No exact scoped caller; private consumers remain unclassified. |
| `live-agency-provider-tiktok-ios` | Retain; archive candidate after dependency/caller retirement | 05: 12 files and HEAD match; no extra existing nonignored paths | `node_modules/@live-agency-skills/private-runtime-files` and `source-provider-api` resolve to W/live-agency-skills/packages of those names. Operational child is `providers/tiktok-ios` (14); D/P `.gitmodules:12` is a remote reference. |
| `live-agency-provider-tiktok-web` | Retain; archive candidate | 06: 12 files and HEAD match; no extra existing nonignored paths | D/P `.gitmodules:15` names remote; operational child `providers/tiktok-web` (15). No exact scoped caller; dynamic/private usage unknown. |
| `live-agency-skills` | Retain; migrate callers before any archive/retirement | 07: 132 files and HEAD match; no extra existing nonignored paths; ignored `.DS_Store` and dependencies are outside selected-source assurance | Concrete incoming dependency links from operations-mcp and tiktok-ios above. Global installed links point instead to P/skills/live-agency-skills (16); they do not prove this sibling unused. |
| `skills` | Retain; restricted preservation first, then decide migration/archive | Four legacy Skill directories; 17 files have no identical selected hash in A; two cache files unclassified | `tiktok-activity-incentive-sync`, `tiktok-coin-expense-reconcile`, `tiktok-creator-profile-sync`, `tiktok-gift-json-download`. No inspected installed link targets them; old-task/dynamic consumers unknown. No public migration or source-policy approval inferred. |
| `spikes/source-provider-api` | Retain; restricted preservation first, then assess migration/archive | 10 files have no identical selected hash in A: root README/package/lock, three package manifests, two source modules, provider instruction, test | No executable external caller established by scoped search. Similar package names in preserved runtime are not byte identity or replacement proof. |
| `tmp/pdfs` | Retain pending private-content/retention classification | One image under a child directory observed by metadata only; parent leftovers excluded from A | Content not read, hashed or copied. Business-document derivative is possible; no disposable/reproducible-source claim. Private consumers and required retention unknown. |
| `tools` | Retain now; sole conditional empty-directory deletion proposal | Regular empty directory, zero entries; no source payload to preserve | No exact caller in bounded source/config/link inspection. Not a proof of unused: unknown process/relative references require final exact-path reconciliation. |

## Minimal reversible cleanup proposal and retained exclusions

Proposed path, exactly:
`/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/tools`.
Observed metadata: directory, not symlink; mode 0755, uid 501, gid 20,
inode 75084437, mtime_ns 1787910677871749242, zero entries. A file-content hash
is inapplicable; an empty-directory listing is the content evidence. This proposal
reclaims no source-file bytes and is intentionally small.

Before any future action: reconcile the guide deployment gate; bind the exact
path and permitted effect in the cleanup package; recheck parent/path identity,
symlink status, empty listing, owner/mode and changed timestamps; resolve any
new exact references and current working-directory/process dependence within
that package's authority. Record fresh metadata including ACL/xattrs if present.
If nonempty, replaced, linked, newly referenced or uncertain, retain and reclassify.
Use only an empty-directory removal primitive, never recursive removal. This audit
authorizes no execution and requests no hypothetical approval.

Rollback is to recreate that exact empty directory with freshly recorded
owner/group, permissions and applicable timestamps/ACL/xattrs, without replacing
any path that has since appeared. Inode identity cannot be restored; if any
consumer requires it, do not remove the directory. No archive move is proposed.

Retain all ten other targets, all `.stab*` recovery assets including rollback
0/1 and journals, prior preservation and guide generations/helpers, the operational
runtime and both operational dependency trees, development source/dependencies,
synced sources, generated instructions, Japanese original and every guide consumer.
No real data is to be copied into this report, source repositories or archives.
Unknown/private excluded content stays in place.

Recommended next bounded package: classify and prepare restricted preservation
of the 27 unpreserved parent source/metadata files, with complete applicable guide
review before any Skill semantic review. Use the designated development runs
location subject to normal permissions; do not bypass a rejection with another
path. This can prepare evidence while guide deployment is reconciled; it must not
execute deletion. Do not repeat the 17 existing restores or start wholesale sibling
retirement. The existing coordinator owns acceptance and dispatch.

## Completion check

The eleven requested targets have decisions, current/inherited evidence separation,
explicit unknowns and rollback conditions. No Git stage/commit/branch/ref changes,
external network, MCP start, authentication, schedule/global setting or operational
write was performed. No new manifests or archives were needed. Only this English
report was created; existing concurrent v2 and guide changes were not modified.
