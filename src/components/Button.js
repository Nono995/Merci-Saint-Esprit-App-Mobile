import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
  rounded = true,
}) => {
  const { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } = useTheme();
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const styles = createStyles({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS });

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (!rounded) baseStyle.push(styles.noRounded);

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
      case 'success':
        baseStyle.push(styles.success);
        break;
      case 'danger':
        baseStyle.push(styles.danger);
        break;
      case 'gradient':
        baseStyle.push(styles.gradient);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    if (!disabled && (variant === 'primary' || variant === 'success' || variant === 'gradient')) {
      baseStyle.push(SHADOWS.sm);
    }

    return baseStyle;
  };

  const getGradientColors = () => {
    switch (variant) {
      case 'gradient':
        return [COLORS.gradient1, COLORS.gradient2];
      default:
        return [COLORS.primary, COLORS.primary];
    }
  };

  const renderButtonContent = () => (
    <View style={styles.buttonContent}>
      {!!icon && (
        <Ionicons
          name={icon}
          size={20}
          color={
            variant === 'outline' || variant === 'ghost'
              ? COLORS.primary
              : COLORS.white
          }
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.buttonText,
          styles[variant + 'Text'],
          styles[size + 'Text'],
          textStyle,
        ]}
      >
        {title}
      </Text>
    </View>
  );

  if (variant === 'gradient') {
    return (
      <Animated.View
        style={[
          { transform: [{ scale: scaleAnim }] },
          fullWidth && styles.fullWidth,
        ]}
      >
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[...getButtonStyle(), style]}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={1}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              renderButtonContent()
            )}
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        fullWidth && styles.fullWidth,
      ]}
    >
      <TouchableOpacity
        style={[...getButtonStyle(), style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'outline' || variant === 'ghost'
                ? COLORS.primary
                : COLORS.white
            }
          />
        ) : (
          renderButtonContent()
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const createStyles = ({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS }) =>
  StyleSheet.create({
    button: {
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginRight: SPACING.sm,
    },
    fullWidth: {
      width: '100%',
    },
    noRounded: {
      borderRadius: 0,
    },

    // Sizes
    sm: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      minHeight: 36,
    },
    md: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      minHeight: 44,
    },
    lg: {
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.lg,
      minHeight: 52,
    },

    // Variants
    primary: {
      backgroundColor: COLORS.primary,
    },
    secondary: {
      backgroundColor: COLORS.secondary,
    },
    outline: {
      backgroundColor: COLORS.white,
      borderWidth: 1.5,
      borderColor: COLORS.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    success: {
      backgroundColor: COLORS.success,
    },
    danger: {
      backgroundColor: COLORS.error,
    },
    gradient: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.5,
    },

    // Text styles
    buttonText: {
      fontWeight: FONT_WEIGHTS.semibold,
      textAlign: 'center',
    },
    primaryText: {
      color: COLORS.white,
    },
    secondaryText: {
      color: COLORS.white,
    },
    outlineText: {
      color: COLORS.primary,
    },
    ghostText: {
      color: COLORS.primary,
    },
    successText: {
      color: COLORS.white,
    },
    dangerText: {
      color: COLORS.white,
    },
    gradientText: {
      color: COLORS.white,
    },
    smText: {
      fontSize: FONT_SIZES.sm,
    },
    mdText: {
      fontSize: FONT_SIZES.md,
    },
    lgText: {
      fontSize: FONT_SIZES.lg,
    },
  });
