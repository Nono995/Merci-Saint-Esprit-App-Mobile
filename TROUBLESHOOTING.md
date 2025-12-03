# 🔧 Guide de Dépannage - Design Futuriste

## Erreurs Courantes et Solutions

### ❌ Erreur: "Cannot read properties of undefined (reading 'map')"

**Cause**: Utilisation d'un ancien gradient qui n'existe plus dans le nouveau système.

**Solution**: Remplacer les anciens gradients par les nouveaux.

#### Anciens Gradients (❌ Ne plus utiliser)
```javascript
GRADIENTS.blueGradient      // ❌ Supprimé
GRADIENTS.violetGradient    // ❌ Supprimé
GRADIENTS.pinkPurple        // ❌ Supprimé
GRADIENTS.orangeRed         // ❌ Supprimé
GRADIENTS.greenTeal         // ❌ Supprimé
GRADIENTS.vibrant           // ❌ Supprimé
GRADIENTS.subtle            // ❌ Supprimé
```

#### Nouveaux Gradients (✅ À utiliser)
```javascript
GRADIENTS.primary           // ✅ Bleu → Violet
GRADIENTS.secondary         // ✅ Violet néon
GRADIENTS.tertiary          // ✅ Rose dégradé
GRADIENTS.quaternary        // ✅ Cyan tech
GRADIENTS.neonDream         // ✅ Multi-couleur
GRADIENTS.cyberpunk         // ✅ Cyberpunk
GRADIENTS.sunset            // ✅ Coucher de soleil
GRADIENTS.ocean             // ✅ Océan profond
GRADIENTS.aurora            // ✅ Aurore boréale
```

#### Tableau de Correspondance

| Ancien | Nouveau Recommandé |
|--------|-------------------|
| `blueGradient` | `GRADIENTS.primary` ou `GRADIENTS.ocean` |
| `violetGradient` | `GRADIENTS.secondary` ou `GRADIENTS.primary` |
| `pinkPurple` | `GRADIENTS.tertiary` ou `GRADIENTS.sunset` |
| `orangeRed` | `GRADIENTS.sunset` |
| `greenTeal` | `GRADIENTS.aurora` |
| `vibrant` | `GRADIENTS.neonDream` ou `GRADIENTS.cyberpunk` |
| `subtle` | `GRADIENTS.glass` ou `GRADIENTS.shimmer` |

---

### ❌ Erreur: Couleur non définie

**Cause**: Utilisation d'une ancienne constante de couleur.

**Solution**: Vérifier le fichier `src/constants/theme.js` pour les nouvelles constantes.

#### Exemple de Correction

**Avant:**
```javascript
backgroundColor: '#F8FAFC'  // ❌ Hardcodé
```

**Après:**
```javascript
import { COLORS } from '../constants/theme';
backgroundColor: COLORS.background  // ✅ Constante
```

---

### ❌ Erreur: LinearGradient ne s'affiche pas

**Cause**: Gradient mal configuré ou expo-linear-gradient non installé.

**Solutions:**

1. **Vérifier l'installation:**
```bash
npm install expo-linear-gradient
```

2. **Vérifier l'import:**
```javascript
import { LinearGradient } from 'expo-linear-gradient';
```

3. **Vérifier le format:**
```javascript
// ✅ Correct
<LinearGradient
  colors={GRADIENTS.primary}  // Doit être un tableau
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
  <Text>Contenu</Text>
</LinearGradient>

// ❌ Incorrect
<LinearGradient
  colors={GRADIENTS.nonExistent}  // undefined
>
  <Text>Contenu</Text>
</LinearGradient>
```

---

### ❌ Erreur: Ombres ne s'affichent pas sur Android

**Cause**: Android nécessite `elevation` en plus des propriétés shadow.

**Solution:**
```javascript
// ✅ Correct
import { SHADOWS } from '../constants/theme';

const styles = StyleSheet.create({
  card: {
    ...SHADOWS.md,  // Inclut déjà elevation
  },
});

// Ou manuellement:
const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,  // ✅ Important pour Android
  },
});
```

---

### ❌ Erreur: Composant non trouvé

**Cause**: Import incorrect du nouveau composant.

**Solution:**
```javascript
// ✅ Correct
import FuturisticCard from '../components/FuturisticCard';
import ModernButton from '../components/ModernButton';
import NeonHeader from '../components/NeonHeader';
import ContentCard from '../components/ContentCard';
import ActionCardModern from '../components/ActionCardModern';

// ❌ Incorrect
import { FuturisticCard } from '../components/FuturisticCard';  // Pas d'export nommé
```

---

### ❌ Erreur: Animations saccadées

**Cause**: `useNativeDriver` non activé ou trop d'animations simultanées.

**Solutions:**

1. **Activer useNativeDriver:**
```javascript
Animated.spring(scaleAnim, {
  toValue: 1,
  useNativeDriver: true,  // ✅ Important
  friction: 8,
}).start();
```

2. **Limiter les animations:**
```javascript
// Éviter trop d'animations en même temps
// Préférer les animations séquentielles
```

---

### ❌ Erreur: Texte illisible

**Cause**: Mauvais contraste de couleurs.

**Solution:**
```javascript
// ✅ Sur fond sombre
<View style={{ backgroundColor: COLORS.background }}>
  <Text style={{ color: COLORS.text }}>Texte lisible</Text>
</View>

// ✅ Sur fond clair
<View style={{ backgroundColor: COLORS.surfaceLight }}>
  <Text style={{ color: COLORS.textInverse }}>Texte lisible</Text>
</View>

// ❌ Mauvais contraste
<View style={{ backgroundColor: COLORS.background }}>
  <Text style={{ color: COLORS.textMuted }}>Texte peu lisible</Text>
</View>
```

---

### ❌ Erreur: Border radius trop petit

**Cause**: Utilisation d'anciennes valeurs.

**Solution:**
```javascript
import { BORDER_RADIUS } from '../constants/theme';

// ✅ Nouveau design (plus arrondi)
const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.base,  // 16px
  },
  button: {
    borderRadius: BORDER_RADIUS.lg,    // 20px
  },
});

// ❌ Ancien design (trop carré)
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,  // Trop petit
  },
});
```

---

## 🔍 Vérifications Rapides

### Checklist de Débogage

1. **Imports:**
   - [ ] Tous les imports sont corrects
   - [ ] Les constantes sont importées depuis `theme.js`
   - [ ] Les composants sont importés correctement

2. **Gradients:**
   - [ ] Utilisation des nouveaux gradients uniquement
   - [ ] Format correct (tableau de couleurs)
   - [ ] `start` et `end` définis

3. **Couleurs:**
   - [ ] Utilisation des constantes COLORS
   - [ ] Pas de couleurs hardcodées
   - [ ] Bon contraste texte/fond

4. **Composants:**
   - [ ] Props correctement passées
   - [ ] Styles appliqués
   - [ ] Animations configurées

---

## 🛠️ Outils de Débogage

### Console Logs Utiles

```javascript
// Vérifier un gradient
console.log('Gradient:', GRADIENTS.primary);
// Devrait afficher: ['#5B8DEF', '#9D4EDD']

// Vérifier une couleur
console.log('Color:', COLORS.primary);
// Devrait afficher: '#5B8DEF'

// Vérifier les props d'un composant
console.log('Props:', { gradient, neonBorder, shadow });
```

### React DevTools

1. Installer React DevTools
2. Inspecter les composants
3. Vérifier les props et state
4. Analyser les performances

---

## 📞 Support

### Ressources

1. **Documentation:**
   - `FUTURISTIC_DESIGN_SYSTEM.md`
   - `MIGRATION_GUIDE.md`
   - `COLOR_PALETTE_DEMO.md`

2. **Exemples:**
   - `src/screens/ExampleFuturisticScreen.js`
   - `src/screens/HomeScreen.js`

3. **Composants:**
   - Tous documentés avec JSDoc
   - Props clairement définies

### Étapes de Résolution

1. **Lire le message d'erreur** complet
2. **Vérifier les imports** et constantes
3. **Consulter la documentation** correspondante
4. **Tester avec un exemple** simple
5. **Comparer avec un écran** fonctionnel

---

## ✅ Problèmes Résolus

### ✅ LinearGradient undefined
- **Résolu**: Remplacement de `GRADIENTS.violetGradient` par `GRADIENTS.primary`
- **Fichiers**: `HomeScreen.js`, `AnnouncementsScreen.js`

### ✅ Couleurs incorrectes
- **Résolu**: Nouvelle palette de couleurs définie
- **Fichier**: `src/constants/theme.js`

### ✅ Composants manquants
- **Résolu**: 5 nouveaux composants créés
- **Dossier**: `src/components/`

---

## 🎯 Prévention

### Best Practices

1. **Toujours utiliser les constantes** du theme
2. **Vérifier les gradients** avant utilisation
3. **Tester sur plusieurs appareils**
4. **Consulter la documentation** en cas de doute
5. **Garder le code à jour** avec les dernières versions

### Code Review Checklist

- [ ] Pas de couleurs hardcodées
- [ ] Gradients valides utilisés
- [ ] Imports corrects
- [ ] Props validées
- [ ] Styles cohérents
- [ ] Animations fluides
- [ ] Accessibilité respectée

---

**Dernière mise à jour**: Décembre 2024
**Version**: 2.0.0
