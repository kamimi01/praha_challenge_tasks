# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [TODOリスト](#todo%E3%83%AA%E3%82%B9%E3%83%88)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## TODOリスト

- 以下のTODOリストは、テスト容易性が高いものから順に並べてある
- 上から順にレッド・グリーン・リファクタリングを行う

- [x] 渡された引数に対して計算を行い、結果を返す
  - [x] 渡された引数を足し算し、その計算結果を戻り値とする
  - [x] 渡された引数を引き算し、その計算結果を戻り値とする
  - [x] 渡された引数を掛け算し、その計算結果を戻り値とする
  - [x] 渡された引数を割り算し、その計算結果を戻り値とする

- [x] 1個〜30個までの引数を受け取る。
  - [x] 1個〜30個までの引数を受け取る。

- [x] 31個以上の引数を指定するとエラーが発生する
  - [x] 受け取った引数が31個以上の場合は、エラーを発生させ処理を止める
- [x] 引数が数字以外だとエラーが発生する
  - [x] 受け取った引数が数字以外の場合は、エラーを発生させ処理を止める →TypeScriptで既に引数は数値になるように型定義しているため、コンパイルエラーになるのでテスト不可（コンパイルエラーになること確認ずみ）

- [x] 足し算の場合、計算結果が1000を超える場合は合計ではなく「too big」と文字列が返る
  - [x] 足し算の場合、計算結果が1000を超える場合
  - [x] 「too big」と文字列が返る

- [x] 引き算の場合、計算結果がマイナスの場合は「negative number」と文字列が返る
  - [x] 引き算の場合、計算結果がマイナスの場合
  - [x] 「negative number」と文字列が返る

- [x] かけ算の場合、計算結果が1000を越える場合は「big big number」と文字列が返る
  - [x] かけ算の場合、計算結果が1000を越える場合
  - [x] 「big big number」と文字列が返る

- [x] 割り算の場合、計算結果を小数点何桁まで考慮するかは特に指定がありません。お任せします！
  - [x] 割り算の場合、計算結果が整数ではない場合
  - [x] 整数になるように小数点以下は切り捨てした計算結果を返す