# 課題2（kamimi01作成）

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>目次</summary>

- [課題：HTTPヘッダーに関するクイズを3問、作成してください（作成）](#%E8%AA%B2%E9%A1%8Chttp%E3%83%98%E3%83%83%E3%83%80%E3%83%BC%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%AF%E3%82%A4%E3%82%BA%E3%82%923%E5%95%8F%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E4%BD%9C%E6%88%90)
  - [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
    - [問題：多くのブラウザ(e.g.Chrome / Firefox)では、`Referrer-Policy`にはどのような値を設定することをデフォルトとしていますか？](#%E5%95%8F%E9%A1%8C%E5%A4%9A%E3%81%8F%E3%81%AE%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6egchrome--firefox%E3%81%A7%E3%81%AFreferrer-policy%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%80%A4%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E3%81%A8%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%81%8B)
  - [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)
    - [問題：クロスドメインアクセスを行う場合、ブラウザの判断でプリフライトリクエストが送信されることがあります。そのリクエストの送信条件は何でしょうか？](#%E5%95%8F%E9%A1%8C%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%82%92%E8%A1%8C%E3%81%86%E5%A0%B4%E5%90%88%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE%E5%88%A4%E6%96%AD%E3%81%A7%E3%83%97%E3%83%AA%E3%83%95%E3%83%A9%E3%82%A4%E3%83%88%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%8C%E9%80%81%E4%BF%A1%E3%81%95%E3%82%8C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%9D%E3%81%AE%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%81%AE%E9%80%81%E4%BF%A1%E6%9D%A1%E4%BB%B6%E3%81%AF%E4%BD%95%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
  - [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3)
    - [問題：Webアプリケーションの脆弱性の1つとして、HTTPヘッダインジェクションがあります。その原因は「〇〇」がヘッダ内に挿入されることにあります。〇〇に入る単語は何でしょうか？](#%E5%95%8F%E9%A1%8Cweb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E8%84%86%E5%BC%B1%E6%80%A7%E3%81%AE1%E3%81%A4%E3%81%A8%E3%81%97%E3%81%A6http%E3%83%98%E3%83%83%E3%83%80%E3%82%A4%E3%83%B3%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%9D%E3%81%AE%E5%8E%9F%E5%9B%A0%E3%81%AF%E3%80%87%E3%80%87%E3%81%8C%E3%83%98%E3%83%83%E3%83%80%E5%86%85%E3%81%AB%E6%8C%BF%E5%85%A5%E3%81%95%E3%82%8C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AB%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%80%87%E3%80%87%E3%81%AB%E5%85%A5%E3%82%8B%E5%8D%98%E8%AA%9E%E3%81%AF%E4%BD%95%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [課題：HTTPヘッダーに関するクイズを3問、作成してください（ペアによる作成）](#%E8%AA%B2%E9%A1%8Chttp%E3%83%98%E3%83%83%E3%83%80%E3%83%BC%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%AF%E3%82%A4%E3%82%BA%E3%82%923%E5%95%8F%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%83%9A%E3%82%A2%E3%81%AB%E3%82%88%E3%82%8B%E4%BD%9C%E6%88%90)
  - [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1-1)
    - [問題：阿部寛のHP（here）にアクセスしてみる。2回目にサイトを訪問すると、レスポンスのステータスコードは「304 Not Modified」となっている。この挙動と関連するヘッダは何でしょうか。](#%E5%95%8F%E9%A1%8C%E9%98%BF%E9%83%A8%E5%AF%9B%E3%81%AEhphere%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B2%E5%9B%9E%E7%9B%AE%E3%81%AB%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%A8%AA%E5%95%8F%E3%81%99%E3%82%8B%E3%81%A8%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%81%AE%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AF304-not-modified%E3%81%A8%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%93%E3%81%AE%E6%8C%99%E5%8B%95%E3%81%A8%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8B%E3%83%98%E3%83%83%E3%83%80%E3%81%AF%E4%BD%95%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
  - [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2-1)
    - [問題：以下のネットワーク構成の場合、X-Forwarded-Forを設定していなければ、どのような問題が発生するでしょうか。（以下=ロードバランサーを介したサーバアクセス）また、実際のX-Forwareded-Forの値はどのようになるでしょうか](#%E5%95%8F%E9%A1%8C%E4%BB%A5%E4%B8%8B%E3%81%AE%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF%E6%A7%8B%E6%88%90%E3%81%AE%E5%A0%B4%E5%90%88x-forwarded-for%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%84%E3%81%AA%E3%81%91%E3%82%8C%E3%81%B0%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%95%8F%E9%A1%8C%E3%81%8C%E7%99%BA%E7%94%9F%E3%81%99%E3%82%8B%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%E4%BB%A5%E4%B8%8B%E3%83%AD%E3%83%BC%E3%83%89%E3%83%90%E3%83%A9%E3%83%B3%E3%82%B5%E3%83%BC%E3%82%92%E4%BB%8B%E3%81%97%E3%81%9F%E3%82%B5%E3%83%BC%E3%83%90%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%BE%E3%81%9F%E5%AE%9F%E9%9A%9B%E3%81%AEx-forwareded-for%E3%81%AE%E5%80%A4%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%82%8B%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
  - [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3-1)
    - [問題：clickjacking.htmlで生じているクリックジャッキングは、特定のHTTPヘッダをレスポンスヘッダに付与することで回避することができるが、それはどのようなヘッダと値になるでしょうか](#%E5%95%8F%E9%A1%8Cclickjackinghtml%E3%81%A7%E7%94%9F%E3%81%98%E3%81%A6%E3%81%84%E3%82%8B%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B8%E3%83%A3%E3%83%83%E3%82%AD%E3%83%B3%E3%82%B0%E3%81%AF%E7%89%B9%E5%AE%9A%E3%81%AEhttp%E3%83%98%E3%83%83%E3%83%80%E3%82%92%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%83%98%E3%83%83%E3%83%80%E3%81%AB%E4%BB%98%E4%B8%8E%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%A7%E5%9B%9E%E9%81%BF%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%8C%E3%81%9D%E3%82%8C%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E3%83%98%E3%83%83%E3%83%80%E3%81%A8%E5%80%A4%E3%81%AB%E3%81%AA%E3%82%8B%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 課題：HTTPヘッダーに関するクイズを3問、作成してください（作成）

### クイズ1
多くのブラウザ(e.g.Chrome / Firefox)では、`Referrer-Policy`にはどのような値を設定することをデフォルトとしていますか？

<details><summary>想定回答</summary>

* `no-referrer-when-downgrade`がデフォルト値だが、最近の多くのブラウザでは`strict-origin-when-cross-origin`をデフォルトとする動きがある。

* 参考
  * 「[A new default Referrer-Policy for Chrome: strict-origin-when-cross-origin](https://developers.google.com/web/updates/2020/07/referrer-policy-new-chrome-default?s=09)」(Google)
  * 「[Referrer-Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy)」(Mozilla)
</details>


### クイズ2
クロスドメインアクセスを行う場合、ブラウザの判断でプリフライトリクエストが送信されることがあります。そのリクエストの送信条件は何でしょうか？

<details><summary>想定回答</summary>

* 以下の条件に該当しない場合（つまりシンプルリクエスト以外）は、プリフライトリクエストが送信される。
  * HTTPメソッドがGET, POST, HEADのいずれか
  * HTTPヘッダにAccept, Accept-Language, Content-Language, Content-Type以外のフィールドが含まれない
  * Content-Typeの値はapplication/x-www-form-urlencoded, multipart/form-data, text/plainのいずれか
* 参考
  * 「[CORS(Cross-Origin Resource Sharing)について整理してみた](https://dev.classmethod.jp/articles/about-cors/)」(Classmethod)

</details>

### クイズ3 
Webアプリケーションの脆弱性の1つとして、HTTPヘッダインジェクションがあります。その原因は「〇〇」がヘッダ内に挿入されることにあります。〇〇に入る単語は何でしょうか？

<details><summary>想定回答</summary>

* 改行コード
  * HTTPヘッダの行は、改行コードで区切られるため、意図しないレスポンスヘッダが追加される恐れがある。
  * 例えば、`Set-Cookie`を改行コードに続いてヘッダに含めることで、任意のCookieを固定化することが可能なため、なりすましといった問題が発生する。
* 参考：「[改行コードに要注意！ HTTP ヘッダインジェクションの概要と対策](https://yamory.io/blog/about-http-header-injection/#http-%E3%83%98%E3%83%83%E3%83%80%E3%82%A4%E3%83%B3%E3%82%B8%E3%82%A7%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%A8%E3%81%AF%E3%81%AA%E3%81%AB%E3%81%8B)」(yamory Blog)

</details>