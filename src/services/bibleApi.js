// API getbible.net - Supporte LSG (Louis Segond)
const BASE_URL = 'https://getbible.net/v2/lsg';

// Mapping des IDs de livres pour getbible.net (nombres 1-66)
const BOOK_ID_MAPPING = {
  'gen': 1, 'exo': 2, 'lev': 3, 'nom': 4, 'deu': 5, 'jos': 6, 'jug': 7, 'rut': 8, '1sa': 9, '2sa': 10,
  '1ro': 11, '2ro': 12, '1ch': 13, '2ch': 14, 'esd': 15, 'neh': 16, 'est': 17, 'job': 18, 'psa': 19, 'pro': 20,
  'ecc': 21, 'can': 22, 'isa': 23, 'jer': 24, 'lam': 25, 'eze': 26, 'dan': 27, 'ose': 28, 'joe': 29, 'amo': 30,
  'abd': 31, 'jon': 32, 'mic': 33, 'nah': 34, 'hab': 35, 'sop': 36, 'agg': 37, 'zac': 38, 'mal': 39,
  'mat': 40, 'mar': 41, 'luc': 42, 'jea': 43, 'act': 44, 'rom': 45, '1co': 46, '2co': 47, 'gal': 48, 'eph': 49,
  'phi': 50, 'col': 51, '1th': 52, '2th': 53, '1ti': 54, '2ti': 55, 'tit': 56, 'phm': 57, 'heb': 58, 'jam': 59,
  '1pe': 60, '2pe': 61, '1jo': 62, '2jo': 63, '3jo': 64, 'jud': 65, 'rev': 66
};

export const fetchChapter = async (bookId, chapter) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const numericBookId = BOOK_ID_MAPPING[bookId];
    if (!numericBookId) {
      console.warn(`Livre non supporté par mapping: ${bookId}`);
      return null;
    }

    const url = `${BASE_URL}/${numericBookId}/${chapter}.json`;
    console.log(`Fetching from GetBible: ${url}`);
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error(`Erreur API GetBible: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (!data.verses || data.verses.length === 0) return null;

    const verses = {};
    data.verses.forEach(v => {
      const cleanText = v.text.replace(/<\/?[^>]+(>|$)/g, "").trim();
      verses[v.verse] = cleanText;
    });

    return verses;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Erreur lors du fetch GetBible:', error);
    return null;
  }
};

export const searchVerses = async (query) => {
  return [];
};
