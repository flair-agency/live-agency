# SEP-2 post-restart verification

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06 (Asia/Tokyo). **Bounded verification complete; Skill exclusion remains FAIL.** Following the user-reported Codex app restart, this fresh task still received all 45 previously denied Skills. The restart was not independently observed; this comparison does not establish its timing, completeness, or causal effect.

## Scope and method

Primary class G; protected boundary: development Skill discovery. This package preserves configuration, production/global/project settings, registrations, credentials, and business state. Its only writes are this English report and owner-only ignored evidence. Definition of done: capture the freshly injected Skills and actual ALL_TOOLS, compare the previous 45 denied entries, verify cwd/Git root and overlay hash, and execute one harmless local command. No parallel work or successor task was created. The existing coordinator `01a07222-c325-72d1-a87a-be1975317794` retains acceptance and any subsequent authority decision.

Read applicable AGENTS.md, the task orchestration policy, the fresh-task verification, and the Skill-discovery diagnosis. OpenAI Docs Skill instructions were read; the explicit prohibition on further documentation research overrides its external docs-first workflow. No business Skill body was read, reviewed, or executed, so this is not a private-source Skill contract review. Policy requests gpt-6-astra / low; actual dispatch settings were not verified or changed.

Evidence under `.sep2-desktop-evidence/post-restart-verification/` contains `catalog.json`, `comparison.json`, and `final-check.json`. Skills were independently transcribed from this task's injected developer catalog with expanded origins; ALL_TOOLS was captured directly, including descriptions. Prior evidence was used only for comparison. This is task `01a07660-6335-7832-a215-41f444683958`.

## Comparison

| Observation | Previous fresh task | Current task |
| --- | ---: | ---: |
| Injected Skills, total | 57 | 57 |
| Denied business Skills visible | 16 | 16 |
| Denied Lark Skills visible | 28 | 28 |
| Denied plugin-management Skill visible | 1 | 1 |
| Other Skills retained | 12 | 12 |
| ALL_TOOLS entries | 54 | 54 |
| Business/Lark MCP tools | 0 | 0 |
| Business connector tools | 0 | 0 |
| Dedicated CUA/browser/native plugin tools | 0 | 0 |
| Host-owned Codex app tools | 31 | 31 |

All 57 Skill name/origin pairs and all 54 tool names match the previous catalog: zero additions or removals. Exact names and local origins remain in owner-only evidence; the previous report's list of 45 failed entries therefore remains applicable. No dedicated Canva, Google Drive, or Sites Skill is injected; lark-drive remains within the Lark failure. General artifact Skills include Excel live-control, but no connected Excel tool is exposed.

The other ALL_TOOLS entries are five official documentation tools, three Node REPL tools, two artifact-template tools, ten core tools, and one each for clock, image generation, and web. Eleven direct orchestration definitions outside ALL_TOOLS also remain present. This comparison concerns names and Skill origins, not byte equality of every tool description or effective enforcement.

Both cwd and Git root are the saved development checkout, on `codex/sep1-independent-development`. Active `.codex/config.toml` remains mode 0600 and SHA-256 `a5f6483aa272a05abd524d4c1d85b738d71ac1cf6366a6a94695089da7fe40c5`, matching the supplied previous hash before and after this work. The harmless `/bin/zsh -f` arithmetic command returned 4 successfully. Parser, dependency, fixture, and full-suite tests were not rerun.

## Limits, preservation, and coordinator recommendation

No exclusion improvement is observed after the reported restart. This does not identify a discovery, selector, cache, or precedence cause, and does not establish a supported remedy. Catalog absence is not credential revocation. Host-owned screen/navigation, scheduling and cross-task controls, shell, and Node remain residual surfaces; none was used to probe business authority. Total same-user isolation and whole SEP-2 completion are not established.

No integrations, credential access, business tools, app-server/MCP launches, installations, global-settings reads or forensics, configuration edits, support messages, or further restart occurred. Existing staged/unstaged distinctions were preserved; focused verification checks that only this report is added to the prior Git status. Evidence directories are 0700, files 0600, and Git ignores them. No approval-review rejection occurred. Rollback, if requested, consists only of removing this report and its new evidence directory.

The coordinator should retain the overlay, keep Skill-exclusion acceptance open and integrations/schedules disabled, and review this unchanged reproduction alongside the existing diagnosis. Any further product clarification or project-only experiment requires its own scoped decision; another unchanged fresh task or restart is not a demonstrated repair. Historical global drift and residual authority questions remain unverified and were deliberately not reopened here. Authorized offline development can continue within existing boundaries. This package stops here without dispatching further work.
