import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProfessionalSlider from './ProfessionalSlider';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function PremiumMediaPlayer({
  title,
  author,
  position,
  duration,
  isPlaying,
  onPlayPause,
  onSliderChange,
  onSkipBack,
  onSkipForward,
  onStop,
  onClose,
  type = 'audio',
  sliderColor = COLORS.primary,
  variant = 'compact',
}) {
  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <LinearGradient
          colors={[`${sliderColor}15`, `${sliderColor}08`]}
          style={styles.compactBackground}
        >
          {/* Header */}
          <View style={styles.compactHeader}>
            <View style={styles.compactInfo}>
              <View style={styles.compactIcon}>
                <Ionicons
                  name={type === 'audio' ? 'musical-notes' : 'play-circle'}
                  size={20}
                  color={sliderColor}
                />
              </View>
              <View style={styles.compactText}>
                <Text style={styles.compactTitle} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.compactAuthor} numberOfLines={1}>
                  {author}
                </Text>
              </View>
            </View>
            {onClose && (
              <TouchableOpacity onPress={onClose} style={styles.compactClose}>
                <Ionicons name="close" size={20} color={COLORS.gray600} />
              </TouchableOpacity>
            )}
          </View>

          {/* Progress Bar */}
          <View style={styles.compactProgressContainer}>
            <ProfessionalSlider
              value={position}
              maxValue={duration}
              onValueChange={onSliderChange}
              primaryColor={sliderColor}
              secondaryColor={sliderColor}
              height={3}
            />
            <View style={styles.compactTimeContainer}>
              <Text style={styles.compactTimeText}>{formatTime(position)}</Text>
              <Text style={styles.compactTimeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.compactControls}>
            <TouchableOpacity onPress={onSkipBack} style={styles.compactControlBtn}>
              <Ionicons name="play-back" size={20} color={COLORS.gray600} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPause} style={styles.compactPlayButton}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkipForward} style={styles.compactControlBtn}>
              <Ionicons name="play-forward" size={20} color={COLORS.gray600} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onStop} style={styles.compactControlBtn}>
              <Ionicons name="stop" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Full screen variant
  return (
    <SafeAreaView style={styles.fullContainer}>
      <LinearGradient
        colors={[sliderColor, `${sliderColor}99`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullGradient}
      >
        {/* Header */}
        <View style={styles.fullHeader}>
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.fullCloseButton}>
              <Ionicons name="chevron-down" size={28} color={COLORS.white} />
            </TouchableOpacity>
          )}
          <Text style={styles.fullHeaderTitle}>{type === 'audio' ? 'Podcast' : 'Vidéo'}</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Media Info */}
        <View style={styles.fullMediaInfo}>
          <View style={styles.fullMediaIcon}>
            <Ionicons
              name={type === 'audio' ? 'musical-notes' : 'play-circle'}
              size={64}
              color={COLORS.white}
            />
          </View>
          <Text style={styles.fullTitle}>{title}</Text>
          <Text style={styles.fullAuthor}>{author}</Text>
        </View>

        {/* Progress */}
        <View style={styles.fullProgressContainer}>
          <ProfessionalSlider
            value={position}
            maxValue={duration}
            onValueChange={onSliderChange}
            primaryColor={COLORS.white}
            secondaryColor={COLORS.white}
            height={4}
          />
          <View style={styles.fullTimeContainer}>
            <Text style={styles.fullTimeText}>{formatTime(position)}</Text>
            <View style={styles.fullProgressBarContainer}>
              <View
                style={[
                  styles.fullProgressBar,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.fullTimeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.fullControls}>
          <TouchableOpacity onPress={onSkipBack} style={styles.fullControlBtn}>
            <Ionicons name="play-back" size={32} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause} style={styles.fullPlayButton}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={48}
              color={sliderColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSkipForward} style={styles.fullControlBtn}>
            <Ionicons name="play-forward" size={32} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Additional Controls */}
        <View style={styles.fullAdditionalControls}>
          <TouchableOpacity style={styles.fullAdditionalBtn}>
            <Ionicons name="share-social" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fullAdditionalBtn}>
            <Ionicons name="heart-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fullAdditionalBtn} onPress={onStop}>
            <Ionicons name="stop" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Compact variant
  compactContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  compactBackground: {
    padding: SPACING.lg,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  compactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  compactIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactText: {
    flex: 1,
  },
  compactTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  compactAuthor: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray600,
  },
  compactClose: {
    padding: SPACING.sm,
  },
  compactProgressContainer: {
    marginBottom: SPACING.lg,
  },
  compactTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  compactTimeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray500,
    fontWeight: FONT_WEIGHTS.medium,
  },
  compactControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  compactControlBtn: {
    padding: SPACING.md,
  },
  compactPlayButton: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },

  // Full screen variant
  fullContainer: {
    flex: 1,
  },
  fullGradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  fullHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  fullCloseButton: {
    padding: SPACING.sm,
  },
  fullHeaderTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  fullMediaInfo: {
    alignItems: 'center',
    marginVertical: SPACING.xxl,
  },
  fullMediaIcon: {
    marginBottom: SPACING.xl,
  },
  fullTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  fullAuthor: {
    fontSize: FONT_SIZES.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  fullProgressContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  fullTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  fullTimeText: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: FONT_WEIGHTS.semibold,
    width: 40,
    textAlign: 'center',
  },
  fullProgressBarContainer: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1.5,
    marginHorizontal: SPACING.md,
    overflow: 'hidden',
  },
  fullProgressBar: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 1.5,
  },
  fullControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  fullControlBtn: {
    padding: SPACING.md,
  },
  fullPlayButton: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  fullAdditionalControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.xl,
  },
  fullAdditionalBtn: {
    padding: SPACING.lg,
  },
});
