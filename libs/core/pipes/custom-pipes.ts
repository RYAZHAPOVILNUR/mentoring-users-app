import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitSymbols',
  standalone: true,
})
export class limitSymbols implements PipeTransform {
  transform(value: string, limit: number) {
    if (value.length > limit) value.slice(0, limit) + '...';
    return value;
  }
}