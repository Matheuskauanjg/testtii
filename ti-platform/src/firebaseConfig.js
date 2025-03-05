// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Copie as credenciais do Firebase abaixo
const firebaseConfig = {
    apiKey: "AIzaSyDlAGDh4MZ5gw0M5_8_tU0Uad3Vg8Hv59E",
    authDomain: "tichamados-676d2.firebaseapp.com",
    projectId: "tichamados-676d2",
    storageBucket: "tichamados-676d2.firebasestorage.app",
    messagingSenderId: "250878970756",
    appId: "1:250878970756:web:0395f2a86030685bbd6bd1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
