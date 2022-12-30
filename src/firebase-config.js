import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB97wYw49gfP0cL_xXIc7t23q3YuGMrKzc",
    authDomain: "shylock-25688.firebaseapp.com",
    projectId: "shylock-25688",
    storageBucket: "shylock-25688.appspot.com",
    messagingSenderId: "686544683964",
    appId: "1:686544683964:web:276057006e9bd725f0e1b9",
    measurementId: "G-6W9MVFW1LC"
  };

  const app = initializeApp(firebaseConfig);

  export const authentication = getAuth(app);
