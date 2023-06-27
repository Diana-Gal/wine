import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcwBZiJCLYh-c2PTM-MMQeG1Ls3ylTUDk",
  authDomain: "wineuniverse-89ae2.firebaseapp.com",
  projectId: "wineuniverse-89ae2",
  storageBucket: "wineuniverse-89ae2.appspot.com",
  messagingSenderId: "577234121884",
  appId: "1:577234121884:web:733a056abcecbddc8f2959",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // access firestore

// Set admin privilege on the user corresponding to uid.
export const checkIsAdmin = async (uid) => {
  const ref = await getDoc(doc(db, "users", uid));
  const userData = ref.data();
  return userData?.isAdmin;
};
