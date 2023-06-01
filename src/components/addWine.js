import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
//useState: functie-admite parametri care sunt folositi pt a impune valoarea initiala a variabilelor
//Componenta utilizează hook-ul "useState" pentru a gestiona starea componentei.
const AddWine = (props) => {
  const [src, setSrc] = useState(props.wine.src);
  const [name, setName] = useState(props.wine.name);
  const [description, setDescription] = useState(props.wine.description);
  const [country, setCountry] = useState(props.wine.country);
  const [region, setRegion] = useState(props.wine.region);
  const [varietal, setVarietal] = useState(props.wine.varietal);
  const [type, setType] = useState(props.wine.type);
  const [year, setYear] = useState(props.wine.year);

  //am creat un obiect wine care il transmit la app prin apel fct props.transfer
  const handleSubmit = (evt) => {
    evt.preventDefault(); //pt a nu reincarca pagina

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
    } else {
      props.add(wine); //  Transmit spre <App /> obiectul carte
    }
    clearFields();
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

  const buttonStyle = {
    color: "white",
    backgroundColor: "#722f37",
    borderColor: "#722f37",
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Wine</h2>
          <Form>
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
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Region:</Form.Label>
              <Form.Control
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country:</Form.Label>
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
                required
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
              <Form.Label>Wine Description*:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>* Indicates a required field</Form.Label>
            </Form.Group>
            <Button
              className="w-100 mt-2"
              style={buttonStyle}
              type="submit"
              onClick={handleSubmit}
            >
              Add Wine
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddWine;
