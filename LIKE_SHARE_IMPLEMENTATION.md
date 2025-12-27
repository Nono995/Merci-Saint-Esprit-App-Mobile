# ❤️ Implémentation Like & Share

## 🎯 Objectifs

1. ✅ Récupérer le nom de l'utilisateur connecté (pas "Admin")
2. ⏳ Ajouter fonctionnalité de like
3. ⏳ Ajouter fonctionnalité de partage

---

## ✅ 1. Nom de l'Utilisateur - CORRIGÉ

### Admin Web
**Avant :**
```javascript
authorId: 'admin',
authorName: 'Admin',  // Fixe
```

**Après :**
```javascript
const currentUser = auth.currentUser;
authorId: currentUser.uid,
authorName: currentUser.displayName || currentUser.email || 'Admin',
```

### Mobile App
**Déjà correct :**
```javascript
const user = auth.currentUser;
authorId: user.uid,
authorName: user.displayName || 'Anonyme'
```

---

## ⏳ 2. Fonctionnalité Like

### Service Firebase

**Créer/Mettre à jour : `src/services/contentService.js`**

```javascript
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebase';

// Liker un contenu
export const likeContent = async (contentId, userId) => {
  try {
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      likes: arrayUnion(userId)
    });
    return { success: true };
  } catch (error) {
    console.error('Error liking content:', error);
    throw error;
  }
};

// Unliker un contenu
export const unlikeContent = async (contentId, userId) => {
  try {
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      likes: arrayRemove(userId)
    });
    return { success: true };
  } catch (error) {
    console.error('Error unliking content:', error);
    throw error;
  }
};

// Toggle like
export const toggleLike = async (contentId, userId, isLiked) => {
  if (isLiked) {
    return await unlikeContent(contentId, userId);
  } else {
    return await likeContent(contentId, userId);
  }
};
```

### Mise à jour VideoCard

**Ajouter les props :**
```javascript
const VideoCard = ({ 
  video, 
  onPress, 
  onLike,      // Nouveau
  isLiked      // Nouveau
}) => {
```

**Ajouter le bouton like :**
```jsx
<View style={styles.actions}>
  <TouchableOpacity 
    style={styles.actionButton}
    onPress={() => onLike && onLike(video.id)}
  >
    <Ionicons 
      name={isLiked ? "heart" : "heart-outline"} 
      size={20} 
      color={isLiked ? COLORS.error : COLORS.textSecondary} 
    />
    <Text style={styles.actionText}>
      {video.likes?.length || 0}
    </Text>
  </TouchableOpacity>
</View>
```

### Mise à jour PodcastCard

**Ajouter les props :**
```javascript
const PodcastCard = ({ 
  podcast, 
  index, 
  onLike,      // Nouveau
  isLiked      // Nouveau
}) => {
```

**Ajouter le bouton like :**
```jsx
<TouchableOpacity 
  style={styles.likeButton}
  onPress={() => onLike && onLike(podcast.id)}
>
  <Ionicons 
    name={isLiked ? "heart" : "heart-outline"} 
    size={20} 
    color={isLiked ? COLORS.error : COLORS.textSecondary} 
  />
  <Text style={styles.likeText}>
    {podcast.likes?.length || 0}
  </Text>
</TouchableOpacity>
```

### Utilisation dans HomeScreen

```javascript
import { toggleLike } from '../services/contentService';
import { getAuth } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleLike = async (contentId, currentLikes) => {
    if (!currentUser) {
      Alert.alert('Connexion requise', 'Veuillez vous connecter pour liker');
      return;
    }

    const isLiked = currentLikes?.includes(currentUser.uid);
    
    try {
      await toggleLike(contentId, currentUser.uid, isLiked);
      // Recharger le contenu
      loadContent();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de liker le contenu');
    }
  };

  return (
    // ...
    <VideoCard
      video={video}
      onPress={() => navigation.navigate('VideoPlayer', { post: video })}
      onLike={() => handleLike(video.id, video.likes)}
      isLiked={video.likes?.includes(currentUser?.uid)}
    />
  );
}
```

---

## ⏳ 3. Fonctionnalité Partage

### Service de Partage

**Créer/Mettre à jour : `src/services/shareService.js`**

```javascript
import { Share, Alert } from 'react-native';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

// Partager un contenu
export const shareContent = async (content) => {
  try {
    const message = `🎬 ${content.title}\n\n${content.description}\n\nDécouvrez plus sur l'app Merci Saint-Esprit !`;
    
    const result = await Share.share({
      message: message,
      title: content.title,
      url: content.mediaUrl || content.videoUrl || content.audioUrl,
    });

    if (result.action === Share.sharedAction) {
      // Incrémenter le compteur de partages
      await incrementShares(content.id);
      return { success: true, shared: true };
    } else if (result.action === Share.dismissedAction) {
      return { success: true, shared: false };
    }
  } catch (error) {
    console.error('Error sharing:', error);
    Alert.alert('Erreur', 'Impossible de partager le contenu');
    throw error;
  }
};

// Incrémenter le compteur de partages
const incrementShares = async (contentId) => {
  try {
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      shares: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing shares:', error);
  }
};
```

### Mise à jour VideoCard

**Ajouter la prop :**
```javascript
const VideoCard = ({ 
  video, 
  onPress, 
  onLike,
  isLiked,
  onShare      // Nouveau
}) => {
```

**Ajouter le bouton share :**
```jsx
<TouchableOpacity 
  style={styles.actionButton}
  onPress={() => onShare && onShare(video)}
>
  <Ionicons 
    name="share-social-outline" 
    size={20} 
    color={COLORS.textSecondary} 
  />
  <Text style={styles.actionText}>
    {video.shares || 0}
  </Text>
</TouchableOpacity>
```

### Mise à jour PodcastCard

**Ajouter la prop :**
```javascript
const PodcastCard = ({ 
  podcast, 
  index, 
  onLike,
  isLiked,
  onShare      // Nouveau
}) => {
```

**Ajouter le bouton share :**
```jsx
<TouchableOpacity 
  style={styles.shareButton}
  onPress={() => onShare && onShare(podcast)}
>
  <Ionicons 
    name="share-social-outline" 
    size={20} 
    color={COLORS.textSecondary} 
  />
</TouchableOpacity>
```

### Utilisation dans HomeScreen

```javascript
import { shareContent } from '../services/shareService';

export default function HomeScreen({ navigation }) {
  const handleShare = async (content) => {
    try {
      await shareContent(content);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    // ...
    <VideoCard
      video={video}
      onPress={() => navigation.navigate('VideoPlayer', { post: video })}
      onLike={() => handleLike(video.id, video.likes)}
      isLiked={video.likes?.includes(currentUser?.uid)}
      onShare={() => handleShare(video)}
    />
  );
}
```

---

## 📱 Interface Utilisateur

### Boutons d'Action

**Style moderne :**
```javascript
actionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: '#F9FAFB',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},
actionText: {
  fontSize: 13,
  fontWeight: '600',
  color: COLORS.textSecondary,
},
```

**Layout :**
```jsx
<View style={styles.actions}>
  {/* Like */}
  <TouchableOpacity style={styles.actionButton}>
    <Ionicons name="heart" size={20} color="#EF4444" />
    <Text style={styles.actionText}>24</Text>
  </TouchableOpacity>

  {/* Share */}
  <TouchableOpacity style={styles.actionButton}>
    <Ionicons name="share-social-outline" size={20} />
    <Text style={styles.actionText}>12</Text>
  </TouchableOpacity>

  {/* Views */}
  <View style={styles.actionButton}>
    <Ionicons name="eye-outline" size={20} />
    <Text style={styles.actionText}>1.2k</Text>
  </View>
</View>
```

---

## 🎯 Checklist d'Implémentation

### Phase 1 : Nom Utilisateur
- [x] Admin Web : Récupérer currentUser
- [x] Mobile : Déjà correct
- [x] Tester la publication

### Phase 2 : Like
- [ ] Créer service `likeContent`
- [ ] Mettre à jour VideoCard
- [ ] Mettre à jour PodcastCard
- [ ] Mettre à jour TestimonyCard (déjà fait)
- [ ] Implémenter dans HomeScreen
- [ ] Implémenter dans VideosScreen
- [ ] Implémenter dans PodcastScreen
- [ ] Implémenter dans TestimonyScreen
- [ ] Tester le like/unlike

### Phase 3 : Share
- [ ] Créer service `shareContent`
- [ ] Mettre à jour VideoCard
- [ ] Mettre à jour PodcastCard
- [ ] Mettre à jour TestimonyCard
- [ ] Implémenter dans tous les screens
- [ ] Tester le partage

---

## 🔥 Structure Firebase

### Document Content
```javascript
{
  id: string,
  title: string,
  description: string,
  type: 'video' | 'audio' | 'testimony',
  authorId: string,
  authorName: string,        // Nom réel de l'utilisateur
  likes: [userId1, userId2], // Array d'IDs
  shares: number,            // Compteur
  views: number,
  createdAt: Timestamp,
  // ... autres champs
}
```

---

## 📊 Statistiques

### Affichage
- **Likes** : Nombre + icône cœur (rouge si liké)
- **Shares** : Nombre + icône partage
- **Views** : Nombre + icône œil

### Format
```javascript
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};
```

---

## 🎨 Design

### Couleurs
- Like actif : `#EF4444` (rouge)
- Like inactif : `#6B7280` (gris)
- Share : `#6B7280` (gris)
- Views : `#6B7280` (gris)

### Animations
```javascript
const scaleAnim = useRef(new Animated.Value(1)).current;

const handleLikePress = () => {
  Animated.sequence([
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ]).start();
  
  onLike();
};
```

---

**Statut** : 
- ✅ Nom utilisateur : CORRIGÉ
- ⏳ Like : À implémenter
- ⏳ Share : À implémenter

**Prochaine étape** : Implémenter les services like et share
