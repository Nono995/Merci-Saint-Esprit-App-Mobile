# 🚀 Quick Start : Intégration Firebase Admin

## Étapes d'intégration

### 1️⃣ Installer les dépendances Firebase

```bash
npm install firebase
```

ou si tu utilises yarn :

```bash
yarn add firebase
```

### 2️⃣ Ajouter les fichiers au projet

Les fichiers suivants ont été créés et doivent être intégrés :

```
src/
├── services/
│   ├── firebaseConfig.js       ✅ Configuration Firebase
│   └── authAdmin.js            ✅ Service authentification admin
├── screens/
│   ├── AdminLoginScreen.js     ✅ Écran de connexion admin
│   └── AdminDashboard.js       ✅ Tableau de bord admin
└── context/
    └── AdminAuthContext.js     ✅ Contexte d'authentification
```

### 3️⃣ Configurer firebaseConfig.js

1. Va à [Firebase Console](https://console.firebase.google.com)
2. Sélectionne ton projet
3. Va à **Paramètres du projet → Applications web**
4. Copie la configuration Firebase
5. Remplace les valeurs dans `src/services/firebaseConfig.js` :

```javascript
const firebaseConfig = {
  apiKey: "TON_API_KEY",                    // ← Remplace
  authDomain: "ton-projet.firebaseapp.com", // ← Remplace
  projectId: "ton-projet-id",               // ← Remplace
  storageBucket: "ton-projet.appspot.com",  // ← Remplace
  messagingSenderId: "123456789",           // ← Remplace
  appId: "1:123456789:web:abc123"           // ← Remplace
};
```

### 4️⃣ Mettre à jour App.js

Remplace ta navigation principale par le contexte d'authentification :

```javascript
import { AdminAuthProvider, useAdminAuth } from './src/context/AdminAuthContext';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminDashboard from './src/screens/AdminDashboard';
import LoadingSpinner from './src/components/LoadingSpinner';

function AdminNavigator() {
  const { admin, loading } = useAdminAuth();

  if (loading) return <LoadingSpinner />;

  return admin ? (
    <AdminDashboard navigation={null} />
  ) : (
    <AdminLoginScreen navigation={null} />
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <NavigationContainer>
        <AdminNavigator />
      </NavigationContainer>
    </AdminAuthProvider>
  );
}
```

### 5️⃣ Créer un utilisateur admin dans Firebase Console

1. Va à **Firebase Console → Authentication → Utilisateurs**
2. Clique **Ajouter un utilisateur**
3. Email : `admin@church.com`
4. Mot de passe : `ChooseAStrongPassword123!`
5. Clique **Créer**

### 6️⃣ Assigner le rôle admin dans Firestore

1. Va à **Firestore Database → Créer une collection** nommée `users`
2. Ajoute un document avec :
   - **ID du document** : copie l'UID depuis Authentication
   - **Contenu** :

```json
{
  "uid": "firebase_uid",
  "email": "admin@church.com",
  "displayName": "Pasteur Martin",
  "role": "admin",
  "status": "active",
  "joinedAt": Timestamp,
  "permissions": ["all"],
  "photoURL": "",
  "phoneNumber": ""
}
```

### 7️⃣ Configurer les règles Firestore

1. Va à **Firestore → Règles**
2. Copie les règles du fichier `FIREBASE_ADMIN_AUTH_GUIDE.md` (section 2)
3. Clique **Publier**

### 8️⃣ Tester l'authentification

1. Lance l'app
2. Essaie de te connecter avec :
   - Email : `admin@church.com`
   - Mot de passe : celui que tu as créé

---

## 📁 Fichiers et Fonctionnalités

| Fichier | Rôle |
|---------|------|
| `firebaseConfig.js` | Config Firebase + initialisation |
| `authAdmin.js` | Service d'auth (login, logout, vérifications) |
| `AdminAuthContext.js` | Contexte React pour partager l'état d'auth |
| `AdminLoginScreen.js` | Interface de connexion |
| `AdminDashboard.js` | Tableau de bord admin |

---

## 🔧 Troubleshooting

### "apiKey is not defined"
→ Tu n'as pas configuré `firebaseConfig.js` correctement. Vérifie les valeurs dans Firebase Console.

### "role is not admin" lors du login
→ Le document `users` n'a pas été créé ou ne contient pas `role: 'admin'`. Crée-le dans Firestore.

### Règles Firestore : "Permission denied"
→ Les règles Firestore ne sont pas correctement publiées. Va à Firestore → Règles → Publie.

### L'app crash au startup
→ Vérifie que `AdminAuthProvider` enveloppe bien toute l'app dans `App.js`.

---

## 📞 Prochaines étapes

Une fois connecté, tu peux :

1. **Gestion Utilisateurs** → Ajouter des écrans pour suspendre/bannir des utilisateurs
2. **Modération Contenu** → Créer une interface pour approuver/supprimer du contenu
3. **Gestion Événements** → Interface CRUD pour les événements
4. **Logs d'Audit** → Afficher l'historique des actions admin
5. **Cloudinary Upload** → Intégrer l'upload de médias sécurisés

---

## 📚 Références

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Rules Reference](https://firebase.google.com/docs/firestore/security/get-started)
- [Guide complet](./FIREBASE_ADMIN_AUTH_GUIDE.md)
