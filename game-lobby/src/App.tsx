import React from "react";
import GameLobby from "./GameLobby";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gamelobby" element={<GameLobby />} />
      </Routes>
    </Router>
  );
}
 
export default App;
