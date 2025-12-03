import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function DonationScreen() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('unique');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const amounts = [10, 25, 50, 100, 200, 500];
  const types = [
    { id: 'unique', label: 'Don unique', icon: 'gift-outline' },
    { id: 'monthly', label: 'Mensuel', icon: 'calendar-outline' },
    { id: 'tithe', label: 'Dîme', icon: 'heart-outline' }
  ];
  const methods = [
    { id: 'card', label: 'Carte bancaire', icon: 'card-outline' },
    { id: 'paypal', label: 'PayPal', icon: 'wallet-outline' },
    { id: 'transfer', label: 'Virement', icon: 'swap-horizontal-outline' }
  ];

  const handleDonation = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner un montant valide');
      return;
    }
    Alert.alert('Confirmation', `Confirmer votre don de ${amount}€ ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => {
        Alert.alert('Merci !', 'Votre don a été traité avec succès.');
        setSelectedAmount(null);
        setCustomAmount('');
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.header}>
        <Ionicons name="heart" size={48} color="#FFF" />
        <Text style={styles.headerTitle}>Faire un don</Text>
        <Text style={styles.headerSubtitle}>Soutenez notre mission et bénissez la communauté</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type de don</Text>
          <View style={styles.typeGrid}>
            {types.map(type => (
              <TouchableOpacity key={type.id} style={[styles.typeCard, donationType === type.id && styles.typeCardActive]} onPress={() => setDonationType(type.id)}>
                <Ionicons name={type.icon} size={24} color={donationType === type.id ? '#F59E0B' : '#6B7280'} />
                <Text style={[styles.typeLabel, donationType === type.id && styles.typeLabelActive]}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montant</Text>
          <View style={styles.amountGrid}>
            {amounts.map(amount => (
              <TouchableOpacity key={amount} style={[styles.amountCard, selectedAmount === amount && styles.amountCardActive]} onPress={() => { setSelectedAmount(amount); setCustomAmount(''); }}>
                <Text style={[styles.amountText, selectedAmount === amount && styles.amountTextActive]}>{amount}€</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.customBox}>
            <Text style={styles.customLabel}>Montant personnalisé</Text>
            <TextInput style={styles.customInput} value={customAmount} onChangeText={(text) => { setCustomAmount(text); setSelectedAmount(null); }} placeholder="0" keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>
          {methods.map(method => (
            <TouchableOpacity key={method.id} style={[styles.methodCard, paymentMethod === method.id && styles.methodCardActive]} onPress={() => setPaymentMethod(method.id)}>
              <Ionicons name={method.icon} size={24} color={paymentMethod === method.id ? '#F59E0B' : '#6B7280'} />
              <Text style={[styles.methodLabel, paymentMethod === method.id && styles.methodLabelActive]}>{method.label}</Text>
              {paymentMethod === method.id && <Ionicons name="checkmark-circle" size={20} color="#10B981" />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.impactBox}>
          <Text style={styles.impactTitle}>Impact de votre don</Text>
          {[
            { icon: 'people-outline', text: 'Soutien aux familles' },
            { icon: 'school-outline', text: 'Programmes éducatifs' },
            { icon: 'construct-outline', text: 'Maintenance des locaux' },
            { icon: 'globe-outline', text: 'Missions et évangélisation' }
          ].map((item, i) => (
            <View key={i} style={styles.impactItem}>
              <Ionicons name={item.icon} size={20} color="#F59E0B" />
              <Text style={styles.impactText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.donateBtn} onPress={handleDonation}>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.donateBtnGradient}>
            <Ionicons name="heart" size={24} color="#FFF" />
            <Text style={styles.donateBtnText}>Donner {selectedAmount || customAmount || '0'}€</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.securityBadge}>
          <Ionicons name="shield-checkmark" size={20} color="#10B981" />
          <Text style={styles.securityText}>Paiement 100% sécurisé</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingTop: 50, paddingBottom: 40, paddingHorizontal: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginTop: 12, marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: '#FEF3C7', textAlign: 'center' },
  content: { padding: 20 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
  typeGrid: { flexDirection: 'row', gap: 12 },
  typeCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB' },
  typeCardActive: { borderColor: '#F59E0B', backgroundColor: '#FFFBEB' },
  typeLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginTop: 8 },
  typeLabelActive: { color: '#F59E0B' },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  amountCard: { width: '30%', backgroundColor: '#FFF', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB' },
  amountCardActive: { borderColor: '#F59E0B', backgroundColor: '#FFFBEB' },
  amountText: { fontSize: 18, fontWeight: '700', color: '#6B7280' },
  amountTextActive: { color: '#F59E0B' },
  customBox: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  customLabel: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 8 },
  customInput: { fontSize: 24, fontWeight: '700', color: '#111827', borderBottomWidth: 2, borderBottomColor: '#F59E0B', paddingVertical: 8 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: '#E5E7EB' },
  methodCardActive: { borderColor: '#F59E0B', backgroundColor: '#FFFBEB' },
  methodLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#6B7280', marginLeft: 12 },
  methodLabelActive: { color: '#F59E0B' },
  impactBox: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 24 },
  impactTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
  impactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  impactText: { fontSize: 14, color: '#6B7280', marginLeft: 12 },
  donateBtn: { marginBottom: 16, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  donateBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18 },
  donateBtnText: { fontSize: 18, fontWeight: '700', color: '#FFF', marginLeft: 8 },
  securityBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  securityText: { fontSize: 14, fontWeight: '600', color: '#10B981', marginLeft: 8 }
});