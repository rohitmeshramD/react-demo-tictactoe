import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./tic-tac-toe/Game";
// import MyChart from "./my-charts/MyChart";
import 'bootstrap/dist/css/bootstrap.min.css';

// ! tic tac toe Renderer
ReactDOM.render(<Game />, document.getElementById("root"));

// ! chart
// ReactDOM.render(<MyChart />, document.getElementById("root"));