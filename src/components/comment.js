import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, checkIsAdmin } from "../config/firebase";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
const Comment = (props) => {
  const { userName, src, id, userId, date, message, deleteComment } = props;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const adminCheck = await checkIsAdmin(user.uid);
        setIsAdmin(adminCheck);
        console.log(user);

        setUser(user);
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <Card className="mb-2 comment">
      <Card.Body>
        <Row>
          <Col md="auto">
            <Image src={src} roundedCircle></Image>
          </Col>
          <Col>
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <p className="mb-1">
                  {userName}
                  <span className="small"> - {date}</span>
                </p>
              </Col>
              {(isLoggedIn && user?.uid == userId) || isAdmin ? (
                <Col className="d-flex justify-content-end">
                  <Button
                    className="blog-button"
                    onClick={() => deleteComment(id)}>
                    <BsTrashFill size="1.25em" className="me-1" />
                    Delete
                  </Button>
                </Col>
              ) : (
                ""
              )}
            </Row>
            <Row>
              <Col>
                <p>{message}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Comment;
