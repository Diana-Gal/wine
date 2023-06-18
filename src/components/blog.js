import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, checkIsAdmin, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";
import BlogExtended from "./blogExtended";
const Blog = (props) => {
  const {
    src,
    title,
    date,
    description,
    handleDeleteBlog,
    handleEditBlog,
    id,
  } = props;
  const dateParts = date.split("-");
  const dateToFormat = new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );

  // Format the date as "DD/MM/YYYY"
  const formattedDate = dateToFormat.toLocaleDateString("en-GB");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const adminCheck = await checkIsAdmin(user.uid);
        setIsAdmin(adminCheck);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  const onClickCard = () => {
    setModalShow(true);
  };

  return (
    <>
      <Card className="h-100 card-blog" onClick={onClickCard}>
        <Card.Img
          className="blog-image"
          variant="top"
          src={"images/" + src}
          alt="Blog Image"
        />
        <Card.Body>
          <Card.Title className="blog-title">{title}</Card.Title>
          <Card.Subtitle className="mb-2">
            Posted on: {formattedDate}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {isAdmin && (
            <div>
              <Button
                onClick={() => handleEditBlog(id)}
                className="me-2 blog-button">
                <BsPencilSquare size="1.25em" /> Edit
              </Button>
              <Button
                className="blog-button"
                onClick={() => handleDeleteBlog(id)}>
                <BsTrashFill size="1.25em" /> Delete
              </Button>
            </div>
          )}
        </Card.Footer>
      </Card>
      <BlogExtended
        blog={props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Blog;
