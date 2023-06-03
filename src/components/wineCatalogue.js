import NavWine from "./NavWine";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Wine from "./wine";
import { useEffect } from "react";

const WineCatalogue = (props) => {
  useEffect(() => {
    props.getWineList();
  }, []);
  //se utilizează metoda "map" pentru a parcurge fiecare element din lista de vinuri "props.wineList
  const list = props.wineList.map((item) => {
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
    } = item; //  Am destructurat obiectul "item"

    return (
      <Col key={id}>
        <Wine
          src={src}
          name={name}
          country={country}
          region={region}
          varietal={varietal}
          description={description}
          type={type}
          year={year}
          ratings={ratings}
          id={id}
          deleteWine={props.deleteWine}
          editSelectedWine={props.editSelectedWine}
        />
      </Col>
    );
  });

  const typeDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.type} eventKey="{wine.type}">
        {wine.type}
      </Dropdown.Item>
    );
  });

  const varietalDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.varietal} eventKey="{wine.varietal}">
        {wine.varietal}
      </Dropdown.Item>
    );
  });

  const countryDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.country} eventKey="{wine.country}">
        {wine.country}
      </Dropdown.Item>
    );
  });

  const regionDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.region} eventKey="{wine.region}">
        {wine.region}
      </Dropdown.Item>
    );
  });

  const vintageDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.year} eventKey="{wine.year}">
        {wine.year}
      </Dropdown.Item>
    );
  });

  const filterRowStyle = {
    backgroundColor: "rgb(114, 47, 55)",
  };

  const dropdownButtonStyle = {
    "--bs-btn-color": "rgba(255, 255, 255, 0.55)",
    "--bs-btn-bg": "rgb(114, 47, 55)",
    "--bs-btn-border-color": "rgb(114, 47, 55)",
    "--bs-btn-hover-color": "white",
    "--bs-btn-hover-bg": "rgb(114, 47, 55)",
    "--bs-btn-hover-border-color": "rgb(114, 47, 55)",
    "--bs-btn-active-bg": "rgb(114, 47, 55)",
    "--bs-btn-active-border-color": "rgb(114, 47, 55)",
  };
  return (
    <>
      <NavWine />
      <Container fluid>
        <Row style={filterRowStyle}>
          <ButtonGroup className="d-flex justify-content-center mb-2">
            <Dropdown>
              <Dropdown.Toggle style={dropdownButtonStyle}>
                Type
              </Dropdown.Toggle>
              <Dropdown.Menu>{typeDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle style={dropdownButtonStyle}>
                Varietal
              </Dropdown.Toggle>
              <Dropdown.Menu>{varietalDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle style={dropdownButtonStyle}>
                Country
              </Dropdown.Toggle>
              <Dropdown.Menu>{countryDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle style={dropdownButtonStyle}>
                Region
              </Dropdown.Toggle>
              <Dropdown.Menu>{regionDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle style={dropdownButtonStyle}>
                Vintage
              </Dropdown.Toggle>
              <Dropdown.Menu>{vintageDropdownItems}</Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {list}
        </Row>
      </Container>
    </>
  );
};

export default WineCatalogue;
