# Independent development instructions

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
