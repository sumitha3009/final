// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCePLKHV7Ww3yfMFncNfElp6jn0HnWwYQ",
  authDomain: "agroconnect-f9607.firebaseapp.com",
  projectId: "agroconnect-f9607",
  storageBucket: "agroconnect-f9607.firebasestorage.app",
  messagingSenderId: "46509282268",
  appId: "1:46509282268:web:ef770c01d090c023f9b519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
