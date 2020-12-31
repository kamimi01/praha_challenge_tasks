# 課題1

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>目次</summary>

- [課題：以下のヘッダーの意味と役割を説明してください](#%E8%AA%B2%E9%A1%8C%E4%BB%A5%E4%B8%8B%E3%81%AE%E3%83%98%E3%83%83%E3%83%80%E3%83%BC%E3%81%AE%E6%84%8F%E5%91%B3%E3%81%A8%E5%BD%B9%E5%89%B2%E3%82%92%E8%AA%AC%E6%98%8E%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [課題：refererについて](#%E8%AA%B2%E9%A1%8Creferer%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [疑問（調べていてわからなかったことを記載します）](#%E7%96%91%E5%95%8F%E8%AA%BF%E3%81%B9%E3%81%A6%E3%81%84%E3%81%A6%E3%82%8F%E3%81%8B%E3%82%89%E3%81%AA%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8%E3%82%92%E8%A8%98%E8%BC%89%E3%81%97%E3%81%BE%E3%81%99)
- [メモ（回答には直接関係ないですが、調べたことを記載します）](#%E3%83%A1%E3%83%A2%E5%9B%9E%E7%AD%94%E3%81%AB%E3%81%AF%E7%9B%B4%E6%8E%A5%E9%96%A2%E4%BF%82%E3%81%AA%E3%81%84%E3%81%A7%E3%81%99%E3%81%8C%E8%AA%BF%E3%81%B9%E3%81%9F%E3%81%93%E3%81%A8%E3%82%92%E8%A8%98%E8%BC%89%E3%81%97%E3%81%BE%E3%81%99)
- [参照元](#%E5%8F%82%E7%85%A7%E5%85%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 課題：以下のヘッダーの意味と役割を説明してください

### 回答

| ヘッダー名 | 意味 | 役割 | 値の例 | 備考 |
| ---- | ---- | ---- | ---- | ---- |
| Host | リクエストが送信される先のサーバーのホスト名とポート番号 | アクセスしたいサーバを特定するために使用される。 | example.jp:8080 |`<ホスト名>:<ポート番号>`で構成される。ポート番号が未指定の場合は、要求されたサービスの既定のポート（e.g.HTTPSのURLなら443、 HTTPのURLなら80）とみなされる |
| Content-type | メッセージのボディの内容がどのような種類なのかを示すためのメディアタイプ | 主にクライアントが正しくデータを読み出すためにデータ形式を判断する際に使用される。 | application/json <br> text/plain | `タイプ名/<サブタイプ名>[;パラメータ名]`で構成される。また、任意で文字エンコーディング方式を指定する`charset`パラメータを持つことができる。
| User-agent | リクエストしているクライアントの製品名やバージョンなどの情報 | サーバーやネットワークピアがアプリケーション、オペレーティングシステム、ベンダーや、リクエストしているクライアントを識別するために使用される。 | Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 | `<製品名や製品の開発コードネーム> / <製品のバージョン> <製品の詳細情報などのコメント>`で構成される。|
| Accept | クライアントが処理可能なメディアタイプ | クライアントが処理可能なメディアタイプをサーバに伝えるために使用される。 | application/xml,application/msword;q=0.9 | `q=<小数点以下3桁以内の0~1まで>`でメディアタイプの優先度を表し、数値が大きい方が優先される。また、サーバが対応していないメディアタイプの場合には、`406 Not Acceptable`が返却される。 |
| Referer | 現在リクエスト中のページにつながるリンクがある直前のページの、絶対または相対アドレス | サーバがどのページからリクエストがきたのかを知るために使用される。 | http://example.jp/blog/1 | URLフラグメントやユーザ情報は含まれない。また、英語としては「Referrer」が正しいが、HTTP策定の際のミスで現在もこの綴りが使用されている。 |
| Accept-Encoding | クライアントが理解できる圧縮方式 | クライアントが理解できる圧縮方式をサーバに伝えるために使用される。 | gzip, compress, br | 圧縮される目的は、圧縮することでデータサイズを小さくし、通信負荷を低減すること。
| Authorization | クライアントがサーバに認証してもらうための証明書 | サーバがクライアントから受け取ることで証明を行い、リソースへのアクセスを許可するために使用される。 | Basic dXNlcjpwYXNzd29yZA== | `<認証の種類> / <crednentials>`で構成される。 | Base64エンコーディングは簡単にデコード可能なため、HTTPS通信を使用することが前提とされる。|
| Location | 関連付けされたオブジェクトの場所を表すURI | リダイレクトや新規作成時などオブジェクトの場所を表すために使用される。 | http://example.jp/blog/1 | - |

## 課題：refererについて

### 回答
> aタグにtarget="_blank"を設定したところ、先輩エンジニアから「ちゃんとrel=noreferrerを設定した？」と聞かれました。なぜそのような設定が必要なのでしょうか？
rel=noreferrerを設定しなかった場合に起きうる問題を調べて、説明して下さい
* `rel="noreferrer"`を設定することで、以下2つの問題の発生を防ぐことができるため。
  1. セキュリティの問題
    * 遷移先のページが、`window.opener`プロパティを使用して遷移元のページを操作することが可能になる。遷移先のページが悪意ある製作者によって作られたページの場合、遷移元のページを悪意あるページ(フィッシングサイトなど)にリダイレクトするなどが可能になる。（「タブナビング」と言われるフィッシング詐欺の手口）
    * メモ：`web_basic/http_header/noreferrer_test`フォルダに挙動確認のために使用したコードがあります。
  2. パフォーマンスの問題
    * 遷移元と遷移先のページは同じプロセス上で実行されるため、遷移先のページで高負荷のJavaScriptが実行されると遷移元のページのパフォーマンスが低下する可能性がある。

> 先輩エンジニアに「同じオリジンの時はrefererの情報を全部送って、別オリジンの時は、オリジン情報だけをrefererとして送信するように、HTTPリクエストにヘッダを追加しておいてもらえる？」と頼まれました。HTTPリクエストのヘッダーには、どんな値を追加する必要があるでしょうか？
* `Referrer-Policy`ヘッダに、`origin-when-cross-origin`を追加する
  - `origin-when-cross-origin`の意味：同一オリジン間でリクエストを行う場合はオリジン、パス、クエリ文字列を送信するが、その他の場合は文書のオリジンのみを送信する
  - 他にも、`no-referrer`など設定可能な値がいくつか存在する
    - 参照：「[Referrer-Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy)」(Mozilla)
  - メモ：`web_basic/http_header/cross_origin_test`フォルダに挙動確認のために使用したコードがあります。

## 疑問（調べていてわからなかったことを記載します）

## メモ（回答には直接関係ないですが、調べたことを記載します）
* HTTPヘッダ
  - メッセージのボディに対する付加的な情報（メタデータ）を表現する
  - HTTP0.9では存在しなかったが、後に電子メールのメッセージ仕様(RFC822)のヘッダ形式を借りる形で追加されたため、メールのヘッダ形式と共通している部分がある。ただし名前は同じでも意味はHTTPヘッダとして独自定義されている
  - HTTPヘッダの種類
    | 分類 | 概要 | 例 |
    | ---- | ---- | ---- |
    | 日時 | グリニッジ標準時(GMT)で記述される | Date / If-Modified-Since / If-Unmodified-Since / Exprires / Last-Modified / Retry-After |
    | MIMEメディアタイプ | メッセージをやり取りするリソースの表現の種類を指定する | Content-Type |
    | 言語タグ | リソース表現の自然言語を指定する | Content-Language |
    | コンテントネゴシエーション | サーバがクライアントと交渉して、メディアタイプや文字エンコーディング、言語タグを決める手法 | Accept / Accept-Charset / Accept-Language |
    | Content-Lengthとチャンク転送 | Content-Length：メッセージにボディがある場合に、そのサイズを10進数のバイトで示す <br> チャンク転送：ボディを分割して転送する(最終的なサイズがわからない場合に有用) | Content-Length / Transfer-Encoding |
    | 認証 | クライアントがリソースへのアクセスを許可してもらうためにサーバへ証明を求める。 | WWW-Authenticate / Authorization |
    | キャッシュ | サーバから取得したリソースをローカルストレージに蓄積して再利用する。 | Pragma / Expires / Cache-Control |
    | 持続的接続 | HTTP1.0ではTCPコネクションをリクエストの度に切断していたが、そうではなくまとめて接続し続けることができる。それによりクライアントはサーバのレスポンスを待たずに同じサーバにリクエストを送信できる。 | Keep-Alive / Connection |
    | その他のHTTPヘッダ | HTTPの標準ではないがよく使われているヘッダ | Content-Diposition / Slug |
* HTML
  - target：リンクの表示先を決定する属性名。`_blank`指定の場合は別タブで開く。（`_self`指定の場合は同じタブで開く）
* JavaScript
  - window.opener：現在のウィンドウを開いたウィンドウへの参照
* オリジン
  - オリジン：ウェブコンテンツにアクセスするために使われる URL のスキーム(プロトコル)、ホスト(ドメイン)、ポート によって定義される

## 参照元

* 書籍：「Webを支える技術」
* 書籍：「Web API The Good Part」
* サイト：「[MDN Web Docs](https://developer.mozilla.org/ja/)」(Mozilla)
* サイト：「[Links to cross-origin destinations are unsafe](https://web.dev/external-anchors-use-rel-noopener/)」(Google)
* サイト：「[Window.opener](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener)」(Mozilla)
* サイト：「[フィッシング詐欺の新手口――「開いているタブが偽サイトに」](https://xtech.nikkei.com/it/article/NEWS/20100527/348511/)」(日経XTECH)
* サイト：「[The performance benefits of rel=noopener](https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/)」(Jake Archibald)
* サイト：「[CORS(Cross-Origin Resource Sharing)について整理してみた](https://dev.classmethod.jp/articles/about-cors/)」(Classmethod)
* サイト：「[CORS(Cross-Origin Resource Sharing)によるクロスドメイン通信の傾向と対策](https://dev.classmethod.jp/articles/cors-cross-origin-resource-sharing-cross-domain/)」(Classmethod)
* サイト：「[Referrer を制御する](https://qiita.com/wakaba@github/items/707d72f97f2862cd8000)」(Qiita)