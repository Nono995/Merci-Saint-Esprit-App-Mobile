import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { COLORS, GRADIENTS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const PodcastCard = ({ podcast, index = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const playButtonScale = useRef(new Animated.Value(1)).current;

  // Gradients rotatifs pour chaque carte
  const gradients = [
    ['#667eea', '#764ba2'], // Violet-Bleu
    ['#f093fb', '#f5576c'], // Rose-Rouge
    ['#4facfe', '#00f2fe'], // Bleu-Cyan
    ['#43e97b', '#38f9d7'], // Vert-Cyan
    ['#fa709a', '#fee140'], // Rose-Jaune
    ['#30cfd0', '#330867'], // Cyan-Violet foncé
  ];

  const gradient = gradients[index % gradients.length];

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        // Charger et jouer l'audio
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: podcast.mediaUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      }

      // Animation du bouton
      Animated.sequence([
        Animated.spring(playButtonScale, {
          toValue: 0.9,
          useNativeDriver: true,
          friction: 8,
        }),
        Animated.spring(playButtonScale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
        }),
      ]).start();
    } catch (error) {
      console.error('Erreur de lecture audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  const formatTime = (millis) => {
    if (!millis) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Overlay pour adoucir le gradient */}
        <View style={styles.overlay} />

        {/* Contenu */}
        <View style={styles.content}>
          {/* Header avec icône et durée */}
          <View style={styles.header}>
            <View style={styles.iconBadge}>
              <Ionicons name="headset" size={16} color={COLORS.textInverse} />
            </View>
            {podcast.duration && (
              <Text style={styles.durationText}>{podcast.duration}</Text>
            )}
          </View>

          {/* Titre et auteur */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {podcast.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {podcast.authorName || 'Anonyme'}
            </Text>
          </View>

          {/* Contrôles de lecture */}
          <View style={styles.controls}>
            {/* Barre de progression */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Bouton Play/Pause */}
            <TouchableOpacity
              onPress={handlePlayPause}
              activeOpacity={0.8}
              style={styles.playButtonContainer}
            >
              <Animated.View
                style={[
                  styles.playButton,
                  { transform: [{ scale: playButtonScale }] },
                ]}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={24}
                  color={COLORS.textInverse}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradientBackground: {
    padding: SPACING.base,
    minHeight: 160,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textInverse,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.xs,
  },
  info: {
    marginBottom: SPACING.base,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textInverse,
    marginBottom: 4,
    lineHeight: 22,
  },
  author: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.base,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BORDER_RADIUS.xs,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.textInverse,
    borderRadius: BORDER_RADIUS.xs,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playButtonContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default PodcastCard;
