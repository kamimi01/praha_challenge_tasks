# 課題2

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

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