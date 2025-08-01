import env from '../config/env';

export const endpoints = {
  // Base URLs
  baseUrl: env.API_URL,
  supabaseUrl: env.SUPABASE_URL,
  supabaseAnonKey: env.SUPABASE_ANON_KEY,
  
  // Authentication
  auth: {
    signup: '/auth/signup',
    login: '/auth/login',
    verifyOtp: '/auth/verify-otp',
    forgotPassword: '/auth/forgot-password',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',
  },
  
  // Users
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    uploadAvatar: '/users/avatar',
  },
  
  // Venues
  venues: {
    list: '/venues',
    details: (id: string) => `/venues/${id}`,
    search: '/venues/search',
    availability: (id: string) => `/venues/${id}/availability`,
    reviews: (id: string) => `/venues/${id}/reviews`,
    categories: '/venues/categories',
  },
  
  // Vendors
  vendors: {
    list: '/vendors',
    details: (id: string) => `/vendors/${id}`,
    byCategory: (category: string) => `/vendors/category/${category}`,
    services: '/vendors/services',
  },
  
  // Bookings
  bookings: {
    create: '/bookings',
    list: '/bookings',
    details: (id: string) => `/bookings/${id}`,
    update: (id: string) => `/bookings/${id}`,
    cancel: (id: string) => `/bookings/${id}/cancel`,
    status: (id: string) => `/bookings/${id}/status`,
  },
  
  // Reviews
  reviews: {
    create: '/reviews',
    list: (venueId: string) => `/reviews/venue/${venueId}`,
    update: (id: string) => `/reviews/${id}`,
    delete: (id: string) => `/reviews/${id}`,
  },
  
  // Favorites
  favorites: {
    list: '/favorites',
    add: '/favorites',
    remove: (id: string) => `/favorites/${id}`,
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
  },
  
  // Admin
  admin: {
    venues: '/admin/venues',
    bookings: '/admin/bookings',
    users: '/admin/users',
    analytics: '/admin/analytics',
    dashboard: '/admin/dashboard',
  },
  
  // External APIs
  external: {
    googleMaps: 'https://maps.googleapis.com/maps/api',
    geocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
    places: 'https://maps.googleapis.com/maps/api/place',
    whatsapp: 'https://api.whatsapp.com/send',
  },
} as const;

export type EndpointKey = keyof typeof endpoints; 