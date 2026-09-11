# Versioned setup catalog

`catalog.json` is declarative selection data, independently versioned from Runtime.
The current source candidate is `0.1.0-m3.4`, using format version 2. It selects
TikTok platform `0.1.0-m3.3`, Profile Skill `2.0.0-m3.3` and Lark Base
`1.4.0-m3.4` with both Profile read and write capabilities. Runtime
`2.0.0-m3.0` supports their separate configuration references. These candidates
are not published or adopted in production merely because this file changed.

The previously adopted catalog `0.1.0-m3.2` remains available as an
[immutable release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m3.2).
The earlier `0.1.0-m3.1` remains available as an
[immutable release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m3.1).
The earlier `0.1.0-m3.0` remains available as an
[immutable release](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m3.0).
The earlier `0.1.0-m2.1` catalog remains published as an
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
datastore write capabilities. This describes the source candidate; it does not
prove registry availability, service authentication or business acceptance.
No credentials, actual resources or browser sessions belong here.

Before publication, verify the selected platform archive and dependent registry packages. Publish a changed platform privately through the approved GitHub Actions route; reuse its existing release when unchanged. Publish the JSON as an immutable catalog release with its own version. Preserve the catalog bytes/digest and chosen package versions in the environment. Do not replace an already released catalog version or treat the moving main branch as an installation lock. A new catalog release can add another compatible platform without changing Runtime.

The catalog's source association is the existing private parent repository. There is no new catalog service or package registry. Runtime reads an explicitly supplied catalog file; the operator retrieves its chosen immutable release using authorized access. Normal execution uses the saved environment and does not fetch the catalog.

This candidate selects two adopted Provider corrections: TikTok Web 1.1.1 for
avatar acquisition and complete/incomplete attempt evidence, and Lark Base
1.4.0-m3.4 for field-typed create/readback comparison. The latter keeps Transport
1.1.3. Runtime 2.0.0-m3.0, Profile 2.0.0-m3.3, CLI 1.0.93, capability contracts
and selected service configuration remain unchanged. See the
[Japanese release and adoption review](../docs/reviews/profile-avatar-readback-adoption-ja.md)
for archive evidence, retained recovery and the proposed Work verification.
Publication, installation and business acceptance are distinct checkpoints.

The currently adopted catalog
[0.1.0-m3.3](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m3.3)
and its [write-diagnostic release record](../docs/development/profile-write-diagnostic-adoption.md)
remain available. Published catalog assets follow the no-overwrite policy and
pinned digest verification; the existing release does not have GitHub native
release immutability enabled.
