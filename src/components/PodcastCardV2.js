import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { COLORS } from '../constants/theme';

const PodcastCardV2 = ({ podcast, index = 0, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [expanded, setExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Gradients modernes
  const gradients = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#30cfd0', '#330867'],
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

      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
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
    <View style={[styles.container, compact && styles.containerCompact]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Contenu principal */}
        <View style={styles.content}>
          {/* En-tête minimaliste */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Ionicons name="musical-notes" size={compact ? 10 : 12} color="#fff" />
            </View>
            {!compact && !!podcast.duration && (
              <Text style={styles.duration}>{podcast.duration}</Text>
            )}
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={compact ? 1 : 2}>
              {podcast.title}
            </Text>
            <Text style={[styles.author, compact && styles.authorCompact]} numberOfLines={1}>
              {podcast.authorName || 'Anonyme'}
            </Text>
          </View>

          {/* Barre de progression */}
          <View style={styles.progressSection}>
            <Slider
              style={styles.progressSlider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.25)"
              thumbTintColor="#fff"
            />
            <View style={styles.timeRow}>
              <Text style={styles.time}>{formatTime(position)}</Text>
              <Text style={styles.time}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Contrôles */}
          <View style={styles.controls}>
            {!compact && (
              <TouchableOpacity 
                style={styles.controlBtn} 
                onPress={handlePlaybackRateChange}
                activeOpacity={0.7}
              >
                <Text style={styles.rateText}>{playbackRate}x</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.controlBtn, compact && styles.controlBtnCompact]} 
              onPress={() => handleSkip(-15)}
              activeOpacity={0.7}
            >
              <Ionicons name="play-back" size={compact ? 14 : 16} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity 
                style={[styles.playBtn, compact && styles.playBtnCompact]} 
                onPress={handlePlayPause}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={isPlaying ? 'pause' : 'play'} 
                  size={compact ? 18 : 22} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity 
              style={[styles.controlBtn, compact && styles.controlBtnCompact]} 
              onPress={() => handleSkip(15)}
              activeOpacity={0.7}
            >
              <Ionicons name="play-forward" size={compact ? 14 : 16} color="#fff" />
            </TouchableOpacity>

            {!compact && (
              <TouchableOpacity 
                style={styles.controlBtn} 
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={volume === 0 ? "volume-mute" : "volume-medium"} 
                  size={16} 
                  color="#fff" 
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Contrôles avancés */}
          {expanded && !compact && (
            <View style={styles.advanced}>
              <View style={styles.volumeRow}>
                <Ionicons name="volume-low" size={12} color="rgba(255,255,255,0.8)" />
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  onValueChange={handleVolumeChange}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="rgba(255,255,255,0.3)"
                  thumbTintColor="#fff"
                />
                <Ionicons name="volume-high" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={styles.volumeText}>{`${Math.round(volume * 100)}%`}</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  containerCompact: {
    borderRadius: 14,
  },
  gradient: {
    padding: 14,
    minHeight: 155,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  info: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 3,
    lineHeight: 18,
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  titleCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
  author: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  authorCompact: {
    fontSize: 10,
  },
  progressSection: {
    marginBottom: 10,
  },
  progressSlider: {
    width: '100%',
    height: 20,
    marginBottom: -2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  controlBtnCompact: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  rateText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playBtnCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  advanced: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  volumeSlider: {
    flex: 1,
    height: 20,
  },
  volumeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    minWidth: 32,
    textAlign: 'right',
  },
});

export default PodcastCardV2;
