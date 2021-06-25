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
    - [チューニング前の状況の確認](#%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E5%89%8D%E3%81%AE%E7%8A%B6%E6%B3%81%E3%81%AE%E7%A2%BA%E8%AA%8D)
    - [チューニングを行う](#%E3%83%81%E3%83%A5%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86)
    - [インデックスによる効果のまとめ](#%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AB%E3%82%88%E3%82%8B%E5%8A%B9%E6%9E%9C%E3%81%AE%E3%81%BE%E3%81%A8%E3%82%81)
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

- ①誕生日が1960年以降の従業員の誕生日のみを抽出する

```sql
SELECT
  birth_date
FROM
  employees
WHERE
  birth_date >= date('1960-01-01')
ORDER BY
  birth_date DESC;
```

- ②性別が女性の従業員のフルネームと性別を抽出する

```sql
SELECT
  concat(first_name, ' ', last_name) AS full_name,
  gender
FROM
  employees
WHERE
  gender = 'F';
```

- ③2000年代以降に入社した従業員の従業員番号、給料、入社日を、入社日の降順に抽出する

```sql
SELECT
  employees.emp_no,
  salaries.salary,
  employees.hire_date
FROM
  employees
  INNER JOIN salaries ON employees.emp_no = salaries.emp_no
WHERE
  hire_date >= date('2000-01-01')
ORDER BY
  salary DESC;
```

### チューニング

- 「ヤフー社内でやってるMySQLチューニングセミナー大公開」の手順に乗っ取ってチューニングを行う

#### チューニング前の状況の確認

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
  - `cd /var/lib/mysql`に移動する
- サーバシステム変数の確認結果は削除した結果を以下に載せる
- `t`オプションを指定し、クエリの合計実行時間でソート
  - rootユーザーで実行しているため、`sudo`は不要

```bash
# mysqldumpslow -s t 0771bb71246a-slow.log

Reading mysql slow query log from 0771bb71246a-slow.log
Count: 10  Time=8.54s (85s)  Lock=0.00s (0s)  Rows=36.0 (360), root[root]@localhost
  SELECT
  employees.emp_no,
  salaries.salary,
  employees.hire_date
  FROM
  employees
  INNER JOIN salaries ON employees.emp_no = salaries.emp_no
  WHERE
  hire_date >= date('S')
  ORDER BY
  salary DESC

Count: 10  Time=0.12s (1s)  Lock=0.00s (0s)  Rows=120051.0 (1200510), root[root]@localhost
  SELECT
  concat(first_name, 'S', last_name) AS full_name,
  gender
  FROM
  employees
  WHERE
  gender = 'S'

Count: 10  Time=0.08s (0s)  Lock=0.00s (0s)  Rows=117138.0 (1171380), root[root]@localhost
  SELECT
  birth_date
  FROM
  employees
  WHERE
  birth_date >= date('S')
  ORDER BY
  birth_date DESC
```

2.1. `performance_schema`による実行速度の確認

- パフォーマンススキーマとは
  - 実行時にサーバの内部実行を検索する方法を提供する
  - `performance_schema`データベースを使用して実装される
- （TODO）スロークエリログの集計により、実行速度は確認済みだが、`performance_schema`による確認も行いたい。（スロークエリログの集計よりも面倒そうなので、一旦放置）

1. 実行計画の確認

- ①誕生日が1960年以降の従業員の誕生日のみを抽出する
  - type
    - ALL：フルテーブルスキャンとなっており、インデックスが全く利用されていない
  - Extra
    - Using where：頻繁に出力される追加情報である。WHERE句に検索条件が指定されており、なおかつインデックスを見ただけではWHERE句の条件を全て適用することが出来ない場合に表示される。
    - Using filesort：クイックソートが使われている

```sql
mysql> EXPLAIN SELECT
    ->   birth_date
    -> FROM
    ->   employees
    -> WHERE
    ->   birth_date >= date('1960-01-01')
    -> ORDER BY
    ->   birth_date DESC\G
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
        Extra: Using where; Using filesort
1 row in set, 1 warning (0.00 sec)
```

- ②性別が女性の従業員のフルネームと性別を抽出する
  - type
    - ALL：フルテーブルスキャンとなっており、インデックスが全く利用されていない
  - Extra
    - Using where：頻繁に出力される追加情報である。WHERE句に検索条件が指定されており、なおかつインデックスを見ただけではWHERE句の条件を全て適用することが出来ない場合に表示される。

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

- ③2000年代以降に入社した従業員の従業員番号、給料、入社日を、入社日の降順に抽出する
  - 1行目には、JOINされるテーブル（駆動表）である`salary`の実行計画が出力されている
    - 駆動表からフェッチする行数が少ないほど、実行すべきループの回数が少なくなるため有利
      - 少なくするためには`WHERE`句で行数の絞り込みを行うなどの対策がある
  - type
    - ALL：フルテーブルスキャンとなっており、インデックスが全く利用されていない
  - Extra
    - Using where：頻繁に出力される追加情報である。WHERE句に検索条件が指定されており、なおかつインデックスを見ただけではWHERE句の条件を全て適用することが出来ない場合に表示される。
    - Using filesort：クイックソートが使われている

```sql
mysql> EXPLAIN SELECT
    ->   employees.emp_no,
    ->   salaries.salary,
    ->   employees.hire_date
    -> FROM
    ->   employees
    ->   INNER JOIN salaries ON employees.emp_no = salaries.emp_no
    -> WHERE
    ->   hire_date >= date('2000-01-01')
    -> ORDER BY
    ->   salary DESC\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: salaries
   partitions: NULL
         type: ALL
possible_keys: PRIMARY
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 1
     filtered: 100.00
        Extra: Using filesort
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: employees.salaries.emp_no
         rows: 1
     filtered: 33.33
        Extra: Using where
2 rows in set, 1 warning (0.00 sec)
```
#### チューニングを行う

1. チューニングを行う

- ①誕生日が1960年以降の従業員の情報を全て抽出する
  - `birth_date`にインデックスを作成する

```sql
mysql> CREATE INDEX idx_birth_date ON employees (birth_date);
Query OK, 0 rows affected (0.67 sec)
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
  Cardinality: 4781
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
2 rows in set (0.00 sec)
```

- 再度EXPLAINを行う
  - 結果
    - type
      - range：インデックスを用いた範囲検索
    - possible_keys：オプティマイザがテーブルのアクセスに必要なインデックスの候補として挙げたキーの一覧
    - key：オプティマイザによって選択されたキー
    - key_len：選択されたキーの長さ。インデックスの走査は、キー長が短い方が高速。
    - Extra
      - Using where：頻繁に出力される追加情報である。WHERE句に検索条件が指定されており、なおかつインデックスを見ただけではWHERE句の条件を全て適用することが出来ない場合に表示される。
      - Using index：クエリがインデックスだけを用いて解決できることを示す。カバリングインデックスを利用している場合などに表示される

```sql
mysql> EXPLAIN SELECT
    ->   birth_date
    -> FROM
    ->   employees
    -> WHERE
    ->   birth_date >= date('1960-01-01')
    -> ORDER BY
    ->   birth_date DESC\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: range
possible_keys: idx_birth_date
          key: idx_birth_date
      key_len: 3
          ref: NULL
         rows: 149933
     filtered: 100.00
        Extra: Using where; Using index
1 row in set, 1 warning (0.00 sec)
```

- ②性別が女性の従業員のフルネームと性別を抽出する
  - `gender`にインデックスを作成する
    - 推測：`gender`のカーディナリティは`1`であり、かつ120,051レコード/300,024レコードが`F`であるため、半分にしか検索結果が絞られないので、そこまでインデックス作成による実行速度への効果はないと考えられる

```sql
mysql> CREATE INDEX idx_gender ON employees (gender);
Query OK, 0 rows affected (0.61 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show index from employees\G
-- 1. rowと2. rowは省略
*************************** 3. row ***************************
        Table: employees
   Non_unique: 1
     Key_name: idx_gender
 Seq_in_index: 1
  Column_name: gender
    Collation: A
  Cardinality: 1
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
3 rows in set (0.00 sec)
```

- 再度EXPLAINを行う
  - 結果
    - type
      - ref：ユニーク（PRIMARY or UNIQUE）でないインデックスを使って等価検索（WHERE key = value）を行った時に使われるアクセスタイプ。
    - possible_keys：オプティマイザがテーブルのアクセスに必要なインデックスの候補として挙げたキーの一覧
    - key：オプティマイザによって選択されたキー
    - key_len：選択されたキーの長さ。インデックスの走査は、キー長が短い方が高速。

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
         type: ref
possible_keys: idx_gender
          key: idx_gender
      key_len: 1
          ref: const
         rows: 149933
     filtered: 100.00
        Extra: NULL
1 row in set, 1 warning (0.00 sec)
```

- ③2000年代以降に入社した従業員の従業員番号、給料、入社日を、入社日の降順に抽出する
  - `salary`と`hire_date`にそれぞれインデックスを作成する

```sql
mysql> CREATE INDEX idx_salary ON salaries (salary);
Query OK, 0 rows affected (8.97 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> CREATE INDEX idx_hire_date ON employees (hire_date);
Query OK, 0 rows affected (0.96 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show index from employees\G
-- 1. row、2. row、3. rowは省略する
*************************** 4. row ***************************
        Table: employees
   Non_unique: 1
     Key_name: idx_hire_date
 Seq_in_index: 1
  Column_name: hire_date
    Collation: A
  Cardinality: 4908
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
4 rows in set (0.00 sec)

mysql> show index from salaries\G
*************************** 1. row ***************************
        Table: salaries
   Non_unique: 0
     Key_name: PRIMARY
 Seq_in_index: 1
  Column_name: emp_no
    Collation: A
  Cardinality: 0
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
*************************** 2. row ***************************
        Table: salaries
   Non_unique: 0
     Key_name: PRIMARY
 Seq_in_index: 2
  Column_name: from_date
    Collation: A
  Cardinality: 0
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
*************************** 3. row ***************************
        Table: salaries
   Non_unique: 1
     Key_name: idx_salary
 Seq_in_index: 1
  Column_name: salary
    Collation: A
  Cardinality: 0
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
3 rows in set (0.00 sec)
```

- 再度EXPLAINを行う
  - 結果
    - type
      - index：フルインデックススキャン。インデックス全体をスキャンする必要があるので、とても遅い
        - フルインデックススキャンとは
          - 
      - eq_ref：JOINにおいて、PRIARY KEYまたはUNIQUE KEYが利用される時のアクセスタイプ。constと似ているがJOINで用いられるところが違う。
    - possible_keys：オプティマイザがテーブルのアクセスに必要なインデックスの候補として挙げたキーの一覧
    - key：オプティマイザによって選択されたキー
    - key_len：選択されたキーの長さ。インデックスの走査は、キー長が短い方が高速。
    - Extra
      - Using index：クエリがインデックスだけを用いて解決できることを示す。Covering Indexを利用している場合などに表示される。
      - Using where：頻繁に出力される追加情報である。WHERE句に検索条件が指定されており、なおかつインデックスを見ただけではWHERE句の条件を全て適用することが出来ない場合に表示される。

```sql
mysql> EXPLAIN SELECT
    ->   employees.emp_no,
    ->   salaries.salary,
    ->   employees.hire_date
    -> FROM
    ->   employees
    ->   INNER JOIN salaries ON employees.emp_no = salaries.emp_no
    -> WHERE
    ->   hire_date >= date('2000-01-01')
    -> ORDER BY
    ->   salary DESC\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: salaries
   partitions: NULL
         type: index
possible_keys: PRIMARY
          key: idx_salary
      key_len: 4
          ref: NULL
         rows: 1
     filtered: 100.00
        Extra: Using index
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: employees
   partitions: NULL
         type: eq_ref
possible_keys: PRIMARY,idx_hire_date
          key: PRIMARY
      key_len: 4
          ref: employees.salaries.emp_no
         rows: 1
     filtered: 5.00
        Extra: Using where
2 rows in set, 1 warning (0.00 sec)
```

- スロークエリログの集計

```bash
# mysqldumpslow -s t 0771bb71246a-slow.log

Reading mysql slow query log from 0771bb71246a-slow.log
Count: 10  Time=4.86s (48s)  Lock=0.00s (0s)  Rows=36.0 (360), root[root]@localhost
  SELECT
  employees.emp_no,
  salaries.salary,
  employees.hire_date
  FROM
  employees
  INNER JOIN salaries ON employees.emp_no = salaries.emp_no
  WHERE
  hire_date >= date('S')
  ORDER BY
  salary DESC

Count: 10  Time=0.18s (1s)  Lock=0.00s (0s)  Rows=120051.0 (1200510), root[root]@localhost
  SELECT
  concat(first_name, 'S', last_name) AS full_name,
  gender
  FROM
  employees
  WHERE
  gender = 'S'

Count: 10  Time=0.06s (0s)  Lock=0.00s (0s)  Rows=117138.0 (1171380), root[root]@localhost
  SELECT
  birth_date
  FROM
  employees
  WHERE
  birth_date >= date('S')
  ORDER BY
  birth_date DESC
```

#### インデックスによる効果のまとめ

|クエリ|インデックスを作成したカラム|インデックスの効果|インデックス作成前の平均実行時間（s）|インデックス作成後の平均実行時間（s）|効果に対する理由の考察|
|------|----------------|---------------|----------|------------|----------|
|①    |`birth_date`        |あり|0.08|0.06|インデックスを作成したことで、フルテーブルスキャン（typeがALL）されなくなったため。|
|②    |`gender`            |なし|0.12|0.18|作成したインデックスのカーディナリティが低かったため（`1`）、絞り込みの効果が低く、インデックスを使用するよりもフルテーブルスキャン（typeがALL）の方が早かったと考えれる。|
|③    |`hire_date`/`salary`|あり|8.54|4.86|インデックスを作成したことで、フルテーブルスキャン（typeがALL）されなくなったため。（ただこれでも十分遅い上、フルインデックススキャンになっているため、もっと早い方法がないか検討したい）|

## 参考

- [genschsa/mysql-employees](https://hub.docker.com/r/genschsa/mysql-employees)
- [Docker で MySQL コンテナを起動しました](https://qiita.com/pugiemonn/items/b17288494e4b627f4475)
- [MySQL スロークエリ改善 初心者向け](https://qiita.com/SuguruOoki/items/5c4c04a120d9fa5b4267)
- [MySQL 5.6 13.7.5.40 SHOW VARIABLES 構文](https://dev.mysql.com/doc/refman/5.6/ja/show-variables.html)
- [MySQLスローログの手動ローテート](https://b.l0g.jp/mysql/slowlog-manual-rotate/)
- [遅いクエリを突き止める!MySQLクエリ解析にスロークエリログを導入する手順](https://nishinatoshiharu.com/mysql-slow-query-log/#mysqldumpslow)
- [MySQLのEXPLAINを徹底解説!! ](http://nippondanji.blogspot.com/2009/03/mysqlexplain.html)
- [MySQLにおけるJOINのチューニングの定石](https://enterprisezine.jp/article/detail/3520?p=2)
- [開発者のためのSQLノチューニングヘのガイド 実行計画の処理](https://use-the-index-luke.com/ja/sql/explain-plan/mysql/operations)
- [サイボウズ版 MySQL パフォーマンスチューニングとその結果](https://blog.cybozu.io/entry/2018/08/08/080000)
- [MySQL(InnoDB)でカーディナリティの低いカラムにINDEXを張る](https://qiita.com/hmatsu47/items/2d44c173a9114fd06853)