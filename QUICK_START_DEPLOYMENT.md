# 🚀 Déploiement Rapide - 3 Étapes

## Pour tester MAINTENANT (2 minutes) ⚡

### 1. Lance l'app en mode tunnel
```bash
npx expo start --tunnel
```

### 2. Installe Expo Go sur ton téléphone
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
- iOS: https://apps.apple.com/app/expo-go/id982107779

### 3. Scanne le QR code
- Ouvre Expo Go
- Scanne le QR code affiché dans le terminal
- L'app se lance! 🎉

---

## Pour installer comme vraie app (20 minutes) 📱

### 1. Installe EAS CLI
```bash
npm install -g eas-cli
```

### 2. Connecte-toi
```bash
eas login
```
(Crée un compte gratuit si besoin)

### 3. Build l'APK
```bash
eas build --platform android --profile preview
```

### 4. Attends 10-20 minutes ⏱

Tu verras:
```
✔ Build started
✔ Uploading...
✔ Building...
✔ Build finished!

Download: https://expo.dev/artifacts/eas/abc123.apk
```

### 5. Télécharge et installe
- Ouvre le lien sur ton téléphone
- Télécharge l'APK
- Installe (autorise "Sources inconnues" si demandé)
- Lance l'app! 🎉

---

## OU utilise le script automatique (Windows)

Double-clique sur:
```
build-android.bat
```

Choisis "1" pour Preview, et c'est parti!

---

## 🎯 Quelle option choisir?

### Tu veux tester MAINTENANT?
→ **Expo Go** (option 1)
- Instantané
- Gratuit
- Parfait pour dev

### Tu veux partager avec d'autres?
→ **EAS Build** (option 2)
- Vraie app
- Installable sans Expo Go
- Plus professionnel

---

## 📱 Partager avec testeurs

### Après le build EAS:
1. Copie le lien de téléchargement
2. Envoie par WhatsApp/Email
3. Les testeurs téléchargent et installent
4. Ça marche! 🎉

### Avec Expo Go:
1. Lance `npx expo start --tunnel`
2. Partage le QR code (screenshot)
3. Les testeurs scannent avec Expo Go
4. Ça marche! 🎉

---

## ⚠️ Important

### Avant de build:
- [ ] Teste tout sur Expo Go d'abord
- [ ] Vérifie que Firebase fonctionne
- [ ] Vérifie que Cloudinary fonctionne
- [ ] Pas d'erreurs dans la console

### Après installation:
- [ ] Teste toutes les fonctionnalités
- [ ] Vérifie les vidéos
- [ ] Vérifie la Bible
- [ ] Vérifie les notifications

---

## 🆘 Problèmes?

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Build failed"
Vérifie `app.json` et réessaie

### "APK ne s'installe pas"
Active "Sources inconnues" dans les paramètres Android

### Expo Go ne trouve pas l'app
Utilise le mode tunnel:
```bash
npx expo start --tunnel
```

---

## 🎉 C'est tout!

**Option rapide (maintenant):**
```bash
npx expo start --tunnel
```

**Option pro (20 min):**
```bash
eas build --platform android --profile preview
```

Bonne chance! 🚀
