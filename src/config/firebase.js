// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcwBZiJCLYh-c2PTM-MMQeG1Ls3ylTUDk",
  authDomain: "wineuniverse-89ae2.firebaseapp.com",
  projectId: "wineuniverse-89ae2",
  storageBucket: "wineuniverse-89ae2.appspot.com",
  messagingSenderId: "577234121884",
  appId: "1:577234121884:web:733a056abcecbddc8f2959",
};

//https://www.youtube.com/watch?v=2hR-uWjBAgw&t=404s&ab_channel=PedroTech

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); //  Se include pentru a accesa firestore
