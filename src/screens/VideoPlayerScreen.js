import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ProfessionalSlider from '../components/ProfessionalSlider';

export default function VideoPlayerScreen({ route, navigation }) {
  const { post } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [comment, setComment] = useState('');
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [comments, setComments] = useState([
    { id: 1, author: 'Marie Dubois', text: 'Merci pour ce message inspirant !', time: '2h' },
    { id: 2, author: 'Jean Martin', text: 'Que Dieu vous bénisse', time: '1h' }
  ]);

  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addComment = () => {
    if (!comment.trim()) return;
    setComments([{ id: Date.now(), author: 'Vous', text: comment, time: 'maintenant' }, ...comments]);
    setComment('');
    Alert.alert('Succès', 'Commentaire ajouté !');
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video ref={video} style={styles.video} source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} useNativeControls resizeMode="contain" isLooping onPlaybackStatusUpdate={status => setStatus(() => status)} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
        {/* Barre de progression vidéo professionnelle */}
        {status.isLoaded && (
          <View style={styles.videoProgressOverlay}>
            <ProfessionalSlider 
              value={status.positionMillis || 0}
              maxValue={status.durationMillis || 1}
              onValueChange={async (newValue) => {
                if (video.current) {
                  await video.current.setPositionAsync(newValue);
                }
              }}
              primaryColor="#7C3AED"
              secondaryColor="#5B21B6"
              height={3}
              showTooltip={false}
            />
            <View style={styles.videoTimeContainer}>
              <Text style={styles.videoTimeText}>{formatTime(status.positionMillis)}</Text>
              <Text style={styles.videoTimeText}>{formatTime(status.durationMillis)}</Text>
            </View>
          </View>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{post.title}</Text>
          <Text style={styles.videoAuthor}>{post.author}</Text>
          <View style={styles.videoMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={16} color="#9CA3AF" />
              <Text style={styles.metaText}>{post.views} vues</Text>
            </View>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{post.date}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          {[
            { icon: 'thumbs-up-outline', label: 'J\'aime', color: '#7C3AED' },
            { icon: 'share-social-outline', label: 'Partager', color: '#7C3AED' },
            { icon: 'download-outline', label: 'Télécharger', color: '#7C3AED' }
          ].map((action, i) => (
            <TouchableOpacity key={i} style={styles.actionBtn}>
              <Ionicons name={action.icon} size={22} color={action.color} />
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Commentaires ({comments.length})</Text>
          <View style={styles.addComment}>
            <TextInput style={styles.commentInput} value={comment} onChangeText={setComment} placeholder="Ajouter un commentaire..." multiline />
            <TouchableOpacity style={styles.sendBtn} onPress={addComment}>
              <Ionicons name="send" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          {comments.map(c => (
            <View key={c.id} style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{c.author[0]}</Text>
              </View>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{c.author}</Text>
                  <Text style={styles.commentTime}>{c.time}</Text>
                </View>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoContainer: { width: '100%', height: 250, position: 'relative', backgroundColor: '#000' },
  video: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 40, left: 16, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20, zIndex: 10 },
  videoProgressOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 9 },
  videoTimeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingHorizontal: 4 },
  videoTimeText: { fontSize: 11, color: '#FFF', fontWeight: '600' },
  content: { flex: 1, backgroundColor: '#FFF' },
  videoInfo: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  videoTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8 },
  videoAuthor: { fontSize: 15, color: '#7C3AED', marginBottom: 8, fontWeight: '600' },
  videoMeta: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  metaText: { fontSize: 13, color: '#9CA3AF', marginLeft: 4 },
  metaDot: { fontSize: 13, color: '#D1D5DB', marginHorizontal: 4 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  actionBtn: { alignItems: 'center' },
  actionText: { marginTop: 4, fontSize: 12, color: '#7C3AED', fontWeight: '600' },
  commentsSection: { padding: 20 },
  commentsTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
  addComment: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 20, gap: 8 },
  commentInput: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, backgroundColor: '#F9FAFB' },
  sendBtn: { backgroundColor: '#7C3AED', padding: 10, borderRadius: 20 },
  comment: { flexDirection: 'row', marginBottom: 16 },
  commentAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  commentAvatarText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  commentContent: { flex: 1 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  commentAuthor: { fontSize: 14, fontWeight: '600', color: '#111827' },
  commentTime: { fontSize: 12, color: '#9CA3AF' },
  commentText: { fontSize: 14, color: '#6B7280', lineHeight: 20 }
});