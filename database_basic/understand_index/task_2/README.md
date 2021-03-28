# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [環境構築](#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)
  - [動作環境](#%E5%8B%95%E4%BD%9C%E7%92%B0%E5%A2%83)
  - [DockerからプルしてMySQLにログインする](#docker%E3%81%8B%E3%82%89%E3%83%97%E3%83%AB%E3%81%97%E3%81%A6mysql%E3%81%AB%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%99%E3%82%8B)
  - [GUIツールを使用する](#gui%E3%83%84%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)
  - [スロークエリログの設定](#%E3%82%B9%E3%83%AD%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%AD%E3%82%B0%E3%81%AE%E8%A8%AD%E5%AE%9A)
- [WHERE句を1つだけ含むSELECTクエリのチューニング](#where%E5%8F%A5%E3%82%921%E3%81%A4%E3%81%A0%E3%81%91%E5%90%AB%E3%82%80select%E3%82%AF%E3%82%A8%E3%83%AA%E3%81%AE%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0)
  - [チューニング](#%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 環境構築

### 動作環境

```sql
mysql> select version();
+-----------+
| version() |
+-----------+
| 5.7.24    |
+-----------+
1 row in set (0.00 sec)
```

### DockerからプルしてMySQLにログインする

1. Dockerイメージをpullする

```bash
docker pull genschsa/mysql-employees
```

2. コンテナを起動する

```bash
docker run -d \
  --name mysql-employees \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -v $PWD/data:/var/lib/mysql \
  genschsa/mysql-employees
```

3. shellに入る

```bash
docker exec -it <コンテナID> /bin/bash
```

4. MySQLにログインする（パスワードを聞かれるので、入力する）

```bash
mysql -u root -p
```

### GUIツールを使用する

- 今回は普段から使用しているMySQL Workbenchを使用する

### スロークエリログの設定

1. デフォルトの設定を確認する

```sql
mysql> show variables like '%slow%';
+---------------------------+--------------------------------------+
| Variable_name             | Value                                |
+---------------------------+--------------------------------------+
| log_slow_admin_statements | OFF                                  |
| log_slow_slave_statements | OFF                                  |
| slow_launch_time          | 2                                    |
| slow_query_log            | OFF                                  |
| slow_query_log_file       | /var/lib/mysql/0771bb71246a-slow.log |
+---------------------------+--------------------------------------+
5 rows in set (0.00 sec)

mysql> show variables like 'min%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| min_examined_row_limit | 0     |
+------------------------+-------+
1 row in set (0.00 sec)

mysql> show variables like 'long%';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
1 row in set (0.01 sec)
```

## WHERE句を1つだけ含むSELECTクエリのチューニング

- 以下の3つのクエリを、10回ずつ実行する

- ①誕生日が1960年以降の従業員の情報を全て抽出する

```sql
SELECT
  *
FROM
  employees
WHERE
  birth_date >= date('1960-01-01');
```

- ②誕生日が1960年以降の従業員の誕生日のみを抽出する

```sql
SELECT
  birth_date
FROM
  employees
WHERE
  birth_date >= date('1960-01-01');
```

- ③性別が女性の従業員のフルネームと性別を抽出する

```sql
SELECT
  concat(first_name, ' ', last_name) AS full_name,
  gender
FROM
  employees
WHERE
  gender = 'F';
```

### チューニング

- 「ヤフー社内でやってるMySQLチューニングセミナー大公開」を参考にチューニングを行う

1. スロークエリログに全SQLを記録する

- 以下の設定を行う

```sql
-- スロークエリログの出力をオンにする
mysql> show variables like 'slow%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_launch_time    | 2                                    |
| slow_query_log      | ON                                   |
| slow_query_log_file | /var/lib/mysql/0771bb71246a-slow.log |
+---------------------+--------------------------------------+
3 rows in set (0.00 sec)


-- 実行時間が何秒であってもログを出力する
mysql> set global long_query_time = 0.0;
Query OK, 0 rows affected (0.00 sec)

-- mysqlからexitして再接続する

mysql> show variables like 'long%';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 0.000000 |
+-----------------+----------+
1 row in set (0.01 sec)
```

2. スロークエリログの集計を行う

- 今回は、そこまで詳しい分析を行わないため、`pt-query-digest`は使用せず、`mysqldumpslow`コマンドを使用する
- サーバシステム変数の確認結果は削除した結果を以下に載せる
- `t`オプションを指定し、クエリの合計実行時間でソート
  - rootユーザーで実行しているため、`sudo`は不要

```bash
# mysqldumpslow -s t 0771bb71246a-slow.log

Reading mysql slow query log from 0771bb71246a-slow.log
Count: 10  Time=0.17s (1s)  Lock=0.00s (0s)  Rows=117138.0 (1171380), root[root]@localhost
  SELECT
  *
  FROM
  employees
  WHERE
  birth_date >= date('S')

Count: 10  Time=0.12s (1s)  Lock=0.00s (0s)  Rows=120051.0 (1200510), root[root]@localhost
  SELECT
  concat(first_name, 'S', last_name) AS full_name,
  gender
  FROM
  employees
  WHERE
  gender = 'S'

Count: 10  Time=0.10s (0s)  Lock=0.00s (0s)  Rows=117138.0 (1171380), root[root]@localhost
  SELECT
  birth_date
  FROM
  employees
  WHERE
  birth_date >= date('S')
```

3. 実行計画の確認

- ①誕生日が1960年以降の従業員の情報を全て抽出する
  - フルスキャン（typeがALL）となっている

```sql
mysql> EXPLAIN SELECT
    ->   *
    -> FROM
    ->   employees
    -> WHERE
    ->   birth_date >= date('1960-01-01')\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 299866
     filtered: 33.33
        Extra: Using where
1 row in set, 1 warning (0.00 sec)
```

- ②誕生日が1960年以降の従業員の誕生日のみを抽出する
  - フルスキャン（typeがALL）となっている

```sql
mysql> EXPLAIN SELECT
    ->   birth_date
    -> FROM
    ->   employees
    -> WHERE
    ->   birth_date >= date('1960-01-01')\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 299866
     filtered: 33.33
        Extra: Using where
1 row in set, 1 warning (0.00 sec)
```

- ③性別が女性の従業員のフルネームと性別を抽出する
  - フルスキャン（typeがALL）となっている

```sql
mysql> EXPLAIN SELECT
    ->   concat(first_name, ' ', last_name) AS full_name,
    ->   gender
    -> FROM
    ->   employees
    -> WHERE
    ->   gender = 'F'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 299866
     filtered: 50.00
        Extra: Using where
1 row in set, 1 warning (0.00 sec)
```

4. チューニングを行う

- ①誕生日が1960年以降の従業員の情報を全て抽出する
  - `birth_date`にインデックスを作成する

```sql
mysql> CREATE INDEX idx_birth_date ON employees (birth_date);
Query OK, 0 rows affected (0.72 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show index from employees\G
*************************** 1. row ***************************
        Table: employees
   Non_unique: 0
     Key_name: PRIMARY
 Seq_in_index: 1
  Column_name: emp_no
    Collation: A
  Cardinality: 299866
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
*************************** 2. row ***************************
        Table: employees
   Non_unique: 1
     Key_name: idx_birth_date
 Seq_in_index: 1
  Column_name: birth_date
    Collation: A
  Cardinality: 4758
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
2 rows in set (0.00 sec)
```

## 参考

- [genschsa/mysql-employees](https://hub.docker.com/r/genschsa/mysql-employees)
- [Docker で MySQL コンテナを起動しました](https://qiita.com/pugiemonn/items/b17288494e4b627f4475)
- [MySQL スロークエリ改善 初心者向け](https://qiita.com/SuguruOoki/items/5c4c04a120d9fa5b4267)
- [MySQL 5.6 13.7.5.40 SHOW VARIABLES 構文](https://dev.mysql.com/doc/refman/5.6/ja/show-variables.html)
- [MySQLスローログの手動ローテート](https://b.l0g.jp/mysql/slowlog-manual-rotate/)
- [遅いクエリを突き止める!MySQLクエリ解析にスロークエリログを導入する手順](https://nishinatoshiharu.com/mysql-slow-query-log/#mysqldumpslow)