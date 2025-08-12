import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../services/language.service';

export function initializeLanguage(): void {
  const translateService = inject(TranslateService);
  const languageService = inject(LanguageService);

  translateService.setDefaultLang(languageService.getStoredLanguage());
}
