import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../services/firebaseConfig';
import { publishContent } from '../services/contentService';

export default function AddContentScreen({ navigation }) {
  const [contentType, setContentType] = useState('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Champs spécifiques pour vidéo
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  
  // Champs spécifiques pour podcast
  const [podcastUrl, setPodcastUrl] = useState('');
  const [podcastDuration, setPodcastDuration] = useState('');
  const [podcastAuthor, setPodcastAuthor] = useState('');
  
  // Champs spécifiques pour témoignage
  const [testimonyAuthor, setTestimonyAuthor] = useState('');
  const [testimonyDate, setTestimonyDate] = useState('');
  const [testimonyCategory, setTestimonyCategory] = useState('');
  
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
    
    let mediaTypes = ImagePicker.MediaTypeOptions.Images;
    if (contentType === 'video') {
      mediaTypes = ImagePicker.MediaTypeOptions.Videos;
    } else if (contentType === 'audio') {
      mediaTypes = ImagePicker.MediaTypeOptions.All; // Pour audio
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) setSelectedMedia(result.assets[0]);
  };
  
  const pickThumbnail = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'Accès à la galerie nécessaire');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) setVideoThumbnail(result.assets[0]);
  };

  const handlePublish = async () => {
    // Validation selon le type
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation spécifique pour vidéo
    if (contentType === 'video') {
      if (!videoUrl.trim() && !selectedMedia) {
        Alert.alert('Erreur', 'Veuillez fournir une URL ou sélectionner une vidéo');
        return;
      }
    }

    // Validation spécifique pour podcast
    if (contentType === 'audio') {
      if (!podcastUrl.trim() && !selectedMedia) {
        Alert.alert('Erreur', 'Veuillez fournir une URL ou sélectionner un fichier audio');
        return;
      }
      if (!podcastAuthor.trim()) {
        Alert.alert('Erreur', 'Veuillez indiquer l\'auteur du podcast');
        return;
      }
    }

    // Validation spécifique pour témoignage
    if (contentType === 'testimony') {
      if (!testimonyAuthor.trim()) {
        Alert.alert('Erreur', 'Veuillez indiquer l\'auteur du témoignage');
        return;
      }
      if (!testimonyCategory.trim()) {
        Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
        return;
      }
      if (!testimonyDate.trim()) {
        Alert.alert('Erreur', 'Veuillez indiquer la date du témoignage');
        return;
      }
    }

    try {
      setLoading(true);
      const user = auth.currentUser || { uid: 'guest', displayName: 'Invité' };

      let file = null;
      if (selectedMedia) {
        const response = await fetch(selectedMedia.uri);
        const blob = await response.blob();
        file = new File([blob], selectedMedia.fileName || 'media', { type: selectedMedia.type });
      }

      // Déterminer le nom de l'auteur selon le type de contenu
      let authorName;
      if (contentType === 'audio') {
        authorName = podcastAuthor; // Nom de l'auteur du podcast
      } else if (contentType === 'testimony') {
        authorName = testimonyAuthor; // Nom de l'auteur du témoignage
      } else {
        authorName = user.displayName || 'Anonyme'; // Pour les vidéos
      }

      // Préparer les données selon le type
      const contentData = {
        title,
        description,
        type: contentType,
        file: file,
        authorId: user.uid,
        authorName: authorName
      };

      // Ajouter les champs spécifiques
      if (contentType === 'video') {
        contentData.videoUrl = videoUrl;
        contentData.duration = videoDuration;
        contentData.thumbnail = videoThumbnail;
      } else if (contentType === 'audio') {
        contentData.audioUrl = podcastUrl;
        contentData.duration = podcastDuration;
        contentData.author = podcastAuthor; // Champ supplémentaire pour podcast
      } else if (contentType === 'testimony') {
        contentData.author = testimonyAuthor; // Champ supplémentaire pour témoignage
        contentData.date = testimonyDate;
        contentData.category = testimonyCategory;
      }

      await publishContent(contentData);

      Alert.alert('Succès', 'Contenu publié avec succès !', [
        {
          text: 'OK',
          onPress: () => {
            // Reset tous les champs
            setTitle('');
            setDescription('');
            setSelectedMedia(null);
            setVideoUrl('');
            setVideoDuration('');
            setVideoThumbnail(null);
            setPodcastUrl('');
            setPodcastDuration('');
            setPodcastAuthor('');
            setTestimonyAuthor('');
            setTestimonyDate('');
            setTestimonyCategory('');
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

        {/* Formulaire spécifique pour VIDÉO */}
        {contentType === 'video' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>URL de la vidéo (YouTube, Vimeo...)</Text>
              <TextInput 
                style={styles.input} 
                value={videoUrl} 
                onChangeText={setVideoUrl} 
                placeholder="https://youtube.com/watch?v=..." 
                keyboardType="url"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Durée (optionnel)</Text>
              <TextInput 
                style={styles.input} 
                value={videoDuration} 
                onChangeText={setVideoDuration} 
                placeholder="Ex: 15:30" 
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Miniature (optionnel)</Text>
              {videoThumbnail ? (
                <View style={styles.mediaPreview}>
                  <Ionicons name="image" size={48} color="#10B981" />
                  <Text style={styles.mediaName}>Miniature sélectionnée</Text>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => setVideoThumbnail(null)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.mediaBtn} onPress={pickThumbnail}>
                  <Ionicons name="image-outline" size={24} color="#10B981" />
                  <Text style={styles.mediaBtnText}>Choisir une miniature</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ou uploader une vidéo</Text>
              {selectedMedia ? (
                <View style={styles.mediaPreview}>
                  <Ionicons name="videocam" size={48} color="#10B981" />
                  <Text style={styles.mediaName}>Vidéo sélectionnée</Text>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => setSelectedMedia(null)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.mediaBtn} onPress={pickMedia}>
                  <Ionicons name="folder-outline" size={24} color="#10B981" />
                  <Text style={styles.mediaBtnText}>Choisir depuis la galerie</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* Formulaire spécifique pour PODCAST */}
        {contentType === 'audio' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Auteur du podcast *</Text>
              <TextInput 
                style={styles.input} 
                value={podcastAuthor} 
                onChangeText={setPodcastAuthor} 
                placeholder="Nom de l'auteur ou prédicateur" 
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>URL du podcast (SoundCloud, Spotify...)</Text>
              <TextInput 
                style={styles.input} 
                value={podcastUrl} 
                onChangeText={setPodcastUrl} 
                placeholder="https://soundcloud.com/..." 
                keyboardType="url"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Durée (optionnel)</Text>
              <TextInput 
                style={styles.input} 
                value={podcastDuration} 
                onChangeText={setPodcastDuration} 
                placeholder="Ex: 45:00" 
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ou uploader un fichier audio</Text>
              {selectedMedia ? (
                <View style={styles.mediaPreview}>
                  <Ionicons name="musical-notes" size={48} color="#10B981" />
                  <Text style={styles.mediaName}>Audio sélectionné</Text>
                  <TouchableOpacity style={styles.removeBtn} onPress={() => setSelectedMedia(null)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.mediaBtn} onPress={pickMedia}>
                  <Ionicons name="folder-outline" size={24} color="#10B981" />
                  <Text style={styles.mediaBtnText}>Choisir un fichier audio</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* Formulaire spécifique pour TÉMOIGNAGE */}
        {contentType === 'testimony' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Auteur du témoignage *</Text>
              <TextInput 
                style={styles.input} 
                value={testimonyAuthor} 
                onChangeText={setTestimonyAuthor} 
                placeholder="Nom de la personne" 
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Catégorie *</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity 
                  style={styles.pickerButton}
                  onPress={() => {
                    Alert.alert(
                      'Catégorie',
                      'Sélectionnez une catégorie',
                      [
                        { text: 'Guérison', onPress: () => setTestimonyCategory('Guérison') },
                        { text: 'Conversion', onPress: () => setTestimonyCategory('Conversion') },
                        { text: 'Miracle', onPress: () => setTestimonyCategory('Miracle') },
                        { text: 'Délivrance', onPress: () => setTestimonyCategory('Délivrance') },
                        { text: 'Provision', onPress: () => setTestimonyCategory('Provision') },
                        { text: 'Restauration', onPress: () => setTestimonyCategory('Restauration') },
                        { text: 'Autre', onPress: () => setTestimonyCategory('Autre') },
                        { text: 'Annuler', style: 'cancel' }
                      ]
                    );
                  }}
                >
                  <Text style={styles.pickerText}>
                    {testimonyCategory || 'Sélectionnez une catégorie'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date du témoignage *</Text>
              <TextInput 
                style={styles.input} 
                value={testimonyDate} 
                onChangeText={setTestimonyDate} 
                placeholder="Ex: Décembre 2024 ou 15/12/2024" 
              />
            </View>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <Text style={styles.infoText}>
                Les témoignages sont publiés sous forme de texte uniquement. Pour les vidéos courtes (30-40s), utilisez la section "Vidéos".
              </Text>
            </View>
          </>
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
  publishBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF', marginLeft: 8 },
  pickerContainer: {
    marginTop: 4,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  pickerText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  }
});