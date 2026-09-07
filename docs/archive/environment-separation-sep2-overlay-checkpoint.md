# SEP-2 development overlay checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

Date: 2026-09-06 (Asia/Tokyo). **Development overlay applied; fresh desktop enforcement and historical production drift reconciliation remain open. Whole SEP-2 is not complete.** Coordinator: task `01a07222-c325-72d1-a87a-be1975317794`.

## Scope and change card

Primary class E, supporting G: apply the approved project-local authority restriction design. Protected boundary: development host configuration. Invariants: preserve operational configuration, registrations, schedules, source work, safety reviews, and sandbox/network permissions; no business integration execution. This package ends with a validated overlay, rollback evidence, and a fresh-task brief. The next gate is coordinator verification in a separate new task. No parallel workers or successor tasks were created. No model or reasoning override was set.

Read the local AGENTS.md, task orchestration policy, prior desktop verification report and inactive proposal, and sections 4 and 7 of the separation plan at the original operational root. Used OpenAI Docs and the installed application binary. The parent private-source design guide was not edited, copied, or migrated; no business Skill body or implementation was reviewed or changed. Its English migration remains deferred until after npm cutover.

## Exact changes and before/after

Paths are relative to this saved development checkout; machine-specific absolute paths and selected identifiers are retained only in excluded evidence.

| Path | Change |
| --- | --- |
| `.codex/config.toml` | New owner-only development overlay; absent before activation. |
| `.git/info/exclude` | Appended a comment and `/.codex/config.toml`; original bytes retained for rollback. No index or source staging changes. |
| `.sep2-desktop-evidence/` | Added candidate, plan, before/after snapshots, generated installed protocol schema, validation results, and guarded rollback helper. Added an internal `.gitignore` containing `*`, covering all evidence including itself. Prior evidence contents preserved. |
| `../docs/environment-separation-sep2-overlay-checkpoint.md` | This English checkpoint. |

Active configuration SHA-256:

```text
a5f6483aa272a05abd524d4c1d85b738d71ac1cf6366a6a94695089da7fe40c5
```

Before activation, the destination was checked absent, the candidate hash was checked, and the Git exclusion file was compared against its captured original bytes. Scoped sandbox escalation successfully created only the development configuration and extended its local Git exclusion. No automatic approval rejection occurred. Configuration is 0600; its new directory and the evidence tree are 0700, with evidence files 0600. Git confirms both the configuration and evidence are ignored.

## Disabled and retained capabilities

- Seven exact user MCP IDs are disabled: `computer-use`, `moneyforward-accounting`, `live-agency-operations`, `creator-scouting`, `creator-scouting-invitation-history-write`, `lark-creator-networks`, and `lark-flair`. Hyphenated registration IDs are distinct from underscore-normalized tool namespaces.
- `node_repl` and `openaiDeveloperDocs` registrations are retained byte-for-structure in the offline merge. The former is a general local runtime; it is not itself proof of browser isolation.
- Apps are disabled through `features.apps = false`, `[apps._default].enabled = false`, and explicit denies for 13 locally discovered connector IDs. These include known business connectors, workspace-agent connectors, publishing, plugin management, templates, and connected-document control. No connector was called for discovery.
- Twenty-one exact plugin identifiers are disabled, covering current business connector, browser/native, and Sites registrations plus corresponding observed cache identities. The configured `openai-curated` identity and observed `openai-curated-remote` identity are handled separately; cache presence is not assumed to mean installation. Plugin MCP overrides also disable the observed `computer-use`, `cua_repl`, and legacy `github` server names.
- 122 unique Skill folder selectors disable user business/Lark registrations, their operational symlink destinations, and observed business/browser/publishing/plugin-management Skill cache paths. This includes the currently absent-from-catalog weekly expense Skill. Every selector resolves to an existing folder containing `SKILL.md`. These are registration denies, not edits to any Skill.
- Browser default access, uploads, downloads, full CDP access, and history access are denied. Native-app default access is denied. No explicit origin or macOS bundle-ID allow entries existed in the inspected user layer; there was therefore no such allow to overwrite. Future explicit allows or higher-priority host settings require re-evaluation.
- Hooks, remote plugin discovery, Skill MCP dependency installation, and shell snapshots are disabled. Login shells and shell-profile use are disabled. Core environment inheritance preserves ordinary local coding; automatic secret-name filtering is enabled. The inherited browser-client trust environment setting is explicitly cleared in the project layer, without copying its value.
- Local shell/unified execution, local files and Git, local Node, official documentation MCP, ordinary web tools, local image viewing, and general artifact Skills remain available by configuration intent. Documents, PDF, presentations, spreadsheets, template-creator, visualize, and desktop app tools are retained. Apps being disabled also removes connected-document functionality; local artifact work is retained. The system OpenAI Docs, Skill, and plugin authoring tools are not indiscriminately removed.

The inactive proposal was not copied verbatim: general `node_repl` was retained, environment inheritance changed from `none` to `core`, inherited explicit environment injection was addressed, browser history was denied, and plugin/app/Skill coverage was completed for the observed inventory.

## Supported behavior and validation

The official [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) specifies Skill **folders containing `SKILL.md`**, not a requirement to point at the file. Folder selectors are therefore retained. The installed Skill selector schema accepts absolute path selectors; actual catalog removal remains a fresh-task check.

The official [configuration precedence](https://learn.chatgpt.com/docs/config-file/config-basic) puts trusted project layers above selected profile and user layers, with command/session overrides above projects. Untrusted projects skip their project layers. App defaults can be overridden per app; browser/native defaults can be overridden by explicit origin/app policy. Consequently the overlay uses explicit observed app/plugin denies as well as defaults. Empty tables would not establish removal of inherited map entries. Plugin MCP settings and app settings are separate control planes; neither plugin discovery being disabled nor a disabled legacy computer-use MCP proves direct CUA absence. Managed restrictions cannot be relaxed through local browser/native policy.

Validation completed without starting an app server, model subprocess, business MCP, or business service:

1. Parsed candidate and active TOML with Python; active bytes match the reviewed candidate and hash.
2. Generated the protocol JSON schema offline from the installed application binary, Codex CLI **0.153.4**. Used the existing local Ajv dependency to validate app/browser/native policy structures and all 122 Skill selectors against its relevant schemas.
3. Passed candidate loading through the installed `features list` configuration parser. Negative type checks confirm that the installed parser recognizes plugin enablement, plugin MCP enablement, MCP enablement, Skill lists, browser/native policies, and environment inheritance.
4. After activation, ran `features list` **without configuration overrides** from the development checkout. Apps, hooks, remote plugin discovery, shell snapshots, and Skill MCP dependency installation resolve false; shell tools and unified execution resolve true.
5. An explicit offline user-plus-project recursive merge resolves all seven MCP, 21 plugin, 13 app, and 122 Skill denies; retained MCP structures are unchanged. This is a static resolution check, not a desktop effective-config RPC or authenticated execution test.
6. Ordinary non-login execution, `pwd`, Git top-level resolution, local Node, and parsing the existing synthetic SEP-2 fixture all pass. Fixture values were not printed. No nested sandbox probe or unrelated test suite was run.

`--strict-config` is not supported by this installed CLI's `features` command; that attempted read-only validation exited 1 and is retained as evidence. The protocol schema is not a complete strict `config.toml` schema, so no full strict-schema pass is claimed. The ordinary parser and applicable generated schemas passed. CLI invocations also reported inability to create PATH aliases inside protected host storage; execution continued successfully without changing the sandbox or requesting host writes for those aliases.

## Production and source preservation

This package's before/after snapshots are identical: **11** selected configuration/instruction/schedule hashes (including **five schedule files**), **45** user Skill registrations with symlink destinations and Skill hashes, and **445** selected tracked operational source-file hashes. No secret values or raw production configuration were copied into evidence. MCP IDs and plugin enablement structures were captured separately from secret-bearing fields.

Historical comparison against the preceding desktop evidence finds the development AGENTS.md and package manifest unchanged, but the **global configuration hash differs from that older checkpoint**. The differing global hash was already present in this package's pre-activation snapshot and remained unchanged afterward. Only the historical hash is available here, so the cause cannot be attributed or declared approved. Exact historical/current hashes are in owner-only evidence. Coordinator reconciliation is required; this package does not assert a full SEP-0 reconciliation or operational health. No attempt was made to restore the older global configuration.

Existing development dirty work and staged/unstaged distinctions were preserved: no source implementation edits, resets, staging, commits, installation, global Skill registrations, Profiles, credentials, schedules, or existing tasks were changed. Prior checkpoint documents remain intact.

## Residual host authority and acceptance limits

- This task's injected tools and Skill catalog may be stale. Current tool presence or file contents do not prove fresh-task enforcement. Do not call business tools to test their absence.
- Desktop task creation/messaging/handoff, automations, navigation, usage/account controls, workspace runtime loading, and other host-injected tools may remain. No supported project-local per-tool deny for those host-owned surfaces was established. They are retained as general desktop capabilities; cross-task and scheduling actions still carry operational relevance and must remain unused for integrations under the development instructions.
- Project configuration cannot override the documented host-owned provider/auth routing, notification, profile-selection, telemetry, or app-request metadata keys. This overlay changes none of them. Browser/native preferences maintained outside the inspected config layers and higher-priority session/managed settings have not been reconstructed.
- Same-user filesystem read access, Keychain/session ownership, local executables, and core environment inheritance are not a confidentiality or credential-isolation boundary. Skill removal does not prevent manual reading of files. Core inheritance does not create a dedicated identity. The retained Node runtime and general shell must not be used to bypass denied browser/business routes.
- Inventory-based Skill/MCP/plugin denies do not automatically cover new registrations or new cache versions. Apps have a feature-level/default restriction, but actual host enforcement and any host-owned exception must still be observed. Integrations remain disabled and fixture-only.

If fresh verification still exposes production authority, the coordinator must establish a separately configured supported host boundary before integrations are enabled, consistent with separation-plan section 4. This package does not establish that a separate OS identity is always required or that the present desktop is isolated.

## Rollback and fresh-task brief

The owner-only `overlay-rollback.py` removes the new project configuration only if its hash still matches this checkpoint and restores the Git exclusion file only if its exact post-activation bytes still match. It stops on conflicting edits. Run it through scoped approval for the protected paths when rollback is authorized; do not execute it as part of acceptance. It retains all evidence and this checkpoint. No production restoration is needed for this package.

Coordinator's next action: create a **separate new local task in the existing saved development project**, directly in the registered checkout, and give it this checkpoint. Do not resume/fork this task as proof of a refreshed catalog. This is the supported next verification action; no forced app quit or change to other sessions is required by the evidence collected here. If the fresh task remains stale, report that result and establish the supported reload action before attempting it.

Expected fresh checks:

- Actual cwd and Git top level equal the saved development checkout; development AGENTS.md applies.
- No inherited Lark/business MCPs, business connectors, CUA/browser/native plugin tools, or business/Lark/Canva/Drive/Sites/plugin-management Skill entries. Check exact names and origins using the injected catalog only; do not invoke those tools.
- Official documentation, ordinary local shell/files/Git/Node, and general local artifact capabilities remain. Enumerate residual desktop controls separately rather than treating their presence as either automatic failure or proof of safe isolation.
- Non-login `pwd`, Git top-level resolution, a harmless Node command, and synthetic fixture JSON parsing return exit 0. Confirm the overlay hash and project-loaded feature settings.
- Reconcile the historical global-config hash difference before whole SEP-2 acceptance. If any requested deny is absent or ineffective, retain evidence and keep integrations disabled.

Stop here: the next package belongs to the coordinator.
