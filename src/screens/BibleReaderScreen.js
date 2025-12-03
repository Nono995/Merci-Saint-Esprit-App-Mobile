import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share, Linking, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { loadChapter } from '../data/bibleData';
import { fetchChapter } from '../services/bibleApi';

export default function BibleReaderScreen({ route, navigation }) {
  const { book, chapter } = route.params;
  const [verses, setVerses] = useState({});
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVerses = async () => {
      setLoading(true);
      try {
        // Essayer l'API d'abord
        const apiVerses = await fetchChapter(book.id, chapter);
        if (apiVerses && Object.keys(apiVerses).length > 0) {
          setVerses(apiVerses);
        } else {
          // Fallback sur données locales
          const localVerses = await loadChapter(book.id, chapter);
          if (localVerses && Object.keys(localVerses).length > 0) {
            setVerses(localVerses);
          } else {
            setVerses({ 1: 'Chapitre non disponible.' });
          }
        }
      } catch (error) {
        setVerses({ 1: 'Erreur de chargement.' });
      }
      setLoading(false);
    };
    loadVerses();
  }, [book.id, chapter]);

  const toggleVerse = (verseNum) => {
    setSelectedVerses(prev =>
      prev.includes(verseNum) ? prev.filter(v => v !== verseNum) : [...prev, verseNum].sort((a, b) => a - b)
    );
  };

  const shareToWhatsApp = async () => {
    if (selectedVerses.length === 0) {
      Alert.alert('Sélection vide', 'Veuillez sélectionner au moins un verset');
      return;
    }
    const text = selectedVerses.map(v => `${book.name} ${chapter}:${v}\n${verses[v]}`).join('\n\n');
    const message = `📖 ${text}\n\n🙏 Partagé depuis Merci Saint-Esprit`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Erreur', 'WhatsApp n\'est pas installé');
    }
  };

  const shareGeneral = async () => {
    if (selectedVerses.length === 0) {
      Alert.alert('Sélection vide', 'Veuillez sélectionner au moins un verset');
      return;
    }
    const text = selectedVerses.map(v => `${book.name} ${chapter}:${v}\n${verses[v]}`).join('\n\n');
    await Share.share({ message: `📖 ${text}\n\n🙏 Partagé depuis Merci Saint-Esprit` });
  };

  const saveBookmark = () => {
    Alert.alert('Signet ajouté', `${book.name} ${chapter} a été ajouté à vos signets`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{book.name} {chapter}</Text>
            <Text style={styles.headerSubtitle}>{Object.keys(verses).length} versets</Text>
          </View>
          <TouchableOpacity onPress={saveBookmark} style={styles.bookmarkBtn}>
            <Ionicons name="bookmark-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {selectedVerses.length > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText}>{selectedVerses.length} verset(s) sélectionné(s)</Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity onPress={shareToWhatsApp} style={styles.actionBtn}>
              <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareGeneral} style={styles.actionBtn}>
              <Ionicons name="share-social" size={20} color="#7C3AED" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedVerses([])} style={styles.actionBtn}>
              <Ionicons name="close" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>Chargement des versets...</Text>
          </View>
        ) : Object.keys(verses).length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>Aucun verset disponible</Text>
          </View>
        ) : (
          Object.entries(verses).map(([verseNum, text]) => (
            <TouchableOpacity
              key={verseNum}
              style={[styles.verseContainer, selectedVerses.includes(parseInt(verseNum)) && styles.verseSelected]}
              onPress={() => toggleVerse(parseInt(verseNum))}
              activeOpacity={0.7}
            >
              <Text style={styles.verseNumber}>{verseNum}</Text>
              <Text style={[styles.verseText, { fontSize }]}>{text}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setFontSize(Math.max(12, fontSize - 2))} style={styles.fontBtn}>
          <Ionicons name="remove-circle-outline" size={24} color="#7C3AED" />
        </TouchableOpacity>
        <Text style={styles.fontLabel}>Taille: {fontSize}px</Text>
        <TouchableOpacity onPress={() => setFontSize(Math.min(24, fontSize + 2))} style={styles.fontBtn}>
          <Ionicons name="add-circle-outline" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', letterSpacing: -0.3 },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: 2 },
  bookmarkBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  selectionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  selectionText: { fontSize: 14, fontWeight: '700', color: '#7C3AED', letterSpacing: -0.2 },
  selectionActions: { flexDirection: 'row', gap: 12 },
  actionBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  content: { flex: 1, padding: 20 },
  verseContainer: { flexDirection: 'row', marginBottom: 18, padding: 14, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F3F4F6' },
  verseSelected: { backgroundColor: '#EDE9FE', borderColor: '#7C3AED', borderWidth: 2 },
  verseNumber: { fontSize: 14, fontWeight: '800', color: '#7C3AED', marginRight: 12, minWidth: 24 },
  verseText: { flex: 1, lineHeight: 26, color: '#374151', fontWeight: '500' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  loadingText: { marginTop: 16, fontSize: 15, color: '#6B7280', fontWeight: '600' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { marginTop: 16, fontSize: 15, color: '#9CA3AF', fontWeight: '600' },
  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB', gap: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  fontBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  fontLabel: { fontSize: 14, fontWeight: '700', color: '#6B7280', letterSpacing: -0.2 }
});
