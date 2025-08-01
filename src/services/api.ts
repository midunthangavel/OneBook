import { databaseService } from './supabaseService';

export const apiService = {
  getVenues: async () => {
    const { data, error } = await databaseService.getVenues();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },

  getBookings: async (userId: string) => {
    const { data, error } = await databaseService.getBookings(userId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },

  getFavorites: async (userId: string) => {
    const { data, error } = await databaseService.getFavorites(userId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }
};