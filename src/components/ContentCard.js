import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const ContentCard = ({
  title,
  description,
  image,
  category,
  duration,
  views,
  likes,
  author,
  gradient,
  onPress,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.card, SHADOWS.lg, { transform: [{ scale: scaleAnim }] }, style]}>
        {/* Image avec Gradient Overlay */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: COLORS.surfaceSecondary }]}>
              <Ionicons name="image-outline" size={48} color={COLORS.textTertiary} />
            </View>
          )}
          
          {gradient && (
            <LinearGradient
              colors={['transparent', 'rgba(10, 14, 39, 0.9)']}
              style={styles.imageGradient}
            />
          )}

          {/* Duration Badge */}
          {!!duration && (
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          )}

          {/* Category Badge */}
          {!!category && (
            <LinearGradient
              colors={gradient || [COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryBadge}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </LinearGradient>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          
          {!!description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}

          {/* Author & Stats */}
          <View style={styles.footer}>
            {!!author && (
              <View style={styles.authorContainer}>
                <Ionicons name="person-circle-outline" size={16} color={COLORS.textSecondary} />
                <Text style={styles.authorText} numberOfLines={1}>
                  {author}
                </Text>
              </View>
            )}

            <View style={styles.statsContainer}>
              {views !== undefined && (
                <View style={styles.stat}>
                  <Ionicons name="eye-outline" size={14} color={COLORS.textTertiary} />
                  <Text style={styles.statText}>{formatNumber(views)}</Text>
                </View>
              )}
              {likes !== undefined && (
                <View style={styles.stat}>
                  <Ionicons name="heart-outline" size={14} color={COLORS.tertiary} />
                  <Text style={styles.statText}>{formatNumber(likes)}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Neon Border Effect */}
        <View style={[styles.neonBorder, { borderColor: gradient ? gradient[0] : COLORS.primary }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(10, 14, 39, 0.8)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  durationText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  categoryBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    textTransform: 'uppercase',
  },
  content: {
    padding: SPACING.base,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  authorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginLeft: 4,
    fontWeight: FONT_WEIGHTS.medium,
  },
  neonBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    opacity: 0.3,
  },
});

export default ContentCard;
