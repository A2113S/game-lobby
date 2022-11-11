import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerPanel from "./components/PlayerPanel";
 
const defaultColors = ["Red", "Blue", "Green", "Yellow"];
 
interface contextValue {
  colors: string[];
  setColors: (colors: string[]) => void;
}
 
const defaultValue: contextValue = {
  colors: defaultColors,
  setColors: (colors) => {},
};
 
export const ColorContext = React.createContext<contextValue>(defaultValue);
 
function GameLobby() {
  // create a state variable called
 
  const [context, setContext] = useState<string[]>([]);
 
  useEffect(() => {
    setContext(defaultColors);
  }, []);
 
  return (
    <ColorContext.Provider value={{ colors: context, setColors: setContext }}>

        <Container style={{height: "600px", border: "1px solid black", marginTop: "25px",}}>
        <h1 style={{margin: "auto", padding: "10px", textAlign: "center"}}>Game Lobby</h1>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: "auto",
                    height: "250px",
                }}
            >
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-around", 
                    border: "1px solid black",
                    width: "50vh",
                    height: "50%",
                }}>
                    <PlayerPanel text="Player 1" />
                </Box>

                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-around", 
                    border: "1px solid black",
                    width: "50vh",
                    height: "50%",
                }}>
                        <PlayerPanel text="Player 2" />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "250px",
                    margin: "auto",
                }}
            >
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-around", 
                    border: "1px solid black",
                    width: "50vh",
                    height: "50%",
                }}>
                        <PlayerPanel text="Player 3" />
                </Box>

                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-around", 
                    border: "1px solid black",
                    width: "50vh",
                    height: "50%",
                }}>
                        <PlayerPanel text="Player 4" />
                </Box>
            </Box>
        </Container>
      
    </ColorContext.Provider>
  );
}
 
export default GameLobby;