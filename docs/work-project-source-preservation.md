# Work-project source preservation

Completed 2026-09-07 JST. This package created reviewed local archival commits in 17 independent repositories; it did not clean or commit the originals.

## Change card

- Primary G (source preservation), supporting C (future cleanup); boundary: repository history and source ownership.
- Invariants: original operational and active development source/index/refs remain untouched; no external service calls, fetch, push, installation, schedule/registration changes, guide migration, or directory removal.
- Outcome: restricted independent bundles, reviewed snapshot branches, exact provenance, verified disposable restoration, and a bounded migration handoff.
- Next gate: establish the guide's repository authority and update its consumers as one reviewed migration. Preservation alone is not evidence of non-use or deletion authority.
- Verification: exact selected content/Git modes/deletions, original raw index and stage-specific diffs, original refs and detached HEAD, current source freshness. No application tests are applicable to archival Git operations.
- Parallel work: none; active v2 work and its handoff were not modified. Dispatch model policy: Astra/low; this task did not change model settings.

## Committed result

Archive generation: `/Users/naokikimura/workspace/live-agency-provider-runtime/tmp/work-project-preservation-20260906T150009Z`

All directories are owner-only (0700); files are 0600 or 0700 for executable bits. These permissions do not isolate other processes running as the same user. Retain this ignored generation before deleting or replacing the development checkout. It is local preservation, not an off-host backup.

Each `NN/archive.git` is an independent bare repository with branch `codex/work-project-preservation-20260906T150009Z-NN`. Each `NN/committed.bundle` independently retains the archived branch, all original refs, and HEAD. No object alternates, hard-linked source object store, network acquisition, or original-path restoration dependency was used. Commits use each source repository's configured author identity, with signing and hooks explicitly disabled; no identity was invented. Empty source changes still receive an archival checkpoint commit.

| ID | Original repository relative to Work | Snapshot commit | Local-only commits before archival |
| --- | --- | --- | --- |
| 00 | `live-agency-operations-mcp` | `03c9d341f8c1e4150d55b21fe57ece0bfbd8eb31` | 0 |
| 01 | `live-agency-provider-backstage` | `c8cf99eae112c3eea63ec096cefa4dbb68546689` | 2 |
| 02 | `live-agency-provider-lark-base` | `732a7379a562df7311c40dad34abda840810e0f9` | 2 |
| 03 | `live-agency-provider-moneyforward-cloud-expense` | `e3a9af62c176fc090c42718387ae02698c301461` | 3 |
| 04 | `live-agency-provider-runtime` | `07ba2ea52ba6af834405a1625bf9d69f28240b06` | 11 |
| 05 | `live-agency-provider-tiktok-ios` | `968d996783e93e35c79301431a9d0a6be6238f62` | 4 |
| 06 | `live-agency-provider-tiktok-web` | `ecc38a269c869d3dd8eed63e4a5c1da2a92ea5e0` | 3 |
| 07 | `live-agency-skills` | `9f3f2cced7b61065a45698b2d70292859c3a6a52` | 0 |
| 08 | `live-agency-provider-runtime/mcp/live-agency-operations` | `923d35ddc2b54dc76c978de5807de5f2e08fe14f` | 3 |
| 09 | `live-agency-provider-runtime/providers/backstage` | `18c457b71836b144f1821cc318008b51ae68c626` | 1 |
| 10 | `live-agency-provider-runtime/providers/google-drive` | `df94655d57bc2b7318bcf3302ba46e42151247cc` | 0 |
| 11 | `live-agency-provider-runtime/providers/lark-base` | `81f6c8e094507197ab4c3f18ffa938bfb6858d69` | 4 |
| 12 | `live-agency-provider-runtime/providers/lark-chat` | `898a6073007f8f9a2cd58fe1190f22f76b64694b` | 1 |
| 13 | `live-agency-provider-runtime/providers/moneyforward-cloud-expense` | `de64b66bfba0dbc6321ba3ece46808d34557379b` | 0 |
| 14 | `live-agency-provider-runtime/providers/tiktok-ios` | `fa053bbf0f3298cdea69908b8b9e1ae2b5afc10e` | 0 |
| 15 | `live-agency-provider-runtime/providers/tiktok-web` | `b8b5e4445c79e4c091c8c1e9fcaf5ecc489109d9` | 0 |
| 16 | `live-agency-provider-runtime/skills/live-agency-skills` | `6ff168551e8cb8a53139ed9e340a9c78f571ff5a` | 1 |

Local-only means reachable from local branches/HEAD but not the existing remote-tracking refs. No server publication claim is made. All 17 original HEADs and these counts match SEP-0's reported baseline; current working source was freshly captured rather than reused. This generation has 744 selected files plus six recovery-only helpers, versus SEP-0's reported 746 total; no byte-for-byte equivalence with the older payload is claimed. Current per-file hashes and exact exclusions are authoritative for this generation. No source drift was observed during capture, commit, or final restoration verification.

## Coverage and verification

- All original branch/tag/remote-tracking refs and detached HEAD were bundled and independently resolved after cloning. Each snapshot commit has the original HEAD as its parent.
- Tracked source and explicitly selected untracked source under source/test/docs/knowledge/instructions/package/Skill paths were captured. The restricted manifest records the exact allowlist, SHA-256, filesystem mode, Git mode, deletions, and untracked provenance per path.
- Raw original index, NUL-delimited stage entries, staged and unstaged binary patches, original refs, and pre/post state hashes remain in each repository directory. Restoring the raw index in a disposable checkout reproduced its stage entries byte-for-byte. Staged and working diffs against the original HEAD matched with child-dirtiness rendering excluded and separately documented.
- Every committed bundle was cloned into its independent `NN/restore` directory and checked out by snapshot SHA. Selected bytes, executable/symlink modes, deletions, and the complete tree path set matched. The restored index was then intentionally replaced with the original index to verify staged/unstaged provenance; consequently these verification checkouts are intentionally dirty. Original filesystem modes remain in manifests; restricted payload modes do not pretend to preserve broader access permissions.
- `composition.json` records every original parent gitlink, actual child HEAD, archived child snapshot SHA/branch, and original dirty-status hash. All nine original child HEADs match original pins. The parent snapshot deliberately retains original pins; it is not a new runnable composition pointing to child archival commits. Reconstruct dirty children from their independent bundles, not through network submodule updates.
- Six ignored `private/lark-openapi-mcp/*.mjs` launcher/helper files are stored separately under `restricted-operational-helpers`, with source hashes and modes. They are uncommitted recovery-only operational source and must not be executed in development.

Excluded from new source snapshots: untracked package-store files and five gift-projection business-data artifacts (exact paths in manifest); ignored dependencies, private configurations, data, credentials, runtime state and generated scratch. Other parent nonrepository Skills/tools/spikes/build material and run-specific private scripts remain deferred; this package does not authorize their removal. No existing tracked path was excluded on a sensitive-content finding. All reachable historical blobs remain restricted as potentially sensitive historical source; history was not sanitized or certified secret-free. Selected working source was checked for high-confidence private-key/token patterns and credential-like literal assignments; flagged assignments were reviewed as synthetic test values. This is a heuristic review, not proof of absence of real data or secrets.

Reflog-only/dangling objects, reflogs, index ACL/xattr semantics, host configuration, dependencies, credentials, production data and runtime state are not a full operational backup. Raw index bytes and source file modes are retained, but original execution assets remain necessary. Six ACTIVE schedules and both restored node_modules trees were left untouched; their state was not revalidated by this source-only package.

For offline recovery, clone the desired `NN/committed.bundle` with hooks disabled and no checkout, then check out its recorded snapshot SHA with hooks disabled. Do not initialize submodules or execute restored scripts. The `preserve.py` capture implementation and per-repository manifests record verification mechanics. Keep raw precommit provenance until the coordinator accepts restoration. Rollback of this package requires only retiring the newly created archive and this report after acceptance; no original source rollback is necessary.

## Next package: English governance guide migration

Proceed with the already requested guide migration as the next bounded package; do not translate or move it as part of this completed preservation package. Candidate owner: the private Runtime repository's cross-component governance documentation, at `../docs/governance/private-source-integration-guide.md`. This is consistent with the existing reorganization plan and avoids placing private policy in public `live-agency-skills`. Confirm repository publication/access policy locally before changing authority; a configured remote alone cannot establish privacy.

Current source: Work-root `非公開ソース連携スキル設計ガイド.md`, outside all 17 Git repositories. Read in full for this package; SHA-256 `aff71a8bb80872450b8ab23a0b09e884d55d2393453f66209551f3a5743f571e`, uid 501, mode 0644. It was not copied, translated, moved, or deleted. Preserve its original revision/hash and full English semantic equivalence in the migration review; any policy change requires separate explicit treatment.

Known references requiring classification in that package:

| Consumer | Existing reference / treatment |
| --- | --- |
| Development `AGENTS.md:9` | Absolute Work-root guide path; active mandatory full-read dependency. Update only in the migration's coordinated editable scope, avoiding active v2 ownership conflicts. |
| Work-root `AGENTS.md:116,132` | Mandatory guide heading and precedence; outside current writable roots and explicitly excluded here. Parent instruction edit needs scoped filesystem authority and must preserve project precedence. |
| Operational `docs/environment-separation-and-production-stability-plan.md:246` and section 14 | Migration ownership, English filename/content, provenance and installed consumer requirements; prior post-npm timing is superseded for preservation/guide work by the user's latest ordering, not for wholesale runtime removal. |
| Operational `docs/environment-separation-sep2-checkpoint.md:79` and development `docs/environment-separation-sep2-desktop-verification.md:43` | Historical retained dependency and earlier deferral; annotate current status without rewriting historical evidence or worker-owned files. |
| Operational and development `docs/instruction-audit-ia0-ia2-checkpoint.md:66` | Historical relative `../非公開ソース連携スキル設計ガイド.md` read provenance. Preserve original observation and link successor where appropriate. |
| Operational and development `docs/v2-m2u-task-plan.md:86` | Historical `sources/writing-block.md` snapshot reference; never edit the synced snapshot or promote it to canonical policy. |

The reference search covered nonignored Work/repository source and development instructions/docs, excluding synced sources, private data, dependencies, scratch and Git internals. It does not prove that every global registration, old task, installation or ignored asset is unreferenced. Migration must verify required package inclusion, installed/development reference resolution and a compatibility route before retiring the old authority path. The parent/source guide lies outside this task's writable roots; active development instructions and worker-owned handoffs also remain outside this package's edit scope.

Source-preserved does not mean operationally unused. No sibling or runtime directory is approved for deletion by this result. The cleanup coordinator must separately prove unused paths and preserve deferred nonrepository source; wholesale operational Runtime removal stays deferred until actual package cutover.
