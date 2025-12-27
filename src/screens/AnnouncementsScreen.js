import React, { useState, useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SPACING, FONT_SIZES, SHADOWS, BORDER_RADIUS, MOCK_ANNOUNCEMENTS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function AnnouncementsScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const highPriorityAnnouncements = announcements.filter(a => a.priority === 'high');
  const otherAnnouncements = announcements.filter(a => a.priority !== 'high');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      default:
        return COLORS.info;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'alert-circle';
      case 'medium':
        return 'information-circle';
      default:
        return 'checkmark-circle';
    }
  };

  const getFeaturedGradient = (index) => {
    const gradients = [GRADIENTS.sunset, GRADIENTS.primary, GRADIENTS.secondary];
    return gradients[index % gradients.length];
  };

  const renderFeaturedAnnouncement = (announcement, index) => (
    <TouchableOpacity
      key={announcement.id}
      style={[styles.featuredCard, SHADOWS.lg]}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={getFeaturedGradient(index)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <View style={styles.featuredHeader}>
            <View style={styles.priorityBadge}>
              <Ionicons name={getPriorityIcon('high')} size={16} color={COLORS.surface} />
              <Text style={styles.priorityText}>URGENT</Text>
            </View>
          </View>

          <Text style={styles.featuredTitle} numberOfLines={2}>{announcement.title}</Text>
          <Text style={styles.featuredDescription} numberOfLines={3}>{announcement.description}</Text>

          <View style={styles.featuredFooter}>
            <View style={styles.authorInfo}>
              <View style={styles.authorSmall}>
                <Text style={styles.authorTextSmall}>
                  {(announcement.authorName?.charAt(0) || 'A').toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.featuredAuthor}>{announcement.authorName}</Text>
                <Text style={styles.featuredDate}>
                  {new Date(announcement.createdAt).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.readMoreBtn}>
              <Ionicons name="arrow-forward" size={18} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderAnnouncementCard = (announcement, index) => {
    const priorityColor = getPriorityColor(announcement.priority);
    
    return (
      <TouchableOpacity
        key={announcement.id}
        style={[styles.announcementCard, SHADOWS.md]}
        activeOpacity={0.8}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.announcementTitle} numberOfLines={2}>{announcement.title}</Text>
              <View style={[styles.categoryBadge, { backgroundColor: `${priorityColor}20` }]}>
                <Text style={[styles.categoryText, { color: priorityColor }]}>
                  {announcement.category}
                </Text>
              </View>
            </View>
            <Text style={styles.announcementDescription} numberOfLines={2}>
              {announcement.description}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.footerLeft}>
                <Ionicons name="person" size={12} color={COLORS.textTertiary} />
                <Text style={styles.footerText}>{announcement.authorName}</Text>
              </View>
              <View style={styles.footerRight}>
                <Ionicons name="eye" size={12} color={COLORS.textTertiary} />
                <Text style={styles.footerText}>{`${announcement.views || 0}`}</Text>
              </View>
              <Text style={styles.footerDate}>
                {new Date(announcement.createdAt).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={GRADIENTS.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Annonces</Text>
            <Text style={styles.headerSubtitle}>Restez informé de nos actualités</Text>
          </View>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeCount}>{`${announcements.length}`}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {highPriorityAnnouncements.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="alert-circle" size={18} color={COLORS.error} />
              <Text style={styles.sectionTitle}>À Lire Immédiatement</Text>
            </View>
            <View style={styles.featuredList}>
              {highPriorityAnnouncements.map((announcement, index) => 
                renderFeaturedAnnouncement(announcement, index)
              )}
            </View>
          </View>
        )}

        {otherAnnouncements.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="newspaper" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Autres Annonces</Text>
            </View>
            <View style={styles.announcementsList}>
              {otherAnnouncements.map((announcement, index) => 
                renderAnnouncementCard(announcement, index)
              )}
            </View>
          </View>
        )}

        {announcements.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="newspaper-outline" size={64} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>Aucune annonce</Text>
            <Text style={styles.emptyText}>Il n'y a pas d'annonces pour le moment.</Text>
            <Text style={styles.emptyText}>Revenez bientôt pour découvrir les dernières actualités.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '800',
    color: COLORS.surface,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.base,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
  notificationBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  badgeCount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.surface,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  featuredList: {
    gap: SPACING.lg,
  },
  featuredCard: {
    borderRadius: BORDER_RADIUS.xxl,
    overflow: 'hidden',
  },
  featuredGradient: {
    padding: SPACING.lg,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  priorityText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.surface,
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    color: COLORS.surface,
    marginBottom: SPACING.md,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  featuredDescription: {
    fontSize: FONT_SIZES.base,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: SPACING.lg,
    fontWeight: '400',
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  authorSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  authorTextSmall: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.surface,
  },
  featuredAuthor: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    color: COLORS.surface,
  },
  featuredDate: {
    fontSize: FONT_SIZES.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: SPACING.xs,
  },
  readMoreBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  announcementsList: {
    gap: SPACING.lg,
  },
  announcementCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  announcementTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  announcementDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  footerText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  footerDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  cardRight: {
    marginLeft: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: SPACING.lg,
  },
  emptyIcon: {
    marginBottom: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
});
