// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGMa3QM4seJtzAJN5VMxZOiWUKuD7BSVU",
  authDomain: "caterpillar-a9dec.firebaseapp.com",
  projectId: "caterpillar-a9dec",
  storageBucket: "caterpillar-a9dec.firebasestorage.app",
  messagingSenderId: "30829230869",
  appId: "1:30829230869:web:ab034c397a1d28cdfdc71c",
  measurementId: "G-SL806WNHQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);