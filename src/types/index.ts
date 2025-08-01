// Base types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  email_verified?: boolean;
}

export interface UserProfile extends BaseEntity {
  id: string; // References auth.users(id)
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}

// Auth types
export interface AuthResponse {
  user: User | null;
  token?: string;
  refreshToken?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export interface OtpVerification {
  phone: string;
  otp: string;
}

export interface ProfileUpdateData {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}

// Venue types
export interface Venue extends BaseEntity {
  name: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  price_range?: string;
  rating: number;
  images?: string[];
  amenities?: string[];
  capacity?: number;
  contact_info?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface VenueFilters {
  category?: string;
  price_range?: string;
  rating?: number;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  date?: string;
  guest_count?: number;
}

// Booking types
export interface Booking extends BaseEntity {
  user_id: string;
  venue_id: string;
  booking_date: string;
  booking_time: string;
  guest_count: number;
  status: BookingStatus;
  total_amount: number;
  special_requests?: string;
  venue?: Venue;
  user?: User;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Review types
export interface Review extends BaseEntity {
  user_id: string;
  venue_id: string;
  rating: number;
  comment?: string;
  user?: User;
  venue?: Venue;
}

// Favorite types
export interface Favorite extends BaseEntity {
  user_id: string;
  venue_id: string;
  venue?: Venue;
}

// Notification types
export interface Notification extends BaseEntity {
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  data?: Record<string, any>;
}

export type NotificationType = 'booking' | 'reminder' | 'promotion' | 'system';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'time';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  VenueDetails: { venueId: string };
  Booking: { venueId: string };
  Bookings: undefined;
  Favorites: undefined;
  Settings: undefined;
  Search: undefined;
};

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    h1: {
      fontSize: number;
      fontWeight: string;
    };
    h2: {
      fontSize: number;
      fontWeight: string;
    };
    h3: {
      fontSize: number;
      fontWeight: string;
    };
    body: {
      fontSize: number;
      fontWeight: string;
    };
    caption: {
      fontSize: number;
      fontWeight: string;
    };
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: AppError | null;
}

// Filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  priceRange?: string;
  rating?: number;
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  date?: string;
  guestCount?: number;
}

// Export all types
export * from './auth';
export * from './booking';
export * from './common';
export * from './venue'; 
export interface User {
  id: string;
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: Address;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  district: string;
  state: string;
  pincode: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  category: VenueCategory;
  venueType: VenueType;
  location: Address;
  capacity: number;
  priceRange: string;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  venueId: string;
  vendorId?: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  specialRequests?: string;
  status: BookingStatus;
  totalAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export type VenueCategory = 'wedding' | 'corporate' | 'birthday' | 'anniversary' | 'engagement' | 'other';
export type VenueType = 'banquet_hall' | 'outdoor_venue' | 'hotel' | 'restaurant' | 'resort' | 'farm_house' | 'community_center';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
