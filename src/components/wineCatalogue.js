import NavWine from "./NavWine";
import { Container, Row, Col } from "react-bootstrap";
import Wine from "./wine";

const WineCatalogue = (props) => {
  //se utilizează metoda "map" pentru a parcurge fiecare element din lista de vinuri "props.wineList
  const list = props.wineList.map((item) => {
    const { src, name, description, country, price, id } = item; //  Am destructurat obiectul "item"
    return (
      <Col key={id}>
        <Wine
          src={src}
          name={name}
          description={description}
          country={country}
          price={price}
          id={id}
          deleteWine={props.deleteWine}
          editSelectedWine={props.editSelectedWine}
        />
      </Col>
    );
  });

  const titleStyle = {
    margin: "2em 0 1em 0",
    textAlign: "center",
  };

  return (
    <>
      <NavWine />
      <Container>
        <h1 style={titleStyle}> Wines for All </h1>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {list}
        </Row>
      </Container>
    </>
  );
};

export default WineCatalogue;
