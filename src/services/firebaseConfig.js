import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config/env';

const firebaseConfig = {
  apiKey: FIREBASE_CONFIG.API_KEY,
  authDomain: FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG.APP_ID,
};

console.log('===== FIREBASE INITIALIZING =====');
console.log('Project ID:', firebaseConfig.projectId);

let app;
try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
    throw new Error('Firebase API Key is missing. Check your Environment Variables on Vercel.');
  }
  app = initializeApp(firebaseConfig);
  console.log('===== FIREBASE INITIALIZED =====');
} catch (error) {
  console.error('❌ Firebase Initialization Error:', error.message);
  // Create a dummy app object to prevent further crashes, 
  // but the app will stay on a loading/error state if it needs Firebase
  app = { error: error.message };
}

export const auth = app.error ? {} : getAuth(app);
export const db = app.error ? {} : getFirestore(app);

export default app;
