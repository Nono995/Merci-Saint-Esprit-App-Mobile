import React, { useState } from 'react';
import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Composant slider circulaire / vertical professionnel
 * Idéal pour contrôles de volume, brightness, etc.
 */
export default function VerticalSlider({
  value = 50,
  maxValue = 100,
  onValueChange = () => {},
  primaryColor = '#8B5CF6',
  secondaryColor = '#6D28D9',
  width = 6,
  size = 150,
  showLabel = true,
  label = 'Volume',
  disabled = false
}) {
  const [height, setHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animatedThumbScale = new Animated.Value(1);

  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const thumbPosition = (height * percentage) / 100;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      setIsDragging(true);
      Animated.spring(animatedThumbScale, {
        toValue: 1.3,
        useNativeDriver: false,
        speed: 20
      }).start();
    },
    onPanResponderMove: (evt, gestureState) => {
      const newY = height - Math.max(0, Math.min(height, gestureState.y0 + gestureState.dy - 8));
      const newValue = (newY / height) * maxValue;
      onValueChange(newValue);
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      Animated.spring(animatedThumbScale, {
        toValue: 1,
        useNativeDriver: false,
        speed: 20
      }).start();
    }
  });

  return (
    <View style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{Math.round(percentage)}%</Text>
        </View>
      )}
      
      <View
        style={[styles.verticalSlider, { width, height: size }]}
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        {...panResponder.panHandlers}
      >
        {/* Arrière-plan */}
        <LinearGradient
          colors={['#E5E7EB', '#F3F4F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.sliderBackground, { width }]}
        />

        {/* Barre remplie (du bas vers le haut) */}
        <View
          style={[
            styles.filledPortion,
            {
              width,
              height: `${percentage}%`,
              bottom: 0
            }
          ]}
        >
          <LinearGradient
            colors={[secondaryColor, primaryColor]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              flex: 1,
              width: '100%'
            }}
          />
        </View>

        {/* Poignée */}
        <Animated.View
          style={[
            styles.verticalThumb,
            {
              bottom: `${percentage}%`,
              transform: [
                { scale: animatedThumbScale },
                { translateY: isDragging ? 0 : 0 }
              ],
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: isDragging ? 4 : 2 },
              shadowOpacity: isDragging ? 0.5 : 0.2,
              shadowRadius: isDragging ? 12 : 4,
              elevation: isDragging ? 8 : 3
            }
          ]}
        >
          <LinearGradient
            colors={[primaryColor, secondaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.thumbGradient}
          >
            {isDragging && <View style={styles.thumbCenter} />}
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelContainer: {
    marginBottom: 12,
    alignItems: 'center'
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6'
  },
  verticalSlider: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'visible',
    backgroundColor: 'transparent'
  },
  sliderBackground: {
    position: 'absolute',
    height: '100%',
    borderRadius: 8,
    top: 0
  },
  filledPortion: {
    position: 'absolute',
    borderRadius: 8
  },
  verticalThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    left: -9,
    zIndex: 10
  },
  thumbGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  thumbCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
    opacity: 0.7
  }
});
