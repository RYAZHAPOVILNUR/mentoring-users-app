import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { LanguageKeys, Languages } from './languages';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitchService {
  private readonly translateService = inject(TranslateService);

  public selectedLanguage$: BehaviorSubject<LanguageKeys>;

  constructor() {
    this.selectedLanguage$ = new BehaviorSubject<LanguageKeys>(this.getStoredLanguage());
    this.translateService.setDefaultLang(this.getStoredLanguage());
  }
  public setLanguage(language: LanguageKeys) {
    this.selectedLanguage$.next(language);
    this.translateService.use(language);
    localStorage.setItem('lang', language);
  }
  private getStoredLanguage() {
    const savedLanguage = localStorage.getItem('lang');
    return savedLanguage ? (savedLanguage as LanguageKeys) : Languages.Russian;
  }
}
