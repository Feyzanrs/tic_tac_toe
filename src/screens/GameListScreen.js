import React, { useState, useEffect } from 'react';
import GameList from '../components/GameList';

const GameListScreen = ({ onStartGame }) => {
  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem('createdGames');
    return storedGames ? JSON.parse(storedGames) : [];
  });

  const selectedColor = localStorage.getItem('selectedColor') || 'lightblue';

  const username = localStorage.getItem('username');

  return (
    <div style={{
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      background: '#f8f8f8',
      borderRadius: '8px',
      textAlign: 'center',
      color: '#000'
    }}>
      {games.length > 0 ? (
        <>
          <h2 style={{ color: '#000' }}>
Game List</h2>
          <GameList games={games} onStartGame={onStartGame} />
        </>
      ) : (
        <p style={{ color: '#555' }}>Henüz oluşturulmuş oyun yok. Yeni bir oyun başlatın!</p>
      )}
    </div>
  );
};

export default GameListScreen;
