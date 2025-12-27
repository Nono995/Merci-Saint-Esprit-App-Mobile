# 💬 Règles des Témoignages - Mise à Jour

## 🎯 Changements Appliqués

### Avant
- Catégorie : optionnel
- Date : optionnel
- Upload fichier : optionnel

### Après ✅
- **Catégorie : OBLIGATOIRE**
- **Date : OBLIGATOIRE**
- **Upload fichier : SUPPRIMÉ**

---

## 📝 Formulaire Témoignage

### Champs Obligatoires

#### 1. Titre *
- Type: Text
- Validation: Non vide

#### 2. Description *
- Type: TextArea
- Validation: Non vide
- Contenu: Le témoignage complet

#### 3. Auteur *
- Type: Text
- Placeholder: "Nom de la personne"
- Validation: Non vide

#### 4. Catégorie *
- Type: Select (Web) / Picker (Mobile)
- Options:
  - Guérison
  - Conversion
  - Miracle
  - Délivrance
  - Provision
  - Restauration
  - Autre
- Validation: Doit être sélectionné

#### 5. Date *
- Type: Date (Web) / Text (Mobile)
- Format Web: Date picker (YYYY-MM-DD)
- Format Mobile: Texte libre (ex: "Décembre 2024" ou "15/12/2024")
- Validation: Non vide

---

## 🚫 Pas d'Upload de Fichier

### Raison
Les témoignages sont **texte uniquement**. Pas besoin de fichier audio ou vidéo.

### Pour les vidéos courtes
Si quelqu'un veut partager un témoignage en vidéo (30-40 secondes), il doit utiliser la section **"Vidéos"** avec :
- Type: Vidéo
- Durée: 30-40 secondes max
- Catégorie dans le titre ou description

### Message d'information
```
📘 Témoignages texte uniquement
Les témoignages sont publiés sous forme de texte. 
Pour les vidéos courtes (30-40s), utilisez la section "Vidéos".
```

---

## ✅ Validation

### Mobile (React Native)
```javascript
if (contentType === 'testimony') {
  if (!testimonyAuthor.trim()) {
    Alert.alert('Erreur', 'Veuillez indiquer l\'auteur du témoignage');
    return;
  }
  if (!testimonyCategory.trim()) {
    Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
    return;
  }
  if (!testimonyDate.trim()) {
    Alert.alert('Erreur', 'Veuillez indiquer la date du témoignage');
    return;
  }
}
```

### Web (React)
```javascript
if (contentType === 'testimony') {
  if (!testimonyAuthor.trim()) {
    alert('❌ Veuillez indiquer l\'auteur du témoignage');
    return;
  }
  if (!testimonyCategory.trim()) {
    alert('❌ Veuillez sélectionner une catégorie');
    return;
  }
  if (!testimonyDate.trim()) {
    alert('❌ Veuillez indiquer la date du témoignage');
    return;
  }
}
```

---

## 📱 Interface Mobile

### Sélecteur de Catégorie
```jsx
<TouchableOpacity 
  style={styles.pickerButton}
  onPress={() => {
    Alert.alert(
      'Catégorie',
      'Sélectionnez une catégorie',
      [
        { text: 'Guérison', onPress: () => setTestimonyCategory('Guérison') },
        { text: 'Conversion', onPress: () => setTestimonyCategory('Conversion') },
        { text: 'Miracle', onPress: () => setTestimonyCategory('Miracle') },
        { text: 'Délivrance', onPress: () => setTestimonyCategory('Délivrance') },
        { text: 'Provision', onPress: () => setTestimonyCategory('Provision') },
        { text: 'Restauration', onPress: () => setTestimonyCategory('Restauration') },
        { text: 'Autre', onPress: () => setTestimonyCategory('Autre') },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  }}
>
  <Text>{testimonyCategory || 'Sélectionnez une catégorie'}</Text>
  <Ionicons name="chevron-down" size={20} />
</TouchableOpacity>
```

### Champ Date
```jsx
<TextInput 
  style={styles.input} 
  value={testimonyDate} 
  onChangeText={setTestimonyDate} 
  placeholder="Ex: Décembre 2024 ou 15/12/2024" 
/>
```

### Message d'Information
```jsx
<View style={styles.infoBox}>
  <Ionicons name="information-circle" size={20} color="#3B82F6" />
  <Text style={styles.infoText}>
    Les témoignages sont publiés sous forme de texte uniquement. 
    Pour les vidéos courtes (30-40s), utilisez la section "Vidéos".
  </Text>
</View>
```

---

## 💻 Interface Web

### Sélecteur de Catégorie
```jsx
<select
  value={testimonyCategory}
  onChange={(e) => setTestimonyCategory(e.target.value)}
  className="input-field"
  required
>
  <option value="">Sélectionnez une catégorie</option>
  <option value="Guérison">Guérison</option>
  <option value="Conversion">Conversion</option>
  <option value="Miracle">Miracle</option>
  <option value="Délivrance">Délivrance</option>
  <option value="Provision">Provision</option>
  <option value="Restauration">Restauration</option>
  <option value="Autre">Autre</option>
</select>
```

### Champ Date
```jsx
<input
  type="date"
  value={testimonyDate}
  onChange={(e) => setTestimonyDate(e.target.value)}
  className="input-field"
  required
/>
```

### Message d'Information
```jsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <AlertCircle size={20} className="text-blue-600 mt-0.5" />
    <div>
      <p className="text-sm font-medium text-blue-900">
        Témoignages texte uniquement
      </p>
      <p className="text-xs text-blue-700 mt-1">
        Les témoignages sont publiés sous forme de texte. 
        Pas besoin d'uploader de fichier.
        Pour les vidéos courtes (30-40s), utilisez la section "Vidéos".
      </p>
    </div>
  </div>
</div>
```

---

## 💾 Structure de Données

### Témoignage Complet
```javascript
{
  type: 'testimony',
  title: string,              // OBLIGATOIRE
  description: string,        // OBLIGATOIRE (le témoignage)
  author: string,             // OBLIGATOIRE
  category: string,           // OBLIGATOIRE (Guérison, Conversion, etc.)
  date: string,               // OBLIGATOIRE
  authorId: string,
  authorName: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  views: 0,
  likes: [],
  shares: 0,
  status: 'published',
  // PAS de mediaUrl
  // PAS de publicId
  // PAS de file
}
```

---

## 🎬 Pour les Vidéos Courtes (30-40s)

### Utiliser la Section Vidéos
Si quelqu'un veut partager un témoignage en vidéo :

1. Aller dans **"Vidéos"**
2. Remplir :
   - Titre: "Témoignage de [Nom] - [Catégorie]"
   - Description: Le contexte du témoignage
   - URL ou Upload: La vidéo (30-40 secondes)
   - Durée: "0:30" ou "0:40"

### Exemple
```
Titre: "Témoignage de Marie - Guérison"
Description: "Marie partage comment elle a été guérie d'une maladie..."
URL: https://youtube.com/watch?v=...
Durée: 0:35
```

---

## 📊 Catégories Disponibles

### 1. Guérison
Témoignages de guérisons physiques, émotionnelles ou spirituelles

### 2. Conversion
Témoignages de personnes venues à la foi

### 3. Miracle
Témoignages de miracles et interventions divines

### 4. Délivrance
Témoignages de délivrance d'addictions, peurs, etc.

### 5. Provision
Témoignages de provisions financières ou matérielles

### 6. Restauration
Témoignages de restauration familiale, professionnelle, etc.

### 7. Autre
Pour les témoignages qui ne rentrent pas dans les catégories ci-dessus

---

## ✅ Checklist de Publication

### Avant de publier un témoignage :
- [ ] Titre clair et descriptif
- [ ] Description complète (le témoignage)
- [ ] Auteur indiqué
- [ ] Catégorie sélectionnée
- [ ] Date renseignée
- [ ] Pas de fichier uploadé (texte uniquement)

### Si c'est une vidéo :
- [ ] Utiliser la section "Vidéos"
- [ ] Durée: 30-40 secondes max
- [ ] Mentionner "Témoignage" dans le titre

---

## 🎯 Résumé des Changements

| Champ | Avant | Après |
|-------|-------|-------|
| Titre | Obligatoire | Obligatoire ✅ |
| Description | Obligatoire | Obligatoire ✅ |
| Auteur | Obligatoire | Obligatoire ✅ |
| Catégorie | Optionnel | **OBLIGATOIRE** ✅ |
| Date | Optionnel | **OBLIGATOIRE** ✅ |
| Upload fichier | Optionnel | **SUPPRIMÉ** ✅ |

---

## 📝 Messages d'Erreur

### Auteur manquant
```
❌ Veuillez indiquer l'auteur du témoignage
```

### Catégorie manquante
```
❌ Veuillez sélectionner une catégorie
```

### Date manquante
```
❌ Veuillez indiquer la date du témoignage
```

---

**Statut** : ✅ APPLIQUÉ

**Version** : 4.0.0 - Témoignages Texte Uniquement

**Date** : Décembre 2024

**Fichiers mis à jour** :
- `src/screens/AddContentScreen.js` (Mobile)
- `admin/src/pages/ContentManager.jsx` (Web)
