# Initial-push CI suppression patch

2026-09-07 JST. **Prepared and locally verified; not applied to accepted source.**
[Standalone patch](release-preparation/disable-initial-push-ci.patch) moves the
committed workflow unchanged to `docs/ci-reference/ci.yml.disabled`. It adds no
enabled replacement. This is a source-change proposal for
[E3](npm-runtime-source-publication-eligibility.md#concrete-findings-and-required-dispositions),
not a qualified release workflow or approval to push.

## Change card and binding

Primary G: deterministic local patch preparation. Protected boundary: repository
push-trigger side effects. Invariants: accepted source, artifacts, evidence,
refs and indexes remain immutable; package inputs remain identical. One package:
a standalone exact rename patch plus this report, verified in disposable local
scratch. Next gate: accept this exact patch before separately authorizing a new
source checkpoint and lineage update. Rollback: abandon only these two outputs
after checking for later edits. No parallel work, successor, subagent, cross-task
message or model override; configured model retained.

Read basis: root AGENTS, task orchestration policy, publication eligibility,
release-source-commit and committed-artifact-reproduction reports. No Skill
contract or content was edited or substantively reviewed.

| Binding | Value |
| --- | --- |
| Accepted repository | `/Users/naokikimura/workspace/.live-agency-development/runs/release-source-commit-20260907-01/skills` |
| Source commit | `f2a476a6e22b1510e262e79cda651c764aa68953` |
| Source tree | `0117c308c92851e61256ef97399e2f3a94eb8fca` |
| Scratch-only candidate tree | `1e7eb0452aca676e5e01fa500afb279b73702f5f` |
| Patch SHA-256 | `23dd0b138d0ed92b37ff3941d8b4da27090362bc764b1d7be78a89be69172aa9` |
| Source and destination Git blob | `7c130e15bb34ecc8542cbbdd11cce1ce95e33630` |
| Source and destination content SHA-256 | `b5765738283124f04c52f23047ac7b238e799732257b8471a2522b3bf770b8af` |
| Content size / mode | 354 bytes / `100644` |

## Focused verification

The complete tip tree contains 182 ordinary file entries. Enumeration of every
entry beneath `.github/workflows/` found exactly `.github/workflows/ci.yml`.
Its committed bytes contain `push` and `pull_request` triggers and `npm ci`,
`npm test`, and `npm run check:public`; none was executed. The destination is
absent from the tree, with no file/directory prefix collision.

The patch records a 100% rename and full old/new blob identity. Independent blob
hashing checked the exact preimage; application must remain bound to the source
commit/tree above, since rename metadata alone is not a general drift guard.
A disposable bare Git repository inside this workspace used its own index and
object output directory, with accepted objects available only for local reads.
`read-tree`, `git apply --cached --check`, application and `write-tree` passed.
The complete resulting path/mode/type/blob map equals the original map with only:

- delete `.github/workflows/ci.yml`;
- add `docs/ci-reference/ci.yml.disabled` with identical bytes and mode.

All other 181 leaf entries are identical; total entries remain 182. No entry
remains beneath `.github/workflows/`. The added blob was read back and compared
byte for byte. Reverse-check and reverse-application restored the exact original
tree. Scratch was removed; no candidate commit or accepted index was created or
changed. The candidate tree ID is computed evidence, not a retained checkpoint.

The committed payload map was reconciled with all 20 entries of accepted
`payload-lineage.json` (SHA-256 `876ba98fe00d52c52568e43c33ef263cd09f77af2ad7b3e636ce47413dd5032c`). All 18 unique formal
source inputs match their recorded blob IDs and SHA-256 values. Complete-tree
equality proves those inputs, the three manifests, assembler and map unchanged.
Neither workflow path is a mapped payload input.

| Supporting input | Unchanged blob / SHA-256 |
| --- | --- |
| `scripts/assemble-npm-distribution.mjs` | `8c79777614cfb53d0a579d24b11b820a9eafb218` / `4de73665fb8f68cec9e6d1a7721e62cddd6bb435cd144cc649396339fc24ca4c` |
| `scripts/npm-distribution-payloads.json` | `982eb3e63b3496d7047c5e45dc24b6e990202058` / `3073947181fdf710425e9a5b57e72cef74608859bd96325f0b99cd7a28f02286` |

Before/after checks of both the development root and accepted repository matched
HEAD, refs digest, index SHA-256, and separate staged/unstaged binary-diff digests.
Accepted index SHA-256: `1d04419aeaf47526c4a3d53442107023d91ce354b83e4a0fd5e6993cce1fa167`.
Development root index SHA-256: `91b2825ae7f22db1cb5cea37e2c85627f4c3917edcd28779f250a8e4cdcbf7ab`.
Only this report and the patch are retained. Accepted artifacts and other evidence
were never opened for writing; no source worktree write occurred.

## Limits and next gate

A future application requires an independently authorized **new source commit and
tree**, then updated source-to-artifact lineage. This path-only move alone does
not change existing tarball bytes or any mapped package bytes. No new tarball was
built or compared, so clean-commit reconstruction remains unproven. The previously
reported automatic-review reconstruction blocker remains separate; its prepared
script was neither executed nor modified, and this work is not a workaround.

The original 34-commit history still contains the enabled workflow and remains
immutable. The candidate tip removes that workflow from the discovery directory;
it does not establish blanket GitHub Actions suppression. Destination settings,
default branch, other refs, existing workflows and event behavior remain separately
unverified. Any eventual upload requires scoped verification of those conditions.
The preserved reference is not qualified CI, even if later restored.

Owner copyright/provenance and private-history disclosure decisions remain pending;
no acceptance is inferred. Recommend review of this exact patch as the next local
gate, followed only under separate authority by new source identity/lineage work.
Remote checks, workflow qualification, SEP-2 and publication authority remain open.
No repository code, npm, tests, install, pack, authentication, network, commit,
push, workflow registration, remote change or external run/fixture creation occurred.
