# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題2](#課題2)
  - [Table of Contents](#table-of-contents)
  - [Dirty Read](#dirty-read)
  - [Non-repeatable read](#non-repeatable-read)
  - [Phantom read](#phantom-read)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Dirty Read

- 

## Non-repeatable read

- テーブルの内容を複数回読み取る場合に、その間に他の人がUPDATE文によりデータを書き換えたことがによって、次回のデータの読み取り結果が異なってしまうこと

## Phantom read

- テーブルの内容を複数回読み取る場合に、その間に他の人がINSERT文によりデータを書き換えたことがによって、次回のデータの読み取り結果が異なってしまうこと