import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BibleChaptersScreen({ route, navigation }) {
  const { book } = route.params;
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{book.name}</Text>
            <Text style={styles.headerSubtitle}>{book.chapters} chapitres</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.chaptersGrid}>
          {chapters.map(chapter => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterCard}
              onPress={() => navigation.navigate('BibleReader', { book, chapter })}
            >
              <Text style={styles.chapterNumber}>{chapter}</Text>
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
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: 2 },
  placeholder: { width: 44 },
  content: { flex: 1 },
  chaptersGrid: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chapterCard: { width: 70, height: 70, backgroundColor: '#FFF', borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' },
  chapterNumber: { fontSize: 22, fontWeight: '800', color: '#7C3AED', letterSpacing: -0.5 }
});
