import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { getVideoThumbnail } from '../services/cloudinaryService';

const VideoCard = ({ video, onPress }) => {
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

  const thumbnailUrl = video.thumbnailUrl || getVideoThumbnail(video.mediaUrl);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        {/* Thumbnail avec overlay gradient */}
        <View style={styles.thumbnail}>
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} style={styles.image} />
          ) : (
            <LinearGradient
              colors={['#A855F7', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.placeholderGradient}
            >
              <Ionicons name="play-circle" size={56} color="rgba(255,255,255,0.9)" />
            </LinearGradient>
          )}
          
          {/* Gradient overlay subtil */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradientOverlay}
          />

          {/* Duration Badge - Design moderne */}
          {!!video.duration && (
            <View style={styles.durationBadge}>
              <View style={styles.durationInner}>
                <Ionicons name="time-outline" size={10} color="#FFF" />
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            </View>
          )}

          {/* Play Button - Plus subtil et moderne */}
          <View style={styles.playOverlay}>
            <View style={styles.playButton}>
              <LinearGradient
                colors={['rgba(168, 85, 247, 0.95)', 'rgba(124, 58, 237, 0.95)']}
                style={styles.playGradient}
              >
                <Ionicons name="play" size={22} color="#FFF" />
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Content - Design épuré */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          
          <View style={styles.meta}>
            <View style={styles.authorRow}>
              <View style={styles.miniAvatar}>
                <Ionicons name="person" size={12} color="#A855F7" />
              </View>
              <Text style={styles.authorText} numberOfLines={1}>
                {video.authorName || 'Anonyme'}
              </Text>
            </View>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Ionicons name="eye-outline" size={13} color="#9CA3AF" />
                <Text style={styles.statText}>{formatNumber(video.views || 0)}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="heart-outline" size={13} color="#9CA3AF" />
                <Text style={styles.statText}>{`${video.likes?.length || 0}`}</Text>
              </View>
            </View>
          </View>
        </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  durationInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  playGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  meta: {
    gap: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
});

export default VideoCard;
