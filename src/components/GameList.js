// GameList.js
import React from 'react';

const GameList = ({ games, onStartGame }) => {
  return (
    <div>
      {games.map((game, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{`${game.name} - ${game.boardSize}x${game.boardSize}`}</h3>
          <p>Board Color: {game.boardColor}</p>
          <button onClick={() => onStartGame(game)}>Start Game</button>
        </div>
      ))}
    </div>
  );
};

export default GameList;
