// Styles communs pour l'application - Optimisés pour une meilleure expérience utilisateur et cohérence visuelle
import { StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from './theme';

// Styles réutilisables pour les composants de l'application - Version optimisée
export const createCommonStyles = () => ({
  // Conteneurs - Optimisés pour une meilleure expérience utilisateur
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'ios' ? SPACING.md : 0,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl, // Espace supplémentaire en bas pour éviter que le contenu soit caché par la barre de navigation
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'ios' ? SPACING.xl : SPACING.md,
  },

  // Textes - Optimisés pour une meilleure lisibilité et hiérarchie visuelle
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    letterSpacing: -0.5, // Améliore la lisibilité des grands titres
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.gray600,
    marginBottom: SPACING.md,
    letterSpacing: 0.1,
  },
  bodyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray700,
    lineHeight: FONT_SIZES.md * 1.6, // Augmentation de l'interligne pour une meilleure lisibilité
  },
  captionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray500,
    letterSpacing: 0.2, // Améliore la lisibilité des petits textes
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium, // Rend les messages d'erreur plus visibles
  },
  highlightText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  // Formulaires - Optimisés pour une meilleure expérience utilisateur
  formGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.gray700,
    marginBottom: SPACING.xs,
    letterSpacing: 0.2,
  },
  input: {
    height: 52, // Légèrement plus grand pour une meilleure accessibilité
    borderWidth: 1.5, // Bordure plus visible
    borderColor: COLORS.gray300,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.white,
    color: COLORS.gray800,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    ...SHADOWS.sm,
  },
  inputIcon: {
    position: 'absolute',
    left: SPACING.md,
    top: 16, // Ajusté pour le nouvel input height
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: SPACING.xl + SPACING.xs,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  formHint: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },

  // Cartes et sections - Design modernisé
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
    borderWidth: 0, // Suppression de la bordure pour un look plus moderne
  },
  cardElevated: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.md, // Ombre plus prononcée
  },
  cardHorizontal: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray800,
    marginBottom: SPACING.md,
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  // Listes - Design modernisé avec animations subtiles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemIcon: {
    marginRight: SPACING.md,
    width: 44, // Légèrement plus grand
    height: 44, // Légèrement plus grand
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray100, // Fond subtil pour l'icône
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.gray800,
    marginBottom: SPACING.xs,
  },
  listItemSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray600,
  },
  listItemAction: {
    marginLeft: SPACING.sm,
  },

  // Badges et indicateurs - Design modernisé
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },
  badgeSmall: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeTextSmall: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  statusOnline: {
    backgroundColor: COLORS.success,
  },
  statusOffline: {
    backgroundColor: COLORS.gray400,
  },

  // Animations et états - Effets visuels améliorés
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  skeleton: {
    backgroundColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  pressable: {
    // Styles pour les éléments pressables
  },
  pressableActive: {
    opacity: 0.7,
  },
  shimmer: {
    backgroundColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  // Nouveaux styles pour les animations et transitions
  fadeTransition: {
    transition: 'opacity 0.3s ease',
  },
  scaleTransition: {
    transition: 'transform 0.2s ease',
  },
});

// Fonction pour créer des styles avec le thème actuel - Version optimisée
export const createStyles = (theme) => {
  const commonStyles = createCommonStyles();
  
  // Styles spécifiques au thème avec prise en charge améliorée du mode sombre
  const themeSpecificStyles = {
    // Conteneurs
    screenContainer: {
      ...commonStyles.screenContainer,
      backgroundColor: theme.mode === 'dark' ? COLORS.gray900 : COLORS.background,
    },
    
    // Textes
    title: {
      ...commonStyles.title,
      color: theme.mode === 'dark' ? COLORS.gray100 : COLORS.black,
    },
    subtitle: {
      ...commonStyles.subtitle,
      color: theme.mode === 'dark' ? COLORS.gray300 : COLORS.gray600,
    },
    bodyText: {
      ...commonStyles.bodyText,
      color: theme.mode === 'dark' ? COLORS.gray300 : COLORS.gray700,
    },
    captionText: {
      ...commonStyles.captionText,
      color: theme.mode === 'dark' ? COLORS.gray400 : COLORS.gray500,
    },
    
    // Cartes
    card: {
      ...commonStyles.card,
      backgroundColor: theme.mode === 'dark' ? COLORS.gray800 : COLORS.white,
    },
    cardElevated: {
      ...commonStyles.cardElevated,
      backgroundColor: theme.mode === 'dark' ? COLORS.gray800 : COLORS.white,
    },
    
    // Formulaires
    input: {
      ...commonStyles.input,
      backgroundColor: theme.mode === 'dark' ? COLORS.gray800 : COLORS.white,
      color: theme.mode === 'dark' ? COLORS.gray100 : COLORS.gray800,
      borderColor: theme.mode === 'dark' ? COLORS.gray700 : COLORS.gray300,
    },
    
    // Divider
    divider: {
      ...commonStyles.divider,
      backgroundColor: theme.mode === 'dark' ? COLORS.gray700 : COLORS.gray200,
    },
  };
  
  return { ...commonStyles, ...themeSpecificStyles };
};

// Styles pour les animations avancées
export const animationStyles = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { translateY: 20, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  },
  slideDown: {
    from: { translateY: -20, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  },
  scale: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
};

export default createStyles;