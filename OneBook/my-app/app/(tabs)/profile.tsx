import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PROFILE_SECTIONS } from '@/utils/constants';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  const handleSectionPress = (sectionId: string) => {
    console.log(`Navigating to ${sectionId}`);
  };

  const renderProfileSection = (section: any) => (
    <Card
      key={section.id}
      style={styles.sectionCard}
      onPress={() => handleSectionPress(section.id)}
    >
      <ThemedView style={styles.sectionHeader}>
        <ThemedView style={styles.sectionIconContainer}>
          <IconSymbol 
            size={24} 
            name={section.icon} 
            color={section.color} 
          />
        </ThemedView>
        <ThemedView style={styles.sectionInfo}>
          <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
          <ThemedText style={styles.sectionDescription}>{section.description}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.sectionCount}>
          <Badge text={section.count} variant="primary" size="small" />
          <IconSymbol size={16} name="chevron.right" color={Colors[colorScheme ?? 'light'].text} />
        </ThemedView>
      </ThemedView>
    </Card>
  );

  const renderAccountOption = (icon: string, title: string) => (
    <Card key={title} style={styles.optionCard} onPress={() => console.log(`Navigate to ${title}`)}>
      <IconSymbol size={20} name={icon} color={Colors[colorScheme ?? 'light'].tint} />
      <ThemedText style={styles.optionText}>{title}</ThemedText>
      <IconSymbol size={16} name="chevron.right" color={Colors[colorScheme ?? 'light'].text} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Profile</ThemedText>
          <TouchableOpacity style={styles.settingsButton}>
            <IconSymbol size={24} name="gearshape.fill" color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </ThemedView>

        <Card style={styles.profileSection}>
          <ThemedView style={styles.avatarContainer}>
            <IconSymbol size={48} name="person.circle.fill" color={Colors[colorScheme ?? 'light'].tint} />
          </ThemedView>
          <ThemedText type="subtitle" style={styles.userName}>John Doe</ThemedText>
          <ThemedText style={styles.userEmail}>john.doe@example.com</ThemedText>
        </Card>

        <ThemedView style={styles.sectionsContainer}>
          <ThemedText type="subtitle" style={styles.sectionsTitle}>Quick Access</ThemedText>
          
          {PROFILE_SECTIONS.map(renderProfileSection)}
        </ThemedView>

        <ThemedView style={styles.additionalOptions}>
          <ThemedText type="subtitle" style={styles.sectionsTitle}>Account</ThemedText>
          
          {renderAccountOption('person.fill', 'Edit Profile')}
          {renderAccountOption('creditcard.fill', 'Payment Methods')}
          {renderAccountOption('bell.fill', 'Notification Settings')}
          {renderAccountOption('questionmark.circle.fill', 'Help & Support')}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
    borderRadius: 15,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  sectionsContainer: {
    marginBottom: 30,
  },
  sectionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  sectionCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  additionalOptions: {
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 8,
    borderRadius: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
}); 