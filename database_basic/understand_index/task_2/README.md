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
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 環境構築

## 動作環境

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

## 参考

- [genschsa/mysql-employees](https://hub.docker.com/r/genschsa/mysql-employees)
- [Docker で MySQL コンテナを起動しました](https://qiita.com/pugiemonn/items/b17288494e4b627f4475)
- [MySQL スロークエリ改善 初心者向け](https://qiita.com/SuguruOoki/items/5c4c04a120d9fa5b4267)
- [MySQL 5.6 13.7.5.40 SHOW VARIABLES 構文](https://dev.mysql.com/doc/refman/5.6/ja/show-variables.html)