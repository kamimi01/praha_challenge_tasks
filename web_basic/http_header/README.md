# よく使うHTTPヘッダを理解する

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>目次</summary>

- [学ばないと何が起きるのか](#%E5%AD%A6%E3%81%B0%E3%81%AA%E3%81%84%E3%81%A8%E4%BD%95%E3%81%8C%E8%B5%B7%E3%81%8D%E3%82%8B%E3%81%AE%E3%81%8B)
- [課題説明](#%E8%AA%B2%E9%A1%8C%E8%AA%AC%E6%98%8E)
  - [課題１（質問）](#%E8%AA%B2%E9%A1%8C%EF%BC%91%E8%B3%AA%E5%95%8F)
  - [課題２（クイズ）](#%E8%AA%B2%E9%A1%8C%EF%BC%92%E3%82%AF%E3%82%A4%E3%82%BA)
  - [（任意課題）](#%E4%BB%BB%E6%84%8F%E8%AA%B2%E9%A1%8C)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 学ばないと何が起きるのか

* HTTPは様々な情報をやりとりしますが、その実態は「ヘッダー」で挙動を変化させて、情報を「ボディ」で送信する、非常にシンプルな作りです
* しかしヘッダーは無数にあり、その設定次第では意図しない挙動が発生します
* 例えばヘッダーの一つ「referer」を理解していな人がやりがちなミスとして、秘匿性の高い情報を流出させることが挙げられます
* クエリパラメータに誤って重要な情報（例えばトークンなど）を入れてしまった場合、refererの設定次第では外部サービスにクエリパラメータごと、トークン情報が送られてしまうことがあります。
* ヘッダーはWEBサービスを扱う上では避けて通れない概念ですが、誤って使ってしまうと、予想外の挙動に繋がる可能性があります。http の基礎的な要素「ヘッダー」をきちんと理解しておきましょう！

## 課題説明

### 課題１（質問）

以下のヘッダーの意味と、役割を説明してください
* Host
* Content-type
* User-agent
* Accept
* Referer
* Accept-Encoding
* Authorization
* Location

refererについて
aタグにtarget="_blank"を設定したところ、先輩エンジニアから「ちゃんとrel=noreferrerを設定した？」と聞かれました。なぜそのような設定が必要なのでしょうか？
rel=noreferrerを設定しなかった場合に起きうる問題を調べて、説明して下さい
先輩エンジニアに「同じオリジンの時はrefererの情報を全部送って、別オリジンの時は、オリジン情報だけをrefererとして送信するように、HTTPリクエストにヘッダを追加しておいてもらえる？」と頼まれました。HTTPリクエストのヘッダーには、どんな値を追加する必要があるでしょうか？


### 課題２（クイズ）

HTTPヘッダーに関するクイズを3問、作成してください
例：「User-agentを使って、ユーザがモバイル端末を使用していることを判定しようとした場合、どのような誤検知や問題が想定されるでしょうか？」
クイズに関する詳細は　コチラ　を参照してください


### （任意課題）

以下の書籍、文献を読んでみましょう！（こちらは任意課題のため、レビューは不要ですし、着手しなくても構いません）

「WEBを支える技術」  
https://www.amazon.co.jp/dp/4774142042  
もはや有名過ぎるかもしれませんが、WEBの基礎的な知識に不安がある方にはオススメの入門書です

「Real world HTTP」  
https://www.amazon.co.jp/dp/4873119030/  
HTTPの歴史を辿りながら仕様を解説する技術書です。少々説明が不親切で（あまり初学者向けではない）、誤字が多いのが（第２版では多少改善されています！）気になりますが、情報の網羅性は高いので手始めの一冊として非常に優秀だと感じます

「MDN Web Doc」  
https://developer.mozilla.org/ja/docs/Web/HTTP  
個人的に、MDNはWEBの仕様に関して自信がない時に第一に当たるソースかもしれません。Firefoxを開発しているMozillaによってメンテナンスされているページで、WEB知識の基礎固めにうってつけです。こちらに記載されている内容に全て目を通せば、十分すぎるほどの知識が身につくと思います

（余談ですがMozillaの業績悪化によりMDNのメンテナンスチームが人員削減されてしまったため、今後は最新情報へのキャッチアップが遅れてしまうかもしれません...）  
https://www.fastcompany.com/90539632/mozilla-vows-mdn-isnt-going-anywhere-as-layoffs-cause-panic-among-developers

（さらに余談ですがrefererは綴りとして誤っており、referrerが正しいのですが、RFC申請時のタイポがそのまま採用されてしまったようです）  
https://en.wikipedia.org/wiki/HTTP_referer
