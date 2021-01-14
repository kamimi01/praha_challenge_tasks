# 課題 1

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>目次</summary>

- [質問 1](#%E8%B3%AA%E5%95%8F-1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問 2](#%E8%B3%AA%E5%95%8F-2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [質問3](#%E8%B3%AA%E5%95%8F3)
  - [回答](#%E5%9B%9E%E7%AD%94-2)
- [質問 4](#%E8%B3%AA%E5%95%8F-4)
- [回答](#%E5%9B%9E%E7%AD%94-3)
- [質問 5](#%E8%B3%AA%E5%95%8F-5)
  - [回答](#%E5%9B%9E%E7%AD%94-4)
- [質問 6](#%E8%B3%AA%E5%95%8F-6)
  - [回答](#%E5%9B%9E%E7%AD%94-5)
- [質問7](#%E8%B3%AA%E5%95%8F7)
  - [回答](#%E5%9B%9E%E7%AD%94-6)
- [質問 8](#%E8%B3%AA%E5%95%8F-8)
  - [回答](#%E5%9B%9E%E7%AD%94-7)
- [質問 9](#%E8%B3%AA%E5%95%8F-9)
  - [回答](#%E5%9B%9E%E7%AD%94-8)
- [質問 10](#%E8%B3%AA%E5%95%8F-10)
  - [回答](#%E5%9B%9E%E7%AD%94-9)
- [質問 11](#%E8%B3%AA%E5%95%8F-11)
  - [回答](#%E5%9B%9E%E7%AD%94-10)
- [質問 12](#%E8%B3%AA%E5%95%8F-12)
  - [回答](#%E5%9B%9E%E7%AD%94-11)
- [Cookieについての整理](#cookie%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E6%95%B4%E7%90%86)
  - [Cookieについて](#cookie%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [`Set-cookie`とは](#set-cookie%E3%81%A8%E3%81%AF)
  - [Cookieの持続時間の定義](#cookie%E3%81%AE%E6%8C%81%E7%B6%9A%E6%99%82%E9%96%93%E3%81%AE%E5%AE%9A%E7%BE%A9)
  - [Cookieのアクセス制限](#cookie%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E5%88%B6%E9%99%90)
  - [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問 1

> クッキーとは何でしょうか？「Set-cookie」「ヘッダ」「サーバ」「ブラウザ」という単語を使って、クッキーの仕組みを説明してみてください

### 回答

* キーバリュー型でクライアントやサーバで送受信する小さなデータのこと。クライアントから送られる場合は`Cookie`ヘッダで送られ、サーバから送られる場合は`Set-cookie`ヘッダで送られる。２つのリクエストが同じブラウザから送信されたリクエストであるかを知るために使用され、主に以下３つの用途で使用されている。
  * セッション管理
  * パーソナライゼーション
  * トラッキング

## 質問 2

> www.hoge.comで発行されたクッキーは、www.fuga.comにも送信されるでしょうか？その理由を説明してください

### 回答

* 送信されない。同一オリジンではないため。

* 疑問
  * `Domain`属性に`com`が指定されていた場合は、送信されるのか？

## 質問3

> hoge.com:8080のクッキーはhoge.com:9090にも送信されるでしょうか？

### 回答

* 送信される。クッキーはポートによる解離を行わないため、あるポート上で稼働しているサービスで読み取れるならば、そのクッキーは，同じサーバの別ポート上のサービスでも読み取れる。 クッキーが，あるポート上のサービスで書き込めるならば、そのクッキーは，同じサーバの別ポート上のサービスでも書き込める。

* 参考
  * [RFC 6265, HTTP State Management Mechanism 8.5. 機密性の弱点](https://triple-underscore.github.io/http-cookie-ja.html#weak-confidentiality)

## 質問 4

> www.hoge.comで発行されたクッキーは、www.api.hoge.comにも送信されるでしょうか？

## 回答

* `Domain`属性（Cookie を受信することができるホストを指定する）が`hoge.com`に設定されていた場合、送信されるが、指定されていない場合はクッキーを設定したのと同じドメインに送信されサブドメインには送信されないため、`www.api.hoge.com`には送信されない。

* 参考
  * [RFC 6265, HTTP State Management Mechanism 4.1.2.3. The Domain Attribute](https://tools.ietf.org/html/rfc6265#section-4.1.2.3)
  * [RFC 6265, HTTP State Management Mechanism 4.1.2.3. Domain属性（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#sane-domain)

## 質問 5

> クッキーに Domain="hoge.com"を指定した場合、api.hoge.com にもクッキーは送信されるでしょうか？理由を説明してください

### 回答

* `Domain`属性（Cookie を受信することができるホストを指定する）が`hoge.com`に設定されていた場合、送信されるが、指定されていない場合はクッキーを設定したのと同じドメインに送信されサブドメインには送信されないため、`api.hoge.com`には送信されない。

* 参考
  * [サブドメインの異なるサービス間で cookie を共有する](https://qiita.com/il-m-yamagishi/items/9aad5737c80d5bfd5eb8)
  * [Cookieの送信先の定義](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies#define_where_cookies_are_sent)

## 質問 6

> ブラウザで実行される JavaScript は場合によってはクッキーの値を取得できます。JavaScript からクッキーの値が取得されることを防ぐことは可能でしょうか？どうすれば良いのでしょうか？

### 回答

* 可能。以下のように`HttpOnly`属性を付与することで、JavaScriptの`Document.cookie`APIにはアクセスできなくなる。サーバ側のセッションを持続させるクッキーはJavaScriptが利用する必要はないため、この属性を付与することが推奨される。

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

* 参考
  * [Cookieへのアクセス制限](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
  * [RFC 6265, HTTP State Management Mechanism 4.1.2.6. HttpOnly 属性（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#sane-httponly)
  * [クロスサイトスクリプティング(XSS)対策としてCookieのHttpOnly属性でどこまで安全になるのか](https://www.youtube.com/watch?v=4JREwhSC2dQ)

## 質問7

> HTTPS（暗号化）通信の時だけクッキーを送信することは可能でしょうか？どうすれば良いのでしょうか？

### 回答

* 可能。以下のように`Secure`属性を付与することで、HTTPSプロトコルのリクエストのみサーバに送信され、HTTPでは送信されない。またURLにhttpを含む安全でないサイトはこの属性を使用してクッキーを設定することは不可能。
* ただし、この属性付与によって、必ずしもクッキー内の機密情報へのアクセスを防げるわけではない。クライアントのハードディスクへアクセスすることで読み取られる可能性がある。また、HTTPSではない（セキュアではない）チャネルから`Secure`クッキーを上書きされる可能性もある。

* 参考
  * [Cookieへのアクセス制限](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
  * [RFC 6265, HTTP State Management Mechanism 4.1.2.5. Secure 属性（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#sane-secure)
  * [RFC 6265, HTTP State Management Mechanism 8.6 完全性の弱点（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#weak-integrity)

## 質問 8

> クッキーに Expires を設定すると、どのように挙動が変わるでしょうか？

### 回答

* `Expires`未設定の場合：セッションクッキーの寿命となるため、現在のセッションが終了すると削除される。
* `Expires`設定済みの場合：`Expires`属性で指定された時刻が経過した後に削除される。具体的に以下の流れでユーザエージェントが処理を行う
  1. 受け取った`Expires`の属性値を`cookie-date`として構文解析（パース）する
  2. 構文解析が失敗した場合、`Expires`属性は無視される
  3. 属性値がユーザエージェントが表現可能な最も未来の日付より後の場合、ユーザエージェントは属性値にその値を設定して良い
  4. 属性値がユーザエージェントが表現可能な最も過去の日付より前の場合、ユーザエージェントは属性値にその値を設定して良い
  5. 属性値に値を設定する

* 参考
  * [ディレクティブ](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie#directives)
  * [RFC 6265, HTTP State Management Mechanism 5.2.1. The Expires Attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1)
  * [RFC 6265, HTTP State Management Mechanism 5.2.1. Expires 属性（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#expires-attribute)

## 質問 9

> SameSite 属性について説明してください

### 回答

* `SameSite`属性とは、クロスオリジン間のクッキーの送信元を制御するための属性。
* 以下３つの値が設定可能であり、デフォルト値は`None`であったが、最近のブラウザでは`Lax`がデフォルトとされる動きがある。
  * `Strict`：ブラウザはクッキーを設定したのと同じサイトから発信されたリクエストに対してのみ、クッキーを送信する。リクエストが現在のURLと異なる場合は送信されない。
  * `Lax`：画像やフレームをロードするための呼び出しなどのクロスサイトサブリクエストではクッキーが抑止されますが、ユーザーがリンクをクリックするなどして外部サイトからURLに移動すると送信される。
  * `None`:ブラウザはクロスサイトと same-site の両方のリクエストでクッキーを送信する。この値を使用する場合は、`Secure`属性を付与する必要がある。（付与しなかった場合、そのクッキーは拒否され、警告が表示される。）

* 参考
  * [draft-ietf-httpbis-cookie-same-site](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-1)
  * [SameSite cookies](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie/SameSite)

* 疑問
  * `Domain`属性と`SameSite`属性の違いがよくわからない

## 質問 10

> クッキーに格納しない方が良い情報の例を、3 つ以上挙げてください

### 回答

* ユーザIDやパスワード、権限情報などの書き換えられると困る情報、を暗号化してない文字列（e.g.`password`などパスワードが暗号化されずに格納されているなど）
  * ただし、RFC6265によると、基本的にデータを直接クッキーには保存せず、セッションIDを保存する方が攻撃者にクッキーの内容を盗まれた際の被害が制限される。
  * 「体系的に学ぶ 安全なWebアプリケーションの作り方」（書籍）においては、**セッションIDとトークン以外をクッキーに保存することは推奨されていない**
* 攻撃者に推測されやすいセッションID（e.g.時刻情報などを基にした単純なアルゴリズムで生成されている）
  * 攻撃者に簡単に推測されてしまうことで、セッションハイジャックの危険がある。
* 容量の大きいクッキー（以下の制限を超えたクッキーは削除される可能性がある）
  * 1クッキーあたり、4096byte
  * 1ドメインあたり、50個のクッキー
  * 全部で3000個のクッキー

* 参考
  * [RFC 6265, HTTP State Management Mechanism 8. セキュリティの考慮点（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#security-considerations)
  * [IPA セッション対策](https://www.ipa.go.jp/security/awareness/vendor/programmingv2/contents/302.html)
  * [IPA 安全なウェブサイトの作り方 - 1.4 セッション管理の不備](https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_4.html)
  * GDPRでは、Cookieに関するコンプライアンスを定めている（以下はkamimi01訳）
    * 参考
      * [Cookies, the GDPR, and the ePrivacy Directive](https://gdpr.eu/cookies/)
  * [CookieのDomain属性は *指定しない* が一番安全](https://blog.tokumaru.org/2011/10/)
  * [RFC 6265, HTTP State Management Mechanism 6.1 制限（非公式日本語訳）](https://triple-underscore.github.io/http-cookie-ja.html#implementation-limits)

## 質問 11

> クッキーはローカルストレージと混同されることが多々あります。クッキーを使うべきタイミングと、ローカルストレージを使うべきタイミングを挙げてみてください

### 回答

* クッキーを使うべきタイミング:認証関連を処理したい場合に向いている
  * 有効期限を設定したい場合
  * サーバにデータを送信したい場合
    * ローカルストレージはサーバには送らず、ブラウザ上でデータを保持する
  * HTML4に対応したい場合
    * ローカルストレージはHTML4に対応してない
* ローカルストレージを使うべきタイミング:
  * 半永久的にデータを保存したい場合
  * 大容量のデータを保存したい場合
    * > クッキーを使用する場合、すべてのリクエストで送信されるので、 (特にモバイルデータ通信で) 性能を悪化させる可能性があります。クライアントストレージ向けの新しい API として、Web Storage API (localStorage および sessionStorage) と IndexedDB があります。

* 参考
  * [CookieとWebStorageとSessionについてのまとめ](https://qiita.com/pipiox/items/95554673ba3b078ac112)
  * [JavaScript Cookies vs Local Storage vs Session](https://www.youtube.com/watch?v=GihQAC1I39Q)
  * [Web Storage API](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)(MDN Web Docs)

* 疑問
  * ローカルストレージとセッションストレージとクッキーの違い、使い分けは？

## 質問 12

> stack overflow のような WEB 掲示板サービスを開発しているとしましょう。XSS（クロスサイトスクリプティング）により、他ユーザのクッキー情報が抜き出される仕組みを説明してください。どのような対策が考えられますか？

### 回答

* XSSにより、例えば以下の手順でクッキー情報が盗み出される可能性がある
  1. 攻撃者が用意したウェブサイトをユーザがクリックする。
  2. クリックにより、スクリプトを含む文字列を送信
  3. スクリプトを含むwebページを出力する
  4. ユーザのブラウザ上でクッキーを悪意ある人に送信するスクリプトが実行される
  5. 攻撃者がユーザのクッキーを取得する
* 対策（多くの対策が存在するが、ここではIPAで推奨されている全アプリケーションに共通の対策を記載する）
  * HTTPレスポンスヘッダの`Content-Type`に`charset`を指定する
    * > たとえば、具体的な例として、HTMLテキストに、 「+ADw-script+AD4-alert(+ACI-test+ACI-)+ADsAPA-/script+AD4-」という文字列が埋め込まれた場合が考えられます。この場合、一部のブラウザはこれを「UTF-7」の文字コードでエンコードされた文字列として識別します。これがUTF-7として画面に表示されると 「<script>alert('test');</script>」として扱われるため、スクリプトが実行されてしまいます。
  * クッキーに`HttpOnly`属性を付与する
  * XSSの潜在的な脆弱性対策として有効なブラウザの機能を有効にするレスポンスヘッダ を返す
    * `X-XSS-Protection`：ブラウザの「XSS フィルタ」の設定を有効にするパラメータです。ブラウザで明示的に無効になっている場合でも、このパラメータを受信することで有効になる
    * `Content Security Policy`：ブラウザで起こりうる問題を緩和するセキュリティの追加レイヤー。その機能の一つに、反射型クロスサイト・スクリプティング攻撃を防止する「reflected-xss」がある。

* 参考
  * [安全なウェブサイトの作り方 - 1.5 クロスサイト・スクリプティング](https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_5.html)
  * [クロスサイトスクリプティング(XSS)対策としてCookieのHttpOnly属性でどこまで安全になるのか](https://www.youtube.com/watch?v=4JREwhSC2dQ)

---

## Cookieについての整理
### Cookieについて
* サーバがユーザのwebブラウザに送信する小さなデータのことであり、ブラウザに保存され、その後のリクエストと共に同じサーバへ返送される。一般的には2つのリクエストが同じブラウザから送信された物であるかを知るために使用される。またユーザのログイン状態を維持することができる。
* Cookieの用途
  * セッション管理
  * パーソナライゼーション
  * トラッキング
* キーバリューで、`<cookie-name>=<cookie-value>`のように設定される
* リストの組はセミコロンと空白 (`'; '`) で区切られます。
* 例
```
Cookie: PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1
```

### `Set-cookie`とは
* WebサーバがHTTPリクエストを受け取った後にCookieをセットするHTTPヘッダのこと
* `<cookie-name>=<cookie-value>`で構成される
* ブラウザがこのヘッダを受け取ったあとは、ブラウザは以前格納された全てのCookieを`Cookie`ヘッダを使用してサーバへ送信する
* 設定可能な接頭辞
  * `__Secure-`：この接頭辞で始まるクッキー名は、secure フラグを設定することが必要で、安全なページ (HTTPS) でなければならない
  * `__Host-`：この接頭辞で初めあるクッキー名は、secure フラグを設定し、安全なページ (HTTPS) から読み込む必要があり、ドメインを指定することができず (従ってサブドメインにも送られません)、パスが / で終わる必要がある
  * 以下は値の例
  ```
  // どちらも安全な (HTTPS の) オリジンから受け入れられます
  Set-Cookie: __Secure-ID=123; Secure; Domain=example.com
  Set-Cookie: __Host-ID=123; Secure; Path=/
  ```
* 以下はNode.jsでCookieを設定する時の実装例
```javascript
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
```
* 任意のディレクティブ

|ディレクティブ|概要|例|備考|
|----|----|----|----|
|`Expires=<date> `|クッキーの有効期限で、HTTPの日時のタイムスタンプ。サーバではなく、クッキーが設定されているクライアントからの相対時刻で設定される。|`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT`|指定されてなかった場合、クッキーはセッションクッキーの寿命となる。ただ、多くのWebブラウザではセッション復元機能があるため、セッションクッキーも復元される。|
|`Max-Age=<number>`|クッキーの期限までの秒数。ゼロまたは負の数値の場合は、クッキーは直ちに期限切れになる。|`Set-Cookie: id=a3fWa; Max-Age=2592000`|Expires および Max-Age の両方が設定されていたら、 Max-Age が優先され|
|`Domain=<domain-value>`|クッキーを**送信する先**のホストを制御するための属性。|`Set-Cookie: qwerty=219ffwef9w0f; Domain=somecompany.co.uk`|指定されなかった場合は、既定で現在の文書の URL におけるホスト名の部分になり、**サブドメインを含まない。**ドメイン名の前のドット (.example.com) は無視される。複数のホストやドメインの値を指定することはできませんが、ドメインが指定された場合、すべてのサブドメインが常に含まれ。複数のホストやドメインの値を指定することはできませんが、ドメインが指定された場合、すべてのサブドメインが常に含まれる。|
|`Path=<path-value>`|リクエストの URL に含まれるべきパスです。含まれていないと、ブラウザーは Cookie ヘッダーを送信しない。||スラッシュ ("/") の文字はディレクトリ区切りとして解釈され、サブディレクトリも同様に一致します (例えば Path=/docs であれば、 /docs, /docs/Web/, /docs/Web/HTTP はすべて一致します)|
|`Secure`|セキュアクッキーは、リクエストが SSL と HTTPS プロトコルを使用して行われた場合にのみサーバーに送信される。|`Set-Cookie: __Host-ID=123; Secure; Path=/`|安全ではないサイト (http:) は  Secure ディレクティブを付けてクッキーを設定することができなくなった。|
|`HttpOnly`|JavaScript が Document.cookie プロパティなどを介してこのクッキーにアクセスすることを禁止する。HttpOnly で作成されたクッキーは、JavaScript で開始されたリクエスト、例えば、 XMLHttpRequest.send() や fetch() と共に送信される。|`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly`|クロスサイトスクリプティング (XSS) の攻撃を軽減する。|
|`SameSite=<samesite-value>`|クッキーを**送信する元**を制御するための属性。`Strict`：ブラウザは same-site のリクエスト（つまり、クッキーを設定したのと同じサイトから発信されたリクエスト）に対してのみクッキーを送信します。リクエストが現在のURLとは異なるURLから発生した場合、SameSite=Strict 属性を持つクッキーは送信されない。<br>`Lax`：画像やフレームをロードするための呼び出しなどのクロスサイトサブリクエストではクッキーが抑止されますが、ユーザーがリンクをクリックするなどして外部サイトからURLに移動すると送信される。<br>`None`：ブラウザはクロスサイトと same-site の両方のリクエストでクッキーを送信する。|`Set-Cookie: flavor=choco; SameSite=None; Secure`|クッキーがオリジン間リクエストで送信されないことを主張することで、クロスサイトリクエストフォージェリ攻撃 (CSRF) に対していくらか防御できる。ブラウザーは クッキーに SameSite=Lax の既定値を持たせるよう移行しつつあります。オリジンをまたいでクッキーを送信する必要がある場合、 None ディレクティブを用いて SameSite の制約を外してください。 None ディレクティブは Secure 属性を必要とする。|


### Cookieの持続時間の定義
* セッションCookie：現在のセッションが終了数すると削除される。ブラウザーによっては再起動時にセッションの復元を使用するため、セッションクッキーが無期限に持続することがある。
* 持続的Cookie：有効期限が設定されたCookie。`Expires`属性や`Max-age`属性で有効期限を指定可能。

### Cookieのアクセス制限
* `Secure`属性：この属性がついたクッキーは、HTTPSプロトコル上の暗号化されたリクエストでのみサーバに送信され、安全でないHTTPでは送信されない
* `HttpOnly`属性：JavaScriptの`Document.cookie`APIにはアクセスできず、サーバに送信される
  * `Document.cookie`とは：`Document`の`cookie`プロパティで文書に関連づけられたクッキーを読み書きできる
* 付与する例
```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
```

### 参考
* [HTTP Cookie の使用](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)（MDN Web Docs）
* [Document.cookie](https://developer.mozilla.org/ja/docs/Web/API/Document/cookie)（MDN Web Docs）
* [Document](https://developer.mozilla.org/ja/docs/Web/API/Document)（MDN Web Docs）
* [Set-Cookie](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie)（MDN Web Docs）
* [Cookie](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Cookie)（MDN Web Docs）
* [View, Edit, And Delete Cookies With Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/storage/cookies)（Chrome DevTools）
* [View And Edit Local Storage With Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage)（Chrome DevTools）