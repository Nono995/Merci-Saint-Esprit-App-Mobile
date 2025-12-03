import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OfflineContentScreen({ navigation }) {
  const downloads = [
    { id: 1, title: 'Culte du Dimanche', type: 'video', size: '245 MB', date: 'Hier', icon: 'play-circle', color: '#3B82F6' },
    { id: 2, title: 'Méditation quotidienne', type: 'audio', size: '12 MB', date: '2 jours', icon: 'headset', color: '#8B5CF6' },
    { id: 3, title: 'Jean chapitre 3', type: 'bible', size: '2 KB', date: '1 semaine', icon: 'book', color: '#7C3AED' }
  ];

  const totalSize = '259 MB';

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contenu hors ligne</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.storageInfo}>
          <Ionicons name="phone-portrait-outline" size={24} color="#FFF" />
          <Text style={styles.storageText}>{totalSize} utilisés</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {downloads.map(item => (
          <View key={item.id} style={styles.downloadCard}>
            <View style={[styles.itemIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.itemSize}>{item.size}</Text>
                <Text style={styles.itemDot}>•</Text>
                <Text style={styles.itemDate}>Il y a {item.date}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}

        {downloads.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="cloud-download-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>Aucun contenu téléchargé</Text>
            <Text style={styles.emptySubtext}>Les contenus téléchargés apparaîtront ici</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearBtn}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.clearText}>Tout supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerTitle: { flex: 1, fontSize: 24, fontWeight: '800', color: '#FFF', textAlign: 'center', letterSpacing: -0.5 },
  placeholder: { width: 44 },
  storageInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  storageText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  content: { flex: 1, padding: 16 },
  downloadCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' },
  itemIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 6, letterSpacing: -0.3 },
  itemMeta: { flexDirection: 'row', alignItems: 'center' },
  itemSize: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  itemDot: { fontSize: 13, color: '#D1D5DB', marginHorizontal: 6 },
  itemDate: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  deleteBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', borderRadius: 22 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyText: { fontSize: 17, fontWeight: '700', color: '#6B7280', marginTop: 16 },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', marginTop: 8, fontWeight: '500' },
  footer: { padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  clearBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FEE2E2' },
  clearText: { fontSize: 15, fontWeight: '700', color: '#EF4444', marginLeft: 8 }
});
