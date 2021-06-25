# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> Issueテーブルの設計を見直して、NULLを含まないように作り替えてください。

変更前

```sql
TABLE Issue {
id: varchar NOT NULL
text: varchar NOT NULL
assigned_to_id: varchar -- NULLになり得る
}
```

### 回答

- 以下の2つの方法を考えた
  - ①Issueテーブルを以下のように作り替える（NOT NULL制約をつけ、デフォルト値として空文字を格納する）
    - ALTER TABLEすることは想定しておらず、初めからこのDDLを実行することを想定する
    - また、元のDDLはMySQLの文法にはなっていないので、MySQLで実行可能になるように作り替える

    ```sql
    CREATE TABLE Issue (
    id varchar(10) NOT NULL,
    text varchar(10) NOT NULL,
    assigned_to_id varchar(10) NOT NULL default '0'
    );
    ```
  
  - ②Issueテーブルから`assigned_to_id`カラムの定義を削除し、issueに対する紐付けを表すテーブルを作成する（assigneeが割り当てられていなければ、IssueRelationテーブルへのINSERTが発生しないようにすれば、assigned_to_idのカラムの値がNULLになることもない）
    - 今回の場合はカラム数も多くないので、わざわざ別テーブルを作成せずに、①の方法を適用するのが良さそう。。

```sql
CREATE TABLE Issue (
id varchar(10) NOT NULL,
text varchar(10) NOT NULL
);

CREATE TABLE IssueRelation (
id varchar(10) NOT NULL,
issue_id varchar(10) NOT NULL,
assigned_to_id varchar(10) NOT NULL
);
```
