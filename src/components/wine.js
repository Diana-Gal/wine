import { React, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
//comp primeste proprietati prin parametrul props care sunt apoi destructurate
const Wine = (props) => {
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
    id,
    deleteWine,
    editSelectedWine,
  } = props; //destructurare props

  const [readMore, setReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleReadMore = () => {
    if (description.length > 100) {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  /*const stil = {
    card: {},
    cardBody: {
      height: "200px",
      overflow: "hidden",
    },
    text: { fontSize: "0.8rem" },
    img: {
      variant: "top",
      maxHeight: "35%",
      objectFit: "scale-down",
      padding: "2px 0px",
    },
  };*/

  const stil = {
    card: {
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    text: {
      fontSize: "0.8rem",
      color: "#555",
    },
    img: {
      variant: "top",
      maxHeight: "35%",
      objectFit: "scale-down",
      padding: "2px 0px",
    },
    title: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      borderTop: "1px solid #eee",
      paddingTop: "10px",
    },
    button: {
      fontSize: "1.2rem",
      marginRight: "10px",
      color: "#555",
    },
    cardBody: {
      height: "200px",
      overflow: "hidden",
    },
  };

  return (
    <>
      <Card className="h-100" style={stil.card}>
        <Card.Img style={stil.img} src={"images/" + src} />
        <Card.Body style={stil.cardBody}>
          <Card.Title>{name.toUpperCase()}</Card.Title>
          <Card.Text style={stil.text}>
            <strong>Country: </strong>
            {country}
          </Card.Text>
          <Card.Text style={stil.text}>
            <strong>Region: </strong>
            {region}
          </Card.Text>
          <Card.Text style={stil.text}>
            <strong>Varietal: </strong>
            {varietal}
          </Card.Text>
          <Card.Text style={stil.text}>
            <strong>Type: </strong>
            {type}
          </Card.Text>
          <Card.Text style={stil.text}>
            <strong>Year: </strong>
            {year}
          </Card.Text>
          {readMore ? (
            <Card.Text style={stil.text}>{description}</Card.Text>
          ) : (
            <Card.Text style={stil.text}>
              {description.substring(0, 100)}...
            </Card.Text>
          )}
          {!readMore && (
            <Button variant="link" style={stil.button} onClick={handleReadMore}>
              Read More
            </Button>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="link" onClick={() => editSelectedWine(id)}>
            <BsPencilSquare />
          </Button>
          <Button variant="link" onClick={() => deleteWine(id)}>
            <BsTrashFill />
          </Button>
        </Card.Footer>
      </Card>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Text style={stil.text}>{description}</Card.Text>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Wine;
