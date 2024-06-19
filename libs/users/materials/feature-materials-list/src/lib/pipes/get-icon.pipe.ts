import { Pipe, PipeTransform } from '@angular/core';
import { getIcon } from '../enums/get-icon.enum';

export type GetIcon = `${getIcon}`;

@Pipe({
  name: 'getIcon',
  standalone: true
})
export class GetIconPipe implements PipeTransform {
  transform(url: string): GetIcon {

    const checkers: { [key: string]: boolean } = {
      audio: url.endsWith('.mp3'),
      pdf: url.endsWith('.pdf'),
      video: /youtube/i.test(url) || /youtu\.be/i.test(url)
    };

    const iconCase: { [key in keyof typeof checkers]: GetIcon } = {
      audio: getIcon.MP3,
      pdf: getIcon.PDF,
      video: getIcon.YOUTUBE
    };

    const trueKey: string | undefined = Object.keys(checkers).find(key => checkers[key]);

    return trueKey ? iconCase[trueKey] : getIcon.OTHER;
  }
}
