import { React, useState, useEffect } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, db, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ReactStars from "react-rating-stars-component";
import { doc, updateDoc } from "firebase/firestore";
import "../styles.css";
//comp primeste proprietati prin parametrul props care sunt apoi destructurate

const Blog = (props) => {
  const { src, title, date, description, id } = props; //destructurare props

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const stil = {
    card: { width: "14rem" },
    text: { fontSize: "0.8rem" },
  };

  const editSelectedBlog = (id) => {};
  const deleteBlog = (id) => {};
  return (
    <>
      <Card style={stil.card}>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{title.toUpperCase()}</Card.Title>
          <Button variant="primary">{description}</Button>
        </Card.Body>
        {isAdmin ? (
          <Card.Footer>
            <Button variant="link" onClick={() => editSelectedBlog(id)}>
              <BsPencilSquare />
            </Button>
            <Button variant="link" onClick={() => deleteBlog(id)}>
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
export default Blog;
