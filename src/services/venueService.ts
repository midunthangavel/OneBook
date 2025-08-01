
import { supabase } from './supabaseService';
import { Venue, VenueFilters, BookingRequest } from '../utils/types/venue';

export class VenueService {
  async getVenues(filters?: VenueFilters): Promise<{ data: Venue[] | null; error: any }> {
    let query = supabase
      .from('venues')
      .select('*')
      .order('rating', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.location) {
      query = query.ilike('address', `%${filters.location}%`);
    }

    if (filters?.priceMin && filters?.priceMax) {
      query = query.gte('price_min', filters.priceMin).lte('price_max', filters.priceMax);
    }

    if (filters?.rating) {
      query = query.gte('rating', filters.rating);
    }

    return await query;
  }

  async getVenueById(id: string): Promise<{ data: Venue | null; error: any }> {
    return await supabase
      .from('venues')
      .select('*')
      .eq('id', id)
      .single();
  }

  async getFeaturedVenues(): Promise<{ data: Venue[] | null; error: any }> {
    return await supabase
      .from('venues')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(10);
  }

  async searchVenues(query: string): Promise<{ data: Venue[] | null; error: any }> {
    return await supabase
      .from('venues')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`)
      .order('rating', { ascending: false });
  }

  async createBooking(bookingData: BookingRequest): Promise<{ data: any; error: any }> {
    return await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();
  }

  async getUserBookings(userId: string): Promise<{ data: any[] | null; error: any }> {
    return await supabase
      .from('bookings')
      .select(`
        *,
        venues (
          name,
          address,
          images
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  }

  async addToFavorites(userId: string, venueId: string): Promise<{ data: any; error: any }> {
    return await supabase
      .from('favorites')
      .insert([{ user_id: userId, venue_id: venueId }])
      .select()
      .single();
  }

  async removeFromFavorites(userId: string, venueId: string): Promise<{ error: any }> {
    return await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('venue_id', venueId);
  }

  async getUserFavorites(userId: string): Promise<{ data: any[] | null; error: any }> {
    return await supabase
      .from('favorites')
      .select(`
        *,
        venues (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  }
}

export const venueService = new VenueService();
