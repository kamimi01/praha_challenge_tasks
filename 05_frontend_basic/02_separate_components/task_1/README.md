# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [アトミックデザインとは](#%E3%82%A2%E3%83%88%E3%83%9F%E3%83%83%E3%82%AF%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%81%A8%E3%81%AF)
- [用語の説明](#%E7%94%A8%E8%AA%9E%E3%81%AE%E8%AA%AC%E6%98%8E)
- [`function component`と`class component`の違い](#function-component%E3%81%A8class-component%E3%81%AE%E9%81%95%E3%81%84)
- [整理](#%E6%95%B4%E7%90%86)
  - [コンポーネントベース開発](#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%83%99%E3%83%BC%E3%82%B9%E9%96%8B%E7%99%BA)
  - [Atoms](#atoms)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## アトミックデザインとは

- 小さいUIコンポーネントを組み合わせてより大きなコンポーネントを作っていくためのデザイン・フレームワーク

## 用語の説明

|用語|説明|
|------------|-------------------|
|page|templates層のコンポーネントに実際のコンテンツを流し込んだもの。templatesをpagesと分離することで、レイアウト・デザインをコンテンツから分離できる|
|template|ページの雛形。コンポーネントがページ上で正しくレイアウトされるかを確認することが目的。|
|organism|moleculesやatomsで構成されるコンポーネント群。独立してコンテンツを提供できるので、コンテンツ単位で切り取って画面に配置することができる|
|molecule|ユーザがどんな動機でそれを行うのか、に答える機能の単位|
|atom|UIコンポーネントの最小単位。それ以上UIとしての機能性を破壊しない最小単位。|

## `function component`と`class component`の違い

- `function component`とは
  - JSXを返すプレーンなJavaScript関数

```js
import React from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Hellow World</h1>
    </div>
  );
}
```

- `class component`とは
  - `React.Component`を拡張したクラスを作成し、レンダリング対象のJSXはrenderメソッド内で返される

## 整理

### コンポーネントベース開発

- メリット
  - コンポーネント単位でテストが可能
  - 不具合のリスク・ポイントを減らすことができる
  - メンテナンスがしやすくなる
  - 解決する問題が小さくなる

- コンポーネントの特徴
  - カプセル化されている
    - IFさえ知っていれば、内部の実装を気にする必要がない
  - 置換可能である
  - 再利用可能
  - コンポーネントを別のコンポーネントと組み合わせて作成可能

- コンポーネント設計で抑えるべきポイント
  - 単一責任の原則
  - 関心の分離

### Atoms

- デフォルトのUIに対して、オリジナルの見た目を定義するCSSと一緒にコンポーネント化しておく
  - プラットフォームのデフォルトUI
    - ボタン
    - テキスト・インプット
    - テキスト
- プラットフォームのデファクト・スタンダードなUI
  - たとえばバルーンやバッジ、カードなど
- レイアウト・パターン
  - レイアウトは特定のコンテンツに依存しない機能のため
- セマンティックなデザイン要素
  - 画面上のコンテンツに意味を付加するデザイン要素
  - 例えば
    - 見出し
    - 本文
    - コンテンツ画像
    - アイコン
    - デコレーション枠や区切り線
    - アニメーション

## 参考

- [React:関数コンポーネントとクラスコンポーネントの違い](https://www.twilio.com/blog/react-choose-functional-components-jp)
- （書籍）Atomic-Design-〜堅牢で使いやすいUIを効率良く設計する〜