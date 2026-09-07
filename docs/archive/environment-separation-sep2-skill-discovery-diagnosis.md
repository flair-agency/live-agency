# SEP-2 Skill discovery diagnosis

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06 (Asia/Tokyo). **Bounded diagnosis complete; no verified project-only desktop fix established. Skill exclusion acceptance remains FAIL and integrations remain disabled.**

Primary G, supporting E read-only diagnosis; protected boundary: development Skill discovery. Coordinator `01a07222-c325-72d1-a87a-be1975317794` reviews this evidence before any settings change. No workers, successor tasks, implementation changes, or configuration mutations. Model/effort overrides were omitted as directed.

## Finding and evidence

The supported configuration vocabulary is `[[skills.config]]` with a path and `enabled = false`. General project configuration is documented, but the inspected documentation does not establish how this installed desktop applies project Skill denies to its host-injected catalog. It also contains conflicting path examples. Therefore neither changing selectors nor restarting is a verified minimal remedy for this reproduction.

Accepted [fresh-task verification](environment-separation-sep2-fresh-task-verification.md) already establishes 45 visible denied Skills and zero business MCP/connectors/dedicated CUA. Independent cwd/Git/dependencies and local synthetic execution PASS are inherited, not rerun. The [overlay checkpoint](environment-separation-sep2-overlay-checkpoint.md) records installed CLI 0.153.4 parser/schema validation. This diagnosis read the existing generated schemas rather than launching a CLI, app-server, MCP process, or model session.

New owner-only evidence: `.sep2-desktop-evidence/skill-discovery-diagnosis/local-evidence.json` and `final-check.json`. The directory is 0700, files 0600, and Git ignores them. Absolute local origins remain there. Metadata-only comparison against the accepted catalog finds:

- All 45 catalog folders have an exact disabled selector.
- All 45 resolved realpaths also have disabled selectors; 15 catalog folders are symlinks.
- None of these 45 selectors points to the `SKILL.md` file itself.
- Active overlay SHA-256 remains `a5f6483aa272a05abd524d4c1d85b738d71ac1cf6366a6a94695089da7fe40c5`.

This rules out a missing folder alias or missing resolved-folder deny in this inventory. It does not prove which representation the desktop matcher consumes. No business Skill body was read, reviewed, or executed; the private-source Skill design guide was consequently not needed for contract review.

## Documented behavior and precise limits

Official pages below were fetched through the already available official documentation tool after bounded local inspection, as instructed. No authenticated browser or business connector was used.

| Topic | Confirmed evidence | Limit for this desktop |
| --- | --- | --- |
| Selector | [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) describes `skills.config.<index>.path` as a folder containing `SKILL.md`. [Skills guide](https://developers.openai.com/codex/skills#enable-or-disable-local-codex-skills) instead illustrates a path ending in `SKILL.md`. | The two official representations conflict. File conversion is a candidate experiment, not an established repair; folder configuration cannot simply be declared invalid. |
| Symlinks | The [Skills guide](https://developers.openai.com/codex/skills#where-to-save-skills) documents following symlink targets during discovery. Installed `SkillsConfigWriteParams.json` says `AbsolutePathBuf` is absolute and normalized but need not be canonicalized or exist. | Discovery support and the transport type do not define matching equality. Both folder representations are already denied. Exact file-path and name-selector behavior remains unproven. |
| Scope and precedence | [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic#configuration-precedence) documents trusted project layers above selected profiles and user/system defaults, below command overrides; nearest project layer wins. It explicitly identifies CLI/IDE shared layers. | Accepted parser success is CLI evidence. A hand-built recursive merge is not a desktop effective-config trace, and does not establish Skill array conflict resolution or host injection precedence. No higher-priority override causing this result was identified. |
| Project restrictions | The [reference](https://learn.chatgpt.com/docs/config-file/config-reference) excludes several host-owned settings from project overrides, including auth/provider routing and profile selection; Skill config is not listed among those exceptions. | Absence from that exception list supports investigating project configuration; it is not proof of desktop Skill filtering. Trust is already accepted evidence, so marking the project trusted again is not a justified remedy. |
| Reload | Installed `SkillsListParams.json` has `cwds` and `forceReload`, which bypasses the Skill cache. `SkillsChangedNotification.json` advises clients to relist when watched Skill files change. The [Skills guide](https://developers.openai.com/codex/skills#enable-or-disable-local-codex-skills) directs restart after editing user-level config. | A protocol cache refresh is not a documented desktop UI action or a guarantee of reinjecting turn instructions. The guide does not specify project-only desktop config reload or effects on other active tasks. No restart, RPC invocation, or fresh-task-only repetition is warranted here. |
| Desktop settings | The fetched [app settings page](https://developers.openai.com/codex/app/settings) describes app preferences. | It supplies no project Skill exclusion/reload procedure. This is a bounded documentation gap, not proof that every possible desktop version lacks the feature. |

Local schema paths are under `.sep2-desktop-evidence/installed-schema/v2/`. `SkillsConfigWriteParams.json` accepts optional name/path selectors but exposes no target configuration-file field; calling it would not establish a project-only write. `SkillsExtraRootsSetParams.json` adds roots and exposes no exclusion field. Neither is a safe substitute for an established project-scoped setting. These interfaces were inspected, never invoked.

Hypotheses remain: host discovery may use a different policy path, cache state may be involved, file-versus-folder matching may differ, or a higher-priority layer may override the deny. The observed `skip_host_skill_discovery = false` flag identifies none of these as the cause. No experimental flags, UI-setting drift investigation, binary reverse engineering, or broad forensic search was undertaken. Two targeted official searches yielded changelog-heavy results; four directly relevant official pages were fetched, and the search stopped at this limitation.

Skill catalog presence exposes workflow instructions and possible script routes, not proof of authenticated executable authority. Conversely, absent business tools do not prove credentials are inaccessible through general execution. Existing prohibitions on ambient authentication, external operations, cross-project business actions, and schedules remain binding. Total same-user confidentiality isolation is not added as a programme goal.

## Minimal next action and work that can proceed

**The concrete next action is coordinator review of this reproduction and the official selector inconsistency, retaining the existing overlay.** If a product clarification is needed, the coordinator can approve a sanitized support report asking: “For desktop project `.codex/config.toml`, does `skills.config` filter host-injected user/plugin Skills; does path match a folder or `SKILL.md`, how are symlinks and layer conflicts resolved, and what project-scoped reload applies without altering other tasks?” Attach only version, synthetic path examples, counts, and the documented discrepancy. Do not send machine paths, Skill bodies, real service data, credentials, or the private evidence file. No support message was sent by this package; no substantiated mandatory manual UI action was found.

The minimal operational remedy now is to continue bounded offline development under the existing instructions and overlay while leaving the failed Skill-discovery gate open. Source review, documentation, synthetic contract design, and explicitly authorized local implementation/tests can proceed. Use the designated development config/runs/fixtures locations; writes outside current sandbox roots still need scoped filesystem authorization. Do not run business Skills, install global Skills, start integrations, use ambient identities, provision accounts, or enable schedules. Discovery acceptance and integration activation remain blocked pending supported behavior and coordinator acceptance; ordinary offline work is not blocked wholesale.

For any later supported configuration experiment, coordinator approval must bind the exact project-only file/diff, documented selector and reload behavior, and expected catalog changes. Capture its before bytes/hash; preserve operational checkout, global settings, registrations, credentials, schedules and unrelated task state. Reject any action that silently writes user/global settings. Then verify actual desktop catalog removal of all 45 denied entries, retained general capabilities and absent business tools, plus unchanged protected configuration. Use a fresh catalog only after a justified change/reload, not another unchanged fresh task as a repair. A cache-list response alone is insufficient. Roll back only that approved diff if the post-change hash matches; stop on concurrent edits and verify restored behavior. Do not restore historical global settings or remove the entire existing overlay to roll back a future selector experiment.

## Preservation and completion

Only this report and its ignored evidence were created. Existing staged/unstaged state is retained; no full tests were run for this documentation-only diagnosis. No source snapshots, production files, global configuration, credentials, registrations, schedules, or active overlay were written. No settings change or implementation is claimed. Rollback for this package is deletion of only its report and new evidence directory, if requested. There was no approval-review rejection. Whole SEP-2 remains incomplete; acceptance stays with the existing coordinator.
