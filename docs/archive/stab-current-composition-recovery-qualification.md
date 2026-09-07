# STAB current-composition package-tree recovery qualification

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.
Status: **npm reconstruction, focused tests and relocation passed; whole-tree production delivery remains blocked by the native CLI lifecycle gap**.

The exact current source graph was independently reconstructed, including required untracked source. After the user explicitly approved isolated npm downloads, both lock-based installations passed. Complete npm dependency closure, SDK 1.30.0 schema-library compatibility, metadata discovery and focused coin/API tests passed in the original candidate and a second independent layout. No production source, package tree, configuration, Git index, registration or schedule was changed. SDK 1.30.0 remains absent at the specifically inspected original production package manifest path.

A material lifecycle gap remains: the locked Lark CLI package requires a separately downloaded native executable. Disabling lifecycle hooks leaves that executable absent; running the launcher can itself trigger a download. The npm tree is relocatable, but whole-tree production replacement is not qualified until this CLI effect is explicitly resolved. No native download, launcher execution or production application was authorized by the npm-only approval.

## Change card

- Primary E qualification supporting B; protected boundary: current pinned composition dependency installation and discovery.
- Invariants: preserve original and active development sources, staged/unstaged distinctions, dependencies, private configuration, registrations and schedules; no ambient credential selection or business execution.
- One outcome: independently reconstruct the current source/locks, qualify disposable package installation and relocation, and prepare a selective recovery procedure. Reconstruction, npm installation, focused tests, relocation and procedure preparation are complete; the native CLI effect remains unresolved.
- Reject changed source/locks, unknown source classification, incomplete dependencies, omitted required lifecycle effects, escaping links, external dispatch and unapproved production replacement.
- Next gate: review and qualify the exact native CLI asset without service execution. Production application remains separately gated.
- Rollback of this package: remove only this report and its newly owned ignored evidence generation. No production rollback is currently necessary. No successor tasks/subagents were created and no model/effort change was claimed.

Applicable instructions and the complete authoritative private-source design guide were read. Existing SEP-0/SEP-1 inventories established the bounded root-plus-nine-repository scope; current files were independently revalidated rather than assuming checkpoint or development parity. Public Skills were neither changed nor registered.

## Exact reconstruction

Restricted evidence and candidate: `tmp/stab-current-composition-20260906/`. The generation was created with umask 077 and an owner-only directory, and Git ignore coverage was verified. Its `candidate/` contains independent regular source files, no copied Git storage, production symlinks, previous dependencies, credentials or operational configuration.

The source allowlist is implemented and expanded in `capture.py` and `source-manifest.json`: root/nested package manifests and locks, and source/test/fixture/instruction/knowledge files under the named source directories with JS/MJS/CJS/TS/JSON/Markdown extensions. Hidden paths, `node_modules`, runtime data, private/config/profile directories, `sources/` and scratch paths are excluded. Tracked source and explicitly enumerated untracked source are treated separately. No necessary selected source symlink was encountered. Private instructions remain restricted evidence; they are not republished here.

**445 selected source files, including 65 untracked source files**, were copied only from the original. Examples of required untracked overlays include the Provider API backup contract, selected Lark adapters, Lark Chat operations and MCP contract modules. Their full names, content hashes, original modes and tracked/untracked status are in the restricted manifest. Candidate source modes are owner-only, retaining executable intent. A limited private-key-marker check supplemented path classification; it is not a universal secret certification.

| Repository | Current HEAD |
| --- | --- |
| Root, including `packages/lark-core` | `6b1f11c17cec53f2adcce5fd88b87666c322f859` |
| Skills | `e78ec0962184fee2b07ea85b3f24545438f232d4` |
| Backstage | `9ad23b67078668a3409e5db3164314fbd5704d3a` |
| Lark Base | `996eb2641852c45377766c4166102b70604470be` |
| Expense | `400c25f5a601a29c1387148bbca73fdcd572cb6d` |
| iOS | `2d202687b0199536d8fe07599098f37bc3e773f7` |
| Web | `ff1b613d8ae99188fbb29cca4b7dfc8093243f86` |
| Drive | `6467cc22baa639259609bb96c849b14d38504033` |
| Lark Chat | `1de8c1c4ecb78da53245a2ca02ff7c36b3d45eba` |
| Operations MCP | `8c5d1dc27dc8fb5ae8250735e3d9cfdb1af0a133` |

`protected-before.json` records each HEAD, index-entry digest, staged/unstaged binary-diff digests, tracked file hashes/modes and selected untracked hashes/modes. HEADs alone do not identify this dirty composition. `original-development-differences.json` reports zero differences **in that captured scope**; untracked development reports, private config and ignored operational helpers are outside that comparison. This is not a claim that development contains every production asset.

| File | SHA-256 |
| --- | --- |
| Root `package.json` | `6856192cab09d65ab67761939e2ff36e2db74717b75e8c79d3285c1476695e0e` |
| Root `package-lock.json` | `a1cf1fbbd25ec52c7fb038252825673608b67bc79b9bd5f5d3e8f3221a2a1250` |
| Skills `package-lock.json` | `f17c4987e4764370ef2270f5963e52ad04c2d70339ef8e8e2b0fe56d54978abd` |

Both locks equal their respective committed HEAD blobs. Root lock has 131 package records; nested lock has 24. The 11 root and 11 nested workspace link records all identify existing snapshot manifests with matching versions. Registry records use the standard npm registry and include SHA-512 integrity. These lock inventories are supplemented by `installed-file-inventory.json`. Complete `npm ls --all --json` passes at both roots in both layouts.

## Installation attempt and lifecycle accounting

Node v22.22.0, npm 10.9.4. `install.py` invokes the actual Node binary and npm CLI, avoiding an isolated-HOME asdf shim failure. Its minimal environment supplies only a bounded PATH, disposable HOME/TMPDIR, locale, empty isolated user/global npmrc, private cache and explicit npm options. No ambient npm settings, credentials, Node options or browser state are propagated.

The reviewed commands, only inside the disposable candidate and its Skills directory, are:

```sh
npm ci --ignore-scripts --no-audit --no-fund
```

The initial root attempt exited 1 with registry `ENOTFOUND` errors and npm's “Exit handler never called” message. Two network escalations were initially rejected because host review required a trusted user grant. The user subsequently explicitly approved the bounded npm downloads, and host review accepted execution. Root and nested Skills installations then both exited 0, with lifecycle hooks disabled. The approval did not cover native CLI downloads or production changes. `install-root.json` and `install-skills.json` contain the successful results; the earlier DNS failure remains in the npm cache log and this history.

Lifecycle effects:

- Root postinstall normally invokes nested Skills `npm ci --ignore-scripts`; the explicit nested installation completed successfully.
- The root lock marks `@larksuite/cli` 1.0.93 as having an install script. Read-only review of the existing **development** package's manifest, installer, launcher and checksum-file hashes found that postinstall downloads and extracts `bin/lark-cli`. The launcher automatically invokes that installer if the executable is missing. Neither hook nor launcher was executed. The installed candidate manifest, installer, launcher and checksum file match all four previously reviewed development file hashes. The candidate native executable is confirmed absent.
- A complete package-tree exchange must either include a separately reviewed, checksum-verified platform binary in the candidate or bind an explicitly accepted preservation method for that exact installed binary. Do not copy an unknown old package subtree or rely on first-launch download. The current npm-only plan has not satisfied this requirement.
- `lifecycle-accounting.json` enumerates every installed manifest with install/prepare/prepublish declarations and the presence of published main/export targets. Build/prepare hooks and publication hooks were not executed. This includes prebuilt JS distributions such as eventsource, path-to-regexp, express-rate-limit and saxen; package-entry presence is not a full behavioral test. The CLI postinstall is the known missing runtime artifact. No unrelated Git hook installation or publication step was reproduced.
- No `install:skills`, MCP/server/browser launch, service dispatch or production import occurred.

## Focused verification and relocation

Passed local checks: all 445 snapshot content hashes still match; both locks match committed source; all 22 expected workspace targets and versions exist; the specifically inspected original SDK manifest still returns ENOENT; before/after preservation matches across 20 repositories, including selected untracked source and index/staged/unstaged distinctions.

Both candidate layouts passed:

- Root and nested `npm ls --all --json`, including declared transitive and workspace dependencies.
- Installed SDK metadata exactly 1.30.0, plus a library-only import of its JSON-RPC schema and valid/invalid synthetic requests against Zod 4.5.4. No server was instantiated.
- Metadata discovery of 10 bindings; resolution of all three real coin purchase/candidate/registration instruction capabilities; rejection of all three for unattended use. Provider instructions were read, not executed.
- Coin reconciliation **8/8**, including matching, duplicate/profile ambiguity, existing-registration reservation, incomplete coverage, stale-plan detection and destination/payment-linkage validation.
- Provider API **8/8**, including synthetic fixture execution, ambiguous/missing/incompatible rejection and normalized identity/date validation.

This is **16 unique existing tests, repeated successfully after relocation**, plus the dedicated discovery and SDK assertions. It is not a full suite or a live health claim. Tests ran directly with minimal environment, a reviewed network/server guard, and Node permissions denying child processes, workers and addons. Filesystem permissions restricted reads to each selected layout plus named harness/fixture paths, and writes to synthetic fixtures. The second run could not read the first candidate. The SDK import uses only its schema library; no MCP factory or process was launched. Node permissions plus the guard are bounded test controls, not a claim of general OS network isolation.

`verify.py` independently materialized source at `second-layout/live-agency-provider-runtime`, then transferred only the two package trees with relative links preserved. **4,189 regular-file/link inventory entries match**, including **24 relative links** (workspace and `.bin` links). Every link exists and resolves within its selected layout. Package bytes contain no embedded first-candidate absolute path. No extra workspace-local package tree exists. `relocation.json`, `installed-file-inventory.json`, `package-tree-allowlist.json` and per-layout check logs retain the proof. npm registry integrity checks and committed SHA-512 lock entries supply download integrity; the file inventory supplies exact transfer integrity.

This proves relocation for the currently installed npm tree, which lacks the native CLI executable. Adding that asset changes the delivery inventory and requires an updated transfer verification before approval.

## Reviewable production delivery procedure — not executable approval

Let `P` be the original runtime root from the scoped handoff. The only package-tree replacement paths proposed by the current locks are:

1. `P/node_modules`
2. `P/skills/live-agency-skills/node_modules`

All recorded package locations lie under those two roots or are source workspaces. Installation confirmed that no additional workspace-local `node_modules` path was produced; any future such path changes this allowlist and requires review. `expected-package-inventory.json` contains all exact lock versions/integrities, and `expected-workspace-links.json` records every expected relative workspace link. `installed-file-inventory.json` records the installed byte/mode/link inventory, excluding the missing native CLI executable.

Before any production delivery:

1. Complete the native CLI lifecycle requirement above and refresh the passing installation/transfer inventory. Inventory every installed regular file with SHA-256/mode and every link with its literal target and resolved path; reject sockets, unexpected file types, absolute links and targets outside the selected composition. Record npm/Node/OS/architecture and lock-based package integrity evidence.
2. Create a **second independent disposable layout** ending in `live-agency-provider-runtime`, materializing the same source-manifest files at their production-relative paths. Transfer only the two qualified package trees with links preserved, without dereferencing workspace links. Scan every workspace link and `.bin` launcher. All resolutions must terminate in the second layout and preserve expected root/nested relationships. Reject any candidate-path reference; compare byte/mode/link inventories. Run discovery, SDK and focused coin checks with filesystem access limited to that second layout so resolution cannot silently fall back to the first candidate. This proof **passed for the npm-only tree**; refresh it after resolving the native asset gap. Production delivery remains unapproved.
3. Bind separate production authority to the exact generation, source/lock hashes, two paths and rollback location, plus SEP-2 acceptance or an explicitly scoped incident exception. Revalidate original HEAD/index/diffs, every source-manifest hash, both locks and selected untracked-file enumeration. Refuse on any concurrent drift or symlink/path/owner change. Preserve source/config bytes and original staged/unstaged distinctions. Private config compatibility is maintained by retaining it, not claimed to have been operationally tested.
4. Coordinate an exclusive installation window. Existing consumers must not observe a half-replaced graph; process/schedule handling requires separate explicit coordination and pending-intent reconciliation. This procedure does not silently stop or reload anything. Without an enforceable no-concurrent-change window, refuse the exchange.
5. In a separately approved owner-only sibling staging/rollback area on the same filesystem, stage verified trees and reserve rollback paths `rollback/root-node_modules` and `rollback/skills-node_modules`. Record the exact original package tree inventories, preserving existing links, modes and native assets without traversing their targets. Rename each existing tree into its corresponding rollback path, then rename the staged replacement to its intended path. **Two directories cannot be atomically exchanged as one transaction**; journal each completed move and keep consumers excluded for the whole sequence. No source, config, Git, global registration or schedule file is part of these moves.
6. Before allowing consumers, verify installed inventories and link confinement again, then run the separately approved metadata-only post-install discovery verification against explicit `P`, with external/child operations disabled. Check SDK version and both dependency closures, plus unchanged source/lock/config protections. A successful check does not clear a cached rejected discovery promise in an existing runtime object. Process recreation and business verification remain separate.
7. On any failure, keep consumers excluded, move only the newly delivered tree(s) to an owner-only failed-generation path, and restore the corresponding original directories from rollback according to the completed-move journal. Verify original tree inventories and source/locks before ending recovery. Never reset Git, overwrite configuration, replay an uncertain intent or automatically delete rollback artifacts.

No production installer or swap script was implemented. If second-layout qualification demonstrates that transfer is unsafe, a lock-based rebuild at the destination would need a different reviewed execution scope: `npm ci` deletes the destination package tree and is not atomic, so first preserve both trees, keep consumers excluded, install root/nested locks without hooks, account for the native CLI effect, and restore both saved trees on any failure. This fallback is not authorized or qualified here.

## Evidence, preservation and next recommendation

Restricted artifacts: `owner.json`, `capture.py`, `source-manifest.json`, `original-development-differences.json`, `locks.json`, `expected-package-inventory.json`, `expected-workspace-links.json`, `install.py`, `install-root.json`, npm cache logs, `versions.json`, `cli-lifecycle-static-review.json`, `original-sdk-metadata.json`, `static-checks.json`, `protected-before.json`, `protected-after.json`, `preservation.json`, `audit.py`, `verify.py`, `final-checks.py`, `checks.json`, `relocation.json`, `installed-file-inventory.json`, `lifecycle-accounting.json`, `package-tree-allowlist.json`, and per-layout test/dependency/SDK results.

Preservation covers tracked content/modes, HEAD, index-entry and staged/unstaged diff digests and selected untracked source across original/development root plus nine nested repositories each. It excludes untracked business data, private configuration, credentials, all old dependency bytes and global host state; these were not mutated or broadly inspected. Only this report and the new ignored generation were created in development. Existing candidate artifacts and active configuration were preserved.

**One recommendation:** qualify the exact platform-native Lark CLI 1.0.93 asset in isolation, with explicit download scope and checksum verification against the verified package checksum file, without running the launcher, setup wizard or service commands. Then refresh the package inventory and relocation proof. This is the minimal remaining artifact gap before review of the two-tree production delivery; no version upgrade, lock regeneration or production change is needed for that qualification. The npm-download approval was consumed only for isolated npm installation. Do not treat the earlier conditional clean-v1 permission as approval of this mixed composition.
