import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
const WineFilters = () => {
  const props = {};
  props.wineList = [];

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

  const handleSelectType = (eventKey) => {};

  const handleSelectVarietal = (eventKey) => {};

  const handleSelectRegion = (eventKey) => {};

  const handleSelectCountry = (eventKey) => {};

  const handleSelectYear = (eventKey) => {};

  const resetFilters = () => {};

  return (
    <ButtonGroup className="d-flex justify-content-center mb-2">
      <Button className="button-filter" onClick={resetFilters}>
        Reset Filters
      </Button>
      <Dropdown onSelect={handleSelectType}>
        <Dropdown.Toggle className="dropdown-button">Type</Dropdown.Toggle>
        <Dropdown.Menu>{typeDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectVarietal}>
        <Dropdown.Toggle className="dropdown-button">Varietal</Dropdown.Toggle>
        <Dropdown.Menu>{varietalDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectCountry}>
        <Dropdown.Toggle className="dropdown-button">Country</Dropdown.Toggle>
        <Dropdown.Menu>{countryDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectRegion}>
        <Dropdown.Toggle className="dropdown-button">Region</Dropdown.Toggle>
        <Dropdown.Menu>{regionDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectYear}>
        <Dropdown.Toggle className="dropdown-button">Vintage</Dropdown.Toggle>
        <Dropdown.Menu>{vintageDropdownItems}</Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default WineFilters;
