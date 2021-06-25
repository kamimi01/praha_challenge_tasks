import React from "react";
import { Game } from "../Game/Game";
import { useHistory } from "../../hooks/useHistory";

export const App = () => {
  const [status, current, history, handleClick, jumpTo] = useHistory();
  return (
    <Game
      jumpTo={jumpTo}
      status={status}
      current={current}
      history={history}
      handleClick={handleClick}
    />
  );
};
