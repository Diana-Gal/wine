import NavWine from "./NavWine";
import WineFilters from "./filtersWine";
import { Container, Row, Col } from "react-bootstrap";
import Wine from "./wine";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
const WineCatalogue = () => {
  const [wines, setWines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWineList();
  }, []);

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
    let newWines = winesDocs.docs.map((doc) => {
      let newWine = doc.data();
      newWine.id = doc.id;
      return newWine;
    });
    setWines(newWines);
  };

  //Functie folosita pentru a sterge un vin din baza de date folosind id-ul vinului
  const handleDeleteWine = async (id) => {
    await deleteDoc(doc(db, "wines", id));
    getWineList();
  };

  const handleEditWine = async (id) => {
    navigate(`/editWine/${id}`); //  Impun ruta "/editWine", deci declansez afisarea formularului
  };

  //Functie folosita pentru a naviga spre pagina de editare pentru un anumit vin
  //folosind id-ul vinului pentru a aduce datele curente din baza de date

  //se utilizează metoda "map" pentru a parcurge fiecare element din lista de vinuri "props.wineList
  const list = wines.map((item) => {
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
          handleDeleteWine={handleDeleteWine}
          handleEditWine={handleEditWine}
        />
      </Col>
    );
  });

  const filterRowStyle = {
    backgroundColor: "rgb(114, 47, 55)",
  };

  return (
    <>
      <NavWine />
      <Container fluid>
        <Row style={filterRowStyle}>
          <WineFilters />
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {list}
        </Row>
      </Container>
    </>
  );
};

export default WineCatalogue;
