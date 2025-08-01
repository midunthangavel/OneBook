import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private static instance: StorageService;
  private storage: typeof AsyncStorage;

  constructor() {
    this.storage = AsyncStorage;
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Set item
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.storage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Get item
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.storage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }

  // Remove item
  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }

  // Clear all data
  async clear(): Promise<void> {
    try {
      await this.storage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  // Get all keys
  async getAllKeys(): Promise<string[]> {
    try {
      return await this.storage.getAllKeys();
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  // Multi get
  async multiGet(keys: string[]): Promise<[string, any][]> {
    try {
      const pairs = await this.storage.multiGet(keys);
      return pairs.map(([key, value]) => [key, value ? JSON.parse(value) : null]);
    } catch (error) {
      console.error('Error multi getting data:', error);
      return [];
    }
  }

  // Multi set
  async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const pairs = keyValuePairs.map(([key, value]) => [key, JSON.stringify(value)]);
      await this.storage.multiSet(pairs);
    } catch (error) {
      console.error('Error multi setting data:', error);
    }
  }

  // Auth specific methods
  async setAuthToken(token: string): Promise<void> {
    await this.setItem('auth_token', token);
  }

  async getAuthToken(): Promise<string | null> {
    return await this.getItem<string>('auth_token');
  }

  async setRefreshToken(token: string): Promise<void> {
    await this.setItem('refresh_token', token);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.getItem<string>('refresh_token');
  }

  async setUser(user: any): Promise<void> {
    await this.setItem('user', user);
  }

  async getUser(): Promise<any | null> {
    return await this.getItem('user');
  }

  async clearAuth(): Promise<void> {
    await this.multiRemove(['auth_token', 'refresh_token', 'user']);
  }

  // Multi remove
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await this.storage.multiRemove(keys);
    } catch (error) {
      console.error('Error multi removing data:', error);
    }
  }
}

export const storageService = StorageService.getInstance(); 