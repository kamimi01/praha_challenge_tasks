# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題2](#課題2)
  - [Table of Contents](#table-of-contents)
  - [事前準備](#事前準備)
  - [Dirty Read](#dirty-read)
  - [Non-repeatable read](#non-repeatable-read)
  - [Phantom read](#phantom-read)
  - [参考](#参考)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 事前準備

- 現在のisolation levelを確認する

```bash
mysql> show variables like 'transaction_isolation';
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+
1 row in set (0.00 sec)
```

- isolation levelを`READ UNCOMMITED`に設定する

```bash
mysql> SET GLOBAL tx_isolation='READ-UNCOMMITTED';
Query OK, 0 rows affected, 1 warning (0.00 sec)

# MySQLを再起動する
mysql> show variables like 'transaction_isolation';
+-----------------------+------------------+
| Variable_name         | Value            |
+-----------------------+------------------+
| transaction_isolation | READ-UNCOMMITTED |
+-----------------------+------------------+
1 row in set (0.00 sec)
```


## Dirty Read

- 想定：従業員番号「499942」の従業員が「2021-05-02」に退職したため、titlesテーブルのto_dateを更新する

```bash
# ターミナル1で実行
mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 9999-01-01 |
+--------+------------------+------------+------------+
1 row in set (0.00 sec)

mysql> start transaction;
Query OK, 0 rows affected (0.00 sec)

mysql> update titles set to_date = '2021-05-02' where emp_no = 499942;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 2021-05-02 |
+--------+------------------+------------+------------+
1 row in set (0.00 sec)

# この段階でターミナル2で以下を実行
mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 2021-05-02 | # コミットされていない変更を見ることができている→ダーティリード
+--------+------------------+------------+------------+
1 row in set (0.00 sec)
```

## Non-repeatable read

- isolation levelを`READ COMMITED`に設定する

```bash
mysql> SET GLOBAL tx_isolation='READ-COMMITTED';
Query OK, 0 rows affected, 1 warning (0.00 sec)

# MySQLを再起動する
mysql> show variables like 'transaction_isolation';
+-----------------------+----------------+
| Variable_name         | Value          |
+-----------------------+----------------+
| transaction_isolation | READ-COMMITTED |
+-----------------------+----------------+
1 row in set (0.00 sec)
```

- Dirty　Readと同じ想定で複数トランザクションを行う

```bash
# ターミナル1でテーブルを検索する
mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 9999-01-01 |
+--------+------------------+------------+------------+
1 row in set (0.00 sec)

# ターミナル2でtitlesテーブルを更新する（トランザクションの開始からコミットまで行う）
mysql> start transaction;
Query OK, 0 rows affected (0.00 sec)

mysql> update titles set to_date = '2021-05-02' where emp_no = 499942;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 2021-05-02 |
+--------+------------------+------------+------------+
1 row in set (0.00 sec)

mysql> commit;
Query OK, 0 rows affected (0.00 sec)

# ターミナル1で再度検索する
mysql> select * from titles where emp_no = 499942;
+--------+------------------+------------+------------+
| emp_no | title            | from_date  | to_date    |
+--------+------------------+------------+------------+
| 499942 | Technique Leader | 1998-03-28 | 2021-05-02 | # 前回と異なる結果となった→Non-repeatable read
+--------+------------------+------------+------------+
1 row in set (0.00 sec)
```

## Phantom read

- isolation levelは`READ COMMITED`のままとする
- 想定：departmentsテーブルに新しい部署「Something」が増えたとする

```bash
# ターミナル1でテーブル検索
mysql> select count(*) from departments;
+----------+
| count(*) |
+----------+
|        9 |
+----------+
1 row in set (0.00 sec)

# ターミナル2でdepartmentsテーブルにSomethingのレコードを追加する（トランザクション開始からコミットまで）
mysql> start transaction;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into departments values('d010', 'Something');
Query OK, 1 row affected (0.00 sec)

mysql> commit;
Query OK, 0 rows affected (0.00 sec)

# ターミナル1でテーブルを検索する
mysql> select count(*) from departments;
+----------+
| count(*) |
+----------+
|       10 | # 最初と結果が異なっている→ファントムリード
+----------+
1 row in set (0.00 sec)
```

## 参考

- [トランザクション分離レベルについてのまとめ](https://qiita.com/song_ss/items/38e514b05e9dabae3bdb#mysql%E3%81%A7%E5%AE%9F%E9%9A%9B%E3%81%AB%E8%A9%A6%E3%81%99)