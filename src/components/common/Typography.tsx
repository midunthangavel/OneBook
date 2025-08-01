
import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface TypographyProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
}

export const Heading1: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color, 
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textPrimary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.h1,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export const Heading2: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color,
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textPrimary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.h2,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export const Heading3: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color,
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textPrimary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.h3,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export const BodyText: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color,
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textPrimary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.body,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export const BodySmall: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color,
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textSecondary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.bodySmall,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export const Caption: React.FC<TypographyProps> = ({ 
  children, 
  style, 
  color,
  numberOfLines,
  ellipsizeMode,
  onPress 
}) => {
  const { currentTheme } = useTheme();
  const textColor = color || currentTheme.colors.textTertiary;
  
  return (
    <Text 
      style={[
        currentTheme.typography.caption,
        { color: textColor },
        style
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

// Default export for backward compatibility
const Typography: React.FC<TypographyProps> = BodyText;

export default Typography;
