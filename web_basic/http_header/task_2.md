# 課題：HTTPヘッダーに関するクイズを3問、作成してください（作成）

## クイズ1

### 問題：多くのブラウザ(e.g.Chrome / Firefox)では、`Referrer-Policy`にはどのような値を設定することをデフォルトとしていますか？

<details><summary>想定回答</summary>

* `no-referrer-when-downgrade`がデフォルト値だが、最近の多くのブラウザでは`strict-origin-when-cross-origin`をデフォルトとする動きがある。

* 参考
  * 「[A new default Referrer-Policy for Chrome: strict-origin-when-cross-origin](https://developers.google.com/web/updates/2020/07/referrer-policy-new-chrome-default?s=09)」(Google)
  * 「[Referrer-Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy)」(Mozilla)
</details>


## クイズ2

### 問題：クロスドメインアクセスを行う場合、ブラウザの判断でプリフライトリクエストが送信されることがあります。そのリクエストの送信条件は何でしょうか？

<details><summary>想定回答</summary>

* 以下の条件に該当しない場合（つまりシンプルリクエスト以外）は、プリフライトリクエストが送信される。
  * HTTPメソッドがGET, POST, HEADのいずれか
  * HTTPヘッダにAccept, Accept-Language, Content-Language, Content-Type以外のフィールドが含まれない
  * Content-Typeの値はapplication/x-www-form-urlencoded, multipart/form-data, text/plainのいずれか
* 参考
  * 「[CORS(Cross-Origin Resource Sharing)について整理してみた](https://dev.classmethod.jp/articles/about-cors/)」(Classmethod)

</details>

## クイズ3 

### 問題：Webアプリケーションの脆弱性の1つとして、HTTPヘッダインジェクションがあります。その原因は「〇〇」がヘッダ内に挿入されることにあります。〇〇に入る単語は何でしょうか？

<details><summary>想定回答</summary>

* 改行コード
  * HTTPヘッダの行は、改行コードで区切られるため、意図しないレスポンスヘッダが追加される恐れがある。
  * 例えば、`Set-Cookie`を改行コードに続いてヘッダに含めることで、任意のCookieを固定化することが可能なため、なりすましといった問題が発生する。
* 参考：「[改行コードに要注意！ HTTP ヘッダインジェクションの概要と対策](https://yamory.io/blog/about-http-header-injection/#http-%E3%83%98%E3%83%83%E3%83%80%E3%82%A4%E3%83%B3%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)」(yamory Blog)

</details>

# 課題：HTTPヘッダーに関するクイズを3問、作成してください（ペアによる作成）

## クイズ1

### 問題：阿部寛のHP（here）にアクセスしてみる。2回目にサイトを訪問すると、レスポンスのステータスコードは「304 Not Modified」となっている。この挙動と関連するヘッダは何でしょうか。

<details><summary>想定回答</summary>

* 以下の4つのヘッダが関連している。

|ヘッダ名|意味|使い分け|
|----|----|----|
|If-Modified-Since|ローカルキャッシュの更新日時(GMT)|リソースの更新日時を条件にGETする場合に使用|
|Last-Modified|リソースの更新日時|リソースの更新日時を条件にGETする場合に使用|
|If-None-Match|キャッシュしてあるリソースのETagの値|リソースのETagを条件にGETする場合に使用|
|ETag|リソースの更新状態を比較するための文字列(リソースを更新した際に別の値になるのであれば、どのような文字列でも問題ない)|リソースのETagを条件にGETする場合に使用|

参照：書籍「Webを支える技術」
</details>

## クイズ2

### 問題：以下のネットワーク構成の場合、X-Forwarded-Forを設定していなければ、どのような問題が発生するでしょうか。（以下=ロードバランサーを介したサーバアクセス）また、実際のX-Forwareded-Forの値はどのようになるでしょうか

<details><summary>想定回答</summary>

* 設定せずとも通信自体は問題なく行われるが、サーバにはロードバランサーのIPアドレスしかわからず、クライアントの元IPアドレスを特定できないという問題が発生する。それにより、クライアントのIPアドレスを元にした処理をおこなことができなくなる。
* 値は以下の構成となる。また、最も左が元のクライアントのIPアドレス、最も右が最後のプロキシのIPアドレスとなるように書き出される。
`<クライアントのIPアドレス>,<通過したプロキシのIPアドレス>,<通過したプロキシのIPアドレス>`
* 参考：「[X-Forwarded-For](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Forwarded-For)」(Mozilla)

</details>

## クイズ3

### 問題：clickjacking.htmlで生じているクリックジャッキングは、特定のHTTPヘッダをレスポンスヘッダに付与することで回避することができるが、それはどのようなヘッダと値になるでしょうか

<details><summary>想定回答</summary>

* 以下の2種類のヘッダと値を設定することで回避することができる。
  * ヘッダ：`X-FRAME-OPTIONS`
  * 値：以下の2つの値が使用可能。
    * `DENY`：ページをフレーム内に表示できない
    * `SAMEORIGIN`：ページ自体と同一オリジンのフレーム内でのみ表示する
  * ヘッダ：`Content-Security-Policy`
  * 値：
* 参照：
  * 「[X-Frame-Options](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Frame-Options)」(Mozilla)
  * 「[コンテンツ セキュリティ ポリシー](https://developers.google.com/web/fundamentals/security/csp)」(Google)
  * 「[悪意あるサイトにこっそり誘導 クリックジャッキング](https://yamory.io/blog/about-clickjacking/)」(yamory Blog)

</details>