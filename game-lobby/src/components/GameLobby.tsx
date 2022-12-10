import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerPanel from "./PlayerPanel";
import { ColorContext } from "../context/colorContext";
import "./GameLobby.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { setuid } from "process";

const defaultColors = ["Red", "Blue", "Green", "Yellow"];
const defaultImage =
  "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg";

function GameLobby() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const [context, setContext] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imageURL, setImageURL] = useState("");
  const [uid, setUID] = useState(0);

  useEffect(() => {
    setContext(defaultColors);
  }, []);

  const getAllColors = () => {
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
  };

  const getAllImages = () => {
    axios
      .get("https://us-central1-aethergamelobby.cloudfunctions.net/getImages")
      .then((res: any) => {
        setImages(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllColors();
    getAllImages();
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

    axios
      .post(
        "https://us-central1-aethergamelobby.cloudfunctions.net/resetImages"
      )
      .then((res: any) => {
        setImages([]);
        setImageURL("");
        setUID(0);
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

  // function that takes in image url and stores it in the database
  function setImage() {
    console.log("imageURL: " + imageURL);
    axios
      .post(
        `https://us-central1-aethergamelobby.cloudfunctions.net/storeImage?image=${imageURL}&uid=${uid}`
      )
      .then((res: any) => {})
      .catch((err: any) => {
        console.log(err);
      });

    handleClose();

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const displayImage = (event: any) => {
    // if url is valid, then display default image
    if (event != "") {
      setImageURL(event.target.value);
    } else {
      setImageURL(defaultImage);
    }
  };

  const handleImage = (uid: number) => {
    setUID(uid);
    handleShow();
    console.log("uid: " + uid);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Image URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="modalInput" type="text" onChange={displayImage} />
          <img className="modalImage" src={imageURL} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={setImage}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
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
              <div className="profilePicPanel">
                <img
                  src={images[0]}
                  className="profilePic"
                  onClick={() => handleImage(1)}
                />
              </div>
              <div className="profileInfoPanel">
                <PlayerPanel text="Player 1" />
              </div>
            </Box>

            <Box className="innerBox">
              <div className="profilePicPanel">
                <img
                  src={images[1]}
                  className="profilePic"
                  onClick={() => handleImage(2)}
                />
              </div>
              <div className="profileInfoPanel">
                <PlayerPanel text="Player 2" />
              </div>
            </Box>
          </Box>

          <Box className="outerBox">
            <Box className="innerBox">
              <div className="profilePicPanel">
                <img
                  src={images[2]}
                  className="profilePic"
                  onClick={() => handleImage(3)}
                />
              </div>
              <div className="profileInfoPanel">
                <PlayerPanel text="Player 3" />
              </div>
            </Box>

            <Box className="innerBox">
              <div className="profilePicPanel">
                <img
                  src={images[3]}
                  className="profilePic"
                  onClick={() => handleImage(4)}
                />
              </div>
              <div className="profileInfoPanel">
                <PlayerPanel text="Player 4" />
              </div>
            </Box>
          </Box>
        </Container>
        <div className="game-lobby">
          <button className="resetBtn" onClick={resetOnClick}>
            Reset
          </button>
        </div>
      </ColorContext.Provider>
    </div>

    // add a reset button
  );
}

export default GameLobby;
