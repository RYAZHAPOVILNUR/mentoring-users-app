import { inject, Injectable } from '@angular/core';

import { Theme } from '../interfaces/theme.interface';
import { THEMES_TOKEN } from '../tokens/themes.token';
import { StyleManager } from '../utils/style-manager.util';
import { ThemeStorage } from '../utils/theme-storage.util';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themes = inject(THEMES_TOKEN);
  private readonly styleManager = inject(StyleManager);
  private readonly themeStorage = inject(ThemeStorage);

  selectTheme(name: Theme['name']) {
    const theme = this.themes.find((t) => t.name === name);

    if (!theme) {
      return;
    }

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    this.themeStorage.storeTheme(theme.name);
  }
}
