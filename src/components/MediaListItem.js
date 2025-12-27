import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

export default function MediaListItem({
  title,
  author,
  duration,
  type = 'audio',
  isPlaying = false,
  onPress,
  onPlayPress,
  gradient = false,
  index = 0,
}) {
  const [scaleAnim] = React.useState(new Animated.Value(1));

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
      friction: 6,
      tension: 40,
    }).start();
  };

  const getItemColor = () => {
    if (gradient) {
      const colors = [COLORS.gradient1, COLORS.gradient2, COLORS.secondary, COLORS.accent];
      return colors[index % colors.length];
    }
    return COLORS.primary;
  };

  const itemColor = getItemColor();

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        styles.container,
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
        style={styles.touchable}
      >
        <LinearGradient
          colors={[COLORS.white, `${COLORS.gray100}40`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Icon Section */}
          <View style={[styles.iconContainer, { borderColor: itemColor }]}>
            <LinearGradient
              colors={[itemColor, adjustColor(itemColor, -20)]}
              style={styles.iconGradient}
            >
              <Ionicons
                name={type === 'audio' ? 'musical-notes' : 'play-circle'}
                size={20}
                color={COLORS.white}
              />
              {isPlaying && (
                <View style={styles.playingIndicator}>
                  <View style={styles.playingDot} />
                </View>
              )}
            </LinearGradient>
          </View>

          {/* Content Section */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {author}
            </Text>
            <View style={styles.meta}>
              <Ionicons name="time-outline" size={12} color={COLORS.gray500} />
              <Text style={styles.duration}>{`${duration || '0:00'}`}</Text>
              {type === 'audio' && (
                <>
                  <View style={styles.metaDot} />
                  <Ionicons name="headset-outline" size={12} color={COLORS.gray500} />
                  <Text style={styles.typeLabel}>Audio</Text>
                </>
              )}
              {type === 'video' && (
                <>
                  <View style={styles.metaDot} />
                  <Ionicons name="videocam-outline" size={12} color={COLORS.gray500} />
                  <Text style={styles.typeLabel}>Vidéo</Text>
                </>
              )}
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={onPlayPress}
            style={[styles.playButton, { backgroundColor: itemColor }]}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={16}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

function adjustColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  touchable: {
    width: '100%',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    marginRight: SPACING.md,
    overflow: 'hidden',
  },
  iconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playingDot: {
    width: 6,
    height: 6,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray900,
    marginBottom: SPACING.xs / 2,
  },
  author: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray600,
    fontWeight: FONT_WEIGHTS.medium,
  },
  metaDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.gray400,
    marginHorizontal: 4,
  },
  typeLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray600,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.xs,
  },
});
