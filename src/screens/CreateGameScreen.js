import React, { useState, useEffect } from 'react';

const CreateGameScreen = ({ onCreateGame }) => {
  const [gameName, setGameName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [boardSize, setBoardSize] = useState(3);
  const [colorSelected, setColorSelected] = useState(false);

  useEffect(() => {
    const storedColor = localStorage.getItem('selectedColor');
    const storedBoardSize = localStorage.getItem('selectedBoardSize');
    if (storedColor) {
      setSelectedColor(storedColor);
      setColorSelected(true);
    }
    if (storedBoardSize === null) {
      setBoardSize(3);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameName && selectedColor && boardSize) {
      localStorage.setItem('selectedColor', selectedColor);
      localStorage.setItem('selectedBoardSize', boardSize);

      onCreateGame({
        name: `${gameName}`,
        boardColor: selectedColor,
        boardSize: boardSize,
      });
    }
  };

  const colorOptions = [
    { value: 'lightblue', label: 'Light Blue' },
    { value: 'lightgreen', label: 'Light Green' },
    { value: 'lightpink', label: 'Light Pink' },
    { value: 'orange', label: 'Orange' },
    { value: 'lime', label: 'Lime' },
    { value: 'gray', label: 'Gray' },
    { value: 'red', label: 'Red' },
    // Diğer renk seçenekleri
  ];

  return (
    <div style={{ maxWidth: '1800px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: selectedColor, marginBottom: '20px', position: 'relative' }}>
        <br/> WELCOME {localStorage.getItem('username')} <br /> 
        CREATE A NEW GAME
        <span
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '5px',
            background: `linear-gradient(to right, ${selectedColor}, rgba(255, 255, 255, 0))`,
          }}
        />
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label style={{ display: 'block', margin: '10px 0', color: '#555', width: '100%' }}>
          Name of the game:
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            style={{
              width: 'calc(100% - 22px)',
              margin: '10px 0',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          />
        </label>
        <label style={{ display: 'block', margin: '10px 0', color: '#555', width: '100%' }}>
          Board Color:
          <select
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              setColorSelected(true);
            }}
            style={{
              width: 'calc(100% - 22px)',
              margin: '10px 0',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: selectedColor,
              boxSizing: 'border-box',
            }}
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value} style={{ background: option.value }}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block', margin: '10px 0', color: '#555', width: '100%' }}>
          Tahta Boyutu:
          <select
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
            style={{
              width: 'calc(100% - 22px)',
              margin: '10px 0',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            {/* Diğer boyut seçenekleri */}
          </select>
        </label>
        {colorSelected && (
          <button
            type="submit"
            style={{
              width: '100%',
              margin: '20px 0',
              padding: '10px 20px',
              backgroundColor: '#4285f4',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Oyun Oluştur
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateGameScreen;
