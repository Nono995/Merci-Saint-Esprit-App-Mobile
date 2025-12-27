// Bible API Deno - API gratuite avec support de 200+ versions
// Documentation: https://github.com/wldeh/bible-api

const BASE_URL = 'https://bible-api.deno.dev/api';
const VERSION = 'LSG'; // Louis Segond 1910

// Mapping des IDs de livres vers les noms anglais requis par l'API
const BOOK_MAPPING = {
  // Ancien Testament
  'gen': 'Genesis', 'exo': 'Exodus', 'lev': 'Leviticus', 'nom': 'Numbers', 'deu': 'Deuteronomy',
  'jos': 'Joshua', 'jug': 'Judges', 'rut': 'Ruth', '1sa': '1Samuel', '2sa': '2Samuel',
  '1ro': '1Kings', '2ro': '2Kings', '1ch': '1Chronicles', '2ch': '2Chronicles', 'esd': 'Ezra',
  'neh': 'Nehemiah', 'est': 'Esther', 'job': 'Job', 'psa': 'Psalms', 'pro': 'Proverbs',
  'ecc': 'Ecclesiastes', 'can': 'SongofSolomon', 'isa': 'Isaiah', 'jer': 'Jeremiah',
  'lam': 'Lamentations', 'eze': 'Ezekiel', 'dan': 'Daniel', 'ose': 'Hosea', 'joe': 'Joel',
  'amo': 'Amos', 'abd': 'Obadiah', 'jon': 'Jonah', 'mic': 'Micah', 'nah': 'Nahum',
  'hab': 'Habakkuk', 'sop': 'Zephaniah', 'agg': 'Haggai', 'zac': 'Zechariah', 'mal': 'Malachi',

  // Nouveau Testament
  'mat': 'Matthew', 'mar': 'Mark', 'luc': 'Luke', 'jea': 'John', 'act': 'Acts',
  'rom': 'Romans', '1co': '1Corinthians', '2co': '2Corinthians', 'gal': 'Galatians',
  'eph': 'Ephesians', 'phi': 'Philippians', 'col': 'Colossians', '1th': '1Thessalonians',
  '2th': '2Thessalonians', '1ti': '1Timothy', '2ti': '2Timothy', 'tit': 'Titus',
  'phm': 'Philemon', 'heb': 'Hebrews', 'jam': 'James', '1pe': '1Peter', '2pe': '2Peter',
  '1jo': '1John', '2jo': '2John', '3jo': '3John', 'jud': 'Jude', 'rev': 'Revelation'
};

/**
 * Récupère un chapitre complet de la Bible
 * @param {string} bookId - ID du livre (ex: 'gen', 'mat')
 * @param {number} chapter - Numéro du chapitre
 * @returns {Promise<Object|null>} - Objet avec les versets {1: "texte", 2: "texte", ...}
 */
export const fetchChapterDeno = async (bookId, chapter) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 secondes

  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) {
      console.warn(`Livre non supporté: ${bookId}`);
      return null;
    }

    const url = `${BASE_URL}/read/${VERSION}/${apiBookId}/${chapter}`;
    console.log(`📖 Fetching from Deno API: ${apiBookId} ${chapter}`);
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status >= 500) {
        console.error(`Erreur API Deno: ${response.status}`);
      }
      return null;
    }

    const data = await response.json();
    
    // Vérifier la structure de la réponse
    if (!data || !data.verses || !Array.isArray(data.verses)) {
      console.warn('Format de réponse invalide');
      return null;
    }

    // Convertir le format de l'API en format attendu par l'app
    const verses = {};
    data.verses.forEach(verse => {
      if (verse.verse && verse.text) {
        verses[verse.verse] = verse.text.trim();
      }
    });

    if (Object.keys(verses).length === 0) {
      return null;
    }

    console.log(`✅ Chargé ${Object.keys(verses).length} versets depuis Deno API`);
    return verses;

  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error('Timeout API Deno');
    } else {
      console.error('Erreur API Deno:', error.message);
    }
    return null;
  }
};

/**
 * Récupère un verset spécifique
 * @param {string} bookId - ID du livre
 * @param {number} chapter - Numéro du chapitre
 * @param {number} verse - Numéro du verset
 * @returns {Promise<string|null>} - Texte du verset
 */
export const fetchVerseDeno = async (bookId, chapter, verse) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) return null;

    const url = `${BASE_URL}/read/${VERSION}/${apiBookId}/${chapter}/${verse}`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) return null;

    const data = await response.json();
    return data?.text?.trim() || null;

  } catch (error) {
    clearTimeout(timeoutId);
    return null;
  }
};

/**
 * Récupère la liste des versions disponibles
 * @returns {Promise<Array>} - Liste des versions
 */
export const fetchVersions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/versions`);
    if (!response.ok) return [];
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Erreur récupération versions:', error);
    return [];
  }
};
