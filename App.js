import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/constants/theme';

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

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            'Accueil': focused ? 'home' : 'home-outline',
            'Vidéos': focused ? 'play-circle' : 'play-circle-outline',
            'Témoignages': focused ? 'heart' : 'heart-outline',
            'Profil': focused ? 'person' : 'person-outline'
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.03,
          shadowRadius: 4
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        }
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Vidéos" component={VideosScreen} />
      <Tab.Screen name="Témoignages" component={TestimonyScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
        <Stack.Screen name="AddContent" component={AddContentScreen} />
        <Stack.Screen name="Podcast" component={PodcastScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="Live" component={LiveScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Bible" component={BibleScreen} />
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
    </NavigationContainer>
  );
}
