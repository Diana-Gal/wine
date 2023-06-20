import { v4 as uuid } from "uuid";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
const AddComment = () => {
  const [comment, setComment] = useState(null);
};
export default AddComment;
