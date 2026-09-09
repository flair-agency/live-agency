---
type: policy
visibility: internal
status: commit
date: 2026-09-09
author: "Naoki Kimura (owner direction); Codex (drafting assistance)"
context: "Project application of company document and conversational-AI principles; human understanding and substitution of Skill knowledge"
---

# Document and Skill knowledge policy

# Authority and purpose

This project applies the owner's company policies: [文書管理方針](https://docs.google.com/document/d/1JhoG5Qhg2R8vDQeXhRje37LpAM_8qJ-CjGb6GVRf2s4/edit) (retrieved 2026-09-09; source read before amendment 2026-09-09; owner-requested version-management amendment applied and read back) and [対話型AI原則](https://docs.google.com/document/d/1TgdV6Td4tN_aM8yETmn7CW3Cyys_TdKku0Y-32Jtk3o/edit) (retrieved 2026-09-09). These internal originals remain authoritative. This document applies the owner's explicit instruction to the project; it is not a verbatim export, replacement or amendment of either original.

Documents preserve meaning, context and reasons as external memory that people and AI can reread. A Skill must leave its knowledge understandable to a qualified human who can evaluate its result and, with the required authority and tools, perform or take over the work. Successful automated execution alone does not establish this property.

# Document identity, decisions and history

Each formal policy and log identifies type, visibility, status, date, author and context in its body before the title. Type expresses the document's role, not its subject. Visibility expresses intended readership and does not replace access control. Do not infer authority from a filename, folder or README; use explicit links between related documents and identify the governing text in the document itself.

Status expresses adoption of a judgment: commit means adopted, pending means undecided, and rollback means rejected. It is not Git commit status, publication state, task completion or archival immutability. Thought/event records without decisions do not acquire decision authority from a status label. Record the human adoption and the AI's assistance distinctly; do not infer an accountable author from generated text.

Keep adopted conclusions separate from alternatives, discussion and rejected proposals. Logs explain the canonical text and never silently override it. Preserve historical records and link corrections or superseding decisions; do not rewrite past evidence into current success. Create a separate log only for a material unresolved decision, a possible change to the canonical conclusion, or necessary future explanation. Canonical-document creation must not expand into unsolicited logs or redesign of the company policy.

Adopted formal logs include a next-action table with title, human assignee, due date (TBD if unknown), summary, completion criteria and relevant references. Do not invent an assignee or deadline. Keep implementation/migration actions in that table. The current task record may carry these fields; do not duplicate it solely to create another document.

# Human understanding and substitution

When creating, materially changing or accepting a Skill, provide an accessible route from its entry document to the following knowledge. Keep existing single-owner references instead of duplicating changing rules across files.

| Knowledge | What a qualified human must be able to explain or do |
| --- | --- |
| Purpose and boundary | Explain the business outcome, intended user, exclusions and when the workflow applies. |
| Inputs and terms | Identify required sources, field meanings, units, period, target identity and the checks needed before use. |
| Decisions and rationale | Reproduce matching, calculations, choices and exception handling; distinguish adopted rules, observed facts, hypotheses and unknowns; locate the basis and applicable version. |
| Procedure | Follow ordered steps with required tools and permissions, without depending on hidden chat history, one model or undocumented code behavior. |
| Outputs and verification | Recognize a correct result, compare expected effects with actual effects, and verify completion using evidence. |
| Failure and human takeover | Determine when to stop, what has already happened, what is uncertain, what evidence to preserve, who can decide, and how to continue or recover without blindly repeating writes. |

Provide representative synthetic examples, including a normal case and relevant exceptions. A manual route may use documented scripts or ordinary business tools; substitution does not require reimplementing software by hand. If a step cannot currently be performed without a specific automation, identify that dependency and the remaining human capability gap. Do not describe incomplete takeover coverage as complete.

At review, use the documentation and a representative example to check whether the intended human operator can explain the decisions, reproduce the result or follow the alternative procedure, and recognize stopping conditions. Record the actual check and its limits in the existing acceptance record. Automated tests and an AI's own assertion do not prove human comprehension. Existing technical acceptance remains historical evidence; this policy does not claim that every existing Skill has passed a human takeover exercise.

Humans retain purpose, value choices, final adoption and accountability. AI-generated recommendations remain subject to verification. Previously authorized bounded execution can continue under the development policy; this principle does not introduce repeated approvals for unchanged authorized actions.

# AI review before requesting owner approval

Owner direction, 2026-09-09: before asking the owner to review or approve AI-produced changes, the working agent reviews the scoped changes against the applicable project document policies and corrects deficiencies it can resolve within the authorized scope. This is part of preparing the work, independent of GitHub, Copilot, Actions or a separate AI reviewer.

Read the applicable policy sources and inspect the actual changed content, including relevant supporting documents. Check meaning and rationale, responsibility boundaries, human reading and takeover routes, terminology, adoption status and language, diagrams against their accompanying procedures, links and required distribution resources, and public/private information boundaries where applicable. Apply adopted rules and explicit owner directions; do not elevate unapproved review proposals into requirements. When the policy itself changes, compare the change with the prior authority and recorded owner direction rather than validating it solely against itself.

Fix supported findings before presenting the work. In the existing review or task record, briefly identify the policy basis, actual checks, material corrections and remaining uncertainties. State unavailable evidence explicitly. Present the owner with a concrete result and the business or policy decisions that still require human judgment; do not use the approval request as a substitute for the agent's own review. A self-review is not an independent review and does not establish human comprehension or authorize execution, publication or integration.

# Ownership and information boundaries

Public Skills document neutral business knowledge. Service-specific acquisition, authenticated procedures, schemas and troubleshooting remain with the owning private Provider, with discoverable references for authorized operators. Composition and installation details belong to Runtime/project documentation. Apply the [Private Source Integration Guide](private-source-integration-guide.md) without moving private knowledge into public repositories to make a Skill self-contained.

The company policy originals are internal. Their adoption here does not authorize publishing their full text, private evidence, credentials or company-specific procedures in public Skill repositories. Authorized humans must be able to locate the private companion knowledge necessary for takeover.

# Preservation and conversion

A requested format conversion or export preserves meaning, information and structural intent: no summarization, omission or reinterpretation. An explicitly requested summary or project application is a separate derived artifact and must identify its source and purpose. Check content fidelity separately from metadata, headings, tables and links. Markdown outputs follow the company heading convention: title and main sections use level one, subsections level two or below, without skipped levels; do not force line breaks inside sentences.

Archive is immutable historical retention, separate from the adoption status and from any particular folder/service. Keep source records intact. Inferred metadata is labeled as inference, with confidence, evidence and inference-engine version retained for audit. It cannot assign human responsibility or override a formal decision. Records lacking sufficient type/context remain data; preserve their access controls and backups. Low/unknown-confidence evidence requires human review before formal reliance. Archive custody, retention and escalation need explicit operating assignments; do not invent them here.

# Relationship to existing project policies

The owner's previously adopted [language policy](document-language-policy.md) continues to select English project canonical text and Japanese owner reviews. The [development policy](development-policy.md) governs code ownership, scoped execution and source synchronization. The new human-understanding requirement applies to subsequent Skill work and reviews; it does not perform a bulk rewrite or retrospectively assert compliance.

The owner adopted and requested the corresponding company-policy amendment: each document explicitly selects either Google Docs or a designated GitHub baseline branch as its canonical location. Google Docs uses revision history and named versions; GitHub uses the baseline text and commit history after PR review. The default baseline is main; any exception must be named in the document. Work branches and unmerged PRs are proposals. A copy identifies itself as a reference copy and links to the canonical location.

For this project policy, the canonical location is flair-agency/live-agency, branch codex/project-root, path docs/governance/document-knowledge-policy.md. Until this amendment is merged there, this work-branch text is a proposed implementation of the adopted owner decision. The company document-management original remains the linked Google Doc. This choice does not rename any branch or relocate existing documents. Existing project English naming follows the owner's language policy.
