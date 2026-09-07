# SEP-1 execution brief: independent development source

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Status: prepared by SEP-0 worker; coordinator owns acceptance and dispatch. Do not execute from this report alone. Next dispatch default: `gpt-6-astra` / `low`, consistent with the inspected orchestration policy.

## One outcome and scope

Create an independent development checkout at `~/workspace/live-agency-provider-runtime` with the selected Runtime v2 source preserved, initialized independent nested repositories, fresh dependencies, explicit development instructions and synthetic state. Keep the operational Work project in place. This is class D with supporting E boundaries; no production authority or host routing changes belong here.

Read the original separation plan sections 3–6 and 12, orchestration policy, and the SEP-0 checkpoint report. The private checkpoint is `.sep0-checkpoint/` in the SEP-0 worker worktree; coordinator has its absolute path. Use `capture.json`, repository manifests, source hashes, patches, bundles, and `launch-profile-references.json`. The original Runtime HEAD is `6b1f11c17cec53f2adcce5fd88b87666c322f859`; the manifest owns all full nested revisions. Do not select `origin/main` as a substitute baseline.

Editable destinations are only the new candidate and `~/workspace/.live-agency-development/` synthetic state. Obtain a task/sandbox that permits these destinations before writing. Both destinations must be checked for collision immediately before creation. Never overwrite an existing destination. Do not activate a Codex project, install global Skills, start MCPs, provision real credentials, or create schedules; those depend on SEP-2 authority isolation.

## Accepted source and exclusions

Use repository IDs **04–13** from the checkpoint: Runtime and its nine nested repositories. Preserve selected tracked and untracked docs, source, tests, packages, knowledge, and dirty patches. Preserve all local refs/commits from bundles, not only HEAD. Maintain original staged/unstaged status when reconstructing source; any deliberate later development edits receive a separate change record.

Sibling repositories IDs 00–03 and 14–16 remain independently preserved and must not be substituted for nested dependencies. Their dirty feature work is deferred; importing it would change the selected composition.

Exclude the six `private/lark-openapi-mcp/` selected recovery helpers from development deployment. They were saved to recover current production launches, not to supply development credential access. Exclude production private configurations/state, runtime/run data, exports, browser sessions, Keychain/CLI/Codex credentials, caches, dependency directories, scratch scripts, and parent nonrepository/synced sources. Checked-in capability/profile examples may be preserved for source parity but must not become active development target defaults.

## Procedure

1. Verify the checkpoint `SHA256SUMS.json` before use and inspect `capture.json` and per-repository manifests. Recheck original selected file hashes, refs/index/status against the checkpoint. If changed, capture only affected repositories in a new owner-only generation and repeat recovery checks; preserve the accepted generation. Do not overwrite concurrent work or claim old parity as current.
2. Create the new root from repository 04's self-contained bundle with hooks disabled and without dependencies. Check out its captured HEAD on a new `codex/` development branch selected at execution time. Retain original refs explicitly: a normal clone turns branch refs into remote-tracking refs and does not by itself reproduce every original ref name. Use the saved ref manifest to preserve the original commit reachability in candidate refs without replacing the development branch.
3. Independently clone each nested bundle into its recorded relative path at its captured HEAD. Initialize/register nested repositories using candidate-local Git configuration only; avoid fetching different remote HEADs or using production Git/common/object directories, alternates, worktrees, shared clones, source symlinks or production dependencies. Existing gitlinks exactly match the captured nested HEADs. Confirm candidate submodule status/top-level/common directories and all nine gitlinks after initialization. Only candidate Git storage may be reorganized to normal submodule layout.
4. Per repository, apply `staged.patch` with `git apply --index`, then `unstaged.patch` with `git apply`; skip empty patches. Copy only that manifest's selected untracked payload, omitting the six operational recovery-only private helpers. Preserve symlinks as symlinks and restore recorded file modes; checkpoint files themselves are deliberately 0600. Never recursively copy checkpoint configuration/state evidence into the candidate.
5. Verify all selected development file hashes and executable modes, missing/deleted paths, `git ls-files --stage -z` digest, and both binary diffs. Compare nested HEADs with the root gitlinks. Record the six deliberate recovery-only source exclusions separately from parity failures. Confirm candidate root and nested Git/common directories share no production storage and no file links or dependency directories resolve into production.
6. Add scoped development instructions with provenance to the parent rules: synced `sources/` read-only, public/private source separation, fail-closed explicit profiles/actors, no ambient production credentials or fallback, no external actions or schedules by default. Read the referenced private-source design guide before any later Skill design work to which it applies. Do not copy the full operational business context.
7. Create synthetic state under `~/workspace/.live-agency-development/{config,runs,fixtures}` with restrictive permissions. Keep integrations disabled. Reserve `codex-home` as a proposed SEP-2 host configuration location; do not claim that this path isolates the desktop or enables a new host. Dedicated test identity/resource decisions are unnecessary for fixture-only verification and remain gates before integrations.
8. Inspect lockfiles and install scripts. Root `postinstall` invokes a nested install, and `install:skills` uses `--replace`. Install fresh locked dependencies with lifecycle hooks disabled, explicitly including required nested workspaces; never invoke the global Skill installer. If registry/cache access is unavailable, report that precise dependency blocker without weakening source parity or falling back to production `node_modules`.
9. Run focused synthetic checks for the selected preserved work from the candidate. Inherit documented passing results for unchanged source, but demonstrate candidate resolution with the bounded insight suite (`scripts/insight-selected-client.test.mjs` plus its documented selectors in `docs/v2-insight-caller-conformance.md`) and a composition/path check. Inspect selectors before execution for operational hooks/ambient targets. Do not run live smoke tests. Expand only for a new failure or changed dependency; do not repeat all historical suites automatically.
10. Return a coherent SEP-1 checkpoint: candidate absolute path/branch/HEADs, exact parity and deliberate exclusions, independent Git/submodule/dependency resolution, dependency installation result, synthetic test result, instructions/state paths, unchanged production reference hashes, and remaining SEP-2 host isolation gate.

## Completion and recovery

Exit only when independent source recovery and bounded synthetic execution are demonstrated, or report a concrete blocked prerequisite with all completed evidence. No operational workflow is declared repaired by this package. Current workflow triage remains STAB-0; actual host isolation remains SEP-2.

Recovery is limited to removing or archiving the newly created candidate/state after confirming ownership and preserving its new work. Keep original source, global registrations, schedules and SEP-0 checkpoint. Never reset/clean/stash the operational source. Retain the SEP-0 worktree until its private checkpoint has been relocated and hash-verified in another approved persistent owner-only location.

The one next package after successful coordinator acceptance of SEP-1 is **SEP-2: verify development project routing and authority isolation**. A different directory or MCP name does not supply the required boundary.

## Historical SEP-1 agent instructions (retired 2026-09-07)

The following is provenance, not current agent authority. See [current status](../migration/status.md) for applicability and release conditions.

```markdown
# Independent development instructions

## Documentation language

Follow the [Documentation Language Policy](docs/governance/document-language-policy.md): prepare owner-review documents in Japanese and publish approved canonical documents in English. Preserve the approved meaning when translating.

## Existing development instructions

SEP-1 addition, 2026-09-06. Source provenance: `/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/AGENTS.md` (SHA-256 5fa275027d2927813c33ca650ab515d9b6d3d3d441c4809da9934d77926c1107), the environment-separation SEP-1 brief, and `docs/task-orchestration-policy.md`.

This checkout is the development source candidate. Integrations and schedules are disabled. Source separation does not isolate the Codex host; SEP-2 must verify project routing and actual authority before integrations are enabled.

- Treat all synced `sources/` material as read-only references; never edit, move, rename or delete it. Reference snapshots are not authoritative originals.
- Keep public Skills, private service-specific Providers/profiles, and real data/credentials in separate layers. Do not put service-specific URLs, schemas, acquisition rules, real data or credentials into public Skills or repositories.
- Before creating, changing or reviewing a Skill for an authenticated or publication-uncertain source, read the complete authoritative guide titled Private Source Integration Guide at `/Users/naokikimura/workspace/live-agency/docs/governance/private-source-integration-guide.md`. If unavailable or applicability is ambiguous, report the gap; do not invent its content. Do not duplicate or independently rewrite the guide.
- Require explicit development profiles, actors, target resources and operation allowlists. Fail closed on missing, ambiguous, inactive or changed selection. Never fall back to ambient production credentials, Keychain, CLI/Codex auth, browser sessions or profiles.
- Use `/Users/naokikimura/workspace/.live-agency-development/config`, `/Users/naokikimura/workspace/.live-agency-development/runs` and `/Users/naokikimura/workspace/.live-agency-development/fixtures` for synthetic configuration, output and fixtures. Checked-in capability/profile examples are reference source, not active development defaults.
- External reads, writes, MCP starts, live checks, account provisioning and schedules are disabled by default and require separate scoped authority after host isolation. Never run `install:skills` or change global registrations from this candidate.
- Install dependencies from lockfiles with lifecycle hooks disabled. Do not link code or dependencies into the operational checkout. Follow the task orchestration policy and retain original staged/unstaged distinctions when reviewing restored work.

The proposed `/Users/naokikimura/workspace/.live-agency-development/codex-home` path is reserved for SEP-2 evaluation only; it is not created or asserted to isolate this desktop. Operational business context was deliberately not copied into these instructions.
```
