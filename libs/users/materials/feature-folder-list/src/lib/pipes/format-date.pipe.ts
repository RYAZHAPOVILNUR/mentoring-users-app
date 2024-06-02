import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

export const DATE_FORMAT = 'dd.MM.yyyy';

@Pipe({
  standalone: true,
  name: 'formatDate',
})
export class FormatDate implements PipeTransform {
  constructor(private readonly datePipe: DatePipe) {}

  public transform(date: string): string | null {
    return this.datePipe.transform(date, DATE_FORMAT);
  }
}
