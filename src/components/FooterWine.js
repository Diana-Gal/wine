import React, { useState, useEffect } from "react";
import { FaGithub, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { GoLightBulb } from "react-icons/go";
import { SlLogout, SlLogin } from "react-icons/sl";
import { Container, Navbar, Nav, Button, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "firebase/auth";
import { auth, checkIsAdmin } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

const FooterWine = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
        const adminCheck = await checkIsAdmin(user.uid);
        setIsAdmin(adminCheck);
      } else {
        setIsAdmin(false);
        setLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar className="footer" variant="light" bg="footer" expand="md">
      <Container fluid>
        <Nav className="m-auto flex-column flex-md-row align-items-center">
          <div className="d-flex flex-md-row flex-column">
            <Nav.Link className="mr-md-3">
              <FaGithub size="2em" />
            </Nav.Link>
            <Nav.Link className="mr-md-3">
              <FaFacebookSquare size="2em" />
            </Nav.Link>
            <Nav.Link>
              <FaLinkedin size="2em" />
            </Nav.Link>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <Nav.Item>Copyright © Diana Gal</Nav.Item>
          </div>
        </Nav>
        <Nav className="m-auto flex-column flex-md-row align-items-center">
          <div className="d-flex flex-md-row flex-column">
            <Nav.Item>Contact us at:</Nav.Item>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <Nav.Link className="align-content-end">
              wines4all@gmail.com
            </Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default FooterWine;
