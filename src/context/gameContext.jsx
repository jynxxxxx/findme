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
  const [gameDuration, setGameDuration] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

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
    <GameContext.Provider value={{ Characters, setCharacters, clickPosition, setClickPosition, hitCoords, setHitCoords, missCoords, setMissCoords, gameStartTime, setGameStartTime, gameEndTime, setGameEndTime, gameDuration, setGameDuration, isTimerRunning, startGame, endGame }}>
      {children}
    </GameContext.Provider>
  )
}