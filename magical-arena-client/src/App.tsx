import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  const [player1, setPlayer1] = useState({
    health: 50,
    strength: 5,
    attack: 10,
  });
  const [player2, setPlayer2] = useState({
    health: 100,
    strength: 10,
    attack: 5,
  });
  const [gameId, setGameId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [inputPhase, setInputPhase] = useState<boolean>(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: number
  ) => {
    const { name, value } = e.target;
    if (player === 1) {
      setPlayer1({ ...player1, [name]: parseInt(value) });
    } else {
      setPlayer2({ ...player2, [name]: parseInt(value) });
    }
  };

  const createGame = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-game", {
        player1,
        player2,
      });
      setGameId(response.data.gameId);
      setLog([]);
      setGameOver(false);
      setWinner(null);
      setCurrentPlayer(1);
      setInputPhase(false);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const rollDice = async () => {
    if (!gameId) {
      console.error("Game ID is not set");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/roll/${gameId}`);
      setLog((prevLog) => [response.data.log, ...prevLog]);

      // Update player health
      setPlayer1((prevPlayer1) => ({
        ...prevPlayer1,
        health: response.data.player1.health,
      }));
      setPlayer2((prevPlayer2) => ({
        ...prevPlayer2,
        health: response.data.player2.health,
      }));

      if (response.data.gameOver) {
        setGameOver(true);
        setWinner(response.data.winner);
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  const resetGame = () => {
    setPlayer1({ health: 50, strength: 5, attack: 10 });
    setPlayer2({ health: 100, strength: 10, attack: 5 });
    setGameId(null);
    setLog([]);
    setGameOver(false);
    setWinner(null);
    setCurrentPlayer(1);
    setInputPhase(true);
  };

  return (
    <div className="App">
      <h1>Magical Arena</h1>
      {inputPhase ? (
        <div className="input-phase">
          <h2>Enter Player Details</h2>
          <div className="players-container">
            <div className="player-input">
              <h3>Player 1</h3>
              <label>
                Health:
                <input
                  type="number"
                  name="health"
                  value={player1.health}
                  onChange={(e) => handleChange(e, 1)}
                />
              </label>
              <label>
                Strength:
                <input
                  type="number"
                  name="strength"
                  value={player1.strength}
                  onChange={(e) => handleChange(e, 1)}
                />
              </label>
              <label>
                Attack:
                <input
                  type="number"
                  name="attack"
                  value={player1.attack}
                  onChange={(e) => handleChange(e, 1)}
                />
              </label>
            </div>
            <div className="player-input">
              <h3>Player 2</h3>
              <label>
                Health:
                <input
                  type="number"
                  name="health"
                  value={player2.health}
                  onChange={(e) => handleChange(e, 2)}
                />
              </label>
              <label>
                Strength:
                <input
                  type="number"
                  name="strength"
                  value={player2.strength}
                  onChange={(e) => handleChange(e, 2)}
                />
              </label>
              <label>
                Attack:
                <input
                  type="number"
                  name="attack"
                  value={player2.attack}
                  onChange={(e) => handleChange(e, 2)}
                />
              </label>
            </div>
          </div>
          <button className="start-button" onClick={createGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-phase">
          <div className="game-status">
            <div>
              <h3>Player 1 Health: {player1.health}</h3>
            </div>
            <div>
              <h3>Player 2 Health: {player2.health}</h3>
            </div>
          </div>
          {!gameOver && (
            <button className="roll-button" onClick={rollDice}>
              Roll for Player {currentPlayer}
            </button>
          )}
          {gameOver && (
            <div className="game-over">
              <h2>{winner} wins!</h2>
              <button className="new-game-button" onClick={resetGame}>
                Start New Game
              </button>
            </div>
          )}
          <div className="logs">
            <h2>Game Logs</h2>
            {log.map((entry, index) => (
              <div className="log-entry" key={index}>
                <p>{entry}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
