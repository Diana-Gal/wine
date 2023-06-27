import React from "react";
import { Routes, Route } from "react-router-dom";
import WineCatalogue from "./components/wineCatalogue";
import Login from "./components/Login";
import AddWine from "./components/addWine";
import AddBlog from "./components/addBlog";
import MissingRoute from "./components/missingRoute";
import Signup from "./components/Signup";
import About from "./components/about";
import BlogList from "./components/blogList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WineCatalogue />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addWine" element={<AddWine />} />
      <Route path="/editWine/:id" element={<AddWine />} />

      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/addBlog" element={<AddBlog />} />
      <Route path="/editBlog/:id" element={<AddBlog />} />
    </Routes>
  );
};
export default App;
