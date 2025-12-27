import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { COLORS, GRADIENTS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const PodcastCard = ({ podcast, index = 0, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const playButtonScale = useRef(new Animated.Value(1)).current;

  // Tailles adaptatives selon le mode
  const sizes = compact ? {
    iconBadge: 24,
    iconSize: 11,
    playButton: 38,
    playIcon: 18,
    skipButton: 28,
    skipIcon: 14,
    secondaryButton: 26,
    secondaryIcon: 12,
    titleSize: 12,
    authorSize: 10,
    timeSize: 8,
  } : {
    iconBadge: 28,
    iconSize: 12,
    playButton: 46,
    playIcon: 20,
    skipButton: 34,
    skipIcon: 17,
    secondaryButton: 32,
    secondaryIcon: 15,
    titleSize: 14,
    authorSize: 11,
    timeSize: 9,
  };

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
    // Configurer l'audio pour la lecture
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

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
          { 
            shouldPlay: true,
            volume: volume,
            rate: playbackRate,
            shouldCorrectPitch: true,
          },
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

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  const handleSkip = async (seconds) => {
    if (sound && duration > 0) {
      const newPosition = Math.max(0, Math.min(duration, position + seconds * 1000));
      await sound.setPositionAsync(newPosition);
    }
  };

  const handlePlaybackRateChange = async () => {
    const rates = [0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    
    if (sound) {
      await sound.setRateAsync(nextRate, true);
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
        style={[styles.gradientBackground, compact && styles.gradientBackgroundCompact]}
      >
        {/* Overlay pour adoucir le gradient */}
        <View style={styles.overlay} />

        {/* Contenu */}
        <View style={styles.content}>
          {/* Header avec icône et durée */}
          <View style={styles.header}>
            <View style={[styles.iconBadge, { width: sizes.iconBadge, height: sizes.iconBadge }]}>
              <Ionicons name="headset" size={sizes.iconSize} color={COLORS.textInverse} />
            </View>
            <View style={styles.headerRight}>
              {!!podcast.duration && !compact && (
                <Text style={styles.durationText}>{podcast.duration}</Text>
              )}
              {!compact && (
                <TouchableOpacity
                  onPress={() => setShowControls(!showControls)}
                  style={styles.moreButton}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={showControls ? "chevron-up" : "chevron-down"} 
                    size={14} 
                    color={COLORS.textInverse} 
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Titre et auteur */}
          <View style={styles.info}>
            <Text style={[styles.title, { fontSize: sizes.titleSize }]} numberOfLines={compact ? 1 : 2}>
              {podcast.title}
            </Text>
            <Text style={[styles.author, { fontSize: sizes.authorSize }]} numberOfLines={1}>
              {podcast.authorName || 'Anonyme'}
            </Text>
          </View>

          {/* Barre de progression interactive */}
          <View style={styles.progressContainer}>
            <Slider
              style={styles.progressSlider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor={COLORS.textInverse}
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbTintColor={COLORS.textInverse}
            />
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { fontSize: sizes.timeSize }]}>{formatTime(position)}</Text>
              <Text style={[styles.timeText, { fontSize: sizes.timeSize }]}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Contrôles principaux */}
          <View style={styles.mainControls}>
            {/* Bouton vitesse de lecture - masqué en mode compact */}
            {!compact && (
              <TouchableOpacity
                onPress={handlePlaybackRateChange}
                style={[styles.rateButton, { width: sizes.secondaryButton, height: sizes.secondaryButton, borderRadius: sizes.secondaryButton / 2 }]}
                activeOpacity={0.7}
              >
                <Text style={styles.rateText}>{playbackRate}x</Text>
              </TouchableOpacity>
            )}

            {/* Reculer 15s */}
            <TouchableOpacity
              onPress={() => handleSkip(-15)}
              style={[styles.skipButton, { width: sizes.skipButton, height: sizes.skipButton, borderRadius: sizes.skipButton / 2 }]}
              activeOpacity={0.7}
            >
              <Ionicons name="play-back" size={sizes.skipIcon} color={COLORS.textInverse} />
              <Text style={[styles.skipText, { fontSize: compact ? 6 : 7 }]}>15</Text>
            </TouchableOpacity>

            {/* Bouton Play/Pause */}
            <TouchableOpacity
              onPress={handlePlayPause}
              activeOpacity={0.8}
              style={styles.playButtonContainer}
            >
              <Animated.View
                style={[
                  styles.playButton,
                  { 
                    width: sizes.playButton, 
                    height: sizes.playButton,
                    borderRadius: sizes.playButton / 2,
                    transform: [{ scale: playButtonScale }] 
                  },
                ]}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={sizes.playIcon}
                  color={COLORS.textInverse}
                />
              </Animated.View>
            </TouchableOpacity>

            {/* Avancer 15s */}
            <TouchableOpacity
              onPress={() => handleSkip(15)}
              style={[styles.skipButton, { width: sizes.skipButton, height: sizes.skipButton, borderRadius: sizes.skipButton / 2 }]}
              activeOpacity={0.7}
            >
              <Ionicons name="play-forward" size={sizes.skipIcon} color={COLORS.textInverse} />
              <Text style={[styles.skipText, { fontSize: compact ? 6 : 7 }]}>15</Text>
            </TouchableOpacity>

            {/* Bouton volume - masqué en mode compact */}
            {!compact && (
              <TouchableOpacity
                onPress={() => setShowControls(!showControls)}
                style={[styles.volumeButton, { width: sizes.secondaryButton, height: sizes.secondaryButton, borderRadius: sizes.secondaryButton / 2 }]}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={volume === 0 ? "volume-mute" : volume < 0.5 ? "volume-low" : "volume-high"} 
                  size={sizes.secondaryIcon} 
                  color={COLORS.textInverse} 
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Contrôles avancés (volume) - uniquement en mode normal */}
          {showControls && !compact && (
            <View style={styles.advancedControls}>
              <View style={styles.volumeControl}>
                <Ionicons name="volume-low" size={14} color={COLORS.textInverse} />
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  onValueChange={handleVolumeChange}
                  minimumTrackTintColor={COLORS.textInverse}
                  maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                  thumbTintColor={COLORS.textInverse}
                />
                <Ionicons name="volume-high" size={14} color={COLORS.textInverse} />
                <Text style={styles.volumeText}>{`${Math.round(volume * 100)}%`}</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  gradientBackground: {
    padding: 12,
    minHeight: 160,
  },
  gradientBackgroundCompact: {
    padding: 9,
    minHeight: 135,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconBadge: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  durationText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textInverse,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  moreButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 6,
  },
  title: {
    fontWeight: '800',
    color: COLORS.textInverse,
    marginBottom: 2,
    lineHeight: 16,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  author: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    marginBottom: 5,
  },
  progressSlider: {
    width: '100%',
    height: 16,
    marginBottom: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 0,
  },
  timeText: {
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  rateButton: {
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  rateText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textInverse,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  skipButton: {
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  skipText: {
    position: 'absolute',
    fontWeight: '800',
    color: COLORS.textInverse,
    bottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playButtonContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  volumeButton: {
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  advancedControls: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 2,
  },
  volumeSlider: {
    flex: 1,
    height: 20,
  },
  volumeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textInverse,
    minWidth: 36,
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default PodcastCard;
