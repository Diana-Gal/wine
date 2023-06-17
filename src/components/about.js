import React from "react";
import { Container, Image } from "react-bootstrap";
import NavWine from "./NavWine";
import FooterWine from "./FooterWine";

const About = () => {
  return (
    <>
      <NavWine />
      <Container
        className="d-flex mt-4 justify-content-center mb-6"
        style={{ minHeight: "100vh" }}>
        <div className="w-100">
          <h1 style={{ textAlign: "center" }}>
            Wine: A Journey Through Time and Taste
          </h1>
          <Image
            src="images/berne.webp"
            alt="Wine History"
            className="mx-auto d-block my-5"
            style={{ width: "100%", objectFit: "cover" }}
            //width: "100%" sets the width of the image to 100% of its container, which makes the image stretch to the full width of the container.
            //"cover" sets the scaling method for the image. make the image stretch to fill the entire container while still maintaining its aspect ratio, preventing it from becoming distorted.
          />
          <p style={{ fontSize: "1.5em", marginTop: "2em" }}>
            Wine has been an integral part of human civilization for thousands
            of years. From the ancient civilizations of Greece, Rome, and Egypt
            to the modern-day wine connoisseurs, wine has always been a symbol
            of luxury, sophistication, and celebration.
          </p>
          <p style={{ fontSize: "1.5em", marginTop: "2em" }}>
            Wine is made from fermented grapes, and its production can be traced
            back to 6000 BC in the region that is now modern-day Georgia. Over
            time, wine making techniques have been improved, and new varieties
            of grapes have been cultivated, leading to the production of the
            vast range of wines that we have today.
          </p>
          <p style={{ fontSize: "1.5em", marginTop: "2em" }}>
            In this wine catalogue, we have brought together a collection of
            some of the finest wines from around the world. From crisp,
            refreshing whites to full-bodied, robust reds, our selection of
            wines is sure to tantalize your taste buds and transport you on a
            journey through time and taste.
          </p>
          <Image
            src="images/RedWine.jpg"
            alt="Wine History"
            className="mx-auto d-block my-5"
            style={{ width: "100%", objectFit: "cover" }}
          />
          <h3 style={{ textAlign: "center", marginTop: "2em" }}>
            The History of Wine
          </h3>
          <p style={{ fontSize: "1.5em", marginTop: "2em" }}>
            The history of wine dates back thousands of years, with evidence of
            wine production found in ancient civilizations such as Greece and
            Egypt. Over time, wine production has spread throughout the world
            and has become an integral part of many cultures. Today, wine is
            enjoyed by people all over the world, both for its taste and for its
            cultural significance.
          </p>

          <p
            style={{
              fontSize: "1.5em",
              marginTop: "2em",
              textAlign: "center",
            }}>
            Whether you are a seasoned wine enthusiast or just starting out on
            your wine journey, we hope that you will find something to your
            liking in our wine catalogue. So, sit back, relax, and let's raise a
            glass to the magic of wine!
          </p>
        </div>
      </Container>
      <FooterWine />
    </>
  );
};

export default About;
