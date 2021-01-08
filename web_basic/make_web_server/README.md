# リクエストをパースするWEBサーバを作ってみる

## Table of Contents

## 学ばないと何が起きるのか

OSSのレポジトリにエラーを報告すると、エラーを再現する最小限のサンプルを求められることが多々あります。

どれだけ開発に習熟した人でも情報が不足していたらデバッグは困難なので、「自分がpullして手元で起動できる最小限のサンプルを作って欲しい」と頼まれることは、実際の現場でも起こり得ます。

また、何かを説明する時や、新しいライブラリーを追加する時に、最小限のサンプルを作成して動作確認することがあります。開発者として新しいことを試みる際には、最小限のサンプルを作成して扱う機会が増えてくるはずです。

こうした取り組みに慣れていくために、まずはシンプルなnode.js/expressのWEBサーバを作成して、これからの課題に取り組む際に活用していきましょう！

また今後の課題ではnode.jsとexpressを多用するため、使い方に慣れておきましょう！

## 課題説明

### 課題１（実装）

node.jsとexpressでWEBサーバを作ってください
デプロイする必要はありません。ローカル環境で起動して、サーバに対してcurlコマンドでリクエストを送信して、動作確認してみましょう

WEBサーバの仕様

エンドポイントは2つ
（仮にlocalhost:8080で起動していると仮定した場合）
localhost:8080に対してGETリクエスト受けた時、{text: hello world}とjsonをHTTPステータス200で返してください
localhost:8080に対してPOSTリクエストを受けた時、リクエストbodyに含まれるjsonデータを、レスポンスのbodyに含めて、HTTPステータス201で返してください
POSTリクエストを受け付けるエンドポイントは、Content-Typeがapplication/json以外の時は、HTTPステータス400を返してください
上記のサーバが完成したら、以下のようなコマンドを実行して、仕様が満たされていることを確認してください

```bash
curl localhost:8080 -H "Content-Type: application/json"
```

// {text: hello world}が返ってくるはず

```bash
curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
```

// {name: hoge}が返ってくるはず

```bash
curl localhost:8080 -d '{"name": "hoge"}'
```

// HTTPステータス400、エラーが発生するはず


ヒント：

application/json形式のリクエストbodyをexpressで利用するには、express.json()　などのparserを使う必要があります
expressのrequest.bodyの中身はデフォルトだと実態が「ストリーム」のため、parserを設定する事なく「request.body」にアクセスすると、undefinedが返ります
ストリームまとめて、stringなど普段使い慣れた型として使うためにexpress.json()を使って変換します
（そもそもなぜrequest.bodyの内部はストリームなのでしょうか？ペアと話し合ってみてください）


### 課題２（質問）

Content-typeにapplication/x-www-form-urlencodedを指定した時と、application/jsonを指定した時で、送信されるデータ形式がどのように異なるのか説明してください。どんな時にどちらを選択するべきでしょうか？