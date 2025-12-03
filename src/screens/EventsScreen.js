import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, MOCK_EVENTS } from '../constants/theme';
import EventCard from '../components/EventCard';

export default function EventsScreen({ navigation }) {
  const [events] = useState(MOCK_EVENTS);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) > now);
  const pastEvents = events.filter(e => new Date(e.date) <= now);

  const filteredEvents = filter === 'upcoming' ? upcomingEvents : 
                         filter === 'past' ? pastEvents : events;

  const filters = [
    { id: 'all', label: 'Tous', count: events.length },
    { id: 'upcoming', label: 'À venir', count: upcomingEvents.length },
    { id: 'past', label: 'Passés', count: pastEvents.length },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Événements</Text>
            <Text style={styles.headerCount}>
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddContent')}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color={COLORS.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterButton,
                filter === f.id && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.id && styles.filterTextActive,
                ]}
              >
                {f.label}
              </Text>
              <View
                style={[
                  styles.filterBadge,
                  filter === f.id && styles.filterBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterBadgeText,
                    filter === f.id && styles.filterBadgeTextActive,
                  ]}
                >
                  {f.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredEvents.length > 0 ? (
          <View style={styles.eventsContainer}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => {}}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-outline" size={56} color={COLORS.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>Aucun événement</Text>
            <Text style={styles.emptyText}>
              {filter === 'upcoming' && 'Aucun événement à venir pour le moment'}
              {filter === 'past' && 'Aucun événement passé'}
              {filter === 'all' && 'Revenez bientôt pour découvrir nos événements'}
            </Text>
          </View>
        )}
      </ScrollView>
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
    marginBottom: SPACING.base,
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
  filtersContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray50,
  },
  filterButtonActive: {
    backgroundColor: COLORS.tertiaryBg,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.tertiary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  filterBadge: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.xs,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: COLORS.tertiary,
  },
  filterBadgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textSecondary,
  },
  filterBadgeTextActive: {
    color: COLORS.textInverse,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: SPACING.xxxl,
  },
  eventsContainer: {
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
  },
});
