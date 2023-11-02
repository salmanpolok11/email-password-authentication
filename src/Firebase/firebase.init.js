// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw9zhQZ_83HlZHkEX5wy2Djc_DmlHzxMM",
  authDomain: "email-passwod-authe.firebaseapp.com",
  projectId: "email-passwod-authe",
  storageBucket: "email-passwod-authe.appspot.com",
  messagingSenderId: "880362115082",
  appId: "1:880362115082:web:42c280575ded17a690cff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;