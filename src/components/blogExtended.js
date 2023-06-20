import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import CommentsList from "./commentsList";
import { RiCloseLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { auth, checkIsAdmin, db } from "../config/firebase";
const BlogExtended = (props) => {
  const { blog, show, onHide, date } = props;
  const [comments, setComments] = useState([props.comments]);
  const { src, title, description, id } = blog;
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      alert("Please Login before adding a comment.");
      return;
    }

    const comment = {
      userName: user.displayName,
      src: user.photoURL,
      date: new Date().toLocaleDateString("en-GB"),
      id: uuid(),
      userId: user.uid,
      message: newComment,
    };

    // Add the new comment to the existing comments array
    const updatedComments = [...blog.comments, comment];

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
      className="m-0"
    >
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
                src={"images/" + src}
              ></Image>
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
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="w-50 mt-2 button align-self-center"
                  type="submit"
                >
                  Add Comment
                </Button>
              </div>
            </Form>
          </Row>
          <Row>
            <CommentsList comments={comments} />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="modal-footer d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-1">Posted on: , </p>
          <Button className="blog-button d-flex align-items-center">
            <FaRegComments size="1.5em" className="me-1 mt-1" />
            Comments
          </Button>
        </div>
        <div>
          <Button
            className="blog-button d-flex align-items-center"
            onClick={onHide}
          >
            <RiCloseLine size="1.5em" className="mt-1" />
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default BlogExtended;
