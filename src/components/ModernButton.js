import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const ModernButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  gradient = null,
  neonGlow = false,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (neonGlow) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [neonGlow]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
    sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.base, fontSize: FONT_SIZES.sm },
    md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, fontSize: FONT_SIZES.md },
    lg: { paddingVertical: SPACING.base, paddingHorizontal: SPACING.xl, fontSize: FONT_SIZES.lg },
  };

  const variants = {
    primary: { bg: COLORS.primary, text: COLORS.text },
    secondary: { bg: COLORS.secondary, text: COLORS.text },
    tertiary: { bg: COLORS.tertiary, text: COLORS.text },
    accent: { bg: COLORS.accent, text: COLORS.textInverse },
    success: { bg: COLORS.success, text: COLORS.text },
    ghost: { bg: 'transparent', text: COLORS.primary, border: COLORS.primary },
    outline: { bg: 'transparent', text: COLORS.text, border: COLORS.border },
  };

  const sizeStyle = sizes[size];
  const variantStyle = variants[variant];

  const buttonStyle = [
    styles.button,
    {
      paddingVertical: sizeStyle.paddingVertical,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      backgroundColor: variantStyle.bg,
      borderRadius: BORDER_RADIUS.base,
      transform: [{ scale: scaleAnim }],
    },
    fullWidth && styles.fullWidth,
    (variant === 'ghost' || variant === 'outline') && {
      borderWidth: 2,
      borderColor: variantStyle.border,
    },
    disabled && styles.disabled,
    neonGlow && SHADOWS.neonBlue,
    style,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize: sizeStyle.fontSize,
      color: variantStyle.text,
    },
  ];

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={variantStyle.text} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={sizeStyle.fontSize + 4} color={variantStyle.text} style={styles.iconLeft} />
          )}
          <Text style={textStyle}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={sizeStyle.fontSize + 4} color={variantStyle.text} style={styles.iconRight} />
          )}
        </>
      )}
    </>
  );

  if (gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
      >
        <Animated.View style={buttonStyle}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            {renderContent()}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
    >
      <Animated.View style={buttonStyle}>
        {renderContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: FONT_WEIGHTS.semibold,
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
});

export default ModernButton;
