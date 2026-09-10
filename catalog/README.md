# Versioned setup catalog

`catalog.json` is declarative selection data, independently versioned from Runtime.
The current versioned release is `0.1.0-m3.0`, using format version 2. It selects
TikTok platform `0.1.0-m3.0`, Profile Skill `2.0.0-m3.1` and Lark Base
`1.4.0-m3.0` with both Profile read and write capabilities. Runtime
`2.0.0-m3.0` supports their separate configuration references. These fixed versions
were privately published and adopted in the designated Work environment through
the [recorded production plan](../docs/reviews/profile-production-adoption-ja.md).
Actual business acceptance remains separate from installation.

The previously deployed `0.1.0-m2.1` catalog remains published as an
[immutable release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m2.1).
It selects the compatible scoped Profile history read correction from Lark Base
`1.4.0-m2.1`, for the existing Runtime `2.0.0-m2.1`. The earlier `0.1.0-m2.0`
catalog remains available in its immutable release. Format 2 prevents the M1 Runtime from
silently ignoring these service bindings. The published format-1 catalog
`0.1.0-m1.0` remains unchanged in its immutable release.
The catalog lists identities and neutral bindings; Provider packages own
detailed configuration schemas, normalization, authentication and instructions.
Choose a `platformId` and private configuration references when selecting a
service with bindings. The Profile read/write bindings require different
Provider schemas: use `configurationRefs` keyed by their two capability names.
Runtime pins each digest while preserving one database choice. The earlier
single `configurationRef` form remains valid for services sharing one schema.
A selection is not connection proof.

The TikTok declaration is in `platforms/tiktok/package.json`. Profile is now an
available installation choice and requires observation, datastore read and
datastore write capabilities. The recorded publication and adoption establish availability of this fixed composition;
the declaration itself does not prove service authentication or business acceptance.
No credentials, actual resources or browser sessions belong here.

Before publication, verify the selected platform archive and dependent registry packages. Publish the platform privately through the approved GitHub Actions route, then publish the JSON as a versioned catalog release. Preserve the catalog bytes/digest and chosen package versions in the environment. Do not replace an already released catalog version or treat the moving main branch as an installation lock. A new catalog release can add another compatible platform without changing Runtime.

The catalog's source association is the existing private parent repository. There is no new catalog service or package registry. Runtime reads an explicitly supplied catalog file; the operator retrieves its chosen versioned release using authorized access and checks its recorded digest. Normal execution uses the saved environment and does not fetch the catalog.

The current catalog release was retrieved and matched SHA-256 `3f6f48e8e43c66df97733c2296fe4ea44b80f2d5b08e62601fdb423df81f6f48`. The release API reports `immutable: false`; this process pins version and bytes without claiming platform-enforced immutability.

The Profile repair retains the same capability, binding and contract versions.
The consumer supplies `creatorRecordIds`; the private Provider translates those
IDs into a server-side search and confirms each attachment against its issued
record. The saved Provider read selection must explicitly include
`records:search` and `records:batch-get`. A new fixed package, configuration digest
and installation plan are required; changing this catalog does not update an
existing environment. The [Japanese deployment review](../docs/reviews/v2-platform-environments-ja.md)
records the selected scope, deployment evidence and remaining acceptance.
