# 課題1

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

> リマインダーアプリ[Penpen](https://penpen.netlify.app/)のデータベース設計を行いましょう

### 回答

![](../../assets/../../assets/Penpen.png)

検討用のメモは[こちら](https://docs.google.com/spreadsheets/d/1VY8wkXNHNpTPu-Bk3SVmADeX53uuP2y5sYRT9e5X5-8/edit?usp=sharing)

- 考慮していない点
  - 送信頻度に対して、リマインド設定者が設定可能な変数は1つのみとしている。2つ以上変数が存在する場合、送信頻度変数のカラムがもう1つ必要になるため、その場合はリマインドテーブルのテーブル定義変更を行う必要がある。
