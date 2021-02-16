# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問2](#%E8%B3%AA%E5%95%8F2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [質問3](#%E8%B3%AA%E5%95%8F3)
  - [回答](#%E5%9B%9E%E7%AD%94-2)
- [非同期通信についての整理](#%E9%9D%9E%E5%90%8C%E6%9C%9F%E9%80%9A%E4%BF%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E6%95%B4%E7%90%86)
  - [Ajax（Asynchronous JavaScript + XML）について](#ajaxasynchronous-javascript--xml%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [従来型（同期通信）とAjax（非同期通信）](#%E5%BE%93%E6%9D%A5%E5%9E%8B%E5%90%8C%E6%9C%9F%E9%80%9A%E4%BF%A1%E3%81%A8ajax%E9%9D%9E%E5%90%8C%E6%9C%9F%E9%80%9A%E4%BF%A1)
  - [Ajaxアプリの実装方針](#ajax%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E5%AE%9F%E8%A3%85%E6%96%B9%E9%87%9D)
  - [Promiseオブジェクト](#promise%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88)
  - [Fetch API](#fetch-api)
  - [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> XMLHttpRequestって何ですか？（ブラウザのアドレスバーにURLを入力して送信する）普通のHTTPリクエストと何が違うんですか？

### 回答

## 質問2

> example.comのページからapi.example.com（API）に向けて、XMLHttpRequestを使ってリクエストを送信するコードを書いたが、リクエストにクッキー情報が付与されないのはなぜか？

コードは以下の通り

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.example.com/', true);
xhr.send(null);
```

### 回答

## 質問3

> 「No 'Access-Control-Allow-Origin' header is present on the requested resource」のエラーが出てきて、リクエストが送られない。どうすれば良いか？

### 回答

---

## 非同期通信についての整理

### Ajax（Asynchronous JavaScript + XML）について

- JavaScript（XMLHttpRequest）を利用して、サーバ側と非同期通信を行い、受け取った結果をDOM経由でページに反映する仕組み
- 補足：DOM（Document Object Model）とは
  - マークアップ言語（HTMLやXML）で書かれたドキュメントにアクセスするための仕組み
  - ドキュメントを文書ツリーとして扱い、オブジェクトの集合（階層関係）が文書であると考える
  - オブジェクトの種類によって、要素ノード、属性ノード、テキストノードなどと呼ばれる

### 従来型（同期通信）とAjax（非同期通信）

- 従来型（同期通信）のデメリット
  - 結果を表示する度に、ページ全体が書き換えられる
    - ページ全体をリフレッシュする必要があるため、通信量が多くなる
    - 書き換えに伴い、画面のチラつきが発生する
  - サーバと通信している間、クライアントは操作できない
    - 同期通信の場合、サーバから応答があるため、クライアントで操作を行うことができない
- Ajax（非同期通信）のメリット
  - 操作性の改善
    - 通信ごとに発生していたページのチラつきを解消
    - サーバが処理中もクライアント側では処理を継続できる
  - パフォーマンスの向上
    - ページの必要な部分のみを更新するため、通信量を最小限に抑えられる
    - サーバの処理終了を待つ必要がないため、そもそもの体感速度が向上する
  - 開発生産性・運用性の向上
    - リッチなユーザインターフェースをブラウザ標準の技術だけで構築できる
    - 動作に特別なプラグインを必要としないため、導入が容易
- 実際の動作デモによる比較を以下のフォルダにて行った
  - 同期通信：[synchronous_traffic](./task_1/synchronous_traffic)
  - 非同期通信：[asynchronous_traffic](./task_1/asynchronous_traffic)

### Ajaxアプリの実装方針

1. XMLHTTPRequestオブジェクトの生成

   - XMLHTTPRequestオブジェクトの利用により、今までブラウザに任せていたサーバとの通信を、JavaScriptで制御可能となる
   - 通信に利用するデータ形式・プロトコルは、XML、HTTPに限定されない

2. サーバー通信時の処理の定義

   - 通信開始から終了までに実行すべき処理の定義
     - `onreadystatechange`プロパティ（PlantUMLの図参照）
     - **XMLHttpRequestでは、以下のイベントも用意されているため（以下に記載するのは３つのみだが、他にもイベントが存在する）、IE9以下であることが確実であれば、こちらを使う方が簡潔にコーディングできる**
       - `loadstart`：リクエストを送信した時
       - `load`：リクエストが成功した時
       - `error`：リクエストが失敗した時
     - 詳しいコードは、[asynchronous_traffic/index.js](./task_1/asynchronous_traffic/index.js)参照
    
![](../../assets/onreadystatechange.png)

3. 非同期通信の開始

   - リクエストをサーバに送信する

```javascript
// 1.リクエストの初期化
xhr.open(method, url [, async [, user [, passwd]]])

// 2. リクエストの送信（POSTの場合のみ引数に要求本体を指定可能、GETの場合はnullを指定）
xhr.send(requestBody)
```

### Promiseオブジェクト

- 非同期処理がいくつも重なる場合、コールバック関数ではネストが深くなりすぎて、一つの関数が肥大化してしまう
- その問題を解決するのが、`Promise`オブジェクト

### Fetch API

- 非同期通信のコーディングのために使用される
- `XMLHttpRequest`の代替
- 特徴
  - fetch() から返される **Promise は レスポンスが HTTP 404 や 500 を返して HTTP エラーステータスの場合でも拒否されない。** 代わりに (ok ステータスが false にセットされて) 正常に解決し、**拒否されるのはネットワークのエラーや、何かがリクエストの完了を妨げた場合のみ**。
    - ネットワークエラーに遭遇すると fetch() promise は TypeError を返して reject 状態になる。サーバー側の CORS が適切に設定されていない場合も同様。
    - 共通で利用できるResponseプロパティ
      - `Response.status`：HTTP ステータスコードの整数値 (デフォルト値は 200)
      - `Response.statusText`：HTTP ステータスコードのメッセージと一致する文字列 (デフォルト値は "OK")
      - `Response.ok`：上述の例で使用したように、これは HTTP ステータスコードが 200 から 299 のうちに収まってるかどうかのショートハンドです。これは Boolean を返す。
  - fetch() はサイトをまたぐクッキーを受信することができる。フェッチを使用してサイトをまたぐセッションを確立することができる。
  - fetch はサーバーとの間で cookies を送受信しないため、サイトがユーザーセッションの維持に頼っている場合は未認証のリクエストになる。**クッキーを送るには、認証情報の init オプションを設定しておく必要がある**

### 参考

- JavaScript本格入門（書籍）
- [XMLHttpRequest の使用](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [Fetch の使用](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)
- [まだXMLHttpRequestを使ってるの？　fetchのすすめ](https://qiita.com/uhyo/items/91649e260165b35fecd7)
- [非同期処理:コールバック/Promise/Async Function](https://jsprimer.net/basic/async/#async-handling)（JavaScript Primer）