# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## 質問1

> SQLクエリで以下の式を実行した時の結果を答えてください。

### 回答

- NULL = 0
  - NULLと0が等しいかどうか

```sql
mysql> select null = 0;
+----------+
| null = 0 |
+----------+
|     NULL |
+----------+
1 row in set (0.00 sec)
```

- NULL = NULL
  - NULLとNULLが等しいかどうか

```sql
mysql> select null = null;
+-------------+
| null = null |
+-------------+
|        NULL |
+-------------+
1 row in set (0.01 sec)
```

- NULL <> NULL
  - NULLとNULLが等しくないか

```sql
mysql> select NULL <> NULL;
+--------------+
| NULL <> NULL |
+--------------+
|         NULL |
+--------------+
1 row in set (0.00 sec)
```

- ここまでのSQLクエリの実行結果は、全てNULLとなっている
  - SQLでは、NULL値はNULLを含む他の値との比較でtrueになることはない。（**`<=>`演算子を使用した比較を除く**）そのためNULLを含むしきは、式に関連する演算子及び関数のドキュメントに示されている場合を除き、常にNULL値を生成する。
  - NULL値を検索するには、IS NULLテストを使用する必要がある。

- 3値論理について
  - SQLの条件式の結果には以下の3つが存在する
    - TRUE（真）
    - FALSE（偽）
    - UNKNOWN（不明、計算不能）
  - =や<>などの比較演算子は、元々値と値を比較するもののため、「値ではないNULL」を比較すると、不明な結果であるUNKNOWNになる
  - WHERE句による絞り込みは、条件式がTRUE（真）となる行だけが選ばれる。そのため、条件式がFALSE（偽）やUNKNOWNとなる行は処理対象にならない。

- NULL AND TRUE

```sql
mysql> select NULL AND TRUE;
+---------------+
| NULL AND TRUE |
+---------------+
|          NULL |
+---------------+
1 row in set (0.00 sec)
```

- NULL AND FALSE

```sql
mysql> select NULL AND FALSE;
+----------------+
| NULL AND FALSE |
+----------------+
|              0 |
+----------------+
1 row in set (0.00 sec)
```

- NULL OR TRUE

```sql
mysql> select NULL OR TRUE;
+--------------+
| NULL OR TRUE |
+--------------+
|            1 |
+--------------+
1 row in set (0.00 sec)
```

- （疑問）結果は取得したものの、後半3つに関しては、何を確かめればいいのか、確かめてどんな意味があるのか理解できなかった。。。

## 参考

- [MySQL5.6 12.3.2 比較関数と演算子](https://dev.mysql.com/doc/refman/5.6/ja/comparison-operators.html)
- [MySQL5.6 B.5.5.3 NULL 値に関する問題](https://dev.mysql.com/doc/refman/5.6/ja/problems-with-null.html)
- [比較演算子の使い方](https://www.dbonline.jp/mysql/ini/index7.html)