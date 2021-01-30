# ペアのクイズ1,2

## クイズ1,2

Express のエコシステムには CORS の設定を簡単にできるミドルウェアが存在している。

- [https://github.com/expressjs/cors](https://github.com/expressjs/cors)

このミドルウェアを使用して、以下の条件を満たすような CORS を実装してみましょう。

- 許可する Origin は `http://loclahost:8090`
- OPTIONS メソッドに対してステータスコードを 204 で返す
- 許可する HTTP メソッドは `PUT` と `POST`
- 許可する HTTP ヘッダは `Content-Type`
- 上記の CORS は `/users/:id` のAPIに対して実装する

### 確認手順

1. VSCodeで、Remote Containerの拡張機能で、[pair_quiz_1](../pair_quiz_1)フォルダを「Open Folder in Container...」から開く
2. 以下のコマンドを実行して、必要なモジュールをインストールする（node_modulesフォルダをgitignoreしているため）

   `npm install`
3. 以下のコマンドを実行する

   `npm run dev`
4. 以下のURLにブラウザでアクセスする

   `http://localhost:8090/index.html?`
5. Developer Toolsを開く

### 確認結果

- 「POSTリクエストの送信」ボタンを押すと、POSTメソッドでプリフライトリクエストが発生するクロスドメインアクセスを行う
- 「PUTリクエストの送信」ボタンを押すと、PUTメソッドでプリフライトリクエストが発生するクロスドメインアクセスを行う

![](../../../../../assets/cors_post_quiz_result.png)

![](../../../../../assets/cors_put_quiz_result.png)

- OPTIONSメソッドのリクエスト結果のスクショは省略するが、問題なくリクエストできていた