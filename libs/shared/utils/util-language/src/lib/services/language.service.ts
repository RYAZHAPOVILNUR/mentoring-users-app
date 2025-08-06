import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { Languages } from '../constants/languages.constant';
import { LanguageValues } from '../types/language-values.type';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);

  readonly selectedLanguage$ = new BehaviorSubject<LanguageValues>(this.getStoredLanguage());

  setLanguage(language: LanguageValues): void {
    this.selectedLanguage$.next(language);
    this.translateService.use(language);
    localStorage.setItem('lang', language);
  }

  getStoredLanguage(): LanguageValues {
    const savedLanguage = localStorage.getItem('lang');
    return savedLanguage ? (savedLanguage as LanguageValues) : Languages.Russian;
  }
}
