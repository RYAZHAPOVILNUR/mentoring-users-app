import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, size = 20, afterText = '...'): string {
    return value.length > size 
      ? value.substring(0, size) + afterText
      : value;
  }
}
