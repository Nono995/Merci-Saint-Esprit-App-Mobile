import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tout', icon: 'apps' },
    { id: 'videos', label: 'Vidéos', icon: 'play-circle' },
    { id: 'bible', label: 'Bible', icon: 'book' },
    { id: 'testimonies', label: 'Témoignages', icon: 'heart' }
  ];

  const recentSearches = ['Jean 3:16', 'Culte du Dimanche', 'Prière', 'Psaume 23'];
  
  const results = query.length > 0 ? [
    { id: 1, type: 'video', title: 'Culte du Dimanche - Message sur l\'Espoir', category: 'Vidéos', icon: 'play-circle' },
    { id: 2, type: 'bible', title: 'Jean 3:16 - Car Dieu a tant aimé le monde...', category: 'Bible', icon: 'book' },
    { id: 3, type: 'testimony', title: 'Témoignage de guérison miraculeuse', category: 'Témoignages', icon: 'heart' },
    { id: 4, type: 'podcast', title: 'Méditation quotidienne - La Foi', category: 'Podcasts', icon: 'headset' }
  ] : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, activeFilter === filter.id && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Ionicons name={filter.icon} size={18} color={activeFilter === filter.id ? '#FFF' : '#6B7280'} />
            <Text style={[styles.filterText, activeFilter === filter.id && styles.filterTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {query.length > 0 ? (
          <View>
            <Text style={styles.resultsTitle}>Résultats ({`${results.length}`})</Text>
            {results.map(result => (
              <TouchableOpacity key={result.id} style={styles.resultCard}>
                <View style={styles.resultIcon}>
                  <Ionicons name={result.icon} size={24} color="#7C3AED" />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <Text style={styles.resultCategory}>{result.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Recherches récentes</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity key={index} style={styles.recentItem} onPress={() => setQuery(search)}>
                <Ionicons name="time-outline" size={20} color="#9CA3AF" />
                <Text style={styles.recentText}>{search}</Text>
                <TouchableOpacity>
                  <Ionicons name="close" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Recherchez des vidéos, versets,</Text>
              <Text style={styles.emptyText}>témoignages, podcasts...</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16, gap: 12 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#111827', fontWeight: '500' },
  cancelText: { fontSize: 15, fontWeight: '700', color: '#7C3AED' },
  filtersContainer: { paddingHorizontal: 16, marginBottom: 16 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, marginRight: 10, borderWidth: 1, borderColor: '#E5E7EB', gap: 6 },
  filterChipActive: { backgroundColor: '#7C3AED', borderColor: '#7C3AED' },
  filterText: { fontSize: 14, fontWeight: '700', color: '#6B7280' },
  filterTextActive: { color: '#FFF' },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#6B7280', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  recentItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#F3F4F6' },
  recentText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#111827', marginLeft: 12 },
  resultsTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 16, letterSpacing: -0.3 },
  resultCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 18, padding: 18, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
  resultIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EDE9FE', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4, letterSpacing: -0.2 },
  resultCategory: { fontSize: 13, color: '#7C3AED', fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, marginTop: 40 },
  emptyText: { fontSize: 15, color: '#9CA3AF', marginTop: 4, fontWeight: '600', textAlign: 'center' }
});
