import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DailyMessageCard = ({ message, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${message.message}"\n\n- ${message.author}\n\nMessage du jour 🙏`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: slideAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <LinearGradient
          colors={['#7C3AED', '#5B21B6', '#4C1D95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Decorative circles */}
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
          <View style={styles.decorCircle3} />

          {/* Content */}
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="sunny" size={14} color="#FBBF24" />
                  <Text style={styles.badgeText}>MESSAGE DU JOUR</Text>
                </View>
                <Text style={styles.dateText}>
                  {new Date().toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={handleShare}
                activeOpacity={0.7}
              >
                <View style={styles.shareButtonInner}>
                  <Ionicons name="share-social" size={16} color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={styles.title}>{message.title}</Text>

            {/* Message with quote */}
            <View style={styles.messageContainer}>
              <View style={styles.quoteIconLeft}>
                <Ionicons name="quote" size={24} color="rgba(255,255,255,0.2)" />
              </View>
              <Text style={styles.message}>{message.message}</Text>
              <View style={styles.quoteIconRight}>
                <Ionicons 
                  name="quote" 
                  size={24} 
                  color="rgba(255,255,255,0.2)" 
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </View>
            </View>

            {/* Author & Reference */}
            <View style={styles.footer}>
              <View style={styles.authorContainer}>
                <View style={styles.authorIcon}>
                  <Ionicons name="book" size={14} color="#A78BFA" />
                </View>
                <Text style={styles.author}>{message.author}</Text>
              </View>
              
              {!!message.reference && (
                <View style={styles.referenceTag}>
                  <Text style={styles.referenceText}>{message.reference}</Text>
                </View>
              )}
            </View>

            {/* Action hint */}
            <View style={styles.actionHint}>
              <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
              <Text style={styles.actionHintText}>Toucher pour méditer</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  touchable: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    padding: 24,
    minHeight: 280,
    position: 'relative',
    overflow: 'hidden',
  },
  // Decorative elements
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
  decorCircle3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: 100,
    left: 30,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  badgeContainer: {
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  shareButton: {
    marginLeft: 12,
  },
  shareButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 16,
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  messageContainer: {
    position: 'relative',
    paddingVertical: 12,
    marginBottom: 20,
  },
  quoteIconLeft: {
    position: 'absolute',
    top: -8,
    left: -8,
  },
  quoteIconRight: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  message: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 26,
    fontWeight: '500',
    fontStyle: 'italic',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  authorIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  author: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
  },
  referenceTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  referenceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  actionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
  },
  actionHintText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
});

export default DailyMessageCard;
