# Formal distribution direction

2026-09-07 JST. Owner supplied the conversation “正式配布設計の整理”
(`6a9da09a-1364-83e8-af7c-9e32be036040`) in response to the pending distribution
choice. Coordinator read the full bounded conversation and adopts the user's
stated choices as design direction, not the other assistant's operational claims.

| Decision | Adopted direction |
| --- | --- |
| Package namespace | `@flair-agency` |
| Registry | GitHub Packages |
| Initial visibility | Private; later public transition individually reviewed |
| Ownership | Flair GitHub organization (`flair-agency`) |
| Publication actor | GitHub Actions under organizational ownership |
| Payload | Skill itself joins npm lifecycle; first representative target is full `coin-expense-reconcile` with its required libraries/resources |

Runtime composition, individual Skills, shared libraries and private Providers
retain separate responsibilities. Existing `@live-agency-skills` library names
need an explicit dependency/import migration; do not apply a global replacement
or assume aliases/old published packages exist. Target leaf names
`source-provider-api`, `private-runtime-files`, and `coin-expense-reconcile` are
concrete planning candidates under the adopted scope. Final versions, repository
association and exact manifest layout must be established from source evidence.

Initial private distribution does not mean package.json `private: true` is a
registry visibility control; keep nonpublishable development roots distinct from
intended publishable artifacts. No current scope rights, repository privacy,
package availability or Actions permissions have been verified. Do not infer
credentials, token scopes or publisher authority from a conversation example.

Public/private eligibility follows the authoritative governance guide and actual
contents, not a package's name. In particular, private-runtime-files is not
necessarily confidential code and the generic coin Skill must not gain private
service data just because initial distribution is private. The earlier assistant's
package-specific visibility opinions are not adopted policy.

Accepted RLS-1/2/3 evidence remains synthetic instruction-route qualification,
not full-Skill payload/behavior or final named-package qualification. Reuse it
where inputs are unchanged; measure affected name/payload changes explicitly.


## Ownership and implementation status

This is the adopted distribution direction, not publication or activation evidence. Runtime owns [deployment design](../../runtime/docs/deployment.md) and the [concrete formal-distribution proposal](../../runtime/docs/reviews/formal-distribution-contract.md). The shared library owns [portable instruction resolution](../../packages/source-provider-api/docs/instruction-resolution.md). Current readiness is recorded only in [migration status](../migration/status.md). Package scope/registry/visibility/publication actor do not need a new decision; unapproved package restructuring remains a review proposal.
