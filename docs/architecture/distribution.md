# Formal distribution direction

Status: adopted. Implementation and release evidence are owned by [migration status](../migration/status.md).

| Decision | Adopted direction |
| --- | --- |
| Namespace | `@flair-agency` |
| Registry | GitHub Packages |
| Initial visibility | Private; later public transitions decided per package |
| Owner / publisher | Flair organization / GitHub Actions |
| Contents | Independently managed libraries, Providers, Skills and Runtime; Skill instructions/resources are package contents |

The [approved foundation design](../reviews/v2-foundation-design-ja.md) supplies the current package names and public interfaces. Runtime composes fixed versions; Skills own business contracts and Providers implement them. An npm `private: true` flag prevents publication and is distinct from GitHub package visibility. The development root remains nonpublishable.

Source associations must reflect actual owning repositories and adopted child commits. GitHub Packages does not itself require a new repository per package. Mirroring the approved independent source repositories into GitHub is a separate concrete source-management action. Existing Runtime/Provider repositories have been found; missing independent Skill/library repositories require the source association decision recorded in the foundation review. Do not push a private component into the historical public Skill monorepo by inference.

`tools/m1-distribution.mjs` verifies selected package archives and an exact isolated deployment manifest/lock. Internal packages must resolve to the selected archives; approved exact third-party dependencies are integrity-bound to the existing lock/cache. These offline checks are distinct from registry publication/retrieval. `tools/templates/m1-publish.yml` is a preparation template, not an installed or executed workflow; owning source retrieval, dependency locks and cross-repository Actions permissions must be completed before dispatch.

Real configuration, credentials, source exports and execution state remain outside Git. Initial private visibility does not change the public Skill information boundary.
