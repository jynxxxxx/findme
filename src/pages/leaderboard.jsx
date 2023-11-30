import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Link } from "react-router-dom";
import '../css/leaderboard.css'

export function Leaderboard() {
  const [scoreboard, setScoreboard] = useState([]);
  const endpoint = "https://us-west-2.aws.data.mongodb-api.com/app/data-mkzqm/endpoint/scoreboard"

  async function fetchScores() {
    try {
      const response = await fetch(endpoint)

      if (response.ok) {
        const scoreboardData = await response.json();

        const formattedScoreboard = scoreboardData.map(score => ({
          ...score,
          date: DateTime.fromISO(score.date).toFormat('dd LLL yyyy'),
        }));        

        setScoreboard(formattedScoreboard); 
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchScores();
  }, []); 

  return (
    <>
      <div className='header'>
        <div className='title'>
          <Link to="/" className='find'>Find<span className='me'>Me</span></Link>
        </div>
        <div className="rightheader">
          <Link to="/game" className="newgame">Play Again</Link>
        </div>
      </div>
      <div className="mainctn">
        <div className='boardtitle'>Leaderboard</div>
        <div className='scoreboard'>
          <div className='boardkey'>
            <div className='scorelabel rankkey'>Rank</div>
            <div className='scorelabel namekey'>Name</div>
            <div className='placeholderkey'></div>
            <div className='scorelabel timekey'>Time</div>
            <div className='scorelabel datekey'>Date</div>
          </div>
          {scoreboard.map((score, index) => (
            <li key={score._id} className='scorecard'>
              <div className='rank'>{index +1}</div>
              <div className='scorename'>{score.name}</div>
              <div className='dotline'>...........</div>
              <div className='scoretime'>{score.gameDuration.toFixed(3)} seconds</div>
              <div className='scoredate'>{score.date}</div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}