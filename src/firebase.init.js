// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxGQBINJEvxI-lwEQjCtrTqnMcIIA5IlM",
  authDomain: "email-pass-auth-aed12.firebaseapp.com",
  projectId: "email-pass-auth-aed12",
  storageBucket: "email-pass-auth-aed12.firebasestorage.app",
  messagingSenderId: "346133959525",
  appId: "1:346133959525:web:d671481cf793f491c3478c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);