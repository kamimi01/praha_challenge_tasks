# 課題3

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- MySQL8.0以降では、ロックに関して`NOWAIT`と`SKIP LOCKED`の機能が新たに追加されました。
  - この2つがどんな機能か調べてみましょう。

<details><summary>想定回答</summary>

- まず、どちらの機能もロックのレベルは、行ロックとなる。
  
- `NOWAIT`
  - 通常はロックがかかっている場合は解除されるまで待機するが、これが指定されている場合は、クエリがすぐに実行され、リクエストされた行がロックされている場合はエラーが返る
  - 処理を待たせたくないアプリケーションの場合に有効。

- `SKIP LOCKED`
  - クエリはすぐに実行され、ロックされた行に関しては結果に含まれない
  - そのため、このオプションを使用した場合、一貫性のないデータが返却されることになる。公式では、コレは一般的なトランザクション処理では非推奨とされている。

- 参考
  - [MySQL8.0 15.7.2.4 読取りのロック](https://dev.mysql.com/doc/refman/8.0/ja/innodb-locking-reads.html)

</details>

## クイズ2

- MySQLでは、行ロックが解除されるまでInnoDBが待機する時間を定義するシステム変数が存在します。その変数はなんでしょうか？

<details><summary>想定回答</summary>

- `innodb_lock_wait_timeout`
  - この変数で指定されている秒数待機し、ロックが解除されない場合は以下のエラーを発行する

```sql
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```
- また、この変数は行ロックの場合に有効であり、テーブルロックには適用されない。

- 参考
  - [MySQL8.0 15.14 InnoDB の起動オプションおよびシステム変数](https://dev.mysql.com/doc/refman/8.0/ja/innodb-parameters.html#sysvar_innodb_lock_wait_timeout)

</details>