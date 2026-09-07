# RLS-3 bounded offline install checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-07 JST. **Passed for exactly the accepted synthetic coin purchases
instruction route.** This is technical preparation for RLS-3, not a final release
identity/manifest decision, publication approval, or completion of the programme.

## Change card and authority

- Primary G; supporting future E. Protected boundary: the synthetic composition's
  exact offline dependency/lock closure. No runtime contract change.
- Invariants: explicit development actor/profile/resource/read-instructions
  selection; inert Provider data; no acquisition, module Provider execution,
  ambient credentials, source/workspace links, network, hooks or production IO.
- One work package: reuse the four accepted RLS-2 tarballs, generate one new
  private synthetic candidate lock, qualify it before installation, install from
  it in two clean relocated destinations with separate empty caches, and prove
  instruction behavior and locked-integrity refusal. Definition of done met.
- Gate before next package: owner decision on real distribution identity,
  destination/privacy, publisher ownership and supported payload.
- Verification/no mutation: standalone focused harness and this new report only;
  development output is one new restricted generation. Source, actual manifests,
  existing locks, Git indexes/refs, previous generations and v2 edits are retained.
- No parallel agent, successor, cross-task message or model override. Configured
  model/effort retained; no claim that host settings were changed.

Read applicable AGENTS.md, the [task policy](../governance/development-policy.md), the
complete authoritative [Private Source Integration Guide](../governance/private-source-integration-guide.md),
the [RLS-1 contract](../../packages/source-provider-api/docs/instruction-resolution.md) and
[accepted RLS-2 evidence](npm-runtime-rls2-artifact-checkpoint.md).
The guide is not duplicated. The separately scoped synthetic lock-generation/ci
authority in the task brief was used. Filesystem escalation was accepted for the
designated development roots; no rejection was bypassed or rerouted.

## Retained evidence and exact inputs

Generation: `rls3-offline-install-1788714860285-96484`, beneath the designated
development `fixtures`, `config` and `runs` directories. New directories use
0700; a 0077 umask and exclusive creation protect private files. No old generation
was replaced. Tarballs were copied byte-for-byte from accepted artifacts, never
repacked from source. The sole modified tarball is the separate negative copy.

Primary [receipt.json](/Users/naokikimura/workspace/.live-agency-development/runs/rls3-offline-install-1788714860285-96484/receipt.json)
SHA-256: `212a58096a9309768ca4b2bf93b9a283346e99cbcf93560702b3370ddeff0b8d`.
It records all payload hashes, exact lock contents/SHA-512 integrities, tool and
environment hashes, before/after identities, process channels, denial probes,
installed file lists and the negative result. Adjacent `before.json`,
`lock-generation.json`, `ci-a.json`, `ci-b.json`, `ci-tampered.json` and each
scoped npm cache's debug logs preserve the detailed evidence. Smoke channels and
probes are also retained under `runs/<generation>/{a,b}`.

| Accepted artifact | Version | SHA-256 of compressed tarball |
| --- | --- | --- |
| source-provider-api | 1.6.0 | `591723d949c7894edeb3af375823eab2609161f56438d83fcf81468b6bb9b556` |
| private-runtime-files | 1.0.0 | `fc77c04b707a03c14259c94213c93ca09dab21c9e36932a8fcf1eb631a347f24` |
| coin-purchase-instruction-provider | 1.0.0 | `06866e9e40b5af0802deca6f2c878bb1f785d1b6c617081da94541c9e66c2092` |
| rls2-instruction-artifact-harness | 1.0.0 | `e319a5d64dc2f1169c65daf90e208f1a5d8cbda468c0115522f11f9545368df2` |

All four archives and all 13 payload hashes/path sets were checked against the
accepted receipt before installation. All 11 selected source hashes still match
RLS-2; source was read for preservation checks only, not recopied or imported.

The new [synthetic manifest](/Users/naokikimura/workspace/.live-agency-development/fixtures/rls3-offline-install-1788714860285-96484/lock-candidate/installation/package.json)
has `private: true`, version 1.0.0 and a fixture-only name
`@fixture/rls3-private-offline-install`. Its only four dependencies are
`file:../artifacts/<accepted-filename>.tgz`. It is not the instruction owner;
the installed, unchanged RLS-2 harness remains the context-selected owner.
Neither fixture name is a final distribution proposal.

## Lock generation, closure and relocation

Only the new `lock-candidate/installation` ran:

```text
<explicit-node> <explicit-npm-cli> install --package-lock-only --ignore-scripts --offline --no-audit --no-fund
```

It started without a lock or node_modules and produced a new lockfileVersion 3
candidate; node_modules remained absent. This was new synthetic test data, not
regeneration of a source lock. The
[candidate lock](/Users/naokikimura/workspace/.live-agency-development/fixtures/rls3-offline-install-1788714860285-96484/lock-candidate/installation/package-lock.json)
SHA-256 is `9e3a117b48f9d25eaf94afaffa0c279e967d655c4a1b58f2acad89cd52266a1b`;
manifest SHA-256 is `32d752e9ebe7805931771cc760132c13ffb18c7a8b7b313c6f8881d4f0c61c5c`.

Before either ci, the harness required exactly the root plus four package entries,
their exact versions and relative local resolved paths, and SHA-512 integrities
computed from the accepted compressed bytes. No extra dependency, network URL,
absolute development path, workspace link, bundled dependency, optional/dev
dependency or peer metadata override entered the lock. Declared dependency/peer
maps match the unchanged artifact manifests. The harness's three exact direct
dependencies resolve to the three top-level local packages; Provider's sole
`source-provider-api: ^1.0.0` peer is satisfied by that same API 1.6.0 instance.
There is no second API version or unsatisfied peer in the measured closure.

Two independent bundles used unchanged manifest and lock bytes:

- A: `fixtures/<generation>/first/installation`
- B: `fixtures/<generation>/relocated/deeper/second/installation`

Each bundle has its own sibling `artifacts` directory containing the accepted
tarball bytes and its own initially absent node_modules. Each ran exactly
`<explicit-node> <explicit-npm-cli> ci --ignore-scripts --offline --no-audit --no-fund`
with a distinct initially empty cache. Both exited 0 and installed four packages;
neither changed the manifest or lock. B did not use A's tree or cache. Relative
references resolve from the installation project root: relocation works when the
project and its sibling artifacts retain that relationship. A lockfile alone is
not a self-contained relocatable distribution. Both npm layouts are naturally
hoisted; this is not a repeat of RLS-1's manually nested dependency-layout proof.

All 13 installed payload paths, byte lengths and hashes match the artifacts
exactly in both installations. Every installed file is ordinary with nlink 1;
there are no symlinks or source/workspace dependencies. Modes and complete
ordinary-file lists match across A/B. No installed tree was manually repaired.
The only additional node_modules file is normal npm-generated `.package-lock.json`
(1,721 bytes, SHA-256
`48ac969430ad2ddbce7b892301c7e576e328ba162894502390972b5d78fd3701`). Its four
entries also match the candidate lock. Complete sorted tree evidence, including
modes and this metadata, has SHA-256
`a6d79b21dd16bb482f35fb512bff32b434b02dfde98ac3b3aff68210da2cf257` in both runs.
This digest excludes inode numbers and timestamps by design.

## Toolchain and configuration evidence

Measured on darwin/arm64, Node v22.22.0 at
`/Users/naokikimura/.asdf/installs/nodejs/lts/bin/node`, npm 10.9.4 at
`/Users/naokikimura/.asdf/installs/nodejs/lts/lib/node_modules/npm/bin/npm-cli.js`.

| Input | SHA-256 |
| --- | --- |
| Node executable | `913b144fdb40638b1acef7974ab3c33fbd527cc0974cb5da467ab1e6ac51b4d4` |
| npm CLI | `8e5f6f3429f8cdbe693cdc29904e9d5a7b127a494bd15c804bd54c7403bfcbe7` |
| npm distribution ordinary-file inventory (paths, bytes, SHA-256, modes) | `7d2a9fa077b81853e1b31035c35377b43880beaaf4f8f0b7f7e6ab87a5a830d7` |
| Executed standalone harness | `ce3527c0c2a8bd1e0e96ef4e4dd53dd44d5801417adc41445592fe6caba76c9e` |
| Lock-generation environment JSON | `9c6874cb36cedd3aaa43b3c8a1be2f79d50c24e740c84aa3803e2bf62a7eb1ac` |
| A environment JSON | `67a05e385a204da66f8a760051a872f5dc5973c0695cce9eb02671b66b09761f` |
| B environment JSON | `f6f945417e7111774bcd3c67fc66ea9d7e671b05a008d74121d020fb07294d6a` |
| Negative environment JSON | `918aa3f9f284ba8c4210db0cffff22889bb173e0bb66b1eaeb3444b7889ce7d3` |

Each complete child environment is constructed from scratch, with explicit PATH,
empty local HOME, selected user/global npmrc and generation-local cache; no ambient
environment is merged. Project/user npmrc set offline/ignore-scripts and disable
audit, fund and update notifications. Global npmrc is empty. Project/user config
SHA-256 is `29ba723530f2901f4af9baea150e99634360ab90e1958ef39bd0f1da56d3f81a`;
empty global config has SHA-256
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
No ambient NODE_OPTIONS/NODE_PATH, auth, browser, Keychain or CLI credentials are
used. Debug logs name only the selected configs plus npm's own built-in npmrc
path, which is absent on this toolchain. Existing npm implementation dependencies
are hashed toolchain inputs, not additional application packages.

One detail must not be hidden: lock generation logged a packument-cache miss for
the registry key of private-runtime-files 1.0.0 during Arborist prefetch. It did
not add a registry source to the lock. Local implementation inspection shows
Arborist's speculative prefetch catches failure (`build-ideal-tree.js` around
line 1011), npm-registry-fetch maps offline to `only-if-cached`, and
make-fetch-happen throws on a missing cache entry before its remote call.
The log contains no HTTP network fetch; the final dependency is satisfied by the
explicit local tarball. Ci logs' `http cache ...@file:` labels refer to local
artifact processing, not evidence of a warm shared cache. No download, registry
request or offline-resolution repair was performed. This is offline-option,
source and log evidence, not packet capture or a separate OS network sandbox.

## Installed CLI and integrity refusal

The accepted RLS-1 context/profile/request contract was retained with selected
owner/Provider paths matching actual npm layout. Context digests were computed
from fixture bytes and supplied independently on the command line. There was no
Provider module import, instruction execution or acquisition.

Four CLI cases passed: absent output and preexisting sentinel in each installation.
All returned exit 10, exact instruction text plus CLI newline on stdout, and one
metadata JSON line on stderr. The reconstructed six legacy result fields and
ordered resource identities match across installations; installation/context IDs
intentionally differ. Outputs remained absent or preserved their sentinel bytes.
Context SHA-256: A `01ba258e6c804cc20f36ae3654275145c64167708e6ab127d1248d96f83849b8`;
B `99f0ed488d59026cfd9413ec9766f01e5d8beaa1b771b365e925876933436f85`.

Using the same Node experimental permission flags as each successful CLI, actual
read probes produced 10 ERR_ACCESS_DENIED results. A and B each denied the
development root manifest, development resolver, accepted RLS-2 source-staging
API and staged resolver. B also denied A's installed resolver and Provider
manifest. Only the selected installation/config/input/output-root metadata were
allowed. This measures Node-specific process read confinement, not Codex host
isolation, service authority or permission to follow returned instructions.

The distinct `tampered` bundle retained the exact manifest and lock and an empty
cache. Only its Provider tarball copy was changed: one same-size S/s byte in the
instruction heading, then gzip recompression. The archive remained structurally
valid with the same member set. Its SHA-256 became
`e3838acfba28f338f6cba7964af72b572bf1b7a9185bc7436b27a9c4a7f0072a`.
Npm ci exited 1 with EINTEGRITY and reported the expected/actual SHA-512 values.
The lock digest stayed unchanged; the original accepted tarballs stayed unchanged.
This proves tarball content enforcement by the existing lock, not rejection of a
modified lock. Npm's own local retry messages are retained. Partial files may exist
in that failed disposable destination; no CLI was run there and no transactional
rollback guarantee is claimed.

## Preservation, limits and one next owner decision

The focused qualification passed on its first execution. `node --check` passed
before running. Only this new report and
standalone verifier (historical source: `runtime/scripts/npm-runtime-offline-install.test.mjs`; retained with the pre-M1 source-disposition snapshot) were authored
in the checkout; no test-all wiring or artifact-verifier edit was made. Receipt
preservation compares all 11 source-closure files, both root/Skills manifests and
locks, and the prior artifact verifier (16 paths): all unchanged. Root and Skills
HEAD/raw index hashes remained identical. Existing staged/unstaged distinctions
and concurrent v2 work were retained. All four original artifact hashes remained
unchanged. No source reset, stage, ref, registration, schedule, production change
or operational installation was issued.

This establishes repeatable ordinary-file content from this one lock and these
four fixed tarballs on this exact local toolchain. It does not establish repeated
lock generation, cross-platform/version behavior, timestamps/inodes, reproducible
packing, registry availability, publisher trust/signatures, full coin Skill
payload, all-runtime conformance, production recovery, host isolation or release
approval. RLS-1's full matrix and unrelated v2/recovery suites were not rerun.

Rollback is limited to removing the new report/verifier if still unchanged and
retiring this exact generation after evidence-retention approval. Keep accepted
RLS-2 and all other generations; no source/index or production rollback is needed.

**One next owner decision:** select the actual Runtime/Skill package name and scope,
distribution destination and privacy, publisher/scope owner, and whether the
supported payload is resolver-only or the full coin Skill. That decision enables
a separately authorized real manifest/dependency-pin change. Neither synthetic
fixture name should be promoted by inference. Further synthetic qualification
loops are not proposed in place of this owner decision.
