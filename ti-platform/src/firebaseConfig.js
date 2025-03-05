import { initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth"; // Adicionamos a importação do signOut
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlAGDh4MZ5gw0M5_8_tU0Uad3Vg8Hv59E",
    authDomain: "tichamados-676d2.firebaseapp.com",
    projectId: "tichamados-676d2",
    storageBucket: "tichamados-676d2.firebasestorage.app",
    messagingSenderId: "250878970756",
    appId: "1:250878970756:web:0395f2a86030685bbd6bd1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportando signOut corretamente
export { auth, db, firebaseSignOut as signOut };  // Exportamos com o alias 'signOut'

