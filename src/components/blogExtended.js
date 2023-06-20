import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Form,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CommentsList from "./commentsList";
import { RiCloseLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { auth, checkIsAdmin, db } from "../config/firebase";
const BlogExtended = (props) => {
  const { blog, show, onHide, date } = props;
  const { src, title, description, id } = blog;
  const [comments, setComments] = useState(props.comments);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState(null);
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

  const splitDescription = () => {
    const descriptionArray = description.split("\\n");
    const paragraphs = descriptionArray.map((line, index) => (
      <p key={index}>{line}</p>
    ));
    return paragraphs;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Prevent default form submission behavior
    addComment(newComment);
  };

  const onChangeComment = (e) => {
    const { name, value } = e.target;
    setNewComment(value);
  };

  //Funcția "addComment" adaugă un comment nou in baza de date
  const addComment = async (newComment) => {
    if (!isLoggedIn) {
      setAlert({
        type: "danger",
        message: "Please login before adding a comment!",
      });
      return;
    }

    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const comment = {
      userName: user.displayName,
      src: user.photoURL,
      date: currentDate,
      id: uuid(),
      userId: user.uid,
      message: newComment,
    };

    // Add the new comment to the existing comments array
    const updatedComments = [...comments, comment];

    try {
      await updateDoc(doc(db, "blog", id), { comments: updatedComments });
    } catch (err) {
      console.error(err);
    }
    setNewComment("");
    setComments(updatedComments);
  };

  //Funcția "deleteComment" adaugă un comment nou in baza de date
  const deleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id != commentId
    );

    try {
      await updateDoc(doc(db, "blog", id), { comments: updatedComments });
    } catch (err) {
      console.error(err);
    }

    setComments(updatedComments);
  };

  return (
    <Modal
      keyboard={true}
      scrollable={true}
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="m-0">
      <Modal.Body>
        <Container fluid className="mb-4">
          <Row className="text-center mb-3">
            <h3>{title}</h3>
          </Row>
          <Row>
            <Col className="image-modal-blog-col d-flex justify-content-center">
              <Image
                className="blog-modal-image"
                fluid
                src={"images/" + src}></Image>
            </Col>
          </Row>
        </Container>
        <Container>{splitDescription()}</Container>
        <Container>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-3">Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={newComment}
                  name="newComment"
                  onChange={onChangeComment}
                  placeholder="Add a comment"
                  required
                />

                {alert && (
                  <Alert
                    className="mt-2 mb-0"
                    variant={alert.type}
                    onClose={() => setAlert(null)}
                    dismissible>
                    {alert.message}
                  </Alert>
                )}

                <div className="d-flex justify-content-end">
                  <Button
                    className="w-20 mt-2 button align-self-center"
                    type="submit">
                    Add Comment
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <CommentsList comments={comments} deleteComment={deleteComment} />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="modal-footer d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-1">Posted on: {date} </p>
          <Button
            className="blog-button d-flex align-items-center"
            onClick={() =>
              document
                .getElementById("comments-list")
                .scrollIntoView({ behavior: "smooth" })
            }>
            <FaRegComments size="1.5em" className="me-1 mt-1" />
            Comments({comments.length})
          </Button>
        </div>
        <div>
          <Button
            className="blog-button d-flex align-items-center"
            onClick={onHide}>
            <RiCloseLine size="1.5em" className="mt-1" />
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default BlogExtended;
