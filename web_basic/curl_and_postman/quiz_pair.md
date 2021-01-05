# 課題2（ペアの方作成）

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [curlのクイズ](#curl%E3%81%AE%E3%82%AF%E3%82%A4%E3%82%BA)
  - [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
    - [回答](#%E5%9B%9E%E7%AD%94)
  - [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)
    - [回答](#%E5%9B%9E%E7%AD%94-1)
  - [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3)
    - [回答](#%E5%9B%9E%E7%AD%94-2)
- [postmanのクイズ](#postman%E3%81%AE%E3%82%AF%E3%82%A4%E3%82%BA)
  - [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1-1)
  - [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2-1)
  - [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3-1)
    - [回答](#%E5%9B%9E%E7%AD%94-3)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## curlのクイズ
### クイズ1

`https://httpbin.org`にパラメータとして`show_env=1`を追加してGETリクエストを以下のように送信します。

```bash
curl -X GET -H "X-Forwarded-For: 192.168.0.1" http://httpbin.org/headers\?show_env=1
```

この出力結果は以下のようになります。

```json
{
  "headers": {
    "Accept": "*/*", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.68.0", 
    "X-Amzn-Trace-Id": "Root=1-5fedd223-4c94d877234f441660a03807", 
    "X-Forwarded-For": "192.168.0.1, 203.0.111.1", 
    "X-Forwarded-Port": "80", 
    "X-Forwarded-Proto": "http"
  }
}
```
この時、X-Forwarded-***の値が上記のように設定されている理由は何でしょうか。

#### 回答

* `X-Forwarded-For`：カンマ区切りの値の左にリクエストヘッダとして送ったIPアドレスの値が、右に経由したHTTPプロキシまたはロードバランサーのIPアドレス（今回の場合はクライアントのグローバルIPアドレス）がカンマ区切りで入る。
  * 右の値がクライアントのグローバルIPアドレスであることは`curl inet-ip.info`コマンドを使用して確認済み
* `X-Forwarded-Port`：クライアントが使用した送信先ポート
* `X-Forwarded-Proto`:プロキシまたはロードバランサーへ接続するのに使っていたクライアントのプロトコル (HTTP または HTTPS) を特定するために事実上の標準となっているヘッダー

* 参考
  * [httpbin.org で X-Forwarded-For ヘッダーを確認する方法
](https://blog.1q77.com/2020/08/httpbin-org-show_env/)
  * [HTTP ヘッダーおよび クラシックロードバランサー](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/classic/x-forwarded-headers.html)
  * [X-Forwarded-Proto](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Forwarded-Proto)
  * [グローバルIPをcurlで確認](https://qiita.com/kanpou0108/items/734b947f5a95109e7bb9)

### クイズ2

クイズ1で実行したcurlコマンドに関して、リクエスト内容ではなく、サーバからのレスポンスヘッダとレスポンスボディを確認してみましょう。

#### 回答

以下のように、`-i`オプションを使用することで、レスポンスヘッダとボディを確認することができる。

```bash
curl -i -X GET -H "X-Forwarded-For: 192.168.100.101" http://0.0.0.0:80/headers\?show_env=1
```

* 参考
  * また、`-I`オプションを指定するとヘッダのみ取得可能

### クイズ3

このファイルと同じフォルダ階層に存在するquiz.jsonを、POSTリクエスト時に送信するリクエストボディとして設定し、https://httpbin.org/postにリクエストを送信してみましょう。

quiz.jsonは以下の通り

```json
{
  "quiz": "interesting"
}
```

#### 回答

```bash
curl -X POST -H "Content-Type:application/json" -d '@quiz.json' http://httpbin.org/post 
```

* 参考
  * [curlコマンドでデータを送るときに、ファイルに保存されたデータを使う](https://qiita.com/aki3061/items/b4f4bc5f4ef3fa015c5f)

## postmanのクイズ

### クイズ1
Postmanで環境変数に以下の値を設定し、環境変数を参照する形でGETリクエストを送信してみましょう。

|環境変数 |値|
|----|----|
|HOST_URL|https://httpbin.org|

### クイズ2

Postmanで環境変数としてUUID4_Tokenという変数名に、値を何も設定しない状態にします。

その状態で、https://httpbin.org/uuidに対してGETリクエストを送信します。

ではPostmanで、リクエストを送信した後で自動的にレスポンスボディに含まれるuuidプロパティの値を、環境変数UUID4_Tokenに格納するスクリプトを作成してみましょう。

### クイズ3

https://httpbin.org/postへPOSTリクエストを送信します。その際にクイズ2で得られたuuidプロパティの値を、x-api-keyというカスタムHTTPヘッダに設定してリクエストを送信してみましょう。

#### 回答

以下のリンクでリクエストとレスポンスを確認可能です。（ただ、Pre-request ScriptsとTestのコードは確認できないみたい...）
https://documenter.getpostman.com/view/7430399/TVzLp1EV#d422436f-5801-4e38-bf5d-05a1581e37b8

POSTMANのコレクション・環境変数のjsonファイルとしてエクスポートして、浦川のレポジトリに格納いたしました。↓
* コレクション：[コレクション](./postman_collections/praha_challnege_curl_and_postman.postman_collection.json)
  * ※「クイズ1」と「クイズ2・3」のリクエストをご確認くださいー
* 環境変数：[環境変数](./postman_collections/praha_challenge_curl_and_postman.postman_environment.json)
  * ※`UUID4_Token`は固定ではないためか、、エクスポートしたファイルの中にキーと値が入ってなかったので、クイズ2・3の確認時にはご自分で定義いただく必要がありそうです。。

また、クイズ2と3は、1つのリクエスト内で完結してしまったので、リクエストは別々にはなっていません。。想定と違う回答でしたらすみません。ご指摘ください。。

補記しますと、以下のようになっています。
1. （Pre-request Script）`https://httpbin.org/uuid`をリクエストして、uuidをレスポンスで受け取る
2. （Pre-request Script）レスポンスのuuidを環境変数`UUID4_Token`に格納する
3. `https://httpbin.org/post`のリクエストヘッダにキー：`X-Api-Key`と値：`{{UUID4_Token}}`を設定してリクエストを送る
4. （Tests）3のレスポンスの`headers`の`X-Api-Key`の値が、2で設定した環境変数`UUID4_Token`の値と同じであることを確認する
