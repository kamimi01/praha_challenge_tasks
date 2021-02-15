# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

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