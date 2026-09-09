# Lark利用Skillの依存版整合

2026-09-08。所有者の「次へ進み、確認が不要なら1時間継続」の指示に基づく作業記録。

変更カード：主分類G（採用済み開発依存との宣言整合）。対象はLark Provider 1.0.0を残す7Skillのpackage.jsonと親lockfileの対応エントリ。Provider→Skill逆依存を再導入せず、業務コード・契約・実行対象・権限・既存インストールは不変。完了条件は1.2.0宣言の一致、固定版配布物の確認、対象所有者と直接統合テスト、ローカル候補の依存・資源検査。次のゲートは正式名・配布版・導入対象を選んだ公開／インストール受入。並列なし。各manifestとlockfileの今回差分を戻せば復旧でき、既存dirty差分とindexを維持する。

現行開発Providerは1.2.0。前作業で1.0.0配布物のintegrityを確認し、旧月次Skillへの依存を検出した。今回は既に開発環境で使っている1.2.0へ宣言を揃え、旧月次Skillを追加して1.0.0を維持する手段は採らない。歴史的な1.0.0検証receiptは保持する。

7宣言とlockfileを1.2.0へ更新。registry配布Providerのintegrityを検証し、旧月次Skill依存がないことを確認した。各Skillソースを一時コピーし、registry Provider＋既存の固定版開発依存で所有者テスト（LIVE指標は親所有の4件）を実行、全7候補が成功した。7つのローカル候補archiveのmanifestとlockfileも一致。既存インストール変更、公開、正式版番号変更はない。間接依存は開発コピーのため、完全なregistry-only導入受入とは扱わない。機械記録は `tmp/v2-project/hour-registry-compatibility.json`、`hour-candidate-archives.json`。

## 一時利用側での導入検証の選択

続くローカル検証として、更新候補7archiveだけを明示選択した一時利用側プロジェクトを作る。目的はregistry由来の間接依存まで含む解決と実行の検証で、正式リリース受入やホスト登録ではない。`/private/tmp/` の専用新規root、既存npmのcredential設定、`--ignore-scripts`、利用側lockfileを固定した `npm ci` を選択する。業務接続は呼ばず、インストール済みコードへ合成テストharnessを当てる。元の開発node_modules・元のSkillディレクトリ・本番設定は不変。一時rootを除去して復旧できる。名前・正式配布版・本番切替の未確定条件は維持する。


一時利用側では候補7archive＋registryの間接依存（合計21packages）をlockfileへ固定し、`npm ci --ignore-scripts` が成功した。別置きの合成harnessから導入済みコードを実行し、88件成功。旧月次Skillは依存グラフに存在しない。これにより開発コピーの間接依存に頼った段階を越えて検証したが、正式名・公開版・実サービス受入は別のまま。導入rootとlockfileのSHA-256は `tmp/v2-project/hour-installed-tests.json` に記録した。

親lockfileの最終照合では、対象7Skill配下に旧Provider 1.0.0と旧月次Skill 1.0.0の不要なnestedエントリが残っていたため、その14エントリだけを除去した。別選択のlegacy MCP依存は変更しない。全workspace manifestとlockを新規一時rootへコピーし、npmのoffline・scripts無効のlock再解決が成功、生成結果と親lockの全内容が意味的に一致した。稼働／開発node_modulesは変更なし。記録は `hour-parent-lock-check.json`。
