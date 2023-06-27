import React, { useEffect, useState } from "react";
import { Alert, Form, Button, Card, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { getDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import NavWine from "./NavWine";
import FooterWine from "./FooterWine";

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
    // Fetches the wine data when component mounts
    const getWine = async (id) => {
      const ref = await getDoc(doc(db, "wines", id));
      setWine(ref.data());
    };

    if (id) {
      getWine(id);
    }
  }, [id]); // Dependency array added to run effect when id changes

  // Adds a new wine to the database
  const addWine = async () => {
    wine.ratings = [];
    await addDoc(collection(db, "wines"), wine);
    navigate(`/`);
  };

  // Updates the selected wine in the database
  const editWine = async () => {
    await updateDoc(doc(db, "wines", id), wine);
    navigate(`/`);
  };

  // Handles form submission
  const handleSubmit = (evt) => {
    const form = evt.currentTarget;
    evt.preventDefault();
    if (form.checkValidity() === false) {
      // Validates form fields
      setAlert({
        type: "danger",
        message: "Please fill in all required fields!",
      }); // Set success message
      return;
    }

    setValidated(true);

    if (id) {
      // Edits an existing wine
      editWine();
      setAlert({ type: "success", message: "Wine edited successfully." });
    } else {
      // Adds a new wine
      addWine(); //  Transmit spre <App /> obiectul carte
      setAlert({ type: "success", message: "Wine added successfully." });
    }
  };

  // Handles input change and updates wine state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWine((prevWine) => ({
      ...prevWine,
      [name]: value,
    }));
  };

  // Generates year options for the select input
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1800; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  return (
    <>
      <NavWine />
      <Container className="d-flex mt-4 justify-content-center mb-6">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {/* Renders the title based on whether it's an edit or add operation */}
                {id ? "Edit Wine" : "Add Wine"}{" "}
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
                  <Form.Select
                    value={wine.year}
                    name="year"
                    onChange={handleChange}
                    aria-label="Year">
                    <option value="">Select Year</option>
                    {generateYearOptions()}
                  </Form.Select>
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
                {alert && (
                  <Alert
                    variant={alert.type}
                    onClose={() => setAlert(null)}
                    dismissible>
                    {alert.message}
                  </Alert>
                )}
                <div className="d-flex justify-content-center">
                  <Button
                    className="w-50 mt-2 button align-self-center"
                    type="submit">
                    {id ? "Edit Wine" : "Add Wine"}
                  </Button>
                </div>
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
