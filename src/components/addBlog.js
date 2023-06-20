import React, { useEffect, useState } from "react";
import { Alert, Form, Button, Card, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { getDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import NavWine from "./NavWine";
import FooterWine from "./FooterWine";
//useState: functie-admite parametri care sunt folositi pt a impune valoarea initiala a variabilelor
//Componenta utilizează hook-ul "useState" pentru a gestiona starea componentei.
const AddBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    date: null,
    description: "",
    src: "",
    comments: [],
  });
  const [alert, setAlert] = useState(null); // New state for success/error
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlog = async (id) => {
      const ref = await getDoc(doc(db, "blog", id));
      console.log(ref.data());
      let blogData = ref.data();
      setBlog(blogData);
    };

    if (id) {
      getBlog(id);
    }
  }, []);

  //Funcția "addBlog" adaugă un vin nou în baza de date
  const addBlog = async () => {
    await addDoc(collection(db, "blog"), blog);
    navigate(`/blog`);
  };

  const editBlog = async () => {
    //Functie care updateaza datele despre vinul ales pentru editare
    await updateDoc(doc(db, "blog", id), blog);
    navigate(`/blog`);
  };

  //am creat un obiect blog care il transmit la app prin apel fct props.transfer
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
      editBlog();
      setAlert({ type: "success", message: "Blog edited successfully." }); // Set success message
    } else {
      addBlog(); //  Transmit spre <App /> obiectul carte
      setAlert({ type: "success", message: "Blog added successfully." }); // Set success message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
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
                {id ? "Edit Blog" : "Add Blog"}
              </h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title*:</Form.Label>
                  <Form.Control
                    type="text"
                    value={blog.title}
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date*:</Form.Label>
                  <Form.Control
                    type="date"
                    value={blog.date}
                    name="date"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image:</Form.Label>
                  <Form.Control
                    type="text"
                    value={blog.src}
                    name="src"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description*:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    value={blog.description}
                    name="description"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>* Indicates a required field</Form.Label>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    className="w-50 mt-2 button align-self-center"
                    type="submit">
                    {id ? "Edit Blog" : "Add Blog"}
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

export default AddBlog;
