import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Form,
} from "react-bootstrap";
import CommentsList from "./commentsList";

import { RiCloseLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
const BlogExtended = (props) => {
  const { blog, show, onHide, date, user } = props;
  const { src, title, description } = blog;
  const splitDescription = () => {
    const descriptionArray = description.split("\\n");
    const paragraphs = descriptionArray.map((line, index) => (
      <p key={index}>{line}</p>
    ));
    return paragraphs;
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
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fs-3">Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="newComment"
                  placeholder="Add a comment"
                  required
                />
              </Form.Group>
              <Form.Group className="mt-4 mb-3">
                <CommentsList />
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="modal-footer d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-1">Posted on: {date}, </p>
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
