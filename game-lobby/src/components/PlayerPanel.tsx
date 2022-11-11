import { useContext, useEffect, useState } from "react";
import { ColorContext } from "../GameLobby";
 
// interface for the props
interface PlayerPanelProps {
  text: string;
}
 
const PlayerPanel = (props: PlayerPanelProps) => {
  // get the context
  const context = useContext(ColorContext);
 
  // the value of select
  const [value, setValue] = useState<string>("Select Color");
 
  // previous value of select
  const [prevValue, setPrevValue] = useState<string>("none");
 
  const onChange = (e: any) => {
    // change background color of the div
    const element = document.getElementById(props.text);
    if (element) {
      element.style.backgroundColor = e.target.value;
    }
 
    // remove the selected color from the context
    const newColors = context.colors.filter(
      (color) => color !== e.target.value
    );
 
    // if the previous value is not none, add it back to the context
    if (prevValue !== "none") {
      // add the previous value back to the context
      newColors.push(prevValue);
    }
 
    // set the new previous value, value, and context
    setPrevValue(e.target.value);
    setValue(e.target.value);
    context.setColors(newColors);
  };
 
  return (
    <div id={props.text} className="player-panel" style={{width: "100%", height: "100%"}}>
      <h1 style={{marginTop: "0px", fontFamily: "inherit", fontSize: "30px", textAlign: "center"}}>{props.text}</h1>
      <select id="select" onChange={onChange} style={{display:"block", margin: "0 auto"}}>
        <option value="none">{value}</option>
 
        {/* map the colors to the options */}
        {context.colors.map((color: string) => (
          <option id={color + "ID"} key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};
 
export default PlayerPanel;