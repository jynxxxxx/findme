import { useGameContext } from '../context/gameContext';
import { Link } from "react-router-dom";
import '../css/header.css'


export function Header() {
  const { Characters, gameStartTime, elapsedTime } = useGameContext()

  return (
    <>
      <div className='header'>
        <div className='title'>
          <Link to="/findme" className='find'>Find<span className='me'>Me</span></Link>
        </div>
        <div className="rightheader" id='gameheader'>
          <ul className="legend" >
            {Characters.map((character) => (
              <li key={character.name} value={character.name} className={`keys ${character.found ? 'found' : ''}`}
              >
                <img
                  className='characterimgheader'
                  src= {character.found ? character.bwurl : character.url}
                  alt="character"
                />
                <div className='keyname'>{character.name}</div>
              </li>
            ))}
          </ul>
          <div>
            {gameStartTime && (
              <div className='timer'>Elapsed Time: {elapsedTime.toFixed(2)} seconds</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}