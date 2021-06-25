import { React } from "react";
import { Status } from "./Status";

export default {
  title: "Tic-Tac-Toe/Status",
  component: Status,
};

const Template = (args) => <Status {...args} />;

export const Win = Template.bind({})
Win.args = {
  status: "Winner: 丁"
}

export const Next = Template.bind({})
Next.args = {
  status: "Next Player: 丁"
}