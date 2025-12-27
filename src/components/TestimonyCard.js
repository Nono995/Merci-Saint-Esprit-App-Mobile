import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const TestimonyCard = ({ testimony, onLike, onShare, isLiked }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
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

  const formatDate = (date) => {
    if (!date) return 'Récent';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      {/* Background Icon */}
      <View style={styles.backgroundIcon}>
        <Ionicons name="heart" size={120} color={COLORS.tertiaryBg} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.authorSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={COLORS.tertiary} />
          </View>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{testimony.authorName || 'Anonyme'}</Text>
            <Text style={styles.date}>{formatDate(testimony.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.categoryBadge}>
          <Ionicons name="heart" size={12} color={COLORS.tertiary} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {testimony.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {testimony.description}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, isLiked && styles.actionButtonActive]}
          onPress={onLike}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={18}
            color={isLiked ? COLORS.tertiary : COLORS.textTertiary}
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
            {`${testimony.likes?.length || 0}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={18} color={COLORS.textTertiary} />
          <Text style={styles.actionText}>{`${testimony.shares || 0}`}</Text>
        </TouchableOpacity>

        <View style={styles.viewsContainer}>
          <Ionicons name="eye-outline" size={14} color={COLORS.textTertiary} />
          <Text style={styles.viewsText}>{`${testimony.views || 0}`}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.base,
    ...SHADOWS.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundIcon: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    opacity: 0.4,
    transform: [{ rotate: '-15deg' }],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.base,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.tertiaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  categoryBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.tertiaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginBottom: SPACING.base,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: 20,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  actionButtonActive: {
    backgroundColor: COLORS.tertiaryBg,
  },
  actionText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textTertiary,
  },
  actionTextActive: {
    color: COLORS.tertiary,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  viewsText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
  },
});

export default TestimonyCard;
