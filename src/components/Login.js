import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

import { NavLink, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import FooterWine from "./FooterWine";
import NavWine from "./NavWine";
import "../styles.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null); // State for success/error message

  // Function for signing in with Google
  const signInWithGoogle = async (evt) => {
    evt.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) => {
        // Signed in successfully
        navigate("/"); // Redirect to the home page
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function for handling the login form submission
  const onLogin = (evt) => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => navigate("/")) // Redirect to the home page on successful login
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Set the error message state if login fails
        setAlert({
          type: "danger",
          message: (
            <>
              Email or password incorrect! If you don't have an account, please{" "}
              <NavLink to="/signup" style={{ color: "#722f37" }}>
                Sign Up
              </NavLink>
              !
            </>
          ),
        });

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <NavWine />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign In</h2>
              <Form>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                  />
                </Form.Group>
                {alert && (
                  <Alert
                    className="mt-2 mb-0"
                    variant={alert.type}
                    onClose={() => setAlert(null)}
                    dismissible>
                    {alert.message}
                  </Alert>
                )}
                <Button
                  className="w-100 mt-2 button-style"
                  type="submit"
                  onClick={onLogin}>
                  {/*Call the onLogin function on button click*/}
                  Sign In
                </Button>
                <Button
                  className="w-100 mt-2 button-style"
                  type="submit"
                  onClick={(e) => signInWithGoogle(e)}>
                  Sign In With Google
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account?{" "}
            <NavLink to="/signup" style={{ color: "#722f37" }}>
              Sign up
            </NavLink>
          </div>
        </div>
      </Container>
      <FooterWine />
    </>
  );
};

export default Login;
