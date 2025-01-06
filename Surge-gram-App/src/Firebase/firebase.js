// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhX6-K8xrPcR2-78sCZW_w5ZFOPL1qPhc",
  authDomain: "surge-gram.firebaseapp.com",
  projectId: "surge-gram",
  storageBucket: "surge-gram.firebasestorage.app",
  messagingSenderId: "779570237476",
  appId: "1:779570237476:web:c820b0c95b4ba8f28bc8b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

export {auth , storage};