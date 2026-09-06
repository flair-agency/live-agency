# RLS-1 portable instruction resolution contract

Date: 2026-09-07 JST. Status: architecture decision complete for coordinator
acceptance; implementation and distribution remain unperformed. This is a private
development report. All identifiers and paths in examples are synthetic.

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

Read the complete authoritative [Private Source Integration Guide](governance/private-source-integration-guide.md)
and [task policy](task-orchestration-policy.md). The guide is not reproduced.
The [lifecycle design](npm-runtime-lifecycle-design.md) §§3, 5, 11–15 provides the
larger dependency order: accepted RLS-1 contract → one local implementation proof
→ separately gated artifacts/release/host work. This package does not declare
RLS-0's registry decisions complete or authorize RLS-2 publication.

The current [v2 handoff](v2-task-handoff.md) and
[coordination ledger](v2-development-coordination.md) were read once for ownership.
Coordinator `01a0772d-7eaa-7e23-86a8-73d646470bbf` retains selected caller
conformance, shared-client integration and those documents. LIVE-metrics
compaction was dispatched at observation; RLS-1 must not edit its files.

## 2. Decisions against actual contracts

| Existing contract | Decision and reason |
| --- | --- |
| API `discoverProviders({rootDir, dependencyNames})` reads literal root/node_modules manifests; `resolveProvider` can import modules | Preserve both unchanged. Add a separate instruction-only API; do not route portable input into generic legacy discovery or loading. |
| `validateProviderPackage` accepts manifest v1/v2, maps v1 binding to `default`, has major-only API compatibility | Keep legacy behavior. Portable descriptor has its own strict version and explicit API interval; do not reuse the permissive compatibility check. |
| Coin instruction result contains package/version/binding/knowledgeVersion/instructions; CLI stdout is instruction text, stderr metadata, exit 10 | Preserve these fields and channels. Add portable identity metadata only to the portable branch. Existing fixture's binding is `default`, knowledgeVersion is null. |
| `private-runtime-files` checks 0600, current uid, single regular file and final-component O_NOFOLLOW; outputs use temporary file/rename | Add a bounded snapshot read helper without changing existing helpers. This route does not write an output file. Ancestor confinement must be explicit. |
| `lark-api-selection/v1` / `lark-profiles/v2` require organization, API transport, resource, active Principal and independent expected scope | Reuse vocabulary and independent expected-binding pattern, not the Lark schema or credential resolver. No Lark API or browser identity is needed for local instruction inspection. |
| Development instructions require explicit synthetic selection and prohibit ambient credentials; no generic local environment-selection schema was found in inspected contracts | Introduce the narrow envelope below, explicitly versioned as local instruction inspection. It is not a replacement for business Instance Profiles, host isolation, or M2U selection. |

Necessary departure from the RLS-0 proposed envelope: use `descriptor.json`, not
`descriptor.js`. Configured JavaScript must never execute merely to inspect
instructions. No module import, require of JSON, evaluation, getter or callback
from package data is permitted. JSON.parse and strict structural validation only.

## 3. Wire types and independent trust selection

All JSON objects below are closed: reject unknown keys, duplicate JSON member
names, wrong types and null except where explicitly permitted. Reject BOM, invalid
UTF-8, non-finite numbers and duplicate list entries. Strings are nonempty, must
already be trimmed, and have maximum length 4096. IDs use `[A-Za-z0-9._-]+` up to
128 characters. Digests are lowercase 64-hex SHA-256 of exact bytes, not parsed or
reserialized JSON. Version numbers are exact three-part numeric versions without
ranges/prereleases; comparison is numeric by component. Byte limits: 1 MiB each
for context, descriptor, manifest and each instruction, 4 MiB total instructions;
request retains the existing 16 MiB private JSON limit. Read at most limit + 1,
not an unbounded read following a size-only check.

The CLI caller independently supplies the context path, its expected digest and
all three root paths. The expected digest must come from a reviewed local test
selection (later, a separately trusted launcher/control record), never from the
same context, descriptor, a discovered sibling file, or an environment variable.
The digest is an integrity binding, not a signature, publisher certification or
proof of host isolation. The programmatic API has the same required inputs.

Synthetic context (illustrative repeated digests are placeholders, not valid
fixture measurements; the implementation tests compute actual byte digests):

```json
{
  "contractVersion": "runtime-instruction-context/v1",
  "environment": "development",
  "releaseId": "synthetic-release-1",
  "configurationRevision": "synthetic-config-1",
  "installationId": "synthetic-installation-1",
  "owner": {
    "packageName": "@fixture/runtime-owner",
    "packageVersion": "1.0.0",
    "packageRoot": "node_modules/@fixture/runtime-owner",
    "manifestSha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "provider": {
    "packageName": "@fixture/coin-purchase-instruction-provider",
    "packageVersion": "1.0.0",
    "packageRoot": "node_modules/@fixture/coin-purchase-instruction-provider",
    "manifestSha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "descriptorExport": "./descriptor.json",
    "descriptorSha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    "bindingId": "default"
  },
  "profile": {
    "contractVersion": "local-instruction-profile/v1",
    "profileId": "synthetic-instruction-profile",
    "principalProfileId": "synthetic-local-reader",
    "activationStatus": "active",
    "authority": "read",
    "resourceId": "synthetic-coin-instructions",
    "allowedOperations": ["read-instructions"]
  },
  "request": {
    "path": "coin-request.json",
    "sha256": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
  }
}
```

Every field shown is required. `environment` supports only `development` in this
proof. Unknown environments, including production, stop; no default. Roots are
not read from this JSON. `packageRoot` is relative to independently supplied
installationRoot; `request.path` is relative to inputRoot. configurationRoot
contains the selected context file. These roots must be canonical absolute,
existing, distinct and non-overlapping. No default root, HOME expansion or cwd
interpretation. In this development package configurationRoot must be at/below
`/Users/naokikimura/workspace/.live-agency-development/config`; inputRoot and
installationRoot must be disjoint descendants of its sibling `fixtures`.
These restrictions belong to the private test/caller invocation policy, not
hardcoded usernames or service paths in the public libraries. The public API
requires explicit roots and never manufactures permission from them.

`owner.packageName` and `provider.packageName` use npm plain/scoped lowercase
names (no URL, alias, subpath, backslash, percent encoding or dot segments).
The owner manifest must match selected name/version and declare the provider
as a direct `dependencies` entry at exactly the selected version. No peer/dev/
optional/transitive-only selection. Additional dependencies are not discovered.
Both manifests are bound by independently selected hashes. The selected context
binds all profile fields, package identities and descriptor hash transitively.
No separate approval ledger or fake live actor evidence is added.

The profile's only authority is local instruction reading. Its activationStatus
must be `active`, authority `read`, and allowlist exactly `["read-instructions"]`.
This is a new narrow local type using existing field names; it must never be
passed to Lark validators or accepted by a business caller. No credential,
organization, tenant, token or browser-session fields are allowed. Future service
execution still requires the existing service-specific selected profile contract.

Synthetic request:

```json
{
  "inputKind": "application/x.synthetic-coin-acquisition+json",
  "selection": {
    "profileId": "synthetic-instruction-profile",
    "principalProfileId": "synthetic-local-reader",
    "resourceId": "synthetic-coin-instructions",
    "operationId": "read-instructions"
  }
}
```

These are the complete portable request fields. Match all four selection fields
against the bound profile; capability comes from the purchases mode, not request
configuration. Request digest must match context.request.sha256. This local
request envelope is intentionally narrower than legacy requests. Same-input
legacy comparison may pass this request unchanged: the existing fixture only
uses inputKind. Other acquisition parameters/requests are out of scope.

## 4. Inert descriptor and resource identity

Synthetic descriptor at package root:

```json
{
  "contractVersion": "provider-instruction-descriptor/v1",
  "packageName": "@fixture/coin-purchase-instruction-provider",
  "packageVersion": "1.0.0",
  "api": {"minimum": "1.6.0", "maximumExclusive": "2.0.0"},
  "bindings": [{
    "id": "default",
    "provides": ["coin-purchase-evidence-source/v1"],
    "inputKinds": ["application/x.synthetic-coin-acquisition+json"],
    "knowledgeVersion": null,
    "unattended": false,
    "executionKind": "instructions",
    "resourceId": "synthetic-coin-instructions",
    "resources": [{
      "id": "main",
      "path": "./instructions/provider.md",
      "mediaType": "text/markdown",
      "sha256": "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    }]
  }]
}
```

All fields required; bindings/resources are nonempty, IDs unique, arrays ordered.
knowledgeVersion is null or a trimmed version identifier. Capabilities retain
API's versioned capability grammar. inputKinds are nonempty unique strings.
The current API_VERSION must lie within the declared numeric half-open interval;
minimum must precede maximumExclusive. The context/manifest/descriptor package
name and version must agree exactly. For the selected binding require purchases
capability, request inputKind, resourceId equality and executionKind instructions.
Reject all module declarations, including nonselected bindings, in this descriptor
version. The descriptor can describe multiple instruction bindings, but selected
bindingId must match exactly once. Never choose first, scan other packages or
resolve ambiguity through runtime canHandle. `unattended` is boolean; this route
rejects unattended even if a descriptor claims true because human instructions
are its terminal output.

Provider manifest adds exactly the export `"./descriptor.json": "./descriptor.json"`
and the descriptor to its files allowlist. Keep existing liveAgencyProvider
metadata, version and instructions unchanged. No package.json subpath export is
needed. Descriptor must be a root-level ordinary JSON file; no conditional,
wildcard, array, null or executable export target for this subpath. Other exports
are not evaluated. Resource paths start `./`, have only nonempty slash-separated
segments, and forbid `.`, `..`, backslashes, NUL, percent encoding, query/fragment,
URLs, absolute paths and node_modules segments. Resource paths resolve relative
to the validated provider package root; individual resource exports are unnecessary.
The bound descriptor is the public resource-index API, while content stays in
the private package. `files` is packaging intent, not installation evidence.

Resource identity is the tuple `(packageName, packageVersion, descriptorSha256,
bindingId, knowledgeVersion, resourceId, resource.id, resource.path,
resource.sha256)`. This remains stable across layouts; absolute paths are never
part of resource identity. Hashes in a descriptor become trusted only after its
bytes match the independently selected descriptor digest. A tampered descriptor
plus updated self-declared resource hashes must fail the context binding.

## 5. Public signatures and CLI behavior

New root exports from source-provider-api, implemented in `src/runtime-context.js`:

```ts
loadRuntimeInstructionContext(options: {
  contextPath: string;
  expectedContextSha256: string;
  installationRoot: string;
  configurationRoot: string;
  inputRoot: string;
}): Promise<RuntimeInstructionContext>;

resolveRuntimeInstructions(options: {
  context: RuntimeInstructionContext;
  capability: string;
  unattended: boolean;
}): Promise<InstructionResolution>;
```

`RuntimeInstructionContext` is a frozen, module-branded opaque handle with private
snapshot state (WeakMap), exposing only readonly `requestPath` and
`requestSha256` for the coin caller's bounded private-read check; JSON or spread
copies are rejected. No injectable
loader, token provider, environment or IO callback in the public options. Tests
can instrument the filesystem at the harness boundary. Each handle is single-use:
consume at the beginning of resolve, including on failure; reload from independently
selected inputs for a new run. Reject extra option keys. Context loading reads
and validates only bounded config/request/package metadata; resolve reads selected
instruction bytes after authority checks. No cache shared between handles.

New private-runtime-files export:

```ts
readPrivateTextWithinRoot(filePath: string, options: {
  rootDir: string;
  expectedSha256: string;
  maxBytes: number;
}): Promise<Readonly<{text: string; sha256: string}>>;
```

All options required; applies §6 file/root checks and returns exact verified text.
No modification to existing read/write signatures or defaults. API owns JSON,
selection, public package-resource permissions and digest validation. The API
package currently declares no dependency on private-runtime-files: implement its
internal snapshot checks with Node built-ins in runtime-context.js, following
the same rules, and test both readers against the same boundary cases. The coin
caller uses the new private helper to verify its explicit request path using the validated handle's requestPath/requestSha256 after context loading and
before passing the opaque context to resolution. Discard that redundant read
after validation; resolution still owns the bound request snapshot. This small deliberate overlap avoids
a new undeclared cross-package dependency; consolidation needs a later dependency
allocation, not an implicit import. Keep package
files distinct from 0600 private inputs.

Portable invocation (placeholder digest must be replaced by a measured one):

```text
<explicit-node> <explicit-installed-coin-resolver> --mode purchases \
  --runtime-context <config-root>/context.json --context-sha256 <64-hex> \
  --installation-root <fixture-install-root> --configuration-root <config-root> \
  --input-root <fixture-input-root> --request <fixture-input-root>/coin-request.json \
  --output-root <runs-root> --output <runs-root>/unused.json
```

Retain required `--request` and `--output` for caller compatibility. Portable
request must be absolute and equal the context-selected path. Portable `--output-root` is also required, canonical and absolute, distinct
from the other roots, and selected beneath the development runs location by the
private invocation policy. The public CLI checks segment containment without
hardcoding that private location. Output must be an
absolute path lexically beneath this explicit output root; it is reserved and never opened, created, truncated or written on this
route. It cannot equal any selected input. No new `--env` ambiguity: environment
is required inside the bound context. Duplicate switches, missing switch values,
unknown switches and incomplete portable selectors reject before filesystem IO.
`--provider-root` plus any portable selector rejects before IO, even if values
refer to the same tree. Portable mode expenses/registration rejects before reads.
Explicit legacy mode still requires provider-root/request/output and retains
existing behavior. Never infer a portable context from environment variables.

InstructionResolution retains existing six fields: status, providerPackage,
providerVersion, providerBinding, knowledgeVersion, instructions. Add `runtime`
containing contractVersion (`runtime-instruction-result/v1`), environment,
releaseId, configurationRevision, installationId, contextSha256, requestSha256,
profileId, principalProfileId, resourceId, operationId, descriptorSha256 and
`resources` (ordered resource identity objects using fields in §4). No absolute
paths, credentials or acquisition parameters in metadata. Join decoded resource
texts with exactly two newlines, matching legacy behavior. CLI stdout remains
`console.log(result.instructions)`; stderr is one JSON metadata line, including
runtime but excluding instructions. Exit 10 is a successful instruction handoff,
not normalized evidence. Exit 0 remains legacy normalized success only.
All portable failures return exit 2, empty stdout and one stderr JSON object
`{status:"stopped",code,message}`. Error messages use fixed safe descriptions;
never expose raw Node error paths, content or arbitrary input. No partial text
is emitted before all checks succeed. Error objects use ProviderResolutionError.

## 6. Anchored, confined resolution and freshness algorithm

1. Validate arguments and independently supplied expected digest before IO.
   Validate canonical root paths, ownership and permissions below. Check context
   lexical containment, then open/read it through the bounded private helper;
   compare exact bytes to expectedContextSha256 before trusting any field.
2. Validate context schema and local profile. Open the exactly selected request
   beneath inputRoot, check digest, schema and actor/target/operation equality.
   Reject unattended or wrong capability before package resource reads.
3. Resolve owner.packageRoot beneath installationRoot. Validate/hash the ordinary
   owner package.json, name/version and exact direct dependency declaration.
   Walk Node-style node_modules candidate directories starting at the owning
   package directory and moving upward, stopping at installationRoot inclusive;
   skip duplicate node_modules/node_modules levels. Do not search above this root,
   cwd, global paths, NODE_PATH or HOME. Check each candidate's path components
   before touching its manifest. Select the first existing package directory;
   malformed, inaccessible, missing-manifest or wrong-version first candidates
   stop rather than falling through. Require it equals context.provider.packageRoot.
   Thus a newly shadowing nested dependency rejects changed selection.
4. Validate/hash provider package.json as a direct bounded filesystem metadata
   read, not `require.resolve(packageName + '/package.json')`. This does not need
   a public package.json export. Require name/version and the exact inert descriptor
   export in §4 before asking Node to resolve anything.
5. Create a require resolver anchored at the validated provider's package.json
   absolute filename, and call only `.resolve(packageName + '/descriptor.json')`.
   This is Node package self-reference resolution within the already selected
   package, not executing require. Preconditions guarantee package name and exports
   match; never attempt Node discovery if they do not. Require the result equals
   the validated package-root descriptor path in both lexical and realpath form.
   A resolver error stops; do not retry with paths, import(), absolute JS loading
   or legacy discovery. Recheck manifest bytes/path after resolution. The bounded
   owner walk supplies dependency precedence; Node supplies export semantics.
6. Read/hash descriptor as bounded inert data, then validate API, package and
   selected binding contracts. Read all selected resources into memory using the
   checked paths, sizes and digests; no other bindings' resources are opened.
7. Before returning any text, re-read and compare context, request, both manifests,
   descriptor and selected resource digests; repeat ancestor/path and metadata
   checks and bounded dependency selection. Any difference stops with
   RUNTIME_SELECTION_CHANGED. Return only the first verified immutable snapshot
   after successful final comparison. Never refresh silently to new contents.

Local Node 22.22.0 built-in CJS loader source was inspected without network:
`trySelf` obtains the nearest package metadata and calls packageExportsResolve;
self resolution precedes Module._findPath. This supports step 5 without evaluating
a descriptor. The contract restricts export shape to avoid conditions and requires
an exact returned path. Native resolver metadata caches are not a freshness oracle;
explicit raw manifest rechecks are mandatory. Reused process cache behavior that
cannot satisfy the checked result must stop; a fresh CLI process is the supported
representative invocation. This is not certification of other Node versions.

Filesystem rules apply before every open and on final recheck:

- Use path.relative segment containment, never string-prefix containment. Reject
  relative CLI roots, noncanonical spelling and any symbolic link at or below the
  selected roots, including in-root links. This deliberately excludes workspace,
  npm-link and symlink-based package layouts from the representative proof.
- Resolve OS ancestors to canonical absolute roots first; selected root spelling
  must equal realpath (e.g. use `/private/tmp`, not `/tmp` on a symlinked host).
  Ancestors above roots must not be writable by unrelated users unless a
  system-owned sticky directory; selected roots and directories below them must
  belong to current uid. Config/input directories require 0700. Installation
  directories must have no group/other write bits. Reject unsupported uid or
  O_NOFOLLOW platforms in this macOS/Node proof.
- lstat every component below roots, then realpath containment; open final files
  with O_RDONLY|O_NOFOLLOW. fstat requires regular file, nlink 1, current uid.
  Config/request files require exactly 0600; package JSON/instructions permit
  owner-readable modes without group/other write or execute bits (0600/0644 are
  typical). Verify size and bounded actual byte count, and compare pre/post file
  device/inode/size/mtime/ctime plus path lstat/realpath. Reject changed paths.
- Standard Node path-based APIs cannot provide an openat-style atomic directory
  traversal or atomic snapshot of multiple files. These checks detect observed
  drift, not hostile same-uid race freedom. Owner-controlled immutable fixture
  trees and no concurrent mutation are required preconditions; OS sandboxing is
  needed to enforce no outside reads against an adversarial filesystem. Do not
  advertise same-user host isolation or atomic activation. A caller consuming
  printed instructions later must bind/check again; exit 10 grants no execution.

## 7. Rejection and compatibility matrix

Portable errors below are stable ProviderResolutionError codes. Validate in §6
order; tests arrange one defect at a time. Any unclassified filesystem failure
maps to RUNTIME_IO_ERROR with a fixed message, not raw errno details.

| Case | Result / required assertion |
| --- | --- |
| Missing/duplicate/unknown CLI args; mixed selection; relative roots | INVALID_INPUT, exit 2, no reads for syntax failures |
| Missing/unknown schema, unknown key, duplicate JSON member | RUNTIME_SCHEMA_INVALID |
| Missing/unknown environment | RUNTIME_ENVIRONMENT_UNSUPPORTED |
| Missing digest or incorrect context/request/manifest/descriptor/resource digest | RUNTIME_BINDING_MISMATCH; changed bytes on final check use RUNTIME_SELECTION_CHANGED |
| Missing/malformed/inactive local profile | RUNTIME_PROFILE_INVALID |
| Wrong actor, profile, target, operation or widened allowlist | RUNTIME_SCOPE_MISMATCH |
| Portable expenses/registration, module descriptor or service-execution request | RUNTIME_ROUTE_UNSUPPORTED; no module side effects |
| `--unattended`, including descriptor true | INTERACTIVE_PROVIDER; no instruction bytes emitted |
| Missing dependency, undeclared dependency or wrong exact version | RUNTIME_PACKAGE_MISMATCH; no alternate package |
| Shadowing package, wrong selected root, outside-root/global/ancestor-only provider | RUNTIME_PACKAGE_MISMATCH or RUNTIME_PATH_DENIED before outside manifest read |
| Missing/unexported/conditional/executable descriptor | RUNTIME_DESCRIPTOR_INVALID; no require/import/evaluation |
| Descriptor API interval excludes actual API | INCOMPATIBLE_API |
| Missing selected binding, capability or inputKind mismatch | PROVIDER_NOT_FOUND |
| Duplicate binding IDs or duplicate resource IDs | PROVIDER_AMBIGUOUS or RUNTIME_DESCRIPTOR_INVALID respectively |
| Missing resource | RUNTIME_RESOURCE_MISSING |
| Traversal, sibling-prefix escape, symlink (inside or outside), node_modules resource path | RUNTIME_PATH_DENIED |
| Wrong file owner, mode, nlink, kind or byte limit | RUNTIME_FILE_INVALID |
| Changed release/config/profile/package selection or file between reads | RUNTIME_SELECTION_CHANGED; no stdout or automatic retry |
| Forged/reused handle | RUNTIME_CONTEXT_INVALID |
| Valid portable fixture, interactive | instructions-required; text stdout, metadata stderr, exit 10; output path untouched |
| Legacy fixture with same request | Existing six result fields and text/exit match; runtime metadata is portable-only |
| Legacy module/expense paths | Existing behavior and tests unchanged; no portable fallback even after error |

Malformed required members generally map to RUNTIME_SCHEMA_INVALID; the specialized
codes apply once their enclosing schema can be interpreted. Missing environment
and missing profile are the explicit exceptions listed above. Conflicting multiple
faults need only follow validation order, not guarantee all error codes at once.

Legacy `--provider-root` remains explicit with no automatic expiry date. Its
removal gate is migration of all seven discovery callers plus MCP and separate
coordinator acceptance with rollback evidence. RLS-1 does not harden legacy
ancestor checks by accident or claim legacy has the new portable guarantees.

## 8. Representative tests and evidence limits

Use two freshly assembled ordinary-file synthetic installations beneath permitted
fixtures. Flat layout A has owner and provider side by side in installation
node_modules. Nested layout B has the provider beneath
`node_modules/@fixture/runtime-owner/node_modules/@fixture/coin-purchase-instruction-provider`.
Bind distinct installation IDs, context digests and selected relative package
roots; keep exact provider manifest/descriptor/resource bytes identical. Compare
resource identity and the six legacy result fields, not the intentionally different
installation/context metadata. Config/request roots stay outside installations.

The second test process must deny reads from the development checkout and layout
A, including dependency/script reads. Assemble the explicit coin script, its
`_shared/is-main.mjs`, API and private-files source closure as ordinary synthetic
package files in B before that process starts. Resolve its dependencies solely
there. Use the qualified Node read-permission mechanism or equivalent verified
OS restriction, allowing only B, its selected config/input and necessary runtime
files; record actual denial probes for A/development. If the available mechanism
cannot enforce those denials, mark portability acceptance incomplete; an IO spy
alone is unit evidence. No npm/pack/install, network or external account is needed.

Direct tests cover every matrix row, raw stdout/stderr/exit status, no output file
creation or overwrite, literal instruction bytes, poisoned executable descriptors
with side-effect sentinels, tampered descriptor plus recomputed internal hashes,
changed context at same path, resolution shadowing, manifests without package.json
exports, missing exports, and mutation at each recheck boundary. Instrument outside
candidate reads to prove ancestor/global/NODE_PATH/cwd decoys are not consulted.
Include 0700/0600 negatives, hardlinks, directories, oversized files, invalid UTF-8,
and same-size resource replacement. Legacy comparison uses the unchanged fixture
instructions, `default` binding and null knowledgeVersion.

Run direct API/private-files/coin tests and the new root integration test once
changes settle. Broaden only for actual import effects or failures. Do not rerun
unrelated v2 conformance/recovery suites. Ordinary assembly proves this contract,
not exported tarball completeness, npm installation, release reproducibility,
all-Skill behavior, live profile conformance or host activation.

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
