import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNFat2V-MheQt8jvy-UbAJBRyHGVMJutY",
  authDomain: "pratice-6fa50.firebaseapp.com",
  projectId: "pratice-6fa50",
  storageBucket: "pratice-6fa50.appspot.com",
  messagingSenderId: "769747085643",
  appId: "1:769747085643:web:9ac66d65b120559f5260ce",
  measurementId: "G-MECNQCR092"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, db, storage, analytics, auth };
