// src/components/GameBoard.js
import React from 'react';

const GameBoard = ({ board, onCellClick, boardSize, winningCells }) => {
  const cellStyle = {
    width: `${100 / boardSize}%`,
    height: `${100 / boardSize}%`,
    border: '1px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    cursor: 'pointer',
    backgroundColor: 'white', // Added background color for cells
    color: '#333', // Added font color for better visibility
  };

  const checkWinningCell = (index) => {
    return winningCells.includes(index);
  };

  return (
    <div
      className="game-board"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gap: '5px',
        backgroundColor: 'lightblue', // Board background color, can be changed as desired
        padding: '10px',
        borderRadius: '8px', // Added rounded corners for better aesthetics
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Added a subtle box shadow for a card-like effect
      }}
    >
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${checkWinningCell(index) ? 'winning-cell' : ''}`}
          style={cellStyle}
          onClick={() => onCellClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
