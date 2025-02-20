import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineTrim',
  standalone: true,
})
export class LineTrimPipe implements PipeTransform {
  transform(text: string): string {
    return text.slice(0, 10).concat('...');
  }
}
