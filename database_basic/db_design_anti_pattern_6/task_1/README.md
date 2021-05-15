# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## 質問1

> 以下の設計だとどのような問題が生じるか？

```
TABLE Student {
id: varchar
name: varchar
status: varchar CHECK(status IN ("studying", "graduated", "suspended"))
}
```

![](../../../assets/anti6_before.png)

### 回答

- 新たなステータスが加わった際に、テーブル定義を変更（CHECK制約を変更）する必要がある
