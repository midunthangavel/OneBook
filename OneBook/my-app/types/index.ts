// Common types used throughout the app
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'reminder' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  event: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  description?: string;
}

export interface ProfileSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  count: number;
  description: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  category: string;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  date: Date;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
} 