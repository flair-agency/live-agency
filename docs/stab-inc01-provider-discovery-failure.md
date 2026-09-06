# STAB-INC-01: required package absent during Provider discovery

Date: 2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.
Status: bounded characterization complete; no repair or operational acceptance.

## Change card and evidence

Primary B, supporting G; protected boundary: local npm composition and Provider discovery. Preserve the original production checkout, mixed v1/v2 source, all settings, registrations, credentials, schedules and existing staged/unstaged work. Deliver one synthetic reproducer, supported classification and selective recovery plan. Next gate: isolated candidate qualification; production authority remains separate. No successor tasks or agents. No model/effort change was made; next dispatch policy default is Astra/low.

Coordinator-supplied incident evidence (not independently reread from operational history): task `定期運用実行｜コイン経費照合`, `01a05397-c407-74b0-ba32-5ba374cd19a0`; failed turn `01a07405-b5f3-7090-babc-1465273b2056`, startedAt Unix `1788652926`; command marker `exec-19e2b138-c7fc-4050-b621-c39e6791a6e6`, exit 1, Node 22.22.0. `ENOENT` opening `ORIGINAL_RUNTIME/node_modules/@modelcontextprotocol/sdk/package.json`; stack `readJson` line 27 and `discoverProviders` line 185. Failure at `await discoverProviders({rootDir: runtime})` preceded receipt/candidate reads and external operations. Earlier turn `01a06ede-ee88-7ac1-aec6-b28cf3cb6742` passed preflight and stopped for stale inputs. That does not prove all dependencies were continuously installed or establish later business success.

`ORIGINAL_RUNTIME` denotes the original operational checkout named in the scoped handoff. This report retains no business artifacts. The historical full command was not executed.

## Supported cause and current state

`skills/live-agency-skills/packages/source-provider-api/src/index.js:178–202` reads the root manifest, enumerates `dependencies` unless `dependencyNames` is supplied, and reads every selected installed manifest before checking `liveAgencyProvider`. A missing ordinary dependency therefore aborts discovery before any result is returned. `validateProviderPackage` skips an ordinary package only after its manifest was read. Discovery does not import Provider execution modules; resolution does.

The precise demonstrated cause is **an unavailable required installed manifest in the selected composition**, with a generic filesystem error propagating through discovery. It is reproducible behavior, not evidence that required packages should be optional. No provider-selection defect or global configuration causality is established. A partly installed tree, deletion, broken path component or an installation race could explain the historical absence; this investigation does not distinguish them.

Read-only metadata checks on September 6:

| Item | Original | Development |
| --- | --- | --- |
| Root manifest SDK dependency | required, exactly 1.30.0 | same |
| Root optionalDependencies | absent | absent |
| Lock SDK record | 1.30.0, resolved artifact and integrity present | same |
| Installed SDK package.json | ENOENT | readable, name/version match, no Provider manifest; package directory is not a symlink |

Both root manifests SHA-256: `6856192cab09d65ab67761939e2ff36e2db74717b75e8c79d3285c1476695e0e`.
Both lockfiles SHA-256: `a1cf1fbbd25ec52c7fb038252825673608b67bc79b9bd5f5d3e8f3221a2a1250`.
Development SDK manifest SHA-256: `0690cbe02511a95d1ff199acf20b5a12ac4dfde1bbe30c82a0de73afa92dffc9`.

The specific original path remains unavailable; it is not already repaired by this check. No claim is made about the completeness of either dependency tree or current workflow health. No original module was imported or script run.

Optional-only dependencies are not enumerated by default, whether installed or absent. Explicit `dependencyNames` are read strictly, including optional names. A name also present in `dependencies` is enumerated. This is the current local algorithm, not a proposal to change npm optional semantics. The SDK is required here, and MCP sources also import it directly. Removing the dependency, catching all ENOENT and continuing, or restricting names merely to bypass this failure would hide an incomplete composition.

## Minimal synthetic verification

Owner-only ignored artifact: `tmp/stab-inc01/reproduce.mjs`, with synthetic `composition/` beneath it. This development-local location uses the incident handoff's explicit fixture allowance; it does not create an active profile or replace the designated development configuration defaults. Directory creation uses mode 0700, files 0600 and umask 077. `git check-ignore` confirms exclusion.

Reviewed API imports: only `node:fs/promises`, `node:path`, `node:url`; top-level constants and declarations do not acquire credentials or launch services. The reproducer imports only the development API and Node builtins, supplies an explicit synthetic root, and never calls resolution. The synthetic Provider entry deliberately does not exist, establishing that successful discovery does not load it.

Executed once:

```sh
node --experimental-permission --allow-fs-read=/Users/naokikimura/workspace/live-agency-provider-runtime --allow-fs-write=/Users/naokikimura/workspace/live-agency-provider-runtime/tmp/stab-inc01 tmp/stab-inc01/reproduce.mjs
```

Result: **6 focused cases passed, exit 0**: required ordinary SDK absent reproduces the exact ENOENT suffix; restoring synthetic SDK metadata returns one Provider; missing required Provider rejects; absent optional-only dependency is not enumerated; explicitly selected absent optional rejects; malformed required JSON rejects. These are expected-error assertions, not six successful workflows. No full suite, runtime, installation, external call or operational artifact access. Node filesystem permissions constrain file access; no independent network-blocking claim is made for that flag.

The reproducer intentionally refuses an existing `composition/` directory. For a later rerun, first selectively remove only that generated synthetic directory, retaining the script, or use a reviewed fresh artifact copy. Its restored metadata is not an SDK installation or proof that a real installation will work.

Existing `skills/live-agency-skills/test/provider-api.test.js` covers fixture discovery, resolution and invalid manifests, but the reviewed discovery cases do not cover absent installed required package manifests. It was not executed because this package needed only the new bounded characterization.

## Affected callers and maintenance baseline

Confirmed incident caller: the coin-expense preflight. Other susceptible callers in bounded source inventory: `mcp/live-agency-operations/src/runtime.mjs:399`, root `scripts/v2-contract-test.mjs:31`, and `scripts/smoke-test.mjs:111,135,148,162`. API fixture tests invoke discovery with their own root. These are susceptibility findings, not additional incidents. The operations runtime memoizes its discovery promise; after a failure, a filesystem repair alone does not clear that rejected promise in an existing runtime object. Recreating/restarting such an object would require separately authorized operational handling, including pending-intent reconciliation.

The development root HEAD is `6b1f11c17cec53f2adcce5fd88b87666c322f859`. The inherited mixed baseline contained dirty work in the root and several nested repositories; all nine nested repositories were included in preservation checks. Working root dependencies include Lark client 2.0.0, SDK 1.30.0 and current private Providers. Do not replace this state with a purported clean v1 baseline or infer deployed revisions from version strings. Preservation verification passed: staged/unstaged diff hashes and status matched before/after across the root and all nine nested repositories, excluding this new report from final status. No commits, staging, resets, source edits or global changes are part of this package.

## Recovery options, verification and rollback

For the existing composition, the narrow remedy is **package-tree recovery**, not a Provider code patch. It is not authorized or executed here. Before recovery, establish the exact approved manifest/lock hashes, complete workspace commits plus dirty overlays, npm/Node versions and missing/inconsistent dependency inventory. Preserve the existing dependency tree and source/index distinctions. Reconstruct from the approved lock in an isolated directory with lifecycle scripts disabled; explicitly handle the nested Skills lock separately because the root postinstall normally performs that installation. Never run `install:skills`, regenerate pins opportunistically, or link into production. A targeted arbitrary-version `npm install` or copying only package.json is not adequate recovery. Verify lock consistency, exact SDK metadata and complete dependency closure, then metadata-only discovery under a fixed root and focused synthetic caller tests. A passing discovery does not satisfy input freshness, actor/profile/resource/operation or operational acceptance gates.

No code change is necessary to preserve the demonstrated contract. If diagnostic hardening is separately selected, limit the diff to API discovery's manifest read and focused tests: classify missing required package metadata with package/root context while preserving rejection, distinguish invalid JSON and permission errors, and retain explicit-selection behavior. Do not silently skip missing required packages or broaden Provider execution. That diagnostic change would improve errors, not repair installation.

Production delivery requires SEP-2 acceptance or a scoped urgent-incident exception, exact authority and verified rollback. Preserve the old dependency tree as an owner-only recovery artifact; replace only approved package-tree paths, verify manifests/locks/source hashes unchanged, and restore only those paths on failed qualification. Do not reset Git or overwrite profile/config/artifact directories. Coordinate any process recreation separately. Current-task rollback consists only of removing this report and its ignored synthetic artifact directory.

## One next package: isolated clean-main qualification

Owner steering permits a production clean v1 reinstall **only conditionally**, after latest-main installation is proven to support required workflows. This is not permission to fetch, install or mutate production in this investigation.

Local cached `origin/main` is not verified remote latest. Cached root ref `279672802ae3d8c75307d9c93e7c7b5848eefe3a` describes an older composition: Lark client 1.1.0, Backstage 1.0.0, expense Provider 1.0.0, iOS 1.1.0, web 1.0.0, API 1.6.0 and private runtime files 1.0.0. It omits the current MCP, Google Drive, Lark Chat and shared-core workspaces. Its exact gitlinks are:

| Repository path | Root-pinned commit |
| --- | --- |
| skills/live-agency-skills | cd1145d6872c0d6cbd2a1b622c7382e42ec13703 |
| providers/backstage | 6b66a130490a81c01de03fa9587335094ba66372 |
| providers/lark-base | 43c8a86c00cad68e177e8d3ceb9ad6bfe46bbaae |
| providers/moneyforward-cloud-expense | c641d273e80021caa48991bfdc6df61cf6fc9799 |
| providers/tiktok-ios | 574d5975985ffdaccf7f4b2322c492fd6c2f69ca |
| providers/tiktok-web | 494e3bcc68b51202825f65914c59cfd78b97b5e7 |

These form a **candidate pin set**, not a qualified coherent v1 release: their package/lock compatibility and workflow coverage remain untested. Independently taking every repository's cached main would change that set: for example cached Backstage main is 1.2.1, Lark client main 1.4.2 and expense main 1.5.0, while root pins older versions. Do not assemble unrelated latest mains and call the result pinned or v1. The current working composition is mixed; no claim is made that current remote main is v1.

The smallest next package is one isolated clean-install qualification with a reviewed network-fetch/install scope and synthetic-only execution. First verify remote root main and record its immutable SHA; use exactly its gitlinks, verify all referenced objects and package versions, and hash its root and nested install lockfiles. If remote main differs from the cached candidate, rebuild this manifest of pins before installation. Reject missing locks, inconsistent pins, unavailable objects or absent required assets instead of drawing files from the operational dirty tree. Install from those locks with lifecycle hooks disabled into a fresh isolated location, not the operational checkout or active registration paths. Preserve the current mixed source/checkpoints untouched.

Acceptance must map every required STAB-0 workflow to a present caller, Provider capability, compatible contract and synthetic test at those exact refs. Start with this incident's discovery and coin-expense capability resolution; assess remaining required workflows against the same pinned candidate. Current gaps include omitted backup storage and MCP/Intelligence assets, unknown compatibility of older expense/source Providers, and profile/history/insight/maintenance route coverage. The required workflow set itself needs coordinator/owner acceptance. Missing assets require an explicit composition decision, not ambient fallback. Read the mandatory authoritative guide before reviewing private-source Skill contracts. Synthetic config must use explicitly selected synthetic actors/resources/operation allowlists; real configuration and credentials are neither copied nor inferred.

Deliver a qualification matrix with failures/gaps and exact candidate hashes. If any required route or asset is absent, do not approve clean v1 reinstall. Even full synthetic success is only source/install qualification: production profile/schema compatibility, approval freshness, pending outcomes and observed operational cycles remain separate acceptance gates. This recommendation does not authorize successor-task creation, installation, fetch or production delivery here.
