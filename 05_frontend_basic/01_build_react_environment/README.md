# はじめにReact（Next.js）の環境を立ち上げよう 

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## Next.jsとは

- Reactアプリをスクラッチで開発する場合、以下のような課題がある
  - コードは、webpackのようなバンドラーを使ってバンドルされる必要があり、Babelのようなコンパイラーを使って変換される必要がある。
  - コード分割のような最適化を行う必要がある
  - パフォーマンスやSEOのために、いくつかのページを事前に静的レンダリングする
  - データストアにReactアプリを接続するために、サーバーサイドコードを書く必要がある可能性がある
- Next.jsは、それらの問題を解決し、多くのビルドインの機能を提供する

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