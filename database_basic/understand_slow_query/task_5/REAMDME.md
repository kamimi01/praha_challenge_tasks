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

- テーブル結合には、主に以下の３つのアルゴリズムが存在しますが、MySQLでは主にどれをサポートしているでしょうか？
  1. Nested Loop Join
  2. Hash Join
  3. Merge Join

<details><summary>想定回答</summary>

- MySQL 8.0.18より前のバージョンでは、1. Nested Loop Joinをサポートしているが、そのバージョン以降では、3. Hash Joinもサポートしている。

- 参考
  - [8.2.1.4 Hash Join Optimization](https://dev.mysql.com/doc/refman/8.0/en/hash-joins.html)

</details>

## クイズ2

- Nested Loop Joinにおける、駆動表と内部表とはなんでしょうか？また、MySQLでは、どのように、実行時にどのテーブルが駆動表、内部表として扱われた事を判断できるでしょうか？

<details><summary>想定回答</summary>

- 駆動表
  - 結合する際に先にアクセスされるテーブル（疑似コードにおいては、外側でループが発生しているテーブルのこと）
  - このテーブルから取得するレコード数が少ない状態の方が、実行すべきループの数が少なくなるため、パフォーマンスがよくなる
- 内部表
  - 後からアクセスされ、結合されるテーブル（疑似コードにおいては、内側でループが発生しているテーブルのこと）

```python
# 疑似コード（Pythonかどうかは不明）
# 1. t1テーブルから条件にあうものを1レコードずつ取ってくる。
for row1 in fetch(t1, { "c1": 1 }):
    # 2. 1の結果に対してあうレコードをt2テーブルから1つずつ取ってくる。
    for row2 in fetch(t2, { "c3": row1.c2 }):
        # 3. それをクライアントに返す。
        send_to_client(row1 + row2)
```

- 確認方法
  - EXPLAINを行い、先に表示されているテーブルが駆動表、その後に表示されているテーブルが内部表となる
  - 例えば、以下のクエリを実行した時、駆動表は`departments`、内部表は`dept_emp`となる

```sql
SELECT
  *
FROM
  (
    SELECT
      *
    FROM
      departments
    WHERE
      dept_no = 'd008'
  ) AS dep
  JOIN dept_emp ON dep.dept_no = dept_emp.dept_no;
```

```sql
mysql> explain select * from (select * from departments where dept_no = 'd008') as dep join dept_emp on dep.dept_no = dept_emp.dept_no\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: departments
   partitions: NULL
         type: const
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: const
         rows: 1
     filtered: 100.00
        Extra: NULL
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: dept_emp
   partitions: NULL
         type: ref
possible_keys: dept_no
          key: dept_no
      key_len: 4
          ref: const
         rows: 39130
     filtered: 100.00
        Extra: NULL
2 rows in set, 1 warning (0.00 sec)
```

- 参考
  - [実例で学ぶ、JOIN (NLJ) が遅くなる理屈と対処法](https://qiita.com/yuku_t/items/208be188eef17699c7a5)
<details>

