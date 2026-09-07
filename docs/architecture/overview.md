# Architecture and responsibility boundaries

Status: canonical index of adopted responsibilities. Scope: project-wide boundaries; implementation and deployment readiness are owned by [migration status](../migration/status.md). The [business model](../domain/model.md) owns business meaning and identity.

## Adopted responsibilities

Skills own business tasks, judgments, normalized input/output and acceptance conditions. Creator Scouting and Creator Management are separate bounded contexts with distinct execution authority, destination, credential and audit identities. Those boundaries do not depend on MCP as the transport. Accounting and expenses remain outside both creator-domain MCPs. Gift history is cross-domain; membership transition crosses domains after authoritative membership confirmation. Observation continues after membership; its consumer and storage purpose change.

MCPs are external protocol adapters for application operations: they register tools, adapt requests/results and delegate to consumer-owned interfaces. Business decisions, service implementations and Provider selection belong to their owning consumers, Providers and Runtime. The entire transitional `mcp/operations` package is deferred from required v2 deployment; selected paths may use existing CLI entry points or a minimal MCP adapter. Required behavior is preserved and moved to its owners rather than discarded. The [adopted MCP treatment](../migration/v2-plan.md#adopted-treatment-of-operations-mcp) owns scope and verification. The transitional `live-agency-operations` acquisition MCP is not the final creator-domain boundary. Relationship-changing actions require a separately launched action surface; public read acquisition does not gain follow/message/invitation/gift authority.

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
| Runtime deployment and actual configuration interfaces | [Deployment](../../runtime/docs/deployment.md), [configuration](../../runtime/docs/configuration.md) |
| Lark Principal/token selection | [Lark core contract](../../packages/lark-core/docs/principal-selection.md) |
| Lark Base table/field concept mapping | [Base Provider model](../../providers/lark-base/knowledge/data-model.md) |
| Conversation operations | [MCP contract](../../mcp/operations/docs/conversation-message-contract.md) |
| Neutral backup capability API | [source-provider-api](../../packages/source-provider-api/docs/backup-capability-contract.md) |

The prior [repository reorganization record](../archive/repository-reorganization-plan.md) retains package-placement options, evidence and release reasoning. The [migration plan](../migration/v2-plan.md) owns dependencies and release gates, not this architecture index.
