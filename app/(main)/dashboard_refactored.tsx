import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BaseScreen } from '../../src/components/common/BaseScreen';
import { Card } from '../../src/components/ui/Card';
// import { useAppStore } from '../../src/store/AppStore'; // COMMENTED OUT: Authentication disabled
// import { useAuthActions } from '../../src/hooks/useAuthActions'; // COMMENTED OUT: Authentication disabled
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';

interface DashboardStats {
  totalBookings: number;
  upcomingEvents: number;
  favoriteVenues: number;
  recentActivity: number;
}

interface QuickAction {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
}

export default function DashboardScreen() {
  // const { state } = useAppStore(); // COMMENTED OUT: Authentication disabled
  // const { signOut } = useAuthActions(); // COMMENTED OUT: Authentication disabled
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'search',
      title: 'Find Venues',
      icon: 'search',
      route: '/(main)/search',
      color: colors.primary,
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      icon: 'calendar',
      route: '/(main)/bookings',
      color: colors.success,
    },
    {
      id: 'favorites',
      title: 'Favorites',
      icon: 'heart',
      route: '/(main)/favorites',
      color: colors.error,
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'person',
      route: '/(main)/profile',
      color: colors.warning,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      setError(null);
      // Simulate API call - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalBookings: 12,
        upcomingEvents: 3,
        favoriteVenues: 8,
        recentActivity: 5,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleQuickAction = (action: QuickAction) => {
    router.push(action.route as any);
  };

  // COMMENTED OUT: Authentication disabled - remove logout functionality
  // const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     router.replace('/');
  //   } catch (err) {
  //     setError('Failed to logout');
  //   }
  // };

  if (loading && !refreshing) {
    return (
      <BaseScreen loading={true} loadingMessage="Loading dashboard..." />
    );
  }

  return (
    <BaseScreen style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, Demo User! 👋</Text>
          <Text style={styles.subtitle}>Your wedding planning dashboard</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickAction, { backgroundColor: action.color }]}
              onPress={() => handleQuickAction(action)}
            >
              <Ionicons name={action.icon} size={28} color="#fff" />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.totalBookings ?? '--'}</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.upcomingEvents ?? '--'}</Text>
              <Text style={styles.statLabel}>Upcoming Events</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.favoriteVenues ?? '--'}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats?.recentActivity ?? '--'}</Text>
              <Text style={styles.statLabel}>Recent Activity</Text>
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.activityText}>No recent activity</Text>
        </Card>

        {/* COMMENTED OUT: Authentication disabled - remove logout button */}
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20, // Add some padding at the bottom for the last section
  },
  header: {
    paddingHorizontal: dimensions.md,
    paddingVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: dimensions.md,
    marginBottom: 24,
  },
  quickAction: {
    width: '45%', // Adjust as needed for 2 columns
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
  statsCard: {
    padding: 20,
    marginHorizontal: dimensions.md,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statBox: {
    width: '45%', // Adjust as needed for 2 columns
    alignItems: 'center',
    marginVertical: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activityCard: {
    padding: 20,
    marginHorizontal: dimensions.md,
    marginBottom: 24,
  },
  activityText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // COMMENTED OUT: Authentication disabled - remove logout button styles
  // logoutButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: colors.errorLight,
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 12,
  //   marginHorizontal: dimensions.md,
  //   marginBottom: 20,
  // },
  // logoutText: {
  //   marginLeft: 8,
  //   fontSize: 16,
  //   fontWeight: '500',
  //   color: colors.error,
  // },
});
