# 課題

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

- 今回私がcypressでE2Eテストを書くために、カスタムデータ属性を新たに加えています。元々存在している`class`や`id`を使用しないことによるメリットは何が考えられるでしょうか？

<details><summary>想定回答</summary>

- `class`や`id`といった属性値は変更される可能性があるため、不安定。変更された場合にテストも壊れてしまう可能性が高い。カスタムデータ属性を使用し、実際のコードに影響するstyleやHTMLには影響しない属性値を設定することで安定的なテストを行うことができる。
- ただし、テスト用に設定された属性は本番コードからは削除されるべきという意見もあり、以下のようなプラグインも存在している
  - [babel-plugin-react-remove-properties](https://blog.foresta.me/posts/cypress_dom/)

- 参考
  - [cypress公式 Best Practices](https://docs.cypress.io/guides/references/best-practices.html)
  - [CypressにおけるDOM要素の特定のベストプラクティス](https://blog.foresta.me/posts/cypress_dom/)

</details>

## クイズ2

- 今回cypressでE2Eテストを書く場合、`cy.visit("<URL>")`のURLをフルで書かず、ベースのURLを省略することができます。そのためにはどのファイルにどのように記載すれば良いでしょうか？
  - 参考：[tictactoe_spec.js](../../tic-tac-toe/cypress/integration/tictactoe_spec.js)

<details><summary>想定回答</summary>

- `cypress.json`に以下のように記載する

```json
{
  "baseUrl": "http://localhost:3000/"
}
```

</details>