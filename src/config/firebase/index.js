// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuOJCjG9UyIH5nY8_vi5cfjcvR-M8N6ik",
  authDomain: "login-d9a06.firebaseapp.com",
  projectId: "login-d9a06",
  storageBucket: "login-d9a06.firebasestorage.app",
  messagingSenderId: "182877931189",
  appId: "1:182877931189:web:3ef4fd36905114776960fc",
  measurementId: "G-M2C4WWEGMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
