import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const LoadingSpinner = ({
  size = 'large',
  color,
  text,
  fullScreen = false,
}) => {
  const { COLORS } = useTheme();
  const { SPACING, FONT_SIZES } = useTheme();
  const styles = createStyles({ SPACING, FONT_SIZES, COLORS });
  const containerStyle = fullScreen ? styles.fullScreen : styles.container;
  const spinnerColor = color || COLORS.primary;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {!!text && (
        <Text style={[styles.text, { color: spinnerColor }]}> 
          {text}
        </Text>
      )}
    </View>
  );
};

const createStyles = ({ SPACING, FONT_SIZES, COLORS }) =>
  StyleSheet.create({
    container: {
      padding: SPACING.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
    },
    text: {
      marginTop: SPACING.md,
      fontSize: FONT_SIZES.md,
      textAlign: 'center',
    },
  });
