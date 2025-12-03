# 🔐 Guide Complet : Authentification Admin avec Firebase

## 1️⃣ Configuration Firebase Console (No-Code)

### Étape 1 : Créer un projet Firebase
1. Accède à [Firebase Console](https://console.firebase.google.com)
2. Clique sur **"Créer un projet"**
3. Nomme-le (ex: `Church-App-Backend`)
4. Accepte les conditions et crée

### Étape 2 : Activer Authentication
1. Dans la barre latérale, clique sur **Authentication**
2. Clique sur **Commencer**
3. Ajoute les méthodes de connexion :
   - ✅ **Email/Password** (obligatoire pour admin)
   - ✅ **Google** (optionnel, pratique)
   - ✅ **Apple** (optionnel, pour iOS)
4. **Enregistrer** les modifications

### Étape 3 : Créer la base Firestore
1. Dans la barre latérale, clique sur **Firestore Database**
2. Clique sur **Créer une base de données**
3. Déploiement : choisis le plus proche (ex: europe-west1)
4. **Mode de sécurité** : démarre en mode de test (temporaire)
5. Crée la base

### Étape 4 : Définir les règles de sécurité Firestore
1. Dans Firestore, va sur l'onglet **Règles**
2. Remplace le contenu par les règles ci-dessous (section 2)
3. Clique sur **Publier**

---

## 2️⃣ Règles Firestore (Admin + Utilisateurs)

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // === COLLECTION : users ===
    match /users/{userId} {
      // LECTURE : les utilisateurs peuvent lire leur propre profil
      // Les admins peuvent lire tous les profils
      allow read: if request.auth != null && 
                  (request.auth.uid == userId || 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // CRÉATION : seul Firestore Admin SDK peut créer (ou Cloud Function)
      // Les utilisateurs normaux ne créent pas leurs docs (créées par Admin SDK)
      allow create: if false; // Créée uniquement par backend
      
      // MODIFICATION : l'utilisateur modifie ses données ou admin modifie tout
      allow update: if request.auth != null && 
                    (request.auth.uid == userId || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // SUPPRESSION : seul admin
      allow delete: if request.auth != null && 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // === COLLECTION : adminLogs (lecture admin seulement) ===
    match /adminLogs/{logId} {
      allow read: if request.auth != null && 
                  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create, update, delete: if false;
    }

    // === COLLECTION : content (posts, vidéos, etc.) ===
    match /posts/{postId} {
      allow read: if request.auth != null; // Membres peuvent lire
      allow create: if request.auth != null && 
                    request.resource.data.ownerId == request.auth.uid; // Créer son propre post
      allow update, delete: if request.auth != null && 
                            (resource.data.ownerId == request.auth.uid || 
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // === COLLECTION : events ===
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow delete: if request.auth != null && 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // === COLLECTION : donations ===
    match /donations/{donationId} {
      allow read: if request.auth != null && 
                  (resource.data.ownerId == request.auth.uid || 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && 
                    request.resource.data.ownerId == request.auth.uid;
      allow update, delete: if false; // Donations immuables
    }
  }
}
```

---

## 3️⃣ Structure Firestore Collections

### Collection : `users`
Chaque document = un utilisateur.
```json
/users/{uid}
{
  "uid": "firebase_auth_uid",
  "email": "user@church.com",
  "displayName": "Jean Dupont",
  "photoURL": "https://...",
  "role": "member", // "member", "moderator", "admin"
  "status": "active", // "active", "suspended", "banned"
  "joinedAt": Timestamp(2025-11-18),
  "lastLoginAt": Timestamp(2025-11-18),
  "permissions": ["read_posts", "create_posts", "view_events"],
  "emailVerified": true,
  "phoneNumber": "+33612345678" // optionnel
}
```

### Collection : `adminLogs`
Enregistrement des actions admin (audit trail).
```json
/adminLogs/{logId}
{
  "adminUid": "admin_uid",
  "action": "user_suspended", // "user_created", "content_deleted", etc.
  "targetId": "user_or_content_id",
  "targetType": "user", // "user", "post", "event", etc.
  "details": { ... }, // détails de l'action
  "timestamp": Timestamp(2025-11-18),
  "ipAddress": "192.168.x.x" // optionnel, à logger côté backend
}
```

### Collection : `posts`
Contenu utilisateur.
```json
/posts/{postId}
{
  "title": "Mon témoignage",
  "body": "Texte du témoignage...",
  "media": [
    {
      "type": "image", // "image", "video", "audio"
      "url": "https://res.cloudinary.com/...",
      "public_id": "abcd1234"
    }
  ],
  "ownerId": "user_uid",
  "createdAt": Timestamp(2025-11-18),
  "updatedAt": Timestamp(2025-11-18),
  "visibility": "public", // "public", "members"
  "likes": 5,
  "comments": 2,
  "status": "published" // "draft", "published", "archived"
}
```

### Collection : `events`
Événements de l'église (seuls admins créent).
```json
/events/{eventId}
{
  "title": "Culte du dimanche",
  "description": "...",
  "startTime": Timestamp(2025-11-26),
  "endTime": Timestamp(2025-11-26),
  "location": "Paris, France",
  "image": "https://res.cloudinary.com/...",
  "createdBy": "admin_uid",
  "attendees": ["uid1", "uid2"],
  "capacity": 500,
  "status": "upcoming" // "upcoming", "ongoing", "completed", "cancelled"
}
```

### Collection : `donations`
Historique des dons.
```json
/donations/{donationId}
{
  "ownerId": "user_uid",
  "amount": 50.00,
  "currency": "EUR",
  "type": "unique", // "unique", "monthly", "tithe"
  "paymentMethod": "stripe", // "stripe", "paypal"
  "status": "completed", // "pending", "completed", "failed"
  "transactionId": "stripe_transaction_id",
  "createdAt": Timestamp(2025-11-18),
  "message": "Merci pour ce message inspirant"
}
```

---

## 4️⃣ Créer des Admins via Firebase Console

### Méthode 1 : Firebase Console (Simple)

1. **Créer l'utilisateur admin**
   - Va à **Authentication → Utilisateurs**
   - Clique sur **Ajouter un utilisateur**
   - Email : `pastor@church.com`
   - Mot de passe : généré ou personnalisé
   - Enregistre

2. **Assigner le rôle admin via Firestore**
   - Va à **Firestore → Collection `users`**
   - Clique sur **"Ajouter une collection"** → nomme-la `users`
   - Clique sur **"Ajouter un document"** → ID: `{uid_du_pasteur}` (copie-colle depuis Authentication)
   - Ajoute les champs :
     ```
     uid: pastor_uid
     email: pastor@church.com
     displayName: Pasteur Martin
     role: admin
     status: active
     joinedAt: maintenant
     permissions: ["all"]
     ```
   - Enregistre

### Méthode 2 : Custom Claims via Cloud Function (Plus sûre, recommandée)

Si tu acceptes un tout petit code backend, une Cloud Function peut :
- Créer l'utilisateur ET attribuer le rôle admin en une seule opération sécurisée.

Je peux générer ce code si tu acceptes.

---

## 5️⃣ Configuration côté Client (React Native / Expo)

### A. Initialiser Firebase dans l'app

**Fichier : `src/services/firebaseConfig.js`**
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "church-app.firebaseapp.com",
  projectId: "church-app-12345",
  storageBucket: "church-app-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> 💡 Récupère `firebaseConfig` dans **Firebase Console → Paramètres du projet → Applications web**

### B. Service d'authentification admin

**Fichier : `src/services/authAdmin.js`**
```javascript
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Vérifier que l'utilisateur est admin
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists() || userDoc.data().role !== 'admin') {
      await signOut(auth);
      throw new Error('Accès refusé : vous n\'êtes pas admin');
    }

    return {
      uid,
      email: userCredential.user.email,
      role: userDoc.data().role,
      displayName: userDoc.data().displayName
    };
  } catch (error) {
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentAdmin = async () => {
  if (!auth.currentUser) return null;

  const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
  if (!userDoc.exists() || userDoc.data().role !== 'admin') {
    return null;
  }

  return {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    role: userDoc.data().role,
    displayName: userDoc.data().displayName
  };
};
```

### C. Écran de login admin

**Fichier : `src/screens/AdminLoginScreen.js`**
```javascript
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginAdmin } from '../services/authAdmin';

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const admin = await loginAdmin(email, password);
      Alert.alert('Succès', `Bienvenue ${admin.displayName}!`);
      navigation.replace('AdminDashboard', { adminUid: admin.uid });
    } catch (error) {
      Alert.alert('Erreur de connexion', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.header}>
        <Text style={styles.headerTitle}>Connexion Admin</Text>
      </LinearGradient>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Connexion...' : 'Se connecter'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingTop: 50, paddingBottom: 40, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFF' },
  form: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16, backgroundColor: '#FFF', fontSize: 16 },
  button: { backgroundColor: '#8B5CF6', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});
```

---

## 6️⃣ Vérifier l'authentification au démarrage

**Fichier : `src/navigation/AuthNavigator.js`** (ou mets à jour ton `App.js`)

```javascript
import React, { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AuthNavigator() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Vérifier si l'utilisateur est admin
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setAdmin(user);
        } else {
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return admin ? (
    <AdminDashboard adminUid={admin.uid} />
  ) : (
    <AdminLoginScreen />
  );
}
```

---

## 7️⃣ Sommaire des étapes

| Étape | Actions | Status |
|-------|---------|--------|
| 1. Firebase Console | Créer projet, activer Auth, créer Firestore | ✅ Sans code |
| 2. Règles Firestore | Copier-coller les règles de sécurité | ✅ Sans code |
| 3. Structure Firestore | Créer collections et documents | ✅ Sans code |
| 4. Créer admin | Email/password dans Auth + document `users` | ✅ Sans code |
| 5. Config client | Initialiser Firebase SDK | ✅ Snippet fourni |
| 6. Login admin | Écran de connexion | ✅ Snippet fourni |
| 7. Protéger routes | Vérifier rôle admin | ✅ Snippet fourni |

---

## 8️⃣ Checklist pour commencer

- [ ] Accès à Firebase Console (compte Google)
- [ ] Projet Firebase créé
- [ ] Authentication activée (Email/Password)
- [ ] Firestore Database créée
- [ ] Règles Firestore copiées et publiées
- [ ] Collection `users` créée
- [ ] Admin créé (Email + rôle dans Firestore)
- [ ] `firebaseConfig.js` généré (config copiée)
- [ ] Fichiers `authAdmin.js` et `AdminLoginScreen.js` ajoutés au projet
- [ ] Tests de login admin effectués

---

## ❓ Questions récurrentes

**Q: Puis-je utiliser une Cloud Function pour créer des admins automatiquement ?**
R: Oui ! Je peux générer une Cloud Function (10 lignes) qui crée l'utilisateur ET assigne le rôle admin. Plus sécurisé.

**Q: Comment exporter la config Firebase en sécurité ?**
R: La `apiKey` publique est sûre (utilisée que côté client). Les secrets sensibles restent côté Firebase Admin SDK.

**Q: Que se passe-t-il si un utilisateur change manuellement son rôle en Firestore ?**
R: Les règles l'empêchent (seul admin peut modifier `role`). Et à chaque login, tu revérifies son rôle.

**Q: Puis-je ajouter des niveaux de permissions plus fins ?**
R: Oui, utilise un array `permissions: ["create_events", "delete_users", ...]` et vérific dans les règles Firestore.

---

## 📞 Prochaines étapes

Que veux-tu configurer maintenant ?
- A) Panneaux d'admin (gestion utilisateurs, contenu)
- B) Logs d'audit (enregistrer les actions admin)
- C) Système de notifications (FCM)
- D) Intégration Cloudinary (upload sécurisé)
