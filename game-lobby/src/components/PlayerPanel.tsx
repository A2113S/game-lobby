import { useContext, useEffect, useState } from "react";
import { ColorContext } from "../context/colorContext";
import "./PlayerPanel.css";
import axios from "axios";

// interface for the props
interface PlayerPanelProps {
  text: string;
}

function setColor(uid: number, color: string) {
  axios
    .post(
      `https://us-central1-aethergamelobby.cloudfunctions.net/storeColor?color=${color}&uid=${uid}`
    )
    .then((res: any) => {})
    .catch((err: any) => {
      console.log(err);
    });
}

function getUid(player_text: string) {
  if (player_text.includes("1")) {
    return 1;
  } else if (player_text.includes("2")) {
    return 2;
  } else if (player_text.includes("3")) {
    return 3;
  } else if (player_text.includes("4")) {
    return 4;
  }
}

const PlayerPanel = (props: PlayerPanelProps) => {
  const [panelColor, setPanelColor] = useState<string>("");

  // previous value of select
  const [prevValue, setPrevValue] = useState<string>("none");

  const context = useContext(ColorContext);
  useEffect(() => {
    axios
      .post(
        `https://us-central1-aethergamelobby.cloudfunctions.net/getColor?uid=${getUid(
          props.text
        )}`
      )
      .then((res: any) => {
        setPanelColor(res.data);
        // if res.data is empty

        if (res.data.length != 0) {
          setValue(res.data);
          setPrevValue(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // the value of select
  const [value, setValue] = useState<string>("Select Color");

  const onChange = (e: any) => {
    // change background color of the div
    const element = document.getElementById(props.text);
    if (element) {
      if (props.text.includes("1")) {
        setColor(1, e.target.value);
        setPanelColor(e.target.value);
      } else if (props.text.includes("2")) {
        setColor(2, e.target.value);
        setPanelColor(e.target.value);
      } else if (props.text.includes("3")) {
        setColor(3, e.target.value);
        setPanelColor(e.target.value);
      } else if (props.text.includes("4")) {
        setColor(4, e.target.value);
        setPanelColor(e.target.value);
      }

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
    <div
      id={props.text}
      className="player-panel"
      style={{ backgroundColor: panelColor }}
    >
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
