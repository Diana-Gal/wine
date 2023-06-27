import React, { useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Container, Navbar, Nav, Overlay, Tooltip } from "react-bootstrap";
import "../styles.css";

const FooterWine = () => {
  const emailRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("wines4all@gmail.com");
    setShowTooltip(true);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <Navbar
      className="footer"
      variant="light"
      bg="footer"
      expand="md"
      fixed="bottom">
      <Container fluid>
        <Nav className="m-auto flex-column flex-md-row align-items-center">
          <div className="d-flex flex-md-row flex-column">
            <Nav.Link
              href="https://github.com/Diana-Gal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-md-3">
              <FaGithub size="2em" />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/dianagal/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-md-3">
              <FaLinkedin size="2em" />
            </Nav.Link>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <Nav.Item>Copyright © Diana Gal</Nav.Item>
          </div>
        </Nav>

        {/* Contact information */}
        <Nav className="m-auto flex-column flex-md-row align-items-center">
          <div className="d-flex flex-md-row flex-column">
            <Nav.Item>Contact us at:</Nav.Item>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <Nav.Link
              ref={emailRef}
              className="align-content-end"
              onClick={copyToClipboard}
              onMouseOut={hideTooltip}>
              wines4all@gmail.com
            </Nav.Link>

            {/* Email copy */}
            <Overlay
              target={emailRef.current}
              show={showTooltip}
              placement="top">
              {(props) => (
                <Tooltip id="tooltip-email" {...props}>
                  Email copied to clipboard!
                </Tooltip>
              )}
            </Overlay>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default FooterWine;
