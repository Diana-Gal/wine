import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  ModalHeader,
} from "react-bootstrap";
const BlogExtended = (props) => {
  const { blog, show, onHide, totalRating } = props;
  const { src, title, date, description } = blog;
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
      scrollable={false}
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>{title}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="mb-4">
          <Row>
            <Col className="image-modal-blog-col d-flex justify-content-center">
              <Image className="blog-modal-image" src={"images/" + src}></Image>
            </Col>
          </Row>
        </Container>

        {splitDescription()}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default BlogExtended;
