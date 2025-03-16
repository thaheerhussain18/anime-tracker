import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where ,updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX4YE2ihuXMmxHewZChapHFXKDLajQBkQ",
  authDomain: "anime-tracker-e3182.firebaseapp.com",
  projectId: "anime-tracker-e3182",
  storageBucket: "anime-tracker-e3182.firebasestorage.app",
  messagingSenderId: "657545583185",
  appId: "1:657545583185:web:0add5685c7ef0a16fab670",
  measurementId: "G-EF14KNZX9L"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, collection, addDoc, getDocs, deleteDoc, doc, auth, query, where,updateDoc };