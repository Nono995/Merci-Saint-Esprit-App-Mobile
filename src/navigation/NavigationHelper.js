import { CommonActions } from '@react-navigation/native';

// Helper pour une navigation cohérente
export const NavigationHelper = {
  // Navigation principale
  goHome: (navigation) => navigation.navigate('MainTabs', { screen: 'Home' }),
  goToTab: (navigation, tabName) => navigation.navigate('MainTabs', { screen: tabName }),

  // Navigation des écrans principaux
  goToSearch: (navigation) => navigation.navigate('Search'),
  goToProfile: (navigation) => navigation.navigate('Profile'),
  goToEvents: (navigation) => navigation.navigate('MainTabs', { screen: 'Événements' }),
  goToPrayers: (navigation) => navigation.navigate('MainTabs', { screen: 'Prières' }),

  // Navigation contextuelle
  goToVideoPlayer: (navigation, post) => navigation.navigate('VideoPlayer', { post }),
  goToEventDetail: (navigation, event) => navigation.navigate('EventDetail', { event }),
  goToAddContent: (navigation) => navigation.navigate('AddContent'),

  // Navigation d'authentification
  goToLogin: (navigation) => navigation.navigate('Login'),
  goToRegister: (navigation) => navigation.navigate('Register'),

  // Actions spéciales
  goBack: (navigation) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  },
  resetToHome: (navigation) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  },

  // Navigation conditionnelle
  navigateIfLoggedIn: (navigation, user, destination = 'MainTabs') => {
    if (user) {
      navigation.navigate(destination);
    } else {
      navigation.navigate('Login');
    }
  }
};

// Hook pour utiliser la navigation de manière typée
export const useAppNavigation = (navigation) => {
  return {
    // Navigation principale
    home: () => NavigationHelper.goHome(navigation),
    search: () => NavigationHelper.goToSearch(navigation),
    profile: () => NavigationHelper.goToProfile(navigation),
    events: () => NavigationHelper.goToEvents(navigation),
    prayers: () => NavigationHelper.goToPrayers(navigation),

    // Navigation contextuelle
    video: (post) => NavigationHelper.goToVideoPlayer(navigation, post),
    eventDetail: (event) => NavigationHelper.goToEventDetail(navigation, event),
    addContent: () => NavigationHelper.goToAddContent(navigation),

    // Authentification
    login: () => NavigationHelper.goToLogin(navigation),
    register: () => NavigationHelper.goToRegister(navigation),

    // Actions
    back: () => NavigationHelper.goBack(navigation),
    resetToHome: () => NavigationHelper.resetToHome(navigation),

    // Navigation directe
    navigate: (screen, params) => navigation.navigate(screen, params),
    replace: (screen, params) => navigation.replace(screen, params),
    push: (screen, params) => navigation.push(screen, params),
  };
};
