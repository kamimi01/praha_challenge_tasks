// storybook.test.js

// import initStoryshots from "@storybook/addon-storyshots";
// initStoryshots();

import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

const getMatchOptions = ({ context: { kind, story }, url }) => {
  const customConfig = { threshold: 0.0 };
  return {
    customDiffConfig: customConfig,
  };
};

initStoryshots({
  suite: "Image storyshots",
  test: imageSnapshot({
    storybookUrl: "http://localhost:6006",
    getMatchOptions,
  }),
});
