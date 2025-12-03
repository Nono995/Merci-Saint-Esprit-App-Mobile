import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BIBLE_BOOKS } from '../data/bibleData';

export default function BibleScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTestament, setActiveTestament] = useState('all');

  const filteredBooks = BIBLE_BOOKS.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = activeTestament === 'all' || book.testament === activeTestament;
    return matchesSearch && matchesTestament;
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>La Bible</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BibleBookmarks')} style={styles.bookmarkBtn}>
            <Ionicons name="bookmark" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un livre..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.tabsContainer}>
          {[
            { id: 'all', label: 'Tous' },
            { id: 'AT', label: 'Ancien Testament' },
            { id: 'NT', label: 'Nouveau Testament' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTestament === tab.id && styles.tabActive]}
              onPress={() => setActiveTestament(tab.id)}
            >
              <Text style={[styles.tabText, activeTestament === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.booksGrid}>
          {filteredBooks.map(book => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => navigation.navigate('BibleChapters', { book })}
            >
              <View style={[styles.bookIcon, { backgroundColor: book.testament === 'AT' ? '#3B82F620' : '#7C3AED20' }]}>
                <Ionicons name="book" size={24} color={book.testament === 'AT' ? '#3B82F6' : '#7C3AED'} />
              </View>
              <Text style={styles.bookName}>{book.name}</Text>
              <Text style={styles.bookChapters}>{book.chapters} chapitres</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 18 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  bookmarkBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, marginHorizontal: 20, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#FFF', fontWeight: '500' },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 8 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)' },
  tabActive: { backgroundColor: '#FFF' },
  tabText: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: -0.2 },
  tabTextActive: { color: '#7C3AED' },
  content: { flex: 1 },
  booksGrid: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bookCard: { width: '47%', backgroundColor: '#FFF', borderRadius: 18, padding: 18, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
  bookIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bookName: { fontSize: 15, fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: 4, letterSpacing: -0.2 },
  bookChapters: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' }
});
