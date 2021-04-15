# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [スロークエリログを扱いやすくする](#%E3%82%B9%E3%83%AD%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%AD%E3%82%B0%E3%82%92%E6%89%B1%E3%81%84%E3%82%84%E3%81%99%E3%81%8F%E3%81%99%E3%82%8B)
  - [mysqldumpslowコマンド](#mysqldumpslow%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [課題3](#%E8%AA%B2%E9%A1%8C3)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## スロークエリログを扱いやすくする

### mysqldumpslowコマンド

- 以下の条件を満たすコマンドを実行する

  - 最も頻度高くスロークエリに現れるクエリ
    - `-s`：出力のソート方法
      - `c`：カウントでソート
    ```bash
    # mysqldumpslow -s c -t 1 0771bb71246a-slow.log

    Reading mysql slow query log from 0771bb71246a-slow.log
    Count: 4  Time=3.55s (14s)  Lock=0.00s (0s)  Rows=300024.0 (1200096), root[root]@localhost
      select sum(salary) from salaries group by emp_no
    ```

  - 実行時間が最も長いクエリ
    - `-s`：出力のソート方法
      - `t`、`at`：クエリー時間または平均クエリー時間でソート
    ```bash
    # mysqldumpslow -s t -t 1 0771bb71246a-slow.log

    Reading mysql slow query log from 0771bb71246a-slow.log
    Count: 4  Time=3.55s (14s)  Lock=0.00s (0s)  Rows=300024.0 (1200096), root[root]@localhost
      select sum(salary) from salaries group by emp_no
    ```

  - ロック時間が最も長いクエリ
    - `-s`：出力のソート方法
      - `l`、`al`：ロック時間または平均ロック時間でソート
    ```bash
    # mysqldumpslow -s l -t 1 0771bb71246a-slow.log

    Reading mysql slow query log from 0771bb71246a-slow.log
    Count: 4  Time=3.55s (14s)  Lock=0.00s (0s)  Rows=300024.0 (1200096), root[root]@localhost
      select sum(salary) from salaries group by emp_no
    ```

## 課題3

- 課題2で作成したクエリはどれも主キーに対して既にインデックスが貼られており、インデックス作成の余地がないため、「インデックスを理解する」の課題1で代替させてください。。（今回の課題と全く同じことを行っています。）

## 参考

- [MySQL5.6 4.6.9 mysqldumpslow — スロークエリーログファイルの要約](https://dev.mysql.com/doc/refman/5.6/ja/mysqldumpslow.html)