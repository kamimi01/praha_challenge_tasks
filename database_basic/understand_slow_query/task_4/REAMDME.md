# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問2](#%E8%B3%AA%E5%95%8F2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> `LIMIT 1`って書いたのにめちゃくちゃ遅いクエリがある。１件しか取得しないのに、どうして時間かかるのか？

### 回答

- `LIMIT`句を使用して、一定のレコード数のみ取得するクエリの場合、指定された行数が取得できた時点で実行を終了する事が、最も早くシンプル。だがオプティマイザは、実行計画を準備する時点では、それに気づかず、フルテーブルスキャンを行う可能性がある。その場合に、実行時間がかかり遅いクエリとなっている可能性がある。

## 質問2

> ①のクエリを書いたところ、『その条件なら、WHEREじゃなくてONで絞った方が良いかも』（②）と言われたが、WHEREで絞るのとONで絞るのは何が違うか？

```sql
-- ①
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no WHERE gender = "M" AND birth_date > "1960-01-01"

-- ②
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no AND gender = "M" AND birth_date > "1960-01-01"
```

### 回答

- 上記の２つのクエリには、パフォーマンスの違いがある。（外部結合の場合は、取得結果が異なる場合もある）
  - パフォーマンスの違い
    - まず上記のクエリの場合、結合する前にON句で絞り込みが行われる。 この時に、より絞り込まれている方が、結合する際のレコード数が少なくなり、その後に処理されるレコード数も少なくなるため、ON句による絞り込みの方がWHERE句よりも実行時間が早くなる可能性がある。
    - 実際計測する
      - ①：2.86sec
      - ②：2.68sec
    - また実行計画も確認する
      - 実行計画上は、ほぼ差がないように思えた。（実行計画には出ないが、パフォーマンスのが出る事例という事？？）

```sql
-- ①
mysql> explain SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no WHERE gender = "M" AND birth_date > "1960-01-01"\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: e
   partitions: NULL
         type: ALL
possible_keys: PRIMARY
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 299866
     filtered: 16.66
        Extra: Using where
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: s
   partitions: NULL
         type: ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: employees.e.emp_no
         rows: 9
     filtered: 100.00
        Extra: NULL
2 rows in set, 1 warning (0.00 sec)

-- ②
mysql> explain SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no AND gender = "M" AND birth_date > "1960-01-01"\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: e
   partitions: NULL
         type: ALL
possible_keys: PRIMARY
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 299866
     filtered: 16.66
        Extra: Using where
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: s
   partitions: NULL
         type: ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: employees.e.emp_no
         rows: 9
     filtered: 100.00
        Extra: NULL
2 rows in set, 1 warning (0.00 sec)
```
  - 取得結果の違いについては、以下を参照（今回は内部結合が使用されているクエリのため、この問題は発生しない）
    - [SQLにおける結合条件の違いを把握しよう！ON句とWHERE句に指定する場合の違いとは？](https://style.potepan.com/articles/26226.html#SQLON)

## 参考

- [USE THE INDEX LUKE 結合処理](https://use-the-index-luke.com/ja/sql/join)
- [MySQL5.6 8.2.1.19 LIMIT クエリーの最適化](https://dev.mysql.com/doc/refman/5.6/ja/limit-optimization.html)
- [テーブル結合についての備忘録 その2](https://qiita.com/mounntainn/items/2c5a568c98b7e9c38c6f)
- [実例で学ぶ、JOIN (NLJ) が遅くなる理屈と対処法](https://qiita.com/yuku_t/items/208be188eef17699c7a5)