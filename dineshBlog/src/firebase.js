// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dinesh-blog-77bbc.firebaseapp.com",
  projectId: "dinesh-blog-77bbc",
  storageBucket: "dinesh-blog-77bbc.appspot.com",
  messagingSenderId: "112078010487",
  appId: "1:112078010487:web:1c783ce1b68f4cedba6e72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);