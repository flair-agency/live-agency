# npm runtime source publication eligibility

2026-09-07 JST. **Bounded technical inventory complete; source disclosure and publication remain unapproved.** The three formal package payloads have no confirmed source-acquisition or secret finding in this inspection. The complete proposed Git repository exposes substantially more: historical private Provider dependency locations, service-to-Provider architecture documentation, author identity metadata, and an existing push-triggered CI workflow. Owner decisions below are required before treating that repository as eligible for initial PRIVATE disclosure. This report is neither legal clearance nor authority to upload, publish, or change visibility.

## Scope and immutable evidence

Change card: primary G; protected boundary is public Skill/private Provider separation and release-source disclosure. Invariants: no source, index, ref, accepted evidence, operational configuration or registration mutation. One outcome is this source/history/license inventory with concrete findings and unresolved owner decisions. Verification is local Git-object inspection and receipt/hash reconciliation; rollback is removal of only this report after checking for later owner edits. No parallel work, successor, subagent, cross-task message or model override occurred; configured model settings were retained.

The applicable root AGENTS, [task policy](task-orchestration-policy.md), complete authoritative [Private Source Integration Guide](governance/private-source-integration-guide.md), [distribution decision](npm-runtime-distribution-decision.md), [formal contract](npm-runtime-formal-distribution-contract.md), [release-source checkpoint](npm-runtime-release-source-commit.md) and [readiness report](npm-runtime-release-readiness.md) supply the local review basis. The guide is not reproduced or independently rewritten here. No AGENTS path or historical guide file was found in the inspected Skills history. Historical architecture/policy prose is evidence of disclosed content, not a replacement authority for the current guide.

| Bound identity | Read-only result |
| --- | --- |
| Repository | `/Users/naokikimura/workspace/.live-agency-development/runs/release-source-commit-20260907-01/skills` |
| Selected commit | `f2a476a6e22b1510e262e79cda651c764aa68953` |
| Selected tree | `0117c308c92851e61256ef97399e2f3a94eb8fca` |
| Parent | `e78ec0962184fee2b07ea85b3f24545438f232d4` |
| Oldest reachable commit | `c60504a057d6980360252630a48ceaee822d37b5` |
| Branch | `refs/heads/codex/npm-release-source-selection` |
| Other local ref | `refs/heads/v2/domain-mcp-architecture`, pointing to the parent; adds no ancestry outside the selected closure |
| History | Non-shallow; 34 commits, 383 trees, 436 distinct blobs: 853 reachable objects |
| Content coverage | 182 tip paths; 184 paths across all reachable commit trees; 2,864,308 bytes across distinct blobs; no NUL-containing blobs |
| Tip modes | All 182 entries are ordinary `100644` blobs; no symlink or gitlink payload |

A push of the selected branch exposes its reachable history, including files removed at the tip and commit authors/messages. The 77 changed paths of the last commit, 82 selected checkpoint inputs, and 18 package inputs are **not** the repository disclosure boundary. The repository has 119 files under `skills/`, 23 tests, 21 fixture files, seven package files, three scripts, two docs, and seven other root/workflow files. The two historical-only paths are `packages/lark-base-client/package.json` and `packages/lark-base-client/src/index.js`. No additional refs, tags, unreachable objects, reflogs, remote repository, LFS contents or external linked repositories are authorized disclosure targets by this inventory. No network query was made.

## Formal package payload versus repository

The committed map `scripts/npm-distribution-payloads.json`, blob `982eb3e63b3496d7047c5e45dc24b6e990202058`, maps 18 unique source files to 20 destinations. Manifest files become each package's root `package.json`; library `src/` paths retain their suffixes; coin Skill/helper paths retain their full relative paths; the one root LICENSE is used three times. No other repository path is in these package payloads.

| Formal candidate | Ordinary files | Existing candidate tarball SHA-256 |
| --- | ---: | --- |
| `@flair-agency/source-provider-api@1.6.0` | 5 | `0b80c1b3dbd5f5d56aed2ba63f83915b1039cb9f3a63c0eb70bea76c8fdb4ca2` |
| `@flair-agency/private-runtime-files@1.0.0` | 3 | `4076996b2aa650f32c3327632f8f468bb6426830c6489ba2127d01bd18ce1c8b` |
| `@flair-agency/coin-expense-reconcile@1.0.0` | 12 | `57c26504eee67e35a0c5a95123ecaef4db2790ede28fe3636d1a8941dbb7a276` |

All 20 lineage entries were freshly checked against committed source blob IDs and source SHA-256 values. Existing archive identities above are receipt metadata, not newly reconstructed archives or registry observations. Assembler blob `8c79777614cfb53d0a579d24b11b820a9eafb218` is supporting repository source, not a package payload file. The two `@fixture` artifacts remain excluded qualification evidence.

| Unique package input | Committed blob |
| --- | --- |
| `packages/source-provider-api/package.json` | `3d53818e16c196c5c2ee8f06aa10a1fdaad8c3ad` |
| `packages/source-provider-api/src/index.js` | `9a97a930997c0d98d7a4a340b467e8aafe7c60ab` |
| `packages/source-provider-api/src/runtime-context.js` | `c8fa0c10692cbadd1606738628b920e1aa964809` |
| `packages/source-provider-api/src/backup-capability-contract.js` | `c92b39c3828da14850fea77fa0af043df3a04af3` |
| `LICENSE` | `c30adfd274faf9529e6c4af13ecbec32e2ec3293` |
| `packages/private-runtime-files/package.json` | `b0ccd7e56b256619336a46650388c3398ecca20b` |
| `packages/private-runtime-files/src/index.js` | `c41fed0b9457f8930e3113fc142110f7e09969c5` |
| `packages/coin-expense-reconcile/package.json` | `09881b32c83dd0251c1cccf829bbc39b9f6996a2` |
| `skills/coin-expense-reconcile/SKILL.md` | `69307e2b72d8ba8267bac8469dc99f0060e02fed` |
| `skills/coin-expense-reconcile/agents/openai.yaml` | `867063cfe54042bd04cf1d0824af0f06712ef3dd` |
| `skills/coin-expense-reconcile/scripts/coin_expense_core.mjs` | `8c0ebb3c7ccbbc247a2c9eda4eb8242bf50e3437` |
| `skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs` | `8fd81cf4e8c0c372e4645a8943480ebd0c28e57b` |
| `skills/coin-expense-reconcile/scripts/plan_coin_expense.mjs` | `fee1b57990a0d8a138416792b4cc52ea7881c199` |
| `skills/coin-expense-reconcile/scripts/prepare_expense_registration.mjs` | `55a7b8312b20351fc0d237df57f93937bc903038` |
| `skills/coin-expense-reconcile/scripts/verify_expense_registration.mjs` | `4c96a4b479ebb514c4c8238ee2dc2b654ada8d77` |
| `skills/coin-expense-reconcile/references/normalized-contracts.md` | `1a3c61583baf190d9123c7e3c3b7f1e9c11a0f31` |
| `skills/coin-expense-reconcile/references/registration.md` | `bb087f3fdc130832b05c1031e5d5728bbf7a87f8` |
| `skills/_shared/is-main.mjs` | `ad188ff1f90d49650d43c196f10b481043d452f4` |

Coin prose/references describe normalized synthetic contracts, exact matching, reviewed plans, private accounting policy and readback. They do not supply authenticated acquisition instructions. Library static imports are Node built-ins and their own relative modules; coin declares only the two exact formal library dependencies. The map excludes other Skills, destination transports, fixtures, CI, architecture docs and historical manifests. This supports a bounded content finding for the three candidates; it does not prove authorship rights or operational correctness.

## Concrete findings and required dispositions

| ID / boundary | Evidence location and identity | Finding and disposition |
| --- | --- | --- |
| E1 — repository history | Historical `package.json` blob `46bf7b05c13e020eb726cbc34c0e83651ba98b8c`; `package-lock.json` blob `71b6c501f1fd4f7ee3c4d157862e54345df2953d` | A dependency and resolved Git location identify a private Provider repository. The lock also contains SSH Git user syntax; this is not a discovered password. Values are withheld. The current root lock uses local workspace links, but that does not erase the historical disclosure. Owner must explicitly decide whether this history may be shared with the selected PRIVATE repository readers. Public repository eligibility is unresolved. No private dependency code was fetched. |
| E2 — repository documentation | `docs/provider-architecture.md` blob `bd1b0a5138285637edb5a0bbffd08ee3a376eac0`; `docs/migration-roadmap.md` blob `4fa2272e25db5adabdceee5cf0a8657fe05d99bc`; ten earlier matching document blobs | Documents enumerate real service/Provider relationships and acquisition responsibility families. No source export schema, authenticated DOM selector or actual acquisition procedure was confirmed by the bounded scan. This still discloses internal architecture beyond the formal package scope. Owner must accept this disclosure to a named private audience or request a separately scoped source-boundary remediation proposal. Presence in the commit is not permission to publish it. |
| E3 — push effects | `.github/workflows/ci.yml` blob `7c130e15bb34ecc8542cbbdd11cce1ce95e33630` | Existing workflow declares push/pull-request triggers, moving Action tags, `ubuntu-latest`, Node 22, `npm ci`, tests and the public-content script. It is not the proposed qualified/manual publication workflow and does not disable install hooks. A later push must not accidentally activate it. Before upload, bind verified destination workflow suppression or a separately approved source change; neither is performed here. |
| E4 — identity metadata | All 34 reachable commit objects; selected commit above | One distinct author/committer name/email identity was observed. Values remain withheld. Six commit messages match Provider/service terminology. These metadata are disclosed with history and are not covered by a tarball file allowlist. Owner must accept identity/message disclosure; authorship strings do not establish copyright title or publisher rights. |
| E5 — destination code outside packages | For example `skills/creator-profile-sync/scripts/profile_lark_runtime.mjs`, blob `8c61605a994f04dc5a85cc7a6b2d52857cab46cc`; removed client blobs `22351bb5537fb7162ff674a99b50aace5b7e6be6`, `1a8d61315c467b2eb0767cbe42ec217ef1021fa5` | Current and historical destination transport code contains Lark API origins. These are destination API references, not confirmed private source-portal URLs; the guide permits destination API operations. They do not enter the three packages. Retain this distinction in any later public repository review; the present task does not requalify other Skills. |
| E6 — scan false positives | `scripts/check-public-content.mjs` blobs `b92e0ff82d707e5aae50b3937615d93a92a01eb1`, `12e08b16fe3678d36af2fa09e225430e257b9db8`, `b8d7c4e0ab4a5a5551ff67635cacbb2d1f86aea1` | Three private-key-pattern matches are scanner regular-expression literals, not private keys. Quoted long-secret assignment search returned no matches. No rotation or deletion is justified by these matches. The checked-in scanner was read, never run; it scans working files, not reachable history, and cannot itself clear this review. |

Resource-ID searches also matched schema words and synthetic-looking examples/tests. Follow-up examples include `skills/creator-profile-compaction/references/lark-config.md` blob `a6ed564dee520855601801dae901f36c8d73cd29`, `skills/creator-profile-sync/references/normalized-profile-observations.md` blob `6921facff056e7644ac803309e88169566cd1c00`, and `test/live-history-sync.test.mjs` blob `db52bb40b4e36ed8e4932a23079f9f2c67ded18f`. Their contexts are field mappings, normalized examples and constructed test records; no real resource identity was established. Synthetic fixture instruction resources explicitly request synthetic observations. Tests also construct mock archive URLs; these are not verified live resources. No service-specific account lookup was attempted to resolve these values.

## License and third-party provenance inventory

There are exactly two distinct LICENSE blobs in reachable history, both MIT text. Current blob `c30adfd274faf9529e6c4af13ecbec32e2ec3293` states copyright 2026 Flair LLC; SHA-256 is `7c49d59dc268bcc5fbe64321a8beda7006a76fa3ce63480e0a20c2f3b050324e`. Initial blob `e6400ef97b0cbc24e966101db3facc61451f3c8e` states copyright 2026 合同会社Flair. Commit `186167a32850a971bf933b0463383c7cc1991896` changes one line. Replacing only that holder spelling makes the two blobs byte-identical. This is a concrete naming/provenance question, not evidence of incompatible license terms: the owner must confirm the entity relationship and authority for the notice change.

All three formal manifests declare MIT and all three mapped payloads include the same current LICENSE. No separate NOTICE, COPYING, AUTHORS, CONTRIBUTORS, third-party attribution file or per-file SPDX notice was found through path/content inventory. README variants refer to licensing; a gift Skill copyright-related word is business prose, not a separate license grant. No conflicting license text was identified. No vendored third-party runtime dependency is visible in the formal payload dependency/import inventory. The current development lock contains local workspace packages, while the historical private Git dependency in E1 has separate, uninspected source rights. CI references external Actions, whose code and licensing were not fetched or audited.

Missing evidence remains material: there is no inspected assignment/contributor permission record or provenance attestation connecting all selected code/documentation and inherited history to the named copyright holder, nor an owner attestation that copied third-party material requiring additional attribution is absent. A license filename, one Git author identity, lack of dependency imports, or a successful test receipt cannot supply that evidence. Owner must confirm provenance and required notices for the exact payload and separately for the larger private-history disclosure. This is a technical inventory, not a legal opinion or a requirement invented from an external legal source.

## Coverage, evidence checks and limitations

Local `rev-list`, `ls-tree` and `cat-file` reads enumerated every reachable commit tree and distinct blob from the selected commit. Scans covered paths, UTF-8-decoded blob text and commit metadata/messages. Categories included source-service names, URLs, local home paths, credential assignment/key/token shapes, long resource-ID shapes, browser acquisition identifiers, email patterns and copyright/license/attribution terms. No NUL-containing blob was skipped. Service keywords matched 12 document blobs; URL patterns matched 57 blobs; local-home-path patterns matched zero; key-pattern matches were the three scanner literals; broad ID patterns matched 109 blobs and required contextual narrowing. Commit-message scans found no URL, email or selected secret-shape match; the author headers themselves contain the identity described in E4.

The audit used independent inline inspection code; it did not execute repository code. Git global/system configuration, replacement objects and optional locks were disabled for object inventory. No credential lookup, ambient auth, general host/account scan, remote access, pack/install/test, MCP start, source export/copy, new external run, Git commit/push, history rewrite, redaction, deletion, schedule or registration occurred. The sole authored artifact is this report. The isolated repository's tracked status was clean; its index SHA-256 measured `1d04419aeaf47526c4a3d53442107023d91ce354b83e4a0fd5e6993cce1fa167`.

The following existing evidence files were rehashed without editing them. Paths are under the release-source generation above, except the artifact receipt under `runs/formal-artifacts-1788719806126-7555/`.

| Receipt | Verified SHA-256 |
| --- | --- |
| `commit-verification.json` | `4a177f9cc98a6978e6ba66ca0d9c6b6eea8e16b60288d38b0505ba8737467d8f` |
| `payload-lineage.json` | `876ba98fe00d52c52568e43c33ef263cd09f77af2ad7b3e636ce47413dd5032c` |
| `selected-blobs.json` | `20c76b034686410443a906fae0bb66a687cffeeb880090502fb7ad5ade729a1c` |
| Formal artifact `receipt.json` | `512c7b4dd6bcca269e8cc2850861ed755db143bf38c89347198e877ee4c1698f` |

This is complete enumeration with bounded pattern/context inspection, not semantic line-by-line certification of every historical version. It is not proof that secrets, real data, copied code or contractual restrictions are absent: obfuscated values, unrecognized services/identifiers, unmarked copied material and off-repository rights evidence can escape the checks. No legal or remote-account facts are inferred. Prior 1,010-test qualification remains inherited evidence only.

Reproduction task `01a07825-e44c-7871-9c09-31d31ad97d76` remains **BLOCKED before execution by automatic review despite direct owner approval**, as supplied in this task's scope. It was not retried, modified, rerouted or contacted. Source/receipt equality here does not establish clean-commit reconstruction or resolve that independent gate.

## Decision and one next actionable gate

**Next: obtain one owner disposition bound to this exact commit/tree and its 34-commit history.** The concrete decision record should confirm copyright/provenance and the holder-name transition, accept or reject E1/E2/E4 disclosure to the intended PRIVATE repository audience, and select a verified CI-suppression prerequisite for E3 before any eventual push. If the owner rejects any disclosed content, the next authorized work must be a bounded remediation proposal with newly reviewed source identity; no automatic history editing or broad requalification follows from this report.

The three package candidates can be considered separately from repository disclosure because the identified historical/private-reference paths are outside their payload map. They still require owner provenance acceptance and the existing release gates. Initial private hosting is external disclosure to a selected audience, not public eligibility and not an exception permitting real data or secrets in Git. A future PUBLIC repository or package transition requires separately approved review of its then-exact content, history where applicable, audience and rights. SEP-2, scoped remote actor/resources, actual privacy/access/version freshness, qualified workflow/runner, digest-bound publish approval and the independent reconstruction blocker remain as recorded in readiness and the task scope. None is cleared by this inventory.
