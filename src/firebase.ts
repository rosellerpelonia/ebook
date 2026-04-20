import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmwryru4y-ZCyPnPwQ5Zem9XWsl0UYVDY",
  authDomain: "ebook-b08ee.firebaseapp.com",
  projectId: "ebook-b08ee",
  storageBucket: "ebook-b08ee.firebasestorage.app",
  messagingSenderId: "416728086143",
  appId: "1:416728086143:web:9cda9353a37cbe0ead314a",
  measurementId: "G-73F7H93JM9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
