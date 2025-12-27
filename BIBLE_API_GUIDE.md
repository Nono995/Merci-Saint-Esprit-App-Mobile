# 📖 Guide de Chargement des Données Bible

## Comment ça fonctionne actuellement

### 1. Architecture Actuelle ✅

L'app utilise un système à **deux niveaux**:

```
1. API externe (bible-api.com) → Essai en premier
2. Données locales (bibleData.js) → Fallback si API échoue
```

### 2. Flux de Chargement

```javascript
// Dans BibleReaderScreen.js
const loadVerses = async () => {
  // 1. Essayer l'API externe
  const apiVerses = await fetchChapter(bookId, chapterNum);
  
  if (apiVerses) {
    setVerses(apiVerses); // ✅ Succès
  } else {
    // 2. Fallback sur données locales
    const localVerses = await loadChapter(bookId, chapterNum);
    setVerses(localVerses);
  }
};
```

## Problèmes Actuels

### 1. API Bible-api.com Limitations ⚠️

**Problème:** Certains livres retournent 404
- Ruth (rut) → 404
- Joshua (jos) → 404
- Autres livres de l'Ancien Testament

**Cause:** L'API bible-api.com a une couverture limitée

### 2. Données Locales Limitées

Seulement quelques chapitres sont disponibles localement:
- Genèse 1
- Jean 1, 3, 14
- Psaumes 23
- Matthieu 5, 6

## Solutions pour Charger Plus de Données

### Option 1: Utiliser une Meilleure API (Recommandé) 🌟

#### A. API.Bible (Officielle)

**Avantages:**
- ✅ Couverture complète de la Bible
- ✅ Plusieurs traductions (LSG, NBS, etc.)
- ✅ Fiable et maintenue
- ✅ Gratuite avec clé API

**Inscription:**
1. Aller sur https://scripture.api.bible/
2. Créer un compte gratuit
3. Obtenir une clé API
4. Ajouter dans `.env`:
```
BIBLE_API_KEY=your_api_key_here
```

**Implémentation:**
```javascript
// src/services/bibleApiOfficial.js
const API_KEY = process.env.BIBLE_API_KEY;
const BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_ID = 'de4e12af7f28f599-02'; // LSG (Louis Segond)

export const fetchChapterOfficial = async (bookId, chapter) => {
  const headers = {
    'api-key': API_KEY
  };
  
  const response = await fetch(
    `${BASE_URL}/bibles/${BIBLE_ID}/chapters/${bookId}.${chapter}`,
    { headers }
  );
  
  const data = await response.json();
  return parseVerses(data.content);
};
```

#### B. Bolls Life API (Gratuite, Sans Clé)

**Avantages:**
- ✅ Pas de clé API nécessaire
- ✅ Bonne couverture
- ✅ Format JSON simple

**URL:** https://bolls.life/get-paralel-verses/

**Implémentation:**
```javascript
// src/services/bibleApiBolls.js
const BASE_URL = 'https://bolls.life/get-paralel-verses';

export const fetchChapterBolls = async (bookId, chapter) => {
  const response = await fetch(
    `${BASE_URL}/${bookId}/${chapter}/1-50/`
  );
  
  const data = await response.json();
  return data.verses;
};
```

### Option 2: Télécharger la Bible Complète Localement 📥

**Avantages:**
- ✅ Fonctionne hors ligne
- ✅ Pas de dépendance API
- ✅ Chargement instantané

**Inconvénients:**
- ❌ Taille de l'app augmentée (~5-10 MB)
- ❌ Mise à jour manuelle

**Sources de données:**
1. **JSON Bible** - https://github.com/thiagobodruk/bible
2. **Bible Database** - https://github.com/scrollmapper/bible_databases

**Implémentation:**
```javascript
// 1. Télécharger bible-lsg.json
// 2. Placer dans src/data/bible-lsg.json
// 3. Importer:

import BIBLE_DATA from '../data/bible-lsg.json';

export const loadChapterLocal = (bookId, chapter) => {
  return BIBLE_DATA[bookId]?.[chapter] || null;
};
```

### Option 3: Système Hybride (Recommandé) 🎯

Combiner plusieurs sources pour une fiabilité maximale:

```javascript
// src/services/bibleService.js
export const loadBibleChapter = async (bookId, chapter) => {
  // 1. Essayer cache local d'abord
  const cached = await getCachedChapter(bookId, chapter);
  if (cached) return cached;
  
  // 2. Essayer API principale
  try {
    const data = await fetchChapterOfficial(bookId, chapter);
    if (data) {
      await cacheChapter(bookId, chapter, data);
      return data;
    }
  } catch (error) {
    console.log('API principale échouée, essai fallback');
  }
  
  // 3. Essayer API fallback
  try {
    const data = await fetchChapterBolls(bookId, chapter);
    if (data) return data;
  } catch (error) {
    console.log('API fallback échouée');
  }
  
  // 4. Utiliser données locales
  return loadChapterLocal(bookId, chapter);
};
```

## Implémentation Rapide (Solution Immédiate)

### Étape 1: Ajouter Bolls Life API

Créer `src/services/bibleApiBolls.js`:

```javascript
const BASE_URL = 'https://bolls.life/get-text';

const BOOK_MAPPING = {
  'gen': 'GEN', 'exo': 'EXO', 'lev': 'LEV', 'nom': 'NUM', 'deu': 'DEU',
  'jos': 'JOS', 'jug': 'JDG', 'rut': 'RUT', '1sa': '1SA', '2sa': '2SA',
  // ... compléter le mapping
  'mat': 'MAT', 'mar': 'MRK', 'luc': 'LUK', 'jea': 'JHN', 'act': 'ACT',
  // ... etc
};

export const fetchChapterBolls = async (bookId, chapter) => {
  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) return null;
    
    const response = await fetch(
      `${BASE_URL}/${apiBookId}/${chapter}/1-200/LSG/`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const verses = {};
    
    data.forEach(item => {
      verses[item.verse] = item.text;
    });
    
    return verses;
  } catch (error) {
    console.error('Bolls API error:', error);
    return null;
  }
};
```

### Étape 2: Modifier BibleReaderScreen

```javascript
import { fetchChapter } from '../services/bibleApi';
import { fetchChapterBolls } from '../services/bibleApiBolls';
import { loadChapter } from '../data/bibleData';

const loadVerses = async () => {
  setLoading(true);
  
  try {
    // 1. Essayer bible-api.com
    let verses = await fetchChapter(bookId, chapterNum);
    
    // 2. Si échec, essayer Bolls Life
    if (!verses || Object.keys(verses).length === 0) {
      verses = await fetchChapterBolls(bookId, chapterNum);
    }
    
    // 3. Si échec, utiliser données locales
    if (!verses || Object.keys(verses).length === 0) {
      verses = await loadChapter(bookId, chapterNum);
    }
    
    if (verses && Object.keys(verses).length > 0) {
      setVerses(verses);
    } else {
      setError('Chapitre non disponible');
    }
  } catch (error) {
    console.error('Error loading verses:', error);
    setError('Erreur de chargement');
  } finally {
    setLoading(false);
  }
};
```

## Cache pour Performance

### Implémenter AsyncStorage Cache

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'bible_chapter_';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 jours

export const getCachedChapter = async (bookId, chapter) => {
  try {
    const key = `${CACHE_PREFIX}${bookId}_${chapter}`;
    const cached = await AsyncStorage.getItem(key);
    
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    
    // Vérifier expiration
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      await AsyncStorage.removeItem(key);
      return null;
    }
    
    return data;
  } catch (error) {
    return null;
  }
};

export const cacheChapter = async (bookId, chapter, data) => {
  try {
    const key = `${CACHE_PREFIX}${bookId}_${chapter}`;
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache error:', error);
  }
};
```

## Résumé des Solutions

| Solution | Difficulté | Fiabilité | Offline | Coût |
|----------|-----------|-----------|---------|------|
| API.Bible | Moyenne | ⭐⭐⭐⭐⭐ | ❌ | Gratuit |
| Bolls Life | Facile | ⭐⭐⭐⭐ | ❌ | Gratuit |
| Bible Locale | Facile | ⭐⭐⭐⭐⭐ | ✅ | Gratuit |
| Hybride + Cache | Difficile | ⭐⭐⭐⭐⭐ | ✅ | Gratuit |

## Recommandation Finale 🎯

**Pour une solution rapide:**
1. Ajouter Bolls Life API comme fallback
2. Implémenter le cache AsyncStorage
3. Garder les données locales pour offline

**Pour une solution complète:**
1. S'inscrire à API.Bible
2. Implémenter le système hybride
3. Télécharger la Bible complète en local
4. Ajouter le cache pour performance

Veux-tu que j'implémente une de ces solutions maintenant?
