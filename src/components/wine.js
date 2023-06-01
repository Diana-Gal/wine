import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
//comp primeste proprietati prin parametrul props care sunt apoi destructurate
const Wine = (props) => {
  const {
    src,
    name,
    description,
    country,
    price,
    id,
    deleteWine,
    editSelectedWine,
  } = props; //destructurare props

  const stil = {
    card: {
      width: "100%",
      maxHeight: "550px",
      /*
          width: "14rem",
          display: "flex",
          flexDirection: "column",
          margin: "10px 0"*/
    },
    text: { fontSize: "0.8rem" },
    img: {
      variant: "top",
      width: "100%",
      minHeight: "50%",
      maxHeight: "50%",
      objectFit: "scale-down",
      padding: "2px 0px",
    },
  };

  return (
    <>
      <Card className="h-100" style={stil.card}>
        <Card.Img style={stil.img} src={"images/" + src} />
        <Card.Body>
          <Card.Title>{name.toUpperCase()}</Card.Title>
          <Card.Text style={stil.text}>{description}</Card.Text>
          <Card.Text style={stil.text}>
            <strong>Country:</strong> {country}
          </Card.Text>
          <Card.Text style={stil.text}>
            <strong>Price: </strong>
            {price} euro
          </Card.Text>
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
    </>
  );
};

export default Wine;
