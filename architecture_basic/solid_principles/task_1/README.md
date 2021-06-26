# 課題

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
- [質問4](#%E8%B3%AA%E5%95%8F4)
  - [回答](#%E5%9B%9E%E7%AD%94-3)
- [質問5](#%E8%B3%AA%E5%95%8F5)
  - [回答](#%E5%9B%9E%E7%AD%94-4)
- [質問6](#%E8%B3%AA%E5%95%8F6)
  - [回答](#%E5%9B%9E%E7%AD%94-5)
- [SOLID原則に関する整理](#solid%E5%8E%9F%E5%89%87%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%95%B4%E7%90%86)
  - [Single Responsibility Principle（SRP） 単一責任の原則](#single-responsibility-principlesrp-%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E3%81%AE%E5%8E%9F%E5%89%87)
    - [ソースコードで理解する](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B)
  - [Open-Closed Principle（OCP） オープン・クローズドの原則](#open-closed-principleocp-%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%83%BB%E3%82%AF%E3%83%AD%E3%83%BC%E3%82%BA%E3%83%89%E3%81%AE%E5%8E%9F%E5%89%87)
    - [ソースコードで理解する](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B-1)
  - [Liskov Substitution Principle（LSP） リスコフの置換原則](#liskov-substitution-principlelsp-%E3%83%AA%E3%82%B9%E3%82%B3%E3%83%95%E3%81%AE%E7%BD%AE%E6%8F%9B%E5%8E%9F%E5%89%87)
    - [ソースコードで理解する](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B-2)
  - [Interface Segregation Principle（ISP） インターフェース分離の原則](#interface-segregation-principleisp-%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E5%88%86%E9%9B%A2%E3%81%AE%E5%8E%9F%E5%89%87)
    - [ソースコードで理解する](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B-3)
  - [Dependency Inversion Priciple（DIP） 依存関係逆転の原則](#dependency-inversion-pricipledip-%E4%BE%9D%E5%AD%98%E9%96%A2%E4%BF%82%E9%80%86%E8%BB%A2%E3%81%AE%E5%8E%9F%E5%89%87)
    - [ソースコードで理解する](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B-4)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> SOLID原則の各要素を答えてください

### 回答

- [SOLID原則に関する整理](#solid原則に関する整理)参照

## 質問2

> 単一責任の原則と、単純にファイルを細かいファイルに分割することの違いはなんでしょうか？

### 回答

- 単一責任の原則は、「モジュールはたったひとつのアクターに対して責務を追うべきである」（アクターについては下記の整理参照）というものであり、モジュールを分割する際の基準となる原則に当たる。

## 質問3

> Open-Closed-Principleの実例を考えてみましょう

### 回答

- すみません間に合っていませんが、以下をやってみる予定です
  - [オープン・クローズドの原則 - TypeScriptで学ぶSOLID原則 part 1](https://qiita.com/ryo2132/items/01f0fcb8ff27353f8ecb)
  - [SOLID Principles for iOS Apps](https://www.raywenderlich.com/21503974-solid-principles-for-ios-apps#toc-anchor-001)

## 質問4

> リスコフの置換原則に違反した場合のデメリットは？

### 回答

- スーパークラスではなくサブクラスを利用したい場合に、サブクラス固有の振る舞いを意識する必要があり、単純な置換が難しくなってしまう
  - TODO：いくつかコードをみたが正直よくわからないので、あとで実装してみたい

## 質問5

> インターフェースを用いることによるメリットは？

### 回答

- それぞれ自分が使用するインターフェースにのみ依存することで、自分が利用しない（関係ない）部分の変更があったとき、その影響が及んでこない
  - 変更範囲を必要な部分のみに限定できる

## 質問6

> 依存性の逆転を用いる必要があるケースはどんな時か？

### 回答

- 依存性の逆転は、具象ではなく抽象に依存するように設計することなので、具象に位置する内容に対する変更が頻発する場合は、特に用いる必要がある
  - TODO：そもそも依存性の逆転を使用しない方が良い場合というのはあるのだろうか？規模の小さいアプリケーションの場合？実装者のスキルレベルなど学習コスト面で難が発生しそうな場合？

## SOLID原則に関する整理

- SOLID原則の目的
  - 以下のような性質を持つ"中間レベル"のソフトウェア構造を作ること
    - 変更に強いこと
    - 理解しやすいこと
    - コンポーネントの基盤として、多くのソフトウェアシステムで利用できること
  - 中間レベルとは
    - SOLID原則がモジュールレベルの開発に使われるものであることを示す
    - コードレベルよりも上に適用するものであり、モジュールやコンポーネントで使うソフトウェア構造の定義に役立つ

SOLID原則

|原則|概要|
|----------------------|---------------|
|Single Responsibility Principle（SRP） 単一責任の原則|個々のモジュールを変更する理由がたった1つだけになるように、ソフトウェアシステムの構造がそれを使う組織の社会的構造に大きな影響を受けるようにする|
|Open-Closed Principle（OCP） オープン・クローズドの原則|ソフトウェアを変更しやすくするために、既存のコードの変更よりも新しいコードの追加によって、システムの振る舞いを変更できるように設計すべきである|
|Liskov Substitution Principle（LSP） リスコフの置換原則|交換可能なパーツを使ってソフトウェアシステムを構築するなら、個々のパーツが交換可能となるような契約に従わなければいけない|
|Interface Segregation Principle（ISP） インターフェース分離の原則|ソフトウェアを設計する際には、使っていないものへの依存を回避すべき|
|Dependency Inversion Priciple（DIP） 依存関係逆転の原則|上位レベルの方針の実装コードは、下位レベルの詳細の実装コードに依存すべきではなく、逆に詳細側が方針に依存すべきである|

### Single Responsibility Principle（SRP） 単一責任の原則

- まずSRPは、「どのモジュールもたった1つのことだけを行うべき」という原則を指すわけではない！（ただし、そういう原則も存在する）
  - それは最下位のレベルの話であり、SRPは巨大な関数にリファクタリングを施して、小さな関数に切り分けるときに使う原則のこと
- **SRPとは「モジュールはたったひとつのアクターに対して責務を追うべきである」**
  - アクター
    - 変更を望む人たちをひとまとめにしたグループを指す
  - モジュール
    - ソースファイルのこと
    - ソースファイル以外にコードを格納する言語や開発環境の場合は、いくつかの関数をまとめた凝集性のあるもの
- アクターの異なる原則は分割すべき！
  - TODO：想定外の重複の症例がわかりやすかったのであとでかく
- 解決策
  - 1. アクターの重複している関数がある場合、別クラスに移動する
    - 各クラスをインスタンス化して追跡する必要があるというデメリットがあるが、Facadeパターンを使用することでそのジレンマを解決できる

#### ソースコードで理解する

- 以下にbookの概要とその機能をカプセル化する`Book`クラスがある
- しかし、次のような要望があると、このままでは問題がある
  - 特定のページナンバーに飛びたい
  - JSONやHTML、その他のフォーマットで本の内容が欲しい

```ts
class Book {
  // 本のタイトル
  getTitle() {
    return "A Great Book";
  }

  // 本の著者
  getAuthor() {
    return "John Doe";
  }

  // ページをめくる
  turnPage() {
    // pointer to next page
  }

  // 現在のページを印刷する
  printCurrentPage() {
    return "current page content"
  }
}
```

- そこでSRPに従い、次のように変更する
  - これで1つのクラスが1つの責務を負っている
    - `Book`クラス
      - 本の概要
    - `Pager`クラス
      - 本をめくる
    - `Printer`クラス
      - 本の内容を印刷する

```ts
class Book {
  getTitle() {
    return "A Great Book"
  }

  getAuthor() {
    return "John Doe"
  }
}

class Pager {
  gotoPrevPage() {
    // pointer to prev page
  }

  gotoNextPage() {
    // pointer to next page
  }

  gotoPageByPageNumber(pagerNumber: number) {
    // pointer to specific page
  }
}

class Printer {
  printPageInHTML(pageContent: any) {
    // your logic
  }

  printPageInJSON(pageContent: any) {
    // your logic
  }

  printPageInXML(pageContent: any) {
    // your logic
  }

  printPageUnformatted(pageContent: any) {
    // your logic
  }
}
```

### Open-Closed Principle（OCP） オープン・クローズドの原則

- **「ソフトウェアの振る舞いは、既存の成果物を変更せず拡張できるようにすべきである」**
- 目的
  - 変更の影響を受けずに、システムを拡張しやすくすること
- 解決策
  - システムをコンポーネントに分割して、コンポーネントの依存関係を階層構造にする。そして上位レベルのコンポーネントが下位レベルのコンポーネントの変更の影響を受けないようにする。

#### ソースコードで理解する

- 同様にSRPで使用した`Book`クラスで考える
- `Book`クラスの`getAuthor`メソッドは、著者の名前を提供しているのみだった。
- しかし、admin、management、librarian、end userのために、著者名以外の詳細情報が必要になった場合はどうだろうか
- まずは単純に詳細情報を提供するために既存コードを修正してみる
  - だが、以下のコードは、既存のクライアントとの契約を破っている可能性がある

```ts
class Book {
  getAuthor() {
    return {
      name: "Ashutosh Singh",
      age: 27,
      address: "India"
    }
  }
}
```

- OCPを適用すると以下のようになる
  - こうすることで、将来`getAuthor`メソッドを拡張することができる

```ts
class Book {
  getAuthor() { }
}

class Book1 extends Book {
  constructor() {
    super()
  }

  getAuthor() {
    return {
      name: super.getAuthor(),
      age: ""
    }
  }
}

class Book2 extends Book {
  getAuthor() {
    return {
      name: super.getAuthor(),
      age: "",
      address: ""
    }
  }
}
```

### Liskov Substitution Principle（LSP） リスコフの置換原則

- 継承の使い方の指針になると考えられていたが、現代ではインターフェースと実装に関するソフトウェア設計の原則になっている

#### ソースコードで理解する

- まずは`Kingfisher`と`Ostrich`の2つのオブジェクトの例をあげる。（ちなみにkingfisherはカワセミ、ostrichはダチョウのこと）
- このコードのからのアウトプットは以下の通り
  - Kingfisherは飛ぶことができる　→　良さそう
  - Ostrichは飛ぶことができる　→　本当か？何か変。。
- このコードは開発環境ではうまく動くが、本番でのいくつかのシナリオではうまく動かない可能性がある。またその問題の調査にも時間がかかってしまう。

```ts
class Bird {
  fly() {
    console.log("I can fly!")
  }

  class Kingfisher extends Bird {
    constructor() {
      super()
    }
  }

  class Ostrich extends Bird {
    constructor() {
      super()
    }
  }
}

let kingfisherBird: Bird = new Kingfisher()

let ostrichBird: Bird = new Ostrich()

kingfisherBird.fly()  // kingfisher can fly

ostrichBird.fly()  // ostrich can fly
```

- LSPでは、各サブクラスがそのスーパークラスの振る舞いに影響を与えることなく、そのスーパークラスを取り替え可能にしなければならない
- 以下のコードでは、OstrichはBirdを追加の`run`の振る舞いで置き換えることができる

```ts
class Bird {
  fly() {
    console.log("I can fly!")
  }
}

class Kingfisher extends Bird {
  constructor() {
    super()
  }
}

class Ostrich extends Bird {
  constructor() {
    super()
  }

  fly() {
    throw new Error("I don't fly rather I run")
  }

  run() {
    // run
  }
}

let kingfisherBird: Bird = new Kingfisher()

let ostrichBird: Bird = new Ostrich()

kingfisherBird.fly()  // kingfisher can fly

ostrichBird.fly()  // I don't fly rather I run
```

### Interface Segregation Principle（ISP） インターフェース分離の原則

- **クライアントが使用しないメソッドへの依存を、強制すべきではない**

#### ソースコードで理解する

- 前のLSPでのbirdの例をとって、インターフェース`IBird`を追加してみた
- 以下のコードはISPに違反している。
- `Kingfisher`クラスは、使用しないが`run`メソッドを実行する必要があり、同様に`Ostrich`クラスも使用しない`fly`メソッドを実行する必要がある
- このように、クライアントが使用しないメソッドへの依存を強制すべきではない

```ts
interface IBird {
  fly()
  run()
}

class Kingfisher implements IBird {
  fly() { }
  run() { }
}

class Ostrich implements IBird {
  fly() { }
  run() { }
}
```

- そこで、OstrichとKingfisherにインターフェースを分離する

```ts
interface IKingfisherBird {
  fly()
}

interface IOstrichBird {
  run()
}

class Kingfisher implements IKingfisherBird {
  fly() { }
}

class Ostrich implements IOstrichBird {
  run() { }
}
```

### Dependency Inversion Priciple（DIP） 依存関係逆転の原則

- **「ソースコードの依存関係が（具象ではなく）抽象だけを参照しているもの。」**
  - 具象モジュール
    - （書籍では）呼ばれている関数の実装が書かれているモジュールを指す
- DIPを考える際、OSやプラットフォーム周りは気にしないことが多い
  - 理由
    - 変更が少なく安定していることが多いため
    - 変更があったとしても、きちんとコントロールされているため
- システム内の変化しやすい具象要素には依存したくない
  - 例えば、開発中のモジュールや、頻繁に変更され続けているモジュールなど
- 安定した抽象
  - 基本は、新しい昨日を実装するときも、できる限りインターフェースの変更なしで済ませられるようにする
  - 変化しやすい具象への依存を避け、安定した抽象インターフェースに依存すべき
  - コーディングレベルのプラクティス
    - 変化しやすい具象クラスを参照しない
    - 変化しやすい具象クラスを継承しない
    - 具象関数をオーバーライドしない
    - 変化しやすい具象を名指しで参照しない
  - 解決策
    - Abstract Factoryパターンを使用する
  - 具象コンポーネント
    - 具象コンポーネント側には依存性があるため、DIPを完全に満たすことはできないが、そういった具象コンポーネントを少数に絞り込み、それらをシステムの他の部分と分離することはできる

#### ソースコードで理解する

- ソーシャルログインの例をあげる
- クライアントでGoogleのOAuth認証のセットアップを行う

```ts
class Login {
  login(googleLogin: any) {
    // some code which will be used for google login
  }
}
```

- 次に、Google以外のソーシャルログインも可能になるように変更したいとする
- その場合、`login`メソッドを変更する必要があるだろうか？（いやない）
- DIPでは、上位レベルのクラスは下位レベルのクラスに依存すべきではない

```ts
interface ISocialLogin {
  login(options: any)
}

class GoogleLogin implements ISocialLogin {
  login(googleLogin: any) {
    // some code which will be used for google login
  }
}

class FBLogin implements ISocialLogin {
  login(fbLogin: any) {
    // some code which will be used for fb login
  }
}
```

## 参考

- [SOLID Principles for iOS Apps](https://www.raywenderlich.com/21503974-solid-principles-for-ios-apps#toc-anchor-001)
- （書籍）Clean Architecture 達人に学ぶソフトウェアの構造と設計 第Ⅲ部
- [15. Facadeパターン（TECHSCORE）](https://www.techscore.com/tech/DesignPattern/Facade.html/)
- [イラストで理解するSOLID原則](https://qiita.com/baby-degu/items/d058a62f145235a0f007#iinterface-segregation%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%E5%88%86%E9%9B%A2%E3%81%AE%E5%8E%9F%E5%89%87)
- （書籍）Java言語で学ぶデザインパターン入門 第15章 Facade
- [単一責任原則](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/%E3%82%A8%E3%83%83%E3%82%BB%E3%82%A4/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E5%8E%9F%E5%89%87/)
- [よくわかるSOLID原則1: S（単一責任の原則）](https://note.com/erukiti/n/n67b323d1f7c5#3PKsH)
- [SOLID-Principles-Examples-using-Typescript](https://github.com/devbootstrap/SOLID-Principles-Examples-using-Typescript)→SOLID原則に沿ったリファクタリングの練習用
- [S.O.L.I.D in TypeScript](https://medium.com/@erashu212/s-o-l-i-d-in-typescript-c0e4fe6c345a)→今回これをやってみることにしました。
- [clean-code-typescript](https://github.com/labs42io/clean-code-typescript#solid)
- [SOLID Principles: The Software Developer's Framework to Robust & Maintainable Code [with Examples]](https://khalilstemmler.com/articles/solid-principles/solid-typescript/)
- [Implementing SOLID and the onion architecture in Node.js with TypeScript and InversifyJS](https://dev.to/remojansen/implementing-the-onion-architecture-in-nodejs-with-typescript-and-inversifyjs-10ad)
- [Uncle Bob SOLID principles](https://www.youtube.com/watch?v=zHiWqnTWsn4)→いつか聞いてみたい。
- [Clean Code - Uncle Bob / Lesson 1](https://www.youtube.com/watch?v=7EmboKQH8lM)→いつか聞いてみたい。