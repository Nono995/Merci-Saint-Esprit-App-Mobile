# 🔧 Correction de l'erreur "useV2 already declared"

## ✅ Le fichier est déjà corrigé!

Le fichier `src/screens/PodcastScreen.js` utilise maintenant `useV3` et non `useV2`.
L'erreur vient du **cache Metro** qui utilise une ancienne version.

## 🚀 Solution rapide:

### Option 1 - Script automatique (RECOMMANDÉ):
Double-cliquez sur: **`fix-and-restart.bat`**

### Option 2 - Commande manuelle:
```bash
npx expo start --clear
```

### Option 3 - Nettoyage complet:
```bash
# Supprimer les caches
rmdir /s /q .expo
rmdir /s /q node_modules\.cache

# Redémarrer
npx expo start --clear
```

### Option 4 - Dans l'app Expo:
1. Secouez votre téléphone
2. Appuyez sur "Reload"
3. Si ça ne marche pas, fermez complètement l'app et relancez

## 📝 Ce qui a été corrigé:

**Avant (erreur):**
```javascript
const useV2 = true;
const [useV2, setUseV2] = useState(true); // ❌ Duplication
```

**Après (corrigé):**
```javascript
const useV3 = true; // ✅ Pas de duplication
```

## 🎨 Nouveau composant actif:

Le **PodcastCardV3** est maintenant configuré avec:
- Design glassmorphism ultra-moderne
- Hauteur agrandie à 220px
- Boutons plus grands et élégants
- Animations fluides
- Effets visuels premium

## ⚠️ Si l'erreur persiste:

1. **Fermez complètement** le terminal Expo
2. **Supprimez** les dossiers `.expo` et `node_modules\.cache`
3. **Redémarrez** avec `npx expo start --clear`
4. **Rechargez** l'app sur votre téléphone

---

**Le fichier est correct, il suffit de nettoyer le cache!** 🎉
