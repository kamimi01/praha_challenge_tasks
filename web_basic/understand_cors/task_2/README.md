# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- CORSの仕組みとして、何度もプリフライトリクエストを送らなくても良いように、レスポンスをキャッシュするための時間を決めるヘッダはなんでしょうか？

<details>
<summary>想定回答</summary>

- `Access-Control-Max-Age`
    - 秒数で表す
    - ブラウザにより、設定できる最大秒数が異なる

- 参考
  - [Access-Control-Max-Age](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Access-Control-Max-Age)（MDN Web Docs）

</details>

## クイズ2

- XHTTPRequestは元々CORSの仕組みがなかったため、異なるオリジン間のアクセスを行う方法としてJSONP（JSON with padding）という方法が考案されました。<br>
この方法では、JSONデータを引数としたコールバック関数を呼び出す形式をとるために、セキュリティ上問題があります。<br>
具体的にどのような問題が発生する可能性があるか、答えてください。

```javascript
callback({"id": 123, "name": "hoge"})
```

<details>
<summary>想定回答</summary>

- コールバック関数名による、クロスサイトスクリプティング（XSS）
  - 外部から注入された以下のようなJavascriptが実行され、コールバック関数名に、悪意のあるスクリプトが存在していた場合にそのスクリプトが実行されてしまう（?以降がコールバック関数とコールバック関数名） 
  ```
  http://api.example.com/index.js?callback=%3Cscript%3Ealert(1)%3C\script%3E
  ```
  このURLを呼び出すと、以下のJavascriptが実行される。

  ```html
  <script>alert(1)</script>({"time": "11:19"})
  ```

  - 対策
    - コールバック関数名を検証する

- 外部からのサーバアクセスによる、機密情報の漏洩
  - JSOPは、`<script>`タグを用いることでオリジンが異なっていてもリソースを持つサーバにアクセスできる。
  - 例えば、機密情報にアクセスするためのURLがあったとする。また認証情報をCookieに保持しており、攻撃者によって悪意のあるスクリプトを読み込ませるサイトに誘導されてしまったとする。被害者がログイン状態であったでその不正なスクリプトにより機密情報を返すURLへアクセスが行われると、認証情報のCookieも自動で送信されるため、正常にアクセスが行われてしまった結果、攻撃者に取得した機密情報が送信されてしまうといった被害が考えられる。
  - 対策
    - JSONPに機密情報を含めない
    - JSOPによるクロスオリジン アクセスを行わず、CORSとJSONを使用した方法を用いる

- 参考
  - [第3回　JSONPでのクロスドメインアクセス](https://gihyo.jp/dev/serial/01/web20sec/0003?page=2)
  - 体系的に学ぶ 安全なWebアプリケーションの作り方（書籍）

</details>