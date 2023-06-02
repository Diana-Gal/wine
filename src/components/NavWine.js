import React, { useState, useEffect } from "react";
import { FaWineBottle } from "react-icons/fa";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "firebase/auth";
import { auth, checkIsAdmin } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const NavWine = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const stil = { color: "white", backgroundColor: "#722f37" };
  const styleLogout = {
    textDecoration: "underline",
    border: "none",
    background: "none",
    color: "white",
    padding: 0,
  };
  const [isAdmin, setIsAdmin] = useState(false);

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

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Navbar
      sticky="top"
      style={{ backgroundColor: stil.backgroundColor }}
      expand="md"
      variant="dark">
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
        <Navbar.Text className="mb-2 mb-lg-0">
          {loggedIn ? (
            <div>
              {user?.email},{" "}
              <button onClick={handleLogout} style={styleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={navigateToLogin} style={styleLogout}>
              Sign In
            </button>
          )}
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default NavWine;
