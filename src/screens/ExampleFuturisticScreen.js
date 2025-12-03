import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, GRADIENTS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';
import NeonHeader from '../components/NeonHeader';
import FuturisticCard from '../components/FuturisticCard';
import ModernButton from '../components/ModernButton';
import ContentCard from '../components/ContentCard';
import ActionCardModern from '../components/ActionCardModern';

const ExampleFuturisticScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NeonHeader
        title="Design Futuriste"
        subtitle="Exemple de composants modernes"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="settings-outline"
        glowColor={COLORS.primary}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section: Cartes d'Action */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cartes d'Action</Text>
          <View style={styles.actionGrid}>
            <ActionCardModern
              icon="play-circle"
              label="Vidéos"
              subtitle="120 vidéos"
              gradient={GRADIENTS.primary}
              neonGlow={true}
              onPress={() => {}}
            />
            <ActionCardModern
              icon="headset"
              label="Podcasts"
              subtitle="45 épisodes"
              gradient={GRADIENTS.secondary}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Section: Carte de Contenu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenu Récent</Text>
          <ContentCard
            title="La Puissance de la Foi"
            description="Un message puissant sur la transformation par la foi en Dieu et la persévérance dans les moments difficiles."
            category="Vidéo"
            duration="45:30"
            views={2543}
            likes={124}
            author="Pasteur Jean"
            gradient={GRADIENTS.primary}
            onPress={() => {}}
          />
        </View>

        {/* Section: Cartes Futuristes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cartes avec Effets</Text>
          
          {/* Carte avec Gradient */}
          <FuturisticCard
            gradient={GRADIENTS.neonDream}
            neonBorder={true}
            neonColor={COLORS.primary}
            shadow="lg"
            style={styles.exampleCard}
          >
            <Text style={styles.cardTitle}>Carte avec Gradient</Text>
            <Text style={styles.cardText}>
              Cette carte utilise un gradient multi-couleur avec une bordure néon.
            </Text>
          </FuturisticCard>

          {/* Carte avec Effet Verre */}
          <FuturisticCard
            glassEffect={true}
            neonBorder={true}
            neonColor={COLORS.secondary}
            shadow="md"
            style={styles.exampleCard}
          >
            <Text style={styles.cardTitle}>Carte Effet Verre</Text>
            <Text style={styles.cardText}>
              Cette carte utilise un effet de verre translucide moderne.
            </Text>
          </FuturisticCard>
        </View>

        {/* Section: Boutons Modernes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Boutons</Text>
          
          <ModernButton
            title="Bouton avec Gradient"
            gradient={GRADIENTS.primary}
            icon="play-circle"
            neonGlow={true}
            fullWidth={true}
            onPress={() => {}}
            style={styles.button}
          />

          <ModernButton
            title="Bouton Primary"
            variant="primary"
            icon="heart"
            iconPosition="right"
            fullWidth={true}
            onPress={() => {}}
            style={styles.button}
          />

          <ModernButton
            title="Bouton Ghost"
            variant="ghost"
            icon="share-social"
            fullWidth={true}
            onPress={() => {}}
            style={styles.button}
          />

          <View style={styles.buttonRow}>
            <ModernButton
              title="Petit"
              variant="secondary"
              size="sm"
              onPress={() => {}}
              style={styles.buttonSmall}
            />
            <ModernButton
              title="Moyen"
              variant="tertiary"
              size="md"
              onPress={() => {}}
              style={styles.buttonSmall}
            />
            <ModernButton
              title="Grand"
              variant="accent"
              size="lg"
              onPress={() => {}}
              style={styles.buttonSmall}
            />
          </View>
        </View>

        {/* Section: Palette de Couleurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Palette de Couleurs</Text>
          <View style={styles.colorGrid}>
            <View style={[styles.colorBox, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.colorLabel}>Primary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: COLORS.secondary }]}>
              <Text style={styles.colorLabel}>Secondary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: COLORS.tertiary }]}>
              <Text style={styles.colorLabel}>Tertiary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: COLORS.quaternary }]}>
              <Text style={styles.colorLabel}>Quaternary</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: COLORS.accent }]}>
              <Text style={styles.colorLabel}>Accent</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: COLORS.success }]}>
              <Text style={styles.colorLabel}>Success</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.base,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  exampleCard: {
    marginBottom: SPACING.base,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  cardText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  button: {
    marginBottom: SPACING.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  buttonSmall: {
    flex: 1,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  colorBox: {
    width: 100,
    height: 80,
    borderRadius: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
});

export default ExampleFuturisticScreen;
