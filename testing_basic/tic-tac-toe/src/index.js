import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./components/Game/Game";
import { useHistory } from "./hooks/useHistory";
import { App } from "./components/App/App";
import "./index.css";

// const [status, current, history, handleClick, jumpTo] = useHistory();

ReactDOM.render(<App />, document.getElementById("root"));
