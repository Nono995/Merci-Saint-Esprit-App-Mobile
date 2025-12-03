import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants/theme';
import { HeaderWithIcon } from '../components/Header';

export default function EventDetailScreen({ navigation, route }) {
  const { event } = route.params;

  const getEventIcon = (type) => {
    switch (type) {
      case 'worship':
        return 'musical-notes';
      case 'study':
        return 'book';
      case 'prayer':
        return 'heart';
      case 'meeting':
        return 'people';
      default:
        return 'calendar';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'worship':
        return COLORS.worship;
      case 'study':
        return COLORS.spiritual;
      case 'prayer':
        return COLORS.prayer;
      case 'meeting':
        return COLORS.community;
      default:
        return COLORS.primary;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithIcon
        icon={getEventIcon(event.type)}
        title={event.title}
        subtitle={`${event.date} à ${event.time}`}
        backgroundGradient={[getEventColor(event.type), getEventColor(event.type) + '80']}
        showBack={true}
        rightIcons={[
          {
            name: 'share',
            onPress: () => {},
          },
          {
            name: 'heart',
            onPress: () => {},
          }
        ]}
        navigation={navigation}
      />

      <ScrollView style={styles.content}>
        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color={COLORS.gray500} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={COLORS.gray500} />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.gray500} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={20} color={COLORS.gray500} />
            <Text style={styles.infoText}>{event.type}</Text>
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          <Button
            title="Ajouter au calendrier"
            onPress={() => {}}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="Partager"
            onPress={() => {}}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Rappeler 1h avant"
            onPress={() => {}}
            variant="outline"
            style={styles.actionButton}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.xl,
    left: SPACING.lg,
    zIndex: 10,
    backgroundColor: COLORS.white + '20',
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.sm,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  eventIconLarge: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  eventTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  eventDate: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.xs,
  },
  eventLocation: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  detailsCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray700,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray700,
    marginLeft: SPACING.md,
  },
  actionsCard: {
    marginBottom: SPACING.xl,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
});
