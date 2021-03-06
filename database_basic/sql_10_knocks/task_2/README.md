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
- [DBMSに関する整理](#dbms%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%95%B4%E7%90%86)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> GROUP BYした上で絞り込みを行う際「WHERE」と「HAVING」二つのクエリを使えますが、それぞれの違いを教えてください。どのような時にどちらを使うべきでしょうか？

### 回答

- `HAVING`句は、`GROUP BY`で指定した列を基準にグループ化し、集計結果が揃った後に実行されるため、集計結果後の結果に対して絞り込みを行いたい場合に使用する
- `WHERE`句は、集計結果前に絞り込みを行いたい場合（つまり元の表に対して絞り込みを行いたい場合）に使用する

## 質問2

> SQLの文脈においてDDL、DML、DCL、TCLとは何でしょうか？それぞれ説明してください

### 回答

|単語|概要|命令|
|--------|--------------------------|-------------------|
|DDL（Data Definition Language）    |データ捜査言語 <br> ・データの格納や取り出し、更新、削除などの命令|SELECT <br> INSER <br> UPDATE <br> DELETE <br> EXPLAIN <br> LOCK TABLE|
|DML（Data Manipulation Language）  |データ定義言語 <br> ・テーブルなどの作成や削除、各種設定などの命令|CREATE <br> ALTER <br> DROP <br> TRUNCATE|
|DCL（Data Control Language）       |トランザクション制御言語 <br> ・トランザクションの開始や終了の命令|COMMIT <br> ROLLBACK <br> SET TRANSACTION <br> SAVEPOINT|
|TCL（Transaction Control Language）|データ制御言語 <br> ・DMLやDDLの利用に関する許可や禁止を設定する命令|GRANT <br> REVOKE|

## DBMSに関する整理

- DBMSによるトランザクション制御
  - 1. トランザクションに含まれる全てのSQL文について、必ず「全ての実行が完了してる」か「1つも実行されていない」のどちらかの状態になるように制御する
    - トランザクションを使うための指示 
      - `BEGIN`
      - `COMMIT`
      - `ROLLBACK`
    - MySQLにおいては、自動コミットがデフォルトで有効なため、ステートメントを実行するとすぐにコミットされる。そのためこの場合はロールバックができない
      - [MySQL 5.6 13.3.1 START TRANSACTION、COMMIT、および ROLLBACK 構文](https://dev.mysql.com/doc/refman/5.6/ja/commit.html)
  - 2. あるトランザクションを実行する際、他のトランザクションから影響を受けないよう、分離して実行する。つまり仮に他のトランザクションと同時に実行していたとしても、あたかも単独で実行しているのと同じ結果となるように制御する
    - 同時実行による副作用
      - 1. ダーティリード
      - 2. 反服不能読み取り
      - 3. ファントムリード
    - トランザクション分離レベルの指定
      - `SET TRANSACTION ISOLATION LEVEL <分離レベル名>`
      - `SET CURRENT ISOLATION <分離レベル名>`
      - その他
        - `MVVC`（並行実行制御）について
          - Oracle DBやPostgreSQLには、分離レベルとしてREAD UNCOMMITEDが存在しない。DBの機構上、常にコミットされていない情報は読み込めないようになっており、あるトランザクションによるデータ書き換えの最中も書き換え前の情報を残していて、他のトランザクションから利用可能なため、ロックせずともダーティリードが発生しないため。

## 参考

- 「スッキリわかるSQL入門」（書籍）
- [SQL記述者全員が理解すべきSELECT文の論理的な処理順序のお話](https://qiita.com/k_0120/items/a27ea1fc3b9bddc77fa1)