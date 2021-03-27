# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問2](#%E8%B3%AA%E5%95%8F2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [質問3](#%E8%B3%AA%E5%95%8F3)
  - [回答](#%E5%9B%9E%E7%AD%94-2)
- [質問4](#%E8%B3%AA%E5%95%8F4)
  - [回答](#%E5%9B%9E%E7%AD%94-3)
- [質問5](#%E8%B3%AA%E5%95%8F5)
  - [回答](#%E5%9B%9E%E7%AD%94-4)
- [質問6](#%E8%B3%AA%E5%95%8F6)
  - [回答](#%E5%9B%9E%E7%AD%94-5)
- [質問7](#%E8%B3%AA%E5%95%8F7)
  - [回答](#%E5%9B%9E%E7%AD%94-6)
- [質問8](#%E8%B3%AA%E5%95%8F8)
  - [回答](#%E5%9B%9E%E7%AD%94-7)
- [質問9](#%E8%B3%AA%E5%95%8F9)
  - [回答](#%E5%9B%9E%E7%AD%94-8)
- [質問10](#%E8%B3%AA%E5%95%8F10)
  - [回答](#%E5%9B%9E%E7%AD%94-9)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> 「常連顧客を特定して欲しい」と頼まれました
> 1996年に3回以上注文した（Ordersが3つ以上紐づいている）CustomerのIDと、注文回数を取得してみてください
> 最もよく注文してくれたのは、どのCustomerでしょうか？

### 回答

- `HAVING`を使用せず、`WHERE`を使用
  - `WHERE`句の処理段階では、まだ集計が終わっていないため、集計関数をWHERE句で使用できない

```sql
SELECT
  CustomerID,
  NumOfOrdersByCustomer.NumOfOrders
FROM
  (
    SELECT
      count(OrderID) AS NumOfOrders,
      CustomerID
    FROM
      Orders
    WHERE
      OrderDate BETWEEN '1996-01-01'
      AND '1996-12-31'
    GROUP BY
      CustomerID
  ) AS NumOfOrdersByCustomer
WHERE
  NumOfOrdersByCustomer.NumOfOrders >= 3;
```

- `HAVING`を使用

```sql
SELECT
  CustomerID,
  count(OrderID) AS NumOfOrders
FROM
  Orders
WHERE
  OrderDate BETWEEN '1996-01-01'
  AND '1996-12-31'
GROUP BY
  CustomerID
HAVING
  NumOfOrders >= 3
ORDER BY
  NumOfOrders DESC;
```

## 質問2

> 「一度の注文で、最大どれぐらいの注文詳細が紐づく可能性があるのか」調べる必要が生じました。過去最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

### 回答

- `WHERE`を使用

```sql
SELECT
  max(NumOfOrderDetailsByOrderID.NumOfOrderDetails) AS MaxNumOfOrderDetails,
  NumOfOrderDetailsByOrderID.OrderID
FROM
  (
    SELECT
      count(OrderDetailID) AS NumOfOrderDetails,
      OrderID
    FROM
      OrderDetails
    GROUP BY
      OrderID
  ) AS NumOfOrderDetailsByOrderID;
```

- `ORDER BY`と`LIMIT`を使用

```sql
SELECT
  count(OrderDetailID) AS NumOfOrderDetails,
  OrderID
FROM
  OrderDetails
GROUP BY
  OrderID
ORDER BY
  NumOfOrderDetails DESC
LIMIT
  1;
```

## 質問3

> 「一番お世話になっている運送会社を教えて欲しい」と頼まれました。過去最も多くのOrderが紐づいたShipperを特定してみてください

### 回答

- `WHERE`を使用

```sql
SELECT
  max(OrdersByShipperID.NumOfOrders) AS MaxNumOfOrders,
  OrdersByShipperID.ShipperID
FROM
  (
    SELECT
      count(OrderID) AS NumOfOrders,
      ShipperID
    FROM
      Orders
    GROUP BY
      ShipperID
  ) AS OrdersByShipperID;
```

- `ORDER BY`と`LIMIT`を使用

```sql
SELECT
  count(OrderID) AS NumOfOrders,
  ShipperID
FROM
  Orders
GROUP BY
  ShipperID
ORDER BY
  NumOfOrders DESC
LIMIT
  1;
```

## 質問4

> 「重要な市場を把握したい」と頼まれました。売上が高い順番にCountryを並べてみましょう

### 回答

- 売上 = Products.Price * OrderDetails.Quantity
- 要件にはないが、回答例に習ってROUND関数で四捨五入している

```sql
SELECT
  Country,
  ROUND(sum(SalesByOrders)) AS SalesByCountry
FROM
  Customers
  LEFT JOIN (
    SELECT
      CustomerID,
      SalesByOrders.SalesByOrders
    FROM
      Orders
      LEFT JOIN (
        SELECT
          (OrderDetails.Quantity * Products.Price) AS SalesByOrders,
          OrderDetailID,
          OrderID
        FROM
          OrderDetails
          LEFT JOIN Products ON OrderDetails.ProductID = Products.ProductID
      ) AS SalesByOrders ON Orders.OrderID = SalesByOrders.OrderID
  ) AS SalesByCustomers ON Customers.CustomerID = SalesByCustomers.CustomerID
GROUP BY
  Country
ORDER BY
  SalesByCountry DESC;
```

## 質問5

> 国ごとの売上を年毎に（1月1日~12月31日の間隔で）集計してください

### 回答

```sql
SELECT
  Country,
  ROUND(sum(SalesByOrders)) AS SalesByCountryAndOrderYear,
  strftime('%Y', OrderDate) AS OrderYear
FROM
  Customers
  LEFT JOIN (
    SELECT
      CustomerID,
      SalesByOrders.SalesByOrders,
      SalesByOrders.OrderID,
      OrderDate,
      OrderDetailID
    FROM
      Orders
      LEFT JOIN (
        SELECT
          (OrderDetails.Quantity * Products.Price) AS SalesByOrders,
          OrderDetailID,
          OrderID
        FROM
          OrderDetails
          LEFT JOIN Products ON OrderDetails.ProductID = Products.ProductID
      ) AS SalesByOrders ON Orders.OrderID = SalesByOrders.OrderID
  ) AS SalesByCustomers ON Customers.CustomerID = SalesByCustomers.CustomerID
WHERE
  OrderYear IS NOT NULL
GROUP BY
  Country,
  OrderYear;
```

## 質問6

> 「社内の福利厚生の規定が変わったので、年齢が一定以下の社員には、それとわかるようにフラグを立てて欲しい」と頼まれました
> Employeesテーブルに「Junior（若手）」カラム（boolean）を追加して、若手に分類されるEmployeesレコードの場合はtrueにしてください
> Juniorの定義：誕生日が1960年より後のEmployeeの場合は値をTRUEにする更新クエリを作成してください

### 回答

```sql
SELECT
  *,
  CASE
    WHEN BirthDate > date('1960-12-31') THEN 0
    ELSE 1
  END AS Junior
FROM
  Employees;
```

## 質問7

> 「長くお世話になった運送会社には運送コストを多く払うことになったので、たくさん運送をお願いしている業者を特定して欲しい」と頼まれました
> 「long_relation」カラム（boolean）をShippersテーブルに追加してください
long_relationがtrueになるべきShipperレコードを特定して、long_relationをtrueにしてください
> long_relationの定義：これまでに70回以上、Orderに関わったShipper（つまり発注を受けて運搬作業を実施した運送会社）

### 回答

```sql
SELECT
  Shippers.ShipperID,
  ShipperName,
  Phone,
  CASE
    WHEN NumOfOrders >= 70 THEN 0
    ELSE 1
  END AS long_relation
FROM
  Shippers
  LEFT JOIN (
    SELECT
      count(OrderID) AS NumOfOrders,
      ShipperID
    FROM
      Orders
    GROUP BY
      ShipperID
  ) AS NumOfOrdersByShippers ON Shippers.ShipperID = NumOfOrdersByShippers.ShipperID;
```

## 質問8

> 「それぞれのEmployeeが最後に担当したOrderと、その日付を取得してほしい」と頼まれました
> OrderID, EmployeeID, 最も新しいOrderDate
> 上記のような情報が得られるクエリを描いてください

### 回答

```sql
SELECT
  Employees.EmployeeID,
  max(OrderDate) AS LastOrderDate
FROM
  Orders
  LEFT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
GROUP BY
  Employees.EmployeeID;
```

## 質問9

> Customerテーブルで任意の１レコードのCustomerNameをNULLにしてください
> CustomerNameが存在するユーザを取得するクエリを作成してください
> CustomerNameが存在しない（NULLの）ユーザを取得するクエリを書いてください
> もしかすると、CustomerNameが存在しないユーザーを取得するクエリを、このように書いた方がいるかもしれません
```sql
SELECT * FROM Customers WHERE CustomerName = NULL;
```
> しかし残念ながら、これでは期待した結果は得られません。なぜでしょうか？

### 回答

- NULLに更新するクエリ
  - CustomerIDが10以下のCustomerNameをNULLに更新
  
```sql
UPDATE
  Customers
SET
  CustomerName = NULL
WHERE
  CustomerID <= 10;
```

- CustomerNameが存在しない（NULLの）ユーザを取得するクエリ

```sql
SELECT
  *
FROM
  Customers
WHERE
  CustomerName IS NULL;
```

- `SELECT * FROM Customers WHERE CustomerName = NULL;`と書いても、想定のユーザが取得できない理由
  - mysqlでは、`<=>`「NULL安全等価演算子」以外の演算子を使用した比較を行なった場合、なんの値と比較してもNULLとなってしまうため
  - mysqlでは、`<=>`「NULL安全等価演算子」が用意されており、これを使用してNULL判定を行うことが可能（`IS NULL`演算子を使用しても同様の結果が取得可能）

```sql
mysql> select NULL = 2, NULL = NULL, NULL <> NULL, NULL != 3;
+----------+-------------+--------------+-----------+
| NULL = 2 | NULL = NULL | NULL <> NULL | NULL != 3 |
+----------+-------------+--------------+-----------+
|     NULL |        NULL |         NULL |      NULL |
+----------+-------------+--------------+-----------+
1 row in set (0.00 sec)

mysql> select * from person;
+----+-----------+------+---------------------+
| id | name      | age  | created_at          |
+----+-----------+------+---------------------+
|  1 | 美佳      |  100 | 2020-08-19 21:07:31 |
|  2 | ともか    |   27 | 2021-03-27 12:59:58 |
|  3 | NULL      |   30 | 2021-03-27 13:00:13 |
+----+-----------+------+---------------------+
3 rows in set (0.00 sec)

mysql> select * from person where name <=> null;
+----+------+------+---------------------+
| id | name | age  | created_at          |
+----+------+------+---------------------+
|  3 | NULL |   30 | 2021-03-27 13:00:13 |
+----+------+------+---------------------+
1 row in set (0.00 sec)

mysql> select * from person where name = null;
Empty set (0.00 sec)
```

## 質問10

> EmployeeId=1の従業員のレコードを、Employeeテーブルから削除してください
> OrdersとEmployeesをJOINして、注文と担当者を取得してください。

> その際：

> （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリを書いてください

> （削除された）EmloyeeId=1が担当したOrdersを表示する（Employeesに関する情報はNULLで埋まる）クエリを書いてください

### 回答

- EmployeeId=1の従業員のレコードを、Employeeテーブルから削除

```sql
DELETE FROM
  Employees
WHERE
  EmployeeID = 1;
```

- OrdersとEmployeesをJOINして、注文と担当者を取得
  - （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリ

```sql
SELECT
  *
FROM
  Employees
  LEFT JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID;
```

- OrdersとEmployeesをJOINして、注文と担当者を取得
  - （削除された）EmloyeeId=1が担当したOrdersを表示する（Employeesに関する情報はNULLで埋まる）クエリ

```sql
SELECT
  *
FROM
  Orders
  LEFT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID;
```

## 参考

- サブクエリを使ってしまいがち。サブクエリは遅いことが多いらしいので、JOINを使うようにしたいが。。

- [w3schools](https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all)
- [日付と時刻を取得する(date関数, time関数, datetime関数, julianday関数, strftime関数)](https://www.dbonline.jp/sqlite/function/index6.html)
- [SQL 複数の行をまとめる(集約関数/group by/having)](https://itsakura.com/sql-groupby-having)
- [CASE式で条件分岐をSQL文に任せる](https://qiita.com/sfp_waterwalker/items/acc7f95f6ab5aa5412f3)
- [MySQL 5.6 12.3.2 比較関数と演算子](https://dev.mysql.com/doc/refman/5.6/ja/comparison-operators.html)
- [比較演算子の使い方](https://www.dbonline.jp/mysql/ini/index7.html)