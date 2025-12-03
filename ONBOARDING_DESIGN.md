# 🎨 Design d'Onboarding Moderne

## Vue d'ensemble

L'écran d'onboarding a été complètement redesigné avec un style minimaliste et professionnel qui s'aligne parfaitement avec le reste de l'application.

## Structure des Slides

### 4 Slides au Total

#### Slide 1 : Logo Animé
- **Type** : Présentation du logo
- **Contenu** :
  - Logo principal avec animation de rotation et scale
  - Titre : "Merci Saint-Esprit"
  - Sous-titre : "Votre communauté spirituelle"
  - Cercles décoratifs en arrière-plan avec couleurs subtiles
- **Animation** :
  - Apparition en fondu (fade in)
  - Rotation 360° du logo
  - Scale de 0.5 à 1
  - Durée : 1 seconde

#### Slide 2 : Contenus Spirituels
- **Icône** : `videocam`
- **Titre** : "Contenus Spirituels"
- **Description** : "Accédez à des vidéos, podcasts et enseignements inspirants pour nourrir votre foi au quotidien"
- **Couleur** : Bleu primaire (#2563EB)

#### Slide 3 : Événements & Prières
- **Icône** : `calendar`
- **Titre** : "Événements & Prières"
- **Description** : "Participez aux événements de la communauté et partagez vos intentions de prière"
- **Couleur** : Orange tertiaire (#F59E0B)

#### Slide 4 : Témoignages
- **Icône** : `heart`
- **Titre** : "Témoignages"
- **Description** : "Découvrez et partagez des témoignages authentiques qui inspirent et fortifient la foi"
- **Couleur** : Bleu primaire (#2563EB)

## Design System

### Couleurs
- **Fond** : Blanc pur (#FFFFFF)
- **Texte principal** : #171717
- **Texte secondaire** : #737373
- **Accent** : #2563EB (bleu primaire)
- **Bordures** : #F3F4F6

### Typographie
- **Titre logo** : 32px, Bold (700)
- **Sous-titre logo** : 16px, Medium (500)
- **Titre slide** : 28px, Bold (700)
- **Description slide** : 16px, Regular (400)
- **Bouton** : 16px, Bold (700)

### Espacements
- **Padding horizontal** : 40px
- **Padding vertical** : 80px (slides de contenu)
- **Margin bottom icône** : 60px
- **Margin bottom titre** : 16px

### Éléments Visuels

#### Icônes
- **Taille principale** : 48px
- **Taille background** : 100px (très subtile)
- **Container** : 120px × 120px, border-radius 60px
- **Background** : Couleur primaire à 15% d'opacité
- **Bordure** : 1px, #F3F4F6

#### Cercles Décoratifs (Slide Logo)
- **Cercle 1** : 300px, couleur primaire à 8% d'opacité
- **Cercle 2** : 200px, couleur secondaire à 8% d'opacité
- **Cercle 3** : 150px, couleur tertiaire à 8% d'opacité

#### Pagination
- **Hauteur** : 8px
- **Border-radius** : 4px
- **Couleur** : Bleu primaire (#2563EB)
- **Largeur active** : 30px (animée)
- **Largeur inactive** : 10px
- **Opacité inactive** : 0.3

#### Bouton Principal
- **Background** : #2563EB
- **Border-radius** : 30px
- **Padding** : 16px vertical, 40px horizontal
- **Largeur minimale** : 200px
- **Texte** : Blanc (#FFFFFF)
- **Icône** : arrow-forward (20px)

#### Bouton Skip
- **Background** : #F3F4F6
- **Border-radius** : 20px
- **Padding** : 10px vertical, 20px horizontal
- **Position** : Top right (60px, 20px)
- **Visible** : Seulement après le slide 1

## Animations

### Logo (Slide 1)
```javascript
Animated.parallel([
  Animated.spring(logoScale, {
    toValue: 1,
    tension: 20,
    friction: 7,
  }),
  Animated.timing(logoOpacity, {
    toValue: 1,
    duration: 800,
  }),
  Animated.timing(logoRotate, {
    toValue: 1,
    duration: 1000,
  }),
])
```

### Slides de Contenu
```javascript
const scale = scrollX.interpolate({
  inputRange: [(index - 1) * width, index * width, (index + 1) * width],
  outputRange: [0.9, 1, 0.9],
  extrapolate: 'clamp'
});

const opacity = scrollX.interpolate({
  inputRange: [(index - 1) * width, index * width, (index + 1) * width],
  outputRange: [0.5, 1, 0.5],
  extrapolate: 'clamp'
});
```

### Pagination
```javascript
const dotWidth = scrollX.interpolate({
  inputRange: [(i - 1) * width, i * width, (i + 1) * width],
  outputRange: [10, 30, 10],
  extrapolate: 'clamp'
});
```

## Navigation

### Flux Utilisateur
1. **Slide 1** : Logo animé → Bouton "Suivant"
2. **Slide 2** : Contenus → Bouton "Suivant" ou "Passer"
3. **Slide 3** : Événements → Bouton "Suivant" ou "Passer"
4. **Slide 4** : Témoignages → Bouton "Commencer"

### Actions
- **Suivant** : Passe au slide suivant
- **Passer** : Va directement à l'écran Auth
- **Commencer** : Va à l'écran Auth (dernier slide)

## Cohérence avec l'App

### Alignement Design
- ✅ Fond blanc uniforme
- ✅ Couleurs du theme.js
- ✅ Typographie cohérente
- ✅ Bordures subtiles
- ✅ Icônes Ionicons
- ✅ Animations fluides
- ✅ Espacements standardisés

### Éléments Réutilisés
- Palette de couleurs COLORS
- Icônes avec background subtil
- Style de boutons modernes
- Pagination minimaliste

## Fichier Source

**Chemin** : `src/screens/OnboardingScreen.js`

## Intégration

L'écran d'onboarding est le premier écran de l'application dans la navigation :

```javascript
<Stack.Navigator>
  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  <Stack.Screen name="Auth" component={AuthScreen} />
  <Stack.Screen name="MainTabs" component={MainTabs} />
  ...
</Stack.Navigator>
```

## Responsive

- Adapté à toutes les tailles d'écran
- Utilise `Dimensions.get('window')`
- Scroll horizontal avec pagination
- Animations fluides sur tous les appareils

## Accessibilité

- Textes lisibles avec bon contraste
- Boutons avec zones tactiles suffisantes (min 44px)
- Navigation claire et intuitive
- Animations non bloquantes

---

**Statut** : ✅ Prêt pour production
**Dernière mise à jour** : Décembre 2024
