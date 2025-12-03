# 🎛️ Panel d'Administration - Merci Saint-Esprit

Panel d'administration web pour gérer l'application mobile "Merci Saint-Esprit".

## 🚀 Démarrage Rapide

### Installation
```bash
cd admin
npm install
```

### Configuration
1. Créer un fichier `.env` basé sur `.env.example`
2. Configurer Firebase et Cloudinary

### Lancement
```bash
npm run dev
```

Le panel sera accessible sur `http://localhost:5173`

## 📋 Fonctionnalités

### 🏠 Dashboard
- Vue d'ensemble des statistiques
- Graphiques de contenu par type
- Activité récente
- Actions rapides

### 🎬 Gestion du Contenu (Réorganisé ✨)

L'onglet **Contenu** est maintenant organisé en 3 sections distinctes :

#### 1. 🎥 Vidéos
- Upload de vidéos de prédications
- Gestion des enseignements
- Statistiques de vues et likes

#### 2. 🎙️ Podcasts
- Upload de contenus audio
- Gestion des podcasts
- Statistiques d'écoute

#### 3. 💬 Témoignages
- Gestion des témoignages
- Modération du contenu
- Statistiques d'engagement

**Voir [CONTENT_ORGANIZATION.md](./CONTENT_ORGANIZATION.md) pour plus de détails**

### 👥 Utilisateurs
- Liste des utilisateurs
- Gestion des rôles
- Statistiques d'activité

### 📅 Événements
- Création d'événements
- Gestion des inscriptions
- Calendrier

### 📊 Analytics
- Statistiques détaillées
- Graphiques d'engagement
- Rapports exportables

### 🔔 Notifications
- Envoi de notifications push
- Ciblage d'audience
- Historique des envois

### 💰 Dons
- Suivi des dons
- Statistiques financières
- Gestion des donateurs

## 🎨 Interface

### Navigation
- **Sidebar** : Navigation principale avec icônes
- **Top Bar** : Recherche et profil admin
- **Responsive** : Adapté mobile et desktop

### Design System
- **Couleurs** :
  - Primary: `#6366F1` (Indigo)
  - Secondary: `#EC4899` (Pink)
  - Accent: `#06B6D4` (Cyan)
- **Framework** : Tailwind CSS
- **Icônes** : Lucide React
- **Graphiques** : Recharts

## 🔐 Authentification

- Connexion via Firebase Auth
- Protection des routes
- Session persistante
- Déconnexion sécurisée

## 📦 Technologies

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling

### Backend & Services
- **Firebase** :
  - Authentication
  - Firestore Database
  - Storage
- **Cloudinary** - Hébergement médias

### Librairies
- **Recharts** - Graphiques
- **Lucide React** - Icônes
- **Axios** - HTTP Client

## 📁 Structure du Projet

```
admin/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Layout.jsx       # Layout principal
│   │   ├── StatCard.jsx     # Carte de statistique
│   │   └── DataTable.jsx    # Tableau de données
│   ├── pages/               # Pages de l'admin
│   │   ├── Dashboard.jsx    # Tableau de bord
│   │   ├── ContentManager.jsx  # Gestion contenu (RÉORGANISÉ ✨)
│   │   ├── UserManager.jsx  # Gestion utilisateurs
│   │   ├── EventManager.jsx # Gestion événements
│   │   ├── TestimonyManager.jsx # Gestion témoignages
│   │   ├── Analytics.jsx    # Analytics
│   │   ├── NotificationManager.jsx # Notifications
│   │   └── LoginPage.jsx    # Page de connexion
│   ├── config/
│   │   └── firebase.js      # Configuration Firebase
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── public/                  # Assets statiques
├── .env                     # Variables d'environnement
├── .env.example             # Template des variables
├── index.html               # HTML principal
├── package.json             # Dépendances
├── tailwind.config.js       # Config Tailwind
├── vite.config.js           # Config Vite
├── CONTENT_ORGANIZATION.md  # Doc organisation contenu
└── README.md                # Ce fichier
```

## 🔧 Configuration

### Variables d'Environnement

Créer un fichier `.env` :

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## 🎯 Workflow de Gestion du Contenu

### Ajouter une Vidéo
1. Aller dans **Contenu** → **Vidéos**
2. Cliquer sur "Ajouter une vidéo"
3. Remplir le formulaire
4. Uploader le fichier vidéo
5. Publier

### Ajouter un Podcast
1. Aller dans **Contenu** → **Podcasts**
2. Cliquer sur "Ajouter un podcast"
3. Remplir le formulaire
4. Uploader le fichier audio
5. Publier

### Gérer les Témoignages
1. Aller dans **Contenu** → **Témoignages**
2. Voir la liste des témoignages
3. Modérer ou supprimer si nécessaire

## 🔒 Sécurité

- ✅ Routes protégées par authentification
- ✅ Validation des données côté client
- ✅ Règles de sécurité Firebase
- ✅ Variables d'environnement sécurisées
- ✅ HTTPS en production

## 🚀 Déploiement

### Build
```bash
npm run build
```

### Hébergement Recommandé
- **Vercel** (Recommandé)
- **Netlify**
- **Firebase Hosting**

### Commande de déploiement (Vercel)
```bash
vercel --prod
```

## 📈 Améliorations Futures

- [ ] Édition de contenu existant
- [ ] Recherche avancée
- [ ] Filtres multiples
- [ ] Export de données
- [ ] Programmation de publications
- [ ] Système de tags
- [ ] Prévisualisation médias
- [ ] Gestion des permissions
- [ ] Logs d'activité
- [ ] Mode sombre

## 🐛 Dépannage

### Problème de connexion Firebase
- Vérifier les variables d'environnement
- Vérifier les règles Firestore
- Vérifier l'authentification Firebase

### Problème d'upload Cloudinary
- Vérifier le cloud name
- Vérifier l'upload preset
- Vérifier les limites de taille

## 📞 Support

Pour toute question ou problème :
- Consulter la documentation
- Vérifier les logs de la console
- Contacter l'équipe de développement

---

**Version** : 2.0.0  
**Dernière mise à jour** : Décembre 2025  
**Développé pour** : Application Mobile "Merci Saint-Esprit"
