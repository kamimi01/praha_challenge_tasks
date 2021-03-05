# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題3](#%E8%AA%B2%E9%A1%8C3)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 課題3

> Storybookを使って開発することのメリットとデメリットを、それぞれ3つ考えてみて下さい

### 回答

- メリット

  - 特定の条件を再現したい場合に、コードを修正せずに実現したいUIを確認することができる
    - 例えば、以下が不要となる
      - 複雑な開発スタックを準備する
      - 特定のデータをDBに準備する
      - アプリケーション内を移動する

  - UIコンポーネントに関するドキュメントを作成することで、コンポーネントの管理が容易になる
    - どのようなコンポーネントがあるか、確認しやすくなるため、再利用せずに同じUIを実装してしまうなどが少なるなる可能性がある
    - デザイナーとのコミュニケーションツールとして使用できる可能性がある
  - （どちらかというと副次的効果）storyを作成するために、UIをコンポーネント化する必要があるため、再利用しやすい実装となる

- デメリット（すみません、1つしか出てこなかったです...）

  - storyの作成やメンテナンスにも工数がかかる
    - 規模が小さい、コンポーネントを再利用する機会が少ない、デザインを管理する必要がないなどのプロジェクトへの導入は不向き

## 参考

- [Introduction to Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybookを導入してみてわかった、導入おすすめプロジェクトの特徴](https://fintan.jp/?p=5705)
- [Storybookを使ったデザインシステムの構築](https://ncdc.co.jp/columns/7098/)
- [Using Storybook as a Visual Testing Platform](https://betterprogramming.pub/using-storybook-as-a-powerful-visual-testing-platform-3b71db953b4b)