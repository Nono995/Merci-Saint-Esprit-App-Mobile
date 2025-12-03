import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulation d'une requête API
    setTimeout(() => {
      setLoading(false);
      if (email === 'demo@eglise.fr' && password === 'demo123') {
        Alert.alert('Succès', 'Connexion réussie !');
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        title="Connexion"
        subtitle="Rejoignez notre communauté"
        backgroundGradient={[COLORS.primary, COLORS.secondary]}
        rightIcons={[
          {
            name: 'person-add',
            onPress: () => navigation.navigate('Register'),
          }
        ]}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.loginCard}>
          <Text style={styles.sectionTitle}>Connexion</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color={COLORS.gray500} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>
          </View>

          <Button
            title={loading ? 'Connexion...' : 'Se connecter'}
            onPress={handleLogin}
            disabled={loading}
            style={styles.loginButton}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => Alert.alert('Info', 'Fonctionnalité à venir')}
          >
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </Card>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.guestButtonText}>Continuer en tant qu'invité</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  loginCard: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  inputIcon: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.lg,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray900,
  },
  eyeIcon: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  loginButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.gray600,
    fontSize: FONT_SIZES.md,
  },
  guestButton: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  guestButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
