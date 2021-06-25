# 課題3

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

- 自己結合とはなんでしょうか？

<details><summary>想定回答</summary>

- 自己結合とは
  - 同じテーブル同士を結合すること
  - ユースケース
    - 階層的にデータを捜索したい場合
    - テーブル内の行を比較したい場合

- 参考
  - [同じテーブルを結合する(自己結合)](https://www.dbonline.jp/mysql/join/index5.html)
  - [SQL Server Self Join](https://www.sqlservertutorial.net/sql-server-basics/sql-server-self-join/)

</details>

## クイズ2

- w3schoolで、JOINを使用した自己結合を行うクエリを書いてみましょう。

<details><summary>想定回答</summary>

- 同じCityに住んでいるCustomerIDとそのCityを取得する

```sql
SELECT
  c1.City,
  c1.CustomerID customer_1,
  c2.CustomerID customer_2
FROM
  Customers c1
  INNER JOIN Customers c2 ON c1.CustomerID <> c2.CustomerID
  AND c1.City = c2.City
ORDER BY
  customer_1,
  customer_2;
```

</details>
