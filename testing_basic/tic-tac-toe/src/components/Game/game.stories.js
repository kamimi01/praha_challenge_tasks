import { React } from "react";
import { Game } from "./Game";

export default {
  title: "Tic-Tac-Toe/Game",
  component: Game,
  argTypes: {
    handleClick: { action: "Clicked" },
    jumpTo: { action: "Jumped" },
  },
};

const Template = (args) => <Game {...args} />;

export const AllCross = Template.bind({});
AllCross.args = {
  status: "Winner: 半",
  current: {
    squares: Array(9).fill("半"),
  },
  history: [
    {
      squares: Array(9).fill("半"),
    },
  ],
};

export const AllCircle = Template.bind({});
AllCircle.args = {
  status: "Winner: 丁",
  current: {
    squares: Array(9).fill("丁"),
  },
  history: [
    {
      squares: Array(9).fill("丁"),
    },
  ],
};

export const AllTriangle = Template.bind({});
AllTriangle.args = {
  status: "Winner: △",
  current: {
    squares: Array(9).fill("△"),
  },
  history: [
    {
      squares: Array(9).fill("△"),
    },
  ],
};

export const Mix = Template.bind({});
Mix.args = {
  status: "Winner: 丁",
  current: {
    squares: [null, null, "丁", null, "丁", "半", "丁", null, "半"],
  },
  history: [
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
  ],
};

export const Draw = Template.bind({});
Draw.args = {
  status: "Draw!",
  current: {
    squares: ["半", "丁", "半", "半", "丁", "丁", "丁", "半", "丁"],
  },
  history: [
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
  ],
};
