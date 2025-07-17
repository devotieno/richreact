import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCCbic8ckzQXHOcCUlIN7uSTLtFeDPAcdM",
  authDomain: "auth-59a8f.firebaseapp.com",
  projectId: "auth-59a8f",
  storageBucket: "auth-59a8f.firebasestorage.app",
  messagingSenderId: "392934320628",
  appId: "1:392934320628:web:25c4608f92df2c7fa131a1",
  measurementId: "G-F768KVE5VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); 
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in production)
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}

export { analytics }; 