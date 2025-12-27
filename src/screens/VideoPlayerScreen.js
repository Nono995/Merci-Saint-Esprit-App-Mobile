import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, Dimensions, Share, Platform } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getVideoThumbnail } from '../services/cloudinaryService';
import ProfessionalSlider from '../components/ProfessionalSlider';
import { COLORS } from '../constants/theme';
import { likeContent, incrementViews, incrementShares } from '../services/contentService';
import { auth } from '../services/firebaseConfig';
import * as Device from 'expo-device';

const { width } = Dimensions.get('window');

export default function VideoPlayerScreen({ route, navigation }) {
  const { post } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const [isLiked, setIsLiked] = useState(false);
  const [deviceId, setDeviceId] = useState(null);

  // Get thumbnail URL - use provided thumbnailUrl or generate from mediaUrl
  const thumbnailUrl = post.thumbnailUrl || getVideoThumbnail(post.mediaUrl);
  
  // Get video URL - prioritize mediaUrl, fallback to videoUrl
  const videoUrl = post.mediaUrl || post.videoUrl;

  useEffect(() => {
    console.log('📹 VideoPlayerScreen: Mounted');
    console.log('📹 Video URL:', videoUrl);
    console.log('📹 Post ID:', post.id);

    setupDevice();
    
    if (!videoUrl) {
      setError('URL de la vidéo manquante');
      setIsLoading(false);
      return;
    }
    
    // Increment views when entering the screen
    if (post.id) {
      incrementViews(post.id);
    }
    
    return () => {
      if (video.current) {
        video.current.unloadAsync();
      }
    };
  }, []);

  const setupDevice = async () => {
    // Unique ID for guests to allow liking without login
    const id = auth.currentUser?.uid || `guest_${Device.brand || 'dev'}_${Device.modelName || 'device'}_${post.id ? post.id.substring(0,4) : ''}`;
    setDeviceId(id);
    setIsLiked((post.likes || []).includes(id));
  };

  const loadVideo = async () => {
    // Manual load if needed (e.g. after error)
    try {
      if (video.current && videoUrl) {
        setIsLoading(true);
        setError(null);
        await video.current.loadAsync(
          { uri: videoUrl },
          { shouldPlay: false },
          false
        );
      }
    } catch (err) {
      console.error('❌ Error loading video:', err);
      setError('Impossible de charger la vidéo');
      setIsLoading(false);
    }
  };

  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = async () => {
    const idToUse = deviceId;
    if (!idToUse) return;

    try {
      const isCurrentlyLiked = likes.includes(idToUse);
      const newLikes = isCurrentlyLiked 
        ? likes.filter(id => id !== idToUse)
        : [...likes, idToUse];
      
      setLikes(newLikes);
      setIsLiked(!isCurrentlyLiked);
      
      await likeContent(post.id, idToUse);
    } catch (error) {
      console.error('Error liking content:', error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Regardez cette vidéo inspirante : ${post.title}\n${videoUrl}`,
        url: videoUrl,
        title: post.title
      });

      if (result.action === Share.sharedAction) {
        if (post.id) {
          incrementShares(post.id);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    setStatus(playbackStatus);
    
    if (playbackStatus.isLoaded) {
      setIsLoading(false);
      setError(null);
      setIsPlaying(playbackStatus.isPlaying);
    }
    
    if (playbackStatus.error) {
      console.error('❌ Video playback error:', playbackStatus.error);
      setError('Erreur de lecture de la vidéo');
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
    }
  };

  const handleSliderChange = async (value) => {
    if (video.current) {
      await video.current.setPositionAsync(value);
    }
  };

  const skipForward = async () => {
    if (video.current && status.isLoaded) {
      await video.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
    }
  };

  const skipBackward = async () => {
    if (video.current && status.isLoaded) {
      await video.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Container - Plus grand et immersif */}
      <View style={styles.videoContainer}>
        <Video 
          ref={video} 
          style={styles.video} 
          source={videoUrl ? { uri: videoUrl } : undefined} 
          useNativeControls={false}
          resizeMode="contain"
          isLooping={false}
          shouldPlay={false}
          posterSource={thumbnailUrl ? { uri: thumbnailUrl } : undefined}
          usePoster={!!thumbnailUrl}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onError={(err) => {
            console.error('❌ Video error component:', err);
            setError('Impossible de charger la vidéo');
            setIsLoading(false);
          }}
        />
        
        {/* Controls Overlay - Design minimaliste */}
        {!isLoading && !error && status.isLoaded && (
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.controlsOverlay}
            onPress={togglePlayPause}
          >
            {!isPlaying && (
              <View style={styles.centerPlayButton}>
                <LinearGradient
                  colors={['rgba(168, 85, 247, 0.95)', 'rgba(124, 58, 237, 0.95)']}
                  style={styles.centerPlayGradient}
                >
                  <Ionicons name="play" size={36} color="#FFF" />
                </LinearGradient>
              </View>
            )}

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.95)']}
              style={styles.bottomControls}
            >
              <View style={styles.sliderRow}>
                <Text style={styles.timeText}>{formatTime(status.positionMillis)}</Text>
                <View style={styles.sliderContainer}>
                  <ProfessionalSlider
                    value={status.positionMillis || 0}
                    maxValue={status.durationMillis || 1}
                    onValueChange={handleSliderChange}
                    primaryColor="#A855F7"
                    secondaryColor="rgba(255,255,255,0.15)"
                    height={4}
                  />
                </View>
                <Text style={styles.timeText}>{formatTime(status.durationMillis)}</Text>
              </View>

              <View style={styles.buttonsRow}>
                <TouchableOpacity onPress={skipBackward} style={styles.controlBtn}>
                  <Ionicons name="play-back" size={26} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlayPause} style={styles.mainPlayBtn}>
                  <LinearGradient
                    colors={['#A855F7', '#7C3AED']}
                    style={styles.mainPlayGradient}
                  >
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={skipForward} style={styles.controlBtn}>
                  <Ionicons name="play-forward" size={26} color="#FFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
        
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#A855F7" />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorOverlay}>
            <View style={styles.errorIcon}>
              <Ionicons name="alert-circle-outline" size={56} color="#EF4444" />
            </View>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={loadVideo}>
              <LinearGradient
                colors={['#A855F7', '#7C3AED']}
                style={styles.retryGradient}
              >
                <Ionicons name="refresh" size={18} color="#FFF" />
                <Text style={styles.retryText}>Réessayer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <View style={styles.backBtnInner}>
            <Ionicons name="chevron-back" size={22} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Info Card */}
        <View style={styles.mainInfo}>
          <View style={styles.categoryRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>MESSAGE SPIRITUEL</Text>
            </View>
            <Text style={styles.dateText}>{post.date || 'Récemment'}</Text>
          </View>

          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.avatarGradient}>
                <Ionicons name="person" size={20} color="#FFF" />
              </LinearGradient>
            </View>
            <View style={styles.authorMeta}>
              <Text style={styles.authorName}>{post.authorName || post.author || 'Éclaireur'}</Text>
              <View style={styles.stats}>
                <Ionicons name="eye-outline" size={14} color="#6B7280" />
                <Text style={styles.statsText}>{`${post.views || 0} vues`}</Text>
                <View style={styles.dot} />
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text style={styles.statsText}>{`${post.duration || '0:00'}`}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons Redesign */}
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, isLiked && styles.likedCard]} 
            onPress={handleLike}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBox, { backgroundColor: isLiked ? '#FEE2E2' : '#F3F4F6' }]}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#EF4444" : "#4B5563"} 
              />
            </View>
            <Text style={[styles.actionLabel, isLiked && { color: '#EF4444' }]}>
              {likes.length > 0 ? `${likes.length}` : "J'aime"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleShare} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <Ionicons name="share-outline" size={24} color="#4B5563" />
            </View>
            <Text style={styles.actionLabel}>Partager</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <Ionicons name="bookmark-outline" size={24} color="#4B5563" />
            </View>
            <Text style={styles.actionLabel}>Enregistrer</Text>
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        {post.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionHeader}>Description du message</Text>
            <Text style={styles.descriptionBody}>{post.description}</Text>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  videoContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  centerPlayGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sliderContainer: {
    flex: 1,
  },
  timeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    width: 40,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  controlBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  mainPlayBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  mainPlayGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 16,
    zIndex: 10,
  },
  backBtnInner: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorIcon: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mainInfo: {
    backgroundColor: '#FFF',
    padding: 24,
    marginBottom: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#A855F7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  dateText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
  },
  actionGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FAFBFF',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  likedCard: {
    backgroundColor: '#FFF',
    borderColor: '#FEE2E2',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.2,
  },
  descriptionSection: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  descriptionBody: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    fontWeight: '500',
  },
  spacer: {
    height: 50,
  }
});