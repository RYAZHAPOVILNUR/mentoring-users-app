import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'videoSrcSanitize',
})
export class VideoSrcSanitizePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string) {
    const videoId = value.split('v=')[1];
    const safeUrl = `https://www.youtube.com/embed/${videoId};`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
  }
}
