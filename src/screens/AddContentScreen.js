import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { publishContent } from '../services/contentService';

export default function AddContentScreen({ navigation }) {
  const [contentType, setContentType] = useState('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const contentTypes = [
    { id: 'video', label: 'Vidéo', icon: 'videocam-outline' },
    { id: 'audio', label: 'Audio', icon: 'headset-outline' },
    { id: 'testimony', label: 'Témoignage', icon: 'heart-outline' }
  ];

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Accès à la galerie nécessaire');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: contentType === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) setSelectedMedia(result.assets[0]);
  };

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!selectedMedia && (contentType === 'video' || contentType === 'audio')) {
      Alert.alert('Erreur', 'Veuillez sélectionner un média');
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Erreur', 'Vous devez être connecté');
        return;
      }

      let file = null;
      if (selectedMedia) {
        const response = await fetch(selectedMedia.uri);
        const blob = await response.blob();
        file = new File([blob], selectedMedia.fileName || 'media', { type: selectedMedia.type });
      }

      await publishContent({
        title,
        description,
        type: contentType,
        file: file,
        authorId: user.uid,
        authorName: user.displayName || 'Anonyme'
      });

      Alert.alert('Succès', 'Contenu publié avec succès !', [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setDescription('');
            setSelectedMedia(null);
            navigation.goBack();
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Erreur lors de la publication');
      console.error('Publish error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Publier du contenu</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de contenu</Text>
          <View style={styles.typeGrid}>
            {contentTypes.map(type => (
              <TouchableOpacity key={type.id} style={[styles.typeCard, contentType === type.id && styles.typeCardActive]} onPress={() => setContentType(type.id)}>
                <Ionicons name={type.icon} size={28} color={contentType === type.id ? '#10B981' : '#6B7280'} />
                <Text style={[styles.typeLabel, contentType === type.id && styles.typeLabelActive]}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Titre</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Titre de votre contenu" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Décrivez votre contenu..." multiline numberOfLines={4} />
        </View>

        {(contentType === 'video' || contentType === 'audio') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Média</Text>
            {selectedMedia ? (
              <View style={styles.mediaPreview}>
                <Ionicons name={contentType === 'video' ? 'videocam' : 'musical-notes'} size={48} color="#10B981" />
                <Text style={styles.mediaName}>{contentType === 'video' ? 'Vidéo' : 'Audio'} sélectionné</Text>
                <TouchableOpacity style={styles.removeBtn} onPress={() => setSelectedMedia(null)}>
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.mediaButtons}>
                <TouchableOpacity style={styles.mediaBtn} onPress={pickMedia}>
                  <Ionicons name="folder-outline" size={24} color="#10B981" />
                  <Text style={styles.mediaBtnText}>Choisir depuis la galerie</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.publishBtn, loading && styles.publishBtnDisabled]} 
          onPress={handlePublish}
          disabled={loading}
        >
          <LinearGradient colors={['#10B981', '#059669']} style={styles.publishBtnGradient}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={24} color="#FFF" />
                <Text style={styles.publishBtnText}>Publier le contenu</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFF' },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },
  typeGrid: { flexDirection: 'row', gap: 12 },
  typeCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB' },
  typeCardActive: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  typeLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginTop: 8 },
  typeLabelActive: { color: '#10B981' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, fontSize: 15 },
  textArea: { height: 120, textAlignVertical: 'top' },
  mediaPreview: { backgroundColor: '#FFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  mediaName: { fontSize: 15, fontWeight: '600', color: '#111827', marginTop: 12, marginBottom: 16 },
  removeBtn: { padding: 8 },
  mediaButtons: { gap: 12 },
  mediaBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  mediaBtnText: { fontSize: 15, fontWeight: '600', color: '#111827', marginLeft: 12 },
  publishBtn: { marginTop: 8, marginBottom: 32, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  publishBtnDisabled: { opacity: 0.6 },
  publishBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18 },
  publishBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF', marginLeft: 8 }
});