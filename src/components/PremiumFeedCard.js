import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function PremiumFeedCard({ 
  post, 
  onPress, 
  style,
  showStats = true 
}) {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  const getGradientColors = () => {
    switch (post.type) {
      case 'video':
        return [COLORS.gradient1, COLORS.gradient2];
      case 'testimony':
        return [COLORS.secondary, COLORS.secondaryDark];
      case 'podcast':
        return [COLORS.accent, '#0E7490'];
      default:
        return [COLORS.gradient1, COLORS.gradient2];
    }
  };

  const getIconName = () => {
    switch (post.type) {
      case 'video':
        return 'play-circle';
      case 'testimony':
        return 'heart';
      case 'podcast':
        return 'headset';
      default:
        return 'play-circle';
    }
  };

  const getTypeLabel = () => {
    switch (post.type) {
      case 'video':
        return 'Vidéo';
      case 'testimony':
        return 'Témoignage';
      case 'podcast':
        return 'Podcast';
      default:
        return 'Contenu';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
        style={styles.touchable}
      >
        {/* Thumbnail Section */}
        <View style={styles.thumbnailContainer}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.thumbnail}
          >
            {/* Background logo */}
            {!imageLoaded && (
              <Image
                source={require('../../assets/logo.png')}
                style={styles.backgroundLogo}
                resizeMode="contain"
              />
            )}

            {/* Icon overlay */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <Ionicons
                  name={getIconName()}
                  size={40}
                  color={COLORS.white}
                />
              </View>
            </View>

            {/* Type badge */}
            <View style={styles.typeBadge}>
              <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.2)']}
                style={styles.typeGradient}
              >
                <Text style={styles.typeText}>{getTypeLabel()}</Text>
              </LinearGradient>
            </View>

            {/* Duration badge */}
            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={12} color={COLORS.white} />
              <Text style={styles.durationText}>{`${post.duration || '0:00'}`}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>

          {/* Author */}
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar}>
              <Ionicons
                name="person-circle"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.author} numberOfLines={1}>
              {post.author}
            </Text>
          </View>

          {/* Stats Row */}
          {showStats && (
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Ionicons name="eye-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.statText}>{`${post.views || 0}`}</Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="heart-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.statText}>{`${post.likes || 0}`}</Text>
              </View>
              <View style={styles.stat}>
                <Ionicons name="share-social-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.statText}>{`${post.shares || 0}`}</Text>
              </View>
              <Text style={styles.dateText}>{post.date}</Text>
            </View>
          )}

          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={onPress}
            >
              <Ionicons name="play" size={16} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Regarder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    ...SHADOWS.md,
  },
  touchable: {
    flex: 1,
  },
  thumbnailContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  thumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundLogo: {
    width: 140,
    height: 140,
    opacity: 0.1,
    position: 'absolute',
  },
  iconContainer: {
    zIndex: 2,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  typeBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  typeGradient: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  typeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray900,
    lineHeight: FONT_SIZES.lg * 1.4,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  authorAvatar: {
    width: 28,
    height: 28,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray600,
    fontWeight: FONT_WEIGHTS.medium,
  },
  dateText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray400,
    marginLeft: 'auto',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray100,
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.white,
  },
});
