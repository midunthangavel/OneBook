import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();

  const venues = [
    {
      id: '1',
      name: 'The Grand Hotel',
      category: 'Hotel',
      rating: 4.8,
      price: '$150/night',
      image: '🏨',
      description: 'Luxury hotel in the heart of the city',
    },
    {
      id: '2',
      name: 'Sky Restaurant',
      category: 'Restaurant',
      rating: 4.6,
      price: '$80/person',
      image: '🍽️',
      description: 'Fine dining with city views',
    },
    {
      id: '3',
      name: 'Sunset Resort',
      category: 'Resort',
      rating: 4.9,
      price: '$200/night',
      image: '🏖️',
      description: 'Beachfront resort with spa',
    },
    {
      id: '4',
      name: 'Business Center',
      category: 'Conference',
      rating: 4.5,
      price: '$50/hour',
      image: '🏢',
      description: 'Professional meeting spaces',
    },
  ];

  const categories = [
    { name: 'Hotels', icon: '🏨', color: '#2196F3' },
    { name: 'Restaurants', icon: '🍽️', color: '#FF9800' },
    { name: 'Resorts', icon: '🏖️', color: '#4CAF50' },
    { name: 'Conference', icon: '🏢', color: '#9C27B0' },
    { name: 'Events', icon: '🎉', color: '#E91E63' },
    { name: 'Spas', icon: '💆', color: '#00BCD4' },
  ];

  const renderVenue = (venue: any) => (
    <Card key={venue.id} style={styles.venueCard}>
      <ThemedView style={styles.venueHeader}>
        <ThemedText style={styles.venueImage}>{venue.image}</ThemedText>
        <ThemedView style={styles.venueInfo}>
          <ThemedText style={styles.venueName}>{venue.name}</ThemedText>
          <ThemedText style={styles.venueCategory}>{venue.category}</ThemedText>
          <ThemedView style={styles.venueRating}>
            <IconSymbol size={16} name="star.fill" color="#FFD700" />
            <ThemedText style={styles.ratingText}>{venue.rating}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText style={styles.venuePrice}>{venue.price}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.venueDescription}>{venue.description}</ThemedText>
      <Button
        title="Book Now"
        onPress={() => console.log(`Book ${venue.name}`)}
        size="small"
        style={styles.bookButton}
      />
    </Card>
  );

  const renderCategory = (category: any) => (
    <TouchableOpacity key={category.name} style={styles.categoryCard}>
      <ThemedView style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
        <ThemedText style={styles.categoryEmoji}>{category.icon}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Explore</ThemedText>
          <TouchableOpacity style={styles.searchButton}>
            <IconSymbol size={24} name="magnifyingglass" color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.categoriesSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Categories</ThemedText>
          <ThemedView style={styles.categoriesGrid}>
            {categories.map(renderCategory)}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.venuesSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Popular Venues</ThemedText>
          {venues.map(renderVenue)}
        </ThemedView>

        <ThemedView style={styles.featuredSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Deals</ThemedText>
          <Card style={styles.dealCard}>
            <ThemedView style={styles.dealHeader}>
              <IconSymbol size={32} name="gift.fill" color="#E91E63" />
              <ThemedText style={styles.dealTitle}>Special Offer</ThemedText>
            </ThemedView>
            <ThemedText style={styles.dealDescription}>
              Get 20% off on your first booking at any premium venue!
            </ThemedText>
            <Button
              title="Claim Offer"
              onPress={() => console.log('Claim offer')}
              variant="outline"
              size="small"
              style={styles.claimButton}
            />
          </Card>
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
  searchButton: {
    padding: 8,
  },
  categoriesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  venuesSection: {
    marginBottom: 30,
  },
  venueCard: {
    marginBottom: 15,
    padding: 16,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueImage: {
    fontSize: 32,
    marginRight: 12,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  venueCategory: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  venueRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  venuePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  venueDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  bookButton: {
    alignSelf: 'flex-end',
  },
  featuredSection: {
    marginBottom: 30,
  },
  dealCard: {
    padding: 20,
    alignItems: 'center',
  },
  dealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  dealDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
  },
  claimButton: {
    minWidth: 120,
  },
});
