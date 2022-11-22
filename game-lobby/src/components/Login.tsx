import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  // set the email and password to empty strings, changeable by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useAuthState is a hook that returns the user and loading state
  const [user, loading] = useAuthState(auth);

  // useNavigate is a hook that returns a function to navigate to a new route
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/gamelobby");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login-container">
        <input
          className="login-textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          className="login-textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login-btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
