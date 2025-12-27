import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

/**
 * Connexion utilisateur
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Erreur login:', error);
    throw error;
  }
};

/**
 * Inscription utilisateur
 */
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour le profil
    await updateProfile(user, { displayName });

    // Créer le document utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      displayName,
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date()
    });

    return user;
  } catch (error) {
    console.error('Erreur inscription:', error);
    throw error;
  }
};

/**
 * Déconnexion
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erreur logout:', error);
    throw error;
  }
};
