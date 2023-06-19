import { Card, Row, Col, Button } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
const Comment = (props) => {
  return (
    <Card className="mb-2 comment">
      <Card.Body>
        <Row>
          <Col md="auto">
            <Image src={user?.photoURL} roundedCircle></Image>
          </Col>
          <Col>
            <Row className="d-flex align-items-center justify-content-between">
              <Col>
                <p className="mb-1">
                  {user?.displayName}
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
                  This is just a dummy comment. Don't take it into cosideration.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Comment;
