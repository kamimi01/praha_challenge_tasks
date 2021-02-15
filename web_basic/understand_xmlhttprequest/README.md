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