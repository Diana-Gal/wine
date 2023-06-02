import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import WineCatalogue from "./components/wineCatalogue";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  collection,
  deleteDoc,
  addDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { Container } from "react-bootstrap";
import AddWine from "./components/addWine";
import MissingRoute from "./components/missingRoute";
import NavWine from "./components/NavWine";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [wine, setWine] = useState({});
  const [firstRender, setFirstRender] = useState(true); // Variabila ajutatoare pentru a verifica daca avem de-a face cu primul "render" al componentei
  const navigate = useNavigate(); //pt navigare intre pagini

  //functie pt a citi lista de vinuri din baza de date
  const getWineList = async () => {
    const q = query(collection(db, "wines"));
    const querySnapshot = await getDocs(q);
    const newWineList = [];
    querySnapshot.forEach((doc) => {
      const newWine = doc.data();
      newWine.id = doc.id;
      console.log(newWine);
      newWineList.push(newWine);
    });
    if (newWineList) {
      setList(newWineList);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        console.log("logged in");
      } else {
        setLoggedIn(false);
        console.log("no user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Authenticating...</div>;
  }

  //Funcția "addWine" adaugă un vin nou în baza de date
  const addWine = async (wine) => {
    const addedWine = await addDoc(collection(db, "wines"), wine);
    console.log("Vinul adaugat cu ID: ", addedWine.id);
  };

  //Functie folosita pentru a sterge un vin din baza de date folosind id-ul vinului
  const deleteWine = async (id) => {
    await deleteDoc(doc(db, "wines", id));
    getWineList();
  };

  const editSelectedWine = async (id) => {
    const ref = await getDoc(doc(db, "wines", id));
    const wineData = ref.data();
    wineData.id = id;
    setWine(wineData);
    navigate("/editWine"); //  Impun ruta "/editWine", deci declansez afisarea formularului
  };

  //Functie folosita pentru a naviga spre pagina de editare pentru un anumit vin
  //folosind id-ul vinului pentru a aduce datele curente din baza de date
  const editWine = async (wine) => {
    //Functie care updateaza datele despre vinul ales pentru editare
    await updateDoc(doc(db, "wines", wine.id), wine);
    setWine({});
    navigate(`/`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <WineCatalogue
            wineList={list}
            deleteWine={deleteWine}
            editSelectedWine={editSelectedWine}
            getWineList={getWineList}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Signup />
            </div>
          </Container>
        }
      />
      <Route
        path="/addWine"
        element={
          <>
            <NavWine />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}>
              <div className="w-100" style={{ maxWidth: "700px" }}>
                {<AddWine add={addWine} wine={wine} edit={editWine} />}
              </div>
            </Container>
          </>
        }
      />
      <Route
        path="/editWine"
        element={
          <>
            <NavWine />
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}>
              <div className="w-100" style={{ maxWidth: "700px" }}>
                {<AddWine add={addWine} wine={wine} edit={editWine} />}
              </div>
            </Container>
          </>
        }
      />
      <Route path="*" element={<MissingRoute />} />
      <Route
        path="/login"
        element={
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Login />
            </div>
          </Container>
        }
      />
    </Routes>
  );
};

export default App;
