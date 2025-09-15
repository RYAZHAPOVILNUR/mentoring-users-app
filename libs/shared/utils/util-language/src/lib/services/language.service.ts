import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, StorageKey } from '@shared/util-storage';
import { BehaviorSubject } from 'rxjs';

import { Languages } from '../constants/languages.constant';
import { LanguageValues } from '../types/language-values.type';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly selectedLanguage$ = new BehaviorSubject<LanguageValues>(this.getStoredLanguage());

  setLanguage(language: LanguageValues): void {
    this.selectedLanguage$.next(language);
    this.translateService.use(language);
    this.localStorageService.set(StorageKey.LANGUAGE, language);
  }

  getStoredLanguage(): LanguageValues {
    const savedLanguage = this.localStorageService.get<LanguageValues>(StorageKey.LANGUAGE);
    return savedLanguage ? savedLanguage : Languages.Russian;
  }
}
