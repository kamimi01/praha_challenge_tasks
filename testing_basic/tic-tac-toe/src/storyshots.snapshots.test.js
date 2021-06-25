import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
initStoryshots({
  suite: "Snapshot Testing",
  test: multiSnapshotWithOptions(),
});
