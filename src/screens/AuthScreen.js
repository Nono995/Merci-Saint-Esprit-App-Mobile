import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser, registerUser } from '../services/authService';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (isLogin) {
      if (!email || !password) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs');
        return;
      }
      
      setLoading(true);
      try {
        await loginUser(email, password);
        navigation.replace('MainTabs');
      } catch (error) {
        Alert.alert('Erreur de connexion', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      if (!name || !email || !password) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs');
        return;
      }
      
      setLoading(true);
      try {
        await registerUser(email, password, name);
        navigation.replace('MainTabs');
      } catch (error) {
        Alert.alert('Erreur d\'inscription', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGuest = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.appName}>Merci Saint-Esprit</Text>
          <Text style={styles.tagline}>Bienvenue dans notre communauté</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.tabActive]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.tabActive]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Inscription</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nom complet"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {isLogin && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.authBtn} onPress={handleAuth} disabled={loading}>
            <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.authBtnGradient}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.authBtnText}>{isLogin ? 'Se connecter' : 'S\'inscrire'}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.guestBtn} onPress={handleGuest}>
            <Ionicons name="person-outline" size={20} color="#7C3AED" />
            <Text style={styles.guestBtnText}>Continuer en tant qu'invité</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  logoContainer: { alignItems: 'center' },
  logo: { width: 180, height: 180, marginBottom: 16 },
  appName: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  tagline: { fontSize: 14, color: '#E0E7FF' },
  content: { flex: 1, paddingHorizontal: 20 },
  tabsContainer: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 4, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#7C3AED' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  tabTextActive: { color: '#FFF' },
  form: { backgroundColor: '#FFF', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, color: '#111827' },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 16 },
  forgotPasswordText: { fontSize: 14, color: '#7C3AED', fontWeight: '600' },
  authBtn: { marginBottom: 16, borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  authBtnGradient: { paddingVertical: 16, alignItems: 'center' },
  authBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { marginHorizontal: 16, fontSize: 13, color: '#9CA3AF', fontWeight: '600' },
  guestBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  guestBtnText: { fontSize: 15, fontWeight: '600', color: '#7C3AED', marginLeft: 8 }
});