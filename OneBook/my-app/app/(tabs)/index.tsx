import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { QUICK_ACTIONS } from '@/utils/constants';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'calendar':
        router.push('/calendar');
        break;
      case 'notifications':
        router.push('/notifications');
        break;
      case 'search':
        router.push('/explore');
        break;
      case 'bookings':
        // Navigate to bookings section in profile
        router.push('/profile');
        break;
      default:
        console.log(`Action ${actionId} pressed`);
    }
  };

  const renderQuickAction = (action: any) => (
    <Card
      key={action.id}
      style={styles.quickActionCard}
      onPress={() => handleQuickAction(action.id)}
    >
      <ThemedView style={styles.quickActionContent}>
        <ThemedView style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
          <IconSymbol size={24} name={action.icon} color={action.color} />
        </ThemedView>
        <ThemedText style={styles.quickActionTitle}>{action.title}</ThemedText>
      </ThemedView>
    </Card>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={Colors[colorScheme ?? 'light'].background}
      headerMinHeight={100}
      headerMaxHeight={200}
      extraScrollHeight={20}
      navbarColor={Colors[colorScheme ?? 'light'].background}
      title="OneBook"
      titleStyle={{
        color: Colors[colorScheme ?? 'light'].text,
      }}
      backgroundImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={{ width: 300, height: 300, bottom: -20, opacity: 0.1 }}
          contentFit="cover"
          transition={1000}
        />
      }
      backgroundImageScale={1.2}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.welcomeSection}>
          <HelloWave />
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome to OneBook
          </ThemedText>
          <ThemedText style={styles.welcomeSubtitle}>
            Your ultimate booking platform for venues and events
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.quickActionsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Quick Actions
          </ThemedText>
          <ThemedView style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map(renderQuickAction)}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.featuredSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Featured Venues
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ThemedView style={styles.featuredList}>
              {[1, 2, 3].map((item) => (
                <Card key={item} style={styles.featuredCard}>
                  <ThemedView style={styles.featuredImage}>
                    <IconSymbol size={32} name="building.2" color={Colors[colorScheme ?? 'light'].tint} />
                  </ThemedView>
                  <ThemedText style={styles.featuredTitle}>Venue {item}</ThemedText>
                  <ThemedText style={styles.featuredSubtitle}>Premium Location</ThemedText>
                  <Button
                    title="Book Now"
                    onPress={() => console.log(`Book venue ${item}`)}
                    size="small"
                    style={styles.bookButton}
                  />
                </Card>
              ))}
            </ThemedView>
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.statsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Your Stats
          </ThemedText>
          <ThemedView style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <IconSymbol size={24} name="calendar.badge.clock" color="#2196F3" />
              <ThemedText style={styles.statNumber}>5</ThemedText>
              <ThemedText style={styles.statLabel}>Active Bookings</ThemedText>
            </Card>
            <Card style={styles.statCard}>
              <IconSymbol size={24} name="heart.fill" color="#E91E63" />
              <ThemedText style={styles.statNumber}>12</ThemedText>
              <ThemedText style={styles.statLabel}>Favorites</ThemedText>
            </Card>
            <Card style={styles.statCard}>
              <IconSymbol size={24} name="star.fill" color="#FF9800" />
              <ThemedText style={styles.statNumber}>4.8</ThemedText>
              <ThemedText style={styles.statLabel}>Rating</ThemedText>
            </Card>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    marginBottom: 12,
    padding: 16,
  },
  quickActionContent: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuredSection: {
    marginBottom: 30,
  },
  featuredList: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  featuredCard: {
    width: 160,
    marginRight: 12,
    padding: 16,
    alignItems: 'center',
  },
  featuredImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featuredSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
    textAlign: 'center',
  },
  bookButton: {
    width: '100%',
  },
  statsSection: {
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
});
