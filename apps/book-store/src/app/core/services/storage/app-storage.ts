import { Observable } from 'rxjs';
import { StorageKeys } from './storage-keys.enum';

export abstract class AppStorage {
  abstract set<T>(key: StorageKeys, value: T): void;

  abstract get<T>(key: StorageKeys): T | null;

  abstract get$<T>(key: StorageKeys): Observable<T | null>;

  abstract remove(key: StorageKeys): void;

  abstract clear(): void;
}
