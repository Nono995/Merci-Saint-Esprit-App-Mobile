import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from './src/constants/theme';
import { AuthProvider } from './src/contexts/AuthContext';
import { AdminAuthProvider } from './src/contexts/AdminAuthContext';
import { NotificationProvider, useNotifications } from './src/contexts/NotificationContext';
import './src/styles/web-fix.css';

import HomeScreen from './src/screens/HomeScreen';
import TestimonyScreen from './src/screens/TestimonyScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PodcastScreen from './src/screens/PodcastScreen';
import DonationScreen from './src/screens/DonationScreen';
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';
import AddContentScreen from './src/screens/AddContentScreen';
import VideosScreen from './src/screens/VideosScreen';
import LiveScreen from './src/screens/LiveScreen';
import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import IntroSlidersScreen from './src/screens/IntroSlidersScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';
import BibleScreen from './src/screens/BibleScreen';
import BibleChaptersScreen from './src/screens/BibleChaptersScreen';
import BibleReaderScreen from './src/screens/BibleReaderScreen';
import BibleBookmarksScreen from './src/screens/BibleBookmarksScreen';
import EventsScreen from './src/screens/EventsScreen';
import PrayerRequestsScreen from './src/screens/PrayerRequestsScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrayerGroupsScreen from './src/screens/PrayerGroupsScreen';
import OfflineContentScreen from './src/screens/OfflineContentScreen';
import AnnouncementsScreen from './src/screens/AnnouncementsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const linking = {
  config: {
    screens: {
      IntroSliders: 'intro',
      MainTabs: {
        screens: {
          Home: 'home',
          Videos: 'videos',
          Bible: 'bible',
          Testimonies: 'testimonies',
          Profile: 'profile',
        },
      },
      VideoPlayer: 'video/:id',
      Podcast: 'podcast',
      Events: 'events',
      BibleReader: 'bible/read',
      Auth: 'auth',
      Onboarding: 'welcome',
      Dons: 'donation',
    },
  },
};

function MainTabs() {
  const { unreadCount = 0 } = useNotifications();
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            'Home': focused ? 'home' : 'home-outline',
            'Videos': focused ? 'play-circle' : 'play-circle-outline',
            'Bible': focused ? 'book' : 'book-outline',
            'Testimonies': focused ? 'heart' : 'heart-outline',
            'Profile': focused ? 'person' : 'person-outline'
          };
          
          return (
            <View style={{ position: 'relative' }}>
              <Ionicons name={icons[route.name]} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'web' ? 70 : (60 + insets.bottom),
          paddingBottom: Platform.OS === 'web' ? 12 : (8 + insets.bottom),
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.03,
          shadowRadius: 4,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Accueil' }}
      />
      <Tab.Screen 
        name="Videos" 
        component={VideosScreen} 
        options={{ tabBarLabel: 'Vidéos' }}
      />
      <Tab.Screen 
        name="Bible" 
        component={BibleScreen} 
        options={{ tabBarLabel: 'Bible' }}
      />
      <Tab.Screen 
        name="Testimonies" 
        component={TestimonyScreen} 
        options={{ tabBarLabel: 'Témoignages' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  // L'écran IntroSliders s'affiche en premier au lancement
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="IntroSliders"
    >
      <Stack.Screen name="IntroSliders" component={IntroSlidersScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="AddContent" component={AddContentScreen} />
      <Stack.Screen name="Podcast" component={PodcastScreen} />
      <Stack.Screen name="Live" component={LiveScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="BibleChapters" component={BibleChaptersScreen} />
      <Stack.Screen name="BibleReader" component={BibleReaderScreen} />
      <Stack.Screen name="BibleBookmarks" component={BibleBookmarksScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="PrayerRequests" component={PrayerRequestsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PrayerGroups" component={PrayerGroupsScreen} />
      <Stack.Screen name="OfflineContent" component={OfflineContentScreen} />
      <Stack.Screen name="Dons" component={DonationScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <NotificationProvider>
            <NavigationContainer linking={linking}>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </NotificationProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
