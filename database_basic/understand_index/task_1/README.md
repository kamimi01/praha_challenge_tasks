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
- [インデックスに関する整理](#%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%95%B4%E7%90%86)
  - [インデックスの特徴](#%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AE%E7%89%B9%E5%BE%B4)
  - [インデックスの設定効果が高い列](#%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AE%E8%A8%AD%E5%AE%9A%E5%8A%B9%E6%9E%9C%E3%81%8C%E9%AB%98%E3%81%84%E5%88%97)
  - [インデックス作成によるデメリット](#%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E4%BD%9C%E6%88%90%E3%81%AB%E3%82%88%E3%82%8B%E3%83%87%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88)
  - [MySQLにおけるインデックスの種類](#mysql%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%82%A4%E3%83%B3%E3%83%87%E3%83%83%E3%82%AF%E3%82%B9%E3%81%AE%E7%A8%AE%E9%A1%9E)
  - [スロークエリログについて](#%E3%82%B9%E3%83%AD%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%AD%E3%82%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> インデックスの仕組みを、プログラミング歴1ヶ月のエンジニアにも伝わるよう、わかりやすく説明してください

### 回答

- インデックスの仕組み
  - インデックスとは、データベースで動く仕組みである。
  データベースには多様なデータが保存されているため、自分が欲しいデータだけを取り出すために検索を行う必要がある。インデックスとは、その検索をより速く行うための仕組みである。
  - 例えば、国語辞典から「データベース」という単語の意味を調べる時、1ページ目から調べていたのでは、かなりの時間を要することが想像に難くない。だが、後ろに付随している索引を用いると、より速く目的のページにたどり着くことができる。
  - インデックスはそれと同様で、予め検索される可能性がある列名を索引（つまりインデックス）に登録しておくことで、データベース内での検索を高速にする仕組みである。

## 質問2

> 手当たり次第にSELECTのクエリにインデックスを貼る際に、「slow query log」を調べたか聞かれましたが、なぜ調べる必要があるでしょうか？

### 回答

- インデックスは作成したからといって、必ずしも実行時間の短縮に繋がるとは限らない。
- 効果を調査するために、インデックスを使用したクエリを対象とし、ある閾値を超えた場合のクエリを記録するログ（スロークエリログ）を調査する必要がある
  - 詳細は、[スロークエリログについて](#スロークエリログについて)を参照

## 質問3

> カーディナリティとはなんでしょうか？

### 回答

- カラムに格納されているデータの種類がどのくらいあるかを示した値（インデックスのユニークな値の多さを表した指数）
  - カーディナリティが低いとインデックスの効果が少ないため、カーディナリティが高い列に作成することが望ましい
    - 効果が低い理由
      - 例えば、フラグのように0または1のみの値しか存在しない（=カーディナリティが2）カラムにインデックスが貼られていた場合
        - インデックスが使用されていても、半分までしか絞り込むことができない
        - インデックスを経由することによるオーバーヘッドが無視できない
      - ただし、分布が偏っている場合は、カーディナリティが低くても効果がある場合もある
  - カーディナリティが高いデータの例
    - AUTO_INCREMENT、住所、更新日時
  - カーディナリティが低いデータの例
    - フラグ、カテゴリ、都道府県

- 以下は、`departments`テーブルにDockerイメージプル時から設定されていたインデックス

```sql
mysql> show index from departments\G
*************************** 1. row ***************************
        Table: departments
   Non_unique: 0
     Key_name: PRIMARY
 Seq_in_index: 1
  Column_name: dept_no
    Collation: A
  Cardinality: 9
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
*************************** 2. row ***************************
        Table: departments
   Non_unique: 0
     Key_name: dept_name
 Seq_in_index: 1
  Column_name: dept_name
    Collation: A
  Cardinality: 9
     Sub_part: NULL
       Packed: NULL
         Null:
   Index_type: BTREE
      Comment:
Index_comment:
2 rows in set (0.00 sec)
```

## 質問4

> カバリングインデックスとは何か？

### 回答

- クエリによって取得された全てのカラムを含むインデックス。完全なテーブル行を見つけるためのポインタとしてインデックス値を使用する代わりに、クエリはインデックス構造から値を返し、ディスクI/Oを節約する（MySQL公式より）

- 例えば、以下のようなクエリがあった場合
  - xとyの両方にインデックスを作成した場合は、カバリングインデックスとなる
  - PostgreSQLなどでは、Index-only-scanとも呼ばれる
  
  ```sql
  SELECT x, y FROM TEST1 WHERE x = 3 and y = 3 ;
  ```

## インデックスに関する整理

### インデックスの特徴

- インデックスは、指定した列に対して作られる
- インデックスが存在する列に対して検索が行われた場合、DBMSは自動的にインデックスの使用を試みるため、高速になることが多い
- インデックスには名前をつけなければならない

### インデックスの設定効果が高い列

- 以下の句に頻繁に登場する列
  - `WHERE`句
  - `ORDER BY`句
  - `JOIN`の結合条件に使われる

### インデックス作成によるデメリット

- 索引情報を保存するために、ディスク容量を消費する
- テーブルのデータが変更されると、インデックスも書き換える必要があるため、INSERT文、UPDATE文、DELETE文のオーバーヘッドが増える

### MySQLにおけるインデックスの種類

|種類|概要|備考|
|------------|---------------|----------|
|PRIMARY |主キーに対して、関連づけられるインデックス||
|UNIQUE  |ユニークキー、外部キー用のインデックス||
|INDEX   |一般的なインデックス||
|FULLTEXT|全文検索用のインデックス||
|SPATIAL |空間データ用のインデックス||

### スロークエリログについて

- スロークエリログとは
  - 実行に要した時間が、`long_query_time`秒を超え、少なくとも`min_examined_row_limit`行を走査する必要があったSQLステートメントで構成される
  - ログファイルを出力する（=ファイルI/Oが発生する）ため、MySQLのパフォーマンス低下につながる可能性がある。そのため、システム改善が終了したら、ログ出力を停止するなどの運用ルールを決めることが望ましい
  - デフォルトでは、スロークエリログは無効
  - デフォルトでは、以下のクエリはログに記録されない
    - 管理ステートメント
      - `log_slow_admin_statements`を使用して変更可能
    - インデックスを使用しないクエリ
      - `log_queries_not_using_indexes`を使用して変更可能
  - 各種設定値

  |設定値|概要|備考|
  |------------------------|-------------------------------|-----------------|
  |`slow_query_log`        |スロークエリログの出力のオンオフ（無効：`0`、有効：`1`）||
  |`slow_query_log_file`   |スロークエリログのログファイル名|スロークエリーログファイルの名前を指定しない場合、デフォルト名は`host_name-slow.log`|
  |`slow_launch_time`      |スレッドを作成する時間が指定の値の秒数よりも長くかかると、サーバーは`Slow_launch_threads`ステータス変数を増やす||
  |`log_slow_admin_statements`|管理ステートメントをスロークエリログに含めるか否かのオンオフ（デフォルトではオフ）||
  |`log_queries_not_using_indexes`|インデックスを使用しないクエリをスロークエリログに含めるか否かのオンオフ（デフォルトではオフ）||
  |`long_query_time`       |指定した値以上の実行時間がかかっている場合に、スロークエリログに記録する||
  |`min_examined_row_limit`|テーブルから読みこんだクエリの行が指定した値以上だった場合に、スロークエリログに記録する||

- `mysqldumpssloq`とは
  - スロークエリログの調査を簡単にするためにログに表示されたクエリを要約することができる
  - 使用例

  ```sql
  mysqldumpslow [options] [log_file ...]
  ```

## 参考

- [MySQL 5.6 8.3.1 MySQL のインデックスの使用の仕組み](https://dev.mysql.com/doc/refman/5.6/ja/mysql-indexes.html)
- [MySQLのインデックス作成方法　効いてないと思ったらexplainで確認する](https://style.potepan.com/articles/17616.html)
- [MySQL 5.6 11.5 空間データの拡張](https://dev.mysql.com/doc/refman/5.6/ja/spatial-extensions.html)
- [MySQL 5.6 5.2.5 スロークエリーログ](https://dev.mysql.com/doc/refman/5.6/ja/slow-query-log.html)
- [漢のコンピュータ MySQL 5.1のスロークエリログ](http://nippondanji.blogspot.com/2009/01/mysql-51.html)
- [MySQL 5.6 5.1.4 サーバーシステム変数](https://dev.mysql.com/doc/refman/5.6/ja/server-system-variables.html#sysvar_slow_launch_time)
- [MySQLチューニングの基本「スロークエリログ」を知ろう！](https://weblabo.oscasierra.net/mysql-slow-query-log-1/#:~:text=%E3%82%B9%E3%83%AD%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%AD%E3%82%B0%E3%82%92%E5%87%BA%E5%8A%9B%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88%E3%81%AE%E3%83%87%E3%83%A1%E3%83%AA%E3%83%83%E3%83%88%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AF,%E3%81%AF%E3%81%8C%E4%BD%8E%E4%B8%8B%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)
- [MySQL 5.6 4.6.9 mysqldumpslow — スロークエリーログファイルの要約](https://dev.mysql.com/doc/refman/5.6/ja/mysqldumpslow.html)
- [ヤフー社内でやってるMySQLチューニングセミナー大公開](https://www.slideshare.net/techblogyahoo/mysql-58540246)→かなり参考になる
- [カーディナリティについてまとめてみた](https://qiita.com/soyanchu/items/034be19a2e3cb87b2efb)
- [パフォーマンスを考慮したIndex定義設計](https://www.techscore.com/blog/2019/12/25/performance_index/)
- [MySQL 5.6 MySQL 用語集　カバリングインデックス](https://dev.mysql.com/doc/refman/5.6/ja/glossary.html#glos_covering_index)
- [MySQL Index勉強会外部公開用](https://www.slideshare.net/crooz_techblog/mysql-index-26016127)