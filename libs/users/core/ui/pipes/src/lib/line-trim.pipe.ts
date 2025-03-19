import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineTrim',
  standalone: true,
})
export class LineTrimPipe implements PipeTransform {
  transform(text: string, maxLength: number = 10): string {
    if (!text) return '';

    const safeLength = Math.max(0, Math.floor(maxLength));

    if (text.length <= safeLength) {
      return text;
    }

    return text.slice(0, safeLength).trim() + '...';
  }
}
