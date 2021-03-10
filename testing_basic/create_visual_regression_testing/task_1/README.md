# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## storyshot-puppeteerの導入

- 以下のコマンドでアドオンをインストール
  - `yarn add --dev @storybook/addon-storyshots-puppeteer puppeteer`
- [storyshots.test.js](../tic-tac-toe/src/../../../tic-tac-toe/src/storyshots.test.js)を以下に書き換える

```javascript
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({ suite: 'Image storyshots', test: imageSnapshot() });
```

- storybookを起動する
  - `yarn storybook`

- testを実行する
  - `yarn test`

## ビジュアルリグレッションテスト

- Squareの中身（o,x）を赤色に変更
  - [square.css](../tic-tac-toe/src/components/Square/../../../../../tic-tac-toe/src/components/Square/square.css)に以下を追加

```css
color: red;
```

- ビジュアルリグレッションテストが変更を検知していることを確認
  - （すみません確認したのですが、スクショを取っておくのを忘れてしまいました。。）

- 変更を受け入れて、スクリーンショットを更新
  - `yarn test`を実行した際に表示される以下の選択肢から、`u`を押して変更を受け入れ、スクリーンショットを更新する

- 間違って3x3ではなく、4x3のboardを作成
  - [Board.js](../../tic-tac-toe/src/components/Board/Board.js)に以下を追加
  
```js
<div className="board-row">
  {renderSquare(9)}
  {renderSquare(10)}
  {renderSquare(11)}
</div>
```

- ビジュアルリグレッションテストが変更を検知していることを確認
  - ![](../../../assets/visual_regression_testing_4x3.png)

## 参考

- [@storybook/addon-storyshots-puppeteer](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-puppeteer)