import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  padding?: number;
  margin?: number;
  borderRadius?: number;
}

export function Card({ 
  children, 
  style, 
  onPress, 
  disabled = false,
  padding = 16,
  margin = 0,
  borderRadius = 12,
}: CardProps) {
  const colorScheme = useColorScheme();
  
  const cardStyle: ViewStyle = {
    padding,
    margin,
    borderRadius,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView style={[cardStyle, style]}>
      {children}
    </ThemedView>
  );
} 