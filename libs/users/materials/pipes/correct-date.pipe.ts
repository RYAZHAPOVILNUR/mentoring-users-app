import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctdate',
  standalone: true,
})
export class CorrectDatePipe implements PipeTransform {
  transform(value: number | null, format: string = 'dd.MM.yyyy HH:mm:ss'): string {
    if (!value) return '';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
