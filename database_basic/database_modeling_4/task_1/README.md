# 課題1

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

> リマインダーアプリ[Penpen](https://penpen.netlify.app/)のデータベース設計を行いましょう

### 回答

![](../../assets/../../assets/Penpen.png)

検討用のメモは[こちら](https://docs.google.com/spreadsheets/d/1VY8wkXNHNpTPu-Bk3SVmADeX53uuP2y5sYRT9e5X5-8/edit?usp=sharing)

- 考慮していない点
  - 送信頻度に対して、リマインド設定者が設定可能な変数は1つのみとしている。2つ以上変数が存在する場合、送信頻度変数のカラムがもう1つ必要になるため、その場合はリマインドテーブルのテーブル定義変更を行う必要がある。
- 補足
  - 送信頻度は、例えばx時間ごとの場合、以下に関しては許可していることから、設定できる数字は比較的ユーザーが自由に決定できる。そのため、数字の設定可能範囲に関してはアプリケーション側で制限を行うことにした。
    - every 3 hours
    - every 15 hours

## 参考

- [相手がタスクを完了するまで鬼リマインドを続けるslackアプリ作った。もう...誰も催促しなくて済む世界にしたいの...](https://qiita.com/dowanna6/items/b5d1d0245985a26abf8e)