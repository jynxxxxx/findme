import { useGameContext } from '../context/gameContext';


export function Header() {
  const { Characters } = useGameContext()
  return (
    <>
  
      <div className='header'>
        <div className='title'>
          FindME
        </div>
        <ul className="legend" >
          {Characters.map((character) => (
            <li key={character.name} value={character.name} className={`keys ${character.found ? 'found' : ''}`}
            >
              <img
                className='characterimg'
                src={character.url}
                alt="character"
              />
              <div className='keyname'>{character.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}