# はじめにReact（Next.js）の環境を立ち上げよう 

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

  - [Next.jsとは](#nextjs%E3%81%A8%E3%81%AF)
- [クライアントサイドナビゲーション](#%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%B5%E3%82%A4%E3%83%89%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)
  - [環境構築](#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)
  - [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Next.jsとは

- Reactアプリをスクラッチで開発する場合、以下のような課題がある
  - コードは、webpackのようなバンドラーを使ってバンドルされる必要があり、Babelのようなコンパイラーを使って変換される必要がある。
  - コード分割のような最適化を行う必要がある
  - パフォーマンスやSEOのために、いくつかのページを事前に静的レンダリングする
  - データストアにReactアプリを接続するために、サーバーサイドコードを書く必要がある可能性がある
- Next.jsは、それらの問題を解決し、多くのビルドインの機能を提供する

# クライアントサイドナビゲーション

- クライアントサイドナビゲーションとは、ページ遷移をJavaScriptで行うことであり、ブラウザによって行われるよりも早い
- コード分割とプリフェッチ
  - Next.jsはコードを自動的に分割し、ページのために必要な箇所のみをロードする。
  - そのため、ページ数が多くても読み込みは早い
  - またページが独立しているため、あるページでエラーが発生しても、他の部分は問題なく動く
  - Next.jsのプロダクションのビルドでは、`<Link>`コンポーネントがブラウザのviewportに出てくる場合は常に、自動的にリンクされたページのプリフェッチをバックグラウンドで行う
    - リンクをタップしたときは既にバックグラウンドでロード済みのため、ページ遷移は瞬時に行うことができる
- ちなみに、Nextアプリ以外の外部のページを開く場合は、`<a>`タグを使用する

## 環境構築

1. プロジェクト作成

`yarn create next-app --typescript nextjs-blog --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"`

- オプション
  - `--typescript`：TypeScriptのプロジェクトで初期作成する
  - `--example`：特定のGithubレポジトリやNext.jsのレポジトリから、プロジェクトを作成することができる

例）
`npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"`

## 参考

- [Create a Next.js App](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website)
- [Next.jsを使うべき5つの理由 + 実装Tips](https://qiita.com/Yuki_Oshima/items/5c0dfd8f7af8fb76af8f)
- [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)
- [今さら聞けないNext.jsをTypeScript化する方法【2021年4月版】](https://zenn.dev/yukito0616/articles/fa41ea2d0cb308)