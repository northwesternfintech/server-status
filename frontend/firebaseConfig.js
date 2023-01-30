/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyB0rBPHy0EZX4PO3b7UYIWRojsXbj_XnGs",
  authDomain: "nuft-server-status.firebaseapp.com",
  projectId: "nuft-server-status",
  storageBucket: "nuft-server-status.appspot.com",
  messagingSenderId: "239278569295",
  appId: "1:239278569295:web:235d41192d41717130b73a",
  measurementId: "G-VSL6PN2RLC"
};

const app = initializeApp(firebaseConfig);
