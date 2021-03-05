# 課題3

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- スナップショットテストをするのに向いているケース、向いていないケースをそれぞれ1つ以上答えてください。

<details><summary>想定回答</summary>

- 向いているケース
  - 考慮する画面が多い
  - 実行時に再現が困難
  - レイアウトが複雑
- 向いていないケース
  - 仕様が未確定や高頻度で変わる場合
    - デザインに意図的な変更を加えた場合、スナップショットテストは失敗してしまうため、その時は再度、スナップショットテストでリファレンス画像を生成し直したり、スタブを修正するなどの工数がかかる
  - 状態再現のための修正コストが高い場合
    - スナップショットテストは、アプリケーションのアウトプットと緊密に紐づいているため、非常に壊れやすい。重要でない部分のどんな変更があったとしてもスナップショットテストは失敗してしまう。そのため、開発者は全てが正常に機能していることを手動で確認し、スナップショットテストを更新する必要がある
    - スナップショットテストは、期待値やアサーションなどが含まれていないため、期待している状態かどうかは判断できない
  - スナップショットを保存するためのストレージが十分ではない場合
    - スナップショットテストはどこかに保存する必要があるが、スクリーンショットベースのスナップショットはストレージを簡単に消費してしまう可能性があるため

- 参考
  - [スナップショットテスト実戦投入 / Practical Snapshot Testing](https://speakerdeck.com/imaizume/practical-snapshot-testing)
  - [Snapshot Testing: Benefits and Drawbacks](https://www.sitepen.com/blog/snapshot-testing-benefits-and-drawbacks#:~:text=Snapshot%20testing%20is%20a%20type,from%20unit%20and%20functional%20tests.)

</details>

## クイズ2

- スナップショットテストの別名と捉えられることもある、ビジュアルリグレッションテストとは何か調べてみてください。
  - ヒント：Jest公式によると異なる手法、目的のテストであるとされています。

<details><summary>想定回答</summary>

- Jest公式によると、ビジュアルリグレッションテストとスナップショットテストはテストの方法や、目的が異なる
  - 前者は、Webページのスクリーンショットをとり、画像をピクセル単位で比較する
  - 後者は、シリアライズされた値をテキストファイルに格納し、異なるアルゴリズムで比較する

- ただ、Storybookの公式のドキュメントでは、ビジュアルテストのことをビジュアルリグレッションテストと解釈しているような文もあるなど、解釈は異なるようです。

- 参考
  - [What's the difference between snapshot testing and visual regression testing?](https://jestjs.io/docs/en/snapshot-testing#whats-the-difference-between-snapshot-testing-and-visual-regression-testing)→Jestの見解
  - [Snapshot testing with Storybook](https://storybook.js.org/docs/react/workflows/snapshot-testing)→Storybook公式のドキュメント
  - [微妙な違いも見逃すな！ビジュアルリグレッションテスト！ / phpcon2020](https://speakerdeck.com/blue_goheimochi/phpcon2020?slide=15)→スナップショットテストをビジュアルリグレッションテストを区別していない例

</details>