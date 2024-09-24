// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMI24fTjSZC9kfWv0ftp90gwvM2xGZDb0",
  authDomain: "pdlab-e969e.firebaseapp.com",
  projectId: "pdlab-e969e",
  storageBucket: "pdlab-e969e.appspot.com",
  messagingSenderId: "502965488668",
  appId: "1:502965488668:web:2684cf121567d9697da3d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export the auth and db objects
