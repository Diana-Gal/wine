import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

const Blog = (props) => {
  const { src, title, date, description, id } = props;
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
    console.log("Edit blog with ID:", id);
  };

  const deleteBlog = (id) => {
    // Implement your delete logic here
    console.log("Delete blog with ID:", id);
  };

  return (
    <Row className="row-cols-1 row-cols-md-2 g-4">
      <Col>
        <Card>
          <Card.Img variant="top" src={src} alt="Blog Image" />
          <Card.Body>
            <Card.Title>{title.toUpperCase()}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {formattedDate}
            </Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            {isAdmin && (
              <div>
                <Button
                  variant="primary"
                  onClick={() => editSelectedBlog(id)}
                  className="me-2">
                  <BsPencilSquare /> Edit
                </Button>
                <Button variant="danger" onClick={() => deleteBlog(id)}>
                  <BsTrashFill /> Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
      {/* Add more Col components for additional blog posts */}
    </Row>
  );
};

export default Blog;
