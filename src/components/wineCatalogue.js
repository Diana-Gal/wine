import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import NavWine from "./NavWine";
import WineFilters from "./filtersWine";
import Wine from "./wine";
import FooterWine from "./FooterWine";

import { db } from "../config/firebase";

const WineCatalogue = () => {
  const [wines, setWines] = useState([]);
  const [alert, setAlert] = useState(null); // New state for success/error

  const navigate = useNavigate();

  useEffect(() => {
    getWineList();
  }, []);

  // Fetch the wine list based on filter parameters
  const getWineList = async (
    typeFilter = "",
    varietalFilter = "",
    countryFilter = "",
    regionFilter = "",
    vintageFilter = ""
  ) => {
    let q = collection(db, "wines");

    if (typeFilter) {
      q = query(q, where("type", "==", typeFilter));
    }

    if (varietalFilter) {
      q = query(q, where("varietal", "==", varietalFilter));
    }

    if (countryFilter) {
      q = query(q, where("country", "==", countryFilter));
    }

    if (regionFilter) {
      q = query(q, where("region", "==", regionFilter));
    }

    if (vintageFilter) {
      q = query(q, where("year", "==", vintageFilter));
    }

    const winesDocs = await getDocs(q);
    const newWines = winesDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setWines(newWines);
  };

  // Function to delete a wine from the database based on its ID
  const handleDeleteWine = async (id) => {
    await deleteDoc(doc(db, "wines", id));
    getWineList();
  };

  // Function to navigate to the edit page for a specific wine
  const handleEditWine = async (id) => {
    navigate(`/editWine/${id}`);
  };

  // Render each wine item
  const renderWines = () => {
    return wines.map((item) => {
      const { id, ...wineProps } = item;

      return (
        <Col key={id}>
          <Wine
            id={id}
            handleDeleteWine={handleDeleteWine}
            handleEditWine={handleEditWine}
            setAlert={setAlert}
            alert={alert}
            {...wineProps}
          />
        </Col>
      );
    });
  };
  const filterRowStyle = {
    backgroundColor: "rgb(114, 47, 55)",
  };

  return (
    <>
      <NavWine />
      <Container fluid>
        <Row className="mb-4" style={filterRowStyle}>
          <WineFilters wineList={wines} getWineList={getWineList} />
        </Row>
      </Container>
      <Container>
        <Row>
          {alert && (
            <Alert
              className="mt-2"
              variant={alert.type}
              onClose={() => setAlert(null)}
              dismissible>
              {alert.message}
            </Alert>
          )}
        </Row>
        <Row
          xs={1}
          md={2}
          lg={3}
          xl={4}
          className="g-4 justify-content-md-center mb-6">
          {renderWines()}
        </Row>
        <Row className="mt-4"></Row>
      </Container>
      <FooterWine />
    </>
  );
};

export default WineCatalogue;
