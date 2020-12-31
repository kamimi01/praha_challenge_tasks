# クロスオリジンのリクエストを調べるためのフォルダ

<!-- START doctoc -->
<!-- END doctoc -->

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