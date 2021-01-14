# 課題2（ペアの方作成）

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題：HTTPヘッダーに関するクイズを3問、作成してください（ペアによる作成）](#%E8%AA%B2%E9%A1%8Chttp%E3%83%98%E3%83%83%E3%83%80%E3%83%BC%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%AF%E3%82%A4%E3%82%BA%E3%82%923%E5%95%8F%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%83%9A%E3%82%A2%E3%81%AB%E3%82%88%E3%82%8B%E4%BD%9C%E6%88%90)
  - [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
  - [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)
  - [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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