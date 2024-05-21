import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: number): string {
    const date = new Date(value);
    return date.toLocaleDateString('ru-RU');
  }
}
