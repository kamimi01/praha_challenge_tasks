# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 2つ以上のWHERE句を組み合わせたSELECTクエリ

- ①特定の氏名を抽出する
  - 課題1で検証ずみなため、課題2では省略させてください..

```sql
SELECT
  first_name,
  last_name
FROM
  employees
WHERE
  last_name = 'Facello';
```

- ②現在もEngineerの職に就いている社員の情報を抽出する（to_dateが9999-01-01の場合、現在もtitleの職に就いていることとする）

```sql
SELECT
  *
FROM
  titles
WHERE
  title = 'Engineer'
  AND to_date = '9999-01-01';
```

- ③to_dateが9999-01-01の社員の給与を高い順に抽出する

```sql
SELECT
  *
FROM
  salaries
WHERE
  to_date = '9999-01-01'
ORDER BY
  salary DESC;
```

### インデックス作成前

- 以下にスロークエリログを載せる

```bash
# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument

# Time: 2021-04-10T03:44:08.724880Z
# User@Host: root[root] @ localhost []  Id:    23
# Query_time: 0.395952  Lock_time: 0.000145 Rows_sent: 30983  Rows_examined: 443308
SET timestamp=1618026248;
SELECT
  *
FROM
  titles
WHERE
  title = 'Engineer'
  AND to_date = '9999-01-01';

# Time: 2021-04-10T03:44:18.169910Z
# User@Host: root[root] @ localhost []  Id:    23
# Query_time: 3.499783  Lock_time: 0.000206 Rows_sent: 240124  Rows_examined: 3084171
SET timestamp=1618026258;
SELECT
  *
FROM
  salaries
WHERE
  to_date = '9999-01-01'
ORDER BY
  salary DESC;
```

### インデックスの作成

- ②

```sql
CREATE INDEX titles_idx ON titles (title, to_date);
```

- ③

```sql
CREATE INDEX salaries_idx ON salaries (to_date, salary);
```

### インデックス作成後

- 以下はスロークエリログの結果

```bash
# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument

# Time: 2021-04-10T03:48:15.933818Z
# User@Host: root[root] @ localhost []  Id:    23
# Query_time: 0.026967  Lock_time: 0.000164 Rows_sent: 30983  Rows_examined: 30983
SET timestamp=1618026495;
SELECT
  *
FROM
  titles
WHERE
  title = 'Engineer'
  AND to_date = '9999-01-01';

# Time: 2021-04-10T03:48:26.560221Z
# User@Host: root[root] @ localhost []  Id:    23
# Query_time: 0.180055  Lock_time: 0.000138 Rows_sent: 240124  Rows_examined: 240124
SET timestamp=1618026506;
SELECT
  *
FROM
  salaries
WHERE
  to_date = '9999-01-01'
ORDER BY
  salary DESC;
```

- 以下はExplainの結果
  - 両方のクエリともに、typeがref、keyに作成したインデックス名があることから、インデックスが使用されている事がわかる

```sql
mysql> explain SELECT
    ->   *
    -> FROM
    ->   titles
    -> WHERE
    ->   title = 'Engineer'
    ->   AND to_date = '9999-01-01'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: titles
   partitions: NULL
         type: ref
possible_keys: titles_idx
          key: titles_idx
      key_len: 56
          ref: const,const
         rows: 63694
     filtered: 100.00
        Extra: Using index
1 row in set, 1 warning (0.00 sec)

mysql> explain SELECT
    ->   *
    -> FROM
    ->   salaries
    -> WHERE
    ->   to_date = '9999-01-01'
    -> ORDER BY
    ->   salary DESC\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: salaries
   partitions: NULL
         type: ref
possible_keys: salaries_idx
          key: salaries_idx
      key_len: 3
          ref: const
         rows: 444440
     filtered: 100.00
        Extra: Using where; Using index
1 row in set, 1 warning (0.00 sec)
```

### 検証結果のまとめ

|クエリ|作成したインデックス|インデックス作成前の実行時間（s）|インデックス作成後の実行時間（s）|
|---|---|---|---|
|②|(title, to_date)|0.395952|0.026967|
|③|(to_date, salary)|3.499783|0.180055|

## 参考

- [MySQL Index勉強会外部公開用](https://www.slideshare.net/crooz_techblog/mysql-index-26016127)
  - 複合インデックすは、範囲指定がある場合は、効かない