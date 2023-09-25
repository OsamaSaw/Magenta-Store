// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChQX8KmUL-mSd5dPA_blvP8YyJClRm804",
  authDomain: "softkeyhub-4859e.firebaseapp.com",
  projectId: "softkeyhub-4859e",
  storageBucket: "softkeyhub-4859e.appspot.com",
  messagingSenderId: "495002097498",
  appId: "1:495002097498:web:6f938ec10b83ef7a2b0563",
  measurementId: "G-JGFZCWC0M6",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
