# npm runtime release readiness

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

2026-09-07 JST. **Public capability verification and local source reconciliation complete. First publication is blocked by unbound release commits and actual remote authority/state.** This report resolves the documentation-only placeholders in [formal contract §8](../../provider-runtime/docs/reviews/formal-distribution-contract.md#8-inactive-releaseconfiguration-proposal); it does not amend that contract or approve publication.

## 1. Scope and acceptance basis

Change card: primary G, supporting E preparation; protected boundary is release source/artifact identity. Preserve normalized Skill contracts, private Provider separation, explicit actors and targets, and the active candidate's index/worktree distinctions. One package produces this report, official capability evidence, exact source boundaries and one local next execution proposal. Completion requires focused source/hash/link checks. The next gate is owner acceptance of the bounded local source checkpoint below. Rollback is removal of this new report only after a freshness check; no other mutation belongs to this package. No parallel worker, successor or model override was used; configured settings were retained.

The complete [authoritative governance guide](../governance/private-source-integration-guide.md), root AGENTS.md, [task policy](../governance/development-policy.md), [adopted distribution decision](../architecture/distribution.md), formal contract and [implementation checkpoint](npm-runtime-formal-distribution-implementation-checkpoint.md) were read. No nested Skills AGENTS.md was found. The coordinator's acceptance in [environment coordination](environment-cleanup-coordination.md#formal-candidate-implementation-accepted--2026-09-07) supersedes the historical acceptance-pending wording inside immutable implementation receipts. V2's reservation release permits progress; it does not freeze active source.

Adopted coordinates remain `@flair-agency/source-provider-api@1.6.0`, `@flair-agency/private-runtime-files@1.0.0` and full `@flair-agency/coin-expense-reconcile@1.0.0`, initially private in GitHub Packages, organization `flair-agency`, proposed repository `flair-agency/live-agency-skills`, with organization-owned Actions publication. All repository and organization identities here are local proposals until remotely verified. Public documentation access used only unauthenticated web opens on docs.github.com and docs.npmjs.com. No account/repository/package query, registry request, credential inspection, CLI auth, browser session, installation, MCP start or schedule occurred. SEP-2 remains unresolved; this documentation authority does not supply host isolation or account authority.

## 2. Verified platform mechanisms versus unknown actual state

Official pages below were opened on **2026-09-07 JST**. These are current public documentation observations, not a measurement of Flair settings. No action repository was queried and no immutable Action commit is invented.

| Formal §8 question | Supported mechanism and consequence | Actual binding still required |
| --- | --- | --- |
| Publisher credential | GitHub Actions can use `GITHUB_TOKEN` for packages associated with its workflow repository. GitHub's Node publishing example injects it as `NODE_AUTH_TOKEN`; it uses `contents: read` and `packages: write`. [GitHub Node publishing](https://docs.github.com/en/actions/tutorials/publish-packages/publish-nodejs-packages#publishing-packages-to-github-packages) | Exact repository identity, permitted Actions execution and effective package access. A job token is not an organization-owner credential. |
| Minimal workflow permissions | `permissions: {}` removes token permissions; explicit job permissions leave unspecified categories at none. Write includes read; `packages: write` permits upload/publication. Organization policy can restrict write access. [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions) | Publishing needs packages write; contents read only for source retrieval. Verify job/policy restrictions. No contents write, id-token, organization admin or delete request is proposed. |
| Installer versus publisher | Standalone package access uses PAT **classic** with `read:packages` and user read access. PAT publishing needs `write:packages` and write access. Actions may instead use its granted `GITHUB_TOKEN`. npm is a granular-permission registry. [Package permissions](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages) | An explicit installer actor/configuration gets read access only. No PAT is selected or provisioned here. Fine-grained PAT/OIDC is not adopted as a registry-publish substitute. |
| Registry and association | Scoped lowercase npm packages are supported. Map `@flair-agency` to `https://npm.pkg.github.com`; publishConfig selects that publish registry. Each manifest's repository URL can associate multiple packages with one repository. First publication defaults to private. [npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package) | Repository URL must resolve to the intended owner/repository; the three exact names/versions must be checked for collisions. Manifest metadata is not remote linkage evidence. |
| Inheritance and existing visibility | Granular packages inherit linked-repository **access permissions, not visibility**, by default when linked before publication; organizations can disable inheritance. Linking afterward does not automatically adopt permissions. Organization settings govern allowed package creation visibility. Public packages cannot be made private again. [Access and visibility](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility) | Inspect effective access, inheritance, package creation policy and existing package visibility. Do not claim a private package has only one reader. Stop on an existing public target. |
| Manual trigger | `workflow_dispatch` requires the workflow on the default branch; manual invocation requires repository write access and can select a branch. [Manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) | A dispatch input is user-controlled data, not digest-bound approval. Check an owner-approved manifest, exact source/workflow revision and actor. |
| Optional platform reviewer gate | Private/internal environments require Pro/Team/Enterprise; on Free/Pro/Team, required reviewers and wait timers are public-repository-only. Only one configured reviewer must approve; self-review prevention and administrator bypass restrictions are optional. An unknown environment referenced by a workflow can be created without protection. [Environment management](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) | Flair plan and repository privacy are unknown. Do not assume a private Team repository has required reviewers. An environment name alone supplies no approval. |

Interpretation for this release: the platform supports organization Actions publishing without a stored publisher PAT. Use the job token only after explicit target binding. Neither YAML `packages: write` nor the npm scope mapping is a three-name capability restriction: neither accepts a per-name/version allowlist. The release verifier must reject all targets outside the three approved coordinates. That is a workflow control, not token-level confinement. Effective token/package admin relationships may be broader than intended publishing operations; the owner must accept or narrow that exposure after settings inspection, and all delete/visibility-changing code remains excluded. Missing confinement evidence cannot be repaired by silently switching to a broader PAT.

The npm `private: true` field makes npm refuse publication; it is not registry visibility. The three accepted publishable manifests omit it, while private development roots retain it. Their `repository.directory` paths describe source locations in the Skills monorepo. [npm package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json/#private)

First-publish privacy is now a documented mechanism rather than an unresolved platform hypothesis. It is usable only once authorized evidence establishes that the package is new, private creation is permitted, the actor/association are correct and effective access is acceptable. A hidden/inaccessible package can produce absence-like results; an unauthorized 404 is not proof that a coordinate is available. Existing private package/new version requires explicit reconciliation of its current grants. Existing version, unexpected owner, public visibility or ambiguous result stops this release; no overwrite, silent version bump or publish-then-hide response is allowed. These are release-policy stop conditions, not claims that all are automatically enforced by GitHub.

The contract requires human approval of immutable release bytes immediately before publishing. GitHub environment reviewers are an optional implementation of that requirement, dependent on plan. A manual dispatch by the approved publishing owner may be used only with a separately reviewed approval record binding the exact release manifest, actor and destinations, validated by the workflow. It supplies no independent second reviewer. If independent review is chosen and the actual plan cannot enforce it, keep publishing disabled pending an owner-approved alternative; do not require a plan upgrade merely because the optional environment example was shown.

## 3. Measured local identities and artifact lineage

Root HEAD: `6b1f11c17cec53f2adcce5fd88b87666c322f859`, branch `codex/sep1-independent-development`. Skills HEAD: `e78ec0962184fee2b07ea85b3f24545438f232d4`, **detached**. Root and Skills both have empty staged diffs; tracked differences below are unstaged. Read-only index hashes are root `91b2825ae7f22db1cb5cea37e2c85627f4c3917edcd28779f250a8e4cdcbf7ab` and Skills `60e240d69413599086ea6077734b1510d52e422843a6fcb32191df809c12d353`. No commit author/email or credential configuration was inspected; those do not prove remote publisher identity.

The exact accepted-path selector is `files[].path` in [final-manifest.json](/tmp/formal-distribution-preimages-20260907/final-manifest.json), SHA-256 `b534dffc61bc89bcfd865ae57997396297a68c039a73409ea9502562672bc060`. All **115/115 current hashes match**. Its `new` flag means created during implementation, not Git-untracked status: runtime-context existed before that package but remains untracked in Git. Do not stage by that flag.

| Git owner of accepted paths | Accepted paths | Unstaged tracked / untracked | Current HEAD |
| --- | ---: | --- | --- |
| Root | 34 | 29 / 5 | `6b1f11c17cec53f2adcce5fd88b87666c322f859` |
| Skills | 67 | 62 / 5 | `e78ec0962184fee2b07ea85b3f24545438f232d4` |
| MCP operations | 3 | 3 / 0 | `8c5d1dc27dc8fb5ae8250735e3d9cfdb1af0a133` |
| Backstage Provider | 1 | 1 / 0 | `9ad23b67078668a3409e5db3164314fbd5704d3a` |
| Google Drive Provider | 1 | 1 / 0 | `6467cc22baa639259609bb96c849b14d38504033` |
| Expense Provider | 4 | 4 / 0 | `400c25f5a601a29c1387148bbca73fdcd572cb6d` |
| iOS Provider | 3 | 3 / 0 | `2d202687b0199536d8fe07599098f37bc3e773f7` |
| Web Provider | 2 | 2 / 0 | `ff1b613d8ae99188fbb29cca4b7dfc8093243f86` |

These are eight owners of the 115 paths, not a replacement for the inherited nine-repository preservation review (which also covered another owner). A root submodule dirty marker cannot commit its child files. The accepted selector includes existing private consumer deltas solely as qualification/composition lineage; they are not release payload.

[Final artifact receipt](/Users/naokikimura/workspace/.live-agency-development/runs/formal-artifacts-1788719806126-7555/receipt.json) SHA-256 remains `512c7b4dd6bcca269e8cc2850861ed755db143bf38c89347198e877ee4c1698f`. The snapshot inventory SHA-256 is `f2ac766d43b676bfe2db30e8ac9c9e49b6b9b41b8a2480b34f292cd5ff8e27ec`. All 18 unique payload source files match its hashes and receipt payload hashes. Each LICENSE copy uses the Skills MIT license, copyright 2026 Flair LLC, SHA-256 `7c49d59dc268bcc5fbe64321a8beda7006a76fa3ce63480e0a20c2f3b050324e`. Exact inclusion/association is verified; source provenance and publication eligibility remain owner review, not a new legal clearance claim.

| Artifact | Files | Bytes | SHA-256 | Role |
| --- | ---: | ---: | --- | --- |
| `@flair-agency/source-provider-api@1.6.0` | 5 | 15970 | `0b80c1b3dbd5f5d56aed2ba63f83915b1039cb9f3a63c0eb70bea76c8fdb4ca2` | Formal candidate |
| `@flair-agency/private-runtime-files@1.0.0` | 3 | 3553 | `4076996b2aa650f32c3327632f8f468bb6426830c6489ba2127d01bd18ce1c8b` | Formal candidate |
| `@flair-agency/coin-expense-reconcile@1.0.0` | 12 | 11876 | `57c26504eee67e35a0c5a95123ecaef4db2790ede28fe3636d1a8941dbb7a276` | Formal candidate |
| `@fixture/coin-purchase-instruction-provider@1.0.0` | 3 | 744 | `e767a474afb87d1519fd17d240e7985c6dabc56304b0f442374d11d048caac92` | Synthetic qualification only; never publish |
| `@fixture/formal-coin-owner@1.0.0` | 1 | 288 | `56992cd827eef9354e47577e959c1c3b8c0616b17fa4fc123261b8e42b814c68` | Synthetic qualification only; never publish |

All five SHA-256 and SHA-512 integrity values were recomputed and match the receipt. The artifact installation lock hash remains `f5875d2fbed2cb3099528940aceeb23d9ae68205eefefec6d54ccbcb23461521` (inherited lock identity). Source qualification remains **1,010 distinct passing tests = 980 affected + 21 direct + 9 payload**; the 30-test direct log already included payload, and its later 9-test rerun is a replacement. No suite, pack, install or artifact harness was rerun here. No relevant accepted source input changed.

Lineage is: accepted worktree bytes → exact 18-file snapshot inventory plus assembler/map → 5/3/12 ordinary-file payloads → measured tarballs → separate five-tarball lock and two relocated offline installs → retained qualification receipt. The accepted toolchain is Node 22.22.0/npm 10.9.4, darwin arm64; executable/npm-tree hashes are in `receipt.toolchain`. No Actions runner has been qualified. Equality of existing archives and source files does **not** establish reproduction from a clean Git commit or equality of a future registry upload. The accepted HEADs omit required bytes. No release commit, tag, signed approval or registry receipt is implied by acceptance.

## 4. Exact source-freeze and commit-boundary proposal

The following boundaries are proposed only; no files were staged or source trees copied. Keep the active candidate's HEADs, indexes, dirty files and original distinctions intact. Any later mutation requires a fresh owner reservation for the exact affected paths because V2 may advance.

**Skills release source boundary:** freeze the complete accepted 18-path payload inventory below plus the assembler and map. The package directories alone are insufficient: coin source is under `skills/coin-expense-reconcile`, its helper is under `skills/_shared`, and LICENSE belongs to the repository root. A future source commit must include complete selected bytes, including earlier portable runtime, backup API and private-files changes; taking only the latest namespace patch loses accepted functionality. The API index now exports two untracked modules; coin SKILL.md and resolver contain prior portable-route work. Five clean payload files still belong to the hash-bound closure.

State legend: ` M` = index equals HEAD, worktree modified; `??` = untracked; `--` = tracked clean. Every path is relative to the Skills Git root. No row has a staged delta.

| State | Payload source path | SHA-256 |
| --- | --- | --- |
| `--` | `LICENSE` | `7c49d59dc268bcc5fbe64321a8beda7006a76fa3ce63480e0a20c2f3b050324e` |
| `??` | `packages/coin-expense-reconcile/package.json` | `0c85a34255e5938dded1431eb0b5c6fe4fde1031ce64862f5a88d78f4f513f16` |
| ` M` | `packages/private-runtime-files/package.json` | `c3fc49dabe41b318a450cc0371d5880e18b45618d0aadc28306775cd17b2ccd9` |
| ` M` | `packages/private-runtime-files/src/index.js` | `0e23b6d86bb2e675d8069df0a41b89a5010935c53982ac62d043ed785b746679` |
| ` M` | `packages/source-provider-api/package.json` | `4b77cbe8466158c3a1cab2b0fb796ac67d41d3251b9b090193c77ec010983c96` |
| `??` | `packages/source-provider-api/src/backup-capability-contract.js` | `094411c6f276c446460ee8b2ccf992d197aecba67c93422ae6d1ec4f52183623` |
| ` M` | `packages/source-provider-api/src/index.js` | `857ce79325b4b792788e0a46a8b573cecd806cc1e50d22b198f5fa5d8c418669` |
| `??` | `packages/source-provider-api/src/runtime-context.js` | `13b4051bc05918245e97e04b640117ed6d2f9fb43c7b8d6b03c166d7878d1387` |
| `--` | `skills/_shared/is-main.mjs` | `da8c958e9fc2e95b7a547ef3991871f115808d913d24d8e1629b74bcbd875c8f` |
| ` M` | `skills/coin-expense-reconcile/SKILL.md` | `472ae50a37c469d5343a03f6c25c27da30a8e34d583fa0e464199e69b6e7a240` |
| `--` | `skills/coin-expense-reconcile/agents/openai.yaml` | `c792abf9e94ddf7d8ed3af668d65bc09f1ee8abb82b1443b00a1e6ff5bafe1ac` |
| `--` | `skills/coin-expense-reconcile/references/normalized-contracts.md` | `aeb94869c85e4963c40ea4b35bf2ee7ef621b4cd27757ffb4f3690de302eab22` |
| `--` | `skills/coin-expense-reconcile/references/registration.md` | `3c0572f011b0fbdfc280ab7757c6c2353c45b1cd8b3e510dfd1abc7d34cb4f25` |
| ` M` | `skills/coin-expense-reconcile/scripts/coin_expense_core.mjs` | `b97846f6b197c7fa9acd91eaaf89487737c686b63b7e08a4910e07aa5d437034` |
| ` M` | `skills/coin-expense-reconcile/scripts/plan_coin_expense.mjs` | `fa729008abb016373e688adbee68c10b57199f865758d870eb809f64dc5db1f2` |
| ` M` | `skills/coin-expense-reconcile/scripts/prepare_expense_registration.mjs` | `480cf5a56a7c2574db2593ecc54b527e7df83b8c50b2266dec4835c68672bfcc` |
| ` M` | `skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs` | `8e3bfae15c315f09ea5fe95e7568e99464f6068f9b91d6d81560ea9b4d4b876e` |
| ` M` | `skills/coin-expense-reconcile/scripts/verify_expense_registration.mjs` | `ee35486fe1d780fbd1ebf5bb76567c8203ffb19b5016f1f9b948aed8c917adab` |

| Owner | Supporting path | State | SHA-256 |
| --- | --- | --- | --- |
| Skills | `scripts/assemble-npm-distribution.mjs` | `??` | `4de73665fb8f68cec9e6d1a7721e62cddd6bb435cd144cc649396339fc24ca4c` |
| Skills | `scripts/npm-distribution-payloads.json` | `??` | `3073947181fdf710425e9a5b57e72cef74608859bd96325f0b99cd7a28f02286` |
| Skills | `test/npm-distribution-payloads.test.mjs` | `??` | `9498ff18e8f8dd9f12e54709e0468a53c20c7c209c4e4b7c55b81fbc5d024b9f` |
| Root | `scripts/npm-runtime-formal-distribution.test.mjs` | `??` | `b2b4690087a1fbbcf1d6954afb84584a7a7eb7ee17047748dd021519e2db5c59` |
| Root | `package.json` | ` M` | `2135409fb7a66ce50664533e535360826aaeeaad3d3f5dfa93828c86c67f5e91` |
| Root | `package-lock.json` | ` M` | `eeba283a0d3aa01ede3fdaa449b7147ed9f1d2b450dd3d2e2895d0686c66398f` |
| Skills | `package.json` | ` M` | `d3565d4148c84274ab9a6893b7e470cc736c89355d0b4b69f632ae8cef8eda0b` |
| Skills | `package-lock.json` | ` M` | `97a701264b28b8705312b4ea59a4b89c805e869e6af2c44e0d8090d7a1e9eca1` |

**Proposed commit boundaries, without executing them:**

1. Skills owner: one coherent candidate namespace/release-source commit based on the recorded Skills HEAD. Exact reviewed migration membership is the 67 accepted-manifest paths prefixed `skills/live-agency-skills/`, stripped of that prefix. Add the 18-path payload closure as prerequisites (including clean files as verified inputs), not a second Skill copy. This union is 75 paths: 70 differing/untracked paths and five clean payload inputs. Only the full accepted bytes may be selected; earlier dirty content must be attributed to its accepted checkpoint, not presented as newly authored namespace work. Assembler/map/payload test are included among the 67. Before an actual commit, a focused dependency/test-closure check must determine whether additional inherited test fixtures or supporting files are needed in that clean checkout; any additions need an exact amended list, not `git add -A`. A 75-path proposal is source selection, not a claim that all 1,010 tests run from that standalone tree.
2. Root owner: preserve its separate 34-path accepted selector and both composition locks under their actual owners. The root qualification harness and reports stay in the private runtime evidence boundary; none join npm payload. A later root checkpoint can reference the resulting Skills commit and retain the private consumer identities above. Do not commit the current root dirty tree wholesale or publish it as the Skills repository. Child Provider/MCP changes remain with their owners; no private consumer repository must be published to release the three source-neutral artifacts.

The three formal tarballs remain **candidates**. A source checkpoint must connect selected file hashes to resulting commit/tree/blob IDs, then bind those to the accepted inventory, assembler, map and tarballs. A clean-commit reconstruction can first compare ordinary source/payload hashes without rerunning business tests. If a reproducible tarball claim is required, perform one separately scoped offline pack from the frozen commit using the pinned toolchain and compare exact SHA-256/SHA-512; do not substitute a newly packed archive into the approved set without review. Hash mismatch invalidates the affected lineage and approval. Source equality and tarball equality are separate recorded checks.

## 5. Inactive configuration and workflow fragments

Report-only selected npm configuration; never write it to a user's global npmrc:

```ini
@flair-agency:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
ignore-scripts=true
audit=false
fund=false
```

npm supports environment substitution and registry-scoped authentication. Isolated explicit user/global config and a controlled environment must prevent ambient precedence from changing the selection; the scope map routes every Flair name and is not an operation allowlist. [npmrc configuration](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc/)

Publisher injection is `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` in the privileged job only. A separately authorized installer uses packages read (or a selected read-only classic PAT outside Actions); no installer receives the publisher token. No npm login is needed by this proposal. The npm v10 documentation currently labels its page 10.9.9; accepted execution remains pinned to 10.9.4, without claiming new execution validation.

The following is intentionally non-executable **pseudocode**, retained only here. Every `REQUIRES_...` denotes an unbound implementation decision, not an installed script or verified Action. No workflow is created. An environment is used only if its existence, protection and plan support are verified; otherwise an approved manual-approval verifier must satisfy the same release contract before any privileged operation.

```yaml
name: reviewed-private-npm-release
on:
  workflow_dispatch:
    inputs:
      release_manifest_sha256:
        required: true
        type: string
permissions: {}
concurrency:
  group: reviewed-private-npm-release
  cancel-in-progress: false
jobs:
  verify:
    runs-on: REQUIRES_QUALIFIED_RUNNER
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@REQUIRES_REVIEWED_IMMUTABLE_COMMIT
        with:
          persist-credentials: false
          ref: REQUIRES_APPROVED_SKILLS_COMMIT
      - run: REQUIRES_VERIFY_FIXED_MANIFEST_SOURCE_ARTIFACTS_AND_ACTOR
  publish:
    needs: verify
    runs-on: REQUIRES_QUALIFIED_RUNNER
    # Optional: environment: REQUIRES_EXISTING_VERIFIED_PROTECTED_ENVIRONMENT
    permissions:
      contents: read  # remove if approved artifact retrieval does not need it
      packages: write
    steps:
      - run: REQUIRES_VERIFY_APPROVAL_FRESH_PREFLIGHT_AND_EXACT_TARBALL_HASHES
      - run: REQUIRES_PUBLISH_FIXED_API_THEN_FILES_THEN_COIN_TARBALLS_IGNORE_SCRIPTS
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: REQUIRES_READBACK_COORDINATES_BYTES_PRIVATE_VISIBILITY_AND_LINKAGE
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Implementation obligations: validate a fixed lowercase 64-hex manifest digest as data (never interpolate untrusted input into shell code); resolve it only in an approved immutable manifest set, with no input-selected URL/path/command; bind workflow commit, source commit, requester and approval record; retrieve only approved tarballs through a reviewed transport and recheck digests after retrieval. Evidence transfer may require additional narrowly reviewed artifact-read permissions; none are assumed above. Build/test jobs have no package write credential. The privileged job never assembles, repacks or installs workspace dependencies. No push/release/PR/scheduled trigger is proposed. Concurrency serializes this workflow's set, but cannot prevent another publisher racing; freshness and uncertain-result reconciliation remain required.

A future private release-manifest proposal must bind: the three exact coordinates above; registry and private visibility; verified org/repo immutable IDs and association; exact Skills source/tree commit; root qualification-source identity separately; snapshot/map/assembler hashes; all payload hashes; three formal tarball SHA-256 and SHA-512 values from the receipt; coin's two exact dependencies; qualification receipt digest and 1,010-test lineage; pinned toolchain and actual runner/Action revisions; explicit publishing actor and allowed operations; fresh preflight identity/result/expiry; manual approval identity/time/digest. Unbound values mean inactive. The two fixture artifacts must be excluded by an explicit three-entry check, not filename globbing. No token value belongs in this manifest.

## 6. One next execution proposal and first-publish blockers

**Recommend one local release-source checkpoint next, before authenticated preflight.** It can progress while SEP-2 remains unresolved. Requested owner scope: Skills source owner and root qualification owner authorize only read-only reconciliation and an owner-only checkpoint artifact under a freshly selected development `runs` directory. Inputs are the exact accepted manifest, receipt, 75-path Skills union and root harness identity above. Active source, Git indexes/refs and source snapshots remain read-only. No commit creation is included in this next package.

Concrete output: a private, non-executable commit-selection manifest mapping those selected current bytes to existing HEAD/index blobs and intended owner boundaries, plus a reviewed patch/commit proposal resolving inherited prerequisites and qualification-fixture closure for an isolated future Skills commit. Compare the accepted 18 source hashes and map/assembler directly to the selected commit proposal; retain exact HEAD/index distinctions. Report the exact remaining untracked prerequisite/test paths if a clean checkout cannot supply them. Complete with a bounded commit envelope ready for owner authorization, not a fresh broad preservation backup. Do not copy real/private Provider data, create branches/tags/commits, stage, install or repack. This closes the local source-selection gap before requesting account authority; the actual commit can only follow explicit acceptance of that envelope.

Before first publication, later explicitly scoped authorized READ must establish these facts; this is a blocker definition, not a second package started here:

| Exact resource | Required owner/actor evidence and permitted read result |
| --- | --- |
| Organization `flair-agency` | Owner binds immutable organization ID, a named read actor and a selected credential reference after host isolation; organization owner provides readable private-package creation policy, inheritance default and applicable plan. No guessed login, broad org enumeration, token creation or secret retrieval. |
| Repository `flair-agency/live-agency-skills` | Bind immutable repository ID/owner/privacy/default branch, approved source/workflow revision, effective Actions restrictions, publisher package relationship, and any chosen environment's actual rules/bypass/self-review settings. Repository administrator supplies settings evidence if ordinary read access cannot expose it; do not elevate silently. |
| npm `@flair-agency/source-provider-api` / `1.6.0` | Package identity, owner, visibility, repository association, grants/Actions access, exact version existence and metadata integrity. |
| npm `@flair-agency/private-runtime-files` / `1.0.0` | Same bounded reads for this package/version only. |
| npm `@flair-agency/coin-expense-reconcile` / `1.0.0` | Same bounded reads, plus the two exact declared dependency coordinates. |

The read actor must actually be able to see private targets and relevant settings. A package read permission does not imply organization-settings visibility; an owner may provide a bounded settings export rather than granting broad administration. Capture only resource IDs, policy facts, non-secret credential reference, granted read operations, timestamps and decisions. Empty/denied/ambiguous reads leave the blocker open. Download of an existing colliding artifact for byte reconciliation would need explicitly bound read scope; no general registry install or org-wide package listing is implied.

A successful future publish readback must show each exact name/version under Flair, effective `private` visibility, intended repository ID/link, approved grants/Actions access, remote declared dependency/manifest identity, registry integrity matching SHA-512, and downloaded tarball SHA-256 plus exact payload/LICENSE matching the approved archive. Use an explicitly selected read actor; missing visibility evidence is not success. Confirm each library before coin and hold dependent installation until all three reconcile. Partial publication is a recorded partial state; timeout or uncertainty requires readback before retry. There is no cross-package transaction, automatic rollback deletion, visibility change or silent republish.

Remaining first-publish blockers are therefore specific: source commits/qualification closure, publication eligibility acceptance for the selected bytes, qualified workflow/runner and immutable Action revisions, actual org/repo/package identity/privacy/access and coordinate freshness, accepted token-authority exposure, and digest-bound manual publish approval. SEP-2 plus scoped authenticated authority precedes live account inspection. Candidate artifact equality resolves none of those by itself.

## 7. Focused verification and limits

Read-only checks measured 115 accepted current-file hashes, 18 payload source hashes, snapshot inventory, assembler/map/harness hashes, final receipt and five tarball SHA-256/SHA-512 values. Root/Skills staged diffs were empty and their HEAD/index identities were retained. Official source links were opened via unauthenticated web tools; local report links and whitespace were checked. One initial Git metadata script stopped on the detached Skills HEAD; it was corrected to record detached state, with no mutation. No runtime tests were rerun, no full preservation capture was repeated, and no release-readiness execution success beyond these checks is claimed. Sole edited file: this report.
