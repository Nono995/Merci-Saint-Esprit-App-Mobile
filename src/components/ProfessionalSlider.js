import React, { useState } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfessionalSlider({ 
  value = 0, 
  maxValue = 100, 
  onValueChange = () => {},
  primaryColor = '#8B5CF6',
  secondaryColor = '#6D28D9',
  height = 6,
  showTooltip = false,
  disabled = false
}) {
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animatedThumbScale = new Animated.Value(1);

  // Calcul du pourcentage
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const thumbPosition = (width * percentage) / 100;

  // Gestion du drag du slider
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      setIsDragging(true);
      Animated.spring(animatedThumbScale, {
        toValue: 1.4,
        useNativeDriver: false,
        speed: 20
      }).start();
    },
    onPanResponderMove: (evt, gestureState) => {
      const newX = Math.max(0, Math.min(width, gestureState.x0 + gestureState.dx - 12));
      const newValue = (newX / width) * maxValue;
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
      <View 
        style={[styles.sliderTrack, { height }]}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        {/* Arrière-plan du slider */}
        <LinearGradient 
          colors={['#E5E7EB', '#F3F4F6']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.sliderBackground, { height }]}
        />

        {/* Barre de progression remplie */}
        <LinearGradient
          colors={[primaryColor, secondaryColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressBar,
            {
              width: `${percentage}%`,
              height,
              borderRadius: height / 2,
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDragging ? 0.4 : 0.1,
              shadowRadius: isDragging ? 8 : 4,
              elevation: isDragging ? 5 : 2
            }
          ]}
        />

        {/* Poignée du slider */}
        <Animated.View
          style={[
            styles.thumb,
            {
              left: thumbPosition - 12,
              transform: [{ scale: animatedThumbScale }],
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDragging ? 0.6 : 0.2,
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
            {isDragging && (
              <View style={styles.thumbPulse} />
            )}
          </LinearGradient>
        </Animated.View>

        {/* Indicateur de clic sur le slider */}
        {isDragging && (
          <View 
            style={[
              styles.indicatorCircle,
              { left: thumbPosition - 8 }
            ]}
          />
        )}
      </View>

      {/* Affichage du pourcentage si demandé */}
      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={[styles.tooltip, { left: Math.max(0, Math.min(width - 30, thumbPosition - 15)) }]}>
            <LinearGradient
              colors={['#2D1B69', '#1F0F47']}
              style={styles.tooltipBackground}
            >
              <Text style={styles.tooltipText}>{Math.round(percentage)}%</Text>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 4,
    justifyContent: 'center'
  },
  sliderTrack: {
    position: 'relative',
    width: '100%',
    borderRadius: 8,
    overflow: 'visible'
  },
  sliderBackground: {
    position: 'absolute',
    width: '100%',
    borderRadius: 8,
  },
  progressBar: {
    position: 'absolute',
    left: 0,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -9,
    zIndex: 10,
  },
  thumbGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  thumbPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    opacity: 0.6
  },
  indicatorCircle: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    top: -5,
    zIndex: 5
  },
  tooltipContainer: {
    position: 'absolute',
    top: -40,
    width: '100%',
    height: 40,
    justifyContent: 'center'
  },
  tooltip: {
    width: 60,
    height: 28,
    borderRadius: 6
  },
  tooltipBackground: {
    flex: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700'
  }
});
