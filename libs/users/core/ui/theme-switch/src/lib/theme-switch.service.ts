import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  public isDarkTheme$ = new BehaviorSubject<boolean>(this.getSavedTheme() ?? false);
  public switchTheme() {
    const nextValue = !this.isDarkTheme$.value
    this.isDarkTheme$.next(nextValue)
    this.setSavedTheme(nextValue);
  }
  private getSavedTheme() {
    return localStorage.getItem('isDarkTheme') === 'false' ? false : true
  }
  private setSavedTheme(isDark: boolean) {
    localStorage.setItem('isDarkTheme', String(isDark))
  }

  constructor() {
    this.isDarkTheme$
      .pipe(takeUntilDestroyed())
      .subscribe(isDark => {
        if (isDark) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
    });
  }
}
