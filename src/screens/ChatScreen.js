import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatScreen({ route, navigation }) {
  const { user } = route.params;
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const scrollViewRef = useRef();

  const emojis = ['😊', '❤️', '🙏', '✨', '💜', '🔥', '👏', '🎉', '😇', '💪', '🌟', '🙌', '😍', '🥰', '😂', '👍', '✝️', '🕊️'];

  const [messages, setMessages] = useState([
    { id: 1, text: 'Salut! Comment vas-tu?', sender: 'other', time: '10:25' },
    { id: 2, text: 'Très bien merci! Et toi? 😊', sender: 'me', time: '10:26' },
    { id: 3, text: 'Gloire à Dieu! J\'ai vu ton témoignage hier 🙏', sender: 'other', time: '10:28' },
    { id: 4, text: 'Amen! Que Dieu te bénisse 🙏', sender: 'other', time: '10:30' }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const addEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>{user.online ? 'En ligne' : 'Hors ligne'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageWrapper, msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper]}>
              <View style={[styles.messageBubble, msg.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
                <Text style={[styles.messageText, msg.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
                  {msg.text}
                </Text>
              </View>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {showEmojis && (
          <View style={styles.emojiPicker}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiList}>
              {emojis.map((emoji, index) => (
                <TouchableOpacity key={index} style={styles.emojiBtn} onPress={() => addEmoji(emoji)}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiToggle} onPress={() => setShowEmojis(!showEmojis)}>
            <Ionicons name={showEmojis ? 'close-circle' : 'happy-outline'} size={24} color="#7C3AED" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Écrivez un message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.sendBtnGradient}>
              <Ionicons name="send" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingTop: 50, paddingBottom: 18 },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22, marginRight: 4 },
  userInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#FFF', letterSpacing: -0.3 },
  userDetails: { marginLeft: 12 },
  userName: { fontSize: 17, fontWeight: '700', color: '#FFF', letterSpacing: -0.3 },
  userStatus: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2, fontWeight: '600' },
  moreBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22 },
  chatContainer: { flex: 1 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 18 },
  messageWrapper: { marginBottom: 14, maxWidth: '78%' },
  myMessageWrapper: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  otherMessageWrapper: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  messageBubble: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  myMessage: { backgroundColor: '#7C3AED', borderBottomRightRadius: 6 },
  otherMessage: { backgroundColor: '#FFF', borderBottomLeftRadius: 6, borderWidth: 1, borderColor: '#F3F4F6' },
  messageText: { fontSize: 15, lineHeight: 21, letterSpacing: -0.2 },
  myMessageText: { color: '#FFF', fontWeight: '500' },
  otherMessageText: { color: '#111827', fontWeight: '500' },
  messageTime: { fontSize: 11, color: '#9CA3AF', marginTop: 5, fontWeight: '600' },
  emojiPicker: { backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 14, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  emojiList: { paddingHorizontal: 18 },
  emojiBtn: { marginRight: 14 },
  emoji: { fontSize: 32 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  emojiToggle: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 24, paddingHorizontal: 18, paddingVertical: 12, fontSize: 15, color: '#111827', maxHeight: 100, marginHorizontal: 10, fontWeight: '500', borderWidth: 1, borderColor: '#E5E7EB' },
  sendBtn: { width: 44, height: 44 },
  sendBtnGradient: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
});
