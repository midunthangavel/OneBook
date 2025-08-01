import { Theme } from '../../contexts/ThemeContext';

export const getColors = (theme: Theme) => ({
  // Primary colors
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',

  // Secondary colors
  secondary: '#FF6B35',
  secondaryLight: '#FF8A65',
  secondaryDark: '#E64A19',

  // Background colors
  background: theme === 'dark' ? '#121212' : '#FFFFFF',
  backgroundSecondary: theme === 'dark' ? '#1E1E1E' : '#F5F5F5',
  surface: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',

  // Text colors
  text: theme === 'dark' ? '#FFFFFF' : '#212121',
  textSecondary: theme === 'dark' ? '#B0B0B0' : '#757575',
  textLight: theme === 'dark' ? '#808080' : '#BDBDBD',

  // State colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Border colors
  border: theme === 'dark' ? '#333333' : '#E0E0E0',
  borderLight: theme === 'dark' ? '#404040' : '#F0F0F0',

  // Category colors for services
  venues: '#2E7D32',
  catering: '#FF6B35',
  decoration: '#9C27B0',
  photography: '#FF5722',
  music: '#3F51B5',
  transport: '#607D8B',

  // Additional UI colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
});

// Default colors for backward compatibility
export const colors = getColors('light');

export default colors;