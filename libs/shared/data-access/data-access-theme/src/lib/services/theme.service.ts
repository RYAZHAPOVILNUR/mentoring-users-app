import { inject, Injectable } from '@angular/core';

import { LocalStorageService, StorageKey } from '@shared/util-storage';

import { Theme } from '../interfaces/theme.interface';
import { THEMES_TOKEN } from '../tokens/themes.token';
import { StyleManager } from '../utils/style-manager.util';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themes = inject(THEMES_TOKEN);
  private readonly styleManager = inject(StyleManager);
  private readonly localStorageService = inject(LocalStorageService);

  selectTheme(name: Theme['name']): void {
    const theme = this.themes.find((t) => t.name === name);

    if (!theme) {
      return;
    }

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    this.localStorageService.set(StorageKey.THEME, theme.name);
  }
}
