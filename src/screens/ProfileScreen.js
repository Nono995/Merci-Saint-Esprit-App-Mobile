import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function ProfileScreen({ navigation }) {
  const quickActions = [
    { id: 'events', title: 'Événements', icon: 'calendar', color: COLORS.tertiary, screen: 'Events' },
    { id: 'prayers', title: 'Prières', icon: 'hand-left', color: COLORS.secondary, screen: 'PrayerRequests' },
  ];

  const menuSections = [
    {
      title: 'Contenu',
      items: [
        { id: 'podcasts', title: 'Mes Podcasts', icon: 'headset-outline', screen: 'Podcast' },
        { id: 'favorites', title: 'Favoris', icon: 'heart-outline', screen: null },
        { id: 'offline', title: 'Hors ligne', icon: 'cloud-download-outline', screen: 'OfflineContent' },
      ],
    },
    {
      title: 'Communauté',
      items: [
        { id: 'prayerGroups', title: 'Groupes de prière', icon: 'people-outline', screen: 'PrayerGroups' },
        { id: 'messages', title: 'Messages', icon: 'chatbubble-outline', screen: 'Messages' },
      ],
    },
    {
      title: 'Paramètres',
      items: [
        { id: 'settings', title: 'Paramètres', icon: 'settings-outline', screen: 'Settings' },
        { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', screen: null },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/logo.png')} style={styles.avatar} resizeMode="contain" />
            <View style={styles.avatarBadge}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
          </View>
          <Text style={styles.userName}>Jean Dupont</Text>
          <Text style={styles.userEmail}>jean.dupont@email.com</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickAction}
              onPress={() => action.screen && navigation.navigate(action.screen)}
              activeOpacity={0.7}
            >
              {/* Background Icon */}
              <View style={styles.quickActionBgIcon}>
                <Ionicons name={action.icon} size={60} color={`${action.color}08`} />
              </View>
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Vidéos vues', value: '24', icon: 'play-circle', color: COLORS.primary },
            { label: 'Témoignages', value: '8', icon: 'heart', color: COLORS.tertiary },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              {/* Background Icon */}
              <View style={styles.statBgIcon}>
                <Ionicons name={stat.icon} size={70} color={`${stat.color}06`} />
              </View>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => item.screen && navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                {/* Background Icon */}
                <View style={styles.menuBgIcon}>
                  <Ionicons name={item.icon} size={80} color="#F9FAFB" />
                </View>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon} size={20} color={COLORS.text} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 Merci Saint-Esprit</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F9FAFB',
    padding: 6,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    position: 'relative',
  },
  quickActionBgIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    opacity: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    zIndex: 1,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    position: 'relative',
  },
  statBgIcon: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    opacity: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    zIndex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    position: 'relative',
  },
  menuBgIcon: {
    position: 'absolute',
    right: -20,
    top: '50%',
    marginTop: -40,
    opacity: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.error,
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 4,
    fontWeight: '500',
  },
  copyright: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: '400',
  },
});