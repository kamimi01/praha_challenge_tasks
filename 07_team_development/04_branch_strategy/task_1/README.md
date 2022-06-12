# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [GitHub FlowとGitflowを図解してください](#github-flow%E3%81%A8gitflow%E3%82%92%E5%9B%B3%E8%A7%A3%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)
- [GitflowとGitHub Flowのメリット・デメリット](#gitflow%E3%81%A8github-flow%E3%81%AE%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%83%BB%E3%83%87%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## GitHub FlowとGitflowを図解してください

- GitHub Flow

![](./github_flow.drawio.png)

- Gitflow

![](../../assets/../../assets/branch_strategy_gitflow.png)

## GitflowとGitHub Flowのメリット・デメリット

|ブランチ戦略|メリット|デメリット|
|-------------|-------------------------|------------------------|
|Gitflow|・大規模開発、リリース頻度が月ごとのような場合で、リリース管理を厳密を行ないたい時に向いている|・ブランチの種類が多く複雑なため、管理に手間がかかる（フローを理解して管理できる仕組みがないと、破綻してしまう）|
|GitHub Flow|・ブランチの種類が少なく、シンプルで理解しやすいため、操作ミスが起きにくい。<br>・本番環境へのデプロイ頻度が高い（毎日とか）場合に向いている|・iOSアプリケーションのようにリリース作業（主に審査→最大2週間ほど）が必要で開発中状態とリリース状態に差が生まれる期間が長いアプリケーション開発の場合はあまり向かないのではと思う|

## 参考

- [リポジトリ（GitLab）入門](https://zenn.dev/ryo_4947123/books/497459787cb294/viewer/branchstrategy)
- [Git-flowって何？](https://qiita.com/KosukeSone/items/514dd24828b485c69a05)
- [[日本語訳]A successful Git branching model](https://qiita.com/homhom44/items/9f13c646fa2619ae63d0)