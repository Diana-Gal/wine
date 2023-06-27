import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import { RiCloseLine } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const WineExtended = (props) => {
  // Destructure props
  const { wine, show, onHide, totalRating, ratingChanged, alert, setAlert } =
    props;
  const {
    src,
    name,
    country,
    region,
    varietal,
    description,
    type,
    year,
    ratings,
  } = wine;

  const splitDescription = () => {
    // Split description into an array of lines
    const descriptionArray = description.split("\\n");
    // Map each line to a paragraph element
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
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h3>{name}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="mb-4">
          <Row>
            <Col className="image-modal-col d-flex justify-content-center">
              <Image className="wine-image" fluid src={"images/" + src}></Image>
            </Col>
            <Col className="d-flex align-items-center">
              <div className="d-flex flex-column fs-5">
                <h3>{name}</h3>
                <p>
                  <strong>Country:</strong> {country}
                </p>
                <p>
                  <strong>Region:</strong> {region}
                </p>
                <p>
                  <strong>Varietal:</strong> {varietal}
                </p>
                <p>
                  <strong>Type:</strong> {type}
                </p>
                <p>
                  <strong>Vintage:</strong> {year}
                </p>
                <p>
                  <ReactStars
                    key={totalRating} // Add key prop with totalRating as the value
                    value={totalRating}
                    isHalf={true}
                    count={5}
                    onChange={ratingChanged}
                    size={28}
                    activeColor="#872424"
                    color="#e3e3e3"
                  />
                  {totalRating}({ratings.length}{" "}
                  {ratings.length > 1 ? "ratings" : "rating"})
                </p>
                {alert && (
                  <Alert
                    className="mt-2"
                    variant={alert.type}
                    onClose={() => setAlert(null)}
                    dismissible>
                    {alert.message}
                  </Alert>
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {splitDescription()}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          className="blog-button d-flex align-items-center"
          onClick={onHide}>
          <RiCloseLine size="1.5em" className="mt-1" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default WineExtended;
