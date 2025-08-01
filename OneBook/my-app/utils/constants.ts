import { QuickAction, ProfileSection, TimeSlot, Notification } from '@/types';

// App Configuration
export const APP_CONFIG = {
  name: 'OneBook',
  version: '1.0.0',
  description: 'Your ultimate booking platform',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  base: 'https://api.onebook.com',
  venues: '/venues',
  bookings: '/bookings',
  notifications: '/notifications',
  profile: '/profile',
} as const;

// Navigation Routes
export const ROUTES = {
  home: '/',
  calendar: '/calendar',
  notifications: '/notifications',
  profile: '/profile',
  explore: '/explore',
  venueDetails: '/venue/[id]',
  booking: '/booking/[id]',
} as const;

// Status Colors
export const STATUS_COLORS = {
  completed: '#4CAF50',
  upcoming: '#2196F3',
  cancelled: '#F44336',
  pending: '#FF9800',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  booking: 'booking',
  reminder: 'reminder',
  promotion: 'promotion',
  system: 'system',
} as const;

// Sample Data
export const SAMPLE_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM', event: 'Team Meeting', status: 'upcoming' },
  { id: '2', time: '11:30 AM', event: 'Lunch Break', status: 'completed' },
  { id: '3', time: '02:00 PM', event: 'Client Call', status: 'upcoming' },
  { id: '4', time: '04:30 PM', event: 'Review Session', status: 'upcoming' },
  { id: '5', time: '06:00 PM', event: 'Workout', status: 'upcoming' },
];

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking for "The Grand Hotel" has been confirmed for tomorrow at 2:00 PM.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Upcoming Booking',
    message: 'Reminder: You have a booking at "Sky Restaurant" in 2 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: true,
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on your next booking at premium venues!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'App Update',
    message: 'New features available! Update your app for the best experience.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
  },
];

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    id: 'bookings',
    title: 'My Bookings',
    icon: 'calendar.badge.clock',
    color: '#2196F3',
    count: 5,
    description: 'View and manage your upcoming bookings',
  },
  {
    id: 'favorites',
    title: 'Favorites',
    icon: 'heart.fill',
    color: '#E91E63',
    count: 12,
    description: 'Your saved venues and preferences',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'chart.bar.fill',
    color: '#4CAF50',
    count: 3,
    description: 'Analytics and booking insights',
  },
];

// Quick Actions for Home Screen
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'calendar',
    title: 'Calendar',
    icon: 'calendar',
    color: '#2196F3',
    onPress: () => console.log('Navigate to Calendar'),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'bell.fill',
    color: '#FF9800',
    onPress: () => console.log('Navigate to Notifications'),
  },
  {
    id: 'search',
    title: 'Search',
    icon: 'magnifyingglass',
    color: '#4CAF50',
    onPress: () => console.log('Navigate to Search'),
  },
  {
    id: 'bookings',
    title: 'My Bookings',
    icon: 'calendar.badge.clock',
    color: '#E91E63',
    onPress: () => console.log('Navigate to Bookings'),
  },
]; 