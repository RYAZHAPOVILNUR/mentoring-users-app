import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeThumbnail',
  standalone: true,
})
export class YoutubeThumbnailPipe implements PipeTransform {
  transform(url: string): string {
    const videoId = this.extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
  }

  private extractVideoId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }
}
