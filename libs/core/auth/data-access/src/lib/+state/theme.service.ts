import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  resetTheme(): void {
    const themeElement = document.head.querySelector('.style-manager-theme');
    if (themeElement) {
      themeElement.remove();
    }
  }
}