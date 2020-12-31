# 課題2（ペアの方作成）

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->

## 課題：HTTPヘッダーに関するクイズを3問、作成してください（ペアによる作成）

### クイズ1
阿部寛のHP（here）にアクセスしてみる。2回目にサイトを訪問すると、レスポンスのステータスコードは「304 Not Modified」となっている。この挙動と関連するヘッダは何でしょうか。

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

### クイズ2
以下のネットワーク構成の場合、X-Forwarded-Forを設定していなければ、どのような問題が発生するでしょうか。（以下=ロードバランサーを介したサーバアクセス）また、実際のX-Forwareded-Forの値はどのようになるでしょうか

<details><summary>想定回答</summary>

* 設定せずとも通信自体は問題なく行われるが、サーバにはロードバランサーのIPアドレスしかわからず、クライアントの元IPアドレスを特定できないという問題が発生する。それにより、クライアントのIPアドレスを元にした処理をおこなことができなくなる。
* 値は以下の構成となる。また、最も左が元のクライアントのIPアドレス、最も右が最後のプロキシのIPアドレスとなるように書き出される。
`<クライアントのIPアドレス>,<通過したプロキシのIPアドレス>,<通過したプロキシのIPアドレス>`
* 参考：「[X-Forwarded-For](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-Forwarded-For)」(Mozilla)

</details>

### クイズ3
clickjacking.htmlで生じているクリックジャッキングは、特定のHTTPヘッダをレスポンスヘッダに付与することで回避することができるが、それはどのようなヘッダと値になるでしょうか

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