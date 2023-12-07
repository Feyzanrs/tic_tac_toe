// src/components/GameCreate.js
import React, { useState } from 'react';

const GameCreate = ({ onCreateGame }) => {
  const [gameName, setGameName] = useState('');
  const [boardColor, setBoardColor] = useState('');

  const handleCreateGame = () => {
    onCreateGame({ gameName, boardColor });
  };

  return (
    <div>
      <h2>Create a Game</h2>
      <input
        type="text"
        placeholder="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Board Color"
        value={boardColor}
        onChange={(e) => setBoardColor(e.target.value)}
      />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default GameCreate;
