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
      <div className="App">
        <h1>Hello World</h1>
        <PlayerPanel text="Player 1" />
        <PlayerPanel text="Player 2" />
        <PlayerPanel text="Player 3" />
        <PlayerPanel text="Player 4" />
      </div>
    </ColorContext.Provider>
  );
}
 
export default GameLobby;