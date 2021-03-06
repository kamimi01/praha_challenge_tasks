# 課題3

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [動作環境](#%E5%8B%95%E4%BD%9C%E7%92%B0%E5%A2%83)
- [確認手順](#%E7%A2%BA%E8%AA%8D%E6%89%8B%E9%A0%86)
- [確認結果](#%E7%A2%BA%E8%AA%8D%E7%B5%90%E6%9E%9C)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 動作環境

- `node`バージョン：`v12.20.1`
- `npm`バージョン：`6.14.10`
- Chromeバージョン: 88.0.4324.96（Official Build） （x86_64）

## 確認手順

1. VSCodeで、Remote Containerの拡張機能で、[cors_mock](../cors_mock)フォルダを「Open Folder in Container...」から開く
2. 以下のコマンドを実行して、必要なモジュールをインストールする（node_modulesフォルダをgitignoreしているため）
   `npm install`
3. 以下のコマンドを実行する
   `npm run dev`
4. 以下のURLにブラウザでアクセスする
   `http://localhost:8000`
5. Developer Toolsを開く

## 確認結果

- `/simple`がシンプルリクエスト想定のパスですが、プリフライトリクエストにはなっていないことがわかります（OPTIONSメソッドによるリクエストが存在しない）

![](../../../../assets/cors_simple_request_result.png)

- `/preflight`がプリフライトリクエスト想定のパスですが、シンプルリクエストではなく、プリフライトリクエストになっていることがわかります（OPTIONSメソッドによるリクエストとPOSTメソッドによるリクエストが存在する）

![](../../../../assets/cors_preflight_request_options_result.png)

![](../../../../assets/cors_preflight_request_post_result.png)

- 今回ngrokは使用せず、ポートを変更することでクロスドメインアクセスの実装を行っています（ngrokだと毎回URLが変わるので、書き換えが手間だからです...）