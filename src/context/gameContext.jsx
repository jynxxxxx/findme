import { createContext, useState, useContext } from "react";
import { initialCharacters } from "../components/characters";

const GameContext = createContext({});

export function useGameContext() {
  return useContext(GameContext)
}

export function GameContextProvider({ children }) {
  const [Characters, setCharacters] = useState(initialCharacters);
  const [clickPosition, setClickPosition] = useState(null);
  const [hitCoords, setHitCoords] = useState([])
  const [missCoords, setMissCoords] = useState([])
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameEndTime, setGameEndTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startGame = () => {
    setGameStartTime(new Date());
    setIsTimerRunning(true);
  };

  const endGame = () => {
    if (gameStartTime) {
      setGameEndTime(new Date());
      setIsTimerRunning(false);
    }
  };


  return (
    <GameContext.Provider value={{ Characters, setCharacters, clickPosition, setClickPosition, hitCoords, setHitCoords, missCoords, setMissCoords, gameStartTime, setGameStartTime, gameEndTime, setGameEndTime, isTimerRunning, startGame, endGame, elapsedTime, setElapsedTime }}>
      {children}
    </GameContext.Provider>
  )
}