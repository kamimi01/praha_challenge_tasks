// storybook.test.js

// スナップショットテストを行う場合はこちら
// import initStoryshots, {
//   multiSnapshotWithOptions,
// } from "@storybook/addon-storyshots";
// initStoryshots({
//   test: multiSnapshotWithOptions(),
// });

// ビジュアルリグレッションテストを行う場合はこちら
// スナップショットテストとビジュアルリグレッションテストを同時に行う方法がわからない。。（未調査）
import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot, puppeteerTest } from "@storybook/addon-storyshots-puppeteer";

const getMatchOptions = ({ context: { kind, story }, url }) => {
  const customConfig = { threshold: 0.0 };
  return {
    customDiffConfig: customConfig
  };
};

// initStoryshots({
//   suite: "Image storyshots",
//   test: imageSnapshot({
//     storybookUrl: "http://localhost:6006",
//     getMatchOptions,
//   }),
// });

initStoryshots({
  suite: "Image storyshots",
  test: imageSnapshot(),
});
