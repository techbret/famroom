import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0dk5_80GrIqgL7_ijJyEJAWI47Qqe2CA",
    authDomain: "fambook-c536f.firebaseapp.com",
    projectId: "fambook-c536f",
    storageBucket: "fambook-c536f.appspot.com",
    messagingSenderId: "313062342662",
    appId: "1:313062342662:web:4aed2a748d9ef4353e0387",
    measurementId: "G-S9Y3YTVN3F"
};

initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);