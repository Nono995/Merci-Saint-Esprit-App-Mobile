import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const ModernCard = ({
  icon,
  title,
  subtitle,
  backgroundColor,
  iconColor,
  onPress,
  size = 'medium',
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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

  const sizes = {
    small: {
      height: 100,
      iconSize: 28,
      titleSize: FONT_SIZES.sm,
      subtitleSize: FONT_SIZES.xs,
    },
    medium: {
      height: 140,
      iconSize: 36,
      titleSize: FONT_SIZES.md,
      subtitleSize: FONT_SIZES.sm,
    },
    large: {
      height: 180,
      iconSize: 44,
      titleSize: FONT_SIZES.lg,
      subtitleSize: FONT_SIZES.md,
    },
  };

  const sizeConfig = sizes[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor || COLORS.surface,
            height: sizeConfig.height,
            transform: [{ scale: scaleAnim }],
          },
          SHADOWS.sm,
          style,
        ]}
      >
        {/* Icon Container */}
        <View style={[styles.iconContainer, { backgroundColor: iconColor || COLORS.primary }]}>
          <Ionicons name={icon} size={sizeConfig.iconSize} color={COLORS.textInverse} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text
            style={[styles.title, { fontSize: sizeConfig.titleSize }]}
            numberOfLines={2}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, { fontSize: sizeConfig.subtitleSize }]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.base,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 22,
  },
  subtitle: {
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default ModernCard;
