import NavWine from "./NavWine";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import Wine from "./wine";
import { useEffect, useState, useCallback } from "react";

const WineCatalogue = (props) => {
  let selectedType = "";
  let selectedVarietal = "";
  let selectedCountry = "";
  let selectedRegion = "";
  let selectedYear = "";

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
      <Dropdown.Item key={wine.type} eventKey={wine.type}>
        {wine.type}
      </Dropdown.Item>
    );
  });

  const varietalDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.varietal} eventKey={wine.varietal}>
        {wine.varietal}
      </Dropdown.Item>
    );
  });

  const countryDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.country} eventKey={wine.country}>
        {wine.country}
      </Dropdown.Item>
    );
  });

  const regionDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.region} eventKey={wine.region}>
        {wine.region}
      </Dropdown.Item>
    );
  });

  const vintageDropdownItems = props.wineList.map((wine) => {
    return (
      <Dropdown.Item key={wine.year} eventKey={wine.year}>
        {wine.year}
      </Dropdown.Item>
    );
  });

  const filterRowStyle = {
    backgroundColor: "rgb(114, 47, 55)",
  };

  const handleSelectType = (eventKey) => {
    selectedType = eventKey;
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
    console.log(eventKey);
  };

  const handleSelectVarietal = (eventKey) => {
    selectedVarietal = eventKey;
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
    console.log(eventKey);
  };

  const handleSelectRegion = (eventKey) => {
    selectedRegion = eventKey;
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
    console.log(eventKey);
  };

  const handleSelectCountry = (eventKey) => {
    selectedCountry = eventKey;
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
    console.log(eventKey);
  };

  const handleSelectYear = (eventKey) => {
    selectedYear = eventKey;
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
    console.log(eventKey);
  };

  const resetFilters = () => {
    props.getWineList();
  };
  return (
    <>
      <NavWine />
      <Container fluid>
        <Row style={filterRowStyle}>
          <ButtonGroup className="d-flex justify-content-center mb-2">
            <Button className="button-filter" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Dropdown onSelect={handleSelectType}>
              <Dropdown.Toggle className="dropdown-button">
                Type
              </Dropdown.Toggle>
              <Dropdown.Menu>{typeDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectVarietal}>
              <Dropdown.Toggle className="dropdown-button">
                Varietal
              </Dropdown.Toggle>
              <Dropdown.Menu>{varietalDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectCountry}>
              <Dropdown.Toggle className="dropdown-button">
                Country
              </Dropdown.Toggle>
              <Dropdown.Menu>{countryDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectRegion}>
              <Dropdown.Toggle className="dropdown-button">
                Region
              </Dropdown.Toggle>
              <Dropdown.Menu>{regionDropdownItems}</Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelectYear}>
              <Dropdown.Toggle className="dropdown-button">
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
