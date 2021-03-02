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