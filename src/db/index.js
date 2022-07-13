// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIN7mzhdoFFVwavauFlmu5ye1ArOW1gRM",
  authDomain: "exchangario-b8779.firebaseapp.com",
  projectId: "exchangario-b8779",
  storageBucket: "exchangario-b8779.appspot.com",
  messagingSenderId: "516326829682",
  appId: "1:516326829682:web:17cee81ff4060695ca9ceb"
};

// Initialize Firebase
initializeApp(firebaseConfig); 

export const db = getFirestore()