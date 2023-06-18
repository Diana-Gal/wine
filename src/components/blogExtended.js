import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  ModalHeader,
  Form,
  Card,
} from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
const BlogExtended = (props) => {
  const { blog, show, onHide, date, user } = props;
  console.log(user);
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
              <Form.Group className="mt-5 mb-3">
                <Card className="comment">
                  <Card.Body>
                    <Row>
                      <Col md="auto">
                        <Image src={user?.photoURL} roundedCircle></Image>
                      </Col>
                      <Col>
                        <Row className="d-flex align-items-center justify-content-between">
                          <Col>
                            <p className="mb-1">
                              {user.displayName}{" "}
                              <span className="small">- 2 minutes ago</span>
                            </p>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <Button className="blog-button me-1">
                              <BsPencilSquare size="1.25em" className="me-1" />
                              Edit
                            </Button>
                            <Button className="blog-button">
                              <BsTrashFill size="1.25em" className="me-1" />
                              Delete
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              This is just a dummy comment. Don't take it into
                              cosideration.
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
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
