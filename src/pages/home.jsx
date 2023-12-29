import { Link } from "react-router-dom";
import '../css/home.css'

export function Home() {

  return (
    <>
      <div className='header'>
        <div className='title'>
          <Link to="/findme" className='find'>Find<span className='me'>Me</span></Link>
        </div>
        <div className="rightheader">
          <Link to="leaderboard" className="boardlink">Leaderboard</Link>
        </div>
      </div>
      <div className="mainctn">
        <div className="homectn">
          <div className="previewctn">
            <img src='images/radiocity.png' className="previewimg" alt="gameboard preview" />
            <div className="previewlabel">RadioCity</div>
          </div>
          <Link to="game" className="startbtn">Start Game</Link>
        </div>
      </div>
    </>
  );
}