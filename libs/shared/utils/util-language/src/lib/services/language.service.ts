import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { Languages } from '../constants/languages.constant';
import { LanguageKeys } from '../types/language-keys.type';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);

  public selectedLanguage$ = new BehaviorSubject<LanguageKeys>(this.getStoredLanguage());

  constructor() {
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
