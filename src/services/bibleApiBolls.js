// API Bolls.Life - Gratuite, sans clé, bonne couverture
const BASE_URL = 'https://bolls.life/get-text';

// Mapping des IDs de livres pour Bolls Life API
const BOOK_MAPPING = {
  // Ancien Testament
  'gen': 'GEN', 'exo': 'EXO', 'lev': 'LEV', 'nom': 'NUM', 'deu': 'DEU',
  'jos': 'JOS', 'jug': 'JDG', 'rut': 'RUT', '1sa': '1SA', '2sa': '2SA',
  '1ro': '1KI', '2ro': '2KI', '1ch': '1CH', '2ch': '2CH', 'esd': 'EZR',
  'neh': 'NEH', 'est': 'EST', 'job': 'JOB', 'psa': 'PSA', 'pro': 'PRO',
  'ecc': 'ECC', 'can': 'SNG', 'isa': 'ISA', 'jer': 'JER',
  'lam': 'LAM', 'eze': 'EZK', 'dan': 'DAN', 'ose': 'HOS', 'joe': 'JOL',
  'amo': 'AMO', 'abd': 'OBA', 'jon': 'JON', 'mic': 'MIC', 'nah': 'NAM',
  'hab': 'HAB', 'sop': 'ZEP', 'agg': 'HAG', 'zac': 'ZEC', 'mal': 'MAL',

  // Nouveau Testament
  'mat': 'MAT', 'mar': 'MRK', 'luc': 'LUK', 'jea': 'JHN', 'act': 'ACT',
  'rom': 'ROM', '1co': '1CO', '2co': '2CO', 'gal': 'GAL',
  'eph': 'EPH', 'phi': 'PHP', 'col': 'COL', '1th': '1TH',
  '2th': '2TH', '1ti': '1TI', '2ti': '2TI', 'tit': 'TIT',
  'phm': 'PHM', 'heb': 'HEB', 'jam': 'JAS', '1pe': '1PE', '2pe': '2PE',
  '1jo': '1JN', '2jo': '2JN', '3jo': '3JN', 'jud': 'JUD', 'rev': 'REV'
};

export const fetchChapterBolls = async (bookId, chapter) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) {
      return null;
    }

    // Bolls Life API format: /get-text/{book}/{chapter}/{verses}/{translation}/
    // On demande les versets 1-200 pour couvrir tous les chapitres
    const url = `${BASE_URL}/${apiBookId}/${chapter}/1-200/LSG/`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (!data || data.length === 0) return null;

    // Convertir le format Bolls en format attendu
    const verses = {};
    data.forEach(item => {
      if (item.verse && item.text) {
        verses[item.verse] = item.text.trim();
      }
    });

    return Object.keys(verses).length > 0 ? verses : null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name !== 'AbortError') {
      console.error('Erreur Bolls API:', error.message);
    }
    return null;
  }
};
