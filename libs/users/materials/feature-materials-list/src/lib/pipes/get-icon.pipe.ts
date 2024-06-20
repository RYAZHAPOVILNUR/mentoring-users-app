import { Pipe, PipeTransform } from '@angular/core';
import { MaterialIcon } from '../enums/material-icon.enum';

@Pipe({
  name: 'materialIcon',
  standalone: true
})
export class MaterialIconPipe implements PipeTransform {
  transform(url: string): MaterialIcon {

    const extensionMaterial: Record<MaterialIcon, boolean> = { // todo имя переменной содержит глагол.
      [MaterialIcon.MP3]: url.endsWith('.mp3'),
      [MaterialIcon.PDF]: url.endsWith('.pdf'),
      [MaterialIcon.YOUTUBE]: /youtube/i.test(url) || /youtu\.be/i.test(url),
      [MaterialIcon.OTHER]: true
    };

    const extensionMaterialKey = Object.keys(extensionMaterial).find( // todo имя переменной содержит глагол.
      key => extensionMaterial[key as MaterialIcon]
    )!;

    return extensionMaterialKey as MaterialIcon;
  }
}