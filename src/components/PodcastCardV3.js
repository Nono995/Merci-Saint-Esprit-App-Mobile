import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { COLORS } from '../constants/theme';

const PodcastCardV3 = ({ podcast, index = 0, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [showVolume, setShowVolume] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Gradients ultra-modernes
  const gradients = [
    ['#667eea', '#764ba2', '#8B5CF6'],
    ['#f093fb', '#f5576c', '#FF6B9D'],
    ['#4facfe', '#00f2fe', '#06B6D4'],
    ['#43e97b', '#38f9d7', '#10B981'],
    ['#fa709a', '#fee140', '#FBBF24'],
    ['#667eea', '#330867', '#4F46E5'],
  ];

  const gradient = gradients[index % gradients.length];

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

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
    if (sound) await sound.setPositionAsync(value);
  };

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) await sound.setVolumeAsync(value);
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
    if (sound) await sound.setRateAsync(nextRate, true);
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
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Effet de verre */}
        <View style={styles.glassOverlay} />
        
        {/* Cercles décoratifs */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <View style={styles.container}>
          {/* Header élégant */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconWrapper}>
                <Ionicons name="musical-notes" size={compact ? 14 : 16} color="#fff" />
              </View>
              <View>
                <Text style={[styles.category, compact && styles.categoryCompact]}>PODCAST</Text>
                {!compact && !!podcast.duration && (
                  <Text style={styles.duration}>{podcast.duration}</Text>
                )}
              </View>
            </View>
            {!compact && (
              <TouchableOpacity 
                style={styles.moreBtn}
                onPress={() => setShowVolume(!showVolume)}
                activeOpacity={0.7}
              >
                <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Titre et auteur */}
          <View style={styles.infoSection}>
            <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={compact ? 2 : 3}>
              {podcast.title}
            </Text>
            <Text style={[styles.author, compact && styles.authorCompact]} numberOfLines={1}>
              Par {podcast.authorName || 'Anonyme'}
            </Text>
          </View>

          {/* Barre de progression moderne */}
          <View style={styles.progressSection}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor="#fff"
            />
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <View style={styles.progressIndicator}>
                <View style={[styles.progressDot, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Contrôles principaux */}
          <View style={styles.controlsRow}>
            {!compact && (
              <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={handlePlaybackRateChange}
                activeOpacity={0.8}
              >
                <Text style={styles.rateText}>{`${playbackRate}×`}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.skipBtn, compact && styles.skipBtnCompact]}
              onPress={() => handleSkip(-15)}
              activeOpacity={0.8}
            >
              <Ionicons name="play-back" size={compact ? 18 : 22} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity 
                style={[styles.playBtn, compact && styles.playBtnCompact]}
                onPress={handlePlayPause}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']}
                  style={styles.playGradient}
                >
                  <Ionicons 
                    name={isPlaying ? 'pause' : 'play'} 
                    size={compact ? 24 : 32} 
                    color="#fff" 
                    style={!isPlaying && { marginLeft: 3 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity 
              style={[styles.skipBtn, compact && styles.skipBtnCompact]}
              onPress={() => handleSkip(15)}
              activeOpacity={0.8}
            >
              <Ionicons name="play-forward" size={compact ? 18 : 22} color="#fff" />
            </TouchableOpacity>

            {!compact && (
              <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={() => setShowVolume(!showVolume)}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={volume === 0 ? "volume-mute" : volume < 0.5 ? "volume-low" : "volume-high"} 
                  size={20} 
                  color="#fff" 
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Contrôle de volume */}
          {showVolume && !compact && (
            <View style={styles.volumeSection}>
              <Ionicons name="volume-low" size={16} color="rgba(255,255,255,0.7)" />
              <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={handleVolumeChange}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255,255,255,0.2)"
                thumbTintColor="#fff"
              />
              <Ionicons name="volume-high" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.volumePercent}>{`${Math.round(volume * 100)}%`}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 4,
  },
  wrapperCompact: {
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    minHeight: 220,
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  decorCircle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -50,
    right: -30,
  },
  decorCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: -20,
    left: -20,
  },
  container: {
    padding: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  category: {
    fontSize: 10,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  categoryCompact: {
    fontSize: 9,
  },
  duration: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  moreBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoSection: {
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 24,
    marginBottom: 6,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  titleCompact: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  authorCompact: {
    fontSize: 11,
  },
  progressSection: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 24,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    minWidth: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  progressIndicator: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressDot: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 8,
  },
  secondaryBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  rateText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  skipBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  skipBtnCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  playBtnCompact: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  playGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  volumeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  volumeSlider: {
    flex: 1,
    height: 24,
  },
  volumePercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
    minWidth: 38,
    textAlign: 'right',
  },
});

export default PodcastCardV3;
