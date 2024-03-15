import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'materialTypeIcon', standalone: true })
export class MaterialTypeIconPipe implements PipeTransform {
  transform(type: string): string {
    const youtubeRegex =
      /(?:youtube\.com|youtu\.be|m\.youtube\.com)\/(?:watch\?v=|embed\/|v\/|.*[?&]v=)?([a-zA-Z0-9_-]+)/;
    switch (true) {
      case type.endsWith('.pdf'):
        return 'picture_as_pdf';
      case type.endsWith('.mp3'):
        return 'music_note';
      case youtubeRegex.test(type):
        return 'smart_display';
      default:
        return 'help';
    }
  }
}
