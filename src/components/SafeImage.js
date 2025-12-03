import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

// SafeImage: renders an Image if source.uri is truthy, otherwise a placeholder View
export const SafeImage = ({ source, style, resizeMode = 'cover', placeholderColor }) => {
  const { COLORS } = useTheme();
  const uri = source && source.uri;

  placeholderColor = placeholderColor || COLORS.muted;

  if (!uri) {
    return <View style={[styles.placeholder, style, { backgroundColor: placeholderColor }]} />;
  }

  return <Image source={{ uri }} style={style} resizeMode={resizeMode} />;
};

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SafeImage;
