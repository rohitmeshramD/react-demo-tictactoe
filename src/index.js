import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
// import Game from "./Game";
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// !

// ! Square
// // declaring state // ! commented in step:2 as states are stored in Board
// constructor(props) {
//   super(props);
//   this.state = {
//     value: null,
//   };
// }
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
// onClick={() => this.props.onClick()}
// onClick={() => this.handleClick()}
// onClick={() => console.log(this.props.value)}
// onClick={() => this.handleClick(1)}
// // ! /\up to handle the passed prop ( ie onCLick )
// () => {
// alert("clicked")
// this.setState({ value: "X" });
// }
// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
// {/* {this.state.value} */}

// ! transforming class Square to function Square
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// ! Board
class Board extends React.Component {
  // !when moving control to GAME (for history purpose) , this constructor is not required
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  // ! handleClick function is called when clicked on square
// ! handleClick moved to Game for history purpose
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? "X" : "O";
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    // ! passing value prop down-wards
    // return <Square value={i} />;
    // return <Square value={this.state.squares[i]} />;
    // ! passing two props in Square ( ie, value & onCLick )
    return (
      <Square
        // value={this.state.squares[i]}
        value={this.props.squares[i]}
        // ! control is with Board
        // onClick={() => this.handleClick(i)}
        // ! control transferred to Game
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    // ! removing this renderer start functions as control is now transferred to Game
    // // check winner
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
    //   status = "Next Player : " + (this.state.xIsNext ? "X" : "O");
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// ! Game
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history : [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber : 0,
      xIsNext: true,
    }
  }
  
  handleClick(i) {
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // const squares = this.state.squares.slice();
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      // squares: squares,
      history: history.concat(
        [{squares: squares}]
      ),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map( (step,move) => {
      const desc = move ?
      'got to move #' + move :
      'go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move) }>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      status = "Next Player : " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board 
            squares = {current.squares}
            onClick = { (i) => this.handleClick(i) }
            />
          </div>
          <div className="game-info">
            <div> {status}</div>
            <ol> {moves} </ol>
          </div>
        </div>
        <div>demo by ROHIT</div>
      </div>
    );
  }
}

// ! winner calculator
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ! Main Renderer

ReactDOM.render(<Game />, document.getElementById("root"));
