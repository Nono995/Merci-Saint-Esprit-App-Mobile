# 🎨 Guide du Design Minimaliste & Professionnel

## Vue d'ensemble

Design épuré, simple et professionnel avec fond blanc, couleurs subtiles et interface claire.

---

## 🎯 Principes de Design

### 1. Minimalisme
- Fond blanc pur (#FFFFFF)
- Couleurs subtiles et discrètes
- Espaces blancs généreux
- Hiérarchie visuelle claire

### 2. Professionnalisme
- Typographie sobre
- Ombres légères
- Bordures fines
- Animations douces

### 3. Clarté
- Contraste optimal
- Lisibilité maximale
- Navigation intuitive
- Feedback visuel clair

---

## 🎨 Palette de Couleurs

### Couleur Principale
```
Primary: #2563EB (Bleu professionnel)
```
Utilisée pour les actions principales, liens et éléments interactifs.

### Couleurs d'Accent
```
Success: #10B981 (Vert)
Warning: #F59E0B (Orange)
Error: #EF4444 (Rouge)
Info: #8B5CF6 (Violet)
```
Utilisées avec parcimonie pour les états et catégories.

### Backgrounds
```
Background: #FFFFFF (Blanc pur)
Surface: #FFFFFF (Blanc)
Gray 50: #FAFAFA (Gris très clair)
Gray 100: #F5F5F5 (Gris clair)
```

### Textes
```
Text: #171717 (Noir doux)
Text Secondary: #737373 (Gris moyen)
Text Tertiary: #A3A3A3 (Gris clair)
```

### Bordures
```
Border: #F0F0F0 (Ultra-subtile)
Border Medium: #E5E5E5 (Subtile)
```

---

## 📐 Espacements

Système cohérent basé sur 4px :

```
xs: 4px
sm: 8px
md: 12px
base: 16px (Standard)
lg: 20px
xl: 24px
xxl: 32px
```

---

## 🔲 Border Radius

Coins arrondis modérés :

```
xs: 6px
sm: 10px
md: 14px
base: 16px (Standard)
lg: 20px
xl: 24px
```

---

## 🌫️ Ombres

Ombres très subtiles :

```javascript
xs: shadowOpacity: 0.05
sm: shadowOpacity: 0.08
md: shadowOpacity: 0.10
lg: shadowOpacity: 0.12
```

Toutes les ombres utilisent une couleur noire (#0F172A) avec une opacité très faible.

---

## 🧩 Composants

### 1. ModernCard
Carte minimaliste avec icône et texte.

**Caractéristiques:**
- Background coloré très clair (6% d'opacité)
- Icône dans un conteneur coloré
- Texte sobre et lisible
- Ombre subtile

**Exemple:**
```jsx
<ModernCard
  icon="play-circle"
  title="Vidéos"
  subtitle="Découvrir"
  backgroundColor="rgba(37, 99, 235, 0.06)"
  iconColor="#2563EB"
  onPress={() => {}}
/>
```

### 2. CleanHeader
Header épuré avec salutation.

**Caractéristiques:**
- Fond blanc
- Texte noir sobre
- Bouton notification discret
- Pas de gradient

**Exemple:**
```jsx
<CleanHeader
  greeting="Bonjour 👋"
  subtitle="Que souhaitez-vous découvrir ?"
  onNotificationPress={() => {}}
  hasNotifications={true}
/>
```

### 3. SearchBar
Barre de recherche minimaliste.

**Caractéristiques:**
- Fond gris très clair
- Icône subtile
- Placeholder discret
- Bouton filtre optionnel

**Exemple:**
```jsx
<SearchBar
  placeholder="Rechercher..."
  value={searchText}
  onChangeText={setSearchText}
  onFilterPress={() => {}}
/>
```

---

## 📱 Écrans

### HomeScreen

**Structure:**
1. **Header**
   - Salutation personnalisée
   - Bouton notification
   - Barre de recherche

2. **Catégories**
   - Grille 2 colonnes
   - Cartes colorées subtiles
   - Icônes dans conteneurs colorés

3. **Contenu**
   - Liste de cartes
   - Ombres légères
   - Bordures fines

**Couleurs:**
- Fond: Blanc (#FFFFFF)
- Cartes: Blanc avec bordure
- Accents: Couleurs subtiles (6% opacité)

---

## 🎨 Catégories de Couleurs

Chaque catégorie a une couleur subtile :

| Catégorie | Couleur | Background |
|-----------|---------|------------|
| Vidéos | #2563EB (Bleu) | rgba(37, 99, 235, 0.06) |
| Podcasts | #8B5CF6 (Violet) | rgba(139, 92, 246, 0.06) |
| Témoignages | #EF4444 (Rouge) | rgba(239, 68, 68, 0.06) |
| Événements | #F59E0B (Orange) | rgba(245, 158, 11, 0.06) |
| Bible | #10B981 (Vert) | rgba(16, 185, 129, 0.06) |

---

## 📏 Typographie

### Tailles
```
xs: 11px
sm: 12px
base: 14px
md: 16px
lg: 18px
xl: 20px
xxl: 24px
```

### Poids
```
normal: 400
medium: 500
semibold: 600
bold: 700
extrabold: 800
```

### Hiérarchie
- **Titres principaux**: 24px, Bold
- **Titres sections**: 18px, Bold
- **Texte principal**: 16px, Normal
- **Texte secondaire**: 14px, Normal
- **Captions**: 12px, Normal

---

## 🎯 Navigation

### Tab Bar

**Style:**
- Fond blanc (#FFFFFF)
- Bordure supérieure subtile (#F0F0F0)
- Icônes actives: Bleu (#2563EB)
- Icônes inactives: Gris (#A3A3A3)
- Hauteur: 60px
- Ombre très légère

---

## ✨ Animations

### Interactions
Toutes les interactions utilisent des animations douces :

```javascript
// Press
scale: 1 → 0.96 → 1
duration: ~200ms
friction: 8
```

### Transitions
- Fade in/out
- Slide up/down
- Scale légèrement

---

## 🎨 Gradients

Les gradients sont utilisés très rarement et de manière subtile :

```javascript
// Exemple: Gradient ultra-subtil
['#FFFFFF', '#FAFAFA']
['#EFF6FF', '#DBEAFE']
```

**Règle:** Préférer les couleurs plates aux gradients.

---

## 📋 Checklist de Design

### Pour chaque écran :
- [ ] Fond blanc (#FFFFFF)
- [ ] Textes noirs/gris (#171717, #737373)
- [ ] Ombres subtiles (opacité < 0.12)
- [ ] Bordures fines (#F0F0F0)
- [ ] Espacements généreux
- [ ] Couleurs d'accent discrètes
- [ ] Animations douces
- [ ] Contraste optimal (WCAG AA)

---

## 🚫 À Éviter

### ❌ Ne pas faire :
- Gradients colorés vifs
- Backgrounds sombres
- Couleurs saturées
- Ombres fortes
- Effets néon
- Trop de couleurs
- Animations brusques
- Texte sur fond coloré

### ✅ À faire :
- Fond blanc
- Couleurs subtiles
- Ombres légères
- Bordures fines
- Espaces blancs
- Hiérarchie claire
- Animations douces
- Contraste élevé

---

## 💡 Exemples d'Utilisation

### Carte de Catégorie
```jsx
<View style={{
  backgroundColor: 'rgba(37, 99, 235, 0.06)',
  padding: 16,
  borderRadius: 20,
}}>
  <View style={{
    width: 44,
    height: 44,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Ionicons name="play-circle" size={24} color="#FFFFFF" />
  </View>
  <Text style={{
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginTop: 12,
  }}>
    Vidéos
  </Text>
  <Text style={{
    fontSize: 12,
    color: '#737373',
  }}>
    Découvrir
  </Text>
</View>
```

### Bouton Principal
```jsx
<TouchableOpacity style={{
  backgroundColor: '#2563EB',
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
}}>
  <Text style={{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }}>
    Continuer
  </Text>
</TouchableOpacity>
```

### Carte de Contenu
```jsx
<View style={{
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#F0F0F0',
  padding: 16,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 8,
}}>
  <Text style={{
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  }}>
    Titre
  </Text>
  <Text style={{
    fontSize: 14,
    color: '#737373',
    marginTop: 8,
  }}>
    Description
  </Text>
</View>
```

---

## 🎯 Résumé

### En 3 mots :
**Simple. Propre. Professionnel.**

### Caractéristiques clés :
1. Fond blanc pur
2. Couleurs subtiles (6% opacité)
3. Ombres légères (< 0.12)
4. Bordures fines
5. Typographie sobre
6. Espacements généreux
7. Animations douces

---

**Version**: 3.0.0 - Design Minimaliste
**Date**: Décembre 2024
**Style**: Minimaliste & Professionnel
