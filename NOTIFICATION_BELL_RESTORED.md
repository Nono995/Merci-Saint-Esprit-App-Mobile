# ✅ Cloche de Notification Restaurée

## 🔔 Ce qui a été fait

### 1. **Cloche de notification en haut du HomeScreen**
- ✅ Remplacé l'icône de Bible par une cloche de notification
- ✅ Badge avec compteur de notifications non lues
- ✅ Navigation vers l'écran Notifications au clic
- ✅ Design moderne avec ombre et bordure

### 2. **Icône Bible conservée dans le Tab**
- ✅ L'icône de Bible reste dans la barre de navigation en bas
- ✅ Accès rapide à la Bible depuis n'importe quel écran
- ✅ Tab actif/inactif avec icônes remplies/outline

## 📱 Interface Utilisateur

### Header HomeScreen:
```
┌─────────────────────────────────────┐
│  Bonjour 👋              [🔔 3]     │
│  Que souhaitez-vous...              │
│  ┌──────────────────────────────┐   │
│  │ 🔍 Rechercher des contenus...│   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Bottom Tab Navigation:
```
┌─────────────────────────────────────┐
│  🏠      ▶️      📖      ❤️      👤  │
│ Accueil Vidéos  Bible  Témoig. Profil│
└─────────────────────────────────────┘
```

## 🎨 Design de la Cloche

### Bouton de notification:
- **Taille**: 48x48 px
- **Forme**: Carré arrondi (14px radius)
- **Fond**: Blanc (#FFFFFF)
- **Bordure**: Gris clair (#E5E7EB)
- **Ombre**: Légère ombre portée
- **Icône**: `notifications-outline` (22px)

### Badge de compteur:
- **Position**: Coin supérieur droit
- **Couleur**: Rouge (#EF4444)
- **Texte**: Blanc, gras
- **Bordure**: Blanc 2px (pour contraste)
- **Affichage**: 
  - 1-99: Nombre exact
  - 100+: "99+"

## 🔧 Fonctionnalités

### 1. **Compteur en temps réel**
```javascript
const { unreadCount = 0 } = useNotifications();
```
- Écoute Firebase en temps réel
- Met à jour automatiquement le badge
- Filtre uniquement les notifications envoyées (`sent: true`)
- Compte uniquement les non lues (`read: false`)

### 2. **Navigation**
```javascript
onPress={() => navigation.navigate('Notifications')}
```
- Clic sur la cloche → Écran Notifications
- L'utilisateur peut voir toutes ses notifications
- Marquer comme lu réduit le compteur

### 3. **Gestion d'erreurs**
- Si Firebase échoue, `unreadCount = 0`
- Pas de crash, affichage gracieux
- Console log des erreurs pour debug

## 📂 Fichiers Modifiés

### `src/screens/HomeScreen.js`
```javascript
// Avant:
<TouchableOpacity onPress={() => navigation.navigate('Bible')}>
  <Ionicons name="book-outline" size={22} />
</TouchableOpacity>

// Après:
<TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
  {unreadCount > 0 && (
    <View style={styles.notificationBadge}>
      <Text>{unreadCount > 99 ? '99+' : `${unreadCount}`}</Text>
    </View>
  )}
  <Ionicons name="notifications-outline" size={22} />
</TouchableOpacity>
```

### `App.js` (Inchangé)
- Tab "Bible" conservé avec icône `book`/`book-outline`
- Navigation fonctionnelle

### `src/contexts/NotificationContext.js` (Inchangé)
- Fournit `unreadCount` et `notifications`
- Écoute Firebase en temps réel
- Gestion d'erreurs intégrée

## 🎯 Résultat

### Avant:
- ❌ Icône Bible en haut du HomeScreen
- ❌ Pas de cloche de notification visible
- ✅ Bible accessible via le tab

### Après:
- ✅ Cloche de notification en haut du HomeScreen
- ✅ Badge avec compteur de notifications non lues
- ✅ Bible accessible via le tab en bas
- ✅ Navigation vers Notifications fonctionnelle

## 🧪 Pour Tester

1. **Redémarre l'app:**
   ```bash
   npx expo start --clear
   ```

2. **Vérifie la cloche:**
   - Ouvre le HomeScreen
   - Regarde en haut à droite → Cloche de notification
   - Si tu as des notifications non lues → Badge rouge avec nombre

3. **Teste la navigation:**
   - Clique sur la cloche → Écran Notifications
   - Clique sur le tab Bible en bas → Écran Bible

4. **Teste le compteur:**
   - Envoie une notification depuis l'admin
   - Le badge devrait apparaître automatiquement
   - Marque comme lu → Le badge devrait diminuer

## 📊 Styles CSS

```javascript
notificationBtn: {
  position: 'relative',
  width: 48,
  height: 48,
  borderRadius: 14,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.04,
  shadowRadius: 6,
  elevation: 2,
},
notificationBadge: {
  position: 'absolute',
  top: 6,
  right: 6,
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: '#EF4444',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 4,
  borderWidth: 2,
  borderColor: '#FFFFFF',
  zIndex: 1,
},
notificationBadgeText: {
  fontSize: 10,
  fontWeight: '700',
  color: '#FFFFFF',
}
```

🎉 **La cloche de notification est maintenant restaurée avec toutes ses fonctionnalités!**
