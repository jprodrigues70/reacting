import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'gaintime';

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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  play(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = (this.state.xIsNext)? 'X': 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  undo(i) {
    let history = this.state.history;
    if (history.length > 1) {
      history.pop();
      this.setState({
        history: history,
        xIsNext: !this.state.xIsNext
      })
    }
  }

  newGame() {
    this.setState({
      history: [this.state.history[0]],
      xIsNext: !this.state.xIsNext
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const st_class = (this.state.history.length <= 1 ? 'disabled': 'warning');

    return (
      <section className="game text-center gt-section">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.play(i)}
          />
        </div>
        <div className="content-align">
          <button className={`btn ${st_class}`} onClick={(i) => this.undo(i)}>Desfazer</button>
          <button className="btn success" onClick={() => this.newGame()}>Novo Jogo</button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </section>
    );
  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <header className="gt-top-menu">
        </header>
        <Game />
        <footer>
        </footer>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
