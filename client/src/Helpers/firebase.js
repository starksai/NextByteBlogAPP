// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "next-byte-blog.firebaseapp.com",
  projectId: "next-byte-blog",
  storageBucket: "next-byte-blog.firebasestorage.app",
  messagingSenderId: "904751227222",
  appId: "1:904751227222:web:935122df203317ef6df6f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const GoogleProvider = new GoogleAuthProvider()

export {auth,GoogleProvider}