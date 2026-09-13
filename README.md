# LIVE Agency

LIVE Agency owns the abstract LIVE agency domain model and use cases common to
platforms, intended for public source. Public Skills derive from that model and
its use cases. Concrete platform domain knowledge belongs in private repositories;
Provider source visibility depends on its contents. The
[knowledge ownership policy](docs/architecture/domain-knowledge-ownership.md)
defines this boundary. The current checkout also retains project composition
and mixed historical documentation awaiting separation; it is not yet cleared
for public release.

## Ownership and directory structure

Choose the owner first, then the file's purpose. Neither file extension nor the task that produced it determines ownership. Shared use does not transfer a specification away from its implementing component. Split mixed responsibilities and link their owners.

| Owner | Canonical responsibility |
| --- | --- |
| This parent repository | Abstract agency domain model and use cases, platform-independent requirements, architecture and governance |
| Private platform-domain owner | Concrete platform meaning and correspondence to the abstract agency model |
| `runtime/` | Composition, dependency resolution, startup, deployment and pinned component versions |
| Each Provider repository | Service-specific acquisition, mutation, formats and operating knowledge |
| Public Skill repository | Procedures, decisions, input/output and acceptance criteria derived from an agency use case |
| Each MCP repository | Domain operation contracts and their implementation |
| Owning library repository | Shared API, implementation and verification |

```text
live-agency/
├── README.md          # Overview, structure policy and canonical index
├── AGENTS.md          # Concrete agent instructions and policy references
├── docs/              # Project-wide requirements, architecture and governance
├── runtime/           # Runtime composition, startup and deployment repository
├── skills/            # One independent Git repository per Skill
├── providers/         # One independent repository per Provider
├── mcp/operations/    # Existing operations MCP repository
├── packages/          # Independently owned shared library repositories
├── tools/             # Shared development, packaging and verification tools
├── test/              # Cross-component tests and synthetic Provider fixtures
├── package.json       # Development workspace composition, not a Skill monorepo
├── package-lock.json  # Reproducible development dependencies
├── .codex/            # Local execution settings, excluded from Git
└── tmp/               # Ignored working output and explicitly retained copies
```

A reusable project-wide tool belongs in `tools/` only when its purpose, inputs and execution are portable. One-off recovery scripts belong with their recovery record; the existing STAB scripts are historical assets in `docs/archive/recovery-tools/`, not current tools. Historical evidence directories are not a standard project layout. Do not bulk-delete retained evidence merely because it is under a temporary directory.

Within a component, preserve established conventions: implementation in `src/` or its existing equivalent; tests and fixed inputs in its test area; human specifications in `docs/`; Skill instructions/resources in `SKILL.md` and `references/`; Provider knowledge in `knowledge/` and `instructions/`; non-secret configuration schemas/examples in the owning configuration area; build/test/release helpers in `scripts/`. Do not rename established `tests/` or `scripts/test-support/` solely for consistency. JSON specifications may belong in docs; test JSON belongs with tests, and reproducible scan output belongs in an ignored output area.

## Git, configuration and references

Source, canonical specifications, review proposals, reproducible test assets, non-secret examples and lockfiles belong in the owning repository. Credentials, real data, machine-specific settings, raw logs and temporary output do not. Retain necessary source revisions, verification conditions and conclusions as documentation.

The parent pins submodule commits; a pin does not include the child's uncommitted changes. npm manifests and lockfiles define the deployed package combination. Use project-relative references and name the command's working directory. Pass environment-specific inputs and outputs through supported explicit arguments/configuration; do not embed a developer's paths in shared procedures. Absolute paths remain valid explicit inputs. Preserve literal historical paths/hashes as evidence and record their relocation separately.

Move references, generation destinations, tests and required distribution resources together. A distributed Skill must not acquire an execution dependency on a document available only in this parent checkout.

## Document management

Prepare owner reviews in Japanese and adopt approved canonical documents in English, preserving approved meaning. The [language policy](docs/governance/document-language-policy.md) owns the details.

Each specification or rule has one canonical owner. Link it instead of duplicating its full text; brief summaries and safety conditions needed at the point of use may repeat. Keep canonical requirements/contracts, unapproved reviews, migration dependencies/exit criteria, current status, and historical verification records distinguishable. Use `docs/reviews/` for proposals and `docs/archive/` for retained history; create categories only when needed.

Consolidate content used by the same reader for the same decision. A completed task does not by itself justify separate plan, implementation and verification reports. Update the existing specification and status; create another document only for a distinct decision or necessary evidence. Label document status and scope, link successors, and never treat old next-action statements as current instructions. Do not promote an unapproved proposal or an old test pass into an adopted design or a present operational guarantee. Retain ended drafts in Git history unless continued evidence use justifies an archive. Record file-level dispositions and actual counts when reorganizing documentation.

## Canonical index

- [Skill catalog](skills/README.md): workflow summaries, relationships and links to all Skill repositories
- [Business and account model](docs/domain/model.md)
- [Architecture and responsibility boundaries](docs/architecture/overview.md), [capability ownership](docs/architecture/capabilities.md), [distribution direction](docs/architecture/distribution.md)
- [Development procedures](docs/governance/development-policy.md), [Skill naming](docs/governance/skill-naming-policy.md), [private-source integration guide](docs/governance/private-source-integration-guide.md)
- [Issue-based Skill maintenance](docs/governance/skill-maintenance-policy.md): production reports, development fixes, package releases and production verification, with normal and emergency workflow diagrams; [public maintenance board](https://github.com/orgs/flair-agency/projects/2/views/2)
- [Migration plan and decision status](docs/migration/v2-plan.md), [current status and applicable constraints](docs/migration/status.md)
- [Runtime](runtime/README.md) and [deployment design](runtime/docs/deployment.md)
- [Approved v2 review history](docs/reviews/v2-migration-plan-review-ja.md), [documentation review and execution record](docs/reviews/documentation-audit-ja.md)

The parent and its independent components are synchronized through GitHub work branches. The [distribution direction](docs/architecture/distribution.md#source-repository-visibility-and-synchronization) distinguishes intended source visibility from actual repository and package settings. See the [source inventory](tools/m1-source-repositories.json) for repository associations and pinned development checkpoints. Inspect changes in each owner (`git status`, `git -C runtime status`); uncommitted component changes are not included in the parent pins. Source synchronization does not imply default-branch integration, package release or production activation.

## Development checkout

The parent owns the development installation across independent Git repositories. Run `npm ci --ignore-scripts`, `npm test`, and `npm run check:public` from this directory. Workspace linkage is local development composition; each Skill has its own Git history and package manifest. Individual component tests run with `npm test` in that component after the shared development installation; synthetic Provider-discovery tests explicitly use `test/fixtures/installation/`.

The previous nested Runtime/Skills checkout is retained intact under `tmp/repository-restructure/runtime-before/`, excluded from Git. It is a preservation copy, not a second active source. Historical documentation and the documentation audit CSV retain their at-the-time paths. Current source locations are the sibling directories above.
