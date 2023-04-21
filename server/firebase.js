// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "dotenv/config";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAghF56FU9nwNCcZ0QpHlkeyQV5l3ZfnIQ",
  authDomain: "shopping-mall-2b890.firebaseapp.com",
  projectId: "shopping-mall-2b890",
  storageBucket: "shopping-mall-2b890.appspot.com",
  messagingSenderId: "942265227191",
  appId: "1:942265227191:web:b8c64c1ddc97db55fefa32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
