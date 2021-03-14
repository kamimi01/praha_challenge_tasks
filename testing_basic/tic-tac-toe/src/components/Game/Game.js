import React from "react";
import { Board } from "../Board/Board";
import "./game.css";

export const Game = (props) => {
  const moves = props.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={props.current.squares}
          onClick={(i) => props.handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{props.status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
