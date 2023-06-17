import React, { useEffect, useState } from "react";
import { Alert, Form, Button, Card, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { getDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import NavWine from "./NavWine";
import FooterWine from "./FooterWine";
//useState: functie-admite parametri care sunt folositi pt a impune valoarea initiala a variabilelor
//Componenta utilizează hook-ul "useState" pentru a gestiona starea componentei.
const AddWine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState({
    name: "",
    type: "",
    varietal: "",
    region: "",
    country: "",
    year: null,
    src: "",
    description: "",
  });
  const [alert, setAlert] = useState(null); // New state for success/error
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getWine = async (id) => {
      const ref = await getDoc(doc(db, "wines", id));
      setWine(ref.data());
    };

    if (id) {
      getWine(id);
    }
  }, []);

  //Funcția "addWine" adaugă un vin nou în baza de date
  const addWine = async () => {
    wine.ratings = [];
    await addDoc(collection(db, "wines"), wine);
    navigate(`/`);
  };

  const editWine = async () => {
    //Functie care updateaza datele despre vinul ales pentru editare
    await updateDoc(doc(db, "wines", id), wine);
    navigate(`/`);
  };

  //am creat un obiect wine care il transmit la app prin apel fct props.transfer
  const handleSubmit = (evt) => {
    const form = evt.currentTarget;
    evt.preventDefault();
    if (form.checkValidity() === false) {
      setAlert({
        type: "danger",
        message: "Please fill in all required fields!",
      }); // Set success message
      return;
    }

    setValidated(true);

    if (id) {
      editWine();
      setAlert({ type: "success", message: "Wine edited successfully." }); // Set success message
    } else {
      addWine(); //  Transmit spre <App /> obiectul carte
      setAlert({ type: "success", message: "Wine added successfully." }); // Set success message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWine((prevWine) => ({
      ...prevWine,
      [name]: value,
    }));
  };

  return (
    <>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <NavWine />
      <Container className="d-flex mt-4 justify-content-center">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {id ? "Edit Wine" : "Add Wine"}
              </h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name*:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Country*:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.country}
                    name="country"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Region:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.region}
                    name="region"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Varietal:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.varietal}
                    name="varietal"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type*:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.type}
                    name="type"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Year:</Form.Label>
                  <Form.Control
                    type="number"
                    value={wine.year}
                    name="year"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    type="text"
                    value={wine.src}
                    name="src"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    value={wine.description}
                    name="description"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>* Indicates a required field</Form.Label>
                </Form.Group>
                <Button className="w-100 mt-2 button" type="submit">
                  {id ? "Edit Wine" : "Add Wine"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <FooterWine />
    </>
  );
};

export default AddWine;
