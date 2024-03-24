import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VideoId',
  standalone: true
})
export class VideoIdPipe implements PipeTransform {
  transform(link: string): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = link.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }
}
