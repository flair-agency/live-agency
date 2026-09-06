# Formal npm distribution contract and implementation brief

2026-09-07 JST. Status: **offline design complete; implementation proposal**.
Only this English report is authored. No manifest, lock, source, index, handoff,
ledger, registration or workflow is changed. No installation, packing, fetching,
publication, synthetic rerun, external query or credential inspection occurred.
Configured model settings were retained; no delegation or cross-task messages.

## 1. Change card and adopted direction

- Primary E, supporting D/G; protected boundaries: shared library identity,
  individual Skill payload, private composition dependency graph and release identity.
- Invariants: normalized public business contracts, private Provider knowledge,
  explicit profile/actor/resource/operation selection, no ambient fallback, preserved
  operational route, and unchanged business authorization semantics.
- One package now: this concrete manifest/payload/migration/release design.
- Definition of done: exact proposed manifests, payload closure, bounded owner
  inventory, local acceptance criteria, external gates and selective rollback.
- Next gate: coordinator accepts this implementation envelope and reserves its
  intersecting files with the v2 owner. Registry choices are already settled.
- Verification: static source and report checks only; rollback removes this report
  only if still unchanged. No parallel work is requested.

The [adopted owner direction](npm-runtime-distribution-decision.md) fixes
`@flair-agency`, GitHub Packages, initially private distribution, individually
reviewed later public transitions, Flair organization ownership and organization
GitHub Actions publication. The first independently npm-managed Skill is the full
coin-expense-reconcile Skill. These are owner choices, not verified remote facts.

The complete [Private Source Integration Guide](governance/private-source-integration-guide.md)
and [task policy](task-orchestration-policy.md) govern this proposal. The guide is
not duplicated. Source snapshots and operational data are excluded. Current v2
row-archive design, active callers, handoff and ledgers retain their existing owner;
this report does not allocate or edit those files itself.

## 2. Concrete identities, versions and repository association

| Artifact | Observed local source | Proposed first new-name version | Reason |
| --- | --- | --- | --- |
| `@flair-agency/source-provider-api` | `@live-agency-skills/source-provider-api@1.6.0` | `1.6.0` | Preserve contract lineage; API_VERSION remains 1.6.0. New package identity makes this a new artifact, not a replacement of old-name bytes. |
| `@flair-agency/private-runtime-files` | `@live-agency-skills/private-runtime-files@1.0.0` | `1.0.0` | Preserve existing library lineage and signatures. |
| `@flair-agency/coin-expense-reconcile` | Unversioned individual Skill within private aggregate `live-agency-skills@0.0.0` | `1.0.0` | First complete standalone artifact of an existing business contract; aggregate version is not a Skill release version. |

These exact versions are proposals, not claims of unused registry coordinates.
If a coordinate already exists, stop: compare ownership and bytes under separate
read authority; never overwrite, infer equivalence, or silently bump. A changed
accepted release requires a new reviewed version. Namespace migration is a consumer
breaking identity change even though the API wire version is unchanged; do not
pretend semver ranges on the old name migrate users.

All three artifacts associate with `flair-agency/live-agency-skills`, as proposed
from the actual `.gitmodules` Skills repository association. Their repository
`directory` values are relative to that repository, not the outer composition.
No repository move or new repository is needed. This is local metadata evidence,
not verification of repository existence, privacy, organization administration,
package linkage, or token rights. The local Skills LICENSE is MIT, copyright
2026 Flair LLC; include those exact license bytes in all three artifacts, subject
to review of the complete selected source's licensing. Do not invent an author.

Keep root `@flair-agency/live-agency-provider-runtime@1.0.0`, private Skills
aggregate, core, MCP and all Provider names/private flags unchanged. In particular,
`@live-agency-skills/lark-base-client@2.0.0` is deliberately retained. The provisional
Runtime name/bin from earlier design is not created by this package.

## 3. Implementation-ready manifest examples

These examples describe staged artifact roots. Library source manifests live at
`skills/live-agency-skills/packages/{source-provider-api,private-runtime-files}/package.json`.
Add the coin artifact manifest at
`skills/live-agency-skills/packages/coin-expense-reconcile/package.json`.
The assembly procedure in §4 supplies its payload; the new directory is not an
independently runnable workspace source copy.

```json
{
  "name": "@flair-agency/source-provider-api",
  "version": "1.6.0",
  "description": "Source-neutral provider discovery and normalized contracts for live agency skills",
  "type": "module",
  "exports": "./src/index.js",
  "files": ["src/index.js", "src/runtime-context.js", "src/backup-capability-contract.js", "LICENSE"],
  "license": "MIT",
  "engines": {"node": ">=22"},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/flair-agency/live-agency-skills.git",
    "directory": "packages/source-provider-api"
  },
  "publishConfig": {"registry": "https://npm.pkg.github.com"}
}
```

```json
{
  "name": "@flair-agency/private-runtime-files",
  "version": "1.0.0",
  "description": "Owner-only atomic runtime files for live agency skills",
  "type": "module",
  "exports": "./src/index.js",
  "files": ["src/index.js", "LICENSE"],
  "license": "MIT",
  "engines": {"node": ">=22"},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/flair-agency/live-agency-skills.git",
    "directory": "packages/private-runtime-files"
  },
  "publishConfig": {"registry": "https://npm.pkg.github.com"}
}
```

```json
{
  "name": "@flair-agency/coin-expense-reconcile",
  "version": "1.0.0",
  "description": "Validate normalized coin receipts, plan exact expense matches and verify approved registrations",
  "type": "module",
  "exports": {
    "./SKILL.md": "./skills/coin-expense-reconcile/SKILL.md",
    "./core": "./skills/coin-expense-reconcile/scripts/coin_expense_core.mjs",
    "./resolve": "./skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs",
    "./plan": "./skills/coin-expense-reconcile/scripts/plan_coin_expense.mjs",
    "./prepare": "./skills/coin-expense-reconcile/scripts/prepare_expense_registration.mjs",
    "./verify": "./skills/coin-expense-reconcile/scripts/verify_expense_registration.mjs"
  },
  "files": [
    "skills/coin-expense-reconcile/SKILL.md",
    "skills/coin-expense-reconcile/agents/openai.yaml",
    "skills/coin-expense-reconcile/scripts/coin_expense_core.mjs",
    "skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs",
    "skills/coin-expense-reconcile/scripts/plan_coin_expense.mjs",
    "skills/coin-expense-reconcile/scripts/prepare_expense_registration.mjs",
    "skills/coin-expense-reconcile/scripts/verify_expense_registration.mjs",
    "skills/coin-expense-reconcile/references/normalized-contracts.md",
    "skills/coin-expense-reconcile/references/registration.md",
    "skills/_shared/is-main.mjs",
    "LICENSE"
  ],
  "dependencies": {
    "@flair-agency/source-provider-api": "1.6.0",
    "@flair-agency/private-runtime-files": "1.0.0"
  },
  "license": "MIT",
  "engines": {"node": ">=22"},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/flair-agency/live-agency-skills.git",
    "directory": "packages/coin-expense-reconcile"
  },
  "publishConfig": {"registry": "https://npm.pkg.github.com"}
}
```

Field decisions: omit `private` on these three intended publishable artifacts;
keep `private: true` on development compositions. Neither omission nor `private`
controls registry visibility. Do not add an unverified `access` setting as proof
of privacy. No lifecycle scripts, bundled dependencies, optional dependencies,
Provider dependencies, wildcard exports, global installer or MCP start is included.
No `bin` is added: execute the four CLI modules with explicit Node and an explicitly
selected installed path. `core` is a programmatic export; no root default export
is promised. Resource resolution via `./SKILL.md` locates the nested Skill folder;
relative reference and script links remain intact. `exports` is an API surface,
not a permission or secrecy boundary.

`engines >=22` is a proposed baseline aligned with the outer runtime. Acceptance
is limited to the inherited qualified Node 22.22.0/npm 10.9.4 macOS arm64 toolchain
until measured otherwise; it does not certify all Node 22+ or operating systems.
The release toolchain is explicitly pinned outside these runtime manifests.

## 4. Full payload closure and assembly layout

Keep authoritative Skill source at `skills/live-agency-skills/skills/coin-expense-reconcile/`.
Do not move it into packages, duplicate it as maintained source, or change shared
is-main semantics. Add an explicit assembler at
`skills/live-agency-skills/scripts/assemble-npm-distribution.mjs`, taking mandatory
source snapshot, destination and expected source-inventory digest. Its input map
is the literal allowlist in the manifests, not a directory copy or runtime discovery.

For coin, map the nine existing files under `skills/coin-expense-reconcile/` to
identical staged paths; map `skills/_shared/is-main.mjs` to that identical staged
path; copy the repository LICENSE to root LICENSE; copy the reviewed coin manifest
to root package.json. Expected archive: **12 ordinary files** including manifest.
API has **5** files including manifest and license; private-files has **3**.
Npm-added files must not be silently accepted: compare measured archives to these
exact sets. Pack only the three isolated stage roots with hooks disabled.

The four coin CLIs import `../../_shared/is-main.mjs`; their current relative
imports now resolve inside this one package. The helper imports only Node fs/url.
The core imports Node crypto and API validators. Resolver imports Node path/fs,
API functions and private-files functions. Plan/prepare/verify import private-files
and the sibling core. API index exports runtime-context and backup-capability-contract;
runtime-context imports the index and Node built-ins. Private-files uses Node
built-ins. Neither library currently imports a third-party runtime package.
Keep the generic backup contract in the API closure because index exports it;
removing it would change the existing shared API. It is library API, not a bundled
backup Skill or private Provider.

Exclude `_shared/lark-base-client.mjs`, all other Skills, fixtures, tests, private
Providers, knowledge/instruction resources from those Providers, runtime profiles,
credentials, generated data, root docs, AGENTS, node_modules and synced sources.
The coin agent YAML has interface metadata only; preserve its Skill name and
prompt. Both normalized-contracts and registration references are required;
initial private registry visibility does not permit adding private service material.
No new shared package is warranted for this single built-in-only helper. Its
staged copy is generated from one hashed source, never independently edited.

Add `scripts/npm-distribution-payloads.json` inside the Skills repository as the
assembler's reviewed exact source-to-target map for these three packages. Stage
roots and evidence go only to fresh designated development fixtures/runs; do not
check in generated payloads. Reject changed source digests, extra/missing files,
links, traversal, destination reuse or a source root outside the selected snapshot.
No install/build hook invokes this assembler automatically.

## 5. Migration decision and composition boundary

Choose **coordinated atomic candidate migration**, not staged compatibility aliases.
Reserve and migrate the two exact library identifiers throughout the bounded
candidate graph in Appendix A as one accepted logical change. Update
`API_PACKAGE_NAME` in API `src/index.js`; leave `API_VERSION` and capability/wire
identifiers unchanged. Change imports and dependency/peer keys for only these two
names. Existing numeric dependency pins and peer ranges remain unchanged, including
fixture ^1.0.0/^1.4.0 and private Provider ^1.6.0 ranges. Add coin's exact pins as
shown. Reject old-name-only peers through existing fail-closed validation.

No wrapper, npm alias, `npm:` dependency, dual peer map or automatic fallback is
introduced. Installing both API identities can create separate module/WeakMap
brands; never pass portable handles across them. No old package availability,
registry alias ownership or deprecation capability is assumed. Old clients remain
on the retained old operational composition. New candidate consumers must all
resolve the new API identity or fail before activation. Logical candidate atomicity
does not mean GitHub publishes multiple packages transactionally.

Keep the new coin packaging directory out of source workspace auto-discovery until
its assembled payload exists: replace Skills aggregate `packages/*` with explicit
`packages/source-provider-api` and `packages/private-runtime-files`, retaining
`fixtures/*`. Test the coin artifact in an ordinary-file isolated install, not a
broken workspace symlink to its manifest-only directory. Root workspace membership
stays unchanged. Both composition manifests replace only the two existing library
dependency keys; the root does not become a formal published Runtime.

The public coin package must never directly depend on a private or fixture Provider.
For portable instruction testing, a separate private synthetic owner manifest
(named `@fixture/formal-coin-owner@1.0.0`) directly pins the installed coin package,
API, files and `@fixture/coin-purchase-instruction-provider@1.0.0`. Context.owner
selects that owner, **not the public Skill**: RLS-1 requires the selected Provider
as an exact direct owner dependency. The owner lists only reviewed packages.
Provider descriptor remains inert; package name/version and API interval stay
unchanged, its peer key changes. Recompute selected manifest/context hashes.
Fixture expense and registration paths remain explicit legacy-root tests, never
portable execution or acquisition. No real Provider joins the public artifact.

The two source locks belong to root and Skills owners respectively. Reconcile
both from the accepted candidate manifests using the pinned toolchain, hooks
and network disabled, with explicit approved local inputs; do not hand-edit
integrities or let npm fetch missing new names. New names that cannot resolve
locally stop lock qualification. Workspace locks are development evidence only.
Generate a separate artifact-only synthetic installation lock under development
fixtures using reviewed tarballs; later registry consumer locks require separately
verified registry artifacts and install authority. Preserve old locks and recovery
artifacts unchanged. Root postinstall must not run; perform any permitted nested
lock/install operation explicitly with `--ignore-scripts`.

## 6. One IMPLEMENTATION package and ownership

Outcome: renamed candidate graph plus three complete isolated candidate artifacts
and their focused qualification, with no operational or external effect. The
coordinator reserves Appendix A files against v2 before any shared mutation and
captures exact worktree bytes, staged bytes, raw indexes and repository revisions.
A current source snapshot must include accepted dirty/untracked closure, especially
API backup/runtime-context code; HEAD alone is insufficient. Changed inventory
requires a bounded owner rebind, not a global replacement.

| Owner | Implementation envelope |
| --- | --- |
| Skills library/packaging | Two library manifests; API index name constant; new coin manifest; new `scripts/assemble-npm-distribution.mjs`, `scripts/npm-distribution-payloads.json`, `test/npm-distribution-payloads.test.mjs`; same-named import sites in Appendix A. |
| Skills business/tests | Coin's five scripts change only library specifiers; other listed scripts/tests change only exact specifiers or synthetic expectations. Skill prose, references and shared helper bytes remain unchanged. |
| Skills fixture composition | Nine fixture manifests' API peer key; fixture import sites where present; aggregate dependencies/workspace list; Skills lock. No fixture rename/version/descriptor schema change. |
| Private Provider maintainers | Listed Provider manifests/import sites only; no private knowledge, profile, service behavior or publication changes. These packages remain private development source. |
| MCP maintainer | Listed manifest, runtime and runtime test specifiers/expectations only; no process/authority changes. |
| Root composition/qualification | Root dependency keys and lock; listed root import sites; new `scripts/npm-runtime-formal-distribution.test.mjs`; result in new `../docs/npm-runtime-formal-distribution-implementation-checkpoint.md`. |

Existing RLS-1/2/3 standalone harnesses are **historical evidence owners**, not
migration edit targets. Their old-name staging and old tarballs remain historical.
The new formal-distribution harness adapts their checked algorithms for new names
and whole-Skill closure without rewriting earlier receipts or claiming them rerun.
Historical docs and ledgers remain unchanged. Appendix A marks these exceptions.

Dependency order: reserve/freeze → coordinated source/manifest/import changes →
source lock qualification → explicit assembly/pack inspection → artifact lock and
relocated install → local acceptance checkpoint. These are phases of one coherent
implementation package, not separate design loops. External release is a later
serial authority package; no workflow file is needed for local completion.

## 7. Local acceptance criteria and evidence limits

Reuse [RLS-1 §11](npm-runtime-rls1-contract.md)'s 21 direct/41 integration passes,
[RLS-2](npm-runtime-rls2-artifact-checkpoint.md)'s four inspected archives and
[RLS-3](npm-runtime-offline-install-checkpoint.md)'s two relocated offline
installs/integrity rejection as historical
instruction-route evidence. The old synthetic harness shipped only resolver and
is-main; it did not ship this full Skill. None qualifies these new package names.
No tests were rerun for this design report.

Required implementation checks, under explicitly selected synthetic roots:

1. Run Skills `test/provider-api.test.js`, `test/private-runtime-files.test.mjs`
   and `test/coin-expense-reconcile.test.mjs` with the new-name candidate graph.
   Preserve receipt reuse rejection, exact calendar-date/JPY matches, equal
   duplicate multiset restrictions, verified existing registrations, missing
   lookup/coverage blocking, stale-plan replay and destination linkage validation.
2. Run new payload tests: exact archive paths/counts/hashes, every local import and
   every SKILL.md/reference link, YAML entrypoint consistency, required API export
   closure and license bytes. Test missing helper/reference, extra unrelated Skill,
   link/traversal and changed source rejection. Run the existing public-content
   checker on source and a scoped equivalent on measured artifacts; review results,
   since regex success alone cannot establish publication eligibility.
3. In the new formal harness, import core and each CLI module from the installed
   package with no CLI side effects on import. Execute plan/prepare/verify using
   synthetic owner-only inputs, exact approval values and sentinel outputs; compare
   their normalized results/digests and failure behavior with source tests. Do not
   invoke external registration or acquire receipts. Test resolver purchases
   instruction handoff and explicit legacy fixture expense/registration selection.
4. Carry the RLS-1 rejection matrix into new-name instruction tests: scope, inactive
   actor/profile, selection tampering, unsupported modes, missing dependency,
   old-only peer, shadowing, changed descriptor and no fallback. Require exit 10,
   exact stdout and one metadata JSON line with reserved output untouched. Negative
   routes retain exit 2 and no partial instruction text. Rebind name-dependent hashes.
5. Pack/inspect the three candidates and synthetic Provider/owner separately with
   hooks disabled, then install an exact artifact-only lock offline into two clean
   relocated ordinary-file trees with separate empty caches. Compare all installed
   hashes; deny source/staging/other-install reads with actual probes. Retain flat
   and nested resolution checks separately from npm's natural hoisting. Tampered
   tarball must fail integrity; a modified lock is not covered by that result.
6. Run direct suites for changed import owners (fixture discovery, weekly coin,
   profile/other affected Skills, MCP runtime, and listed Provider script tests).
   Root smoke/import checks must use synthetic inputs and must not start services.
   Active v2 selected-caller regressions require their owner's reservation and
   current test selection; run only affected synthetic suites. Do not run operational
   launchers, CLI authentication checks or all-live conformance by name alone.

A frozen inventory with no unresolved new-name imports/peers and no unintended
old library names in the candidate closure is required. Historical artifacts/docs
and the deliberately retained lark-base-client name are explicit exceptions.
Unresolved imports, missing declared dependencies or shared-owner conflicts block
candidate acceptance; do not patch an extracted install after a failure.

Whole-Skill artifact completeness, synthetic business behavior, instruction-route
confinement, registry reproducibility and host integration are separate claims.
Local success establishes only the first three within measured cases. Host Skill
registration needs a separate adapter that retains the complete installed package
and dependencies; copying just the nested Skill folder loses `_shared`. Do not run
the existing global installer or infer host isolation from Node read permissions.
Public prose remains generic even while registry access is private.

## 8. Inactive release/configuration proposal

The following is report-only pseudocode/configuration, **not an activated workflow**.
GitHub's current supported authentication, package linkage, visibility creation,
permission inheritance, token model and environment approval features were not
queried. Every GitHub-dependent mechanism below is PROPOSED pending official
capability verification under separate external authority. No token value appears.

Proposed project registry mapping for a deliberately selected release/install
configuration (not ambient user configuration):

```ini
@flair-agency:registry=https://npm.pkg.github.com
ignore-scripts=true
audit=false
fund=false
```

Publisher and installer receive different isolated configuration and credentials.
A future supported npm auth stanza may reference an injected job-scoped secret,
but its exact credential type and scopes must first be verified; neither PAT,
GITHUB_TOKEN nor OIDC support is assumed here. No local login, global `.npmrc`,
Keychain, CLI/Codex session or browser fallback is permitted. Registry mapping
also matches other Flair packages: it does not authorize fetching them.

```yaml
# REPORT ONLY. Placeholder actions, gates and commands are intentionally unresolved.
name: reviewed-private-npm-release
on:
  workflow_dispatch:
    inputs:
      release_manifest_sha256:
        required: true
        type: string
permissions: {}                       # deny by default; PROPOSED syntax/behavior
jobs:
  verify:
    runs-on: <verified-pinned-runner-image>
    permissions:
      contents: read                  # PROPOSED minimal source read
    steps:
      - uses: actions/checkout@<reviewed-immutable-commit>
        with:
          persist-credentials: false
      - run: <verify-selected-source-and-local-qualified-artifact-set>
      - run: <emit-hash-bound-release-evidence-without-publisher-credential>
  publish:
    needs: verify
    environment: <verified-manual-review-gate>
    runs-on: <verified-pinned-runner-image>
    permissions:
      contents: read                  # PROPOSED only if retrieval requires it
      packages: write                 # PROPOSED; verify supported token mapping
    steps:
      - run: <verify-manual-approval-and-private-visibility-preflight>
      - run: <retrieve-approved-artifacts-and-recheck-all-digests>
      - run: <publish-exact-approved-tarballs-with-hooks-disabled>
      - run: <read-back-name-version-integrity-linkage-and-private-visibility>
```

The final workflow must run from the organization-owned Skills repository, on a
reviewed exact commit with pinned Actions and toolchain. Fork/PR/untrusted dispatch
inputs cannot choose arbitrary artifact URLs, commands or targets. Proposed minimum
publisher permissions are contents read and packages write; no contents write,
organization admin, delete, unrelated repository access or id-token permission is
requested without verified need. The install/read actor gets only verified package
read access plus any specifically required source access, never publish rights.
Do not assume repository access automatically grants package access, or vice versa.

Before enabling this template, explicitly implement and verify these gate contracts:

| Gate | Required evidence and stop condition |
| --- | --- |
| Remote ownership/linkage | Exact organization/repository/package identities, repository visibility and package association; missing/ambiguous ownership or inherited permissions stops. `repository` manifest metadata alone is not proof. |
| Initial private visibility | Verify how the registry creates a **new** package privately and how an **existing** package's visibility is controlled. Record effective permissions before publication. If privacy cannot be ensured before the first upload, stop; publishing and hiding afterward is unacceptable. |
| Actor authority | Organization-controlled Actions identity, supported credential mechanism, explicit three-package publish scope and environment approval control. If the mechanism cannot enforce the proposed boundary, narrow/review before use. No ambient substitute. |
| Coordinate preflight | Exact name/version absence or separately reconciled matching artifact; collision or unknown prior publish stops. No blind retry. |
| Source/artifact binding | Approved source commits for every selected repository, dirty-source resolution, source-map digests, manifests, exact payload hashes, tarball SHA-256 and SHA-512 integrity, dependency graph, toolchain/runner identities, local evidence digests and release-manifest SHA-256. |
| Manual publication approval | Human approval binds those immutable artifacts, versions, three destinations, private visibility and publisher actor immediately before external publish. A changed hash/actor/target invalidates it. |
| Readback | Confirm remote name/version, stored artifact integrity, association and effective private visibility. Failure or uncertainty holds the release and dependent installation; reconcile before retry. No automatic deletion or public transition. |

Publish API and files before coin only after the same release set is approved;
do not build or repack inside the privileged job. Install from measured remote
artifacts only after their readback matches. Record any partial publication and
hold the release set; there is no cross-package transaction. A public transition
is separately approved **per artifact** after content, history/license and effective
access review; a generic library's name does not decide confidentiality. Private
Provider material never becomes public merely because a dependency does.

## 9. Completion and selective rollback

This design resolves layout, names, proposed versions, repository association,
compatibility choice, source ownership and local test criteria. Actual remote
ownership, publication permissions/privacy semantics, release-source freezing and
manual external authority are execution gates, not reasons to reopen registry or
payload selection. SEP-2 host authority/isolation and production routing remain
separate gates.

Implementation rollback removes only the new assembler/map/manifest/test/report
files if their accepted hashes still match, and reverses only recorded migration
deltas in existing files/locks. Preserve later v2 additions and original staged vs
unstaged state; no reset, broad checkout restore or lock overwrite. Retain old
operational package graph, pins, registrations, schedules and recovery generations.
Retire only the exact new synthetic generation after retention approval. If a
future release partially publishes, keep those immutable artifacts and reconcile;
local rollback is not registry deletion. Production cutover remains unperformed.

## Appendix A. Exact bounded rename inventory by owner

Paths below are a static text inventory of the two exact old library identifiers
in reviewed source (excluding synced sources, generated node_modules and historical
docs). Each entry is a prospective owner-bound edit/review site, not permission
to execute it. Source-only URLs, profiles and credentials are not reproduced.
Manifests include names/dependencies/peers; code entries include imports, API name
constants and synthetic assertions. Re-scan these same owners at implementation
freeze and bind only changed entries. New matches require explicit allocation.

### MCP repository

```text
mcp/live-agency-operations/package.json
mcp/live-agency-operations/src/runtime.mjs
mcp/live-agency-operations/test/runtime.test.mjs
```

### Root composition

```text
package-lock.json
package.json
scripts/activate-v2-m4i-creator-networks-browser.mjs
scripts/agency-intelligence-mcp-server.mjs
scripts/analyze-v2-lark-account-linkage.mjs
scripts/attachment-acquisition-launcher.mjs
scripts/build-v2-invitation-history-write-candidate.mjs
scripts/build-v2-m4i-creator-networks-browser-candidate.mjs
scripts/build-v2-m4i-flair-api-candidate.mjs
scripts/build-v2-m4i-flair-user-oauth-candidate.mjs
scripts/build-v2-profile-history-write-candidate.mjs
scripts/complete-v2-m4i-flair-user-oauth.mjs
scripts/creator-activity-sync-runner.mjs
scripts/execute-v2-invitation-history-write-active-intent.mjs
scripts/generate-v2-lark-instance-profile-candidates.mjs
scripts/gift-projection-launcher.mjs
scripts/migrate-v2-lark-active-scouting-profile.mjs
scripts/prepare-v2-m4i-flair-user-oauth-conformance.mjs
scripts/promote-v2-invitation-history-write-profile.mjs
scripts/refresh-v2-lark-scouting-parent-profile.mjs
scripts/run-v2-m4i-flair-api-conformance.mjs
scripts/run-v2-m4i-flair-user-oauth-conformance.mjs
scripts/smoke-test.mjs
scripts/start-v2-m4i-flair-user-oauth.mjs
scripts/v2-contract-test.mjs
scripts/v2-live-history-dual-run.test.mjs
scripts/verify-v2-invitation-history-write-active-dry-run.mjs
scripts/verify-v2-invitation-history-write-candidate-dry-run.mjs
scripts/verify-v2-lark-active-scouting-read.mjs
scripts/verify-v2-m4i-agency-intelligence-active.mjs
scripts/verify-v2-m4i-agency-intelligence-mcp-candidate.mjs
scripts/verify-v2-m4i-creator-networks-browser-capture.mjs
```

### providers/backstage repository

```text
providers/backstage/package.json
```

### providers/google-drive repository

```text
providers/google-drive/package.json
```

### providers/moneyforward-cloud-expense repository

```text
providers/moneyforward-cloud-expense/package.json
providers/moneyforward-cloud-expense/scripts/serve-oauth-callback.mjs
providers/moneyforward-cloud-expense/src/api-session.js
providers/moneyforward-cloud-expense/test/api-session.test.js
```

### providers/tiktok-ios repository

```text
providers/tiktok-ios/package.json
providers/tiktok-ios/scripts/normalize-gift-export.mjs
providers/tiktok-ios/scripts/prepare-gift-export-request.mjs
```

### providers/tiktok-web repository

```text
providers/tiktok-web/package.json
providers/tiktok-web/scripts/normalize-profile-observation.mjs
```

### Historical RLS harnesses — preserve unchanged; adapt in new formal harness

```text
scripts/npm-runtime-artifacts.test.mjs
scripts/npm-runtime-offline-install.test.mjs
```

### Skills repository

```text
skills/live-agency-skills/fixtures/activity-pasted-source/package.json
skills/live-agency-skills/fixtures/coin-purchase-instruction-provider/package.json
skills/live-agency-skills/fixtures/expense-instruction-provider/package.json
skills/live-agency-skills/fixtures/gift-history-source/package.json
skills/live-agency-skills/fixtures/invitation-instruction-source/package.json
skills/live-agency-skills/fixtures/invitation-observation-source/package.json
skills/live-agency-skills/fixtures/live-history-instruction-source/package.json
skills/live-agency-skills/fixtures/multi-binding-provider/package.json
skills/live-agency-skills/fixtures/profile-instruction-source/package.json
skills/live-agency-skills/package-lock.json
skills/live-agency-skills/package.json
skills/live-agency-skills/packages/private-runtime-files/package.json
skills/live-agency-skills/packages/source-provider-api/package.json
skills/live-agency-skills/packages/source-provider-api/src/index.js
skills/live-agency-skills/skills/coin-expense-reconcile/scripts/coin_expense_core.mjs
skills/live-agency-skills/skills/coin-expense-reconcile/scripts/plan_coin_expense.mjs
skills/live-agency-skills/skills/coin-expense-reconcile/scripts/prepare_expense_registration.mjs
skills/live-agency-skills/skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs
skills/live-agency-skills/skills/coin-expense-reconcile/scripts/verify_expense_registration.mjs
skills/live-agency-skills/skills/coin-expense-weekly-application/scripts/plan_weekly_application.mjs
skills/live-agency-skills/skills/coin-expense-weekly-application/scripts/prepare_weekly_application.mjs
skills/live-agency-skills/skills/coin-expense-weekly-application/scripts/resolve_weekly_application_provider.mjs
skills/live-agency-skills/skills/coin-expense-weekly-application/scripts/verify_weekly_application.mjs
skills/live-agency-skills/skills/creator-activity-sync/scripts/lark_activity_sync.mjs
skills/live-agency-skills/skills/creator-activity-sync/scripts/resolve_activity_source.mjs
skills/live-agency-skills/skills/creator-insight-sync/scripts/insight_lark_runtime.mjs
skills/live-agency-skills/skills/creator-insight-sync/scripts/sync_creator_insights.mjs
skills/live-agency-skills/skills/creator-invitation-status-compaction/scripts/lark_invitation_compact.mjs
skills/live-agency-skills/skills/creator-invitation-status-sync/scripts/compare_invitation_v2_dual_run.mjs
skills/live-agency-skills/skills/creator-invitation-status-sync/scripts/invitation_lark_runtime.mjs
skills/live-agency-skills/skills/creator-invitation-status-sync/scripts/invitation_state_core.mjs
skills/live-agency-skills/skills/creator-invitation-status-sync/scripts/resolve_invitation_source.mjs
skills/live-agency-skills/skills/creator-invitation-status-sync/scripts/sync_invitation_observations.mjs
skills/live-agency-skills/skills/creator-live-history-compaction/scripts/lark_live_history_compact.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/compare_live_history_v2_dual_run.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/live_history_lark_runtime.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/live_history_sync_core.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/live_history_v2_dual_run.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/resolve_live_history_source.mjs
skills/live-agency-skills/skills/creator-live-history-sync/scripts/sync_live_history_observations.mjs
skills/live-agency-skills/skills/creator-live-metrics-compaction/scripts/lark_live_metrics_compact.mjs
skills/live-agency-skills/skills/creator-profile-compaction/scripts/lark_profile_compact.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/compare_profile_v2_dual_run.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/profile_lark_runtime.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/profile_sync_core.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/profile_v2_dual_run.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/resolve_profile_source.mjs
skills/live-agency-skills/skills/creator-profile-sync/scripts/sync_profile_observations.mjs
skills/live-agency-skills/skills/gift-history-sync/scripts/gift_history_core.mjs
skills/live-agency-skills/skills/gift-history-sync/scripts/plan_gift_history.mjs
skills/live-agency-skills/skills/gift-history-sync/scripts/prepare_gift_commit.mjs
skills/live-agency-skills/skills/gift-history-sync/scripts/resolve_gift_source.mjs
skills/live-agency-skills/skills/gift-history-sync/scripts/sync_gift_projection.mjs
skills/live-agency-skills/skills/lark-base-backup-retention/scripts/retention_plan.mjs
skills/live-agency-skills/skills/lark-base-disaster-recovery-drill/scripts/drill_core.mjs
skills/live-agency-skills/skills/lark-base-maintenance/scripts/maintenance_plan.mjs
skills/live-agency-skills/test/coin-expense-reconcile.test.mjs
skills/live-agency-skills/test/gift-history-sync.test.mjs
skills/live-agency-skills/test/live-history-sync.test.mjs
skills/live-agency-skills/test/private-runtime-files.test.mjs
skills/live-agency-skills/test/profile-sync.test.mjs
skills/live-agency-skills/test/provider-api.test.js
```

The two lock paths above require dependency-entry, workspace-link metadata and integrity review by their respective composition owners. No blanket replacement of `@live-agency-skills` is allowed. Markdown history and accepted handoff/ledger evidence are intentionally outside this edit inventory.

## Report verification

Static checks passed for all three JSON manifest examples, their exact source
payload closure (9 coin files plus the shared helper, 3 API modules and 1 files
module), local Markdown link targets and whitespace. Appendix A records 110
matching paths, including two preserved historical harnesses; it is not a claim
that 110 files were changed. A first inventory command read piped stdin instead
of the directory and produced no matches; rerunning with an explicit directory
completed the inventory. Only this report was written. No synthetic business or
release execution result is claimed.
