// Alternative storage configuration without Firebase Storage
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyClzNHbZnUVSxCA3DRaSkLUgGPuISgZHmI",
  authDomain: "richreact-tutorial-hub.firebaseapp.com",
  projectId: "richreact-tutorial-hub",
  storageBucket: "richreact-tutorial-hub.firebasestorage.app",
  messagingSenderId: "691657601903",
  appId: "1:691657601903:web:3885f8fdd73a1f47fbee9a",
  measurementId: "G-ED0RG0DWYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (NO STORAGE)
export const auth = getAuth(app); 
export const db = getFirestore(app);

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

// Alternative storage solutions
export const storageConfig = {
  // Use one of these alternatives:
  
  // Option 1: Direct links to external files (GitHub, Google Drive, etc.)
  useExternalLinks: true,
  
  // Option 2: Base64 encoding for small files
  useBase64: false,
  
  // Option 3: Local storage for development
  useLocalStorage: false,
  
  // Option 4: Third-party free storage APIs
  useThirdParty: false
};
