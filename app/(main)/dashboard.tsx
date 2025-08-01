
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import ImprovedCard from '../../src/components/common/ImprovedCard';
import VenueCard from '../../src/components/common/VenueCard';
import Typography from '../../src/components/common/Typography';
import { Heading1, Heading2, BodyText, BodySmall } from '../../src/components/common/Typography';
import { useTheme } from '../../src/contexts/ThemeContext';

interface WeddingServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  count: number;
}

interface UserStats {
  totalBookings: number;
  upcomingEvents: number;
  favoriteVenues: number;
  budgetUsed: string;
}

export default function DashboardScreen() {
  const { currentTheme, toggleTheme, isDarkMode } = useTheme();
  const [stats, setStats] = useState<UserStats>({
    totalBookings: 3,
    upcomingEvents: 1,
    favoriteVenues: 8,
    budgetUsed: '₹1,50,000',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('Sarah'); // Demo user name

  const weddingServices: WeddingServiceCategory[] = [
    {
      id: 'venues',
      title: 'Wedding Venues',
      subtitle: 'Churches, Halls, Gardens',
      icon: 'business',
      route: '/(main)/search',
      color: currentTheme.colors.primary,
      count: 150,
    },
    {
      id: 'decorations',
      title: 'Decorations',
      subtitle: 'Floral, Stage, Lighting',
      icon: 'flower',
      route: '/(main)/search',
      color: '#FF6B6B',
      count: 89,
    },
    {
      id: 'catering',
      title: 'Catering',
      subtitle: 'Veg, Non-veg, Buffet',
      icon: 'restaurant',
      route: '/(main)/search',
      color: '#4ECDC4',
      count: 67,
    },
    {
      id: 'photography',
      title: 'Photography',
      subtitle: 'Wedding & Pre-wedding',
      icon: 'camera',
      route: '/(main)/search',
      color: '#45B7D1',
      count: 43,
    },
    {
      id: 'music',
      title: 'Music & DJ',
      subtitle: 'Live Bands, DJs',
      icon: 'musical-notes',
      route: '/(main)/search',
      color: '#96CEB4',
      count: 32,
    },
    {
      id: 'transport',
      title: 'Transportation',
      subtitle: 'Car Rentals, Decor Cars',
      icon: 'car-sport',
      route: '/(main)/search',
      color: '#FFEAA7',
      count: 28,
    },
  ];

  const featuredVenues = [
    {
      id: '1',
      name: 'Royal Gardens Resort',
      category: 'Wedding Venue',
      rating: 4.9,
      price: '₹25,000/day',
      location: 'Goa',
      capacity: 300,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
    },
    {
      id: '2',
      name: 'Sunset Beach Club',
      category: 'Beach Venue',
      rating: 4.7,
      price: '₹18,000/day',
      location: 'Mumbai',
      capacity: 150,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
    },
    {
      id: '3',
      name: 'Heritage Palace',
      category: 'Traditional Venue',
      rating: 4.8,
      price: '₹35,000/day',
      location: 'Rajasthan',
      capacity: 500,
      image: 'https://images.unsplash.com/photo-1582719366582-1dc7625c8174?w=400',
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCategoryPress = (category: WeddingServiceCategory) => {
    // Navigate to search with category filter
    router.push({
      pathname: '/(main)/search',
      params: { category: category.id }
    });
  };

  const handleEmergencySupport = () => {
    Alert.alert(
      "24/7 Wedding Support",
      "Need immediate assistance with your wedding planning? Call our support team at +91-9876543210",
      [
        { text: "Call Now", onPress: () => console.log("Calling support") },
        { text: "WhatsApp", onPress: () => console.log("Opening WhatsApp") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.backgroundSecondary }]}>
      <ScrollView
        style={[styles.scrollView, { backgroundColor: currentTheme.colors.backgroundSecondary }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: currentTheme.colors.background }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.profileButton} 
              onPress={() => router.push('/(main)/profile')}
            >
              <Ionicons name="person-circle" size={32} color={currentTheme.colors.primary} />
            </TouchableOpacity>
            <View>
              <Heading1 color={currentTheme.colors.textPrimary}>Hello, {userName}! 👋</Heading1>
              <BodyText color={currentTheme.colors.textSecondary}>Let's plan your perfect wedding</BodyText>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.themeToggleButton, { backgroundColor: currentTheme.colors.surface }]} 
              onPress={toggleTheme}
            >
              <Ionicons 
                name={isDarkMode ? "sunny" : "moon"} 
                size={20} 
                color={currentTheme.colors.primary} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.supportButton, { backgroundColor: currentTheme.colors.success }]} onPress={handleEmergencySupport}>
              <Ionicons name="headset" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={currentTheme.colors.textPrimary} />
              <View style={[styles.notificationBadge, { backgroundColor: currentTheme.colors.error }]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Wedding Planning Progress */}
        <ImprovedCard variant="elevated" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Heading2>Wedding Planning Progress</Heading2>
            <BodySmall color={theme.colors.success}>75% Complete</BodySmall>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <BodySmall color={theme.colors.textSecondary} style={styles.progressText}>
            Great progress! You're almost ready for your big day.
          </BodySmall>
        </ImprovedCard>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <ImprovedCard variant="elevated" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                </View>
                <BodySmall color={theme.colors.textSecondary}>Total Bookings</BodySmall>
                <Heading2>{stats.totalBookings}</Heading2>
              </View>
            </ImprovedCard>

            <ImprovedCard variant="elevated" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: theme.colors.success + '20' }]}>
                  <Ionicons name="time" size={20} color={theme.colors.success} />
                </View>
                <BodySmall color={theme.colors.textSecondary}>Upcoming</BodySmall>
                <Heading2>{stats.upcomingEvents}</Heading2>
              </View>
            </ImprovedCard>
          </View>

          <View style={styles.statsRow}>
            <ImprovedCard variant="elevated" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: theme.colors.error + '20' }]}>
                  <Ionicons name="heart" size={20} color={theme.colors.error} />
                </View>
                <BodySmall color={theme.colors.textSecondary}>Favorites</BodySmall>
                <Heading2>{stats.favoriteVenues}</Heading2>
              </View>
            </ImprovedCard>

            <ImprovedCard variant="elevated" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: '#FF6B6B20' }]}>
                  <Ionicons name="wallet" size={20} color="#FF6B6B" />
                </View>
                <BodySmall color={theme.colors.textSecondary}>Budget Used</BodySmall>
                <BodyText style={styles.budgetText}>{stats.budgetUsed}</BodyText>
              </View>
            </ImprovedCard>
          </View>
        </View>

        {/* Wedding Services Categories */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Wedding Services</Heading2>
          <View style={styles.categoriesGrid}>
            {weddingServices.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <LinearGradient
                  colors={[category.color, category.color + 'DD']}
                  style={styles.categoryIcon}
                >
                  <Ionicons name={category.icon} size={24} color="#fff" />
                </LinearGradient>
                <BodyText style={styles.categoryTitle}>{category.title}</BodyText>
                <BodySmall color={theme.colors.textTertiary}>{category.subtitle}</BodySmall>
                <BodySmall color={category.color} style={styles.categoryCount}>
                  {category.count} options
                </BodySmall>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Venues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heading2>Featured Venues</Heading2>
            <TouchableOpacity onPress={() => router.push('/(main)/search')}>
              <BodyText color={theme.colors.primary}>View All</BodyText>
            </TouchableOpacity>
          </View>
          <View style={styles.venuesContainer}>
            {featuredVenues.map((venue) => (
              <View key={venue.id} style={styles.venueCardContainer}>
                <VenueCard {...venue} />
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Heading2 style={styles.sectionTitle}>Quick Actions</Heading2>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/(main)/bookings')}
            >
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <BodyText style={styles.quickActionText}>My Bookings</BodyText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: theme.colors.success }]}
              onPress={() => router.push('/(main)/favorites')}
            >
              <Ionicons name="heart-outline" size={20} color="#fff" />
              <BodyText style={styles.quickActionText}>Favorites</BodyText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeToggleButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  supportButton: {
    backgroundColor: theme.colors.success,
    padding: theme.spacing.sm,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: theme.spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  progressCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  budgetText: {
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  categoryCard: {
    width: '47%',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  categoryTitle: {
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  categoryCount: {
    fontWeight: '500',
    marginTop: 4,
  },
  venuesContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  venueCardContainer: {
    marginBottom: theme.spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  quickActionText: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomPadding: {
    height: theme.spacing.xl,
  },
});
