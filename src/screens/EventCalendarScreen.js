import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { HeaderWithIcon } from '../components/Header';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function EventCalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } = useTheme();
  const styles = createStyles({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS });

  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth >= 800 ? 3 : 2; // responsive: 3 columns for wider screens, else 2

  const events = [
    {
      id: 1,
      title: 'Culte du Dimanche',
      date: '2024-01-21',
      time: '10:00',
      location: 'Salle principale',
      type: 'worship',
      description: 'Culte dominical avec prédication et adoration',
    },
    {
      id: 2,
      title: 'Étude Biblique',
      date: '2024-01-23',
      time: '19:30',
      location: 'Salle de réunion',
      type: 'study',
      description: 'Étude approfondie du livre de Philippiens',
    },
    {
      id: 3,
      title: 'Soirée de Prière',
      date: '2024-01-25',
      time: '20:00',
      location: 'Chapelle',
      type: 'prayer',
      description: 'Moment de prière communautaire',
    },
    {
      id: 4,
      title: 'Réunion des Anciens',
      date: '2024-01-27',
      time: '14:00',
      location: 'Bureau pastoral',
      type: 'meeting',
      description: 'Réunion mensuelle des responsables',
    },
    {
      id: 5,
      title: 'Concert de Louange',
      date: '2024-01-28',
      time: '18:00',
      location: 'Auditorium',
      type: 'worship',
      description: 'Concert spécial avec l\'ensemble de louange',
    },
  ];

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

  const renderEvent = (event) => (
    <Card key={event.id} style={styles.eventCard} onPress={() => navigation.navigate('EventDetail', { event })}>
      <View style={styles.eventHeader}>
        <View style={[styles.eventIcon, { backgroundColor: getEventColor(event.type) + '20' }]}>
          <Ionicons name={getEventIcon(event.type)} size={24} color={getEventColor(event.type)} />
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.eventLocation}>{event.location}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      </View>
      <Text style={styles.eventDescription}>{event.description}</Text>
    </Card>
  );

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  const stats = [
    { id: 's1', value: events.length, label: 'Événements' },
    { id: 's2', value: upcomingEvents.length, label: 'À venir' },
    { id: 's3', value: 4, label: 'Types' },
    { id: 's4', value: 85, label: 'Participants' },
    { id: 's5', value: pastEvents.length, label: 'Passés' },
    { id: 's6', value: Math.max(0, events.length - upcomingEvents.length), label: 'Archives' },
  ];

  const monthInfo = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = first.getDay();
    return { year, month, daysInMonth, startDay };
  }, [selectedDate]);

  // Map events in the current month by day number for quick lookup
  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === monthInfo.year && d.getMonth() === monthInfo.month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e);
      }
    });
    return map;
  }, [events, monthInfo]);

  const renderCalendar = () => {
    const { daysInMonth, startDay } = monthInfo;
    const blanks = Array.from({ length: startDay });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
            <Ionicons name="chevron-back" size={20} color={COLORS.gray700} />
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>{selectedDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</Text>
          <TouchableOpacity onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray700} />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysRow}>
          {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map((d) => (
            <Text key={d} style={styles.weekDay}>{d}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {blanks.map((_, i) => <View key={`b${i}`} style={styles.dayCell} />)}
          {days.map((d) => {
            const hasEvents = eventsByDay[d] && eventsByDay[d].length > 0;
            // choose a color from the first event type for the dot
            const dotColor = hasEvents ? getEventColor(eventsByDay[d][0].type) : undefined;
            return (
              <TouchableOpacity key={d} style={styles.dayCell} onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d))}>
                <Text style={[styles.dayText, d === selectedDate.getDate() ? styles.daySelectedText : null]}>{d}</Text>
                {hasEvents && <View style={[styles.dayDot, { backgroundColor: dotColor }]} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithIcon
        icon="calendar"
        title="Calendrier des Événements"
        subtitle="Découvrez les activités de notre communauté"
        backgroundGradient={[COLORS.community, COLORS.community + '80']}
        rightIcons={[{ name: 'add-circle', action: 'add' }]}
        navigation={navigation}
      />

      <ScrollView style={styles.content}>
        <View style={styles.quickActions}>
          <Button
            title="Aujourd'hui"
            onPress={() => setSelectedDate(new Date())}
            variant="outline"
            size="sm"
            style={styles.quickActionButton}
          />
          <Button
            title="Cette semaine"
            variant="outline"
            size="sm"
            style={styles.quickActionButton}
          />
          <Button
            title="Ce mois"
            variant="outline"
            size="sm"
            style={styles.quickActionButton}
          />
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Événements à venir</Text>
          {renderCalendar()}

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(renderEvent)
          ) : (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>Aucun événement prévu pour le moment</Text>
            </Card>
          )}
        </View>

        {pastEvents.length > 0 && (
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Événements passés</Text>
            {pastEvents.slice(0, 3).map(renderEvent)}
            {pastEvents.length > 3 && (
              <TouchableOpacity style={styles.showMore}>
                <Text style={styles.showMoreText}>Voir plus d'événements passés</Text>
                <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <FlatList
            data={stats}
            keyExtractor={(i) => i.id}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : null}
            renderItem={({ item }) => (
              <Card style={[styles.statCard, { width: `${100 / numColumns - 4}%` }]}>
                <Text style={styles.statNumber}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </Card>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = ({ COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.gray50,
    },
    header: {
      paddingTop: SPACING.xl,
      paddingBottom: SPACING.xxl,
      paddingHorizontal: SPACING.lg,
    },
    headerContent: {
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: COLORS.white,
      marginTop: SPACING.md,
      marginBottom: SPACING.sm,
    },
    headerSubtitle: {
      fontSize: FONT_SIZES.md,
      color: COLORS.white,
      opacity: 0.9,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: SPACING.md,
      paddingBottom: SPACING.xl,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: SPACING.xl,
      paddingHorizontal: SPACING.md,
    },
    quickActionButton: {
      flex: 1,
      marginHorizontal: SPACING.xs,
      minWidth: 100,
    },
    eventsSection: {
      marginBottom: SPACING.xxxl,
      marginHorizontal: SPACING.sm,
    },
    sectionTitle: {
      fontSize: FONT_SIZES.xl,
      fontWeight: FONT_WEIGHTS.bold,
      color: COLORS.gray900,
      marginBottom: SPACING.lg,
      marginLeft: SPACING.sm,
      paddingLeft: SPACING.sm,
    },
    eventCard: {
      marginHorizontal: 0,
      marginBottom: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      padding: 0,
    },
    eventHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.md,
      padding: SPACING.md,
    },
    eventIcon: {
      width: 60,
      height: 60,
      borderRadius: BORDER_RADIUS.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.lg,
    },
    eventInfo: {
      flex: 1,
    },
    eventTitle: {
      fontSize: FONT_SIZES.lg,
      fontWeight: FONT_WEIGHTS.semibold,
      color: COLORS.gray900,
      marginBottom: SPACING.xs,
    },
    eventMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SPACING.xs,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: SPACING.lg,
    },
    eventTime: {
      fontSize: FONT_SIZES.sm,
      color: COLORS.gray600,
      marginLeft: SPACING.xs,
      fontWeight: FONT_WEIGHTS.medium,
    },
    eventLocation: {
      fontSize: FONT_SIZES.sm,
      color: COLORS.gray600,
      marginLeft: SPACING.xs,
      fontWeight: FONT_WEIGHTS.medium,
    },
    eventDescription: {
      fontSize: FONT_SIZES.md,
      color: COLORS.gray700,
      lineHeight: 20,
      marginTop: 0,
      paddingHorizontal: SPACING.md,
      paddingBottom: SPACING.md,
    },
    emptyCard: {
      alignItems: 'center',
      padding: SPACING.xl,
    },
    emptyText: {
      fontSize: FONT_SIZES.md,
      color: COLORS.gray500,
      textAlign: 'center',
    },
    showMore: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.md,
    },
    showMoreText: {
      fontSize: FONT_SIZES.md,
      color: COLORS.primary,
      marginRight: SPACING.xs,
    },
    statsSection: {
      marginBottom: SPACING.xl,
    },
    statCard: {
      alignItems: 'center',
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
    },
    statNumber: {
      fontSize: FONT_SIZES.xxxl,
      fontWeight: FONT_WEIGHTS.bold,
      color: COLORS.primary,
      marginBottom: SPACING.xs,
    },
    statLabel: {
      fontSize: FONT_SIZES.md,
      color: COLORS.gray600,
      textAlign: 'center',
    },
    // calendar
    calendarContainer: {
      backgroundColor: COLORS.surface,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.md,
      marginBottom: SPACING.lg,
    },
    calendarHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: SPACING.sm,
    },
    calendarTitle: {
      fontSize: FONT_SIZES.md,
      fontWeight: FONT_WEIGHTS.semibold,
      color: COLORS.gray900,
    },
    weekDaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SPACING.sm,
    },
    weekDay: {
      width: `${100 / 7}%`,
      textAlign: 'center',
      color: COLORS.gray600,
      fontSize: FONT_SIZES.xs,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.sm,
    },
    dayText: {
      color: COLORS.gray700,
    },
    daySelectedText: {
      color: COLORS.white,
      backgroundColor: COLORS.primary,
      paddingHorizontal: SPACING.xs,
      paddingVertical: 4,
      borderRadius: BORDER_RADIUS.md,
    },
    dayDot: {
      width: 6,
      height: 6,
      borderRadius: 6,
      marginTop: 6,
    },
  });
