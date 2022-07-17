import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDk3wGApX4bUiE3zJap7YjKKIykR-5v1Wc",
    authDomain: "react-rest-api-53c26.firebaseapp.com",
    projectId: "react-rest-api-53c26",
    storageBucket: "react-rest-api-53c26.appspot.com",
    messagingSenderId: "456268497610",
    appId: "1:456268497610:web:76bf41ef047bed6e49aa33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
