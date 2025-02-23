import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIcon',
  standalone: true,
})
export class FormatIconPipe implements PipeTransform {
  transform(fileFormat: string): string {
    switch (fileFormat) {
      case 'Video':
        return 'movie';
      case 'Audio':
        return 'audiotrack';
      case 'PDF':
        return 'picture_as_pdf';
      default:
        return 'insert_drive_file';
    }
  }
}
