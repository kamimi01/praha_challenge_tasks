# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## チーム開発でlintを使うべき理由

- 可読性を高めるため
  - チームで一貫性のあるコードを書くことができる
  - 上記のコードを早く書くことができる
- 安全性を高めるため
  - 例えばミュータブルな変数を用意する必要がないのに（`let`や`var`である必要はないのに）、再代入可能な変数を用意したりすると、誤って再代入が行われる可能性が出てしまう

## ESLintについて

### ESLintが定義するルールの中から、最重要だと感じるルールを5つ

- `no-var`
  - require `let` or `const` instead of `var`
  - `var`は再定義、再代入が可能で危険なため
- `prefer-const`
  - Requires const declarations for variables that are never reassigned after declared.
- `indent`
  - enforce consistent indentation
- `camelcase`
  - Enforces camelcase naming convention.
  - プロジェクトがキャメルケースで定義するというルールの場合
- `comma-style`
  - enforce consistent comma style

### ESLintのルールに規定のconfigを読み込んでみる

- [sample_project](./../sample_project)を参照

## 参考

- [ESLint/Prettierとは何か、両者の違いについて解説](https://developers-book.com/2021/05/19/628/)
- [ESLint](https://eslint.org/docs/rules/)