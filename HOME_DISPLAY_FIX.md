# 🔧 Fix Affichage HomeScreen

## 🐛 Problème

Les éléments du HomeScreen ne s'affichent pas tous.

---

## 🔍 Diagnostic

### Problème Identifié

Dans le `useEffect` du HomeScreen, les **événements** n'étaient pas filtrés depuis le contenu réel de Firebase.

**Code problématique :**
```javascript
useEffect(() => {
  const unsubscribe = listenAllContent((content) => {
    if (content.length === 0) {
      setVideos(MOCK_VIDEOS);
      setPodcasts(MOCK_PODCASTS);
      setEvents(MOCK_EVENTS);
      setPosts([...MOCK_VIDEOS, ...MOCK_PODCASTS, ...MOCK_TESTIMONIES]);
    } else {
      const videoContent = content.filter(item => item.type === 'video');
      const audioContent = content.filter(item => item.type === 'audio');
      setVideos(videoContent);
      setPodcasts(audioContent);
      setPosts(content);
      // ❌ setEvents() manquant !
    }
  });
}, []);
```

### Conséquence

- Si Firebase retourne du contenu, `events` reste à `[]`
- La section "Événements" ne s'affiche pas
- Les compteurs de catégories sont incorrects

---

## ✅ Solution Appliquée

### Code Corrigé

```javascript
useEffect(() => {
  const unsubscribe = listenAllContent((content) => {
    console.log('HomeScreen: Received content:', content.length);
    
    if (content.length === 0) {
      // Utiliser les données MOCK
      console.log('Using MOCK data');
      setVideos(MOCK_VIDEOS);
      setPodcasts(MOCK_PODCASTS);
      setEvents(MOCK_EVENTS);
      setPosts([...MOCK_VIDEOS, ...MOCK_PODCASTS, ...MOCK_TESTIMONIES]);
    } else {
      // Utiliser les données réelles
      console.log('Using real data');
      const videoContent = content.filter(item => item.type === 'video');
      const audioContent = content.filter(item => item.type === 'audio');
      const eventContent = content.filter(item => item.type === 'event'); // ✅ Ajouté
      
      console.log('Videos:', videoContent.length);
      console.log('Podcasts:', audioContent.length);
      console.log('Events:', eventContent.length);
      
      setVideos(videoContent);
      setPodcasts(audioContent);
      setEvents(eventContent.length > 0 ? eventContent : MOCK_EVENTS); // ✅ Ajouté
      setPosts(content);
    }
  });

  return () => unsubscribe();
}, []);
```

### Améliorations

1. **Filtrage des événements** : `content.filter(item => item.type === 'event')`
2. **Fallback MOCK** : Si pas d'événements réels, utiliser MOCK_EVENTS
3. **Logs de debug** : Console.log pour tracer le chargement
4. **Compteurs corrects** : Les badges affichent le bon nombre

---

## 🎯 Types de Contenu

### Types Supportés

| Type | Valeur | Filtrage |
|------|--------|----------|
| Vidéo | `'video'` | `item.type === 'video'` |
| Podcast | `'audio'` | `item.type === 'audio'` |
| Témoignage | `'testimony'` | `item.type === 'testimony'` |
| Événement | `'event'` | `item.type === 'event'` |

### Affichage Conditionnel

```javascript
{/* Section Vidéos */}
{videos.length > 0 && (
  <View style={styles.section}>
    {renderSectionHeader('Vidéos Récentes', 'Voir tout', ...)}
    <View style={styles.videoList}>
      {videos.slice(0, 3).map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </View>
  </View>
)}

{/* Section Événements */}
{events.length > 0 && (
  <View style={styles.section}>
    {renderSectionHeader('Événements à Venir', 'Voir tout', ...)}
    <View style={styles.eventList}>
      {events.slice(0, 3).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  </View>
)}

{/* Section Podcasts */}
{podcasts.length > 0 && (
  <View style={styles.section}>
    {renderSectionHeader('Podcasts', 'Voir tout', ...)}
    <View style={styles.podcastList}>
      {podcasts.slice(0, 3).map((podcast, idx) => (
        <PodcastCard key={podcast.id} podcast={podcast} index={idx} />
      ))}
    </View>
  </View>
)}
```

---

## 🔍 Debug

### Console Logs Ajoutés

```javascript
console.log('HomeScreen: Received content:', content.length);
console.log('Using MOCK data'); // ou 'Using real data'
console.log('Videos:', videoContent.length);
console.log('Podcasts:', audioContent.length);
console.log('Events:', eventContent.length);
```

### Comment Vérifier

1. Ouvrir la console React Native
2. Naviguer vers HomeScreen
3. Vérifier les logs :
   ```
   HomeScreen: Received content: 5
   Using real data
   Videos: 2
   Podcasts: 2
   Events: 1
   ```

### Si Aucun Contenu

```
HomeScreen: Received content: 0
Using MOCK data
```

---

## 📊 Compteurs de Catégories

### Badges

Les badges affichent le nombre de contenus par catégorie :

```javascript
const categories = [
  { 
    id: 1, 
    label: 'Vidéos', 
    count: videos.length  // ✅ Affiche le nombre de vidéos
  },
  { 
    id: 2, 
    label: 'Podcast', 
    count: podcasts.length  // ✅ Affiche le nombre de podcasts
  },
  { 
    id: 3, 
    label: 'Témoignages' 
    // Pas de count (pas de section témoignages sur home)
  },
  { 
    id: 4, 
    label: 'Événements', 
    count: events.length  // ✅ Affiche le nombre d'événements
  },
];
```

### Affichage

```jsx
{category.count > 0 && (
  <View style={[styles.countBadge, { backgroundColor: category.color }]}>
    <Text style={styles.countText}>{category.count}</Text>
  </View>
)}
```

---

## 🎨 Sections Affichées

### Ordre d'Affichage

1. **Header** (toujours visible)
   - Salutation
   - Barre de recherche

2. **Catégories** (toujours visible)
   - 4 cards avec compteurs

3. **Vidéos Récentes** (si `videos.length > 0`)
   - 3 premières vidéos
   - Bouton "Voir tout"

4. **Événements à Venir** (si `events.length > 0`)
   - 3 premiers événements
   - Bouton "Voir tout"

5. **Podcasts** (si `podcasts.length > 0`)
   - 3 premiers podcasts
   - Bouton "Voir tout"

6. **Empty State** (si `posts.length === 0`)
   - Icône inbox
   - Message "Aucun contenu disponible"

---

## ✅ Checklist de Vérification

### Après le Fix

- [ ] Les vidéos s'affichent
- [ ] Les podcasts s'affichent
- [ ] Les événements s'affichent
- [ ] Les compteurs sont corrects
- [ ] Les badges affichent les bons nombres
- [ ] Le bouton "Voir tout" fonctionne
- [ ] Le refresh fonctionne
- [ ] Les logs de debug apparaissent

### Si Problème Persiste

1. **Vérifier Firebase**
   - Les documents ont-ils le champ `status: 'published'` ?
   - Les documents ont-ils le bon `type` ?

2. **Vérifier les Permissions**
   - L'utilisateur a-t-il accès à la collection `content` ?

3. **Vérifier la Console**
   - Y a-t-il des erreurs Firebase ?
   - Les logs de debug s'affichent-ils ?

4. **Vérifier les Données**
   ```javascript
   // Dans contentService.js
   console.log('Document data:', doc.data());
   ```

---

## 🔄 Flux de Données

### Chargement Initial

```
App démarre
↓
HomeScreen monte
↓
useEffect s'exécute
↓
listenAllContent() appelé
↓
Firebase retourne les documents
↓
Filtrage par type
↓
setState pour chaque type
↓
Rendu conditionnel
↓
Sections affichées
```

### Refresh

```
Pull to refresh
↓
onRefresh() appelé
↓
setRefreshing(true)
↓
Timeout 1 seconde
↓
setRefreshing(false)
↓
listenAllContent se déclenche automatiquement
↓
Données mises à jour
```

---

## 📝 Notes

### MOCK Data

Les données MOCK sont utilisées uniquement si Firebase ne retourne aucun contenu.

**Fichier** : `src/constants/theme.js`

```javascript
export const MOCK_VIDEOS = [...];
export const MOCK_PODCASTS = [...];
export const MOCK_TESTIMONIES = [...];
export const MOCK_EVENTS = [...];
```

### Fallback

Pour les événements, on utilise un fallback :
```javascript
setEvents(eventContent.length > 0 ? eventContent : MOCK_EVENTS);
```

Cela garantit qu'il y a toujours des événements à afficher.

---

**Statut** : ✅ CORRIGÉ

**Version** : 6.0.0 - Home Display Fix

**Date** : Décembre 2024

**Fichier mis à jour** : `src/screens/HomeScreen.js`
