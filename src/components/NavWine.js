import React, { useState, useEffect } from "react";
import { FaWineBottle, FaPlus, FaRegUser } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { GoLightBulb } from "react-icons/go";
import { SlLogout, SlLogin } from "react-icons/sl";
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
                <FaWineBottle size="1.25em" /> My Wine Collection
              </Nav.Link>
            </LinkContainer>
            {loggedIn && isAdmin ? (
              <LinkContainer to="/addWine">
                <Nav.Link>
                  <FaPlus size="1.25em" /> Add Wine
                </Nav.Link>
              </LinkContainer>
            ) : null}
            <LinkContainer to="/blog">
              <Nav.Link>
                <BsPostcard size="1.5em" /> Blog
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>
                <GoLightBulb size="1.25em" />
                About
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          {loggedIn ? (
            <>
              {<FaRegUser size="1.25em" />} {`${user?.email},`}
            </>
          ) : (
            ""
          )}
        </Navbar.Text>
        {loggedIn ? (
          <Button className="button" onClick={handleLogout}>
            <SlLogout size="1.25em" /> Logout
          </Button>
        ) : (
          <Button className="button" onClick={handleLogin}>
            <SlLogin size="1.25em" /> Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavWine;
