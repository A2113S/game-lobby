import React from "react";

export const defaultColors = ["Red", "Blue", "Green", "Yellow"];
 
interface contextValue {
  colors: string[];
  setColors: (colors: string[]) => void;
}
 
const defaultValue: contextValue = {
  colors: defaultColors,
  setColors: (colors) => {},
};
 
export const ColorContext = React.createContext<contextValue>(defaultValue);