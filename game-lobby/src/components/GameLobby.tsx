import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerPanel from "./PlayerPanel";
import { ColorContext } from "../context/colorContext";
import "./GameLobby.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get(
        "https://us-central1-aethergamelobby.cloudfunctions.net/getAllColors"
      )
      .then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i] != "white") {
            // remove the existing color from the context
            setContext((prev) => prev.filter((color) => color != res.data[i]));
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const resetOnClick = () => {
    axios
      .post(
        "https://us-central1-aethergamelobby.cloudfunctions.net/resetColors"
      )
      .then((res: any) => {
        setContext(defaultColors);
      })
      .catch((err: any) => {
        console.log(err);
      });

    setContext(defaultColors);
    // wait for 1 second
    // then reload the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

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
      <div className="game-lobby">
        <button className="resetBtn" onClick={resetOnClick}>
          Reset
        </button>
      </div>
    </ColorContext.Provider>
    // add a reset button
  );
}

export default GameLobby;
