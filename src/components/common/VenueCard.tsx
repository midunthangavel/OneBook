
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../utils/constants/theme';
import { BodyText, BodySmall, Heading3 } from './Typography';
import ImprovedCard from './ImprovedCard';

interface VenueCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: string;
  location: string;
  capacity: number;
  image: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const VenueCard: React.FC<VenueCardProps> = ({
  name,
  category,
  rating,
  price,
  location,
  capacity,
  image,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImprovedCard variant="elevated" style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? theme.colors.error : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Heading3 numberOfLines={1} style={styles.title}>
            {name}
          </Heading3>
          
          <BodySmall color={theme.colors.textSecondary} style={styles.category}>
            {category}
          </BodySmall>
          
          <View style={styles.details}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={theme.colors.warning} />
              <BodySmall style={styles.ratingText}>{rating}</BodySmall>
            </View>
            
            <View style={styles.info}>
              <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
              <BodySmall color={theme.colors.textSecondary}>{location}</BodySmall>
            </View>
          </View>
          
          <View style={styles.footer}>
            <BodyText weight="600" color={theme.colors.primary}>
              {price}
            </BodyText>
            <BodySmall color={theme.colors.textSecondary}>
              Up to {capacity} guests
            </BodySmall>
          </View>
        </View>
      </ImprovedCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: theme.spacing.xs,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  category: {
    marginBottom: theme.spacing.sm,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontWeight: '500',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default VenueCard;
