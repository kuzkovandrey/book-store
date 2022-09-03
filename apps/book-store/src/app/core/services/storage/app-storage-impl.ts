import { AppStorage } from './app-storage';
import { StorageKeys } from './storage-keys.enum';

export class AppStorageImpl implements AppStorage {
  constructor(private storage: Storage) {}

  set<T>(key: StorageKeys, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: StorageKeys): T | null {
    try {
      const item = this.storage.getItem(key);

      if (!item) return null;

      return JSON.parse(item);
    } catch {
      return null;
    }
  }

  remove(key: StorageKeys) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
