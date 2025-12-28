import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { listenContentByType, likeContent } from '../services/contentService';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, MOCK_TESTIMONIES } from '../constants/theme';
import TestimonyCard from '../components/TestimonyCard';
import { auth } from '../services/firebaseConfig';
import * as Device from 'expo-device';

export default function TestimonyScreen() {
  const insets = useSafeAreaInsets();
  const [testimonies, setTestimonies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTestimony, setNewTestimony] = useState({ title: '', content: '', category: 'Général' });
  const [likedItems, setLikedItems] = useState({});
  const [deviceId, setDeviceId] = useState(null);
  const categories = ['Général', 'Guérison', 'Provision', 'Paix', 'Salut', 'Famille'];

  useEffect(() => {
    setupId();
    
    const unsubscribe = listenContentByType('testimony', (content) => {
      if (content.length === 0) {
        setTestimonies(MOCK_TESTIMONIES);
      } else {
        setTestimonies(content);
        updateLikedState(content);
      }
    });

    return () => unsubscribe();
  }, []);

  const setupId = async () => {
    const id = auth.currentUser?.uid || `guest_${Device.brand || 'dev'}_${Device.modelName || 'device'}`;
    setDeviceId(id);
  };

  const updateLikedState = (content) => {
    const id = auth.currentUser?.uid || `guest_${Device.brand || 'dev'}_${Device.modelName || 'device'}`;
    const liked = {};
    content.forEach(item => {
      if (item.likes?.includes(id)) {
        liked[item.id] = true;
      }
    });
    setLikedItems(liked);
  };

  const submitTestimony = () => {
    if (!newTestimony.title || !newTestimony.content) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    Alert.alert('Succès', 'Votre témoignage a été publié !');
    setNewTestimony({ title: '', content: '', category: 'Général' });
    setModalVisible(false);
  };

  const handleLikeTestimony = async (id) => {
    const idToUse = deviceId;
    if (!idToUse) return;

    try {
      // Toggle local state for immediate feedback
      setLikedItems(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      await likeContent(id, idToUse);
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Témoignages</Text>
            <Text style={styles.headerCount}>
              {`${testimonies.length}`} témoignage{testimonies.length > 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color={COLORS.tertiary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitle}>
          Partagez votre histoire de foi et inspirez la communauté
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {testimonies.length > 0 ? (
          <View style={styles.testimoniesContainer}>
            {testimonies.map((testimony) => (
              <TestimonyCard
                key={testimony.id}
                testimony={testimony}
                isLiked={likedItems[testimony.id]}
                onLike={() => handleLikeTestimony(testimony.id)}
                onShare={() => Alert.alert('Partager', 'Fonctionnalité à venir')}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={56} color={COLORS.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Aucun témoignage</Text>
            <Text style={styles.emptyText}>Soyez le premier à partager votre histoire</Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>Partager mon témoignage</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouveau témoignage</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <Text style={styles.label}>Titre de votre témoignage</Text>
              <TextInput
                style={styles.input}
                value={newTestimony.title}
                onChangeText={(text) => setNewTestimony({...newTestimony, title: text})}
                placeholder="Ex: Ma guérison..."
              />

              <Text style={styles.label}>Catégorie</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      newTestimony.category === cat && styles.categoryChipActive
                    ]}
                    onPress={() => setNewTestimony({...newTestimony, category: cat})}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        newTestimony.category === cat && styles.categoryChipTextActive
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.label}>Votre témoignage</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newTestimony.content}
                onChangeText={(text) => setNewTestimony({...newTestimony, content: text})}
                placeholder="Partagez comment Dieu a agi dans votre vie..."
                multiline
                numberOfLines={6}
              />

              <TouchableOpacity style={styles.submitBtn} onPress={submitTestimony}>
                <Text style={styles.submitBtnText}>Publier mon témoignage</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    backgroundColor: COLORS.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  headerCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: FONT_WEIGHTS.normal,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.tertiaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.xxxl,
  },
  testimoniesContainer: {
    padding: SPACING.base,
    gap: SPACING.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: SPACING.base,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.base,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.base,
  },
  emptyButton: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  emptyButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  modalForm: {
    padding: SPACING.base,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.base,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.gray50,
    color: COLORS.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: SPACING.base,
  },
  categoryChip: {
    backgroundColor: COLORS.gray50,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipActive: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
  },
  categoryChipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  categoryChipTextActive: {
    color: COLORS.textInverse,
  },
  submitBtn: {
    marginTop: SPACING.base,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.tertiary,
    paddingVertical: SPACING.base,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  submitBtnText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textInverse,
  },
});