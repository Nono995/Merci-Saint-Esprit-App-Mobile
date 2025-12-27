export const COLORS = {
  // Palette Minimaliste & Professionnelle
  primary: '#2563EB',        // Bleu professionnel sobre
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  primaryAccent: '#EFF6FF',
  primaryBg: 'rgba(37, 99, 235, 0.08)',

  // Couleurs d'Accent Subtiles
  secondary: '#10B981',      // Vert succès
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  secondaryAccent: '#ECFDF5',
  secondaryBg: 'rgba(16, 185, 129, 0.08)',

  tertiary: '#F59E0B',       // Orange attention
  tertiaryLight: '#FBBF24',
  tertiaryDark: '#D97706',
  tertiaryAccent: '#FFFBEB',
  tertiaryBg: 'rgba(245, 158, 11, 0.08)',

  quaternary: '#8B5CF6',     // Violet élégant
  quaternaryLight: '#A78BFA',
  quaternaryDark: '#7C3AED',
  quaternaryAccent: '#F5F3FF',
  quaternaryBg: 'rgba(139, 92, 246, 0.08)',

  // Couleurs Sémantiques
  success: '#10B981',
  successLight: '#6EE7B7',
  successDark: '#059669',
  successBg: 'rgba(16, 185, 129, 0.08)',
  
  warning: '#F59E0B',
  warningLight: '#FCD34D',
  warningDark: '#D97706',
  warningBg: 'rgba(245, 158, 11, 0.08)',
  
  error: '#EF4444',
  errorLight: '#FCA5A5',
  errorDark: '#DC2626',
  errorBg: 'rgba(239, 68, 68, 0.08)',
  
  info: '#3B82F6',
  infoBg: 'rgba(59, 130, 246, 0.08)',

  // Backgrounds Blancs & Propres
  background: '#FFFFFF',     // Blanc pur
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceSecondary: '#FAFAFA',
  surfaceElevated: '#FFFFFF',
  
  // Bordures Ultra-Subtiles
  border: '#F0F0F0',
  borderLight: '#F5F5F5',
  borderMedium: '#E5E5E5',
  borderDark: '#D4D4D4',

  // Textes Hiérarchisés
  text: '#171717',           // Noir doux principal
  textSecondary: '#737373',  // Gris moyen
  textTertiary: '#A3A3A3',   // Gris clair
  textMuted: '#D4D4D4',      // Gris très clair
  textInverse: '#FFFFFF',

  // Nuances de Gris Neutres
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
  
  // Effets
  shimmer: 'rgba(255, 255, 255, 0.8)',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

export const GRADIENTS = {
  // Gradients Subtils & Professionnels (très discrets)
  primary: ['#2563EB', '#3B82F6'],           // Bleu sobre
  primaryReverse: ['#3B82F6', '#2563EB'],
  
  secondary: ['#10B981', '#34D399'],         // Vert
  secondaryReverse: ['#34D399', '#10B981'],
  
  tertiary: ['#F59E0B', '#FBBF24'],          // Orange
  tertiaryReverse: ['#FBBF24', '#F59E0B'],
  
  quaternary: ['#8B5CF6', '#A78BFA'],        // Violet
  quaternaryReverse: ['#A78BFA', '#8B5CF6'],
  
  // Gradients Ultra-Subtils pour Backgrounds
  lightBlue: ['#EFF6FF', '#DBEAFE'],         // Bleu très clair
  lightGreen: ['#ECFDF5', '#D1FAE5'],        // Vert très clair
  lightOrange: ['#FFFBEB', '#FEF3C7'],       // Orange très clair
  lightPurple: ['#F5F3FF', '#EDE9FE'],       // Violet très clair
  
  // Gradients Neutres
  neutral: ['#FAFAFA', '#F5F5F5'],           // Gris très clair
  white: ['#FFFFFF', '#FAFAFA'],             // Blanc → Gris
  
  // Gradients Thématiques (discrets)
  success: ['#10B981', '#34D399'],
  warning: ['#F59E0B', '#FBBF24'],
  error: ['#EF4444', '#F87171'],
  info: ['#3B82F6', '#60A5FA'],
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  huge: 64,
};

export const FONT_SIZES = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 32,
  massive: 40,
};

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const BORDER_RADIUS = {
  none: 0,
  xs: 6,
  sm: 10,
  md: 14,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  huge: 40,
  full: 9999,
};

export const SHADOWS = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  xxl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 12,
  },
  // Ombres Colorées Subtiles
  blue: {
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  mint: {
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  coral: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  rose: {
    shadowColor: '#FFB4D6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const CATEGORY_COLORS = {
  video: {
    bg: 'rgba(37, 99, 235, 0.06)',
    text: '#2563EB',
    gradient: ['#2563EB', '#3B82F6'],
    icon: 'play-circle',
  },
  audio: {
    bg: 'rgba(139, 92, 246, 0.06)',
    text: '#8B5CF6',
    gradient: ['#8B5CF6', '#A78BFA'],
    icon: 'headset',
  },
  testimony: {
    bg: 'rgba(239, 68, 68, 0.06)',
    text: '#EF4444',
    gradient: ['#EF4444', '#F87171'],
    icon: 'heart',
  },
  event: {
    bg: 'rgba(245, 158, 11, 0.06)',
    text: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'],
    icon: 'calendar',
  },
  bible: {
    bg: 'rgba(16, 185, 129, 0.06)',
    text: '#10B981',
    gradient: ['#10B981', '#34D399'],
    icon: 'book',
  },
  prayer: {
    bg: 'rgba(16, 185, 129, 0.06)',
    text: '#10B981',
    gradient: ['#10B981', '#34D399'],
    icon: 'hand-left',
  },
  live: {
    bg: 'rgba(239, 68, 68, 0.06)',
    text: '#EF4444',
    gradient: ['#EF4444', '#F87171'],
    icon: 'radio',
  },
  donation: {
    bg: 'rgba(245, 158, 11, 0.06)',
    text: '#F59E0B',
    gradient: ['#F59E0B', '#FBBF24'],
    icon: 'heart-circle',
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.1,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
  },
};

export const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'La Puissance de la Foi',
    description: 'Un message puissant sur la transformation par la foi en Dieu et la persévérance.',
    type: 'video',
    authorName: 'Pasteur Jean',
    views: 2543,
    likes: ['user1', 'user2', 'user3'],
    shares: 124,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: '45:30',
    mediaUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.jpg',
    status: 'published',
  },
  {
    id: '2',
    title: 'Prière du Matin - Réveil Spirituel',
    description: 'Commencez votre journée avec une prière de réveil spirituel et de connexion avec Dieu.',
    type: 'video',
    authorName: 'Pasteur Marie',
    views: 1823,
    likes: ['user1', 'user4'],
    shares: 89,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: '12:15',
    mediaUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.jpg',
    status: 'published',
  },
  {
    id: '3',
    title: 'Les Fruits de l\'Esprit',
    description: 'Découvrez comment cultiver les fruits de l\'Esprit dans votre vie quotidienne.',
    type: 'video',
    authorName: 'Pasteur Pierre',
    views: 3215,
    likes: ['user2', 'user3', 'user5'],
    shares: 156,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: '38:45',
    mediaUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.jpg',
    status: 'published',
  },
];

export const MOCK_PODCASTS = [
  {
    id: 'p1',
    title: 'Le Chemin de la Sagesse',
    description: 'Une réflexion profonde sur la recherche de la sagesse divine.',
    type: 'audio',
    authorName: 'Pasteur Jean',
    views: 1542,
    likes: ['user1'],
    shares: 45,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: '28:30',
    mediaUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.mp4',
    status: 'published',
  },
  {
    id: 'p2',
    title: 'Méditation Quotidienne',
    description: 'Une pause méditative pour connecter avec l\'essence spirituelle.',
    type: 'audio',
    authorName: 'Pasteur Marie',
    views: 987,
    likes: ['user3'],
    shares: 32,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    duration: '15:00',
    mediaUrl: 'https://res.cloudinary.com/dldtb68nn/video/upload/v1764670052/g1ldnkaqtuv7abanuvxn.mp4',
    status: 'published',
  },
];

export const MOCK_TESTIMONIES = [
  {
    id: 't1',
    title: 'Guérison Miraculeuse',
    description: 'Le témoignage de Marc sur sa guérison divine après des années de souffrance.',
    type: 'testimony',
    authorName: 'Marc Dupont',
    views: 542,
    likes: ['user1', 'user2', 'user3'],
    shares: 78,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'published',
  },
  {
    id: 't2',
    title: 'Transformation de Vie',
    description: 'Comment la foi a changé radicalement la vie de Sarah.',
    type: 'testimony',
    authorName: 'Sarah Moreau',
    views: 723,
    likes: ['user2', 'user4'],
    shares: 95,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    status: 'published',
  },
];

export const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Service du Dimanche',
    description: 'Culte dominical - Louange, enseignement et communion fraternelle.',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Église du Centre, 123 Rue Principale',
    attendees: 245,
    type: 'service',
  },
  {
    id: 'e2',
    title: 'Retraite Spirituelle',
    description: 'Weekend de prière, méditation et transformation spirituelle profonde.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    location: 'Monastère de la Paix, Montagne Sainte',
    attendees: 87,
    type: 'retreat',
  },
  {
    id: 'e3',
    title: 'Groupe de Prière',
    description: 'Prière collective et partage spirituel en communauté.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: 'Salle Communautaire',
    attendees: 32,
    type: 'prayer',
  },
  {
    id: 'e4',
    title: 'Conférence Jeunesse',
    description: 'Rencontre spéciale pour les jeunes - Musique, témoignages et enseignement.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    location: 'Centre Jeunesse, 45 Avenue des Jeunes',
    attendees: 156,
    type: 'youth',
  },
  {
    id: 'e5',
    title: 'Séminaire de Formation',
    description: 'Formation biblique approfondie sur les fondements de la foi chrétienne.',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    location: 'Salle de Conférence, Église Principale',
    attendees: 68,
    type: 'conference',
  },
  {
    id: 'e6',
    title: 'Soirée de Louange',
    description: 'Soirée spéciale de louange et adoration avec groupe de musique live.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: 'Auditorium Principal',
    attendees: 312,
    type: 'service',
  },
  {
    id: 'e7',
    title: 'Petit-déjeuner de Prière',
    description: 'Commencez la journée dans la prière et la communion fraternelle.',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    location: 'Café de l\'Église',
    attendees: 45,
    type: 'prayer',
  },
  {
    id: 'e8',
    title: 'Camp Familial',
    description: 'Weekend familial avec activités, enseignements et moments de partage.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    location: 'Centre de Vacances La Colline',
    attendees: 128,
    type: 'retreat',
  },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: '🎉 Nouvelle Série de Enseignements',
    description: 'Nous commençons une nouvelle série intitulée "Les Fondations de la Foi" chaque mardi à 19h. Rejoignez-nous pour approfondir votre compréhension spirituelle.',
    type: 'announcement',
    priority: 'high',
    category: 'Enseignement',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    authorName: 'Administration',
    views: 342,
  },
  {
    id: 'a2',
    title: '📢 Modification Horaire du Service',
    description: 'À partir de dimanche prochain, le service du matin sera à 9h30 au lieu de 10h. Merci de prendre note du changement.',
    type: 'announcement',
    priority: 'high',
    category: 'Horaire',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    authorName: 'Administration',
    views: 521,
  },
  {
    id: 'a3',
    title: '❤️ Campagne de Partage - Aide Humanitaire',
    description: 'Nous lançons une campagne pour soutenir les familles dans le besoin. Vos dons et bénévolat sont les bienvenues. Ensemble, faisons la différence!',
    type: 'announcement',
    priority: 'medium',
    category: 'Appel à l\'Action',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    authorName: 'Comité Social',
    views: 765,
  },
  {
    id: 'a4',
    title: '🙏 Invitation - Jeûne et Prière Collective',
    description: 'Vous êtes invités à participer à notre semaine de jeûne et prière du 15 au 21 décembre. C\'est une occasion de se rapprocher spirituellement.',
    type: 'announcement',
    priority: 'medium',
    category: 'Événement Spécial',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    authorName: 'Direction Spirituelle',
    views: 298,
  },
  {
    id: 'a5',
    title: '✨ Bienvenue à Notre Nouvelle Pasteure',
    description: 'Nous accueillons chaleureusement la Pasteure Sophie Martin qui rejoindra notre équipe spirituelle. Soyons unis dans ce nouveau chapitre!',
    type: 'announcement',
    priority: 'low',
    category: 'Annonce Générale',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    authorName: 'Administration',
    views: 412,
  },
];
