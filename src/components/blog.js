import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, checkIsAdmin, db } from "../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";
import { FaRegComments } from "react-icons/fa";
import BlogExtended from "./blogExtended";

const Blog = (props) => {
  const [blog, setBlog] = useState(props);
  const {
    src,
    title,
    date,
    description,
    comments,
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
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const adminCheck = await checkIsAdmin(user.uid);
        setIsAdmin(adminCheck);

        setUser(user);
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
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title className="blog-title">{title}</Card.Title>
          <Card.Subtitle className="mb-2">
            Posted on: {formattedDate}
          </Card.Subtitle>
          <Card.Text className="description-overflow">{description}</Card.Text>
          <Button
            className="more-button align-self-center"
            onClick={onClickCard}>
            <span className="underline-text">Read More</span>
          </Button>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center">
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
          <Button className="blog-button d-flex align-items-center">
            <FaRegComments size="1.5em" className="me-1 mt-1" />
            Comments({comments.length})
          </Button>
        </Card.Footer>
      </Card>
      <BlogExtended
        blog={props}
        date={formattedDate}
        comments={comments}
        show={modalShow}
        user={user}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Blog;
