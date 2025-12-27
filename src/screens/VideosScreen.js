import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { listenContentByType } from '../services/contentService';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, MOCK_VIDEOS } from '../constants/theme';
import VideoCard from '../components/VideoCard';

export default function VideosScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  useEffect(() => {
    const unsubscribe = listenContentByType('video', (content) => {
      if (content.length === 0) {
        setVideos(MOCK_VIDEOS);
      } else {
        setVideos(content);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewModes = [
    { id: 'grid', icon: 'grid-outline', label: 'Grille' },
    { id: 'list', icon: 'list-outline', label: 'Liste' },
  ];



  return (
    <View style={styles.container}>
      {/* Header Moderne */}
      <LinearGradient
        colors={['#FFFFFF', '#FAFBFF']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Vidéos</Text>
            <View style={styles.countBadge}>
              <Ionicons name="play-circle" size={14} color="#A855F7" />
              <Text style={styles.countText}>
                {`${filteredVideos.length}`} vidéo{filteredVideos.length > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddContent')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#A855F7', '#7C3AED']}
              style={styles.addGradient}
            >
              <Ionicons name="add" size={24} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search Bar Moderne */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIconBox}>
            <Ionicons name="search-outline" size={18} color="#A855F7" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une vidéo..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')} 
              activeOpacity={0.6}
              style={styles.clearBtn}
            >
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* View Mode Selector - Design épuré */}
        <View style={styles.viewModeContainer}>
          {viewModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.viewModeButton,
                viewMode === mode.id && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode(mode.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={mode.icon}
                size={18}
                color={viewMode === mode.id ? '#A855F7' : '#6B7280'}
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
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredVideos.length > 0 ? (
          <View style={styles.videosContainer}>
            {viewMode === 'grid' && (
              <View style={styles.gridView}>
                {filteredVideos.map((video) => (
                  <View key={video.id} style={styles.gridItem}>
                    <VideoCard
                      video={video}
                      onPress={() => navigation.navigate('VideoPlayer', { post: video })}
                    />
                  </View>
                ))}
              </View>
            )}

            {viewMode === 'list' && (
              <View style={styles.listView}>
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPress={() => navigation.navigate('VideoPlayer', { post: video })}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="videocam-off-outline" size={56} color={COLORS.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Aucune vidéo trouvée</Text>
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
    backgroundColor: '#FAFBFF',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 13,
    color: '#A855F7',
    fontWeight: '700',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
  viewModeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  viewModeButtonActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#A855F7',
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  viewModeTextActive: {
    color: '#A855F7',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  videosContainer: {
    padding: 16,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  gridItem: {
    width: '48%',
  },
  listView: {
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  resetBtn: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  resetBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
