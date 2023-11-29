import { useEffect } from "react";
import { ClickController } from './components/clickcontroller';
import './App.css'
import { useGameContext } from './context/gameContext';
import { initialCharacters } from "./components/characters";
import { Header } from "./components/header";

function App() {
  const { imageRef, getCoords, updatePosition, checkAnswer} = ClickController()
  const { Characters, setCharacters, clickPosition, setClickPosition, hitCoords, setHitCoords, missCoords, setMissCoords, gameStartTime, setGameStartTime, gameEndTime, setGameEndTime, gameDuration, setGameDuration, startGame, endGame} = useGameContext()

  useEffect(() => {
    if (gameStartTime && gameEndTime) {
      const duration = (gameEndTime - gameStartTime) / 1000;
      const roundedDuration = duration.toFixed(2);
      setGameDuration(Number(roundedDuration));
      console.log(gameDuration)
    }
  }, [gameStartTime, gameEndTime]);

  useEffect(() => { 
    const foundCharacters = Characters.filter(character => character.found);
    console.log(foundCharacters)
    console.log(gameStartTime)
    if (foundCharacters.length === 3) {
      endGame();
    }

  }, [Characters]);

  useEffect(() => {
    if (clickPosition) {
    updatePosition();
    }
  }, [clickPosition]);  
  

  const resetGame = () => {
    setGameStartTime(null);
    setGameEndTime(null);
    setGameDuration(0);
    setHitCoords([]),
    setMissCoords([])
    setClickPosition(null);
    setCharacters(initialCharacters)
  };


  return (
    <>
      <Header></Header>
     
      <div className="mainctn">
      <button onClick={startGame}>Start Game</button>
        <div className='parentDiv' ref={imageRef} onClick={getCoords}>
          <img src='/images/radiocity.png' className="background" alt="Wheres Waldo style image" />
          {clickPosition && (
            <>
              <div className="clickBox" ></div>
              <ul className="characterBox" >
                {Characters.map((character) => (
                  <li key={character.name} value={character.name} className={`dropdownselect ${character.found ? 'found' : ''}`}
                  >
                    <div
                      onClick={checkAnswer}
                    >
                      <img
                        className='characterimg'
                        src={character.url}
                        alt="character"
                      />
                      <div>{character.name}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div>
          {hitCoords.map((position, index) => (
            <div className="hit" key={index} style={{ position: 'absolute', left: position.x - 20, top: position.y - 23 }}>
            </div>
            ))}
          </div>
          <div>
            {missCoords.map((position, index) => (
              <div className="miss" key={index} style={{ position: 'absolute', left: position.x - 10, top: position.y - 25}}>
                X
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {gameStartTime && gameEndTime && (
          <p>Game Duration: {gameDuration} seconds</p>
        )}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </>
  );
}

export default App;

