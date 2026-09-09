# Formal distribution direction

The adopted monthly architecture uses `@flair-agency/contracts` from
`packages/contracts/` (repository `live-agency-contracts`). Skill and Providers
independently depend on its `./monthly-activity` interface. Runtime composes
implementations using execution-scoped tsyringe registration after asynchronous
selection and validation; Skills and Providers never resolve container entries.
The [revision gate](../migration/v2-plan.md#neutral-contract-revision-gate) and
[approved Japanese review](../reviews/v2-foundation-design-ja.md#14-中立contractへの設計変更レビュー)
record ownership and compatibility. Provider-owned contracts described below
remain the released baseline for capabilities outside this first monthly slice.

Status: adopted. Implementation and release evidence are owned by [migration status](../migration/status.md).

| Decision | Adopted direction |
| --- | --- |
| Namespace | `@flair-agency` |
| Registry | GitHub Packages |
| Initial registry package visibility | Private; later public transitions decided per package |
| Owner / publisher | Flair organization / GitHub Actions |
| Contents | Independently managed libraries, Providers, Skills and Runtime; Skill instructions/resources are package contents |

The [approved foundation design](../reviews/v2-foundation-design-ja.md) supplies the current package names and public interfaces. Runtime composes fixed versions; Providers own capability contracts and Skills consume them. Skills retain business rules; Providers have no dependency on Skill packages. Release common libraries, Providers, Skills and finally the Runtime composition in dependency order. An npm `private: true` flag prevents publication and is distinct from GitHub package visibility. The development root remains nonpublishable.

Source associations must reflect actual owning repositories and adopted child commits. GitHub Packages does not itself require a new repository per package. Mirroring the approved independent source repositories into GitHub is a separate concrete source-management action. Existing Runtime/Provider repositories have been found; missing independent Skill/library repositories require the source association decision recorded in the foundation review. Do not push a private component into the historical public Skill monorepo by inference.

`tools/m1-distribution.mjs` verifies selected package archives and an exact isolated deployment manifest/lock. Internal packages must resolve to the selected archives; approved exact third-party dependencies are integrity-bound to the existing lock/cache. These offline checks are distinct from registry publication/retrieval. `tools/templates/m1-publish.yml` is a preparation template, not an installed or executed workflow; owning source retrieval, dependency locks and cross-repository Actions permissions must be completed before dispatch.

Real configuration, credentials, source exports and execution state remain outside Git. Initial private visibility does not change the public Skill information boundary.

## Source repository visibility and synchronization

Owner clarification, 2026-09-09: business and shared operational Skill source
repositories are public. The initial private registry-package decision above
does not make their source repositories permanently private. Providers and
organization-specific Runtime composition remain private. Review Skill content
and Git history before public creation or visibility changes; record any pending
publication explicitly. Public source does not imply that private package
dependencies can be installed anonymously.

Keep coherent development checkpoints on remote work branches under the
[development synchronization policy](../governance/development-policy.md#local-and-remote-source-synchronization).
Branch publication, default-branch integration, registry release and production
activation are separate states. Source naming and repository association can be
completed before live workflow acceptance. The adopted source identities and
remaining synchronization state are recorded in `tools/m1-source-repositories.json`
and [the reconciliation record](../reviews/repository-reconciliation-ja.md).
