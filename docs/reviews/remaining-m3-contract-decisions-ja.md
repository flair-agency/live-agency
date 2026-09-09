# 残存M3の契約判断材料

2026-09-08。30分作業中に、[採用済み移行計画](../migration/v2-plan.md)の未解決点を現行ソースへ照合した。下記は判断材料であり、新名称・新契約・実行経路の採用や公開を行った記録ではない。変更分類G、読取りと合成入力による局所検証のみ。実データ・既存履歴・本番経路は変更しない。

## 招待可否の記録

2026-09-08、所有者は語彙として「招待可否」「スカウト対象判断」「招待種別」「招待状況」「所属状況」を承認した。採用済みの定義は英語の[業務モデル](../domain/model.md#11-adopted-scouting-vocabulary)を正とする。以下の「資格」は初回提案時の表現であり、今後の説明には「招待可否」を使う。今回の承認は語彙についてであり、以下の入力制限・旧履歴の扱い・正式Skill名の採用まで承認したものとは扱わない。

候補名は `live-agency-creator-invitation-eligibility-record`。現在のSkillは状態文字列と外部ID・表示名・画像の変化を履歴へ記録する。状態validatorは非空文字列を受け、宛先の現在の選択肢を実行時に照合する。Providerの現行Bindingは招待資格の観測を指定し、送信済み招待の進捗を結果として返すことを明示的に除外している。

したがって、名称変更だけで既存履歴の全状態が「資格」だったと解釈し直すことはできない。提案する判断順序は、①新しい入力を資格観測に限定、②旧状態を自動変換しない、③資格と送信後進捗が混在しているかを、別途選択する読取りで確認、④必要なら明示的な対応表と旧receipt読取りを設ける、である。実際の状態語彙・履歴の混在は今回未確認。

根拠：`skills/live-agency-creator-invitation-eligibility-record/src/contracts.mjs` の `validateInvitationObservations`、`scripts/invitation_state_core.mjs` の状態signature。送信・フォロー・メッセージを機能へ追加する判断ではない。隣接重複整理も同じ語彙境界を引き継ぐ必要がある。

### 招待contract方針の採用 — 2026-09-08

語彙承認に続き、所有者はLGTMで、①新規入力は招待可否のみとし送信後の招待状況を混ぜない、②見つからない・確認できないを招待不可へ置換しない、③既存履歴を保持し自動変換せず、意味の混在を確認して必要な移行案を提示する、という方針を承認した。[英語の採用済み境界](../domain/model.md#12-adopted-invitation-observation-boundary)を正とする。正式Skill名、実履歴の読取り対象、移行・公開・運用切替は今回選択していない。Projectは追加実装・検証のTodoへ戻し、M3完了とはしない。

## LIVEセッションの同一性

候補名は `live-agency-creator-live-observation-record`。現在のSkillはセッションと観測時点の指標の両方を記録しており、格納先が2つある理由だけでは分割しない。

同じ合成セッションを使ったvalidator検証で、**開始が同じ・終了だけ異なる2行を、現行Skillは別の開始／終了ペアとして受理し、旧MCPのdomain contractは開始重複として拒否する**ことを再現した。現行の宛先計画キーはcreator record ID＋開始＋終了、指標キーはcreator record ID＋観測時刻である。旧MCPへの切替は今回選択していない。

この再現後、所有者は開始時刻を同一性の基準とし、終了差を競合停止する案を採用した。[ローカル候補の実装と検証](live-session-identity-ja.md)が完了した。曖昧な同時開始を自動統合する実装は提案しない。既存履歴の移行、正規化済み入力、照合・再実行・訂正を同じ判断に束ねる。現行データにその事例があるとは断定しない。

再現物はignored `tmp/v2-project/live-identity-characterization.mjs` とJSON。根拠：`skills/live-agency-creator-live-observation-record/src/contracts.mjs`、`scripts/live_history_sync_core.mjs`、`mcp/operations/src/live-domain-contracts.mjs`。これは同一性の差の再現であり、旧MCP導入を新たなゲートにするものではない。

## 評価更新・プロフィール履歴の保持

評価候補 `live-agency-creator-assessment-update` は、根拠付きの現在評価と承認済みタグの更新に限定する。新しいタグ語彙・一般的な人物評価・観測の取得は含めない。承認不足・宛先の変更・更新応答喪失の追加4テストは成功したが、報告されていた実actor選択問題は未再現。実actorの確認はProvider／実行構成を明示選択した後に行う。

プロフィール履歴候補 `live-agency-creator-profile-history-prune` と指標候補 `live-agency-creator-live-metric-history-prune` は、保持する情報を先に確定する。現行の不完全値補完用代表は保持されるが、それがアカウント継続性の確認に必要な証拠をすべて保持するとは今回検証していない。既存の保持規則を勝手に弱めず、必要な証拠の定義と合成反例を追加する判断を残す。

## バックアップ・保持計画・復旧検証

| 対象 | 現在届けられるもの | 残る判断 |
| --- | --- | --- |
| バックアップ作成 | 手順と内容束縛receipt。単独の実行スクリプトはない | `live-agency-data-backup-create` の対象artifact・添付範囲と、実Providerの取得／保存／全量読戻しを対応させる |
| 保持計画 | `retention_plan.mjs` がowner-only計画を生成。ストレージ削除は呼ばない | 現在の届けられる能力を採るなら候補 `live-agency-data-backup-retention-plan`。削除まで含む `...-prune` を採るなら実行・直前照合・読戻し経路を完成させてから受入する |
| 復旧検証 | preflightと検証済みreceiptを構築する純粋関数。実復元はProvider手順 | 候補 `live-agency-data-recovery-test`。採用済み計画に合わせ、復元結果と後片付け結果を別々に表現し、receipt利用者との互換性を決める |

現行復旧Skillの `drill_core.mjs` は成功receiptに `cleanup_status: verified` を必須とし、参照文書も不確定な後片付けを失敗とする。一方、採用済み計画は後片付け成功をv2全体の必須ゲートにせず、復元と後片付けを分ける。**既存receiptの検証条件を単に緩める変更はしていない。** 出力契約と保持側の復旧参照保護を一緒にレビューし、旧receiptを維持したまま新しい結果表現を設計する必要がある。

保持計画の未使用の復旧Skill依存は今回ローカル候補から除去したが、`successful_drill_references_complete` と各artifactのドリル参照保護条件は変更していない。不要依存の除去は復旧参照を不要とする変更ではない。

## 次の選択に必要なこと

### 保持計画の範囲採用 — 2026-09-08

所有者はLGTMで、今回の受入を保持計画までとし、名称を `live-agency-data-backup-retention-plan` とする案を承認した。保持対象・削除候補・理由を提示し、最後の復旧可能なバックアップと復旧検証で保護された世代を候補から除外する。実ストレージの削除実行は別の実装・受入項目として管理し、承認・実行直前照合・結果確認を必要とする。正本は[移行状況](../migration/status.md#backup-retention-scope-approved--2026-09-08)。今回の記録はrename実施や公開、削除の実行承認、M3完了ではない。

上記のうち、コード修正だけで解決できる安全テスト・不要依存・配布文書は[準備記録](remaining-m3-readiness-ja.md)へ反映した。正式名と意味の変更、LIVE同一性、保持計画のみか削除までか、復旧結果の分離を採用する際は、対応する所有者の1つの変更パッケージとして実装・互換性・配布・導入検証まで進める。判断前に機械的な一括renameや配布を行わない。

## 採用済みになった判断

LIVE同一性は開始時刻基準・終了差競合停止を採用し、ローカル候補の実装／検証済み。外貨売上は[2Skill＋共有計算](foreign-revenue-m3-scope-ja.md)、復旧は[version 2の復元／cleanup分離](recovery-result-v2-scope-ja.md)を採用してローカル候補を検証した。上記の「判断が必要」は初回調査時点の記録であり、これらの決定を再度求めない。実Provider・正式release・運用切替のゲートは維持する。
