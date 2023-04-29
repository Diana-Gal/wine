import React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        console.log("logged in");
      } else {
        setLoggedIn(false);
        console.log("no user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Authenticating...</div>;
  }

  return (
    <Router>
      <div>
        <h1>Wines</h1>
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            loggedIn ? <Navigate to={"/home"} /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
