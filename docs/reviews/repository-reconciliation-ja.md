# ローカルとGitHubの整合 — 2026-09-09

所有者の「ローカルプロジェクトの状態とGitHubの状態の乖離を是正」の実行記録。

## 変更カード

- 主分類G、補助C/F：ソース保存先と参照・追跡状態の整合。
- 対象：親の移行記録・結合テスト、各独立コンポーネントの既存変更、GitHubソース保存先と移行Project。
- 不変条件：既存変更と履歴を保持。公開Skillには実データ・認証情報・非公開Provider実装を含めない。ソース保存とパッケージ公開・本番切替を区別する。
- 最初の作業：状態の棚卸し、既存変更の検証と所有リポジトリーへのcheckpoint、GitHubへの保存、親の参照更新。
- 次の境界：公開内容と履歴を確認してから公開設定・公開先を反映。正式なSkill識別子の変更や本番切替は実施しない。
- 検証：各所有者の対象テスト、caller inventory、公開内容・履歴確認、remoteのSHAと親参照の再読取。
- 復旧：force-push・履歴書換え・削除なし。元のcommitを記録し、変更は追加commitで取り消す。公開した情報の完全な回収は保証できない。
- 並列エージェント：なし。追加のモデル変更なし。

## 開始時の状態

親は `codex/project-root`、HEAD `d69882dd223a82348d17869d013400f428cd7cb8`。親indexは空。既存ファイル11件、未追跡39項目、8 Skill内22ファイルの未コミット変更。

リモートのheadに未保存：BackStage、Lark Base、Lark transport、プロフィール記録、ギフト統合。13既存Skillはorigin未設定。外貨売上の新規2 Skillと共有計算は親に未追跡。既存3 SkillリポジトリーはPrivate。

ソース公開方針とレジストリー配布範囲を区別する。Privateでの初期パッケージ配布は、Skillソースを恒久的に非公開にする理由にはしない。未完了の公開・保存は明示的に追跡する。

## 検証・結果

開始時の8 Skillとcaller inventoryの対象テスト92件成功。既存の公開内容check成功。全16既存SkillのGit履歴を対象に、秘密鍵・GitHub token・既知の実環境識別子・実アカウント・ローカル個人パスを検査し、該当なし。URLは配布・公式公開API・合成テストの参照であり、認証画面の操作手順や非公開exportは確認されなかった。機械検査は未知の秘密を完全保証するものではなく、公開範囲のレビューを併用する。


## 所有者が追加した開発方針

2026-09-09：ローカルとリモートの乖離を小さく保ち、適切な作業ブランチ管理を前提とする。未完了・レビュー待ちは作業ブランチで同期し、mainへの統合とは区別する。development-policy.md の Local and remote source synchronization にこの指示を英語で採用した。


## 是正checkpoint

- 所有者は候補名の正式採用も今回に含めると回答。13 Skillを旧名から新名へgit mvし、Skill metadata・npm名・直接参照を更新。旧業務契約、frozen prototype、削除承認、本番routeは維持。
- 8 Skillの既存変更を独立作業ブランチでcommit。名称変更も13所有者でcommit済み。
- 既存5所有者の検証済みHEADをGitHubの codex/migration-checkpoint-20260909 にpushしSHA確認。Runtimeの改名参照も別作業ブランチへ保存。
- 外貨計算の既存ローカルGitを独立submoduleに登録し、共有計算はPrivate GitHubへ同期。外貨2 Skillもsubmodule化し公開準備。
- 全体テスト1,013件成功。最初の直接テスト起動はcache権限と必須fixture選択不足、改名後の初回全体検証は2つの旧名参照で失敗した。正式runnerと参照修正後に全件成功。公開内容checkも成功。
- 過去のarchiveへの機械的path置換は、開始時との差分がその置換だけであることを照合し、バックアップ後その編集だけを取り除いた。一括restoreは自動承認レビューに拒否されたため使用していない。
- 親remoteに別タスクの執筆引継ぎcommit 6c4fa75 があり、同じローカル文書と一致することを確認。保持して統合する。
- 公開作成は自動承認レビューで停止。公開する内容・履歴・宛先の明示承認が必要。具体的対象は [公開対象一覧](skill-public-source-publication-ja.md)。公開完了まで未到達の子pinを親の完成compositionとして採用しない。main・パッケージ公開・本番変更なし。


## 公開承認後の実行

所有者の一覧への明示承認を受け、全18 SkillのPublicと承認SHAのremote保存を確認。既存公開MCPの指定branchも保存。全34コンポーネントの現在HEADが選択したGitHub remoteのbranchから取得可能であることを確認してから親の参照を採用する。既存3パッケージのregistry visibility再確認はread:packages不足の403で未確認。package設定変更・releaseは実行していない。公開処理の自動承認blockは明示承認により解消済み。


## 最終検証

親commit `268aef1f9266acdbefedd0c6209d4c3e54f3a90d` をGitHubから全submodule付きで新規cloneし、既存registry cacheを用いた `npm ci --ignore-scripts --offline`、正式な全体test runner（1,013件）、公開内容checkがすべて成功した。これはsource取得を含む開発compositionの再現検証であり、匿名registry導入や本番検証ではない。元のcheckout・全34子・新規cloneはいずれもGit statusがcleanだった。以降の更新はこの検証記録とチケットのみ。

親は `codex/source-reconciliation-20260909`、GitHubで保存済み。既存remoteの執筆引継ぎcommit `6c4fa75` を履歴を保持してmergeした。mainへの統合なし。既存の運用環境・公開済みpackage version・データは変更していない。旧branch/commitは復旧参照として保持。参照する最新情報はこの親branchと記録された子commit。


## Skillカタログ — 2026-09-09

所有者の依頼で skills/README.md に全18 Skillの概要・関係を4分類と2つの図で整理。主分類G、対象は親の案内文書と公開内容checkのディレクトリー列挙のみ。正規文書は既存の承認済み契約を英語で要約し、個別Skillの意味・実装・権限は変更しない。外貨計画candidateと週次申請frozenを明示。親READMEから導線を追加し、古いローカル限定の説明を是正済み状態へ更新した。

検証：実ディレクトリー18件との一対一照合、相対リンクの存在確認、公開内容check、diffチェックが成功。skills直下のREADMEをSkillディレクトリーとして扱わないよう検査ツールを調整した。新規の業務実行や全体再テストは不要。独立作業ブランチ codex/skill-catalog で保存し、親の先行PRへの追加レビューとして扱う。復旧はこの文書・列挙変更のcommitのrevertで可能。


## PR #35 CI修正 — 2026-09-09

主分類E、境界は親CIの読み取り認証。ユーザーの「まずはCIを通して」を実行選択とし、非公開子リポジトリーと固定lockのGitHub Packages取得を対象とする。業務権限・公開・本番は変更しない。構成はsource読取とpackage読取を別secretに束縛し、checkout後にgit認証を残さず、package tokenはhooks無効の導入stepだけに渡す。テストと公開内容checkを省略しない。

GitHubの失敗はcheckoutの非公開repo取得でRepository not found。repo secretとvariableは空、org secret一覧は権限不足で取得不可。CLIの個人認証をCIへ転用しない。CI_SOURCE_READ_TOKENとCI_PACKAGES_READ_TOKENの具体的設定を docs/development/ci.md に記録。現時点ではsecret登録待ちで、GitHub CI成功は未確認。復旧はworkflow変更のrevertと専用secretの削除。独立agentなし。


## CI完了・基準branchへの統合 — 2026-09-09

所有者が2つのCI secretを登録後、ae3fbb4のpush/PR両CIでcheckout、online固定lock導入、1,013テスト、公開内容checkが成功。証跡はGitHub Actions run 34315658065 / 34315655117。PR #35へのLGTMを受け、承認HEAD一致を確認してmerge commit 0da30c3でcodex/project-rootへ統合し、ローカルも同期した。以前のsecret登録待ちは解消。次は#31の正式名配布案の再照合。パッケージ公開・本番変更なし。
