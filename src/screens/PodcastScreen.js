import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listenContentByType } from '../services/contentService';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, MOCK_PODCASTS } from '../constants/theme';
import PodcastCard from '../components/PodcastCard';

export default function PodcastScreen({ navigation }) {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'compact', 'featured'

  useEffect(() => {
    const unsubscribe = listenContentByType('audio', (content) => {
      if (content.length === 0) {
        setPodcasts(MOCK_PODCASTS);
      } else {
        setPodcasts(content);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredPodcasts = podcasts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewModes = [
    { id: 'grid', icon: 'grid-outline', label: 'Grille' },
    { id: 'list', icon: 'list-outline', label: 'Liste' },
    { id: 'compact', icon: 'reorder-four-outline', label: 'Compact' },
    { id: 'featured', icon: 'star-outline', label: 'Vedette' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Podcasts</Text>
            <Text style={styles.headerCount}>
              {filteredPodcasts.length} épisode{filteredPodcasts.length > 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddContent')}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un podcast..."
            placeholderTextColor={COLORS.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.6}>
              <Ionicons name="close-circle" size={20} color={COLORS.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* View Mode Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.viewModeContainer}
        >
          {viewModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.viewModeButton,
                viewMode === mode.id && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode(mode.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={mode.icon}
                size={18}
                color={viewMode === mode.id ? COLORS.primary : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.viewModeText,
                  viewMode === mode.id && styles.viewModeTextActive,
                ]}
              >
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredPodcasts.length > 0 ? (
          <View style={styles.podcastsContainer}>
            {viewMode === 'grid' && (
              <View style={styles.gridView}>
                {filteredPodcasts.map((podcast, index) => (
                  <View key={podcast.id} style={styles.gridItem}>
                    <PodcastCard podcast={podcast} index={index} />
                  </View>
                ))}
              </View>
            )}

            {viewMode === 'list' && (
              <View style={styles.listView}>
                {filteredPodcasts.map((podcast, index) => (
                  <PodcastCard key={podcast.id} podcast={podcast} index={index} />
                ))}
              </View>
            )}

            {viewMode === 'compact' && (
              <View style={styles.compactView}>
                {filteredPodcasts.map((podcast, index) => (
                  <View key={podcast.id} style={styles.compactItem}>
                    <PodcastCard podcast={podcast} index={index} />
                  </View>
                ))}
              </View>
            )}

            {viewMode === 'featured' && (
              <View style={styles.featuredView}>
                {filteredPodcasts.map((podcast, index) => (
                  <PodcastCard key={podcast.id} podcast={podcast} index={index} />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="headset-outline" size={56} color={COLORS.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Aucun podcast trouvé</Text>
            <Text style={styles.emptyText}>Essayez une autre recherche</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.resetBtnText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    backgroundColor: COLORS.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  headerCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: FONT_WEIGHTS.normal,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: 12,
    gap: SPACING.sm,
    marginBottom: SPACING.base,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    padding: 0,
  },
  viewModeContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray50,
  },
  viewModeButtonActive: {
    backgroundColor: COLORS.primaryBg,
  },
  viewModeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  viewModeTextActive: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.xxxl,
  },
  podcastsContainer: {
    padding: SPACING.base,
  },
  // Grid View (2 colonnes)
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.base,
  },
  gridItem: {
    width: '48%',
  },
  // List View (1 colonne, pleine largeur)
  listView: {
    gap: SPACING.base,
  },
  // Compact View (2 colonnes, plus petit)
  compactView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  compactItem: {
    width: '48.5%',
  },
  // Featured View (1 colonne, grande taille)
  featuredView: {
    gap: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: SPACING.base,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.base,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.base,
  },
  resetBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  resetBtnText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
