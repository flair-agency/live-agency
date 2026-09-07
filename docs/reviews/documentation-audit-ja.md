# 文書整理レビュー案

配置追記：文書整理後、ユーザー指示で親直下の`provider-runtime/`を`runtime/`へ改名。本文・一覧の過去の配置記録は当時の名前を保持し、現在の参照リンクは新しい配置に合わせる。

2026年9月7日。**整理案はユーザーがLGTMで承認。承認範囲を実施し、結果を末尾の第7節に記録した。第1〜6節は承認時点の調査・整理方針を保持する。ただしcaller-inventoryは追加承認により固定比較を廃止し、9 JSONを削除する方針へ変更した（第7節）。v2設計・移行案の承認とは区別する。**

以下の第1〜6節は実施前のレビュー記録であり、当時は本案と一覧のみを変更対象としていた。今回の実施範囲・配置と検証は第7節を参照。基準への合意を、未採用の設計や過去の作業指示への承認に読み替えない。

## 1. 結論

問題の中心はファイル数ではなく、**現行仕様、未採用の案、現在の進捗、過去の作業記録が同じ場所で混在し、同じ判断を複数の文書が所有していること**である。

配置は「全体向けか」だけでなく、何の仕様を所有し、どの実装と一緒に変更するかで決める。親リポジトリを作成したため、全体文書もGit管理できる。全体文書をRuntimeへ戻して版管理する必要はない。

| 観点 | 確認した結果 | 推奨する整理 |
| --- | --- | --- |
| Git管理 | 文書214件中172件が追跡済み、42件が未追跡 | 正式な要件・仕様・契約・方針・必要な検証要約は所有repoで管理。42件をまとめて追加しない |
| 配置 | 全体の業務モデル・能力一覧がRuntime側に残り、親側には具体的な実装契約や一回限りの記録もある | 文書の責務ごとに配置。複数の責務が混ざる文書は内容を分ける |
| 重複 | 完全一致の文書は0件。長い段落の同一記述は33組 | 現行文書の重複を統合。過去の引用や短い重要条件の再掲は直ちに削除しない |
| 統合 | 移行方針・作業順序・開発手順・配布方針が分散 | 現行計画、現在状況、全体設計、共通方針の所有先をそれぞれ一つにする |
| 環境依存 | 69文書に絶対パス等の表記。うち42文書に`/Users/...`等の端末固有表記 | 現行手順は相対参照・明示入力へ。例示と過去の実行記録は区別する |

対象は親repo、Runtime、9個の配下repoにあるMarkdown等214文書。表題・状態・Git追跡・全文の一致・パスを機械確認し、重要な設計・引継ぎ・共通手順の本文を比較した。各Skillの業務仕様の意味まで全件再審査したという結果ではない。

`tmp/`、`.sep2-desktop-evidence/`、`.codex/`、`sources/`、依存パッケージ内の文書は214件から除外した。保存済みの実データや生ログの内容は今回調査していない。`docs/`にあるJSON・patch等13ファイルは補助資源として別に確認した。

各文書の現在地、Git管理状況、分類案、移動・統合先案、パス記載行、調査時のハッシュは[214件の一覧](documentation-inventory-2026-09-07.csv)に記録した。一覧の配置案は採用済みではなく、本文統合時に意味を確認するための候補である。

## 2. 合意した文書の役割と配置基準

### 2.1 何をどこに書くか

| 管理先 | 正本として所有する内容 | 他の文書との関係 |
| --- | --- | --- |
| `README.md` | プロジェクト概要、ディレクトリー構成と文書管理の基本方針 | 人とエージェントの入口。要件・設計・詳細手順は正本へリンクする |
| 所有repoの`docs/`等 | 要件・業務モデル・設計・契約・詳細手順 | 一つの内容の正本を一つにし、READMEから参照する |
| `AGENTS.md` | エージェントが実行する具体的な作業指示と、従う正本への参照 | READMEや設計書の全文を複製しない。作業時に必要な短い指示・確認コマンドを置く |
| 移行計画・現在状況・作業記録 | 一時的な制約、工程、進捗、検証結果 | 制約の対象・適用期間または解除条件を明記。現在の指示と過去の事実を区別する |
| Git対象外のローカル設定 | 端末固有のパス、接続先、実行設定 | 共有手順は設定項目と渡し方を説明する。実値や認証情報を共有ポリシーへ書かない |

文書言語の詳細は既存の[文書言語ポリシー](../governance/document-language-policy.md)を正本として維持し、READMEとAGENTSには要約と参照を置く。新たな同内容の文書は作らない。

READMEに記載済みの基本方針はREADMEが所有する。`docs/governance/development-policy.md`へ集約するのは、変更の分離・検証・配備等の共通開発手順であり、基本方針をもう一度書く場所にはしない。エージェントだけに必要な操作指示はAGENTSへ分ける。

### 2.2 Git管理と所有するリポジトリ

| 文書・資源 | Git管理 | 所有する場所 |
| --- | --- | --- |
| 全体要件・横断業務モデル・アーキテクチャ・移行計画 | する | 親repoの`docs/` |
| 共通開発方針・命名・文書言語・非公開知識の扱い | する | 親repoの`docs/governance/` |
| Runtimeの起動・設定・結線・版管理・配備仕様 | する | `provider-runtime/docs/` |
| Providerの仕様・操作知識・サービス形式 | する。Providerの公開範囲を維持 | 対応するProvider repo |
| Skillの業務手順・入出力・受け入れ条件 | する | Skill repo。配布物にも必要な資源を含める |
| MCPのドメイン操作契約 | する | 対応するMCP repo |
| 共通ライブラリーのAPI仕様 | する | そのライブラリーを管理するrepo |
| 設計判断の理由・再現に必要な検証条件と結論 | する | 対応する仕様・実装のrepo。過去分はarchiveで明示 |
| 生ログ、端末の設定snapshot、一時出力、clone、復旧用ディレクトリ | 原則しない | ローカルの作業・保全領域。必要な要約だけGitへ |
| 認証情報・実データ | しない | 対応する非公開保管先 |
| テストが読み込む固定データ・期待値 | する | テストを所有するrepo。生成物であっても一律に除外しない |

未追跡42文書の内訳は、Runtime29、Lark Base Provider9、Google Drive Provider1、Skills3。未追跡は「不要」の意味ではない。契約や配布資源を含むため、対応する実装と合わせてGitへ記録する対象を選ぶ。

JSON等は拡張子ではなく、利用目的と参照元で配置する。「テストが読むからdocsに残す」という旧案を改め、次を整理対象に含める。

| 対象 | 件数 | 整理先と扱い |
| --- | --- | --- |
| Runtimeの`*caller-inventory.json`（初案、追加承認で廃止） | 9 | [call-site検証テスト](../../test/m2u-call-site-inventory.test.mjs)が読み込む固定データ。Runtimeの既存テスト資源領域へ移し、参照と生成先を同時修正して当該テストを実行する |
| Runtimeの`v2-lark-api-call-sites.json` | 1 | 静的調査の生成結果。再生成手順・対象版・必要な結論を記録し、出力本体はGit対象外へ。固有の判断根拠として保存が必要な部分は検証記録に残す |
| Runtimeの`v2-live-history-compaction-execution-inventory.json` | 1 | 特定実行の対象・ハッシュ記録。必要な再現証跡として所有repoの履歴資料へ。現行仕様やテスト入力とは扱わない |
| 親の`npm-runtime-private-qualification-source-manifest.json` | 1 | 特定検証のソースmanifest。配布検証の履歴資料として親repoの`docs/archive/`へ |
| 親の`disable-initial-push-ci.patch` | 1 | 特定作業のpatch。必要な経緯と合わせて履歴資料へ。現在適用する手順として案内しない |

**追加承認による変更：caller-inventoryの9固定JSONと完全一致・移行状態固定テストは削除する。汎用の必要時調査と独立した生成処理/API契約検証だけを残す。以下の移動案に優先し、最終対応は第7節を参照。**

移動だけでは参照を保てないものは、対応するテスト・生成処理の修正を含む一つの変更として扱う。JSON・patchの13件は、Markdown等214件とは別枠で件数を管理する。

過去の復旧専用`tools/stab-*.py`は共通開発ツールではない。復旧記録と一緒に保管する候補とし、再利用しないものを現在の開発手順へ含めない。既にGitに記録した履歴を消すためのhistory rewriteは不要である。

## 3. 配置・統合の具体案

新しい文書を大量に増やす案ではない。以下の正本へ現行の内容を集約し、元文書の過去部分は履歴として分ける。下表の管理先を統合先とする。ディレクトリだけを示した項目は、既存仕様の所有範囲を確認してファイル単位の対応を確定する。パッケージ再編を伴わない。

| 統合する内容 | 主な現在の文書 | 統合後の管理先案 |
| --- | --- | --- |
| プロジェクトの入口・基本方針 | `README.md`と既存方針文書の該当部分 | `README.md`。概要、構成・文書管理の基本方針、正本への索引を所有する |
| エージェントへの具体的な指示 | `AGENTS.md`と開発手順文書のエージェント向け部分 | `AGENTS.md`。詳細の振り分けは3.1節 |
| 横断業務モデルとアカウントの意味 | `live-agency-domain-knowledge.md`、Runtimeの`v2-identity-model-decision-gate.md` | 親`docs/domain/model.md`。採用済みの意味を統合。未採用の人物ID案は履歴へ |
| 全体の責務・依存・能力の所有 | `live-agency-mcp-roadmap.md`、`repository-reorganization-plan.md`、Runtimeの`v2-capability-inventory.md`、設計レビュー案 | 親`docs/architecture/`。責務と能力一覧を管理し、進捗は含めない。未採用案は正本に混ぜない |
| v2の工程と完了条件 | `v2-migration-plan.md`、日本語レビュー案、PERT、環境分離計画 | 親`docs/migration/v2-plan.md`。基盤→Provider→Skillへ一本化 |
| 現在状況・残作業 | `v2-task-handoff.md`、`v2-development-coordination.md`、`environment-cleanup-coordination.md`等 | 親`docs/migration/status.md`。現在の情報だけ。長い履歴を再掲しない |
| 共通の開発手順 | `task-orchestration-policy.md`、`v2-task-execution-instructions.md`、`v2-work-package-consolidation.md` | 人とエージェントに共通の手順は親`docs/governance/development-policy.md`。エージェントの操作指示はAGENTS、作業の割当・順序・一時制約は移行計画へ |
| 配布方針と配備仕様 | `npm-runtime-distribution-decision.md`、`npm-runtime-lifecycle-design.md`、RLS/正式配布契約 | scope・発行主体・公開範囲は親`docs/architecture/distribution.md`。Runtimeの起動・lockfile・更新仕様はRuntime側 |
| 命名規則と改名作業 | `skill-naming-policy.md`、`v2-skill-naming-and-migration-plan.md` | 規則は親governance。採用された改名作業だけ移行計画へ |
| Conversationの操作契約 | Runtimeの`v2-m4i-conversation-message-contract.md` | MCP repoの`docs/`。サービス固有の取得手順はProvider側 |
| Larkの選択・データ対応 | Runtimeの`v2-lark-api-principal-selection.md`、`v2-m2-lark-data-model-plan.md`等 | 全体の不変条件、Lark共通API契約、Base固有マッピング、Runtimeの設定接続を所有者ごとに区分。全文の機械移動はしない |
| 個別実装・検証の記録 | caller conformance、backup、添付、RLS、SEP、STAB、Work整理のcheckpoint | 必要な結論・対象版・再現条件を所有repoに残す。全体作業の要約は親archive、生の作業資産はローカル保管 |

[文書言語ポリシー](../governance/document-language-policy.md)と[非公開ソース設計ガイド](../governance/private-source-integration-guide.md)は現位置の正本を維持する。一般化のために別の同内容ガイドを作らない。

採用時は英語の正本へ反映する。現在の日本語レビュー案は承認前に正本へ変換せず、残す場合はレビュー履歴と明示する。

### 3.1 現在のAGENTS.mdの整理

AGENTS全体を別の方針書へ移すのではなく、内容ごとに次のように扱う。

| 現在の内容 | 整理後の所有先・処置 |
| --- | --- |
| レビューは日本語、正本は英語 | AGENTSには短い実行指示と既存言語ポリシーへの相対リンクを残す |
| 同期された`sources/`を編集しない | 参照資料の扱いは共通開発手順へ。AGENTSには作業時の短い注意と参照を残す |
| 公開Skill・非公開Provider・実データの分離 | 責務の設計は全体アーキテクチャ、情報の扱いは既存の非公開ソース設計ガイドを参照する。AGENTSで別の設計を定義しない |
| Skill変更時のガイド参照 | AGENTSに対象条件とガイドへの相対リンクを残す。全作業に無条件で適用する指示に広げない |
| 接続先・実行主体・許可操作の明示、本番への自動フォールバック禁止 | 共通開発手順に不変条件を置く。設定項目の実際の契約はRuntimeまたは所有コンポーネントへ。AGENTSは必要な参照を示す |
| 「開発ソース候補」、SEP-2待ち、連携・外部操作・スケジュールの一律停止 | SEP当時の記録へ分離。今も必要な制約だけを現在状況に対象・根拠・解除条件付きで記載する。ファイルに残っているという理由で現行の禁止や再承認条件にしない |
| グローバル登録変更・本番checkoutへのリンクの禁止 | 開発環境の変更範囲は共通開発手順に整理。SEP当時の候補checkout限定条件は履歴に分ける |
| lockfile利用、ライフサイクルスクリプト無効化 | 依存導入手順として共通開発手順へ。現行の開発・ビルド要件と照合し、SEPの一時制約を無条件に恒久化しない |
| 既存のステージ済み・未ステージ変更を維持 | AGENTSに具体的な作業指示として残し、変更分離の共通手順へリンクする |
| 固定されたconfig・runs・fixturesの絶対パス | 端末固有の保存先はローカル設定へ。共有する固定fixtureは所有repoのテスト領域に置く。共有手順には実際に対応している設定方法を記載する |
| 元ファイルの絶対パス・SHA、未作成の評価用codex-home | SEPの来歴・検証記録へ。現在の作業指示から除く |

整理後のAGENTSの構成は「参照する方針」「作業対象と既存変更の扱い」「必要な検証の実行方法」「レビュー・報告」の短い指示とする。実在するコマンドのみ記載し、設計本文・進捗・当時の端末情報を持ち込まない。

### 3.2 一時制約とローカル設定の扱い

一時制約は、計画に対象・理由・解除条件を置き、現在状況から適用中か確認できるようにする。解除済み・取消済み・適用不明を区別し、根拠が不明な制約を新たな停止条件にしない。過去の記録は当時の内容を維持し、現行計画への参照を付ける。

ローカル設定の値はGit対象外とし、共有する設定スキーマ・秘密を含まない例・設定手順だけをGit管理する。既存の設定機構を使い、文書整理のために新しい設定機構を実装したり、認証情報をコピーしたりしない。現在の実装に設定の受け渡し口がない場合は、文書の修正と区別した実装課題として記録する。

## 4. 重複と食い違いの具体例

### 現行の順序が一致していない

- [移行レビュー案](v2-migration-plan-review-ja.md)は基盤→Provider→Skill。
- [旧移行計画](../archive/v2-migration-plan.md)には、無停止運用と環境分離の別計画を前提にする記述がある。
- [環境調整記録](../archive/environment-cleanup-coordination.md)冒頭は、取り消されたインサイト修復優先を現在の方針として残している。
- [引継ぎ](../archive/v2-task-handoff.md)の現行欄はアバター実装を次の作業としている。これはその時点の記録で、現在の開始指示として使えない。

新しい方針を各文書に追記し続けず、採用後は現行計画とstatusを唯一の参照先とする。過去の時点で正しかった記録は、誤った履歴へ書き換えずarchiveへ分ける。

### 共通説明の重複

- 現行handoffと履歴handoffには、同じ制約・次の作業・説明が長く再掲されている。現況は要点と履歴へのリンクにする。
- profile compactionとLIVE metrics compactionのProvider知識には、削除認可やmaintenanceの共通説明が重複している。共通契約の説明を一箇所へ寄せ、対象能力固有の差分を各文書に残す。
- invitation compactionとLIVE history compactionのSkill参照資料にも、receipt・archive受渡しの共通説明がある。共通化する場合、各Skillの配布物から参照可能であることを確認する。

短い重要条件の再掲や、異なる業務が偶然同じ保持規則を持つことまで機械的に削除しない。共通文書化のためだけに、新たな実行機構や共有パッケージを作らない。

「33組」は空白を正規化した180文字以上の段落の一致数であり、削除できる箇所数ではない。完全一致の文書は存在しなかった。

## 5. 絶対パスと環境固定

通常のMarkdownリンクについて、コードブロック外のローカル参照先は現在の端末ではすべて存在した。ただし、参照できることと移植可能であることは別である。外部URLの疎通、見出しanchorの全照合、コード例の実行は今回行っていない。

| 種類と例 | 評価 | 整理方法 |
| --- | --- | --- |
| AGENTSの`/Users/naokikimura/.../docs/governance/...` | 共通方針の入口が端末固定 | 正本へのプロジェクト相対リンクを使う |
| handoff冒頭の旧`/workspace/live-agency-provider-runtime` | 現在の作業先の案内として古い | 現況には`provider-runtime/`と基準ディレクトリを記す。旧実行場所の記録は履歴へ |
| ソースへのMarkdown絶対リンク | この端末で動いても他のcloneでは使えない | 同じプロジェクト内は文書からの相対リンク。固定版の根拠にはrepo相対パスとcommitを併記 |
| 手順中の出力・設定ファイル | 必要な入力指定と、端末固定の既定値を区別 | 設定は明示引数、例では利用者が指定するパス。文書例の変数を実装済み環境変数と偽らない |
| `/absolute/private/...`、`/private/path/...` | 主に仮の入力例。これ自体は端末への固定ではない | プレースホルダーであることと置換方法を明確にする。無条件に相対パスへ変えない |
| `/tmp/...`、日付・生成ID・hash付きの過去記録 | 当時の検証・保全先。29文書に一時パス表記 | 歴史的記録として保持し、現在の再実行手順から分離。場所の有効性を根拠に完了を再主張しない |
| 生ログや保全manifest内の元の絶対パス | 証拠の内容である可能性がある | 整理の都合で一括置換しない。現在位置との対応を別の索引で管理 |

42文書の端末固有パス、29文書の一時パス、10文書のプレースホルダーは重複を含む分類である。69文書すべてを環境固定の不具合とは判定しない。

## 6. 整理を実施する順序と完了条件

### 実施順序

1. **対応表を確定する。** 合意済みの役割を使い、一覧の各行について維持・移動・統合・履歴化・削除を特定する。統合先をファイル名まで示し、複数責務が混在する文書は移す節と残す節を区別する。基準そのものの再承認は求めない。
2. **入口と指示を整理する。** READMEに基本方針と正本への索引を置き、AGENTSは3.1節の具体的な作業指示へ整理する。参照先の内容とリンクを同じ変更で揃える。
3. **現行文書を統合する。** 採用済みの要件・設計・手順を所有先へ集約し、計画と現在状況を一本化する。未採用のv2設計や計画は日本語のレビュー案として扱い、整理だけで採用済みにしない。
4. **一時条件と履歴を分離する。** 必要な一時制約には対象・解除条件を付ける。過去の判断・検証は必要な要約と根拠を残し、旧指示を現行指示として参照させない。役目を終えた草稿はGit履歴で足りるか判断し、全件archiveへコピーしない。
5. **参照と補助資源を整える。** 現行手順の端末固定を解消し、JSON等は用途に合わせて配置する。テスト参照・生成先・配布物への収録を変更する場合は、その参照元と同時に修正・検証する。
6. **差分を確認して所有repoへ記録する。** 既存のソース変更やステージ状態を巻き込まず、各repoの文書・必要な参照修正を区別する。子repoでコミットした結果を親が採用する時にsubmodule参照を更新する。

### 件数の扱い

214件は初回調査時のMarkdown等の件数であり、整理後の予測件数ではない。今回のレビュー案と一覧、およびJSON・patch13件はその214件とは別枠である。一覧の行数・元のハッシュ・行数情報は初回調査の証跡として保持し、今回の修正では処置案を更新する。

整理後の件数は、ファイル単位の統合先と履歴として残す対象が未確定のため、まだ算出しない。実施前の対応表では、現行文書・レビュー案・履歴・配布資源・機械が読む補助資源を分け、維持数・統合元数・新設数・削除数と整理後の実ファイル数を提示する。同一の統合先を重複して数えない。

### 完了条件

- READMEから現行の要件・設計・手順・計画へたどれ、基本方針と詳細文書の所有が重複していない。
- AGENTSは具体的な作業指示と正本への参照に絞られ、過去のSEP指示や端末固定のパスが現行指示として残っていない。
- 各文書が採用済み・レビュー案・履歴のどれか判別でき、一時制約は対象と解除条件を確認できる。
- 現行の参照が別のcheckoutでも解決し、移動したテスト資源の参照と配布物内の必要資源が維持されている。
- Git対象に実データ・認証情報・端末固有設定を混ぜず、作業前後のファイル対応と件数が一致する。

合意した基準を今回の整理案に反映した。個別文書の移動・統合とREADME・AGENTSの実変更は次の実施対象であり、この案の改訂をv2実装・復旧ツール・外部操作の開始に結び付けない。


## 7. 承認済み整理の実施結果 — 2026-09-07

作業分類G。文書・テスト資源の配置と必要な参照だけを変更。業務機能、実環境、Lark Base、認証、スケジュール、パッケージ発行、復旧ツールの実行は対象外とした。親・Runtime・配下9repoのGit状態を開始時に確認し、全repoの既存変更と空のindexを記録した。`.git`の再初期化、新規repo、履歴書換え、pushは行わない。

### 配置・統合

- READMEの承認済み配置・文書管理方針を英語正本へ反映し、全体のモデル・設計・手順・計画・状態を索引化した。Runtime READMEは概要・構成・索引とし、既存利用手順をRuntimeの`docs/source-runtime-usage.md`へ分離した。
- AGENTSの3.1節の全項目を処置した。言語、必須ガイドの対象条件、既存変更の扱い、必要な検証を残し、共通手順はdevelopment-policy、対象付き一時条件はstatus、SEPの来歴・SHA・実値・評価パスは既存SEP記録へ移した。SEP当時の一律禁止を新たな恒久方針にしていない。
- 全体は`docs/domain/model.md`、`docs/architecture/{overview,capabilities,distribution}.md`、`docs/governance/development-policy.md`へ整理。計画・現在状況は`docs/migration/{v2-plan,status}.md`を入口とし、旧キュー・PERT・調整記録を履歴化した。三段階v2案、パッケージ再編案、アバター設計の未承認部分はレビューのまま残した。
- Lark Principal契約はlark-core、Base対応はlark-base knowledge、Conversation契約はMCP、バックアップ能力とportable instruction APIはsource-provider-api、配備・結線契約はRuntimeへ分けた。全体の意味と具体的なサービス対応を同じ正本にしていない。
- Profile／LIVE指標圧縮の共通説明はProviderの`knowledge/compaction-selected-policy.md`へ統合。LIVE／招待Skillの短いreceipt手渡し条件は、独立した配布物で必要な条件として維持した。新しい共有パッケージや実行依存は追加していない。
- 重複するtask-executionとwork-package-consolidationの2文書は統合後に除去。固有の測定・旧割当は既存IA履歴へ残した。すべての旧文書を無条件にarchiveへ複製してはいない。

元214行の全列（当時の所有repo、追跡状態、行数、パス行、SHA、調査深度、処置候補）を変更せず保持した。追加列「整理後のパス」「統合先・保持節」「実施処置」「実施前分類」「実施後分類」「実施後SHA256」が実施結果を表す。複数に分けた文書は節単位の対応を示した。

### 実数

初回214文書と、実施前から存在する本レビュー1件を合わせ、開始時のMarkdown実数は215件。一覧CSVは別枠とする。初回の分類は内容が混在するため、単に旧ディレクトリ名を現行／履歴の意味とみなしていない。

| 分類 | 実施前 | 実施後 |
| --- | ---: | ---: |
| 現行文書（実施前は契約案・工程の混在を含む） | 42 | 37 |
| 履歴（実施前は進捗・検証との混在を含む） | 67 | 79 |
| レビュー（本案を含む） | 5 | 7 |
| Skill／Provider配布文書・知識 | 101 | 103 |
| Markdown合計 | 215 | 226 |

初回214件の主対応は、同じ場所を維持121件、移動・統合93件。後者のうち2件は共通手順へ統合して元文書を除去。責務を分ける正本・履歴13件を新設したため、215 + 13 − 2 = 226件。新設はoverview、plan、status、Runtime configuration／instruction-resolution／source-runtime-usage、共通compaction policy、および既存文書から分離した履歴6件であり、独立した完了報告を増やしたものではない。統合先の重複を除き、実ファイルも再列挙した。

補助資源13件は、追加承認により固定比較専用JSON9件を削除し、履歴JSON／patch3件とGit対象外の再生成可能な調査出力1件を保持した。最終補助資源は4件（13 − 9）。別枠の一覧CSV1件は維持。一回限りの復旧Python2件は`docs/archive/recovery-tools/`へ移動し、bytesを保ったまま未実行とした。

### 補助資源の対応

以下のハッシュは当初bytesのSHA-256。固定JSON9件は参照元を確認し、ソース完全一致テスト専用であるため追加承認に従い削除した。歴史資料からのリンクは退役の説明と必要時調査の手順へ変更。期待値の再生成で失敗を解消していない。

| 元ファイル | 整理後（プロジェクト基準） | 移動前SHA-256 |
| --- | --- | --- |
| `provider-runtime/docs/v2-insight-caller-inventory.json` | 削除（追加承認：固定比較専用） | `a39387948ce9a7b1d5641afe26b974279159caa3638e6494c1c9efd7442f9893` |
| `provider-runtime/docs/v2-invitation-caller-inventory.json` | 削除（追加承認：固定比較専用） | `49e0fc8aacbcc14f7db662ec796e35cf4bc7c99515561d8bc7869c3d7995da07` |
| `provider-runtime/docs/v2-invitation-compaction-caller-inventory.json` | 削除（追加承認：固定比較専用） | `15956c2742dcb713e029ab1d9ee7598d17cabb16a08323e07da78b5a4c281a9b` |
| `provider-runtime/docs/v2-live-history-caller-inventory.json` | 削除（追加承認：固定比較専用） | `e82014105590ed4aa5ea71869cb0872ea709bcd5693de58d44d315a773702030` |
| `provider-runtime/docs/v2-live-history-compaction-caller-inventory.json` | 削除（追加承認：固定比較専用） | `03cdcb26353e5c92dc28a64d735b5881058d761f6f6e506d0968e23bdbf9ad13` |
| `provider-runtime/docs/v2-live-metrics-compaction-caller-inventory.json` | 削除（追加承認：固定比較専用） | `11920f257beeac7ac2671a378cae35d03c496345d0ee88a240edf5393406cb8a` |
| `provider-runtime/docs/v2-native-backup-caller-inventory.json` | 削除（追加承認：固定比較専用） | `a5aa873d73f2e27a8360969ddefef2ca702e79221f445ff9e2c42e1816c1f43a` |
| `provider-runtime/docs/v2-profile-caller-inventory.json` | 削除（追加承認：固定比較専用） | `c985100979a1d903380c2b10e8aa81cbee24f0e5ec4fd579a7f1c470c14469d3` |
| `provider-runtime/docs/v2-profile-compaction-caller-inventory.json` | 削除（追加承認：固定比較専用） | `8e984ba4fecc7fac79d22c2b5c8ac60e0e68abc3a46d825183b98d80e26c5050` |
| `provider-runtime/docs/v2-lark-api-call-sites.json` | `provider-runtime/tmp/documentation-audit/v2-lark-api-call-sites.json` | `53b3db434837a3e2031b90670a05bf57c5e669443f1779ce374cb754b57cc819` |
| `provider-runtime/docs/v2-live-history-compaction-execution-inventory.json` | `provider-runtime/docs/archive/v2-live-history-compaction-execution-inventory.json` | `246f1462a7b1f074ca910652983713bccc50c8426368e2492a776dffea627766` |
| `docs/release-preparation/npm-runtime-private-qualification-source-manifest.json` | `docs/archive/npm-runtime-private-qualification-source-manifest.json` | `8cb306ce783479551592f88ec8ed0b374d8ae8fab1c881b97c0c05961ef3c12e` |
| `docs/release-preparation/disable-initial-push-ci.patch` | `docs/archive/disable-initial-push-ci.patch` | `23dd0b138d0ed92b37ff3941d8b4da27090362bc764b1d7be78a89be69172aa9` |

`v2-lark-api-call-sites.json`の再生成方法と生成対象版の結び方はRuntimeの既存M2U inventory履歴へ追記。既存CLIはstdoutへ出力し、保存する場合の例だけを`tmp/documentation-audit/`へ明示した。固定ファミリーの移行状態を埋め込む9つのbuilderと専用分類表は廃止し、汎用の字句・import調査処理を維持した。過去の実行パスやmanifest内のハッシュは証跡として維持し、現行の端末固定手順として案内しない。

### 検証結果と残る事項

- 全226文書のローカルMarkdown参照665件を検証し、移動後の参照切れ・Markdown見出し不一致は0件。現行文書の端末固定リンクは0件。履歴資料のローカル証拠リンク29件は当時の来歴として保持し、他のcloneで証拠本体が配布されるとは扱わない。外部URLの疎通やサービス仕様の再確認は行っていない。
- 配布payload検証 `node --test skills/live-agency-skills/test/npm-distribution-payloads.test.mjs` は9/9成功。明示した合成出力先はRuntimeのGit対象外`tmp/documentation-verification/`。Skillの`check-public-content.mjs`も成功。追加したAPI設計文書は実行時必須資源にせず、既存のSkill配布閉包を変えていない。Providerの共通knowledgeは既存`files: ["knowledge", ...]`に含まれる。
- 追加承認後、固定JSONとの完全一致・ソース全文SHA・過去の移行状態／説明文／件数を固定する9テストと専用family builder9個を削除。字句・import生成とAPI操作契約の独立検証2件を残して実行し、2/2成功。新しいテスト基盤や業務機能は追加していない。
- 初回の固定比較9失敗は廃止対象の確認経緯であり、未解決のテスト失敗・v2移行・文書整理のブロッカーとして残さない。期待値再生成は行っていない。他用途の実行inventory・manifest・patchは保持した。
- 復旧Python2件、履歴manifest／patch／実行inventoryのbytesを移動前と照合。元CSV214行の既存列を完全一致で確認。秘密・実データ・ローカル設定を追加対象にせず、既存`.gitignore`・実装・manifest／lock変更は保持した。

文書配置に追加の仕様判断はない。未承認v2案の採否は別の設計範囲であり、今回の整理で採用済みとは報告しない。


### 所有repoへの記録

文書・必要な補助資源だけを選別し、ローカルcommitで記録した。実装・package manifest／lockfile・他Providerの変更は含めていない。記録済みの子の文書版を採用するため、その3つの参照だけをRuntimeで更新した。親もこのRuntimeの文書版だけを採用する。

| 所有repo | 文書整理commit |
| --- | --- |
| `provider-runtime/skills/live-agency-skills` | `79edaac6593584c4328e3f6fd477684a7f19b563` |
| `provider-runtime/providers/lark-base` | `09654484545ae9447863a9701b16550ad1d748ba` |
| `provider-runtime/mcp/live-agency-operations` | `0a9a58ccfc33efbbbf6bf23fbbea757137a5c166` |
| `provider-runtime` | `cc63f68310f445cd39a7c1f03e77604cc9c6cbda` |

追加承認により、当初の9箇所参照修正を未ステージで残す中間処置は終了した。固定比較専用の既存追加部分そのものが削除対象になったため、generatorとテストを整理した結果、両ファイルは既存HEADの汎用生成処理・独立2テストと完全一致した。削除対象の専用追加は開始前から未コミットだったため、ソースファイルのcommit差分は残らない。JSON削除と文書の更新はRuntimeへ追加記録する。その他の未コミット実装・依存変更は維持する。文書commitをv2実装の再現可能な完成版とは主張しない。

親の文書commitにはこの実施記録と214行の対応一覧を含める。復旧は各所有repoの文書commitと追加承認のsnapshot廃止差分を単位に行い、既存の未コミット実装をreset／cleanしない。公開・pushは行っていない。
