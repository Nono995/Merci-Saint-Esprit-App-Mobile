import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    type: 'logo',
    website: 'www.merci-saint-esprit.com',
  },
  {
    id: '2',
    type: 'welcome',
    title: 'Merci Saint-Esprit',
    description: 'Votre communauté spirituelle connectée',
  },
  {
    id: '3',
    icon: 'videocam',
    title: 'Contenus Spirituels',
    description: 'Accédez à des vidéos, podcasts et enseignements inspirants pour nourrir votre foi au quotidien',
  },
  {
    id: '4',
    icon: 'calendar',
    title: 'Événements & Prières',
    description: 'Participez aux événements de la communauté et partagez vos intentions de prière',
  },
  {
    id: '5',
    icon: 'heart',
    title: 'Témoignages',
    description: 'Découvrez et partagez des témoignages authentiques qui inspirent et fortifient la foi',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
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
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp'
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp'
    });

    const spin = logoRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    if (item.type === 'logo') {
      return (
        <View style={styles.slide}>
          <View style={styles.logoSlideBlue}>
            {/* Decorative circles with white overlay */}
            <View style={styles.decorativeCircleWhite1} />
            <View style={styles.decorativeCircleWhite2} />
            <View style={styles.decorativeCircleWhite3} />

            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: logoOpacity,
                  transform: [{ scale: logoScale }, { rotate: spin }],
                },
              ]}
            >
              <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={[styles.websiteContainer, { opacity: logoOpacity }]}>
              <Text style={styles.websiteText}>{item.website}</Text>
            </Animated.View>
          </View>
        </View>
      );
    }

    if (item.type === 'welcome') {
      return (
        <View style={styles.slide}>
          <Animated.View style={[styles.welcomeSlide, { opacity, transform: [{ scale }] }]}>
            {/* Decorative patterns */}
            <View style={styles.contentDecorativeCircle1} />
            <View style={styles.contentDecorativeCircle2} />

            <View style={styles.welcomeContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.welcomeTitle}>Merci Saint-Esprit</Text>
                <Text style={styles.churchText}>église</Text>
              </View>
              <View style={styles.titleUnderline} />
              <Text style={styles.welcomeDescription}>{item.description}</Text>
            </View>
          </Animated.View>
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <Animated.View style={[styles.contentSlide, { opacity, transform: [{ scale }] }]}>
          {/* Decorative patterns for content slides */}
          <View style={styles.contentDecorativeCircle1} />
          <View style={styles.contentDecorativeCircle2} />
          
          {/* Icon with background */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBgCircle}>
              <Ionicons name={item.icon} size={100} color={`${COLORS.primary}30`} />
            </View>
            <View style={[styles.iconCircle, { backgroundColor: `${COLORS.primary}20` }]}>
              <Ionicons name={item.icon} size={48} color={COLORS.primary} />
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
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
            outputRange: [10, 30, 10],
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
                styles.paginatorDot, 
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
      {/* Skip Button */}
      {currentIndex > 0 && (
        <TouchableOpacity 
          onPress={skip} 
          style={[
            styles.skipBtn,
            { backgroundColor: currentIndex === 0 ? 'rgba(255, 255, 255, 0.25)' : '#F3F4F6' }
          ]}
        >
          <Text style={[
            styles.skipText,
            { color: currentIndex === 0 ? '#FFFFFF' : COLORS.text }
          ]}>
            Passer
          </Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        data={slides}
        renderItem={({ item, index }) => <Slide item={item} index={index} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Paginator />

        <TouchableOpacity 
          onPress={scrollTo} 
          style={[
            styles.nextBtn,
            { backgroundColor: COLORS.primary }
          ]}
        >
          <View style={styles.nextBtnInner}>
            {currentIndex === slides.length - 1 ? (
              <Ionicons name="arrow-forward-circle" size={28} color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.nextBtnText}>Suivant</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </View>
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
  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  slide: {
    width,
    height,
  },
  // Logo Slide (Blue Background)
  logoSlideBlue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    position: 'relative',
  },
  decorativeCircleWhite1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: -100,
    right: -100,
  },
  decorativeCircleWhite2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: 100,
    left: -50,
  },
  decorativeCircleWhite3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: '30%',
    left: '15%',
  },
  logoContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  websiteContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  websiteText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Welcome Slide
  welcomeSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  welcomeContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  churchText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EC4899',
    marginTop: 4,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 24,
  },
  welcomeDescription: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  // Content Slides
  contentSlide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
    position: 'relative',
  },
  contentDecorativeCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: `${COLORS.primary}18`,
    top: -80,
    right: -80,
  },
  contentDecorativeCircle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: `${COLORS.secondary}18`,
    bottom: 50,
    left: -60,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  iconBgCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  textContainer: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  paginatorDot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 16,
    minWidth: 200,
  },
  nextBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});