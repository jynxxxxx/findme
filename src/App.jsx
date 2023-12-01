import { Route, Routes } from "react-router-dom";
import { Gameplay } from "./pages/gameplay";
import { Home } from "./pages/home";
import { Form } from "./pages/form";
import { Leaderboard }  from "./pages/leaderboard";
import './App.css'
import { GameContextProvider } from './context/gameContext.jsx'

function App() {
  return (
    <>
      <GameContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game" element={<Gameplay />} />
          <Route path="form" element={<Form />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </GameContextProvider>
    </>
  );
}

export default App;

