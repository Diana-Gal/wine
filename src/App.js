import React from "react";
import { Routes, Route } from "react-router-dom";
import WineCatalogue from "./components/wineCatalogue";
import Login from "./components/Login";
import AddWine from "./components/addWine";
import MissingRoute from "./components/missingRoute";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WineCatalogue />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addWine" element={<AddWine />} />
      <Route path="/editWine/:id" element={<AddWine />} />
      <Route path="*" element={<MissingRoute />} />
    </Routes>
  );
};
export default App;
