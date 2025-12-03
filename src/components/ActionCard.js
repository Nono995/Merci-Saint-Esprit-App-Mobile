import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

export default function ActionCard({
  icon,
  label,
  onPress,
  color = COLORS.primary,
  variant = 'filled',
  size = 'md',
  style,
}) {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 40,
    }).start();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: styles.smContainer,
          icon: 20,
          iconSize: 40,
          textSize: FONT_SIZES.xs,
        };
      case 'lg':
        return {
          container: styles.lgContainer,
          icon: 28,
          iconSize: 56,
          textSize: FONT_SIZES.md,
        };
      default:
        return {
          container: styles.mdContainer,
          icon: 24,
          iconSize: 48,
          textSize: FONT_SIZES.sm,
        };
    }
  };

  const sizes = getSizeStyles();

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
        style={sizes.container}
      >
        {variant === 'gradient' ? (
          <LinearGradient
            colors={[color, adjustColor(color, -20)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Ionicons
                name={icon}
                size={sizes.icon}
                color={COLORS.white}
              />
            </View>
          </LinearGradient>
        ) : (
          <>
            <View style={[
              styles.iconContainer,
              {
                backgroundColor: variant === 'filled' ? color : `${color}15`,
              }
            ]}>
              <Ionicons
                name={icon}
                size={sizes.icon}
                color={variant === 'filled' ? COLORS.white : color}
              />
            </View>
            {variant === 'outlined' && (
              <View style={[styles.border, { borderColor: color }]} />
            )}
          </>
        )}

        <Text style={[
          styles.label,
          {
            fontSize: sizes.textSize,
            color: variant === 'filled' ? COLORS.black : COLORS.gray800,
          }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function adjustColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

const styles = StyleSheet.create({
  smContainer: {
    alignItems: 'center',
    gap: SPACING.xs,
    padding: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.xs,
  },
  mdContainer: {
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.sm,
  },
  lgContainer: {
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    width: '100%',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
  },
  border: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1.5,
  },
  label: {
    fontWeight: FONT_WEIGHTS.semibold,
    textAlign: 'center',
  },
});
