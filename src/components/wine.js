import { React, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsTrashFill, BsPencilSquare } from "react-icons/bs";
import { auth, db, checkIsAdmin } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
  const [isAdmin, setIsAdmin] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const adminCheck = await checkIsAdmin(user.uid);
      setIsAdmin(adminCheck);
    } else {
      setIsAdmin(false);
    }
  });

  const stil = {
    card: {
      width: "100%",
      maxHeight: "550px",
    },
    text: {},
    img: {
      variant: "top",
      width: "100%",
      maxHeight: "45%",
      objectFit: "scale-down",
      padding: "2px 0px",
    },
    title: {
      fontSize: "1.4rem",
      textAlign: "center",
      padding: "2px",
    },
  };

  return (
    <>
      <Card className="h-100" style={stil.card}>
        <Card.Img style={stil.img} src={"images/" + src} />
        <Card.Body style={stil.cardBody}>
          <Card.Title style={stil.title}>{name}</Card.Title>
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
            <strong>Vintage: </strong>
            {year}
          </Card.Text>
          <Card.Text style={stil.text}>{description}</Card.Text>
          <Card.Text style={stil.text}></Card.Text>
        </Card.Body>
        {isAdmin ? (
          <Card.Footer>
            <Button variant="link" onClick={() => editSelectedWine(id)}>
              <BsPencilSquare />
            </Button>
            <Button variant="link" onClick={() => deleteWine(id)}>
              <BsTrashFill />
            </Button>
          </Card.Footer>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Wine;
