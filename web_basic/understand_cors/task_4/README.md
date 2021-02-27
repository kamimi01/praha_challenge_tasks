# 課題4

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問2](#%E8%B3%AA%E5%95%8F2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> 作成した成果物に、試しにCURLで、「Simple request」に該当しないPOSTリクエストを送信してみましょう。果たしてCURLからのリクエストを受けた時、CORS制約は適用されるでしょうか？

### 回答

- 確認結果
  - `/preflight`に向けて、プリフライトリクエストとなるリクエストを投げたが、CORSのエラーは発生しなかった。
  - curlコマンドは以下（`--dump-header`でレスポンスヘッダ を出力。`-`は出力先を標準出力に指定。）
  
  ```bash
  curl --dump-header - http://localhost:8080/preflight \
  -X POST \
  -H "Content-Type: application/json" \
  -d "{'name': 'hoge'}" 
  ```

  - レスポンスは以下

  ```bash
  HTTP/1.1 200 OK
  X-Powered-By: Express
  Content-Type: application/json; charset=utf-8
  Content-Length: 65
  ETag: W/"41-0ysEOjbUQfTMYyZqBBzv99oqaWY"
  Date: Fri, 29 Jan 2021 04:09:00 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5

  {"message":"プリフライトリクエストを受け付けた"}
  ```

## 質問2

> その理由を説明してください。

### 回答

- CORSは、異なるオリジンにある選択されたリソースへのアクセス権を与えるよう**ブラウザー**に指示するための仕組み。OPTIONSメソッドを使用した、プリフライトリクエストは、ブラウザがリクエスト内容から判断して自動的に発行するリクエストであるため、curlによるリクエストではプリフライトリクエストは自動的に発生しない。そのため、curlコマンドでCORSに対応できているかを確認するためには、OPTIONSメソッドを直接メソッドとして指定してリクエストを実行する必要がある。

- 参考
  - [Preflight request (プリフライトリクエスト)](https://developer.mozilla.org/ja/docs/Glossary/Preflight_request)（MDN Web Docs）
  - CORSに対応していることを確認するためのcurlコマンド
  - curlコマンドは以下

```bash
curl --dump-header - http://localhost:8080/preflight \
-X OPTIONS \
-H "Origin: http://localhost:8000"
```

  - レスポンスは以下

```bash
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:8000
Access-Control-Allow-Methods: POST,OPTIONS
Access-Control-Allow-Headers: Content-Type
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
Date: Fri, 29 Jan 2021 04:11:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

  - [CORS のテスト](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/apigateway-test-cors.html)