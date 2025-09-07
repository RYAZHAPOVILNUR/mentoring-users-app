import { Injectable } from '@angular/core';

import { StorageKey } from './storage-key.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get<T>(key: StorageKey): T | null {
    const data = localStorage.getItem(key);
    if (data === null) return null;

    try {
      const value = JSON.parse(data);

      return value as T;
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  set(key: StorageKey, value: unknown): void {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (err) {
      console.error(err);
    }
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }
}
