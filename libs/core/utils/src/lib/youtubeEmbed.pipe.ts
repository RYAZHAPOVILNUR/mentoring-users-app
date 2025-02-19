import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeEmbed',
  standalone: true,
})
export class YoutubeEmbedPipe implements PipeTransform {
  transform(url: string): string {
    if (!url) {
      return '';
    }

    // Если ссылка вида https://www.youtube.com/watch?v=XYZ или https://youtu.be/XYZ
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
