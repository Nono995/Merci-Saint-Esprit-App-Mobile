import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationHelper } from '../navigation/NavigationHelper';
import { useTheme } from '../theme/ThemeProvider';

const Header = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightIcons = [],
  backgroundGradient, // resolved from theme inside
  textColor, // resolved from theme inside
  iconColor, // resolved from theme inside
  navigation, // Ajout de la prop navigation
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation) {
      NavigationHelper.goBack(navigation);
    }
  };

  const handleRightIconPress = (icon) => {
    if (icon.onPress) {
      icon.onPress();
    } else if (icon.action) {
      // Actions prédéfinies
      switch (icon.action) {
        case 'search':
          NavigationHelper.goToSearch(navigation);
          break;
        case 'profile':
          NavigationHelper.goToProfile(navigation);
          break;
        case 'add':
          NavigationHelper.goToAddContent(navigation);
          break;
        case 'home':
          NavigationHelper.goHome(navigation);
          break;
        default:
          break;
      }
    }
  };

  const { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } = useTheme();
  const styles = createStyles({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS });
  const bgColors = Array.isArray(backgroundGradient) ? backgroundGradient : [COLORS.primary, COLORS.secondary];
  const resolvedTextColor = textColor || COLORS.white;
  const resolvedIconColor = iconColor || COLORS.white;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={bgColors[0]} />
  <LinearGradient colors={bgColors} style={[styles.header, SHADOWS.sm]}>
        <View style={styles.headerContent}>
          {/* Bouton retour */}
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={20} color={resolvedIconColor} />
            </TouchableOpacity>
          )}

          {/* Titre et sous-titre */}
          <View style={[styles.titleContainer, { flex: showBack ? 1 : undefined }]}>
            <Text style={[styles.title, { color: resolvedTextColor }]}>{title}</Text>
            {!!subtitle && (
              <Text style={[styles.subtitle, { color: resolvedTextColor }]}>{subtitle}</Text>
            )}
          </View>

          {/* Icônes de droite */}
          <View style={styles.rightIcons}>
            {rightIcons.map((icon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.rightIcon}
                onPress={() => handleRightIconPress(icon)}
              >
                <Ionicons name={icon.name} size={icon.size || 24} color={resolvedIconColor} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const HeaderWithIcon = ({
  icon,
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightIcons = [],
  backgroundGradient, // resolved from theme inside
  textColor, // resolved from theme inside
  iconColor, // resolved from theme inside
  navigation, // Ajout de la prop navigation
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation) {
      NavigationHelper.goBack(navigation);
    }
  };

  const handleRightIconPress = (iconItem) => {
    if (iconItem.onPress) {
      iconItem.onPress();
    } else if (iconItem.action) {
      // Actions prédéfinies
      switch (iconItem.action) {
        case 'search':
          NavigationHelper.goToSearch(navigation);
          break;
        case 'profile':
          NavigationHelper.goToProfile(navigation);
          break;
        case 'add':
          NavigationHelper.goToAddContent(navigation);
          break;
        case 'home':
          NavigationHelper.goHome(navigation);
          break;
        default:
          break;
      }
    }
  };

  const { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } = useTheme();
  const styles = createStyles({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS });
  const bgColors = Array.isArray(backgroundGradient) ? backgroundGradient : [COLORS.primary, COLORS.secondary];
  const resolvedTextColor = textColor || COLORS.white;
  const resolvedIconColor = iconColor || COLORS.white;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={bgColors[0]} />
      <LinearGradient colors={bgColors} style={[styles.header, SHADOWS.sm]}>
        <View style={styles.headerContent}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={24} color={resolvedIconColor} />
            </TouchableOpacity>
          )}

          <View style={[styles.titleContainer, { flex: showBack ? 1 : undefined }]}>
            <View style={styles.iconTitleContainer}>
              <View style={[styles.headerIcon, { backgroundColor: iconColor + '20' }]}>
                <Ionicons name={icon} size={32} color={resolvedIconColor} />
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={[styles.title, { color: resolvedTextColor }]}>{title}</Text>
                {!!subtitle && (
                  <Text style={[styles.subtitle, { color: resolvedTextColor }]}>{subtitle}</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.rightIcons}>
            {rightIcons.map((iconItem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.rightIcon}
                onPress={() => handleRightIconPress(iconItem)}
              >
                <Ionicons name={iconItem.name} size={iconItem.size || 24} color={resolvedIconColor} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const createStyles = ({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS }) => {
  // On web react-native-web déprécie shadow* ; mapper sur boxShadow si disponible
  const webShadow = SHADOWS && SHADOWS.sm && typeof SHADOWS.sm.boxShadow === 'string' ? { boxShadow: SHADOWS.sm.boxShadow } : {};

  return StyleSheet.create({
    header: {
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.lg,
      paddingHorizontal: SPACING.md,
      borderBottomLeftRadius: BORDER_RADIUS.xl,
      borderBottomRightRadius: BORDER_RADIUS.xl,
      backgroundColor: COLORS.primary,
      ...webShadow,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      backgroundColor: COLORS.white + '20',
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.sm,
      marginRight: SPACING.sm,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    iconTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerIcon: {
      width: 52,
      height: 52,
      borderRadius: BORDER_RADIUS.xxl,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.lg,
    },
    titleTextContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      textAlign: 'center',
      marginBottom: SPACING.xs,
    },
    subtitle: {
      fontSize: FONT_SIZES.md,
      opacity: 0.9,
      textAlign: 'center',
    },
    rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightIcon: {
      backgroundColor: COLORS.white + '18',
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.sm,
      marginLeft: SPACING.sm,
    },
  });
};

export { Header, HeaderWithIcon };
