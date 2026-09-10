# Versioned setup catalog

`catalog.json` is declarative selection data, independently versioned from Runtime. The initial candidate is `0.1.0-m1.0`, format version 1. It is not a published release. It lists platform package identities, suggested fixed versions and optional database/storage Providers. Platform manifests own capability bindings and Skill availability; Provider packages own their detailed settings and instructions.

The initial TikTok declaration is in `platforms/tiktok/package.json`. Profile remains pending M2/M3 integration, so it cannot be selected as an available workflow. A catalog entry does not prove registry availability, service authentication or business readiness. No credentials, actual resources or browser sessions belong here.

Before publication, verify the selected platform archive and dependent registry packages. Publish the platform privately through the approved GitHub Actions route, then publish the JSON as an immutable catalog release with its own version. Preserve the catalog bytes/digest and chosen package versions in the environment. Do not replace an already released catalog version or treat the moving main branch as an installation lock. A new catalog release can add another compatible platform without changing Runtime.

The candidate's source association is the existing private parent repository. There is no new catalog service or package registry. Runtime reads an explicitly supplied catalog file; the operator retrieves its chosen immutable release using authorized access. Normal execution uses the saved environment and does not fetch the catalog.
