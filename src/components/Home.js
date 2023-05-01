import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import NavWine from "./NavWine";

const Home = () => {
  return (
    <>
      <NavWine />
    </>
  );
};

export default Home;
