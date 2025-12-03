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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    // Simulation d'inscription
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Succès',
        'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.',
        [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]
      );
    }, 2000);
  };

  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, required = false }) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color={COLORS.gray500} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder + (required ? ' *' : '')}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={icon === 'person' ? 'words' : 'none'}
        autoCorrect={false}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => {
            if (placeholder.includes('Mot de passe')) {
              setShowPassword(!showPassword);
            } else {
              setShowConfirmPassword(!showConfirmPassword);
            }
          }}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={(placeholder.includes('Mot de passe') ? showPassword : showConfirmPassword) ? "eye-off" : "eye"}
            size={20}
            color={COLORS.gray500}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Ionicons name="person-add" size={60} color={COLORS.white} />
            <Text style={styles.title}>Rejoignez-nous</Text>
            <Text style={styles.subtitle}>Créez votre compte communautaire</Text>
          </View>

          <Card style={styles.registerCard}>
            <Text style={styles.sectionTitle}>Inscription</Text>

            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Ionicons name="person" size={20} color={COLORS.gray500} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Prénom *"
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom *"
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <InputField
              icon="mail"
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              required
            />

            <InputField
              icon="call"
              placeholder="Téléphone"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />

            <InputField
              icon="lock-closed"
              placeholder="Mot de passe"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry={!showPassword}
              required
            />

            <InputField
              icon="lock-closed"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
              required
            />

            <Button
              title="S'inscrire"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLinkText}>
                Déjà un compte ? <Text style={styles.loginLinkBold}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  registerCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 0,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 0.48,
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
  registerButton: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  loginLink: {
    alignSelf: 'center',
  },
  loginLinkText: {
    color: COLORS.gray600,
    fontSize: FONT_SIZES.md,
  },
  loginLinkBold: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});
