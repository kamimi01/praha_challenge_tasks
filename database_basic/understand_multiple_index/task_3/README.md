# 課題3

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

- 現在「d008」のマネージャーを担当している従業員に今まで支払われた給与の合計を求めてください。またそれを高速化する複合インデックスを作成してください。
  - dept_manager.to_date が 9999-01-01の場合は、現在担当しているとみなします

<details><summary>想定回答</summary>

```sql
SELECT
  sum(salary)
FROM
  salaries
  INNER JOIN (
    SELECT
      *
    FROM
      dept_manager
    WHERE
      dept_no = 'd008'
      AND to_date = '9999-01-01'
  ) AS dpmn ON salaries.emp_no = dpmn.emp_no;
```

</details>

## クイズ2

- 職種に「Senior」がつく従業員の従業員番号とfrom_dateを、from_dateの昇順で抽出してください。またそれを高速化する複合インデックスを作成してください。

<details><summary>想定回答</summary>

```sql
SELECT
  emp_no,
  from_date
FROM
  titles
WHERE
  title LIKE 'Senior%'
ORDER BY
  from_date;
```

</details>

## クイズ3

- 入社以来一度も部署異動をした事がない従業員の従業員番号を降順で求めてください。またそれを高速化する複合インデックスを作成してください。

<details><summary>想定回答</summary>

```sql
SELECT
  count(*) AS numOfChanges,
  emp_no
FROM
  employees.dept_emp
GROUP BY
  emp_no
HAVING
  numOfChanges = 1
ORDER BY
  emp_no DESC;
```

</details>