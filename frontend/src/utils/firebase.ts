// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task-manager-90550.firebaseapp.com",
  projectId: "task-manager-90550",
  storageBucket: "task-manager-90550.firebasestorage.app",
  messagingSenderId: "353675555064",
  appId: "1:353675555064:web:838957d616f64ed8c3cb0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);