import NavWine from "./NavWine";
import { Container, Row, Col } from "react-bootstrap";
import Blog from "./blog";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import FooterWine from "./FooterWine";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const BlogList = () => {
  const [blogs, setBlog] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getBlogList();
  }, []);

  // Fetches the list of blogs from the database
  const getBlogList = async () => {
    const blogCollection = collection(db, "blog");
    const q = query(blogCollection, orderBy("date", "desc")); // Query to order by "date" field in descending order
    const blogDocs = await getDocs(q);
    let newBlogs = blogDocs.docs.map((doc) => {
      let newBlog = doc.data();
      newBlog.id = doc.id;
      return newBlog;
    });
    setBlog(newBlogs);
  };

  // Handles the delete
  const handleDeleteBlog = async (id) => {
    await deleteDoc(doc(db, "blog", id));
    getBlogList();
  };

  // Handles the edit
  const handleEditBlog = async (id) => {
    navigate(`/editBlog/${id}`);
  };

  // Generates the list of blog components based on the fetched data
  const blogList = blogs.map((item) => {
    const { src, date, title, description, id, comments } = item;

    return (
      <Col key={id}>
        <Blog
          src={src}
          date={date}
          title={title}
          description={description}
          comments={comments}
          id={id}
          handleDeleteBlog={handleDeleteBlog}
          handleEditBlog={handleEditBlog}
        />
      </Col>
    );
  });

  return (
    <>
      <NavWine />
      <Container>
        <Row
          xs={1}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
          className="mt-1 g-4 justify-content-md-center mb-6">
          {blogList}
        </Row>
      </Container>
      <FooterWine />
    </>
  );
};

export default BlogList;
