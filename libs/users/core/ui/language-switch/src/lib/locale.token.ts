import { InjectionToken, inject } from "@angular/core";
import { Observable } from "rxjs";
import { LanguageSwitchService } from "./language-switch.service";
import { LanguageKeys } from "./languages";

export const LOCALE = new InjectionToken<Observable<LanguageKeys>>('locale', {
  factory: () => inject(LanguageSwitchService).selectedLanguage$
});
