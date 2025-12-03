import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const Card = ({
  children,
  style,
  onPress,
  padding = 'md',
  shadow = 'sm',
  backgroundColor,
  borderRadius,
  animated = true,
  variant = 'default',
}) => {
  const { COLORS, SPACING, BORDER_RADIUS: BR, SHADOWS } = useTheme();
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const styles = createStyles({ SPACING, BORDER_RADIUS: BR });

  const resolvedBg = backgroundColor || COLORS.surface;
  const resolvedRadius = borderRadius || BR.lg;

  const getShadowStyle = (variant) => {
    if (SHADOWS && SHADOWS[variant]) return SHADOWS[variant];
    return SHADOWS.sm || {};
  };

  const handlePressIn = () => {
    if (animated && onPress) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animated && onPress) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
        tension: 40,
      }).start();
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: COLORS.gray200,
        };
      case 'gradient':
        return {
          borderWidth: 1,
          borderColor: `${COLORS.primary}20`,
          backgroundColor: `${COLORS.primary}05`,
        };
      default:
        return {};
    }
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: resolvedBg,
      borderRadius: resolvedRadius,
    },
    styles[padding],
    getShadowStyle(shadow),
    getVariantStyle(),
    style,
  ];

  if (onPress) {
    return (
      <Animated.View
        style={[
          { transform: animated ? [{ scale: scaleAnim }] : [] },
        ]}
      >
        <TouchableOpacity
          style={cardStyle}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const createStyles = ({ SPACING, BORDER_RADIUS }) =>
  StyleSheet.create({
    card: {
      marginVertical: SPACING.md,
      marginHorizontal: SPACING.md,
    },
    xs: {
      padding: SPACING.sm,
    },
    sm: {
      padding: SPACING.md,
    },
    md: {
      padding: SPACING.lg,
    },
    lg: {
      padding: SPACING.xl,
    },
    xl: {
      padding: SPACING.xxl,
    },
  });
