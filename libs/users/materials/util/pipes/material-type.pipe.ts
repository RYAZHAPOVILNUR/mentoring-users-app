
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'materialType',
})
export class MaterialTypePipe implements PipeTransform {
  transform(src: any): string {
    // Логика для определения типа материала на основе src
    if (src.endsWith('.pdf')) {
      return 'pdf';
    } else if (src.endsWith('.mp3')) {
      return 'audio';
    }
    return 'video'; // или любое другое значение по умолчанию
  }
}
