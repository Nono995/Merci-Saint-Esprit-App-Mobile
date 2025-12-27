# 📱 Guide de Déploiement - Merci Saint-Esprit

## 🎯 Options de Déploiement

### Option 1: EAS Build (RECOMMANDÉ) ⭐
**Avantages:**
- ✅ Vraie app installable (APK/IPA)
- ✅ Fonctionne sans Expo Go
- ✅ Peut être partagée facilement
- ✅ Prête pour les stores

**Inconvénients:**
- ⏱ Prend 10-20 minutes à build
- 💰 Gratuit pour 30 builds/mois

### Option 2: Expo Go (RAPIDE)
**Avantages:**
- ✅ Instantané (déjà en dev)
- ✅ Gratuit illimité
- ✅ Facile à partager (QR code)

**Inconvénients:**
- ❌ Nécessite l'app Expo Go
- ❌ Moins professionnel
- ❌ Certaines fonctionnalités limitées

### Option 3: Web App (PWA)
**Avantages:**
- ✅ Accessible via navigateur
- ✅ Installable sur écran d'accueil
- ✅ Pas de store nécessaire

**Inconvénients:**
- ❌ Fonctionnalités limitées
- ❌ Moins performant

---

## 🚀 OPTION 1: EAS Build (Android APK)

### Prérequis:
- Compte Expo (gratuit)
- Node.js installé
- Projet Expo fonctionnel

### Étape 1: Installer EAS CLI

```bash
npm install -g eas-cli
```

### Étape 2: Se connecter

```bash
eas login
```

Si pas de compte:
```bash
eas register
```

### Étape 3: Configurer le projet

Le fichier `eas.json` est déjà créé avec 3 profils:
- **development**: Pour tester avec dev tools
- **preview**: Pour prototype (APK direct)
- **production**: Pour version finale

### Étape 4: Build Android (APK)

Pour un **prototype rapide** (recommandé):
```bash
eas build --platform android --profile preview
```

Pour la **version finale**:
```bash
eas build --platform android --profile production
```

### Étape 5: Attendre le build

Le build prend environ **10-20 minutes**. Tu verras:
```
✔ Build started
✔ Uploading project...
✔ Building...
✔ Build finished!
```

### Étape 6: Télécharger l'APK

Une fois terminé, tu recevras:
- Un lien de téléchargement direct
- Un QR code pour télécharger sur mobile

**Exemple:**
```
https://expo.dev/artifacts/eas/abc123.apk
```

### Étape 7: Installer sur Android

**Méthode 1: Direct sur téléphone**
1. Ouvre le lien sur ton téléphone
2. Télécharge l'APK
3. Autorise "Sources inconnues" si demandé
4. Installe l'APK

**Méthode 2: Via ordinateur**
1. Télécharge l'APK sur PC
2. Transfère sur téléphone (USB, email, Drive)
3. Ouvre le fichier sur téléphone
4. Installe

### Étape 8: Partager avec testeurs

Tu peux partager:
- Le lien direct
- Le QR code
- Le fichier APK

---

## 📱 OPTION 2: Expo Go (Test Rapide)

### Étape 1: Publier sur Expo

```bash
npx expo publish
```

### Étape 2: Obtenir le lien

Tu recevras un lien comme:
```
exp://exp.host/@username/merci-saint-esprit
```

### Étape 3: Partager

**Méthode 1: QR Code**
```bash
npx expo start --tunnel
```
Scanne le QR code avec Expo Go

**Méthode 2: Lien direct**
Envoie le lien `exp://...` aux testeurs

### Étape 4: Ouvrir sur mobile

1. Installe Expo Go (Play Store / App Store)
2. Scanne le QR code OU
3. Ouvre le lien dans Expo Go

---

## 🌐 OPTION 3: Web App (PWA)

### Étape 1: Build web

```bash
npx expo export:web
```

### Étape 2: Déployer

**Option A: Netlify (Gratuit)**
```bash
npm install -g netlify-cli
netlify deploy --dir=web-build --prod
```

**Option B: Vercel (Gratuit)**
```bash
npm install -g vercel
vercel --prod
```

**Option C: Firebase Hosting**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Étape 3: Installer sur mobile

1. Ouvre le lien web sur mobile
2. Menu → "Ajouter à l'écran d'accueil"
3. L'app apparaît comme une vraie app

---

## 🔧 Commandes Utiles

### Vérifier le statut du build
```bash
eas build:list
```

### Voir les builds en cours
```bash
eas build:view
```

### Annuler un build
```bash
eas build:cancel
```

### Mettre à jour la version
Dans `app.json`:
```json
{
  "version": "1.0.1",
  "android": {
    "versionCode": 2
  }
}
```

Puis rebuild:
```bash
eas build --platform android --profile preview
```

---

## 📊 Comparaison des Options

| Critère | EAS Build | Expo Go | Web App |
|---------|-----------|---------|---------|
| **Installation** | Vraie app | Via Expo Go | Via navigateur |
| **Temps** | 10-20 min | Instantané | 5 min |
| **Coût** | Gratuit (30/mois) | Gratuit | Gratuit |
| **Professionnel** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Partage** | Facile | Très facile | Très facile |
| **Performance** | Excellente | Bonne | Moyenne |
| **Offline** | Oui | Oui | Limité |

---

## 🎯 Recommandation pour Prototype

### Pour tester rapidement (aujourd'hui):
```bash
npx expo start --tunnel
```
→ Scanne le QR avec Expo Go

### Pour partager avec clients/testeurs (cette semaine):
```bash
eas build --platform android --profile preview
```
→ Partage le lien APK

### Pour version finale (avant lancement):
```bash
eas build --platform android --profile production
```
→ Prêt pour Google Play Store

---

## 🐛 Problèmes Courants

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
Vérifie:
- `app.json` est valide
- Toutes les dépendances sont installées
- Firebase config est correct

### "APK ne s'installe pas"
- Active "Sources inconnues" dans les paramètres Android
- Vérifie que l'APK n'est pas corrompu

### "Expo Go ne trouve pas l'app"
```bash
npx expo start --tunnel
```
Utilise le mode tunnel pour contourner les problèmes réseau

---

## 📝 Checklist Avant Build

- [ ] Toutes les fonctionnalités testées en dev
- [ ] Firebase configuré correctement
- [ ] Cloudinary configuré
- [ ] Icônes et splash screen présents
- [ ] `app.json` à jour (version, package name)
- [ ] Pas d'erreurs dans la console
- [ ] Testé sur Expo Go

---

## 🚀 Commandes Rapides

### Build Android (Prototype)
```bash
eas build --platform android --profile preview
```

### Build iOS (Prototype)
```bash
eas build --platform ios --profile preview
```

### Build les deux
```bash
eas build --platform all --profile preview
```

### Publier sur Expo Go
```bash
npx expo publish
```

### Démarrer en tunnel
```bash
npx expo start --tunnel
```

---

## 📱 Après Installation

### Tester:
1. ✅ Ouvrir l'app
2. ✅ Navigation entre écrans
3. ✅ Lecture vidéo
4. ✅ Lecture podcast
5. ✅ Bible (lecture et cache)
6. ✅ Notifications
7. ✅ Likes et partages
8. ✅ Mode offline

### Partager:
- Envoie le lien APK par WhatsApp, email, etc.
- Crée un QR code pour faciliter le téléchargement
- Héberge l'APK sur Google Drive ou Dropbox

---

## 🎉 Prochaines Étapes

### Après prototype validé:

1. **Google Play Store**
```bash
eas build --platform android --profile production
eas submit --platform android
```

2. **Apple App Store**
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

3. **Updates OTA (Over-The-Air)**
```bash
eas update --branch production
```
Les utilisateurs reçoivent les mises à jour sans réinstaller!

---

## 💡 Conseils

### Pour un prototype professionnel:
1. Utilise **EAS Build preview**
2. Teste sur plusieurs appareils
3. Collecte les retours utilisateurs
4. Itère rapidement

### Pour économiser les builds:
- Teste au maximum sur Expo Go d'abord
- Build seulement quand tout fonctionne
- Utilise le profil "preview" pour tests
- Garde "production" pour la version finale

### Pour partager facilement:
- Crée un lien court (bit.ly)
- Ajoute des instructions claires
- Préviens que c'est un prototype
- Demande des retours spécifiques

---

## 📞 Support

### Documentation officielle:
- EAS Build: https://docs.expo.dev/build/introduction/
- Expo Go: https://docs.expo.dev/get-started/expo-go/
- Submit to stores: https://docs.expo.dev/submit/introduction/

### Communauté:
- Discord Expo: https://chat.expo.dev/
- Forums: https://forums.expo.dev/
- Stack Overflow: tag `expo`

---

🎉 **Ton app est prête à être déployée!**

Commence par:
```bash
eas build --platform android --profile preview
```

Et dans 20 minutes, tu auras une vraie app installable! 📱
