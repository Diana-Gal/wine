import {
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
  ModalHeader,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
const WineExtended = (props) => {
  //destructuram props
  const { wine, show, onHide, totalRating } = props;
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
                    size={28}
                    activeColor="#872424"
                    color="#e3e3e3"
                  />
                  {totalRating}({ratings.length}{" "}
                  {ratings.length > 1 ? "ratings" : "rating"})
                </p>
              </div>
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
export default WineExtended;
