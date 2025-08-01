import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/utils/constants/theme';
import { Heading2, BodyText, BodySmall } from '../../src/components/common/Typography';
import ImprovedCard from '../../src/components/common/ImprovedCard';

interface Booking {
  id: string;
  venueName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  guests: number;
  amount: string;
  venueImage: string;
}

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  const mockBookings: Booking[] = [
    {
      id: '1',
      venueName: 'Royal Gardens Resort',
      date: '2024-03-15',
      time: '6:00 PM',
      status: 'confirmed',
      guests: 150,
      amount: '₹25,000',
      venueImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
    },
    {
      id: '2',
      venueName: 'Sunset Beach Club',
      date: '2024-04-20',
      time: '4:00 PM',
      status: 'pending',
      guests: 100,
      amount: '₹18,000',
      venueImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
    },
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: Booking['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Heading2>My Bookings</Heading2>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <BodyText
            color={selectedTab === 'upcoming' ? theme.colors.primary : theme.colors.textSecondary}
            weight={selectedTab === 'upcoming' ? '600' : 'normal'}
          >
            Upcoming
          </BodyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
          onPress={() => setSelectedTab('past')}
        >
          <BodyText
            color={selectedTab === 'past' ? theme.colors.primary : theme.colors.textSecondary}
            weight={selectedTab === 'past' ? '600' : 'normal'}
          >
            Past
          </BodyText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.bookingsContainer} showsVerticalScrollIndicator={false}>
        {mockBookings.map((booking) => (
          <ImprovedCard key={booking.id} variant="elevated" style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View style={styles.bookingInfo}>
                <BodyText weight="600" style={styles.venueName}>
                  {booking.venueName}
                </BodyText>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(booking.status) },
                    ]}
                  />
                  <BodySmall color={getStatusColor(booking.status)}>
                    {getStatusText(booking.status)}
                  </BodySmall>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
                <BodySmall color={theme.colors.textSecondary}>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </BodySmall>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="people-outline" size={16} color={theme.colors.textSecondary} />
                <BodySmall color={theme.colors.textSecondary}>
                  {booking.guests} guests
                </BodySmall>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="card-outline" size={16} color={theme.colors.textSecondary} />
                <BodySmall color={theme.colors.textSecondary}>
                  {booking.amount}
                </BodySmall>
              </View>
            </View>

            <View style={styles.bookingActions}>
              <TouchableOpacity style={styles.actionButton}>
                <BodyText color={theme.colors.primary}>View Details</BodyText>
              </TouchableOpacity>
              {booking.status === 'confirmed' && (
                <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                  <BodyText color="#fff">Contact Venue</BodyText>
                </TouchableOpacity>
              )}
            </View>
          </ImprovedCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  bookingsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  bookingCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  bookingInfo: {
    flex: 1,
  },
  venueName: {
    marginBottom: theme.spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bookingDetails: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryAction: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});