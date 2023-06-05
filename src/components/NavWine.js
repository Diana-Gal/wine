import React, { useState, useEffect } from "react";
import { FaWineBottle } from "react-icons/fa";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "firebase/auth";
import { auth, checkIsAdmin } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

const NavWine = () => {
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
    <Navbar variant="dark" bg="wine" sticky="top" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto mb-2 mb-lg-0">
            <LinkContainer to="/">
              <Nav.Link>
                <FaWineBottle /> My Wine Collection
              </Nav.Link>
            </LinkContainer>
            {loggedIn && isAdmin ? (
              <LinkContainer to="/addWine">
                <Nav.Link>Add Wine</Nav.Link>
              </LinkContainer>
            ) : null}
            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>{loggedIn ? `${user?.email},` : ""}</Navbar.Text>
        {loggedIn ? (
          <Button className="button" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button className="button" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavWine;
