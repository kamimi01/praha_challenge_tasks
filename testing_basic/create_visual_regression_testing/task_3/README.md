# 課題3

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- ビジュアルリグレッションテストのツールには、スクリーンショットを比較する際の差分閾値（比較した際にどの程度の差分があった場合に、テストを失敗にさせるかを決める値）をカスタマイズすることができるものがあります。
- addon-storyshots-puppeteerの内部で使用されているjest-image-snapshotsでは、それが可能です。
- 例えば、正とするスクリーンショットのとある文字のカラーコードが<span style="color: #ffffff">#ffffff（白）</span>で、比較するスクリーンショットのカラーコードが<span style="color: #fcfcfc">#fcfcfc（薄い灰色）</span>の場合、
ある設定値を変更すると、テストが失敗しなくなります。
- その設定値はなんでしょうか？

- ヒント：[jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)

<details><summary>想定回答</summary>

- 設定値：`customDiffConfig.threshold`

</details>

## クイズ2

- クイズ1の閾値の値によるテスト結果への影響を確かめてみましょう。
  1. `<Square>`の、`background`を`#fcfcfc`に変更してください。
  2. ビジュアルリグレッションテストを再度行うと、テストが失敗することを確かめてください
  3. storyshotsのテスト用ファイルに、閾値を`0.5`に設定してください。
     1. 参考：[storyshots.test.js](./../../tic-tac-toe/src/storyshots.test.js)
  4. 再度ビジュアルリグレッションテストが成功することを確かめてください。