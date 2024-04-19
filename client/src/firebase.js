// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-eeb2e.firebaseapp.com",
  projectId: "mern-blog-eeb2e",
  storageBucket: "mern-blog-eeb2e.appspot.com",
  messagingSenderId: "970996646576",
  appId: "1:970996646576:web:adb687c20ca94179b77175"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);