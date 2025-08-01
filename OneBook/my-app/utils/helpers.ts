import { TimeSlot, Notification } from '@/types';
import { STATUS_COLORS } from './constants';

// Date and Time Helpers
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getCurrentTime = (): string => {
  return formatTime(new Date());
};

export const getCurrentDate = (): string => {
  return formatDate(new Date());
};

// Status Helpers
export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#9E9E9E';
};

export const getStatusText = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Notification Helpers
export const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'booking':
      return 'calendar.badge.checkmark';
    case 'reminder':
      return 'clock.fill';
    case 'promotion':
      return 'tag.fill';
    case 'system':
      return 'gear';
    default:
      return 'bell.fill';
  }
};

export const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'booking':
      return '#4CAF50';
    case 'reminder':
      return '#FF9800';
    case 'promotion':
      return '#E91E63';
    case 'system':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
};

export const formatNotificationTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return timestamp.toLocaleDateString();
};

// Array Helpers
export const filterNotifications = (notifications: Notification[], filter: string): Notification[] => {
  if (filter === 'all') return notifications;
  return notifications.filter(notification => notification.type === filter);
};

export const sortNotificationsByTime = (notifications: Notification[]): Notification[] => {
  return [...notifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(notification => !notification.isRead).length;
};

// Validation Helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// String Helpers
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Number Helpers
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Color Helpers
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}; 