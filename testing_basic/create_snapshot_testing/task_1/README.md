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

- 導入によるメリット
  - エンジニアのみでUIのリグレッションテストが容易にできるようになり、修正箇所もわかりやすいため、UIのデグレードが発生しづらい
  - 意図しないデザインの崩れを自動で検出することができる
  - 手動でUIの状態を再現したり、撮影することが不要になる
  - UIのテストのみを集中して行うことができる
    - 実際のブラウザやスマホなどの画面ではなく、コマンドラインで実行されるため、ビルドを待ったり、ページを読み込むなどを行う必要がない。そのようなUI以外の不安定な要素にUIのテストが左右されることがない

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

## 疑問

- 過去のスナップショットをフォルダの移動、リネームなどをせずに取っておくことはできないのか？（未調査）
  - 意図した変更を行った場合、`yarn test`を再度実行する前に毎回`__snapshots__`フォルダを削除しなければいけない？？
  - 今回のXを丁に変更した後のスナップショットテストでは、毎回そうするのが正しい？（なんかもっと良い方法がある気がしたが。。）今回はold_snapshotsフォルダにXとOの時のスナップショットを移動したが、そういう作業を手作業でやらなければスナップショットの履歴は管理できないのか？
- 比較するスナップショットを選択することはできないのか？そういうニーズはありそうだが。diffコマンドみたいに。（未調査）
- storybookとスナップショットテストとjestの関係が理解できていない。
  - storybookはUIコンポーネントの管理、スナップショットテストはアプリの内部状態のリグレッションテスト、jestは単体テストなイメージでそれぞれ目的が別な気もするが。。jestでスナップショットテストをするというのがよくわからない。（未調査）
  - storyshotsがなんなのか理解できていないせい？
  - 参考
    - [Storybook による UI & Unit Testing のススメ](https://engineering.mercari.com/blog/entry/2018-12-19-123834/)
- snapshotやstorybookをデフォルトのまま導入しているうちに、フォルダ構成が混沌としてきた。srcの中には本番コード以外は含めないイメージなので、そこにstorybookやsnapshotが含まれてしまっているのは良くないディレクトリ構造な気がする。（まず本番コードもコンポーネントごとに別ファイルに分ける必要もあるが、、）（未調査）

## 参考

- [スナップショットテスト実戦投入 / Practical Snapshot Testing](https://speakerdeck.com/imaizume/practical-snapshot-testing)→かなりわかりやすい（途中からiOSでのスナップショットテストツールの話）
- [Snapshot Testing: Benefits and Drawbacks](https://www.sitepen.com/blog/snapshot-testing-benefits-and-drawbacks#:~:text=Snapshot%20testing%20is%20a%20type,from%20unit%20and%20functional%20tests.)
- [Jest 14.0: React Tree Snapshot Testing](https://jestjs.io/blog/2016/07/27/jest-14.html)
- [ZOZOTOWN iOS にスナップショットテストを導入して開発速度を劇的に向上させた話](https://techblog.zozo.com/entry/ios_snapshottest)
- [Snapshot Testing](https://jestjs.io/docs/ja/snapshot-testing)
- [メルペイ iOS にスナップショットテストを導入した話](https://engineering.mercari.com/blog/entry/ios-snapshot-test-case/)
- [Pros and cons of Jest snapshot testing with some useful tips](https://tsh.io/blog/pros-and-cons-of-jest-snapshot-tests/)