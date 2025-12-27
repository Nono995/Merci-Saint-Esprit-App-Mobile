import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Bienvenue',
    heading: 'Merci Saint-Esprit',
    subtitle: 'Votre espace spirituel personnel',
    description: 'Une communauté de foi, des témoignages inspirants et des contenus qui transforment',
    color: '#6366f1',
    lightColor: '#818cf8',
    bgColor: '#f0f9ff',
    icon: 'sparkles',
  },
  {
    id: 2,
    title: 'Témoignages',
    heading: '"Allez et prêchez la bonne nouvelle"',
    subtitle: 'Marc 16:15',
    description: 'Partagez vos miracles, inspirez la communauté et célébrez la grâce de Dieu ensemble',
    color: '#ec4899',
    lightColor: '#f472b6',
    bgColor: '#fdf2f8',
    icon: 'heart',
  },
  {
    id: 3,
    title: 'Contenus',
    heading: '"Ta parole est une lampe à mes pieds"',
    subtitle: 'Psaume 119:105',
    description: 'Vidéos, podcasts et enseignements pour nourrir votre foi au quotidien',
    color: '#06b6d4',
    lightColor: '#22d3ee',
    bgColor: '#ecfeff',
    icon: 'book',
  },
  {
    id: 4,
    title: 'Communauté',
    heading: '"Là où deux ou trois sont assemblés"',
    subtitle: 'Matthieu 18:20',
    description: 'Rejoignez une famille spirituelle unie dans l\'amour et la prière',
    color: '#10b981',
    lightColor: '#34d399',
    bgColor: '#ecfdf5',
    icon: 'people',
  },
  {
    id: 5,
    title: 'Commencer',
    heading: '"Voici, je fais toutes choses nouvelles"',
    subtitle: 'Apocalypse 21:5',
    description: 'Votre transformation spirituelle commence maintenant',
    color: '#f59e0b',
    lightColor: '#fbbf24',
    bgColor: '#fffbeb',
    icon: 'rocket',
    isLast: true,
  },
];

export default function IntroSlidersScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnims = useRef(onboardingData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    slideAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentIndex ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: currentSlide.bgColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={currentSlide.bgColor} />
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.topNav}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoDot, { backgroundColor: currentSlide.color }]} />
            <Text style={styles.logoText}>Merci Saint-Esprit</Text>
          </View>
          
          {!currentSlide.isLast && (
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={() => navigation.replace('MainTabs')}
            >
              <Text style={[styles.skipText, { color: currentSlide.color }]}>Passer</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
          bounces={false}
        >
          {onboardingData.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={[
                styles.slide, 
                { 
                  width,
                  opacity: slideAnims[index],
                }
              ]}
            >
              <View style={styles.iconSection}>
                <Animated.View 
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: item.color,
                      transform: [{
                        scale: slideAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        })
                      }]
                    }
                  ]}
                >
                  <Ionicons name={item.icon} size={48} color="white" />
                </Animated.View>
                
                <Animated.View 
                  style={[
                    styles.decorRing,
                    {
                      borderColor: item.lightColor,
                      opacity: slideAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.3],
                      }),
                      transform: [{
                        scale: slideAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.2],
                        })
                      }]
                    }
                  ]}
                />
                <Animated.View 
                  style={[
                    styles.decorRing2,
                    {
                      borderColor: item.lightColor,
                      opacity: slideAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.15],
                      }),
                      transform: [{
                        scale: slideAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.4],
                        })
                      }]
                    }
                  ]}
                />
              </View>

              <View style={styles.contentSection}>
                <View style={[styles.badge, { backgroundColor: `${item.color}15` }]}>
                  <Text style={[styles.badgeText, { color: item.color }]}>
                    {item.title}
                  </Text>
                </View>

                <Text style={styles.heading}>{item.heading}</Text>
                
                {!!item.subtitle && (
                  <Text style={[styles.subtitle, { color: item.color }]}>
                    {item.subtitle}
                  </Text>
                )}
                
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.bottomSection}>
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === currentIndex ? currentSlide.color : '#d1d5db',
                    width: index === currentIndex ? 32 : 8,
                  }
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: currentSlide.color }]}
            onPress={handleNext}
            activeOpacity={0.9}
          >
            <Text style={styles.actionButtonText}>
              {currentSlide.isLast ? 'Commencer' : 'Continuer'}
            </Text>
            <Ionicons 
              name={currentSlide.isLast ? 'checkmark-circle' : 'arrow-forward'} 
              size={22} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  logoText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 32,
  },
  iconSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  decorRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
  },
  decorRing2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 38,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 17,
    color: '#6b7280',
    lineHeight: 26,
    fontWeight: '400',
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
    letterSpacing: -0.3,
  },
});
