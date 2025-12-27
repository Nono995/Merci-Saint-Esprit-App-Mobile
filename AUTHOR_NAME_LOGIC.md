# 👤 Logique du Nom d'Auteur

## 🎯 Règle Principale

Le champ `authorName` doit refléter **l'auteur réel du contenu**, pas nécessairement l'utilisateur qui le publie.

---

## 📋 Logique par Type de Contenu

### 🎬 Vidéo
**authorName** = Nom de l'utilisateur connecté

**Raison :** 
- L'utilisateur qui publie la vidéo est généralement l'auteur
- Pas de champ "auteur" spécifique dans le formulaire

**Code :**
```javascript
if (contentType === 'video') {
  authorName = currentUser.displayName || currentUser.email || 'Anonyme';
}
```

---

### 🎙️ Podcast
**authorName** = Nom saisi dans le champ "Auteur du podcast"

**Raison :**
- Le podcast peut être d'un prédicateur/pasteur spécifique
- L'admin peut publier un podcast d'une autre personne
- Le champ "Auteur" est **obligatoire** dans le formulaire

**Code :**
```javascript
if (contentType === 'audio') {
  authorName = podcastAuthor; // Champ du formulaire
}
```

**Exemple :**
```
Titre: "Méditation quotidienne"
Auteur: "Pasteur Martin"
→ authorName = "Pasteur Martin"
```

---

### 💬 Témoignage
**authorName** = Nom saisi dans le champ "Auteur du témoignage"

**Raison :**
- Le témoignage est celui d'une personne spécifique
- L'admin peut publier le témoignage de quelqu'un d'autre
- Le champ "Auteur" est **obligatoire** dans le formulaire

**Code :**
```javascript
if (contentType === 'testimony') {
  authorName = testimonyAuthor; // Champ du formulaire
}
```

**Exemple :**
```
Titre: "Guérison miraculeuse"
Auteur: "Marie Dupont"
→ authorName = "Marie Dupont"
```

---

## 💾 Structure de Données

### Vidéo
```javascript
{
  type: 'video',
  title: string,
  description: string,
  authorId: string,           // ID de l'utilisateur qui publie
  authorName: string,         // Nom de l'utilisateur qui publie
  videoUrl: string,
  duration: string,
  // ...
}
```

### Podcast
```javascript
{
  type: 'audio',
  title: string,
  description: string,
  authorId: string,           // ID de l'utilisateur qui publie
  authorName: string,         // Nom de l'auteur du podcast (champ formulaire)
  author: string,             // Même valeur (champ supplémentaire)
  audioUrl: string,
  duration: string,
  // ...
}
```

### Témoignage
```javascript
{
  type: 'testimony',
  title: string,
  description: string,
  authorId: string,           // ID de l'utilisateur qui publie
  authorName: string,         // Nom de l'auteur du témoignage (champ formulaire)
  author: string,             // Même valeur (champ supplémentaire)
  category: string,
  date: string,
  // ...
}
```

---

## 🔄 Flux de Données

### Vidéo
```
Utilisateur connecté: "Admin"
↓
Publie une vidéo
↓
authorName = "Admin"
```

### Podcast
```
Utilisateur connecté: "Admin"
↓
Remplit le formulaire:
  - Titre: "Prédication du dimanche"
  - Auteur: "Pasteur Jean"
↓
authorName = "Pasteur Jean"
```

### Témoignage
```
Utilisateur connecté: "Admin"
↓
Remplit le formulaire:
  - Titre: "Ma guérison"
  - Auteur: "Sophie Martin"
↓
authorName = "Sophie Martin"
```

---

## 📱 Implémentation

### Mobile (React Native)

```javascript
// Déterminer le nom de l'auteur selon le type de contenu
let authorName;
if (contentType === 'audio') {
  authorName = podcastAuthor; // Nom de l'auteur du podcast
} else if (contentType === 'testimony') {
  authorName = testimonyAuthor; // Nom de l'auteur du témoignage
} else {
  authorName = user.displayName || 'Anonyme'; // Pour les vidéos
}

const contentData = {
  title,
  description,
  type: contentType,
  authorId: user.uid,
  authorName: authorName, // Nom déterminé selon le type
  // ...
};
```

### Web (React)

```javascript
// Déterminer le nom de l'auteur selon le type de contenu
let authorName;
if (contentType === 'audio') {
  authorName = podcastAuthor; // Nom de l'auteur du podcast
} else if (contentType === 'testimony') {
  authorName = testimonyAuthor; // Nom de l'auteur du témoignage
} else {
  authorName = currentUser.displayName || currentUser.email || 'Admin'; // Pour les vidéos
}

const contentData = {
  title: formData.title,
  description: formData.description,
  type: contentType,
  authorId: currentUser.uid,
  authorName: authorName, // Nom déterminé selon le type
  // ...
};
```

---

## 🎯 Avantages

### ✅ Flexibilité
- L'admin peut publier du contenu d'autres personnes
- Le nom de l'auteur réel est préservé

### ✅ Clarté
- Les utilisateurs voient le vrai auteur du contenu
- "Pasteur Martin" au lieu de "Admin"

### ✅ Traçabilité
- `authorId` : Qui a publié (pour l'admin)
- `authorName` : Qui est l'auteur (pour les utilisateurs)

---

## 📊 Exemples Concrets

### Exemple 1 : Admin publie un podcast
```
Utilisateur connecté: admin@church.com
Formulaire:
  - Type: Podcast
  - Titre: "La foi qui déplace les montagnes"
  - Auteur: "Pasteur Pierre Dubois"
  
Résultat:
  authorId: "abc123" (ID de admin@church.com)
  authorName: "Pasteur Pierre Dubois"
  author: "Pasteur Pierre Dubois"
```

### Exemple 2 : Admin publie un témoignage
```
Utilisateur connecté: admin@church.com
Formulaire:
  - Type: Témoignage
  - Titre: "Guérison d'une maladie grave"
  - Auteur: "Marie Lefebvre"
  - Catégorie: "Guérison"
  
Résultat:
  authorId: "abc123" (ID de admin@church.com)
  authorName: "Marie Lefebvre"
  author: "Marie Lefebvre"
```

### Exemple 3 : Admin publie une vidéo
```
Utilisateur connecté: admin@church.com (displayName: "Administrateur")
Formulaire:
  - Type: Vidéo
  - Titre: "Culte du dimanche"
  - URL: "https://youtube.com/..."
  
Résultat:
  authorId: "abc123" (ID de admin@church.com)
  authorName: "Administrateur"
```

---

## 🔍 Affichage dans l'App

### Liste de Podcasts
```
🎙️ Méditation quotidienne
   Par Pasteur Martin
   👁️ 1.2k  ❤️ 45
```

### Liste de Témoignages
```
💬 Ma guérison miraculeuse
   Par Sophie Durand
   🏷️ Guérison  📅 Décembre 2024
```

### Liste de Vidéos
```
🎬 Prédication du dimanche
   Par Administrateur
   👁️ 2.5k  ❤️ 120
```

---

## ⚠️ Points d'Attention

### Validation
- Pour podcast : `podcastAuthor` doit être rempli
- Pour témoignage : `testimonyAuthor` doit être rempli
- Pour vidéo : Pas de validation spéciale

### Champs Multiples
- `authorName` : Nom affiché partout
- `author` : Champ supplémentaire pour podcast/témoignage (même valeur)
- `authorId` : ID de l'utilisateur qui a publié

### Cohérence
- Mobile et Web utilisent la même logique
- Même structure de données
- Même affichage

---

## 📝 Checklist

### Lors de la publication :
- [ ] Type de contenu déterminé
- [ ] Nom d'auteur calculé selon le type
- [ ] `authorName` assigné correctement
- [ ] `authorId` = ID utilisateur connecté
- [ ] Champ `author` ajouté si podcast/témoignage

### Lors de l'affichage :
- [ ] Afficher `authorName` (pas `author`)
- [ ] Format : "Par [authorName]"
- [ ] Cohérent sur tous les écrans

---

**Statut** : ✅ IMPLÉMENTÉ

**Version** : 5.0.0 - Author Name Logic

**Date** : Décembre 2024

**Fichiers mis à jour** :
- `src/screens/AddContentScreen.js` (Mobile)
- `admin/src/pages/ContentManager.jsx` (Web)
