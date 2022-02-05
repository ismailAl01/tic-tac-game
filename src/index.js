import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = calculateWinner(squares);
  const player = isXTurn ? 'X' : 'O';
  let status;

  if (winner) status = `Winner is ${winner}`;
  else status = `Next player: ${player}`;

  const handleClick = i => {
    if (winner || squares[i]) return;

    const newSquare = [...squares];
    newSquare[i] = isXTurn ? 'X' : 'O';
    setSquares(newSquare);
    setIsXTurn(!isXTurn);
  };

  const RenderSquare = ({ i }) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {<RenderSquare i={0} />}
        {<RenderSquare i={1} />}
        {<RenderSquare i={2} />}
      </div>
      <div className="board-row">
        {<RenderSquare i={3} />}
        {<RenderSquare i={4} />}
        {<RenderSquare i={5} />}
      </div>
      <div className="board-row">
        {<RenderSquare i={6} />}
        {<RenderSquare i={7} />}
        {<RenderSquare i={8} />}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
