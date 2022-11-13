import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerPanel from "./PlayerPanel";
import { ColorContext } from "../context/colorContext";
import "./GameLobby.css";
 
const defaultColors = ["Red", "Blue", "Green", "Yellow"];

function GameLobby() {
  // create a state variable called
 
  const [context, setContext] = useState<string[]>([]);
 
  useEffect(() => {
    setContext(defaultColors);
  }, []);
 
  return (
    <ColorContext.Provider value={{ colors: context, setColors: setContext }}>

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