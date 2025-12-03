# 🔄 Guide de Migration - Design Futuriste

## Vue d'ensemble

Ce guide vous aide à migrer vos écrans existants vers le nouveau design system futuriste.

---

## 📋 Checklist Rapide

- [ ] Remplacer les couleurs hardcodées par les constantes
- [ ] Utiliser les nouveaux composants
- [ ] Mettre à jour les backgrounds
- [ ] Ajouter les gradients
- [ ] Ajuster les border radius
- [ ] Mettre à jour les ombres
- [ ] Tester sur différents appareils

---

## 🎨 Migration des Couleurs

### Étape 1: Import des Constantes

**Avant:**
```javascript
// Couleurs hardcodées
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
  },
  text: {
    color: '#0F172A',
  },
});
```

**Après:**
```javascript
import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.text,
  },
});
```

### Étape 2: Tableau de Correspondance

| Ancienne Couleur | Nouvelle Constante | Nouvelle Valeur |
|------------------|-------------------|-----------------|
| `#6366F1` | `COLORS.primary` | `#5B8DEF` |
| `#8B5CF6` | `COLORS.secondary` | `#9D4EDD` |
| `#EC4899` | `COLORS.tertiary` | `#FF6B9D` |
| `#F8FAFC` | `COLORS.background` | `#0A0E27` |
| `#FFFFFF` | `COLORS.surface` | `#1A2238` |
| `#0F172A` | `COLORS.text` | `#FFFFFF` |
| `#64748B` | `COLORS.textSecondary` | `#B8C5D6` |

---

## 🧩 Migration des Composants

### Cartes

**Avant:**
```jsx
<View style={styles.card}>
  <Text>Contenu</Text>
</View>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
});
```

**Après:**
```jsx
import FuturisticCard from '../components/FuturisticCard';
import { GRADIENTS } from '../constants/theme';

<FuturisticCard
  gradient={GRADIENTS.primary}
  neonBorder={true}
  shadow="md"
>
  <Text>Contenu</Text>
</FuturisticCard>
```

### Boutons

**Avant:**
```jsx
<TouchableOpacity style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>Cliquer</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6366F1',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
```

**Après:**
```jsx
import ModernButton from '../components/ModernButton';
import { GRADIENTS } from '../constants/theme';

<ModernButton
  title="Cliquer"
  gradient={GRADIENTS.primary}
  icon="arrow-forward"
  onPress={handlePress}
/>
```

### Headers

**Avant:**
```jsx
<View style={styles.header}>
  <Text style={styles.title}>Titre</Text>
  <TouchableOpacity onPress={goBack}>
    <Ionicons name="arrow-back" size={24} />
  </TouchableOpacity>
</View>
```

**Après:**
```jsx
import NeonHeader from '../components/NeonHeader';

<NeonHeader
  title="Titre"
  showBack={true}
  onBackPress={goBack}
  glowColor={COLORS.primary}
/>
```

---

## 🌈 Migration des Gradients

### LinearGradient

**Avant:**
```jsx
<LinearGradient
  colors={['#6366F1', '#8B5CF6']}
  style={styles.gradient}
>
  <Text>Contenu</Text>
</LinearGradient>
```

**Après:**
```jsx
import { GRADIENTS } from '../constants/theme';

<LinearGradient
  colors={GRADIENTS.primary}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.gradient}
>
  <Text>Contenu</Text>
</LinearGradient>
```

### Gradients Disponibles

```javascript
GRADIENTS.primary      // Bleu → Violet
GRADIENTS.neonDream    // Multi-couleur
GRADIENTS.cyberpunk    // Cyberpunk
GRADIENTS.sunset       // Coucher de soleil
GRADIENTS.ocean        // Océan
GRADIENTS.aurora       // Aurore boréale
```

---

## 📐 Migration des Espacements

**Avant:**
```javascript
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 20,
  },
});
```

**Après:**
```javascript
import { SPACING } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.base,
    marginBottom: SPACING.lg,
  },
});
```

### Tableau de Correspondance

| Ancienne Valeur | Nouvelle Constante |
|-----------------|-------------------|
| `4px` | `SPACING.xs` |
| `8px` | `SPACING.sm` |
| `12px` | `SPACING.md` |
| `16px` | `SPACING.base` |
| `20px` | `SPACING.lg` |
| `24px` | `SPACING.xl` |

---

## 🔲 Migration des Border Radius

**Avant:**
```javascript
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  button: {
    borderRadius: 8,
  },
});
```

**Après:**
```javascript
import { BORDER_RADIUS } from '../constants/theme';

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
  },
  button: {
    borderRadius: BORDER_RADIUS.base,
  },
});
```

---

## 🌟 Migration des Ombres

**Avant:**
```javascript
const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
```

**Après:**
```javascript
import { SHADOWS } from '../constants/theme';

const styles = StyleSheet.create({
  card: {
    ...SHADOWS.md,
  },
});
```

### Ombres Néon

Pour les éléments importants, utilisez les ombres néon :

```javascript
const styles = StyleSheet.create({
  importantCard: {
    ...SHADOWS.neonBlue,
  },
});
```

---

## 📱 Exemple Complet de Migration

### Avant

```jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Écran</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Titre</Text>
        <Text style={styles.cardText}>Description</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Action</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#6366F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  cardText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#6366F1',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default MyScreen;
```

### Après

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import NeonHeader from '../components/NeonHeader';
import FuturisticCard from '../components/FuturisticCard';
import ModernButton from '../components/ModernButton';

const MyScreen = () => {
  return (
    <View style={styles.container}>
      <NeonHeader
        title="Mon Écran"
        glowColor={COLORS.primary}
      />
      
      <View style={styles.content}>
        <FuturisticCard
          gradient={GRADIENTS.primary}
          neonBorder={true}
          shadow="lg"
        >
          <Text style={styles.cardTitle}>Titre</Text>
          <Text style={styles.cardText}>Description</Text>
          
          <ModernButton
            title="Action"
            gradient={GRADIENTS.primary}
            icon="arrow-forward"
            onPress={() => {}}
            style={styles.button}
          />
        </FuturisticCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  cardText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  button: {
    marginTop: SPACING.base,
  },
});

export default MyScreen;
```

---

## 🎯 Priorités de Migration

### Priorité 1 (Critique)
1. HomeScreen ✅
2. Navigation (Tab Bar) ✅
3. Écrans principaux (Vidéos, Podcasts, Témoignages)

### Priorité 2 (Important)
4. Écrans de détail (VideoPlayer, etc.)
5. Écrans de formulaire (Auth, Donation)
6. Profil utilisateur

### Priorité 3 (Optionnel)
7. Écrans secondaires
8. Modales et popups
9. Composants réutilisables

---

## 🧪 Tests

Après chaque migration, testez :

1. **Affichage**: Vérifiez que tout s'affiche correctement
2. **Interactions**: Testez les boutons et animations
3. **Performance**: Vérifiez la fluidité
4. **Accessibilité**: Vérifiez le contraste des textes
5. **Responsive**: Testez sur différentes tailles d'écran

---

## 💡 Conseils

1. **Migrez écran par écran** pour éviter les erreurs
2. **Testez fréquemment** après chaque changement
3. **Utilisez les composants** plutôt que de recréer
4. **Respectez les constantes** pour la cohérence
5. **Demandez de l'aide** si nécessaire

---

## 🆘 Problèmes Courants

### Problème: Les couleurs ne s'affichent pas
**Solution**: Vérifiez l'import des constantes
```javascript
import { COLORS } from '../constants/theme';
```

### Problème: Les gradients ne fonctionnent pas
**Solution**: Vérifiez que expo-linear-gradient est installé
```bash
npm install expo-linear-gradient
```

### Problème: Les ombres ne s'affichent pas sur Android
**Solution**: Utilisez l'elevation en plus
```javascript
{
  ...SHADOWS.md,
  elevation: 5,
}
```

---

## 📚 Ressources

- `FUTURISTIC_DESIGN_SYSTEM.md` - Documentation complète
- `COLOR_PALETTE_DEMO.md` - Guide des couleurs
- `ExampleFuturisticScreen.js` - Exemple complet
- `NOUVEAU_DESIGN_README.md` - Guide de démarrage

---

**Bonne migration ! 🚀**
