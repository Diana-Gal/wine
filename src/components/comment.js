import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
const Comment = (props) => {
  const { userName, src, id, date, message } = props;
  /*const dateParts = date.split("-");
  const dateToFormat = new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2])
  );
*/
  // Format the date as "DD/MM/YYYY"
  //const formattedDate = dateToFormat.toLocaleDateString("en-GB");

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
                  <span className="small"> - 1 min ago</span>
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
