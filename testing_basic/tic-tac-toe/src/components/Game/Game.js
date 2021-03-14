import React from "react";
import { Board } from "../Board/Board";
import { Move } from "../Move/Move";
import { Status } from "../Status/Status";
import "./game.css";

export const Game = (props) => {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={props.current.squares}
          onClick={(i) => props.handleClick(i)}
        />
      </div>
      <div className="game-info">
        <Status status={props.status} />
        <Move history={props.history} jumpTo={props.jumpTo} />
      </div>
    </div>
  );
};
