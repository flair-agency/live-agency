---
type: deployment-review
visibility: internal
status: commit
date: 2026-09-11
author: "Codex（固定版配布・導入準備）"
context: "Lark Base Issue #9の認証診断を配布し、指定Workで限定読取を確認する"
---

# 認証診断の固定版配布とWorkでの読取確認

この文書は承認済みの日本語レビュー履歴として保持する。正本と実行結果は
[英語の移行状況・採用記録](../migration/status.md#historical-authentication-diagnostic-adoption--2026-09-11)
を参照する。以下の未実施・承認待ちの記述はレビュー時点の記録であり、現在の状態を示さない。

認証情報の取得で止まった場合に、Baseの列定義エラーと区別できる修正を配布する。
[Transport PR #5](https://github.com/flair-agency/live-agency-lark-transport/pull/5)と
[Provider PR #13](https://github.com/flair-agency/live-agency-provider-lark-base/pull/13)のソース採用は承認済み。
今回の変更はその配布版・依存・カタログと本番導入案であり、業務実装を追加しない。

| 対象 | 現行 → 候補 | 変更 |
| --- | --- | --- |
| Lark Transport | `1.1.1` → `1.1.2` | 承認済みの認証エラー分類と前処理の段階を配布 |
| Lark Base Provider | `1.4.0-m3.1` → `1.4.0-m3.2` | Transportを固定し、承認済み診断と操作知識を配布 |
| カタログ | `0.1.0-m3.1` → `0.1.0-m3.2` | Larkの選択版を更新 |
| 再利用 | Runtime `2.0.0-m3.0`、Profile `2.0.0-m3.2`、TikTok platform `0.1.0-m3.1` | 再配布不要。CLIも `1.0.93` を維持 |

# 対処と確認する範囲

この修正はKeychainアクセス権を変更しない。確認済みの実行環境差への対処は、ホストが提供する承認機構から、同じ固定環境・主体・対象の限定読取コマンド全体を実行すること。子CLIだけを昇格する仕組みは追加しない。ホストの承認が利用できない場合は停止し、権限や資格情報を変更して迂回しない。

失敗時は `LARK_CLI_CREDENTIAL_STORE_UNAVAILABLE` と `transportStage=auth-status` を保持する。この段階で失敗した試行はBase操作へ未到達である。`business-api` は要求処理の段階を示すだけで、サービスへの到達を証明しない。従来のAPI20008の有限回復は維持し、Keychain失敗は自動再試行しない。

指定Workの実際のタスクで、指定済み1アカウントの対象確定と履歴の限定読取を確認する。保持した入力が有効なら登録計画まで進める。業務登録・画像送信・新たな観測・スケジュール変更は含めない。Codex起点の成功だけをWorkの受入成功にしない。

# 配布・導入・復旧

1. 配布候補のマージ後、既存workflowでTransport `1.1.2`を非公開`latest`、Provider `1.4.0-m3.2`を非公開`next`へ順に配布する。実archiveとregistryのintegrityを比較する。既存platformの配布workflowは起動しない。
2. カタログを `catalog-v0.1.0-m3.2` の非公開リリースに保存する。既存リリースを差し替えない。
3. 配布済み固定版から新しい配置を作り、ProviderがTransport `1.1.2`・CLI `1.0.93`を解決することを確認する。設定参照・ダイジェスト・主体・保存先・既存操作許可を維持する。
4. 保存した変更案で入口3ファイルと既存Profile登録を切り替える。直前のハッシュ・登録先が変わっていれば上書きせず停止する。新generationと登録receiptは実インストール後に取得する。
5. Workで上記の限定読取を確認し、実結果と失敗段階を保存する。

```mermaid
flowchart TD
  A[固定版と導入案を承認] --> B[Transport・Provider・カタログを配布]
  B --> C[新配置と固定依存を検証]
  C --> D[入口とSkill登録を切替]
  D --> E[指定Workの承認経路で限定読取]
  E --> F{結果}
  F -->|成功| G[保持入力が有効なら登録計画を確認]
  F -->|失敗| H[診断を保存し停止]
  D --> R[必要時は保全した直前の登録と入口へ復旧]
```

実際に配布済みのRuntimeで作成した導入計画SHA-256は
`87d40a84f498029c9bb42add17650e0b82d638f1f579f1e30971b1309c2ed4d2`。
具体的な配置先、設定・入口の前後ハッシュ、アーカイブのintegrityは端末内の私有レビューに保存した。
復旧先は[移行状況の現行本番ベースライン](../migration/status.md)に記録した、導入済みのProfile `2.0.0-m3.2` / Lark `1.4.0-m3.1` / Transport `1.1.1`構成。
実際の新登録receiptから以前の登録へ戻し、保全した入口3ファイルとmodeを復元する。旧構成と証跡は保持する。

# 私有証跡の参照

承認後に別の担当者が引き継ぐ場合は、指定本番Workを実行するmacOSユーザーの
`~/.local/share/live-agency/deployment-plans/profile-auth-diagnostics-20260911/`
を参照する。`~`はその実行ユーザーのホームであり、別の担当者のホームや任意のcheckoutではない。
記録IDは `profile-auth-diagnostics-20260911`。一時ディレクトリーや現在の会話を探す必要はない。
同じ端末・ユーザーの私有ファイルへアクセスできない場合は、プロジェクトオーナーへこの記録IDを示して参照を依頼し、証跡を取得するまで切替・復旧を実行しない。

| ファイル | 確認する内容 |
| --- | --- |
| `record.json` | 記録ID、未適用状態、計画ハッシュ、同梱18ファイルのSHA-256、直前の導入記録ID |
| `plan.json` / `deployment-review.json` | 固定版、設定ハッシュ、配置先、入口前後ハッシュ・mode、現在と次の登録先、復旧先 |
| `host-before-0`〜`2` / `host-proposed-0`〜`2` | 入口3ファイルの現行保全と採用案。review内の対応表で実ファイルへ対応付ける |
| `transport-pack.json` / `provider-pack.json` / 同梱`.tgz` | 配布archiveの版・integrity・SHA-256と実体 |
| `selection.json` / `catalog.json` / `platform-package.json` | 同じ計画を再構成する選択・カタログ・宣言 |

索引 `record.json` のSHA-256は `29060ca9b905574cc7daf0f9b1750f702a86949b7ba0f5bcaeadb98621b03ea9`。
索引と同梱ファイルを照合し、切替直前にはreviewに記載した実ファイル・登録先も再読取する。
直前の適用証跡は同じ保管親ディレクトリーの `profile-2.0.0-m3.2-read-recovery/` にあり、
`installation-receipt.json`、`adoption-receipt.json`、`skill-registration.receipt.json`で辿れる。
今回の新しい適用・登録receiptは未作成であり、承認後の実行で初めて生成する。
Gitには記録の参照と照合値のみを置き、設定内容・業務データ・資格情報を含めない。

# 検証と残る判断

ソース採用時のTransport29件、Provider読取8件・知識1件の証跡を再利用した。今回の実archive計74ファイルはソースbyte一致・配布allowlist内。展開したProviderから候補Transport `1.1.2` / CLI `1.0.93`の解決と、npm Arboristによるlockの版・integrity整合を確認した。archive同士の診断伝達1件が合格し、CLI・API呼出しは0件。初回の検証用fixture依存不足は一時参照を補って解消し、使用したsymlinkを除去した。現行設定を維持する計画は実際の配布済みRuntimeで生成し、入口の前後ハッシュと直前の登録を照合した。これはregistryからの新規インストール検証を代替しない。

現接続のpackage versions APIは`read:packages`不足の403で、新候補版の未使用確認は配布前ゲートに残る。既存workflowの権限で照合し、衝突・integrity不一致は停止する。新パッケージのregistry再インストール、Workでの実読取成功はまだ確認していない。

[文書知識方針](../governance/document-knowledge-policy.md)、[言語方針](../governance/document-language-policy.md)、[開発方針](../governance/development-policy.md)、全文の[Private Source Integration Guide](../governance/private-source-integration-guide.md)に照らしてAIレビューを行った。具象知識はProviderに保持し、秘密・業務レコード・実配置情報をGitの差分へ含めない。診断の改善と権限変更、Codexの証拠とWork受入を区別した。既存OPERATORの古い復旧世代と未登録との記述は今回の私有変更案で訂正し、実際の直前登録・保全ファイルから復旧する手順に統一した。図・実施順・停止条件・再利用する版を照合した。

今回の判断は、固定版のマージ・非公開配布、新配置への導入・入口と登録の切替、指定Workの限定読取まで。先のLGTMはソース採用までとして提示していたため、具体化した配布・本番変更をここでまとめて確認する。[不具合Issue #9](https://github.com/flair-agency/live-agency-provider-lark-base/issues/9)と[受入Issue #32](https://github.com/flair-agency/live-agency/issues/32)は実結果の確認まで完了にしない。

PR #59の指摘に従い、古かった移行状況と証跡への参照を訂正した。現行版・登録先を適用済みreceiptと照合し、18ファイルを上記の保管先へ保存・ハッシュ検査した。証跡の移設後もRuntimeで同じ計画ハッシュになることを確認し、本番入口・登録先・未作成の新配置は不変。言語方針も再照合し、今回作成したPR本文は英語へ訂正する。この日本語文書は未承認のオーナーレビュー案として保持する。

# PR #60の競合解消 — 2026-09-11

区分Gの文書保守。mainの最新の書き込み診断準備を冒頭に保ち、本PRの認証診断採用・Work読取証跡を歴史的なチェックポイントとして統合した。現在の配備・復旧先をこの過去記録で上書きしない。変更対象は移行状況と本レビュー履歴のみ。業務操作・構成・依存pinは変更しない。

文書知識・言語・開発方針に基づくAI自己レビューで、過去と現在の区別、復旧対象の時点、承認範囲、参照リンクと差分を確認した。変更差分の相対リンク・対象見出し、競合記号の除去と空白検査を実施した。過去の実行証跡や実装試験を今回再実施したとは主張しない。次はオーナーによる本PRの記録採用レビュー。未マージの作業ブランチに限る修正で、復旧は本競合解消コミットの対象文書差分を戻す。

変更差分の相対リンクと見出し参照は2件合格。全文リンク走査はこの作業ツリーで未展開のruntime配下への既存参照で停止したため、検証を変更差分に限定した。サブモジュールの取得や依存導入は行っていない。
