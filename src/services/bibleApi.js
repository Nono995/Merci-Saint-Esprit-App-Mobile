// API Bible-api.com - Ultra rapide, gratuite, sans clé
const BASE_URL = 'https://bible-api.com';

// Mapping des IDs de livres (noms anglais)
const BOOK_MAPPING = {
  'gen': 'genesis', 'exo': 'exodus', 'lev': 'leviticus', 'nom': 'numbers', 'deu': 'deuteronomy',
  'jos': 'joshua', 'jug': 'judges', 'rut': 'ruth', '1sa': '1samuel', '2sa': '2samuel',
  '1ro': '1kings', '2ro': '2kings', 'psa': 'psalms', 'pro': 'proverbs', 'ecc': 'ecclesiastes',
  'can': 'song+of+solomon', 'isa': 'isaiah', 'jer': 'jeremiah', 'mat': 'matthew', 'mar': 'mark',
  'luc': 'luke', 'jea': 'john', 'act': 'acts', 'rom': 'romans', '1co': '1corinthians',
  '2co': '2corinthians', 'gal': 'galatians', 'eph': 'ephesians', 'phi': 'philippians', 'col': 'colossians',
  '1th': '1thessalonians', '2th': '2thessalonians', '1ti': '1timothy', '2ti': '2timothy', 'tit': 'titus',
  'heb': 'hebrews', 'jam': 'james', '1pe': '1peter', '2pe': '2peter', '1jo': '1john',
  'rev': 'revelation'
};

export const fetchChapter = async (bookId, chapter) => {
  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) return null;

    const url = `${BASE_URL}/${apiBookId}+${chapter}?translation=lsg`;
    const response = await fetch(url);
    
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.verses || data.verses.length === 0) return null;

    const verses = {};
    data.verses.forEach(verse => {
      const verseNum = verse.verse;
      verses[verseNum] = verse.text;
    });

    return verses;
  } catch (error) {
    return null;
  }
};

export const searchVerses = async (query) => {
  return [];
};
