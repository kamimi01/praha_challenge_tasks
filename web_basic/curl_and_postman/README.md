# curlとpostmanに慣れる

<!-- START doctoc -->
<!-- END doctoc -->

## 学ばないと何が起きるのか

* 何かAPIに不具合が起きた時、動作確認をしたい時、毎回フロントエンドを操作して症状を再現するのは手間です  
* そこで開発中はcurlコマンドが多用されます。基本的なcurlコマンドの使い方を覚えて、手軽にAPIをデバッグできるようになりましょう！

## 課題説明

（curl）

* この課題では[httpbin](https://httpbin.org/#/HTTP_Methods)を使います
  * httpbinは、HTTPリクエストの要素（headerやクエリパラメータなど）を返してくれる便利なサービスです。curlの練習に最適！
  * ちなみにhttpbin.orgに直接リクエストを送ることも可能ですが、[Dockerでローカル環境にhttpbinのサービスを立ち上げて](https://hub.docker.com/r/kennethreitz/httpbin/)、ローカル環境で検証することも可能です
  * 興味のある方はぜひお試しください！（Dockerについては後の課題でカバーするので、現時点でDockerの使い方を理解している人だけでOKです）


* 以下のリクエストをcurlコマンドでhttpbinに送信してください
* curlコマンドをペアと比較して、なぜそのような書き方をしたのか、話し合ってみましょう
* 問題１
  * カスタムヘッダーを加える（X-Test='hello'）
  * methodはGET
  * URLはhttps://httpbin.org/headers
  * 以下のようなレスポンスを得られるはずです
  ```json
  {
    "headers": {
      "Accept": "*/*", 
      "Host": "httpbin.org", 
      "User-Agent": "curl/7.54.0", 
      "X-Test": "hello" // ここが重要！
    }
  }
  ```
* 問題２
  * Content-Typeは"application/json"
  * methodはPOST
  * bodyは {"name": "hoge"}
  * URLはhttps://httpbin.org/post
  * 以下のようなレスポンスを得られるはずです
  ```json
  {
    "data": "{\"name\": \"hoge\"}",  // ここが重要！
    "headers": {
      "Accept": "*/*", 
      "Content-Length": "16", 
      "Content-Type": "application/json", 
      "Host": "httpbin.org", 
      "User-Agent": "curl/7.54.0"
    }, 
    "json": {
      "name": "hoge" // ここが重要！
    }, 
    "origin": "xxxxxxxxxx",  // 自分自身のIPアドレス
    "url": "https://httpbin.org/post"
  }
  ```
* 問題３
  * もう少し複雑なbodyを送信してみましょう。以下のようなオブジェクトをbodyに含めて、送信してください
  ```json
  {userA: {name: "hoge", age: 29}}
  ```
* 問題４
  * 「ごめんごめん、このエンドポイント、まだapplication/jsonに対応してないから、Content-Typeはapplication/x-www-form-urlencodedで送ってもらえる？」と先輩に頼まれました
  * Content-Typeを変更して、リクエストを送信してみましょう
  * 以下のようなレスポンスを得られるはずです
  ```json
  {
    "data": "",  // 先ほどはここにname:hogeが含まれていた
    "form": {
      "{\"name\": \"hoge\"}": "" // 今はここに含まれている
    }, 
    "headers": {
      "Accept": "*/*", 
      "Content-Length": "16", 
      "Content-Type": "application/x-www-form-urlencoded", 
      "Host": "httpbin.org", 
      "User-Agent": "curl/7.54.0"
    }, 
    "json": null,  // 先ほどはここにname:hogeが含まれていた
    "url": "https://httpbin.org/post"
  }
  ```
（postman）

* ここまで上記課題で何度もcurlコマンドを作成しましたが、毎回コマンドを作成するのは大変です。課題を解いている間、こんなことを考えたのではないでしょうか：
* 以前作成したコマンドを保存しておきたい
* 複雑なリクエストを作成するのが辛い
* もうちょっと簡単にリクエストを作成する方法があっても良さそうですよね
* **あるんです**


* [postman](https://www.postman.com/)　とは？
  * 過去のリクエストを保存したり、複雑なリクエストをGUIから作成したり、様々な機能を備えた強化版curlみたいな物です
  * 簡単なリクエストならcurlで事足りるのですが、複雑なリクエストになってくるとpostmanの方が便利です
  * 例えば（後に説明しますが）OAuth2.0の認可により守られたAPIを開発している場合、認可を突破するまでに何度も通信が発生します
  * そのやりとりを手動でcurlで実施するのはとても面倒で、現実的ではありません
  * こうした認証もpostmanは一部自動化してくれます
  * これを機に使い方に慣れておきましょう！

* postmanをインストールしてください
* 上記の課題（curlコマンド）と同じ結果を得られるよう、リクエストを全てpostmanで再現してください

* クイズ
  * curlに関するクイズを作成してください
  * postmanに関するクイズを作成してください
  クイズに関する詳細は　コチラ　を参照してください