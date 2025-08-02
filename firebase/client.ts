// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzydsJSiCyOiintjAYUnacknRCbX0k02M",
  authDomain: "ai-view-ccaaa.firebaseapp.com",
  projectId: "ai-view-ccaaa",
  storageBucket: "ai-view-ccaaa.firebasestorage.app",
  messagingSenderId: "284784382249",
  appId: "1:284784382249:web:3ced14319c779cb18f2738",
  measurementId: "G-6CHDD6LPPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
// const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const auth = getAuth(app);
