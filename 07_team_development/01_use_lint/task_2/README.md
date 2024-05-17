# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [pre-commit hookを作成](#pre-commit-hook%E3%82%92%E4%BD%9C%E6%88%90)
- [pre-commitで、ある程度の品質は担保できますが、チーム開発をする際、これだけで十分でしょうか？ローカル環境でのpre-commit hookには、どんな問題点があるでしょうか？](#pre-commit%E3%81%A7%E3%81%82%E3%82%8B%E7%A8%8B%E5%BA%A6%E3%81%AE%E5%93%81%E8%B3%AA%E3%81%AF%E6%8B%85%E4%BF%9D%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8C%E3%83%81%E3%83%BC%E3%83%A0%E9%96%8B%E7%99%BA%E3%82%92%E3%81%99%E3%82%8B%E9%9A%9B%E3%81%93%E3%82%8C%E3%81%A0%E3%81%91%E3%81%A7%E5%8D%81%E5%88%86%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E7%92%B0%E5%A2%83%E3%81%A7%E3%81%AEpre-commit-hook%E3%81%AB%E3%81%AF%E3%81%A9%E3%82%93%E3%81%AA%E5%95%8F%E9%A1%8C%E7%82%B9%E3%81%8C%E3%81%82%E3%82%8B%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## pre-commit hookを作成

- [sample_projects](./../sample_project/)
  - このリポジトリと同じリポジトリにプロジェクトがあると、`.git`が同階層にないので、ダメであることがわかりました。。

## pre-commitで、ある程度の品質は担保できますが、チーム開発をする際、これだけで十分でしょうか？ローカル環境でのpre-commit hookには、どんな問題点があるでしょうか？



## 参考

- [husky v6 のインストール方法と使い方。lint-staged も導入して、品質を保とう](https://fwywd.com/tech/husky-setup)
- [Git hooks pre-commitを使って意図しない変更のpushを防ぐ](https://qiita.com/taku-0728/items/2a4709e6e1db7f6e8dbf)
- [Git で commit 前に 自動でコマンドを実行する #Node.js #husky](https://dev.classmethod.jp/articles/pre-commit/)