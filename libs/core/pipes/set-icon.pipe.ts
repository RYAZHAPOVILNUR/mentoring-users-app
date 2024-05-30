import { Pipe, PipeTransform } from '@angular/core';
import { SetIcon } from '../enums/set-icon.enum';

@Pipe({
  name: 'setIcon',
  standalone: true
})
export class SetIconPipe implements PipeTransform {
  transform(url: string): SetIcon | null {
    const mp3Regex = /\.mp3$/i;
    const pdfRegex = /\.pdf$/i;
    const youtubeRegex = /youtube/i;
    const youtuBeRegex = /youtu\.be/i;

    if (mp3Regex.test(url)) {
      return SetIcon.MP3;
    }

    if (pdfRegex.test(url)) {
      return SetIcon.PDF;
    }

    if (youtubeRegex.test(url)) {
      return SetIcon.YOUTUBE;
    }

    if (youtuBeRegex.test(url)) {
      return SetIcon.YOUTU_BE;
    }

    return SetIcon.OTHER;
  }
}

