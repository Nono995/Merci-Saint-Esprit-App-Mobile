# 🎯 Référence Rapide du Design

## Couleurs Essentielles

```javascript
// À utiliser partout
COLORS.primary        // #2563EB - Bleu principal
COLORS.text           // #171717 - Texte principal
COLORS.textSecondary  // #737373 - Texte secondaire
COLORS.background     // #FFFFFF - Fond blanc
COLORS.border         // #F0F0F0 - Bordures
```

## Card Standard

```javascript
{
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#F3F4F6',
  overflow: 'hidden',
  position: 'relative',
}
```

## Icône de Fond (Background Icon)

```javascript
// Container
{
  position: 'absolute',
  right: -20,
  top: '50%',
  marginTop: -40,
  opacity: 1,
}

// Icon
<Ionicons name="icon-name" size={80} color="#F9FAFB" />
// ou avec couleur thématique
<Ionicons name="icon-name" size={80} color={`${COLORS.primary}08`} />
```

## Header Standard

```javascript
{
  paddingTop: 60,
  paddingHorizontal: 20,
  paddingBottom: 20,
  backgroundColor: '#FFFFFF',
  borderBottomWidth: 1,
  borderBottomColor: '#F3F4F6',
}
```

## Bouton Principal

```javascript
{
  backgroundColor: COLORS.primary,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
}

// Texte
{
  fontSize: 15,
  fontWeight: '700',
  color: '#FFFFFF',
}
```

## Typographie Rapide

```javascript
// Titre principal
{ fontSize: 24, fontWeight: '700', color: COLORS.text }

// Titre secondaire
{ fontSize: 20, fontWeight: '600', color: COLORS.text }

// Corps de texte
{ fontSize: 14, fontWeight: '400', color: COLORS.textSecondary }

// Caption
{ fontSize: 11, fontWeight: '500', color: COLORS.textTertiary }
```

## Espacements Standards

```javascript
paddingHorizontal: 20  // Écrans
padding: 16            // Cards
marginBottom: 12       // Entre cards
gap: 12                // Entre éléments flex
```

## Icônes avec Background Coloré

```javascript
// Container
{
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: `${COLORS.primary}15`,
  alignItems: 'center',
  justifyContent: 'center',
}

// Icon
<Ionicons name="icon-name" size={24} color={COLORS.primary} />
```

## ScrollView Standard

```javascript
<ScrollView 
  showsVerticalScrollIndicator={false}
  style={{ flex: 1, backgroundColor: '#FFFFFF' }}
>
  {/* Contenu */}
</ScrollView>
```

## TouchableOpacity Standard

```javascript
<TouchableOpacity
  activeOpacity={0.7}
  onPress={handlePress}
  style={styles.button}
>
  {/* Contenu */}
</TouchableOpacity>
```

## Checklist Nouveau Composant

- [ ] Fond blanc (#FFFFFF)
- [ ] Bordure subtile (#F3F4F6)
- [ ] Border radius 16px
- [ ] Padding 16px
- [ ] Icône de fond décorative
- [ ] Couleurs du theme.js
- [ ] Typographie cohérente
- [ ] ActiveOpacity 0.7

## Imports Essentiels

```javascript
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
```

---

**Utiliser cette référence pour maintenir la cohérence du design !**
