# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## 質問1

> オニオンアーキテクチャを図解する

### 回答

- 円で表した場合

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F1a309b15-d1d9-0829-8456-92ab11ba50cb.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7fb4b2a1ee84d70072be21e328f422d4)

- フラットに表した場合

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F30489%2F817fe669-7e30-6e8c-e48a-f4098b05d94e.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=c95b85b8c0986f9bc59de5d4db42646d)


|Onion Architectureにおける用語|概要|備考|
|---------------|------------------------|------------|
|ドメインモデル（ドメイン層）|・もっとも中心に位置し、自分自身に依存する <br>・ビジネスのエンティティとそのエンティティの振る舞いを表す<br>・処理の方法に依存しないビジネスロジックであり、データ構造やメソッドの集合体||
|ドメインサービス（ドメイン層）|・アプリケーション固有のビジネスロジックを実現する（構築対象のアプリケーションに対してのみ有効な処理）<br>・モデル層によって定義された振る舞いを契約として実行する|・契約による設計 <br>・もしそちらが事前条件を満たした状態で私を呼ぶと約束してくださるならば、お返しに事後条件を満たす状態を最終的に実現することをお約束します|
|アプリケーションサービス（ユースケース層）|・外部のインフラとドメイン層の橋渡しの役割をする <br>・ドメイン層は、ビジネス的な機能を満たすためにデータや機能を必要とすることが良くあるが、ドメイン層は直接的にはデータや機能には依存しない <br>・代わりにアプリケーション層が、ドメインサービス層に定義された契約に依存する必要がある||
|インフラストラクチャ（インフラストラクチャ層）|・外部のサービスをさす<br>・例えば、データベース、ファイルシステム、API、その他のWebサービスなど||
|ユーザーインターフェース（プレゼンテーション層）|・ユーザーがどのように開発されたコードと関わるか<br>・この層は、アプリケーションサービス層とやりとりする<br>リポジトリの実装クラスがある（リポジトリのインターフェースはドメイン層にある）||

- 疑問
  - Onion Architectureで出てくるワードとClean Architectureで出てくるワードの対応関係を理解できているのか不安。上記のイメージで合っているのだろうか。

## 質問2

> ドメインモデル層は他のどの層にも依存していませんが、そのメリットは何か？

### 回答

- どの層にも依存していないため、例えばドメインモデル層にあるデータや構造体を扱う、データベースやユーザーインターフェースなど外側の層で扱うサービスが変更された場合でも、ドメインモデル層には影響を及ぼさないこと。

## 質問3

> 層をまたいだ依存関係が発生する場合、インターフェースへの依存のみ許可するメリットは何か

### 回答

- 

## 参考

- [[DDD]ドメイン駆動 + オニオンアーキテクチャ概略](https://qiita.com/little_hand_s/items/2040fba15d90b93fc124)
- [kamimi01/iOSArchitectureStudy](https://github.com/kamimi01/iOSArchitectureStudy#onion-architecture)
- [契約による設計の紹介](https://developer.hatenastaff.com/entry/2016/09/01/163542)
- [Software Architecture — The Onion Architecture](https://medium.com/@shivendraodean/software-architecture-the-onion-architecture-1b235bec1dec)
- [Onion Architecture](https://dev.to/barrymcauley/onion-architecture-3fgl)
- （書籍）Clean Architecture 達人に学ぶソフトウェアの構造と設計 p189
- [実装クリーンアーキテクチャ](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8)