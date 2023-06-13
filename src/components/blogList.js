import NavWine from "./NavWine";
import { Container, Row } from "react-bootstrap";
import Blog from "./blog";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

import { collection, getDocs } from "firebase/firestore";

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
    console.log("Delete blog with ID:", id);
  };

  const handleEditBlog = (id) => {
    // Implement your edit logic here
    console.log("Edit blog with ID:", id);
    navigate(`/editBlog/${id}`);
  };

  const blogList = blogs.map((item) => {
    const {
      src,
      date,
      title,
      description,
      handleDeleteBlog,
      handleEditBlog,
      id,
    } = item;

    return (
      <Blog
        key={id}
        src={src}
        date={date}
        title={title}
        description={description}
        handleDeleteBlog={handleDeleteBlog}
        handleEditBlog={handleEditBlog}
      />
    );
  });

  return (
    <>
      <NavWine />
      <Container fluid>
        <Row className="mb-4">{blogList}</Row>
      </Container>
    </>
  );
};

export default BlogList;
