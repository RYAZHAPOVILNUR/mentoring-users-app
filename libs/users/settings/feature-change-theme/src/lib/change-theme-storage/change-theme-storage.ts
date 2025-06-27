import { EventEmitter, Injectable } from '@angular/core';

import { DocsSiteTheme } from '../interfaces/docs-site-theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeStorage {
  static storageKey = 'users-theme-storage-current-name';

  onThemeUpdate: EventEmitter<DocsSiteTheme> = new EventEmitter<DocsSiteTheme>();

  storeTheme(theme: DocsSiteTheme): void {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch {
      /* empty */
    }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }
}
