import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GiGrapes, GiWineGlass } from "react-icons/gi";
import { ImMap2 } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { RxReset } from "react-icons/rx";

const WineFilters = (props) => {
  // State variables
  const [selectedType, setSelectedType] = useState("");
  const [selectedVarietal, setSelectedVarietal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    // Fetch wine list based on selected filters
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

  // Dropdown item generation functions
  const getTypeDropdownItems = () => {
    const uniqueTypes = props.wineList
      .map((wine) => wine.type) // Extracting all the wine types
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return uniqueTypes.map((type) => (
      <Dropdown.Item key={type} eventKey={type}>
        {type}
      </Dropdown.Item>
    ));
  };

  const getVarietalDropdownItems = () => {
    const uniqueVarietals = props.wineList
      .map((wine) => wine.varietal) // Extracting all the wine types
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return uniqueVarietals.map((varietal) => (
      <Dropdown.Item key={varietal} eventKey={varietal}>
        {varietal}
      </Dropdown.Item>
    ));
  };

  const getRegionDropdownItems = () => {
    const uniqueRegions = props.wineList
      .map((wine) => wine.region) // Extracting all the wine types
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return uniqueRegions.map((region) => (
      <Dropdown.Item key={region} eventKey={region}>
        {region}
      </Dropdown.Item>
    ));
  };

  const getCountryDropdownItems = () => {
    const uniqueCountries = props.wineList
      .map((wine) => wine.country)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return uniqueCountries.map((country) => (
      <Dropdown.Item key={country} eventKey={country}>
        {country}
      </Dropdown.Item>
    ));
  };

  const getYearDropdownItems = () => {
    const uniqueYears = props.wineList
      .map((wine) => wine.year)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();

    return uniqueYears.map((year) => (
      <Dropdown.Item key={year} eventKey={year}>
        {year}
      </Dropdown.Item>
    ));
  };

  // Generate dropdown items
  const typeDropdownItems = getTypeDropdownItems();
  const varietalDropdownItems = getVarietalDropdownItems();
  const countryDropdownItems = getCountryDropdownItems();
  const regionDropdownItems = getRegionDropdownItems();
  const vintageDropdownItems = getYearDropdownItems();

  // Event handlers for dropdown selection
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

  // Reset all filters
  const resetFilters = () => {
    setSelectedType("");
    setSelectedVarietal("");
    setSelectedRegion("");
    setSelectedCountry("");
    setSelectedYear("");
  };

  return (
    <ButtonGroup className="d-flex justify-content-center mb-2">
      {selectedType !== "" ||
      selectedVarietal !== "" ||
      selectedRegion !== "" ||
      selectedCountry !== "" ||
      selectedYear !== "" ? (
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
          {selectedType !== "" ? selectedType : "Type"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{typeDropdownItems}</Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleSelectVarietal}>
        <Dropdown.Toggle className="dropdown-button">
          <GiGrapes size="2em" />
          {selectedVarietal !== "" ? selectedVarietal : "Varietal"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{varietalDropdownItems}</Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleSelectCountry}>
        <Dropdown.Toggle className="dropdown-button">
          <ImMap2 size="2em" />{" "}
          {selectedCountry !== "" ? selectedCountry : "Country"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{countryDropdownItems}</Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleSelectRegion}>
        <Dropdown.Toggle className="dropdown-button">
          <GoLocation size="2em" />
          {selectedRegion !== "" ? selectedRegion : "Region"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{regionDropdownItems}</Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleSelectYear}>
        <Dropdown.Toggle className="dropdown-button">
          <LuCalendar size="2em" />
          {selectedYear !== "" ? selectedYear : "Vintage"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{vintageDropdownItems}</Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default WineFilters;
