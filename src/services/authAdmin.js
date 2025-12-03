import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

/**
 * Connexion admin
 * @param {string} email - Email de l'admin
 * @param {string} password - Mot de passe
 * @returns {Promise<Object>} Admin data { uid, email, role, displayName }
 */
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Vérifier que l'utilisateur est admin
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (!userDoc.exists()) {
      await signOut(auth);
      throw new Error('Profil utilisateur non trouvé');
    }

    const userData = userDoc.data();
    if (userData.role !== 'admin') {
      await signOut(auth);
      throw new Error('Accès refusé : vous n\'êtes pas administrateur');
    }

    if (userData.status === 'suspended' || userData.status === 'banned') {
      await signOut(auth);
      throw new Error(`Compte ${userData.status}. Contactez le support.`);
    }

    // Mettre à jour lastLoginAt
    await setDoc(doc(db, 'users', uid), 
      { lastLoginAt: new Date() }, 
      { merge: true }
    );

    return {
      uid,
      email: userCredential.user.email,
      role: userData.role,
      displayName: userData.displayName,
      permissions: userData.permissions || []
    };
  } catch (error) {
    console.error('Erreur login admin:', error);
    throw error;
  }
};

/**
 * Déconnexion admin
 */
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erreur logout:', error);
    throw error;
  }
};

/**
 * Récupérer l'admin actuellement connecté
 */
export const getCurrentAdmin = async () => {
  if (!auth.currentUser) return null;

  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    
    if (!userDoc.exists()) return null;
    
    const userData = userDoc.data();
    if (userData.role !== 'admin') return null;

    return {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      role: userData.role,
      displayName: userData.displayName,
      permissions: userData.permissions || [],
      photoURL: userData.photoURL
    };
  } catch (error) {
    console.error('Erreur getCurrentAdmin:', error);
    return null;
  }
};

/**
 * Créer un nouvel utilisateur admin
 * ⚠️ À utiliser avec Cloud Function ou Admin SDK uniquement !
 * @param {string} email - Email du nouvel admin
 * @param {string} password - Mot de passe initial
 * @param {string} displayName - Nom d'affichage
 */
export const createAdminUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Créer le document user avec rôle admin
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      displayName,
      role: 'admin',
      status: 'active',
      joinedAt: new Date(),
      lastLoginAt: null,
      photoURL: null,
      permissions: ['all'], // Tous les droits
      emailVerified: false,
      phoneNumber: null
    });

    return { uid, email, displayName };
  } catch (error) {
    console.error('Erreur création admin:', error);
    throw error;
  }
};

/**
 * Vérifier si l'utilisateur actuel est admin
 */
export const isCurrentUserAdmin = async () => {
  const admin = await getCurrentAdmin();
  return admin !== null;
};

/**
 * Vérifier si l'utilisateur a une permission spécifique
 * @param {string} permission - Permission à vérifier
 */
export const hasPermission = async (permission) => {
  const admin = await getCurrentAdmin();
  if (!admin) return false;
  
  return admin.permissions.includes('all') || admin.permissions.includes(permission);
};

/**
 * Ajouter un log d'action admin
 * @param {string} action - Type d'action
 * @param {string} targetId - ID cible (utilisateur, post, etc)
 * @param {string} targetType - Type de la cible
 * @param {object} details - Détails supplémentaires
 */
export const logAdminAction = async (action, targetId, targetType, details = {}) => {
  if (!auth.currentUser) return;

  try {
    const logRef = doc(db, 'adminLogs', `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    await setDoc(logRef, {
      adminUid: auth.currentUser.uid,
      action,
      targetId,
      targetType,
      details,
      timestamp: new Date(),
      ipAddress: null // À enrichir côté backend si besoin
    });
  } catch (error) {
    console.error('Erreur logging action:', error);
  }
};
