import { Pipe, PipeTransform } from '@angular/core';
import { getIcon } from '../enums/get-icon.enum';

@Pipe({
  name: 'getIcon',
  standalone: true
})
export class GetIconPipe implements PipeTransform { // todo может быть это не относится к data-access?
  transform(url: string): getIcon {
    const audio = /\.mp3$/i; // todo так ли нужна регулярка?
    const pdf = /\.pdf$/i; // todo так ли нужна регулярка?
    const video = /youtube/i || /youtu\.be/i;


    const map = new Map([
      [audio, getIcon.MP3],
      [pdf, getIcon.PDF],
      [video, getIcon.YOUTUBE]
    ]);

    let result: getIcon | undefined;
    map.forEach((value, key) => {
      if (key.test(url)) result = value;
    });

    return result ?? getIcon.OTHER;


    //
    // if (mp3Regex.test(url)) { // todo посмотри метод match
    //   return NaneIcon.MP3;
    // }
    //
    // if (pdfRegex.test(url)) {
    //   return NaneIcon.PDF;
    // }
    //
    // if (youtubeRegex.test(url)) {
    //   return NaneIcon.YOUTUBE;
    // }
    //
    // if (youtuBeRegex.test(url)) {
    //   return NaneIcon.YOUTU_BE;
    // }
    //
    // return NaneIcon.OTHER;
  }
}

