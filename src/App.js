import React from "react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Container } from "react-bootstrap";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Signup />
              </div>
            </Container>
          }
        />
        <Route
          path="/login"
          element={
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Login />
              </div>
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
