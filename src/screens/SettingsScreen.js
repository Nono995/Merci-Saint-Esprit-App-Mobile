import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <View style={styles.settingItem}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="moon-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="moon-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Mode sombre</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode} 
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }} 
              thumbColor="#FFF" 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="notifications-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Activer les notifications</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }} 
              thumbColor="#FFF" 
            />
          </View>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="settings-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="settings-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Gérer les notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lecture</Text>
          <View style={styles.settingItem}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="play-circle-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="play-circle-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Lecture automatique</Text>
            </View>
            <Switch 
              value={autoPlay} 
              onValueChange={setAutoPlay} 
              trackColor={{ false: '#E5E7EB', true: COLORS.primary }} 
              thumbColor="#FFF" 
            />
          </View>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="download-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="download-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Qualité de téléchargement</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.settingValue}>Haute</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="person-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Modifier le profil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="lock-closed-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Changer le mot de passe</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="shield-checkmark-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Confidentialité</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.settingItem}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="information-circle-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="information-circle-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Version de l'app</Text>
            </View>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="document-text-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Conditions d'utilisation</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            {/* Background Icon */}
            <View style={styles.bgIcon}>
              <Ionicons name="shield-outline" size={80} color="#F9FAFB" />
            </View>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-outline" size={20} color={COLORS.text} />
              </View>
              <Text style={styles.settingTitle}>Politique de confidentialité</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] })}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
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
  bgIcon: {
    position: 'absolute',
    right: -20,
    top: '50%',
    marginTop: -40,
    opacity: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
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
  bottomSpace: {
    height: 40,
  },
});
