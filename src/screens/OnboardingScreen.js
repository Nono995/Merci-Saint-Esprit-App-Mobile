import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    type: 'welcome',
    title: 'Bienvenue',
    subtitle: 'Merci Saint-Esprit',
    description: 'Votre communauté spirituelle connectée',
  },
  {
    id: '2',
    icon: 'play-circle-outline',
    title: 'Contenus Spirituels',
    description: 'Vidéos, podcasts et enseignements pour nourrir votre foi',
    color: '#6366F1',
  },
  {
    id: '3',
    icon: 'people-outline',
    title: 'Communauté',
    description: 'Événements, prières et partages avec votre église',
    color: '#EC4899',
  },
  {
    id: '4',
    icon: 'heart-outline',
    title: 'Témoignages',
    description: 'Histoires authentiques qui inspirent et fortifient',
    color: '#06B6D4',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
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

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('MainTabs');
    }
  };

  const skip = () => {
    navigation.replace('MainTabs');
  };

  const Slide = ({ item, index }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp'
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, -20],
      extrapolate: 'clamp'
    });

    if (item.type === 'welcome') {
      return (
        <View style={styles.slide}>
          <Animated.View 
            style={[
              styles.welcomeContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Logo avec cercle subtil */}
            <View style={styles.logoSection}>
              <View style={styles.logoCircle}>
                <Image 
                  source={require('../../assets/logo.png')} 
                  style={styles.logo} 
                  resizeMode="contain" 
                />
              </View>
            </View>

            {/* Texte */}
            <View style={styles.welcomeTextSection}>
              <Text style={styles.welcomeLabel}>{item.title}</Text>
              <Text style={styles.welcomeTitle}>{item.subtitle}</Text>
              <View style={styles.dividerLine} />
              <Text style={styles.welcomeDescription}>{item.description}</Text>
            </View>

            {/* Indicateur subtil */}
            <View style={styles.scrollIndicator}>
              <Ionicons name="chevron-down" size={20} color={COLORS.textSecondary} />
              <Text style={styles.scrollText}>Glissez pour découvrir</Text>
            </View>
          </Animated.View>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity,
              transform: [{ translateY }]
            }
          ]}
        >
          {/* Icône avec accent coloré */}
          <View style={styles.iconSection}>
            <View style={[styles.iconCircle, { backgroundColor: `${item.color}10` }]}>
              <View style={[styles.iconInner, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={56} color={item.color} />
              </View>
            </View>
          </View>

          {/* Contenu texte */}
          <View style={styles.textSection}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>

          {/* Accent décoratif */}
          <View style={[styles.accentBar, { backgroundColor: item.color }]} />
        </Animated.View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginatorContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp'
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              style={[
                styles.dot, 
                { 
                  width: dotWidth, 
                  opacity,
                  backgroundColor: COLORS.primary
                }
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header avec bouton Passer */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={skip} 
          style={styles.skipButton}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Passer</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        data={slides}
        renderItem={({ item, index }) => <Slide item={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }], 
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Paginator />

        <TouchableOpacity 
          onPress={scrollTo} 
          style={styles.nextButton}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[COLORS.primary, '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
            </Text>
            <Ionicons 
              name={currentIndex === slides.length - 1 ? "checkmark-circle" : "arrow-forward"} 
              size={22} 
              color="#FFFFFF" 
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 16,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  // Slide
  slide: {
    width,
    height,
    paddingTop: 100,
  },

  // Welcome Slide
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeTextSection: {
    alignItems: 'center',
  },
  welcomeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  dividerLine: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  scrollIndicator: {
    alignItems: 'center',
    marginTop: 48,
    gap: 8,
  },
  scrollText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  // Content Slides
  contentContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSection: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    alignItems: 'center',
    maxWidth: 320,
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  slideDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  accentBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 32,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  paginatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    width: '100%',
    maxWidth: 280,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
