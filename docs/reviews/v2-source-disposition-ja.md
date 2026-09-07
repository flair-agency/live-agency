# v2着手前：未コミット変更の処置案

状態：処置案を承認済み。目的別の適用と採用範囲の検証を完了。以下の表は承認時の判断記録。採用コミットと再現確認の結果は移行状況を参照。

## 結論

**承認済みの再編・文書・共通の配布配線を採用し、月次活動に必要な実装だけ一式で分離採用する。他の未採用の機能追加・試作は保全して戻す**ことを推奨する。新しい基盤の具体設計は、その採用状態から作る。

単純な全repoの`reset/clean`は使わない。履歴分割後のHEADには再編の配線が含まれないものがあり、構造変更と機能変更を同じファイルで行っているため。対象の親・子の履歴を巻き戻すのではなく、現在の配置を保って未コミットの機能差分を戻す。

## 調査範囲と保全

親1＋コンポーネント30の計31repoを調査。Git statusの記録は510件（親のgitlinkと子の差分を含むため、510個の独立したコード変更ではない）。Runtimeは127件、そのうち39件は未追跡で、39件すべて再編前コピーに存在した。

- 現在の全repoのHEAD、status、index、staged/unstaged patchと未追跡ファイルを`tmp/v2-source-disposition/snapshot/`へ保全した。symlinkはリンク自体を保存し、参照先の依存ディレクトリーはコピーしていない。
- 再編前のソース・Git履歴は`tmp/repository-restructure/runtime-before/`に保持している。両者を使って、元のHEAD／再編前の未コミット変更／現在の配置を区別する。
- 全件のファイル・状態・目的区分・ハッシュは`tmp/v2-source-disposition/changes.csv`。生成した調査データのためGit管理外に置く。ハッシュは今回の調査対象の同定用であり、移行の完了条件にする固定snapshotではない。
- 別の「v2移行 司令塔｜live-agency」タスクは読取時点で停止済み。今回のRuntime監査担当は読取専用で、親・Skills・Providersの監査と分担した。M2の並行実行は開始していない。

目的はコード差分と既存記録から確認・推定したもの。「以前書かれた実装」という事実だけを採用済み・実運用合格の根拠にはしない。

## 目的別の処置

区分はファイル単位の調査索引。混在ファイルの行・hunkごとの実行指示ではない。以下の処置承認後に、機能と参照の依存をまとめて分離する。

| 区分・件数 | 変更目的・主な対象 | 推奨処置 | 戻す影響・実施条件 |
| --- | --- | --- | --- |
| C01・60件 | **文書整理・再計画の採用**：親docs、README、AGENTS、Runtime旧文書の移転。承認済みの方針・配置・参照の反映 | ロールフォワード | 旧文書を元の配置へ戻すと正本が重複する。現在の計画を採用し、歴史資料の命令を現行化しない。 |
| C02・210件 | **repo分割・npm配線・共通ツール**：親gitlinks/workspace、各manifest、移管したテスト、imports。16 Skillの個別repo化と新配置での開発 | 構造変更をロールフォワード | manifest・テストには旧実装の追加分も混在。後述の機能を戻す場合、exports・依存・テスト選択も同時に調整する。全ファイルを無条件に採用する意味ではない。 |
| C03・3件 | **依存ディレクトリーのリンク**：cli-utils/row-archiveの追跡済みnode_modules削除、親fixtureの未追跡リンク。ローカル導入時の生成物 | 追跡から除外 | 2ライブラリーのHEADに誤ってリンクが入っていた。現在の削除を採用し、fixture用リンクもGitに入れず、必要なら導入・テスト時に再現する。 |
| C04・9件 | **指示資源の導入・解決とbackup共通契約**：source-provider-api、private-runtime-files、coinの指示。旧RLSの配布検証とbackup抽象化 | 責務を分け、追加実装は保全してロールバックを基本 | scope・再編参照は維持する。新規runtime-context、confined reader、backup契約はD1で採用対象を決める材料として保全。採用前にすべて基盤仕様として固定しない。依存する指示・tests・exportsと一組で扱う。 |
| C05・9件 | **月次活動の明示Provider注入**：activity Skill、management_activity_input、selected Provider、Runtime runnerと直接tests。先行M2/M3の月次業務を実行する | 一式を分離してロールフォワードを推奨 | 旧版へ戻すとProvider注入・明示選択の入口を失う。基盤の採用設計に合わせる素材として保持し、実Provider検証済みとは扱わない。MCPの直接importなし。 |
| C06・7件 | **Lark操作定義・認可ライフサイクル**：lark-core transport、Base records-search transportとtests。操作定義の一元化とdispatch前の認可再確認 | 分離し、未採用の追加hookは保全してロールバックを基本 | 月次runner/selected Providerは新しいcheckRequestAuthorization hookを直接参照していない。添付等で必要になる追加hookはその能力で再採用。既存の明示認証・操作制限まで撤去しない。操作定義一元化は採用版との整合を確認して分ける。 |
| C07・1件 | **旧Skill共有Larkクライアントの移管**：providers/lark-base/src/skill-client.mjs。旧_sharedのProvider所有への移動 | 移動を採用、追加機能を分離 | 移管前のファイルにもselected-client向け追加が混在する。HEAD版の振る舞いと再編後の公開入口を基準に、C08で戻す追加に対応した分だけ戻す。 |
| C08・142件 | **月次以外のv2業務・backup・添付・履歴整理**：profile/live/invitation/insight/gift、backup/retention/drill、Base/Drive実装とtests。各業務のselected経路、添付認可、完全backup、保持・復元 | 保全して未コミット追加をロールバック | 再編前から存在する実装。未採用のままM1へ一括採用しない。Skill・Provider・Runtime・テストを対応付けて一組で戻す。既存HEADにある機能まで削除しない。各M2/M3で必要なものを保全物から再利用する。 |
| C09・2件 | **Lark ChatのAPI操作一覧**：新規api-operations.js、Providerテストの参照変更。操作メタデータの追加とMCPパス修正 | 未採用一覧は保全してロールバック、参照修正は採用 | 既存indexはm2u-conversation-messages-api-operation.jsを利用しており、新規一覧への直接参照は今回の検索では見つからない。Chat実動作の合格ではない。 |
| C10・54件 | **MCP/domain拡充と関連Runtime**：membership、BackStage action、Management write、intelligence、scouting route等。追加業務契約・厳格なprofile経路・プロセス試作 | 未コミット拡充分を保全してロールバック | MCP全体を延期する決定に沿う。再編のimport/scope修正は維持。現行HEADのMCPを削除・停止する意味ではない。必要なinterfaceはM1で所有先へ選択抽出する。 |
| C11・4件 | **固定環境のnpm配布qualification**：runtime/scripts/npm-runtime-{artifacts,formal-distribution,offline-install,resolution}.test.mjs。過去RLS成果物・receipt・固定パスの検証 | 保全して開発ツリーから撤去 | 4ファイルはすべて再編前の未追跡資産。ポータブルなpack/導入検証へ必要な条件を再利用し、過去receiptをM1の必須入力にしない。 |
| C12・9件 | **Runtimeの起動・横断テスト参照**：install-codex-skills、smoke/v2-contract、caller scan移管等。新配置への参照修正と横断検証 | 再編配線をロールフォワード | 現行横断テストには延期MCPへのimportがある。過去回帰資産として保全し、M1の必須試験は採用経路で構成する。テストを通すためだけに延期パッケージを配備しない。 |

## 採用前に直すべき再編の取り残し

1. **パス検証の意図しない変更**：`packages/source-provider-api/src/index.js`の`safePackageResource`が`startsWith("./")`から`startsWith(".")`へ変わっている。再編前コピーは元の条件なので再編時の変更と特定できる。元の形式制約へ戻し、不正な相対指定の拒否を確認する。既存のディレクトリー内チェックも残っており、この発見だけで外部パス脱出が可能とは主張しない。
2. **node_modulesの誤追跡**：`packages/cli-utils`と`packages/row-archive`のHEADにはnode_modules symlinkが入っている。現在の削除をコミットへ反映する。親`test/fixtures/installation/node_modules`も現状未追跡なので、依存成果物としてGitへ入れない。
3. **補助テストの旧パス**：`runtime/package.json`の`test:backup-gates`に旧Skillsモノレポの3参照が残る。C08の採用状態に応じて正しい配置・対象へ修正する。
4. **取得元の訂正**：Provider7個とMCPの現在のorigin／親submodule URLは、GitHubではなく旧SEPチェックポイントのローカルbundle。既存GitHub URLが保存されているという以前の説明は不正確だった。採用ソースの由来を維持しつつ、M1で実際のGitHub配布元を確認・設定する。推測したURLへの書換えやpushはしない。

これらは前回の1,743件の一括テストが拾わなかった事項。件数の成功を採用状態・配布可能性の保証にはしない。

## 処置後の状態と確認

1. 目的別に必要な差分を分離する。C05月次活動はSkill・selected Provider・Runtime runner・直接テストを一式で扱う。インターフェイスやProviderの実動作を完成済みとは扱わない。
2. 未採用機能の差分を戻す際は、そのexports・manifest・テスト・指示の追加も対応付ける。承認済みの移管先・scope・共通ツールまで戻さない。既存HEADの安全性を保証したり、本番で起動したりしない。
3. 再編の取り残しを修正し、採用した機能と配布・import解決を対象に検証する。延期した試験は範囲を明示して保全し、欠落を成功として報告しない。
4. 子repoに目的別コミットを作り、採用した版へ親参照を合わせる。別の作業場所でその状態を再現し、未コミット資産への依存がないことを確認する。
5. M1の具体設計（正式名・インターフェイス・依存図・代表操作）へ進む。MCP全体の完成を要件へ戻さない。

この処置によって既存の実装をすべて放棄するわけではない。延期した成果は保全物から能力単位で再利用する。逆に、作り直しを避けるためだけに未採用の設計を基盤へ固定しない。

## 今回の実施・レビュー点

実施したのは読取監査、調査データと復元資料の保存、このレビュー文書と進捗の更新のみ。既存の子repoのソース・HEAD・staged/unstaged状態は変更していない。テスト・実サービス・ホスト登録・GitHub操作も実施していない。

今回判断してほしいのは、**C05の月次活動一式を先行採用し、他の未採用追加は保全rollbackを基本にする処置**。この例外採用が不要ならC05も保全して戻せるが、先行M2の注入・選択経路をM1で作り直す必要がある。

[採用済み計画の着手前手順](../migration/v2-plan.md#before-m1-resolve-uncommitted-changes)に従い、具体的な処置表をレビューしてからソースを変更する。全体計画の基本方針を再承認する場ではない。

## 承認後の実施結果

処置承認後、185件に復元・保全移動を適用し、月次活動の注入経路を維持した。全体の履歴をresetせず、既存HEADの振る舞いに再編後のimport・配置を合わせた。削除対象は`tmp/v2-source-disposition/removed/`にも保全し、実施一覧は`applied-actions.json`へ記録した。

採用版の一括テストは662件成功。公開内容チェックも成功。延期した追加機能の試験は合格件数へ含めず、旧1,743件と同じ対象を再検証したとは扱わない。Provider資源の`./`形式拒否を追加検証した。補助テスト・exports・配布一覧も採用状態に合わせ、Chat操作検証は既存の実装が使う操作定義へ接続した。これらはローカルの採用確認であり、M1のregistry配備やM2実動作の合格ではない。
