// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {
    getFirestore,
} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCx_9aSYLm_EHH9iTwj_MVqMIy20xOmcXA",
    authDomain: "collegeask-8b92a.firebaseapp.com",
    projectId: "collegeask-8b92a",
    storageBucket: "collegeask-8b92a.appspot.com",
    messagingSenderId: "9628252745",
    appId: "1:9628252745:web:47a9f78e7e9e6d3322dd98",
    measurementId: "G-NRN7PZPZEB"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { auth, provider };
export default db;