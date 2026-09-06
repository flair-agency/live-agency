# SEP-2 desktop project verification

Date: 2026-09-06 (Asia/Tokyo). **Registration and ordinary execution pass; inherited production authority prevents full SEP-2 acceptance.**

## Scope and authority

Verification-only package for coordinating task `01a07222-c325-72d1-a87a-be1975317794`. Primary class G, supporting E investigation: inspect project routing and host authority, preserve source/configuration/registrations, and deliver this report plus restricted evidence. No configuration rollout or production operation is authorized by this result. No agents, worktrees, successor tasks, model subprocesses, dependency installations, MCP startups, business integrations, authentication flows, or full test suites were run.

Read the local AGENTS.md and task orchestration policy, the prior SEP-2 checkpoint in worktree `8cac`, and authoritative separation-plan sections 4 and 7. SEP-1 and its 317 synthetic tests remain accepted. The earlier isolated CLI diagnostic is a different environment; none of its empty catalogs or authentication settings describes this desktop task.

## 1. Registration and cwd: PASS

The app's read-only project listing returns local project `live-agency`, ID `02dda937-5e00-431f-b8fb-46fcdf22bd90`, host `local`, Git repository true, path `/Users/naokikimura/workspace/live-agency-provider-runtime`.

Both actual `pwd` and `git rev-parse --show-toplevel` return that exact path. Branch: `codex/sep1-independent-development`. This task is running directly in the primary checkout. Existing dirty and untracked work was inspected without staging, resetting, or rewriting it. The operational local project `28dc0628-683e-4e35-9e49-a1dc7a0c3aef` and Work project `g-p-693bd2fb16bc8191ac195f072bb993e2` remain listed.

The effective context includes the development AGENTS.md's explicit selection, synthetic-state, no-integration, and no-global-install rules. No ancestor AGENTS.md exists at `/`, `/Users`, the user's home, or `workspace`; user-global `.codex/AGENTS.md` exists and is empty. Host/developer instructions additionally inject global Skill metadata, desktop tools, and permissions. No full effective-config RPC was used, because this package forbids starting an MCP/app-server diagnostic.

## 2. Harmless local execution: PASS

Ordinary `exec_command` calls returned exit 0. Python read and parsed `/Users/naokikimura/workspace/.live-agency-development/fixtures/sep2-host-fixture.json` as a JSON object; fixture values were not printed. No nested sandbox wrapper was used. This resolves the earlier diagnostic's unproven ordinary execution point; it does not validate that separate CLI candidate.

Injected permissions are workspace-write with automatic approval review, restricted command networking, filesystem read access rooted at `/`, and writable development/visualization/temp roots. Git and project `.codex`/`.agents` paths are protected read-only in the supplied permission profile. The separate development state directory is not a listed writable root for this task. Report evidence therefore stays in the development checkout. Broad same-user read access is not a confidentiality boundary. Approval review and written no-integration instructions do not mean write tools are absent.

## 3. Inherited business authority: EXPOSED

The current `ALL_TOOLS` catalog contains 380 entries, including 287 app/connector entries, 19 `lark_creator_networks` and 19 `lark_flair` entries. Both Lark surfaces expose record creation/update, permissions creation and message creation as well as reads. Connector examples include Canva editing/commit tools, GitHub issue-comment tools, and workspace-agent configuration/schedule tools. Direct CUA/browser/native-app tools and desktop task/automation controls are also exposed outside or alongside that inventory.

This proves advertised callable authority, not successful authenticated service execution: no business call was made and no credentials, browser sessions, real business records, or account contents were read. Conversely, configured servers without tools in this snapshot cannot be declared safely disabled. `live-agency-operations`, scouting, and accounting registrations are present in global configuration even though corresponding named tool groups were absent from this catalog.

Loaded Skill origins include 16 business entries under `/Users/naokikimura/.codex/skills` and 28 Lark entries under `/Users/naokikimura/.agents/skills`. Fifteen of those 16 business Skill paths resolve into the operational Work checkout; `foreign-revenue-accounting` is directly under the user Skill directory. The additional on-disk `coin-expense-weekly-application` entry is not in the injected loaded list and is not counted as loaded. Skill bodies were not reviewed or executed for business work.

Other injected Skill roots are `.codex/skills/.system`, bundled Sites `0.1.57`, Canva `14.0.0`, Google Drive `0.1.16`, plugin-management `0.1.0`, visualize `1.0.29`, and primary-runtime documents/PDF/presentations/spreadsheets/template-creator `26.904.11930` under the user's `.codex/plugins/cache`. These are shared host/plugin sources, not development registrations. The task's injected catalog provides their exact SKILL.md paths; restricted evidence records the business Skill paths and realpaths.

## 4. Source and executable separation: MIXED

Static manifest/realpath checks passed for all 11 root workspaces and 10 declared dependency paths: all 21 exist and resolve inside development. All 31 execution entry/resource references declared by Provider manifests exist and resolve inside development. This count covers those manifest fields specifically; it is not a rerun of the previous checkpoint's broader 34-resource inventory. No Provider module was imported. The accepted source reconstruction and full hash parity checks were not repeated.

Host executable routing is still operational: five enabled-by-default global MCP entries have script arguments pointing into the original Work checkout (operations, scouting, invitation-history-write and the two Lark servers). The shared Node executable is outside development. The accounting server has a remote registration; its URL was not printed. `node_repl` points to the installed application bundle. A separate legacy `computer-use` entry is disabled, while direct CUA tools are nevertheless exposed; these are distinct surfaces.

Global `.codex/config.toml` exists, includes nine MCP registrations, plugins and project trust settings, has no Skill disable entries or app overrides, and marks the new directory trusted. The development `.codex/config.toml` and `/etc/codex/config.toml` are absent. Shell `CODEX_HOME` is unset. These static observations plus the injected catalog establish global inheritance; they do not reconstruct every managed or host override. Notify/environment configuration was not executed or copied, and credential values were not inspected.

The parent `非公開ソース連携スキル設計ガイド.md` remains a deliberate read-only governance dependency. It was not migrated, duplicated, or reviewed as a Skill implementation. Its future English filename/content migration remains deferred until after npm cutover. The owner-deleted redundant parent instruction document was not restored or treated as unexplained drift.

## 5. Smallest next configuration proposal

Before: trusted saved development project with no project override; global business Skills, MCP launch definitions and connector surfaces inherited. Proposed after: keep both projects and all global operational registrations intact, add only a development `.codex/config.toml` overlay disabling inherited business execution paths, then verify the actual desktop catalog in a fresh context. No settings were changed here.

The official [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) documents trusted project overrides, `mcp_servers.<id>.enabled`, per-Skill `skills.config` disable entries, `features.apps`, app enable controls, plugin MCP enable controls, and browser/native-app access policy. It also states connector traffic is outside the command network proxy. These are supported configuration building blocks; their complete enforcement by this desktop's injected CUA/plugin/host tools is **not yet observed**.

Restricted evidence includes a parse-checked, inactive `project-overlay-proposal.toml`: disable all currently registered MCP servers except official documentation, disable apps/hooks/remote-plugin discovery, disable current user business/Lark Skill paths and symlink targets, deny default browser/native-app access, and suppress login-shell/environment inheritance. The inventory-based Skill/MCP deny list is a snapshot, not a future-registration default-deny guarantee. Plugin-provided Skills/tools and explicit native-app/origin allows must also be reconciled through supported configuration; the draft is deliberately not represented as a complete isolation policy.

Coordinator should authorize one development-only configuration package to complete that overlay and verify effective settings/catalog, including plugin-origin tools, CUA, host automation/cross-task controls and any override precedence. Ordinary command execution must still pass. Confirm no production Profiles/credentials can be implicitly selected; keep integrations fixture-only meanwhile. If a relevant host surface cannot be constrained by supported project controls, establish a separately configured execution boundary for that surface. No evidence here establishes that separate OS identities are mandatory. Strong confidentiality would require additional filesystem/session restrictions beyond today's same-user permissions.

## Evidence and limits

Owner-only evidence directory: `/Users/naokikimura/workspace/live-agency-provider-runtime/.sep2-desktop-evidence` (0700; files 0600). Contains current tool names, business Skill origins, static resource outcomes, selected reference hashes, and the inactive proposal. No secrets or business data are included. These are restricted local evidence, not material to publish or stage with the report.

No configuration, source implementation, schedules, profiles, permissions, accounts, operational directories or Skill links were changed. No automatic approval rejection occurred. This bounded verification does not claim a fresh SEP-0 production-hash audit, live workflow health, authenticated permissions, or complete desktop isolation. Rollback requires removing only this report/evidence if unwanted, after retaining any review records; no production restore is needed.

**Next step:** coordinator reviews the development-only overlay package, then verifies its actual desktop enforcement. Registration and ordinary execution can be accepted now; whole SEP-2 remains incomplete while production authority is inherited.
