# 外貨売上M3の責務・配置案

2026-09-08。オーナーが2Skill＋共通の中立計算パッケージを採用。元の稼働Skill・private profile・仕訳・monitorは変更していない。

## 採用後の実装カード

主分類D、副分類E/A。保護境界は2つの公開Skill契約と共有計算の配布。正式候補は下表の2名、共有所有者は `packages/foreign-revenue-core`。元のPython Decimal計算を共有パッケージへ移し、Node入口から固定操作・JSON標準入力で呼び出す。Python 3.10以上を実行要件に明記する。稼働原本は不変、Skill間依存・暗黙profile・無承認仕訳を禁止する。

順序は共有計算→2Skillの固定操作入口→同一入力比較と独立した一時インストール。完了条件は既存有効入力の計画/hash一致、誤操作・日付不正の拒否、梱包後の実行確認。新規所有者はローカル候補として独立Git管理し、公開先・正式release・親pin採用・稼働経路切替は後続ゲートとする。外部Provider・monitorの実装や実サービス操作は含めない。並列なし。復旧は新規候補のみを退避し、保持した原本へ戻れる状態を維持する。

変更カード：主分類G（読取りと合成検証）。別管理の外貨売上ソースを一時コピーし、公開中立の計算・契約と、Provider／Runtimeへ置く処理を仕分ける。完了条件は元ファイルhashの保持、既存合成テスト、移行時に直す契約不整合、1対2のSkill選択材料。次ゲートは責務・正式名の選択。並列なし、原本不変、一時コピーと記録だけを破棄して復旧可能。

## 確認できた現状

原本はpackage.jsonとGit管理を持たない既存Skill。計算スクリプト1本が `recognition` と `settlement` を分岐し、共有する請求書・宛先・方針の検証と、操作固有の計算を行う。外部API呼出し・PDF解析・OAuth更新はこのPython実装に存在しない。既存合成テストは成功した。原本の6ファイルをhashで束縛し、一時コピーに対してのみ実行した。

- 売上計上：確定invoice、月末に対応する検証済みrate、重複照会を受け、売掛金／売上の計画を作る。
- 入金消込：未消込売掛金、唯一の銀行入金候補、手数料等の除外証拠を受け、銀行／売掛金／為替差損益の計画を作る。
- どちらも計画のhashと個別承認が必要。計算成功は仕訳作成を意味しない。

## 推奨する配置

業務上の入口・入力・承認・完了結果が異なるため、次の2Skillへ分ける案を推奨する。

| Skill候補 | 入力と出力 | 含めない処理 |
| --- | --- | --- |
| `live-agency-foreign-currency-revenue-recognize` | 正規化済み確定invoice＋rate＋重複確認から月末計上計画 | 銀行候補探索、入金消込、monitorの直接作成 |
| `live-agency-foreign-currency-receivable-settle` | 正規化済み未消込債権＋唯一の入金候補から消込計画 | 売上の再計上、無承認仕訳、monitorの直接削除 |

共有する中立な検証・金額計算は小さな共有パッケージに置き、Skill同士を依存させない。各Skillは自分の操作だけを受け付ける入口を持つ。旧1本の契約と同じ合成入力で結果を比較し、原本は呼出し／復旧確認が済むまで保持する。この配置を採用し、独立したローカル候補を作成した。

1Skillを維持する場合も、2操作の承認・副作用を混同しない。分割しない案の利点は配布単位を増やさず既存呼出しを維持できることだが、独立した業務選択と責務が名称から分かりにくい。

## 移動する責務と未確認事項

invoice取得・解析、rate取得／営業日選択、重複・売掛・銀行照会、仕訳と連携状態の読戻しはProvider。組織方針・実行profile・一時monitorの作成／終了と重複防止はRuntime。公開Skillには中立入力・計画・承認／結果検証を残す。既存のMoney Forward経費Providerが会計仕訳を扱えるとは推定しない。

現行文書の暗黙private-profileフォールバックは移行先では使わず、明示選択したProvider／profileへ束縛する。稼働monitorのID・未決済状態は今回照合していない。monitor置換・二重作成・停止を先行しない。

## 合成入力で見つかった移行時の修正候補

- YYYY-MM-DD契約に対し、`20260806` とISO週日付が `ready` として受理された。
- `revenue_month` の年0で未捕捉例外となり、契約どおりの `invalid` JSONを返さなかった。
- JSON浮動小数の金額は `invalid`、profile複数一致は `blocked` となり、既存の停止条件は確認できた。

日付の厳密化と例外の正規化は移行先で検証する候補。稼働原本は変更していない。会計方針の妥当性や実サービスの動作を検証したものではない。証拠はignored `tmp/v2-project/hour-foreign-source.json` と `hour-foreign-contract-probes.json`。

保守ProjectにあるOAuth再認証とinvoice添付の2件は、本案で実装・完了扱いにしない。

検証用環境の選択：新規候補3archiveを専用一時consumerへ固定し、既存 `private-files` 1.0.0だけをregistryから追加して `npm ci --ignore-scripts`。Skill標準validatorに必要なPyYAMLが既存Pythonにないため、検証専用の一時venvへ対応wheelのあるPyYAML 6.0.3をwheel限定で導入する（6.0.2はこのPythonに対応するwheelがなく未導入）。いずれも稼働環境・global登録・親node_modulesを変更せず、一時root削除で復旧可能。

## ローカル候補の結果

2Skillと共有パッケージを各独立Git所有者として作成し、ローカルcommitを記録した（remoteなし）。正式採用の責務は[英語の境界文書](../migration/foreign-revenue-split.md)に記録した。各manifestは候補0.1.0・privateで誤公開を防止し、親のworkspace globが新所有者を検出するため、対応する6つのlockエントリ（所有者3＋link 3）だけを追加した。submodule pinへはまだ採用していない。

共有計算18件が成功。元の有効な合成入力8ケースは計画とhashが一致した。日付の厳密化、年0のinvalid化に加え、長いDecimalの丸め精度、JSで損失のない整数範囲、ゼロ丸めの拒否を直接検証した。実体パスの表記差によりCLIが起動しない問題を梱包後テストで検出・修正し、別名CLI起動と入力上書き防止を確認した。

修正後の3archiveとregistry private-files 1.0.0を専用consumerのlockfileへ固定し、scripts無効のnpm ciで4packagesを導入。導入済みコードに対する別置きharnessで32件成功。2Skillとも標準quick_validate成功、公開内容検査と参照リンク検査成功。元の6ファイルhashはすべて維持。証拠はignored `hour-foreign-candidate-archives.json` と `hour-foreign-installed-tests.json`。

これは計算・固定操作入口・配布資源の検証であり、会計Providerの登録／読戻し・稼働monitor・M3全体の受入ではない。次は必要Provider契約と既存caller／monitorの明示的な対応付け、正式release・親pinの採用条件を揃える。元の稼働経路に変更はなく、新規候補を退避できる。

ローカル構成の直接配線：既存workspace globに追加された3manifestと親lockfileが不整合にならないよう、対応エントリのみを合わせる。既存7件のLark整合と保持依存削除は保持し、node_modulesの変更は行わない。正式release・子commit/pin・本番選択をこのlock整合から推定しない。

ソースcheckpoint：共有計算 `100d515c6b63bcc20abc00b7e8cb964b4023f0f7`、計上Skill `eda074ceb82d7b8ea50598104468008d27b0eabd`、消込Skill `c9260687336e423a8bc10951908da57b2738e881`。最終文書も含め再packし、復旧候補と合わせた一時consumerで55件成功・配布25ファイルのsource一致を確認した。既存の親indexと運用登録は不変。

言語方針の引継ぎ後、新規の補助スクリプトはJavaScriptを使用した（Node >=22とnpm配布でnative TypeScriptの全範囲互換を保証しないため）。外貨計算候補は引継ぎ前に既存Python原本を移したものであり、方針は既存コードの一括変換を指示していない。これを将来のPython新規採用の承認とは扱わない。

最終の公開export確認でstdin起動時のimport失敗を修正し、2件の回帰を追加した。4公開APIと3Skill資源の導入先からの解決も成功。最新候補の55件と25配布ファイルのsource一致を確認した。
