# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> Confluenceやesa、kibelaと言ったドキュメント管理システムのデータベース設計をしてみましょう

### 回答

![](../../../assets/ドキュメント管理システム.png)

- 検討したメモは[こちら](https://docs.google.com/spreadsheets/d/1VY8wkXNHNpTPu-Bk3SVmADeX53uuP2y5sYRT9e5X5-8/edit?usp=sharing)

- 想定
  - このドキュメント管理システムは、企業で使用される想定とし、最新のドキュメントだけではなく、過去にアップロードしたドキュメント、削除されたドキュメントもデータベースから削除せずに残しておく想定とする。
  - このドキュメント管理システムのユーザーには、複数のタイプが存在し、それは以下とする
    - アドミンユーザー
      - 一番親のディレクトリにのみに1人以上存在する
      - オーナー以外のユーザーに対する権限を操作できる
    - 一般ユーザー
      - 特定のディレクトリに0人以上存在する
      - 自分で自身や他人の権限を操作することはできない

- 懸念点
  - 今回はドキュメントのバージョン管理は考慮しない設計とした（だがバージョン管理はほとんどのドキュメント管理システムで必要に思うので、後々取り込みたい）
    - 履歴テーブルを採用した。最新のドキュメントを1テーブルで参照したいため。
    - ドキュメントテーブルにバージョンカラムを持つだけだと、1テーブルあたりのレコード数が増加してしまい、最新のドキュメントを参照するのに時間がかかってしまう
    - イミュータブルデータモデルだと、ドキュメントの追加、更新、削除ごとにテーブルを持つと、最新のドキュメントを取得するのに複数テーブルのJOINが発生するなど、最新のドキュメントを参照するのに時間がかかってしまう
  - 今回はユーザーの権限（このディレクトリやドキュメントに対しては、このユーザーは閲覧のみ許可されているなど）は考慮していない

- 参考
  - [履歴テーブルについて](https://user-first.ikyu.co.jp/entry/history-table)
  - [変更履歴を持つテーブルの設計](https://qiita.com/ak-ymst/items/2e8e92f212c807bb09a1)
  - [イミュータブルデータモデル](https://scrapbox.io/kawasima/%E3%82%A4%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%BF%E3%83%96%E3%83%AB%E3%83%87%E3%83%BC%E3%82%BF%E3%83%A2%E3%83%87%E3%83%AB)