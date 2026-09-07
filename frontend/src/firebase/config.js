import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAWPxRKgb6v0U90dCkudzmVCY8eliQE1GA",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "healthlexmed.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "healthlexmed",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "healthlexmed.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "494749993763",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:494749993763:web:a3979b80df608b91779a96",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-F8RSPV39KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Kalıcı yerel önbellek ile Firestore başlatma (Çok sekmeli / multi-tab IndexedDB desteği)
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Initialize Analytics (SSR & browser-safe)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db };
export default app;


