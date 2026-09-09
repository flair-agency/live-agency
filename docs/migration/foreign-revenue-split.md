# Foreign revenue migration boundary

Status: owner-selected local candidate design, 2026-09-08.

The owner selected two independent Skills with a shared neutral calculation
package in the [scope review](../reviews/foreign-revenue-m3-scope-ja.md).

| Owner | Responsibility |
| --- | --- |
| `skills/live-agency-foreign-currency-revenue-recognize` | Final normalized invoice and verified rate to a recognition plan |
| `skills/live-agency-foreign-currency-receivable-settle` | One normalized open receivable and JPY receipt to a settlement plan |
| `packages/foreign-revenue-core` | Shared validation, exact decimal arithmetic, deterministic semantic plans and hashes |

The Skills do not depend on each other. Each entry point fixes its operation
and rejects the other operation. The shared package retains Python Decimal
calculations behind a Node.js JSON-stdin bridge. Runtime requirements are Node
22+ and Python 3.10+. Decimal inputs are strings; JPY values and counts must be
safe JSON integers. Strict calendar dates, nonzero computed JPY values, bounded
input and exact decimal precision prevent malformed or lossy plans. These are
candidate validation constraints, not new accounting policy.

Providers own source acquisition/parsing, official rates and business calendars,
accounting lookups, stable destination mapping, writes and readback. Runtime
owns explicit Provider/profile selection, policy binding and monitor lifecycle.
There is no implicit profile fallback or inferred accounting capability from an
expense Provider. Planning success is not approval or registration.

Before an external write, require an explicitly selected operation and
execution binding, exact-plan approval, fresh evidence and an unchanged rebuilt
plan hash. A verified result must match the approved journal and, for settlement,
its imported-bank linkage. An uncertain write stops until bounded readback
reconciles it; it never permits an unconditional retry. Missing accounts or
partners are not created by this workflow.

The original operational Skill and monitors remain available and unchanged.
Local source candidates and temporary archive installations do not cut over any
caller. Remote repositories, final versions, parent pins, operational discovery,
Provider acceptance and per-workflow activation remain subsequent gates. The
new candidate manifests are private to prevent accidental publication while
those gates remain open. Monitor replacement needs an explicit lifecycle
handoff and retained existing IDs. Optional attachment recovery and unrelated
maintenance issues are not universal migration gates.
