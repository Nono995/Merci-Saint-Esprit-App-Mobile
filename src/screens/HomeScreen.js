import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { listenAllContent, listenDailyMessages } from '../services/contentService';
import { useNotifications } from '../contexts/NotificationContext';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, MOCK_VIDEOS, MOCK_PODCASTS, MOCK_TESTIMONIES, MOCK_EVENTS, CATEGORY_COLORS } from '../constants/theme';
import VideoCard from '../components/VideoCard';
import PodcastCardV3 from '../components/PodcastCardV3';
import EventCard from '../components/EventCard';
import DailyMessageCard from '../components/DailyMessageCard';
import DailyMessageCarousel from '../components/DailyMessageCarousel';

const { width } = Dimensions.get('window');

const STATIC_DAILY_MESSAGES = [
  {
    id: '1',
    title: 'Vivre dans la paix de Dieu',
    message: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous la donne pas comme le monde la donne. Que votre cœur ne se trouble point, et ne s\'alarme point.',
    author: 'Jean 14:27',
    reference: 'Jean 14:27',
    category: 'Paix & Réconfort'
  },
  {
    id: '2',
    title: 'La force dans l\'épreuve',
    message: 'Ne t\'ai-je pas donné cet ordre : Fortifie-toi et prends courage ? Ne t\'effraie point et ne t\'épouvante point, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.',
    author: 'Josué 1:9',
    reference: 'Josué 1:9',
    category: 'Force'
  },
  {
    id: '3',
    title: 'Un avenir rempli d\'espérance',
    message: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.',
    author: 'Jérémie 29:11',
    reference: 'Jérémie 29:11',
    category: 'Espérance'
  }
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dailyMessages, setDailyMessages] = useState(STATIC_DAILY_MESSAGES);

  const [videos, setVideos] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [events, setEvents] = useState([]);
  
  const { unreadCount = 0 } = useNotifications();

  useEffect(() => {
    // Charger immédiatement les données MOCK
    setVideos(MOCK_VIDEOS);
    setPodcasts(MOCK_PODCASTS);
    setEvents(MOCK_EVENTS);
    setPosts([...MOCK_VIDEOS, ...MOCK_PODCASTS, ...MOCK_TESTIMONIES]);

    // Écouter les messages du jour
    const unsubscribeMessages = listenDailyMessages((messages) => {
      if (messages.length > 0) {
        setDailyMessages(messages);
      } else {
        setDailyMessages(STATIC_DAILY_MESSAGES);
      }
    });

    // Puis écouter Firebase
    const unsubscribeContent = listenAllContent((content) => {
      if (content.length > 0) {
        const videoContent = content.filter(item => item.type === 'video');
        const audioContent = content.filter(item => item.type === 'audio');
        const eventContent = content.filter(item => item.type === 'event');
        
        // Utiliser les données réelles si disponibles, sinon garder MOCK
        if (videoContent.length > 0) setVideos(videoContent);
        if (audioContent.length > 0) setPodcasts(audioContent);
        if (eventContent.length > 0) setEvents(eventContent);
        setPosts(content);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeContent();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const categories = [
    { id: 1, label: 'Vidéos', icon: 'play-circle', screen: 'Videos', bg: CATEGORY_COLORS.video.bg, color: CATEGORY_COLORS.video.text, count: videos.length },
    { id: 2, label: 'Podcast', icon: 'headset', screen: 'Podcast', bg: CATEGORY_COLORS.audio.bg, color: CATEGORY_COLORS.audio.text, count: podcasts.length },
    { id: 3, label: 'Bible', icon: 'book', screen: 'Bible', bg: '#F3E8FF', color: '#7C3AED' },
    { id: 4, label: 'Événements', icon: 'calendar', screen: 'Events', bg: CATEGORY_COLORS.event.bg, color: CATEGORY_COLORS.event.text, count: events.length },
  ];

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => navigation.navigate(category.screen)}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryContent, { backgroundColor: category.bg }]}>
        <View style={styles.categoryTop}>
          <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
            <Ionicons name={category.icon} size={28} color={COLORS.textInverse} />
          </View>
          <View style={styles.categoryArrow}>
            <Ionicons name="arrow-forward" size={18} color={category.color} />
          </View>
        </View>
        <View style={styles.categoryBottom}>
          <View style={styles.categoryLabelRow}>
            <Text style={styles.categoryLabel}>{category.label}</Text>
            {category.count > 0 && (
              <View style={[styles.countBadge, { backgroundColor: category.color }]}>
                <Text style={styles.countText}>{`${category.count}`}</Text>
              </View>
            )}
          </View>
          <Text style={styles.categorySubtitle}>Découvrir</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title, actionText, onActionPress, icon) => (
    <View style={styles.sectionHeader}>
      <View style={styles.titleTextWrapper}>
        <Text style={styles.modernTitle}>{title}</Text>
        <View style={styles.modernUnderline} />
      </View>
      {!!actionText && (
        <TouchableOpacity 
          onPress={onActionPress} 
          activeOpacity={0.8}
          style={styles.modernSeeAllButton}
        >
          <Text style={styles.modernSeeAllText}>{actionText}</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background decorative elements */}
      <View style={styles.backgroundDecor}>
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        <View style={styles.decorCircle3} />
      </View>

      {/* Header with gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#FAFBFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.greetingRow}>
              <Text style={styles.headerTitle}>Bonjour</Text>
              <View style={styles.waveEmoji}>
                <Text style={styles.waveText}>👋</Text>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Que souhaitez-vous découvrir aujourd'hui ?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.8}
          >
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadCount > 99 ? '99+' : `${unreadCount}`}
                </Text>
              </View>
            )}
            <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Search')}
        >
          <View style={styles.searchIconWrapper}>
            <Ionicons name="search-outline" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.searchPlaceholder}>Rechercher des contenus...</Text>
          <View style={styles.searchShortcut}>
            <Ionicons name="options-outline" size={18} color={COLORS.textSecondary} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {dailyMessages.length > 0 ? (
          <DailyMessageCarousel 
            messages={dailyMessages}
            onMessagePress={(message) => {
              if (message.action === 'openBible') {
                navigation.navigate('Bible');
              } else {
                console.log('Message pressed:', message);
              }
            }}
          />
        ) : null}

        {/* Alternative: Daily Message Card - Version 1: Single Card */}
        {/* Uncomment to use single card instead of carousel */}
        {/* <DailyMessageCard 
          message={dailyMessages[new Date().getDate() % dailyMessages.length]}
          onPress={() => {
            console.log('Message pressed');
          }}
        /> */}

        <View style={[styles.section, styles.firstSection]}>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.modernTitle}>Catégories</Text>
            <View style={styles.modernUnderline} />
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map(renderCategoryCard)}
          </View>
        </View>

        {/* Section Vidéos */}
        {videos.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader('Vidéos Récentes', 'Voir tout', () => navigation.navigate('Videos'), 'play-circle')}
            <View style={styles.videoList}>
              {videos.slice(0, Math.min(4, Math.max(2, videos.length))).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPress={() => navigation.navigate('VideoPlayer', { post: video })}
                />
              ))}
            </View>
          </View>
        )}

        {/* Section Podcasts */}
        {podcasts.length > 0 && (
          <View style={[styles.section, styles.podcastSection]}>
            {renderSectionHeader('Podcasts', 'Voir tout', () => navigation.navigate('Podcast'), 'headset')}
            <View style={styles.podcastList}>
              {podcasts.slice(0, Math.min(4, Math.max(2, podcasts.length))).map((podcast, idx) => (
                <PodcastCardV3
                  key={podcast.id}
                  podcast={podcast}
                  index={idx}
                  compact={false}
                />
              ))}
            </View>
          </View>
        )}

        {/* Section Événements */}
        {events.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader('Événements à Venir', 'Voir tout', () => navigation.navigate('Events'), 'calendar')}
            <View style={styles.eventList}>
              {events.slice(0, Math.min(4, Math.max(2, events.length))).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigation.navigate('Events')}
                />
              ))}
            </View>
          </View>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="file-tray-outline" size={56} color={COLORS.textTertiary} />
            <Text style={styles.emptyTitle}>Aucun contenu disponible</Text>
            <Text style={styles.emptyText}>Revenez bientôt pour découvrir de nouveaux contenus</Text>
          </View>
        )}

        {/* Message Version Améliorée */}
        <View style={styles.upgradeSection}>
          <LinearGradient
            colors={['#7C3AED', '#5B21B6', '#4C1D95']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.upgradeCard}
          >
            <View style={styles.upgradeIconContainer}>
              <View style={styles.upgradeIconBg}>
                <Ionicons name="rocket" size={32} color="#FFF" />
              </View>
              <View style={styles.sparkle1}>
                <Text style={styles.sparkleText}>✨</Text>
              </View>
              <View style={styles.sparkle2}>
                <Text style={styles.sparkleText}>✨</Text>
              </View>
            </View>
            
            <View style={styles.upgradeContent}>
              <Text style={styles.upgradeTitle}>Version Améliorée en Préparation</Text>
              <Text style={styles.upgradeDescription}>
                Nous travaillons sur de nouvelles fonctionnalités incroyables pour améliorer votre expérience spirituelle. Restez connectés ! 🙏
              </Text>
              
              <View style={styles.upgradeFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#A78BFA" />
                  <Text style={styles.featureText}>Interface repensée</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#A78BFA" />
                  <Text style={styles.featureText}>Nouvelles fonctionnalités</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#A78BFA" />
                  <Text style={styles.featureText}>Performance optimisée</Text>
                </View>
              </View>
            </View>

            <View style={styles.upgradeFooter}>
              <View style={styles.comingSoonBadge}>
                <Ionicons name="time-outline" size={14} color="#FFF" />
                <Text style={styles.comingSoonText}>Bientôt disponible</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  // Background decorative elements
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${COLORS.primary}08`,
    top: -100,
    right: -80,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: `${COLORS.secondary}06`,
    top: 100,
    left: -60,
  },
  decorCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: `${COLORS.accent}05`,
    top: 250,
    right: 40,
  },
  // Header
  header: {
    paddingTop: 50,
    paddingHorizontal: SPACING.lg,
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
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.8,
  },
  waveEmoji: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveText: {
    fontSize: 28,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '400',
    lineHeight: 21,
    maxWidth: '90%',
  },
  notificationBtn: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  searchShortcut: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  firstSection: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  featuredSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  featuredCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  featuredContent: {
    padding: 24,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  featuredBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  quoteContainer: {
    position: 'relative',
    marginBottom: 20,
    paddingLeft: 10,
  },
  quoteIcon: {
    position: 'absolute',
    top: -10,
    left: -15,
  },
  featuredMessage: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  featuredAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: {
    fontSize: 14,
  },
  featuredAuthor: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  shareMsgBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  podcastSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    backgroundColor: '#FAFBFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  // Modern Title Styles
  modernTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  titleIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: `${COLORS.primary}20`,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  titleTextWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  modernTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  modernUnderline: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 6,
  },
  modernSeeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: `${COLORS.primary}20`,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  modernSeeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.2,
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Legacy styles (keep for compatibility)
  sectionTitleWrapper: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  titleAccent: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginTop: 6,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: `${COLORS.primary}20`,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.2,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  categoryCard: {
    width: (width - SPACING.lg * 2 - 14) / 2,
  },
  categoryContent: {
    padding: 18,
    borderRadius: 18,
    minHeight: 150,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBottom: {
    marginTop: SPACING.md,
  },
  categoryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.2,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categorySubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    opacity: 0.8,
  },
  videoList: {
    gap: 16,
  },
  podcastList: {
    gap: 16,
    marginTop: 4,
  },
  eventList: {
    gap: 14,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    letterSpacing: -0.3,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Upgrade Section Styles
  upgradeSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  upgradeCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  upgradeIconContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  upgradeIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sparkle1: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -4,
    left: -8,
  },
  sparkleText: {
    fontSize: 20,
  },
  upgradeContent: {
    marginBottom: 20,
  },
  upgradeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  upgradeDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '500',
  },
  upgradeFeatures: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '600',
  },
  upgradeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  comingSoonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  comingSoonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
});
