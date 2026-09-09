---
applyTo: "**/*.md"
---

# Documentation review

Read docs/governance/document-knowledge-policy.md and
 docs/governance/document-language-policy.md for documentation changes. Read
 docs/governance/private-source-integration-guide.md in full when reviewing
 authenticated-source or publication-uncertain Skill material. These files own
 the rules; this instruction supplies review routing, not a competing policy.

For Skill documentation, assess the package and its reading route, not SKILL.md
in isolation. Check whether a qualified reader can identify responsibility,
business purpose and rationale, upstream/downstream work, inputs and outputs,
decisions, verification, stopping conditions and human takeover. Follow relevant
supporting references; do not require a README or fixed file layout.

Check that flow diagrams agree with the accompanying procedures and preserve
approval boundaries and unknown-outcome branches. Do not mistake the presence
of a diagram for evidence of human understanding. Point out missing workflow
explanation when it materially prevents following or taking over the work.

Check the distinction between completed, unprocessed and uncertain operations,
and whether recovery requires readback before retry. Do not propose a manual
write fallback that bypasses the selected contract or existing authority.

Check links and whether execution-required references are included in the
package distribution. Identify actual missing resources rather than assuming
submodule contents or external/private documents are accessible.

Keep neutral public Skill knowledge separate from private source UI, schemas,
credentials and real evidence. Flag inconsistent terminology, unsupported
completion claims and conflicting duplicated rules. Preserve Japanese owner
review drafts and English adopted canonical text under the language policy.

Human comprehension and operational takeover remain human acceptance checks.
AI review and automated tests alone do not establish them. Review drafts against
applicable adopted policy while describing proposed additional criteria as
proposals, not as already binding requirements.
