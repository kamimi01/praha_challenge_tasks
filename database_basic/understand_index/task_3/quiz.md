# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)
- [クイズ3](#%E3%82%AF%E3%82%A4%E3%82%BA3)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- 2000年以降に入社した男性社員と女性社員の内訳を求めるクエリと、それを高速化するようなインデックスを作成してください。

<details><summary>想定回答</summary>

```sql
mysql> select count(*), gender from employees where hire_date >= '2000-01-01' group by gender;
+----------+--------+
| count(*) | gender |
+----------+--------+
|        6 | M      |
|        7 | F      |
+----------+--------+
2 rows in set (0.00 sec)
```

</details>

## クイズ2

- 1965年以降生まれの社員に最も多いラストネームは何か求めるクエリと、それを高速化するようなインデックスを作成してください。

<details><summary>想定回答</summary>

```sql
mysql> select count(*) as num_of_same_last_name, last_name from employees where birth_date >= '1965-01-01' group by last_name order by num_of_same_last_name desc limit 1;
+-----------------------+-----------+
| num_of_same_last_name | last_name |
+-----------------------+-----------+
|                     5 | Werthner  |
+-----------------------+-----------+
1 row in set (0.01 sec)
```

</details>

## クイズ3

- ファーストネームが「Ann」で始まる社員数を求めるクエリと、それを高速化するようなインデックスを作成してください。

- ヒント：`LIKE`の使用方法によっては、インデックスが効く場合と効かない場合があります。

<details><summary>想定回答</summary>

```sql
mysql> select count(*) from employees where first_name like 'Ann%';
+----------+
| count(*) |
+----------+
|      679 |
+----------+
1 row in set (0.06 sec)
```

- 参考
  - [開発者のためのSQLのチューニングへのガイド LIKEフィルタに対するインデックス](https://use-the-index-luke.com/ja/sql/where-clause/searching-for-ranges/like-performance-tuning)

</details>