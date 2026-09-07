# RLS-2 bounded offline artifact checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-07 JST. **Passed for the synthetic coin purchases instruction-only
route.** This is one artifact-completeness qualification, not completion of RLS-2
as an all-component release programme. No publication or business authority follows.

## Change card

- Primary G; supporting future E. Protected boundary: the selected route's local
  package payload and dependency closure. No contract or active manifest change.
- Invariants: explicit development/profile/actor/resource/read-instructions scope;
  inert Provider data; no ambient discovery or credentials; source and indexes
  retained; no module Provider or acquisition execution.
- One package: pack the reviewed minimal closure, inspect actual archives, safely
  extract ordinary files and prove flat/nested instruction behavior with actual
  source/staging/earlier-layout read denial. Definition of done met below.
- Next gate: coordinator accepts this bounded evidence; owner decisions about
  actual distribution identity and scope precede real manifest changes.
- Verification and rollback: focused artifact verifier only; newly added report,
  verifier and restricted generation are the entire authored output. No reset,
  staging, ref mutation, install, hook, network, registration or production action.
- No parallel agents, successor task or model override. Configured settings retained.

Read applicable AGENTS.md, the complete [Private Source Integration Guide](../governance/private-source-integration-guide.md),
the [task policy](../governance/development-policy.md), [RLS-0 package gaps](npm-runtime-rls0-checkpoint.md)
and the full [RLS-1 contract including §11](../../packages/source-provider-api/docs/instruction-resolution.md).
The authoritative guide is not duplicated here. RLS-1 coordinator acceptance and
its **21 direct + 41 integration passes**, denial receipt and preservation record
are inherited evidence; neither those matrices nor recovery were rerun.

## Exact generation and execution

Generation: `rls2-artifacts-1788714350315-94588`, under the authorized development
`fixtures`, `config`, and `runs` directories. All generated directories were
created with 0700; config/request/evidence files use 0600. Candidate/extracted
payload files are ordinary 0644 files beneath those restricted directories.
The scoped escalation for this generation was accepted; no denied output
operation was bypassed and no alternate output root was used.

Primary evidence:
[receipt.json](/Users/naokikimura/workspace/.live-agency-development/runs/rls2-artifacts-1788714350315-94588/receipt.json).
It contains all 11 selected source hashes and byte sizes, expected/actual archive
path sets, all 13 payload hashes and byte sizes, declared dependencies, tarball
hashes/sizes, raw smoke channels/statuses, actual denial paths/codes, and before/
after Git identities. Adjacent `*-pack-list.json` and `*-pack.json` retain npm
stdout/stderr/status. Each layout retains `denials.json`, `absent-process.json`
and `sentinel-process.json`. Source staging, archives, extracted layouts and
contexts remain in this generation for inspection.

Explicit tools: Node **v22.22.0** at
`/Users/naokikimura/.asdf/installs/nodejs/lts/bin/node`; npm **10.9.4** via its
`lts/lib/node_modules/npm/bin/npm-cli.js`. Version outputs were measured locally.
The verifier uses Node built-ins and the existing local npm distribution only.
No dependency installation or registry request is needed.

Command:

```sh
/Users/naokikimura/.asdf/installs/nodejs/lts/bin/node scripts/npm-runtime-artifacts.test.mjs
```

Run only with scoped permission for a new development generation. The verifier
uses exclusive file creation and a unique generation; it does not modify an old
generation. It is deliberately not wired into test-all.

Every `npm pack --dry-run --ignore-scripts --offline --json` and subsequent
`npm pack --ignore-scripts --offline --json --pack-destination ...` ran from the
isolated candidate copy, never the active checkout. Child environments were
constructed from scratch: generation-local empty HOME, explicit user/global
npmrc, local cache, offline/ignore-scripts, audit/fund/update checks disabled.
No ambient npm config, auth, NODE_PATH, NODE_OPTIONS or workspace links were used.
Existing npm's own locally installed implementation dependencies are toolchain
inputs, not dependencies of the extracted route.

## Qualified contents and remaining packaging gap

| Artifact | Manifest provenance | Exact payload | Compressed bytes |
| --- | --- | --- | ---: |
| source-provider-api 1.6.0 | Actual unchanged manifest | package.json; src/index.js; src/runtime-context.js; src/backup-capability-contract.js | 14,807 |
| private-runtime-files 1.0.0 | Actual unchanged manifest | package.json; src/index.js | 2,781 |
| coin-purchase-instruction-provider 1.0.0 | Actual unchanged private synthetic Provider manifest | package.json; descriptor.json; instructions/provider.md | 747 |
| rls2-instruction-artifact-harness 1.0.0 | Explicitly synthetic private fixture manifest | package.json; qualification.json; skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs; skills/_shared/is-main.mjs | 3,036 |

Tarball SHA-256, in table order:

```text
591723d949c7894edeb3af375823eab2609161f56438d83fcf81468b6bb9b556
fc77c04b707a03c14259c94213c93ca09dab21c9e36932a8fcf1eb631a347f24
06866e9e40b5af0802deca6f2c878bb1f785d1b6c617081da94541c9e66c2092
e319a5d64dc2f1169c65daf90e208f1a5d8cbda468c0115522f11f9545368df2
```

API and private-files have no declared external dependencies. The Provider
retains its actual API peer range `^1.0.0`; the local exact API 1.6.0 satisfies
that range and the inert descriptor interval. The synthetic harness declares
exact direct dependencies on Provider 1.0.0, API 1.6.0 and private-files 1.0.0.
All three are supplied by these local tarball payloads. This does not measure
npm peer resolution or lockfile behavior.

Static import inspection identified the API's backup-contract re-export as
required even though this route does not use backup functionality. It is included
unchanged alongside the runtime-context/index cycle. The coin script imports
both libraries and the relative is-main sibling; all are in the archives.
Built-in imports require no additional application artifact. Existing generic
API module-loading code remains in the unchanged API file, but the selected
portable branch never invokes it or loads a Provider module.

The source capture is limited to 11 allowlisted files. Before capture, inspected
imports, manifests and synthetic instruction/descriptor content and scanned the
selected bytes for service URLs, host paths, private-key markers and literal
credential assignments; no such content was found. This bounded review is not a
repository-wide secret audit. No unrelated Skills, Providers, private governance
reports, real data, locks, npmrc or source indexes entered any artifact.

**The Runtime/Skill distribution manifest remains absent.** The name
`@fixture/rls2-instruction-artifact-harness` is only an explicitly synthetic
private fixture, not a proposed final name, registry choice or replacement for
the root composition. `qualification.json` states its exclusions. This payload
qualifies the resolver route, not the entire coin Skill: SKILL.md, agent metadata,
other coin scripts and references are not included or claimed complete. The three
actual-manifest pack results apply to these reviewed minimal candidate copies;
they do not certify packing the entire dirty checkout or public release readiness.

## Archive and isolated execution results

All **4 dry-run lists and 4 actual tarballs passed** exact-set comparison.
The archive reader verifies gzip/tar structure, header checksums, size bounds,
safe package-prefixed paths and the complete path set before extraction. It
rejects links, directories, extensions, traversal, duplicate paths, unexpected
members and missing required files. Each payload's bytes matched the reviewed
source or explicitly synthetic metadata exactly. Extraction creates fresh ordinary
files exclusively; it neither invokes system tar extraction nor follows links.
These rejection rules were inspected; no separate hostile-archive matrix is
claimed in this run.

Both layouts are built solely from the measured archive payload maps. Flat places
owner/API/files/Provider alongside each other in installation node_modules;
nested places all three dependencies in the owner's node_modules. No missing
file was manually copied after extraction. Context owner/Provider manifest and
descriptor hashes come from measured artifact bytes; request/context are synthetic
and distinct from installations. Runtime resource identities bind the same
descriptor/instruction payload in both layouts, not development source paths.

**4 CLI smoke executions passed:** absent output and preexisting sentinel output
in each layout. Every process returned exit **10**, exact instruction text plus
the CLI newline on stdout, and exactly one JSON metadata line on stderr.
The six legacy fields reconstructed from metadata and stdout match across layouts;
ordered resource identities also match. Installation/context identities differ as
intended. Reserved output remained absent or retained its exact sentinel bytes.
Legacy parity itself is inherited from RLS-1, not rerun here.

The same measured Node experimental read-permission mechanism as RLS-1 allowed
only the selected installation, config, input and output-root metadata. There
were **10 actual ERR_ACCESS_DENIED results**: four probes in flat, six in nested.
Both denied the development root manifest, development coin script, source-staging
API file and source-staging coin script. Nested additionally denied the earlier
flat installation's coin script and Provider manifest. Each probe used the same
flags and sanitized environment as its successful CLI processes. This is
Node-version-specific process read confinement, not isolation of the Codex host
or authorization to execute the returned instructions.

## Failure history, preservation and next package

This focused qualification passed on its **first run**, with no failure or repair
history to omit. RLS-1's earlier legacy-manifest and API-closure assembly omissions
are inherited history; the API closure was included before this pack. No active
manifest was patched and no extracted layout was repaired after a smoke failure.

All 11 selected source files were rehashed after smoke and matched capture.
The selected RLS-1 implementation bytes also match its accepted preservation
identities. Root and Skills HEAD and raw index hashes were identical before and
after this run; the receipt records exact values. Original staged/unstaged
distinctions were retained. No shared reservation was reacquired and no v2 source
was edited. No active source, manifest, lock, synced sources, registration,
configuration or schedule write was issued. Concurrent unrelated work was neither
restored nor used to broaden this acceptance; observed closure drift would fail
only this selected-source acceptance.

Rollback consists only of removing this report and the dedicated verifier if
still unchanged, and retiring this exact restricted generation after evidence
retention approval. No source/index reset or production rollback is needed.
Leave all other generations and unrelated work intact.

One recommended next coherent package: **owner-approved distribution manifest
decision for this same route**, choosing the actual Runtime/Skill package identity,
publication/privacy destination and exact supported payload (resolver-only versus
full coin Skill). Record publisher/scope ownership and exact dependencies before
authorizing real manifest/lock edits. Do not turn the fixture name into a release
decision. A subsequent install/lock qualification needs its own scoped authority;
this result proves neither npm install nor reproducibility. Registry availability,
publication, all Skills/Providers, production destinations, host isolation,
secret-store policy and live activation remain open and unclaimed.
