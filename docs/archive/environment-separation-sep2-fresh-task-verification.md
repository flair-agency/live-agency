# SEP-2 fresh-task verification

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06 (Asia/Tokyo). **Verification complete; overlay acceptance FAIL. Whole SEP-2 remains incomplete and integrations remain disabled.** The actual fresh-task catalog still contains 45 explicitly denied Skills. No business integration was invoked to test availability.

## Scope and evidence

Primary class G, supporting E verification. Protected boundary: development authority configuration. This package only reads configuration/metadata, executes harmless local checks, and writes this report plus excluded owner-only evidence. No configuration, source implementation, global registrations, credentials, schedules, dependency installation, processes, or task routing were changed. Coordinator task `01a07222-c325-72d1-a87a-be1975317794` retains acceptance. This is fresh task `01a07652-b8b3-72e3-8b24-4e30cd4a23c7`, not a fork or resumed prior verification.

The local AGENTS.md, task orchestration policy, and overlay checkpoint were read. No business Skill body was reviewed or changed; catalog registration inspection does not review its contract or invoke its workflow. OpenAI Docs was read for configuration guidance; the explicit restriction on external reads takes precedence over its docs-first workflow. Existing local parser/schema evidence was used without starting MCP or app-server processes. No reload procedure was attempted or newly established. The policy's requested model/effort is gpt-6-astra / low; actual dispatch settings are not exposed in this task's verification evidence, and were not changed. No workers were spawned.

Evidence is in `.sep2-desktop-evidence/fresh-task-verification/`: `catalog.json`, `execution.json`, `historical-drift.json`, and `final-check.json`. Exact local origins and historical hashes are kept there. The directory is 0700 and files are 0600; Git ignores them. Catalog evidence is transcribed from this task's injected definitions, with ALL_TOOLS captured directly. It is not inferred from registrations or the previous task's catalog.

## Results by category

| Category | Result | Evidence and limit |
| --- | --- | --- |
| cwd / Git routing / instructions | PASS | cwd and Git root are the saved development checkout; branch `codex/sep1-independent-development`. Development AGENTS.md applies. Current user config marks this checkout trusted. This does not prove host identity isolation. |
| Active overlay bytes / permissions | PASS | SHA-256 `a5f6483aa272a05abd524d4c1d85b738d71ac1cf6366a6a94695089da7fe40c5`; mode 0600. |
| Project-loaded feature parser | PASS | Installed CLI `features list`, no overrides, exit 0: apps, hooks, remote_plugin, shell_snapshot, skill_mcp_dependency_install false; shell_tool and unified_exec true. This is CLI resolution, not the desktop's full effective configuration. |
| Local execution | PASS | Non-login zsh check, pwd, Git root/branch, Node v22.22.0 arithmetic, and existing synthetic SEP-2 fixture JSON parse all exit 0. No fixture values printed. |
| Business / Lark MCP catalog removal | PASS | Zero business/Lark MCP tools in actual ALL_TOOLS. No moneyforward, live-agency, creator-scouting, lark-creator-networks or lark-flair namespaces. This proves catalog absence, not credential revocation. |
| Business connector catalog removal | PASS | Zero business connector tools and no connector discovery tool exposed. General artifact-template picker remains separately identified below. No connector invocation performed. |
| Dedicated CUA / browser / native plugin tools | PASS | No computer-use, cua_repl, browser, chrome, sky or other dedicated CUA namespace in the actual tool catalog. Host-owned screen/navigation controls are residual surfaces, not included in this narrow pass. Retained Node browser/backend reachability is unverified. |
| Business / Lark / plugin-management Skill removal | FAIL | 45 denied Skills remain injected: 16 user business, 28 user Lark, and 1 plugin-management. All 45 corresponding folder selectors are present and false in the active overlay. |
| Canva / Google Drive / Sites Skill removal | PASS | No such dedicated plugin Skill in this task. `lark-drive` remains and is included in the Lark failure. |
| General local capabilities | PASS (catalog); limited execution | Official docs 5 tools; Node REPL 3; artifact-template picker 2; local shell/files/Git/image tools, web and image generation retained. Shell/Node execution tested; docs, templates, web, media generation and connected document operations not invoked. |
| Historical global-config drift attribution | unverified | Bounded sanitized structure comparison narrows changes, but intermediate hash transitions and their actors/approval remain unverified; further hash change occurred during this verification. |
| Same-user confidentiality / total host isolation | unverified | Broad same-user read access and host controls remain. No credential, Keychain or session access test was performed. |

The feature parser also reports browser_use, browser_use_external, browser_use_full_cdp_access, computer_use and in_app_browser true. Those availability flags are distinct from the overlay's restrictive browser/native access policies; they neither prove policy bypass nor prove enforcement. `skip_host_skill_discovery` is false. This is a useful diagnostic observation, not a verified cause or a recommendation to toggle an under-development feature. The parser emitted a PATH-alias permission warning but returned success; no host-write escalation was requested.

## Effective catalog and origins

ALL_TOOLS contains **54** tools: **31** `mcp__codex_app__*`, **5** `mcp__openaiDeveloperDocs__*`, **3** `mcp__node_repl__*`, **2** `mcp__openai_artifact_template_picker__*`, **10** core shell/file/resource/goal tools, and one each in `clock__`, `image_gen__`, and `web__`.

Direct orchestration definitions outside ALL_TOOLS add **11** entries: `functions.exec`, `functions.wait`, `functions.request_user_input`, `functions.request_user_input_async`; `clock.sleep`; and six `collaboration` controls (followup_task, interrupt_agent, list_agents, send_message, spawn_agent, wait_agent). The plan-only question tool is subject to mode restrictions. Their presence is not evidence of a business connector.

There are **57 injected Skills**: 16 from the user Codex Skills root; 28 from the user agents Skills root; 5 system Skills; 6 from the primary-runtime artifact cache; 1 bundled visualize Skill; and 1 curated-remote plugin-management Skill. The 12 entries outside the denied group are imagegen, openai-docs, plugin-creator, skill-creator, skill-installer, documents:documents, pdf:pdf, presentations:Presentations, template-creator:template-creator, spreadsheets:Spreadsheets, spreadsheets:excel-live-control, and visualize:visualize. The Excel live-control Skill's presence is an instruction route; no corresponding connected Excel tool is exposed. Connected operation enforcement remains untested.

Exact failed catalog entries follow. User business origins are the user `.codex/skills` root; user Lark origins are `.agents/skills`; plugin-management originates in `openai-curated-remote/plugin-management/0.1.0/skills/plugin-management/SKILL.md`. Full absolute paths and exact folder-selector matches are in owner-only evidence.

| Visible denied Skill | Injected origin |
| --- | --- |
| `coin-expense-reconcile` | User business Skills |
| `creator-activity-sync` | User business Skills |
| `creator-insight-sync` | User business Skills |
| `creator-invitation-status-compaction` | User business Skills |
| `creator-invitation-status-sync` | User business Skills |
| `creator-live-history-compaction` | User business Skills |
| `creator-live-history-sync` | User business Skills |
| `creator-live-metrics-compaction` | User business Skills |
| `creator-profile-compaction` | User business Skills |
| `creator-profile-sync` | User business Skills |
| `foreign-revenue-accounting` | User business Skills |
| `gift-history-sync` | User business Skills |
| `lark-base-backup` | User business Skills |
| `lark-base-backup-retention` | User business Skills |
| `lark-base-disaster-recovery-drill` | User business Skills |
| `lark-base-maintenance` | User business Skills |
| `lark-approval` | User Lark Skills |
| `lark-apps` | User Lark Skills |
| `lark-attendance` | User Lark Skills |
| `lark-base` | User Lark Skills |
| `lark-calendar` | User Lark Skills |
| `lark-contact` | User Lark Skills |
| `lark-doc` | User Lark Skills |
| `lark-drive` | User Lark Skills |
| `lark-event` | User Lark Skills |
| `lark-im` | User Lark Skills |
| `lark-mail` | User Lark Skills |
| `lark-markdown` | User Lark Skills |
| `lark-meeting` | User Lark Skills |
| `lark-minutes` | User Lark Skills |
| `lark-note` | User Lark Skills |
| `lark-okr` | User Lark Skills |
| `lark-openapi-explorer` | User Lark Skills |
| `lark-shared` | User Lark Skills |
| `lark-sheets` | User Lark Skills |
| `lark-skill-maker` | User Lark Skills |
| `lark-slides` | User Lark Skills |
| `lark-task` | User Lark Skills |
| `lark-vc` | User Lark Skills |
| `lark-vc-agent` | User Lark Skills |
| `lark-whiteboard` | User Lark Skills |
| `lark-wiki` | User Lark Skills |
| `lark-workflow-meeting-summary` | User Lark Skills |
| `lark-workflow-standup-report` | User Lark Skills |
| `plugin-management:plugin-management` | Curated remote plugin cache, version 0.1.0 |

The 122 configured folder denies pass the prior installed parser/schema checks, and 45 of those exact folders match this catalog. That establishes a reproducible configuration-versus-injection discrepancy. It does not establish whether host discovery, caching, selector application semantics, or a higher-priority setting is responsible. A separate new task alone has not removed these entries. Neither a forced restart nor changing folder selectors to SKILL.md paths is justified as a verified fix by this evidence.

## Residual host-owned authority

All 31 `mcp__codex_app__*` controls remain, with exact names in catalog evidence:

- Task reads, creation, forking, messaging, waiting, handoff and status can reach or launch work in other saved projects; those projects can have production authority. Their availability is operationally relevant even with business MCPs absent here.
- `automation_update` can create or change schedules. It was not invoked and development scheduling remains prohibited.
- Task sharing can publish a snapshot; archive/title/sidebar controls mutate app state. None were used.
- `capture_screen_context` is a host-owned native screen read, restricted by its definition to active voice chat. `navigate_to_codex_page`, `open_in_codex` (including browser targets), and `read_thread_terminal` expose navigation or context surfaces. No screen, browser, terminal-context or voice operation was invoked. This residual is not a claim of absent native host authority.
- Usage reads and credit redemption affect or describe the shared account; `uninstall_plugin` affects registrations. Workspace-dependency loading locates local artifact runtimes. These are not all blanket failures, but they are not project-isolated business authority controls either.

Shell and Node are general execution surfaces, including the retained user-configured node_repl registration. Their ability to reach ambient authenticated services was deliberately not probed. Instructions prohibit such fallback, but instructions and catalog removal do not create a same-user confidentiality boundary. No total isolation or production-route non-callability claim is made.

## Historical global-config drift

The prior desktop hash differs from the overlay's before hash; the overlay before and after hashes are equal. A complete owner-only SEP-0 sanitized structural snapshot also exists, predating both. Comparing that snapshot against the current parsed global TOML finds three added project trust entries, one for this development checkout and two other desktop project entries. An earlier read in this verification also found a changed `desktop.conversationDetailMode`; at the later capture that setting matched SEP-0 again. The two current-read hashes differ. No global configuration was written by this task.

Thus structural evidence exists and narrows the observed changes; this is not a hashes-only comparison with SEP-0. However, there is no identified intermediate structural snapshot matching the prior desktop or overlay hash in the bounded evidence inspected. The exact earlier-to-overlay cause, timing, actor and authorization remain **unverified**. The observed concurrent UI-setting difference is not proof that it explains all historical byte changes. Sanitization also limits conclusions about redacted values; no raw config or secret values are retained in the new evidence. No old configuration was restored, and no broad session/process forensic search was performed.

## Preservation, blockers and smallest next step

Only this report and new ignored evidence were written. Existing staged content was empty and remains empty; configuration and instruction hashes are checked again in final evidence. No integration calls, auth/login, credential reads, restarts, dependency installs, source edits, task creation, schedule changes or production repairs occurred. No automatic approval rejection occurred. No full suite is needed for this catalog/configuration report. Production before/after equality during the application package is inherited evidence only; current global drift prevents extending that equality to this task. Rollback is limited to removing this newly generated report/evidence if desired; no configuration rollback is needed or authorized here.

Blocking acceptance: ineffective removal of 45 explicitly denied Skills; unverified historical/concurrent global drift; and unproven isolation of residual host/cross-project/general-runtime routes. **Do not enable integrations or mark whole SEP-2 complete.**

Smallest next step: the existing coordinator should take this 45-selector/catalog reproduction into a bounded supported host Skill-discovery/configuration diagnosis, establishing the supported reload or configuration behavior before any change. Do not create another coordinator or repeat unchanged fresh tasks as proof. Historical drift attribution and residual authority acceptance remain open for that coordinator. This verification package stops here.
