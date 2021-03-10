import { React } from "react";
import { Board } from "../Board/Board";

export default {
  title: "Tic-Tac-Toe/Board",
  component: Board,
  argTypes: { onClick: { action: "Clicked" } },
};

const Template = (args) => <Board {...args} />;

export const AllCircle = Template.bind({});
AllCircle.args = {
  squares: ["半", "半", "半", "半", "半", "半", "半", "半", "半"],
};

export const AllCross = Template.bind({});
AllCross.args = {
  squares: ["丁", "丁", "丁", "丁", "丁", "丁", "丁", "丁", "丁"],
};

export const AllTriangles = Template.bind({});
AllTriangles.args = {
  squares: ["△", "△", "△", "△", "△", "△", "△", "△", "△"],
};

export const Mix = Template.bind({});
Mix.args = {
  squares: ["丁", "半", "△", "丁", "半", "△", "丁", "半", "△"],
};
