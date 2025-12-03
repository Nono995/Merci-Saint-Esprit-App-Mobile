import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function MessagesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    { id: 1, name: 'Marie Kouassi', lastMessage: 'Amen! Que Dieu te bénisse 🙏', time: '10:30', unread: 2, online: true },
    { id: 2, name: 'Pierre Mensah', lastMessage: 'Merci pour ton témoignage 💜', time: '09:15', unread: 0, online: true },
    { id: 3, name: 'Sarah Diallo', lastMessage: 'À dimanche prochain! 😊', time: 'Hier', unread: 0, online: false },
    { id: 4, name: 'David Traoré', lastMessage: 'Gloire à Dieu! ✨', time: 'Hier', unread: 1, online: false },
    { id: 5, name: 'Grace Koné', lastMessage: 'Je prie pour toi 🙏❤️', time: 'Lundi', unread: 0, online: false }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.newChatBtn}>
            <Ionicons name="create-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {conversations.map(conv => (
          <TouchableOpacity
            key={conv.id}
            style={styles.conversationItem}
            onPress={() => navigation.navigate('Chat', { user: conv })}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{conv.name.charAt(0)}</Text>
              </View>
              {conv.online && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={styles.conversationName}>{conv.name}</Text>
                <Text style={styles.conversationTime}>{conv.time}</Text>
              </View>
              <View style={styles.conversationFooter}>
                <Text style={styles.lastMessage} numberOfLines={1}>{conv.lastMessage}</Text>
                {conv.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conv.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 18 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  newChatBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, marginHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#FFF', fontWeight: '500' },
  content: { flex: 1, backgroundColor: '#FAFAFA', marginTop: 8 },
  conversationItem: { flexDirection: 'row', padding: 18, backgroundColor: '#FFF', marginHorizontal: 16, marginBottom: 10, borderRadius: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F3F4F6' },
  avatarContainer: { position: 'relative', marginRight: 14 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  avatarText: { fontSize: 22, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  onlineIndicator: { position: 'absolute', bottom: 2, right: 2, width: 16, height: 16, borderRadius: 8, backgroundColor: '#10B981', borderWidth: 3, borderColor: '#FFF', shadowColor: '#10B981', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3 },
  conversationContent: { flex: 1, justifyContent: 'center' },
  conversationHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  conversationName: { fontSize: 17, fontWeight: '700', color: '#111827', letterSpacing: -0.3 },
  conversationTime: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  conversationFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lastMessage: { flex: 1, fontSize: 14, color: '#6B7280', marginRight: 8, fontWeight: '500', lineHeight: 20 },
  unreadBadge: { backgroundColor: '#7C3AED', borderRadius: 12, minWidth: 22, height: 22, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7, shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
  unreadText: { fontSize: 12, fontWeight: '800', color: '#FFF' }
});
