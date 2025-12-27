# 🚀 COMMENCE ICI - Déploiement en 3 Étapes

## 📱 Tu veux tester TON app maintenant?

### Étape 1: Ouvre un terminal
```bash
cd C:\chemin\vers\ton\projet
```

### Étape 2: Lance cette commande
```bash
npx expo start --tunnel
```

### Étape 3: Scanne le QR code
1. Installe **Expo Go** sur ton téléphone:
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Ouvre Expo Go
3. Scanne le QR code affiché dans le terminal
4. **L'app se lance!** 🎉

---

## 📦 Tu veux une VRAIE app installable?

### Étape 1: Installe EAS CLI
```bash
npm install -g eas-cli
```

### Étape 2: Connecte-toi à Expo
```bash
eas login
```
(Crée un compte gratuit sur https://expo.dev si besoin)

### Étape 3: Build l'APK Android
```bash
eas build --platform android --profile preview
```

### Étape 4: Attends 10-20 minutes ⏱
Tu verras la progression dans le terminal.

### Étape 5: Télécharge l'APK
Quand c'est terminé, tu reçois un lien comme:
```
https://expo.dev/artifacts/eas/abc123.apk
```

### Étape 6: Installe sur ton téléphone
1. Ouvre le lien sur ton téléphone
2. Télécharge l'APK
3. Autorise "Sources inconnues" si demandé
4. Installe l'APK
5. **Lance l'app!** 🎉

---

## 🎯 Quelle option choisir?

### Option 1: Expo Go (RAPIDE)
- ✅ Instantané (2 minutes)
- ✅ Gratuit illimité
- ✅ Parfait pour tester toi-même
- ❌ Nécessite l'app Expo Go

**Commande:**
```bash
npx expo start --tunnel
```

### Option 2: EAS Build (PROFESSIONNEL)
- ✅ Vraie app installable
- ✅ Fonctionne sans Expo Go
- ✅ Parfait pour partager avec d'autres
- ⏱ Prend 20 minutes

**Commande:**
```bash
eas build --platform android --profile preview
```

---

## 🔥 Raccourci Windows

Double-clique sur:
```
build-android.bat
```

Choisis "1" pour Preview, et c'est parti!

---

## 📤 Partager avec d'autres

### Après le build EAS:
1. Copie le lien de téléchargement
2. Envoie par WhatsApp, Email, etc.
3. Les testeurs téléchargent et installent
4. Ça marche! 🎉

### Avec Expo Go:
1. Lance `npx expo start --tunnel`
2. Partage le QR code (screenshot)
3. Les testeurs scannent avec Expo Go
4. Ça marche! 🎉

---

## ⚠️ Problèmes?

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "APK ne s'installe pas"
Active "Sources inconnues" dans les paramètres Android:
1. Paramètres → Sécurité
2. Active "Sources inconnues"
3. Réessaie d'installer

### Expo Go ne trouve pas l'app
Utilise le mode tunnel:
```bash
npx expo start --tunnel
```

---

## 📚 Plus d'infos?

- **Guide complet:** `DEPLOYMENT_GUIDE.md`
- **Résumé visuel:** `DEPLOYMENT_SUMMARY.md`
- **Commandes rapides:** `COMMANDES_DEPLOYMENT.txt`
- **Démarrage rapide:** `QUICK_START_DEPLOYMENT.md`

---

## 🎉 C'est tout!

### Pour tester MAINTENANT:
```bash
npx expo start --tunnel
```

### Pour build APK:
```bash
eas build --platform android --profile preview
```

**Bonne chance! 🚀**
