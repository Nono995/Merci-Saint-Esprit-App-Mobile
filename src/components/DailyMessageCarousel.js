import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 60;
const CARD_SPACING = 16;

const DailyMessageCarousel = ({ messages, onMessagePress }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const gradients = [
    ['#7C3AED', '#5B21B6'],
    ['#EC4899', '#BE185D'],
    ['#F59E0B', '#D97706'],
    ['#10B981', '#059669'],
    ['#3B82F6', '#1D4ED8'],
  ];

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        setActiveIndex(index);
      },
    }
  );

  const renderCard = (message, index) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + CARD_SPACING),
      index * (CARD_WIDTH + CARD_SPACING),
      (index + 1) * (CARD_WIDTH + CARD_SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={message.id}
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onMessagePress && onMessagePress(message)}
        >
          <LinearGradient
            colors={gradients[index % gradients.length]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {/* Decorative pattern */}
            <View style={styles.pattern}>
              <View style={styles.patternCircle1} />
              <View style={styles.patternCircle2} />
            </View>

            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.dayBadge}>
                <Ionicons name="calendar" size={12} color="#FFF" />
                <Text style={styles.dayText}>
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long' })}
                </Text>
              </View>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{index + 1}/{messages.length}</Text>
              </View>
            </View>

            {/* Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="sparkles" size={28} color="#FFF" />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.cardTitle}>{message.title}</Text>

            {/* Message */}
            <View style={styles.messageBox}>
              <Text style={styles.cardMessage} numberOfLines={4}>
                {message.message}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View style={styles.authorRow}>
                <Ionicons name="book-outline" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.cardAuthor}>{message.author}</Text>
              </View>
              {!!message.reference && (
                <View style={styles.refBadge}>
                  <Text style={styles.refText}>{message.reference}</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Ionicons name="book" size={20} color="#7C3AED" />
          </View>
          <View>
            <Text style={styles.headerTitle}>La Bible</Text>
            <Text style={styles.headerSubtitle}>Inspiration quotidienne</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.seeAllBtn}
          onPress={() => onMessagePress && onMessagePress({ action: 'openBible' })}
        >
          <Text style={styles.seeAllText}>Explorer</Text>
          <Ionicons name="chevron-forward" size={16} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <Animated.ScrollView
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {messages.map((message, index) => renderCard(message, index))}
      </Animated.ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {messages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7C3AED',
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    minHeight: 320,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -40,
    right: -30,
  },
  patternCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -20,
    left: -20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  numberBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  numberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
    zIndex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
    letterSpacing: -0.5,
    zIndex: 1,
  },
  messageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
  cardMessage: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  cardAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  refBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  refText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#7C3AED',
  },
});

export default DailyMessageCarousel;
