import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNotifications } from '@/hooks/useNotifications';
import { getNotificationIcon, getNotificationColor, formatNotificationTime } from '@/utils/helpers';

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const {
    notifications,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'booking', label: 'Bookings' },
    { key: 'reminder', label: 'Reminders' },
    { key: 'promotion', label: 'Promotions' },
    { key: 'system', label: 'System' },
  ];

  const handleNotificationPress = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const handleLongPress = (notificationId: string) => {
    deleteNotification(notificationId);
  };

  const renderFilterButton = (option: { key: string; label: string }) => (
    <TouchableOpacity
      key={option.key}
      style={[
        styles.filterButton,
        filter === option.key && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(option.key)}
    >
      <ThemedText
        style={[
          styles.filterButtonText,
          filter === option.key && styles.filterButtonTextActive,
        ]}
      >
        {option.label}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderNotification = (notification: any) => (
    <Card
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(notification.id)}
      onLongPress={() => handleLongPress(notification.id)}
    >
      <ThemedView style={styles.notificationHeader}>
        <ThemedView style={styles.notificationIcon}>
          <IconSymbol
            size={20}
            name={getNotificationIcon(notification.type)}
            color={getNotificationColor(notification.type)}
          />
        </ThemedView>
        <ThemedView style={styles.notificationInfo}>
          <ThemedText style={styles.notificationTitle}>
            {notification.title}
          </ThemedText>
          <ThemedText style={styles.notificationTime}>
            {formatNotificationTime(notification.timestamp)}
          </ThemedText>
        </ThemedView>
        {!notification.isRead && (
          <Badge text="New" variant="primary" size="small" />
        )}
      </ThemedView>
      <ThemedText style={styles.notificationMessage}>
        {notification.message}
      </ThemedText>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Notifications
          </ThemedText>
          <ThemedView style={styles.headerActions}>
            {unreadCount > 0 && (
              <Badge text={unreadCount} variant="error" size="small" />
            )}
            <TouchableOpacity style={styles.settingsButton}>
              <IconSymbol
                size={24}
                name="gearshape.fill"
                color={Colors[colorScheme ?? 'light'].text}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ThemedView style={styles.filterButtons}>
              {filterOptions.map(renderFilterButton)}
            </ThemedView>
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.actionsSection}>
          <Button
            title="Mark All as Read"
            onPress={markAllAsRead}
            variant="outline"
            size="small"
            icon="checkmark.circle.fill"
            iconPosition="left"
            style={styles.actionButton}
          />
          <Button
            title="Clear All"
            onPress={clearAllNotifications}
            variant="ghost"
            size="small"
            icon="trash.fill"
            iconPosition="left"
            style={styles.actionButton}
          />
        </ThemedView>

        <ThemedView style={styles.notificationsList}>
          {notifications.length > 0 ? (
            notifications.map(renderNotification)
          ) : (
            <ThemedView style={styles.emptyState}>
              <IconSymbol
                size={64}
                name="bell.slash"
                color={Colors[colorScheme ?? 'light'].text}
                style={styles.emptyIcon}
              />
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                No Notifications
              </ThemedText>
              <ThemedText style={styles.emptyMessage}>
                You're all caught up! New notifications will appear here.
              </ThemedText>
            </ThemedView>
          )}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 8,
    marginLeft: 12,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  notificationsList: {
    flex: 1,
  },
  notificationCard: {
    marginBottom: 12,
    padding: 16,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 40,
  },
}); 