# v2 Remaining Work: Logical Changes and Minimal Context

- Status: Owner-approved execution refinement, 2026-09-05.
- Scope: Remaining v2 work; implementation and production status are unchanged.
- Purpose: Reduce repeated orientation and dispatch overhead while preserving business contracts, independent review where required, and all external authority gates.
- Classification: G, documentation and execution planning. No component code, credentials, schedules, installed routes or live data are changed by this refinement.

## 1. Evidence and limits

The usage investigation task `01a071dc-b3b4-7662-8cf6-f54aaa77542a` examined four completed workers and a fifth in progress. The completed four were Astra/low, with 307,065 uncached input tokens and 28,300 output tokens; 93.9% of total input was cached. It found repeated full handoff reads and implementation/review/connection orientation. Task lengths and questions differed; separate reviews sometimes resolved real business decisions. These observations do not prove that every split was wasteful.

The report is in that investigation task's outputs as `v2-usage-report.md`. It does not establish weekly-limit conversion factors, causal savings, or another model's superiority. This plan retains Astra/low and targets observed execution overhead first. Do not add a benchmark or another planning worker merely to apply it.

## 2. Grouping rule

One worker normally completes one accepted logical change: necessary specification confirmation, implementation, direct test changes, focused verification, diff review and a concise result. Include local producer/adapter/consumer wiring needed to prove that same outcome when the accepted contract, exact files and effects already cover it. Distinct component commits may remain separately reviewable without separate workers.

A separate package is justified by a different authority, unresolved material design decision, required independent review, unavailable dependency, conflicting checkout ownership or unreliable context. Name that reason in the existing brief. A heading such as implementation, test, review or integration is not a split reason by itself. Preserve specifically required independent reviewers and release gates; this is not permission to self-approve a protected action.

Existing milestone IDs remain coverage/checkpoint identifiers. Record which IDs a grouped result satisfies; do not mark an entire milestone complete because a subset passed. Completed work is not rerun or repackaged. At the next checkpoint, apply the grouping only to the remaining portion of an already-running package.

## 3. Remaining-work grouping and retained gates

The [current handoff](v2-task-handoff.md#4-next-work-package) owns the queue. This table defines grouping, not automatic authorization or a new priority order. Current-status observations below come from the checked-in/workspace checkpoint documents, not fresh live verification.

| Remaining family / coverage | One logical worker outcome | Entry evidence and necessary split |
| --- | --- | --- |
| Completed backup gate correction / CP1 | Normal authentication and byte/receipt integrity, explicit unknown-capability validation preparation, independent restoration/cleanup results, direct tests and local wiring | [Fresh local evidence](../provider-runtime/docs/backup-gate-local-correction-checkpoint.md): 159/159 synthetic tests. Existing dirty and pins preserved. No external test or activation. Do not dispatch this completed correction again. |
| M2U残るProvider/consumer / CP1 | 名前を特定したcaller familyの明示actor選択、対応/非対応ケース、必要な配線・関連回帰をまとめる | 完了済みcore/factory/gift/activity/attachment launcherを再実装しない。任意添付復元の完成と既存callerの選択契約適合は別。live検証は権限が変わる境界で分ける |
| M4 W2 / CP2 | 既知原因の取得修正・試験をまとめ、同一入力coverageとcandidate/preflightを整える | 20件比較済み、8件取得遮断とcandidate未生成。共有Principal個数制限の変更は未承認で判断を残す。別App必須をowner要件と断定しない。activation/apply/scheduleは各権限に従う |
| M4 W3–W6と必要なM3 write / CP2 | 既存workflow一つのdomain移行・必要なwrite・比較準備・IA-3必須指示・関連回帰 | W3合成準備済み。入力/write/backupなど実依存だけを先行条件とする。削除のexact plan/backup/承認/readback/rollbackは保持。新規継続調査等は§7 |
| M5既存activity / CP3 | 既存月次業務のdomain経路・write・比較と直接検証 | read基盤/launcherを再利用。M4全完了やM6追加機能は先行条件でない。新規cost/reward等は§7 |
| M2U-5、M7、IA-4 / CP4 | 最終coverage/指示/参照/必要fixtureを整え、確定pinでclean clone・isolated install・機能/full suiteを検証 | matching evidenceを再利用。個別運用・切替承認・rollback確認は維持。通常reviewを独立reviewer必須へ強化しない。工程名だけでworkerを分けない |
| Optional / migration-plan §7 | 添付復元、能力drill、M5追加機能、M6、M4I追加route、SN/FR/R、性能/文章改善 | 現行必須queueに入れない。再開時に具体的scopeと必要な権限を確認。完了済み証拠は保持する |

現在の次の成果は[handoff §4](v2-task-handoff.md#4-next-work-package)。manual exportのreceipt問い合わせは終了済みであり、再調査やhost保証供給を最初の依存に戻さない。詳細な必須根拠・完了条件・コード是正残は[移行計画§5](v2-migration-plan.md#5-migration-milestones)、後回しは[§7](v2-migration-plan.md#7-post-migration-improvements)に集約する。

## 4. Self-contained brief and reading contract

Use the [dispatch template](v2-task-execution-instructions.md#worker-brief-and-dispatch). Include accepted decisions, exact source sections, editable paths, permitted effects, inherited checks, required new verification, unresolved questions and done criteria. Default explicitly to `gpt-6-astra` / `low`.

The coordinator reads current state and supplies the relevant portion. The worker reads the specified sources once and expands only for a concrete gap, conflicting fact, changed revision or mandatory requirement. Do not prescribe a general full read of the handoff, migration plan and every design for each worker. Applicable AGENTS.md/Skill full-read requirements remain in force; brief summaries are not replacements for those requirements.

Return changed paths, test commands/results, material limitations and the next outcome. Link detailed evidence rather than copying raw exports, long successful logs or transcripts into another handoff. Update one current entry in place; label earlier next-action statements historical.

## 5. Verification and follow-up

For this documentation checkpoint, verify references, preservation of existing milestone outcomes/gates and the following desk cases:

| Case | Expected grouping / reading |
| --- | --- |
| Accepted adapter design plus direct tests and local consumer wiring | One worker if the named files/effects are already in scope; read relevant contracts once |
| Source of authentic authorization evidence is unknown | Retain an explicit decision/dependency gate; do not fabricate an implementation task |
| Code passes but an independent cutover review is required | Keep that independent review and approval; carry compact verified evidence |
| Plan or target file changed after initial read | Reread the affected section/diff; do not rely on a stale brief |
| Applicable instruction requires a full guide read | Perform the required read; do not bypass it for consumption savings |
| Existing package is running or already complete | Preserve it; regroup only remaining work at a verified checkpoint |

For the next two or three naturally occurring comparable packages, add a short observation to the existing checkpoint if usage metadata is readily available: actual model/effort, uncached and cached input, output with reasoning nesting respected, completed scope, retries and material rereads. Note concurrent account activity. Do not invent a weekly-percentage conversion or require a new monitoring system. If the burden is small or the grouping harms quality, adjust based on results.

This is a consumption-driven follow-up to completed IA-0–IA-2. IA-3/IA-4 and all live gates remain independently tracked. Roll back only this documentation diff if needed, preserving unrelated dirty work and later user changes.
