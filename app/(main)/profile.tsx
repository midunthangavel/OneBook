import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { theme } from '../../src/utils/constants/theme';
import { useAuth } from '../../src/contexts/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();

  const menuItems = [
    { 
      id: 'edit-profile', 
      title: 'Personal Information', 
      subtitle: 'Edit your profile details',
      icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.primary
    },
    { 
      id: 'dashboard-refactored', 
      title: 'Dashboard', 
      subtitle: 'View your wedding planning dashboard',
      icon: 'grid-outline' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.primary
    },
    { 
      id: 'bookings-new', 
      title: 'My Bookings', 
      subtitle: 'View and manage your bookings',
      icon: 'calendar-outline' as keyof typeof Ionicons.glyphMap,
      color: theme.colors.secondary
    },
    { 
      id: 'favorites-final', 
      title: 'Favorites', 
      subtitle: 'Your saved venues and vendors',
      icon: 'heart-outline' as keyof typeof Ionicons.glyphMap,
      color: '#E91E63'
    },
    { 
      id: 'payment', 
      title: 'Payment Methods', 
      subtitle: 'Manage your payment options',
      icon: 'card-outline' as keyof typeof Ionicons.glyphMap,
      color: '#4CAF50'
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      subtitle: 'Manage your notification preferences',
      icon: 'notifications-outline' as keyof typeof Ionicons.glyphMap,
      color: '#FF9800'
    },
    { 
      id: 'support', 
      title: 'Help & Support', 
      subtitle: 'Get help and contact support',
      icon: 'help-circle-outline' as keyof typeof Ionicons.glyphMap,
      color: '#2196F3'
    },
    { 
      id: 'settings', 
      title: 'Settings', 
      subtitle: 'App settings and preferences',
      icon: 'settings-outline' as keyof typeof Ionicons.glyphMap,
      color: '#607D8B'
    },
  ];

  const stats = [
    { label: 'Bookings', value: '3', icon: 'calendar' as keyof typeof Ionicons.glyphMap },
    { label: 'Favorites', value: '12', icon: 'heart' as keyof typeof Ionicons.glyphMap },
    { label: 'Reviews', value: '5', icon: 'star' as keyof typeof Ionicons.glyphMap },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.user_metadata?.full_name || 'Demo User'}
              </Text>
              <Text style={styles.userEmail}>
                {user?.email || 'demo@example.com'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Ionicons name={stat.icon} size={20} color={theme.colors.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => {
                // Handle navigation based on item id
                if (item.id === 'dashboard-refactored') {
                  router.push('/(main)/dashboard_refactored');
                } else if (item.id === 'bookings-new') {
                  router.push('/(main)/bookings_new');
                } else if (item.id === 'favorites-final') {
                  router.push('/(main)/favorites_final');
                } else if (item.id === 'bookings') {
                  router.push('/(main)/bookings');
                } else if (item.id === 'favorites') {
                  router.push('/(main)/favorites');
                }
                // Add more navigation cases as needed
              }}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>OneBook v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    ...theme.shadows.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  menuContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  versionText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
});