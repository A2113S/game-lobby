import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerPanel from "./PlayerPanel";
import { ColorContext } from "../context/colorContext";
import "./GameLobby.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";

const defaultColors = ["Red", "Blue", "Green", "Yellow"];

function GameLobby() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  // create a state variable called

  const [context, setContext] = useState<string[]>([]);

  useEffect(() => {
    setContext(defaultColors);
  }, []);

  return (
    <ColorContext.Provider value={{ colors: context, setColors: setContext }}>
      <div className="game-lobby">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <Container className="container">
        <h1 className="header">Game Lobby</h1>
        <Box className="outerBox">
          <Box className="innerBox">
            <PlayerPanel text="Player 1" />
          </Box>

          <Box className="innerBox">
            <PlayerPanel text="Player 2" />
          </Box>
        </Box>

        <Box className="outerBox">
          <Box className="innerBox">
            <PlayerPanel text="Player 3" />
          </Box>

          <Box className="innerBox">
            <PlayerPanel text="Player 4" />
          </Box>
        </Box>
      </Container>
    </ColorContext.Provider>
  );
}

export default GameLobby;
