import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';
import { LOCALE } from '@users/users/core/ui/language-switch';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'multiLangDate',
  standalone: true,
})
export class MultiLangDatePipe implements PipeTransform {
  private readonly locale$ = inject(LOCALE);

  transform(date: Date | string | number, format = 'yyyy-MM-dd'): Observable<string | null> {
    return this.locale$.pipe(
      map((language) => (new DatePipe(language).transform(date, format))
    ));
  }
}
