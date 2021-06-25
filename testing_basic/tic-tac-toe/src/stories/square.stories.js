import React from "react";
import { Square } from "../Square/Square";

export default {
  title: "Tic-Tac-Toe/Square",
  component: Square,
};

const Template = (args) => <Square {...args} />;

export const Usual = Template.bind({});
