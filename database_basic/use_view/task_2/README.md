# 課題2

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

> 「インデックスを理解する」「複合インデックスを理解する」の課題で作成したSELECT文を1つ選び、VIEWとして実行できるようにしてみましょう

### 回答

- 以下のクエリのviewを作成する
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

- viewを作成する

```sql
CREATE VIEW full_name_view AS (
  SELECT
    concat(first_name, ' ', last_name) AS full_name,
    gender
  FROM
    employees
  WHERE
    gender = 'F'
);
```

## 質問2

> クエリのパフォーマンスを比較する

### 回答

- ビューを使用した方が実行時間が長い結果となった。。

```sql
Count: 6  Time=0.12s (0s)  Lock=0.00s (0s)  Rows=120051.0 (720306), root[root]@localhost
  select * from full_name_view

Count: 6  Time=0.10s (0s)  Lock=0.00s (0s)  Rows=100042.5 (600255), root[root]@localhost
  SELECT
  concat(first_name, 'S', last_name) AS full_name,
  gender
  FROM
  employees
  WHERE
  gender = 'S'
```

- ビューを使用していないクエリでは、インデックスは使用されていないことがわかっている

```sql
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

- 別のクエリでも検証してみる

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

```sql
CREATE VIEW salaries_view AS (
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
  salary DESC
);
```

- 結果、実行時間はほぼ変わらず、ビューによって処理が高速化されたとは言えない

```sql
Count: 10  Time=0.10s (0s)  Lock=0.00s (0s)  Rows=36.0 (360), root[root]@localhost
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

Count: 10  Time=0.10s (0s)  Lock=0.00s (0s)  Rows=36.0 (360), root[root]@localhost
  select * from salaries_view
```

## 参考

- [ビューを作成する（CREATE VIEW文）](https://www.dbonline.jp/mysql/view/index1.html)