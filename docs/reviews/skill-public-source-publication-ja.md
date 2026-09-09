# Skillソース公開の承認・実行記録 — 2026-09-09

所有者はこの一覧に対し「承認します」と回答。全18 SkillのPublic設定と承認SHAのremote保存、およびMCPの指定作業ブランチへの保存を再読取で確認済み。mainへの統合・パッケージ公開・本番変更は行っていない。以下は承認時の対象記録。

公開先はすべて flair-agency 組織。以下の18リポジトリーを対象とする。公開対象は表のcommitと、その祖先履歴（Git管理ファイル）。ローカル未追跡ファイル、実行証跡、認証情報、ProviderやRuntime実装は含めない。既存3件はPrivateからPublicへ、新規15件は作業ブランチで作成する。パッケージ公開・mainへの統合・本番変更は対象外。公開後は第三者による取得・複製が可能になる。

| リポジトリー | 操作 | 承認対象commit |
| --- | --- | --- |
| `flair-agency/live-agency-coin-purchase-expense-reconcile` | Publicとして新規作成・作業ブランチをpush | `bc918faf4c31c07d1ad658a32365491ac4e9d835` |
| `flair-agency/live-agency-creator-assessment-update` | Publicとして新規作成・作業ブランチをpush | `c1eec152160415988e4acbc0a62675716566e626` |
| `flair-agency/live-agency-creator-invitation-eligibility-history-deduplicate` | Publicとして新規作成・作業ブランチをpush | `1124404fae597c65fc6d18abe515fe94b740a057` |
| `flair-agency/live-agency-creator-invitation-eligibility-record` | Publicとして新規作成・作業ブランチをpush | `821b6e479f8e989006b359ffeabd23798a4328c3` |
| `flair-agency/live-agency-creator-live-metric-history-prune` | Publicとして新規作成・作業ブランチをpush | `05fb561f06498affef00510dfb62074efd41112b` |
| `flair-agency/live-agency-creator-live-observation-record` | Publicとして新規作成・作業ブランチをpush | `83cebdf27052475fde97d1d52ac8460183390080` |
| `flair-agency/live-agency-creator-live-session-history-prune` | Publicとして新規作成・作業ブランチをpush | `29550df4844ac08e98bca7559d14fd3f9c64fa57` |
| `flair-agency/live-agency-creator-monthly-activity-reconcile` | 既存Private → Public | `86c2f70f95002ac54c679bc83b36eecede69e0f6` |
| `flair-agency/live-agency-creator-profile-history-prune` | Publicとして新規作成・作業ブランチをpush | `cf924c78a28fe295f81b1f186ff56397eeff692f` |
| `flair-agency/live-agency-creator-profile-record` | 既存Private → Public | `82ccb406e934ea30b207167090e12b306739f419` |
| `flair-agency/live-agency-data-backup-create` | Publicとして新規作成・作業ブランチをpush | `4babc90d21d53631ff0217faf8eca0f8bf8ec4ce` |
| `flair-agency/live-agency-data-backup-retention-plan` | Publicとして新規作成・作業ブランチをpush | `4517e076d245800d802d46e82b466d3a894b5296` |
| `flair-agency/live-agency-data-recovery-test` | Publicとして新規作成・作業ブランチをpush | `71a1a7718bad8a31663a230e2f3325bfe1349cb7` |
| `flair-agency/live-agency-datastore-maintain` | Publicとして新規作成・作業ブランチをpush | `f8442deefa6e6e28c8b9f5349489639676376e9e` |
| `flair-agency/live-agency-foreign-currency-receivable-settle` | Publicとして新規作成・作業ブランチをpush | `b3462ca7bfc6811a1c918c094a589c72584353b5` |
| `flair-agency/live-agency-foreign-currency-revenue-recognize` | Publicとして新規作成・作業ブランチをpush | `b883c59efa249f260d84d6baf5e98b1fc509c6b2` |
| `flair-agency/live-agency-gift-history-merge` | 既存Private → Public | `8d797472a55cecd9c2d3e77254f60f03d943ad6a` |
| `flair-agency/live-agency-weekly-coin-expense-claim-submit` | Publicとして新規作成・作業ブランチをpush | `de52e31f2361500f51c726098eae45c87a786bc9` |

既存Skill16件の履歴と現行全Skillの公開内容検査を実施済み。外貨売上2件の履歴も追加検査済みで、同じ検査項目への該当なし。テストデータは合成、実環境値の格納は禁止。配布依存にPrivateパッケージがあるため、ソース公開だけで匿名インストールが可能になるわけではない。

初回の公開処理は明示承認不足として自動承認レビューに拒否された。所有者がこの一覧を明示承認した後、対象SHAが不変であることを確認して公開し、visibilityとremote SHAを再読取した。

## 既存公開MCPのソース同期

機械ローカルのbundle参照を既存の `flair-agency/live-agency-operations-mcp` に置き換える。公開済みmainは変更せず、`codex/source-reconciliation-20260909` に `2eb5ac8d680912a009188b73858ee10cb537fa1c` と祖先履歴をpushする。履歴128 blobの追加検査で秘密・実環境pattern該当なし。これを含めた承認対象は19リポジトリー（Skill18＋MCP1）。

既存3パッケージのregistry visibilityは現在のGitHub認証にread:packages権限がなくAPIが403となり、独立した再確認はできなかった。パッケージ公開・設定変更は実行していない。ソースvisibility確認とは区別する。
