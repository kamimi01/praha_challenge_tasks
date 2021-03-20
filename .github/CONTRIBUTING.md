# 本レポジトリ運用ガイドライン

* あくまでkamimi01が作業する時のガイドラインですので、参考程度にしてください!

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [本レポジトリの運用](#%E6%9C%AC%E3%83%AC%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AE%E9%81%8B%E7%94%A8)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 本レポジトリの運用

* **レポジトリ運用で興味あると思ったことは、とりあえすぐやってみる!!細かいことは気にしない!!(コントリビュータの方々に迷惑かけない程度に!)**
* ブランチモデルはGit-Flowを参考にしている
  * `main`：直接このブランチをローカルで作業することはしない
  * `develop`：直接このブランチをローカルで作業することはしない
  * `feature`：基本`feature/`のようにブランチを切って作業する。マージ先は`develop`
* 基本的な作業の流れ
  1. (リモート)Github上でIssueを起票する
     * `ISSUE_TEMPLATE.md`に沿って記載
  2. (ローカル)`feature`ブランチにcheckoutする
  3. (ローカル)リモートの`feature`ブランチをpullする
     * Github Actionsのジョブがプッシュ時に実行されており、自動コミット&プッシュされるので、まずpullしないとあとでコンフリクトする可能性があるため
  4. (ローカル)`feature`ブランチで作業する
     * 新規mdファイルを作成する場合
       * 目次生成場所を示すため、以下のコメントを挿入する（基本は「#」を記載した後に挿入する）
       * このmdファイル記載がそうなっているのので、それを参考にする
       * 既存mdファイルを作成する場合
       * 目次生成はGithub Actionsのジョブで自動追加もしくは修正されるので、目次生成周辺はローカルでは触らない!

```md
## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->
```

  1. (ローカル)リモートへプッシュする
  2. (リモート)Github Actionsの`toc.yaml`のジョブが起動して、自動目次生成及び修正を行う
  3. (リモート)プルリクエストを作成する
     * `PULL_REQUEST_TEMPLATE.md`に沿って記載