export interface Venue {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude?: number;
  longitude?: number;
  category: VenueCategory;
  price_min: number;
  price_max: number;
  rating: number;
  review_count: number;
  images: string[];
  amenities: string[];
  capacity_min: number;
  capacity_max: number;
  contact_phone: string;
  contact_email: string;
  whatsapp_number?: string;
  availability: AvailabilitySlot[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface VenueFilters {
  category?: VenueCategory;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  capacity?: number;
  date?: string;
}

export interface BookingRequest {
  user_id: string;
  venue_id: string;
  booking_date: string;
  booking_time: string;
  guest_count: number;
  special_requests?: string;
  contact_phone: string;
  contact_email: string;
}

export interface AvailabilitySlot {
  date: string;
  time_slots: TimeSlot[];
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
  price: number;
}

export type VenueCategory = 
  | 'banquet_hall'
  | 'resort'
  | 'hotel'
  | 'beach_resort'
  | 'garden'
  | 'farmhouse'
  | 'palace'
  | 'destination_venue'
  | 'community_hall'
  | 'restaurant';

export interface VenueReview {
  id: string;
  venue_id: string;
  user_id: string;
  rating: number;
  review_text: string;
  images?: string[];
  created_at: string;
  user: {
    name: string;
    avatar?: string;
  };
}