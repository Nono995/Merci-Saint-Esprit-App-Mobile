# 🔍 Dépannage Build EAS

## ❌ Erreur: "Prebuild build phase"

Cette erreur signifie que EAS ne peut pas générer les fichiers natifs Android/iOS.

## 🎯 Solutions à Essayer

### Solution 1: Vérifier les Assets (PROBABLE)

Les fichiers suivants DOIVENT exister:
```
assets/
├── icon.png (1024x1024)
├── adaptive-icon.png (1024x1024)
├── splash.png (1284x2778)
└── favicon.png (48x48)
```

#### Vérification:
```bash
dir assets
```

#### Si manquants:
Crée des images temporaires ou utilise les images par défaut d'Expo.

---

### Solution 2: Utiliser app.json au lieu de app.config.js

EAS Build préfère `app.json` pour éviter les problèmes.

#### Étapes:

1. **Supprime** `app.config.js`
2. **Crée** `app.json` avec ce contenu:

```json
{
  "expo": {
    "name": "Merci Saint-Esprit",
    "slug": "church-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "assetBundlePatterns": ["**/*"],
    "android": {
      "package": "com.mercisaintesprit.churchapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "backgroundColor": "#7C3AED"
      }
    },
    "plugins": [
      "expo-camera",
      "expo-av",
      "expo-media-library"
    ],
    "extra": {
      "eas": {
        "projectId": "bbbdc9f1-aaea-4760-9b8e-9e2989de3864"
      }
    }
  }
}
```

3. **Rebuild:**
```bash
eas build --platform android --profile preview
```

---

### Solution 3: Build sans Prebuild (Managed Workflow)

Modifie `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.9.0",
    "appVersionSource": "remote"
  },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
```

---

### Solution 4: Consulter les Logs Détaillés

1. **Va sur le dashboard:**
   https://expo.dev/accounts/nono995/projects/church-app/builds/9f1e22c9-6fe8-4f9c-ab79-41d5388c7a32

2. **Clique sur "Prebuild"**

3. **Lis l'erreur exacte**

4. **Cherche:**
   - "Error:" ou "Failed:"
   - Nom de fichier manquant
   - Plugin qui échoue

---

### Solution 5: Simplifier la Configuration

Crée un `app.json` MINIMAL:

```json
{
  "expo": {
    "name": "Merci Saint-Esprit",
    "slug": "church-app",
    "version": "1.0.0",
    "android": {
      "package": "com.mercisaintesprit.churchapp"
    },
    "extra": {
      "eas": {
        "projectId": "bbbdc9f1-aaea-4760-9b8e-9e2989de3864"
      }
    }
  }
}
```

Puis rebuild.

---

### Solution 6: Nettoyer le Cache EAS

```bash
eas build:cancel
eas build --platform android --profile preview --clear-cache
```

---

## 🎯 Méthode Recommandée (FACILE)

### Utilise Expo Go pour l'instant!

Au lieu de builder un APK, utilise Expo Go pour tester:

```bash
npx expo start --tunnel
```

**Avantages:**
- ✅ Instantané
- ✅ Pas de problèmes de build
- ✅ Parfait pour prototype
- ✅ Facile à partager (QR code)

**Pour partager:**
1. Lance `npx expo start --tunnel`
2. Partage le QR code (screenshot)
3. Les testeurs scannent avec Expo Go
4. Ça marche! 🎉

---

## 📱 Alternative: Expo Publish

Publie ton app sur Expo:

```bash
npx expo publish
```

Tu recevras un lien comme:
```
exp://exp.host/@nono995/church-app
```

Partage ce lien, les gens ouvrent avec Expo Go!

---

## 🔧 Commandes de Diagnostic

### Vérifier la config:
```bash
npx expo config
```

### Vérifier les dépendances:
```bash
npx expo doctor
```

### Vérifier EAS:
```bash
eas build:list
eas whoami
```

---

## 💡 Conseil Pro

### Pour un prototype rapide:

**N'utilise PAS EAS Build pour l'instant.**

Utilise plutôt:

1. **Expo Go** pour tester toi-même
2. **Expo Publish** pour partager avec testeurs
3. **EAS Build** plus tard quand tout est stable

### Commandes:
```bash
# Tester
npx expo start --tunnel

# Partager
npx expo publish
```

C'est **beaucoup plus simple** et **ça marche toujours**!

---

## 🎯 Plan d'Action

### Maintenant:

1. **Oublie EAS Build pour l'instant**
2. **Utilise Expo Go:**
   ```bash
   npx expo start --tunnel
   ```
3. **Teste ton app**
4. **Partage le QR code** avec testeurs

### Plus tard (quand tout marche):

1. Simplifie `app.json`
2. Vérifie les assets
3. Réessaie EAS Build

---

## 📞 Besoin d'Aide?

### Consulte les logs:
https://expo.dev/accounts/nono995/projects/church-app/builds

### Documentation:
- Prebuild: https://docs.expo.dev/workflow/prebuild/
- Troubleshooting: https://docs.expo.dev/build-reference/troubleshooting/

### Support:
- Discord: https://chat.expo.dev/
- Forums: https://forums.expo.dev/

---

## 🎉 Solution Rapide

**Pour tester MAINTENANT sans problèmes:**

```bash
npx expo start --tunnel
```

Scanne le QR avec Expo Go, et voilà! 🚀

**Pour partager avec testeurs:**

```bash
npx expo publish
```

Partage le lien `exp://...` et c'est tout!

---

**EAS Build peut attendre. Teste d'abord avec Expo Go!** 📱
