import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import FooterWine from "./FooterWine";
import NavWine from "./NavWine";
import "../styles.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alert, setAlert] = useState(null); // State for success/error message

  const onSubmit = async (evt) => {
    evt.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: userName });

        // User signed up successfully
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Set the error message state if signup fails
        setAlert({
          type: "danger",
          message: "Failed to sign up. Please try again.",
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
              <h2 className="text-center mb-4">Sign Up</h2>
              <Form>
                <Form.Group id="userName">
                  <Form.Label>User Name*</Form.Label>
                  <Form.Control
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Name"
                    required
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>* Indicates a required field</Form.Label>
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
                  onClick={onSubmit}>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <NavLink to="/login" style={{ color: "#722f37" }}>
              Sign in
            </NavLink>
          </div>
        </div>
      </Container>
      <FooterWine />
    </>
  );
};

export default Signup;
