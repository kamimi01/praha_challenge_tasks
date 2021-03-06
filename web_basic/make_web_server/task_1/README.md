# 課題1：node.jsとexpressでWEBサーバを作ってください

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [動作環境（2020/01時点）](#%E5%8B%95%E4%BD%9C%E7%92%B0%E5%A2%83202001%E6%99%82%E7%82%B9)
- [課題の回答](#%E8%AA%B2%E9%A1%8C%E3%81%AE%E5%9B%9E%E7%AD%94)
  - [`curl`コマンドによる確認結果](#curl%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E7%A2%BA%E8%AA%8D%E7%B5%90%E6%9E%9C)
  - [POSTMANによる確認結果](#postman%E3%81%AB%E3%82%88%E3%82%8B%E7%A2%BA%E8%AA%8D%E7%B5%90%E6%9E%9C)
  - [request.bodyについての質問](#requestbody%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E8%B3%AA%E5%95%8F)
    - [POSTMANでのテスト実行方法](#postman%E3%81%A7%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E5%AE%9F%E8%A1%8C%E6%96%B9%E6%B3%95)
    - [定義済みnpmコマンド](#%E5%AE%9A%E7%BE%A9%E6%B8%88%E3%81%BFnpm%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [`Node.js`、`npm`、`express`に関する事項の整理](#nodejsnpmexpress%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E4%BA%8B%E9%A0%85%E3%81%AE%E6%95%B4%E7%90%86)
  - [`Node.js`について](#nodejs%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [`npm`に関する各コマンド](#npm%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E5%90%84%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
    - [`npm install`に関するオプション](#npm-install%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)
    - [ローカルインストールとグローバルインストールの違い](#%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%A8%E3%82%B0%E3%83%AD%E3%83%BC%E3%83%90%E3%83%AB%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%AE%E9%81%95%E3%81%84)
  - [`npm`に関するファイル・フォルダ](#npm%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%83%BB%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80)
    - [`package.json`と`package-lock.json`の違い](#packagejson%E3%81%A8package-lockjson%E3%81%AE%E9%81%95%E3%81%84)
  - [`package.json`の中身](#packagejson%E3%81%AE%E4%B8%AD%E8%BA%AB)
    - [`dependencies`と`devDependencies`の違い](#dependencies%E3%81%A8devdependencies%E3%81%AE%E9%81%95%E3%81%84)
  - [便利ツール・モジュール](#%E4%BE%BF%E5%88%A9%E3%83%84%E3%83%BC%E3%83%AB%E3%83%BB%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)
    - [開発時によく使用されるパッケージ一覧（kamimi01調べ）](#%E9%96%8B%E7%99%BA%E6%99%82%E3%81%AB%E3%82%88%E3%81%8F%E4%BD%BF%E7%94%A8%E3%81%95%E3%82%8C%E3%82%8B%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E4%B8%80%E8%A6%A7kamimi01%E8%AA%BF%E3%81%B9)
    - [ツール一覧](#%E3%83%84%E3%83%BC%E3%83%AB%E4%B8%80%E8%A6%A7)
  - [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 動作環境（2020/01時点）

* npmのバージョン：`6.9.0`
* nodeのバージョン：`v10.16.0`

## 課題の回答

### `curl`コマンドによる確認結果

```bash
$ curl localhost:3000 -H "Content-Type: application/json"

{"text":"hello world"}
```

```bash
$ curl localhost:3000 -d '{"name": "hoge"}' -H "Content-Type: application/json"

{"name":"hoge"}
```

```bash
$ curl localhost:3000 -d '{"name": "hoge"}'

{"error":{"message":"Bad Request"}}
```

### POSTMANによる確認結果

* 以下のリンクでリクエストとレスポンスを確認可能です
  * https://documenter.getpostman.com/view/7430399/TVzPneNu

* 以下は、想定のレスポンスが返っていることを確認したテストスクリプトの実行結果です
![postman_run_result_make_web_server](../../../assets/postman_run_result_make_web_server.png)

### request.bodyについての質問

> そもそもなぜrequest.bodyの内部はストリームなのでしょうか？

* Node.jsの特徴である、「大量のアクセスを捌く」「動作が速い」を実現するため。
  * ストリームを使わないことで、以下の問題が発生し、パフォーマンスが落ちる可能性がある
    * 扱うデータ量が大きい場合、プログラムはユーザ数と同じだけの大量のメモリを消費してしまう
    * ユーザがデータを受け取る前に、全てを読み込むのを待つ必要があり、レイテンシ（通信の遅延時間）が非常に高くなってしまう

* 参考
  * [stream-handbook](https://github.com/meso/stream-handbook)


#### POSTMANでのテスト実行方法

* 以下の方法でローカルのPOSTMANでも確認可能です

1. `task_1`のフォルダをローカルにダウンロードする
2. `npm install`を実行する
3. `npm start`を実行する
4. ローカルのPOSTMANに[postman_dump](./postman_dump)フォルダのコレクションをインポートする
5. コレクションを「Run」する

#### 定義済みnpmコマンド

* 以下のコマンドを`package.json`のscriptsに設定済み

|フィールド名|エイリアスコマンド|コマンドの実態|概要|
|----|----|----|----|
|start|`npm start`|`node app.js`|`app.js`を実行する|
|start-dev|`npm run start-dev`|`nodemon app.js`|`app.js`をnodemonを使用して実行する（開発用）|
|jsdoc|`npm run jsdoc`|`./node_modules/.bin/jsdoc app.js`|`app.js`のJSDocを作成する。<br> `out`フォルダのにドキュメントが作成され、`index.html`を開いてドキュメントを参照可能（開発用）`scripts`でコマンド定義せずとも、`npm jsdoc app.js`でも実行可能|

<!-- 余裕があれば以下を行う -->
<!-- ### テストモジュール`jest`による単体テスト

* 今後、`jest`も使用する予定だと思いますので、慣れるため、今回導入して実行してみました -->

---

## `Node.js`、`npm`、`express`に関する事項の整理

* 課題とは関係ありません。個人的な調査メモです
* 今回の課題を機に、今までなんとなく使用していたnpmのコマンドやファイルの違いなど理解できていないこと、疑問を以下に整理する

### `Node.js`について

* Node.jsとは
  * JavaScriptを用いた**Non-blocking I/O環境**
* 特徴
  * うまくスケールできること（大量のアクセスを捌けること）
  * 動作が速いこと
    * スレッドではなく、イベントループを採用
    * イベントループには、シングルスレッドのためメモリを食いにくいが、コードのどこかでブロックする処理があるとプロセス全体がストップしてしまうという弱点があり
    * それをなくし、Non-Blocking I/Oを強制したのがnode.js
      * ちなみにJavaScriptがシングルスレッドモデルでイベントループの仕組みを持っていたので、Node.**js**になった

  * 参考
    * [node.jsドキュメント](https://nodejs.jp/docs)
    * [node.js とは何か](https://badatmath.hatenablog.com/entry/20101020/1287587240)
  
* Node.jsのStream APIについて
  * ストリームモジュールは、Nodeのビルトインであり、コアライブラリでも利用されている
  * ユーザ領域のモジュールでも使用可能
  * ストリームを使わないとどうなるか
    * 扱うデータ量が大きい場合、プログラムはユーザ数と同じだけの大量のメモリを消費する
    * ユーザーがデータを受け取る前に、全てを読み込むのを待つ必要があり、レイテンシ（通信の遅延時間）が非常に高くなってしまう

  * 参考
    * [stream-handbook](https://github.com/meso/stream-handbook)
    * ストリーミングデータとは：数千ものデータソースによって継続的に生成されるデータ
      * [ストリーミングデータとは](https://aws.amazon.com/jp/streaming-data/)
    * [Stream](https://nodejs.org/docs/latest/api/stream.html#stream_stream)
    * [[Javascript] イベント駆動型の設計ができるEventEmitterに入門](https://www.yoheim.net/blog.php?q=20170103)
    * [Node Streams: How do they work?](https://maxogden.com/node-streams)
    * [メモリ管理](https://developer.mozilla.org/ja/docs/Web/JavaScript/Memory_Management)(MDN Web Docs)
    * [デバッグガイド](https://nodejs.org/ja/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios)(nodejs公式)
    * [Node.jsの使用メモリを観測する方法](https://qiita.com/ledsun/items/60ece250b96cac1af0f7)


### `npm`に関する各コマンド

|コマンド|概要|備考|
|----|----|----|
|`npm init`|初期化処理を行い、`package.json`を生成する||
|`npm install <パッケージ名>`|パッケージのインストール|`npm i`と省略表記も可能|
|`npm uninstall <パッケージ名>`|パッケージのアンインストール||
|`npm install`|`package.json`の`dependencies`と`devDependencies`に記載されているパッケージのインストール|他人のnpmプロジェクトを取得し動かす場合には、このコマンドを使用|
|`npm update <パッケージ名>`|パッケージの更新|おそらく無闇にこのコマンドを打つと動かなくなるなど問題が発生すると考えられるので注意|
|`npm ls`|インストール済みのパッケージの一覧表示||

#### `npm install`に関するオプション

* 色んな記事でよく見る`--save`と`--save-dev`オプション
  * よく見るこの2つのオプションについてのみ取り上げる

|オプション名|概要|備考|
|----|----|----|
|`--save`|（今後使用することはない！）<br>`dependencies`にインストールしたパッケージ名を記載する役割を持っていた|npm5.x.x以降、デフォルトで記載されるようになったため、今後使用する機会はないと思われる。npm公式からも記載がなくなっている。|
|`--save-dev`|`devDependencies`にインストールしたパッケージ名が記載される|省略形は`-D`|

* `dependencies`と`devDependencies`の違いについては、「[`dependencies`と`devDependencies`の違い](#dependenciesとdevdependenciesの違い)」を参照

* 他にもたくさんのオプションがあるので、詳細は以下を参照。
  * [npm-install](https://docs.npmjs.com/cli/v6/commands/npm-install)(npm公式)

#### ローカルインストールとグローバルインストールの違い

|インストール方法|概要|オプション|備考|
|----|----|----|----|
|ローカルインストール|各プロジェクトごとにインストールする。Node.jsの`require()`はローカルインストール。<br>各プロジェクトごとにインストールしたい場合。システム全体を汚染しないため、基本はローカルインストールが好ましい。|なし。<br>オプションがない場合にローカルインストールとなる|
|グローバルインストール|システム全体で使うパッケージ（プロジェクト固有ではないパッケージ）をインストール|`--global`または`-g`|`npm root -g`で出力されるディレクトリの`node_modules`にインストールされるが、`nodebrew`を使用してnodeをインストールしている場合は、別のディレクトリになる。|

### `npm`に関するファイル・フォルダ

|ファイル/フォルダ名|概要|備考|
|----|----|----|
|`package.json`|プロジェクトの基本情報を保持 <br>・対話式に上記の内容を決めていくことができる<br> インストールすべきパッケージのバージョンの範囲|詳細は「[`package.json`の中身](#packagejsonの中身)」参照。<br>おそらくJavaでいう、`build.gradle`みたいな感じ。|
|`package-lock.json`|`npm install`によって実際にインストールしたパッケージのバージョン情報を保持。|npmのversion5.x.xから導入されており、`npm install`を行った場合に自動で生成される。||
|`node_modules`|インストールしたパッケージの仮置き場としてインストールされる|**このディレクトリは`.gitignore`で Gitリポジトリから除外するのが普通であり、このディレクトリ内のファイルは編集してはいけない。**|

#### `package.json`と`package-lock.json`の違い

* 明確に違いについて言及している記事が見つからなかったが、おそらく以下

|ファイル名|作成されるタイミング|概要|備考|
|----|----|----|----|
|`package.json`|`npm init`を行った時|npmを公開する際に必須とされるプロジェクトの基本情報（例えば著者やプロジェクトの詳細）を中心に記載する。パッケージ名も記載はされるが、実際にインストールされたパッケージ全てが記載されているわけではない。<br>例えば、`npm install express`を実行した場合、`express`自体のパッケージ名やバージョン名は記載されるが、`express`が依存して使用している内部のパッケージ(例えば`body-parser`など)はこのファイルには記載されない。||
|`package-lock.json`|`npm install <パッケージ名>`を行った時|`package.json`には記載されない、`npm install <パッケージ名>`を行った際に**実際にインストール**されるモジュール全ての名前とバージョンが記載される。またGitリポジトリには含めるべき。||

### `package.json`の中身

  * かなり多くのフィールドが存在するため、ここでは`npm init`を行った際に全てデフォルトのママにした場合に作成されるフィールド名を一覧化する
  * 詳細は、npm公式の説明(英語)を参照

|フィールド名|概要|備考|
|----|----|----|
|name|モジュールの名前|自分のnpmを公開する場合は、`name`と`version`で一意になる必要があり必須だが、しない場合は任意|
|version|モジュールのバージョン|公開した自分のnpmをバージョンアップする際はこの番号を更新する。公開する場合は必須。しない場合は任意。|
|description|モジュールの説明|`npm search`して他の人がモジュールを探す際に一覧に表示される。そのためnpmを公開する人にとっては重要）|
|main|モジュールの中で最初に呼ばれるスクリプトファイル|公式によると、モジュールによっては存在しない場合がある|
|scripts|任意のシェルスクリプトを実行するエイリアスコマンド|例えば`"start"`の場合は`npm start`を実行するとバリューに記載しているコマンドが実行可能。`test`や`start`といった予約語を使用したコマンド定義を行う場合は、`npm`に続いて`npm start`などのように実行するが、`production`のような予約語以外のコマンドを実行する場合、`npm run`に続いて`npm run production`のようにコマンドを実行する必要がある|
|author|著者|オブジェクトにすることで`name`/`email`/`url`がオプションで記載可能。このフィールドには一人しか記載できないが、`contributors`のフィールドには複数人を配列で記載可能|
|license|ライセンス|
|dependencies|依存するパッケージとそのバージョン|`dependencies`と`devDependencies`に記載されたモジュールが`node_modules`ディレクトリにインストールされる。<br> |

#### `dependencies`と`devDependencies`の違い

* どちらもモジュールとそのバージョンを記載している

|フィールド名|概要|備考|
|----|----|----|
|`dependencies`|開発者以外の人が`npm install`した場合にインストールされるパッケージとバージョンを記載||
|`devDependencies`|**開発の際に必要とされる**パッケージとバージョンを記載。パッケージとして公開されているものを開発者以外が`npm install`してもこのフィールドのパッケージはインストールされない。開発者の場合はどちらもインストールされる。|`--save-dev`オプションを使用することでこのフィールドにパッケージが記載される|

* 参考
  * [【いまさらですが】package.jsonのdependenciesとdevDependencies](https://qiita.com/chihiro/items/ca1529f9b3d016af53ec)

### 便利ツール・モジュール

#### 開発時によく使用されるパッケージ一覧（kamimi01調べ）

|パッケージ名|概要|備考|
|----|----|----|
|express|node.jsのフレームワーク||
|nodemon|サーバーコードを修正した際に修正を検知して自動再度起動する|毎回サーバコードを修正する度に再起動するのが面倒なので、その手間を省くことができる|
|ESLint|javascriptのlinter||
|passport|認証まわり||
|ejs|テンプレートエンジンの1つ。Effective JavaScript templatingの略。||
|body-parser||expressv4.16.0以降では、expressにbody-parserの機能がデフォルトで搭載されたため、`express.json()`、`express.erlencoded()`のように使用可能なため、`body-parser`自体のインストールは不要。|
|cookie-parser|Cookieの設定・取得を容易に行う||
|express-session|セッションの設定・取得を容易に行う||
|jsdoc|定義された形式で書いたコメントを元にドキュメントの生成を行う||
|cors|クロスドメインアクセスの許可を容易に行う||

* 参考
  * [Google JavaScript スタイルガイド - 日本語訳](https://w.atwiki.jp/aias-jsstyleguide2/pages/14.html)
  * [JavaScriptでJSDocコメントを書くメリットとは](https://ics.media/entry/6789/)

#### ツール一覧

|ツール|概要|備考|
|----|----|----|
|Turbo-Console-Log|VS Codeの拡張。選択した変数を出力するconsole.logを挿入する。`Ctrl + Option + L`で自動挿入。|変数名がプレフィックスとしてつく。設定からカスタマイズも可能|
|nodebrew|npmのバージョン管理ツール。ローカルマシン内で複数のnodeのバージョンを管理できる。|プロジェクトにより、使用しているnpmのバージョンが異なる場合が多いため、これを使用する。homebrewでインストール可能|

### 参考

* [Node.js + Express で作る Webアプリケーション 実践講座](https://www.udemy.com/course/web-application-with-nodejs-express/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.JA_cc.JP&utm_content=deal4584&utm_term=_._ag_107181210924_._ad_452531407125_._kw__._de_c_._dm__._pl__._ti_dsa-930814700879_._li_1028851_._pd__._&matchtype=b&gclid=CjwKCAiA_9r_BRBZEiwAHZ_v1_4m_AlAqs007bNd3C_IGnf0hZPtE2DPq5FGw8pvVYmqsSGQxyEr7BoCx5oQAvD_BwE)
  * 「[node-express-udemy-lesson](https://github.com/kamimi01/node-express-udemy-lesson)
  」のリポジトリで学習中
* Node.js公式のAPIドキュメント：https://nodejs.org/ja/docs/
* [package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)(npm公式)
* [package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json)(npm公式)
* [folders](https://docs.npmjs.com/cli/v6/configuring-npm/folders)(npm公式)→npmに関するフォルダの説明
* [package.jsonの中身を理解する](https://qiita.com/dondoko-susumu/items/cf252bd6494412ed7847)
* [CLI 環境構築 グローバルインストールとローカルインストールの違いについて](https://qiita.com/aya02/items/4c9c827f6a782ef65d57)
* [npm](https://www.npmjs.com/)
* [package-lock.jsonについて知りたくても聞けなかったこと](https://qiita.com/fj_yohei/items/7ca887a45e0855917279)(Qiita) →`package.json`と`package-lock.json`に関してかなり詳しく書いてある！
* [Body-ParserがExpressにexpress.json()として標準搭載されている話](https://qiita.com/atlansien/items/c587a0bf2f7f9022107c)
* [もうメンテナンスは怖くない！JSDoc 3を使ってみた](http://tech.innovation.co.jp/2018/06/08/I-tried-to-use-J-S-Doc3.html)
* [知らないのは損！npmに同梱されているnpxがすごい便利なコマンドだった](https://dev.classmethod.jp/articles/node-npm-npx-getting-started/)