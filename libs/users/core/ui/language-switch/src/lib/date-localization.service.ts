import { Injectable } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BehaviorSubject, map, Observable } from 'rxjs';

registerLocaleData(localeRu, 'ru');

@Injectable({
  providedIn: 'root',
})
export class DateLocalizationService {
  constructor(private datePipe: DatePipe) {}

  public getDateLocalization<T>(lang: T | string = 'en-US', date: T | number = Date.now()) {}

  private timeStamp = new BehaviorSubject<Date | number | string>(0);

  public setTimeStamp(date: Date | number | string): void {
    this.timeStamp.next(date);
  }

  private returnLang(isNull: boolean): 'en-US' | 'ru' {
    if (isNull) {
      return localStorage.getItem('lang') === null ? 'ru' : localStorage.getItem('lang') === 'en-US' ? 'ru' : 'en-US';
    } else {
      return localStorage.getItem('lang') === 'en-US' ? 'ru' : 'en-US';
    }
  }

  public formatDate(date: Date | number | string, format: string, timeZone: string | undefined, lang: string): void {
    this.datePipe.transform(date, format, timeZone, lang);
  }

  private readonly langSubject$ = new BehaviorSubject<'en-US' | 'ru'>(this.returnLang(true));
  public readonly formattedDate$ = this.langSubject$.pipe(
    map((lang) => this.formatDate(this.timeStamp.value, 'd MMMM, yyyy', undefined, lang))
  );

  public changeDateLang(): void {
    this.langSubject$.next(this.returnLang(false));
  }
}
