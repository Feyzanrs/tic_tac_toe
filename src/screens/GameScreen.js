import React, { useState, useEffect } from 'react';

const GameScreen = ({ game, onGoBack, onTie }) => {
  const [boardSize, setBoardSize] = useState(game.boardSize || 3);
  const [board, setBoard] = useState(Array(boardSize ** 2).fill(null));
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (!board[index] && isPlayerTurn && !winner && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = 'X';
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
        setGameOver(true);
        return;
      }

      setPlayerTurn(false);
    }
  };

  const makeComputerMove = () => {
    if (!isPlayerTurn && !winner && !gameOver) {
      const emptyCells = board.reduce((acc, cell, index) => {
        if (!cell) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const newBoard = [...board];
        newBoard[emptyCells[randomIndex]] = 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
          setGameOver(true);
          return;
        }

        setPlayerTurn(true);
      }
    }
  };

  const checkWinner = (currentBoard) => {
    const winningPatterns = [];

    // Rows and Columns
    for (let i = 0; i < boardSize; i++) {
      winningPatterns.push(Array.from({ length: boardSize }, (_, index) => i * boardSize + index));
      winningPatterns.push(Array.from({ length: boardSize }, (_, index) => i + boardSize * index));
    }

    // Diagonals
    winningPatterns.push(Array.from({ length: boardSize }, (_, index) => index * (boardSize + 1)));
    winningPatterns.push(Array.from({ length: boardSize }, (_, index) => (index + 1) * (boardSize - 1)));

    for (const pattern of winningPatterns) {
      if (game.boardSize == 3) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    } else if (game.boardSize == 4) {
      const [a, b, c, d] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c] && currentBoard[a] === currentBoard[d]) {
        return currentBoard[a];
      }
    } else if (game.boardSize == 5) {
      const [a, b, c, d, e] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c] && currentBoard[a] === currentBoard[d] && currentBoard[a] === currentBoard[e]) {
        return currentBoard[a];
      }
    } else {
      
    }
    }

    if (!currentBoard.includes(null)) {
      //setGameOver(true);
      setBoardSize(game.boardSize || 3);
      setBoard(Array(boardSize ** 2).fill(null));
      setPlayerTurn(true);
      setWinner(null);
      setGameOver(false);
      //onTie(); // Oyun berabere kalırsa onTie fonksiyonunu çağır
     // return 'T';
    }

    return null;
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      makeComputerMove();
    }
  }, [isPlayerTurn, gameOver]);

  useEffect(() => {
    if (gameOver && !winner) {
      const timeoutId = setTimeout(() => {
        setBoard(Array(boardSize ** 2).fill(null));
        setPlayerTurn(true);
        setWinner(null);
        setGameOver(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [winner, gameOver, game, boardSize]);

  useEffect(() => {
    // Apply background color to the entire body
    document.body.style.backgroundColor = game?.boardColor || '#ddd';

    // Cleanup the style when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [game]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', margin: 'auto' }}>
      <h2 style={{ fontSize: '24px', color: '#333' }}>{game?.name}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${boardSize}, 120px)`,
            gap: '10px',
            padding: '15px',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          {board.map((cell, index) => (
            <div
              key={index}
              className='cell'
              style={{
                width: '120px',
                height: '120px',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                cursor: 'pointer',
                backgroundColor: cell === 'X' ? '#4caf50' : cell === 'O' ? '#f44336' : null,
                color: cell === 'O' ? '#fff' : '#000',
              }}
              onClick={() => handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px', color: '#555' }}>
        {winner ? (
          winner === 'T' ? (
            <p>The game is a tie!</p>
          ) : (
            <p>{winner === 'X' ? 'Player X' : 'Player O'} wins! The game is over.</p>
          )
        ) : (
          <p>Next move: {isPlayerTurn ? 'Player X' : 'Player O'}</p>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
