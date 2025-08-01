import { StatusType, FilterParams, PaginationParams } from './common';

export interface Booking {
  id: string;
  userId: string;
  venueId: string;
  vendorId?: string;
  
  // Booking Details
  eventDate: string;
  eventTime?: string;
  eventType: EventType;
  guestCount?: number;
  
  // Status
  status: BookingStatus;
  
  // Requirements
  specialRequirements?: string;
  dietaryPreferences?: string;
  decorationPreferences?: string;
  
  // Pricing
  quotedPrice?: number;
  finalPrice?: number;
  currency: string;
  
  // Communication
  vendorNotified: boolean;
  vendorNotifiedAt?: string;
  userNotified: boolean;
  userNotifiedAt?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
}

export type EventType = 
  | 'wedding' 
  | 'civil_ceremony' 
  | 'engagement' 
  | 'reception' 
  | 'other';

export type BookingStatus = StatusType;

export interface CreateBookingData {
  venueId: string;
  vendorId?: string;
  eventDate: string;
  eventTime?: string;
  eventType: EventType;
  guestCount?: number;
  specialRequirements?: string;
  dietaryPreferences?: string;
  decorationPreferences?: string;
}

export interface UpdateBookingData {
  eventDate?: string;
  eventTime?: string;
  guestCount?: number;
  specialRequirements?: string;
  dietaryPreferences?: string;
  decorationPreferences?: string;
}

export interface BookingFilters extends FilterParams {
  status?: BookingStatus;
  eventType?: EventType;
  dateFrom?: string;
  dateTo?: string;
  venueId?: string;
  vendorId?: string;
}

export interface BookingSearchParams extends PaginationParams {
  filters?: BookingFilters;
}

export interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  filters: BookingFilters;
  searchParams: BookingSearchParams;
  totalCount: number;
  currentPage: number;
}

export type BookingAction = 
  | { type: 'BOOKINGS_LOADING' }
  | { type: 'BOOKINGS_SUCCESS'; payload: { bookings: Booking[]; totalCount: number } }
  | { type: 'BOOKINGS_FAILURE'; payload: string }
  | { type: 'CREATE_BOOKING_SUCCESS'; payload: Booking }
  | { type: 'UPDATE_BOOKING_SUCCESS'; payload: Booking }
  | { type: 'SELECT_BOOKING'; payload: Booking }
  | { type: 'CLEAR_SELECTED_BOOKING' }
  | { type: 'UPDATE_FILTERS'; payload: BookingFilters }
  | { type: 'UPDATE_SEARCH_PARAMS'; payload: BookingSearchParams }
  | { type: 'CLEAR_ERROR' }; 