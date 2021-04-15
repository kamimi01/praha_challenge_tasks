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

## 質問2

> ①のクエリを書いたところ、『その条件なら、WHEREじゃなくてONで絞った方が良いかも』（②）と言われたが、WHEREで絞るのとONで絞るのって、一体何が違うか？

```sql
-- ①
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no WHERE gender = "M" AND birth_date > "1960-01-01"

-- ②
SELECT * FROM employees e JOIN salaries s ON e.emp_no = s.emp_no AND gender = "M" AND birth_date > "1960-01-01"
```

### 回答

## 参考