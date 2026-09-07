# Private source guide migration checkpoint

> Status: Historical evidence; not current instructions or present operational verification. Current work: [migration status](../migration/status.md).

## Current status — operational deployment complete

On 2026-09-07 JST, the owner directly approved the prepared three-document diff
in coordinator task `01a07748-30d5-7b53-a4aa-c40fe8d0c342`. Normal scoped
filesystem review permitted execution. The coordinator revalidated unchanged
before-images and the canonical blob, created the operational English static
copy, appended the exact operational reorganization note, and only then replaced
the Japanese full text with the approved compatibility redirect.

Readback verified all three proposed byte sequences, matching development and
operational English SHA-256
`436599830a7d3fa955d1241b1056db9555b83e1f6aa1227d3fc5ad4199700769`,
and the redirect's operational target. Generated Work instructions, development
instructions/guide, both active Git indexes and HEAD files remained byte-identical
to the fresh preflight. Existing document ownership and modes remained unchanged.
Receipt: `tmp/guide-migration-20260907/operational-deployment-approved.json`.
Original Japanese bytes and canonical archive/bundle remain retained in that
generation. The legacy pathname remains as compatibility, not full policy text.
No source, schedule, registration, publication or application execution was part
of deployment. The previous write-approval block is resolved for these three
completed effects; no broader authority is inferred.

## Historical preparation checkpoint (superseded deployment status)


2026-09-07 JST. Development migration and local repository ownership are complete. Operational deployment and replacement of the Japanese document are **pending filesystem approval**, not completed. The automatic approval reviewer rejected the external-write operation before execution because it did not accept the delegated approval record as authorization for writes outside this candidate. No rejected operation was retried indirectly.

Receiving coordinator: `01a07748-30d5-7b53-a4aa-c40fe8d0c342`; original coordinator: `01a07222-c325-72d1-a87a-be1975317794`. Migration task: `01a07745-6f52-7b81-97ba-efbddf7c001b`. No new tasks or subagents were created.

The attempted handoff message to the receiving coordinator was also rejected by automatic approval review: it did not accept authorization to disclose the internal paths/revisions to that destination. No handoff delivery is claimed; this local report remains the handoff artifact.

## Change card

- Primary D, supporting G: governance-document migration, with no capability or authority change.
- Protected boundary: cross-component governance ownership and instruction reference resolution.
- Invariants: preserve all normative meaning, project-instruction precedence, approval and fail-closed contracts; keep synced sources, active v2 source/index/settings, operational code, profiles, schedules, and registrations untouched.
- One outcome: meaning-preserving English canonical revision, static development/operational copies, original Japanese evidence, consumer resolution, and exact rollback. The operational part is still pending.
- Next gate: approval for the three concrete external document writes described below, followed by freshness and readback checks. Publication and npm cutover remain separate.
- Verification: section coverage, exact example comparison, isolated commit diff and bundle restoration, reference resolution, and excluded-path hash comparison. No application tests or live calls.
- Parallel work: none. Policy selection is Astra/low; no model-setting change is claimed.

## Ownership and publication boundary

The Runtime root owns cross-component governance under the reorganization plan. Its package declares `private: true`; the development origin is a local SEP-0 bundle, while the operational origin names the Runtime GitHub repository. These facts support local placement but do not establish remote access classification or authorize publication. No network, fetch, push, package publication, global installation, or registration operation occurred.

The canonical translated revision is committed in an independent local archive of the existing Runtime repository, not a new governance repository. Neither active checkout's HEAD, refs, or index was changed. The archive has no origin remote and no object alternates; cloning used `--no-hardlinks`. Existing configured author identity was used, with signing and hooks disabled.

Evidence directory, outside the old Work parent:

`/Users/naokikimura/workspace/live-agency-provider-runtime/tmp/guide-migration-20260907`

This candidate-local ignored location was used after the request to write the designated development runs directory was rejected. Retain it before replacing this checkout. All evidence directories are 0700 and files 0600; same-user processes are not isolated by those modes. This is local preservation, not an off-host backup. The previous `tmp/work-project-preservation-20260906T150009Z` generation was not edited or reused as a mutable archive.

| Artifact | Exact revision |
| --- | --- |
| Canonical source | `archive.git`, branch `codex/private-source-guide-migration-20260907` |
| Guide commit | `34940aa930f4e2ba0cfaca260ca746912dd0ce6f` |
| Parent Runtime commit | `6b1f11c17cec53f2adcce5fd88b87666c322f859` |
| Original Japanese SHA-256 | `aff71a8bb80872450b8ab23a0b09e884d55d2393453f66209551f3a5743f571e` |
| English guide SHA-256 | `436599830a7d3fa955d1241b1056db9555b83e1f6aa1227d3fc5ad4199700769` |
| `guide.bundle` SHA-256 | `a7d9e79ab569bf28463b57775c1ebac4258f756d2045ebbc038b6b03751ebe89` |

The commit changes exactly `../docs/governance/private-source-integration-guide.md`. Its message retains source-revision provenance. The development guide is an exact static working copy of that committed blob; it is not committed to the active branch. The development instruction/index/report edits are working-copy changes, not part of that canonical commit. Future integration must select these explicit paths without importing active v2 changes or independently editing the deployed translation.

## Translation coverage and review

The complete Japanese source was read and its supplied hash revalidated. The translation follows its sequence without introducing a policy preamble. Every normative paragraph, list item, example and exception was compared during translation review. Structural counts provide an additional mechanical check, not a substitute for semantic review: 10 sections, 3 responsibility subsections, 5 numbered principles, and 41 bullet items match. The fenced JSON example is byte-identical.

| Japanese source section | English section | Retained coverage |
| --- | --- | --- |
| Purpose | Purpose | Authenticated portals, uncertain contractual publication scope, BackStage example, public/private separation |
| Basic principles | Basic principles | All five prohibitions/requirements, including no guessed schema or update after identification/conversion/matching failure |
| Responsibilities: public Skills | Separation of responsibilities / Public Skills | Seven duties and six exclusions, including API updates, readback and audit |
| Responsibilities: private profiles | Non-public source profiles | Seven duties; no arbitrary code from configuration; only approved public-side generic transformations |
| Responsibilities: data storage | Real-data storage | Restricted Google Drive example; no Git storage |
| Common input | Common input format | Unmodified JSON; six optional audit fields; separation from business fields |
| Profile operation | Operating source profiles | Unique ID/version, append versions, zero/multiple-match stop, no similar-profile guessing, synthetic-only tests |
| Manual input | Manual input | Current-month pasted input is no exception; private normalization; all four required confirmations before update |
| Browser integration | Browser integration | Private local acquisition; explicit permission, stop conditions, authentication/CAPTCHA handling; acquisition and destination authority remain distinct |
| Credentials | Credentials | Keychain or environment secret management; all five prohibited recording destinations |
| Update safety | Safety conditions for updates | All eight conditions; immutable IDs where possible; separate creation/deletion authority; no immediate resend of uncertain communication |
| Review | Review checklist | All seven checks before publication or update, including Git history and no implicit permissions |

The public/private division agrees with `skills/live-agency-skills/docs/provider-architecture.md`: source-specific parsing/knowledge remains private, normalized contracts remain public, and real data/secrets remain outside source repositories. This migration does not rename legacy source profiles into Instance Profiles or collapse Provider Binding/knowledge/version contracts. The original generic keychain wording is retained as policy text; development AGENTS still forbids ambient credential fallback. The guide creates no execution authority and does not override project instructions. No permissions were added or removed; normative changes require a separate reviewed decision.

## Exact changes and active consumers

Completed development files:

1. [English guide](../governance/private-source-integration-guide.md): new static committed-source copy.
2. `AGENTS.md`: only the guide title and absolute path changed; the rest of the freshly read file is preserved.
3. [Repository reorganization plan](repository-reorganization-plan.md): appended migration status/reference, preserving prior historical text.
4. This migration report.

Candidate-local preparation helpers are under ignored `tmp/guide-migration-tools/`; owner-only before-images, manifests, raw index copies, staged/unstaged patches, archive, bundle, restored checkout and proposed deployment are under the evidence directory. They are not application source or installed execution assets.

The development AGENTS reference resolves directly to its own regular English file. Work-root AGENTS declares itself a generated mirror whose content may be replaced. It remains byte-for-byte unchanged, including full-read requirements and project precedence. Its legacy title still resolves to the full original Japanese file. Operational English deployment has not occurred; do not claim two deployed hash-equal copies or completion of Work reference migration.

Bounded reference search covered development instructions/docs, operational docs, installed Skill metadata under `~/.codex/skills` and `~/.agents/skills`, `~/.codex/automations` TOML/JSON/Markdown and `~/.codex/config.toml`. No installed metadata matches were found in that bounded search. Synced sources, private data, dependencies, scratch, old task histories and Git internals were not searched as active consumers. This does not prove that no unknown consumer exists.

Historical observations remain intact in the source-preservation report, instruction-audit checkpoints, SEP-2 checkpoints, and M2U task-plan snapshot citations. Existing coordinator ledgers and worker-owned handoffs were not rewritten. Their original reads are provenance, not new canonical routes. The reorganization status points to this checkpoint without rewriting those records.

## Concrete deployment pending approval

Only these three external document writes are proposed, in order:

1. Create Work Runtime `../docs/governance/private-source-integration-guide.md` from `proposed/operational-guide.md` and verify it equals the committed blob and development file. It must be a regular static file, not a symlink.
2. Append the prepared successor reference to Work Runtime `../docs/repository-reorganization-plan.md`; retain any concurrent unrelated edits.
3. Only after step 1 and reference resolution pass, replace Work-root `非公開ソース連携スキル設計ガイド.md` with `proposed/legacy-redirect.md`.

Work is `/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2`; its Runtime is `Work/live-agency-provider-runtime`. The exact before/after proposal is `proposed-deployment.diff` in the evidence directory. Generated Work AGENTS and synced `sources/` are excluded from the proposal.

The proposed redirect retains the old Japanese heading for generated title lookup and points to the operational English copy, so Work resolution has no dependency on mutable development code. It is explicitly non-authoritative. Its removal criterion is verified migration of generated instructions plus bounded installed/older-consumer checks showing the old title/path is unnecessary. Unknown older consumers currently justify retaining compatibility. **At this checkpoint the full Japanese original remains; no redirect was deployed and no old pathname was removed.**

No npm manifest or installer was changed: current support is explicit local static documentation deployment. Future npm/host cutover must include this required guide and verify instruction resolution in the clean installed environment. Existing package metadata does not establish that future distribution is complete, and public Skills must not gain private governance content through this migration.

## Verification and rollback

- `git bundle verify` passed; an independent checkout restored the exact recorded commit and English blob. Its diff against the parent contains only the guide path.
- Structural translation checks and JSON identity passed. Manual semantic review preserved all listed conditions, examples and exceptions.
- The immediate before/after SHA-256 comparison passed for 1,180 excluded file/Git/settings entries. A later final recheck detected changes in 10 excluded entries after that passing comparison, including active development source/Skill documentation/inventories and the Codex configuration hash. These files were not written by this migration; the changes' authorship and semantics were not investigated or reverted. Exact hashes/paths are in `final-excluded-drift.json`, distinct from the empty immediate `excluded-drift.json`. Do not claim a final unchanged host/source state. Both raw checkout indexes still match their before-images. Raw development and operational indexes, staged/unstaged patches, and refs are retained. The manifests include nonignored source and relevant child repositories; this is a focused check, not whole-host or whole-programme forensics.
- The Work guide and generated Work AGENTS still match their exact before-images. The prepared operational guide equals the English canonical blob, but is not an operational deployment.
- No source-preservation archive, operational source/configuration, dependency, schedule or registration was modified. No application tests or external calls were necessary or performed.

`before-images.json` records original paths, SHA-256, uid/gid, modes and observed timestamps. `before-00` preserves Japanese bytes; `before-01` preserves Work AGENTS; `before-02` preserves development AGENTS; `before-03` and `before-04` preserve development/operational reorganization documents. Evidence copies use restrictive permissions; original metadata is recorded separately.

To roll back the completed development changes, first verify no subsequent edits: reverse only the title/path substitution in development AGENTS, remove this package's appended status from its reorganization plan, and remove the new guide/report if unchanged. Preserve concurrent edits; never overwrite whole live documents from old before-images blindly. Neither active Git index nor HEAD needs restoration. Retain the canonical bundle and original evidence until coordinator acceptance.

For a future approved operational deployment, revalidate the Japanese hash and operational reference before-image before replacement, then record fresh after-images. Rollback restores `before-00` bytes at the Japanese path, restores its recorded mode/timestamps, removes the exact appended operational note, and removes the new operational guide only if it still matches this revision. Generated instructions remain untouched throughout. Review ownership/metadata differences explicitly before any restore.

## Next package

After the pending document deployment is resolved, perform one bounded unused-directory audit of Work-root nonrepository `tools`/`spikes`/legacy Skill source candidates: inventory exact paths, owners and active references; preserve any unarchived source in restricted evidence; propose one reversible removal set with per-path hashes and rollback. Do not delete siblings, dependencies, operational state or the old Runtime merely because source was preserved. Whole Runtime retirement remains gated by verified package cutover.
