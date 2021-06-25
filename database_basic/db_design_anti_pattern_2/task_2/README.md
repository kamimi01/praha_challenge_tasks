# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [質問1](#%E8%B3%AA%E5%95%8F1)
  - [回答](#%E5%9B%9E%E7%AD%94)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問1

> どのようにテーブル設計を見直すことができるでしょうか？

### 回答

- PostとTagを紐付ける従属テーブル（Tagging）を作成する
  - Taggingテーブルにはサロゲートキーを準備する。
  - post_idとtag_idの組み合わせが一意となるように、UNIQUE制約を付与する


![](../../../assets/anti2_after.png)

## 参考

- [UNIQUE制約(ユニーク制約を設定する)](https://www.dbonline.jp/mysql/table/index9.html)