# Système d'En-tête et de Navigation Unifié

## Vue d'ensemble

Le système d'en-tête et de navigation a été complètement repensé pour offrir une expérience cohérente et professionnelle dans toute l'application.

## Composants d'En-tête

### Header
En-tête simple avec titre et sous-titre.

```jsx
import { Header } from '../components/Header';

<Header
  title="Titre Principal"
  subtitle="Sous-titre descriptif"
  backgroundGradient={[COLORS.primary, COLORS.secondary]}
  showBack={true}
  rightIcons={[
    {
      name: 'search',
      action: 'search', // ou onPress: () => customAction()
    }
  ]}
  navigation={navigation}
/>
```

### HeaderWithIcon
En-tête avec icône, titre et sous-titre.

```jsx
import { HeaderWithIcon } from '../components/Header';

<HeaderWithIcon
  icon="home"
  title="Accueil"
  subtitle="Bienvenue"
  backgroundGradient={[COLORS.primary, COLORS.secondary]}
  showBack={true}
  rightIcons={[
    {
      name: 'search',
      action: 'search',
    },
    {
      name: 'person-circle',
      size: 30,
      action: 'profile',
    }
  ]}
  navigation={navigation}
/>
```

## Système de Navigation

### NavigationHelper
Fonctions de navigation prédéfinies :

```jsx
import { NavigationHelper } from '../navigation';

// Navigation principale
NavigationHelper.goHome(navigation);
NavigationHelper.goToSearch(navigation);
NavigationHelper.goToProfile(navigation);

// Navigation contextuelle
NavigationHelper.goToVideoPlayer(navigation, post);
NavigationHelper.goToEventDetail(navigation, event);

// Actions spéciales
NavigationHelper.goBack(navigation);
NavigationHelper.resetToHome(navigation);
```

### ContentNavigation
Navigation intelligente basée sur le type de contenu :

```jsx
import { ContentNavigation } from '../navigation';

// Navigation par type de contenu
ContentNavigation.navigateToContent(navigation, item);

// Navigation par catégorie
ContentNavigation.navigateByCategory(navigation, 'événements');

// Actions rapides
ContentNavigation.quickActions.search(navigation);
```

### useAppNavigation Hook
Hook personnalisé pour une navigation typée :

```jsx
import { useAppNavigation } from '../navigation/NavigationHelper';

const { home, search, profile, back } = useAppNavigation(navigation);

// Utilisation
home(); // Navigation vers l'accueil
search(); // Navigation vers la recherche
back(); // Revenir en arrière
```

## Actions Prédéfinies

Les icônes peuvent utiliser des actions prédéfinies :

- `search` : Navigue vers l'écran de recherche
- `profile` : Navigue vers le profil
- `add` : Navigue vers l'ajout de contenu
- `home` : Navigue vers l'accueil

## Avantages du Nouveau Système

✅ **Cohérence visuelle** : Tous les en-têtes suivent le même design
✅ **Navigation standardisée** : Actions cohérentes dans toute l'app
✅ **Maintenance facilitée** : Un seul endroit pour modifier la navigation
✅ **Expérience utilisateur améliorée** : Transitions fluides et intuitives
✅ **Code plus propre** : Réduction du code dupliqué

## Exemple d'Utilisation

```jsx
import React from 'react';
import { HeaderWithIcon } from '../components/Header';
import { useAppNavigation } from '../navigation';

export default function MonEcran({ navigation }) {
  const { back, search } = useAppNavigation(navigation);

  return (
    <View>
      <HeaderWithIcon
        icon="heart"
        title="Prières"
        subtitle="Demandes de notre communauté"
        backgroundGradient={[COLORS.prayer, COLORS.prayer + '80']}
        showBack={true}
        rightIcons={[
          {
            name: 'search',
            action: 'search',
          },
          {
            name: 'add-circle',
            action: 'add',
          }
        ]}
        navigation={navigation}
      />

      {/* Contenu de l'écran */}
    </View>
  );
}
```

## Migration des Écrans Existants

Pour migrer un écran existant vers le nouveau système :

1. Importer les composants nécessaires
2. Remplacer l'ancien header par `Header` ou `HeaderWithIcon`
3. Ajouter `navigation={navigation}` comme prop
4. Remplacer les `onPress` par des `action` prédéfinies quand possible
5. Utiliser les helpers de navigation au lieu des `navigation.navigate()` directs
