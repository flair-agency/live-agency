# STAB native CLI artifact qualification

Date: 2026-09-06. Coordinator: `01a07222-c325-72d1-a87a-be1975317794`.
Status: **Exact native artifact verified; completed dependency generation and independent relocation passed. Ready for review of the two-tree production delivery scope; no production delivery authorized or performed.**

The final known native installation-artifact gap in [current-composition recovery qualification](stab-current-composition-recovery-qualification.md) is closed for the captured source/lock graph on macOS arm64. The previously accepted npm-only candidate remains unchanged. A new generation adds exactly the checksum-verified Lark CLI binary, and all 4,190 regular-file/link entries match after relocation. Static native artifact qualification does **not** establish CLI runtime or service health.

## Change card and authority

- Primary E, supporting G; protected boundary: completing the pinned composition dependency artifact.
- Invariants: fixed source/locks; preserved original staged/unstaged distinctions, active dependencies/configuration, Skills, registrations and schedules. Reject drift, wrong platform/version, absent or mismatched checksum, unsafe archive entries, escaping links and native execution.
- Outcome completed: exact native artifact, independent completed layouts, updated inventories, guarded focused verification and reviewable delivery/rollback scope.
- The initial sandbox download failed with `URLError`. Two network escalations were rejected: first for missing scoped external-read authority, then because relayed approval was not a trusted user message. The user subsequently answered **はい directly in this task** to the exact isolated download and verification request; the same escalation was accepted and the same downloader succeeded. No alternate route bypassed review.
- Authorization consumed: unauthenticated exact upstream native archive download, checksum verification and isolated relocation qualification. No binary/launcher/postinstall/setup execution, production delivery, credentials, global registration or process/schedule changes.
- No additional tasks/subagents or model overrides. No Skill was created, changed or reviewed. Task rollback is removal of only this report and its new owned ignored evidence, if desired; production needs no rollback for this work.

## Exact provenance and native inspection

The actual accepted candidate's manifest, installer, launcher and checksum file were read. Their hashes match the previous recorded review and were rechecked before assembly:

| Candidate `@larksuite/cli` file | SHA-256 |
| --- | --- |
| `package.json` | `b0a2f5d5773553119f69e191b0c0a2bf121c0cd22a9e71429f2b52d6ba5fd238` |
| `scripts/install.js` | `81cbf959882164f54f7d22b20dcfcac6b3796ac3205a99d3005833bd68e99886` |
| `scripts/run.js` | `b6b575a31d62ea45f55155f1090a49d31e79a1b0e5c70af15f9431ab850ca577` |
| `checksums.txt` | `99d555ede802fe128ec23b1a3e9ac32b883b8b8d88506917cc73787875f4260d` |

These are from the accepted lock-integrity-verified npm package **1.0.93**, not an operational executable. The installer maps Darwin/arm64 to `darwin-arm64` and derives this versioned asset from its manifest. Host: macOS 26.6.2 (25G83), arm64; qualification runtime: Node v22.22.0 / npm 10.9.4.

| Artifact property | Verified result |
| --- | --- |
| Asset | `lark-cli-1.0.93-darwin-arm64.tar.gz` |
| Exact source | [GitHub release v1.0.93 asset](https://github.com/larksuite/cli/releases/download/v1.0.93/lark-cli-1.0.93-darwin-arm64.tar.gz) |
| HTTP chain | `github.com` 302 → `release-assets.githubusercontent.com` 200 |
| Archive size | 13,843,484 bytes |
| Archive SHA-256, matching shipped checksum | `eaa09754925c00a6858e91518a49ab8e0a24bd4178e4698a7b185046b8ea24e2` |
| Extracted member | `lark-cli` only |
| Binary size | 46,646,010 bytes |
| Binary SHA-256 | `9092c3f255b749afdc2a842be5d582511d978424c11326d59af90c0fd5f5c044` |
| Installer-defined destination | `node_modules/@larksuite/cli/bin/lark-cli` |
| Mode and static format | `0755`; Mach-O 64-bit little-endian arm64 executable |

The downloader admits HTTPS only and checks each redirect against the three reviewed GitHub hosts, with at most three redirects, final HTTP 200, declared/actual size checks capped at 150 MiB, 20-second socket timeouts and a 120-second elapsed-time check. A blocking read can overrun that check by one socket timeout. It uses no credentials, cookies or environment proxies. Redirect query strings are omitted from evidence.

The archive checksum was checked before any archive inspection, then checked again before extraction. Four checksum-authenticated regular members were reviewed: `CHANGELOG.md` (76,737 bytes), `LICENSE` (1,084), `README.md` (18,822), and `lark-cli` (46,646,010). Assembly admitted exactly those names/sizes and regular types, rejected duplicates, extra entries, path separators, links, devices, PAX overrides and unexpected modes, and read only the binary member into the destination. Documentation members were not extracted. Mach-O magic, ARM64 CPU type, executable file type and bounded load-command structure were parsed; `/usr/bin/file` independently reported arm64. The native binary was never executed, including `--version`; quarantine/security settings were not changed.

## Completed generation and inventories

Owner-only ignored evidence root:

`/Users/naokikimura/workspace/live-agency-provider-runtime/tmp/stab-native-cli-20260906/`

The archive resides directly under that root. The new `completed-generation/` is mode 0700 and owned by the current user. It protects all enclosed source and dependency content, including the installer-required executable mode. Git ignore coverage was verified.

The two completed layouts are:

1. `tmp/stab-native-cli-20260906/completed-generation/candidate/live-agency-provider-runtime`
2. `tmp/stab-native-cli-20260906/completed-generation/second-layout/live-agency-provider-runtime`

Each materializes the **445-file accepted source manifest independently**, then contains only these dependency roots:

- `node_modules`
- `skills/live-agency-skills/node_modules`

Source files were copied as regular files; package trees were copied preserving links without dereferencing workspaces. The first completed tree differs from the accepted 4,189-entry npm-only inventory by **one file only**, the reviewed native binary. All other package bytes, file modes and link targets match. The second source layout was independently materialized, and only the two completed package trees were transferred into it.

Both full inventories match: **4,190 regular-file/link entries**, including **24 relative links**, all existing and resolving inside their own layout. A separate directory-mode inventory also matches. No additional workspace-local `node_modules` tree or embedded old/first-candidate absolute path was found. Tests were followed by another package/source inventory check.

`completed-generation/installed-file-inventory.json` SHA-256:

`cb7b58dcd58cf6136860dc6af8dc152773df8c9dac7df1f1088b3bb58b32aaa0`

This file binds each regular file's SHA-256/mode and each link's literal target. `resolved-links.json` binds concrete resolved paths in both layouts; `directory-inventory.json` records directory modes. `expected-package-inventory.json` retains exact versions, resolved sources and lock integrities; `expected-workspace-links.json`, `source-manifest.json` and `locks.json` retain graph identities. Root lock SHA-256 remains `a1cf1fbbd25ec52c7fb038252825673608b67bc79b9bd5f5d3e8f3221a2a1250`; nested Skills lock remains `f17c4987e4764370ef2270f5963e52ad04c2d70339ef8e8e2b0fe56d54978abd`. Both still match their accepted committed blobs.

## Focused verification and preservation

Completed layouts both pass root and nested Skills `npm ls --all --json`, in an isolated minimal environment with offline mode and lifecycle hooks disabled. In the independent second layout, the previously reviewed Node guard and permission restrictions pass:

- SDK 1.30.0 / Zod 4.5.4 library-only valid/invalid schema checks.
- Discovery of 10 bindings, resolution of all three coin instruction capabilities and their three unattended rejections.
- Coin reconciliation 8/8 and Provider API 8/8 synthetic tests.

Only those **16 focused existing tests** were rerun after adding the native artifact; unrelated suites were not repeated. Guarded checks could read only the second layout, named harness files and synthetic fixtures, and write only synthetic fixtures. The first candidate was not readable under those Node permissions. Child processes, workers and addons were not enabled; the reviewed guard rejects network/server operations. This is bounded synthetic verification, not general OS isolation or service health evidence.

Fresh before/after snapshots match the accepted preservation state across **20 original/development repositories**: HEAD, index digest, staged/unstaged diff digests, tracked bytes/modes, selected untracked bytes/modes and selection lists. The 445 sources and both locks match in the old candidate and both new layouts; the original 4,189-entry candidate remains unchanged. The freshness checkpoint is recorded at `2026-09-06T13:24:14.754542+00:00` and must be revalidated before delivery.

Preservation scope excludes untracked business data, private configuration, credentials, old active dependency bytes and global host state; those were not changed or broadly inspected. Private config compatibility is not claimed to have been live-tested. Existing evidence functions were reused with Python bytecode writing disabled. Only this English report and this task's owned ignored evidence were written. Earlier blocked checkpoint files remain historical evidence, superseded by `completed-generation/completion.json`.

Key new evidence: `download-result.json`, `complete.py`, and `completed-generation/{artifact.json,file-format.json,relocation.json,installed-file-inventory.json,directory-inventory.json,resolved-links.json,checks.json,completion.json,protected-before.json,protected-after.json}`, plus per-check outputs. No production installer or swap script was created.

## Reviewable production delivery and rollback

The artifact is ready for **delivery-scope review**, limited to replacing exactly:

1. `P/node_modules`
2. `P/skills/live-agency-skills/node_modules`

`P` is the original runtime root in the coordinator's restricted handoff. Use the completed candidate above and its recorded inventory digest. No source, lock, private configuration, Git state or global registration belongs to this delivery. No known installation-artifact gap remains in this captured scope; native runtime/service behavior is untested.

Before delivery, bind separate production authority to the exact generation/digests, fresh source/lock/preservation state, these two destinations, same-filesystem owner-only staging/rollback locations, and the already specified SEP-2 acceptance or scoped incident exception. Refuse drift or changed path/owner/link identity. Coordinate an exclusive window and consumer exclusion under separately authorized process/schedule handling. Neither passing tests nor this download approval supplies production authority.

Stage and verify both completed trees. Inventory and preserve **both original dependency trees**, retaining their links, modes and native assets, at reserved `rollback/root-node_modules` and `rollback/skills-node_modules` paths. Journal each directory move: these two replacements are not one atomic transaction. Keep consumers excluded throughout. After replacement, compare installed byte/mode/link inventories and confinement, recheck protected source/config boundaries, and perform the separately approved metadata-only SDK/closure/discovery checks before consumers resume. Existing runtime objects may retain a rejected discovery promise; process recreation remains separately coordinated.

On any failure, keep consumers excluded, retain only the newly delivered trees in an owner-only failed-generation path, restore corresponding originals according to the completed-move journal, and verify original inventories and unchanged source/locks before ending recovery. Do not reset Git, overwrite configuration, replay business operations or automatically delete rollback artifacts.

**Next action:** coordinator review and separately scoped approval of this exact two-tree production delivery with its existing exclusion, freshness and rollback requirements. No version upgrade, lock regeneration or further broad qualification programme is needed for the resolved artifact gap.
