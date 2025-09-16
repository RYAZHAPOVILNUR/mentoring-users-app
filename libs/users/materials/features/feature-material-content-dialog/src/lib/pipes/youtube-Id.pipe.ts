import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'youtubeId' })
export class YoutubeIdPipe implements PipeTransform {
  transform(link: string): string | undefined {
    if (!link) return undefined;
    const match = link.match(/v=([^&]+)/);
    return match ? match[1] : undefined;
  }
}
