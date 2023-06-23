// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from "firebase/auth";

// For datastore 
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXahMuB1PJOy1UWGOIO6D2Td_86ASYJ6o",
  authDomain: "react-project-aeaa2.firebaseapp.com",
  projectId: "react-project-aeaa2",
  storageBucket: "react-project-aeaa2.appspot.com",
  messagingSenderId: "454052431983",
  appId: "1:454052431983:web:387a3bebddb8343a65659a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// database for this app
export const db = getFirestore(app);
