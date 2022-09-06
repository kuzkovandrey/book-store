import { Observable, switchMap, of, filter, ReplaySubject } from 'rxjs';
import { AppStorage } from './app-storage';
import { StorageKeys } from './storage-keys.enum';

export class AppStorageImpl implements AppStorage {
  private readonly storageTrigger = new ReplaySubject<StorageKeys | null>(1);

  constructor(private storage: Storage) {}

  private trigger(key: StorageKeys | null) {
    this.storageTrigger.next(key);
  }

  set<T>(key: StorageKeys, value: T) {
    this.storage.setItem(key, JSON.stringify(value));

    this.trigger(key);
  }

  get$<T>(key: StorageKeys): Observable<T | null> {
    return this.storageTrigger.pipe(
      filter((triggeredKey) => triggeredKey === key || !triggeredKey),
      switchMap(() => of(this.get<T>(key)))
    );
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

    this.trigger(key);
  }

  clear() {
    this.storage.clear();

    this.trigger(null);
  }
}
