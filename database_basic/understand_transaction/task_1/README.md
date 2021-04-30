# 課題 1

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問 1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [質問 2](#%E8%B3%AA%E5%95%8F2)
  - [回答](#%E5%9B%9E%E7%AD%94-1)
- [質問 3](#%E8%B3%AA%E5%95%8F3)
  - [回答](#%E5%9B%9E%E7%AD%94-2)
- [質問 4](#%E8%B3%AA%E5%95%8F4)
  - [回答](#%E5%9B%9E%E7%AD%94-3)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問 1

> デッドロックとは

### 回答

- デックロックとは
  - データベースで同時に複数のトランザクションが実行される場合に、起こる可能性がある。
  - テーブル A のロックを取得したトランザクション 1 が、次にテーブル B のロックも取得しようとしている。その一方でテーブル B のロックを取得してトランザクション 2 がテーブル A のロックを取得しようとしている状態。お互いがそれぞれ次にロックを取得したいテーブルのロックの解除を待機する状態になり、トランザクションの処理が止まってしまう。
  - DBMS は、自動的にデッドロック状態を検出し、デッドロック状態から抜け出すための仕組みが用意されている
    - MySQL においては、自動的にデッドロック状態を検出し、影響があるいずれかのトランザクションをロールバックする。デッドロックは複数のスレッドが同じロックの取得を待機している状態なため、処理遅延の要因となる。
  - デッドロックの予防法
    - トランザクション時間を短くする
      - ロックしている時間が短いほど他のトランザクションと競合する確率は低くなる。
    - 同じ順番でロックする
      - デッドロックは相手と異なる順番でロックを行おうとする場合に発生するため。

![](https://cloudear.jp/blog/wp-content/uploads/2015/07/deadlock2.png)

## 質問 2

> それぞれの ISOLATION LEVEL について説明してみてください。それぞれの差分、それによってどんな問題が生じる可能性があるでしょうか？

### 回答

- ISOLATION LEVEL とは
  -

## 質問 3

> 行レベルのロック、テーブルレベルのロックの違いは何か

### 回答

- 一般的なロックの種類や厳しさに関して

| ロックの種類       | 概要                               | 備考 |
| ------------------ | ---------------------------------- | ---- |
| 行ロック           | ある特定の 1 行のみをロックする    |      |
| テーブルロック     | ある特定のテーブル全体をロックする |      |
| データベースロック | データベース全体をロックする       |      |

| ロックの厳しさ           | 概要                                                                 | 備考                                                                  |
| ------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 共有ロック               | 他のトランザクションからのデータの参照は可能だが、更新は不可能。<br> | 通常、SELECT 文で選択した行には自動的に共有ロックがかかる。           |
| 排他ロック（占有ロック） | 他のトランザクションからのデータの参照も更新も不可能。               | `SELECT~FOR UPDATE（NOWAIT）`文を実行する場合は、排他ロックがかかる。 |

- MySQL における行ロックとテーブルロック
  - 行ロックのメリット
    - 異なるセッションが異なる行にアクセスする場合、ロックの競合が少なくなる
    - ロールバックする変更が少なくなる
    - 1 つの行を長時間ロックできる
  - テーブルロックのメリット
    - 必要なメモリが比較的少なくなる
    - 単一のロックだけが必要なため、テーブルの大部分に対して使用する場合には高速
    - データの大部分に対して GROUP BY を頻繁に実行する場合や、テーブル全体を頻繁にスキャンする必要がある場合に高速

## 質問 4

> 悲観ロックと楽観ロックの違いは何か

### 回答

## トランザクションに関する整理

### DBMS によるトランザクション制御1

- まずトランザクションとは

  - １つ以上の SQL 文の塊を１つのかたまりとして扱うことができ、その単位をトランザクションと呼ぶ。
  - トランザクションは、一部だけが実行されることはなく、途中で分割不可能なものとして取り扱われる

- **DBMS は、トランザクションい含まれる全ての SQL 文について、必ず「全ての実行が完了している」または「１つも実行されていない」のどちらかの状態になるように制御する**

- コミットとロールバック
  - 上記の状態になるよう制御するための仕組み。
  - コミット
    - トランザクションが終了する際に、トランザクション中の SQL 文によって行われた処理を確定すること
    - 多くの DBMS では、自動コミットモードがオンの状態で動作するため、1 つのクエリが十国されるたびに自動でコミットを実行する。アプリケーションの実装でオフにすることが可能。（下記に Java のコードあり）MySQLでは`SET AUTOCOMMIT=0;`を実行することでオフにもできる。
  - ロールバック
    - トランザクションの途中で処理が中断された場合に、DBMS はそれまでに行った全ての書き換えをキャンセルし、なかったことにする。
  - 例えば複数の SQL を実行する場合に、途中で処理が中断してしまうと困るケース

```sql
BEGIN; -- トランザクションの開始指示
-- 処理1
INSERT INTO~ -- クエリ
SELECT * FROM~ -- クエリ
-- 処理2
DELETE FROM~ -- クエリ
COMMIT; -- トランザクションの終了指示
```

```sql
ROLLBACK -- ロールバック
```

```java
package com.example.mynavi.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SqlTransact {
  public static void main(String[] args) {
    try (Connection db = DriverManager.getConnection(
        "jdbc:mysql:⁄⁄localhost/sample?serverTimezone=JST&useUnicode=true&characterEncoding=UTF-8&useSSL=true", "root", "12345")) {
      // 自動コミットモードをオフ
      db.setAutoCommit(false);
      try(PreparedStatement ps1 = db.prepareStatement(
          "INSERT INTO members (id, nam, sex, age) VALUES (?, ?, ?, ?)");
        PreparedStatement ps2 = db.prepareStatement(
          "INSERT INTO members (id, nam, sex, age) VALUES (?, ?, ?, ?)");) {
        ps1.setString(1, "2016003");
        ps1.setString(2, "田中春香");
        ps1.setString(3, "女");
        ps1.setInt(4, 28);
        ps1.executeUpdate();
        ps2.setString(1, "2016003");
        ps2.setString(2, "和田和也");
        ps2.setString(3, "男");
        ps2.setInt(4, 34);
        ps2.executeUpdate();
        // コミット
        db.commit();
      } catch (SQLException e) {
        // SQLExceptionが発生した場合はロールバック
        db.rollback();
        System.out.println("処理エラー：" + e.getMessage());
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

### DBMS によるトランザクション制御2

## 参考

- スッキリわかるSQL入門（書籍）
- [共有ロック、占有ロック、そしてデッドロックの仕組みを学ぼう！](https://itmanabi.com/exclusive-lock/)
- [MySQL8.0 8.11.1 内部ロック方法](https://dev.mysql.com/doc/refman/8.0/ja/internal-locking.html)
- [setAutoCommit／commit／rollbackメソッド](https://java-code.jp/967)