import { useRef } from 'react';
import { useGameContext } from '../context/gameContext';


export function ClickController() {
  const imageRef = useRef();
  const { Characters, setCharacters, setHitCoords, setMissCoords, clickPosition, setClickPosition } = useGameContext()

  const getCoords = (e) => {
    const imageBoard = imageRef.current.getBoundingClientRect();
    const clickX = e.clientX - imageBoard.left;
    const clickY = e.clientY - imageBoard.top;

    setClickPosition({ x: clickX, y: clickY });
    
    console.log('Click Position (relative to parent):', clickPosition.x, clickPosition.y);

  }
  
  const updatePosition = () => {
    console.log('current position:', clickPosition);

    const clickBox = document.querySelector('.clickBox');
    clickBox.style.left = clickPosition.x - 10 + 'px';
    clickBox.style.top = clickPosition.y - 25 + 'px';

    const characterBox = document.querySelector('.characterBox');
    characterBox.style.left = clickPosition.x + 15 + 'px';
    characterBox.style.top = clickPosition.y - 25 + 'px';
  };

  const checkAnswer = (e) => {
    e.stopPropagation();

    const chosenOne = e.target.closest('li').getAttribute('value');

    const characterIndex = Characters.findIndex(character => character.name === chosenOne);

    const characterX = parseInt(Characters[characterIndex].coord.x, 10);
    const characterY = parseInt(Characters[characterIndex].coord.y, 10);
    console.log('Character Coordinates:', characterX, characterY);
    console.log('Click Position:', clickPosition.x, clickPosition.y);

    if (
      (clickPosition.x - 10) < characterX &&
      characterX < (clickPosition.x + 10) &&
      (clickPosition.y - 25) < characterY &&
      characterY < (clickPosition.y + 25)
    ) {
      console.log(`You found ${Characters[characterIndex].name}!`);
     
      const updatedCharacters = [...Characters];
      updatedCharacters[characterIndex] = {
        ...updatedCharacters[characterIndex],
        found: true,
      };
      
      setCharacters(updatedCharacters);
      setHitCoords(prevPositions => [...prevPositions, clickPosition])

      console.log('Updated Character:', Characters[characterIndex]);
    } else {
      console.log('Fail');
      setMissCoords(prevPositions => [...prevPositions, clickPosition])
    }

    setClickPosition(null);
  };

  return { imageRef, getCoords, updatePosition, checkAnswer };
}
  