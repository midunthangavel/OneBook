
import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { theme } from '../../utils/constants/theme';

interface ImprovedCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  style?: ViewStyle | ViewStyle[];
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const ImprovedCard: React.FC<ImprovedCardProps> = ({
  children,
  variant = 'default',
  style,
  padding = 'medium',
}) => {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    padding === 'small' && styles.paddingSmall,
    padding === 'medium' && styles.paddingMedium,
    padding === 'large' && styles.paddingLarge,
    ...(Array.isArray(style) ? style : [style]),
  ].filter(Boolean);

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  elevated: {
    ...theme.shadows.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  paddingSmall: {
    padding: theme.spacing.sm,
  },
  paddingMedium: {
    padding: theme.spacing.md,
  },
  paddingLarge: {
    padding: theme.spacing.lg,
  },
});

export default ImprovedCard;
