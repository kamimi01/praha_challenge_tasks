import { React } from "react";
import { Game } from "../Game/Game";

export default {
  title: "Tic-Tac-Toe/Game",
  component: Game,
};

const Template = (args) => <Game {...args} />;

export const Usual = Template.bind({});
