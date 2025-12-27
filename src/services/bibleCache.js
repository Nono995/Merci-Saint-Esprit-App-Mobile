// Service de cache pour la Bible avec AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'bible_cache_';
const CACHE_VERSION = 'v1_';
const CACHE_EXPIRY_DAYS = 30; // Les chapitres sont valides 30 jours

/**
 * Génère une clé de cache unique
 */
const getCacheKey = (bookId, chapter) => {
  return `${CACHE_PREFIX}${CACHE_VERSION}${bookId}_${chapter}`;
};

/**
 * Sauvegarde un chapitre dans le cache
 * @param {string} bookId - ID du livre
 * @param {number} chapter - Numéro du chapitre
 * @param {Object} verses - Objet des versets
 */
export const saveBibleCache = async (bookId, chapter, verses) => {
  try {
    const key = getCacheKey(bookId, chapter);
    const data = {
      verses,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`💾 Cache sauvegardé: ${bookId} ${chapter}`);
  } catch (error) {
    console.error('Erreur sauvegarde cache:', error);
  }
};

/**
 * Récupère un chapitre depuis le cache
 * @param {string} bookId - ID du livre
 * @param {number} chapter - Numéro du chapitre
 * @returns {Promise<Object|null>} - Versets ou null si non trouvé/expiré
 */
export const getBibleCache = async (bookId, chapter) => {
  try {
    const key = getCacheKey(bookId, chapter);
    const cached = await AsyncStorage.getItem(key);
    
    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached);
    
    // Vérifier l'expiration
    const age = Date.now() - data.timestamp;
    const maxAge = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    if (age > maxAge) {
      // Cache expiré, le supprimer
      await AsyncStorage.removeItem(key);
      console.log(`🗑️ Cache expiré: ${bookId} ${chapter}`);
      return null;
    }

    console.log(`📦 Cache trouvé: ${bookId} ${chapter}`);
    return data.verses;

  } catch (error) {
    console.error('Erreur lecture cache:', error);
    return null;
  }
};

/**
 * Supprime un chapitre du cache
 */
export const clearBibleCache = async (bookId, chapter) => {
  try {
    const key = getCacheKey(bookId, chapter);
    await AsyncStorage.removeItem(key);
    console.log(`🗑️ Cache supprimé: ${bookId} ${chapter}`);
  } catch (error) {
    console.error('Erreur suppression cache:', error);
  }
};

/**
 * Supprime tout le cache de la Bible
 */
export const clearAllBibleCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const bibleKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    await AsyncStorage.multiRemove(bibleKeys);
    console.log(`🗑️ ${bibleKeys.length} chapitres supprimés du cache`);
  } catch (error) {
    console.error('Erreur suppression cache complet:', error);
  }
};

/**
 * Obtient la taille du cache
 */
export const getCacheSize = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const bibleKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    return bibleKeys.length;
  } catch (error) {
    console.error('Erreur calcul taille cache:', error);
    return 0;
  }
};
