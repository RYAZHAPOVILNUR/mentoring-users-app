import { inject } from '@angular/core';

import { LocalStorageService, StorageKey } from '@shared/util-storage';

import { ThemeService } from '../services/theme.service';
import { THEMES_TOKEN } from '../tokens/themes.token';

export function initializeTheme(): void {
  const themes = inject(THEMES_TOKEN);
  const themeService = inject(ThemeService);
  const localStorageService = inject(LocalStorageService);

  const themeNameFromStorage = localStorageService.get<string>(StorageKey.THEME);

  const name = themeNameFromStorage ?? themes.find(({ isDefault }) => isDefault)?.name;

  if (name) {
    themeService.selectTheme(name);
  }
}
