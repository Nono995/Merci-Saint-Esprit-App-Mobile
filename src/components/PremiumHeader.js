import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

export default function PremiumHeader({
  title,
  showLogo = false,
  onSearchPress,
  onMessagesPress,
  onNotificationsPress,
  onProfilePress,
  messagesCount = 0,
  notificationsCount = 0,
  variant = 'gradient',
}) {
  const getGradientColors = () => {
    switch (variant) {
      case 'purple':
        return [COLORS.gradient1, COLORS.gradient2];
      case 'pink':
        return [COLORS.secondary, COLORS.secondaryDark];
      case 'cyan':
        return [COLORS.accent, '#0E7490'];
      default:
        return [COLORS.gradient1, COLORS.gradient2];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Left section - Logo/Title */}
          <View style={styles.leftSection}>
            {showLogo ? (
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <Text style={styles.title}>{title}</Text>
            )}
          </View>

          {/* Right section - Actions */}
          <View style={styles.rightSection}>
            {onSearchPress && (
              <TouchableOpacity
                onPress={onSearchPress}
                style={styles.actionButton}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            )}

            {onMessagesPress && (
              <TouchableOpacity
                onPress={onMessagesPress}
                style={styles.actionButton}
              >
                <View style={[styles.iconCircle, styles.hasNotification]}>
                  <Ionicons
                    name="chatbubbles-outline"
                    size={20}
                    color={COLORS.white}
                  />
                  {messagesCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {messagesCount > 9 ? '9+' : messagesCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}

            {onNotificationsPress && (
              <TouchableOpacity
                onPress={onNotificationsPress}
                style={styles.actionButton}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={COLORS.white}
                  />
                  {notificationsCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {notificationsCount > 9 ? '9+' : notificationsCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}

            {onProfilePress && (
              <TouchableOpacity
                onPress={onProfilePress}
                style={styles.actionButton}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="person-circle-outline"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingBottom: SPACING.lg,
  },
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  logoContainer: {
    width: 90,
    height: 50,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionButton: {
    padding: SPACING.xs,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.xs,
  },
  hasNotification: {
    // Additional styling for notification state
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.sm,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    paddingHorizontal: 4,
  },
});
