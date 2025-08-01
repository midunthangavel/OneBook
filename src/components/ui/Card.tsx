import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { dimensions } from '../../utils/constants/dimensions';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  margin = 'none',
  style,
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    styles[`margin${margin.charAt(0).toUpperCase() + margin.slice(1)}`],
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.card,
    borderRadius: dimensions.borderRadius.md,
  },
  
  // Variants
  default: {
    ...dimensions.shadow.sm,
  },
  elevated: {
    ...dimensions.shadow.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: dimensions.sm,
  },
  paddingMedium: {
    padding: dimensions.md,
  },
  paddingLarge: {
    padding: dimensions.lg,
  },
  
  // Margin
  marginNone: {
    margin: 0,
  },
  marginSmall: {
    margin: dimensions.sm,
  },
  marginMedium: {
    margin: dimensions.md,
  },
  marginLarge: {
    margin: dimensions.lg,
  },
}); 