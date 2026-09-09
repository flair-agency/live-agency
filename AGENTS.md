# Development agent instructions

## Policies to read

- Apply the [document and Skill knowledge policy](docs/governance/document-knowledge-policy.md): preserve rationale and human takeover knowledge, with company originals as the source of authority.

- Prepare owner reviews and reports in Japanese; adopt approved canonical documents in English under the [language policy](docs/governance/document-language-policy.md).
- Apply the [development policy](docs/governance/development-policy.md) for change boundaries, explicit execution selection, verification and task composition. Consult [migration status](docs/migration/status.md) for scoped temporary constraints; historical checkpoints do not select current work.
- Before creating, changing or reviewing a Skill for an authenticated or publication-uncertain source, read the complete authoritative [Private Source Integration Guide](docs/governance/private-source-integration-guide.md). Report a missing guide or ambiguous applicability; do not invent or duplicate it.

## Work scope and existing changes

- Inspect `git status --short` in this repository and each affected component before editing. Preserve unrelated changes and the original staged/unstaged distinction. Select only owned changes for a checkpoint; update a submodule pin only when adopting a recorded child version.
- Treat synced `sources/` as read-only reference snapshots, never authoritative originals. Do not edit, move, rename or delete them.
- Follow the supplied scope and the relevant owning contracts. Do not infer operational authority from installed tools, ambient sessions, a design document or a synthetic test. Use the explicit selection and environment-change procedure in the development policy.
- Read necessary sections once per relevant revision; expand for a concrete gap or conflict. Keep mandatory full reads intact. Do not run historical recovery scripts as reusable development tools.

## Verification and reporting

- Verify changed links, test references and distribution resources when moving documents or fixtures. From the project root, the independent caller discovery/API-operation check is `node --test test/m2u-call-site-inventory.test.mjs`.
- Run focused tests appropriate to the affected owner; broaden checks when a changed contract, pin, release gate or unresolved failure requires it. Existing dependencies do not authorize installation or host registration.
- Review the scoped diff. Report the completed outcome, changed owners, actual checks and limits, remaining decisions and recovery path in the existing task record. Do not turn historical evidence into a current completion claim.
