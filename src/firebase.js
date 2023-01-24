import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSNJn44ebML9cThd-fa-SKaDLePWNMG2g",
  authDomain: "chatapp-f6751.firebaseapp.com",
  projectId: "chatapp-f6751",
  storageBucket: "chatapp-f6751.appspot.com",
  messagingSenderId: "781402483054",
  appId: "1:781402483054:web:81bae4ff4b50059290f97f",
  measurementId: "G-WP4HCVT6LK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
