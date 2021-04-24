# 課題3

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- 特定の値がNULLと等しいかどうかを調べるための方法を2つ以上挙げてください。

<details><summary>想定回答</summary>

- 以下2つの方法がある
  - `IS NULL`を使用する
  - `<=>`演算子を使用する

</details>

## クイズ2

- 一部のデータ型には、MySQLはNULL値に対して特殊な処理を行うことが知られています。例えば、TIMESTAMP型のカラムに対してNULLをINSERTした場合、どうなるかやってみましょう。

<details><summary>想定回答</summary>

- 以下のテーブルを作成する

```sql
 create table product (id int not null, name varchar(10) not null, created_at timestamp);
```

- timestamp型のカラムにNULLをINSERTすると、現在時刻（UTC）が挿入されていることがわかる

```sql
mysql> insert into product values (1, 'chair', NULL);
Query OK, 1 row affected (0.01 sec)

mysql> select * from product;
+----+-------+---------------------+
| id | name  | created_at          |
+----+-------+---------------------+
|  1 | chair | 2021-04-24 08:57:16 |
+----+-------+---------------------+
1 row in set (0.01 sec)
```

</details>