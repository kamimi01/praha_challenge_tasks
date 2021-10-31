# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- 軽量DDDとはなんでしょうか？またDDDを初めて取りれる場合、軽量DDDから始めるのはよくないことなのでしょうか？

<details><summary>回答例</summary>

- モデリングを行わずに、頻繁な変更に耐えうる拡張性の高い設計のベストプラクティスとされるパターンのみを取り入れること
  - そのためベストプラクティスとされるパターン自体を取り入れるだけでも十分に価値がある

- 参考
  - （書籍）ドメイン駆動設計 モデリング/実装ガイド
  - [ドメイン駆動設計における「良いモデル」と「悪いモデル」とは](https://logmi.jp/tech/articles/322831)
  - [軽量DDDではじめるゲーム開発 ドメイン駆動設計の基本と実践を解説](https://logmi.jp/tech/articles/322111)

</details>

## クイズ2

- ドメイン駆動設計が向いているのは、どのような場合でしょうか？プロダクトの観点とプロジェクトの観点で1つ以上あげてください。

<details><summary>回答例</summary>

- 以下の場合に向いている
  - プロダクト観点
    - 複雑なビジネスロジックを含むアプリケーションの場合
      - シンプルなCRUDで済む場合には、オーバーヘッドが大きい
  - プロジェクト観点
    - アジャイル開発でモデルを継続的に改善していける場合
      - ただし、ウォーターフォール開発でも、部分的に取り入れること自体は可能。例えば基本設計の助けとして抽象的なモデルで認識合わせをするなど
    - プロジェクトの技術リードが、モデリングやアーキテクチャをある程度リードすることができる場合

- 参考
  - [ドメイン駆動設計のうれしさがふわっとしかわかってない。
何を守るのが優先なのか？](https://little-hands.hatenablog.com/entry/2017/12/21/ddd-q-and-a)
  - [little-hands/ddd-q-and-a #63](https://github.com/little-hands/ddd-q-and-a/issues/63)

</details>
