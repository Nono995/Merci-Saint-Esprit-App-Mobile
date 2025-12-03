import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listenAllContent } from '../services/contentService';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, MOCK_VIDEOS, MOCK_PODCASTS, MOCK_TESTIMONIES, MOCK_EVENTS, CATEGORY_COLORS } from '../constants/theme';
import VideoCard from '../components/VideoCard';
import PodcastCard from '../components/PodcastCard';
import EventCard from '../components/EventCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [videos, setVideos] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = listenAllContent((content) => {
      if (content.length === 0) {
        // Séparer les contenus par type
        setVideos(MOCK_VIDEOS);
        setPodcasts(MOCK_PODCASTS);
        setEvents(MOCK_EVENTS);
        setPosts([...MOCK_VIDEOS, ...MOCK_PODCASTS, ...MOCK_TESTIMONIES]);
      } else {
        const videoContent = content.filter(item => item.type === 'video');
        const audioContent = content.filter(item => item.type === 'audio');
        setVideos(videoContent);
        setPodcasts(audioContent);
        setPosts(content);
      }
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const categories = [
    { id: 1, label: 'Vidéos', icon: 'play-circle', screen: 'Videos', bg: CATEGORY_COLORS.video.bg, color: CATEGORY_COLORS.video.text },
    { id: 2, label: 'Podcast', icon: 'headset', screen: 'Podcast', bg: CATEGORY_COLORS.audio.bg, color: CATEGORY_COLORS.audio.text },
    { id: 3, label: 'Témoignages', icon: 'heart', screen: 'Testimony', bg: CATEGORY_COLORS.testimony.bg, color: CATEGORY_COLORS.testimony.text },
    { id: 4, label: 'Événements', icon: 'calendar', screen: 'Events', bg: CATEGORY_COLORS.event.bg, color: CATEGORY_COLORS.event.text },
  ];

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => navigation.navigate(category.screen)}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryContent, { backgroundColor: category.bg }]}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color={COLORS.textInverse} />
        </View>
        <Text style={styles.categoryLabel}>{category.label}</Text>
        <Text style={styles.categorySubtitle}>Découvrir</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title, actionText, onActionPress) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionText && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Bonjour 👋</Text>
            <Text style={styles.headerSubtitle}>Que souhaitez-vous découvrir aujourd'hui ?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <View style={styles.notificationDot} />
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.textTertiary} />
          <Text style={styles.searchPlaceholder}>Rechercher...</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(renderCategoryCard)}
          </View>
        </View>

        {/* Section Vidéos */}
        {videos.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader('Vidéos Récentes', 'Voir tout', () => navigation.navigate('Videos'))}
            <View style={styles.videoList}>
              {videos.slice(0, 3).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPress={() => navigation.navigate('VideoPlayer', { post: video })}
                />
              ))}
            </View>
          </View>
        )}

        {/* Section Événements */}
        {events.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader('Événements à Venir', 'Voir tout', () => navigation.navigate('Events'))}
            <View style={styles.eventList}>
              {events.slice(0, 3).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigation.navigate('Events')}
                />
              ))}
            </View>
          </View>
        )}

        {/* Section Podcasts */}
        {podcasts.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader('Podcasts', 'Voir tout', () => navigation.navigate('Podcast'))}
            <View style={styles.podcastList}>
              {podcasts.slice(0, 3).map((podcast, idx) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  index={idx}
                />
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="inbox-outline" size={56} color={COLORS.textTertiary} />
            <Text style={styles.emptyTitle}>Aucun contenu disponible</Text>
            <Text style={styles.emptyText}>Revenez bientôt pour découvrir de nouveaux contenus</Text>
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
    alignItems: 'flex-start',
    marginBottom: SPACING.base,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '400',
  },
  notificationBtn: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    paddingHorizontal: SPACING.base,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  searchPlaceholder: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.base,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryCard: {
    width: (width - SPACING.base * 3) / 2,
  },
  categoryContent: {
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  videoList: {
    gap: SPACING.base,
  },
  podcastList: {
    gap: SPACING.sm,
  },
  eventList: {
    gap: SPACING.sm,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
