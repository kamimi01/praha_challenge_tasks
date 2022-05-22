# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [チーム開発でlintを使うべき理由](#%E3%83%81%E3%83%BC%E3%83%A0%E9%96%8B%E7%99%BA%E3%81%A7lint%E3%82%92%E4%BD%BF%E3%81%86%E3%81%B9%E3%81%8D%E7%90%86%E7%94%B1)
- [ESLintについて](#eslint%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
  - [ESLintが定義するルールの中から、最重要だと感じるルールを5つ](#eslint%E3%81%8C%E5%AE%9A%E7%BE%A9%E3%81%99%E3%82%8B%E3%83%AB%E3%83%BC%E3%83%AB%E3%81%AE%E4%B8%AD%E3%81%8B%E3%82%89%E6%9C%80%E9%87%8D%E8%A6%81%E3%81%A0%E3%81%A8%E6%84%9F%E3%81%98%E3%82%8B%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%925%E3%81%A4)
  - [ESLintのルールに規定のconfigを読み込んでみる](#eslint%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%AB%E3%81%AB%E8%A6%8F%E5%AE%9A%E3%81%AEconfig%E3%82%92%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%82%93%E3%81%A7%E3%81%BF%E3%82%8B)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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