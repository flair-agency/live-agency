# LIVE Agency

全体の設計・計画・共通ツールを管理するプロジェクトリポジトリです。

文書は日本語でレビューし、承認後の正本は英語で管理します。[文書言語ポリシー](docs/governance/document-language-policy.md)を参照してください。

- `docs/`：全体文書。最新の[移行レビュー案](docs/v2-migration-plan-review-ja.md)。
- `tools/`：開発・移行・保守用ツール。
- `provider-runtime/`：既存Runtimeリポジトリを参照するGit submodule。
- `tmp/`、`.sep2-desktop-evidence/`、`.codex/`：ローカル専用。Git管理対象外。

Runtime配下のProvider・Skill・MCPは、既存のsubmodule構成を維持します。
Gitはソースのコミットを、npmのmanifestとlockfileは配備するパッケージの組合せを管理します。

親のsubmodule参照に含まれるのはRuntimeのコミット済み状態です。現在のRuntimeと
その配下に残る未コミット変更は、各リポジトリで確認・管理してください。

```sh
git status
git -C provider-runtime status
```

この親リポジトリはローカルで作成したもので、公開先はまだ設定していません。
submoduleのGitHub URLは既存の設定から引き継いでいます。現在の固定コミットが
GitHubから取得できることは、このローカル整理では検証していません。
