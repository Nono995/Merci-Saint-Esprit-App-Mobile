# Panel Admin - Guide de configuration

## Structure du projet

```
admin/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx          # Authentification admin
│   │   ├── Dashboard.jsx          # Vue d'ensemble
│   │   ├── ContentManager.jsx     # Gestion contenu
│   │   ├── UserManager.jsx        # Gestion utilisateurs
│   │   ├── EventManager.jsx       # Gestion événements
│   │   └── DonationManager.jsx    # Gestion donations
│   ├── components/
│   │   └── Layout.jsx             # Sidebar + Navigation
│   ├── config/
│   │   └── firebase.js            # Configuration Firebase
│   ├── App.jsx                    # Router principal
│   ├── main.jsx                   # Point d'entrée
│   └── index.css                  # Styles Tailwind
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html
└── .env.example
```

## Installation

### 1. Installer les dépendances

```bash
cd admin
npm install --legacy-peer-deps
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Remplir `.env` avec ta configuration Firebase :

```env
VITE_FIREBASE_API_KEY=AIzaSyAv3yrsendIELQQgGlYp-M1s7F6Y9sV8oI
VITE_FIREBASE_AUTH_DOMAIN=church-app-backend.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=church-app-backend
VITE_FIREBASE_STORAGE_BUCKET=church-app-backend.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=179363960794
VITE_FIREBASE_APP_ID=1:179363960794:web:46a44a09a453868f4552e3
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application ouvrira automatiquement sur `http://localhost:3000`

## Fonctionnalités

### 🔐 Authentification
- Connexion via email/mot de passe Firebase
- Gestion des sessions
- Déconnexion sécurisée

### 📊 Dashboard
- Vue d'ensemble des statistiques
- Graphiques (types de contenu, activité)
- Contenu récent avec vues/likes

### 🎬 Gestion du contenu
- Filtrer par type (Vidéo, Audio, Témoignage)
- Voir les statistiques (vues, likes)
- Supprimer du contenu

### 👥 Gestion des utilisateurs
- Liste des utilisateurs
- Attribuer/retirer le rôle admin
- Supprimer des utilisateurs

### 📅 Gestion des événements
- Créer nouveaux événements
- Voir la liste des événements
- Supprimer des événements
- Informations : date, lieu, description

### 💰 Gestion des donations
- Historique complet des donations
- Statistiques (total, moyenne)
- Montants et messages des donateurs

## Rôles et Permissions Firestore

### Configuration recommandée

1. **Collection admins** :
```javascript
{
  uid: "user-uid",
  email: "admin@church.com",
  role: "admin",
  createdAt: Timestamp
}
```

2. **Règles Firestore** (pour protéger l'admin) :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contenu public
    match /content/{document=**} {
      allow read: if resource.data.status == 'published';
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId || isAdmin(request.auth.uid);
    }

    // Admin seulement
    match /admins/{document=**} {
      allow read, write: if isAdmin(request.auth.uid);
    }

    // Utilisateurs (leurs données)
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || isAdmin(request.auth.uid);
    }

    // Événements
    match /events/{document=**} {
      allow read: if true;
      allow create, update, delete: if isAdmin(request.auth.uid);
    }

    // Donations
    match /donations/{document=**} {
      allow read: if isAdmin(request.auth.uid);
      allow create: if request.auth != null;
    }

    // Fonction helper
    function isAdmin(uid) {
      return exists(/databases/$(database)/documents/admins/$(uid));
    }
  }
}
```

## Build pour la production

```bash
npm run build
```

Le dossier `dist/` contient les fichiers prêts pour le déploiement.

### Déployer sur Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Configurer le projet
firebase init

# Déployer
firebase deploy
```

## Structure des collections Firestore attendues

### content
```json
{
  "id": "doc-id",
  "title": "Titre",
  "description": "Description",
  "type": "video|audio|testimony",
  "mediaUrl": "cloudinary-url",
  "authorId": "user-uid",
  "authorName": "Nom Auteur",
  "createdAt": Timestamp,
  "status": "published|draft",
  "views": 100,
  "likes": ["user-id-1"],
  "shares": 5
}
```

### users
```json
{
  "id": "user-uid",
  "name": "User Name",
  "email": "user@example.com",
  "createdAt": Timestamp,
  "isAdmin": false
}
```

### events
```json
{
  "id": "doc-id",
  "title": "Event Title",
  "description": "Description",
  "date": "2024-12-25",
  "location": "Church",
  "createdAt": Timestamp,
  "attendees": 50
}
```

### donations
```json
{
  "id": "doc-id",
  "donorName": "Donor Name",
  "email": "donor@example.com",
  "amount": 50.00,
  "message": "Message",
  "createdAt": Timestamp
}
```

## Technologies utilisées

- **Vite** : Build tool ultra-rapide
- **React 18** : Framework UI
- **React Router v6** : Navigation
- **Firebase** : Backend + Auth
- **Tailwind CSS** : Styling
- **Recharts** : Graphiques
- **Lucide React** : Icônes

## Commandes principales

```bash
# Développement
npm run dev

# Build production
npm run build

# Aperçu du build
npm run preview

# Lint
npm run lint
```

## Troubleshooting

### Erreur de dépendances
```bash
npm install --legacy-peer-deps
```

### Variables d'environnement non chargées
- Vérifier que le fichier `.env` existe
- Vérifier les noms (doivent commencer par `VITE_`)
- Redémarrer le serveur après modification

### Erreurs Firebase
- Vérifier les règles Firestore
- Vérifier que l'utilisateur est admin dans `admins` collection
- Vérifier la configuration Firebase

## Prochaines étapes

1. ✅ Créer la structure du projet
2. ✅ Configurer l'authentification
3. ✅ Implémenter le dashboard
4. ⏳ **À faire** : Ajouter les modales d'édition
5. ⏳ **À faire** : Ajouter l'export de données (CSV)
6. ⏳ **À faire** : Ajouter les notifications en temps réel
7. ⏳ **À faire** : Ajouter les logs d'audit

