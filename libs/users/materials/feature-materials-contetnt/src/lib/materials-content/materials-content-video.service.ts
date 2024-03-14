import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaterialsContentVideoService {
  getVideoId(url: string): string | null {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  getThumbnailUrl(videoId: string, size: string): string {
    return `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
  }
}
