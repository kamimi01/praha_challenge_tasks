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
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> スナップショットテストとはなんでしょうか？説明してください

### 回答

- 自動でアプリの内部状態を記録し、正しい状態と比較・差分検出をする仕組み
  - ビジュアルリグレッションテストとも呼ばれる

- 導入によるメリット
  - エンジニアのみでUIのリグレッションテストが容易にできるようになり、修正箇所もわかりやすいため、UIのデグレードが発生しづらい
  - 意図しないデザインの崩れを自動で検出することができる
  - 手動でUIの状態を再現したり、撮影することが不要になる
  - UIのテストのみを集中して行うことができる
    - 実際のブラウザやスマホなどの画面ではなく、コマンドラインで実行されるため、ビルドを待ったり、ページを読み込むなどを行う必要がない。そのようなUI以外の不安定な要素にUIのテストが左右されることがない

- 導入に向いている、向いていないケース
  - 向いているケース
    - 考慮する画面が多い
    - 実行時に再現が困難
    - レイアウトが複雑
  - 向いていないケース
    - 仕様が未確定や高頻度で変わる場合
      - デザインに意図的な変更を加えた場合、スナップショットテストは失敗してしまうため、その時は再度、スナップショットテストでリファレンス画像を生成し直したり、スタブを修正するなどの工数がかかる
    - 状態再現のための修正コストが高い場合
      - スナップショットテストは、アプリケーションのアウトプットと緊密に紐づいているため、非常に壊れやすい。重要でない部分のどんな変更があったとしてもスナップショットテストは失敗してしまう。そのため、開発者は全てが正常に機能していることを手動で確認し、スナップショットテストを更新する必要がある
      - スナップショットテストは、期待値やアサーションなどが含まれていないため、期待している状態かどうかは判断できない
    - スナップショットを保存するためのストレージが十分ではない場合
      - スナップショットテストはどこかに保存する必要があるが、スクリーンショットベースのスナップショットはストレージを簡単に消費してしまう可能性があるため

## 質問2

> スナップショットテストを用いることで、どのような不具合が防止できるでしょうか？3つほど例を挙げてみてください

### 回答

- 意図しない表示崩れが起きるなどのデグレード
  - 目視では見逃しやすいUIやレイアウトのデグレを検出できる
    - 例えば
      - 画面数が多く、特定の画面の確認が漏れてしまう
      - 再現困難な画面の確認が漏れてしまう
      - レイアウトが複雑だったり、数ptの違いなど目視では確認できないレベルの違いを見逃してしまう

## 質問3

> スナップショットテストでは防止できない不具合もあります。3つほど例を挙げてください

### 回答

- 比較する以前のスナップショットが期待している状態とは異なる場合
  - スナップショットテストは以前のものと現時点のスナップショットを比較することで差分を検出する仕組みであり、それが期待されている出力であるかどうかに関しては何も示さないため
- 動的なコンテンツをテストしたい場合
  - 動的にコンテンツが表示される（例えば動的に多言語翻訳を行うツールを使用している場合などは、毎回翻訳結果が同じとは限らない場合がある）、JavaScriptやCSSのアニメーションにより時間と共に表示が変化するなど、動的なコンテンツの表示をテストする場合、比較元のデータと一致しないため、スナップショットテストが失敗してしまう
  - ただし、こういった動的なコンテンツのスナップショットテストを可能にするためのツールも存在している。
    - Jestでは、動的要素を識別するためのスナップショットを作成する時に使用可能なasymmetric matchersを提供している。これはスナップショットが作成された時の特定の値ではなく、特定のタイプの任意の値を受け入れるようにJestに指示している
    ```javascript
    expect(userData).toMatchSnapshot({
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
    ```
    - PercyやChromaticは、 JavaScriptやCSSアニメーションなどの動的コンテンツを処理するための手法があるが、開発者の介入が必要な場合もある

## 参考

- [スナップショットテスト実戦投入 / Practical Snapshot Testing](https://speakerdeck.com/imaizume/practical-snapshot-testing)→かなりわかりやすい（途中からiOSでのスナップショットテストツールの話）
- [Snapshot Testing: Benefits and Drawbacks](https://www.sitepen.com/blog/snapshot-testing-benefits-and-drawbacks#:~:text=Snapshot%20testing%20is%20a%20type,from%20unit%20and%20functional%20tests.)
- [Jest 14.0: React Tree Snapshot Testing](https://jestjs.io/blog/2016/07/27/jest-14.html)
- [ZOZOTOWN iOS にスナップショットテストを導入して開発速度を劇的に向上させた話](https://techblog.zozo.com/entry/ios_snapshottest)
- [Snapshot Testing](https://jestjs.io/docs/ja/snapshot-testing)
- [メルペイ iOS にスナップショットテストを導入した話](https://engineering.mercari.com/blog/entry/ios-snapshot-test-case/)
- [Pros and cons of Jest snapshot testing with some useful tips](https://tsh.io/blog/pros-and-cons-of-jest-snapshot-tests/)