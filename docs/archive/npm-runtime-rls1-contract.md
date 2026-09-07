# RLS-1 decision and measured implementation record

Status: historical. Current API is [owned by source-provider-api](../../provider-runtime/skills/live-agency-skills/packages/source-provider-api/docs/instruction-resolution.md); Runtime owns [integration](../../provider-runtime/docs/instruction-resolution.md).

## 1. Change card, scope, and governing decisions

- Primary E, supporting G. Primary boundary: shared Provider resolution and
  configuration selection; supporting boundary: one existing coin caller.
- Invariants: explicit environment, actor, target and operation; inert configuration;
  private source separation; no ambient discovery; retained explicit legacy route.
- This package: decide one implementation-ready contract in this document only.
  No source, manifest, lock, Skill, handoff, registration or schedule changes.
- Next gate: coordinator accepts this contract and allocates the shared files in
  §9 against the v2 owner. Then implement the one package in §9, including tests.
- Verification: focused source/document checks. Rollback: remove this document.
  No staging/ref changes, external IO, installation, pack or business execution.
- No parallel agents, successor tasks or cross-task messages. No model override;
  existing configured settings retained.

The [RLS-0 checkpoint](npm-runtime-rls0-checkpoint.md#one-proposed-rls-1-contract)
selects `resolve_coin_expense_provider.mjs --mode purchases`. Accept that scope:
read the selected private instruction bytes, return `instructions-required`, and
exit 10. Never follow instructions, load a Provider module, acquire evidence,
register expenses, or start an MCP. This proves portability of this route only.

Read the complete authoritative [Private Source Integration Guide](../governance/private-source-integration-guide.md)
and [task policy](../governance/development-policy.md). The guide is not reproduced.
The [lifecycle design](../../provider-runtime/docs/deployment.md) §§3, 5, 11–15 provides the
larger dependency order: accepted RLS-1 contract → one local implementation proof
→ separately gated artifacts/release/host work. This package does not declare
RLS-0's registry decisions complete or authorize RLS-2 publication.

The current [v2 handoff](v2-task-handoff.md) and
[coordination ledger](v2-development-coordination.md) were read once for ownership.
Coordinator `01a0772d-7eaa-7e23-86a8-73d646470bbf` retains selected caller
conformance, shared-client integration and those documents. LIVE-metrics
compaction was dispatched at observation; RLS-1 must not edit its files.

## 9. One implementation package and ownership gate

Outcome: additive portable API and bounded file reader, wired to the existing
coin purchases instruction caller, with synthetic descriptor and direct tests
proving §8. No second design pass is scheduled. Coordinator acceptance and exact
shared-file reservation are the entry gate, not a registry decision.

| Owner | Exact editable envelope for that later package |
| --- | --- |
| Skills shared API | `skills/live-agency-skills/packages/source-provider-api/src/index.js` (additive exports only); new sibling `runtime-context.js` |
| Skills private IO | `skills/live-agency-skills/packages/private-runtime-files/src/index.js` (additive helper only) |
| Coin caller | `skills/live-agency-skills/skills/coin-expense-reconcile/scripts/resolve_coin_expense_provider.mjs`; `skills/live-agency-skills/skills/coin-expense-reconcile/SKILL.md` |
| Synthetic package | `skills/live-agency-skills/fixtures/coin-purchase-instruction-provider/package.json`; new sibling `descriptor.json` (not descriptor.js) |
| Direct tests | `skills/live-agency-skills/test/provider-api.test.js`; `skills/live-agency-skills/test/private-runtime-files.test.mjs`; `skills/live-agency-skills/test/coin-expense-reconcile.test.mjs`; new `scripts/npm-runtime-resolution.test.mjs` |
| Evidence | This document, only to append measured implementation results after allocation |

Before dispatch the coordinator records current hashes and staged/unstaged
preimages of these exact files, obtains exclusive ownership of shared index/test
files relative to the v2 lane, and records allocation in its own task record.
No messages or shared-file edits were made by this decision task. Preserve any
new v2 exports and tests; rebase only accepted additive deltas onto the then-current
source. If shared ownership is unavailable, defer those mutations, not the completed
contract. API_VERSION, manifests other than the one fixture, both locks, lark-core,
Providers, MCP, other callers, existing handoffs and coordination documents are
excluded. Public Skill prose must remain service-neutral. Private root paths and
example policy belong to private invocation/tests, never the public Skill.

Fixture construction/output must use the authorized development config/fixtures/
runs locations subject to normal permissions; no fixture generation was necessary
in this report. No runtime registration or checked-in active profile is created.
Rollback of implementation restores only recorded per-file deltas/preimages,
retaining unrelated work and original index distinctions. Keep legacy behavior
available for explicit invocation; failure of portable selection never triggers
rollback execution automatically. No production state requires rollback here.

Owner-only open decisions remain registry/scope/publication, actual production
roots/toolchain support, secret-store policy for future service routes, and host
activation/isolation. None blocks a synthetic field above. Those decisions gate
distribution and business activation; do not invent values or turn this local
instruction read into a live-read authorization process.

## 10. Local report verification

This document is the only authored artifact. Source inspection included the actual
API discovery/loading/validation exports, private file helpers, coin resolver,
synthetic fixture manifest/instructions, Lark API selection and Instance Profile
schemas, and applicable development separation constraints. Local Node built-in
loader inspection was read-only; no legacy Skill script was executed. Focused
checks passed: all three JSON examples parse, all six relative Markdown link
targets exist, and no trailing whitespace was found. `git diff --check` was
clean for the report path; the explicit content check also covers this new file.
No code tests, installation, pack, external verification, credentials, MCP/CLI
service launches, fixture generation, staging or ref changes are claimed.

## 11. Measured implementation checkpoint — 2026-09-07 JST

This section supersedes the implementation-unperformed status in the historical
§§1/10 report. The coordinator accepted the contract and reserved the §9 envelope
before dispatch. The one offline implementation package is complete for coordinator
acceptance. Configured model/effort were retained; no override, successor task,
subagent, registration, staging, commit or ref operation was performed.

Implemented additive `loadRuntimeInstructionContext` / `resolveRuntimeInstructions`
exports, a confined private text reader, the explicit coin purchases portable
branch, inert fixture descriptor/export, source-neutral Skill guidance and direct
regressions. Legacy function bodies and API_VERSION remain intact; legacy CLI
selection retains its existing parser and behavior. Portable selection never
falls back to legacy discovery. The reader deliberately duplicates bounded
snapshot checks within the two packages, as §5 requires; no undeclared dependency
or manifest/lock change was introduced beyond the fixture manifest.

Measured final evidence:

- Node **v22.22.0**, existing explicit executable
  `/Users/naokikimura/.asdf/installs/nodejs/lts/bin/node`.
- Direct API/private-files/coin tests: **21 passed, 0 failed**.
- Root integration: **41 passed, 0 failed** (40 subtests plus parent), covering the
  §7 rejection families, channel/exit parity, independent digest tampering,
  shadowing, inert poisoned descriptor, confined file negatives, and observed
  mutation at every context/request/manifest/descriptor/resource final recheck.
- Logs: `/Users/naokikimura/workspace/.live-agency-development/runs/rls1-final-1788713899492747000/{direct,integration}.tap`.
- Detailed synthetic selection/denial receipt:
  `/Users/naokikimura/workspace/.live-agency-development/runs/rls1-1788713899634-92453/receipt.json`.
- Final hashes and preservation receipt:
  `/Users/naokikimura/workspace/.live-agency-development/runs/rls1-final-1788713899492747000/preservation.json`.

Flat A and nested B use identical provider manifest/descriptor/instruction bytes.
The six legacy result fields and ordered resource identities match; installation
and context identities differ intentionally. Both portable CLIs return literal
instruction text on stdout, one metadata JSON line on stderr, and exit 10.
Reserved outputs remain absent or retain their existing sentinel bytes. Negative
CLI cases return empty stdout, one fixed safe error JSON line and exit 2.

B contains ordinary copies of the coin script, is-main helper, API source closure
(including the existing backup contract export), and private-files package. Its
process uses Node's experimental filesystem read permissions, limited to B and
its selected config/input/output-root metadata. Actual probes deny the development
root manifest, development coin script, and A provider manifest with
ERR_ACCESS_DENIED. The B instruction CLI then succeeds under the same permission
flags. The output-root permission supports canonical-root validation; the route
never opens the reserved output. This is a measured Node-version-specific read
restriction, not Codex host isolation. Owner mismatch uses synthetic lstat
instrumentation, explicitly recorded; no real file ownership was changed.

The first integration run exposed two harness assembly omissions (legacy root
manifest and existing API backup source closure). Those were corrected within the
new integration test, with no legacy implementation change. Final logs above are
the settled verification. No unrelated v2/recovery suite was run.

Before-images: `/tmp/rls1-before-20260907-01a07748`. Its exact 11-path manifest was
fresh before the first edit. Root and Skills raw indexes and HEAD remain byte-for-
byte unchanged. Existing shared index and direct-test bytes remain prefixes of
our additive files. The contract before-append copy is retained there as
`contract-before-worker.md`. The preservation receipt lists concurrent v2 changes
outside this envelope separately; those files were not authored by this package.
Synced sources, operational roots, other manifests, locks and registrations were
not modified.

Selective rollback: use the recorded before-images only for these owned paths,
after checking current hashes against preservation.json; remove the three new
implementation/test files only if their hashes still match. Remove only this
appended checkpoint from the contract. If any file has newer work, subtract only
this package's recorded delta instead of replacing the file. Do not reset either
index or restore unrelated v2 files. There is no production state to roll back.

Next package: coordinator acceptance of this RLS-1 evidence and a separately
scoped offline artifact-completeness qualification. Registry/scope/publication,
real production roots, future secret stores and host activation remain owner gates.
This proof establishes neither tarball completeness nor npm installation,
publication, release reproducibility, live conformance or business authority.
Observed freshness checks do not promise atomic multi-file snapshots or protection
against hostile same-uid filesystem races; consuming instructions later requires
fresh binding and separate authority.
