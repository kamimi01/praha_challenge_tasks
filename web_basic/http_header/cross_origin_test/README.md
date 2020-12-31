# クロスオリジンのリクエストを調べるためのフォルダ

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [CORS許可に関する挙動確認手順](#cors%E8%A8%B1%E5%8F%AF%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%8C%99%E5%8B%95%E7%A2%BA%E8%AA%8D%E6%89%8B%E9%A0%86)
- [Referrer Policyを変更する手順](#referrer-policy%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B%E6%89%8B%E9%A0%86)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## CORS許可に関する挙動確認手順
1. `cross_origin_test`フォルダまで移動する
1. `npm install`する
1. `node app/app.js`で3000ポートでローカルサーバを起動する
1. 別のターミナルを開く
1. `cross_origin_test/views`フォルダまで移動する
1. `python3 -m http.server 8000`で8000ポートでローカルサーバを起動し、ブラウザで開く
1. 「CORS無許可確認ボタン」を押すと、CORS許可されていないAPIがコールされるため、リクエストが失敗する。「CORS許可確認ボタン」を押すと、CORS許可されているAPIをコールするため、リクエストが成功しjsonが返却される
  - リクエスト・レスポンスの確認は、Developer Toolで行う

## Referrer Policyを変更する手順
1. index.htmlの4行目を以下の通り変更する。（Referrer Policyが`no-referrer`に変更され、リクエストヘッダに`referrer`が含まれなくなる）
```html
<meta charset="UTF-8" name="referrer" content="no-referrer" />
```