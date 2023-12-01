import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { initialCharacters } from "../components/characters";
import { useGameContext } from '../context/gameContext';
import { Header } from "../components/header";
import '../css/form.css'


export function Form() {
  const { setCharacters, setClickPosition, setHitCoords, setMissCoords, setGameStartTime, setGameEndTime, elapsedTime} = useGameContext()
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const resetGame = () => {
    setGameStartTime(null);
    setGameEndTime(null);
    setHitCoords([]),
    setMissCoords([])
    setClickPosition(null);
    setCharacters(initialCharacters)
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const endpoint = "https://us-west-2.aws.data.mongodb-api.com/app/data-mkzqm/endpoint/submitScore"

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          gameDuration: elapsedTime,
        }),
      });

      if (response.ok) {
        console.log('Score submitted successfully!');
        resetGame()
        navigate("/findme/leaderboard")
      } else {
        console.error('Error submitting score:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="mainctn">
        <div className="timelog">
          You finished in {elapsedTime.toFixed(3)} seconds!
        </div>
        <form className="formctn" onSubmit={submitForm}>
          <div className="namectn">
            <label className="namelabel" htmlFor="name">Enter Your Name:</label>
            <input 
              type="text" 
              className="name" 
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button className="submitbtn" type="submit">Submit to Leaderboard</button>
        </form>
      </div>
    </>
  );
}