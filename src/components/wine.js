import { React, useState, useEffect } from "react";
import { Card, Button, Modal, Col, Row, Container } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, db, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ReactStars from "react-rating-stars-component";
import { doc, updateDoc } from "firebase/firestore";
import "../styles.css";
//comp primeste proprietati prin parametrul props care sunt apoi destructurate
const Wine = (props) => {
  const {
    src,
    name,
    country,
    region,
    varietal,
    description,
    type,
    year,
    ratings,
    id,
    deleteWine,
    editSelectedWine,
  } = props; //destructurare props

  const calculateTotalRating = () => {
    if (ratings.length < 1) return;

    let ratingsSum = 0;
    ratings.forEach((rating) => (ratingsSum += rating.value));
    return ratingsSum / ratings.length;
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [totalRating, setTotalRating] = useState(calculateTotalRating());

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUid(user.uid);
      const adminCheck = await checkIsAdmin(user.uid);
      setIsAdmin(adminCheck);
    } else {
      setUid(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  });
  const stil = {
    text: {},
    title: {
      fontSize: "1.4rem",
      textAlign: "center",
      padding: "2px",
    },
  };

  // You can perform any logic here when the rating changes
  const ratingChanged = async (newRating) => {
    if (!isLoggedIn) {
      alert("Please Login before rating a wine.");
      return;
    }

    var existingRating = ratings.find((rating) => rating.uid == uid);

    if (existingRating) {
      existingRating.value = newRating;
    } else {
      ratings.push({ uid: uid, value: newRating });
    }

    const wine = {
      name,
      src,
      country,
      region,
      varietal,
      description,
      type,
      year,
      ratings,
    };
    await updateDoc(doc(db, "wines", id), wine);
    setTotalRating(calculateTotalRating());
  };

  return (
    <>
      <Card className="h-100 card">
        <Card.Body style={stil.cardBody}>
          <Container fluid>
            <Row>
              <Col className="wine-image-col">
                <Card.Img
                  className="wine-image"
                  variant="top"
                  src={"images/" + src}
                />
              </Col>
              <Col className="justify-content-center">
                <Card.Text style={stil.text}>
                  <strong>{totalRating}</strong> ({ratings.length}{" "}
                  {ratings.length > 1 ? "ratings" : "rating"})
                </Card.Text>
                <ReactStars
                  key={totalRating} // Add key prop with totalRating as the value
                  value={totalRating}
                  isHalf={true}
                  count={5}
                  onChange={ratingChanged}
                  size={28}
                  activeColor="#872424"
                  color="#e3e3e3"
                />
              </Col>
            </Row>
            <Row>
              <Card.Title style={stil.title}>{name}</Card.Title>
            </Row>
            <Row>
              <Card.Text style={stil.text}>
                <strong>Country: </strong>
                {country}
              </Card.Text>
              <Card.Text style={stil.text}>
                <strong>Region: </strong>
                {region}
              </Card.Text>
              <Card.Text style={stil.text}>
                <strong>Varietal: </strong>
                {varietal}
              </Card.Text>
              <Card.Text style={stil.text}>
                <strong>Type: </strong>
                {type}
              </Card.Text>
              <Card.Text style={stil.text}>
                <strong>Vintage: </strong>
                {year}
              </Card.Text>
              <Card.Text className="wine-description">{description}</Card.Text>
            </Row>
          </Container>
        </Card.Body>
        {isAdmin ? (
          <Card.Footer>
            <Button variant="link" onClick={() => editSelectedWine(id)}>
              <BsPencilSquare />
            </Button>
            <Button variant="link" onClick={() => deleteWine(id)}>
              <BsTrashFill />
            </Button>
          </Card.Footer>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Wine;
