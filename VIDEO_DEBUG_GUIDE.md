# 🔍 Guide de Debug - Vidéos ne s'affichent pas

## 🐛 Problème

Les vidéos ne s'affichent pas sur le HomeScreen.

---

## 🔍 Étapes de Debug

### 1. Vérifier les Logs Console

Ouvrir la console React Native et chercher :

```
HomeScreen: Received content: X
Using MOCK data (ou Using real data)
Videos: X
Podcasts: X
Events: X
```

**Si "Videos: 0"** → Problème de données
**Si "Videos: 3"** → Problème de rendu

---

### 2. Vérifier les Données

#### A. Données MOCK

**Fichier** : `src/constants/theme.js`

```javascript
export const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'La Puissance de la Foi',
    type: 'video',
    authorName: 'Pasteur Jean',
    // ...
  },
  // ...
];
```

**Vérifier** :
- ✅ `type: 'video'` (pas 'Video' ou autre)
- ✅ `id` unique
- ✅ `title` présent
- ✅ `authorName` présent

#### B. Données Firebase

**Collection** : `content`

**Vérifier dans Firebase Console** :
- Documents existent ?
- Champ `type` = `'video'` ?
- Champ `status` = `'published'` ?
- Champ `title` présent ?

---

### 3. Vérifier le Filtrage

**Dans HomeScreen.js** :

```javascript
const videoContent = content.filter(item => item.type === 'video');
console.log('Filtered videos:', videoContent);
```

**Problèmes possibles** :
- `item.type` est `undefined`
- `item.type` est `'Video'` au lieu de `'video'`
- Documents n'ont pas le champ `type`

---

### 4. Vérifier le Rendu

**Ajout de debug** :

```javascript
{videos.length > 0 ? (
  <View style={styles.section}>
    <Text>DEBUG: {videos.length} vidéos trouvées</Text>
    {videos.slice(0, 3).map((video) => {
      console.log('Rendering video:', video.id, video.title);
      return <VideoCard key={video.id} video={video} />;
    })}
  </View>
) : (
  <Text>Aucune vidéo (videos.length = {videos.length})</Text>
)}
```

---

## 🔧 Solutions Possibles

### Solution 1 : Forcer les MOCK Data

**Temporairement pour tester** :

```javascript
useEffect(() => {
  // Forcer les MOCK data
  console.log('Forcing MOCK data');
  setVideos(MOCK_VIDEOS);
  setPodcasts(MOCK_PODCASTS);
  setEvents(MOCK_EVENTS);
  setPosts([...MOCK_VIDEOS, ...MOCK_PODCASTS, ...MOCK_TESTIMONIES]);
}, []);
```

**Si ça marche** → Problème avec Firebase
**Si ça ne marche pas** → Problème de rendu

---

### Solution 2 : Vérifier VideoCard

**Test simple** :

```javascript
// Dans HomeScreen
<VideoCard
  video={{
    id: 'test',
    title: 'Test Video',
    authorName: 'Test Author',
    views: 100,
    likes: [],
    duration: '10:00'
  }}
  onPress={() => console.log('Video pressed')}
/>
```

**Si ça marche** → Problème avec les données
**Si ça ne marche pas** → Problème avec VideoCard

---

### Solution 3 : Vérifier les Imports

**Dans HomeScreen.js** :

```javascript
import VideoCard from '../components/VideoCard';
import { MOCK_VIDEOS } from '../constants/theme';
```

**Vérifier** :
- ✅ Chemins corrects
- ✅ Pas d'erreurs d'import
- ✅ VideoCard exporté correctement

---

### Solution 4 : Vérifier les Styles

**Problème possible** : Les vidéos sont rendues mais invisibles

```javascript
videoList: {
  gap: 16,
  // Ajouter pour debug :
  backgroundColor: '#FEE2E2', // Rouge clair
  padding: 16,
},
```

**Si zone rouge visible mais pas de vidéos** → Problème de rendu VideoCard
**Si pas de zone rouge** → Section pas rendue

---

## 🎯 Checklist de Vérification

### Données
- [ ] MOCK_VIDEOS existe et contient des données
- [ ] MOCK_VIDEOS[0].type === 'video'
- [ ] Firebase contient des documents avec type='video'
- [ ] Firebase documents ont status='published'

### Code
- [ ] Import VideoCard correct
- [ ] Import MOCK_VIDEOS correct
- [ ] Filtrage `item.type === 'video'` correct
- [ ] `videos.length > 0` condition correcte
- [ ] `.map()` avec `key` unique

### Rendu
- [ ] VideoCard s'affiche avec données test
- [ ] Styles videoList appliqués
- [ ] Pas d'erreur dans console
- [ ] Section visible à l'écran

---

## 🔍 Tests à Faire

### Test 1 : Données Hardcodées

```javascript
const [videos, setVideos] = useState([
  {
    id: 'test1',
    title: 'Test Video 1',
    authorName: 'Test',
    views: 100,
    likes: [],
    duration: '10:00'
  }
]);
```

### Test 2 : Log Complet

```javascript
useEffect(() => {
  console.log('=== DEBUG START ===');
  console.log('MOCK_VIDEOS:', MOCK_VIDEOS);
  console.log('MOCK_VIDEOS length:', MOCK_VIDEOS.length);
  console.log('MOCK_VIDEOS[0]:', MOCK_VIDEOS[0]);
  
  const unsubscribe = listenAllContent((content) => {
    console.log('Content received:', content);
    console.log('Content length:', content.length);
    
    if (content.length === 0) {
      console.log('Setting MOCK data');
      setVideos(MOCK_VIDEOS);
      console.log('Videos set to:', MOCK_VIDEOS.length);
    } else {
      const videoContent = content.filter(item => {
        console.log('Item type:', item.type);
        return item.type === 'video';
      });
      console.log('Filtered videos:', videoContent.length);
      setVideos(videoContent);
    }
  });
  
  return () => unsubscribe();
}, []);
```

### Test 3 : Rendu Simple

```javascript
{/* Test simple sans condition */}
<View style={styles.section}>
  <Text style={styles.modernTitle}>Test Vidéos</Text>
  <VideoCard
    video={MOCK_VIDEOS[0]}
    onPress={() => console.log('Pressed')}
  />
</View>
```

---

## 🚨 Erreurs Communes

### Erreur 1 : Type Mismatch

```javascript
// ❌ Mauvais
item.type === 'Video' // Majuscule

// ✅ Bon
item.type === 'video' // Minuscule
```

### Erreur 2 : Condition Incorrecte

```javascript
// ❌ Mauvais
{videos && videos.length > 0 && (...)}

// ✅ Bon
{videos.length > 0 && (...)}
```

### Erreur 3 : Key Manquante

```javascript
// ❌ Mauvais
{videos.map((video) => (
  <VideoCard video={video} />
))}

// ✅ Bon
{videos.map((video) => (
  <VideoCard key={video.id} video={video} />
))}
```

### Erreur 4 : Import Incorrect

```javascript
// ❌ Mauvais
import VideoCard from './components/VideoCard';

// ✅ Bon
import VideoCard from '../components/VideoCard';
```

---

## 📱 Console Logs Attendus

### Cas Normal (MOCK Data)

```
HomeScreen: Received content: 0
Using MOCK data
Videos: 3
Podcasts: 2
Events: 2
Rendering video: 1 La Puissance de la Foi
Rendering video: 2 Prière du Matin - Réveil Spirituel
Rendering video: 3 Enseignement sur la Grâce
```

### Cas Normal (Real Data)

```
HomeScreen: Received content: 5
Using real data
Videos: 2
Podcasts: 2
Events: 1
Rendering video: abc123 Ma Vidéo
Rendering video: def456 Autre Vidéo
```

### Cas Problème

```
HomeScreen: Received content: 5
Using real data
Videos: 0  ← PROBLÈME ICI
Podcasts: 2
Events: 1
```

---

## 🔧 Fix Rapide

**Si rien ne fonctionne, essayer ce code simplifié** :

```javascript
export default function HomeScreen({ navigation }) {
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [podcasts, setPodcasts] = useState(MOCK_PODCASTS);
  const [events, setEvents] = useState(MOCK_EVENTS);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Section Vidéos - Version Simple */}
        <View style={styles.section}>
          <Text style={styles.modernTitle}>Vidéos ({videos.length})</Text>
          {videos.slice(0, 3).map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPress={() => console.log('Video:', video.title)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
```

---

## 📞 Support

Si le problème persiste après tous ces tests :

1. **Copier les logs console**
2. **Faire une capture d'écran**
3. **Vérifier Firebase Console**
4. **Vérifier que VideoCard.js existe**

---

**Statut** : 🔍 EN DEBUG

**Fichiers à vérifier** :
- `src/screens/HomeScreen.js`
- `src/components/VideoCard.js`
- `src/constants/theme.js`
- `src/services/contentService.js`
