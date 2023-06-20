import NavWine from "./NavWine";
import { Container, Row, Col } from "react-bootstrap";
import Blog from "./blog";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import FooterWine from "./FooterWine";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const BlogList = () => {
  const [blogs, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogList();
  }, []);

  const getBlogList = async () => {
    const blogCollection = collection(db, "blog");
    const blogDocs = await getDocs(blogCollection);
    let newBlogs = blogDocs.docs.map((doc) => {
      let newBlog = doc.data();
      newBlog.id = doc.id;
      return newBlog;
    });
    setBlog(newBlogs);
  };

  const handleDeleteBlog = async (id) => {
    // Implement your delete logic here
    await deleteDoc(doc(db, "blog", id));
    getBlogList();
  };

  const handleEditBlog = async (id) => {
    // Implement your edit logic here
    console.log("Edit blog with ID:", id);
    navigate(`/editBlog/${id}`);
  };

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
