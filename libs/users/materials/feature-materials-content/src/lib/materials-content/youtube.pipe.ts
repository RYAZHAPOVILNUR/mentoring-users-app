import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtube',
  standalone: true,
})
export class YoutubePipe implements PipeTransform {
  transform(url: string): string {
    if (!url) {
      return '';
    }

    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return embedUrl;
    }

    return url;
  }
}