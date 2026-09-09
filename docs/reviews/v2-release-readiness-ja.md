# v2配布・導入カバレッジの準備確認

## 現在のA配布準備 — PR #35統合後（2026-09-09）

主分類G。対象は#31の配布案・registry読取り・状態記録。公開先はGitHub Packages、既存のパッケージ取得認証を読み取りに限定して使用。完了条件は正式名の候補表と未解決ゲートの更新。ソースの版・依存、公開、導入、本番操作は変更しない。並列agentなし。復旧はこの記録commitのrevert。

PR #35は基準branch codex/project-rootへ統合済み（0da30c3）。CI修正ae3fbb4はGitHubのpush/PR両方で1,013件と公開内容checkに成功。以下の古いorigin未設定・画像承認待ち・旧招待名の記述は履歴である。

| 正式npm名（@flair-agency/以下） | 現在取得可能な最新版 | 提案版 | 直接依存の提案 |
| --- | --- | --- | --- |
| lark-transport | 1.0.0 | 1.1.0 | 維持 |
| lark-base-provider | 1.2.0 | 1.3.0 | lark-transport 1.1.0 |
| backstage-provider | 1.4.0 | 1.5.0 | 維持 |
| creator-invitation-eligibility-record | 今回の認証で404 | 1.0.0 | lark-base-provider 1.3.0 |
| creator-profile-record | 1.1.0 | 1.2.0 | lark-base-provider 1.3.0 |
| tiktok-web-provider | 1.1.0 | 1.1.0維持 | 維持 |

上表は2026-09-09の明示的なGitHub Packages照会結果。404はこの認証による未確認であり、全アクセス主体に対する不存在の証明ではない。招待の正式ソース保存先は公開済みで解決している。ただし招待package.jsonにpublishConfig.registryがないため、公開準備時には既存所有者と同じGitHub Packagesを明示する必要がある。実行環境の既定registryに公開先を委ねない。

Profileは今もLark 1.1.0を直接要求する。ソース同期・CI成功でこの配布依存は自動更新されない。旧名で行った24packageの配布シミュレーションと復帰検証は履歴として保持し、正式名と採用版を反映したarchive/lock検証を公開前に行う。

残る判断と作業：#13は承認済み画像1枚の登録・readback完了を含む範囲の受入れ待ち。#6/#14は実施時のBackStage環境・対象指定と受入れ。#31では上表の版・依存・配布先を確定後に候補を検証し、具体的な公開対象を提示する。#32の本番切替は別。今回のPR承認をこれらの承認として消費しない。


2026-09-08。現行開発インストールとローカルアーカイブの棚卸し。レジストリ全体や本番環境を調査したものではない。

変更カード：G分類。対象は16の所有者ソースの読取りと一時アーカイブ、移行Project・記録。凍結・保留状態を維持し、新規インストール・公開・本番変更を行わない。完了条件は選択済み開発インストールとの対応と未導入候補の配布内容確認。次のゲートは各Skillの正式名・責務・配布版の確定と個別M3。並列作業なし。取り消しは一時成果物と記録のみ。

| 所有者 | ソース版 | 選択中インストールの版 | 扱い |
| --- | --- | --- | --- |
| `coin-expense-reconcile` | 1.0.0 | なし | supported-candidate; owning M3 required |
| `coin-expense-weekly-application` | 0.0.0 | なし | frozen; excluded |
| `creator-insight-sync` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-invitation-status-compaction` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-invitation-status-sync` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-live-history-compaction` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-live-history-sync` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-live-metrics-compaction` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `creator-profile-compaction` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `lark-base-backup` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `lark-base-backup-retention` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `lark-base-disaster-recovery-drill` | 0.0.0 | なし | supported-candidate; owning M3 required |
| `lark-base-maintenance` | 0.0.0 | なし | scope decision; no one-to-one migration |
| `live-agency-creator-monthly-activity-reconcile` | 2.0.0 | 2.0.0 | supported-candidate; owning M3 required |
| `live-agency-creator-profile-record` | 1.1.0 | 1.1.0 | supported-candidate; owning M3 required |
| `live-agency-gift-history-merge` | 1.1.0 | 1.1.0 | supported-candidate; owning M3 required |

未導入の移行候補11件は、ライフサイクルスクリプトを無効にしたnpm packが成功し、SKILL.mdと宣言済みの個別export対象に欠落はなかった。依存をインストールしての実行、レジストリ取得、実サービス動作は検証していない。ローカルpackの成功をM1/M3全体の完了と扱わない。ソース版0.0.0の12件は、公開済み・未公開を今回のローカル情報だけで断定しない。

外貨売上は別管理ソースからの責務・名称・パッケージ確定が残り、この16件に含まれない。保守Projectの認証・インボイス添付要望は重複登録しない。

機械可読結果は `tmp/v2-project/skill-installation-inventory.json` と `local-archive-inventory.json`、ローカルアーカイブは `/private/tmp/live-agency-release-inventory/`。凍結週次申請と保守統括はpack対象から除外。既存3件は今回再packしない（プロフィールの個別変更候補の検証は別記録）。

Projectのリリース確認項目は進行中を維持する。実導入・更新／復旧・名前衝突・配布依存解決・業務検証は各所有者の次作業として残す。子リポジトリの内容・版・pinはこの棚卸しでは変更していない。

## 続く30分作業での更新

[残存M3準備](remaining-m3-readiness-ja.md)で招待・LIVEの文書を修正し、保持計画の未使用の復旧Skill依存を除去したため、該当3候補を再packした。上記の初回棚卸しからの変更であり、公開版・既存インストールは不変。11アーカイブの文書リンク・静的import・直接依存宣言も検査し、欠落はなかった。静的検査では動的importや実Registry解決を保証しない。

7候補はLark Provider 1.0.0を宣言しているが開発環境は1.2.0である。正式な依存版決定と固定版による導入検証を残す。保持計画は復旧Skillを含まない隔離コピーで所有者7テストが成功した。結果は `tmp/v2-project/candidate-closure-checks.json`、`isolated-retention-tests.json`。元のアーカイブ棚卸しは初回時点の記録として保持する。

指定Lark Provider 1.0.0を既存npm認証で一時取得し、公開integrityと実byteを照合したところ、旧月次Skill 1.0.0への依存を確認した。現在の開発1.2.0ではその逆依存はない。単なる版番号の差ではなく、旧配布グラフを引き込む問題である。7候補の宣言を現行版へ合わせる修正と固定版検証を次の具体的残件とする。今回は宣言を一括更新せず、1.0.0の隔離実行も不足依存の事前検査で止めた。

## 現在の候補検証（1時間継続作業）

上記1.0.0の事前検査停止は歴史的記録。対象7Skillを1.2.0へ揃え、不要なnested依存を除き、一時consumerでregistry間接依存を含む88件が成功した。[依存整合記録](lark-consumer-dependency-alignment-ja.md)を現在の状態とする。外貨売上はオーナーが2Skill＋共有計算を採用し、3つのローカル候補を作成、一時インストール後32件とSkill形式検証が成功した。[外貨売上記録](foreign-revenue-m3-scope-ja.md)を参照。既存3件の稼働版、正式公開、親pin、本番経路は変更していない。

## A優先の証跡再現・配布境界確認 — 2026-09-09

変更カード：主分類G。対象はLark、BackStage、TikTok Web、招待記録、プロフィール記録のA配布候補と、その直接参照資源。既存の開発用インストールを使い、既存証跡・アーカイブからの再現と配布物の静的閉包を検査する。新規インストール、公開、pin採用、ソース取得、追加の業務書込みは含めない。完了条件は実証済み入口と不足する配布ゲートを分けた一つの確認表。過去の候補integrityと今回の再現結果を区別し、現在のHEADを公開済み版と扱わない。並列agentなし。

以前検証したアーカイブで、今回の招待作成前の開発API応答から承認済みv3計画を再現し、実作成2件から追加0件・登録済み2件を再現した。さらに日時更新計画の内容も一致。プロフィールの既存アーカイブでは、保存済みの画像登録前後の開発応答と過去に検証した画像hashから、承認済み登録計画と追加0件の再計画が完全一致した。これらは新たな実接続や現時点の画像再ダウンロードの主張ではない。

私有証跡：`invitation-hour-archive-receipt-verification.json`、`profile-hour-archive-receipt-verification.json`。実行済みの過去証跡を再利用したため、新規API書込み・重複作成なし。

A候補5件の静的配布閉包は104ファイル、41export、72相対import、27相対Markdownリンクについて欠落なし。依存importの宣言も確認した。Lark知識追記後はその候補だけ再packし、文書bytesの一致を確認。`a-hour-package-closure.json` と `a-hour-final-lark-knowledge-archive.json` が結果。これは最終版の選定や新規固定lockインストールの完了ではなく、#31は先行する#13/#14の受入れを待つTodoとして本文・状態をreadback確認した。

## 2026-09-09 A候補の一時利用側検証 選択

主分類D、副分類G。招待/Profileの混在接続を含む候補6archive（Lark transport、Lark Base Provider、BackStage、TikTok Web、招待Skill、Profile Skill）を、新規の検証専用一時rootへ明示選択する。既存のnpm credential設定はパッケージ取得にだけ用い、lifecycle scriptsを無効化して利用側lockfileを作り、同じlockでnpm ciする。開発/稼働node_modules、ホスト登録、アプリ権限、サービス接続、root pinは変更しない。

目的は既存依存のsymlink再利用に頼らない配布候補の解決・実行確認。画像と行の合成fixtureのみ使用。依存宣言を隠すoverrideは加えず、Profileが要求する既存Lark 1.1.0のnested解決もそのまま検査する。未確定Skill文書/依存差分は候補に含まれるが、公開採用とは扱わない。成果物はlock/hash、実解決版と候補バイト一致、ソース正規化から書込/readbackのテスト。正式版選択/公開/本番受入は別ゲート。復帰は一時rootの除去で完了。分担なし。

## 2026-09-09 Aの説明・テスト差分のソース採用

主分類G、副分類D。対象は以前から保持していた招待SkillのSKILL.md/3参照文書/package.json/所有者テスト、Profile SkillのSKILL.md/dual-run参照/所有者テスト。今回のdiffで、所有者採用済みの招待可否のみの意味、型付きv3入口、MCP条件の適用範囲、Text/Url対応、既存開発Provider 1.2.0宣言、比較専用/対象変化/曖昧応答のテストに限定されていることを確認した。削除された招待source-discoveryケースは親 `test/remaining-skill-source-discovery.test.mjs` に移されたもので、削除による検証緩和ではない。

新しい混在payload helperを両Skillの説明から見つけられるように追記し、説明を含む現在の候補を各所有者のソースチェックポイントとして採用する。既存稼働Skill/正式名/公開版/親pinは変えず、Profileの1.1.0依存もこの記録では保持する。今回の説明追記以外の候補内容は固定lockの一時導入で検証済み。必要な検査は説明参照/export存在、所有者テストと移動済みdiscovery。旧チェックポイントを復帰路とする。標準Python Skill validatorはPyYAML欠落により起動不可の既知制約があり、単純frontmatterと相対リンクを別途確認する。

一時consumerは25packagesを固定lockから導入し、6候補128ファイルがソースと一致した。8ファイル42テストが成功し、別の2テストで両interactive sourceのinstalled discoveryとunattended拒否を確認した。`a-mixed-installed-result.json` が実行・lock/hashの結果。Profileのnested Lark 1.1.0は宣言どおりで、選択済み新writerは明示注入したroot候補を使用した。これは既定CLI経路を新Providerへ切り替えた証明ではない。

招待2b9b929、Profile82ccb40へ保持していた説明・テスト差分を採用した。後から加えたhelper案内は2つのSKILL.mdだけで、候補コードは固定lock実行時と同一。追記後の2archive33ファイルはソース一致、10相対リンクと2helper exportを確認した（`a-instructions-packages.json`）。標準Skill validatorのPyYAML不足は未解消。最終公開版、依存宣言の整合、親pin採用、導入/復帰の対象選択は#31の残件として保持する。

## Aのみの公開版・依存候補 — 2026-09-09（未公開）

現在のregistryを確認した。transportは1.0.0、Lark Providerは1.2.0、BackStageは1.4.0、TikTok Webは1.1.0、Profileは1.1.0まで取得可能。招待パッケージは現在のregistryアクセスでは404だったため、既存の公開版は確認できない。`a-release-registry-versions.json` に照会結果を保持する。

| パッケージ | 提案する版 | 提案する直接依存の変更 | 理由 |
| --- | --- | --- | --- |
| @flair-agency/lark-transport | 1.1.0 | なし | 固定公式ソース根拠の追加と選択エラーの改善 |
| @flair-agency/lark-base-provider | 1.3.0 | lark-transport 1.1.0 | 明示選択read/write・画像・混在composerの追加 |
| @flair-agency/backstage-provider | 1.5.0 | なし | 新しい明示的な招待可否Normalizerと知識 |
| @flair-agency/creator-invitation-status-sync | 1.0.0 | lark-base-provider 1.3.0 | 型付き招待可否と混在計画の初回候補 |
| @flair-agency/creator-profile-record | 1.2.0 | lark-base-provider 1.3.0 | 混在payloadと選択経路の説明・回帰検証 |
| @flair-agency/tiktok-web-provider | 1.1.0維持 | なし | #4で受入済みのソースを再利用 |

これらは公開・ソース版更新の実施結果ではなく、#13/#14の受入れ後に使う具体案。招待Skillはorigin未設定で、公開前にソース保存先/registryの扱いを確定する必要がある。名前は現在のpackage IDを候補として保持し、無関係なrenameを含めない。公開順はtransport→Lark Provider→2Skill、BackStageは依存上独立、TikTok Webは既存版を再利用する。

この案の検証として、既存ソースを新規一時ディレクトリへpack展開し、package.jsonの上表の版・依存値だけを書き換えた候補を作る。主分類D、副分類G。元のソース/lock/稼働node_modulesは変更しない。全6候補を直接依存にした一時consumerをoffline・scripts無効で固定lock導入し、余分な旧Larkのnested依存が消えることと、同じ42実行テスト/2source選択テストを確認する。成果物はmanifest差分・archive/hash・実解決graphで、実公開の承認とはしない。一時ディレクトリを削除すれば復帰できる。

提案版のシミュレーションは24packagesのoffline固定lock導入に成功し、旧Larkのnested依存は0になった。予定したmanifest値以外の128配布ファイルを照合し、42実行テストと2source選択テストが成功した。BackStageはlegacy出力の明示選択を保持した追加経路であることを差分確認し、minor候補1.5.0とする。実行証跡は `a-release-simulation-result.json`。

続く更新/復帰ゲートとして、新規の一時consumerに現候補の固定lock（25packages）を導入し、提案版lock（24packages）へ更新後、元の固定lockへ戻すパッケージ更新・復帰だけを明示選択する。両段階で招待/Profile混在とsource選択を確認し、元のlock/hashと依存構成へ戻ることを照合する。実サービスのデータ復旧、旧来の本番復旧スクリプト実行、稼働環境の更新は含めない。準備済みarchiveとoffline cacheのみ使用し、lifecycle scriptは無効。

更新/復帰検証も成功。提案版へ更新後15テスト、元候補へ戻した後15テストが成功し、lock SHA-256は元の値へ完全一致で戻った。依存数は25→24→25、Lark Providerの個数は2→1→2で、意図した変更と復帰だけを確認した。これはパッケージの一時環境内復帰で、業務データのリストアではない。`a-package-upgrade-recovery-result.json` に各段階の結果を保持。

承認待ちProfile画像補完の計画とintentは、提案版のinstalled候補でも保存済み開発snapshotから完全一致で再現した（`profile-resume-proposed-release-result.json`）。元の承認依頼を変更する必要はない。実行時のfresh readはなお必要であり、今回その承認ファイル/実行attemptは作成していない。

この作業枠での#31準備は完了。残る順序は#13の画像1枚の承認/実行、#6での指定BackStage参照検証と#14受入れ、上表の正式版・招待ソース保存先の確定、親pin/公開/稼働側導入の明示選択。#30の共有能力完了を、これらの運用承認へ拡張しない。
