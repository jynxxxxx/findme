import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ClickController } from '../components/clickcontroller';
import '../css/game.css'
import { useGameContext } from '../context/gameContext';
import { Header } from "../components/header";


export function Gameplay() {
  const { imageRef, getCoords, updatePosition, checkAnswer} = ClickController()
  const { Characters, clickPosition, hitCoords, missCoords, gameStartTime, isTimerRunning, startGame, endGame, setElapsedTime} = useGameContext()
  const navigate = useNavigate();

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        if (gameStartTime) {
          const elapsed = (new Date() - gameStartTime) / 1000;
          setElapsedTime(elapsed);
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning, gameStartTime]);

  useEffect(() => { 
    const foundCharacters = Characters.filter(character => character.found);
    if (foundCharacters.length === 3) {
      endGame();
      navigate("/form")
    }
  }, [Characters]);

  useEffect(() => {
    if (clickPosition) {
    updatePosition();
    }
  }, [clickPosition]);  
  

  return (
    <>
      <Header></Header>
     
      <div className="mainctn">
        <div className='parentDiv' ref={imageRef} onClick={getCoords}>
          <img src='/images/radiocity.png' className="background" alt="Wheres Waldo style image" />
          {clickPosition && (
            <>
              <div className="clickBox" ></div>
              <ul className="characterBox" >
                {Characters.map((character) => (
                  <li key={character.name} value={character.name} className={`dropdownselect ${character.found ? 'found' : ''}`}  onClick={checkAnswer}
                  >
                    <img
                      className='characterimg'
                      src= {character.found ? character.bwurl : character.url}
                      alt="character"
                    />
                    <div className='legendname'>{character.name}</div>
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

    </>
  );
}

