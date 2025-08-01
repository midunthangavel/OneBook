
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import VenueCard from '../../src/components/common/VenueCard';
import ImprovedCard from '../../src/components/common/ImprovedCard';
import { Heading2, BodyText, BodySmall } from '../../src/components/common/Typography';
import { theme } from '../../src/utils/constants/theme';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface SearchResult {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: string;
  location: string;
  capacity?: number;
  image: string;
  featured?: boolean;
}

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(params.category as string || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const categories: FilterOption[] = [
    { id: 'all', label: 'All Services', value: 'all' },
    { id: 'venues', label: 'Wedding Venues', value: 'venues' },
    { id: 'decorations', label: 'Decorations', value: 'decorations' },
    { id: 'catering', label: 'Catering', value: 'catering' },
    { id: 'photography', label: 'Photography', value: 'photography' },
    { id: 'music', label: 'Music & DJ', value: 'music' },
    { id: 'transport', label: 'Transportation', value: 'transport' },
  ];

  const locations: FilterOption[] = [
    { id: 'all', label: 'All Locations', value: 'all' },
    { id: 'mumbai', label: 'Mumbai', value: 'mumbai' },
    { id: 'delhi', label: 'Delhi', value: 'delhi' },
    { id: 'bangalore', label: 'Bangalore', value: 'bangalore' },
    { id: 'pune', label: 'Pune', value: 'pune' },
    { id: 'goa', label: 'Goa', value: 'goa' },
    { id: 'rajasthan', label: 'Rajasthan', value: 'rajasthan' },
  ];

  const priceRanges: FilterOption[] = [
    { id: 'all', label: 'All Prices', value: 'all' },
    { id: 'budget', label: 'Under ₹15,000', value: 'budget' },
    { id: 'mid', label: '₹15,000 - ₹30,000', value: 'mid' },
    { id: 'premium', label: '₹30,000 - ₹50,000', value: 'premium' },
    { id: 'luxury', label: 'Above ₹50,000', value: 'luxury' },
  ];

  // Mock data - replace with actual API calls
  const mockResults: SearchResult[] = [
    {
      id: '1',
      name: 'Royal Gardens Resort',
      category: 'Wedding Venue',
      rating: 4.9,
      price: '₹25,000/day',
      location: 'Goa',
      capacity: 300,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
      featured: true,
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
      name: 'Elite Decorators',
      category: 'Decoration Service',
      rating: 4.8,
      price: '₹15,000/event',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400',
    },
    {
      id: '4',
      name: 'Spice Garden Catering',
      category: 'Catering Service',
      rating: 4.6,
      price: '₹800/person',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    },
    {
      id: '5',
      name: 'Picture Perfect Studios',
      category: 'Photography',
      rating: 4.9,
      price: '₹35,000/day',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
    },
    {
      id: '6',
      name: 'Heritage Palace',
      category: 'Traditional Venue',
      rating: 4.8,
      price: '₹45,000/day',
      location: 'Rajasthan',
      capacity: 500,
      image: 'https://images.unsplash.com/photo-1582719366582-1dc7625c8174?w=400',
      featured: true,
    },
  ];

  useEffect(() => {
    // Simulate search based on filters
    let filteredResults = mockResults;

    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(result => 
        result.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory === 'venues' && result.category.toLowerCase().includes('venue')
      );
    }

    if (selectedLocation !== 'all') {
      filteredResults = filteredResults.filter(result => 
        result.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    if (searchQuery) {
      filteredResults = filteredResults.filter(result =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setSearchResults(filteredResults);
  }, [selectedCategory, selectedLocation, selectedPriceRange, searchQuery]);

  const handleVenuePress = (venue: SearchResult) => {
    // Navigate to venue details
    console.log('Navigate to venue details:', venue.id);
  };

  const renderFilterChip = (
    options: FilterOption[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.filterChip,
            selectedValue === option.value && styles.filterChipActive
          ]}
          onPress={() => onSelect(option.value)}
        >
          <BodySmall
            color={selectedValue === option.value ? '#fff' : theme.colors.textSecondary}
          >
            {option.label}
          </BodySmall>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Heading2>Search Services</Heading2>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <Ionicons 
            name="options" 
            size={24} 
            color={showFilters ? theme.colors.primary : theme.colors.textPrimary} 
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, services, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <ImprovedCard variant="outlined" style={styles.filtersCard}>
          <View style={styles.filterSection}>
            <BodyText style={styles.filterLabel}>Category</BodyText>
            {renderFilterChip(categories, selectedCategory, setSelectedCategory)}
          </View>
          
          <View style={styles.filterSection}>
            <BodyText style={styles.filterLabel}>Location</BodyText>
            {renderFilterChip(locations, selectedLocation, setSelectedLocation)}
          </View>
          
          <View style={styles.filterSection}>
            <BodyText style={styles.filterLabel}>Price Range</BodyText>
            {renderFilterChip(priceRanges, selectedPriceRange, setSelectedPriceRange)}
          </View>
        </ImprovedCard>
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <BodyText>
            {searchResults.length} results found
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </BodyText>
          <TouchableOpacity>
            <BodyText color={theme.colors.primary}>Sort by</BodyText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleVenuePress(item)}
            >
              <VenueCard {...item} />
              {item.featured && (
                <View style={styles.featuredBadge}>
                  <BodySmall color="#fff">Featured</BodySmall>
                </View>
              )}
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  filtersCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterSection: {
    marginBottom: theme.spacing.md,
  },
  filterLabel: {
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  filterRow: {
    marginBottom: theme.spacing.sm,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  resultsList: {
    paddingHorizontal: theme.spacing.lg,
  },
  resultItem: {
    marginBottom: theme.spacing.md,
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
});
