# RLS-0 offline distribution decision checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-07 JST. Status: **local investigation complete; RLS-0 partially complete**.
Registry ownership/privacy, publication availability, final installation destinations
and host acceptance remain unverified. No release or integration decision is made.
This is a private development decision record, not a public package resource.

## Change card and disposition

- Primary G, supporting future E: inspect the pinned distribution/configuration
  boundaries; this package changes documentation only.
- Invariants: public contracts, private implementation and real data stay separate;
  explicit development selection remains fail-closed; operational runtime and
  recovery generations remain required. No source, manifests, locks, Git index,
  host registration, integrations, schedules or production state changed.
- Outcome: actual local graph, resource/caller coverage, packaging gaps and one
  reviewable RLS-1 proposal. No separate inventory successor is needed.
- Next gate: coordinating owner accepts the RLS-1 contract and exact edit scope,
  resolving shared-file ownership with the v2 lane. Registry decisions gate
  distribution manifest changes/publication, not this offline investigation.
- Verification: static manifests/locks/source and document links only. No npm,
  hooks, pack, dependency checks, server starts, remote queries or global Skills
  executed; no credentials or private runtime data read. Rollback removes this
  newly authored document only. No staging/commit or model override; configured
  defaults retained. No subagents or cross-task messages.

Read applicable AGENTS.md, the [task policy](../governance/development-policy.md),
[lifecycle design](../../runtime/docs/deployment.md) (especially §§2–6, 13–15), and
complete [Private Source Integration Guide](../governance/private-source-integration-guide.md)
before reviewing the local Skill contract. The guide is not reproduced here.
The [cleanup ledger](environment-cleanup-coordination.md) accepts ORG-5 as retained;
no further empty-tools audit/removal is proposed. Guide deployment and source
archives are accepted; seven excluded originals await owner retention binding.
SEP-2 full authority isolation remains unresolved and does not stop authorized
offline preparation. Operational retirement requires actual package deployment.

The [v2 coordination end](v2-development-coordination.md) and
[current handoff](v2-task-handoff.md#4-next-work-package) were read once. At that
observation the ledger had dispatched profile compaction, while the handoff
already reported 313 passing synthetic tests, standalone conformance and a
coordinated-deletion hold; live-metrics compaction was the next candidate.
Profile/invitation media and append conformance remain incomplete. This timing
difference is concurrent progress, not a contradiction to repair here. The v2
owner `01a0772d-7eaa-7e23-86a8-73d646470bbf` retains callers, handoff and ledger.

## Evidence reused and limits

| Evidence | Accepted implication for RLS-0 |
| --- | --- |
| [SEP-0](environment-separation-sep0-checkpoint.md) and [SEP-1 brief](environment-separation-sep1-brief.md) | Reuse the 17-repository source inventory, source/operational separation and bounded host-reference inventory; no archive reconstruction or whole-host audit. |
| [Current composition recovery](stab-current-composition-recovery-qualification.md) | Historical lock reconstruction and relocation; dirty source, including required untracked files, matters beyond HEAD. Its native-gap status is superseded below. |
| [Native qualification](stab-native-cli-artifact-qualification.md) and current cleanup ledger | CLI 1.0.93 arm64 artifact statically verified; 4,190 files/links, 24 relative links and 16 focused tests accepted. Owner performed the two-tree exchange; subsequent source/inventory, SDK, discovery and both dependency closures passed. Do not reopen the completed recovery. |
| Cleanup ledger's postcheck paths and retained journal | Journal predates successful separate postchecks. Six schedules restored ACTIVE; this is inherited production evidence, not permission to replay exchange/suspension or a current live-health claim. |
| Local manifest/lock/source observation below | Development source packaging facts only. No installed tarball, registry accessibility, publication rights or atomic releasable snapshot demonstrated. |

The previously qualified toolchain is Node **22.22.0**, npm **10.9.4**, macOS
**26.6.2 (25G83), arm64**. These are inherited qualification values, not a new
host probe or an adopted support matrix. Root/core/Chat/MCP declare only Node
`>=22`; other local manifests declare no engines. No manifest declares
`packageManager`, `os`, `cpu`, `publishConfig`, `author` or `repository`.
Both observed locks are version 3: root 131 records/11 workspace links, Skills
24 records/11 workspace links. Their hashes and root manifest match recovery
evidence. The source `.npmrc` contains only `install-links=false`; no private
registry mapping is established there. No user/global npm configuration was read.

## Actual package graph and ownership

Ownership below means local source responsibility and repository namespace, not
confirmed npm scope administration or legal ownership. `.gitmodules` names the
`flair-agency` GitHub namespace for nine component repositories. A URL and local
remote-tracking evidence do not prove current remote privacy or publication.
Root/core are root-owned source; API/files and Skill resources are Skills-owned;
Providers and MCP are owned by their respective component repositories.

All root/Skill aggregate, seven Provider, core and MCP manifests have
`private: true`. This blocks publication of those manifests as currently written;
it does not prove GitHub repository privacy or that a similarly named package
has never been published. The two shared libraries omit `private` and declare
MIT; they are public-distribution candidates, not certified public artifacts.
No local human publisher or registry administrator is declared.

| Local path / source owner | Exact name @ version | Distribution surface / gap |
| --- | --- | --- |
| Root / composition | `@flair-agency/live-agency-provider-runtime@1.0.0` | Private development root; no files/bin/exports; nested install postinstall. |
| `skills/live-agency-skills` / Skills | `live-agency-skills@0.0.0` | Private test aggregate; no files/bin/exports, nine fixture dependencies. |
| Skills `packages/source-provider-api` / Skills | `@live-agency-skills/source-provider-api@1.6.0` | MIT, exports `src/index.js`, files `src`. |
| Skills `packages/private-runtime-files` / Skills | `@live-agency-skills/private-runtime-files@1.0.0` | MIT, exports `src/index.js`, files `src`. Name denotes protected-file handling, not a privacy setting. |
| `packages/lark-core` / root | `@flair-agency/lark-core@0.1.0` | Private, exports index, files `src`; CLI dependency. |
| `providers/lark-base` / Base | `@live-agency-skills/lark-base-client@2.0.0` | Private, root and activity/gift/attachment subpath exports; files src/knowledge/instructions. |
| `providers/lark-chat` / Chat | `@flair-agency/lark-chat-provider@1.0.0` | Private, root export; files src/knowledge/instructions. |
| `providers/backstage` / Backstage | `@flair-agency/backstage-provider@1.2.2` | Private; files src/instructions/knowledge; module and instruction bindings, no exports. |
| `providers/tiktok-ios` / iOS | `@flair-agency/tiktok-ios-provider@1.1.0` | Private; files instructions/knowledge/scripts, no exports. |
| `providers/tiktok-web` / Web | `@flair-agency/tiktok-web-provider@1.0.0` | Private; files instructions/knowledge/scripts, no exports. |
| `providers/google-drive` / Drive | `@flair-agency/google-drive-provider@1.0.0` | Private, root export; files src/instructions/knowledge. |
| `providers/moneyforward-cloud-expense` / Expense | `@flair-agency/moneyforward-cloud-expense-provider@1.5.0` | Private; files instructions/knowledge/scripts/src, no exports. |
| `mcp/live-agency-operations` / MCP | `@flair-agency/live-agency-operations-mcp@0.5.0` | Private; script launchers, no files/bin/exports. |

`@flair-agency/live-agency-runtime` / `live-agency` remains the design's
**provisional, absent** Runtime package/bin; do not silently rename the root.
No package has a complete release descriptor or supported-Skill resource manifest.
The graph distinguishes dependency declarations from workspace availability:

```text
private development root
  dependencies -> Backstage 1.2.2, Drive 1.0.0, Expense 1.5.0,
                  iOS 1.1.0, Web 1.0.0, Base 2.0.0,
                  API 1.6.0, private-files 1.0.0,
                  @larksuite/cli 1.0.93, MCP SDK 1.30.0
  workspaces additionally -> core 0.1.0, Chat 1.0.0, MCP 0.5.0
  postinstall -> nested Skills npm ci --ignore-scripts
MCP -> Base 2.0.0, API 1.6.0, SDK 1.30.0, zod 4.5.4
Base, Chat -> core 0.1.0 -> @larksuite/cli 1.0.93
Backstage -> read-excel-file 9.3.5
Backstage, Drive, iOS, Web, Expense --peer--> API ^1.6.0
iOS, Web, Expense --peer--> private-files ^1.0.0
Skills aggregate -> API 1.6.0, private-files 1.0.0,
                    9 @fixture/* packages at 1.0.0 (test composition)
Skills scripts --import--> API, private-files, Base client
root launchers --relative source imports--> Skills, MCP, Providers, core
```

The fixture names are activity-pasted-source, coin-purchase-instruction-provider,
expense-instruction-provider, gift-history-source, invitation-instruction-source,
invitation-observation-source, live-history-instruction-source,
multi-binding-provider and profile-instruction-source. They are private local test
packages, not production dependencies to carry into the future release. In
particular, Skills' Base-client import is supplied by the outer composition, not
its aggregate dependencies; workspace success is insufficient packaging evidence.

## Skill, resource and caller coverage

The installer enumerates **16** non-underscore directories with SKILL.md under
`skills/live-agency-skills/skills`. Each has `agents/openai.yaml`; counts below
are current local source payload, **not shipped tarball verification**. Include
the listed scripts, references, SKILL.md and agent metadata in any selected Skill
artifact; resolve referenced resources and transitive imports before declaring
that artifact complete. Foreign-revenue accounting and other global Skills are
outside this package set; their presence in the host catalog does not make them
shipped by this Runtime.

| Skill | Scripts / reference files | Packaging caller family |
| --- | --- | --- |
| `coin-expense-reconcile` | 5 / 2 | Provider resolver + local plan/prepare/verify |
| `coin-expense-weekly-application` | 5 / 2 | Provider resolver + local plan/prepare/verify |
| `creator-activity-sync` | 3 / 2 | Provider resolver + observation/selected caller |
| `creator-insight-sync` | 4 / 3 | Insight selected caller |
| `creator-invitation-status-compaction` | 2 / 1 | Retention/deletion caller |
| `creator-invitation-status-sync` | 7 / 3 | Provider resolver + observation/selected caller |
| `creator-live-history-compaction` | 1 / 2 | Retention/deletion caller |
| `creator-live-history-sync` | 7 / 3 | Provider resolver + observation/selected caller |
| `creator-live-metrics-compaction` | 1 / 1 | Retention/deletion caller |
| `creator-profile-compaction` | 1 / 1 | Retention/deletion caller |
| `creator-profile-sync` | 7 / 3 | Provider resolver + observation/selected caller |
| `gift-history-sync` | 7 / 4 | Provider resolver + master/projection caller |
| `lark-base-backup` | 1 / 4 | Backup/retention/drill/maintenance contract caller |
| `lark-base-backup-retention` | 2 / 1 | Backup/retention/drill/maintenance contract caller |
| `lark-base-disaster-recovery-drill` | 1 / 1 | Backup/retention/drill/maintenance contract caller |
| `lark-base-maintenance` | 1 / 1 | Backup/retention/drill/maintenance contract caller |

`skills/_shared/{is-main,lark-base-client}.mjs` is outside individual Skill
folders and skipped by installer discovery; its relative-import closure must
remain accessible from installed scripts. Linking/copying isolated Skill folders
without this sibling is insufficient.

The seven direct Skill discovery callers are
`resolve_coin_expense_provider.mjs`, `resolve_weekly_application_provider.mjs`,
`resolve_activity_source.mjs`, `resolve_gift_source.mjs`,
`resolve_invitation_source.mjs`, `resolve_live_history_source.mjs` and
`resolve_profile_source.mjs`, each under its corresponding Skill's scripts.
They use `--provider-root`. MCP `src/runtime.mjs` is the shared discovery caller
for observation runtime composition and caches discovery. The API currently
reads the root manifest's dependencies, then literal
`<root>/node_modules/<package>/package.json`; it does not support an exported
resource descriptor with resolution anchored at the owning Runtime package.
Resource checks are lexical path containment, not full realpath containment.

The five metadata Providers declare **10 bindings**: Backstage 4, iOS 2, Web 2,
Drive 1, Expense 1. All declared entry/instruction/support paths exist locally
(10/5/5/2/5 unique paths respectively). Base/Chat instead expose code and knowledge;
they have no `liveAgencyProvider` discovery descriptor. `files` declarations
alone prove neither transitive resource completeness nor absence of private data.
No authenticated instruction contents are copied into this checkpoint.

Root scripts expose seven MCP starts: operations, scouting read, scouting write,
invitation write, profile write, management, intelligence. Six point into MCP
source; intelligence points to a root launcher and imports Chat/MCP source by
relative path. Activity runner and gift projection launcher directly import
Skills source; full-base backup runner directly imports a Drive implementation.
Profile candidate, invitation candidate/execute/verify, intelligence candidate/
activation/verification and Lark migration/analysis helper families also import
component source. Those operational helpers require explicit inclusion or exclusion
in a release inventory; RLS-1 does not port them. Existing v2 caller inventory
reports remain the detailed behavioral authority; this is bounded static caller
coverage, not all-host or every dynamic call-path certification.

Inherited SEP host coverage is 16 operational Skill links and five configured
agency MCP entries; six current schedules come from the newer cleanup ledger.
Exact existing destinations/configuration references stay in restricted SEP
metadata. No fresh link, process or schedule audit was performed. Preserve
operational paths until the separately approved migration proves their callers.

## Packaging and configuration decisions

| Concrete gap | Required disposition before release |
| --- | --- |
| Public/private aggregate manifests | Keep the development root private. Select separate Skill/Runtime artifacts; remove test fixture closure from production composition. Decide access individually; no blanket public conversion. |
| Exports and resources | Add explicit provider descriptors/resource APIs and Runtime-selected package list. Handle nested dependencies with Node resolution, then reject resolution outside the selected installation. MCP needs supported entrypoint exports and files; preserve read/write process separation. |
| Toolchain/lifecycle | Owner adopts exact executable/toolchain/platform contract. Future install uses locked dependencies with hooks disabled; explicitly materialize/verify the CLI native asset using its release contract. Never rely on first-launch download. Prior qualification closes recovery, not lifecycle design for every future release. |
| Configuration roots | Replace root-relative private/config assumptions with explicit immutable environment selection. Preserve schema, active profile, actor, target and operation checks plus owner-only files and realpath confinement. |
| Registration | Current installer defaults to user-global `.codex/skills`; root command adds `--replace`. It refuses ordinary directories but can replace unrelated symlinks, has no ownership ledger or release handshake, and enumerates all Skills. Keep it unexecuted here; future host adapter needs explicit destination/provenance/conflict handling. |
| Release identity | No production installation manifest/lock or verified tarball exists. Freeze source including accepted dirty work, exact versions, artifact hashes, knowledge/schema versions, Skill resources and evidence. Workspace links in current locks cannot be used as a production release lock. |
| Publication boundary | API/files MIT and generic Skill intent are candidate evidence only. Perform actual pack-content/license/private-boundary review under later authority; absent files allowlists on aggregates/MCP are concrete gaps. Registry privacy, names and publish rights remain unknown. |

Observed source configuration inputs are `LIVE_AGENCY_PROVIDER_RUNTIME_ROOT`,
`LIVE_AGENCY_PROVIDER_BINDING_PROFILES_PATH`,
`LIVE_AGENCY_LARK_INSTANCE_PROFILES_PATH`,
`LIVE_AGENCY_SCOUTING_WRITE_PROFILE_BUNDLE_PATH`,
`LIVE_AGENCY_INVITATION_HISTORY_WRITE_PROFILE_BUNDLE_PATH`,
`LIVE_AGENCY_PROFILE_HISTORY_WRITE_PROFILE_BUNDLE_PATH`, and
`LIVE_AGENCY_INTELLIGENCE_CONFIG_PATH`. These are names only, not active values.
MCP launchers infer the composition root when omitted; some select checked-in
binding definitions, while intelligence defaults beneath `<root>/private`.
These are migration targets, not permitted development defaults.
`private-runtime-files` enforces file ownership/mode/no-follow and atomic output,
but does not establish an environment allowlist or prevent all ancestor symlink
escapes; retain its existing checks while adding a bound-root contract.

Known development source is this saved checkout. Synthetic inputs/config/output
must use `/Users/naokikimura/workspace/.live-agency-development/{fixtures,config,runs}`
with normal scoped filesystem permission. The reserved `codex-home` is not an
isolated-host assertion. Production installation/control/state roots, Node/npm
executable paths and eventual Codex/Work registration destinations remain owner
choices. Do not convert existing operational paths into guessed target defaults.

Missing owner decisions (no further inventory task proposed):

1. Registry/destination, scope administrator, access policy and name availability
   for each private package and provisional Runtime. GitHub Packages is a design
   candidate only; public library/Skill publication is a separate choice.
2. Exact production installation/control/state and host-registration destinations,
   initial supported host, publisher versus activator ownership, and supported
   toolchain/platform. Current Codex operation is retained; local Work is unverified.
3. RLS-1 edit ownership/contract below; later configuration migration also requires
   an explicit secret-store/reference policy. No credentials are needed for the
   synthetic route. Retention/prune terms remain the lifecycle design's later gate.

## One proposed RLS-1 contract

**Select the coin purchases instruction-resolution route only**, using a synthetic
Provider derived from the existing coin instruction fixture. Exercise
`resolve_coin_expense_provider.mjs --mode purchases` through an explicit portable
Runtime context; return `instructions-required` with exact package/version,
binding, knowledge/resource identity. Do not follow the instructions, acquire
receipts, execute a module Provider, register expenses or start MCP. This uses
an existing caller and inherited coin/API synthetic evidence while avoiding the
v2 media/append/coordinated-deletion contracts. It is a portability proof, not
full coin business-route, all-Skill or M2U live conformance.

Proposed context binds schema/release/configuration revision, an installation-root
identity, an owning package-resolution anchor, exact package/version/descriptor
selection, synthetic active profile/actor/target, and the sole local
instruction-read operation. The package resolver uses Node resolution anchored
at that owner, supports a nested dependency layout and validates the resulting
realpath within the selected installation. A descriptor/resource export must be
self-contained; it must not require reading an unexported package.json subpath.
Request/config paths are confined to the selected synthetic roots; private IO
retains existing 0600/owner/no-follow checks. Resource/config hashes and selection
must remain stable for the run. Environment configuration cannot execute code.

Keep the old `--provider-root` implementation explicitly available for legacy
callers; never try it when the portable route fails and reject mixed context/
legacy selectors. No global discovery, cwd, NODE_PATH, HOME, credential, browser,
CLI or production-profile fallback. Retire the compatibility route only after
remaining seven-caller/MCP migration and a separately accepted removal decision;
RLS-1 acceptance itself does not expire the operational route.

Required synthetic acceptance/rejection cases:

- Two independent fixture installation layouts, including a nested dependency;
  exact same descriptor/resources/result with development and first-layout reads
  denied in the second. This may use allowlisted regular-file fixture assembly
  without npm/pack; that proves the contract, not a tarball install.
- Reject absent/unknown environment or schema, missing/changed/inactive profile,
  wrong actor/target/operation, release/config/resource hash drift, mismatched
  package version and changed selection. Refuse all service execution requests.
- Reject missing/ambiguous Binding, incompatible API, absent/unexported descriptor,
  missing resource, traversal, sibling-prefix tricks, escaping symlinks, insecure
  config/request files and resolving a package outside the installation. Include
  parent-node_modules/global contamination attempts and mixed legacy arguments.
- Preserve instruction-only exit/result semantics and unattended rejection;
  compare the legacy synthetic result for the same input. Existing direct
  Provider API/private-files/coin tests cover affected compatibility; do not
  rerun production recovery or unrelated v2 suites.

Proposed editable-file envelope **for later coordinator allocation**, not edits
or implementation authority exercised by this report:

| Owner | Exact proposed files |
| --- | --- |
| Skills shared APIs | `skills/live-agency-skills/packages/source-provider-api/src/index.js`; new `src/runtime-context.js` in that package; `skills/live-agency-skills/packages/private-runtime-files/src/index.js` |
| One Skill caller/contract | `skills/live-agency-skills/skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs`; its sibling `../SKILL.md` |
| Synthetic descriptor | `skills/live-agency-skills/fixtures/coin-purchase-instruction-provider/package.json`; new sibling `descriptor.js`; retain synthetic instructions unchanged |
| Direct tests | `skills/live-agency-skills/test/provider-api.test.js`, `private-runtime-files.test.mjs`, `coin-expense-reconcile.test.mjs`; new `scripts/npm-runtime-resolution.test.mjs` |
| Handoff | This checkpoint only, unless the coordinator allocates another exact report |

The fixture manifest proposal adds a descriptor export without renaming/version
or dependency changes; production manifests and both locks remain excluded.
The coordinator must allocate shared API/private-files edits against the v2 lane
before dispatch, and review the exact context/descriptor schema. Use existing
root exports to expose new helpers; no Runtime distribution manifest or selected
Lark caller changes belong in this proof. If the envelope is insufficient, return
the specific boundary decision rather than silently widening scope.

## Observation identities and verification

These identities describe bounded local reads on the date above. HEAD is not a
release identity for dirty work; no claim of final atomic consistency is made.
Concurrent v2 source/handoff updates are expected. Rebind only affected source
hashes before RLS-1 implementation, without redoing SEP archives or recovery.

| Repository | Observed HEAD |
| --- | --- |
| `.` | `6b1f11c17cec53f2adcce5fd88b87666c322f859` |
| `skills/live-agency-skills` | `e78ec0962184fee2b07ea85b3f24545438f232d4` |
| `providers/backstage` | `9ad23b67078668a3409e5db3164314fbd5704d3a` |
| `providers/lark-base` | `996eb2641852c45377766c4166102b70604470be` |
| `providers/lark-chat` | `1de8c1c4ecb78da53245a2ca02ff7c36b3d45eba` |
| `providers/google-drive` | `6467cc22baa639259609bb96c849b14d38504033` |
| `providers/tiktok-ios` | `2d202687b0199536d8fe07599098f37bc3e773f7` |
| `providers/tiktok-web` | `ff1b613d8ae99188fbb29cca4b7dfc8093243f86` |
| `providers/moneyforward-cloud-expense` | `400c25f5a601a29c1387148bbca73fdcd572cb6d` |
| `mcp/live-agency-operations` | `8c5d1dc27dc8fb5ae8250735e3d9cfdb1af0a133` |

| Observed file | SHA-256 |
| --- | --- |
| `package.json` | `6856192cab09d65ab67761939e2ff36e2db74717b75e8c79d3285c1476695e0e` |
| `package-lock.json` | `a1cf1fbbd25ec52c7fb038252825673608b67bc79b9bd5f5d3e8f3221a2a1250` |
| `.npmrc` | `2c29a6d2a25cef2acb7e49b4d390fd87a5f1a2ca5be52dcb0dbec187ac1b2c04` |
| `packages/lark-core/package.json` | `f15c4645ec8628d7eca5a3ac73101df97ddda750f42ef15769b659bd59a4ed32` |
| `providers/tiktok-web/package.json` | `c357a474711a61e1e2b09c2853b10e207de0cff69b0afd068740bb153ba8e486` |
| `providers/tiktok-ios/package.json` | `35da036126e4411824b8d9d8086ded33a69f4fe3ab181f8daf62975258fb74ed` |
| `providers/lark-chat/package.json` | `61f2ede9af036c9cec10be6a8f316aa138441541f738d08dd8f7929438e0714b` |
| `providers/google-drive/package.json` | `5317419dd04266d49ca61867d83bf07cb58957173742d432e3da70fa88a6dfba` |
| `providers/moneyforward-cloud-expense/package.json` | `1a6377ee1b13ca996b9ce1daa7819450243f913aa8bfdef71c83afbc8b7e12f3` |
| `providers/lark-base/package.json` | `d270b79b64911e6d5eba3ce2ae550703d8eaea89e15c2db976f447cfdfceca51` |
| `providers/backstage/package.json` | `66f755bd65ef5e6c254d1e4c586f488eb82dcabbb80974a900db83daa6a4226f` |
| `mcp/live-agency-operations/package.json` | `ddbf0b1ca9cba19702657ad3f419f59e3c1776d0194df6864905852c5fd0fb14` |
| `skills/live-agency-skills/package.json` | `8a3a7c291c2f1e5bca6121eb851b1af269416b8b9fc759cf920be557f0d9344b` |
| `skills/live-agency-skills/package-lock.json` | `f17c4987e4764370ef2270f5963e52ad04c2d70339ef8e8e2b0fe56d54978abd` |
| `skills/live-agency-skills/packages/private-runtime-files/package.json` | `ac48a61740f4d341241650db34f71819fff4a1775b51518e98bee4f99c7c8372` |
| `skills/live-agency-skills/packages/source-provider-api/package.json` | `bac2b3aa93474262fe5fbf48caf4282e5a053460d324183a1d95b7e61e19719f` |
| `scripts/install-codex-skills.mjs` | `4b3605092509e3fffb34c3b3917bf91abf6d0fe4d3e85ecb83afd38e1cf7838e` |
| `scripts/agency-intelligence-mcp-server.mjs` | `a57e8f5b82c8c7c954939e13ce9f77713e5c01b0e1d83be7b8aa4d7a24daadb0` |
| `scripts/agency-intelligence-mcp-runtime.mjs` | `3e2eef925789271122ada12f1a8c9b59ec75e5fe7a0ce9c390ae131e5034c398` |
| `mcp/live-agency-operations/src/runtime.mjs` | `53a112888e5f4770f741666a262ca5977c567d4e75720595eac00396c283b824` |
| `skills/live-agency-skills/packages/source-provider-api/src/index.js` | `fc25ec1b1002fa6e1fbc91e8cbeb181a7300f8422279a8011715bc087e0c313c` |
| `skills/live-agency-skills/packages/private-runtime-files/src/index.js` | `ff9b778850dfc55cbb60b227d830bc1d0a12dadecdf3e8dd312ab357b3de7105` |
| `skills/live-agency-skills/skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs` | `be3ce3c30f0346b0a0c437714ac8b7c18f907223a0009e3f7aef152095f16452` |
| `../docs/governance/private-source-integration-guide.md` | `436599830a7d3fa955d1241b1056db9555b83e1f6aa1227d3fc5ad4199700769` |

Focused document checks: local Markdown links resolve; evidence paths and proposed
new paths are distinguished; only this checkpoint was authored. No tests, archive
restore, dependency reconstruction, package creation or external verification
were performed. RLS-0's unavailable external decisions remain open explicitly;
the recommended next work is the single offline RLS-1 contract above after
coordinator acceptance and shared-file allocation.
