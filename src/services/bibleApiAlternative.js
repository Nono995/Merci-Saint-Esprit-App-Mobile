// API Alternative - getbible.net (Gratuite, fiable, sans clé)
const BASE_URL = 'https://getbible.net/json';

// Mapping des IDs de livres pour GetBible API
const BOOK_MAPPING = {
  // Ancien Testament
  'gen': '01', 'exo': '02', 'lev': '03', 'nom': '04', 'deu': '05',
  'jos': '06', 'jug': '07', 'rut': '08', '1sa': '09', '2sa': '10',
  '1ro': '11', '2ro': '12', '1ch': '13', '2ch': '14', 'esd': '15',
  'neh': '16', 'est': '17', 'job': '18', 'psa': '19', 'pro': '20',
  'ecc': '21', 'can': '22', 'isa': '23', 'jer': '24',
  'lam': '25', 'eze': '26', 'dan': '27', 'ose': '28', 'joe': '29',
  'amo': '30', 'abd': '31', 'jon': '32', 'mic': '33', 'nah': '34',
  'hab': '35', 'sop': '36', 'agg': '37', 'zac': '38', 'mal': '39',

  // Nouveau Testament
  'mat': '40', 'mar': '41', 'luc': '42', 'jea': '43', 'act': '44',
  'rom': '45', '1co': '46', '2co': '47', 'gal': '48',
  'eph': '49', 'phi': '50', 'col': '51', '1th': '52',
  '2th': '53', '1ti': '54', '2ti': '55', 'tit': '56',
  'phm': '57', 'heb': '58', 'jam': '59', '1pe': '60', '2pe': '61',
  '1jo': '62', '2jo': '63', '3jo': '64', 'jud': '65', 'rev': '66'
};

export const fetchChapterAlternative = async (bookId, chapter) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const apiBookId = BOOK_MAPPING[bookId];
    if (!apiBookId) {
      return null;
    }

    // GetBible format: /json?passage={book}{chapter}&version=lsg
    const url = `${BASE_URL}?passage=${apiBookId}${chapter.toString().padStart(3, '0')}&version=lsg`;
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    
    // GetBible retourne du JSONP, on doit extraire le JSON
    const jsonMatch = text.match(/\((.*)\)/s);
    if (!jsonMatch) return null;
    
    const data = JSON.parse(jsonMatch[1]);
    
    if (!data || !data.book || !data.book[0] || !data.book[0].chapter) {
      return null;
    }

    const chapterData = data.book[0].chapter;
    const verses = {};
    
    // Convertir le format GetBible en format attendu
    Object.keys(chapterData).forEach(verseNum => {
      const verseData = chapterData[verseNum];
      if (verseData && verseData.verse) {
        verses[verseNum] = verseData.verse.trim();
      }
    });

    return Object.keys(verses).length > 0 ? verses : null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name !== 'AbortError') {
      console.error('Erreur GetBible API:', error.message);
    }
    return null;
  }
};
