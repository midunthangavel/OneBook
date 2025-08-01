import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BadgeProps {
  text: string | number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export function Badge({
  text,
  variant = 'primary',
  size = 'medium',
  style,
}: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    };

    const sizeStyles = {
      small: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
      medium: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
      large: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    };

    const variantStyles = {
      primary: { backgroundColor: colors.tint },
      secondary: { backgroundColor: colors.background },
      success: { backgroundColor: '#4CAF50' },
      warning: { backgroundColor: '#FF9800' },
      error: { backgroundColor: '#F44336' },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const sizeTextStyles = {
      small: { fontSize: 10 },
      medium: { fontSize: 12 },
      large: { fontSize: 14 },
    };

    const variantTextStyles = {
      primary: { color: '#FFFFFF' },
      secondary: { color: colors.text },
      success: { color: '#FFFFFF' },
      warning: { color: '#FFFFFF' },
      error: { color: '#FFFFFF' },
    };

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <ThemedView style={[getBadgeStyle(), style]}>
      <ThemedText style={getTextStyle()}>
        {text}
      </ThemedText>
    </ThemedView>
  );
} 