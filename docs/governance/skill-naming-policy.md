# LIVE Agency Skill Naming Policy

- Status: Reviewed naming policy; no rename batch is adopted by documentation organization. Proposed migration remains in the review index.
- Created: 2026-09-05
- Scope: Existing and future Skills in the LIVE agency business collection, including business, shared operational, and necessary technical maintenance Skills.
- Purpose: Define stable naming, responsibility, and repository-boundary rules independently of current skill names or a particular migration version.

## 1. Governing principles

The abstraction represented by this skill collection is the LIVE agency
business. Classification starts from the work and its meaning, independently
of the operating company, implementation service, or current filename.

Use `live-agency` as the namespace. An operator name such as `flair` or an
implementation technology such as `lark` does not define the business skill
collection. Public or private repository placement is also separate from the
skill name.

Use existing names only to identify migration sources. They do not establish
the new naming rules. Apply the same rules to every skill and consider
responsibility splits, consolidation, and extraction into non-Skill components
alongside renaming. There is no requirement to preserve a one-to-one mapping.

## 2. Identifier syntax

Use `live-agency-<business-or-operational-subject>-<action>`.

- Use lowercase ASCII letters, digits, and single hyphens. Leading, trailing,
  and consecutive hyphens are prohibited.
- Use 1–63 characters. This is a project convention, not a specification of
  every host's naming limits.
- Keep the skill directory name and the `name` in `SKILL.md` identical.
- Put the action last. Add only the subject qualifiers needed to distinguish
  the intended task from neighboring tasks.
- Standardize subject vocabulary in the domain glossary. Do not mechanically
  prepend the owning MCP name or copy current table names.
- Use `scouting` or `management` only when they distinguish business meaning.
  If the same profile observation continues after membership, it does not need
  a different observation skill name.
- Include a period such as `monthly` when it changes the aggregation or claim
  unit. Execution weekdays, scheduling frequency, and batch sizes belong in
  configuration.
- Keep `v2`, `new`, `latest`, `private`, `public`, and device names out of
  functional identifiers. Manage contract versions, execution environments,
  publication status, and development status separately.
- Include a technology in the subject only when an independent skill directly
  operates that technology. `live-agency-lark-base-capacity-assess` is an
  illustrative name, not a decision to create that skill.

`live-agency` is a business-domain namespace that reduces collisions, not a
globally reserved identifier. Other implementations and forks in the same
domain can still collide. A name alone must not identify a distributed skill.
Installation must associate the name with its provenance, source path, and
pinned revision, and detect identical names from different sources. Do not
silently overwrite or choose between them. Evaluate host-qualified plugin
names separately from the `name` of a standalone skill.

A display name may describe the task in Japanese. Changing display names does
not resolve identifier collisions. The `description` should identify the
subject, input, completion conditions, and major exclusions to reduce semantic
competition during implicit selection.

## 3. Action vocabulary

| Action | Responsibility | Boundary |
| --- | --- | --- |
| `observe` | Acquire observations | Does not promise persistence in business history |
| `record` | Record facts or observations as history | Does not include general editing or deletion of past history; specify replay reconciliation and confirmation-time updates for unchanged states in the contract |
| `update` | Update current business values from evidence | Distinct from acquiring observations or managing history retention |
| `reconcile` | Match evidence or records, establish discrepancies, and prepare proposed changes | State whether application is included in the description and authorization boundary |
| `merge` | Integrate partial input into an existing master | Does not imply deletion of records absent from the input |
| `prune` | Select history or generations not retained by policy and handle approved deletion | Distinct from physical layout optimization or lossless compression |
| `deduplicate` | Remove redundancy established by the contract | Distinct from sampling or discarding different historical states |
| `create` | Create a specified artifact | Define whether an equivalent existing artifact may be reused |
| `restore` | Recover a target from stored artifacts | Distinguish production recovery authority from isolated testing authority |
| `test` | Execute a test and produce measured verification results | Instructions or a plan alone do not establish completion |
| `assess` / `review` / `plan` | Produce an assessment, review, or plan | The name does not promise production changes |
| `submit` | Submit the specified claim or application | Distinguish saving a draft from completed submission |
| `maintain` | Assess a defined target's health and coordinate and verify applicable maintenance | Must not become an umbrella for arbitrary administration |

`sync` and `compaction` are not prohibited, but prefer the more specific actions
above when they express the actual behavior. Names do not grant authority.
The request, target scope, contract, and existing authorization conditions
determine what may execute.

## 4. Classification and repository placement

| Layer | Decisions and processing it owns | Source placement |
| --- | --- | --- |
| Business Skills | Recording, assessment, reconciliation, and business-information retention decisions | Public `live-agency-skills` |
| Shared operational Skills | Protection scope, recovery requirements, retention, maintenance planning, and verification | Public `live-agency-skills` |
| Technology-specific implementations and necessary technical maintenance Skills | Service constraints, recognition, and concrete acquisition, restore, or maintenance methods | Corresponding private Provider repository |
| Runtime composition | Provider selection, pinned versions, and organization-specific operational composition | Private Runtime; live-environment information follows the existing owner-only boundary |
| Production data, secrets, and execution evidence | Backup payloads, credentials, live identifiers, runtime plans, and related artifacts | Managed storage outside Git |

Technology-specific implementations remain in Providers even when the task
originates from a nonfunctional requirement. Maintenance introduced by a
technology constraint can still belong to the shared operational layer when
its contract and decisions are technology-neutral. The origin of a requirement
does not by itself determine the visibility of an entire skill, and reusable
logic does not make organization-specific configuration public.

A shared maintenance contract describes the target resource, health and
capacity, supported operations, effects on logical data, execution conditions,
expected benefits, and result verification. It does not require every Provider
to support the same maintenance operations. Internal resource reclamation or
reorganization and business-history deletion are different effects. Capacity
pressure must not let a Provider decide the business history retention policy.

Before adopting a technology-neutral name, align the instructions, input
contracts, code, tests, and dependencies with that boundary. Having only one
implementation is acceptable. Evaluate whether replacing it would require
rewriting the public Skill's decision procedure. A generic name must not claim
support for services that have not been implemented.

## 5. Conformance and change management

Review the identifier, display name, description, instructions, executable
code, input/output contracts, dependencies, and delivered capabilities together.
A syntactically valid name alone does not establish conformance.

Keep development and deployment states such as frozen, prototype, implemented,
and active separate from names. Renaming does not activate a workflow or expand
its inputs, outputs, authority, supported services, or publication scope.

Existing names do not constrain naming design. Migration execution must still
preserve live operations through explicit source-to-target mappings, reference
updates, provenance checks, verification, and rollback. Do not grant authority
or change scheduling frequency as a side effect of a rename.

Distinguish Skill identifiers from versioned capability and contract identifiers.
Names embedded in saved plans or receipts may be bound to hashes and audit
evidence. Preserve historical artifacts; use explicit compatibility handling
when contracts change. Compatibility references must not create duplicate
implicit selection or duplicate execution of the same task.

## 6. Document ownership and references

This policy owns the rules. Current source inventories, candidate names,
responsibility splits, dependencies, rollout order, and migration exit criteria
belong in the [Skill naming and migration plan](../reviews/v2-skill-naming-and-migration-plan.md).
Update that plan when implementation status changes; do not turn the policy
into a progress log or a legacy-name mapping.

- [Domain model](../domain/model.md): the business vocabulary and invariants that names must represent.
- [Provider architecture](../../provider-runtime/skills/live-agency-skills/docs/provider-architecture.md): public contracts, private implementations, and production data outside Git.

The parent project's `AGENTS.md` and the read-only project source titled
“Private-source integration Skill design guide” remain applicable. This policy
does not supersede canonical-source or publication decisions.
