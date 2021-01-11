# 課題 1

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->

## 質問 1

> クッキーとは何でしょうか？「Set-cookie」「ヘッダ」「サーバ」「ブラウザ」という単語を使って、クッキーの仕組みを説明してみてください

### 回答

### Cookieについての整理
#### Cookieについて
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

#### `Set-cookie`とは
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
|`Domain=<domain-value>`|クッキーを送信する先のホスト|`Set-Cookie: qwerty=219ffwef9w0f; Domain=somecompany.co.uk`|指定されなかった場合は、既定で現在の文書の URL におけるホスト名の部分になり、**サブドメインを含まない。**ドメイン名の前のドット (.example.com) は無視される。複数のホストやドメインの値を指定することはできませんが、ドメインが指定された場合、すべてのサブドメインが常に含まれ。複数のホストやドメインの値を指定することはできませんが、ドメインが指定された場合、すべてのサブドメインが常に含まれる。|
|`Path=<path-value>`|リクエストの URL に含まれるべきパスです。含まれていないと、ブラウザーは Cookie ヘッダーを送信しない。||スラッシュ ("/") の文字はディレクトリ区切りとして解釈され、サブディレクトリも同様に一致します (例えば Path=/docs であれば、 /docs, /docs/Web/, /docs/Web/HTTP はすべて一致します)|
|`Secure`|セキュアクッキーは、リクエストが SSL と HTTPS プロトコルを使用して行われた場合にのみサーバーに送信される。|`Set-Cookie: __Host-ID=123; Secure; Path=/`|安全ではないサイト (http:) は  Secure ディレクティブを付けてクッキーを設定することができなくなった。|
|`HttpOnly`|JavaScript が Document.cookie プロパティなどを介してこのクッキーにアクセスすることを禁止する。HttpOnly で作成されたクッキーは、JavaScript で開始されたリクエスト、例えば、 XMLHttpRequest.send() や fetch() と共に送信される。|`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly`|クロスサイトスクリプティング (XSS) の攻撃を軽減する。|
|`SameSite=<samesite-value>`|`Strict`：ブラウザは same-site のリクエスト（つまり、クッキーを設定したのと同じサイトから発信されたリクエスト）に対してのみクッキーを送信します。リクエストが現在のURLとは異なるURLから発生した場合、SameSite=Strict 属性を持つクッキーは送信されない。<br>`Lax`：画像やフレームをロードするための呼び出しなどのクロスサイトサブリクエストではクッキーが抑止されますが、ユーザーがリンクをクリックするなどして外部サイトからURLに移動すると送信される。<br>`None`：ブラウザはクロスサイトと same-site の両方のリクエストでクッキーを送信する。|`Set-Cookie: flavor=choco; SameSite=None; Secure`|クッキーがオリジン間リクエストで送信されないことを主張することで、クロスサイトリクエストフォージェリ攻撃 (CSRF) に対していくらか防御できる。ブラウザーは クッキーに SameSite=Lax の既定値を持たせるよう移行しつつあります。オリジンをまたいでクッキーを送信する必要がある場合、 None ディレクティブを用いて SameSite の制約を外してください。 None ディレクティブは Secure 属性を必要とする。|


#### Cookieの持続時間の定義
* セッションCookie：現在のセッションが終了数すると削除される。ブラウザーによっては再起動時にセッションの復元を使用するため、セッションクッキーが無期限に持続することがある。
* 持続的Cookie：有効期限が設定されたCookie。`Expires`属性や`Max-age`属性で有効期限を指定可能。

#### Cookieのアクセス制限
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

## 質問 2

> www.hoge.comで発行されたクッキーは、www.fuga.comにも送信されるでしょうか？その理由を説明してください

### 回答

## 質問 4

> www.hoge.comで発行されたクッキーは、www.api.hoge.comにも送信されるでしょうか？

## 回答

## 質問 5

> クッキーに Domain="hoge.com"を指定した場合、api.hoge.com にもクッキーは送信されるでしょうか？理由を説明してください

### 回答

## 質問 6

> ブラウザで実行される JavaScript は場合によってはクッキーの値を取得できます。JavaScript からクッキーの値が取得されることを防ぐことは可能でしょうか？どうすれば良いのでしょうか？

### 回答

## 質問 7

> HTTPS（暗号化）通信の時だけクッキーを送信することは可能でしょうか？どうすれば良いのでしょうか？

### 回答

## 質問 8

> クッキーに Expires を設定すると、どのように挙動が変わるでしょうか？

### 回答

## 質問 9

> SameSite 属性について説明してください

### 回答

## 質問 10

> クッキーに格納しない方が良い情報の例を、3 つ以上挙げてください

### 回答

## 質問 11

> クッキーはローカルストレージと混同されることが多々あります。クッキーを使うべきタイミングと、ローカルストレージを使うべきタイミングを挙げてみてください

### 回答

## 質問 12

> stack overflow のような WEB 掲示板サービスを開発しているとしましょう。XSS（クロスサイトスクリプティング）により、他ユーザのクッキー情報が抜き出される仕組みを説明してください。どのような対策が考えられますか？

### 回答
