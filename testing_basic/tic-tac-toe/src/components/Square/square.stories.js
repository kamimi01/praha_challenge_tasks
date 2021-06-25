import React from "react";
import { Square } from "./Square";

export default {
  title: "Tic-Tac-Toe/Square",
  component: Square,
  argTypes: { onClick: { action: "Clicked" } },
};

const Template = (args) => <Square {...args} />;

export const Circle = Template.bind({});
Circle.args = {
  value: "半"
}

export const Cross = Template.bind({});
Cross.args = {
  value: "丁"
}

export const Triangle = Template.bind({})
Triangle.args = {
  value: "△"
}