import React, { useState, useEffect } from 'react';
import Home from './screens/Home';
import GameListScreen from './screens/GameListScreen';
import GameScreen from './screens/GameScreen';
import CreateGameScreen from './screens/CreateGameScreen';

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [createdGames, setCreatedGames] = useState(() => {
    const storedGames = localStorage.getItem('createdGames');
    return storedGames ? JSON.parse(storedGames) : [];
  });

  const handleSetName = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
    setCurrentScreen('gameList');
  };

  const handleStartGame = (game) => {
    setSelectedGame(game);
    setCurrentScreen('game');
  };

  const handleCreateGame = (gameData) => {
    setCreatedGames((prevGames) => [
      ...prevGames,
      { id: prevGames.length + 1, ...gameData },
    ]);

    setSelectedGame(gameData);
    setCurrentScreen('game');
  };

  const handleTie = () => {
    setCurrentScreen('gameList');
  };

  useEffect(() => {
    localStorage.setItem('createdGames', JSON.stringify(createdGames));
  }, [createdGames]);

  return (
    <div>
      {currentScreen === 'home' && <Home onSetName={handleSetName} />}
      {currentScreen === 'gameList' && (
        <div>
          <CreateGameScreen onCreateGame={handleCreateGame} />
          <GameListScreen
            username={username}
            onStartGame={handleStartGame}
          />
        </div>
      )}
      {currentScreen === 'game' && (
        <GameScreen
          key={selectedGame?.id}
          game={selectedGame}
          onGoBack={() => setCurrentScreen('gameList')}
          onTie={handleTie}
        />
      )}
    </div>
  );
}

export default App;
