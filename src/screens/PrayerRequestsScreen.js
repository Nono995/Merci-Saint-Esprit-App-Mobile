import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrayerRequestsScreen({ navigation }) {
  const prayers = [
    { id: 1, author: 'Marie K.', request: 'Prière pour ma famille et la santé de ma mère', time: '2h', prayers: 24 },
    { id: 2, author: 'Pierre M.', request: 'Besoin de prière pour trouver un emploi', time: '5h', prayers: 18 },
    { id: 3, author: 'Sarah D.', request: 'Prière pour la guérison de mon père', time: '1j', prayers: 45 }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Demandes de prière</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {prayers.map(prayer => (
          <View key={prayer.id} style={styles.prayerCard}>
            <View style={styles.prayerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{prayer.author[0]}</Text>
              </View>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{prayer.author}</Text>
                <Text style={styles.time}>Il y a {prayer.time}</Text>
              </View>
            </View>
            <Text style={styles.request}>{prayer.request}</Text>
            <View style={styles.prayerFooter}>
              <TouchableOpacity style={styles.prayBtn}>
                <Ionicons name="hand-right" size={20} color="#EC4899" />
                <Text style={styles.prayCount}>{prayer.prayers} prières</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentBtn}>
                <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.fabGradient}>
          <Ionicons name="add" size={28} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerTitle: { flex: 1, fontSize: 24, fontWeight: '800', color: '#FFF', textAlign: 'center', letterSpacing: -0.5 },
  placeholder: { width: 44 },
  content: { flex: 1, padding: 16 },
  prayerCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' },
  prayerHeader: { flexDirection: 'row', marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EC4899', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
  authorInfo: { flex: 1, justifyContent: 'center' },
  authorName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 },
  time: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  request: { fontSize: 15, color: '#374151', lineHeight: 22, marginBottom: 16, fontWeight: '500' },
  prayerFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  prayBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  prayCount: { fontSize: 14, fontWeight: '700', color: '#EC4899', marginLeft: 6 },
  commentBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', borderRadius: 12 },
  fab: { position: 'absolute', bottom: 28, right: 24, borderRadius: 30, shadowColor: '#EC4899', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }
});
