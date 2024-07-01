import { Pipe, PipeTransform } from '@angular/core';
import { MaterialIcon } from '../enums/material-icon.enum';


@Pipe({
  name: 'materialIcon',
  standalone: true
})
export class MaterialIconPipe implements PipeTransform {
  transform(url: string): MaterialIcon {

    const iconCondition: Record<MaterialIcon, boolean> = {
      [MaterialIcon.MP3]: url.endsWith('.mp3'),
      [MaterialIcon.PDF]: url.endsWith('.pdf'),
      [MaterialIcon.YOUTUBE]: /youtube/i.test(url) || /youtu\.be/i.test(url),
      [MaterialIcon.OTHER]: true
    };

    const matchedIcon = Object.keys(iconCondition).find(
      key => iconCondition[key as MaterialIcon]
    )!;

    return matchedIcon as MaterialIcon;
  }
}