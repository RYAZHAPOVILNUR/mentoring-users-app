import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages, LanguageKeys } from './languages';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitchService {
  private readonly translateService = inject(TranslateService);

  public selectedLanguage$: BehaviorSubject<LanguageKeys>;

  private getStoredLanguage() {
    const savedLanguage = localStorage.getItem('lang');
    return savedLanguage
      ? savedLanguage as LanguageKeys
      : Languages.Russian;
  }

  public setLanguage(language: LanguageKeys) {
    this.selectedLanguage$.next(language);
    this.translateService.use(language);
    localStorage.setItem('lang', language);
  }

  constructor() {
    this.selectedLanguage$ = new BehaviorSubject<LanguageKeys>(this.getStoredLanguage());
    this.translateService.setDefaultLang(this.getStoredLanguage());
  }

}
