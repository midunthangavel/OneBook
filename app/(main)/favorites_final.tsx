import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Card } from '../../src/components/ui/Card';
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';

export default function FavoritesScreen() {
  const favorites = [
    {
      id: 1,
      name: 'Royal Palace Hall',
      location: 'Mumbai, Maharashtra',
      price: '₹75,000',
      rating: 4.8,
      image: '🏛️'
    },
    {
      id: 2,
      name: 'Garden View Resort',
      location: 'Pune, Maharashtra',
      price: '₹1,20,000',
      rating: 4.9,
      image: '🌸'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => router.push('/(main)/search')}
        >
          <Ionicons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Browse venues and tap the heart icon to save your favorites
            </Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/(main)/search')}
            >
              <Text style={styles.browseButtonText}>Browse Venues</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.favoritesList}>
            {favorites.map((favorite) => (
              <Card key={favorite.id} style={styles.favoriteCard}>
                <View style={styles.favoriteHeader}>
                  <Text style={styles.favoriteIcon}>{favorite.image}</Text>
                  <View style={styles.favoriteInfo}>
                    <Text style={styles.favoriteName}>{favorite.name}</Text>
                    <Text style={styles.favoriteLocation}>{favorite.location}</Text>
                    <View style={styles.favoriteDetails}>
                      <Text style={styles.favoritePrice}>{favorite.price}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.favoriteRating}>{favorite.rating}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.heartButton}>
                    <Ionicons name="heart" size={24} color={colors.error} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.favoriteActions}>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dimensions.md,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchButton: {
    padding: 4,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.md,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  favoritesList: {
    padding: dimensions.md,
  },
  favoriteCard: {
    padding: 16,
    marginBottom: 16,
  },
  favoriteHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  favoriteIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  favoriteLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  favoriteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  favoriteRating: {
    fontSize: 14,
    color: colors.text,
  },
  heartButton: {
    padding: 4,
  },
  favoriteActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
