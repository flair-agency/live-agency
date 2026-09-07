# Production dependency recovery: final preparation

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.
Status: prepared and rehearsed; **production delivery and consumer suspension are not authorized or performed**.

## Change card

- Primary F preparation, supporting G. Boundary: two existing production dependency trees.
- Preserve production source, locks, Git/index distinctions, configuration, private data, credentials, registrations, schedules and qualified generations. No downloads, installation hooks, native executable/MCP/service execution or business replay.
- One outcome: executable default-read-only preflight, bounded exchange/rollback, disposable failure recovery evidence and this exact owner action.
- Next gate: owner approval of the bound directory operation and metadata checks, plus an owner-established consumer exclusion window. No successor task, subagent or model override was used.
- This package changes only two development scripts, this report and its new ignored owner-only evidence. Production rollback is unnecessary for preparation.

## Fixed delivery

These absolute paths are bound by the CLI; there is no production-root override:

```text
DEV=/Users/naokikimura/workspace/live-agency-provider-runtime
P=/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/live-agency-provider-runtime
C=DEV/tmp/stab-native-cli-20260906/completed-generation/candidate/live-agency-provider-runtime
E=DEV/tmp/stab-production-recovery-20260906
A=/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/.stab-dependency-recovery-20260906-final
```

The only existing directory targets are `P/node_modules` and
`P/skills/live-agency-skills/node_modules`. Actor: local owner UID 501.
The sibling `A` is reserved but **has not been created**. It must be absent;
collision refuses the operation. It will be mode 0700, on the targets' current
filesystem (device 16777234), with these exact paths:

| Tree | Staged replacement | Retained original | Failed replacement |
| --- | --- | --- | --- |
| Root | `A/stage/0` | `A/rollback/0` | `A/failed/0` |
| Skills | `A/stage/1` | `A/rollback/1` | `A/failed/1` |

`A/journal.json` and collision-free journal temporary files are retained.
The sibling `.stab-dependency-recovery.lock` is also retained. These auxiliary
paths are part of approval; no broad deletion or cleanup is provided.

Accepted file inventory:
`cb7b58dcd58cf6136860dc6af8dc152773df8c9dac7df1f1088b3bb58b32aaa0`.
It binds 4,190 files/links, including 24 relative links. The native executable
remains checksum-qualified and unexecuted. Directory inventory SHA-256:
`4bc77a000a456266cf877df5096ed389dc39f08fdf495c4d9f2e9b55200567a2`.
Source-manifest SHA-256:
`8225c9fd7006977c85952d58bb6b724b29b59945e3cd97bc9225e86afccc97b8`.
Root/nested lock SHA-256 respectively:
`a1cf1fbbd25ec52c7fb038252825673608b67bc79b9bd5f5d3e8f3221a2a1250` and
`f17c4987e4764370ef2270f5963e52ad04c2d70339ef8e8e2b0fe56d54978abd`.

Read-only preflight matched all 445 source files and the original ten-repository
HEAD/index/staged/unstaged/selected-source snapshot from native qualification.
No newer composition was substituted. Existing root inventory: 4,165 regular
files, 13 links and 638 directories; Skills: one regular file, 11 links and
three directories. Inventories hash regular bytes and preserve literal links
without reading link targets. Unknown special files, hardlinked regular files,
owner changes, symlink path components and source drift are rejected. Private
configuration/data are outside the inspected scope and are not moved.

## Consumer window: required owner steps

`E/consumers.json` is a bounded cwd/command-name snapshot, not proof of an empty
host. It found 264 related processes: 44 at P, 182 at
`P/private/lark-openapi-mcp`, and 38 at the containing operational project.
The sandbox denied `ps` executable metadata; `lsof` supplied names/cwd only.
No environment, credentials or full command lines were requested. These are
potential consumers, not 264 proven importers of the replaced trees. The
private MCP directory itself is not a replacement target.

The coordinating task **開発と本番の構成を整理** is active in P. The six
scheduled task targets were idle at inspection, but all six schedule definitions
were ACTIVE. `E/schedules.json` retains their original definitions' identifiers,
timing and task bindings, without prompts:

| Automation ID | Name | Required window state |
| --- | --- | --- |
| `tiktok-2026-08` | TikTok入金消込 2026-08 | PAUSED |
| `live` | LIVEエージェンシー定期運用 | PAUSED |
| `automation` | プロバイダー知識定期点検 | PAUSED |
| `tiktok` | TikTokコイン経費照合 | PAUSED |
| `tiktok-2` | TikTok招待ステータス確認 | PAUSED |
| `tiktok-3` | TikTokインボイス処理 | PAUSED |

After explicit suspension approval, the owner must:

1. Pause these six automations through their owning scheduler, preserving all
   other fields; verify PAUSED and that no run remains active. Allow any existing
   business operation to finish or reconcile its pending intent; do not replay it.
2. Finish the production coordinator turn and close the operational Codex/ChatGPT
   client sessions and terminals that can invoke this runtime, including clients
   using globally registered Skills. Quit their hosting applications for the
   window if individual client shutdown does not prevent automatic MCP respawn.
   Inspect surviving processes associated with the exact recorded P/project cwd
   and their owners; terminate only confirmed related consumers under the same
   suspension approval. Do not blindly kill a saved PID list.
3. Keep those launchers closed, prohibit new manual tasks/source edits, and verify
   no surviving related consumers or scheduled runs before asserting
   `--exclusive-window`. Run the exchange from an ordinary owner terminal in DEV,
   outside the closed client host. Check clients that import P from another cwd
   as well: an empty cwd search alone is insufficient.
4. Keep exclusion through exchange, postchecks and any rollback. If the owner
   cannot account for a surviving launcher/consumer, do not apply. This is a
   concrete manual maintenance window, not a blanket OS-isolation requirement.

The Python `flock` only serializes cooperating recovery commands. It cannot
prevent other processes, scheduled runs or same-user file edits; the flag is an
owner attestation, not an automatic exclusion mechanism. No enforceable window
has been established by this task. Pausing automations alone is insufficient.

After successful checks, or verified restoration, the owner may release the
window under the separately approved resumption scope: reopen only previously
required consumers and restore these six schedules to their recorded ACTIVE
state. Recreated runtime objects avoid retaining the old rejected discovery
promise. No new schedule, business catch-up, native health test or integration
activation is part of the directory tool. If resumption authority is withheld,
leave consumers/schedules stopped and report that state.

## Executable operation for final approval

Tool: `../tools/stab-dependency-recovery.py`. Default mode only reads and emits
JSON; redirect its output to a new DEV evidence file. Preflight binds target
inodes/owners/modes, original inventories, source graph, candidate inventory and
both tool hashes. Review `E/preflight.json`; its `approval_sha256` is the exact
binding digest. A changed binding invalidates the old approval.

Prepared approval SHA-256:
`0e17f6b958d1460bde8daa8f55f2b2394691b9983ce47767650f036b4702f9b5`.
Exchange-tool SHA-256:
`38a5a9ee84fd6741507cc243bad6cde79ce7f00ac4b2742c41d5a5a38551df1b`.
Metadata-tool SHA-256:
`3ff9d41fcf78b903c7e6cc85d54d751d0847db94282c21e23dea69f3ba8a9bbf`.

Commands below are **for the later approved owner window only**. Set P/DEV/E
to the literal paths above; no production command below was run in preparation.

```sh
python3 "$DEV/scripts/stab-dependency-recovery.py" > "$E/window-preflight.json"
cmp "$E/preflight.json" "$E/window-preflight.json"
# Continue only if cmp succeeds and the owner approved that approval_sha256.
python3 "$DEV/scripts/stab-dependency-recovery.py" --mode apply \
  --binding "$E/preflight.json" --approve-sha256 0e17f6b958d1460bde8daa8f55f2b2394691b9983ce47767650f036b4702f9b5 \
  --exclusive-window
```

Apply rechecks the binding before staging and after both copies, then checks
source/target identities before each exchange. It preserves symlinks during
copy, compares complete staging inventories, flushes staged files/directories,
and never runs npm installation. Each rename has a flushed intent, parent
directory fsyncs and a flushed completion record. Two trees are not one atomic
transaction. Caught failures restore originals; hard interruption is reconciled
by original/new inode placement as well as the journal. Unknown identities
refuse restoration rather than overwrite an unrecognized tree.

After successful apply, run the prepared metadata tool with explicit P:

```sh
python3 "$DEV/scripts/stab-recovery-metadata.py" --approved-post-apply \
  "$P" "$E/production-postchecks"
```

Keep consumers excluded. Nonzero apply/postcheck exit requires the rollback
command below; do not resume merely because an exchange completed. The metadata
tool verifies installed inventory/directory modes/link containment, fixed source
graph, SDK 1.30.0 schema compatibility, ten-binding instruction discovery and
both complete `npm ls --all --json` closures. It reuses digest-pinned reviewed
harnesses with explicit root arguments, Node read permissions, disabled child
processes/workers/addons and the network/server guard. Node/npm entry bytes are
pinned. HOME/cache/npmrc/output are new owner-only DEV paths; no ambient env is
inherited. Existing project `.npmrc` causes refusal before npm can read it.
No CLI binary, MCP factory, profile selection or business handler is executed.
The guard is bounded verification, not general OS network isolation.

For any incomplete delivery, failed postcheck, or requested rollback:

```sh
python3 "$DEV/scripts/stab-dependency-recovery.py" --mode rollback \
  --binding "$E/preflight.json" --approve-sha256 0e17f6b958d1460bde8daa8f55f2b2394691b9983ce47767650f036b4702f9b5 \
  --exclusive-window
```

Rollback retains delivered replacements in `A/failed/{0,1}`, restores the exact
original inodes and inventories, checks source/locks, and records `restored`.
Already-restored originals are accepted without replaying moves. Leave all
evidence/originals in place. If identity, original bytes or source checks fail,
keep the window closed and reconcile the retained journal; no automatic Git
reset, configuration repair or deletion is available.

## Rehearsal and approval boundary

Owner-only ignored `E` contains independent synthetic source layouts; qualified
generations were only read. `rehearsal.json` proves successful exchange followed
by exact restoration, deliberate failure between the two exchanges followed by
exact restoration, and refusal on source drift and symlink target substitution.
`crash-rehearsal.json` additionally proves restoration after process exit 91
immediately after the first replacement rename and before journal completion.
All restoration cases retained failed new trees and matched original inodes and
full inventories. `metadata-checks-reviewed/results.json` records four passing
postcheck groups in a disposable layout. No artifact requalification, download,
native execution or broad regression suite was performed.

SEP-2 global Skills exclusion remains unresolved. The proposed incident exception
is limited to these directory writes, auxiliary staging/journal/rollback paths,
read-only source/package metadata checks and explicitly approved consumer-window
handling. It does not enable development integrations, authorize public Skill
changes, grant credentials, or reactivate general business workflows.

The remaining owner decision is approval of the exact `preflight.json` digest,
two target paths and retained auxiliary paths, the metadata checks, and the
specified suspension/resumption window. Preparation and rehearsals are complete;
neither inherited npm/native-download permission nor a passing rehearsal is
production authority.
