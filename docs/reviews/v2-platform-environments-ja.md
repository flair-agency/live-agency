---
type: design-review
visibility: internal
status: commit
date: 2026-09-10
author: "Naoki Kimura（コンセプト承認）; Codex（設計案・現行ソース照合）"
context: "既存v2の責務を保持し、選択式セットアップとSkill起点の利用へ具体化する再設計"
---

# v2再設計：platformと環境セットアップ

# Profile履歴読取修正版の実施記録

2026-09-10、オーナーがPR #50へ「LGTMで」と回答し、直前に提示した
2件のマージ・固定版配布・本番採用・対象1名の読取検証を承認した。
同じ計画への承認を再要求せず、配布・導入・ホスト切替を親が順に実施した。
主分類F、副分類D/G。独立worker（gpt-6-astra / low）は現行状態文書の
更新箇所を読取確認し、切替やサービス操作は担当していない。

| 確認対象 | 実際の結果 |
| --- | --- |
| Providerソース | [PR #6](https://github.com/flair-agency/live-agency-provider-lark-base/pull/6)をmain `74794485034043627a09a63811e38b70895b194c`へ統合 |
| 親・カタログソース | [PR #50](https://github.com/flair-agency/live-agency/pull/50)をmain `3c12499ac8a1ab52622b0cf02b14b7cbc12da40e`へ統合 |
| Provider配布 | [run 34473435377](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34473435377)成功。`1.4.0-m2.1`、private / next、integrity一致、registryからの独立導入を検証 |
| カタログ配布 | [`catalog-v0.1.0-m2.1`](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m2.1)を固定リリースとして保存。再取得した内容と承認時のSHA-256が一致 |
| 本番導入 | 承認済み計画 `ca13fb0ca7416f3c8b016802b95ddb508c529db471f3df69823054e5f2da0cd7`を既存の固定Runtimeで実行し、新規配置へregistryのみから導入成功 |
| 本番入口 | launcher、Runtime host Skill、OPERATORの3ファイルを採用。変更前後のハッシュと復旧コピーを照合。案内のローカル参照12件が存在 |
| 指定Workでの確認 | 固定版・環境・提供能力の表示は成功。初回のread-fields停止と事前条件の診断後、同じ要求が9.948秒で`done`。指定1名の履歴1件、有効1・不正0 |

採用した世代は `daa9899da019fe0360a3da9e30ecabb801d6bfa926e26454645619214eafda8c`。
Runtime `2.0.0-m2.1`、TikTok platform `0.1.0-m1.0`、TikTok Web `1.1.0`は維持し、
Lark `1.4.0-m2.1`とカタログ `0.1.0-m2.1`へ更新した。主体・保存先・フィールドを保ち、
設定の読取操作にsearch／batch-getだけを追加した。業務Skillとstorageは未選択、更新は手動。

初回Workの完了turnは `01a08b32-16b7-7bc3-9d91-2bd629e66c6c`。
1.893秒でread-fieldsの失敗となった。CLI終了コードは0だったが、Providerの内側の結果は
失敗だったため成功と扱わない。この時点では履歴検索に到達していなかった。

同じ選択済みProvider／transportで失敗段階のみを切り分けたところ、親側からの
fields:listは両テーブルで成功した。Workと同じ作業ディレクトリからも、
41項目／10項目の取得と既存のフィールド対応検証が成功した。
Work自身からの同じ診断も5.820秒で成功した（turn `01a08b39-70d9-7693-82d3-a6c41d955d96`）。
APIの恒常的な権限不足や新しいフィールド検証の欠陥とは断定できない。
これらはフィールド定義だけの確認で、履歴レコードや画像の再取得ではない。

失敗段階の事前条件がWorkで通ったことを根拠に、設定・主体・世代・要求ハッシュを変えず、
同じ1名の履歴要求をもう1回だけ実行した。turn `01a08b3c-8fa4-7181-a7f4-8cd6c8f9dc5c`、
2026-09-10 21:13:38.918〜21:13:48.866 JST、9.948秒でProviderの結果が`done`となった。
返却1件は指定creatorに対応する有効な履歴で、不正行0件、avatar hashは0件だった。
したがって、全体1,372件という所有者報告の表に対する、指定1名の限定履歴読取は実Workで完了した。
正規化結果のavatarHashesは空であり、今回の実データによる画像取得・前後確認は未検証。
この出力だけで元の添付セルの内容まで確認したとは扱わない。
最初の停止原因は未確定のまま証跡を保持する。未完了の10分51秒と9.948秒は処理範囲が違うため、
同じ仕事の性能倍率とは表現しない。5分の診断上限による停止は発生していない。

直近の復旧先はRuntime `2.0.0-m2.1`／Lark `1.4.0-m2.0`／カタログ `0.1.0-m2.0`。
今回のhost receiptにある採用後ハッシュを確認し、保存した旧3ファイルと権限だけを戻す。
新旧の配置・設定・証跡を保持し、以前のM1復旧receiptとは混同しない。
導入先・実ID・要求・応答・診断は本番の私有deploymentディレクトリに保存した。
外部業務書込み、TikTok観測、業務Skillの新規登録、スケジュール変更は0件。

AIポリシーレビューでは、開発・文書知識・言語方針と既読のPrivate Source Integration Guideを
根拠に、採用済み範囲、固定版のmain統合、現在／履歴／復旧先、責務、非公開証跡の境界を照合した。
`status.md`・本記録・catalog READMEを同じcheckpointで更新し、PR #50で指摘された
現行状態文書の更新漏れを繰り返さない。既存の合格済み実装テストは再実行せず、
配布workflowが要求する検証と実際の導入・限定読取を確認した。
文書の相対参照59件を確認し、未展開のコンポーネント参照は既存の親checkoutで照合した。
Provider #4は受入確認待ち。M2保存操作の接続、M3業務Skillの直接呼出し・計画・必要な登録承認・
登録・再読取は残り、この限定読取の成功だけで完了にしない。

# Profile履歴読取修正版の配布・本番適用案（承認時の記録、2026-09-10）

この節はPR #50で提示・承認された実施案の履歴で、現在の実施結果は直前の節を参照する。
Lark Provider [PR #5](https://github.com/flair-agency/live-agency-provider-lark-base/pull/5)
のソースはLGTM後にmainへマージ済み（`9330548`）。
対象1名の確認で全履歴と各画像の前後に全表を読む問題について、
API側で対象を絞り、画像確認は対象1行を読む実装に修正した。
本番での所要時間の改善は未検証。

導入元は現在のM2構成（Runtime `2.0.0-m2.1`、Lark `1.4.0-m2.0`、
カタログ `0.1.0-m2.0`）。[移行状況](../migration/status.md)の先頭に
現行版・今回の候補版・直近の復旧先を併記した。途中のM2配布・本番導入記録も
本PRへ取り込んでおり、未マージの別PRを暗黙の前提にしない。

| 今回採用するもの | 候補と範囲 |
| --- | --- |
| Lark Provider | `1.4.0-m2.1`。版番号だけを更新する[PR #6](https://github.com/flair-agency/live-agency-provider-lark-base/pull/6)、コミット `2e66c0eaced0cbc8b45ab139414ab0526ef02e0e` |
| 独立カタログ | `0.1.0-m2.1`、形式2。Larkの固定版を上記へ変更 |
| Runtime / platform | 既存の `2.0.0-m2.1` / TikTok `0.1.0-m1.0` を利用 |
| 本番環境 | 既存のChatGPT Work Local「C\|OPS\|エージェンシー運営」、`operations / production / tiktok` |
| 読取設定 | 同じ主体・Base・テーブル・フィールドを維持し、`records:search` と `records:batch-get` を追加 |
| 検証対象 | 既に指定・一意照合済みのクリエイター1名。実ID・設定・応答はGit外の非公開領域へ保存 |

順序は、2件の配布準備PRをmainへ反映 → Providerを既存の非公開`next`へ配布して検証 →
カタログを既存の非公開リポジトリーの固定リリースへ配布して再取得確認 →
新しいディレクトリへ固定版を導入 → 既存ホスト入口3ファイルを新しい構成へ合わせる →
指定Workタスクで起動・対象1名の履歴読取を確認、となる。
Provider公開前の既存Actionsチェックで取得・導入に失敗した場合は、その段階で止める。
同じ版への上書き配布や、失敗した要求の無条件再試行は行わない。

読み取るのは既存のプロフィール履歴で、招待送信、TikTokへの観測要求、
業務レコード登録、画像追加、スケジュール変更は今回の実施対象にない。
同一主体の読取設定に2操作を追加する案であり、Lark管理画面で新たな権限を要求する案ではない。

| 計画の固定値 | 値 |
| --- | --- |
| 導入計画SHA-256 | `ca13fb0ca7416f3c8b016802b95ddb508c529db471f3df69823054e5f2da0cd7` |
| カタログファイルSHA-256 | `b6df6eea60b17cc87afd8ea58aa35c552af5dc94b349b812b9419ce0c81688fa` |
| Provider設定SHA-256 | `b16d7a4f395cfa34f71304c5f6ff9a703c8db626168c2a1950b3e42a4d8129be` |

計画は稼働中の固定Runtimeの`setup plan`で生成し、ローカル開発コードの差し替えを使わない。
候補の依存はレジストリー固定版3件で、ローカルarchive overrideは0件。
今回の作業で既存の本番設定・ホスト入口は変更していない。
差し替える入口はlauncher、RuntimeのホストSkill、OPERATORの3ファイル。
現在の内容・ハッシュ・モードをGit外に保存し、適用直前にも一致を確認する。
復旧時は今回保存した旧3ファイルを戻して、上記の現在のM2構成へ戻す。
後段に保持するM1への復旧記録は、前回のM1→M2導入に対応するもので、今回の直近の復旧手順ではない。
旧世代・失敗候補・証跡は保持し、業務データの復元は不要。

検証は、Providerの既存23件と親の39件の合格結果を再利用した。
版番号のみの変更ではテストを再実行せず、59ファイルの配布内容・宣言入口・ソースとの一致を確認。
現在のRuntimeによる導入計画の生成も成功した。
配布候補のAPI契約と既存transportで新しい読取設定をオフライン検証し、
3操作と画像読取の選択が同じ主体・保存先で解決できることを確認した。サービス要求は0件。
この候補の配布後導入、実APIの応答形、本番での読取時間は未確認。
本番検証では開始・終了時刻、対象と返却履歴の対応、画像処理結果・失敗段階を私有証跡に保存する。
2分で未完了なら状況を確認し、5分を上限に今回の読取だけを停止して切り分ける。
これは今回の診断の実行上限で、Skillの業務仕様や恒久的なタイムアウト設定ではない。

AI事前レビューでは、開発・文書知識・言語方針とPrivate Source Integration Guide全文を適用し、
Skill起点、対象選択はconsumer、具象APIはProviderという責務を確認した。
カタログに実データや認証情報を持たせず、主体・保存先・正規化・業務判断を変更していない。
承認時に残っていた判断は、上記の固定版の配布と設定差分を含む本番読取検証を実施するかだった。
Issue [Lark #4](https://github.com/flair-agency/live-agency-provider-lark-base/issues/4)は
本番検証完了まで開いたままにし、[#32](https://github.com/flair-agency/live-agency/issues/32)の完了とは区別する。

[レビュー指摘](https://github.com/flair-agency/live-agency/pull/50#discussion_r3978601383)
への対応として、PR #49のM2導入証跡を本PRへ履歴ごと取り込んだ。
事前レビューが候補差分の確認に偏り、指定された現行状態文書との照合を漏らしていた。
修正では現行のenvironment/lock、host receipt、今回の復旧コピーを再読取し、
移行状況・本レビュー・catalog READMEの版と復旧先を照合した。
変更は文書だけで、配布物・導入計画ハッシュ・本番設定・対象1名の読取要求は変えていない。
本番操作や業務テストの再実行は行っていない。

# 結論と採用範囲

コンセプトはオーナー承認済み。承認済みの責務は英語の
[アーキテクチャ](../architecture/overview.md)と
[配布方針](../architecture/distribution.md)へ反映した。
本書の接続と先行Profileの移行順も、2026-09-10にオーナーがLGTMし実装を指示した。
論理メッセージは実装済みAPI名そのものではない。実装・実証の範囲は末尾の記録で区別する。
旧[基盤設計](v2-foundation-design-ja.md)の承認・検証記録は保存する。

変更の中心は、既存の業務を環境に組み立てる部分である。ただし、Profile Skillの直接依存と
Lark固有設定が現行ソースに残っており、「Skillはほぼ無修正」とは確定できない。
既存Providerの操作・知識とSkillの業務計算は流用候補とし、全移行や全テストのやり直しを前提にしない。

| 区分 | 内容 |
| --- | --- |
| 承認済み | 小さいRuntime、独立カタログ、選択したplatform・Skill・保存先の導入 |
| 承認済み | AI対話を入口にし、導入・検証・保存は人も使えるCLIが担当 |
| 承認済み | ユーザーは業務Skillを呼び、Skillが選択済みProviderの能力・手順を使う |
| 承認済み | 複数platform構成、デフォルト、呼び出し時の指定、設定変更の区別 |
| 承認済み | 本番Work Localと開発Codexの分離。アプリのプロジェクトは任意の関連付け |
| 承認済み | 初回に更新方針を選ぶ。事前許可の範囲内で検証済みセキュリティ修正版を自動適用可能にする |
| 承認済み | 環境選択から能力解決までの接続、カタログ形式の境界、段階的な実装・受入 |
| 設計準備時の作業 | 設計書のみ。続く実装の変更範囲・証拠は末尾の記録で区別する |

# 責務と依存関係

```mermaid
flowchart TD
  Catalog[独立カタログ：候補の所在と版] -. 選択肢 .-> Setup[セットアップ：AI対話とCLI]
  Setup --> Environment[環境の導入manifest・lock・設定]
  Environment --> Runtime[Runtime：共通機能と選択済み構成への接続]
  Environment --> Platform[選択したplatform]
  Platform --> Provider[必要なLIVE側Provider]
  Platform -. 対応Skillの一覧 .-> Skill[選択した共通Skill]
  Environment --> Skill
  Environment --> Sink[選択したDB・ストレージProvider]
```

Environment以下の実線は配布依存、点線は情報の参照。SetupからEnvironmentへの線は構成作成。
Runtime自身がすべてのplatformに依存する構成は採らない。
platformは実行順を決める業務エンジンではなく、能力・Providerの組み合わせと互換性を宣言する。
対応Skillは選択肢として列挙し、全件を強制的なnpm依存にしない。
一つのSkillをplatformごとにコピーせず、共通の業務契約を使う。

DB・ストレージはLIVE側と独立して選ぶ。選択Skillが要求しない機能はセットアップで必須にしない。
TikTok内でもWeb・BackStage・iOSのすべてが常に必須とは限らない。
17LIVEは拡張例であり、対応実装が存在するという主張ではない。

# セットアップの具体的な流れ

1. 検証済みのRuntime固定版を取得する。Node/npm、配布先の取得権限、ホスト登録の前提を確認する。
   初期の取得方法とホスト登録手順は配備機能の実装対象。業務認証をnpmのインストールフックで行わない。
2. Runtimeが同梱するセットアップの案内をAIが使用する。人が同じ操作をCLIから進める手順も提供する。
3. 独立カタログから対応platformを提示する。取得だけでは各platformをインストールしない。
4. 選択platformの宣言から利用可能なSkillを提示し、必要な取得・保存能力に合うProviderを選ぶ。
5. Providerが持つ設定定義を使って必要事項を質問する。認証値はサービスの認証フローや秘密管理へ渡し、
   通常のAI回答・設定ファイル・カタログに保存しない。環境には認証参照を保存する。
6. 対象環境と導入構成を表示し、そのセットアップ操作として選択された範囲を導入・検証・保存する。
   パッケージが配置できた状態と、認証・ホスト権限を含めて利用準備ができた状態を区別する。
7. 選択Skillをホストが認識する場所へ登録する。再起動が必要ならその事実を返す。
   実際のWork LocalでSkillを呼べることを確認してセットアップ受入とする。

AI対話・CLI・将来のGUIは同じ設定検証・導入処理を利用する。
質問文や設定項目をセットアップ側へサービスごとに複製しない。
保存した構成を人が表示・変更・再作成できることを、人による引き継ぎの入口とする。

# Skillと選択済み環境の接続案

Skillは「能力と中立な業務入力」を渡し、Runtimeは「今回使う固定済み構成」を返す。
公開SkillにはサービスURL、Providerパッケージ名、画面手順、具体的な認証やテーブル設定を置かない。
ここで示すメッセージ名は論理名であり、CLI名・関数シグネチャの確定や実装を意味しない。

| やり取り | 入力 | 結果・責務 |
| --- | --- | --- |
| 環境を選ぶ | 明示された環境参照、任意のplatform指定 | 環境・platform・構成世代を確定する。不足時はセットアップへ案内する |
| 能力を要求する | 環境の選択、能力ID・互換版、処理範囲 | 選択済みbindingを解決する。未知の候補を推測して選ばない |
| moduleを利用する | bindingに対応する中立な要求 | Providerの公開操作を呼び、正規化結果を返す |
| instructionsを利用する | 同じ選択と要求の対応情報 | 宣言された私有手順をAIへ渡す。結果を同じ要求・契約に対応付けて検証する |

ホスト連携部分が環境参照と汎用接続口を提供する。固定のユーザーディレクトリーや本番の絶対パスを
公開Skillへ埋め込まない。具体的な接続方式は、既存CLI／公開exportを再利用して最小実装で実証する。
Skillごとのtargets／plan／applyをRuntimeの新しいサブコマンドとして増やす方式を一般形にしない。

```mermaid
sequenceDiagram
  actor User as ユーザー
  participant Skill as Skillを読むAI
  participant Runtime as 環境接続
  participant Provider as 選択済みProvider
  User->>Skill: プロフィール同期を呼び出す
  Skill->>Runtime: 対象選定・プロフィール取得・履歴保存に必要な能力を要求
  Runtime-->>Skill: 固定済みbinding・操作／手順・構成世代
  Skill->>Provider: 選択された操作を接続口経由で利用
  Provider-->>Skill: 中立な対象・観測・既存履歴
  Skill->>Skill: 既存業務仕様で照合・登録計画を作る
  Skill->>User: 業務契約で必要な登録承認を求める
  User-->>Skill: 対象計画を承認
  Skill->>Provider: 同じ選択済み接続口で登録・再読取
  Provider-->>Skill: 実行結果
  Skill-->>User: 業務結果と検証の範囲を報告
```

図のSkill→Providerは論理的な利用であり、具体的なProviderのnpm importを意味しない。
instructionsの場合は、AIがホストのブラウザー等を使って私有手順を実行する。
実行の途中で導入版を切り替えず、入力・計画・結果を同じ構成へ対応付ける。
業務上の同一性、対象件数、停止条件、招待ステータスの解釈、承認範囲は既存の採用仕様を維持する。
新しい構成管理を理由に、正常な他レコードまで止める条件を追加しない。

# 環境とホスト

環境IDはアプリのプロジェクトIDと独立させる。プロジェクトは環境の選択を補助する関連付けにできる。
明示された環境、保存された関連付けの順に扱い、どちらもなければ利用する環境を選ぶ。
本番を暗黙の代替にしない。同じ環境内ではplatformの明示指定、保存されたデフォルトの順とする。
platform指定だけでデフォルトを書き換えない。

| 対象 | 本番 | 開発 |
| --- | --- | --- |
| ホスト | 指定済みChatGPT Work Local | Codexの開発作業 |
| コード | 公開済みの固定版を独立導入 | ソース・開発依存 |
| 設定・認証・実データ | 本番用の参照と保存先 | 開発用の参照と保存先 |
| Skill登録 | 配布物の固定版を参照 | 本番の登録先を上書きしない |

同名Skillの探索順に依存した分離は採らず、実ホストで読み込み範囲を確認する。
プロジェクトを分けてもブラウザーのログインや秘密管理まで隔離されるとは限らない。
強い隔離が必要な場合の別OSユーザー／別ホストは、既存配備設計の選択肢として残す。
Cloud Work、CLI、IDEをローカルWorkの検証結果だけで対応済みとしない。
ブラウザーのオリジン、アップロード等の機能、CLI/APIネットワークの権限は別々に確認する。

# カタログと更新

カタログは既存の非公開GitHubリポジトリー内の小さいJSONから始める。
形式版と内容版を区別し、公開した内容版は書き換えず、新版を追加する。
所在・推奨版を提示する情報と、実際に選択した版を固定する環境lockを分離する。
カタログを取得できなくても、完成済み環境の通常業務は保存された構成で継続できる。

環境の更新方針は初回セットアップで選び、後から変更可能にする。
機能更新は明示操作。セキュリティ更新は、事前許可の範囲に加え、実際の構成で検証された修正版、
業務互換性、権限変更なし、設定移行なし等の適格条件を確認してから自動切替できる設計とする。
SemVerのpatch表示、カタログ更新、修正PRの作成だけを自動適用の根拠にしない。

```mermaid
flowchart LR
  Detect[導入lockの脆弱性を検出] --> Candidate[検証済み修正版の構成を準備]
  Candidate --> Eligible{事前許可と適格条件を満たす}
  Eligible -- はい --> Boundary[稼働中処理の終了後に新構成へ切替]
  Eligible -- いいえ --> Review[影響を示して判断を求める]
  Boundary --> Verify[ホストで版と機能を確認]
  Verify --> Retain[安全な旧構成・設定を復旧用に保持]
```

間接依存も実環境lockで照合する。依存情報の監視・修正PR作成と本番切替は別段階。
重大な脆弱性は優先して扱うが、この設計承認だけで既存本番を停止・更新しない。
既知の脆弱版を通常の復旧先から外す。コードの復旧で外部の業務データ変更は取り消せない。
具体的なチェック頻度・通知方法は、実装時に選択可能な設定として詰める。

# 現行ソースとの差分と再利用

2026-09-10の静的確認。Runtime `aeeaaf7`、Profile Skill `0a9b50e`を確認した。
これは親の子参照の採用でも、実ホストでの今回の動作検証でもない。

| 判定 | 対象と根拠 | 再設計で必要なこと |
| --- | --- | --- |
| 変更 | Runtimeの[package.json](https://github.com/flair-agency/live-agency-provider-runtime/blob/aeeaaf7c3e667944c6501f65f05ddd6ae1fa53ad/package.json)は個別Skill・Providerを直接依存に持つ | 選択依存を環境側へ移す |
| 変更 | [Provider探索](https://github.com/flair-agency/live-agency-provider-runtime/blob/aeeaaf7c3e667944c6501f65f05ddd6ae1fa53ad/src/provider-resolution.mjs)・[検査](https://github.com/flair-agency/live-agency-provider-runtime/blob/aeeaaf7c3e667944c6501f65f05ddd6ae1fa53ad/src/inspect-cli.mjs)は直接依存と直下配置を前提にする | 宣言元の所有パッケージに対する解決・間接依存の固定版検査 |
| 流用候補 | 同じProvider解決コードの固定package／binding／version照合と私有資源の境界確認 | 新しい環境選択へ接続して検証する |
| 変更 | [Profile CLI](https://github.com/flair-agency/live-agency-provider-runtime/blob/aeeaaf7c3e667944c6501f65f05ddd6ae1fa53ad/src/profile-cli.mjs)がProfile・Lark・対象／計画操作を組み立てる | 汎用環境接続とSkillの業務フロー、Provider固有結線へ責務を整理する |
| 変更 | Profileの[package.json](https://github.com/flair-agency/live-agency-creator-profile-record/blob/0a9b50e3aaf170ce0db714a54382a160246ecbe6/package.json)はLark・TikTok Providerに直接依存。[接続コード](https://github.com/flair-agency/live-agency-creator-profile-record/blob/0a9b50e3aaf170ce0db714a54382a160246ecbe6/scripts/profile_lark_runtime.mjs)はLarkの設定・field型等を扱う | 中立な業務入力・操作と、具体的なサービス変換の境界を移す。修正量は未確定 |
| 流用候補 | [Skill登録コード](https://github.com/flair-agency/live-agency-provider-runtime/blob/aeeaaf7c3e667944c6501f65f05ddd6ae1fa53ad/scripts/install-codex-skills.mjs)の固定版・来歴・置換の確認 | 間接依存とホストごとの配備に対応する。対話やパッケージ導入は別途必要 |
| 追加 | カタログ、platform宣言、複数platformの保存・選択、更新方針 | 小さいデータ契約とセットアップ機能を用意する |
| 設計流用 | [既存配備設計](../../runtime/docs/deployment.md)の環境分離・導入世代・復旧 | 設計済みと実装済みを区別して採用する |

Provider全体や全Skillのコード監査は今回行っていない。共通ライブラリー抽出は、最初の接続で
実際に複数の利用者が必要とする部分に限定して判断する。新しい汎用workflow engineは導入しない。

# 品質評価と最小の実証

| 観点 | 設計評価 | 確認する証拠 |
| --- | --- | --- |
| 実行可能性 | npm、既存解決処理、module／instructionsを使うため実現見込みあり。業務接続は未実証 | 本番Work LocalでSkillを直接呼び、固定構成から能力を利用できる |
| Skillの中立性 | 責務分離で成立する見込み。現行Profileに具体依存が残る | Profileの依存・指示・接続から具象を分離し、同じ業務判断を保つ |
| 拡張性 | catalogとplatformをRuntime本体から独立更新できる | 初号後に合成の第二platformを構成データだけで選べることを確認する。実17LIVE対応とは扱わない |
| 保守性 | 所有者と版を分離し、二重に知識を持たせない | 1件の設定・能力変更で修正すべき所有者が特定できる |
| 環境分離 | 固定版・設定・認証を分離する方針は妥当。ホスト探索は要確認 | 開発変更後もWorkが本番の版を読み、同名Skillを誤選択しない |
| 信頼性・復旧 | 構成世代を実行単位で固定し、既存業務の再開・重複防止を維持する | 途中の版切替を避け、失敗後の状態と復旧先を説明できる |
| セキュリティ | 設定と権限を分離し、事前許可の範囲内だけ自動更新する | 初号で秘密・権限と配備復旧を確認する。自動更新の提供前に修正版候補・権限変更・脆弱な復旧先を区別できることを確認する |
| コスト・人の代替 | 初回に構成を決め、通常業務ではカタログ検索や再セットアップを繰り返さない | 人がCLIと記録から構成・不足事項・次の操作を確認できる |

既存テストは新案への適合の証拠として自動転用しない。業務期待値・既存仕様に対応するものを残し、
旧依存配置や新規に加えた停止条件だけを固定化するテストは、変更箇所を確認して修正・削除する。
広い繰り返し試験や独立したテスト計画作成を、最初のSkill利用の前提にしない。

# 移行計画の見直し案

2026-09-10の追加依頼に基づき、その後オーナーがLGTMした計画。目的は、先行する一つのSkillを本番へ提供し、
オーナー自身が受け入れ検証できる状態を早く作ること。初号は従来の指定どおり
`live-agency-creator-profile-record`（プロフィール同期）とする。
本番はChatGPT Work Localの **C|OPS|エージェンシー運営**。Codexの開発環境と区別する。
今回新しい本番先を選ぶという意味ではなく、将来の環境管理ではプロジェクトを必須にしない。

## PoCの判断

**別建てのPoCは作らず、M1の最初に小さな接続実証を組み込む案を推奨する。**
既存ローダー・Provider・Skillの業務処理があり、全面的な試作品を作ると二重実装になる。
一方、Work上でSkillを直接呼び、開発の登録と混同せず、選択済み能力を使う経路は未実証である。
ここを最初に確かめる。本番機能として残す最小実装を作り、成立しない場合は接続方式を修正する。

実証は、本番ホストでの技術的な呼出し確認として、登録する候補・設定参照・戻し方を事前に
具体化する。合成入力で中立な能力の要求と結果の対応を確認し、module操作とinstructionsの
引き渡しを実ホストのSkill利用から確認する。公開SkillへのProvider名・本番パスの埋め込みで
成立させない。単なる`ready`表示やファイルを読めたという結果では通過にしない。
検証用の合成データ・Bindingは本番の業務設定や業務データへ混ぜない。

この実証でプロフィールの取得・登録全体まで完成させる必要はない。共通接続はM1に残し、
最小の利用例は開発用の契約検証として残す。検証用登録は終了時に取り除くか明示的に識別する。
無理な接続、ホスト制約、具象の漏れが見つかったら、その点を解決するまで依存先の実装を広げない。

## 段階と利用者が試せる成果

```mermaid
flowchart LR
  Proof["M1冒頭：実Workで接続を実証"] --> Runtime["M1：本番Runtimeを先行提供"]
  Runtime --> Providers["M2：Profileに必要な取得・保存能力"]
  Providers --> Ready["M3準備完了：本番でProfileを直接呼べる"]
  Ready --> Accept["M3受入：計画・必要な承認・登録・再読取"]
  Accept --> Next["招待など次のSkillへ展開"]
```

| 段階 | 実装・確認の範囲 | オーナーが試せること／完了の判断 |
| --- | --- | --- |
| M1：Runtime | 接続実証を通し、小さいカタログ、TikTokの宣言、必要なProvider設定を使う最小セットアップ、環境保存、固定版解決、Skill登録を接続する。設定表示・修正・再利用と最小の配備復旧を含む | 実Workでセットアップを呼び、選択構成を保存・再利用できる。開発ソースを変えても本番の登録・版は変わらない。中立なSkill呼出しから共通接続が使えることを確認し、Runtimeとして独立受入・配布する |
| M2：必要なProvider | TikTok Webによるプロフィール取得とLark Baseによる対象／履歴読取・画像／履歴保存のうち、選択Skillが使う能力を接続する。現行の業務判断は維持し、Lark固有のfield変換・認証設定をProvider側へ移す | 同じ本番環境から指定対象の観測と保存先の読取結果を照合できる。必要な保存能力は同じ候補版の既存証拠と変更部分の開発用検証で確認する。本番の書込み権限を読取結果から推定しない |
| M3準備完了：Profile | 公開Skillから具体Provider依存を外し、上記能力を使う既存の計画・承認・登録・再読取を接続する。配布物に操作手順・結果判断・人による引継ぎを含め、本番へ登録する | オーナーがWorkでプロフィールSkillを直接呼び、指定済み1件の登録計画まで進められる。この時点で「受入検証を開始できる」と報告する |
| M3受入：Profile | 実際の計画に対する既存契約上の承認を得て登録・再読取を行う。画像がある場合も契約の検証を維持し、同じ観測の再計画で重複追加しないことを確認する | オーナーが期待した結果、保存先、件数、画像、既存データ保持を確認し、手順から判断・引継ぎができる。ここで初号Skillの本番業務受入とする |

M1/M2/M3は従来どおり責務別のマイルストーンであり、実証用のM0は増やさない。
M1の完了はM2/M3を待たず、M2は全Providerを待たず、ProfileのM3は招待Skillを待たない。
必要な宣言や呼出し部分をM1で先に触ることは、Provider・Skill全体の受入をM1の条件にすることではない。
M3準備完了と実行成功・オーナー受入は別々に記録する。

既に指定されたアカウント・本番主体・保存先は実行時の私有選択記録から引き継ぐ。
未解決・変更箇所だけを確認し、新しい対象を推測したり選び直させたりしない。
本計画の採用は既存の使い切った書込み承認を復活させず、定期実行も追加しない。

## 最初の経路の所有者と依存

| 作業 | 所有者 | 次に渡すもの |
| --- | --- | --- |
| 中立な接続と必要なデータ契約 | `runtime/`、必要な差分だけ`packages/contracts/` | Skillが具体Providerを指定せず使える入出力、固定環境の対応情報 |
| カタログ・platform宣言・セットアップ | Runtimeのセットアップ機能と選択構成の配布物 | 最小TikTok構成、選択Providerの設定定義、固定した導入manifest／lock。新しいデータの配置・公開先は実装時に具体化する |
| 取得・保存能力と具象の移動 | `providers/tiktok-web/`、`providers/lark-base/`、共通経路に変更が必要な場合のみ`packages/lark-transport/` | 中立な観測・履歴・保存操作と、Providerが所有する私有知識・設定 |
| Profileの業務接続と手順 | `skills/live-agency-creator-profile-record/` | 既存の業務期待値を保ったSkill、計画と結果の説明・引継ぎ手順 |
| リリース・本番適用・受入記録 | 各配布所有者と`live-agency`の調整記録 | 固定版、変更するホスト登録・設定、試し方、実際の結果と復旧先 |

最初に手を付けるのはM1の接続実証一単位。呼出し方式と実ホストの成立を確認してから、
その入出力へ必要なProvider・Profileをつなぐ。契約が決まる前に各層の実装を別々に先走らせない。
旧実装から業務規則を移す際は採用済みの根拠と同じ入力の期待結果を照合し、
新しい停止条件や招待ステータス解釈の追加を今回の構成変更へ混ぜない。

## 初号の前提にしないもの

招待の残件、第二LIVEプラットフォーム、他Skill、全MCP、全カタログ整備、GUI、
全面的な自動更新、Larkの共通フェールオーバー改善全体は後続とする。
複数platformを識別できる設定構造は維持するが、実17LIVE対応や二つ目の本番構成を先行条件にしない。
自動更新未実装の初期版は、固定版・明示更新として限界を示す。利用できない自動更新を選択肢に出さない。
選択した経路を現実に止める不具合があれば、その経路に必要な最小修正として扱う。

**初回配備の復旧はM1に含める。** 切替前の固定版、登録、設定参照を保持し、候補の導入が
不完全なら現在の環境を壊さず中止できるようにする。以前のSkillが正常に動くとは仮定しない。
初回登録で戻す既存登録がない場合は、追加した登録・設定参照だけを取り除ける手順を用意する。
外部書込みの結果が不明なら再読取で確定し、版の復旧を理由に書込みを無条件に再送しない。

## 既存Issueと受入証拠の扱い

2026-09-10に既存Issueを読取り確認した。次の表は計画採用時の整理案であり、
この文書編集ではIssue・Projectの状態を変更していない。

| 対象 | 扱い |
| --- | --- |
| [#42：本番Runtime](https://github.com/flair-agency/live-agency/issues/42) | Closedを維持。Runtime 1.3.0のWork起動・選択資源読込という受入証拠を保存する。新設計のSkill起点接続まで確認済みとはしない |
| 新規M1差分1件 | 計画採用時に、選択環境・セットアップ・Skill起点接続の追加分を一つのIssueで管理する。PoCを別Issue・別マイルストーンに増やさない |
| [#13：Profile開発受入](https://github.com/flair-agency/live-agency/issues/13) | Closedを維持。既存業務・画像・再読取の証拠を再利用し、変更した接続・配布・本番ホストだけ再検証する |
| [#31：A配布準備](https://github.com/flair-agency/live-agency/issues/31) | Profileと招待の完了を別々に記録する。Profileを先に配布し、招待の未完了をProfileのブロック理由にしない |
| [#32：A本番受入](https://github.com/flair-agency/live-agency/issues/32) | Profileを先に「受入検証可能」へ進める。M3の登録・再読取とオーナー受入が終わるまで、その経路の本番完了とはしない |
| [#39：文書・人の引継ぎ](https://github.com/flair-agency/live-agency/issues/39) | Profileに必要な文書受入を同じM3へ含める。全Skillの文書完成は前提にしない |

新設計への適合を、過去の成功件数の合計で証明しない。既存の業務期待値と適用できる検証を
再利用し、変更した契約・配布接続・ホスト・正常系と関連例外に絞って確認する。
不要な重複や旧実装だけを固定化するテストは変更範囲で修正・削除し、全体棚卸しを別の前提作業にしない。
必須CIは実施し、通過済み検証は新しい変更・失敗がある場合にだけ再実行する。

M1冒頭の実証後に、成立した接続、残る差分、実測作業時間と待ち時間を分けて報告する。
次の作業単位をその差分から見積もり、全移行の総時間・費用を根拠なく確約しない。
実証を通せない間、他Skillの移行や全般的なテスト追加へ作業を拡散しない。

# AIポリシーレビューと作業記録

根拠はオーナーの2026-09-10の連続したLGTM、[開発方針](../governance/development-policy.md)、
[知識方針](../governance/document-knowledge-policy.md)、
[言語方針](../governance/document-language-policy.md)、全文を確認した
[Private Source Integration Guide](../governance/private-source-integration-guide.md)。
実装・配布済みという事実から新しい設計の正しさを推定しない。

静的レビューで、概念承認と未実装の接続案を区別し、配布依存図と業務実行図を分けた。
Profileの具体依存が残るため「ほぼ無修正」という見込みは確定事項から外した。
秘密値・実アカウント・実テーブル識別子は本書に含めない。CLIによる人の代替を明記した。
現行ソースの照合は動作テスト・独立した人の受入ではない。

初版の検証結果：変更する5文書の相対リンク90件（うち子repoの固定参照先8件）と見出し参照を確認し、
欠落はなかった。独立したAIの文書レビューでも、承認済みの責務との重大な矛盾や実装済みとの
誤認を招く主張は見つからなかった。図は手順との静的照合のみで、描画検証は未実施。
文書変更のためRuntimeの動作テストは実行していない。

作業分類はE（アーキテクチャ・共有基盤）／G（文書）。今回の完了条件は、承認済み方針の記録、
接続と差分のレビュー案、リンク・図と手順の整合確認、文書のみの作業ブランチ同期。
既存作業場所の未採用Runtime参照は保持し、本書のコミットへ含めない。
復旧は文書差分の取り消しで足り、稼働コード・設定の復旧操作は発生しない。

計画見直しのAIレビューでは、別建てPoCによる二重実装、M1にM3完了を要求する依存、
最小の配備復旧まで後続へ送る危険を確認した。旧計画の現行形の図・全パッケージ条件を
履歴として明示し、本番Runtime、Provider接続、受入検証可能、業務受入の各結果を分けた。
旧証拠はIssue本文と照合し、新設計の成功へ読み替えていない。今回も実装・実ホスト検証は行っていない。
改訂後は相対リンク91件（子repoの固定参照先8件を含む）と見出し参照、差分の空白検査に成功した。
既存図と改訂後の段階表を静的に照合し、第二構成と自動更新の実証が初号の前提に見える表記も修正した。

接続案とM1に接続実証を含める先行Profileの移行順は、その後オーナーが採用した。ホストの同名Skill分離、Profileの具象分離、
自動更新の実行は、確認済みとは扱わない。具体的な実装API・配備パスを想像で既存機能として案内しない。

| 次の作業 | 人の担当 | 期限 | 概要 | 完了条件 | 参照 |
| --- | --- | --- | --- | --- | --- |
| M1の実装と技術実証 | Naoki Kimura（受入） | TBD | 採用された接続と最小セットアップを段階的に実装する | 実Workで選択・保存・利用・復旧を確認し、M1を独立受入できる | [#45](https://github.com/flair-agency/live-agency/issues/45)、以下の記録 |

# M1接続実装の記録

実装開始の変更カード：主分類E、副分類D/F。Runtimeの配布依存・中立な能力接続と、
実Workでの合成Skill登録が対象。最初の作業単位は、Skill起点のmodule実行・instructions引渡しの実証。
業務仕様・実サービス・本番の業務設定・スケジュールは変更しない。
既存の承認を使い、合成候補と固有名の登録だけを作成する。復旧対象もその登録だけとする。
workerは方針どおりgpt-6-astra / low。親がRuntimeを実装し、独立workerが合成fixtureと必要な境界テストを担当した。

Runtime候補`2.0.0-m1.0`を独立ブランチで実装。配布依存は18件から共通protocol1件へ変更し、
既存の具象依存は旧ソース検証用のdevDependenciesへ移した。127依存の版・取得元・integrityは不変。
v1の業務別入口は既存インストールに残し、新しい配布物は環境接続の6ファイルに限定した。
親の既存Runtime参照の差分は保持し、新候補のpin・公開・常用環境への切替は行っていない。

独立候補でmoduleの合計9とinstructionsによる合計9、依存・版・相関・構成の境界を検証した。
レビューでplatform間の結果混同を検出し、generationにplatformを含める修正を行った。
修正後の必要な4テストが成功。親の独立caller検査2件も成功したが、未採用の子pinの統合検証とは扱わない。
配布archiveと初回候補の6ファイルが一致。合成lockはコピー内容のdigestであり、registry導入の証拠ではない。
修正版archiveも実Workで使用した固定候補の6ファイルと一致した。
公式Skill validatorはPyYAML不足で実行できず、frontmatter・参照・手順を直接確認した。検証のための依存追加は行っていない。

本番の指定Workタスクでは、`live-agency-connection-proof`をSkill一覧から名前解決できた。
初回候補でmodule／instructionsが各9を返し、結果相関検証も成功した。
これは実ホストの技術実証であり、プロフィールの本番業務成功、常用の開発本番隔離、M1全体の完了ではない。
platform識別修正を含む固定候補でも同じ経路が成功した（Workタスクの完了turn
`01a08a08-9999-7601-a38f-19513778acf2`、2026-09-10 15:38 JST）。
environmentIdは`synthetic-connection-proof`、platformは`first`、generationは
`432ea9696b9f252242f10ed4ff97e1e42ef3e1556b5efadd1c046ac7aedc1ed1`。
moduleの計算結果と、AIがinstructionsを読み実行した計算結果はともに9で、相関検証も成功。
修正版の固定候補・入力・手順結果はローカル証拠`/private/tmp/live-agency-m1-host-proof-r2-20260910/`に保持する。
これは一時保管であり、手順・合成入力の再現元はRuntimeソースのfixtureとする。
修正版archiveのSHA-512は
`2deZooS6xD5f6okiWKCWro8u58DbKaSKz8cLQ6Syli2c12I7fcFJpwMhSyLe4GEKNigjFuM6Jei+XBliwxJRTA==`。

方針セルフレビュー：公開用の中立な確認Skillへ具象名・環境絶対パスを入れず、選択入力で渡した。
Providerのサービス知識や既存業務規則の変更なし。追加した固有名Skillの参照先が検証用候補と一致することを確認し、
その一時登録だけを解除済み。既存のSkill登録・本番設定・データ・スケジュールは変更していない。
M1の次の作業は、既に成立した接続に小さいカタログと設定保存・Skill登録・復旧を接続すること。
変更3文書の独立AI方針レビューと追加の相対リンク・見出し参照確認でも、重大な不整合や欠落はなかった。

実装はRuntimeのコミット`e9d82be`、
[Runtime PR #3](https://github.com/flair-agency/live-agency-provider-runtime/pull/3)へ同期済み。
同じHEADのpush／PR両CIが成功し、production依存だけの導入、必要な4テストと配布内容確認を通過した。
[CI結果](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34446681058)は
Runtimeのソース検証であり、親pinの統合採用やregistryへの公開ではない。
親の文書チェックポイントは実装を参照するだけで、未リリース候補の採用pinには更新しない。
[#45](https://github.com/flair-agency/live-agency/issues/45)は最初の接続実証2項目を完了とし、
M1のセットアップ・継続利用・常用配備を残してIn Progressを維持する。

# M1セットアップ実装の記録

前段のRuntime PR #3と親PR #46は、オーナーの明示したmainマージ承認により、
それぞれ`2129981`と`5aa85a3`へ統合済み。以下は、その次の未採用候補の記録である。

変更カード：主分類E、副分類D/F。対象はRuntimeのセットアップ・環境保存・登録復旧と、
親リポジトリーの独立カタログ・TikTok宣言・手動配布手順。今回の完了条件は、
実際のnpm導入で固定した候補を指定Workから使い、一時登録の復旧まで検証してPRへ同期すること。
小さいRuntime、Skill起点の利用、既存の業務判断を維持する。常用配備・パッケージ公開は次の操作単位とする。
親が導入処理を実装し、独立worker（gpt-6-astra / low）が登録と復旧を実装した後、
親が結線・実ホスト検証を担当した。配布workflowの独立レビューは読み取り専用で行った。

| 実装したもの | 確認できる動作と限界 |
| --- | --- |
| Runtime `2.0.0-m1.1`候補 | カタログ表示、platform宣言確認、計画、固定版導入、保存済み構成表示、Skill登録・復旧。配布依存は引き続きprotocolのみ |
| 計画と導入 | 明示された新しい導入先・版・計画ハッシュを使い、実際のlock生成と`npm ci`を行う。既存環境は上書きしない |
| 独立カタログ `0.1.0-m1.0`候補 | [カタログ](../../catalog/README.md)はRuntimeと独立版。DB・ストレージの選択と設定参照を保存する |
| TikTok platform `0.1.0-m1.0`候補 | [宣言](../../platforms/tiktok/README.md)がTikTok Web取得Providerを選ぶ。ProfileはM2/M3接続前のためpendingであり、利用可能と表示しない |
| 登録と復旧 | 固定配布物全体へのリンクを作り、以前の登録をreceiptへ記録する。同一来歴の明示置換と、その登録だけの復旧を扱う |
| 人による操作 | Runtimeの`docs/setup.md`に同じCLI手順・図・結果・失敗時の再開と復旧を記載した |

Provider固有の設定質問票と接続確認は未実装であり、保存済みのサービス参照は`not-verified`と表示する。
セキュリティ自動更新は後続とし、初号は手動更新のみ受け付ける。未実装の選択肢を有効として保存しない。
ホストへ環境参照と起動口を渡す連携は明示入力で確認した段階であり、常用配備の保存先・同名Skill分離の検証は残る。

## 実際の検証と復旧

既存4件に、実archiveからの導入・変更された計画の拒否・登録置換と復旧を扱う5件を加えた。
変更後の関連5件が成功。初回の失敗は書込みできない既定npmキャッシュとmacOS一時パスの別名であり、
候補専用キャッシュとテスト一時パスの正規化で修正した。ホストの権限を緩和していない。
親の独立caller検査2件も成功したが、新Runtimeの親pin採用を検証したものではない。

今回は配布archiveから本当にlockを生成し`npm ci`を実行した。手製のintegrityを導入証拠としていない。
実Workで使ったRuntime固定候補と、検査した配布archiveの10ファイルはバイト一致した。
元カタログを利用できない状態にしても、保存済み構成の表示と利用が成功した。

指定済みの本番Workプロジェクト内のタスクで、合成Skillを名前から発見して呼び出した。
完了turnは`01a08a35-8ef6-79a3-b4a5-07ff0f2f1d51`、2026-09-10 16:28:15 JST。
environmentId=`proof`、environmentKind=`development`、platformId=`example`、generationは
`97c4f0a9fed74ea333c0e88ce52295de9ce76089c4e132b895c5715c22c829b4`。
moduleによる計算と、AIがinstructionsを読んで独立実行した計算はともに9。
結果相関検証は成功した。相関の検証は結果の業務的正しさを認定するものではない。

新CLIで一時登録を復旧し、receiptの`restored`・以前の登録がnull・作成したリンクの消失を確認した。
既存の常用登録・設定・サービス・データ・スケジュールの変更はない。
ローカル証拠の所在は`/private/tmp/m1-setup-work-proof.json`に保持する。
一時保管のため永続証拠とは扱わず、再現元はRuntimeの合成fixtureと検証手順とする。
この結果は実ホストにおける合成接続・復旧の確認であり、人の受入、Profileの実業務成功、M1全体の完了ではない。

## 配布準備とAIポリシーレビュー

Runtimeとplatformの配布workflowは候補版を`next`へ公開し、版・配布内容・private可視性・integrityを確認する。
platformはmainのレビュー済みSHAとカタログの宣言一致を要求する。今回はworkflowを実行していない。
公開後の検証で失敗した場合は既に公開済みの可能性があるため、版の存在とintegrityを確認してから復旧を判断する。
カタログJSONも独立した不変の版として公開し、移動するmainを環境lockの代替にしない。

上記の開発・知識・言語方針とPrivate Source Integration Guideに基づき、責務、未実装表示、
CLIによる人の代替、図と手順、配布する資源、公開／非公開境界を実際の差分と照合した。
登録receiptが登録先や配布物を上書きし得るパスを拒否し、復旧時にも元のSkill来歴を照合するよう修正した。
独立AIレビューでも重大な責務の不整合・配布workflowの欠陥は見つからなかった。
変更に関連する相対リンク57件、新しいJavaScript5ファイル、workflow内のJavaScript9ブロック、
カタログ／platformのJSON2ファイルと差分空白検査に成功した。workflow自体の実行は公開承認後とする。
図は静的照合であり、描画確認やオーナーの理解・代替実施を確認したという主張ではない。

次の作業は、これらの候補のソースレビュー・固定版配布を経て、指定Workの常用環境へ導入し、
オーナーが保存済み構成と復旧を試せる状態にすること。#45は引き続きM1全体としてIn Progress。
親の既存Runtime差分は保持し、この記録では子pinを変更しない。

# M1固定配布と常用環境への導入

Runtime PR #4と親PR #47はオーナーのLGTMを受けmainへ統合済み。
公開操作は自動承認レビューで一度止まったため、次の3版の非公開公開を具体的に提示し、
オーナーが「次に進んで」と回答した後に実行した。先の拒否は解消済みで、別経路への迂回はしていない。

| 配布物 | 固定版とmainのソース | 配布・検証結果 |
| --- | --- | --- |
| Runtime | `2.0.0-m1.1`、`3f364f9f4900ef4fcea675edb609478fc3fefd26` | [配布run 34452878987](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34452878987)成功。非公開・integrity・独立導入を検証 |
| TikTok platform | `0.1.0-m1.0`、`ac3cb4a79380d7646f5fe03cc734ecba86bf0f3c` | [配布run 34452937724](https://github.com/flair-agency/live-agency/actions/runs/34452937724)成功。非公開・宣言・依存・integrityを検証 |
| 独立カタログ | `0.1.0-m1.0`、同じ親main SHA | [非公開リリース](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m1.0)から再取得し、承認時の内容と一致 |

Runtime／platformは候補版の`next`タグ。カタログのSHA-256は
`154d337b60706c1b15e1713283bdefd7744b9c65bd41a30e6837c05e62368f83`。
Runtimeの10ファイルとplatformの2ファイルを含む配布archiveは、事前確認したintegrityと一致した。
ソースの準備時に「未公開」と記載したREADMEは、その時点の履歴であり、公開済みarchiveの内容は書き換えない。

変更カード：主分類F、副分類D/G。承認済み固定版の非公開配布と、指定済みWorkホストへの常用M1導入が対象。
復旧対象は既存Runtime入口・Runtime用のローカル案内・運用案内の3ファイルのみ。
業務Skill・DB・ストレージ・サービス操作は今回選択していない。継続workerは独立した読み取りと
日本語の受入案内作成を担当し、配布・導入・切替は親が順に行った。workerのeffortを確認・変更できる
手段がなかったため、今回lowへ変更したとは主張しない。

## 導入と復旧の証拠

既存npm設定を参照として明示し、公開済み固定版から導入用Runtimeを取得した。
そこから新しい`production/installations/runtime-2.0.0-m1.1`へ、実際のlock生成と`npm ci`で導入した。
既存1.3.0と別の1.4.0 Profile配置は保持した。開発checkoutのファイルへのリンクは用いていない。

- 環境：`operations` / `production`、既定platform：`tiktok`
- 設定世代：`55480bd3488805c2452f646e605724822f58d9af424fe5f0aa1b179ff5d9b61e`
- 計画SHA-256：`2f75551462e3e1a6a88f2aa35964bc521102f7f319b29c3a336ef248d347e2de`
- 選択Skill・DB・ストレージ：なし。更新：手動

既存の`live-agency-runtime`入口を、保存済み構成を表示する新しい固定版へ切り替えた。
3ファイルの変更前後の内容・権限・ハッシュを保持し、実際に旧入口へ戻して1.3.0の`ready`と
`externalOperations: 0`を確認した。その後に新入口へ再採用し、3ファイルの採用後ハッシュも照合済み。
復旧記録と配布証拠は、本番配置の`deployments/runtime-2.0.0-m1.1/`に保持する。
`production.json`、別のProfile設定、他のSkill登録、業務データ、スケジュールは変更していない。

指定Workタスク自身による新入口の確認は成功した。完了turnは
`01a08a5d-b125-7ab2-a04c-8d6c31929302`、2026-09-10 17:12:07 JST。
登録一覧から`live-agency-runtime`を発見して現在の案内を読み、実際の入口から上記環境・世代・
未選択項目・手動更新を確認した。版コマンドは`@flair-agency/live-agency-runtime@2.0.0-m1.1`。
同世代の実行ファイルと設定を直接参照しており、開発checkoutを使用していない。
この結果により#45をReady for Acceptanceとし、オーナーによるM1受入を待つ。

その後、オーナーが自身のWork実行結果を提示し、#45の説明をレビューして「LGTMで」と明示承認した。
2026-09-10に#45をクローズし、ProjectをDoneへ更新済み。M1の受入は完了している。

## オーナーによるM1受入

指定のChatGPT Work Localプロジェクト **C|OPS|エージェンシー運営** で、次のように依頼する。

> live-agency-runtime を使い、保存済みの本番環境とRuntimeの版、提供機能、未選択の項目を確認してください。業務操作は実行しないでください。

Runtime `2.0.0-m1.1`と上記環境・世代が表示され、選択済み構成から提供機能を確認できることを確認する。
入口から導入済みのセットアップ手順と復旧案内を辿れる。M1として確認するのは、小さいRuntime、
選択式セットアップ、固定構成の再利用、Skillからの中立な接続（前段の合成実証）、登録・配備の復旧である。
この確認はProfileの本番業務受入ではない。Profileを直接呼んで取得・計画・承認・登録するM2/M3は残る。

AIポリシーレビューでは、実配布・導入・復旧の結果を記録と照合し、未選択を動作済みと扱わないこと、
Runtimeが業務Skillを起動する説明へ戻っていないこと、固定配布物と開発ソースの区別、
既存承認の範囲、人が同じCLIと保存済みファイルから確認・復旧できる手順を確認した。
ローカル案内のfrontmatter・参照先と変更した既存launcherの構文・実行を確認した。
この記録はオーナーの理解・受入を代行せず、新規タスクの暗黙選択やCloud Workでの検証も主張しない。

# Profile M2読取接続の候補

状態：レビュー候補。M1承認後の「次に進んで」に基づく、#31のProfile部分。
変更カードは主分類D、副分類B/G。既存のプロフィール業務ルールを保持し、
RuntimeとProviderの接続・設定・データ変換のみを扱う。#32の本番切替とは分ける。

| 所有者 | 候補と変更 | 維持する境界 |
| --- | --- | --- |
| Runtime | `2.0.0-m2.0`。保存したProvider設定のパスとSHA-256から、選択した接続へ設定を渡す | 個別サービスやSkillを直接依存に加えず、Skillを起動しない |
| Lark Base Provider | `1.4.0-m2.0`。`creator-profile-datastore-read/v1`から対象者と履歴を共通形式で返す | フィールド変換・認証・API操作はProviderが所有。対象選択、重複判定、計画作成は含めない |
| 親カタログ | `0.1.0-m2.0`。Lark読取接続を明示選択できる形式2 | 公開済みM1カタログは変更せず、古いRuntimeが新しい接続を無視して成功扱いすることを防ぐ |

ソースレビュー：[Runtime PR #5](https://github.com/flair-agency/live-agency-provider-runtime/pull/5)
（`1452827`）、[Lark Provider PR #2](https://github.com/flair-agency/live-agency-provider-lark-base/pull/2)
（`98f4d21`）。親の記録・候補カタログはPR #48にまとめる。

```mermaid
sequenceDiagram
  actor Operator as オーナー／ホストAI
  participant Runtime as 保存済み環境のRuntime
  participant Provider as Lark Base Provider
  participant API as 選択したLark API
  Operator->>Runtime: 共通の対象者／履歴読取要求
  Runtime->>Runtime: 固定版と設定のSHA-256を照合
  Runtime->>Provider: 要求＋保存した設定
  Provider->>Provider: 環境・利用者・Base・テーブル・読取権限を照合
  Provider->>API: 既存のAPI読取処理
  API-->>Provider: フィールドとレコード
  Provider-->>Runtime: 共通形式の対象者／履歴・失敗段階
  Runtime-->>Operator: 要求との対応を確認した結果
```

既存Skill内のフィールド変換と履歴変換をProvider側へ移した候補で、元のSkill実装はまだ保持している。
日付の秒、空欄、カンマ付き数値、複数の同一参照、不正な保存データの理由を保持する。
分単位の再実行照合、対象選択、既存行の扱いなどの業務判断をProviderへ移していない。
Providerが返す設定検証／API読取などの固定した失敗段階から原因を切り分けられる。
秘密やサービスの応答本文はエラーへ含めない。

設定は要求本文から受け取らず、保存済み環境の参照とSHA-256で束縛する。
設定が変わると、再計画または以前の設定の正確な復元が必要になる。
これは設定の取り違えを防ぐ処理であり、新しい業務停止条件や登録承認条件ではない。
Provider固有の設定質問票の自動生成と、API→ブラウザーの自動切替は今回の実装には含まれない。

確認結果：Runtime関連10件、Provider関連26件が成功。失敗段階の表示修正後は該当5件のみを再確認。
元の履歴変換との同一入力4ケース、フィールド解決関数の一致も確認した。
親の呼出し発見／API操作契約チェック2件が成功。配布ファイルと参照先を確認した。
親の相対参照55件（未展開の子2件は固定コミットから確認）、Runtime配布11ファイル、
Provider配布58ファイルを確認済み。実際の候補カタログと保存済み選択を使った計画作成で、
TikTok取得とLark読取の2能力が選択されることを確認した。設定・計画はGit外に保持し、導入はしていない。
Runtimeが渡す引数とProviderの受取口は独立AIのソースレビューでも一致している。
実際の本番API接続、画像取得、Skillによる計画作成、登録の成功を確認したという意味ではない。

AIポリシーレビューは開発・文書知識・言語方針とPrivate Source Integration Guideを根拠に、
責務、既存変換の保持、未実装の範囲、人が実行するCLI／失敗時の確認先、配布物を照合した。
元の本番M1、以前のProfile配置、業務データとスケジュールは変更していない。
Providerのブランチ同期は一度自動レビューで拒否されたが、既存の非公開送信先と
オーナー承認済み開発同期方針を確認し、同じ送信先へ同期できた。制限は解消済み。

次の判断は、この読取接続のソースを採用するか。採用後に候補の固定配布・指定Workへの導入を行い、
本番の対象者／履歴読取とTikTok観測を照合する。M2の保存操作接続とM3のSkill呼出しは残る。
本番書込みの承認は、このソースレビューや読取検証から推定しない。
復旧は現行M1の固定配置・設定へ戻す。既存登録・配備receiptを保持し、旧版を上書きしない。

# 製品仕様の参照

- [OpenAI：Projects and chats](https://learn.chatgpt.com/docs/projects)：プロジェクトなしの開始と、プロジェクトの文脈・探索範囲。
- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills)：Skill形式とローカル探索・配布方式。
- [OpenAI：Browser](https://learn.chatgpt.com/docs/browser)：Work／Codexとブラウザー・権限の区別。
- [OpenAI：Work Cloud](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-cloud-security)：ローカル配備やブラウザー状態をクラウドへ自動継承しない。
- [GitHub：Dependabot security updates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates)：脆弱性修正PRと本番切替の区別。

# Profile M2固定配布と本番導入の更新

2026-09-10の実施記録。先行する「Profile M2読取接続の候補」節の
Runtime `2.0.0-m2.0`等の「未公開・未導入」とソース採用待ちは、その時点の記録として保持する。
本節は、その後に完了したM1→M2導入を記録する。Lark `1.4.0-m2.1`の後続実施結果は本書冒頭で区別する。
その後オーナーがソース採用、固定版の非公開配布、指定Workへの導入・読取検証を明示承認した。
Runtime [PR #5](https://github.com/flair-agency/live-agency-provider-runtime/pull/5)、
Lark [PR #2](https://github.com/flair-agency/live-agency-provider-lark-base/pull/2)、
親 [PR #48](https://github.com/flair-agency/live-agency/pull/48) は統合済み。
Larkの候補版をnextへ限定する [PR #3](https://github.com/flair-agency/live-agency-provider-lark-base/pull/3) も採用された。

| 配布物 | 固定版・証拠 |
| --- | --- |
| Runtime | `2.0.0-m2.1`。[PR #6](https://github.com/flair-agency/live-agency-provider-runtime/pull/6) はmain `34fcf39bbdb856eaf405de1f81a8f7c5e692d515` へ統合。[配布run 34461964090](https://github.com/flair-agency/live-agency-provider-runtime/actions/runs/34461964090) で非公開・integrity・導入を検証 |
| Lark Base Provider | `1.4.0-m2.0`。[run 34459702584 attempt 2](https://github.com/flair-agency/live-agency-provider-lark-base/actions/runs/34459702584/attempts/2) で配布検証済み |
| 独立カタログ | `0.1.0-m2.0`。[固定リリース](https://github.com/flair-agency/live-agency/releases/tag/catalog-v0.1.0-m2.0) の内容を検証済み |

最初のRuntime `2.0.0-m2.0` 導入は、setupが全依存のregistryをGitHub Packagesへ固定し、
公開CLI依存を取得できず停止した。この失敗をサービス権限不足や本番成功として扱っていない。
`2.0.0-m2.1` は明示したnpm設定のdefault／scope別registryを使用し、環境変数からの
npm設定上書きを除外する。ユーザーの認証設定は変更していない。
変更箇所のsetup 4件・版確認1件と、実npmによるofflineのregistry選択確認は成功した。

修正版ではregistryのみから実際の本番導入が成功し、既存Runtime入口・host Skill案内・運用案内の
3ファイルを採用した。Lark保存先とTikTok取得／Lark読取の2能力を選択し、業務Skillとstorageは
未選択、更新は手動である。旧M1配置と3ファイルの旧コピー・変更前後ハッシュを保持する。
このM1→M2導入の復旧は、当時記録した3ファイルだけを旧M1へ戻すものだった。
今回のLark修正版の復旧先は、冒頭に示した現在のM2構成である。
失敗候補と設定束縛の証拠は診断用に残し、
旧版や別のProfile配置を上書きしない。具体的な機器上のパス・設定・業務データはGit外に保持する。

指定ChatGPT Work Localタスク自身がRuntime起動、保存済み設定、提供能力を確認した。
最初のread-creators要求は `PROFILE_DATASTORE_READ_FAILED`、段階 `read-fields` で停止した。
その停止時点ではread-historyとTikTok観測は未実行で、書込みはなかった。
同じRuntime要求をホストの必要な実行権限付きで実行すると、read-creatorsはdoneとなり、クリエイター一覧1,374件を取得した。これは同期対象の件数ではない。
Providerの利用者・保存設定は変更しておらず、フィールド／対象者読取の当初の失敗は解消した。
read-historyは一回の実行で完了せず、10分のsmoke検証上限を超えた経過10分51秒で停止した。
親がPID・導入済み実行ファイル・要求を一致確認し、その3プロセスだけへSIGTERMを送った。
Providerの完了JSONは得られておらず、API失敗やdownload budget発火と断定しない。
コード確認では全Profile行をhydrateし、各attachmentのhash確認で取得前後に選択テーブル全体を
再読取する実装であることが分かった。ただし経過時間全体の原因は切り分け未完了である。
TikTok観測は未実行、外部書込みは0件である。
導入済み運用案内にホスト実行権限の切分けを追記し、変更前の採用済みコピーと新しいreceiptを保持した。
3ファイルの現在／復旧ハッシュは記録と一致する。対象者読取の成功を、履歴・TikTok観測・画像比較・
Profile計画や登録の成功へ拡張しない。M2保存操作の接続とM3のSkill呼出し・計画・必要な承認・登録・再読取は残る。
非公開配布・本番採用・限定読取検証へのオーナー承認はこの実行で使用した。
既存の本番書込み承認を復活させず、定期実行も追加しない。

| 次の作業 | 人の担当 | 期限 | 概要 | 完了条件 | 参照 |
| --- | --- | --- | --- | --- | --- |
| Profile履歴読取修正の受入を確認する | TBD | TBD | 固定版の配布・導入と実Workの対象1名読取は完了。結果・初回失敗と画像未検証の範囲を確認する | 限定履歴読取の実績をオーナーが受け入れる | [Provider #4](https://github.com/flair-agency/live-agency-provider-lark-base/issues/4)、本書冒頭 |
| Profile先行Skillの本番受入へ進める | TBD | TBD | M2保存操作とM3のSkill直接呼出しを接続する | 選択したSkillから計画・必要な承認・登録・再読取まで確認できる | [#32](https://github.com/flair-agency/live-agency/issues/32) |

AIポリシーレビューでは、候補時点の記録を保存しながら現在状態を更新すること、配布・導入と
実ホスト受入の区別、固定版・障害原因・復旧対象、非公開証拠の保管境界を照合した。
この文書更新でテストや本番操作を再実行していない。成功した対象者読取、未完了の履歴読取、
確認済みコード挙動と未確定の性能原因を分け、未実行範囲・承認消費・次の修正範囲を確認した。
