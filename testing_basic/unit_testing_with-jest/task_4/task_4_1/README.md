<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題4（クイズ）](#%E8%AA%B2%E9%A1%8C4%E3%82%AF%E3%82%A4%E3%82%BA)
  - [環境構築](#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)
  - [テスト対象関数](#%E3%83%86%E3%82%B9%E3%83%88%E5%AF%BE%E8%B1%A1%E9%96%A2%E6%95%B0)
  - [`getArticlesCategory`について](#getarticlescategory%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 課題4（クイズ）

## 環境構築

1. VSCodeのRemote Container拡張機能で、[task_4_1](../task_4_1)フォルダを開く
2. `yarn install`を実行する

## テスト対象関数

- `function.ts`
  - `filterItems`
  - `asyncFilterItems`
  - `getArticlesCategory`

## `getArticlesCategory`について

- Qiitaのタグ一覧を取得するAPIを呼んでいます。
- APIの仕様書は、以下をご確認ください。
  - [GET /api/v2/tags](https://qiita.com/api/v2/docs#get-apiv2tags)