export interface Location {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  district: string;
  state: string;
  pincode: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FilterParams {
  search?: string;
  category?: string;
  location?: Location;
  radius?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  date?: string;
  rating?: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AppState {
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

export type StatusType = 'pending' | 'confirmed' | 'declined' | 'cancelled' | 'completed';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  data?: Record<string, any>;
} 