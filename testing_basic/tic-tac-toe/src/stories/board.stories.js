import { React } from "react";
import { Board } from "../index";

// const board = new Board();
// const boardRender = board.render()

export default {
  title: "Tic-Tac-Toe/Board",
  component: Board
}

const Template = (args) => <Board />;

export const Usual = Template.bind({})