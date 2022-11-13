import { useContext, useEffect, useState } from "react";
import { ColorContext } from "../context/colorContext";
import "./PlayerPanel.css";
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
    <div id={props.text} className="player-panel" >
      <h1 className="player-header">{props.text}</h1>
      <select id="select" onChange={onChange} className="selectBtn">
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