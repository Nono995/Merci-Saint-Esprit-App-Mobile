# 📝 Formulaires Admin - Gestion de Contenu

## Vue d'ensemble

Formulaires différenciés pour l'ajout de vidéos, podcasts et témoignages dans l'interface admin.

---

## 🎬 Formulaire VIDÉO

### Champs Obligatoires
- ✅ **Titre** - Titre de la vidéo
- ✅ **Description** - Description détaillée
- ✅ **URL ou Fichier** - Au moins l'un des deux

### Champs Spécifiques

#### 1. URL de la vidéo
```
Type: URL
Placeholder: "https://youtube.com/watch?v=..."
Description: Lien YouTube, Vimeo, ou autre plateforme
```

#### 2. Durée (optionnel)
```
Type: Text
Placeholder: "Ex: 15:30"
Format: MM:SS ou HH:MM:SS
```

#### 3. Miniature (optionnel)
```
Type: Image Picker
Description: Image de prévisualisation
Format: JPG, PNG
```

#### 4. Upload vidéo (alternatif)
```
Type: Video Picker
Description: Upload direct depuis la galerie
Format: MP4, MOV, etc.
```

### Validation
- Titre ET description obligatoires
- URL OU fichier vidéo obligatoire
- Si URL fournie, pas besoin de fichier
- Si fichier fourni, pas besoin d'URL

---

## 🎙️ Formulaire PODCAST

### Champs Obligatoires
- ✅ **Titre** - Titre du podcast
- ✅ **Description** - Description détaillée
- ✅ **Auteur** - Nom de l'auteur/prédicateur
- ✅ **URL ou Fichier** - Au moins l'un des deux

### Champs Spécifiques

#### 1. Auteur du podcast *
```
Type: Text
Placeholder: "Nom de l'auteur ou prédicateur"
Obligatoire: OUI
Description: Qui a créé ce podcast
```

#### 2. URL du podcast
```
Type: URL
Placeholder: "https://soundcloud.com/..."
Description: Lien SoundCloud, Spotify, ou autre
```

#### 3. Durée (optionnel)
```
Type: Text
Placeholder: "Ex: 45:00"
Format: MM:SS ou HH:MM:SS
```

#### 4. Upload audio (alternatif)
```
Type: Audio Picker
Description: Upload direct depuis la galerie
Format: MP3, M4A, WAV, etc.
```

### Validation
- Titre, description ET auteur obligatoires
- URL OU fichier audio obligatoire
- Auteur ne peut pas être vide

---

## 💬 Formulaire TÉMOIGNAGE

### Champs Obligatoires
- ✅ **Titre** - Titre du témoignage
- ✅ **Description** - Contenu du témoignage
- ✅ **Auteur** - Nom de la personne

### Champs Spécifiques

#### 1. Auteur du témoignage *
```
Type: Text
Placeholder: "Nom de la personne"
Obligatoire: OUI
Description: Qui partage ce témoignage
```

#### 2. Catégorie (optionnel)
```
Type: Text
Placeholder: "Ex: Guérison, Conversion, Miracle..."
Description: Type de témoignage
Exemples:
  - Guérison
  - Conversion
  - Miracle
  - Délivrance
  - Provision
  - Restauration
```

#### 3. Date du témoignage (optionnel)
```
Type: Text
Placeholder: "Ex: Décembre 2024"
Description: Quand s'est produit le témoignage
Format libre: "Décembre 2024", "2024", "Il y a 2 mois"
```

### Validation
- Titre, description ET auteur obligatoires
- Pas de média requis (texte uniquement)
- Catégorie et date optionnelles

---

## 🎨 Interface Utilisateur

### Sélection du Type
```
┌─────────────────────────────────────┐
│  [📹 Vidéo]  [🎙️ Audio]  [💬 Témoignage]  │
└─────────────────────────────────────┘
```

**Comportement :**
- Cards cliquables avec icônes
- Card active : border verte + fond vert clair
- Card inactive : border grise + fond blanc
- Change le formulaire affiché dynamiquement

---

## 📋 Structure des Données

### Vidéo
```javascript
{
  title: string,
  description: string,
  type: 'video',
  videoUrl: string,           // URL ou null
  duration: string,           // "15:30" ou null
  thumbnail: File,            // Image ou null
  file: File,                 // Vidéo ou null
  authorId: string,
  authorName: string,
  createdAt: timestamp
}
```

### Podcast
```javascript
{
  title: string,
  description: string,
  type: 'audio',
  author: string,             // OBLIGATOIRE
  audioUrl: string,           // URL ou null
  duration: string,           // "45:00" ou null
  file: File,                 // Audio ou null
  authorId: string,
  authorName: string,
  createdAt: timestamp
}
```

### Témoignage
```javascript
{
  title: string,
  description: string,
  type: 'testimony',
  author: string,             // OBLIGATOIRE
  category: string,           // "Guérison" ou null
  date: string,               // "Décembre 2024" ou timestamp
  authorId: string,
  authorName: string,
  createdAt: timestamp
}
```

---

## ✅ Validation Complète

### Règles Générales
1. Titre obligatoire (min 3 caractères)
2. Description obligatoire (min 10 caractères)
3. Type sélectionné obligatoire

### Règles Spécifiques

**Vidéo :**
- URL OU fichier vidéo obligatoire
- Si URL vide ET pas de fichier → Erreur
- Miniature optionnelle
- Durée optionnelle

**Podcast :**
- Auteur obligatoire (min 2 caractères)
- URL OU fichier audio obligatoire
- Si URL vide ET pas de fichier → Erreur
- Durée optionnelle

**Témoignage :**
- Auteur obligatoire (min 2 caractères)
- Pas de média requis
- Catégorie optionnelle
- Date optionnelle (auto si vide)

---

## 🔄 Flux de Publication

### 1. Sélection du Type
```
Utilisateur clique sur "Vidéo", "Audio" ou "Témoignage"
↓
Formulaire change dynamiquement
↓
Champs spécifiques s'affichent
```

### 2. Remplissage
```
Utilisateur remplit les champs obligatoires
↓
Ajoute les champs optionnels si souhaité
↓
Upload média si nécessaire
```

### 3. Validation
```
Clic sur "Publier le contenu"
↓
Validation des champs obligatoires
↓
Validation des champs spécifiques au type
↓
Si erreur → Alert avec message clair
↓
Si OK → Envoi à Firebase
```

### 4. Publication
```
Upload du fichier (si présent)
↓
Création du document Firestore
↓
Ajout des métadonnées spécifiques
↓
Confirmation de succès
↓
Reset du formulaire
↓
Retour à l'écran précédent
```

---

## 🎯 Messages d'Erreur

### Erreurs Générales
```
"Veuillez remplir tous les champs obligatoires"
"Veuillez sélectionner un type de contenu"
```

### Erreurs Vidéo
```
"Veuillez fournir une URL ou sélectionner une vidéo"
"Format de vidéo non supporté"
```

### Erreurs Podcast
```
"Veuillez fournir une URL ou sélectionner un fichier audio"
"Veuillez indiquer l'auteur du podcast"
"Format audio non supporté"
```

### Erreurs Témoignage
```
"Veuillez indiquer l'auteur du témoignage"
"Le témoignage doit contenir au moins 10 caractères"
```

---

## 🎨 Design des Formulaires

### Champs de Texte
```javascript
{
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 12,
  padding: 16,
  fontSize: 15
}
```

### Boutons de Média
```javascript
{
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#E5E7EB'
}
```

### Bouton de Publication
```javascript
{
  gradient: ['#10B981', '#059669'],
  borderRadius: 16,
  padding: 18,
  shadow: true
}
```

---

## 📱 Responsive

- Formulaires adaptés à toutes les tailles
- ScrollView pour contenu long
- Champs full-width
- Padding adaptatif

---

## 🔐 Sécurité

### Vérifications
- ✅ Utilisateur authentifié
- ✅ Validation côté client
- ✅ Validation côté serveur (Firebase)
- ✅ Sanitization des inputs
- ✅ Vérification des types de fichiers

### Permissions
- Upload limité aux admins
- Taille de fichier limitée
- Formats de fichiers restreints

---

## 🚀 Améliorations Futures

### Fonctionnalités
- [ ] Preview avant publication
- [ ] Brouillons
- [ ] Édition de contenu existant
- [ ] Upload multiple
- [ ] Compression automatique
- [ ] Génération de miniatures auto

### UX
- [ ] Progress bar d'upload
- [ ] Validation en temps réel
- [ ] Auto-save
- [ ] Suggestions de catégories
- [ ] Picker de date visuel

---

## 📝 Exemples d'Utilisation

### Publier une Vidéo YouTube
```
1. Sélectionner "Vidéo"
2. Titre: "Prédication du dimanche"
3. Description: "Message sur la foi..."
4. URL: "https://youtube.com/watch?v=abc123"
5. Durée: "35:00"
6. Publier
```

### Publier un Podcast
```
1. Sélectionner "Audio"
2. Titre: "Méditation quotidienne"
3. Description: "Réflexion sur..."
4. Auteur: "Pasteur Martin"
5. URL: "https://soundcloud.com/..."
6. Durée: "15:00"
7. Publier
```

### Publier un Témoignage
```
1. Sélectionner "Témoignage"
2. Titre: "Guérison miraculeuse"
3. Description: "J'étais malade depuis..."
4. Auteur: "Marie Dupont"
5. Catégorie: "Guérison"
6. Date: "Novembre 2024"
7. Publier
```

---

**Statut** : ✅ Formulaires différenciés et fonctionnels

**Version** : 2.0.0 - Formulaires Spécifiques

**Dernière mise à jour** : Décembre 2024
