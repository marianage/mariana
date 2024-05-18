// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4Kb-OVh3uQPSyYzpf7QaF2vywXALSEm0",
  authDomain: "hackathon-54600.firebaseapp.com",
  databaseURL: "https://hackathon-54600-default-rtdb.firebaseio.com",
  projectId: "hackathon-54600",
  storageBucket: "hackathon-54600.appspot.com",
  messagingSenderId: "554569980306",
  appId: "1:554569980306:web:b23c7a8404ea153899094b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveClient = (name, adress, phone, email, description) => {
  addDoc(collection(db, "clients"), {
    name,
    adress,
    phone,
    email,
    description,
  });
};

export const getClients = () => getDocs(collection(db, "clients"));

export const onGetClients = (callback) =>
  onSnapshot(collection(db, "clients"), callback);

export const deleteClient = (id) => deleteDoc(doc(db, "clients", id));

export const getClient = (id) => getDoc(doc(db, "clients", id));

export const updateClient = (id, newFields) =>
  updateDoc(doc(db, "clients", id), newFields);
