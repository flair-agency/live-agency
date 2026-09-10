# Versioned setup catalog

`catalog.json` is declarative selection data, independently versioned from Runtime.
The current `0.1.0-m2.1` candidate uses format version 2 and is unpublished.
It selects the compatible scoped Profile history read correction from Lark Base
`1.4.0-m2.1`, for the existing Runtime `2.0.0-m2.1`. The earlier `0.1.0-m2.0`
catalog remains available in its immutable release. Format 2 prevents the M1 Runtime from
silently ignoring these service bindings. The published format-1 catalog
`0.1.0-m1.0` remains unchanged in its immutable release.
The catalog lists identities and neutral bindings; Provider packages own
detailed configuration schemas, normalization, authentication and instructions.
Choose a `platformId` and private `configurationRef` when selecting a service
with bindings. Runtime pins the configuration digest and preserves the chosen
service independently for each platform. A selection is not connection proof.

The initial TikTok declaration is in `platforms/tiktok/package.json`. Profile remains pending M2/M3 integration, so it cannot be selected as an available workflow. A catalog entry does not prove registry availability, service authentication or business readiness. No credentials, actual resources or browser sessions belong here.

Before publication, verify the selected platform archive and dependent registry packages. Publish the platform privately through the approved GitHub Actions route, then publish the JSON as an immutable catalog release with its own version. Preserve the catalog bytes/digest and chosen package versions in the environment. Do not replace an already released catalog version or treat the moving main branch as an installation lock. A new catalog release can add another compatible platform without changing Runtime.

The candidate's source association is the existing private parent repository. There is no new catalog service or package registry. Runtime reads an explicitly supplied catalog file; the operator retrieves its chosen immutable release using authorized access. Normal execution uses the saved environment and does not fetch the catalog.

The Profile repair retains the same capability, binding and contract versions.
The consumer supplies `creatorRecordIds`; the private Provider translates those
IDs into a server-side search and confirms each attachment against its issued
record. The saved Provider read selection must explicitly include
`records:search` and `records:batch-get`. A new fixed package, configuration digest
and installation plan are required; changing this catalog does not update an
existing environment. The [Japanese deployment review](../docs/reviews/v2-platform-environments-ja.md)
records the selected scope and remaining acceptance.
