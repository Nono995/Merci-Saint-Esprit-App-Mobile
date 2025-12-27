# 📦 Comment Générer l'APK

## 🎯 3 Méthodes à Essayer

### Méthode 1: Script Automatique (FACILE)

Double-clique sur:
```
generate-apk.bat
```

Choisis l'option 1, puis attends 20 minutes.

---

### Méthode 2: Commandes Manuelles

#### Étape 1: Simplifie la configuration
```bash
# Sauvegarde l'ancien
ren app.config.js app.config.js.backup

# Utilise le simplifié
copy app.json.simple app.json
```

#### Étape 2: Build
```bash
eas build --platform android --profile preview --clear-cache
```

---

### Méthode 3: Expo Classic Build (Plus Stable)

```bash
expo build:android -t apk
```

Cette méthode est **plus ancienne** mais **plus stable**.

---

## 📊 Quelle Méthode Choisir?

| Méthode | Stabilité | Temps | Recommandé |
|---------|-----------|-------|------------|
| Script Auto | ⭐⭐⭐ | 20 min | ✅ Oui |
| Manuelle | ⭐⭐⭐ | 20 min | ✅ Oui |
| Classic Build | ⭐⭐⭐⭐⭐ | 25 min | ⚠️ Déprécié |

---

## 🚀 Commande Rapide

Si tu veux essayer directement:

```bash
# 1. Simplifie
ren app.config.js app.config.js.backup
copy app.json.simple app.json

# 2. Build
eas build --platform android --profile preview --clear-cache
```

---

## ⏱ Temps d'Attente

- **Upload**: 2-3 minutes
- **Build**: 15-20 minutes
- **Total**: ~20 minutes

Tu peux fermer le terminal et vérifier sur:
https://expo.dev/accounts/nono995/projects/church-app/builds

---

## 📱 Après le Build

### Si ça réussit:
```
✔ Build finished!

Download: https://expo.dev/artifacts/eas/[ID].apk
```

1. Ouvre le lien sur ton téléphone
2. Télécharge l'APK
3. Installe
4. Lance l'app! 🎉

### Si ça échoue:
1. Consulte les logs sur le dashboard
2. Essaie la Méthode 3 (Classic Build)
3. Ou continue avec Expo Go (fonctionne toujours!)

---

## 💡 Alternative: Continue avec Expo Go

Si les builds continuent d'échouer, **Expo Go est parfait** pour un prototype:

```bash
npx expo start --tunnel
```

**Avantages:**
- ✅ Fonctionne toujours
- ✅ Instantané
- ✅ Facile à partager (QR code)
- ✅ Parfait pour tester

**Pour partager:**
1. Lance `npx expo start --tunnel`
2. Screenshot du QR code
3. Envoie aux testeurs
4. Ils scannent avec Expo Go
5. Ça marche!

---

## 🎯 Plan d'Action

### Maintenant:
1. Lance `generate-apk.bat`
2. Choisis option 1
3. Attends 20 minutes

### Si ça échoue:
1. Réessaie avec option 2 (Classic Build)
2. Ou continue avec Expo Go

### Si ça réussit:
1. Télécharge l'APK
2. Installe sur ton téléphone
3. Teste l'app
4. Partage avec testeurs! 🎉

---

## 🐛 Problèmes Courants

### "Build failed"
→ Essaie Classic Build: `expo build:android -t apk`

### "Configuration error"
→ Vérifie que `app.json.simple` existe

### "Timeout"
→ Réessaie, c'est un problème serveur

---

## 📞 Besoin d'Aide?

### Dashboard:
https://expo.dev/accounts/nono995/projects/church-app

### Logs:
https://expo.dev/accounts/nono995/projects/church-app/builds

### Documentation:
- EAS Build: https://docs.expo.dev/build/introduction/
- Classic Build: https://docs.expo.dev/classic/building-standalone-apps/

---

## 🎉 Résumé

### Pour générer l'APK:
```bash
generate-apk.bat
```

### Ou manuellement:
```bash
ren app.config.js app.config.js.backup
copy app.json.simple app.json
eas build --platform android --profile preview --clear-cache
```

### Ou avec Classic Build:
```bash
expo build:android -t apk
```

**Bonne chance! 🚀**
