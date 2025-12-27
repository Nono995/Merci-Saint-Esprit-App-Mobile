import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const EventCard = ({ event, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDateInfo = (date) => {
    if (!date) return { day: '', month: '' };
    const d = new Date(date);
    return {
      day: d.getDate().toString(),
      month: d.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase(),
    };
  };

  const dateInfo = getDateInfo(event.date);

  // Icônes et couleurs par type d'événement
  const eventTypes = {
    service: { icon: 'book', color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)' },
    prayer: { icon: 'hand-left', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
    conference: { icon: 'mic', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    retreat: { icon: 'leaf', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    youth: { icon: 'people', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)' },
    default: { icon: 'calendar', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  };

  const eventStyle = eventTypes[event.type] || eventTypes.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        {/* Background Icon */}
        <View style={styles.backgroundIcon}>
          <Ionicons name={eventStyle.icon} size={100} color={eventStyle.bg} />
        </View>

        {/* Icon Badge avec fond coloré */}
        <View style={[styles.iconBadge, { backgroundColor: eventStyle.bg }]}>
          <Ionicons name={eventStyle.icon} size={28} color={eventStyle.color} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {event.title}
            </Text>
            <View style={[styles.dateBadge, { borderColor: eventStyle.color }]}>
              <Text style={[styles.dateDay, { color: eventStyle.color }]}>{dateInfo.day}</Text>
              <Text style={[styles.dateMonth, { color: eventStyle.color }]}>{dateInfo.month}</Text>
            </View>
          </View>
          
          {!!event.description && (
            <Text style={styles.description} numberOfLines={2}>
              {event.description}
            </Text>
          )}

          <View style={styles.footer}>
            {!!event.location && (
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={14} color={COLORS.textTertiary} />
                <Text style={styles.metaText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
            )}

            {!!event.attendees && event.attendees > 0 && (
              <View style={[styles.attendeesContainer, { backgroundColor: eventStyle.bg }]}>
                <Ionicons name="people-outline" size={14} color={eventStyle.color} />
                <Text style={[styles.attendeesText, { color: eventStyle.color }]}>{event.attendees}</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.base,
    flexDirection: 'row',
    gap: SPACING.base,
    ...SHADOWS.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundIcon: {
    position: 'absolute',
    right: -15,
    top: -15,
    opacity: 0.3,
    transform: [{ rotate: '15deg' }],
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
    lineHeight: 20,
    marginRight: SPACING.sm,
  },
  dateBadge: {
    minWidth: 44,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dateDay: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 18,
  },
  dateMonth: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    flex: 1,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.xs,
  },
  attendeesText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default EventCard;
