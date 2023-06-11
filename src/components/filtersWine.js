import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GiGrapes, GiWineGlass } from "react-icons/gi";
import { ImMap2 } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { RxReset } from "react-icons/rx";
const WineFilters = (props) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedVarietal, setSelectedVarietal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    props.getWineList(
      selectedType,
      selectedVarietal,
      selectedCountry,
      selectedRegion,
      selectedYear
    );
  }, [
    selectedType,
    selectedVarietal,
    selectedCountry,
    selectedRegion,
    selectedYear,
  ]);

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

  const handleSelectType = (eventKey) => {
    setSelectedType(eventKey);
  };

  const handleSelectVarietal = (eventKey) => {
    setSelectedVarietal(eventKey);
  };

  const handleSelectRegion = (eventKey) => {
    setSelectedRegion(eventKey);
  };

  const handleSelectCountry = (eventKey) => {
    setSelectedCountry(eventKey);
  };

  const handleSelectYear = (eventKey) => {
    setSelectedYear(eventKey);
  };

  const resetFilters = () => {
    setSelectedType("");
    setSelectedVarietal("");
    setSelectedRegion("");
    setSelectedCountry("");
    setSelectedYear("");
  };

  return (
    <ButtonGroup className="d-flex justify-content-center mb-2">
      {selectedType != "" ||
      selectedVarietal != "" ||
      selectedRegion != "" ||
      selectedCountry != "" ||
      selectedYear != "" ? (
        <Button className="button-filter" onClick={resetFilters}>
          <RxReset size="1.75em" />
          Reset Filters
        </Button>
      ) : (
        ""
      )}
      <Dropdown onSelect={handleSelectType}>
        <Dropdown.Toggle className="dropdown-button">
          <GiWineGlass size="2em" />
          {selectedType != "" ? selectedType : "Type"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{typeDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectVarietal}>
        <Dropdown.Toggle className="dropdown-button">
          <GiGrapes size="2em" />
          {selectedVarietal != "" ? selectedVarietal : "Varietal"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{varietalDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectCountry}>
        <Dropdown.Toggle className="dropdown-button">
          <ImMap2 size="2em" />{" "}
          {selectedCountry != "" ? selectedCountry : "Country"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{countryDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectRegion}>
        <Dropdown.Toggle className="dropdown-button">
          <GoLocation size="2em" />
          {selectedRegion != "" ? selectedRegion : "Region"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{regionDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectYear}>
        <Dropdown.Toggle className="dropdown-button">
          <LuCalendar size="2em" />
          {selectedYear != "" ? selectedYear : "Vintage"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{vintageDropdownItems}</Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default WineFilters;
