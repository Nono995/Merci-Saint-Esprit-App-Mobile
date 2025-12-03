import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAv3yrsendIELQQgGlYp-M1s7F6Y9sV8oI',
  authDomain: 'church-app-backend.firebaseapp.com',
  projectId: 'church-app-backend',
  storageBucket: 'church-app-backend.firebasestorage.app',
  messagingSenderId: '179363960794',
  appId: '1:179363960794:web:46a44a09a453868f4552e3',
};

console.log('===== FIREBASE INITIALIZING =====');
console.log('Project ID:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('===== FIREBASE INITIALIZED =====');

export default app;
