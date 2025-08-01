import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/utils/constants/theme';
import { Heading2, BodyText, BodySmall } from '../../src/components/common/Typography';
import VenueCard from '../../src/components/common/VenueCard';

export default function FavoritesScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockFavorites = [
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
      name: 'Grand Ballroom',
      category: 'Banquet Hall',
      rating: 4.5,
      price: '₹15,000/day',
      location: 'Delhi',
      capacity: 200,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Heading2>Favorites</Heading2>
          <BodySmall color={theme.colors.textSecondary}>
            {mockFavorites.length} saved venues
          </BodySmall>
        </View>
        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
        >
          <Ionicons
            name={viewMode === 'grid' ? 'list' : 'grid'}
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {mockFavorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color={theme.colors.textTertiary} />
          <BodyText color={theme.colors.textSecondary} style={styles.emptyText}>
            No favorites yet
          </BodyText>
          <BodySmall color={theme.colors.textTertiary} style={styles.emptySubtext}>
            Start adding venues to your favorites by tapping the heart icon
          </BodySmall>
          <TouchableOpacity style={styles.exploreButton}>
            <BodyText color={theme.colors.primary}>Explore Venues</BodyText>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.favoritesContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.favoritesGrid}>
            {mockFavorites.map((venue, index) => (
              <View key={venue.id} style={styles.favoriteItem}>
                <VenueCard
                  {...venue}
                  isFavorite={true}
                  onFavoritePress={() => {
                    // Handle remove from favorites
                    console.log('Remove from favorites:', venue.id);
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
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
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  viewModeButton: {
    padding: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  exploreButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
  },
  favoritesContainer: {
    flex: 1,
  },
  favoritesGrid: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  favoriteItem: {
    marginBottom: theme.spacing.sm,
  },
});