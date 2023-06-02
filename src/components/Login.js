import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonStyle = {
    color: "white",
    backgroundColor: "#722f37",
    borderColor: "#722f37",
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((userCredential) => {
        // Signed in
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100 mt-2"
              style={buttonStyle}
              type="submit"
              onClick={onLogin}>
              Sign In
            </Button>
            <Button
              className="w-100 mt-2"
              style={buttonStyle}
              type="submit"
              onClick={signInWithGoogle}>
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
    </>
  );
};

export default Login;
