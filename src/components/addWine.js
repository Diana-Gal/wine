import React, { useState } from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
//useState: functie-admite parametri care sunt folositi pt a impune valoarea initiala a variabilelor
//Componenta utilizează hook-ul "useState" pentru a gestiona starea componentei.
const AddWine = (props) => {
  const [src, setSrc] = useState(props.wine.src || "");
  const [name, setName] = useState(props.wine.name || "");
  const [description, setDescription] = useState(props.wine.description || "");
  const [country, setCountry] = useState(props.wine.country || "");
  const [region, setRegion] = useState(props.wine.region || "");
  const [varietal, setVarietal] = useState(props.wine.varietal || "");
  const [type, setType] = useState(props.wine.type || "");
  const [year, setYear] = useState(props.wine.year || "");
  const [alert, setAlert] = useState(null); // New state for success/error
  const [validated, setValidated] = useState(false);

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
    const wine = {
      name,
      src,
      country,
      region,
      varietal,
      description,
      type,
      year,
      ratings: [],
    };

    if (props.wine.id) {
      wine.id = props.wine.id;
      props.edit(wine);
      setAlert({ type: "success", message: "Wine edited successfully." }); // Set success message
    } else {
      props.add(wine); //  Transmit spre <App /> obiectul carte
      setAlert({ type: "success", message: "Wine added successfully." }); // Set success message
    }
  };

  const clearFields = () => {
    setName("");
    setSrc("");
    setCountry("");
    setRegion("");
    setVarietal("");
    setDescription("");
    setType("");
    setYear("");
  };

  return (
    <>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            {props.wine.id ? "Edit Wine" : "Add Wine"}
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name*:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Type*:</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Varietal:</Form.Label>
              <Form.Control
                type="text"
                value={varietal}
                onChange={(e) => setVarietal(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Region:</Form.Label>
              <Form.Control
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country*:</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="text"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>* Indicates a required field</Form.Label>
            </Form.Group>
            <Button className="w-100 mt-2 button" type="submit">
              {props.wine.id ? "Edit Wine" : "Add Wine"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddWine;
