import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProfessionalSlider from '../components/ProfessionalSlider';
import VerticalSlider from '../components/VerticalSlider';

export default function SliderDemoScreen() {
  const [horizontalValue, setHorizontalValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(70);
  const [brightnessValue, setBrightnessValue] = useState(80);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.header}>
        <Text style={styles.headerTitle}>Sliders Professionnels</Text>
        <Text style={styles.headerSubtitle}>Composants redesignés</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Slider Horizontal</Text>
          <Text style={styles.sectionDescription}>Progression audio/vidéo</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Progression: {Math.round(horizontalValue)}%</Text>
            <ProfessionalSlider
              value={horizontalValue}
              maxValue={100}
              onValueChange={setHorizontalValue}
              primaryColor="#8B5CF6"
              secondaryColor="#6D28D9"
              height={6}
              showTooltip={false}
            />
            <Text style={styles.usage}>Utilisé dans: PodcastScreen, VideoPlayerScreen</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎚️ Sliders Verticaux</Text>
          <Text style={styles.sectionDescription}>Volume et contrôles fins</Text>
          
          <View style={styles.verticalContainer}>
            <View style={styles.verticalCard}>
              <VerticalSlider
                value={volumeValue}
                maxValue={100}
                onValueChange={setVolumeValue}
                primaryColor="#8B5CF6"
                secondaryColor="#6D28D9"
                width={6}
                size={200}
                showLabel={true}
                label="Volume"
              />
            </View>

            <View style={styles.verticalCard}>
              <VerticalSlider
                value={brightnessValue}
                maxValue={100}
                onValueChange={setBrightnessValue}
                primaryColor="#F59E0B"
                secondaryColor="#D97706"
                width={6}
                size={200}
                showLabel={true}
                label="Luminosité"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Caractéristiques</Text>
          <View style={styles.featureCard}>
            <Text style={styles.feature}>✓ Poignée animée avec feedback visuel</Text>
            <Text style={styles.feature}>✓ Gradient professionnel 2 couleurs</Text>
            <Text style={styles.feature}>✓ Ombres dynamiques au drag</Text>
            <Text style={styles.feature}>✓ Support du tactile interactif</Text>
            <Text style={styles.feature}>✓ Couleurs personnalisables</Text>
            <Text style={styles.feature}>✓ Hauteur ajustable</Text>
          </View>
        </View>

        <View style={styles.footerPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#EDE9FE' },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  sectionDescription: { fontSize: 13, color: '#9CA3AF', marginBottom: 12 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 12 },
  usage: { fontSize: 12, fontWeight: '600', color: '#8B5CF6', marginTop: 16 },
  verticalContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  verticalCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, flex: 1, marginHorizontal: 6, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  featureCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: '#8B5CF6', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  feature: { fontSize: 14, color: '#4B5563', marginVertical: 6, fontWeight: '500' },
  footerPadding: { height: 40 }
});