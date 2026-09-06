# Exact empty tools-directory cleanup checkpoint

2026-09-07 JST. **RETAINED: no removal attempted.** This package is complete as
an evidence-backed retention decision; retirement has not passed its consumer gate.
Coordinator acceptance remains outstanding.

## Change card

- Primary C, supporting G. Protected boundary: retirement of one Work-parent path.
- Exact target: `/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/tools`.
- Invariants: only that empty directory could be removed, only by `rmdir`, after
  fresh checks and scoped review. Unknown critical consumers require retention.
- Outcome: fresh identity, emptiness, attributes, bounded references and process
  observations; explicit applied/retained decision and rollback metadata here.
- Next gate: resolve the consumer uncertainty below before requesting removal review.
- Verification/no mutation: metadata and bounded read-only inspection; only this
  report was created. No application test applies. No Git index/ref change.
- Parallel work: none; active v2 work is excluded. No new task, subagent, message,
  or model override. Policy default for future dispatch is Astra/low; no current
  setting change is asserted.

## Current prerequisites and evidence

Read development and generated Work AGENTS, the task orchestration policy, the
unused-directory audit and the current guide-migration checkpoint. This is no
Skill semantic review. Guides were not changed. Guide deployment is COMPLETE,
as recorded in the current checkpoint and inherited coordinator verification of
`tmp/guide-migration-20260907/operational-deployment-approved.json`. Historical
pending-deployment text in the audit is superseded; it is not this retention reason.
No archive restore or guide hash verification was unnecessarily repeated.

Both parent and target resolve to their stated absolute paths and are ordinary
directories, not symlinks. Target inode 75084437, mode 0755, uid 501, gid 20 and
mtime match the preceding audit. Fresh final observation follows:

```json
{
  "observed_utc": "2026-09-06T16:08:09.167142+00:00",
  "parent": {
    "device": 16777234,
    "inode": 79608723,
    "mode": "0o755",
    "uid": 501,
    "gid": 20,
    "atime_ns": 1788705314119293713,
    "mtime_ns": 1788705314040169469,
    "ctime_ns": 1788705314040169469,
    "birthtime_seconds": 1788705314.035312,
    "flags": 0,
    "symlink": false,
    "realpath": "/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2"
  },
  "target": {
    "device": 16777234,
    "inode": 75084437,
    "mode": "0o755",
    "uid": 501,
    "gid": 20,
    "atime_ns": 1787941573607291258,
    "mtime_ns": 1787910677871749242,
    "ctime_ns": 1788705314040109802,
    "birthtime_seconds": 1787910270.9275424,
    "flags": 0,
    "symlink": false,
    "realpath": "/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/tools"
  },
  "target_entries": []
}
```

`ls -ldeO@` succeeded for parent and target: no extended ACL entries were
reported, flags were zero, and each had an 11-byte `com.apple.provenance` xattr.
Target `xattr -px com.apple.provenance` succeeded and returned these exact bytes:
`01 02 00 92 6C 38 DD FE E2 20 EB`. No target payload exists to hash or archive.
The initial Python metadata attempt lacked `os.listxattr`; native read-only
attribute tools supplied the missing evidence. No writes were used as probes.

Repeated only the prior bounded reference scope for this target: nonignored
source/metadata in development, operational runtime and the seven sibling
repositories; `.md`, `.mjs`, `.js`, `.json`, `.py`, `.toml`, `.yaml` up to 1 MB,
excluding `.git`, dependencies, `sources`, `private`, and `tmp`. Exact absolute
W/tools and `../tools` matches occurred only in the prior development audit at
lines 61 and 117. All nine file-discovery calls succeeded. No executable caller
was established. No histories or private source bodies were opened.

Path-only checks of Codex config and the six currently present automation TOMLs
found no absolute-target or `../tools` match; no values or prompts were emitted.
Top-level symlink resolution under Codex and agents Skill directories found no
link into the target. This does not validate automation semantics or activation,
regular installed copies, global registrations, or dynamically assembled paths.

Two exact-target `lsof -nP` queries, one restricted to cwd/root descriptors and
one for all descriptors, returned status 1 with no output or diagnostic. Only
PID, descriptor and path fields were requested; no unrelated process arguments
or credentials were exposed. A positive control selecting the inspecting Python
process's cwd returned status 0 and the development checkout. Thus inspection
works for that process, but no all-user/whole-host visibility guarantee follows.
No visible open-directory reference was found. Dormant consumers and references
created after observation are outside these results.

## Decision and permission result

Retain the directory. The package explicitly requires resolution of unknown
critical process/relative consumers before retirement. The visible process
negative and limited static negative cannot resolve dormant execution routes,
relative `tools` paths rooted at Work, or dynamically assembled references in
unvalidated configurations. These remain the preceding audit's consumer gap;
no known active consumer is claimed. Broader private or whole-host investigation
was outside this package and was not performed merely to justify deletion.

No outside-checkout mutation or escalation was requested; consequently no new
automatic approval rejection occurred and no approval was consumed. Standing
cleanup authorization was recognized, but its evidence gate did not pass. There
was no attempt to bypass review or reroute a denied operation. Final exact-path
readback confirmed that the same directory remains empty and present.

## Rollback and preservation

No target rollback is necessary. For a future approved removal, capture fresh
metadata again before action. Proposed rollback must exclusively recreate this
same empty path, refusing any existing entry (including a symlink); restore
uid/gid, mode and supported timestamps/ACL/xattrs from the bound evidence.
The captured provenance bytes must not be silently dropped if restoration is
unsupported. Restoration of that system attribute was not tested or certified.
Inode and ctime cannot be recreated; birthtime restoration is platform dependent.
A known consumer depending on irrecoverable identity means retain. Parent
mtime/ctime would change on removal/recreation; exact parent metadata rollback
must not overwrite concurrent changes. No restoration command was executed.

All ten other audit targets, operational runtime/dependencies, sources, generated
instructions, guide redirect, recovery assets, preservation generations and seven
excluded legacy originals remain untouched by this package. No deletion, process
stop, schedule, registration, installation, credential access, network or
integration was performed. This report is the only created artifact; no complete
archive tests or sibling content inventories were repeated.

## One next substantive decision

Coordinator should decide whether to authorize a narrowly scoped reconciliation
of Work-relative/dormant consumers and provenance restoration support, sufficient
to bind this exact retirement, or accept continued retention of the empty tools
directory. Until that decision supplies the missing evidence scope, keep it in
place. Do not begin another deletion from this checkpoint.
