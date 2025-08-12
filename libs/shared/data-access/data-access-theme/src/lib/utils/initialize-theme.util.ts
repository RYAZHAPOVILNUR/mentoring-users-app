import { inject } from '@angular/core';

import { ThemeStorage } from './theme-storage.util';
import { ThemeService } from '../services/theme.service';
import { THEMES_TOKEN } from '../tokens/themes.token';

export function initializeTheme(): void {
  const themes = inject(THEMES_TOKEN);
  const themeStorage = inject(ThemeStorage);
  const themeService = inject(ThemeService);

  const themeNameFromStorage = themeStorage.getStoredThemeName();

  const name = themeNameFromStorage ?? themes.find(({ isDefault }) => isDefault)?.name;

  if (name) {
    themeService.selectTheme(name);
  }
}
