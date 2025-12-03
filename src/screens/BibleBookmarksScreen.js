import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BibleBookmarksScreen({ navigation }) {
  const [bookmarks] = useState([
    { id: 1, book: 'Jean', chapter: 3, verse: 16, date: 'Aujourd\'hui' },
    { id: 2, book: 'Psaumes', chapter: 23, verse: 1, date: 'Hier' },
    { id: 3, book: 'Romains', chapter: 8, verse: 28, date: '2 jours' },
    { id: 4, book: 'Philippiens', chapter: 4, verse: 13, date: '1 semaine' }
  ]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mes Signets</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {bookmarks.map(bookmark => (
          <TouchableOpacity key={bookmark.id} style={styles.bookmarkCard}>
            <View style={styles.bookmarkIcon}>
              <Ionicons name="bookmark" size={24} color="#7C3AED" />
            </View>
            <View style={styles.bookmarkInfo}>
              <Text style={styles.bookmarkTitle}>{bookmark.book} {bookmark.chapter}:{bookmark.verse}</Text>
              <Text style={styles.bookmarkDate}>{bookmark.date}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerTitle: { flex: 1, fontSize: 24, fontWeight: '800', color: '#FFF', textAlign: 'center', letterSpacing: -0.5 },
  placeholder: { width: 44 },
  content: { flex: 1, padding: 16 },
  bookmarkCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 18, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
  bookmarkIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EDE9FE', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  bookmarkInfo: { flex: 1 },
  bookmarkTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4, letterSpacing: -0.2 },
  bookmarkDate: { fontSize: 13, color: '#9CA3AF', fontWeight: '600' }
});
