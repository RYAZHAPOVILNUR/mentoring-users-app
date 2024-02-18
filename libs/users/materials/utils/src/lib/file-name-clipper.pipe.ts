import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNameClipper',
  standalone: true,
})
export class FileNameClipperPipe implements PipeTransform {
  transform(value: string, strLength: number): string {
    return value.length > strLength ? value.slice(0, strLength - 3) + '...' : value;
  }
}
