import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

const Blog = (props) => {
  const { src, title, date, description, id } = props;
  const shortDescription =
    "This is a short description This is a short descriptionThis is a short descriptionThis is a short descriptionThis is a short descriptionThis is a short descriptionThis is a short description \n shortDescriptionshortDescriptionshortDescriptionshortDescriptionshortDescriptionshortDescription";
  const formattedDate = date.toDate().toLocaleDateString();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const editSelectedBlog = (id) => {
    // Implement your edit logic here
    navigate(`/editWine/${id}`);
  };

  const deleteBlog = async (id) => {
    // Implement your delete logic here
    await deleteDoc(doc(db, "blog", id));
  };

  return (
    <Card className="h-100 card-blog">
      <Card.Header className="d-flex justify-content-between blog-header">
        <div className="d-flex align-items-center">
          <Card.Text>Posted on: {formattedDate}</Card.Text>
        </div>
        <div className="d-flex align-items-center">
          <Card.Text>Last changed: 1 minute ago</Card.Text>
        </div>
      </Card.Header>
      <Card.Img
        className="blog-image"
        variant="top"
        src={"images/" + src}
        alt="Blog Image"
      />
      <Card.Body>
        <Card.Title className="blog-title">{title}</Card.Title>
        <Card.Text>{shortDescription}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {isAdmin && (
          <div>
            <Button
              onClick={() => editSelectedBlog(id)}
              className="me-2 blog-button"
            >
              <BsPencilSquare size="1.25em" /> Edit
            </Button>
            <Button className="blog-button" onClick={() => deleteBlog(id)}>
              <BsTrashFill size="1.25em" /> Delete
            </Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default Blog;
