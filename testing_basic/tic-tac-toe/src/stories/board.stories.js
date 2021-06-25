import { React } from "react";
import { Board } from "../index";

export default {
  title: "Tic-Tac-Toe/Board",
  component: Board,
  argTypes: { onClick: { action: "Clicked" } },
};

const Template = (args) => <Board {...args} />;

export const AllCircle = Template.bind({});
AllCircle.args = {
  squares: ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
};

export const AllCross = Template.bind({});
AllCross.args = {
  squares: ["X", "X", "X", "X", "X", "X", "X", "X", "X"],
};

export const AllTriangles = Template.bind({});
AllTriangles.args = {
  squares: ["△", "△", "△", "△", "△", "△", "△", "△", "△"],
};

export const Mix = Template.bind({});
Mix.args = {
  squares: ["X", "O", "△", "X", "O", "△", "X", "O", "△"],
};
