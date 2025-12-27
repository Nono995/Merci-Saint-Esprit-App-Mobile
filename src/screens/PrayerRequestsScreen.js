import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { listenPrayers, addPrayer, prayFor } from '../services/contentService';
import { auth } from '../services/firebaseConfig';
import { COLORS } from '../constants/theme';

// Unique ID for anonymous support during this session
const SESSION_ANONYMOUS_ID = 'anon_' + Math.random().toString(36).substring(2, 11);

export default function PrayerRequestsScreen({ navigation }) {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = listenPrayers((data) => {
      setPrayers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddRequest = async () => {
    if (!newRequest.trim()) return;
    
    setSubmitting(true);
    try {
      const user = auth.currentUser;
      await addPrayer({
        authorId: user?.uid || 'anonymous',
        authorName: user?.displayName || user?.email?.split('@')[0] || 'Anonyme',
        request: newRequest.trim(),
      });
      setNewRequest('');
      setShowModal(false);
      Alert.alert('Succès', 'Votre demande de prière a été publiée.');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de publier votre demande.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePray = async (prayerId) => {
    try {
      const user = auth.currentUser;
      const userId = user?.uid || SESSION_ANONYMOUS_ID;
      
      await prayFor(prayerId, userId);
    } catch (error) {
      console.error('Error praying:', error);
    }
  };

  const isPrayedByMe = (prayer) => {
    const user = auth.currentUser;
    return prayer.prayers?.includes(user?.uid) || prayer.prayers?.includes(SESSION_ANONYMOUS_ID);
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Récemment';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}j`;
  };

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

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#EC4899" />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {prayers.length > 0 ? (
            prayers.map(prayer => (
              <View key={prayer.id} style={styles.prayerCard}>
                <View style={styles.prayerHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{(prayer.authorName || 'A')[0].toUpperCase()}</Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{prayer.authorName || 'Anonyme'}</Text>
                    <Text style={styles.time}>Il y a {getTimeAgo(prayer.createdAt)}</Text>
                  </View>
                </View>
                <Text style={styles.request}>{prayer.request}</Text>
                <View style={styles.prayerFooter}>
                  <TouchableOpacity 
                    style={[
                      styles.prayBtn,
                      isPrayedByMe(prayer) && styles.prayBtnActive
                    ]}
                    onPress={() => handlePray(prayer.id)}
                  >
                    <Ionicons 
                      name="hand-right" 
                      size={20} 
                      color={isPrayedByMe(prayer) ? "#FFF" : "#EC4899"} 
                    />
                    <Text style={[
                      styles.prayCount,
                      isPrayedByMe(prayer) && styles.prayCountActive
                    ]}>
                      {`${prayer.prayers?.length || 0}`} prières
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Aucune demande pour le moment.</Text>
            </View>
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.fabGradient}>
          <Ionicons name="add" size={28} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvelle demande</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="En quoi pouvons-nous vous soutenir ?"
              multiline
              numberOfLines={6}
              value={newRequest}
              onChangeText={setNewRequest}
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity 
              style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
              onPress={handleAddRequest}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitBtnText}>Publier la demande</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: '800', color: '#FFF', textAlign: 'center', letterSpacing: -0.5 },
  placeholder: { width: 44 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  prayBtnActive: { backgroundColor: '#EC4899' },
  prayCount: { fontSize: 14, fontWeight: '700', color: '#EC4899', marginLeft: 6 },
  prayCountActive: { color: '#FFF' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { marginTop: 12, color: '#9CA3AF', fontSize: 16 },
  fab: { position: 'absolute', bottom: 28, right: 24, borderRadius: 30, shadowColor: '#EC4899', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  textInput: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 16, fontSize: 16, color: '#111827', height: 150, textAlignVertical: 'top', marginBottom: 24, borderWidth: 1, borderColor: '#F3F4F6' },
  submitBtn: { backgroundColor: '#EC4899', borderRadius: 16, padding: 18, alignItems: 'center' },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
