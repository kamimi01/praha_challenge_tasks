# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [スロークエリの有効化とその設定](#%E3%82%B9%E3%83%AD%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%81%AE%E6%9C%89%E5%8A%B9%E5%8C%96%E3%81%A8%E3%81%9D%E3%81%AE%E8%A8%AD%E5%AE%9A)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## スロークエリの有効化とその設定

- mysqlにログインし、現状のスロークエリ関連の値を確認する

```bash
mysql> show variables like 'slow%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_launch_time    | 2                                    |
| slow_query_log      | OFF                                  |
| slow_query_log_file | /var/lib/mysql/0771bb71246a-slow.log |
+---------------------+--------------------------------------+
3 rows in set (0.00 sec)
```

- スロークエリを有効化する

```bash
mysql> set global slow_query_log = 1;
Query OK, 0 rows affected (0.02 sec)
```

- 実行に0.1秒以上かかったクエリをスロークエリログに記録するよう設定する

```bash
mysql> show variables like 'long_query_time';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 0.000000 |
+-----------------+----------+
1 row in set (0.00 sec)

# mysqlからexitして再接続する

mysql> show variables like 'long_query_time';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 0.100000 |
+-----------------+----------+
1 row in set (0.02 sec)
```

- 実行時間0.1秒以下のクエリを3つ実行して、スロークエリログに記録されない事を確認

```sql
-- 1つ目
select * from departments;

-- 2つ目
select count(*) from titles;

-- 3つ目
select count(*) from employees;
```

- スロークエリログを確認する
  - どのクエリも0.1秒以内に完了していたため、スロークエリログには記録されていない

```bash
# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
root@0771bb71246a:/var/lib/mysql# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
root@0771bb71246a:/var/lib/mysql# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
```

- 実行時間が0.1秒より長いクエリを3つ実行して、スロークエリログに記録される事を確認

```sql
-- 1つ目
select * from employees;

-- 2つ目
select sum(salary) from salaries group by emp_no;

-- 3つ目
select count(*) from dept_emp group by dept_no;
```

- スロークエリを確認する
  - 3つのクエリのログが出力されている事がわかる

```bash
# cat 0771bb71246a-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
# Time: 2021-04-15T11:28:32.131899Z
# User@Host: root[root] @ localhost []  Id:    32
# Query_time: 0.213973  Lock_time: 0.000130 Rows_sent: 300024  Rows_examined: 300024
use employees;
SET timestamp=1618486112;
select * from employees;
# Time: 2021-04-15T11:35:36.531781Z
# User@Host: root[root] @ localhost []  Id:    32
# Query_time: 4.159624  Lock_time: 0.000134 Rows_sent: 300024  Rows_examined: 2844047
SET timestamp=1618486536;
select sum(salary) from salaries group by emp_no;
# Time: 2021-04-15T11:38:33.259368Z
# User@Host: root[root] @ localhost []  Id:    32
# Query_time: 0.496769  Lock_time: 0.000116 Rows_sent: 9  Rows_examined: 331603
SET timestamp=1618486713;
select count(*) from dept_emp group by dept_no;
```