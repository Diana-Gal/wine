import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavWine from "./NavWine";
import FooterWine from "./FooterWine";

const About = () => {
  return (
    <>
      <NavWine />
      <Container className="mt-4 mb-6">
        <Row>
          <Col md={6}>
            <Image
              src="images/berne.webp"
              alt="Wine History"
              className="img-fluid my-3"
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h1
                style={{
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}>
                Discover the World of Fine Wines
              </h1>

              <p>
                Wine, a timeless indulgence cherished by wine enthusiasts
                throughout history, represents more than just a beverage. It
                embodies the art of craftsmanship, the essence of diverse
                cultures, and the ability to evoke unforgettable experiences.
              </p>

              <p>
                Our wine app invites you to embark on a remarkable journey of
                taste, passion, and discovery. From ancient vineyards to
                modern-day vineyards, we celebrate the rich heritage and endless
                possibilities of wines.
              </p>

              <p>
                Delve into our carefully curated collection of exquisite wines
                from renowned regions worldwide. Immerse yourself in the
                delightful nuances of crisp whites, elegant reds, and enchanting
                rosés. Every sip is an opportunity to awaken your senses and
                embrace the allure of fine wines.
              </p>

              <p>
                Whether you're a seasoned connoisseur or a curious novice, our
                wine app offers a diverse catalogue, expert recommendations, and
                a community of fellow wine enthusiasts. Let us elevate your wine
                experience and raise a glass to the magic that flows through
                every bottle.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h2 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
                Wine Tasting Events
              </h2>
              <p>
                Join us for exclusive wine tasting events where you can explore
                a variety of wines and learn from expert sommeliers. Discover
                new flavors, expand your knowledge, and connect with fellow wine
                enthusiasts.
              </p>
              <p>
                Our wine tasting events are held regularly at our elegant venues
                and offer a unique opportunity to indulge in the world of wine.
                Don't miss out on this unforgettable experience!
              </p>
            </div>
          </Col>
          <Col md={6}>
            <Image
              src="images/degustare.jpg"
              alt="Wine Tasting"
              className="img-fluid my-3"
            />
          </Col>
        </Row>
      </Container>
      <FooterWine />
    </>
  );
};

export default About;
