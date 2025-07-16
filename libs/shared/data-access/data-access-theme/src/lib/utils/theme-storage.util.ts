import { Injectable } from '@angular/core';

import { Theme } from '../interfaces/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
  static storageKey = 'users-theme-storage-current-name';

  storeTheme(name: Theme['name']): void {
    try {
      window.localStorage[ThemeStorage.storageKey] = name;
    } catch {
      /* empty */
    }
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }
}
