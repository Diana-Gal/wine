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
      <Route path="wine/" element={<WineCatalogue />} />
      <Route path="wine/login" element={<Login />} />
      <Route path="wine/signup" element={<Signup />} />
      <Route path="wine/addWine" element={<AddWine />} />
      <Route path="wine/editWine/:id" element={<AddWine />} />
      <Route path="*" element={<MissingRoute />} />
      <Route path="wine/about" element={<About />} />
      <Route path="wine/blog" element={<BlogList />} />
      <Route path="wine/addBlog" element={<AddBlog />} />
      <Route path="wine/editBlog/:id" element={<AddBlog />} />
    </Routes>
  );
};
export default App;
