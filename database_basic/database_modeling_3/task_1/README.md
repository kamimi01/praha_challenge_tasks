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

> Confluenceやesa、kibelaと言ったドキュメント管理システムのデータベース設計をしてみましょう

### 回答

![](../../../assets/ドキュメント管理システム.png)

- 検討したメモは[こちら](https://docs.google.com/spreadsheets/d/1VY8wkXNHNpTPu-Bk3SVmADeX53uuP2y5sYRT9e5X5-8/edit?usp=sharing)

- 懸念点
  - 今回はドキュメントのバージョン管理は考慮しない設計とした（だがバージョン管理はほとんどのドキュメント管理システムで必要に思うので、後々取り込みたい）
  - 今回はユーザーの権限（このディレクトリやドキュメントに対しては、このユーザーは閲覧のみ許可されているなど）は考慮していない