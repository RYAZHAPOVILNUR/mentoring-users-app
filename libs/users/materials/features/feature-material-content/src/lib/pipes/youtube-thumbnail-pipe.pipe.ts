import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'youtubeThumbnail' })
export class YoutubeThumbnailPipe implements PipeTransform {
  transform(link: string): string | null {
    const match = link?.match(/v=([^&]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  }
}
