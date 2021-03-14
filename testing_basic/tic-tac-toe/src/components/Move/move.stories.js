import { React } from "react";
import { Move } from "./Move";

export default {
  title: "Tic-Tac-Toe/Move",
  component: Move,
  argTypes: {
    handleClick: { action: "Clicked" },
    jumpTo: { action: "Jumped" },
  },
};

const Template = (args) => <Move {...args} />;

export const Start = Template.bind({});
Start.args = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
};

export const Usual = Template.bind({});
Usual.args = {
  history: [
    {
      squares: Array(9).fill(null),
    },
    {
      squares: Array(9).fill(null),
    },
  ],
};
