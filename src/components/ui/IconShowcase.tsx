
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, AppIcons, IconLibrary } from './Icon';
import { colors } from '../../utils/constants/colors';

interface IconDemoProps {
  iconKey: string;
  icon: { library: IconLibrary; name: string };
}

const IconDemo: React.FC<IconDemoProps> = ({ iconKey, icon }) => (
  <TouchableOpacity style={styles.iconContainer}>
    <Icon 
      library={icon.library} 
      name={icon.name} 
      size={32} 
      color={colors.primary} 
    />
    <Text style={styles.iconLabel}>{iconKey}</Text>
    <Text style={styles.iconLibrary}>{icon.library}</Text>
  </TouchableOpacity>
);

export const IconShowcase: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Icons</Text>
      <View style={styles.iconsGrid}>
        {Object.entries(AppIcons).map(([key, icon]) => (
          <IconDemo key={key} iconKey={key} icon={icon} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  iconLibrary: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
