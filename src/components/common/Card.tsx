import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useApp } from '../../contexts/AppContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
}) => {
  const { state } = useApp();
  const { theme } = state;

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.surface,
      },
      elevated: {
        backgroundColor: theme.colors.surface,
        shadowColor: theme.colors.text,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      outlined: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
    };

    const paddingStyles = {
      none: {},
      small: {
        padding: theme.spacing.sm,
      },
      medium: {
        padding: theme.spacing.md,
      },
      large: {
        padding: theme.spacing.lg,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...paddingStyles[padding],
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});

export default Card; 