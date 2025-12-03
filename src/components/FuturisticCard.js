import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const FuturisticCard = ({
  children,
  gradient = null,
  glassEffect = false,
  neonBorder = false,
  neonColor = COLORS.primary,
  onPress,
  style,
  padding = SPACING.base,
  borderRadius = BORDER_RADIUS.lg,
  shadow = 'md',
  animated = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    }
  };

  const cardStyle = [
    styles.card,
    {
      padding,
      borderRadius,
      transform: [{ scale: scaleAnim }],
    },
    SHADOWS[shadow],
    style,
  ];

  const content = (
    <View style={styles.content}>
      {children}
    </View>
  );

  // Carte avec effet verre
  if (glassEffect) {
    return (
      <Animated.View style={cardStyle}>
        <View style={[styles.glassContainer, { borderRadius }]}>
          <View style={[styles.glassOverlay, { borderRadius }]} />
          {neonBorder && (
            <View style={[styles.neonBorder, { borderRadius, borderColor: neonColor }]} />
          )}
          {content}
        </View>
      </Animated.View>
    );
  }

  // Carte avec gradient
  if (gradient) {
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={!onPress}
      >
        <Animated.View style={cardStyle}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientContainer, { borderRadius }]}
          >
            {neonBorder && (
              <View style={[styles.neonBorder, { borderRadius, borderColor: neonColor }]} />
            )}
            {content}
          </LinearGradient>
        </Animated.View>
      </Wrapper>
    );
  }

  // Carte standard
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      disabled={!onPress}
    >
      <Animated.View style={[cardStyle, styles.standardCard]}>
        {neonBorder && (
          <View style={[styles.neonBorder, { borderRadius, borderColor: neonColor }]} />
        )}
        {content}
      </Animated.View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  standardCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  glassContainer: {
    backgroundColor: COLORS.surfaceGlass,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  gradientContainer: {
    overflow: 'hidden',
  },
  neonBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});

export default FuturisticCard;
