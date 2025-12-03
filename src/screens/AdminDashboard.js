import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminDashboard({ navigation }) {
  const { admin, logout } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // La navigation se fera automatiquement via le contexte d'authentification
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
  };

  const adminMenuItems = [
    {
      id: 'users',
      icon: 'people-outline',
      label: 'Gestion Utilisateurs',
      description: 'Suspendre, bannir, réinitialiser',
      color: '#7C3AED'
    },
    {
      id: 'content',
      icon: 'document-text-outline',
      label: 'Modération Contenu',
      description: 'Approuver ou supprimer du contenu',
      color: '#06B6D4'
    },
    {
      id: 'events',
      icon: 'calendar-outline',
      label: 'Gestion Événements',
      description: 'Créer et gérer les événements',
      color: '#F59E0B'
    },
    {
      id: 'donations',
      icon: 'heart-outline',
      label: 'Suivi des Dons',
      description: 'Rapports et statistiques de dons',
      color: '#EF4444'
    },
    {
      id: 'logs',
      icon: 'list-outline',
      label: 'Logs d\'Audit',
      description: 'Historique des actions admin',
      color: '#10B981'
    },
    {
      id: 'settings',
      icon: 'settings-outline',
      label: 'Paramètres',
      description: 'Configuration du système',
      color: '#8B5CF6'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.adminInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{admin?.displayName?.[0] || 'A'}</Text>
            </View>
            <View style={styles.adminDetails}>
              <Text style={styles.adminName}>{admin?.displayName || 'Admin'}</Text>
              <Text style={styles.adminEmail}>{admin?.email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outils d'Administration</Text>
          <Text style={styles.sectionSubtitle}>Gérez les utilisateurs, contenu et paramètres</Text>
        </View>

        <View style={styles.menuGrid}>
          {adminMenuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => {
                // Navigation à implémenter selon les besoins
                console.log('Navigation vers:', item.id);
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <View style={styles.menuArrow}>
                <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Aperçu Rapide</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statNumber}>
                <Text style={styles.statValue}>1.2K</Text>
              </View>
              <Text style={styles.statLabel}>Utilisateurs</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statNumber}>
                <Text style={styles.statValue}>234</Text>
              </View>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statNumber}>
                <Text style={styles.statValue}>12</Text>
              </View>
              <Text style={styles.statLabel}>Événements</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statNumber}>
                <Text style={styles.statValue}>€5.2K</Text>
              </View>
              <Text style={styles.statLabel}>Dons (mois)</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={24} color="#0284C7" />
          <View style={styles.infoBannerText}>
            <Text style={styles.infoBannerTitle}>Bienvenue en tant qu'administrateur</Text>
            <Text style={styles.infoBannerDescription}>
              Vous pouvez gérer tous les aspects de la plateforme ici. Assurez-vous d'effectuer les actions appropriées.
            </Text>
          </View>
        </View>

        <View style={styles.footerPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingHorizontal: 20, paddingVertical: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  adminInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  adminDetails: { marginLeft: 12, flex: 1 },
  adminName: { fontSize: 16, fontWeight: '700', color: '#FFF', marginBottom: 2 },
  adminEmail: { fontSize: 12, color: '#EDE9FE' },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: '#9CA3AF' },
  menuGrid: { marginBottom: 28 },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },
  iconContainer: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuLabel: { fontSize: 14, fontWeight: '600', color: '#111827', flex: 1 },
  menuDescription: { fontSize: 11, color: '#9CA3AF' },
  menuArrow: { marginLeft: 8 },
  statsSection: { marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },
  statNumber: { marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '700', color: '#8B5CF6' },
  statLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  infoBanner: {
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0284C7'
  },
  infoBannerText: { marginLeft: 12, flex: 1 },
  infoBannerTitle: { fontSize: 14, fontWeight: '600', color: '#0C4A6E', marginBottom: 4 },
  infoBannerDescription: { fontSize: 12, color: '#0C4A6E', lineHeight: 18 },
  footerPadding: { height: 20 }
});
