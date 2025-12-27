# 📱 Déploiement - Merci Saint-Esprit

## 🎯 Objectif
Transformer ton app React Native Expo en une application mobile installable pour tester ton prototype.

## 📂 Fichiers de Déploiement

| Fichier | Description |
|---------|-------------|
| `START_HERE.md` | **COMMENCE ICI** - Guide rapide en 3 étapes |
| `QUICK_START_DEPLOYMENT.md` | Démarrage rapide (2-20 min) |
| `DEPLOYMENT_GUIDE.md` | Guide complet et détaillé |
| `DEPLOYMENT_SUMMARY.md` | Résumé visuel avec comparaisons |
| `COMMANDES_DEPLOYMENT.txt` | Aide-mémoire des commandes |
| `build-android.bat` | Script automatique Windows |
| `eas.json` | Configuration EAS Build |
| `app.json` | Configuration app (mis à jour) |

## 🚀 Démarrage Rapide

### Option 1: Test Immédiat (2 minutes)
```bash
npx expo start --tunnel
```
→ Scanne le QR avec Expo Go

### Option 2: Build APK (20 minutes)
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```
→ Télécharge et installe l'APK

## 📖 Documentation

### Pour débutants:
1. Lis `START_HERE.md`
2. Suis les 3 étapes
3. Teste ton app!

### Pour plus de détails:
1. Consulte `DEPLOYMENT_GUIDE.md`
2. Vérifie `DEPLOYMENT_SUMMARY.md`
3. Utilise `COMMANDES_DEPLOYMENT.txt` comme référence

## 🎯 Workflow Recommandé

```
1. DEV       → npm start
2. TEST      → npx expo start --tunnel (Expo Go)
3. BUILD     → eas build -p android --profile preview
4. SHARE     → Partager le lien APK
5. FEEDBACK  → Collecter retours
6. ITERATE   → Améliorer et rebuild
```

## 💡 Conseils

### Avant de build:
- ✅ Teste tout sur Expo Go d'abord
- ✅ Vérifie Firebase et Cloudinary
- ✅ Pas d'erreurs dans la console
- ✅ Mets à jour la version dans `app.json`

### Pour économiser les builds:
- 30 builds gratuits par mois
- Utilise "preview" pour tests
- Garde "production" pour la version finale

### Pour partager:
- Copie le lien APK
- Envoie par WhatsApp/Email
- Ajoute des instructions claires

## 🐛 Dépannage

| Problème | Solution |
|----------|----------|
| "eas: command not found" | `npm install -g eas-cli` |
| "Not logged in" | `eas login` |
| "Build failed" | Vérifie `app.json` et réessaie |
| "APK ne s'installe pas" | Active "Sources inconnues" |
| "Expo Go ne trouve pas" | Utilise `--tunnel` |

## 📞 Support

- **Documentation Expo:** https://docs.expo.dev/build/introduction/
- **Discord Expo:** https://chat.expo.dev/
- **Forums:** https://forums.expo.dev/
- **Dashboard:** https://expo.dev/

## ✅ Checklist

### Avant build:
- [ ] Testé sur Expo Go
- [ ] Firebase configuré
- [ ] Cloudinary configuré
- [ ] Version mise à jour
- [ ] Pas d'erreurs

### Après installation:
- [ ] App s'ouvre
- [ ] Navigation fonctionne
- [ ] Vidéos lisent
- [ ] Bible fonctionne
- [ ] Notifications marchent

## 🎉 Prêt?

### Commence par:
```bash
npx expo start --tunnel
```

### Ou build directement:
```bash
eas build --platform android --profile preview
```

### Ou utilise le script:
```bash
build-android.bat
```

---

**Bonne chance avec ton prototype! 🚀**

Questions? Ouvre `START_HERE.md` et suis les étapes.
