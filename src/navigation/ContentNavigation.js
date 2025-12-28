// Système de navigation contextuelle pour différents types de contenu
export const ContentNavigation = {
  // Détermine le type de contenu et navigue vers la bonne destination
  navigateToContent: (navigation, item) => {
    switch (item.type) {
      case 'video':
      case 'live':
        return navigation.navigate('VideoPlayer', { post: item });

      case 'event':
        return navigation.navigate('Events', { event: item });

      case 'prayer':
        return navigation.navigate('PrayerRequests');

      case 'testimony':
        return navigation.navigate('MainTabs', { screen: 'Testimonies' });

      case 'podcast':
        return navigation.navigate('Podcast');

      case 'donation':
        return navigation.navigate('Dons');

      default:
        // Contenu général - ouvrir dans un navigateur ou modal
        return navigation.navigate('MainTabs', { screen: 'Home' });
    }
  },

  // Navigation par catégorie
  navigateByCategory: (navigation, category) => {
    const categoryMap = {
      'culte': 'Home',
      'direct': 'Live',
      'événements': 'Events',
      'prières': 'PrayerRequests',
      'témoignages': 'Testimonies',
      'podcasts': 'Podcast',
      'dons': 'Dons',
      'profil': 'Profile',
    };

    const targetScreen = categoryMap[category.toLowerCase()];
    if (targetScreen) {
      const tabScreens = ['Home', 'Videos', 'Bible', 'Testimonies', 'Profile'];
      if (tabScreens.includes(targetScreen)) {
        navigation.navigate('MainTabs', { screen: targetScreen });
      } else {
        navigation.navigate(targetScreen);
      }
    }
  },

  // Actions rapides depuis n'importe quel écran
  quickActions: {
    search: (navigation) => navigation.navigate('Search'),
    addContent: (navigation) => navigation.navigate('AddContent'),
    notifications: (navigation) => {
      // TODO: Implémenter les notifications
      console.log('Notifications pas encore implémentées');
    },
    settings: (navigation) => navigation.navigate('Profile'),
  },

  // Navigation avec fallback
  navigateWithFallback: (navigation, primaryRoute, fallbackRoute = 'Home') => {
    try {
      navigation.navigate(primaryRoute);
    } catch (error) {
      console.warn(`Navigation failed for ${primaryRoute}, falling back to ${fallbackRoute}`);
      navigation.navigate('MainTabs', { screen: fallbackRoute });
    }
  }
};

// Types de contenu pour la navigation
export const ContentTypes = {
  VIDEO: 'video',
  LIVE: 'live',
  EVENT: 'event',
  PRAYER: 'prayer',
  TESTIMONY: 'testimony',
  PODCAST: 'podcast',
  DONATION: 'donation',
  GENERAL: 'general'
};

// Fonction utilitaire pour déterminer le type de contenu
export const getContentType = (item) => {
  if (item.type) return item.type;

  // Déduction basée sur les propriétés
  if (item.duration && item.thumbnail) return ContentTypes.VIDEO;
  if (item.date && item.time && item.location) return ContentTypes.EVENT;
  if (item.prayerCount !== undefined) return ContentTypes.PRAYER;
  if (item.author && item.description) return ContentTypes.TESTIMONY;

  return ContentTypes.GENERAL;
};
