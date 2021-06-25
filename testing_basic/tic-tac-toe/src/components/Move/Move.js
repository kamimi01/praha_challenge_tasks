import React from "react";
import "./move.css"

export const Move = (props) => {
  const moves = props.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => props.jumpTo(move)}　data-e2e="move">{desc}</button>
      </li>
    );
  });

  return <ol>{moves}</ol>;
};
