// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBibbsL7BvzFsqU7uz3U-I6iZcUl7IVH8I",
  authDomain: "studio-9087751774-c7d8c.firebaseapp.com",
  projectId: "studio-9087751774-c7d8c",
  storageBucket: "studio-9087751774-c7d8c.appspot.com",
  messagingSenderId: "205810415867",
  appId: "1:205810415867:web:48776186c118ddf971985e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
