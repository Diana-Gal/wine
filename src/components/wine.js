import { React, useState, useEffect } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import WineExtended from "./wineExtended";

import { doc, updateDoc } from "firebase/firestore";
import { auth, db, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "../styles.css";

// Component receives properties through the `props` parameter, which are then destructured
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
    handleEditWine,
    handleDeleteWine,
    setAlert,
    alert,
  } = props; //Destructuring props

  const [modalShow, setModalShow] = useState(false);

  const calculateTotalRating = () => {
    if (ratings.length < 1) return;

    let ratingsSum = 0;
    ratings.forEach((rating) => (ratingsSum += rating.value));

    const averageRating = ratingsSum / ratings.length;
    return parseFloat(averageRating.toFixed(1));
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [totalRating, setTotalRating] = useState(calculateTotalRating());

  useEffect(() => {
    // Use the onAuthStateChanged function to listen for authentication state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUid(user.uid);
        const adminCheck = await checkIsAdmin(user.uid);
        setIsAdmin(adminCheck);
      } else {
        setUid(null);
        setLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  const stil = {
    ratingStyle: {
      fontSize: "50px",
      marginBottom: "0",
    },
    title: {
      fontSize: "1.4rem",
      textAlign: "center",
      padding: "2px",
    },
  };

  // This function is called when the rating changes
  const ratingChanged = async (newRating) => {
    if (!loggedIn) {
      setAlert({
        type: "danger",
        message: "Please Login before rating a wine!",
      });
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

  const onClickCard = () => {
    setModalShow(true);
  };

  return (
    <>
      <Card className="h-100 card-wines">
        <Card.Body>
          <Container fluid>
            <Row>
              <Col className="wine-image-col" onClick={onClickCard}>
                <Card.Img
                  className="wine-image"
                  variant="top"
                  src={"wine/images/" + src}
                />
              </Col>
              <Col className="justify-content-center text-center d-flex flex-column align-items-center">
                <Row className="flex-grow-1 w-100" onClick={onClickCard}></Row>
                <Card.Text onClick={onClickCard} style={stil.ratingStyle}>
                  {totalRating}
                </Card.Text>
                <ReactStars
                  key={totalRating} // Add key prop with totalRating as the value
                  value={totalRating}
                  isHalf={true}
                  count={5}
                  onChange={ratingChanged}
                  size={20}
                  activeColor="#872424"
                  color="#e3e3e3"
                />
                <Card.Text onClick={onClickCard}>
                  ({ratings.length} {ratings.length > 1 ? "ratings" : "rating"})
                </Card.Text>
                <Row className="flex-grow-1 w-100" onClick={onClickCard}></Row>
              </Col>
            </Row>
            <Row onClick={onClickCard}>
              <Card.Title style={stil.title}>{name}</Card.Title>
            </Row>
            <Row onClick={onClickCard}>
              <Card.Text className="mb-1">
                <strong>Country: </strong>
                {country}
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Region: </strong>
                {region}
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Varietal: </strong>
                {varietal}
              </Card.Text>
              <Card.Text className="mb-1">
                <strong>Type: </strong>
                {type}
              </Card.Text>
              <Card.Text className="mb-3">
                <strong>Vintage: </strong>
                {year}
              </Card.Text>
              <Card.Text className="description-overflow">
                {description}
              </Card.Text>
            </Row>
          </Container>
        </Card.Body>
        {isAdmin ? (
          <Card.Footer>
            <Button className="blog-button" onClick={() => handleEditWine(id)}>
              <BsPencilSquare size="1.25em" /> Edit
            </Button>
            <Button
              className="blog-button"
              onClick={() => handleDeleteWine(id)}>
              <BsTrashFill size="1.25em" /> Delete
            </Button>
          </Card.Footer>
        ) : (
          ""
        )}
      </Card>
      <WineExtended
        totalRating={totalRating}
        ratingChanged={ratingChanged}
        wine={props}
        show={modalShow}
        onHide={() => setModalShow(false)}
        alert={alert}
        setAlert={setAlert}
      />
    </>
  );
};

export default Wine;
