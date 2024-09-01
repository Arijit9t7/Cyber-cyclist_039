import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDJY103y5DGG4JlZWM0-zM61bRdbltFHbU",
    authDomain: "heavenhome-66467.firebaseapp.com",
    databaseURL: "https://heavenhome-66467-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "heavenhome-66467",
    storageBucket: "heavenhome-66467.appspot.com",
    messagingSenderId: "940578340307",
    appId: "1:940578340307:web:985f11504ad781d6ab4326"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider }