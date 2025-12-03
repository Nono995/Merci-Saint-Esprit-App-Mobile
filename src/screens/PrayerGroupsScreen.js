import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrayerGroupsScreen({ navigation }) {
  const groups = [
    { id: 1, name: 'Jeunes adultes', members: 24, prayers: 12, emoji: '👥', color: '#7C3AED' },
    { id: 2, name: 'Familles', members: 18, prayers: 8, emoji: '👨‍👩‍👧‍👦', color: '#EC4899' },
    { id: 3, name: 'Étudiants', members: 32, prayers: 15, emoji: '📚', color: '#3B82F6' },
    { id: 4, name: 'Seniors', members: 15, prayers: 6, emoji: '👴', color: '#10B981' }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Groupes de prière</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {groups.map(group => (
          <TouchableOpacity key={group.id} style={styles.groupCard}>
            <View style={[styles.groupIcon, { backgroundColor: group.color + '20' }]}>
              <Text style={styles.groupEmoji}>{group.emoji}</Text>
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={styles.groupStats}>
                <View style={styles.stat}>
                  <Ionicons name="people" size={16} color="#6B7280" />
                  <Text style={styles.statText}>{group.members} membres</Text>
                </View>
                <View style={styles.stat}>
                  <Ionicons name="hand-right" size={16} color="#6B7280" />
                  <Text style={styles.statText}>{group.prayers} prières</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
          </TouchableOpacity>
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
  groupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' },
  groupIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  groupEmoji: { fontSize: 32 },
  groupInfo: { flex: 1 },
  groupName: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 8, letterSpacing: -0.3 },
  groupStats: { flexDirection: 'row', gap: 16 },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statText: { fontSize: 13, color: '#6B7280', marginLeft: 6, fontWeight: '600' },
  fab: { position: 'absolute', bottom: 28, right: 24, borderRadius: 30, shadowColor: '#EC4899', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }
});
