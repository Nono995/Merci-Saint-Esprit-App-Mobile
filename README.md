# Application Mobile d'Église

Une application mobile complète pour la gestion d'une communauté d'église, développée avec Expo React Native.

## Fonctionnalités

### 🏠 Accueil
- Fil d'actualité avec vidéos, témoignages et podcasts
- Actions rapides (Live, Publier, Donner)
- Interface moderne avec dégradés

### 📹 Diffusion en Direct
- Streaming vidéo en temps réel
- Chat en direct avec les spectateurs
- Contrôles de caméra (avant/arrière)
- Indicateur de direct avec nombre de spectateurs

### ❤️ Témoignages
- Publication de témoignages par catégorie
- Système de likes et partage
- Interface intuitive pour ajouter des témoignages

### 🎧 Podcasts Audio
- Lecteur audio intégré
- Contrôles de lecture (play, pause, stop)
- Barre de progression
- Liste de podcasts spirituels

### 💰 Système de Dons
- Dons uniques, mensuels ou dîmes
- Montants prédéfinis et personnalisés
- Méthodes de paiement multiples
- Section impact des dons

### 📱 Ajout de Contenu
- Publication de vidéos, audios, témoignages
- Sélection depuis galerie ou enregistrement direct
- Options de visibilité (public/membres)

### 👤 Profil Utilisateur
- Statistiques personnelles
- Paramètres de l'application
- Historique d'activité
- Support et aide

## Installation

1. Clonez le projet
```bash
git clone [url-du-repo]
cd Frond-App-Church
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez l'application
```bash
npm start
```

4. Testez avec Expo Go
- Installez Expo Go sur votre téléphone
- Scannez le QR code affiché

## Structure du Projet

```
src/
├── screens/           # Écrans de l'application
│   ├── HomeScreen.js
│   ├── LiveScreen.js
│   ├── TestimonyScreen.js
│   ├── PodcastScreen.js
│   ├── DonationScreen.js
│   ├── VideoPlayerScreen.js
│   ├── AddContentScreen.js
│   └── ProfileScreen.js
├── components/        # Composants réutilisables
└── services/         # Services et API
```

## Technologies Utilisées

- **Expo** - Framework de développement
- **React Native** - Framework mobile
- **React Navigation** - Navigation
- **Expo AV** - Audio/Vidéo
- **Expo Camera** - Caméra
- **Expo Linear Gradient** - Dégradés
- **Vector Icons** - Icônes

## Permissions Requises

- Caméra (pour live et enregistrement)
- Microphone (pour audio)
- Galerie (pour sélection de médias)
- Stockage (pour téléchargements)

## Prochaines Étapes

1. **Backend** - Développement de l'API
2. **Authentification** - Système de connexion
3. **Base de données** - Stockage des données
4. **Notifications Push** - Alertes en temps réel
5. **Paiements** - Intégration Stripe/PayPal
6. **Chat en temps réel** - WebSocket
7. **Optimisations** - Performance et UX

## Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créez une Pull Request

## Licence

Ce projet est sous licence MIT.