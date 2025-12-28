import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveScreen() {
  const insets = useSafeAreaInsets();
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([
    { id: 'm1', author: 'Marie', text: 'Que Dieu vous bénisse !' },
    { id: 'm2', author: 'Pierre', text: 'Merci pour ce message inspirant' },
    { id: 'm3', author: 'Sarah', text: 'Amen ! 🙏' }
  ]);
  const [input, setInput] = useState('');

  const startLive = () => {
    setIsLive(true);
    setViewers(Math.floor(Math.random() * 300) + 20);
    Alert.alert('Live démarré', 'Votre diffusion en direct a commencé !');
  };

  const stopLive = () => {
    setIsLive(false);
    setViewers(0);
    Alert.alert('Live terminé', 'Votre diffusion s\'est terminée.');
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([{ id: `m${Date.now()}`, author: 'Vous', text: input.trim() }, ...messages]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['#EF4444', '#DC2626']} 
        style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}
      >
        <Text style={styles.headerTitle}>Diffusion en direct</Text>
        <Text style={styles.headerSubtitle}>Partagez en temps réel avec votre communauté</Text>
      </LinearGradient>

      <View style={styles.cameraContainer}>
        {isLive ? (
          <View style={styles.livePreview}>
            <LinearGradient colors={['#1F2937', '#111827']} style={styles.previewGradient}>
              <Ionicons name="videocam" size={64} color="#EF4444" />
              <Text style={styles.liveLabel}>DIFFUSION EN COURS</Text>
            </LinearGradient>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN DIRECT</Text>
              <Text style={styles.viewersText}>{`${viewers}`} spectateurs</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="play-circle-outline" size={72} color="#9CA3AF" />
            <Text style={styles.placeholderTitle}>Aucun direct en cours</Text>
            <Text style={styles.placeholderText}>Appuyez sur le bouton pour démarrer la diffusion</Text>
          </View>
        )}

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="camera-reverse-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.mainControlBtn, isLive && styles.mainControlBtnActive]} onPress={isLive ? stopLive : startLive}>
            <Ionicons name={isLive ? "stop" : "videocam"} size={28} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="mic-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoIcon}>
          <Ionicons name="information-circle-outline" size={32} color="#9CA3AF" />
        </View>
        <Text style={styles.infoTitle}>Interaction en direct</Text>
        <Text style={styles.infoText}>Le chat en direct est actuellement désactivé pour cette diffusion.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#FEE2E2' },
  cameraContainer: { height: 400, backgroundColor: '#000' },
  livePreview: { flex: 1, position: 'relative' },
  previewGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  liveLabel: { fontSize: 16, fontWeight: '700', color: '#FFF', marginTop: 16 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F2937' },
  placeholderTitle: { fontSize: 18, fontWeight: '600', color: '#FFF', marginTop: 16, marginBottom: 8 },
  placeholderText: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', paddingHorizontal: 40 },
  liveBadge: { position: 'absolute', top: 16, left: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', marginRight: 8 },
  liveText: { color: '#FFF', fontWeight: '700', marginRight: 8, fontSize: 13 },
  viewersText: { color: '#FFF', fontSize: 13 },
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, gap: 20, backgroundColor: '#000' },
  controlBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 24 },
  mainControlBtn: { backgroundColor: '#EF4444', padding: 16, borderRadius: 32 },
  mainControlBtnActive: { backgroundColor: '#DC2626' },
  infoContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  infoIcon: { marginBottom: 16 },
  infoTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#6B7280', textAlign: 'center' }
});