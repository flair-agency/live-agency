# Architecture and responsibility boundaries

Status: canonical index of adopted responsibilities. Scope: project-wide boundaries; implementation and deployment readiness are owned by [migration status](../migration/status.md). The [business model](../domain/model.md) owns business meaning and identity.

## Adopted responsibilities

Skills own business tasks, judgments, normalized input/output and acceptance conditions. Creator Scouting and Creator Management are separate bounded contexts, exposed through independent MCP processes with distinct lifecycle, destination, credential and audit identities. Accounting and expenses remain outside both creator-domain MCPs. Gift history is cross-domain; membership transition crosses domains after authoritative membership confirmation. Observation continues after membership; its consumer and storage purpose change.

MCPs expose bounded domain operations. The transitional `live-agency-operations` acquisition MCP is not the final creator-domain boundary. Relationship-changing actions require a separately launched action surface; public read acquisition does not gain follow/message/invitation/gift authority.

Providers own service-specific acquisition, mutation, normalization and versioned knowledge. Independent TikTok iOS, TikTok Web and BackStage Bindings remain separate repositories. Lark Base remains Base-specific; Chat and any future Docs Binding own their own service contracts. Drivers provide generic execution mechanisms. Shared libraries own only the contract or implementation common to their consumers; repository consolidation is not required.

Runtime selects and connects concrete implementations and pins compatible versions. Source repositories own implementation history; package manifests and lockfiles own distribution composition. Proposed package subdivisions or dependency inversions are not adopted through this documentation cleanup. The [package revision](../reviews/npm-package-architecture-revision.md) and [architecture roadmap](../reviews/live-agency-mcp-roadmap.md) retain unresolved proposals.

## Authority and information

Each protected access binds one environment, organization, service, resource scope, domain, authority and Principal. Missing or ambiguous selection stops. No ambient identity, cross-organization, User/Tenant or unverified API/browser fallback is allowed. Operation support does not grant an instance authority. Scouting and Management processes do not share credentials across their boundary; exact dedicated-App decisions remain subject to effective service controls and their own contract.

Public Skills consume normalized neutral data; private Providers/profiles own service-specific formats and operating knowledge; credentials and real data remain in private storage. The [Private Source Integration Guide](../governance/private-source-integration-guide.md) is the single information-handling authority.

## Owning specifications

| Subject | Owner |
| --- | --- |
| Capability/domain assignment | [Capability inventory](capabilities.md) |
| Registry, scope, visibility, publisher | [Distribution direction](distribution.md) |
| Runtime deployment and actual configuration interfaces | [Deployment](../../provider-runtime/docs/deployment.md), [configuration](../../provider-runtime/docs/configuration.md) |
| Lark Principal/token selection | [Lark core contract](../../provider-runtime/packages/lark-core/docs/principal-selection.md) |
| Lark Base table/field concept mapping | [Base Provider model](../../provider-runtime/providers/lark-base/knowledge/data-model.md) |
| Conversation operations | [MCP contract](../../provider-runtime/mcp/live-agency-operations/docs/conversation-message-contract.md) |
| Neutral backup capability API | [source-provider-api](../../provider-runtime/skills/live-agency-skills/packages/source-provider-api/docs/backup-capability-contract.md) |

The prior [repository reorganization record](../archive/repository-reorganization-plan.md) retains package-placement options, evidence and release reasoning. The [migration plan](../migration/v2-plan.md) owns dependencies and release gates, not this architecture index.
