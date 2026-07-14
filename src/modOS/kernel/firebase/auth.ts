import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "${{ secrets.FIREBASE_API }}",
  authDomain: "modos-webos.firebaseapp.com",
  projectId: "modos-webos",
  storageBucket: "modos-webos.firebasestorage.app",
  messagingSenderId: "403933601096",
  appId: "1:403933601096:web:6cd2d539530a8f00b8e77d",
  measurementId: "G-Z5TBYHEBZW"

};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })