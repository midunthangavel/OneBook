import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SAMPLE_TIME_SLOTS } from '@/utils/constants';
import { getCurrentTime, getCurrentDate, getStatusColor, getStatusText } from '@/utils/helpers';

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const currentTime = getCurrentTime();
  const currentDay = getCurrentDate();

  const handleAddEvent = () => {
    console.log('Add Event pressed');
  };

  const handleSetReminder = () => {
    console.log('Set Reminder pressed');
  };

  const renderTimeSlot = (slot: any, index: number) => (
    <Card key={index} style={styles.timeSlot}>
      <ThemedView style={styles.timeContainer}>
        <ThemedText style={styles.timeText}>{slot.time}</ThemedText>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(slot.status) }]} />
      </ThemedView>
      <ThemedView style={styles.eventContainer}>
        <ThemedText style={styles.eventText}>{slot.event}</ThemedText>
        <ThemedText style={[styles.statusText, { color: getStatusColor(slot.status) }]}>
          {getStatusText(slot.status)}
        </ThemedText>
      </ThemedView>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Calendar</ThemedText>
          <IconSymbol size={24} name="calendar" color={Colors[colorScheme ?? 'light'].text} />
        </ThemedView>

        <Card style={styles.currentTimeSection}>
          <ThemedText type="subtitle" style={styles.currentDay}>{currentDay}</ThemedText>
          <ThemedText type="title" style={styles.currentTime}>{currentTime}</ThemedText>
        </Card>

        <ThemedView style={styles.scheduleSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Today's Schedule</ThemedText>
          
          {SAMPLE_TIME_SLOTS.map(renderTimeSlot)}
        </ThemedView>

        <ThemedView style={styles.quickActions}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          <ThemedView style={styles.actionButtons}>
            <Button
              title="Add Event"
              onPress={handleAddEvent}
              variant="outline"
              icon="plus"
              iconPosition="left"
              style={styles.actionButton}
            />
            <Button
              title="Set Reminder"
              onPress={handleSetReminder}
              variant="outline"
              icon="clock"
              iconPosition="left"
              style={styles.actionButton}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  currentTimeSection: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  currentDay: {
    fontSize: 16,
    marginBottom: 10,
    opacity: 0.8,
  },
  currentTime: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  scheduleSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeSlot: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  eventContainer: {
    flex: 1,
    marginLeft: 15,
  },
  eventText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 