// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmwIN7DcXHofMGUJZjA4BG2qaQzBJhUIE",
    authDomain: "trackdemy.firebaseapp.com",
    projectId: "trackdemy",
    storageBucket: "trackdemy.firebasestorage.app",
    messagingSenderId: "24974970866",
    appId: "1:24974970866:web:45a3f1094b4fc7859d256b",
    measurementId: "G-VSDHBYDJHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);