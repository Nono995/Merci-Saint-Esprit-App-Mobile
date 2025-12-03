# Configuration Cloudinary + Firebase

## Installation des dépendances

Exécute ces commandes :

```bash
npm install axios firebase
```

## Configuration Cloudinary

### 1. Créer un compte Cloudinary
- Aller sur https://cloudinary.com
- S'inscrire gratuitement
- Aller au Dashboard

### 2. Récupérer les informations
Dans le Dashboard, tu trouveras :
- **Cloud Name** (au-dessus du logo Cloudinary)
- **API Key** (Settings → API Keys)
- **API Secret** (Settings → API Keys)

### 3. Créer un Upload Preset (NON signé - important!)
- Aller à **Settings → Upload**
- Descendre à **Upload presets**
- Cliquer **Add upload preset**
- **Nom** : ex: `my_upload_preset`
- **Type** : `Unsigned` (très important!)
- **Sauvegarder**

## Configuration Firebase

### 1. Créer un projet Firebase
- Aller sur https://console.firebase.google.com
- Cliquer **Add project** → suivre les étapes
- Créer une **Web App**

### 2. Récupérer les informations
Dans Firebase Console :
- Project Settings → onglet **General**
- Copier les informations sous "Your web app's Firebase config"

## Fichier .env

Créer un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Puis remplir avec tes informations :

```env
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=ton_cloud_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=mon_upload_preset
EXPO_PUBLIC_CLOUDINARY_API_KEY=ta_clé_api
EXPO_PUBLIC_CLOUDINARY_API_SECRET=ton_secret_api

EXPO_PUBLIC_FIREBASE_API_KEY=ta_clé_firebase
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=ton-projet.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=ton-id-projet
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=ton-projet.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Firebase Firestore Setup

### 1. Créer une base de données Firestore
- Firebase Console → **Firestore Database**
- Cliquer **Create Database**
- Mode: **Start in production mode** (ou test mode pour développement)
- Région: `europe-west1` (ou proche de chez toi)

### 2. Ajouter les règles de sécurité
Dans **Firestore → Rules**, remplacer par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Autoriser la lecture publique du contenu publié
    match /content/{document=**} {
      allow read: if resource.data.status == 'published';
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Protéger les autres collections
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Fichiers créés

✅ `src/services/cloudinaryService.js` - Upload vers Cloudinary
✅ `src/services/contentService.js` - Gestion du contenu dans Firebase
✅ `src/config/env.js` - Configuration centralisée
✅ `src/screens/AddContentScreen.js` - Écran de publication mis à jour

## Tester

1. **Lancer l'app** :
```bash
npm start
```

2. **Naviguer vers "Partager"** (AddContentScreen)

3. **Publier du contenu** :
   - Sélectionner un type (Vidéo, Audio, Témoignage)
   - Remplir titre + description
   - Pour vidéo/audio : choisir un fichier
   - Cliquer "Publier"

## Dépannage

### "Upload failed"
- Vérifier les variables `.env`
- Vérifier que l'upload preset est `Unsigned`
- Vérifier les permissions Cloudinary

### "Firestore permission denied"
- Vérifier que l'utilisateur est connecté
- Vérifier les règles Firestore

### Fichier trop volumineux
Ajouter des limites dans l'upload :
- MaxSize Cloudinary: Settings → Upload → Max file size

## Structure des données Firestore

Collection: `content`

```javascript
{
  id: "doc-id",
  title: "Titre",
  description: "Description",
  type: "video", // video, audio, testimony
  mediaUrl: "https://res.cloudinary.com/.../video.mp4",
  publicId: "frond-app-church/video123",
  duration: 1234, // en secondes
  authorId: "user-uid",
  authorName: "Pasteur Martin",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  views: 0,
  likes: ["user-id-1", "user-id-2"],
  shares: 5,
  status: "published"
}
```

## Utilisation dans HomeScreen

```javascript
import { fetchAllContent } from '../services/contentService';

useEffect(() => {
  const loadContent = async () => {
    const content = await fetchAllContent();
    setPosts(content);
  };
  loadContent();
}, []);
```
